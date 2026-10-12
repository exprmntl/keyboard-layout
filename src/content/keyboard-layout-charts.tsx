import Link from "next/link";
import { type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";

const content: ArticleContent = {
  related: ["dvorak", "colemak", "us-vs-uk-keyboard"],
  introduction: <>
    <p>Keep a keyboard layout chart beside your screen while you learn new positions. This printable pack contains <strong>US QWERTY, standard US Dvorak and standard Colemak</strong>, with one layout per page. Each sheet includes the number row, punctuation, Shift characters and home-row finger anchors.</p>
    <p><a className="guide-download" href="/downloads/keyboard-layout-charts.pdf" download>Download all three keyboard charts (PDF)</a></p>
    <p>The diagrams below preview the same character mappings used in the PDF. They show the main character area on a US ANSI keyboard. Function keys, the navigation cluster and the numeric keypad are omitted.</p>
  </>,
  sections: [
    { id: "qwerty", title: "US QWERTY chart", body: <>
      <ReferenceKeyboard layout="us" />
      <p>Rest the left hand on <strong>A S D F</strong> and the right hand on <strong>J K L ;</strong>. The index fingers reach inward to G and H. The bumps on the physical F and J keys help you find those starting positions without looking down.</p>
      <p>This is the standard US punctuation arrangement: Shift + 2 produces @ and Shift + 3 produces #. If those symbols differ on your keyboard, check the <Link href="/learn/us-vs-uk-keyboard">US vs UK comparison</Link> before using this chart as a symbol reference.</p>
    </> },
    { id: "dvorak", title: "Standard US Dvorak chart", body: <>
      <ReferenceKeyboard layout="dvorak" />
      <p>Rest the left hand on <strong>A O E U</strong> and the right hand on <strong>H T N S</strong>. The index fingers reach inward to I and D. The familiar physical F and J bump positions now produce <strong>U and H</strong>.</p>
      <p>The first three top-row character keys are apostrophe, comma and period. Brackets move to the right end of the number row. Check those positions as well as the letters: punctuation is part of learning the layout.</p>
      <p>Use the chart with the <Link href="/dvorak">Dvorak simulator</Link> or follow the <Link href="/learn/dvorak">Dvorak learning guide</Link>. This sheet is not Programmer Dvorak or either one-handed variant.</p>
    </> },
    { id: "colemak", title: "Standard Colemak chart", body: <>
      <ReferenceKeyboard layout="colemak" />
      <p>Rest the left hand on <strong>A R S T</strong> and the right hand on <strong>N E I O</strong>. The index fingers reach inward to D and H. The physical F and J bump positions become <strong>T and N</strong>.</p>
      <p>This sheet matches the <Link href="/colemak">standard Colemak simulator</Link>. It does not show Colemak-DH, an angle modification or a special arrangement for a split keyboard. Caps Lock remapping is also outside the character chart. Read the <Link href="/learn/colemak#choose-a-variant">variant guidance</Link> before starting practice.</p>
    </> },
    { id: "printing", title: "Print a readable desk reference", body: <>
      <ol>
        <li>Download the PDF and choose the page you need: QWERTY is page 1, Dvorak page 2 and Colemak page 3.</li>
        <li>Choose landscape orientation. The sheets are A4 landscape; use <strong>Fit to printable area</strong> when printing on US Letter or another paper size.</li>
        <li>Print in black and white if preferred. Home-row shading is light, and all characters remain dark.</li>
        <li>Place the chart near your screen. Check a forgotten position, then return your attention to the text you are typing.</li>
      </ol>
      <p>The upper symbol on a key is its Shift character; the lower symbol is unshifted. The outline is a reference diagram, not a scale drawing for cutting replacement keycap labels. Printing or downloading a chart does not change your computer’s input layout.</p>
      <p>For international references, see the <Link href="/learn/french-keyboard-layout">French AZERTY</Link> and <Link href="/learn/german-keyboard-layout">German QWERTZ</Link> diagrams. Their symbol positions differ from this US-based pack.</p>
    </> },
  ],
};
export default content;
