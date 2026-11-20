import Link from "next/link";
import type { ArticleContent } from "@/components/guides/Article";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["us-vs-uk-keyboard", "french-keyboard-layout", "how-to-type-at-sign"],
  introduction: <p>The hash sign is the character in <code>#music</code> or <code>#1</code>. If Shift + 3 gives you £, your keyboard is producing the British currency symbol. You can type # with the same input layout.</p>,
  sections: [
    { id: "windows", title: "Where is the # key on Windows?", body: <>
      <GuideTable compact caption="Windows shortcuts for #" headings={["Input layout", "Keys to press"]} rows={[
        ["United Kingdom", "Press the # / ~ key beside Enter"],
        ["US", "Shift + 3"],
        ["German (Germany)", "Press the # key immediately right of Ä"],
        ["French (Legacy, AZERTY)", "AltGr + 3"],
        ["French (Standard, AZERTY)", "Shift + the @ key, immediately left of 1"],
      ]} />
      <p>On a typical <a href={sources.ukLayout.url}>UK PC keyboard</a>, find the apostrophe key on the home row, then move one key to the right. A plain press types # and Shift gives ~. If you’re using a US physical keyboard with UK input, the same character is usually on the US backslash key above Enter.</p>
      <p>On French keyboards the shortcut depends on whether Windows shows <a href={sources.frenchLayout.url}>French (Legacy, AZERTY)</a> or <a href={sources.frenchStandard.url}>French (Standard, AZERTY)</a>.</p>
    </> },
    { id: "mac", title: "How to type # on a Mac", body: <>
      <GuideTable compact caption="Shortcuts for Apple input sources" headings={["Input source", "Keys to press"]} rows={[
        ["British", "Option + 3"],
        ["U.S.", "Shift + 3"],
        ["French", "Shift + the @ key to the left of 1 on a French Apple keyboard"],
        ["German", "Press the # key immediately right of Ä"],
      ]} />
      <p>On a British Mac, the 3 key may only show 3 and £. Hold Option (⌥) and tap 3 once to type #. If you use an external keyboard or the input menu says British – PC, use <a href={sources.apple.url}>Keyboard Viewer</a> to check the mapping for that source.</p>
    </> },
    { id: "check-layout", title: "What if the key marked # types something else?", body: <>
      <p>Check whether more than one key disagrees with its label. For example, if the # key on a UK PC keyboard types a backslash and Shift + 3 types #, those two results point to US input. <Link href="/learn/us-vs-uk-keyboard">Compare the US and UK key positions</Link> to choose the layout that matches your keyboard.</p>
    </> },
  ],
};

export default content;
