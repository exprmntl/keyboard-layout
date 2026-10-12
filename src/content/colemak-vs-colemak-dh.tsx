import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import ReferenceKeyboard from "@/components/guides/ReferenceKeyboard";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["colemak", "comparison", "keyboard-layout-charts"],
  introduction: <>
    <p><strong>Colemak-DH moves D and H away from the center of Colemak’s home row.</strong> The goal is to replace sideways index-finger reaches with curling movements toward the lower row. It is a modification of Colemak, with much of the same arrangement, rather than a completely unrelated layout.<Cite n={1} source={sources.dh} /></p>
    <p>Neither is automatically faster or more comfortable for everyone. The practical choice is which movements suit you, which mapping your keyboard uses, and whether your tutor supports that exact variant. <Link href="/keyboard-layout-detector">Check your active layout</Link> if you are unsure.</p>
  </>,
  sections: [
    { id: "differences", title: "Colemak vs Colemak-DH: what changes?", body: <>
      <GuideTable caption="Standard Colemak versus current Colemak-DH" headings={["Feature", "Standard Colemak", "Colemak-DH"]} rows={[
        ["First six top-row letters", "Q W F P G J", "Q W F P B J"],
        ["Main home-row letters", "A R S T D H N E I O", "A R S T G M N E I O"],
        ["D position", "QWERTY G position", "QWERTY C position on ANSI/ISO Angle Mod; V position on matrix"],
        ["H position", "QWERTY H position", "QWERTY M position"],
        ["Left bottom row", "Z X C V B", "Depends on ANSI, ISO or matrix geometry"],
        ["This site’s typing simulator", "Supported", "Use a DH-specific tutor; the simulator remains standard Colemak"],
      ]} />
      <p>The first six letters already contain a difference: G becomes B. Checking the home and bottom rows confirms that you have a consistent mapping rather than relying on one character. The detector checks physical positions, so typing the text “colemak” is not enough to identify it.</p>
    </> },
    { id: "diagrams", title: "Compare the Colemak and DH diagrams", body: <>
      <h3>Standard Colemak</h3><ReferenceKeyboard layout="colemak" />
      <h3>Colemak-DH for a US ANSI keyboard</h3><ReferenceKeyboard layout="dh-ansi" />
      <p>On this ANSI implementation the bottom-left row reads <strong>X C D V Z</strong>. The Angle Mod shifts X and C left and relocates Z to the middle. Do not assume Ctrl+Z, Ctrl+X and Ctrl+C keep their QWERTY physical positions; shortcut handling also depends on your operating system and application.</p>
      <h3>Colemak-DH for a matrix keyboard</h3><ReferenceKeyboard layout="dh-matrix" />
      <p>The matrix version’s bottom-left letters are <strong>Z X C D V</strong>. Its D is at a different physical position than in the ANSI version. The diagrams show character assignments; spacing is schematic, not a drawing of a particular split keyboard.<Cite n={2} source={sources.dhMappings} /></p>
    </> },
    { id: "variants", title: "DH, DHm, DHk, Angle Mod and Wide", body: <>
      <p><strong>Current Colemak-DH</strong> uses M in the center of the home row and K on the bottom row. This arrangement was previously called <strong>DHm</strong>. The project recommends it across keyboard geometries. <strong>DHk</strong> is an older variation with K in the home row; the naming history matters when following older guides.<Cite n={1} source={sources.dh} /></p>
      <p><strong>Angle Mod</strong> adapts the lower-left row to a staggered keyboard. ANSI keyboards have a longer left Shift; ISO keyboards have an extra key beside a shorter left Shift. The official ISO DH mapping uses that extra position for Z, so copying an ANSI chart onto an ISO configuration can put Z in the wrong place.</p>
      <p><strong>Matrix</strong> versions are intended for compatible columnar or grid-like keyboards. They do not need the same stagger correction. <strong>Wide</strong> variants make additional spacing-related changes; they are separate choices and should not be treated as the ordinary DH diagram.</p>
      <p>Our detector distinguishes standard Colemak from the shared positions in current DH. It does not identify every Angle, Wide, national-symbol or firmware variant. If only the family matches, use the installed mapping’s own preview.</p>
    </> },
    { id: "choose", title: "Which should you learn?", body: <>
      <ul>
        <li><strong>If you already use standard Colemak comfortably:</strong> there is no requirement to switch. Compare the changed reaches before committing to relearning.</li>
        <li><strong>If the central D/H reaches feel awkward:</strong> DH is specifically designed around that concern. Try the appropriate mapping slowly and judge the actual movement.</li>
        <li><strong>If you use a split or columnar keyboard:</strong> check the firmware mapping and choose the matching DH matrix or other supported chart.</li>
        <li><strong>If easy setup matters most:</strong> check your OS options first. A built-in entry called “Colemak” normally means standard Colemak, not DH.</li>
      </ul>
      <p>The design rationale is not proof of a universal typing-speed or health benefit. Learning effort, shortcuts, your hardware and your own comfort all matter. Avoid repeated variant changes while you are establishing the new positions.</p>
    </> },
    { id: "setup", title: "Set up and practice the correct variant", body: <>
      <p>For standard Colemak, follow the <Link href="/learn/colemak">Colemak learning and setup guide</Link>. The <Link href="/colemak">browser simulator</Link> lets you try standard Colemak without changing system settings; it does not emulate DH.</p>
      <p>For DH, start with the <a href="https://colemakmods.github.io/mod-dh/">official Colemak Mod-DH project</a>. Choose the Windows, macOS, Linux or firmware instructions that match your keyboard geometry. Installing a mapping and selecting it as the active input source are separate steps.</p>
      <ol>
        <li>Keep your previous layout available while learning.</li>
        <li>Choose the ANSI, ISO or matrix mapping intended for your hardware.</li>
        <li>Check the top row, D, H and Z positions in a blank document or the <Link href="/keyboard-layout-detector">layout detector</Link>.</li>
        <li>Select the same variant in your tutor, then test editing shortcuts and punctuation.</li>
      </ol>
      <p>If the chart and the characters disagree, resolve that before practicing. Extra symbol layers, Caps Lock remapping and application-specific shortcuts are separate from the main Colemak/DH letter arrangement.</p>
    </> },
  ],
};
export default content;
