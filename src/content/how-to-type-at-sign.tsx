import Link from "next/link";
import type { ArticleContent } from "@/components/guides/Article";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["french-keyboard-layout", "us-vs-uk-keyboard", "how-to-type-hash-sign"],
  introduction: <p>Choose the layout shown in your computer’s input menu. Two keyboards can both say AZERTY and put the at sign on different keys.</p>,
  sections: [
    { id: "windows", title: "Find @ on Windows", body: <>
      <GuideTable compact caption="Windows shortcuts for @" headings={["Input layout", "Keys to press"]} rows={[
        ["German (Germany)", "AltGr + Q"],
        ["French (Legacy, AZERTY)", "AltGr + 0 (the à key)"],
        ["French (Standard, AZERTY)", "Press the key immediately left of 1"],
        ["United Kingdom", "Shift + apostrophe (the ' key)"],
        ["US", "Shift + 2"],
        ["Spanish (Spain)", "AltGr + 2"],
        ["Latin American", "AltGr + Q"],
      ]} />
      <p><strong>AltGr</strong> is usually the Alt key to the right of the space bar. Hold it while pressing the other key. On legacy French AZERTY, press the à/0 key directly with AltGr; adding Shift selects a different layer.</p>
      <p>If you’re unsure which French layout is active, tap the key immediately left of 1. It types ² on <a href={sources.frenchLayout.url}>French Legacy</a> and @ on <a href={sources.frenchStandard.url}>French Standard</a>.</p>
    </> },
    { id: "mac", title: "Find @ on a Mac", body: <>
      <GuideTable compact caption="Shortcuts for Apple input sources" headings={["Input source", "Keys to press"]} rows={[
        ["German", "Option + L"],
        ["Swiss German", "Option + G"],
        ["French", "Press the @ key to the left of 1 on a French Apple keyboard"],
        ["British or U.S.", "Shift + 2"],
      ]} />
      <p>Option is marked <strong>⌥</strong>. If you plugged a PC keyboard into a Mac, open Keyboard Viewer from the Input menu and hold Option or Shift to see where @ appears on the selected <a href={sources.apple.url}>Mac input source</a>.</p>
    </> },
    { id: "double-quote", title: "Why does Shift + 2 type a double quote?", body: <>
      <p>That is the expected result on a Windows UK keyboard. To finish typing an email address, hold Shift and press the apostrophe key. If your keycaps have @ printed above 2 and you want them to match, press Windows + Space and select US if it’s installed.</p>
      <p>For other mismatches, <Link href="/keyboard-layout-detector">check your active layout</Link> before changing the keyboard settings.</p>
    </> },
  ],
};

export default content;
