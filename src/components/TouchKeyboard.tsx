"use client";

import { useState } from "react";
import type { TypingKeyMap } from "@/lib/typing-state";

const letterRows = [
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
];
const extraRows = [
  ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0"],
  ["Backquote", "Minus", "Equal", "BracketLeft", "BracketRight", "Backslash"],
];

type TouchKeyboardProps = {
  layoutName: string;
  keyMap: TypingKeyMap;
  pressedKeys: Set<string>;
  hintKey?: string;
  hintShift?: boolean;
  onKey: (code: string, shift: boolean) => void;
};

export default function TouchKeyboard({ layoutName, keyMap, pressedKeys, hintKey, hintShift, onKey }: TouchKeyboardProps) {
  const [shift, setShift] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const shifted = shift || pressedKeys.has("ShiftLeft") || pressedKeys.has("ShiftRight");
  const symbolRow = letterRows.flat().filter((code) => !/^[a-z]$/i.test(keyMap[code]?.value ?? ""));
  // Keep each layout's letter positions; move peripheral punctuation to 123.
  const rows = showExtras ? [...extraRows, symbolRow] : [
    letterRows[0],
    ...letterRows.slice(1).map((row) => row.filter((code) => /^[a-z]$/i.test(keyMap[code]?.value ?? ""))),
  ];
  const hiddenHint = hintKey && hintKey !== "Space" && hintKey !== "Backspace" &&
    !rows.some((row) => row.includes(hintKey));

  const press = (code: string) => {
    onKey(code, shifted);
    if (code !== "Backspace") setShift(false);
  };

  const renderKey = (code: string) => {
    const label = (shifted ? keyMap[code]?.shiftValue : keyMap[code]?.value) ?? "";
    return (
      <button type="button" key={code} className="touch-key" aria-label={label}
        data-highlight={pressedKeys.has(code)} data-hint={hintKey === code}
        onPointerDown={(event) => event.preventDefault()} onClick={() => press(code)}>{label}</button>
    );
  };

  return (
    <div className="touch-keyboard select-none" role="group" aria-label={`${layoutName} touch keyboard`}>
      <div id="touch-keyboard-characters" className="touch-keyboard-characters">
        <div className="touch-key-row touch-key-row--top">{rows[0].map(renderKey)}</div>
        <div className="touch-key-row touch-key-row--home" data-dense={rows[1].length > 9}>{rows[1].map(renderKey)}</div>
        <div className="touch-key-row touch-key-row--bottom" data-dense={rows[2].length > 7}>
          <button type="button" className="touch-key touch-key--modifier touch-key--shift" aria-label="Shift" aria-pressed={shift}
            data-highlight={shifted} data-hint={hintShift && !shifted}
            onPointerDown={(event) => event.preventDefault()} onClick={() => setShift((value) => !value)}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill={shifted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 3 3 12h5v9h8v-9h5L12 3Z" />
            </svg>
          </button>
          <div className="touch-bottom-letters">{rows[2].map(renderKey)}</div>
          <button type="button" className="touch-key touch-key--modifier" aria-label="Backspace"
            data-highlight={pressedKeys.has("Backspace")} data-hint={hintKey === "Backspace"}
            onPointerDown={(event) => event.preventDefault()} onClick={() => press("Backspace")}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9L2 12 9 4Z" /><path d="m11 8 7 8m0-8-7 8" />
            </svg>
          </button>
        </div>
      </div>
      <div className="touch-key-row touch-key-row--actions">
        <button type="button" className="touch-key touch-key--mode" aria-label={showExtras ? "Show letters" : "Numbers and symbols"}
          aria-controls="touch-keyboard-characters" data-hint={hiddenHint}
          onPointerDown={(event) => event.preventDefault()} onClick={() => setShowExtras((value) => !value)}>{showExtras ? "ABC" : "123"}</button>
        <button type="button" className="touch-key touch-key--space" aria-label="Space"
          data-highlight={pressedKeys.has("Space")} data-hint={hintKey === "Space"}
          onPointerDown={(event) => event.preventDefault()} onClick={() => press("Space")}>space</button>
        <button type="button" className="touch-key touch-key--next" aria-label="Next word" title="Next word"
          onPointerDown={(event) => event.preventDefault()} onClick={() => press("Space")}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 4v6a3 3 0 0 1-3 3H4m5-5-5 5 5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
