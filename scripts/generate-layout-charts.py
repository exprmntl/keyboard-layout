"""Generate the downloadable charts from the same data as the guide diagrams.

Run: python3 -m pip install reportlab
     python3 scripts/generate-layout-charts.py
"""
import json
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
LAYOUTS = json.loads((ROOT / "src/content/reference-layouts.json").read_text())
OUTPUT = ROOT / "public/downloads/keyboard-layout-charts.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_WIDTH, PAGE_HEIGHT = landscape(A4)
INK, MUTED, LINE, HOME = map(HexColor, ["#252520", "#62625b", "#a5a59b", "#f0f0eb"])
DOCUMENT = Canvas(str(OUTPUT), pagesize=(PAGE_WIDTH, PAGE_HEIGHT), invariant=1)
DOCUMENT.setTitle("Printable Keyboard Layout Charts - QWERTY, Dvorak and Colemak")
DOCUMENT.setAuthor("Keyboard Layout / Experimental Software")
DOCUMENT.setSubject("US character positions, Shift symbols and home-row references")

NOTES = {
    "us": ("Left hand: A S D F     Right hand: J K L ;", "Index fingers also reach G and H.", "https://learn.microsoft.com/en-us/globalization/keyboards/kbdus_7"),
    "dvorak": ("Left hand: A O E U     Right hand: H T N S", "Index fingers also reach I and D. Not Programmer or one-handed Dvorak.", "https://learn.microsoft.com/en-us/globalization/keyboards/kbddv"),
    "colemak": ("Left hand: A R S T     Right hand: N E I O", "Index fingers also reach D and H. Caps Lock remapping is not shown.", "https://colemak.com/"),
}

for page, name in enumerate(["us", "dvorak", "colemak"], 1):
    data = LAYOUTS[name]
    DOCUMENT.setFillColor(MUTED)
    DOCUMENT.setFont("Helvetica", 10)
    DOCUMENT.drawString(45, PAGE_HEIGHT - 40, "KEYBOARD LAYOUT  /  PRINTABLE REFERENCE")
    DOCUMENT.setFillColor(INK)
    DOCUMENT.setFont("Helvetica-Bold", 30)
    DOCUMENT.drawString(45, PAGE_HEIGHT - 83, data["name"])
    DOCUMENT.setFont("Helvetica", 11)
    DOCUMENT.drawString(45, PAGE_HEIGHT - 107, data["variant"])

    for row_index, row in enumerate(data["rows"]):
        key_width, gap, height = 50, 5, 54
        row_width = len(row) * (key_width + gap) - gap
        x = (PAGE_WIDTH - row_width) / 2 + [0, 10, 0, 8][row_index]
        y = PAGE_HEIGHT - 193 - row_index * (height + gap)
        for key in row:
            DOCUMENT.setFillColor(HOME if row_index == 2 else HexColor("#ffffff"))
            DOCUMENT.setStrokeColor(LINE)
            DOCUMENT.setLineWidth(0.6)
            DOCUMENT.roundRect(x, y, key_width, height, 4, stroke=1, fill=1)
            DOCUMENT.setFillColor(MUTED)
            DOCUMENT.setFont("Courier", 11)
            DOCUMENT.drawString(x + 7, y + height - 15, key["shift"])
            DOCUMENT.setFillColor(INK)
            DOCUMENT.setFont("Courier-Bold", 19)
            DOCUMENT.drawCentredString(x + key_width / 2, y + 11, key["key"])
            x += key_width + gap

    DOCUMENT.setFillColor(MUTED)
    DOCUMENT.setFont("Helvetica", 10)
    DOCUMENT.drawString(45, 196, "Upper legend: Shift    |    Lower legend: unshifted    |    Shaded row: home row")
    DOCUMENT.setFillColor(INK)
    DOCUMENT.setFont("Helvetica-Bold", 12)
    DOCUMENT.drawString(45, 164, NOTES[name][0])
    DOCUMENT.setFont("Helvetica", 11)
    DOCUMENT.drawString(45, 142, f"Physical F/J bump positions type {data['anchors']} in this layout.")
    DOCUMENT.drawString(45, 122, NOTES[name][1])
    DOCUMENT.setFillColor(MUTED)
    DOCUMENT.setFont("Helvetica", 9)
    DOCUMENT.drawString(45, 90, "Character keys only; schematic spacing. Function keys, navigation and numpad omitted.")
    DOCUMENT.drawString(45, 75, "Print landscape; fit to printable area for US Letter. This chart does not change system settings.")
    DOCUMENT.drawString(45, 54, "Layout reference: " + NOTES[name][2])
    DOCUMENT.linkURL(NOTES[name][2], (45, 51, PAGE_WIDTH - 45, 65), relative=0)
    DOCUMENT.setFont("Helvetica", 10)
    DOCUMENT.drawString(45, 30, "keyboardlayout.app/learn/keyboard-layout-charts")
    DOCUMENT.linkURL("https://keyboardlayout.app/learn/keyboard-layout-charts", (45, 27, 340, 41), relative=0)
    DOCUMENT.drawRightString(PAGE_WIDTH - 45, 30, f"{page} / 3")
    DOCUMENT.showPage()

DOCUMENT.save()
print(OUTPUT)
