# Social share image

Created September 20, 2026 with the built-in image generation tool. This is promotional artwork, not an application screenshot.

The 1200 × 630 PNG is saved as both `src/app/opengraph-image.png` and `src/app/twitter-image.png`. Next.js serves the images using its metadata file conventions. `src/lib/metadata.ts` explicitly includes them on every page, since page-level Open Graph and Twitter metadata replace the parent's values. The `v=2` query distinguishes the new artwork from cached previews. Keep the two exports, `.alt.txt` files, and metadata alt text in sync. The same artwork is used for Keyboard Layout's thumbnail in the Experimental Software landing-page project (`public/marketing/projects/keyboard-social.webp`).

## Generation prompt

```text
Use case: ads-marketing
Asset type: website social share card, wide landscape 1200:630 aspect ratio.
Primary request: A beautifully art-directed cover for Keyboard Layout, a free browser tool for trying QWERTY, Dvorak and Colemak. A calm, minimal, premium editorial composition with tactile sculptural keycaps; this is promotional artwork, not a screenshot.
Scene: warm ivory paper background, generous negative space, near-black typography, restrained warm orange accent.
Composition: left half has a small uppercase eyebrow "KEYBOARD LAYOUT", then a large confident clean sans-serif headline split over three lines: "Try a different" / "way to type." (two lines if fits). Small subtitle below: "QWERTY · Dvorak · Colemak". Bottom left small "keyboardlayout.app". Right half features exactly three beautifully rendered oversized mechanical keyboard keycaps arranged in a pleasing loose diagonal cluster, one warm ivory with charcoal Q, one charcoal with ivory D, one burnt orange with ivory C. Rounded square keycaps with realistic gently concave tops, subtle fine material texture, soft natural shadows and dimensional depth. Clean sophisticated Swiss graphic design meets restrained product photography. Keep keycap letters accurately Q D C only.
Text verbatim: "KEYBOARD LAYOUT", "Try a different way to type.", "QWERTY · Dvorak · Colemak", "keyboardlayout.app".
Constraints: readable when scaled down as a project thumbnail, keep all text and keycaps within generous safe margins; no full keyboard, no fake UI, no extra words, no gradients, no watermark. Wide horizontal image, approximately 1.905:1.
```
