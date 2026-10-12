import type { PostHogConfig } from "posthog-js";
import type { AnalyticsEvents, TrackEvent } from "./analytics-events";
import { cleanAnalyticsUrl, getAnalyticsContext } from "./analytics-policy";
import { isProductionHost } from "./site";
import { layoutForPathname, layouts } from "./layouts";
import { articles, guidesIndex } from "@/content/catalog";

const POSTHOG_KEY = "phc_gZCfyVO7HQTKkDH5G4UH15ejDCJlCHDgbf1XSbZbWGw";
const GA_ID = "G-3XWS80C1HX";
let client: Parameters<PostHogConfig["loaded"]>[0] | undefined;
let initialized = false;
let context: ReturnType<typeof getAnalyticsContext> | undefined;
let lastPageUrl: string | undefined;
const pending: Array<{ event: keyof AnalyticsEvents | "$pageview"; properties: Record<string, unknown> }> = [];

function browserContext() {
  if (!context) {
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch { /* Storage can be blocked. */ }
    context = getAnalyticsContext(new URL(window.location.href), storage);
  }
  return context;
}

function baseProperties() {
  const { is_internal, verification_id } = browserContext();
  return {
    analytics_site: "keyboard-layout-tester",
    analytics_version: 1,
    is_internal,
    ...(verification_id ? { verification_id } : {}),
  };
}

export function initializeAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  const current = browserContext();
  if (!isProductionHost(window.location.hostname, process.env.NODE_ENV)) return;

  // Keep the existing GA property, but do not send marked owner/test visits.
  if (!current.is_internal) {
    const analyticsWindow = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    analyticsWindow.dataLayer ||= [];
    analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", GA_ID, { page_location: cleanAnalyticsUrl(new URL(window.location.href)) });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  // Load after hydration. Early product actions queue until the SDK is ready.
  void import("posthog-js").then(({ default: posthog }) => {
    posthog.init(POSTHOG_KEY, {
      api_host: "https://us.i.posthog.com",
      ui_host: "https://us.posthog.com",
      person_profiles: "identified_only",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: current.is_internal,
      enable_recording_console_log: false,
      session_recording: {
        maskAllInputs: true,
        blockSelector: "[data-private-typing]",
      },
      before_send: (event) => {
        if (event?.properties) {
          Object.assign(event.properties, baseProperties());
          if (typeof event.properties.$current_url === "string") {
            event.properties.$current_url = cleanAnalyticsUrl(new URL(event.properties.$current_url));
          }
        }
        return event;
      },
      loaded: (loadedClient) => {
        client = loadedClient;
        loadedClient.register(baseProperties());
        for (const item of pending.splice(0)) loadedClient.capture(item.event, item.properties);
      },
    });
  }).catch(() => {
    pending.length = 0;
    // Analytics failures must not break typing or outbound links.
  });
}

export function trackPageview() {
  if (typeof window === "undefined") return;
  try {
    initializeAnalytics();
    const url = new URL(window.location.href);
    const cleanUrl = cleanAnalyticsUrl(url);
    if (lastPageUrl === cleanUrl) return;
    lastPageUrl = cleanUrl;
    const isTester = Object.values(layouts).some(layout => layout.path === url.pathname);
    const article = Object.values(articles).find(article => article.path === url.pathname);
    const pageTitle = isTester ? layouts[layoutForPathname(url.pathname)].title
      : article?.title ?? (url.pathname === guidesIndex.path ? guidesIndex.title : document.title);
    // Keep each queued view tied to its actual route, even if the SDK loads later.
    const properties = {
      $current_url: cleanUrl,
      $pathname: url.pathname,
      $host: url.hostname,
      $title: pageTitle,
      ...(isTester ? { layout: layoutForPathname(url.pathname), page_type: "simulator" }
        : { page_type: article ? "article" : url.pathname === guidesIndex.path ? "guides" : "other" }),
      ...baseProperties(),
    };
    if (browserContext().debug) {
      console.info("[keyboard-analytics]", JSON.stringify({ event: "$pageview", properties }));
    }
    if (!isProductionHost(url.hostname, process.env.NODE_ENV)) return;
    if (client) client.capture("$pageview", properties);
    else if (pending.length < 50) pending.push({ event: "$pageview", properties });
  } catch {
    // A route must remain usable if analytics cannot initialize.
  }
}

export const track: TrackEvent = (event, properties) => {
  if (typeof window === "undefined") return;
  try {
    initializeAnalytics();
    if (browserContext().debug) {
      console.info("[keyboard-analytics]", JSON.stringify({ event, properties: { ...properties, ...baseProperties() } }));
    }
    if (!isProductionHost(window.location.hostname, process.env.NODE_ENV)) return;
    if (client) client.capture(event, properties);
    else if (pending.length < 50) pending.push({ event, properties });
  } catch {
    // An unavailable SDK or storage must never interrupt a product action.
  }
};
