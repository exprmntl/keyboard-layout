import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import GuideTable from "@/components/guides/GuideTable";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["us-vs-uk-keyboard", "us-international-keyboard", "french-keyboard-layout"],
  introduction: <>
    <p>When several keys consistently produce the wrong letters or symbols, check the <strong>active input layout</strong> first. The characters printed on your keyboard do not determine what the computer types. A changed input source, a remapping rule or a remote session can make perfectly working keys produce unexpected text.</p>
    <p>Start in a blank document rather than a password field. Try a few letters, numbers and punctuation marks, then use the pattern below to choose your next check. A pattern is a clue, not a complete diagnosis.</p>
  </>,
  sections: [
    { id: "symptoms", title: "Match the symptom to a likely cause", body: <>
      <GuideTable caption="Common wrong-character patterns" headings={["What happens", "Possible explanation", "First check"]} rows={[
        ["@ and double quotes exchange places", "US/UK input mismatch", <Link key="us-uk" href="/learn/us-vs-uk-keyboard">Compare US and UK symbol positions</Link>],
        ["Y and Z are swapped", "QWERTY/QWERTZ mismatch", <Link key="german" href="/learn/german-keyboard-layout">Check the active QWERTZ variant</Link>],
        ["A/Q and W/Z are swapped", "QWERTY/AZERTY mismatch", <Link key="french" href="/learn/french-keyboard-layout">Compare the French AZERTY diagram</Link>],
        ["Apostrophe waits, or a following vowel gains an accent", "A dead-key input layout is active", <Link key="international" href="/learn/us-international-keyboard#apostrophe">Check US International and dead keys</Link>],
        ["U, I, O or nearby letters produce digits", "An embedded numeric keypad or firmware layer may be active", "Check Num Lock and the laptop’s documented Fn controls"],
        ["Everything is uppercase, or every number becomes a symbol", "Caps Lock, Shift or a modifier setting may be active", "Release both Shift keys; check Caps Lock and accessibility settings"],
        ["One key repeats, misses presses or produces several characters", "A hardware fault, macro or repeat setting is possible", "Compare another app and another keyboard"],
      ]} />
      <p>Do not change several settings at once. Make one adjustment, repeat the same short test, and keep the change only if it explains the behavior.</p>
    </> },
    { id: "input-layout", title: "1. Check the selected input layout", body: <>
      <h3>Windows</h3>
      <p>Press <strong>Windows + Space</strong> to inspect and switch installed layouts. If only one is installed, the shortcut may not change anything. To add the intended layout, open <strong>Settings → Time &amp; language → Language &amp; region</strong>, then the relevant language’s <strong>Language options → Add a keyboard</strong>.<Cite n={1} source={sources.windows} /></p>
      <p>Choose the exact keyboard variant, not just the language. “English” can include US, UK and US International mappings. Retest letters and symbols before removing any old input source.</p>
      <h3>Mac</h3>
      <p>Choose the intended source from the Input menu in the menu bar. In <strong>System Settings → Keyboard → Text Input → Edit</strong>, inspect installed sources. <strong>Keyboard Viewer</strong> shows the selected mapping and how modifier keys change it.<Cite n={2} source={sources.apple} /></p>
      <h3>Linux with GNOME</h3>
      <p>Check <strong>Settings → Keyboard → Input Sources</strong> and preview the selected layout. GNOME normally switches sources with <strong>Super + Space</strong>. Other Linux desktops use different settings panels.<Cite n={3} source={sources.gnome} /></p>
    </> },
    { id: "scope", title: "2. Find out where the mismatch happens", body: <>
      <p>Compare a plain text editor with the app where you first noticed the problem. If both produce the same wrong character, investigate the system input source, keyboard firmware or a system-wide remapper. If only one app differs, look at that app’s keyboard shortcuts, input handling and extensions.</p>
      <p>For a remote desktop or virtual machine, check both the local computer and the remote system. They may interpret the same key information through different mappings. Changing only the local layout may not explain the remote result.</p>
      <p>Our <Link href="/dvorak">Dvorak</Link> and <Link href="/colemak">Colemak</Link> simulators intentionally rearrange characters inside their practice areas. That does not change the layout used by your other apps. If the surprising behavior is confined to a simulator, compare it with a normal document before changing system settings.</p>
    </> },
    { id: "modifiers", title: "3. Check modifiers, layers and remapping", body: <>
      <p>Release Shift, Alt/Option, Control and Command/Windows, then try again. Check Caps Lock. If a modifier seems to remain active, inspect accessibility features such as Sticky Keys and any remapping software you deliberately installed.</p>
      <p>On compact keyboards, letters can share a numeric-pad or symbol layer. Use your keyboard manufacturer’s instructions for Fn and Num Lock; there is no universal reset shortcut. Programmable keyboards can also store a mapping in firmware, so the behavior can follow the keyboard to another computer.</p>
      <p>Temporarily disable a specific custom remap or macro to test that hypothesis, preserving its configuration first. Avoid resetting every keyboard preference when one rule may explain the mismatch.</p>
    </> },
    { id: "hardware", title: "4. Separate a layout mismatch from a hardware problem", body: <>
      <p>A consistent, recognizable character swap suggests a mapping issue. Missed presses, repeated characters or a single unresponsive key can have other causes. Try a second app, reconnect an external keyboard, and compare a second keyboard if one is available. For wireless hardware, check its power and connection.</p>
      <p>If the same physical keyboard behaves incorrectly on another computer with the intended layout selected, a keyboard-specific setting or fault becomes more plausible. If multiple keyboards show the same pattern on one computer, continue checking that computer’s configuration.</p>
      <p>Stop once you have a repeatable explanation. Changing keycaps cannot fix a software mapping, and changing layouts cannot repair a damaged switch. If hardware still appears at fault, follow the manufacturer’s troubleshooting guidance.</p>
    </> },
  ],
};
export default content;
