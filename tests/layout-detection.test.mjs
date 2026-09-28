import test from "node:test";
import assert from "node:assert/strict";
import { checkDetectionInput, detectionProgress, identifyLayout, recordDetectionSample } from "../src/lib/layout-detection.ts";

const codes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY"];
const samples = text => [...text].map((key, index) => ({ code: codes[index], key }));

test("identifies letter families from physical positions, including international layouts", () => {
  for (const [text, expected] of [["qwerty", "qwerty"], ["azerty", "azerty"], ["qwertz", "qwertz"], ["',.pyf", "dvorak"], ["qwfpgj", "colemak"]]) {
    assert.equal(identifyLayout(samples(text))?.id, expected);
    assert.equal(identifyLayout(samples(text).reverse())?.id, expected);
  }
  assert.equal(identifyLayout(samples("QWERTY"))?.id, "qwerty");
});

test("requires every physical position and rejects unsupported or conflicting evidence", () => {
  assert.equal(identifyLayout(samples("qwert")), undefined);
  assert.equal(identifyLayout(samples("qwertx")), undefined);
  assert.equal(identifyLayout(samples("abcdef")), undefined);
  assert.equal(identifyLayout(samples("qwerty").map(sample => ({ ...sample, code: "KeyQ" }))), undefined);
  assert.equal(identifyLayout([...samples("qwerty"), { code: "KeyQ", key: "a" }]), undefined);
  assert.equal(identifyLayout(samples("qwerty").map(sample => ({ ...sample, code: "Unidentified" }))), undefined);
});

test("extra keys and identical repeats neither block a result nor advance progress", () => {
  const input = [{ code: "Digit1", key: "1" }, { code: "KeyY", key: "y" }, { code: "KeyY", key: "y" }, { code: "KeyA", key: "a" }];
  assert.deepEqual(detectionProgress(input), { count: 1, nextCode: "KeyQ", complete: false });
  const all = [...input, ...samples("qwerty").reverse()];
  assert.deepEqual(detectionProgress(all), { count: 6, nextCode: undefined, complete: true });
  assert.equal(identifyLayout(all)?.id, "qwerty");
  assert.equal(identifyLayout(input), undefined);
});

test("stores the actual character once per position and flags changed input", () => {
  const first = recordDetectionSample([], { code: "KeyQ", key: "q" });
  assert.equal(first.changed, false);
  const repeat = recordDetectionSample(first.samples, { code: "KeyQ", key: "q" });
  assert.deepEqual(repeat, first);
  const capsLock = recordDetectionSample(first.samples, { code: "KeyQ", key: "Q" });
  assert.equal(capsLock.changed, false);
  assert.equal(capsLock.samples[0].key, "Q");
  const changed = recordDetectionSample(capsLock.samples, { code: "KeyQ", key: "a" });
  assert.equal(changed.changed, true);
  assert.deepEqual(changed.samples, [{ code: "KeyQ", key: "a" }]);
  assert.equal(detectionProgress(changed.samples).count, 1);
  assert.equal(first.samples[0].key, "q");
});

test("accepts out-of-order and extra main-keyboard input while guarding modifiers and unsupported input", () => {
  const valid = { code: "KeyQ", key: "A" };
  assert.deepEqual(checkDetectionInput(valid), { kind: "accepted", sample: valid });
  for (const input of [{ code: "KeyY", key: "y" }, { code: "KeyA", key: "a" }, { code: "Digit1", key: "&" }, { code: "Space", key: " " }, { code: "IntlBackslash", key: "<" }]) {
    assert.deepEqual(checkDetectionInput(input), { kind: "accepted", sample: input });
  }
  for (const input of [
    { ...valid, code: "" }, { ...valid, code: "Unidentified" },
    { ...valid, key: "Dead" }, { ...valid, key: "Process" }, { ...valid, isComposing: true },
    { ...valid, shiftKey: true }, { ...valid, altKey: true },
  ]) assert.equal(checkDetectionInput(input).kind, "notice");
  for (const input of [{ ...valid, repeat: true }, { ...valid, metaKey: true }, { ...valid, ctrlKey: true }, { code: "Tab", key: "Tab" }, { code: "Tab", key: "Tab", shiftKey: true }, { code: "Escape", key: "Escape" }, { code: "Numpad1", key: "1" }]) {
    assert.equal(checkDetectionInput(input).kind, "ignored");
  }
});
