# Layout detector mappings

The detector compares `KeyboardEvent.code` (physical position) with `key` (output), using only events received in its focused typing area. Samples stay in memory. Analytics contains only result IDs and `match_level` (variant/family/unknown); the typing area remains blocked from session replay.

## Flow and scope

Six unshifted top-row positions establish QWERTY, AZERTY, QWERTZ, Dvorak, Colemak or the Colemak-DH family. QWERTY then asks for punctuation, Shift symbols and sometimes dead keys; Colemak and DH also check physical G, H and M. Queries are adaptive and accept the required positions in any order, including before the initial letters. Standard Colemak starts `qwfpgj`; current DH starts `qwfpbj`.

Both the physical position and Shift layer identify a sample. Repeated keydown events and identical samples do not advance the check. Caps Lock case is normalized. A changed character at an already sampled position/layer requires a restart. Ctrl/Meta shortcuts retain their default behavior. Alt/Option characters do not count. Tab, Shift+Tab and Escape are not intercepted. A `Dead` event is accepted and displayed as ◌; active IME/composition events are rejected with guidance.

A regional result requires every mandatory signature position to match. Extra observations of known positions can invalidate a variant. Other positions fill the diagram but are not a complete validation of every key or modifier layer. Unknown variants fall back to the letter family, and users may explicitly finish at family level. This is a matching aid, not a claim of OS input-source discovery or hardware identification.

Supported variant checks:

- US QWERTY; UK PC and Apple British.
- US International-style input. Windows US International, Apple U.S. International – PC and Apple Brazilian – Pro share the tested positions; the result explicitly explains the ambiguity.
- Spanish (Spain), including the tested Apple Spanish – ISO positions; Spanish (Latin America).
- Portuguese (Portugal); Brazilian ABNT / ABNT2. The latter share the tested main character keys; no hardware or number-pad distinction is claimed.
- Standard Colemak and current Colemak-DH (formerly DHm). ANSI, ISO and matrix DH share G/M/H confirmation positions; their bottom-left geometry is deliberately not inferred. Older DHk does not pass current DH confirmation.
- AZERTY, QWERTZ and Dvorak remain family checks.

The region checks target the documented mappings, not all layouts for a language. Apple Portuguese variants, custom Linux variants, Wide/Angle customizations, firmware remapping and remote-desktop code translation may only receive a family result. No percentage confidence is invented.

## Sources

Reviewed September 28, 2026:

- Microsoft VS Code keyboard mapping snapshots at commit [`a37ac69a11d0e4f533ff766ba4876864c91d3a2e`](https://github.com/microsoft/vscode/tree/a37ac69a11d0e4f533ff766ba4876864c91d3a2e/src/vs/workbench/services/keybinding/browser/keyboardLayouts): `en.win.ts`, `en-uk.win.ts`, `en-uk.darwin.ts`, `en-intl.win.ts`, `en-intl.darwin.ts`, `es.win.ts`, `es.darwin.ts`, `es-latin.win.ts`, `pt.win.ts`, `pt-br.win.ts`, `pt.darwin.ts`. The last file describes Apple Brazilian – Pro, **not Portugal**, despite its filename. These tables are MIT-licensed; attribution is in `tests/fixtures/LICENSE-vscode.txt`.
- [Keyboard Layout Info: KBDBR.DLL](https://kbdlayout.info/kbdbr) lists ABNT and ABNT2 together and documents the Brazilian character mapping, including the extra / key. The fixture uses Windows character outputs; numpad differences are outside this detector.
- Official [Colemak Mod-DH](https://colemakmods.github.io/mod-dh/) design and variant history.
- Official public-domain [Mod-DH KLC definitions](https://github.com/ColemakMods/mod-dh/tree/d9398d57695089658841f3dc62827ae814aef8c4/klc) at commit `d9398d57695089658841f3dc62827ae814aef8c4`: ANSI US, ISO UK and matrix US. These establish both the confirmation positions and the new guide diagrams.

The fixtures in `tests/fixtures/regional-key-events.json` are independent snapshots of these tables. Windows tables print accent legends rather than DOM `key: "Dead"`; those known dead-key positions are normalized in the snapshots. macOS tables include dead-key flags. The fixture is not generated from the detector profile list.

Reference diagrams in `src/content/reference-layouts.json` show unshifted and Shift legends, including accent symbols. They are schematic character rows. New regional diagrams use Windows PC mappings; DH diagrams explicitly identify ANSI vs matrix. They are not pictures of physical hardware.

## Validation

`npm run test:detector` walks the adaptive prompts using independently sourced Windows/macOS and DH snapshots, in order and out of order, with extra input. It also checks unsupported variants, mixed evidence, DHk fallback, repeat/case handling, Shift layers, modifier guards, and dead-key/IME handling. Browser verification covers the interactive flow with the available active keyboard and visual checks; these fixtures do not substitute for manual testing on every OS/input source.
