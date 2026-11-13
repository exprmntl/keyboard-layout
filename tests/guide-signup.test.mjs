import test from "node:test";
import assert from "node:assert/strict";
import { requestDvorakGuide } from "../src/lib/guide-signup.ts";

const emailId = "15971e98-bce7-4434-805d-01c745a3edb1";
const guide = { id: "dvorak-practice-plan", version: 1, downloadPath: "/downloads/dvorak-practice-plan.pdf" };

function fixture(overrides = {}) {
  const calls = [];
  const config = {
    live: true, guide, siteUrl: "https://keyboardlayout.app/",
    resendKey: "test-key", fromEmail: "Keyboard Layout <hello@example.com>",
    internalEmails: ["owner@example.com"],
    now: () => new Date("2026-11-13T12:00:00Z"),
    attachment: async () => "cGRmLXRlc3QtZmlsZQ==",
    fetcher: async (url, options) => {
      calls.push({ url, options });
      return Response.json({ id: emailId });
    },
    ...overrides,
  };
  return { config, calls };
}

function request(payload = {}, headers = {}) {
  return new Request("https://keyboardlayout.app/api/dvorak-guide", {
    method: "POST",
    headers: { origin: "https://keyboardlayout.app", "Content-Type": "application/json", "user-agent": "ordinary-browser", ...headers },
    body: JSON.stringify({ email: "learner@example.com", ...payload }),
  });
}

test("successful requests send the PDF and return a lead only after Resend accepts", async () => {
  const { config, calls } = fixture();
  const result = await requestDvorakGuide(request({ email: " Learner@EXAMPLE.com ", distinct_id: "browser-42", session_id: "session-42" }), config);
  assert.equal(result.response.status, 200);
  assert.deepEqual(await result.response.json(), { mode: "live" });
  assert.equal(result.lead.email, "learner@example.com");
  assert.equal(result.lead.emailId, emailId);
  assert.equal(result.lead.distinctId, "browser-42");
  assert.equal(result.lead.sessionId, "session-42");
  assert.equal(calls.length, 1);
  const sent = JSON.parse(calls[0].options.body);
  assert.deepEqual(sent.to, ["learner@example.com"]);
  assert.equal(sent.attachments[0].filename, "dvorak-practice-plan.pdf");
  assert.equal(sent.attachments[0].content, await config.attachment());
  assert.match(sent.text, /https:\/\/keyboardlayout.app\/downloads\/dvorak-practice-plan.pdf/);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(result.response.headers.get("cache-control"), "no-store");
});

test("internal, automated and preview requests never send email or create real leads", async () => {
  for (const scenario of [
    { config: { live: false } },
    { payload: { is_internal: true } },
    { config: { internalEmails: [" Learner@EXAMPLE.com "] } },
    { headers: { "user-agent": "HeadlessChrome" } },
    { headers: { "user-agent": "Playwright QA" } },
  ]) {
    const { config, calls } = fixture(scenario.config);
    const result = await requestDvorakGuide(request(scenario.payload, scenario.headers), config);
    assert.deepEqual(await result.response.json(), { mode: "test" });
    assert.equal(result.lead, undefined);
    assert.deepEqual(calls, []);
  }
});

test("same-address retries share a daily idempotency key without exposing the address", async () => {
  const { config, calls } = fixture();
  await requestDvorakGuide(request(), config);
  await requestDvorakGuide(request({ email: "LEARNER@example.com" }), config);
  assert.equal(calls[0].options.headers["Idempotency-Key"], calls[1].options.headers["Idempotency-Key"]);
  assert.doesNotMatch(calls[0].options.headers["Idempotency-Key"], /learner|@/);
});

test("invalid addresses, honeypots and unexpected payloads never reach Resend", async () => {
  for (const payload of [
    { email: "not-an-email" }, { email: "x@example.com\r\nBcc: other@example.com" },
    { email: "a".repeat(255) + "@example.com" }, { email: null }, { website: "spam.example" },
  ]) {
    const { config, calls } = fixture();
    const result = await requestDvorakGuide(request(payload), config);
    assert.equal(result.response.status, 400);
    assert.deepEqual(calls, []);
    assert.equal(result.lead, undefined);
  }
});

test("cross-site requests and oversized bodies are rejected before sending", async () => {
  for (const [headers, expected] of [[{ origin: "https://other.example" }, 403], [{ "content-length": "5000" }, 413], [{ "Content-Type": "text/plain" }, 415]]) {
    const { config, calls } = fixture();
    const result = await requestDvorakGuide(request({}, headers), config);
    assert.equal(result.response.status, expected);
    assert.deepEqual(calls, []);
  }
});

test("Next.js internal request origins use the public Host header for same-site validation", async () => {
  const { config } = fixture({ live: false });
  const internalRequest = new Request("http://localhost:4318/api/dvorak-guide", {
    method: "POST",
    headers: { origin: "http://127.0.0.1:4318", host: "127.0.0.1:4318", "content-type": "application/json" },
    body: JSON.stringify({ email: "learner@example.com" }),
  });
  assert.equal((await requestDvorakGuide(internalRequest, config)).response.status, 200);
});

test("unconfigured production sending returns a real error", async () => {
  for (const missing of [{ resendKey: undefined }, { fromEmail: undefined }]) {
    const { config, calls } = fixture(missing);
    const result = await requestDvorakGuide(request(), config);
    assert.equal(result.response.status, 503);
    assert.deepEqual(calls, []);
    assert.equal(result.lead, undefined);
  }
});

test("provider errors and ambiguous timeouts do not record a conversion", async () => {
  for (const fetcher of [
    async () => Response.json({ error: "rejected" }, { status: 429 }),
    async () => Response.json({}),
    async () => { throw new Error("timeout"); },
  ]) {
    const { config } = fixture({ fetcher });
    const result = await requestDvorakGuide(request(), config);
    assert.equal(result.response.status, 502);
    assert.equal(result.lead, undefined);
  }
});

test("blocked browser analytics still permits an email request with a stable lead identity", async () => {
  const { config } = fixture();
  const first = await requestDvorakGuide(request(), config);
  const second = await requestDvorakGuide(request(), config);
  assert.equal(first.response.status, 200);
  assert.equal(first.lead.distinctId, second.lead.distinctId);
  assert.match(first.lead.distinctId, /^guide-[a-f0-9]{64}$/);
  assert.doesNotMatch(first.lead.distinctId, /learner|@/);
});
