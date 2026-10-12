import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["spanish-vs-latin-american-keyboard", "us-international-keyboard", "keyboard-typing-wrong-letters"],
  introduction: <>
    <p><strong>Portuguese (Portugal) and Brazilian Portuguese keyboards both have QWERTY letters and a dedicated Ç key.</strong> Their accents, brackets, @ and punctuation are arranged differently. A Brazilian ABNT2 keyboard is not the same layout as a Portugal keyboard.</p>
    <p>This guide compares the standard <strong>Windows Portuguese and Brazilian ABNT2 character mappings</strong>. Apple’s Brazilian – Pro input source is a different arrangement; a Portuguese-language computer does not necessarily use either diagram below.<Cite n={1} source={sources.regionalMappings} /></p>
    <p>Use the <Link href="/keyboard-layout-detector">keyboard layout detector</Link> to check the letters and symbols your current input source sends.</p>
  </>,
  sections: [
    { id: "differences", title: "Portugal vs Brazil: where the symbols move", body: <>
      <GuideTable caption="Standard Windows Portuguese and Brazilian mappings" headings={["Character or position", "Portuguese (Portugal)", "Brazilian ABNT2"]} rows={[
        ["Ç", "Immediately right of L", "Immediately right of L"],
        ["@", "AltGr + 2", "Shift + 2"],
        ["Last character key before Backspace", "«; Shift produces »", "=; Shift produces +"],
        ["First key right of P", "+; Shift produces *", "Acute accent; Shift selects grave accent"],
        ["Key immediately right of Ç", "º; Shift produces ª", "Tilde; Shift selects circumflex"],
        ["Final regular bottom-row position", "-; Shift produces _", ";; Shift produces :"],
        ["Slash and question mark", "Shift + 7 for /; Shift + apostrophe for ?", "Extra key near right Shift: / and Shift + / for ?"],
      ]} />
      <p>On the Brazilian mapping, / and ? are also available through AltGr + Q and AltGr + W. These can help on hardware without the extra character key. The complete mapping depends on the selected input source, not just the language shown in the taskbar.<Cite n={2} source={sources.brazilLayout} /></p>
    </> },
    { id: "diagrams", title: "Portuguese and Brazilian ABNT2 keyboard diagrams", body: <>
      <h3>Portuguese (Portugal)</h3><ReferenceKeyboard layout="pt" />
      <h3>Brazilian Portuguese (ABNT2)</h3><ReferenceKeyboard layout="br" />
      <p>The Brazilian diagram includes the extra / and ? position near right Shift. These are character diagrams, not drawings of a particular laptop: Enter, Shift and number-pad shapes vary. Accent legends indicate positions; some begin a dead-key sequence.</p>
    </> },
    { id: "abnt2", title: "What does ABNT2 mean?", body: <>
      <p>ABNT and ABNT2 are names you will encounter in Brazilian keyboard settings and hardware descriptions. Windows exposes separate layout identifiers, while the main character mapping is shared in KBDBR.DLL.<Cite n={2} source={sources.brazilLayout} /></p>
      <p>That is why our detector reports <strong>Brazilian Portuguese (ABNT / ABNT2)</strong> from these character checks. It does not claim to distinguish number-pad behavior or physical hardware. For the exact installed name, open your operating system’s input settings.</p>
      <p><strong>Brazilian – Pro on a Mac is different.</strong> Its US-like letters, punctuation and dead keys can match the US International-style checks. Do not choose an ABNT2 typing diagram just because the input source or your system language says Brazilian.</p>
    </> },
    { id: "accents", title: "Type ç, ã, õ, á and ê", body: <>
      <p>For <strong>ç</strong>, use the dedicated key after L; add Shift for Ç. For accented vowels, press and release the accent first, then the vowel. For example, tilde followed by A produces ã, and tilde followed by O produces õ.</p>
      <ul>
        <li><strong>Portugal:</strong> the acute/grave key is the second key right of P. The tilde/circumflex key is beside Enter.</li>
        <li><strong>Brazilian ABNT2:</strong> the acute/grave key is the first key right of P. The tilde/circumflex key is immediately right of Ç.</li>
        <li><strong>á:</strong> acute accent, then A. <strong>ê:</strong> Shift with the tilde key for circumflex, release, then E.</li>
        <li><strong>A literal accent:</strong> press the accent, then Space. Use Shift on the final vowel for an uppercase accented letter.</li>
      </ul>
      <p>A key waiting for the next character is usually expected dead-key behavior. If the accent is in the wrong place entirely, first check whether Portugal or Brazil is selected.</p>
    </> },
    { id: "setup", title: "Select the right Portuguese keyboard layout", body: <>
      <p>On <strong>Windows 11</strong>, open Settings → Time &amp; language → Language &amp; region → Language options. Under keyboards, add <strong>Portuguese</strong> for the Portugal mapping or <strong>Portuguese (Brazil ABNT2)</strong> for Brazilian hardware. Switch with Windows + Space and test Ç, @ and an accent.<Cite n={3} source={sources.windows} /></p>
      <p>On <strong>macOS</strong>, open System Settings → Keyboard → Text Input → Edit. Add the intended Portuguese or Brazilian source and inspect Keyboard Viewer. Select a source that matches your hardware; the Windows shortcuts above are not universal Mac shortcuts.<Cite n={4} source={sources.apple} /></p>
      <p>On <strong>GNOME Linux</strong>, add the appropriate Portugal or Brazil input source in Settings → Keyboard → Input Sources, then inspect its preview. Some distributions expose additional variants with different accent behavior.<Cite n={5} source={sources.gnome} /></p>
      <p>You can keep multiple sources installed without changing your display language. If you use a US keyboard and only need occasional Portuguese accents, compare <Link href="/learn/us-international-keyboard">US International</Link> before learning a different punctuation arrangement.</p>
    </> },
  ],
};
export default content;
