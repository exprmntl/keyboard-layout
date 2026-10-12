import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import LayoutDiagram from "@/components/guides/LayoutDiagram";
import { sources } from "./sources";

const content: ArticleContent = {
  related: ["comparison", "keyboard-layout-charts", "colemak"],
  introduction: <>
    <p>You can try Dvorak before deciding to learn it. Open the <Link href="/dvorak">Dvorak simulator</Link>, put your hands in their usual typing position, and follow the on-screen keyboard. The letters will come from different places, but your physical keyboard can stay exactly where it is.</p>
    <p>Learning the layout is a larger decision. You are replacing practiced movements with unfamiliar ones, so ordinary writing will initially take more attention. A useful approach is to separate exploration, deliberate practice, and everyday use. This guide takes you through those stages without assuming that you can stop using QWERTY for work.</p>
  </>,
  sections: [
    { id: "what-is-dvorak", title: "What changes when you use Dvorak?", body: <>
      <p>Dvorak is an alternative arrangement of letters and punctuation, designed around English typing. August Dvorak and William L. Dealey filed their keyboard patent in 1932; it was granted in 1936.<Cite n={1} source={sources.patent} /> The familiar modern layout puts the vowels on the left side of the home row and several common consonants on the right. That arrangement makes many English sequences alternate between hands.</p>
      <LayoutDiagram layout="dvorak" />
      <p>The home row reads <strong>A O E U I D H T N S</strong>. Most letters move from their QWERTY positions, and punctuation moves too. The number row still runs from 1 to 0 in the standard US Dvorak layout used here.</p>
      <p>These changes are separate from keyboard shape. You can use Dvorak on a laptop, a conventional desktop keyboard, or a split keyboard. Replacing the keycaps changes the labels you see; selecting a layout changes what the keys type.</p>
      <p>This guide and simulator use <strong>standard US Dvorak</strong>. Programmer Dvorak and the one-handed Dvorak layouts are different arrangements. Match your eventual system setting to the layout you practice.</p>
    </> },
    { id: "first-session", title: "Your first session: find the home row", body: <>
      <p>On a conventional keyboard, find the raised marks on the physical F and J keys. Those positions become <strong>U and H</strong> in Dvorak. Rest your left fingers on A, O, E, U and your right fingers on H, T, N, S, with a thumb available for the spacebar. The index fingers also reach inward to I and D.</p>
      <ol>
        <li>Open <Link href="/dvorak">Try Dvorak</Link>. Use your physical keyboard, or tap the on-screen keys on a phone or tablet to explore the layout.</li>
        <li>Turn on the lightbulb button for key hints. It highlights the position of the next character in the practice text.</li>
        <li>Read the next letter, locate it in the diagram, and press that position. Try to look at the screen rather than your QWERTY labels.</li>
        <li>Use Backspace to correct an error. Slow down enough to choose the next key deliberately.</li>
      </ol>
      <p>The simulator changes typing inside the practice area. It does not change your system layout or the way other apps type. Its text uses complete words from the start; it is useful for exploring the layout, but it is not a course that introduces one key at a time.</p>
      <p>Keep the first session short. The goal is to discover where the letters live and how the new positions feel. Your speed in these first minutes says little about the speed you might reach after learning.</p>
    </> },
    { id: "practice-plan", title: "Build a practice routine you can keep", body: <>
      <p>Start with roughly ten minutes of focused practice on days when you can fit it in. Treat that as a manageable starting point, not a required dose or a promise about learning time. Stop sooner if concentration or comfort deteriorates.</p>
      <h3>Stage 1: learn positions without rushing</h3>
      <p>Use a tutor with Dvorak lessons, such as <a href="https://www.typingclub.com/dvorak">TypingClub’s Dvorak course</a>, for a gradual introduction to the keys. Keep a <Link href="/learn/keyboard-layout-charts#dvorak">Dvorak layout chart</Link> beside the lesson. Pause to recall a position before checking it; guessing rapidly mostly gives you more errors to correct.</p>
      <p>Home-row words such as <strong>the, this, those, hand,</strong> and <strong>sound</strong> show how much ordinary English can already be formed there. They are useful examples to recognize, rather than a complete training vocabulary.</p>
      <h3>Stage 2: connect the rows</h3>
      <p>Add the remaining letters in small groups through your tutor, then practice mixed words. Notice where your QWERTY habits intrude. If one letter repeatedly causes a mistake, give it a short period of deliberate attention instead of restarting the entire lesson.</p>
      <p>Move on when you can type a lesson accurately with fewer pauses. A fast result on a memorized drill is less useful than being able to type unfamiliar words reliably.</p>
      <h3>Stage 3: practice the writing you actually do</h3>
      <p>Once you know the positions, introduce capitals, apostrophes, commas, and full sentences. After enabling Dvorak on your computer, write a short personal note or retype a paragraph in an ordinary editor. If you program, practice a small piece of code too: punctuation and editor shortcuts are part of your real workload.</p>
      <p>Record progress occasionally using the same test settings and similar material. Compare accuracy, pauses, and comfort as well as words per minute. Different word lists, test lengths, and error rules can make two speed scores misleadingly different.</p>
    </> },
    { id: "system-setup", title: "Enable Dvorak outside the simulator", body: <>
      <p>When you are ready to use Dvorak in other apps, add it as an input layout. Keep QWERTY available while learning, and try the switching shortcut in a blank document before relying on it during work.</p>
      <h3>Windows 11</h3>
      <p>Open <strong>Settings → Time &amp; language → Language &amp; region</strong>. Open the menu beside your English language entry, select <strong>Language options</strong>, then choose <strong>Add a keyboard</strong>. Select <strong>United States-Dvorak</strong>, rather than a left- or right-hand variant. Use <strong>Windows + Space</strong> or the taskbar input indicator to switch.<Cite n={2} source={sources.windows} /></p>
      <h3>macOS</h3>
      <p>Open <strong>System Settings → Keyboard</strong>. Under <strong>Text Input</strong>, click <strong>Edit</strong>, then the add button. Find and add <strong>Dvorak</strong>. Choose it from the Input menu in the menu bar; <strong>Control + Space</strong> normally switches to the last input source you used. Apple’s Keyboard Viewer can show the active layout.<Cite n={3} source={sources.apple} /></p>
      <h3>Linux with GNOME</h3>
      <p>Open <strong>Settings → Keyboard → Input Sources</strong>, choose <strong>Add Input Source</strong>, and find the English Dvorak variant. Preview it before adding it. GNOME normally uses <strong>Super + Space</strong> to switch sources. Other desktop environments have their own settings, so use your distribution’s instructions if the menu differs.<Cite n={4} source={sources.gnome} /></p>
      <p>A keyboard layout and the language of your computer’s menus are separate settings. You do not need to change the interface language to learn Dvorak. Check the active input indicator if typing looks unexpected, especially when moving between apps or returning to the sign-in screen.</p>
    </> },
    { id: "shortcuts", title: "Give shortcuts their own practice time", body: <>
      <p>Standard Dvorak moves Z, X, C, and V, so the familiar physical positions for undo, cut, copy, and paste change in apps that follow the active letter layout. Other shortcuts may also move. Apps, games, remote desktops, and remapping tools do not all handle keys the same way.</p>
      <p>Test a small set of actions you depend on: copy and paste, undo, save, find, switching tabs, and any editor commands you use repeatedly. Practice them in a disposable document. This often reveals a more important everyday tradeoff than a short typing-speed test does.</p>
      <p>Some systems offer variants or remapping tools that retain QWERTY shortcut positions. Those can be useful, but they introduce another configuration to maintain. Start by learning what the standard setup does, then change the specific shortcuts that get in your way.</p>
    </> },
    { id: "switching", title: "Decide when to use it for everyday work", body: <>
      <p>You can practice Dvorak in a separate daily session while continuing to use QWERTY for deadlines. As you become comfortable, move a low-pressure task to Dvorak, then another. Switch more of your day when the extra thinking no longer interferes with the task itself.</p>
      <p>Some people prefer an immediate switch because it creates more practice. That approach also makes every email and search a lesson. Choose it only if you can afford that disruption. There is no single timetable for recovering your previous speed, and recognizing every key is only the beginning of fluent typing.</p>
      <p>If you regularly share computers, keep some QWERTY use in your routine. Remembering two layouts can be useful; the practical goal is to work comfortably in the environments you actually encounter.</p>
    </> },
    { id: "expectations", title: "What should you expect to gain?", body: <>
      <p>Dvorak offers a different pattern of finger movement and hand alternation. Whether that is worth learning depends on your preferences, the text you type, and the time you invest. Reduced travel in a layout analysis does not automatically translate into a matching speed increase.</p>
      <p>For perspective, Norman and Fisher’s 1982 paper reported only a modest Dvorak advantage in a computer simulation of expert typing. That was a model, not a forecast of what a particular learner will achieve, and it did not study Colemak.<Cite n={5} source={sources.norman} /> Be cautious with universal claims that any layout will make everyone much faster.</p>
      <p>A layout also cannot guarantee relief from typing pain. If practice causes pain, stop rather than treating it as a learning hurdle; persistent symptoms deserve medical attention. Keyboard position, workload, breaks, and the physical keyboard are separate considerations from letter placement.</p>
      <p>You have enough information to take the next useful step: <Link href="/dvorak">try a short Dvorak session</Link>. If you like the arrangement, begin a gradual course. If you are still choosing, read the <Link href="/compare/qwerty-dvorak-colemak">QWERTY, Dvorak, and Colemak comparison</Link> before committing to a switch.</p>
    </> },
  ],
};

export default content;
