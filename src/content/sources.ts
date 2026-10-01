export type Source = { title: string; url: string; note: string };

export const sources = {
  regionalMappings: { title: "Microsoft VS Code: keyboard layout mappings", url: "https://github.com/microsoft/vscode/tree/a37ac69a11d0e4f533ff766ba4876864c91d3a2e/src/vs/workbench/services/keybinding/browser/keyboardLayouts", note: "Windows Spanish, Latin American, Portuguese and Brazilian mappings, plus macOS British and Spanish ISO references." },
  brazilLayout: { title: "Keyboard Layout Info: Portuguese (Brazil ABNT / ABNT2)", url: "https://kbdlayout.info/kbdbr", note: "Character positions and layout identifiers extracted from Windows KBDBR.DLL; ABNT and ABNT2 share the main character mapping." },
  dhMappings: { title: "Colemak Mod-DH: ANSI, ISO and matrix mappings", url: "https://github.com/ColemakMods/mod-dh/tree/d9398d57695089658841f3dc62827ae814aef8c4/klc", note: "Official public-domain mapping files for the current DH arrangement." },
  frenchLayout: { title: "Microsoft: French (Legacy, AZERTY) keyboard", url: "https://learn.microsoft.com/en-us/globalization/keyboards/kbdfr", note: "Windows layout 0000040C, including unshifted, Shift and AltGr layers." },
  germanLayout: { title: "Microsoft: German keyboard", url: "https://learn.microsoft.com/en-us/globalization/keyboards/kbdgr", note: "Windows layout 00000407; not the Swiss German layout." },
  ukLayout: { title: "Microsoft: United Kingdom keyboard", url: "https://learn.microsoft.com/en-us/globalization/keyboards/kbduk", note: "Windows layout 00000809; Apple British input sources differ." },
  usInternational: { title: "Microsoft: United States-International keyboard", url: "https://learn.microsoft.com/en-us/globalization/keyboards/kbdusx", note: "Windows layout 00020409, including dead keys and right-Alt combinations." },
  patent: {
    title: "August Dvorak and William L. Dealey, Typewriter keyboard (US 2,040,248)",
    url: "https://patents.google.com/patent/US2040248A/en",
    note: "Primary record: filed May 21, 1932; granted May 12, 1936.",
  },
  sholes: {
    title: "Christopher Latham Sholes, Improvement in type-writing machines (US 207,559)",
    url: "https://patents.google.com/patent/US207559A/en",
    note: "Primary record: 1878 patent and keyboard drawing.",
  },
  smithsonian: {
    title: "The QWERTY Keyboard Will Never Die. Where Did the 150-Year-Old Design Come From?",
    url: "https://www.smithsonianmag.com/history/the-qwerty-keyboard-will-never-die-where-did-the-150-year-old-design-come-from-49863249/",
    note: "Jimmy Stamp; updated by Ellen Wexler, Smithsonian Magazine, February 25, 2025. Discusses competing origin accounts, including the Yasuokas’ telegraph hypothesis.",
  },
  colemak: {
    title: "Colemak: introduction and layout",
    url: "https://colemak.com/",
    note: "The project’s own description and layout diagram. Its performance and health claims are advocacy, not independent clinical evidence.",
  },
  faq: {
    title: "Colemak FAQ",
    url: "https://colemak.com/FAQ",
    note: "Primary source for the creator, January 1, 2006 release, design choices, and Windows 11 24H2 availability.",
  },
  learn: {
    title: "Colemak learning resources",
    url: "https://colemak.com/Learn",
    note: "Project recommendations for tutors, short practice sessions, and retaining QWERTY. Individual learning times vary.",
  },
  dh: {
    title: "Colemak Mod-DH",
    url: "https://colemakmods.github.io/mod-dh/",
    note: "The variant’s design, diagrams, and history, including the October 2014 launch.",
  },
  apple: {
    title: "Apple: Write in another language on Mac",
    url: "https://support.apple.com/guide/mac-help/write-in-another-language-on-mac-mchlp1406/mac",
    note: "Current input-source settings, Keyboard Viewer, and switching shortcuts.",
  },
  windows: {
    title: "Microsoft: Manage the language and keyboard/input layout settings in Windows",
    url: "https://support.microsoft.com/en-us/windows/hardware/input-devices/manage-the-language-and-keyboard-input-layout-settings-in-windows",
    note: "Windows 11 keyboard installation and selection through Settings.",
  },
  gnome: {
    title: "GNOME Help: Use alternative keyboard layouts",
    url: "https://help.gnome.org/gnome-help/keyboard-layouts.html",
    note: "Input sources, layout previews, and shortcuts on GNOME desktops.",
  },
  norman: {
    title: "Donald A. Norman and Diane Fisher, Why Alphabetic Keyboards Are Not Easy to Use: Keyboard Layout Doesn’t Much Matter",
    url: "https://doi.org/10.1177/001872088202400502",
    note: "Human Factors 24(5), 1982, pp. 509–519. The public abstract describes computer simulation of expert typing; it is not a modern clinical trial or a Colemak comparison.",
  },
  afnor: {
    title: "AFNOR: French keyboard—a voluntary standard to make it easier to type all characters",
    url: "https://www.afnor.org/en/news/electrotechnologies/french-keyboard-voluntary-standard/",
    note: "Published April 3, 2019; updated June 4, 2026. Explains NF Z71-300, improved AZERTY, and Bépo.",
  },
  unicode: {
    title: "Unicode glossary: Input Method Editor",
    url: "https://www.unicode.org/glossary/#input_method_editor",
    note: "Defines input methods that turn keystrokes or other input into candidate characters and words.",
  },
  qmk: {
    title: "QMK: Keymap overview",
    url: "https://docs.qmk.fm/keymap",
    note: "Primary documentation for base layouts, keycodes, and programmable layers.",
  },
} satisfies Record<string, Source>;
