import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import LayoutDiagram from "@/components/guides/LayoutDiagram";
import { sources } from "./sources";

const content: ArticleContent = {
  introduction: <>
    <p>If you already type comfortably on QWERTY, you do not need to switch. If you want to explore a different pattern of movement, Colemak preserves more familiar positions, while Dvorak makes a more extensive rearrangement. Both require practice before you can judge them fairly.</p>
    <p>The useful question is which layout fits your writing, shortcuts, devices, and willingness to relearn. This comparison covers the standard US versions of QWERTY, Dvorak, and Colemak available in our simulator.</p>
  </>,
  sections: [
    { id: "at-a-glance", title: "The practical differences at a glance", body: <>
      <div className="guide-table-scroll" role="region" aria-label="Keyboard layout comparison table" tabIndex={0}>
        <table>
          <caption>Standard US layouts, compared from the perspective of an existing QWERTY typist</caption>
          <thead><tr><th scope="col">Consideration</th><th scope="col">QWERTY</th><th scope="col">Dvorak</th><th scope="col">Colemak</th></tr></thead>
          <tbody>
            <tr><th scope="row">Main appeal</th><td>Familiarity and easy use of shared computers</td><td>A different arrangement emphasizing home-row letters and hand alternation</td><td>More home-row use while retaining parts of QWERTY</td></tr>
            <tr><th scope="row">What you relearn</th><td>No layout change if you already use it</td><td>Most letter positions and much punctuation</td><td>17 letter/semicolon positions; most US punctuation stays put</td></tr>
            <tr><th scope="row">Z/X/C/V shortcuts</th><td>Familiar positions</td><td>Letters move</td><td>Positions retained</td></tr>
            <tr><th scope="row">System availability</th><td>Widely available; national versions vary</td><td>Available through common desktop input settings</td><td>Built into macOS, common Linux setups, and Windows 11 24H2 onward</td></tr>
            <tr><th scope="row">Main tradeoff</th><td>You keep the movement patterns you already have</td><td>Substantial retraining and shortcut adjustment</td><td>Still requires retraining; choose the intended variant</td></tr>
          </tbody>
        </table>
      </div>
      <p>Colemak’s changed-key count and Windows availability come from its project documentation.<Cite n={1} source={sources.faq} /> Shortcut behavior can vary by application. “Available” also does not mean that you have permission to change the settings on a managed or shared computer.</p>
    </> },
    { id: "layouts", title: "See where the letters go", body: <>
      <LayoutDiagram layout="qwerty" />
      <p>QWERTY spreads common English letters across the rows. Its strongest practical advantage for an established user is all the learning already done: letters, punctuation, application shortcuts, and the ability to sit down at another familiar keyboard.</p>
      <LayoutDiagram layout="dvorak" />
      <p>Dvorak places <strong>A O E U I</strong> on the left of the home row and <strong>D H T N S</strong> on the right. This encourages hand alternation in many English words. It also moves punctuation, so the difference extends beyond ordinary prose.</p>
      <LayoutDiagram layout="colemak" />
      <p>Colemak’s main home-row letters are <strong>A R S T D H N E I O</strong>. It puts common letters near the resting fingers while keeping a number of QWERTY positions, including Z/X/C/V. Its design also values comfortable sequences within a hand, often called rolls.<Cite n={1} source={sources.faq} /></p>
      <p>A diagram helps you understand the arrangement. It cannot tell you how it will feel after practice, or how well it fits your particular mix of languages and tasks.</p>
    </> },
    { id: "speed", title: "Which one is fastest?", body: <>
      <p>There is no reliable speed increase we can promise you for switching. A layout can reduce a particular kind of movement without reducing the total time you spend writing by the same amount.</p>
      <p>When reading a comparison, distinguish three kinds of evidence:</p>
      <ul>
        <li><strong>Layout analysis:</strong> a program counts travel, finger use, or sequences in a text sample. Its results depend on the sample, assumed fingering, keyboard geometry, and how it scores each movement.</li>
        <li><strong>Typing studies:</strong> people or models perform particular tasks under specified conditions. Prior experience, retraining, and the task itself affect what the result means.</li>
        <li><strong>Personal reports:</strong> a user describes their own change. That can be helpful, but a switch often comes with more practice, new technique, or different hardware.</li>
      </ul>
      <p>One frequently cited example is Norman and Fisher’s 1982 paper. Its abstract reports about a 5% Dvorak advantage in a <em>computer simulation of expert typing</em>.<Cite n={2} source={sources.norman} /> That is neither a universal human speed estimate nor a comparison involving Colemak, which came much later.</p>
      <p>A fair personal test takes time. Comparing your practiced QWERTY speed with your first five minutes of Dvorak mostly measures experience. Comparing different online tests can also confuse the result: common-word lists, punctuation, test duration, and correction rules all matter.</p>
    </> },
    { id: "comfort", title: "Comfort involves more than letter placement", body: <>
      <p>Home-row concentration, hand alternation, and shorter reaches can change how typing feels. But a letter layout leaves the physical spacing, wrist position, desk height, switch force, and workload unchanged.</p>
      <p>That distinction matters if discomfort is your reason for considering a switch. A split keyboard changes the position of your hands; a different letter layout changes which movements produce particular characters. You can change either independently.</p>
      <p>Do not treat a layout as a guaranteed treatment for pain. If typing hurts, pause and address the symptoms rather than pushing through a retraining program. Persistent pain or numbness warrants medical attention.</p>
      <p>For an ordinary layout trial, note specific movements you find awkward, rather than trying to assign the whole keyboard an “ergonomic score.” Colemak-DH, for example, specifically responds to concerns about center-column reaches in standard Colemak.<Cite n={3} source={sources.dh} /> That is a design tradeoff you can examine, not a universal prescription.</p>
    </> },
    { id: "daily-use", title: "Shortcuts, programming, languages, and shared computers", body: <>
      <h3>Editing shortcuts</h3>
      <p>Colemak preserves the physical Z/X/C/V cluster; Dvorak moves those letters. Neither fact tells the whole story. Colemak also moves letters used for save and find, while some apps or system variants can preserve QWERTY shortcut positions under Dvorak. Test the commands you actually use.</p>
      <h3>Programming and games</h3>
      <p>If you program, include brackets, braces, slashes, numbers, and your editor’s navigation commands in a trial. Standard Colemak retains most US punctuation positions; standard Dvorak rearranges several of them. Programmer Dvorak is a separate variant, not the layout shown here.</p>
      <p>Games may bind actions to physical positions or to letters. Check movement and action controls before playing. A typing preference does not have to determine the layout you use in every application.</p>
      <h3>Writing in more than one language</h3>
      <p>Dvorak and Colemak’s English-oriented designs are not automatically the best fit for every language. Check accented letters, punctuation, dead keys, and the input method you use. A dead key waits for another key to form a character, such as an accented vowel. Access to those characters can matter more than a small difference in English letter travel.</p>
      <h3>Other people’s computers</h3>
      <p>System support makes it possible to choose a layout, but you may not want to change a shared machine. Keeping QWERTY available and retaining some practice with it can be convenient. Newer Windows versions include Colemak; older installations may need an additional installer.<Cite n={1} source={sources.faq} /> The availability of a standard layout does not imply support for every variant.</p>
    </> },
    { id: "choose", title: "A reasonable starting choice", body: <>
      <ul>
        <li><strong>Stay with QWERTY</strong> if you are comfortable, rely heavily on shared computers, or mainly want to improve accuracy. Practicing your existing layout avoids the cost of relearning positions.</li>
        <li><strong>Try Colemak</strong> if you want to explore a different arrangement while retaining some familiar letters and editing shortcuts. Decide between standard Colemak and DH before investing in a full course.</li>
        <li><strong>Try Dvorak</strong> if its vowel/consonant arrangement interests you and you are willing to relearn more positions and shortcuts. Its distinct design is easy to experience in the simulator.</li>
      </ul>
      <p>If you already use Dvorak or Colemak comfortably, a comparison chart is not by itself a reason to switch again. A specific problem you want to solve is a more useful starting point.</p>
    </> },
    { id: "try-them", title: "Try the layouts before committing", body: <>
      <ol>
        <li>Open <Link href="/">QWERTY</Link>, <Link href="/dvorak">Dvorak</Link>, and <Link href="/colemak">Colemak</Link>. Give each unfamiliar layout a short, unhurried session with key hints.</li>
        <li>Notice the home row and recurring reaches. Treat first impressions as exploration, not a scientific ranking.</li>
        <li>Choose one alternative for a longer learning trial rather than switching between several unfamiliar arrangements every day.</li>
        <li>Use a progressive tutor, then enable the layout for a small real-world task. Check your most-used shortcuts and punctuation there.</li>
        <li>Reassess after regular practice using comparable text and test settings. Consider whether the setup and learning effort fit your life.</li>
      </ol>
      <p>For a concrete next step, follow the <Link href="/learn/dvorak">Dvorak beginner guide</Link> or <Link href="/learn/colemak">Colemak beginner guide</Link>. You can explore either in the browser before deciding whether to adopt it elsewhere.</p>
    </> },
  ],
};

export default content;
