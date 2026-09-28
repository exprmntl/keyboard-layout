"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { checkDetectionInput, detectionCodes, identifyLayout, type DetectionSample } from "@/lib/layout-detection";
import { track } from "@/lib/analytics";

const positions = ["first", "second", "third", "fourth", "fifth", "sixth"];

export default function LayoutDetector() {
  const [active, setActive] = useState(false);
  const [samples, setSamples] = useState<DetectionSample[]>([]);
  const [notice, setNotice] = useState("");
  const area = useRef<HTMLDivElement>(null);
  const complete = samples.length === detectionCodes.length;
  const result = complete ? identifyLayout(samples) : undefined;

  function start() {
    setSamples([]);
    setNotice("");
    setActive(true);
    area.current?.focus({ preventScroll: true });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!active || complete || event.target !== event.currentTarget) return;
    const checked = checkDetectionInput({
      code: event.code, key: event.key, repeat: event.repeat,
      shiftKey: event.shiftKey, altKey: event.altKey, ctrlKey: event.ctrlKey,
      metaKey: event.metaKey, isComposing: event.nativeEvent.isComposing,
    }, samples.length);
    if (checked.kind === "ignored") return;
    event.preventDefault();
    if (checked.kind === "notice") { setNotice(checked.message); return; }
    const next = [...samples, checked.sample];
    setSamples(next);
    setNotice("");
    if (samples.length === 0) track("layout_detection_started", { method: "guided_keys" });
    if (next.length === detectionCodes.length) {
      track("layout_detection_completed", { method: "guided_keys", result: identifyLayout(next)?.id ?? "unknown" });
    }
  }

  return (
    <section className="detector-card ph-no-capture" data-private-typing aria-label="Check your keyboard layout">
      <div ref={area} className="detector-input" tabIndex={0} role="group" aria-label="Keyboard detection area" aria-describedby="detector-instruction" onKeyDown={onKeyDown}>
        <div aria-live="polite" aria-atomic="true">
          <p className="detector-step">{complete ? "Check complete" : active ? `Key ${samples.length + 1} of 6` : "A quick keyboard check"}</p>
          <h2 id="detector-instruction">
            {complete ? (result ? `Your input matches ${result.name}` : "No supported layout matched")
              : active ? `Press the ${positions[samples.length]} key after Tab` : "Find your layout in six key presses"}
          </h2>
          <p className="detector-explanation">
            {complete ? (result?.note ?? "Your input may use another layout, a custom remapping, or a browser that reports positions differently. Confirm it in your system settings.")
              : "Use the top letter row of your physical keyboard. Follow the highlighted position, not the printed letters."}
          </p>
        </div>
        <div className="detector-diagram" aria-hidden="true">
          <div className="detector-key-row detector-number-row"><span className="detector-key detector-wide">`</span>{Array.from({ length: 10 }, (_, i) => <span className="detector-key" key={i}>{(i + 1) % 10}</span>)}</div>
          <div className="detector-key-row"><span className="detector-key detector-wide">Tab</span>{Array.from({ length: 10 }, (_, i) => <span key={i} className={`detector-key ${i < samples.length ? "detector-key-done" : active && !complete && i === samples.length ? "detector-key-current" : ""}`}>{i < samples.length ? "✓" : i < 6 ? i + 1 : ""}</span>)}</div>
          <div className="detector-key-row detector-home-row"><span className="detector-key detector-wide">Caps</span>{Array.from({ length: 9 }, (_, i) => <span className="detector-key" key={i}>{i === 3 || i === 6 ? "─" : ""}</span>)}</div>
        </div>
        <p className="detector-notice" role="status">{notice || (active && !complete ? "Click inside this box to resume if the keys do not respond." : "A physical keyboard is required. On-screen keyboards cannot be checked reliably.")}</p>
      </div>
      <div className="detector-actions">
        <button type="button" className="detector-button" onClick={start}>{active ? "Start again" : "Check my layout"}</button>
        {complete ? <Link href={result?.href ?? "#confirm-layout"}>{result?.link ?? "Check your system settings"} <span aria-hidden="true">→</span></Link> : <a href="#confirm-layout">Check in system settings</a>}
      </div>
      <p className="detector-privacy">Key presses stay in your browser. We count checks and layout results, never the characters you type.</p>
    </section>
  );
}
