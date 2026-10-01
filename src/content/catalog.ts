export const articles = {
  "spanish-vs-latin-american-keyboard": {
    path: "/learn/spanish-vs-latin-american-keyboard", title: "Spanish vs Latin American Keyboard Layouts: Ñ, Symbols and Setup",
    description: "Compare Spanish (Spain) and Latin American keyboard diagrams. Find ñ, @, accents, ¿ and ¡, check your active layout, and choose the right input settings.",
    category: "Layout comparison", summary: "Both have Ñ, but their accents and symbols move. Compare the diagrams and find the layout your keyboard is using.",
  },
  "portuguese-vs-brazilian-keyboard": {
    path: "/learn/portuguese-vs-brazilian-keyboard", title: "Portuguese vs Brazilian Keyboard Layouts: Portugal and ABNT2",
    description: "Compare Portuguese (Portugal) with Brazilian ABNT2 keyboard diagrams, ç, accents, @ and punctuation. Learn what ABNT2 means and how to select your input layout.",
    category: "Layout comparison", summary: "Find Ç, accents and punctuation on Portugal and Brazilian keyboards, and understand the ABNT2 name.",
  },
  "colemak-vs-colemak-dh": {
    path: "/compare/colemak-vs-colemak-dh", title: "Colemak vs Colemak-DH: Key Differences, Diagrams and Choosing",
    description: "Compare standard Colemak and Colemak-DH diagrams, D and H positions, Angle Mod and matrix variants. Check which you use and choose the right setup and tutor.",
    category: "Comparison", summary: "See which keys move, why DH changes the center columns, and which diagram matches your keyboard.",
  },
  dvorak: {
    path: "/learn/dvorak",
    title: "How to Learn Dvorak: A Beginner’s Guide",
    description: "Learn the Dvorak home row, build a manageable practice routine, and set up Dvorak on Windows, Mac, or Linux. Start with a browser-based trial.",
    category: "Beginner guide",
    summary: "Find your home row, learn the new positions, and make the move from practice to everyday typing.",
  },
  colemak: {
    path: "/learn/colemak",
    title: "How to Learn Colemak: A Beginner’s Guide",
    description: "Learn standard Colemak, understand how it differs from Colemak-DH, and get practical practice and setup advice for Windows, Mac, and Linux.",
    category: "Beginner guide",
    summary: "Build on your QWERTY habits, choose the right variant, and learn Colemak one stage at a time.",
  },
  comparison: {
    path: "/compare/qwerty-dvorak-colemak",
    title: "QWERTY vs. Dvorak vs. Colemak: Which Layout Should You Use?",
    description: "Compare QWERTY, Dvorak, and Colemak by learning effort, shortcuts, everyday compatibility, and the limits of typing-speed and comfort claims.",
    category: "Comparison",
    summary: "Compare the tradeoffs that matter in daily use, from shortcuts and setup to learning effort.",
  },
  history: {
    path: "/learn/history",
    title: "A History of Keyboard Layouts: From QWERTY to Dvorak and Colemak",
    description: "Follow keyboard layouts from early typewriters to QWERTY, Dvorak, international standards, Colemak, and programmable keyboards—with sources and context.",
    category: "History",
    summary: "The inventions, competing ideas, and everyday habits behind the keys we use today.",
  },
  "french-keyboard-layout": {
    path: "/learn/french-keyboard-layout", title: "French AZERTY Keyboard Layout: Keys, Accents and Setup",
    description: "See the traditional French AZERTY layout, find @, €, accents and numbers, and select the right French keyboard input source on your computer.",
    category: "Layout reference", summary: "Find French accents and symbols, understand the number row, and check the exact AZERTY variant you use.",
  },
  "german-keyboard-layout": {
    path: "/learn/german-keyboard-layout", title: "German QWERTZ Keyboard Layout: Symbols, Umlauts and Setup",
    description: "A German QWERTZ keyboard diagram with umlauts, ß, @, €, brackets and AltGr shortcuts, plus setup and swapped Y/Z troubleshooting.",
    category: "Layout reference", summary: "Locate umlauts, brackets and AltGr symbols, and understand why Y and Z exchange places.",
  },
  "us-vs-uk-keyboard": {
    path: "/learn/us-vs-uk-keyboard", title: "US vs UK Keyboard Layouts: Symbols, Key Shapes and Switching",
    description: "Compare US and UK keyboard diagrams, @ and quote positions, £, #, Enter and Shift. Check your active input layout and fix swapped symbols.",
    category: "Comparison", summary: "Compare the punctuation and physical keys that distinguish two otherwise familiar QWERTY layouts.",
  },
  "us-international-keyboard": {
    path: "/learn/us-international-keyboard", title: "US International Keyboard: Accents, Dead Keys and Setup",
    description: "Type é, ñ, ü and ç with the Windows US International keyboard. Learn dead-key sequences, literal apostrophes, right-Alt shortcuts and how to switch back.",
    category: "Typing guide", summary: "Add accents to US QWERTY and understand why an apostrophe sometimes waits for the next key.",
  },
  "keyboard-typing-wrong-letters": {
    path: "/learn/keyboard-typing-wrong-letters", title: "Keyboard Typing the Wrong Letters or Symbols? Start Here",
    description: "Troubleshoot swapped letters, wrong symbols, delayed apostrophes and unexpected numbers. Check input layouts, modifiers, remapping and hardware in order.",
    category: "Troubleshooting", summary: "Use the pattern of wrong characters to check your input layout, app settings, modifiers and keyboard.",
  },
  "keyboard-layout-charts": {
    path: "/learn/keyboard-layout-charts", title: "Printable Keyboard Layout Charts: QWERTY, Dvorak and Colemak",
    description: "Download a free three-page PDF of US QWERTY, standard Dvorak and Colemak keyboard charts, with Shift symbols, number rows and home-row references.",
    category: "Printable reference", summary: "Download three clear desk references with character positions, Shift symbols and home-row finger anchors.",
  },
} as const;

export type ArticleId = keyof typeof articles;

export const guidesIndex = {
  path: "/learn",
  title: "Keyboard Layout Guides",
  description: "Keyboard layout diagrams, international symbols, troubleshooting and printable charts, alongside Dvorak and Colemak learning guides and keyboard history.",
};
