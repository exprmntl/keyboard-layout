// Position/character evidence describes the active input mapping, not the hardware.
// Mapping sources and deliberate ambiguities: docs/layout-detection.md.
export const detectionCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY"] as const;

export const detectionFamilies = [
  { id: "qwerty", name: "QWERTY", keys: ["q", "w", "e", "r", "t", "y"],
    note: "The letters match QWERTY, but the regional variant is unconfirmed. Check the exact input source in system settings.",
    href: "#confirm-layout", link: "Confirm your regional layout" },
  { id: "azerty", name: "AZERTY", keys: ["a", "z", "e", "r", "t", "y"],
    note: "This is an AZERTY family match. French, Belgian and other variants place symbols differently; confirm the exact input source in system settings.",
    href: "/learn/french-keyboard-layout", link: "Explore French AZERTY" },
  { id: "qwertz", name: "QWERTZ", keys: ["q", "w", "e", "r", "t", "z"],
    note: "This is a QWERTZ family match. German, Swiss and other variants place symbols differently; confirm the exact input source in system settings.",
    href: "/learn/german-keyboard-layout", link: "Explore German QWERTZ" },
  { id: "dvorak", name: "Dvorak", keys: ["'", ",", ".", "p", "y", "f"],
    note: "These positions match the Dvorak family. Regional and custom variants can differ elsewhere.",
    href: "/learn/dvorak", link: "Dvorak practice and setup guide" },
  { id: "colemak", name: "Colemak family", keys: ["q", "w", "f", "p", "g", "j"],
    note: "The top row matches Colemak, but the remaining positions are unconfirmed. Check your input source before choosing a tutor.",
    href: "/compare/colemak-vs-colemak-dh", link: "Compare Colemak and Colemak-DH" },
  { id: "colemak-dh", name: "Colemak-DH family", keys: ["q", "w", "f", "p", "b", "j"],
    note: "The top row matches the Colemak-DH family. DHk, Wide and custom mappings can differ; confirm the exact variant in your input settings.",
    href: "/compare/colemak-vs-colemak-dh", link: "Compare Colemak and Colemak-DH" },
] as const;

export type DetectionFamily = typeof detectionFamilies[number]["id"];
export type DetectionResultId = DetectionFamily | "us" | "uk" | "us-international" | "spanish" | "latin-american" | "portuguese" | "brazilian";
export type DetectionResult = { id: DetectionResultId; name: string; note: string; href: string; link: string };
export type DetectionProbe = { code: string; shift?: boolean };
export type DetectionSample = DetectionProbe & { key: string };
export type DetectionInput = DetectionSample & {
  repeat?: boolean; shiftKey?: boolean; altKey?: boolean; ctrlKey?: boolean;
  metaKey?: boolean; isComposing?: boolean;
};
type InputCheck =
  | { kind: "accepted"; sample: DetectionSample }
  | { kind: "ignored" }
  | { kind: "notice"; message: string };

export const probeId = ({ code, shift }: DetectionProbe) => `${shift ? "Shift+" : ""}${code}`;
const normalize = (key: string) => key === "Dead" ? key : key.toLowerCase();
const qwertyLetters = Object.fromEntries(Array.from("abcdefghijklmnopqrstuvwxyz").map(key => [`Key${key.toUpperCase()}`, key]));
const colemakLetters = Object.fromEntries(Array.from("qwertyuiopasdfghjkl;zxcvbnm").map((key, index) => [key === ";" ? "Semicolon" : `Key${key.toUpperCase()}`, "qwfpgjluy;arstdhneiozxcvbkm"[index]]));

type Profile = { family: DetectionFamily; result: DetectionResult; required: Record<string, string>; extra: Record<string, string> };
const regionalNote = "These letter and symbol positions match this layout. Other mappings can share them; this checks the active input, not your keycaps or keyboard model.";
function regional(id: DetectionResultId, name: string, href: string, required: Record<string, string>, extra: Record<string, string> = {}, note = regionalNote): Profile {
  return { family: "qwerty", result: { id, name, href, note, link: "See the layout and setup guide" }, required, extra: { ...qwertyLetters, ...extra } };
}

const profiles: Profile[] = [
  regional("us", "US QWERTY", "/learn/us-vs-uk-keyboard", { Semicolon: ";", BracketLeft: "[", Quote: "'", "Shift+Digit2": "@", "Shift+Digit3": "#" }, { Equal: "=", BracketRight: "]", Backquote: "`" }),
  regional("uk", "UK QWERTY", "/learn/us-vs-uk-keyboard", { Semicolon: ";", BracketLeft: "[", Quote: "'", "Shift+Digit2": '"', "Shift+Digit3": "£" }, { Equal: "=", BracketRight: "]" }, "These positions match the UK PC layout. Apple British uses some different symbols; the guide compares both."),
  regional("uk", "UK QWERTY (Apple British)", "/learn/us-vs-uk-keyboard", { Semicolon: ";", BracketLeft: "[", Quote: "'", "Shift+Digit2": "@", "Shift+Digit3": "£" }, { Equal: "=", BracketRight: "]" }),
  regional("us-international", "US International-style QWERTY", "/learn/us-international-keyboard", { Semicolon: ";", BracketLeft: "[", Quote: "Dead", Backquote: "Dead", "Shift+Digit2": "@", "Shift+Digit3": "#" }, { Equal: "=", BracketRight: "]" }, "The US letter positions and dead keys match US International-style input. Apple U.S. International – PC and Brazilian – Pro share these tested positions. Confirm the exact name in system settings; this is different from Brazilian ABNT2."),
  regional("spanish", "Spanish (Spain)", "/learn/spanish-vs-latin-american-keyboard", { Semicolon: "ñ", Equal: "¡", BracketRight: "+", "Shift+Digit3": "·" }, { "Shift+Digit2": '"', Slash: "-" }),
  regional("latin-american", "Spanish (Latin America)", "/learn/spanish-vs-latin-american-keyboard", { Semicolon: "ñ", Equal: "¿", BracketRight: "+", "Shift+Digit3": "#" }, { Quote: "{", "Shift+Digit2": '"', Slash: "-" }),
  regional("portuguese", "Portuguese (Portugal)", "/learn/portuguese-vs-brazilian-keyboard", { Semicolon: "ç", Equal: "«", BracketLeft: "+", Quote: "º" }, { "Shift+Digit2": '"', "Shift+Digit3": "#", Slash: "-" }),
  regional("brazilian", "Brazilian Portuguese (ABNT / ABNT2)", "/learn/portuguese-vs-brazilian-keyboard", { Semicolon: "ç", Equal: "=", BracketRight: "[", Quote: "Dead" }, { "Shift+Digit2": "@", "Shift+Digit3": "#", Slash: ";" }, "These positions match Brazilian ABNT / ABNT2 input. The two share the tested character keys, so this check cannot distinguish their hardware or number-pad differences."),
  { family: "colemak", result: { id: "colemak", name: "Standard Colemak", note: "The top row and D, H and M positions match standard Colemak. Colemak-DH moves these keys. Symbol layers and Caps Lock behavior can still vary.", href: "/compare/colemak-vs-colemak-dh", link: "Compare Colemak and Colemak-DH" }, required: { KeyG: "d", KeyH: "h", KeyM: "m" }, extra: colemakLetters },
  // ANSI, ISO and matrix DH share these confirmation positions. Their left
  // bottom rows differ, so those positions intentionally do not imply geometry.
  { family: "colemak-dh", result: { id: "colemak-dh", name: "Colemak-DH", note: "The top row and G, M and H positions match current Colemak-DH (formerly DHm). ANSI, ISO and matrix versions share these checks; use the diagram for your keyboard when practicing.", href: "/compare/colemak-vs-colemak-dh", link: "Compare Colemak and Colemak-DH" }, required: { KeyG: "g", KeyH: "m", KeyM: "h" }, extra: { KeyA: "a", KeyS: "r", KeyD: "s", KeyF: "t", KeyJ: "n", KeyK: "e", KeyL: "i", Semicolon: "o", KeyN: "k" } },
];

export function checkDetectionInput(input: DetectionInput): InputCheck {
  if (input.repeat || input.ctrlKey || input.metaKey) return { kind: "ignored" };
  if (input.isComposing || ["Process", "Unidentified"].includes(input.key)) {
    return { kind: "notice", message: "Finish the accent or input-method composition, then try the highlighted key again. If it keeps happening, check your system settings below." };
  }
  if (input.key.length !== 1 && input.key !== "Dead") return { kind: "ignored" };
  if (input.altKey) return { kind: "notice", message: "Release Alt/Option or AltGr, then try again. Use Shift only when the prompt asks for it." };
  if (!input.code || input.code === "Unidentified") {
    return { kind: "notice", message: "Your browser is not reporting physical key positions. Use a physical keyboard, or check your system settings below." };
  }
  if (!/^(Key[A-Z]|Digit[0-9]|Backquote|Minus|Equal|BracketLeft|BracketRight|Backslash|IntlBackslash|IntlRo|IntlYen|Semicolon|Quote|Comma|Period|Slash|Space)$/.test(input.code)) return { kind: "ignored" };
  return { kind: "accepted", sample: { code: input.code, key: input.key, ...(input.shiftKey ? { shift: true } : {}) } };
}

export function recordDetectionSample(samples: readonly DetectionSample[], sample: DetectionSample) {
  const previous = samples.find(item => probeId(item) === probeId(sample));
  return {
    samples: [...samples.filter(item => probeId(item) !== probeId(sample)), sample],
    changed: !!previous && normalize(previous.key) !== normalize(sample.key),
  };
}

const probeOrder = ["Semicolon", "Equal", "BracketLeft", "BracketRight", "Quote", "Shift+Digit2", "Shift+Digit3", "Backquote", "KeyG", "KeyH", "KeyM"];
function fromId(id: string): DetectionProbe {
  return id.startsWith("Shift+") ? { code: id.slice(6), shift: true } : { code: id };
}

export function detectionProgress(samples: readonly DetectionSample[]) {
  const observed = new Map<string, string>();
  let conflicting = false;
  for (const sample of samples) {
    const id = probeId(sample), key = normalize(sample.key);
    if (observed.has(id) && observed.get(id) !== key) conflicting = true;
    observed.set(id, key);
  }
  const remaining = detectionCodes.filter(code => !observed.has(code));
  const family = detectionFamilies.find(item => detectionCodes.every((code, index) => observed.get(code) === item.keys[index]));
  const base = { count: detectionCodes.length - remaining.length, family, result: undefined as DetectionResult | undefined, exact: false, remaining: 0 };
  if (remaining.length) return { ...base, complete: false, phase: "letters" as const, nextProbe: { code: remaining[0] } as DetectionProbe };
  if (!family || conflicting) return { ...base, complete: true, phase: "done" as const, nextProbe: undefined };
  const supported = profiles.filter(profile => profile.family === family.id);
  const candidates = supported.filter(profile => {
    const mapping = { ...profile.extra, ...profile.required };
    return Array.from(observed).every(([id, key]) => mapping[id] === undefined || mapping[id] === key);
  });
  const match = candidates.find(profile => Object.entries(profile.required).every(([id, key]) => observed.get(id) === key));
  if (match || !candidates.length) return { ...base, result: match?.result ?? family, exact: !!match, complete: true, phase: "done" as const, nextProbe: undefined };
  const needed = new Set(candidates.flatMap(profile => Object.keys(profile.required)).filter(id => !observed.has(id)));
  const next = probeOrder.find(id => needed.has(id))!;
  return { ...base, complete: false, phase: "variant" as const, nextProbe: fromId(next), remaining: needed.size };
}

export function identifyLayout(samples: readonly DetectionSample[]) {
  return detectionProgress(samples).result;
}
