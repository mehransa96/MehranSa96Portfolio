# GMTec — Mehran Sabzali portfolio

Single-page bilingual (FA / EN) portfolio with an interactive WebGL core, built from the Claude Design handoff in `design/`.

## Layout

| Path | What it is |
|---|---|
| `site/` | The website. Plain HTML/CSS/JS, no build step — upload the folder as-is to any static host. |
| `site/js/projects-data.js` | All 23 projects (FA + EN). Edit project content here. |
| `site/js/main.js` | Projects browser, language switch, search palette (Ctrl/⌘ + K), architecture map, mobile menu. |
| `site/js/core3d.js` | The three.js wireframe core that morphs with scroll (core → node network → flat lattice). |
| `site/vendor/three.min.js` | three.js r149, self-hosted. |
| `site/assets/` | Logo, portrait and self-hosted fonts (Vazirmatn, Space Grotesk, IBM Plex Mono). |
| `dist/portfolio-fa-standalone.html` | Everything above inlined into one file — works offline or from any host. |
| `design/claude-design/` | The original Claude Design bundle (prototypes, screenshots, source export), kept for reference. |
| `design/chats/` | The design conversation where every decision was made. |

## Build the standalone file

```sh
npm run build      # writes dist/portfolio-fa-standalone.html
npm run serve      # optional: preview site/ at http://localhost:8080 (needs http-server)
```

To host the single-file version, rename `dist/portfolio-fa-standalone.html` to `index.html` and upload it.

## Behaviour notes

- Language: `EN` / `FA` in the header switches text and page direction (RTL ↔ LTR). The choice is remembered; `?lang=en` forces English.
- Projects: desktop shows the list and a detail panel side by side; on mobile the detail opens under the tapped row (tap again to close). RepBuilderAssis opens by default.
- Keyboard: Ctrl/⌘ + K opens search (↑ ↓ to move, Enter to open, Esc to close); ↑ ↓ / j k step through projects while the project list has focus.
- Motion respects `prefers-reduced-motion`; the 3D scene lowers its quality automatically on slow devices.
