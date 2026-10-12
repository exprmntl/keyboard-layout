import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["us-international-keyboard", "keyboard-typing-wrong-letters", "keyboard-layout-charts"],
  introduction: <>
    <p>US and UK keyboards share the same QWERTY letter positions. The differences you usually notice are <strong>@, double quotes, £, # and backslash</strong>, along with the shape of Enter and the length of the left Shift key. Identifying the letter family alone will not tell you which one is active.</p>
    <p>This comparison uses the standard <strong>US and Windows United Kingdom PC layouts</strong>. Apple British input sources have their own symbol combinations, so check Keyboard Viewer on a Mac instead of applying every Windows shortcut below.<Cite n={1} source={sources.ukLayout} /></p>
  </>,
  sections: [
    { id: "differences", title: "US vs UK: the symbol differences", body: <>
      <GuideTable caption="Standard US and Windows UK PC mappings" headings={["Character or key", "US", "UK"]} rows={[
        ["@", "Shift + 2", "Shift + the apostrophe key"],
        ["Double quote (\")", "Shift + the apostrophe key", "Shift + 2"],
        ["Shift + 3", "#", "£"],
        ["#", "Shift + 3", "Dedicated key beside Enter"],
        ["Backslash (\\)", "Key above Enter on a typical ANSI keyboard", "Extra key beside the left Shift on a typical ISO keyboard"],
        ["Enter key shape", "Usually a wide, single-row rectangle (ANSI)", "Usually a tall, stepped key (ISO)"],
        ["Left Shift", "Usually longer", "Usually shorter, making room for an extra key"],
      ]} />
      <p>The Enter and Shift differences describe common physical keyboards. <strong>ANSI and ISO are physical arrangements; US and UK are input mappings.</strong> You can select UK input on an ANSI keyboard, but the missing or differently placed physical keys can make some symbols less convenient.</p>
    </> },
    { id: "diagrams", title: "Compare the character positions", body: <>
      <h3>US QWERTY</h3><ReferenceKeyboard layout="us" />
      <h3>UK QWERTY</h3><ReferenceKeyboard layout="uk" />
      <p>The letters are unchanged. Compare the upper legends on 2 and 3, then look beside Enter and left Shift. These diagrams show character positions rather than the exact outline of a particular laptop or desktop keyboard.</p>
      <p>For a desk reference, use the <Link href="/learn/keyboard-layout-charts">printable US QWERTY chart</Link>. The downloadable pack is explicitly US-based; it is not a UK symbol chart.</p>
    </> },
    { id: "check", title: "How to tell which layout is active", body: <>
      <ol>
        <li>Open a blank document, away from a password or sensitive form.</li>
        <li>Press Shift + 2. On standard US it types @; on Windows UK it types a double quote.</li>
        <li>Press Shift + 3. Standard US produces #; Windows UK produces £.</li>
        <li>Check the input indicator and exact layout name to confirm the result.</li>
      </ol>
      <p>This distinguishes these two standard mappings; it is not a universal layout detector. Custom remapping, Apple layouts and other English-language variants can produce different results. Printed symbols tell you what the hardware was labeled for, while this check tells you what the active software mapping produces.</p>
    </> },
    { id: "switch", title: "Fix swapped @ and double quotes", body: <>
      <p>In Windows 11, press <strong>Windows + Space</strong> and select the intended layout. If it is missing, open <strong>Settings → Time &amp; language → Language &amp; region → Language options → Add a keyboard</strong> under the relevant language. Choose <strong>US</strong> or <strong>United Kingdom</strong>, then test the symbols again.<Cite n={2} source={sources.windows} /></p>
      <p>On a Mac, open <strong>System Settings → Keyboard → Text Input → Edit</strong>, choose the appropriate source, and use <strong>Show Keyboard Viewer</strong> from the Input menu. The Option and Shift layers can differ from a PC mapping even when the language is the same.<Cite n={3} source={sources.apple} /></p>
      <p>You do not need to change the system’s display language just to change where @ appears. Keep the previous input source until the replacement works, especially if you use remote desktops or share the computer.</p>
    </> },
    { id: "choose", title: "Which layout should you use?", body: <>
      <p>Choose the mapping that matches your keycaps and the computers you regularly use, unless you have a specific reason to learn a different one. Neither arrangement changes the QWERTY alphabet positions, and there is no automatic typing-speed advantage from choosing US over UK.</p>
      <p>If your real goal is typing accented letters on US QWERTY, read about <Link href="/learn/us-international-keyboard">US International and its dead keys</Link>. If the mismatch extends beyond these symbols, use the <Link href="/learn/keyboard-typing-wrong-letters">wrong-character checklist</Link>.</p>
    </> },
  ],
};
export default content;
