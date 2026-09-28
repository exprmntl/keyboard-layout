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
  const rowIndex = rows.findIndex(row => row.includes(code));
  if (rowIndex < 0) return "selected key";
  const index = rows[rowIndex].indexOf(code);
  if (rowIndex === 1 && index > 0 && index < 7) {
    return `${["first", "second", "third", "fourth", "fifth", "sixth"][index - 1]} key after Tab`;
  }
  return `${rowNames[rowIndex]}, key ${index + 1} from the left`;
}

export default function DetectorKeyboard({ samples, currentCode, onSelect }: {
  samples: readonly DetectionSample[];
  currentCode?: string;
  onSelect: (code: string) => void;
}) {
  const observed = new Map(samples.map(sample => [sample.code, sample.key]));
  return (
    <div className="detector-diagram" aria-label="Keyboard diagram">
      {rows.map((row, index) => (
        <div className="detector-key-row" key={index}>
          {row.map(code => {
            const character = observed.get(code);
            const current = currentCode === code;
            const printable = !labels[code] || code === "Space";
            const className = `detector-key${labels[code] ? " detector-key-function" : ""}${character !== undefined ? " detector-key-done" : ""}${current ? " detector-key-current" : ""}${code === "KeyF" || code === "KeyJ" ? " detector-key-bump" : ""}`;
            const style = { "--key-width": widths[code] ?? 1 } as CSSProperties;
            const text = character === " " ? "␣" : character ?? labels[code] ?? "";
            return printable ? (
              <button type="button" tabIndex={-1} key={code} data-code={code} className={className} style={style}
                aria-label={`${keyPosition(code)}${character !== undefined ? `, typed ${text}` : ", not yet typed"}`}
                aria-pressed={current} onClick={() => onSelect(code)}>{text}</button>
            ) : <span key={code} className={className} style={style} aria-hidden="true">{text}</span>;
          })}
        </div>
      ))}
    </div>
  );
}
