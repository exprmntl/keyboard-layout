import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { checkDetectionInput, detectionProgress, identifyLayout, probeId, recordDetectionSample } from "../src/lib/layout-detection.ts";

// Independent mapping snapshots, not imported from the detector's profile table.
// Sources and dead-key normalization are documented in docs/layout-detection.md.
const fixtures = JSON.parse(readFileSync(new URL("./fixtures/regional-key-events.json", import.meta.url)));
const codes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY"];
const samples = text => [...text].map((key, index) => ({ code: codes[index], key }));
const sampleFromId = (id, key) => id.startsWith("Shift+") ? { code: id.slice(6), key, shift: true } : { code: id, key };

function guided(mapping) {
  let input = [], progress = detectionProgress(input);
  while (!progress.complete) {
    assert.ok(input.length < 15, "guide must terminate without cycling");
    const id = probeId(progress.nextProbe);
    assert.ok(mapping[id] !== undefined, `missing physical key ${id}`);
    input.push(sampleFromId(id, mapping[id]));
    progress = detectionProgress(input);
  }
  return { input, progress };
}

const regionalCases = [
  ["en.win", "us"], ["en-uk.win", "uk"], ["en-uk.darwin", "uk"],
  ["en-intl.win", "us-international"], ["en-intl.darwin", "us-international"],
  ["es.win", "spanish"], ["es.darwin", "spanish"], ["es-latin.win", "latin-american"],
  ["pt.win", "portuguese"], ["pt-br.win", "brazilian"],
  ["colemak_dh_ansi_us", "colemak-dh"], ["colemak_dh_matrix_us", "colemak-dh"],
];
for (const [fixture, expected] of regionalCases) {
  test(`guided ${fixture} reaches ${expected} using independently sourced keys`, () => {
    const { input, progress } = guided(fixtures[fixture]);
    assert.equal(progress.result?.id, expected);
    assert.equal(progress.exact, true);
    assert.equal(identifyLayout(input.reverse())?.id, expected, "out-of-order evidence must work");
    assert.equal(identifyLayout(Object.entries(fixtures[fixture]).map(([id, key]) => sampleFromId(id, key)))?.id, expected, "extra keys and Shift layers should preserve a valid match");
  });
}

test("typing six QWERTY letters alone does not claim US, UK or any regional variant", () => {
  const progress = detectionProgress(samples("qwerty"));
  assert.equal(progress.complete, false);
  assert.equal(progress.family?.id, "qwerty");
  assert.equal(progress.phase, "variant");
  assert.equal(progress.nextProbe.code, "Semicolon");
  assert.equal(identifyLayout(samples("qwerty")), undefined);
});

test("Colemak and DH require consistent home/bottom-row confirmation", () => {
  const top = samples("qwfpgj");
  assert.equal(identifyLayout(top), undefined);
  const full = [...top, { code: "KeyG", key: "d" }, { code: "KeyH", key: "h" }, { code: "KeyM", key: "m" }];
  assert.equal(identifyLayout(full)?.name, "Standard Colemak");
  assert.equal(detectionProgress([...full, { code: "KeyN", key: "n" }]).exact, false, "a contradictory extra letter must invalidate the standard match");
  const dhk = [...samples("qwfpbj"), { code: "KeyG", key: "g" }, { code: "KeyH", key: "k" }, { code: "KeyM", key: "h" }];
  assert.equal(detectionProgress(dhk).exact, false);
  assert.equal(identifyLayout(dhk)?.name, "Colemak-DH family", "DHk must not be called current DH");
});

test("regional mismatches retain only the family, without choosing the nearest country", () => {
  const unsupported = [...samples("qwerty"), { code: "Semicolon", key: "æ" }];
  assert.equal(identifyLayout(unsupported)?.id, "qwerty");
  assert.equal(detectionProgress(unsupported).exact, false);
  const mixed = [...guided(fixtures["es.win"]).input.filter(s => s.code !== "Equal"), { code: "Equal", key: "¿" }];
  assert.equal(identifyLayout(mixed)?.id, "qwerty");
  assert.equal(detectionProgress(mixed).exact, false);
});

test("preserves family-only AZERTY, QWERTZ and Dvorak checks", () => {
  for (const [text, expected] of [["azerty", "azerty"], ["qwertz", "qwertz"], ["',.pyf", "dvorak"]]) {
    assert.equal(identifyLayout(samples(text).reverse())?.id, expected);
    assert.equal(detectionProgress(samples(text)).exact, false);
  }
});

test("requires physical positions, rejects unsupported and conflicting evidence", () => {
  for (const text of ["qwert", "qwertx", "abcdef"]) assert.equal(identifyLayout(samples(text)), undefined);
  assert.equal(identifyLayout(samples("qwerty").map(sample => ({ ...sample, code: "KeyQ" }))), undefined);
  assert.equal(identifyLayout([...samples("qwerty"), { code: "KeyQ", key: "a" }]), undefined);
  assert.equal(identifyLayout(samples("qwerty").map(sample => ({ ...sample, code: "Unidentified" }))), undefined);
  const wordOnDvorak = ["KeyX", "Comma", "KeyD", "KeyO", "KeyK", "KeyT"].map((code, i) => ({ code, key: "qwerty"[i] }));
  assert.equal(identifyLayout(wordOnDvorak), undefined, "the word itself is not a signature");
});

test("extra keys, repeats and shifted letters do not advance the six base positions", () => {
  const input = [{ code: "Digit1", key: "1" }, { code: "KeyY", key: "y" }, { code: "KeyY", key: "y" }, { code: "KeyQ", key: "Q", shift: true }];
  assert.equal(detectionProgress(input).count, 1);
  assert.deepEqual(detectionProgress(input).nextProbe, { code: "KeyQ" });
  const full = guided(fixtures["en.win"]).input;
  assert.equal(identifyLayout(full.map(s => ({ ...s, key: s.key.toUpperCase() })))?.id, "us", "Caps Lock case does not change a match");
});

test("stores unshifted and Shift separately, flags changes only within a layer", () => {
  const first = recordDetectionSample([], { code: "Digit3", key: "3" });
  const shifted = recordDetectionSample(first.samples, { code: "Digit3", key: "#", shift: true });
  assert.equal(shifted.changed, false);
  assert.equal(shifted.samples.length, 2);
  const changed = recordDetectionSample(shifted.samples, { code: "Digit3", key: "£", shift: true });
  assert.equal(changed.changed, true);
  assert.equal(changed.samples.length, 2);
  assert.equal(first.samples[0].key, "3");
  const caps = recordDetectionSample([{ code: "KeyQ", key: "q" }], { code: "KeyQ", key: "Q" });
  assert.equal(caps.changed, false);
});

test("dead keys and intentional Shift are evidence, but shortcuts and IMEs are not", () => {
  for (const input of [{ code: "Quote", key: "Dead" }, { code: "Digit3", key: "£", shiftKey: true }, { code: "IntlBackslash", key: "<" }]) {
    const checked = checkDetectionInput(input);
    assert.equal(checked.kind, "accepted");
    assert.equal(checked.sample.key, input.key);
    assert.equal(!!checked.sample.shift, !!input.shiftKey);
  }
  for (const input of [{ code: "", key: "a" }, { code: "Unidentified", key: "a" }, { code: "KeyQ", key: "Process" }, { code: "KeyQ", key: "a", isComposing: true }, { code: "KeyQ", key: "@", altKey: true }]) assert.equal(checkDetectionInput(input).kind, "notice");
  for (const input of [{ code: "KeyQ", key: "q", repeat: true }, { code: "KeyQ", key: "q", metaKey: true }, { code: "KeyQ", key: "q", ctrlKey: true }, { code: "Tab", key: "Tab", shiftKey: true }, { code: "Escape", key: "Escape" }, { code: "Numpad1", key: "1" }]) assert.equal(checkDetectionInput(input).kind, "ignored");
});
