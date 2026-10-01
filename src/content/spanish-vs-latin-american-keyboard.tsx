import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["portuguese-vs-brazilian-keyboard", "us-international-keyboard", "keyboard-typing-wrong-letters"],
  introduction: <>
    <p><strong>Spanish (Spain) and Spanish (Latin America) both use QWERTY letters and a dedicated Ñ key.</strong> The useful differences are around the accents, brackets and number row. Seeing Ñ alone does not tell you which layout is active.</p>
    <p>The diagrams and shortcuts here use the standard <strong>Windows Spanish and Latin American mappings</strong>. “Latin American” is the input-layout name, not a description of every keyboard sold in the region. Apple and custom input sources can differ.<Cite n={1} source={sources.regionalMappings} /></p>
    <p>Not sure which one you have? <Link href="/keyboard-layout-detector">Check your active keyboard layout</Link> using physical key positions and a few symbols.</p>
  </>,
  sections: [
    { id: "differences", title: "Spanish vs Latin American: the main differences", body: <>
      <GuideTable caption="Standard Windows input mappings" headings={["Character or position", "Spanish (Spain)", "Spanish (Latin America)"]} rows={[
        ["Ñ", "Immediately right of L", "Immediately right of L"],
        ["@", "AltGr + 2", "AltGr + Q"],
        ["Shift + 3", "Middle dot (·)", "Number sign (#)"],
        ["Last character key before Backspace", "¡; Shift produces ¿", "¿; Shift produces ¡"],
        ["Acute accent (´)", "Key immediately right of Ñ", "First key right of P"],
        ["Key immediately right of Ñ", "Acute accent / diaeresis", "{; Shift produces ["],
        ["Ç", "Dedicated key beside Enter", "No dedicated Ç key in the base layer"],
      ]} />
      <p>AltGr means the right Alt key. The left Alt key is not a universal substitute. If @ appears in an unexpected place, compare the active input source with your keycaps before changing the system language or replacing the keyboard.</p>
    </> },
    { id: "diagrams", title: "Spanish and Latin American keyboard diagrams", body: <>
      <h3>Spanish (Spain)</h3><ReferenceKeyboard layout="es" />
      <h3>Spanish (Latin America)</h3><ReferenceKeyboard layout="latam" />
      <p>The diagrams include the extra character key beside the left Shift found on typical ISO keyboards. Enter and modifier shapes are omitted. Accent symbols show their positions; a dead accent key waits for the next letter instead of immediately printing the accent.</p>
      <p>Both layouts put Ñ after L. Compare the acute-accent position and the inverted punctuation near Backspace: those differences are more useful for identification than typing the word “qwerty.”</p>
    </> },
    { id: "accents", title: "How to type ñ, á, ü, ¿ and ¡", body: <>
      <ul>
        <li><strong>ñ / Ñ:</strong> press the Ñ key; hold Shift for uppercase.</li>
        <li><strong>á, é, í, ó, ú:</strong> press and release the acute-accent key, then the vowel. Spain puts this key beside Ñ; Latin America puts it beside P.</li>
        <li><strong>ü:</strong> hold Shift while pressing that accent key to select the diaeresis (¨), release both, then press U.</li>
        <li><strong>¿ / ¡:</strong> use the final character key before Backspace. The unshifted and Shift characters are reversed between these two layouts.</li>
        <li><strong>A standalone accent:</strong> press the accent, then Space.</li>
      </ul>
      <p>For an uppercase accented vowel, enter the accent first and then hold Shift with the vowel. These sequences apply to the mappings above; an input method, remapping utility or a different operating-system variant may behave differently.</p>
    </> },
    { id: "setup", title: "Choose Spanish or Latin American input", body: <>
      <p>On <strong>Windows 11</strong>, open Settings → Time &amp; language → Language &amp; region. Open the relevant language’s Language options, then choose Add a keyboard and select <strong>Spanish</strong> or <strong>Latin American</strong>. Press Windows + Space to switch. The language of your menus can stay the same.<Cite n={2} source={sources.windows} /></p>
      <p>On <strong>macOS</strong>, use System Settings → Keyboard → Text Input → Edit. Add the intended Spanish input source, then inspect it in Keyboard Viewer. In particular, Spanish – ISO and Latin American sources should not be treated as interchangeable.<Cite n={3} source={sources.apple} /></p>
      <p>On <strong>GNOME Linux</strong>, open Settings → Keyboard → Input Sources, add the appropriate Spanish or Latin American source, and inspect the layout preview. Distribution and variant names differ.<Cite n={4} source={sources.gnome} /></p>
      <p>Keep your existing input source available until you have tested Ñ, an accented vowel and @ in a blank document. If symbols still disagree, follow the <Link href="/learn/keyboard-typing-wrong-letters">wrong-character checklist</Link>.</p>
    </> },
    { id: "choose", title: "Which should you use?", body: <>
      <p>Choose the layout that matches your keycaps and the computers you regularly use. Both handle ordinary Spanish writing; neither is inherently faster. If you have a US keyboard and want to keep its printed positions, <Link href="/learn/us-international-keyboard">US International</Link> is another way to type Spanish accents, with a different dead-key workflow.</p>
      <p>The <Link href="/keyboard-layout-detector">detector</Link> checks what reaches your browser. It cannot infer your country, read printed legends or identify a keyboard brand.</p>
    </> },
  ],
};
export default content;
