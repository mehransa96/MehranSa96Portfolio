// Project illustrations: hand-built SVG line art, one motif per project, drawn in the site's palette
// through CSS classes (so the themed builds recolour them too). 400 × 220 canvas; the key subject sits
// in the middle 220 × 220 so the compact (square-cropped) card thumbnails still read.
(function () {
  'use strict';

  var uid = 0;
  function rng(seed) {
    var s = (seed * 2654435761) >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  function f(n) { return Math.round(n * 10) / 10; }
  function line(x1, y1, x2, y2, cls) { return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" class="' + cls + '"/>'; }
  function rect(x, y, w, h, rx, cls, extra) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + rx + '" class="' + cls + '"' + (extra || '') + '/>'; }
  function circ(x, y, r, cls, extra) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" class="' + cls + '"' + (extra || '') + '/>'; }
  function path(d, cls, extra) { return '<path d="' + d + '" class="' + cls + '"' + (extra || '') + '/>'; }
  function text(x, y, s, cls, anchor) { return '<text x="' + f(x) + '" y="' + f(y) + '" class="' + cls + '" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>'; }
  function i(n) { return ' style="--i:' + n + '"'; }
  // A window frame with a title bar; content is drawn on top by the caller.
  function win(x, y, w, h) {
    return rect(x, y, w, h, 6, 'v-win') + rect(x, y, w, 16, 6, 'v-win-bar') + rect(x, y + 10, w, 6, 0, 'v-win-bar') +
      circ(x + 11, y + 8, 2.4, 'v-dot') + circ(x + 20, y + 8, 2.4, 'v-dot') + circ(x + 29, y + 8, 2.4, 'v-dot');
  }
  function lines(x, y, widths, gap) {
    return widths.map(function (w, k) { return rect(x, y + k * gap, w, 3, 1.5, k ? 'v-line v-line--dim' : 'v-line'); }).join('');
  }
  function svg(kind, body) {
    return '<svg class="vis vis--' + kind + '" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + body + '</svg>';
  }

  var M = {};

  // A unique constellation (fallback for anything without its own motif).
  M.sigil = function (p) {
    var r = rng(p.id * 97 + 13), n = 6 + Math.floor(r() * 5), cx = 200, cy = 110, R = 78, pts = [], h = '';
    for (var k = 0; k < n; k++) {
      var a = (k / n) * Math.PI * 2 + r() * 0.5, rr = R * (0.72 + r() * 0.34);
      pts.push([cx + Math.cos(a) * rr * 1.55, cy + Math.sin(a) * rr]);
    }
    h += '<ellipse cx="200" cy="110" rx="128" ry="84" class="v-ring"/><ellipse cx="200" cy="110" rx="70" ry="46" class="v-ring v-ring--in"/>';
    for (k = 0; k < n; k++) {
      var j = (k + 1 + Math.floor(r() * (n - 2))) % n;
      h += line(pts[k][0], pts[k][1], pts[j][0], pts[j][1], 'v-edge' + (k % 3 === 0 ? ' v-edge--hot' : ''));
      h += line(200, 110, pts[k][0], pts[k][1], 'v-spoke');
    }
    pts.forEach(function (q, k) { h += circ(q[0], q[1], k % 3 === 0 ? 3.6 : 2.4, 'v-node' + (k % 3 === 0 ? ' v-node--hot' : ''), i(k)); });
    return svg('sigil', h + circ(200, 110, 9, 'v-core') + circ(200, 110, 18, 'v-halo'));
  };

  // GMTask: Jalali month grid on a phone, a checklist ticking itself off, and the desktop window behind.
  M.tasks = function () {
    var h = win(168, 22, 206, 150);
    for (var k = 0; k < 4; k++) {
      var y = 56 + k * 26;
      h += rect(246, y, 11, 11, 2, 'v-box');
      h += path('M248.5 ' + (y + 5.5) + ' l2.6 2.8 l4.6 -5.4', 'v-tick', i(k));
      h += rect(265, y + 2, 88 - k * 13, 3, 1.5, 'v-line') + rect(265, y + 8, 52 - k * 6, 2, 1, 'v-line v-line--dim');
    }
    h += rect(246, 158, 108, 3, 1.5, 'v-track') + rect(246, 158, 108, 3, 1.5, 'v-fill');
    h += rect(40, 30, 112, 178, 14, 'v-phone') + rect(72, 36, 48, 5, 2.5, 'v-notch');
    h += rect(52, 52, 58, 5, 2.5, 'v-line') + rect(52, 61, 34, 3, 1.5, 'v-line v-line--dim');
    for (var d = 0; d < 35; d++) {
      var c = d % 7, row = Math.floor(d / 7);
      var cls = d === 17 ? 'v-day v-day--today' : (d % 7 === 6) ? 'v-day v-day--off' : ([3, 9, 15, 22, 24, 30].indexOf(d) >= 0 ? 'v-day v-day--busy' : 'v-day');
      h += rect(52 + c * 12.4, 76 + row * 13, 9, 9, 2, cls);
    }
    h += circ(52 + 3 * 12.4 + 4.5, 76 + 2 * 13 + 4.5, 9, 'v-pulse');
    h += rect(52, 148, 88, 22, 5, 'v-chip') + rect(59, 157, 40, 3, 1.5, 'v-line') + rect(52, 176, 88, 22, 5, 'v-chip v-chip--dim');
    return svg('tasks', h);
  };

  // Kavosh: a schema graph with the shortest JOIN path lighting up between two tables.
  M.graph = function () {
    var N = [[46, 62, 'FIN3.Voucher'], [118, 34], [172, 92], [96, 132], [40, 176], [236, 46], [250, 150], [310, 98], [356, 44], [362, 172, 'GNR.Party'], [180, 188], [292, 196]];
    var E = [[0, 1], [0, 3], [1, 2], [2, 3], [3, 4], [1, 5], [2, 6], [5, 7], [6, 7], [7, 8], [7, 9], [6, 10], [10, 4], [6, 11], [11, 9], [5, 8]];
    var P = [0, 3, 2, 6, 7, 9], h = '';
    E.forEach(function (e) { h += line(N[e[0]][0], N[e[0]][1], N[e[1]][0], N[e[1]][1], 'v-edge'); });
    var d = 'M' + P.map(function (k) { return N[k][0] + ' ' + N[k][1]; }).join(' L');
    h += path(d, 'v-path') + path(d, 'v-path-flow');
    N.forEach(function (n, k) {
      var on = P.indexOf(k) >= 0, end = k === 0 || k === 9, s = end ? 8 : 5;
      h += rect(n[0] - s, n[1] - s, s * 2, s * 2, end ? 4 : 2.5, 'v-table' + (on ? ' v-table--on' : '') + (end ? ' v-table--end' : ''), i(k));
      if (n[2]) h += text(n[0], n[1] + (n[1] > 150 ? -16 : 24), n[2], 'v-label');
    });
    return svg('graph', h + text(200, 18, 'JOIN PATH · 5 HOPS', 'v-label v-label--k'));
  };

  // RepBuilderAssis: question → retrieval → plan → validated T-SQL → RDL, with a packet travelling the line.
  M.pipeline = function () {
    var rid = 'vp-' + (++uid);
    var S = [['PROMPT', 52, 70], ['RETRIEVE', 128, 150], ['PLAN', 200, 70], ['VALIDATE', 272, 150], ['RDL', 348, 70]];
    var d = 'M' + S.map(function (s) { return s[1] + ' ' + s[2]; }).join(' L');
    var h = '<path id="' + rid + '" d="' + d + '" class="v-path"/>' + path(d, 'v-path-flow');
    S.forEach(function (s, k) {
      h += rect(s[1] - 32, s[2] - 15, 64, 30, 5, 'v-stage' + (k === 3 ? ' v-stage--check' : ''), i(k));
      h += text(s[1], s[2] + 3.5, s[0], 'v-label v-label--stage') + text(s[1], s[2] + (s[2] < 100 ? -24 : 32), '0' + (k + 1), 'v-label');
    });
    h += path('M262 151 l6 6 l12 -13', 'v-tick v-tick--big');
    h += '<circle r="5" class="v-packet"><animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto"><mpath href="#' + rid + '"/></animateMotion></circle>';
    return svg('pipeline', h + text(200, 208, 'SELECT … FROM … JOIN … ✓', 'v-label v-label--k'));
  };

  // Enterprise platform: four isometric layers, data rising through them to the interface.
  M.layers = function () {
    var L = ['UI', 'API', 'SERVICES', 'SQL SERVER'], h = '';
    for (var k = L.length - 1; k >= 0; k--) {
      var y = 52 + k * 38, top = k === 0;
      h += path('M110 ' + y + ' L200 ' + (y - 24) + ' L290 ' + y + ' L200 ' + (y + 24) + ' Z', top ? 'v-slab v-slab--hot' : 'v-slab', i(k));
      h += path('M110 ' + y + ' v7 L200 ' + (y + 31) + ' L290 ' + (y + 7) + ' v-7 L200 ' + (y + 24) + ' Z', 'v-slab-side');
      h += line(292, y, 318, y, 'v-edge') + text(324, y + 3, L[k], 'v-label', 'start');
    }
    for (k = 0; k < 3; k++) h += line(170 + k * 30, 182, 170 + k * 30, 58, 'v-rise', i(k));
    h += circ(200, 52, 4, 'v-core') + circ(200, 52, 12, 'v-halo');
    return svg('layers', h + text(76, 112, 'C# · .NET', 'v-label v-label--k', 'middle'));
  };

  // LLM bot on the edge: a chat thread on the left, a globe of edge locations on the right.
  M.chat = function () {
    var h = win(36, 28, 168, 164);
    var B = [[0, 56, 96], [1, 82, 74], [0, 108, 110], [1, 140, 60]];
    B.forEach(function (b, k) {
      var x = b[0] ? 192 - b[2] : 48;
      h += rect(x, b[1], b[2], 20, 8, b[0] ? 'v-bubble v-bubble--me' : 'v-bubble', i(k));
      h += rect(x + 9, b[1] + 8.5, b[2] - 26, 3, 1.5, b[0] ? 'v-line v-line--ink' : 'v-line');
    });
    h += rect(48, 168, 144, 14, 7, 'v-chip v-chip--dim') + circ(184, 175, 4, 'v-core');
    h += '<ellipse cx="296" cy="110" rx="66" ry="66" class="v-globe"/><ellipse cx="296" cy="110" rx="28" ry="66" class="v-globe v-globe--in"/><ellipse cx="296" cy="110" rx="66" ry="22" class="v-globe v-globe--in"/>';
    [[258, 74], [330, 82], [312, 148], [268, 138], [296, 52]].forEach(function (q, k) { h += circ(q[0], q[1], 3, 'v-node v-node--hot', i(k)); });
    h += path('M204 120 C 228 120, 232 100, 258 74', 'v-path') + path('M204 120 C 228 120, 232 100, 258 74', 'v-path-flow');
    return svg('chat', h + text(296, 204, 'EDGE · 300+ POPS', 'v-label v-label--k'));
  };

  // ESP32 fleet over WireGuard: a microcontroller wired to three field nodes through an encrypted ring.
  M.chip = function () {
    var h = '<circle cx="200" cy="110" r="74" class="v-ring v-ring--in"/>';
    [[66, 52], [334, 52], [334, 172], [66, 172]].forEach(function (q, k) {
      h += path('M' + q[0] + ' ' + q[1] + ' L200 110', 'v-path') + path('M' + q[0] + ' ' + q[1] + ' L200 110', 'v-path-flow');
      h += rect(q[0] - 14, q[1] - 10, 28, 20, 4, 'v-table v-table--on', i(k)) + circ(q[0], q[1], 2.4, 'v-core');
    });
    for (var k = 0; k < 6; k++) {
      var o = 176 + k * 9.6, v = 86 + k * 9.6;
      h += line(o, 72, o, 80, 'v-pin') + line(o, 140, o, 148, 'v-pin') + line(162, v, 170, v, 'v-pin') + line(230, v, 238, v, 'v-pin');
    }
    h += rect(170, 80, 60, 60, 6, 'v-die') + rect(182, 92, 36, 36, 3, 'v-die-core');
    h += text(200, 113.5, 'ESP32', 'v-label v-label--stage');
    h += path('M262 30 a14 14 0 0 1 20 0 M257 24 a22 22 0 0 1 30 0', 'v-wave') + circ(272, 36, 2.4, 'v-core');
    h += rect(191, 158, 18, 14, 3, 'v-lock') + path('M195 158 v-5 a5 5 0 0 1 10 0 v5', 'v-lock-arc');
    return svg('chip', h + text(200, 204, 'WIREGUARD · MQTT', 'v-label v-label--k'));
  };

  // Full-stack build and hardening: a web app window behind a checked shield.
  M.shield = function () {
    var h = win(46, 30, 210, 160);
    h += rect(60, 56, 182, 34, 4, 'v-chip v-chip--dim') + lines(70, 66, [92, 64], 9);
    h += rect(60, 100, 86, 76, 4, 'v-chip v-chip--dim') + rect(156, 100, 86, 34, 4, 'v-chip v-chip--dim') + rect(156, 142, 86, 34, 4, 'v-chip');
    h += lines(70, 112, [60, 44, 52, 30], 12);
    h += path('M300 46 L344 62 V104 C344 136 324 158 300 170 C276 158 256 136 256 104 V62 Z', 'v-shield');
    h += path('M300 60 L332 72 V104 C332 128 318 146 300 156 C282 146 268 128 268 104 V72 Z', 'v-shield v-shield--in');
    h += path('M285 107 l10 10 l21 -24', 'v-tick v-tick--big');
    return svg('shield', h + text(300, 196, 'OWASP · CSP · RBAC', 'v-label v-label--k'));
  };

  // LLM pipeline with human review: document → model → reviewer → published.
  M.review = function () {
    var d = 'M60 110 H340', h = path(d, 'v-path') + path(d, 'v-path-flow');
    h += rect(36, 80, 48, 60, 4, 'v-doc') + lines(45, 94, [30, 24, 28, 18], 9);
    h += circ(150, 110, 30, 'v-die') + circ(150, 110, 18, 'v-ring v-ring--in');
    h += path('M150 96 l3.2 9.6 l9.6 3.2 l-9.6 3.2 l-3.2 9.6 l-3.2 -9.6 l-9.6 -3.2 l9.6 -3.2 Z', 'v-spark');
    h += circ(250, 110, 30, 'v-die') + circ(250, 100, 8, 'v-person') + path('M235 128 a15 13 0 0 1 30 0', 'v-person');
    h += circ(270, 86, 10, 'v-badge') + path('M265 86 l3.5 3.5 l6.5 -7', 'v-tick v-tick--big');
    h += rect(320, 84, 48, 52, 4, 'v-doc v-doc--on') + path('M332 110 l9 9 l17 -19', 'v-tick v-tick--big');
    [['INPUT', 60], ['LLM', 150], ['HUMAN', 250], ['OUT', 344]].forEach(function (s, k) { h += text(s[1], 166, s[0], 'v-label', 'middle'); });
    return svg('review', h + text(200, 40, 'DRAFT → REVIEW → PUBLISH', 'v-label v-label--k'));
  };

  // Full web platform on the report engine: an analytics app with live charts.
  M.dashboard = function () {
    var h = win(30, 22, 340, 180);
    h += rect(40, 46, 56, 146, 4, 'v-chip v-chip--dim');
    for (var k = 0; k < 6; k++) h += rect(48, 58 + k * 20, k === 1 ? 40 : 32, 4, 2, k === 1 ? 'v-line v-line--acc' : 'v-line v-line--dim');
    [0, 1, 2].forEach(function (k) { h += rect(106 + k * 88, 46, 80, 36, 4, k === 0 ? 'v-chip' : 'v-chip v-chip--dim') + rect(114 + k * 88, 56, 34, 4, 2, 'v-line') + rect(114 + k * 88, 66, 50, 7, 2, k === 0 ? 'v-line v-line--acc' : 'v-line'); });
    h += rect(106, 90, 168, 102, 4, 'v-chip v-chip--dim');
    var bars = [38, 56, 44, 70, 62, 82, 74, 52];
    bars.forEach(function (b, k) { h += rect(116 + k * 19.5, 182 - b, 11, b, 2, k === 5 ? 'v-bar v-bar--hot' : 'v-bar', i(k)); });
    h += rect(282, 90, 80, 102, 4, 'v-chip v-chip--dim');
    h += path('M290 172 L304 150 L318 158 L332 126 L346 134 L354 108', 'v-path-line') + circ(354, 108, 3.2, 'v-core');
    return svg('dashboard', h);
  };

  // One page for tasks, calendar and metrics: a bento of widgets.
  M.board = function () {
    var h = rect(40, 26, 150, 98, 6, 'v-chip v-chip--dim') + rect(200, 26, 160, 98, 6, 'v-chip v-chip--dim');
    h += rect(40, 132, 100, 64, 6, 'v-chip v-chip--dim') + rect(150, 132, 210, 64, 6, 'v-chip');
    for (var d = 0; d < 28; d++) h += rect(52 + (d % 7) * 18, 44 + Math.floor(d / 7) * 18, 12, 12, 2.5, d === 15 ? 'v-day v-day--today' : ([4, 9, 20, 23].indexOf(d) >= 0 ? 'v-day v-day--busy' : 'v-day'));
    h += '<circle cx="246" cy="75" r="30" class="v-donut"/><circle cx="246" cy="75" r="30" class="v-donut v-donut--on"/>';
    h += text(246, 79, '72%', 'v-label v-label--stage');
    for (var k = 0; k < 3; k++) h += rect(292, 52 + k * 18, 11, 11, 2, 'v-box') + path('M294.5 ' + (57.5 + k * 18) + ' l2.6 2.8 l4.6 -5.4', 'v-tick', i(k)) + rect(310, 56 + k * 18, 38 - k * 8, 3, 1.5, 'v-line');
    h += text(90, 160, '06:42', 'v-label v-label--big');
    h += rect(56, 174, 68, 3, 1.5, 'v-track') + rect(56, 174, 68, 3, 1.5, 'v-fill');
    h += path('M164 182 L190 170 L214 176 L240 152 L266 160 L292 142 L318 148 L346 144', 'v-path-line') + circ(346, 144, 3.2, 'v-core');
    return svg('board', h);
  };

  // Local website analysis agent: a page wireframe under a radar sweep.
  M.radar = function () {
    var h = win(36, 34, 170, 150);
    h += rect(48, 58, 146, 38, 4, 'v-chip v-chip--dim') + lines(56, 68, [80, 56], 10);
    h += lines(48, 108, [140, 120, 132, 96], 12) + rect(48, 160, 64, 14, 4, 'v-chip');
    h += circ(286, 110, 74, 'v-globe') + circ(286, 110, 50, 'v-globe v-globe--in') + circ(286, 110, 26, 'v-ring v-ring--in');
    h += line(212, 110, 360, 110, 'v-spoke') + line(286, 36, 286, 184, 'v-spoke');
    h += '<g class="v-sweep"><path d="M286 110 L286 36 A74 74 0 0 1 350 73 Z" class="v-sweep-cone"/><line x1="286" y1="110" x2="286" y2="36" class="v-sweep-arm"/></g>';
    [[316, 74], [256, 142], [330, 132], [262, 88]].forEach(function (q, k) { h += circ(q[0], q[1], 3, 'v-node v-node--hot', i(k)); });
    h += path('M206 124 L256 142', 'v-edge v-edge--hot') + path('M194 66 L262 88', 'v-edge v-edge--hot');
    return svg('radar', h + circ(286, 110, 4, 'v-core'));
  };

  // Gateway for 16 LLM providers: one front door fanning out to a ring of providers.
  M.hub = function () {
    var h = '', n = 16;
    h += path('M30 110 H160', 'v-path') + path('M30 110 H160', 'v-path-flow') + rect(24, 98, 24, 24, 4, 'v-table v-table--on');
    for (var k = 0; k < n; k++) {
      var a = -Math.PI / 2 + (k / n) * Math.PI * 2, x = 250 + Math.cos(a) * 112 * 0.92, y = 110 + Math.sin(a) * 88;
      h += line(250, 110, x, y, k % 4 === 0 ? 'v-edge v-edge--hot' : 'v-spoke');
      h += circ(x, y, k % 4 === 0 ? 4.2 : 3, k % 4 === 0 ? 'v-node v-node--hot' : 'v-node', i(k));
    }
    h += path('M250 76 L280 93 V127 L250 144 L220 127 V93 Z', 'v-hex') + text(250, 113.5, 'GATE', 'v-label v-label--stage');
    return svg('hub', h + text(250, 214, '16 PROVIDERS · 1 API', 'v-label v-label--k'));
  };

  // DPI-resistant relay: packets slipping through a tunnel past an inspection gate.
  M.tunnel = function () {
    var h = '', rid = 'vt-' + (++uid);
    for (var k = 0; k < 6; k++) h += '<ellipse cx="' + (120 + k * 32) + '" cy="110" rx="' + (12 - k * 0.6) + '" ry="' + (54 - k * 3) + '" class="v-tube"' + i(k) + '/>';
    h += line(120, 56, 280, 74, 'v-edge') + line(120, 164, 280, 146, 'v-edge');
    h += '<path id="' + rid + '" d="M44 110 C 90 110, 110 104, 200 110 S 310 116, 356 110" class="v-path"/>';
    h += rect(28, 94, 32, 32, 5, 'v-table v-table--on') + rect(340, 94, 32, 32, 5, 'v-table v-table--on');
    h += rect(194, 22, 12, 30, 2, 'v-gate') + rect(194, 168, 12, 30, 2, 'v-gate') + text(200, 16, 'DPI', 'v-label');
    for (k = 0; k < 3; k++) h += '<rect x="-6" y="-4" width="12" height="8" rx="2" class="v-packet-r"><animateMotion dur="3.2s" begin="' + (k * 1.05) + 's" repeatCount="indefinite"><mpath href="#' + rid + '"/></animateMotion></rect>';
    return svg('tunnel', h + text(200, 214, 'RUST · TOKIO · SOCKS5', 'v-label v-label--k'));
  };

  // Domain-fronted relay: client → fronting CDN → worker exit → the open web.
  M.relay = function () {
    var d = 'M52 150 C 110 150, 120 80, 170 80 M232 80 C 270 80, 268 150, 300 150', h = path(d, 'v-path') + path(d, 'v-path-flow');
    h += rect(30, 136, 44, 30, 5, 'v-table v-table--on') + rect(40, 168, 24, 4, 2, 'v-line');
    h += path('M150 96 a22 22 0 0 1 8 -40 a30 30 0 0 1 56 -6 a22 22 0 0 1 30 26 a18 18 0 0 1 -6 20 Z', 'v-cloud');
    h += text(200, 82, 'FRONT', 'v-label v-label--stage');
    h += rect(282, 134, 38, 32, 5, 'v-die') + text(301, 154, 'λ', 'v-label v-label--stage');
    h += circ(352, 70, 28, 'v-globe') + '<ellipse cx="352" cy="70" rx="12" ry="28" class="v-globe v-globe--in"/>' + line(324, 70, 380, 70, 'v-globe v-globe--in');
    h += path('M320 140 C 338 120, 344 108, 348 98', 'v-edge v-edge--hot');
    return svg('relay', h + text(200, 204, 'CLIENT → CDN → WORKER → WEB', 'v-label v-label--k'));
  };

  // Design intelligence for AI assistants: type specimen, palette and grid.
  M.swatches = function () {
    var h = '';
    for (var k = 0; k <= 8; k++) h += line(40 + k * 40, 24, 40 + k * 40, 196, 'v-grid');
    h += text(110, 128, 'Aa', 'v-type', 'middle');
    h += lines(180, 60, [130, 96, 112], 12);
    var sw = ['v-sw1', 'v-sw2', 'v-sw3', 'v-sw4', 'v-sw5'];
    sw.forEach(function (c, k) { h += rect(180 + k * 32, 104, 26, 40, 4, 'v-sw ' + c, i(k)); });
    h += rect(180, 158, 78, 24, 12, 'v-btn') + rect(266, 158, 78, 24, 12, 'v-btn v-btn--ghost');
    h += path('M346 46 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 Z', 'v-spark');
    return svg('swatches', h);
  };

  // The portfolio itself: an orb of particles with an orbit.
  M.orb = function (p) {
    var r = rng(p.id * 31 + 7), h = '<ellipse cx="200" cy="110" rx="128" ry="26" class="v-ring v-ring--in"/>';
    for (var k = 0; k < 150; k++) {
      var u = r() * 2 - 1, t = r() * Math.PI * 2, s = Math.sqrt(1 - u * u), x = s * Math.cos(t), z = s * Math.sin(t);
      var R = 70, depth = (z + 1) / 2;
      h += circ(200 + x * R, 110 + u * R, f(0.6 + depth * 1.6), depth > 0.82 ? 'v-dotp v-dotp--hot' : 'v-dotp', ' style="opacity:' + f(0.25 + depth * 0.75) + '"');
    }
    h += circ(328, 110, 4, 'v-core') + circ(328, 110, 10, 'v-halo');
    return svg('orb', h + text(200, 212, 'WEBGL · RTL / LTR', 'v-label v-label--k'));
  };

  // Chrome new-tab page: tabs, a large clock, search and shortcuts.
  M.newtab = function () {
    var h = rect(30, 24, 340, 176, 6, 'v-win') + rect(30, 24, 340, 28, 6, 'v-win-bar');
    h += path('M40 52 V38 a6 6 0 0 1 6 -6 H130 a6 6 0 0 1 6 6 V52', 'v-tab v-tab--on') + path('M140 52 V40 a6 6 0 0 1 6 -6 H220 a6 6 0 0 1 6 6 V52', 'v-tab');
    h += rect(52, 40, 50, 3, 1.5, 'v-line') + rect(152, 42, 44, 3, 1.5, 'v-line v-line--dim');
    h += text(200, 112, '21:47', 'v-clock');
    h += rect(110, 126, 180, 22, 11, 'v-chip v-chip--dim') + circ(124, 137, 4.5, 'v-ring v-ring--in') + rect(136, 135.5, 80, 3, 1.5, 'v-line v-line--dim');
    for (var k = 0; k < 5; k++) h += rect(120 + k * 34, 160, 24, 24, 6, k === 2 ? 'v-chip' : 'v-chip v-chip--dim', i(k)) + circ(132 + k * 34, 172, 4, k === 2 ? 'v-core' : 'v-dot');
    return svg('newtab', h);
  };

  // Personal dashboard on Cloudflare: an edge cloud feeding a stack of widgets.
  M.cloudpanel = function () {
    var h = path('M152 70 a22 22 0 0 1 10 -42 a32 32 0 0 1 60 -4 a24 24 0 0 1 34 28 a20 20 0 0 1 -6 18 Z', 'v-cloud');
    h += text(204, 58, 'D1 · KV', 'v-label v-label--stage');
    [[60, 104], [160, 104], [260, 104]].forEach(function (q, k) {
      var d = 'M' + (q[0] + 40) + ' ' + q[1] + ' C ' + (q[0] + 40) + ' 86, 204 86, 204 72';
      h += path(d, 'v-path') + path(d, 'v-path-flow');
      h += rect(q[0], q[1], 80, 84, 6, k === 1 ? 'v-chip' : 'v-chip v-chip--dim', i(k));
    });
    h += lines(70, 118, [50, 36, 44], 10) + rect(70, 160, 60, 14, 4, 'v-btn v-btn--ghost');
    h += '<circle cx="200" cy="146" r="22" class="v-donut"/><circle cx="200" cy="146" r="22" class="v-donut v-donut--on"/>';
    h += path('M270 170 L284 150 L298 158 L312 128 L328 136', 'v-path-line') + circ(328, 136, 3, 'v-core');
    return svg('cloudpanel', h);
  };

  // Content platform: an editorial layout with a hero image and columns.
  M.article = function () {
    var h = win(70, 20, 260, 184);
    h += rect(84, 46, 232, 70, 4, 'v-chip v-chip--dim') + path('M96 108 L140 72 L170 96 L196 80 L242 108 Z', 'v-mount') + circ(276, 66, 9, 'v-core');
    h += rect(84, 126, 170, 7, 3.5, 'v-line') + rect(84, 139, 120, 4, 2, 'v-line v-line--dim');
    h += lines(84, 154, [70, 64, 70, 50], 10) + lines(166, 154, [70, 58, 66, 44], 10);
    h += rect(250, 152, 66, 40, 4, 'v-chip') + rect(258, 162, 40, 3, 1.5, 'v-line') + rect(258, 172, 30, 3, 1.5, 'v-line v-line--dim');
    return svg('article', h);
  };

  // Report generation CLI: a terminal producing an RDL file.
  M.terminal = function () {
    var h = win(36, 26, 236, 168);
    h += text(50, 64, '$ repgen build ‑‑sql q.sql', 'v-code', 'start');
    h += text(50, 82, '› schema ok · 42 cols', 'v-code v-code--dim', 'start');
    h += text(50, 100, '› layout tablix ✓', 'v-code v-code--dim', 'start');
    h += text(50, 118, '› writing report.rdl', 'v-code v-code--dim', 'start');
    h += rect(50, 132, 160, 4, 2, 'v-track') + rect(50, 132, 160, 4, 2, 'v-fill');
    h += text(50, 160, '$', 'v-code', 'start') + rect(62, 151, 8, 12, 1, 'v-caret');
    h += path('M286 64 H336 L356 84 V170 H286 Z', 'v-doc v-doc--on') + path('M336 64 V84 H356', 'v-doc');
    h += text(321, 132, 'RDL', 'v-label v-label--stage') + lines(298, 96, [40, 30], 10);
    h += path('M272 110 H284', 'v-path-flow');
    return svg('terminal', h);
  };

  // Custom AI skill: a small neural network with a few lit paths.
  M.neural = function () {
    var cols = [[3, 80], [5, 160], [5, 240], [2, 320]], P = [], h = '';
    cols.forEach(function (c) { var a = []; for (var k = 0; k < c[0]; k++) a.push([c[1], 110 + (k - (c[0] - 1) / 2) * 34]); P.push(a); });
    for (var l = 0; l < P.length - 1; l++) P[l].forEach(function (u, a) { P[l + 1].forEach(function (v, b) { h += line(u[0], u[1], v[0], v[1], (a + b + l) % 4 === 0 ? 'v-edge v-edge--hot' : 'v-edge'); }); });
    var n = 0;
    P.forEach(function (c, l) { c.forEach(function (u, k) { h += circ(u[0], u[1], l === 3 ? 7 : 5.5, (k + l) % 3 === 0 || l === 3 ? 'v-node v-node--hot' : 'v-node', i(n++)); }); });
    return svg('neural', h + text(200, 212, 'PROMPT · CONTEXT · OUTPUT', 'v-label v-label--k'));
  };

  // Process automation with RAG: workflow nodes branching into a vector store.
  M.flow = function () {
    var N = [[40, 92, 'TRIGGER'], [130, 92, 'FETCH'], [220, 50, 'EMBED'], [220, 134, 'LLM'], [310, 92, 'SEND']], h = '';
    var E = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]];
    E.forEach(function (e) {
      var a = N[e[0]], b = N[e[1]], d = 'M' + (a[0] + 64) + ' ' + (a[1] + 14) + ' C ' + (a[0] + 84) + ' ' + (a[1] + 14) + ', ' + (b[0] - 20) + ' ' + (b[1] + 14) + ', ' + b[0] + ' ' + (b[1] + 14);
      h += path(d, 'v-path') + path(d, 'v-path-flow');
    });
    N.forEach(function (q, k) { h += rect(q[0], q[1], 64, 28, 6, k === 3 ? 'v-stage v-stage--check' : 'v-stage', i(k)) + text(q[0] + 32, q[1] + 17.5, q[2], 'v-label v-label--stage'); });
    h += path('M234 186 v-20 a18 6 0 0 1 36 0 v20 a18 6 0 0 1 -36 0 Z', 'v-db') + '<ellipse cx="252" cy="166" rx="18" ry="6" class="v-db"/>';
    h += line(252, 78, 252, 160, 'v-edge v-edge--hot');
    return svg('flow', h + text(300, 190, 'VECTOR STORE', 'v-label', 'start'));
  };

  // In-house design system: components on an 8-point grid.
  M.system = function () {
    var h = '';
    for (var k = 0; k <= 12; k++) h += line(40 + k * 26.6, 24, 40 + k * 26.6, 196, 'v-grid');
    h += rect(56, 40, 92, 30, 4, 'v-btn') + rect(158, 40, 92, 30, 4, 'v-btn v-btn--ghost');
    h += rect(266, 44, 44, 22, 11, 'v-toggle') + circ(299, 55, 8, 'v-core');
    h += rect(56, 86, 254, 30, 4, 'v-chip v-chip--dim') + rect(68, 99, 90, 4, 2, 'v-line v-line--dim') + rect(296, 94, 2, 14, 1, 'v-caret');
    h += text(56, 172, 'Aa', 'v-type v-type--sm', 'start');
    [40, 30, 22, 16].forEach(function (s, k) { h += rect(140, 134 + k * 15, s * 3.2, 5, 2.5, k ? 'v-line v-line--dim' : 'v-line'); });
    for (k = 0; k < 4; k++) h += rect(282 + (k % 2) * 30, 130 + Math.floor(k / 2) * 30, 24, 24, 4, 'v-sw v-sw' + (k + 1));
    return svg('system', h);
  };

  // Infrastructure: tunnels, CDN, VPN and DNS arcing across a globe.
  M.globe = function () {
    var h = '<circle cx="200" cy="110" r="84" class="v-globe"/>';
    [60, 34].forEach(function (rx) { h += '<ellipse cx="200" cy="110" rx="' + rx + '" ry="84" class="v-globe v-globe--in"/>'; });
    [-44, 0, 44].forEach(function (dy) { var w = Math.sqrt(84 * 84 - dy * dy); h += '<ellipse cx="200" cy="' + (110 + dy) + '" rx="' + f(w) + '" ry="' + f(w * 0.16) + '" class="v-globe v-globe--in"/>'; });
    var A = [[150, 72, 262, 92], [138, 140, 240, 58], [170, 168, 268, 140]];
    A.forEach(function (a, k) {
      var mx = (a[0] + a[2]) / 2, my = Math.min(a[1], a[3]) - 46, d = 'M' + a[0] + ' ' + a[1] + ' Q ' + mx + ' ' + my + ' ' + a[2] + ' ' + a[3];
      h += path(d, 'v-path') + path(d, 'v-path-flow');
      h += circ(a[0], a[1], 3.4, 'v-node v-node--hot', i(k)) + circ(a[2], a[3], 3.4, 'v-node v-node--hot', i(k + 3));
    });
    h += text(52, 40, 'DNS', 'v-label', 'start') + text(348, 40, 'CDN', 'v-label', 'end') + text(52, 196, 'VPN', 'v-label', 'start') + text(348, 196, 'TUNNEL', 'v-label', 'end');
    return svg('globe', h);
  };

  // FDM 3D printing: a gantry laying down the last layers of a vase.
  M.printer = function () {
    var h = rect(80, 24, 240, 8, 2, 'v-frame') + rect(80, 24, 8, 176, 2, 'v-frame') + rect(312, 24, 8, 176, 2, 'v-frame');
    h += rect(96, 186, 208, 8, 2, 'v-plate');
    h += rect(88, 76, 224, 6, 2, 'v-frame') + rect(212, 64, 34, 26, 4, 'v-die') + path('M222 90 L236 90 L229 102 Z', 'v-nozzle');
    for (var k = 0; k < 12; k++) {
      var y = 182 - k * 6.4, w = 64 + Math.sin(k / 11 * Math.PI) * 26;
      h += rect(200 - w / 2, y, w, 4.4, 2.2, k === 11 ? 'v-layer v-layer--hot' : 'v-layer', i(k));
    }
    h += circ(229, 106, 3, 'v-core') + circ(229, 106, 8, 'v-halo');
    return svg('printer', h + text(352, 112, 'PLA', 'v-label') + text(352, 126, '0.2mm', 'v-label'));
  };

  var BY_ID = {
    1: 'layers', 2: 'chat', 3: 'chip', 4: 'shield', 5: 'review', 7: 'dashboard', 9: 'board', 10: 'radar',
    11: 'hub', 12: 'tunnel', 13: 'relay', 14: 'swatches', 15: 'orb', 16: 'newtab', 17: 'cloudpanel', 18: 'article',
    19: 'terminal', 20: 'neural', 21: 'flow', 22: 'system', 23: 'globe', 24: 'printer'
  };

  function forProject(p) {
    var k = p.visual || BY_ID[p.id];
    return (M[k] || M.sigil)(p);
  }

  window.GMVisuals = { forProject: forProject };
})();
