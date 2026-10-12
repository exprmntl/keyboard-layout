import qwerty from "@/keyboards/qwertyKeyMap";
import dvorak from "@/keyboards/dvorakKeyMap";
import colemak from "@/keyboards/colemakKeyMap";
import { layouts, type LayoutName } from "@/lib/layouts";

const maps = { qwerty, dvorak, colemak };
const rows = [
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
] as const;

export default function LayoutDiagram({ layout }: { layout: LayoutName }) {
  const map = maps[layout];
  return (
    <figure className="layout-diagram">
      <div aria-label={`${layouts[layout].name} main typing rows`}>
        {rows.map((row, index) => (
          <div className={`diagram-row diagram-row-${index}`} key={index}>
            {row.map(code => <span className={index === 1 ? "home-key" : ""} key={code}>{map[code].value?.toUpperCase()}</span>)}
          </div>
        ))}
      </div>
      <figcaption>{layouts[layout].name} · US main typing rows, unshifted. The shaded row is the home row.</figcaption>
    </figure>
  );
}
