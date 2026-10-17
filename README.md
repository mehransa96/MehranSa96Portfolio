# GMTec — Mehran Sabzali portfolio

Single-page bilingual (FA / EN) portfolio with an interactive WebGL particle core, built from the Claude Design handoff in `design/`.

## Layout

| Path | What it is |
|---|---|
| `site/` | The website. Plain HTML/CSS/JS, no build step — upload the folder as-is to any static host. |
| `site/js/projects-data.js` | All 25 projects (FA + EN). Edit project content here. |
| `site/js/main.js` | Projects browser, language switch, search palette (Ctrl/⌘ + K), architecture map, mobile menu. |
| `site/js/core3d.js` | The particle core: 32k GPU particles in custom GLSL (14k on mobile) that morph with scroll — core → spiral galaxy → wave grid → the GM emblem sampled from the logo. The cursor parts the field and tethers to nearby particles; click sends a shockwave; quality adapts to the device. |
| `site/js/hero.js` | Home-page interactions: once-per-session boot sequence, name decode, rotating focus line, live HUD around the core, count-up stats, cursor ring. |
| `site/vendor/three.min.js` | three.js r149, self-hosted. |
| `site/assets/` | Logo, portrait and self-hosted fonts (Vazirmatn, Space Grotesk, IBM Plex Mono). |
| `dist/portfolio-fa-standalone.html` | Everything above inlined into one file — works offline or from any host. |
| `dist/themes/<theme>/`, `dist/portfolio-<theme>-standalone.html` | The two themed variants (`blueberry`, `teal`) — same site, colours remapped at build time. |
| `scripts/build-themes.mjs` | Theme generator. Swatch values live in the `THEMES` table at the top. |
| `design/claude-design/` | The original Claude Design bundle (prototypes, screenshots, source export), kept for reference. |
| `design/chats/` | The design conversation where every decision was made. |

## Build the standalone file

```sh
npm run build          # original standalone + both themed variants
npm run build:themes   # themed variants only
npm run serve      # optional: preview site/ at http://localhost:8080 (needs http-server)
```

To host the single-file version, rename `dist/portfolio-fa-standalone.html` to `index.html` and upload it.

## Behaviour notes

- Menu: on phones the menu button sits at the start edge and the drawer slides in from it (right in Persian, left in English); swipe it back to close.
- Language: `EN` / `FA` in the header switches text and page direction (RTL ↔ LTR). The choice is remembered; `?lang=en` forces English.
- Projects: a featured showcase (bento grid on desktop, swipe carousel on mobile) sits above the browser, which has category filters with counts and inline search. Desktop shows the list and a detail panel side by side; on mobile the detail opens under the tapped row (tap again to close). RepBuilderAssis opens by default.
- Keyboard: Ctrl/⌘ + K opens search (↑ ↓ to move, Enter to open, Esc to close); ↑ ↓ / j k step through projects while the project list has focus.
- Motion respects `prefers-reduced-motion`; the 3D scene lowers its quality automatically on slow devices.

## Themes

The original palette in `site/` is never edited. `scripts/build-themes.mjs` copies the site and remaps every colour by role:
accent → the theme's light swatch; the neutral ramp (background, surfaces, lines, text) → background → dark swatch → ink,
interpolated in OKLab by each colour's original lightness; other deliberate colours and the logo image stay unchanged.
The particle field reads `--accent` and `--ink` from CSS, so it follows the theme too.

| Theme | Dark swatch | Light swatch |
|---|---|---|
| Blueberry · Cream Soda | `#28398B` | `#FDF1C8` |
| Cyber Teal · Aqua Foam | `#06363A` | `#98FFE0` |

Swatches were sampled from the reference images (their printed HEX captions don't match the colours shown).

## GitHub Pages

`.github/workflows/pages.yml` publishes `site/` (plus the single-file build at `/standalone.html` and the themes at `/themes/blueberry/` and `/themes/teal/`) on every push to `main`.
One-time setup in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Pages on a private repository needs a paid GitHub plan; on the free plan, make the repository public first.
