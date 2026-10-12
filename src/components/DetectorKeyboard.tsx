import type { CSSProperties } from "react";
import type { DetectionSample } from "@/lib/layout-detection";

const rows = [
  ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
  ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
  ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight"],
  ["ControlLeft", "AltLeft", "MetaLeft", "Space", "MetaRight", "AltRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"],
];
const labels: Record<string, string> = {
  Backspace: "⌫", Tab: "Tab", CapsLock: "Caps", Enter: "Enter", ShiftLeft: "Shift", ShiftRight: "Shift",
  ControlLeft: "Ctrl", AltLeft: "Alt", AltRight: "Alt", MetaLeft: "⌘ / ⊞", MetaRight: "⌘ / ⊞", Space: "Space",
  ArrowLeft: "←", ArrowUp: "↑", ArrowDown: "↓", ArrowRight: "→",
};
const widths: Record<string, number> = {
  Backspace: 2, Tab: 1.5, Backslash: 1.5, CapsLock: 1.75, Enter: 2.25, ShiftLeft: 2.25, ShiftRight: 2.75,
  ControlLeft: 1.25, AltLeft: 1.25, MetaLeft: 1.25, Space: 5, MetaRight: 1.25,
};
const rowNames = ["number row", "top letter row", "home row", "bottom letter row", "bottom row"];

export function keyPosition(code: string) {
  if (code === "IntlBackslash") return "extra character key beside left Shift";
  if (code === "IntlRo") return "extra character key beside right Shift";
  if (code === "IntlYen") return "extra character key beside Backspace";
  const rowIndex = rows.findIndex(row => row.includes(code));
  if (rowIndex < 0) return "selected key";
  const positions: Record<string, string> = {
    Semicolon: "key immediately right of the L position on the home row",
    Quote: "second character key right of L, beside Enter",
    Equal: "last character key before Backspace on the number row",
    BracketLeft: "first key right of the P position on the top letter row",
    BracketRight: "second key right of the P position on the top letter row",
    Backquote: "first key on the number row, before 1",
    Digit2: "2 position on the number row", Digit3: "3 position on the number row",
    KeyG: "fifth letter position after Caps Lock (G on US QWERTY)",
    KeyH: "sixth letter position after Caps Lock (H on US QWERTY)",
    KeyM: "M position on US QWERTY, just left of comma",
  };
  if (positions[code]) return positions[code];
  const index = rows[rowIndex].indexOf(code);
  if (rowIndex === 1 && index > 0 && index < 7) {
    return `${["first", "second", "third", "fourth", "fifth", "sixth"][index - 1]} key after Tab`;
  }
  return `${rowNames[rowIndex]}, key ${index + 1} from the left`;
}

export default function DetectorKeyboard({ samples, currentCode, needsShift, onSelect }: {
  samples: readonly DetectionSample[];
  currentCode?: string;
  needsShift?: boolean;
  onSelect: (code: string) => void;
}) {
  const observed = new Map(samples.filter(sample => !sample.shift).map(sample => [sample.code, sample.key]));
  const shifted = new Map(samples.filter(sample => sample.shift).map(sample => [sample.code, sample.key]));
  const displayKey = (key?: string) => key === "Dead" ? "◌" : key === " " ? "␣" : key;
  const visibleRows = rows.map(row => {
    const visible = [...row];
    for (const [code, before] of [["IntlBackslash", "KeyZ"], ["IntlRo", "ShiftRight"], ["IntlYen", "Backspace"]]) {
      if ((observed.has(code) || shifted.has(code)) && visible.includes(before)) visible.splice(visible.indexOf(before), 0, code);
    }
    return visible;
  });
  return (
    <div className="detector-diagram" aria-label="Keyboard diagram">
      {visibleRows.map((row, index) => (
        <div className="detector-key-row" key={index}>
          {row.map(code => {
            const character = observed.get(code);
            const shiftCharacter = shifted.get(code);
            const current = currentCode === code || (!!needsShift && (code === "ShiftLeft" || code === "ShiftRight"));
            const printable = !labels[code] || code === "Space";
            const className = `detector-key${labels[code] ? " detector-key-function" : ""}${character !== undefined || shiftCharacter !== undefined ? " detector-key-done" : ""}${current ? " detector-key-current" : ""}${code === "KeyF" || code === "KeyJ" ? " detector-key-bump" : ""}`;
            const style = { "--key-width": widths[code] ?? 1 } as CSSProperties;
            const text = displayKey(character) ?? labels[code] ?? "";
            return printable ? (
              <button type="button" tabIndex={-1} key={code} data-code={code} className={className} style={style}
                aria-label={`${keyPosition(code)}${character !== undefined ? `, typed ${character === "Dead" ? "dead accent key" : text}` : ", not yet typed"}${shiftCharacter !== undefined ? `, Shift ${shiftCharacter === "Dead" ? "dead accent key" : shiftCharacter}` : ""}`}
                aria-pressed={current} onClick={() => onSelect(code)}><small>{displayKey(shiftCharacter)}</small><span>{text}</span></button>
            ) : <span key={code} className={className} style={style} aria-hidden="true">{text}</span>;
          })}
        </div>
      ))}
    </div>
  );
}
