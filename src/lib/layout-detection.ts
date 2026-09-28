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

export function checkDetectionInput(input: DetectionInput, step: number): InputCheck {
  if (step < 0 || step >= detectionCodes.length || input.repeat) return { kind: "ignored" };
  if (input.ctrlKey || input.metaKey) return { kind: "ignored" };
  if (input.shiftKey || input.altKey) return { kind: "notice", message: "Release Shift and Alt/Option, then press the highlighted key." };
  if (input.isComposing || ["Dead", "Process", "Unidentified"].includes(input.key)) {
    return { kind: "notice", message: "This input method cannot be checked reliably here. Check your layout in your system settings below." };
  }
  if (!input.code || input.code === "Unidentified") {
    return { kind: "notice", message: "Your browser is not reporting physical key positions. Use a physical keyboard, or check your system settings below." };
  }
  // Navigation keys keep their normal behavior, including Tab and Escape.
  if (input.key.length !== 1) return { kind: "ignored" };
  if (input.code !== detectionCodes[step]) {
    return { kind: "notice", message: "Press the highlighted position on your physical keyboard, regardless of the letter printed on it." };
  }
  return { kind: "accepted", sample: { code: input.code, key: input.key.toLowerCase() } };
}

export function identifyLayout(samples: readonly DetectionSample[]) {
  if (samples.length !== detectionCodes.length) return undefined;
  return detectionFamilies.find(family => samples.every((sample, index) =>
    sample.code === detectionCodes[index] && sample.key.toLowerCase() === family.keys[index]
  ));
}
