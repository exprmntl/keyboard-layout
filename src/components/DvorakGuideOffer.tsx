"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { getAnalyticsRequestContext, track } from "@/lib/analytics";
import { DVORAK_GUIDE, GUIDE_PLACEMENT } from "@/lib/dvorak-guide";

const properties = { layout: "dvorak", guide_id: DVORAK_GUIDE.id, placement: GUIDE_PLACEMENT } as const;

export default function DvorakGuideOffer() {
  const offerRef = useRef<HTMLDivElement>(null);
  const viewed = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "test">("idle");
  const [error, setError] = useState("");

  const recordView = useCallback(() => {
    if (viewed.current) return;
    viewed.current = true;
    track("guide_offer_viewed", properties);
  }, []);

  useEffect(() => {
    const element = offerRef.current;
    if (!element) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver;
    const cancel = () => clearTimeout(timer);
    const observe = () => {
      cancel();
      observer?.disconnect();
      // The fixed touch keyboard can cover content that is inside the viewport.
      const dock = document.querySelector(".touch-keyboard-frame")?.getBoundingClientRect();
      const bottomInset = dock?.height ?? 0;
      observer = new IntersectionObserver(([entry]) => {
        cancel();
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !document.hidden) {
          timer = setTimeout(recordView, 1000);
        }
      }, { threshold: 0.5, rootMargin: `0px 0px -${bottomInset}px 0px` });
      observer.observe(element);
    };
    observe();
    window.addEventListener("resize", observe);
    document.addEventListener("visibilitychange", observe);
    return () => {
      cancel();
      observer.disconnect();
      window.removeEventListener("resize", observe);
      document.removeEventListener("visibilitychange", observe);
    };
  }, [recordView]);

  useEffect(() => {
    if (expanded) emailRef.current?.focus({ preventScroll: true });
  }, [expanded]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/dvorak-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: new FormData(form).get("email"),
          website: new FormData(form).get("website"),
          ...getAnalyticsRequestContext(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error("Please try again in a moment. Your guide request didn’t go through.");
      setStatus(result.mode === "live" ? "success" : "test");
      form.reset();
    } catch {
      setError("Your guide request didn’t go through. Please try again in a moment.");
      setStatus("idle");
    }
  };

  const complete = status === "success" || status === "test";

  return (
    <section className="dvorak-guide" aria-labelledby="dvorak-guide-title">
      <div className="dvorak-guide-invitation" ref={offerRef}>
        <div>
          <h2 id="dvorak-guide-title">Learning Dvorak?</h2>
          <p>Get a free one-page practice plan.</p>
        </div>
        {!complete && (
          <button type="button" className="guide-button" aria-expanded={expanded} aria-controls="dvorak-guide-form" onClick={() => {
            if (!expanded) {
              recordView();
              track("guide_form_opened", properties);
            }
            setExpanded(!expanded);
          }}>{expanded ? "Close" : "Get the guide"} <span aria-hidden="true">{expanded ? "×" : "→"}</span></button>
        )}
      </div>
      <div id="dvorak-guide-form" className="dvorak-guide-expanded" hidden={!expanded}>
        {expanded && (complete ? (
            <div>
              <p role="status">{status === "success" ? "Your guide is on its way. You can also download it now." : "Test complete. No email was sent; you can download the guide below."}</p>
              <a className="guide-button guide-download-link" href={DVORAK_GUIDE.downloadPath} download onClick={() => track("guide_downloaded", properties)}>Download the practice plan <span aria-hidden="true">↓</span></a>
            </div>
          ) : (
            <form onSubmit={submit} className="ph-no-capture" data-private-typing>
              <p className="dvorak-guide-description">A home-row reference, a 10-minute routine, and a gradual plan for switching from QWERTY.</p>
              <label htmlFor="dvorak-guide-email">Email address</label>
              <div className="dvorak-guide-fields">
                <input ref={emailRef} id="dvorak-guide-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder="you@example.com" aria-describedby="dvorak-guide-note" disabled={status === "sending"} />
                <button className="guide-button" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send me the guide"}</button>
              </div>
              <div className="guide-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <p id="dvorak-guide-note" className="dvorak-guide-note">We’ll email you the PDF and unlock the download here. No mailing list.</p>
              {error && <p className="dvorak-guide-error" role="alert">{error}</p>}
            </form>
          ))}
      </div>
    </section>
  );
}
