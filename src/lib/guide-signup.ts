import { createHash } from "node:crypto";

type GuideSignupConfig = {
  live: boolean;
  siteUrl: string;
  guide: { id: string; version: number; downloadPath: string };
  resendKey?: string;
  fromEmail?: string;
  internalEmails?: string[];
  attachment: () => Promise<string>;
  fetcher?: typeof fetch;
  now?: () => Date;
};

export type GuideLead = {
  email: string;
  emailId: string;
  distinctId: string;
  sessionId?: string;
  timestamp: string;
};

export async function requestDvorakGuide(request: Request, config: GuideSignupConfig): Promise<{ response: Response; lead?: GuideLead }> {
  const reply = (body: Record<string, unknown>, status = 200) => ({ response: Response.json(body, { status, headers: { "Cache-Control": "no-store" } }) });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? new URL(request.url).host;
  try {
    // Next.js can use an internal localhost origin in request.url. Compare the
    // browser's Origin to its Host header instead of that internal origin.
    if (!origin || new URL(origin).host !== host) return reply({ error: "invalid_origin" }, 403);
  } catch {
    return reply({ error: "invalid_origin" }, 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "invalid_content_type" }, 415);
  if (Number(request.headers.get("content-length")) > 4096) return reply({ error: "request_too_large" }, 413);

  let payload: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 4096) return reply({ error: "request_too_large" }, 413);
    const data: unknown = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) return reply({ error: "invalid_request" }, 400);
    payload = data as Record<string, unknown>;
  } catch {
    return reply({ error: "invalid_request" }, 400);
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@<>(),;:\\"]+@[^\s@<>(),;:\\"]+\.[^\s@<>(),;:\\"]+$/.test(email)) return reply({ error: "invalid_email" }, 400);
  if (payload.website) return reply({ error: "invalid_request" }, 400);

  // Carry the persistent owner marker to the server; preview and QA submissions
  // never send email or enter production lead metrics.
  const automation = /bot|crawler|spider|headless|playwright|webdriver|codex/i.test(request.headers.get("user-agent") ?? "");
  const internalEmail = config.internalEmails?.some(address => address.trim().toLowerCase() === email);
  if (!config.live || payload.is_internal === true || internalEmail || automation) return reply({ mode: "test" });
  if (!config.resendKey || !config.fromEmail) return reply({ error: "email_unavailable" }, 503);

  const now = config.now?.() ?? new Date();
  const emailHash = createHash("sha256").update(email).digest("hex");
  const downloadUrl = new URL(config.guide.downloadPath, config.siteUrl).href;
  const fetcher = config.fetcher ?? fetch;
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendKey}`,
        "Content-Type": "application/json",
        // One copy per address/day, including retries and repeated form submits.
        "Idempotency-Key": `${config.guide.id}-v${config.guide.version}/${now.toISOString().slice(0, 10)}/${emailHash}`,
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [email],
        subject: "Your Dvorak practice plan",
        text: `Here’s your one-page Dvorak practice plan.\n\nThe PDF is attached, with a home-row reference, a 10-minute routine, and a gradual plan for switching from QWERTY.\n\nDownload another copy: ${downloadUrl}\n\nReady to practice? https://keyboardlayout.app/dvorak\n\nYou requested this guide at Keyboard Layout. This doesn’t sign you up for a mailing list.`,
        html: `<div style="font-family:Arial,sans-serif;color:#282622;max-width:560px;margin:32px auto;padding:24px;line-height:1.7"><p style="font-size:12px;color:#746c61">KEYBOARD LAYOUT</p><h1 style="font-size:26px;line-height:1.2">Your Dvorak practice plan.</h1><p>The PDF is attached, with a home-row reference, a 10-minute routine, and a gradual plan for switching from QWERTY.</p><p><a style="color:#b94e23" href="${downloadUrl}">Download the practice plan</a></p><p>Start slowly, keep QWERTY for work, and build from accurate movements.</p><p><a style="color:#b94e23" href="https://keyboardlayout.app/dvorak">Open Dvorak practice →</a></p><p style="font-size:12px;color:#746c61;margin-top:32px">You requested this guide at Keyboard Layout. This doesn’t sign you up for a mailing list.</p></div>`,
        attachments: [{ filename: "dvorak-practice-plan.pdf", content: await config.attachment() }],
        tags: [{ name: "product", value: "keyboard-layout" }, { name: "guide", value: config.guide.id }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply({ error: "email_unavailable" }, 502);
    const sent: unknown = await response.json();
    if (!sent || typeof sent !== "object" || !("id" in sent) || typeof sent.id !== "string") return reply({ error: "email_unavailable" }, 502);
    const safeId = (value: unknown) => typeof value === "string" && /^[a-zA-Z0-9_$:.\-]{1,200}$/.test(value) ? value : undefined;
    return {
      response: reply({ mode: "live" }).response,
      lead: {
        email,
        emailId: sent.id,
        distinctId: safeId(payload.distinct_id) ?? `guide-${emailHash}`,
        sessionId: safeId(payload.session_id),
        timestamp: now.toISOString(),
      },
    };
  } catch {
    // Do not log email addresses, provider response bodies, or credentials.
    return reply({ error: "email_unavailable" }, 502);
  }
}
