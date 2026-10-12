import test from "node:test";
import assert from "node:assert/strict";
import { createPracticeId, createPracticeTracker, isPracticeInput, NEW_PRACTICE_AFTER_MS } from "../src/lib/practice-analytics.ts";
import { getAnalyticsContext, cleanAnalyticsUrl, INTERNAL_STORAGE_KEY } from "../src/lib/analytics-policy.ts";
import { isProductionHost, SITE_URL } from "../src/lib/site.ts";

function fixture() {
  const events = [];
  let id = 0;
  const tracker = createPracticeTracker("qwerty", (event, properties) => events.push({ event, properties }), () => `practice-${++id}`);
  return { tracker, events };
}

test("practice IDs work on HTTPS and HTTP phone previews", () => {
  const random = { getRandomValues: (bytes) => bytes.fill(42) };
  assert.equal(createPracticeId(random), "2a".repeat(16));
  assert.equal(createPracticeId({ ...random, randomUUID: () => "secure-uuid" }), "secure-uuid");
});

test("starts once and engages once only after thirty seconds of active input", () => {
  const { tracker, events } = fixture();
  for (let now = 0; now < 30_000; now += 1_000) tracker.input(now);
  assert.equal(events.length, 1);
  tracker.input(30_000);
  tracker.input(31_000);
  assert.deepEqual(events, [
    { event: "practice_started", properties: { layout: "qwerty", practice_id: "practice-1", active_seconds: 0, character_count: 1 } },
    { event: "practice_engaged", properties: { layout: "qwerty", practice_id: "practice-1", active_seconds: 30, character_count: 31 } },
  ]);
});

test("idle gaps and time outside the tester never count toward engagement", () => {
  const { tracker, events } = fixture();
  tracker.input(0);
  tracker.input(5_000);
  tracker.input(100_000);
  tracker.pause();
  tracker.input(105_000);
  for (let now = 110_000; now <= 125_000; now += 5_000) tracker.input(now);
  assert.equal(events.length, 1);
  tracker.input(130_000);
  assert.equal(events[1].properties.active_seconds, 30);
});

test("reselecting a layout preserves a run; changing layout starts a fresh one", () => {
  const { tracker, events } = fixture();
  tracker.input(0);
  tracker.selectLayout("qwerty");
  tracker.input(1_000);
  assert.equal(events.length, 1);
  tracker.selectLayout("colemak");
  tracker.input(2_000);
  assert.deepEqual(events[1].properties, { layout: "colemak", practice_id: "practice-2", active_seconds: 0, character_count: 1 });
});

test("opening a shared layout starts practice in that layout without a selection event", () => {
  const events = [];
  const tracker = createPracticeTracker("dvorak", (event, properties) => events.push({ event, properties }), () => "shared-dvorak");
  tracker.input(0);
  tracker.selectLayout("dvorak");
  tracker.input(1_000);
  assert.equal(events.length, 1);
  assert.equal(events[0].event, "practice_started");
  assert.equal(events[0].properties.layout, "dvorak");
  tracker.selectLayout("colemak");
  tracker.input(2_000);
  assert.equal(events[1].properties.layout, "colemak");
});

test("thirty minutes without input starts a new practice run", () => {
  const { tracker, events } = fixture();
  tracker.input(0);
  tracker.input(NEW_PRACTICE_AFTER_MS);
  assert.equal(events.length, 2);
  assert.equal(events[1].properties.practice_id, "practice-2");
  assert.equal(events[1].properties.character_count, 1);
});

test("only deliberate mapped character and space presses qualify", () => {
  const input = { repeat: false, metaKey: false, ctrlKey: false, altKey: false, isComposing: false, code: "KeyA", mappedValue: "a" };
  assert.equal(isPracticeInput(input), true);
  assert.equal(isPracticeInput({ ...input, code: "Space", mappedValue: undefined }), true);
  for (const flag of ["repeat", "metaKey", "ctrlKey", "altKey", "isComposing"]) {
    assert.equal(isPracticeInput({ ...input, [flag]: true }), false, flag);
  }
  for (const code of ["Backspace", "Tab", "Enter", "ShiftLeft", "ArrowLeft"]) {
    assert.equal(isPracticeInput({ ...input, code, mappedValue: undefined }), false, code);
  }
});

function storageFixture() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
}

test("internal marker persists across visits and can be explicitly cleared", () => {
  const storage = storageFixture();
  assert.equal(getAnalyticsContext(new URL("https://example.com/?analytics=internal"), storage).is_internal, true);
  assert.equal(storage.getItem(INTERNAL_STORAGE_KEY), "1");
  assert.equal(getAnalyticsContext(new URL("https://example.com/"), storage).is_internal, true);
  assert.equal(getAnalyticsContext(new URL("https://example.com/?analytics=external"), storage).is_internal, false);
  assert.equal(getAnalyticsContext(new URL("https://example.com/"), storage).is_internal, false);
});

test("debug traffic is internal even when storage is blocked", () => {
  const blocked = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); }, removeItem() { throw Error("blocked"); } };
  assert.deepEqual(getAnalyticsContext(new URL("https://example.com/?analytics=debug&analytics_test=release-1"), blocked), {
    is_internal: true, debug: true, verification_id: "release-1",
  });
});

test("verification IDs are accepted only for internal visits and safe bounded values", () => {
  assert.equal(getAnalyticsContext(new URL("https://example.com/?analytics_test=release-1")).verification_id, undefined);
  assert.equal(getAnalyticsContext(new URL("https://example.com/?analytics=internal&analytics_test=email%40example.com")).verification_id, undefined);
  assert.equal(getAnalyticsContext(new URL(`https://example.com/?analytics=internal&analytics_test=${"a".repeat(65)}`)).verification_id, undefined);
});

test("control parameters are stripped without losing acquisition attribution", () => {
  const url = new URL("https://example.com/?utm_source=newsletter&utm_campaign=launch&analytics=debug&analytics_test=release-1#tester");
  assert.equal(cleanAnalyticsUrl(url), "https://example.com/?utm_source=newsletter&utm_campaign=launch#tester");
  assert.equal(url.searchParams.get("analytics"), "debug");
});

test("analytics runs only on the canonical production hostname", () => {
  assert.equal(isProductionHost(SITE_URL.hostname, "production"), true);
  assert.equal(isProductionHost(SITE_URL.hostname, "development"), false);
  for (const host of ["localhost", "127.0.0.1", "keyboard-layout-preview.vercel.app", `${SITE_URL.hostname}.example.com`]) {
    assert.equal(isProductionHost(host, "production"), false, host);
  }
});
