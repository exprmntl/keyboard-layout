import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import LayoutDiagram from "@/components/guides/LayoutDiagram";
import { sources } from "./sources";

const content: ArticleContent = {
  introduction: <>
    <p>Colemak is worth a look if you are curious about alternative layouts but want to keep some familiar QWERTY positions. Many letters move, especially around the home row, while several common editing shortcuts stay where your hands expect them.</p>
    <p>You can <Link href="/colemak">try standard Colemak in the simulator</Link> before changing your computer’s settings. This guide explains which Colemak you are looking at, how to begin practicing, and what to check before using it for everyday work.</p>
  </>,
  sections: [
    { id: "what-is-colemak", title: "What is Colemak?", body: <>
      <p>Colemak is a keyboard layout created by Shai Coleman and released on January 1, 2006. It was designed for English touch typing, with an emphasis on reducing awkward movement while preserving parts of QWERTY that people already know.<Cite n={1} source={sources.faq} /></p>
      <LayoutDiagram layout="colemak" />
      <p>The home row’s ten main letters are <strong>A R S T D H N E I O</strong>. Common letters such as E and N move onto that row. A stays in its familiar position, as do Q, W, Z, X, C, V, B, and M. On a US keyboard, standard Colemak also retains most punctuation positions.</p>
      <p>The often-quoted “17 changed keys” counts the letter and semicolon positions that differ from US QWERTY. It is not a count of every possible system remapping: Caps Lock behavior, extra symbol layers, and national variants are separate questions.<Cite n={1} source={sources.faq} /></p>
      <p>Colemak keeps Z, X, C, and V together, which preserves the usual physical positions for undo, cut, copy, and paste. It does not preserve every shortcut. Save, find, and many editor commands involve letters that move.</p>
    </> },
    { id: "choose-a-variant", title: "Choose standard Colemak or Colemak-DH before you practice", body: <>
      <p><strong>Standard Colemak</strong> is the layout shown above and supported by this simulator. <strong>Colemak-DH</strong> is a later modification that changes some positions to reduce use of the home row’s center columns, particularly for D and H. Its documentation includes arrangements for different keyboard geometries.<Cite n={2} source={sources.dh} /></p>
      <p>Neither name describes a particular brand or shape of keyboard. You can use either on compatible ordinary or programmable keyboards, but the diagram, tutor, and installed mapping need to agree.</p>
      <p>If you already know you want DH, choose a DH-specific tutor and the appropriate mapping for your hardware. Practicing standard Colemak here will not reproduce the DH arrangement. If you are simply exploring alternatives, standard Colemak is a reasonable place to begin because it is what the simulator demonstrates and what standard operating-system Colemak options provide.</p>
      <p>Check this once at the beginning. Our <Link href="/compare/colemak-vs-colemak-dh">Colemak vs Colemak-DH comparison</Link> shows the positions side by side, and the <Link href="/keyboard-layout-detector">layout detector</Link> checks which mapping your keyboard sends. Repeatedly changing variants while learning makes it harder to distinguish a forgotten position from a newly moved key.</p>
    </> },
    { id: "home-row", title: "Find the home row on your existing keyboard", body: <>
      <p>The raised marks on the physical F and J keys are still your anchors. In Colemak, those positions type <strong>T and N</strong>. Rest the left hand on A, R, S, T and the right hand on N, E, I, O. Your index fingers reach inward to D and H.</p>
      <p>That means your fingers rest in familiar physical places while the letter assignments change. A word like <strong>start</strong> uses the home row, as do <strong>other, train,</strong> and <strong>reason</strong>. You will still need all three rows for everyday writing.</p>
      <p>Open the <Link href="/colemak">Colemak simulator</Link> and enable key hints with the lightbulb. Work slowly through a few words. If an old QWERTY movement takes over, pause and find the intended position on the diagram before continuing.</p>
      <p>Changing the option here affects only the practice area. To type Colemak in another app, enable it in your system settings. The simulator uses complete words rather than a sequence of home-row lessons; a progressive tutor is useful alongside it when you are starting from scratch.</p>
    </> },
    { id: "practice", title: "A practical learning routine", body: <>
      <p>The Colemak project recommends short daily practice and provides a list of tutors.<Cite n={3} source={sources.learn} /> Start with a session length you can repeat comfortably—about ten minutes is a useful starting point—and increase only if the practice stays focused.</p>
      <h3>First, learn the changed positions</h3>
      <p>Use a tutor that explicitly supports standard Colemak. The <a href="https://colemak.com/Learn">official learning page</a> lists several choices. Follow its sequence and prioritize accurate, deliberate presses over speed. Keep the diagram visible on your screen instead of relabeling every key immediately.</p>
      <p>The unchanged letters are helpful, but the familiar physical keyboard can also trigger the wrong habit. When you repeatedly confuse two letters, name the letter you want, find its new position, and make a few correct repetitions before returning to mixed text.</p>
      <h3>Then, practice whole words and sentences</h3>
      <p>Once you recognize the positions, use mixed text to connect them into movements. Include capitals and punctuation. After setting up Colemak outside the browser, try a small task such as writing a journal entry or a personal email draft.</p>
      <p>Make a separate check of commands you use often: save, find, select all, undo, copy, and paste. The familiar Z/X/C/V cluster can make a transition feel easier, but it should not hide the rest of your workflow.</p>
      <h3>Finally, track useful progress</h3>
      <p>Look for fewer hesitations, fewer corrections, and a growing ability to think about the sentence rather than its letters. If you record speed, use the same testing conditions each time. A result on a short list of easy words is not directly comparable with prose, punctuation, or code.</p>
      <p>There is no fixed number of days in which everyone becomes fluent. Previous touch-typing experience, practice frequency, and how much you use the layout outside lessons all affect the transition. Let reliable everyday use be the milestone.</p>
    </> },
    { id: "setup", title: "Set up Colemak on your computer", body: <>
      <p>Keep your existing layout available while learning. Adding an input layout does not require replacing your keyboard or changing the language of your computer’s menus.</p>
      <h3>Windows 11 version 24H2 and later</h3>
      <p>Colemak is included starting with Windows 11 24H2, according to the project’s current documentation.<Cite n={1} source={sources.faq} /> Open <strong>Settings → Time &amp; language → Language &amp; region</strong>, open your English language’s <strong>Language options</strong>, then select <strong>Add a keyboard</strong> and choose Colemak. Use <strong>Windows + Space</strong> to switch between installed layouts.<Cite n={4} source={sources.windows} /></p>
      <p>If Colemak is missing, check your Windows version and the available English input options. For older Windows versions, the <a href="https://colemak.com/Windows">official Colemak Windows page</a> provides installation options. A managed work computer may restrict additional layouts or software; the browser simulator still lets you try the arrangement.</p>
      <h3>macOS</h3>
      <p>Open <strong>System Settings → Keyboard → Text Input → Edit</strong>. Use the add button, find <strong>Colemak</strong>, and add it. Select it from the menu bar’s Input menu. <strong>Control + Space</strong> normally selects your previous input source; Keyboard Viewer shows the active mapping.<Cite n={5} source={sources.apple} /></p>
      <h3>Linux with GNOME</h3>
      <p>Open <strong>Settings → Keyboard → Input Sources → Add Input Source</strong>. Find the English Colemak option and preview its layout. Use <strong>Super + Space</strong> to move between input sources. Exact naming and available variants depend on your desktop and installed keyboard data; GNOME’s instructions also explain how to expose less common variants.<Cite n={6} source={sources.gnome} /></p>
      <p>After setup, type a harmless sentence in a blank document and try switching back. Check punctuation as well as letters. Your selected national variant and your keyboard’s printed legends may differ.</p>
    </> },
    { id: "caps-lock", title: "What about Caps Lock and Backspace?", body: <>
      <p>The Colemak project recommends using the Caps Lock position as an extra Backspace key.<Cite n={1} source={sources.faq} /> That recommendation is related to the layout, but it is not implemented identically by every operating system or installer.</p>
      <p><strong>This simulator does not remap Caps Lock to Backspace.</strong> Use the ordinary Backspace key to correct practice text. If you want the Caps Lock remapping in everyday use, check your system’s modifier settings or the particular implementation you install.</p>
      <p>You can learn the letter positions before deciding on that remap. Keep the two changes separate in your mind so an unexpected Caps Lock behavior does not look like a problem with the entire layout.</p>
    </> },
    { id: "transition", title: "Move into everyday use at a manageable pace", body: <>
      <p>A separate practice session lets you keep QWERTY for work until Colemak feels usable. Then try one low-pressure task in Colemak and expand gradually. A complete switch gives you more exposure, but also slows down every task while you learn.</p>
      <p>If you often use shared computers, keep some QWERTY typing in your week. You may find the layouts interfere at first; the Colemak FAQ describes varied experiences rather than a universal outcome.<Cite n={1} source={sources.faq} /> Retaining QWERTY is a practical skill, not a failure to commit.</p>
      <p>Judge the result by your own writing: whether the movements feel comfortable, whether you can use your shortcuts, and whether you are willing to maintain the setup. A layout’s design goals do not guarantee faster typing or pain relief. Stop practice that hurts and seek medical advice for persistent symptoms.</p>
      <p>For your next session, <Link href="/colemak">open standard Colemak</Link>, turn on hints, and aim for a few carefully typed words. If you are still choosing between layouts, the <Link href="/compare/qwerty-dvorak-colemak">comparison guide</Link> puts the tradeoffs side by side.</p>
    </> },
  ],
};

export default content;
