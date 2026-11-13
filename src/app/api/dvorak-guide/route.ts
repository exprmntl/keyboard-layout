import { after } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DVORAK_GUIDE, GUIDE_PLACEMENT } from "@/lib/dvorak-guide";
import { requestDvorakGuide } from "@/lib/guide-signup";
import { POSTHOG_HOST, POSTHOG_KEY } from "@/lib/analytics-config";
import { isProductionHost, SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const result = await requestDvorakGuide(request, {
    live: isProductionHost(request.headers.get("host")?.split(":")[0] ?? new URL(request.url).hostname, process.env.NODE_ENV) && process.env.VERCEL_ENV !== "preview",
    siteUrl: SITE_URL.href,
    guide: DVORAK_GUIDE,
    resendKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
    internalEmails: process.env.INTERNAL_ANALYTICS_EMAILS?.split(","),
    attachment: async () => (await readFile(join(process.cwd(), "public", DVORAK_GUIDE.downloadPath))).toString("base64"),
  });

  if (result.lead) {
    const lead = result.lead;
    // Resend acceptance is the conversion. Analytics cannot hold up the PDF,
    // and only this server event stores the email as a person property.
    after(async () => {
      try {
        await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: POSTHOG_KEY,
            event: "guide_signup_completed",
            distinct_id: lead.distinctId,
            uuid: lead.emailId,
            timestamp: lead.timestamp,
            properties: {
              analytics_site: "keyboard-layout-tester", analytics_version: 1,
              layout: "dvorak", guide_id: DVORAK_GUIDE.id, guide_version: DVORAK_GUIDE.version,
              placement: GUIDE_PLACEMENT, is_internal: false,
              $session_id: lead.sessionId, $current_url: new URL("/dvorak", SITE_URL).href,
              $geoip_disable: true, $process_person_profile: true,
              $set: { email: lead.email, dvorak_guide_requested: true, dvorak_guide_marketing_consent: false },
            },
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch {
        // Reconcile with Resend's tagged sends if analytics is unavailable.
      }
    });
  }

  return result.response;
}
