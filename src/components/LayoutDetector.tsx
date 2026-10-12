"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { checkDetectionInput, detectionProgress, recordDetectionSample, type DetectionSample } from "@/lib/layout-detection";
import DetectorKeyboard, { keyPosition } from "@/components/DetectorKeyboard";
import { track } from "@/lib/analytics";

export default function LayoutDetector() {
  const [active, setActive] = useState(false);
  const [samples, setSamples] = useState<DetectionSample[]>([]);
  const [notice, setNotice] = useState("");
  const [selectedCode, setSelectedCode] = useState<string>();
  const [inconsistent, setInconsistent] = useState(false);
  const [familyOnly, setFamilyOnly] = useState(false);
  const completionTracked = useRef(false);
  const area = useRef<HTMLDivElement>(null);
  const progress = detectionProgress(samples);
  const complete = progress.complete || familyOnly;
  const result = !inconsistent ? (familyOnly ? progress.family : progress.result) : undefined;
  const nextProbe = !complete ? progress.nextProbe : undefined;
  const currentCode = active && !inconsistent ? selectedCode ?? nextProbe?.code : undefined;
  const needsShift = currentCode === nextProbe?.code && !!nextProbe?.shift;
  const refining = !complete && !inconsistent && progress.phase === "variant";
  const family = refining ? progress.family : undefined;
  const keyInstruction = currentCode ? `${needsShift ? "Hold Shift and press" : "Press"} the ${keyPosition(currentCode)}` : undefined;
  const separateInstruction = refining || (complete && !!currentCode);

  function start() {
    setSamples([]);
    setNotice("");
    setSelectedCode(undefined);
    setInconsistent(false);
    setFamilyOnly(false);
    completionTracked.current = false;
    setActive(true);
    area.current?.focus({ preventScroll: true });
    area.current?.scrollIntoView({ block: "start", behavior: "smooth" });
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
    const next = detectionProgress(recorded.samples);
    setNotice(checked.sample.key === "Dead" ? "Accent key recorded. It waits for a second character during normal typing; here, just follow the next highlight."
      : nextProbe && checked.sample.code === nextProbe.code && !!checked.sample.shift !== !!nextProbe.shift ? (nextProbe.shift ? "Hold Shift while pressing this position." : "Release Shift and press this position again.") : "");
    if (checked.sample.code === selectedCode || (!complete && next.complete)) setSelectedCode(undefined);
    if (samples.length === 0) track("layout_detection_started", { method: "guided_keys" });
    if (!completionTracked.current && next.complete) {
      completionTracked.current = true;
      track("layout_detection_completed", { method: "guided_keys", result: nextInconsistent ? "unknown" : next.result?.id ?? "unknown", match_level: nextInconsistent || !next.result ? "unknown" : next.exact ? "variant" : "family" });
    }
  }

  return (
    <section className="detector-card ph-no-capture" data-private-typing aria-label="Check your keyboard layout">
      <div ref={area} className="detector-input" tabIndex={0} role="group" aria-label="Keyboard detection area" aria-describedby={`detector-instruction detector-guidance${separateInstruction ? " detector-next-key" : ""}`} onKeyDown={onKeyDown}>
        <div aria-live="polite" aria-atomic="true">
          <p className="detector-step">{inconsistent ? "Input changed" : complete ? "Check complete" : family ? "Layout detected" : active ? `${progress.count} of 6 letter positions checked` : "A quick keyboard check"}</p>
          <h2 id="detector-instruction">
            {inconsistent ? "Start again to check one layout"
              : family ? `Your keyboard layout is ${family.name.endsWith(" family") ? "in the " : ""}${family.name}`
              : complete ? (result ? `Your input matches ${result.name}` : "No supported layout matched")
              : keyInstruction ?? "Find the layout you’re using"}
          </h2>
          <p className="detector-explanation">
            {inconsistent ? "The same physical key produced different characters. Your input layout or remapping may have changed during the check."
              : complete ? (result?.note ?? "Your input may use another layout, a custom remapping, or a browser that reports positions differently. Confirm it in your system settings.")
              : family ? "You can stop here, or check a few more keys to identify the specific variant."
              : "Check six letter positions to find your layout. You can then choose to check its variant. Follow the highlight on your physical keyboard; any order works."}
          </p>
          {separateInstruction && keyInstruction ? <div className="detector-next-key">
            <p className="detector-next-label">{refining ? "Optional: check the variant" : "Fill another key"}</p>
            <p id="detector-next-key">{keyInstruction}</p>
            {refining ? <p className="detector-next-hint">{needsShift ? "Hold either Shift key for this check." : "Press without Shift or Alt/Option."}</p> : null}
          </div> : null}
        </div>
        <DetectorKeyboard samples={samples} currentCode={currentCode} needsShift={needsShift} onSelect={selectKey} />
        <p id="detector-guidance" className="detector-guidance">Keys fill with what you type; Shift characters appear above. Click a key to choose a position, then press it on your physical keyboard. The diagram is schematic; your key shapes may differ.</p>
        <p className="detector-notice" role="status">{notice || (active ? "Keep typing to fill more keys. Click inside this box to resume." : "A physical keyboard is required. On-screen keyboards cannot be checked reliably.")}</p>
      </div>
      <div className="detector-actions">
        <button type="button" className="detector-button" onClick={start}>{active ? "Start again" : "Check my layout"}</button>
        {complete && !inconsistent ? <Link href={result?.href ?? "#confirm-layout"}>{result?.link ?? "Check your system settings"}</Link> : <a href="#confirm-layout">Check in system settings</a>}
        {!complete && !inconsistent && progress.family ? <button className="detector-skip" type="button" onClick={() => {
          setFamilyOnly(true); setSelectedCode(undefined); setNotice("");
          if (!completionTracked.current) {
            completionTracked.current = true;
            track("layout_detection_completed", { method: "guided_keys", result: progress.family!.id, match_level: "family" });
          }
        }}>Finish here</button> : null}
      </div>
      <p className="detector-privacy">Key presses stay in your browser. We count checks and layout results, never the characters you type.</p>
    </section>
  );
}
