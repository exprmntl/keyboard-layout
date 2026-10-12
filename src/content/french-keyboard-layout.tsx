import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["german-keyboard-layout", "us-international-keyboard", "keyboard-typing-wrong-letters"],
  introduction: <>
    <p>A French AZERTY keyboard puts <strong>A Z E R T Y</strong> at the start of the top letter row. Compared with US QWERTY, A and Q exchange positions, W and Z exchange positions, and M moves to the home row. Accents and punctuation change much more than those first six letters suggest.</p>
    <p>This guide shows <strong>French (Legacy, AZERTY) on Windows</strong>, the traditional PC arrangement. Belgian AZERTY, Apple French input sources, and newer French standard layouts are different variants. Match the exact input source before relying on a symbol shortcut.<Cite n={1} source={sources.frenchLayout} /></p>
  </>,
  sections: [
    { id: "layout", title: "French AZERTY layout and number row", body: <>
      <ReferenceKeyboard layout="fr" />
      <p>The lower legend on each key is the character produced without Shift. On this layout, the top row types <strong>&amp; é &quot; &apos; ( - è _ ç à</strong> before the final punctuation keys. Hold <strong>Shift</strong> to type the numbers 1 through 0. That is why pressing the key marked 2 may produce é even though the keyboard is working normally.</p>
      <p>The letters Q and M on the home row are another quick clue. A QWERTY user’s usual A position produces Q; the usual semicolon position produces M. The raised marks used to find the home row remain at the F and J positions.</p>
    </> },
    { id: "symbols", title: "Where are @, €, accents and punctuation?", body: <>
      <GuideTable caption="Traditional Windows French AZERTY shortcuts" headings={["Character", "How to type it", "What to check"]} rows={[
        ["é, è, ç, à", "Press the corresponding number-row key without Shift", "These are direct characters, not accent sequences."],
        ["@", "AltGr + 0", "Use the zero/à key. AltGr is normally the right Alt key."],
        ["€", "AltGr + E", "The left Alt key alone is not equivalent."],
        ["ê", "Press the ^ key, release it, then press E", "The circumflex key is a dead key: it waits for a following letter."],
        ["ë", "Shift + the ^ key, release both, then E", "Shift selects the diaeresis accent on that key."],
        ["Full stop (.)", "Shift + the semicolon key", "The unshifted key types a semicolon."],
        ["/", "Shift + the colon key", "The slash is on the bottom letter row."],
      ]} />
      <p>These combinations follow Microsoft’s legacy French mapping.<Cite n={1} source={sources.frenchLayout} /> A dead key does not always show a character immediately: the next compatible letter completes it. For a standalone circumflex, press the accent key followed by Space. Caps Lock behavior is not a substitute for checking the Shift layer.</p>
      <p>For occasional accented text on a US keyboard, <Link href="/learn/us-international-keyboard">US International</Link> is another option. It keeps QWERTY letter positions and adds accent sequences; it does not turn the keyboard into AZERTY.</p>
    </> },
    { id: "setup", title: "Select the matching French input layout", body: <>
      <h3>Windows 11</h3>
      <p>Open <strong>Settings → Time &amp; language → Language &amp; region</strong>. Open the menu for the relevant language, choose <strong>Language options → Add a keyboard</strong>, and select the French variant that matches your keyboard. The traditional mapping above is identified by Microsoft as <strong>French (Legacy, AZERTY)</strong>; the displayed name can vary with Windows version and language. Use <strong>Windows + Space</strong> to select the installed layout.<Cite n={2} source={sources.windows} /></p>
      <h3>Mac and Linux</h3>
      <p>On a Mac, open <strong>System Settings → Keyboard → Text Input → Edit</strong> and add a French input source. Use <strong>Keyboard Viewer</strong> to check its symbol layers; Apple’s French mappings need not match the Windows diagram.<Cite n={3} source={sources.apple} /> In GNOME, open <strong>Settings → Keyboard → Input Sources</strong>, add a French layout and use its preview to choose the variant.<Cite n={4} source={sources.gnome} /></p>
      <p>You can change the typing layout without changing the language of your menus. Keep your previous layout available until you have tested letters, numbers, accents and your usual shortcuts in a blank document.</p>
    </> },
    { id: "mismatch", title: "Why does my French keyboard type QWERTY?", body: <>
      <p>Printed keycaps do not select the computer’s input layout. If the physical A key types Q, the active software mapping may be QWERTY. Check the input indicator and select French, then test again. If the letters match but @ or punctuation does not, compare the regional variant and modifier layer.</p>
      <p>If the problem happens only in a remote desktop or one app, check that environment’s input settings as well. Follow the <Link href="/learn/keyboard-typing-wrong-letters">wrong letters and symbols checklist</Link> before replacing the keyboard or moving keycaps.</p>
    </> },
  ],
};
export default content;
