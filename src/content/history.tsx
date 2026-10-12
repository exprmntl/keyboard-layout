import Link from "next/link";
import { Cite, type ArticleContent } from "@/components/guides/Article";
import LayoutDiagram from "@/components/guides/LayoutDiagram";
import { sources } from "./sources";

const content: ArticleContent = {
  introduction: <>
    <p>A modern keyboard carries several histories at once. The letters may follow a nineteenth-century typewriter arrangement. The symbols reflect a language and a national convention. Software decides what a key press means, and a programmable keyboard can put several arrangements under the same fingers.</p>
    <p>QWERTY, Dvorak, and Colemak are three responses to that evolving set of constraints. Their story connects mechanical invention, typing instruction, competing ideas about efficiency, and the cost of changing a familiar skill. It also branches beyond English, into layouts and input methods built around other languages.</p>
  </>,
  sections: [
    { id: "timeline", title: "The story at a glance", body: <>
      <ol className="history-timeline">
        <li><strong>1868</strong><span>Christopher Latham Sholes and colleagues patent an early typewriter. Its arrangement is still evolving.<Cite n={1} source={sources.smithsonian} /></span></li>
        <li><strong>1874</strong><span>Remington begins selling the Sholes &amp; Glidden typewriter, an important vehicle for the emerging QWERTY arrangement.<Cite n={1} source={sources.smithsonian} /></span></li>
        <li><strong>1878</strong><span>Sholes’ patent records a recognizable QWERTY keyboard. The layout continues into a growing typing industry.<Cite n={2} source={sources.sholes} /></span></li>
        <li><strong>1932–1936</strong><span>August Dvorak and William L. Dealey file, then receive, a patent for their alternative keyboard.<Cite n={3} source={sources.patent} /></span></li>
        <li><strong>Computer era</strong><span>Character mapping becomes a software choice, while learned layouts and national conventions persist.</span></li>
        <li><strong>2006</strong><span>Shai Coleman releases Colemak, retaining parts of QWERTY while rearranging common letters.<Cite n={4} source={sources.faq} /></span></li>
        <li><strong>2014</strong><span>Colemak Mod-DH launches, addressing center-column reaches in standard Colemak.<Cite n={5} source={sources.dh} /></span></li>
        <li><strong>2019</strong><span>France’s NF Z71-300 standard offers both improved AZERTY and Bépo arrangements.<Cite n={6} source={sources.afnor} /></span></li>
      </ol>
      <p>These are milestones in several overlapping stories, rather than a sequence in which each new layout replaces the last. QWERTY, Dvorak, Colemak, and many regional layouts coexist.</p>
    </> },
    { id: "before-qwerty", title: "Before QWERTY: the keyboard was still an experiment", body: <>
      <p>In the 1860s, Sholes and his collaborators were working on the practical problem of making a machine print letters reliably. Their 1868 patented design had a keyboard resembling a small piano, with an alphabetical arrangement. The now-familiar rows of letters were an outcome of development, not the starting point.<Cite n={1} source={sources.smithsonian} /></p>
      <p>Every key had to do more than send a signal. It was part of a mechanism that moved a piece of type toward paper, made an impression, and returned for the next stroke. The arrangement of controls, the movement of the type mechanism, and the experience of the operator were tied together.</p>
      <p>The commercial story became important when Remington took up the design and began selling the Sholes &amp; Glidden machine in 1874. Subsequent machines and revisions helped establish the arrangement we call QWERTY, named after the first six letters of its top alphabetic row. Sholes’ 1878 patent provides a primary record of a recognizable version of that keyboard.<Cite n={1} source={sources.smithsonian} /><Cite n={2} source={sources.sholes} /></p>
      <p>That sequence matters. QWERTY was not handed down as a finished mathematical solution to typing. It emerged from years of work on a particular technology, then acquired a life beyond it.</p>
    </> },
    { id: "qwerty-origin", title: "Was QWERTY designed to slow people down?", body: <>
      <p>The most familiar explanation says that early typewriters jammed when nearby type bars collided, so the letters were rearranged to reduce clashes. Retellings often turn that into a stronger claim: QWERTY was deliberately made slow.</p>
      <p>Those are different propositions. Reducing mechanical interference could allow a typist to work more reliably; it does not imply that slow typing was the objective. The exact reasons for the sequence of letter moves remain contested.</p>
      <p>One alternative account comes from Koichi Yasuoka and Motoko Yasuoka. Their 2011 historical study argues that the needs of telegraph operators transcribing American Morse influenced the developing arrangement. Smithsonian’s account describes their proposal that certain ambiguous Morse sequences help explain nearby letter positions.<Cite n={1} source={sources.smithsonian} /></p>
      <p>The telegraph explanation is a historical argument, not a settled replacement slogan. Patents establish particular designs and dates more directly than they establish every motive behind a key’s placement. The defensible account is that QWERTY developed alongside early typewriters, through changes involving inventors, manufacturers, and users. A single story about deliberately obstructing typists oversimplifies that record.</p>
      <LayoutDiagram layout="qwerty" />
    </> },
    { id: "qwerty-adoption", title: "Why a familiar arrangement became hard to replace", body: <>
      <p>A keyboard becomes more useful when other people already know it. Employers can hire trained typists; typists can move between machines; instructors can teach a common method. Manufacturers benefit from offering a familiar interface. Remington’s sales and training helped build that reinforcing system around QWERTY.<Cite n={1} source={sources.smithsonian} /></p>
      <p>This is a form of <strong>path dependence</strong>: earlier choices change the costs and advantages of later choices. Once someone has practiced thousands of hours on one arrangement, an alternative must justify more than its performance on a diagram. It must justify retraining and the inconvenience of working with a less common setup.</p>
      <p>That does not prove QWERTY is the best possible arrangement. It also does not prove that everyone is trapped in a demonstrably terrible one. Widespread use and individual efficiency are different questions. A familiar standard can be valuable even when a person prefers an alternative.</p>
      <p>The layout outlived the typewriter mechanism because the learned skill remained useful. When later electronic systems could interpret keys without moving type bars, users still arrived with trained hands and familiar expectations.</p>
    </> },
    { id: "dvorak", title: "Dvorak: redesigning the work of the fingers", body: <>
      <p>August Dvorak and William L. Dealey approached the keyboard as something that could be deliberately reorganized around typing. Their patent application was filed on May 21, 1932, and granted on May 12, 1936.<Cite n={3} source={sources.patent} /> The alternative associated with their work became known as the Dvorak Simplified Keyboard.</p>
      <LayoutDiagram layout="dvorak" />
      <p>In the familiar modern arrangement, the home row contains A, O, E, U, I on the left and D, H, T, N, S on the right. Common English letters move closer to the resting fingers, and placing vowels opposite many consonants encourages alternating hands. The diagrams in this article show modern layouts used by the simulator, rather than reproductions of the original patent drawings.</p>
      <p>Dvorak makes the design intention unusually visible. Compare a short English word such as “the” across the two diagrams: all three letters lie on Dvorak’s home row, while QWERTY puts T and E above it. That is a real difference in arrangement. How much it matters over an entire working day is a separate question.</p>
      <p>Enthusiastic claims about speed and comfort have long accompanied Dvorak. The history of those claims should be kept separate from the history of the design. A patent demonstrates an invention; it does not establish a universal performance benefit.</p>
      <p>Later research also used different methods and answered different questions. Norman and Fisher’s 1982 paper, for example, reported only about a 5% Dvorak advantage in a computer simulation of expert typing.<Cite n={7} source={sources.norman} /> That model should not be read as a fixed gain for every human typist, much less as evidence about health outcomes or later layouts.</p>
      <p>Dvorak gained users and a lasting place among alternative layouts, but it did not displace QWERTY. It remained an option for people willing to retrain rather than becoming the default through which everyone else learned to type. Today you can <Link href="/dvorak">try its arrangement</Link> without obtaining a special machine.</p>
    </> },
    { id: "international-layouts", title: "The international story is larger than English", body: <>
      <p>English letter frequency is only one possible design problem. A keyboard also needs to make the characters of a language accessible. Accents, punctuation, currency symbols, and additional letters change what convenient typing requires.</p>
      <p>AZERTY layouts used in France and Belgium, and QWERTZ layouts found in German-speaking and some other European contexts, belong to this wider story. These names identify families, not one universal mapping. National versions can differ even when their opening letters match. French is also typed on other arrangements, including Canadian variants, so a language is not tied to a single keyboard.</p>
      <p>A modern example makes the distinction concrete. In 2019, the French voluntary standard <strong>NF Z71-300</strong> proposed two arrangements: improved AZERTY and Bépo. Improved AZERTY preserves the principal letter and number positions while reorganizing other characters. Bépo takes a more extensive approach inspired by Dvorak and designed for French. Both address access to characters such as accented capitals and ligatures.<Cite n={6} source={sources.afnor} /></p>
      <p>The standard is voluntary, not a rule that every French keyboard suddenly changed. It also demonstrates a recurring choice in layout design: preserve familiar positions, or accept more retraining to make a different arrangement possible.</p>
      <p>For writing systems with large character repertoires, a one-key-to-one-character diagram is only part of the interface. An <strong>input method editor</strong> can turn phonetic spelling or other keystrokes into a selection of candidate characters and words. Unicode’s glossary explicitly distinguishes this process from a traditional keyboard’s more limited direct input.<Cite n={8} source={sources.unicode} /> A QWERTY-shaped keyboard can therefore participate in writing far beyond English.</p>
    </> },
    { id: "software", title: "Computers separated the key from the character", body: <>
      <p>On a computer, three things that are often called a “layout” can be changed independently:</p>
      <ul>
        <li><strong>Physical arrangement:</strong> the number, shape, and position of the keys, including staggered rows, split halves, and other geometries.</li>
        <li><strong>Character mapping:</strong> the letters and symbols produced by those keys and their modifiers.</li>
        <li><strong>Input method:</strong> the process that turns a sequence of actions into text, including composition and candidate selection.</li>
      </ul>
      <p>The legends printed on the keycaps are another layer of explanation. They may describe the active mapping, but they do not determine it. An ordinary QWERTY-labeled keyboard can produce Dvorak when the appropriate system input source is selected.</p>
      <p>Modern operating systems expose this flexibility through input-source settings. Apple’s Keyboard Viewer and GNOME’s layout preview, for example, show the arrangement selected in software rather than assuming that the printed keys describe it.<Cite n={9} source={sources.apple} /><Cite n={10} source={sources.gnome} /></p>
      <p>Software lowered the cost of trying an alternative: users no longer needed a separately manufactured typewriter. It did not erase the time needed to learn one, or the value of using the same arrangement as classmates, colleagues, and shared machines.</p>
    </> },
    { id: "colemak", title: "Colemak: change the layout, preserve useful habits", body: <>
      <p>Shai Coleman released Colemak on January 1, 2006.<Cite n={4} source={sources.faq} /> It took a different approach to the transition from QWERTY. Instead of moving almost every letter, it retained a number of familiar positions while concentrating more common English letters on the home row.</p>
      <LayoutDiagram layout="colemak" />
      <p>The resulting home row is A, R, S, T, D, H, N, E, I, O. The standard US arrangement changes 17 letter/semicolon positions relative to QWERTY, while keeping Z, X, C, and V in place. For a computer user, that means the familiar cluster for undo, cut, copy, and paste can survive the switch.<Cite n={4} source={sources.faq} /></p>
      <p>That concern belongs to the computer era. A typist is navigating documents and invoking commands as well as entering letters. The cost of changing an arrangement includes habits formed around software, not just the motion of typing prose.</p>
      <p>Colemak’s project promotes comfortable English touch typing and a more approachable transition from QWERTY. Those are design goals. The project’s own advocacy should not be treated as independent proof that every learner will type faster or avoid injury.</p>
      <p>Standard Colemak later became part of common desktop input options; the project’s current FAQ records its inclusion in Windows 11 from version 24H2.<Cite n={4} source={sources.faq} /> Availability makes adoption easier, while choosing and learning the layout remains an individual decision. Our <Link href="/colemak">Colemak simulator</Link> demonstrates this standard arrangement.</p>
    </> },
    { id: "programmable-keyboards", title: "Variants and programmable keyboards keep the design open", body: <>
      <p>A layout need not be a finished answer. Colemak Mod-DH, launched by SteveP in October 2014, modifies standard Colemak to address the lateral reaches toward its center columns. Its history includes revisions and distinctions between staggered and other keyboard geometries.<Cite n={5} source={sources.dh} /> That illustrates why the hardware and the fingering assumptions matter when evaluating a letter arrangement.</p>
      <p>Programmable keyboards extend the same flexibility into firmware. QMK, for example, describes a base keymap and additional layers that can provide navigation, symbols, or other actions on the same physical keys.<Cite n={11} source={sources.qmk} /> A layer key can make a small board perform tasks that would otherwise need additional dedicated keys.</p>
      <p>Firmware remapping does not make operating-system interpretation disappear. The keyboard sends keycodes, and the host still interprets them through its configured input system. A working setup depends on those choices agreeing.</p>
      <p>Touchscreens introduce another set of possibilities because key sizes and arrangements can change with the interface. Yet familiar letter orders remain useful there too. New technology removes some constraints while retaining others, including the user’s memory and expectations.</p>
    </> },
    { id: "what-the-history-tells-us", title: "What this history tells us about choosing a layout", body: <>
      <p>Keyboard history is not a ladder with one winning design at the top. QWERTY grew through machines, training, and widespread adoption. Dvorak reorganized the work of English typing. Colemak put more emphasis on what an existing QWERTY user could retain. International layouts and input methods show that the underlying task changes with the language.</p>
      <p>Each choice reflects a balance among familiarity, movement, available characters, hardware, and the effort of learning. A long-lived standard is not automatically optimal for an individual, and a newer alternative is not automatically worth that individual’s switching cost.</p>
      <p>The most direct way to connect the history to your own experience is to <Link href="/">try the layouts</Link>. Look at the home rows, type a few words, and notice which familiar habits each arrangement keeps or asks you to replace. For practical advice, continue with the <Link href="/compare/qwerty-dvorak-colemak">layout comparison</Link> or one of the beginner guides.</p>
    </> },
  ],
};

export default content;
