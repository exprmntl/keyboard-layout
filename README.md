# Keyboard Layout Simulator

Try QWERTY, Dvorak, and Colemak in your browser with typing practice and an on-screen keyboard.

**[Open keyboardlayout.app](https://keyboardlayout.app/)**

## Try a layout

- [QWERTY](https://keyboardlayout.app/)
- [Dvorak](https://keyboardlayout.app/dvorak)
- [Colemak](https://keyboardlayout.app/colemak)

Selecting a layout updates the URL, so you can share a link that opens the intended layout. The simulator changes typing in its practice area; it does not change your computer's input settings.

The site opens in a warm light theme. The Light/Dark button in the header remembers your choice on this browser and applies it to the simulator and guides. It still works for the current visit if browser storage is unavailable.

On a phone or tablet, tap the keyboard docked at the bottom of the screen to explore each layout. Shift, Backspace, Space, and optional key hints work with touch; 123 switches to numbers and symbols, and ABC returns to letters. Space or the return arrow advances a completed word. A connected physical keyboard also works.

## Guides

- [How to Learn Dvorak](https://keyboardlayout.app/learn/dvorak)
- [How to Learn Colemak](https://keyboardlayout.app/learn/colemak)
- [QWERTY vs. Dvorak vs. Colemak](https://keyboardlayout.app/compare/qwerty-dvorak-colemak)
- [A History of Keyboard Layouts](https://keyboardlayout.app/learn/history)

## Getting Started

Install dependencies, then run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Simulator routes live in `src/app/(tester)/`. Article content lives in `src/content/`; the reading layout and guide routes live in `src/app/(reading)/`. Keyboard diagrams use the same mappings as the simulator.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Checks

```bash
npm run build
npm run test:analytics
npm run test:typing
```

## Production and analytics

The canonical production domain is **https://keyboardlayout.app/**. Metadata, the sitemap, robots.txt, and analytics share `src/lib/site.ts`. Vercel deploys changes merged into `main` automatically. Preserve the configured legacy-domain redirects so existing links continue to work.

See [analytics documentation](docs/analytics.md) for event definitions and local verification. Localhost and preview traffic are excluded from production ingestion.

A product by [Experimental Software](https://experimental.software/).
