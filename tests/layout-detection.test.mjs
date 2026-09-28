import test from "node:test";
import assert from "node:assert/strict";
import { checkDetectionInput, identifyLayout } from "../src/lib/layout-detection.ts";

const codes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY"];
const samples = text => [...text].map((key, index) => ({ code: codes[index], key }));

test("identifies letter families from physical positions, including international layouts", () => {
  for (const [text, expected] of [["qwerty", "qwerty"], ["azerty", "azerty"], ["qwertz", "qwertz"], ["',.pyf", "dvorak"], ["qwfpgj", "colemak"]]) {
    assert.equal(identifyLayout(samples(text))?.id, expected);
  }
  assert.equal(identifyLayout(samples("QWERTY"))?.id, "qwerty");
});

test("never guesses from partial, contradictory, duplicate, or unknown positions", () => {
  assert.equal(identifyLayout(samples("qwert")), undefined);
  assert.equal(identifyLayout(samples("qwertx")), undefined);
  assert.equal(identifyLayout(samples("abcdef")), undefined);
  assert.equal(identifyLayout(samples("qwerty").map(sample => ({ ...sample, code: "KeyQ" }))), undefined);
  assert.equal(identifyLayout([...samples("qwerty"), { code: "KeyU", key: "u" }]), undefined);
});

test("guards guided key order, mobile events, modifiers, IMEs, dead keys, and held keys", () => {
  const valid = { code: "KeyQ", key: "A" };
  assert.deepEqual(checkDetectionInput(valid, 0), { kind: "accepted", sample: { code: "KeyQ", key: "a" } });
  for (const input of [
    { ...valid, code: "KeyW" }, { ...valid, code: "" }, { ...valid, code: "Unidentified" },
    { ...valid, key: "Dead" }, { ...valid, key: "Process" }, { ...valid, isComposing: true },
    { ...valid, shiftKey: true }, { ...valid, altKey: true },
  ]) assert.equal(checkDetectionInput(input, 0).kind, "notice");
  for (const input of [{ ...valid, repeat: true }, { ...valid, metaKey: true }, { ...valid, ctrlKey: true }, { code: "Tab", key: "Tab" }, { code: "Escape", key: "Escape" }]) {
    assert.equal(checkDetectionInput(input, 0).kind, "ignored");
  }
  assert.equal(checkDetectionInput(valid, 6).kind, "ignored");
});
