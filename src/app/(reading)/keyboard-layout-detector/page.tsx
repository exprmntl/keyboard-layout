import Link from "next/link";
import LayoutDetector from "@/components/LayoutDetector";
import { contentMetadata } from "@/lib/metadata";
import "./detector.css";

export const metadata = contentMetadata({
  title: "Keyboard Layout Detector — What Layout Am I Using?",
  description: "Check US, UK, Spanish, Latin American, Portuguese, Brazilian and US International keyboard input, distinguish Colemak from Colemak-DH, or identify AZERTY and QWERTZ families.",
  path: "/keyboard-layout-detector",
});

export default function KeyboardLayoutDetectorPage() {
  return (
    <article className="guide-article detector-page">
      <header className="guide-heading">
        <p className="guide-eyebrow">Keyboard layout detector</p>
        <h1>What keyboard layout am I using?</h1>
        <p className="guide-deck">Check the layout your keyboard is typing with. No download or settings change needed.</p>
      </header>
      <LayoutDetector />
      <noscript><p className="guide-index-note">Enable JavaScript to run the key check, or use the system settings instructions below.</p></noscript>
      <div className="guide-prose detector-help">
        <section>
          <h2>Which layouts can this identify?</h2>
          <p>Start with six physical letter positions. For QWERTY and Colemak, the check then asks for the symbols or letters that distinguish these supported mappings:</p>
          <ul>
            <li><Link href="/learn/us-vs-uk-keyboard">US QWERTY and UK QWERTY</Link>, including Apple British.</li>
            <li><Link href="/learn/us-international-keyboard">US International-style QWERTY</Link> with dead accent keys.</li>
            <li><Link href="/learn/spanish-vs-latin-american-keyboard">Spanish (Spain) and Spanish (Latin America)</Link>.</li>
            <li><Link href="/learn/portuguese-vs-brazilian-keyboard">Portuguese (Portugal) and Brazilian Portuguese (ABNT / ABNT2)</Link>.</li>
            <li><Link href="/compare/colemak-vs-colemak-dh">Standard Colemak and current Colemak-DH</Link>.</li>
          </ul>
          <p>AZERTY, QWERTZ and Dvorak results identify the family. Their regional variants are not distinguished. ABNT and ABNT2 share the tested character keys, and some Mac input sources share US International-style behavior. The result explains these overlaps rather than guessing an exact name.</p>
          <p>Follow the highlighted key, holding Shift only when asked. Pressing keys out of order also works; unshifted and Shift characters are checked separately. Clicking the diagram selects a position, but only a physical key press supplies evidence. Keep the same input source throughout the check.</p>
        </section>
        <section>
          <h2>How reliable is this keyboard layout check?</h2>
          <p>The detector compares the physical position reported by your browser with the character it produces. Typing the word “qwerty” on another arrangement will not automatically produce a QWERTY result. Regional results require several matching symbols; Colemak results also check home and bottom-row positions.</p>
          <p>A match means the tested positions agree, not that every key or modifier layer has been verified. Custom remapping, remote desktops, firmware that changes the reported positions, input methods and browser differences can affect the result. If the letters match but the variant does not, we report only the family. Confirm the exact input-source name in your settings below.</p>
          <p>An accent key may show <strong>◌</strong>: it is a dead key that normally waits for a following letter. It is useful evidence for layouts such as US International. If your browser reports an active composition instead, finish it and retry, or use the system-settings check.</p>
        </section>
        <section>
          <h2>Why don’t my symbols match the keycaps?</h2>
          <p>The labels on your keys describe the physical keyboard. Your computer’s active input layout decides what those keys type. A different layout, a remapping tool, or a remote desktop can make them disagree. This tool checks what reaches this browser; it cannot read your keycaps.</p>
        </section>
        <section id="confirm-layout">
          <h2>Confirm your layout in system settings</h2>
          <ul>
            <li><strong>Windows:</strong> press Windows + Space to see and switch installed input layouts. Manage them in Settings → Time &amp; language → Language &amp; region → Language options.</li>
            <li><strong>Mac:</strong> check the Input menu in the menu bar, or open System Settings → Keyboard → Text Input → Edit. Keyboard Viewer shows the active arrangement.</li>
            <li><strong>Linux with GNOME:</strong> open Settings → Keyboard → Input Sources. Other desktop environments may use different menu names.</li>
          </ul>
          <p>Use these settings if you use an on-screen keyboard, an input method editor (IME), custom remapping, or a browser that does not report physical key positions. This check does not change your system layout.</p>
        </section>
        <p>Curious about a different layout? Try the <Link href="/dvorak">Dvorak simulator</Link> or <Link href="/colemak">Colemak simulator</Link> without changing your computer’s settings.</p>
      </div>
    </article>
  );
}
