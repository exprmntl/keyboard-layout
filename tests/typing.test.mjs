import test from "node:test";
import assert from "node:assert/strict";
import { applyTypingKey } from "../src/lib/typing-state.ts";

// Dvorak positions exercise mapping by key code, rather than QWERTY labels.
const map = {
  KeyI: { value: "c", shiftValue: "C" },
  KeyA: { value: "a", shiftValue: "A" },
  KeyK: { value: "t", shiftValue: "T" },
  KeyQ: { value: "'", shiftValue: '"' },
};
const initial = { finishedText: "", typedText: "", unfinishedText: "cat act" };

test("touch and physical key codes map to the selected layout and complete a word", () => {
  const result = ["KeyI", "KeyA", "KeyK", "Space"].reduce((state, code) => applyTypingKey(state, code, map), initial);
  assert.deepEqual(result, { finishedText: "cat ", typedText: "", unfinishedText: "act" });
  assert.deepEqual(initial, { finishedText: "", typedText: "", unfinishedText: "cat act" });
});

test("a wrong word cannot be skipped with space and can be corrected with backspace", () => {
  let state = { ...initial, typedText: "caa" };
  state = applyTypingKey(state, "Space", map);
  assert.equal(state.typedText, "caa ");
  assert.equal(state.unfinishedText, initial.unfinishedText);
  state = applyTypingKey(applyTypingKey(state, "Backspace", map), "Backspace", map);
  state = applyTypingKey(applyTypingKey(state, "KeyK", map), "Space", map);
  assert.equal(state.finishedText, "cat ");
});

test("shift uses the selected layout for letters and punctuation", () => {
  let state = applyTypingKey(initial, "KeyI", map, true);
  state = applyTypingKey(state, "KeyQ", map, true);
  assert.equal(state.typedText, 'C"');
  assert.equal(applyTypingKey(initial, "KeyQ", map).typedText, "'");
});

test("backspace at a word boundary preserves completed words", () => {
  const state = { finishedText: "cat ", typedText: "", unfinishedText: "act" };
  assert.deepEqual(applyTypingKey(state, "Backspace", map), state);
});

test("command-backspace clears only the incorrect suffix", () => {
  assert.equal(applyTypingKey({ ...initial, typedText: "caatt" }, "Backspace", map, false, true).typedText, "ca");
  assert.equal(applyTypingKey({ ...initial, typedText: "cat" }, "Backspace", map, false, true).typedText, "cat");
});

test("unmapped keys cannot insert text; a final word completes without a trailing space", () => {
  assert.equal(applyTypingKey(initial, "ShiftLeft", map), initial);
  assert.deepEqual(applyTypingKey({ ...initial, typedText: "cat", unfinishedText: "cat" }, "Space", map), {
    finishedText: "cat ", typedText: "", unfinishedText: "",
  });
});
