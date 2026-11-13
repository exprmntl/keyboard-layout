"""Generate the printable one-page guide with Python and reportlab."""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/downloads/dvorak-practice-plan.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
WIDTH, HEIGHT = letter
INK, MUTED, ACCENT, PAPER, LINE, KEY, SOFT = map(HexColor, [
    "#282622", "#746c61", "#b94e23", "#f4f0e8", "#d9d1c4", "#fffaf1", "#f6e4d8",
])
document = Canvas(str(OUTPUT), pagesize=letter, invariant=1)
document.setTitle("Start Dvorak - Your one-page practice plan")
document.setAuthor("Keyboard Layout / Experimental Software")
document.setSubject("Standard US Dvorak reference, home-row drills and a gradual switching plan")
document.setFillColor(PAPER)
document.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)


def text(x, y, value, size=10, bold=False, color=INK, font=None):
    document.setFont(font or ("Helvetica-Bold" if bold else "Helvetica"), size)
    document.setFillColor(color)
    document.drawString(x, y, value)


def paragraph(x, y, value, width=532, size=10, leading=14, color=MUTED):
    line = ""
    for word in value.split():
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, "Helvetica", size) > width:
            text(x, y, line, size=size, color=color)
            y -= leading
            line = word
        else:
            line = candidate
    if line:
        text(x, y, line, size=size, color=color)
        y -= leading
    return y


def section(y, number, title):
    text(40, y, number, 10, bold=True, color=ACCENT)
    text(64, y - 1, title, 15, bold=True)


document.setFillColor(INK)
document.roundRect(40, 741, 27, 27, 5, stroke=0, fill=1)
text(46, 749, "k.", 17, bold=True, color=PAPER)
text(78, 751, "Keyboard Layout", 11, bold=True)
text(438, 751, "THE STARTER SHEET", 8, bold=True, color=MUTED)
text(40, 703, "Start Dvorak. Build the habit.", 29, bold=True)
paragraph(40, 680, "Your first 10 minutes, the keys to remember, and a plan for what comes next.", size=11)

section(642, "01", "Find your starting position")
text(421, 642, "STANDARD US DVORAK", 8, bold=True, color=MUTED)

# Printable, unshifted keys only. Offsets preserve the familiar stagger.
rows = [
    (46, 605, ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "[", "]"]),
    (64, 575, ["'", ",", ".", "P", "Y", "F", "G", "C", "R", "L", "/", "=", "\\"]),
    (73, 545, list("AOEUIDHTNS-")),
    (91, 515, list(";QJKXBMWVZ")),
]
for x, y, keys in rows:
    for index, key in enumerate(keys):
        left = x + index * 36
        anchor = key in ("U", "H")
        document.setFillColor(ACCENT if anchor else SOFT if y == 545 else KEY)
        document.setStrokeColor(ACCENT if anchor else LINE)
        document.roundRect(left, y, 32, 25, 4, stroke=1, fill=1)
        document.setFillColor(PAPER if anchor else INK)
        document.setFont("Helvetica-Bold" if anchor else "Helvetica", 11)
        document.drawCentredString(left + 16, y + 8, key)
        if anchor:
            document.setStrokeColor(PAPER)
            document.line(left + 12, y + 4, left + 20, y + 4)

paragraph(40, 493, "Rest left fingers on A O E U and right fingers on H T N S. Index fingers rest on U / H", size=10, color=INK)
paragraph(40, 479, "at the physical F / J bumps, and reach inward for I / D. Thumbs share the space bar.", size=10)

section(443, "02", "Try this 10-minute session")
paragraph(40, 421, "For these drills: select Dvorak in your computer's input settings, then open a blank note.", size=10, color=INK)
paragraph(40, 407, "Keep QWERTY in the layout switcher. These drills use only home-row letters and spaces.", size=10)

for top, minutes, heading, drill in [
    (379, "2 MIN", "Find the keys. Return to U and H after each group.", "aoeu  htns  ui iu  hd dh"),
    (329, "6 MIN", "Repeat these words slowly. Look only when you need to.", "the then this that   hand said sound south"),
    (279, "2 MIN", "Join the words. Repeat each line at a steady pace.", "the sun is out   send this note   that is the idea"),
]:
    text(40, top, minutes, 9, bold=True, color=ACCENT)
    text(95, top, heading, 10, bold=True)
    text(95, top - 21, drill, 11, font="Courier")

document.setStrokeColor(LINE)
document.line(40, 232, 572, 232)
text(40, 211, "WHEN TO ADD MORE KEYS", 8, bold=True, color=ACCENT)
paragraph(40, 192, "Once you can do two slow, clean passes without checking the chart, add 2-3 off-row keys in a gradual tutor. If you keep hesitating, repeat this session next time.", width=248, size=10)
text(320, 211, "HOW TO START USING IT", 8, bold=True, color=ACCENT)
paragraph(320, 192, "Keep QWERTY for deadlines. Try Dvorak in a short daily note first; check punctuation, copy, paste and undo before moving more work over. Accuracy comes before speed.", width=252, size=10)

document.setStrokeColor(LINE)
document.line(40, 113, 572, 113)
text(40, 92, "Keep practicing", 10, bold=True)
text(135, 92, "keyboardlayout.app/dvorak", 10, bold=True, color=ACCENT)
document.linkURL("https://keyboardlayout.app/dvorak", (135, 88, 340, 102), relative=0)
paragraph(40, 74, "The browser simulator works with your usual system layout. It changes practice only; use a blank note with system Dvorak enabled for the drills above.", size=9, leading=13)
text(40, 33, "Setup & shortcuts: keyboardlayout.app/learn/dvorak", 8, color=MUTED)
document.linkURL("https://keyboardlayout.app/learn/dvorak", (40, 29, 350, 42), relative=0)
text(449, 33, "Experimental Software", 8, color=MUTED)
document.save()
print(OUTPUT)
