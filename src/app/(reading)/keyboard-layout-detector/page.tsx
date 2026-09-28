import Link from "next/link";
import LayoutDetector from "@/components/LayoutDetector";
import { contentMetadata } from "@/lib/metadata";
import { detectionFamilies } from "@/lib/layout-detection";
import "./detector.css";

export const metadata = contentMetadata({
  title: "Keyboard Layout Detector — What Layout Am I Using?",
  description: "Check your active keyboard layout with six key presses. Identify QWERTY, AZERTY, QWERTZ, Dvorak or Colemak families, and confirm your regional variant.",
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
          <p>This check recognizes the <strong>{detectionFamilies.map(family => family.name).join(", ")}</strong> families. It reads the characters produced at six physical key positions. Regional variants often share these positions, so the result is a family match, not an exact country, language, or keyboard model.</p>
          <p>AZERTY is common in France and Belgium; QWERTZ is common in Germany and parts of Central Europe. Their regional symbol arrangements differ. US, UK, and many other layouts use QWERTY letters. Dvorak and Colemak also have variants that this short check cannot distinguish.</p>
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
