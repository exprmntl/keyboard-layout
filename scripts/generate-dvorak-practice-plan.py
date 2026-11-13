"""Create the one-page signup guide. Run with Python and reportlab installed."""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/downloads/dvorak-practice-plan.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
WIDTH, HEIGHT = letter
INK, MUTED, ACCENT, PAPER, LINE = map(HexColor, ["#282622", "#746c61", "#b94e23", "#f4f0e8", "#d9d1c4"])
document = Canvas(str(OUTPUT), pagesize=letter, invariant=1)
document.setTitle("Your first steps with Dvorak - A one-page practice plan")
document.setAuthor("Keyboard Layout / Experimental Software")
document.setSubject("Standard US Dvorak home row, ten-minute practice routine and gradual switching plan")
document.setFillColor(PAPER)
document.rect(0, 0, WIDTH, HEIGHT, stroke=0, fill=1)


def text(x, y, value, size=10, bold=False, color=INK):
    document.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    document.setFillColor(color)
    document.drawString(x, y, value)


def paragraph(x, y, value, width=524, size=10, leading=15, color=MUTED):
    words = value.split()
    lines = []
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, "Helvetica", size) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    for line in lines:
        text(x, y, line, size=size, color=color)
        y -= leading
    return y


def section(y, number, title):
    text(44, y, number, 10, bold=True, color=ACCENT)
    text(66, y - 1, title, 16, bold=True)


text(44, 748, "KEYBOARD LAYOUT  /  YOUR PRACTICE PLAN", 9, bold=True, color=MUTED)
text(44, 708, "Your first steps with Dvorak.", 27, bold=True)
paragraph(44, 684, "A small daily routine for standard US Dvorak. Start slowly, keep QWERTY for work, and build from accurate movements.", size=11, leading=17)

section(614, "01", "Find your home row")
keys = "AOEUIDHTNS"
for index, key in enumerate(keys):
    x = 44 + index * 52.4
    document.setFillColor(ACCENT if key in "UH" else HexColor("#fffaf1"))
    document.setStrokeColor(LINE)
    document.roundRect(x, 554, 46, 40, 5, stroke=1, fill=1)
    text(x + 15, 567, key, 19, bold=True, color=PAPER if key in "UH" else INK)
paragraph(44, 535, "Rest your left fingers on A O E U and your right fingers on H T N S. Your index fingers also reach inward to I and D. The physical F/J bumps mark U and H.")
text(44, 488, "Try:   aoeu   htns   the   this   hand   sound", 12, bold=True)
paragraph(44, 468, "Recall each position before checking the chart. Favor deliberate presses over fast guesses.")

section(420, "02", "Keep it to about 10 minutes")
for y, minutes, title, detail in [
    (388, "2 MIN", "Recall the home row", "Find U and H, then type the home-row drill above slowly."),
    (342, "6 MIN", "Practice a small lesson", "Use a gradual Dvorak tutor. Add a few new keys at a time."),
    (296, "2 MIN", "Try unfamiliar words", "Notice repeated mistakes. Revisit one difficult key next time."),
]:
    text(44, y, minutes, 9, bold=True, color=ACCENT)
    text(100, y, title, 11, bold=True)
    paragraph(100, y - 17, detail, width=466, size=10)

section(244, "03", "Make the switch gradually")
paragraph(44, 218, "Keep QWERTY available for deadlines. Once you know the Dvorak positions, try a short note in an ordinary editor. Add punctuation and test copy, paste, undo and your usual shortcuts before moving more work over.")
paragraph(44, 158, "Check progress with similar text and test settings. Look for fewer errors and pauses; there is no fixed deadline for getting your old speed back. Stop if practice feels uncomfortable.")

document.setStrokeColor(LINE)
document.line(44, 105, 568, 105)
text(44, 82, "Practice: keyboardlayout.app/dvorak", 10, bold=True, color=ACCENT)
document.linkURL("https://keyboardlayout.app/dvorak", (44, 78, 310, 94), relative=0)
text(44, 63, "Setup, shortcuts and the full guide: keyboardlayout.app/learn/dvorak", 9, color=MUTED)
document.linkURL("https://keyboardlayout.app/learn/dvorak", (44, 59, 470, 74), relative=0)
text(44, 37, "The browser simulator changes practice only, not your computer's input settings.", 8, color=MUTED)
document.save()
print(OUTPUT)
