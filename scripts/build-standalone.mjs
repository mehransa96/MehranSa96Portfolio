// Builds dist/portfolio-fa-standalone.html: site/index.html with every stylesheet, script,
// font and image inlined, so the page runs from a single file (upload to any host or open locally).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const OUT = join(ROOT, 'dist', 'portfolio-fa-standalone.html');

const MIME = { '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };

const dataUri = (file) => {
  const mime = MIME[extname(file)];
  if (!mime) throw new Error(`No MIME type for ${file}`);
  return `data:${mime};base64,${readFileSync(file).toString('base64')}`;
};

const isLocal = (ref) => !/^(?:[a-z]+:)?\/\//i.test(ref) && !ref.startsWith('data:') && !ref.startsWith('#');

const inlineCss = (cssFile) => {
  const css = readFileSync(cssFile, 'utf8');
  return css.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, ref) =>
    isLocal(ref) ? `url('${dataUri(resolve(dirname(cssFile), ref))}')` : m);
};

const safeScript = (js) => js.replace(/<\/script/gi, '<\\/script');

let html = readFileSync(join(SITE, 'index.html'), 'utf8');

// Font preloads are pointless once fonts are embedded.
html = html.replace(/\s*<link rel="preload"[^>]*as="font"[^>]*>/g, '');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) =>
  isLocal(href) ? `<style>\n${inlineCss(join(SITE, href))}</style>` : m);

html = html.replace(/<script src="([^"]+)"(?: defer)?><\/script>/g, (m, src) =>
  isLocal(src) ? `<script>\n${safeScript(readFileSync(join(SITE, src), 'utf8'))}\n</script>` : m);

html = html.replace(/(<(?:img|link)\b[^>]*?\b(?:src|href)=")([^"]+\.(?:png|webp|svg))"/g, (m, pre, ref) =>
  isLocal(ref) ? `${pre}${dataUri(join(SITE, ref))}"` : m);

const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
const leftovers = [...markup.matchAll(/\b(?:src|href)="(?!https?:|mailto:|tel:|data:|#)([^"]+)"/g)].map((x) => x[1]);
if (leftovers.length) throw new Error(`Unresolved local references: ${leftovers.join(', ')}`);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`Wrote ${OUT} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
