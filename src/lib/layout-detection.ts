// These physical positions identify families, not regional variants or hardware.
export const detectionCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY"] as const;

export const detectionFamilies = [
  { id: "qwerty", name: "QWERTY", keys: ["q", "w", "e", "r", "t", "y"],
    note: "US, UK and many other regional layouts share these letter positions. Check your input settings to confirm the exact variant.",
    href: "/", link: "Explore the layout simulator" },
  { id: "azerty", name: "AZERTY", keys: ["a", "z", "e", "r", "t", "y"],
    note: "French and Belgian layouts can share these letters while placing symbols differently. Check your input settings to confirm the exact variant.",
    href: "#confirm-layout", link: "Confirm your regional layout" },
  { id: "qwertz", name: "QWERTZ", keys: ["q", "w", "e", "r", "t", "z"],
    note: "German, Swiss and other layouts can share these letters. This check does not identify the country or symbol arrangement.",
    href: "#confirm-layout", link: "Confirm your regional layout" },
  { id: "dvorak", name: "Dvorak", keys: ["'", ",", ".", "p", "y", "f"],
    note: "These positions match the Dvorak family. Check your input settings for the exact variant before choosing a tutor.",
    href: "/learn/dvorak", link: "Dvorak practice and setup guide" },
  { id: "colemak", name: "Colemak", keys: ["q", "w", "f", "p", "g", "j"],
    note: "Standard Colemak and Colemak-DH share these positions. Check your input settings to confirm which variant you use.",
    href: "/learn/colemak", link: "Colemak variants and setup guide" },
] as const;

export type DetectionFamily = typeof detectionFamilies[number]["id"];
export type DetectionSample = { code: string; key: string };
export type DetectionInput = DetectionSample & {
  repeat?: boolean; shiftKey?: boolean; altKey?: boolean; ctrlKey?: boolean;
  metaKey?: boolean; isComposing?: boolean;
};
type InputCheck =
  | { kind: "accepted"; sample: DetectionSample }
  | { kind: "ignored" }
  | { kind: "notice"; message: string };

export function checkDetectionInput(input: DetectionInput): InputCheck {
  if (input.repeat) return { kind: "ignored" };
  if (input.ctrlKey || input.metaKey) return { kind: "ignored" };
  if (input.isComposing || ["Dead", "Process", "Unidentified"].includes(input.key)) {
    return { kind: "notice", message: "This input method cannot be checked reliably here. Check your layout in your system settings below." };
  }
  // Navigation keys keep their normal behavior, including Shift+Tab and Escape.
  if (input.key.length !== 1) return { kind: "ignored" };
  if (input.shiftKey || input.altKey) return { kind: "notice", message: "Release Shift and Alt/Option, then press the highlighted key." };
  if (!input.code || input.code === "Unidentified") {
    return { kind: "notice", message: "Your browser is not reporting physical key positions. Use a physical keyboard, or check your system settings below." };
  }
  // Record the main typing area, including extra keys, without counting navigation
  // or numpad keys as evidence for the six required physical positions.
  if (!/^(Key[A-Z]|Digit[0-9]|Backquote|Minus|Equal|BracketLeft|BracketRight|Backslash|IntlBackslash|IntlRo|IntlYen|Semicolon|Quote|Comma|Period|Slash|Space)$/.test(input.code)) return { kind: "ignored" };
  return { kind: "accepted", sample: { code: input.code, key: input.key } };
}

export function recordDetectionSample(samples: readonly DetectionSample[], sample: DetectionSample) {
  const previous = samples.find(item => item.code === sample.code);
  return {
    samples: [...samples.filter(item => item.code !== sample.code), sample],
    changed: !!previous && previous.key.toLowerCase() !== sample.key.toLowerCase(),
  };
}

export function detectionProgress(samples: readonly DetectionSample[]) {
  const observed = new Set(samples.map(sample => sample.code));
  const remaining = detectionCodes.filter(code => !observed.has(code));
  return { count: detectionCodes.length - remaining.length, nextCode: remaining[0], complete: remaining.length === 0 };
}

export function identifyLayout(samples: readonly DetectionSample[]) {
  const observed = new Map<string, string>();
  for (const { code, key } of samples) {
    const normalized = key.toLowerCase();
    if (observed.has(code) && observed.get(code) !== normalized) return undefined;
    observed.set(code, normalized);
  }
  return detectionFamilies.find(family => detectionCodes.every((code, index) => observed.get(code) === family.keys[index]));
}
