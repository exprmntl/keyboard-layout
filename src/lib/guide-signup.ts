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

export function renderDvorakGuideEmail(downloadUrl: string) {
  const safeDownloadUrl = downloadUrl.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
  const keys = [..."AOEUIDHTNS"].map(key => {
    const anchor = key === "U" || key === "H";
    return `<td align="center" width="10%" style="padding:0 2px"><div style="padding:11px 0;border:1px solid ${anchor ? "#b94e23" : "#d9d1c4"};border-bottom-width:3px;border-radius:6px;background:${anchor ? "#b94e23" : "#fffaf1"};color:${anchor ? "#fffaf1" : "#282622"};font-size:16px;font-weight:600">${key}</div></td>`;
  }).join("");
  return {
    text: `A simpler start with Dvorak.\n\nYour one-page practice plan is attached. It includes a keyboard reference, exact drills for your first 10 minutes, and a checkpoint for adding more keys.\n\nStart with one thing: find U and H. These are where your index fingers rest, on the physical F/J bumps. Take your time; accuracy comes before speed.\n\nOpen Dvorak practice: https://keyboardlayout.app/dvorak\nThe browser simulator works with your usual system layout. For the PDF's custom drills in a blank note, enable Dvorak in your computer's input settings.\n\nDownload the practice plan: ${downloadUrl}\n\nKeyboard Layout\nA product by Experimental Software`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Dvorak practice plan</title></head>
<body style="margin:0;padding:0;background:#f4f0e8;color:#282622;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">Your starter sheet is attached. Find your home row, try the drills, and build from there.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f0e8"><tr><td align="center" style="padding:36px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px">
<tr><td style="padding:0 0 30px"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="width:36px;height:36px;border-radius:7px;border-bottom:3px solid #c9bead;background:#282622;color:#fffaf1;text-align:center;font-size:23px;font-weight:700">k.</td><td style="padding-left:12px;font-size:15px;font-weight:600;letter-spacing:-.3px">Keyboard Layout</td></tr></table></td></tr>
<tr><td style="padding:0 0 12px;color:#746c61;font-size:11px;font-weight:600;letter-spacing:1.5px">YOUR DVORAK STARTER SHEET</td></tr>
<tr><td><h1 style="margin:0 0 18px;font-size:34px;line-height:1.15;letter-spacing:-1.2px;font-weight:600">A simpler start<br>with Dvorak<span style="color:#b94e23">.</span></h1>
<p style="margin:0 0 28px;color:#746c61;font-size:16px;line-height:1.65">Your one-page practice plan is attached. A keyboard reference, exact drills for your first 10 minutes, and a checkpoint for adding more keys.</p></td></tr>
<tr><td style="padding:22px 16px;background:#faf7f1;border:1px solid #d9d1c4;border-radius:12px">
<p style="margin:0 0 16px;font-size:15px;font-weight:600">Start here: find U and H.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>${keys}</tr></table>
<p style="margin:16px 2px 0;color:#746c61;font-size:14px;line-height:1.6">Your index fingers rest on the physical F/J bumps. In Dvorak, those keys are U and H. Take your time; accuracy comes before speed.</p></td></tr>
<tr><td style="padding:28px 0 0"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="border-radius:7px;background:#b94e23"><a href="https://keyboardlayout.app/dvorak" style="display:inline-block;padding:14px 20px;color:#fffaf1;text-decoration:none;font-size:14px;font-weight:600">Open Dvorak practice &rarr;</a></td></tr></table>
<p style="margin:14px 0 24px;color:#746c61;font-size:13px;line-height:1.65">The browser simulator works with your usual system layout. For the PDF’s custom drills in a blank note, enable Dvorak in your computer’s input settings.</p>
<a href="${safeDownloadUrl}" style="color:#b94e23;font-size:14px;text-decoration:underline;text-underline-offset:3px">Download the practice plan</a></td></tr>
<tr><td style="padding-top:32px"><p style="margin:0;padding-top:20px;border-top:1px solid #d9d1c4;color:#746c61;font-size:12px;line-height:1.7">Keyboard Layout<br>A product by <a href="https://experimental.software/" style="color:#746c61;text-decoration:underline">Experimental Software</a></p></td></tr>
</table></td></tr></table></body></html>`,
  };
}

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
  const emailContent = renderDvorakGuideEmail(downloadUrl);
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
        ...emailContent,
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
