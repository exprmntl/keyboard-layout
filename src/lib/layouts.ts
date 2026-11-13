// Public routes and copy live together; key mappings remain in keyboards/.
export const layouts = {
  qwerty: {
    name: "QWERTY",
    path: "/",
    summary: "The familiar layout used on most English-language keyboards.",
    heading: "Keyboard Layout Simulator",
    introduction: "Try QWERTY, Dvorak and Colemak with free typing practice.",
    title: "Keyboard Layout Simulator — QWERTY, Dvorak & Colemak",
    description: "Try QWERTY, Dvorak and Colemak in a free online keyboard simulator. Practice typing with key hints, without changing your keyboard settings.",
  },
  dvorak: {
    name: "Dvorak",
    path: "/dvorak",
    summary: "An alternative layout that puts common English letters on the home row.",
    heading: "Dvorak Keyboard Simulator",
    introduction: "Try Dvorak with free typing practice on your keyboard.",
    title: "Dvorak Keyboard Simulator — Free Online Typing Practice",
    description: "Try Dvorak online with a free keyboard simulator. Learn the layout and practice typing with on-screen key hints, without changing your keyboard settings.",
  },
  colemak: {
    name: "Colemak",
    path: "/colemak",
    summary: "An alternative layout that keeps many familiar QWERTY key positions.",
    heading: "Colemak Keyboard Simulator",
    introduction: "Try Colemak with free typing practice on your keyboard.",
    title: "Colemak Keyboard Simulator — Free Online Typing Practice",
    description: "Try Colemak online with a free keyboard simulator. Learn the layout and practice typing with on-screen key hints, without changing your keyboard settings.",
  },
} as const;

export type LayoutName = keyof typeof layouts;

export function layoutForPathname(pathname: string): LayoutName {
  if (pathname === "/dvorak") return "dvorak";
  if (pathname === "/colemak") return "colemak";
  return "qwerty";
}
