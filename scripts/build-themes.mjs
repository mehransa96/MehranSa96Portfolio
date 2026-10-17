// Builds themed copies of the site without touching the original colours in site/.
//
// Every colour literal in the CSS, JS and HTML is remapped by role:
//   - the brand accent (#00E28A)            -> the theme's light swatch
//   - neutral greys (background ... text)   -> a ramp bg -> dark swatch -> ink (OKLab interpolation),
//     positioned by the original colour's lightness, so the whole hierarchy carries over
//   - other saturated colours (e.g. amber) and the logo image stay as they are
//
// Output per theme: dist/themes/<key>/ (folder to upload) and dist/portfolio-<key>-standalone.html.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStandalone } from './build-standalone.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');

// Swatches sampled from the reference images (the HEX captions printed in those videos do not match
// the colours shown, so the visible swatches were used). Change a value here to retune a theme.
export const THEMES = {
  blueberry: { label: 'Blueberry · Cream Soda', dark: '#28398B', light: '#FDF1C8', bgDarken: 0.17, midLighten: 0, inkMix: 0.55 },
  teal: { label: 'Cyber Teal · Aqua Foam', dark: '#06363A', light: '#98FFE0', bgDarken: 0, midLighten: 0.1, inkMix: 0.7 }
};

const ORIGINAL = { bg: '#08090A', ink: '#E7E9E8', accent: [0, 226, 138] };

// ---------- colour maths (sRGB <-> OKLab) ----------
const toLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const toSrgb = (c) => { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return Math.round(Math.min(1, Math.max(0, v)) * 255); };
function rgb2lab([r, g, b]) {
  const R = toLin(r), G = toLin(g), B = toLin(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function lab2rgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)];
}
const hex2rgb = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((c) => c + c).join(''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const rgb2hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
const mixLab = (A, B, t) => A.map((v, i) => v + (B[i] - v) * t);

function makePalette(t) {
  const dark = rgb2lab(hex2rgb(t.dark)), light = rgb2lab(hex2rgb(t.light));
  const bg = [Math.max(0.05, dark[0] - t.bgDarken), dark[1] * (1 - t.bgDarken * 1.2), dark[2] * (1 - t.bgDarken * 1.2)];
  const mid = [dark[0] + t.midLighten, dark[1], dark[2]];
  const ink = mixLab(light, rgb2lab([255, 255, 255]), t.inkMix);
  return { bg, mid, ink, accent: hex2rgb(t.light) };
}

const oBg = rgb2lab(hex2rgb(ORIGINAL.bg))[0], oInk = rgb2lab(hex2rgb(ORIGINAL.ink))[0];
const TM = 0.3; // where the dark swatch sits on the original lightness ramp (≈ border colour)

function mapColor(rgb, pal) {
  const [r, g, b] = rgb, A = ORIGINAL.accent;
  if (Math.hypot(r - A[0], g - A[1], b - A[2]) < 80) return pal.accent;
  const lab = rgb2lab(rgb), chroma = Math.hypot(lab[1], lab[2]);
  if (chroma > 0.06 && lab[0] > 0.3) return rgb; // other deliberate colours (amber etc.) stay
  const t = (lab[0] - oBg) / (oInk - oBg);
  let out;
  if (t <= 0) out = mixLab(pal.bg, [0, 0, 0], Math.min(1, -t * 1.2));
  else if (t < TM) out = mixLab(pal.bg, pal.mid, t / TM);
  else out = mixLab(pal.mid, pal.ink, Math.min(1, (t - TM) / (1 - TM)));
  return lab2rgb(out);
}

function transform(text, pal) {
  // rgba()/rgb() with literal numbers
  text = text.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)/g, (m, r, g, b, a) => {
    const c = mapColor([+r, +g, +b], pal);
    return a !== undefined ? `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})` : rgb2hex(c);
  });
  // bare triplet used as --accent-rgb
  text = text.replace(/(--accent-rgb:\s*)(\d+),\s*(\d+),\s*(\d+)/g, (m, k) => `${k}${pal.accent.join(', ')}`);
  // hex colours (#RGB / #RRGGBB) not followed by more word characters (so #about, #top etc. are untouched)
  text = text.replace(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])/g, (m, h) => rgb2hex(mapColor(hex2rgb(h), pal)));
  return text;
}

const FILES = ['index.html', 'css/main.css', 'js/main.js', 'js/hero.js', 'js/core3d.js'];

for (const [key, theme] of Object.entries(THEMES)) {
  const pal = makePalette(theme);
  const out = join(ROOT, 'dist', 'themes', key);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(SITE, out, { recursive: true });
  for (const f of FILES) writeFileSync(join(out, f), transform(readFileSync(join(SITE, f), 'utf8'), pal));
  console.log(`${theme.label}: bg ${rgb2hex(lab2rgb(pal.bg))} · surface ${rgb2hex(lab2rgb(pal.mid))} · ink ${rgb2hex(lab2rgb(pal.ink))} · accent ${rgb2hex(pal.accent)}`);
  buildStandalone(out, join(ROOT, 'dist', `portfolio-${key}-standalone.html`));
}
