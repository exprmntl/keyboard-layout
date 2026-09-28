"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { checkDetectionInput, detectionProgress, identifyLayout, recordDetectionSample, type DetectionSample } from "@/lib/layout-detection";
import DetectorKeyboard, { keyPosition } from "@/components/DetectorKeyboard";
import { track } from "@/lib/analytics";

export default function LayoutDetector() {
  const [active, setActive] = useState(false);
  const [samples, setSamples] = useState<DetectionSample[]>([]);
  const [notice, setNotice] = useState("");
  const [selectedCode, setSelectedCode] = useState<string>();
  const [inconsistent, setInconsistent] = useState(false);
  const completionTracked = useRef(false);
  const area = useRef<HTMLDivElement>(null);
  const progress = detectionProgress(samples);
  const complete = progress.complete;
  const result = complete && !inconsistent ? identifyLayout(samples) : undefined;
  const currentCode = active ? selectedCode ?? progress.nextCode : undefined;

  function start() {
    setSamples([]);
    setNotice("");
    setSelectedCode(undefined);
    setInconsistent(false);
    completionTracked.current = false;
    setActive(true);
    area.current?.focus({ preventScroll: true });
  }

  function selectKey(code: string) {
    if (!active) start();
    setSelectedCode(code);
    area.current?.focus({ preventScroll: true });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!active || event.target !== event.currentTarget) return;
    const checked = checkDetectionInput({
      code: event.code, key: event.key, repeat: event.repeat,
      shiftKey: event.shiftKey, altKey: event.altKey, ctrlKey: event.ctrlKey,
      metaKey: event.metaKey, isComposing: event.nativeEvent.isComposing,
    });
    if (checked.kind === "ignored") return;
    event.preventDefault();
    if (checked.kind === "notice") { setNotice(checked.message); return; }
    const recorded = recordDetectionSample(samples, checked.sample);
    const nextInconsistent = inconsistent || recorded.changed;
    setSamples(recorded.samples);
    setInconsistent(nextInconsistent);
    setNotice("");
    if (checked.sample.code === selectedCode || (!complete && detectionProgress(recorded.samples).complete)) setSelectedCode(undefined);
    if (samples.length === 0) track("layout_detection_started", { method: "guided_keys" });
    if (!completionTracked.current && detectionProgress(recorded.samples).complete) {
      completionTracked.current = true;
      track("layout_detection_completed", { method: "guided_keys", result: nextInconsistent ? "unknown" : identifyLayout(recorded.samples)?.id ?? "unknown" });
    }
  }

  return (
    <section className="detector-card ph-no-capture" data-private-typing aria-label="Check your keyboard layout">
      <div ref={area} className="detector-input" tabIndex={0} role="group" aria-label="Keyboard detection area" aria-describedby="detector-instruction detector-guidance" onKeyDown={onKeyDown}>
        <div aria-live="polite" aria-atomic="true">
          <p className="detector-step">{inconsistent ? "Input changed" : complete ? "Check complete" : active ? `${progress.count} of 6 positions checked` : "A quick keyboard check"}</p>
          <h2 id="detector-instruction">
            {inconsistent ? "Start again to check one layout"
              : selectedCode ? `Press the ${keyPosition(selectedCode)}`
              : complete ? (result ? `Your input matches ${result.name}` : "No supported layout matched")
              : currentCode ? `Press the ${keyPosition(currentCode)}` : "Find your layout in six key presses"}
          </h2>
          <p className="detector-explanation">
            {inconsistent ? "The same physical key produced different characters. Your input layout or remapping may have changed during the check."
              : complete ? (result?.note ?? "Your input may use another layout, a custom remapping, or a browser that reports positions differently. Confirm it in your system settings.")
              : "Follow the highlighted position on your physical keyboard. Any order works; we’ll guide you through the six positions we need."}
          </p>
        </div>
        <DetectorKeyboard samples={samples} currentCode={currentCode} onSelect={selectKey} />
        <p id="detector-guidance" className="detector-guidance">Blank keys fill with what you type. Click a key to choose a position, then press it on your physical keyboard. Your keyboard’s shape may differ.</p>
        <p className="detector-notice" role="status">{notice || (active ? "Keep typing to fill more keys. Click inside this box to resume." : "A physical keyboard is required. On-screen keyboards cannot be checked reliably.")}</p>
      </div>
      <div className="detector-actions">
        <button type="button" className="detector-button" onClick={start}>{active ? "Start again" : "Check my layout"}</button>
        {complete && !inconsistent ? <Link href={result?.href ?? "#confirm-layout"}>{result?.link ?? "Check your system settings"} <span aria-hidden="true">→</span></Link> : <a href="#confirm-layout">Check in system settings</a>}
      </div>
      <p className="detector-privacy">Key presses stay in your browser. We count checks and layout results, never the characters you type.</p>
    </section>
  );
}
