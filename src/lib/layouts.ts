// Public routes and copy live together; key mappings remain in keyboards/.
export const layouts = {
  qwerty: {
    name: "QWERTY",
    path: "/",
    summary: "The familiar layout used on most English-language keyboards.",
    heading: "Keyboard Layout Simulator",
    introduction: "Try QWERTY, Dvorak and Colemak. Just start typing.",
    title: "Keyboard Layout Tester — QWERTY, Dvorak & Colemak",
    description: "Try QWERTY, Dvorak and Colemak with a free online keyboard layout tester. Practice typing with key hints, without downloads or changing your keyboard settings.",
  },
  dvorak: {
    name: "Dvorak",
    path: "/dvorak",
    summary: "An alternative layout that puts common English letters on the home row.",
    heading: "Dvorak Keyboard Simulator",
    introduction: "Try Dvorak on your keyboard. Just start typing.",
    title: "Dvorak Keyboard Tester — Free Online Typing Practice",
    description: "Try Dvorak online with a free keyboard simulator. Learn the layout and practice typing with on-screen key hints, without changing your keyboard settings.",
  },
  colemak: {
    name: "Colemak",
    path: "/colemak",
    summary: "An alternative layout that keeps many familiar QWERTY key positions.",
    heading: "Colemak Keyboard Simulator",
    introduction: "Try Colemak on your keyboard. Just start typing.",
    title: "Colemak Keyboard Tester — Free Online Typing Practice",
    description: "Try Colemak online with a free keyboard simulator. Learn the layout and practice typing with on-screen key hints, without changing your keyboard settings.",
  },
} as const;

export type LayoutName = keyof typeof layouts;

export function layoutForPathname(pathname: string): LayoutName {
  if (pathname === "/dvorak") return "dvorak";
  if (pathname === "/colemak") return "colemak";
  return "qwerty";
}
