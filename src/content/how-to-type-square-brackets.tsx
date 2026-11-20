import type { ArticleContent } from "@/components/guides/Article";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["german-keyboard-layout", "french-keyboard-layout", "how-to-type-at-sign"],
  introduction: <p>To type a pair such as <code>[1]</code>, enter the opening bracket, release the modifier to type 1, then use the closing shortcut. On a US or UK keyboard the two bracket keys sit immediately to the right of P.</p>,
  sections: [
    { id: "windows", title: "Opening and closing brackets on Windows", body: <>
      <GuideTable compact caption="Windows shortcuts for each half of the pair" headings={["Input layout", "Open [", "Close ]"]} rows={[
        ["German (Germany)", "AltGr + 8", "AltGr + 9"],
        ["Swiss German", "AltGr + ü", "AltGr + ¨ (right of ü)"],
        ["French (Legacy, AZERTY)", "AltGr + 5", "AltGr + the ) key beside 0"],
        ["French (Standard, AZERTY)", "AltGr + 5", "AltGr + 6"],
        ["US or United Kingdom", "First key right of P", "Second key right of P"],
      ]} />
      <p>Hold the right Alt key for AltGr. On <a href={sources.germanLayout.url}>German input</a>, Shift + 8 and Shift + 9 give round parentheses. Use AltGr with those same two keys for square brackets.</p>
      <p>On French AZERTY, look for the parentheses printed on the number row. The closing parenthesis is beside 0 on <a href={sources.frenchLayout.url}>Legacy</a> and on the 6 key on <a href={sources.frenchStandard.url}>Standard</a>.</p>
    </> },
    { id: "mac", title: "Opening and closing brackets on a Mac", body: <>
      <GuideTable compact caption="Shortcuts for Apple input sources" headings={["Input source", "Open [", "Close ]"]} rows={[
        ["German or Swiss German", "Option + 5", "Option + 6"],
        ["French", "Option + Shift + (", "Option + Shift + )"],
        ["U.S. or British", "First key right of P", "Second key right of P"],
      ]} />
      <p>On the French Apple layout, hold Option and Shift together, then tap the key marked ( or ). If you get curly braces, keep Shift held as well as Option. You can see both layers change in <a href={sources.apple.url}>Keyboard Viewer</a>.</p>
    </> },
  ],
};

export default content;
