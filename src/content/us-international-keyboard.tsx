import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["us-vs-uk-keyboard", "french-keyboard-layout", "keyboard-typing-wrong-letters"],
  introduction: <>
    <p><strong>United States-International</strong> keeps US QWERTY letter positions and adds ways to type accents and other characters. Its most noticeable change is that an apostrophe or quotation mark can wait for the next key instead of appearing immediately. That is a <strong>dead key</strong> working as intended.</p>
    <p>The examples below are for the <strong>Windows United States-International</strong> input layout. Mac and Linux offer related accent-entry options, but their names and combinations are not identical.<Cite n={1} source={sources.usInternational} /></p>
  </>,
  sections: [
    { id: "layout", title: "What changes from regular US QWERTY?", body: <>
      <ReferenceKeyboard layout="us" />
      <p>Use the US diagram for the base positions. On US International, <strong>apostrophe, double quote, grave accent, tilde and circumflex</strong> act as dead keys in the relevant layer. They are drawn here in their usual positions, but pressing one may begin an accent sequence rather than immediately insert the symbol.</p>
      <p>The distinction is the input mapping, not a special piece of hardware. An ordinary US keyboard can use either US or US International. Letter keys stay in the same places, so the top row still reads QWERTY.</p>
    </> },
    { id: "accents", title: "How to type é, ñ, ü and other accents", body: <>
      <p>Press and release the accent first, then press the letter. These are consecutive presses, not a chord with the letter. Hold Shift only where the accent itself requires it, then release Shift before a lowercase letter.</p>
      <GuideTable caption="Windows US International accent sequences" headings={["Accent", "Sequence", "Example"]} rows={[
        ["Acute", "Apostrophe, then a compatible vowel", "' then e → é"],
        ["Grave", "Grave accent (`), then a compatible vowel", "` then a → à"],
        ["Circumflex", "Shift + 6 (^), release, then a compatible vowel", "^ then o → ô"],
        ["Diaeresis", "Double quote (Shift + apostrophe), release, then a compatible vowel", "\" then u → ü"],
        ["Tilde", "Shift + grave accent (~), release, then n, a or o", "~ then n → ñ"],
        ["Cedilla", "Apostrophe, then c", "' then c → ç"],
      ]} />
      <p>For an uppercase accented letter, start the same accent sequence and make the second letter uppercase: apostrophe, then Shift + E produces É. Not every accent combines with every letter; use your system’s character picker when the desired character is not in this mapping.<Cite n={1} source={sources.usInternational} /></p>
    </> },
    { id: "apostrophe", title: "Why does the apostrophe need a second key?", body: <>
      <p>The layout is waiting to see whether you want an accent. To type a literal apostrophe, press <strong>apostrophe, then Space</strong>. The Space completes the punctuation character; it does not add a separate trailing space in that sequence. Double quote followed by Space gives a literal quotation mark. The same approach works for the standalone accent symbols.</p>
      <p>For example, typing an apostrophe immediately before E can create é. If you want the two separate characters &apos;e, complete the apostrophe with Space before typing E. This matters in code, shell commands and quoted text, where punctuation is part of the syntax.</p>
      <p>If you rarely need accents and frequently type code, keeping ordinary <strong>US</strong> available may be more comfortable. Switch input layouts for the task rather than assuming that delayed punctuation means the keyboard is broken.</p>
    </> },
    { id: "right-alt", title: "Useful right-Alt combinations", body: <>
      <GuideTable caption="Windows US International right-Alt layer" headings={["Character", "Combination"]} rows={[
        ["é", "Right Alt + E"], ["ñ", "Right Alt + N"], ["ü", "Right Alt + Y"],
        ["ç", "Right Alt + comma"], ["¿", "Right Alt + slash"], ["¡", "Right Alt + 1"], ["€", "Right Alt + 5"],
      ]} />
      <p>Use the <strong>right</strong> Alt key, often called AltGr. These are mapping-specific combinations; they differ from German or French AltGr shortcuts. Microsoft’s interactive reference lets you inspect the full right-Alt and Shift layers.<Cite n={1} source={sources.usInternational} /></p>
    </> },
    { id: "setup", title: "Enable US International or switch back to US", body: <>
      <ol>
        <li>In Windows 11, open <strong>Settings → Time &amp; language → Language &amp; region</strong>.</li>
        <li>Open <strong>Language options</strong> for the relevant English language entry.</li>
        <li>Under keyboards, choose <strong>Add a keyboard → United States-International</strong>.</li>
        <li>Press <strong>Windows + Space</strong> to select it, then test an accent and a literal apostrophe in a blank document.</li>
      </ol>
      <p>To stop dead-key behavior, select the ordinary <strong>US</strong> layout instead. Add US first if it is missing. Once you have confirmed the replacement, you can remove an unused layout from the same keyboard list to reduce accidental switching.<Cite n={2} source={sources.windows} /></p>
      <p>On a Mac, inspect the available sources under <strong>Keyboard → Text Input → Edit</strong> and use Keyboard Viewer for the chosen source’s Option and Shift layers.<Cite n={3} source={sources.apple} /> Linux desktop environments offer several US international variants, including variants with different dead-key behavior; inspect the preview and full variant name.<Cite n={4} source={sources.gnome} /></p>
      <p>If the problem is @ and double quotes exchanging places rather than waiting for another key, compare <Link href="/learn/us-vs-uk-keyboard">US and UK input layouts</Link>. For other unexpected output, follow the <Link href="/learn/keyboard-typing-wrong-letters">troubleshooting checklist</Link>.</p>
    </> },
  ],
};
export default content;
