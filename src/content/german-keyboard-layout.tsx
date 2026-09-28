import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["french-keyboard-layout", "us-vs-uk-keyboard", "keyboard-typing-wrong-letters"],
  introduction: <>
    <p>The standard German keyboard is a <strong>QWERTZ</strong> layout: Z occupies the position where US QWERTY has Y, and Y moves to the bottom letter row. It also gives ä, ö, ü and ß dedicated positions. Punctuation and right-Alt combinations are important parts of the difference.</p>
    <p>The diagram and shortcuts here follow <strong>Windows German</strong>. QWERTZ describes a family, not one universal mapping: Swiss German and other national layouts have different symbol arrangements. Check the full layout name in your input settings.<Cite n={1} source={sources.germanLayout} /></p>
  </>,
  sections: [
    { id: "layout", title: "German QWERTZ keyboard diagram", body: <>
      <ReferenceKeyboard layout="de" />
      <p>Ü sits to the right of P; Ö and Ä follow L on the home row. ß sits to the right of 0. The number row types numbers without Shift, unlike the <Link href="/learn/french-keyboard-layout">traditional French AZERTY layout</Link>.</p>
      <p>Notice that several familiar programming characters are absent from the first two layers. Braces, square brackets, backslash and @ are available through AltGr. The extra key beside the left Shift on a typical ISO keyboard provides &lt;, &gt; and |.</p>
    </> },
    { id: "symbols", title: "Type @, €, umlauts, brackets and backslash", body: <>
      <GuideTable caption="Standard Windows German character shortcuts" headings={["Character", "Key or combination", "Notes"]} rows={[
        ["ä, ö, ü", "Use the dedicated letter keys", "Hold Shift for Ä, Ö and Ü."],
        ["ß", "Key immediately to the right of 0", "Shift on that key produces ?, not capital ẞ."],
        ["@", "AltGr + Q", "AltGr is normally the right Alt key."],
        ["€", "AltGr + E", "Use the active German mapping."],
        ["{ and }", "AltGr + 7 and AltGr + 0", "Curly braces use separate keys from square brackets."],
        ["[ and ]", "AltGr + 8 and AltGr + 9", "Useful when writing code or links."],
        ["Backslash (\\)", "AltGr + ß", "Use the key to the right of 0."],
        ["Vertical bar (|)", "AltGr + the < key", "The extra ISO key is beside the left Shift."],
      ]} />
      <p>Microsoft’s reference also exposes the modifier layers for checking less common characters.<Cite n={1} source={sources.germanLayout} /> Do not apply this shortcut table to a Mac simply because its keycaps say QWERTZ: use Keyboard Viewer to inspect the selected Apple input source.</p>
      <p>The circumflex key at the upper left and the acute accent key at the right end of the number row are dead keys. Press and release an accent, then a compatible letter: acute followed by E produces é. An accent followed by Space produces the standalone accent. A short delay after that first key is expected behavior.</p>
    </> },
    { id: "setup", title: "Enable or switch the German layout", body: <>
      <p>In Windows 11, open <strong>Settings → Time &amp; language → Language &amp; region</strong>. Under the relevant language’s <strong>Language options</strong>, choose <strong>Add a keyboard → German</strong>. Use <strong>Windows + Space</strong> to switch among installed layouts. Keep US or your previous layout available while testing.<Cite n={2} source={sources.windows} /></p>
      <p>On macOS, open <strong>System Settings → Keyboard → Text Input → Edit</strong> and add the appropriate German input source. Choose it from the Input menu and inspect Keyboard Viewer before learning symbol shortcuts.<Cite n={3} source={sources.apple} /> In GNOME, add the German variant under <strong>Settings → Keyboard → Input Sources</strong> and inspect its layout preview.<Cite n={4} source={sources.gnome} /></p>
      <p>The physical keyboard can remain the same. On hardware without the ISO key beside left Shift, some symbol positions will not match this diagram; choose a compatible variant or use your system’s character tools for the missing character.</p>
    </> },
    { id: "swapped-y-z", title: "Y and Z are swapped: what should I change?", body: <>
      <p>If a QWERTY-labeled Y key types Z, German or another QWERTZ input source may be active. Select the layout you intend to use rather than moving the keycaps. If you are intentionally learning German QWERTZ, that swap is part of the layout.</p>
      <p>If Y and Z are correct but punctuation is wrong, check the exact country variant. If only one app behaves differently, inspect its shortcuts, remapping and remote-session settings. The <Link href="/learn/keyboard-typing-wrong-letters">keyboard troubleshooting guide</Link> walks through those checks in order.</p>
    </> },
  ],
};
export default content;
