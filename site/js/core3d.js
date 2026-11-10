/*
 * Particle core (three.js r149 + custom GLSL).
 *
 * One draw call of N points. The hero layout is a sculpture that rebuilds itself into the
 * current focus domain — a neural network (AI), a shield with a keyhole (SECURITY), a stack of
 * database platters (DATA) and a chip with its traces (IOT). Each rebuild sweeps bottom to top
 * through a swirl, and light pulses then travel along the finished form (signals through the
 * network, a scan up the shield, reads around the platters, current out of the chip).
 * On scroll the vertex shader blends on, with a per-particle stagger:
 *   sculpture (hero) -> spiral galaxy (#expertise) -> wave grid (#architecture) -> GM emblem (page end)
 * The emblem is sampled pixel by pixel from the site logo, colours included.
 *
 * Interaction: the cursor parts the field and reveals live links between nearby particles
 * (computed on the CPU with an exact replica of the shader maths), drag orbits, click sends
 * a shockwave. Public API: ping, boost, shape, stats, refresh, setMotion, destroy.
 */
(function () {
  'use strict';

  function mulberry(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function ease(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }
  function sstep(x) { return ease(x); }
  // Frame-rate independent exponential smoothing.
  function damp(a, b, lambda, dt) { return b + (a - b) * Math.exp(-lambda * dt); }

  /*
   * Hero sculptures. Every builder fills the same N particle slots, so any form can rebuild into
   * any other. `sig` is a 0..1 coordinate along which light travels on the finished form
   * (-1 = loose dust, never lit).
   */
  function buildShapes(N) {
    var TAU = Math.PI * 2, pos = [], sig = [];
    var o = [0, 0, 0, 0];
    function set(x, y, z, u) { o[0] = x; o[1] = y; o[2] = z; o[3] = u; }
    function rotX(a) { var c = Math.cos(a), s = Math.sin(a), y = o[1], z = o[2]; o[1] = y * c - z * s; o[2] = y * s + z * c; }
    function rotZ(a) { var c = Math.cos(a), s = Math.sin(a), x = o[0], y = o[1]; o[0] = x * c - y * s; o[1] = x * s + y * c; }

    // Shared halo: one particle in ten floats around every form and never moves between them.
    var dr = mulberry(4101), dust = new Float32Array(N * 3), halo = new Float32Array(N * 3), i, j;
    for (i = 0; i < N; i++) {
      j = i * 3;
      var u = dr() * 2 - 1, th = dr() * TAU, q = Math.sqrt(1 - u * u), rad = 2.0 + Math.pow(dr(), 2) * 0.95;
      halo[j] = Math.cos(th) * q * rad; halo[j + 1] = u * rad; halo[j + 2] = Math.sin(th) * q * rad;
      // Where everything starts: a wide, thin cloud the first form condenses out of.
      var u2 = dr() * 2 - 1, th2 = dr() * TAU, q2 = Math.sqrt(1 - u2 * u2), r2 = 2.6 + Math.pow(dr(), 0.7) * 5.2;
      dust[j] = Math.cos(th2) * q2 * r2; dust[j + 1] = u2 * r2 * 0.75; dust[j + 2] = Math.sin(th2) * q2 * r2 - 1.2;
    }

    function make(seed, fn) {
      var P = new Float32Array(N * 3), S = new Float32Array(N), r = mulberry(seed);
      var g = function () { return (r() + r() + r() - 1.5) / 1.5; };
      for (var n = 0; n < N; n++) {
        var k = n % 20, j3 = n * 3;
        if (k >= 18) { P[j3] = halo[j3]; P[j3 + 1] = halo[j3 + 1]; P[j3 + 2] = halo[j3 + 2]; S[n] = -1; continue; }
        fn(k, r, g, n);
        P[j3] = o[0]; P[j3 + 1] = o[1]; P[j3 + 2] = o[2]; S[n] = o[3];
      }
      pos.push(P); sig.push(S);
    }
    // Uniform point along a polyline; returns the fraction of its length in o[3].
    function along(line, t, jit, g) {
      var d = t * line.len, a = 0;
      while (a < line.seg.length - 1 && d > line.seg[a]) { d -= line.seg[a]; a++; }
      var p = line.pts[a], p2 = line.pts[a + 1], f = line.seg[a] ? d / line.seg[a] : 0;
      set(p[0] + (p2[0] - p[0]) * f + g() * jit, p[1] + (p2[1] - p[1]) * f + g() * jit, (p[2] || 0) + ((p2[2] || 0) - (p[2] || 0)) * f + g() * jit, t);
    }
    function polyline(pts) {
      var seg = [], len = 0;
      for (var a = 0; a < pts.length - 1; a++) {
        var dx = pts[a + 1][0] - pts[a][0], dy = pts[a + 1][1] - pts[a][1], dz = (pts[a + 1][2] || 0) - (pts[a][2] || 0);
        var l = Math.sqrt(dx * dx + dy * dy + dz * dz); seg.push(l); len += l;
      }
      return { pts: pts, seg: seg, len: len };
    }

    // ---------- 0 · AI: a neural network, signals run input -> output ----------
    (function () {
      var LYR = [3, 5, 5, 3], LX = [-1.62, -0.54, 0.54, 1.62], nodes = [], edges = [], first = [], a, b, l;
      for (l = 0; l < LYR.length; l++) {
        first.push(nodes.length);
        for (a = 0; a < LYR[l]; a++) nodes.push([LX[l], (a - (LYR[l] - 1) / 2) * 0.68, ((a + l) % 2 ? 1 : -1) * 0.3, l]);
      }
      for (l = 0; l < LYR.length - 1; l++) for (a = 0; a < LYR[l]; a++) for (b = 0; b < LYR[l + 1]; b++) edges.push([first[l] + a, first[l + 1] + b]);
      make(1101, function (k, r, g) {
        if (k < 7) {
          var nd = nodes[Math.floor(r() * nodes.length)], u = r() * 2 - 1, th = r() * TAU, q = Math.sqrt(1 - u * u);
          var rad = r() < 0.72 ? 0.17 : 0.17 * Math.cbrt(r());
          set(nd[0] + Math.cos(th) * q * rad, nd[1] + u * rad, nd[2] + Math.sin(th) * q * rad, nd[3] / 3);
        } else {
          var e = edges[Math.floor(r() * edges.length)], p = nodes[e[0]], p2 = nodes[e[1]], t = r();
          set(p[0] + (p2[0] - p[0]) * t + g() * 0.012, p[1] + (p2[1] - p[1]) * t + g() * 0.012, p[2] + (p2[2] - p[2]) * t + g() * 0.012, (p[3] + t) / 3);
        }
      });
    })();

    // ---------- 1 · SECURITY: a domed shield with a keyhole, scanned bottom -> top ----------
    (function () {
      var W = 1.3, YS = 0.25, YB = -1.9, YT = 1.5, PEAK = 0.2;
      var half = function (y) { if (y >= YS) return W; var t = (YS - y) / (YS - YB); return W * (1 - Math.pow(t, 1.75)); };
      var topY = function (x) { return YT + PEAK * (1 - Math.abs(x) / W); };
      var dome = function (x, y) { var a = 1 - (x * x) / 2.1, b = 1 - ((y + 0.1) * (y + 0.1)) / 4.2; return 0.5 * Math.max(0, a) * Math.max(0, b); };
      var pts = [], a, y;
      for (a = 0; a <= 40; a++) { var x = -W + (2 * W) * a / 40; pts.push([x, topY(x)]); }
      for (a = 1; a <= 70; a++) { y = YT + (YB - YT) * a / 70; pts.push([half(y), y]); }
      for (a = 69; a >= 0; a--) { y = YT + (YB - YT) * a / 70; pts.push([-half(y), y]); }
      var rim = polyline(pts), span = YT + PEAK - YB;
      make(2202, function (k, r, g) {
        var x, yy, z;
        if (k < 7) {
          along(rim, r(), 0.012, g);
          var sc = k < 5 ? 1 : 0.86;
          x = o[0] * sc; yy = (o[1] + 0.12) * sc - 0.12;
          set(x, yy, dome(x, yy) + (k < 5 ? 0 : 0.03), (yy - YB) / span);
        } else if (k < 12) {
          // Contour lines across the dome.
          yy = YB + 0.22 + Math.floor(r() * 19) * 0.17;
          var hw = Math.min(half(yy), half(yy + 0.12)) * 0.8;
          x = (r() * 2 - 1) * hw;
          if (yy > topY(x) - 0.32) yy = topY(x) - 0.32;
          set(x, yy + g() * 0.008, dome(x, yy), (yy - YB) / span);
        } else {
          // Keyhole, raised off the dome: a ring, its fill and a flared stem.
          var cyk = 0.42, rk = 0.36;
          if (k < 15) {
            var th = r() * TAU, rr = k === 12 ? rk * Math.sqrt(r()) : rk + g() * 0.012;
            x = Math.cos(th) * rr; yy = cyk + Math.sin(th) * rr;
          } else {
            var t = r(), hw2 = 0.15 + t * 0.15;
            yy = cyk - 0.2 - t * 0.9;
            x = k === 15 ? (r() * 2 - 1) * hw2 : (r() < 0.5 ? -1 : 1) * hw2 + g() * 0.01;
            if (k === 17 && r() < 0.3) { yy = cyk - 1.1 + g() * 0.01; x = (r() * 2 - 1) * 0.3; }
          }
          set(x, yy, dome(x, yy) + 0.14, (yy - YB) / span);
        }
      });
    })();

    // ---------- 2 · DATA: three database platters, light circles each one ----------
    (function () {
      var RD = 1.32, HD = 0.58, GAP = 0.27, TILT = 0.5;
      make(3303, function (k, r, g, n) {
        var d = (k >= 14 && r() < 0.55) ? 2 : n % 3, y0 = (d - 1) * (HD + GAP), th = r() * TAU, y, rad = RD;
        if (k < 8) {
          y = y0 + (k % 2 ? 1 : -1) * HD / 2; rad = RD + g() * 0.012;
        } else if (k < 14) {
          // Wall: vertical bars, like rows of stored blocks.
          th = (Math.floor(r() * 84) + 0.5) / 84 * TAU;
          var bar = Math.floor(r() * 3);
          y = y0 - HD / 2 + (bar + 0.18 + r() * 0.64) * HD / 3;
        } else {
          // Lid: concentric tracks.
          y = y0 + HD / 2; rad = RD * Math.ceil(Math.sqrt(r()) * 6) / 6.5 + g() * 0.008;
        }
        set(Math.cos(th) * rad, y, Math.sin(th) * rad, ((th / TAU) + d / 3) % 1 * 0.5 + 0.0001);
        rotX(TILT);
      });
    })();

    // ---------- 3 · IOT: a chip on its board, current runs out along the traces ----------
    (function () {
      var C = 0.62, lines = [], ends = [], a, s2, jx;
      for (s2 = 0; s2 < 4; s2++) for (jx = -2; jx <= 2; jx++) {
        var aj = Math.abs(jx), y = jx * 0.21, x1 = 0.93 + 0.12 * (2 - aj), dy = jx * 0.2, xe = 1.92 - aj * 0.15;
        var raw = jx === 0 ? [[C, 0], [xe, 0]] : [[C, y], [x1, y], [x1 + Math.abs(dy), y + dy], [xe, y + dy]];
        var ca = Math.cos(s2 * Math.PI / 2), sa = Math.sin(s2 * Math.PI / 2), pl = [];
        for (a = 0; a < raw.length; a++) pl.push([raw[a][0] * ca - raw[a][1] * sa, raw[a][0] * sa + raw[a][1] * ca, -0.09]);
        lines.push(polyline(pl)); ends.push(pl[pl.length - 1]);
      }
      var box = function (hs, z) { return polyline([[-hs, -hs, z], [hs, -hs, z], [hs, hs, z], [-hs, hs, z], [-hs, -hs, z]]); };
      var top = box(C, 0.09), bot = box(C, -0.09), inner = box(0.44, 0.1);
      make(4404, function (k, r, g) {
        if (k < 3) {
          if (k === 2 && r() < 0.35) { var cx = r() < 0.5 ? -C : C, cy = r() < 0.5 ? -C : C; set(cx, cy, (r() * 2 - 1) * 0.09, 0); }
          else { along(k === 0 ? top : k === 1 ? bot : inner, r(), 0.008, g); o[3] = 0; }
        } else if (k < 5) {
          // The die: a grid of cells.
          set((Math.floor(r() * 6) - 2.5) * 0.13 + g() * 0.016, (Math.floor(r() * 6) - 2.5) * 0.13 + g() * 0.016, 0.1, 0.0001);
        } else if (k < 15) {
          along(lines[Math.floor(r() * lines.length)], r(), 0.007, g);
          o[3] = 0.04 + o[3] * 0.4;
        } else {
          // A device at the end of every trace.
          var e = ends[Math.floor(r() * ends.length)], th = r() * TAU, rr = k === 15 ? 0.035 * Math.sqrt(r()) : 0.085 + g() * 0.006;
          set(e[0] + Math.cos(th) * rr, e[1] + Math.sin(th) * rr, e[2], 0.46);
        }
        rotZ(Math.PI / 4); rotX(-0.72);
      });
    })();

    return { pos: pos, sig: sig, dust: dust };
  }

  var VERT = [
    'uniform float uTime, uSize, uPR, uMouseK, uAspect, uPulseT, uFlow, uK;',
    'uniform vec3 uM; uniform vec2 uMouse, uVel, uPulseC; uniform vec3 uAccent, uInk;',
    'attribute vec3 aN, aB, aC, aD, aCol; attribute vec4 aRnd; attribute vec2 aU;',
    'varying vec3 vCol; varying float vA;',
    'float ez(float x){ x = clamp(x, 0.0, 1.0); return x * x * (3.0 - 2.0 * x); }',
    'void main(){',
    '  float s = aRnd.x, st = aRnd.z;',
    '  float t1 = ez(uM.x * 1.4 - st * 0.4), t2 = ez(uM.y * 1.4 - st * 0.4), t3 = ez(uM.z * 1.4 - st * 0.4);',
    // Hero sculpture: rebuild from the current form (position) to the next one (aN), swept bottom to top.
    '  float k = ez(uK * 1.75 - mix(st, clamp(aN.y * 0.26 + 0.5, 0.0, 1.0), 0.62) * 0.75);',
    '  float arc = sin(k * 3.14159265);',
    '  vec3 h = mix(position, aN, k);',
    '  float an = arc * (0.55 + s * 0.9), cs = cos(an), sn = sin(an);',
    '  h = vec3(h.x * cs - h.z * sn, h.y, h.x * sn + h.z * cs) * (1.0 + arc * (0.16 + aRnd.w * 0.4));',
    '  float su = mix(aU.x, aU.y, k);',
    '  vec3 p = mix(h, aB, t1); p = mix(p, aC, t2); p = mix(p, aD, t3);',
    '  float a1 = uFlow * (1.0 - 0.75 * t3) * 0.045 * (0.3 + 0.7 * t1 + arc * 1.2);',
    '  p += a1 * vec3(sin(p.y * 1.7 + uTime * 0.6 + s * 6.2831), sin(p.z * 1.9 + uTime * 0.5 + s * 4.0), sin(p.x * 1.5 + uTime * 0.7 + s * 5.0));',
    '  vec4 mv = modelViewMatrix * vec4(p, 1.0);',
    '  vec4 cl = projectionMatrix * mv; vec2 ndc = cl.xy / cl.w;',
    '  vec2 dv = ndc - uMouse; dv.x *= uAspect; float d = length(dv);',
    '  float f = uMouseK * exp(-d * d * 22.0);',
    '  mv.xy += (d > 1e-4 ? dv / d : vec2(0.0)) * f * 0.2 + uVel * f * 0.05;',
    '  mv.z += f * 0.35;',
    '  float glow = f * 0.55 + arc * 0.5 * (1.0 - t1);',
    // Light travelling along the finished form (su < 0 marks loose dust, which stays dark).
    '  float sig = pow(max(0.0, sin((su * 2.0 - uTime * 0.42) * 6.2831853)), 14.0);',
    '  glow += sig * step(0.0, su) * (1.0 - t1) * (1.0 - arc) * 0.8;',
    '  if (uPulseT >= 0.0) {',
    '    vec2 dp = ndc - uPulseC; dp.x *= uAspect; float pd = length(dp);',
    '    float pt = clamp(uPulseT, 0.0, 1.0), rad = (1.0 - pow(1.0 - pt, 3.0)) * 2.0;',
    '    float w = exp(-pow((pd - rad) * 6.0, 2.0)) * (1.0 - pt) * (1.0 - pt);',
    '    mv.z += w * 0.5; mv.xy += (pd > 1e-4 ? dp / pd : vec2(0.0)) * w * 0.14; glow += w * 1.1;',
    '  }',
    '  gl_Position = projectionMatrix * mv;',
    '  gl_PointSize = uSize * aRnd.y * (1.0 + glow * 0.8) * (1.0 + 0.3 * t3) * uPR * (5.6 / -mv.z);',
    '  vec3 base = mix(uAccent, uInk, step(0.86, aRnd.w));',
    '  base = mix(base, uAccent * 0.5, step(aRnd.w, 0.25));',
    '  vCol = mix(base, aCol, t3) + glow * mix(uAccent, uInk, 0.5) * 0.26;',
    '  float depth = clamp((-mv.z - 3.4) / 4.4, 0.0, 1.0);',
    '  float tw = 0.82 + 0.18 * sin(uTime * 1.6 + s * 41.0);',
    '  vA = (0.38 + 0.46 * s) * (0.8 + glow) * (1.0 - depth * 0.6) * mix(tw, 1.0, t3);',
    '}'
  ].join('\n');

  var FRAG = [
    'uniform float uOpacity; varying vec3 vCol; varying float vA;',
    'void main(){',
    '  float d = length(gl_PointCoord - 0.5);',
    '  float a = smoothstep(0.5, 0.05, d); a *= a;',
    '  gl_FragColor = vec4(vCol, a * vA * uOpacity);',
    '}'
  ].join('\n');

  function init(opts) {
    var THREE = window.THREE, cv = opts.canvas;
    if (!THREE || !cv) return null;

    var motion = opts.motion !== false;
    var coarse = window.matchMedia('(pointer: coarse)').matches;
    var small = window.innerWidth < 760;
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch (e) {
      cv.style.display = 'none';
      return null;
    }
    var PR = Math.min(window.devicePixelRatio || 1, coarse ? 1.35 : 1.5);
    renderer.setPixelRatio(PR);

    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(40, 1, 0.1, 120);
    cam.position.set(0, 0, 5.6);
    scene.add(cam);
    var grp = new THREE.Group();
    scene.add(grp);

    // ---------- Layouts ----------
    var N = (coarse || small) ? 11000 : 22000;
    var B = new Float32Array(N * 3), C = new Float32Array(N * 3), D = new Float32Array(N * 3);
    var RND = new Float32Array(N * 4), COL = new Float32Array(N * 3);
    var R = mulberry(20260914);
    var accent = new THREE.Color(opts.accent || '#00E28A');
    // Text colour of the active theme (light particles and the white parts of the emblem).
    var inkCss = (getComputedStyle(document.documentElement).getPropertyValue('--ink') || '').trim();
    var ink = new THREE.Color(inkCss || '#E7E9E8');
    var i, j, u, v, r, th;
    var gauss = function () { return (R() + R() + R() - 1.5) / 1.5; };

    for (i = 0; i < N; i++) {
      j = i * 3;
      var kind = i % 20;
      // B — three-armed spiral galaxy with a bulge.
      if (kind < 3) {
        B[j] = gauss() * 0.32; B[j + 1] = gauss() * 0.22; B[j + 2] = gauss() * 0.32;
      } else {
        var tt = Math.pow(R(), 0.65), rr = 0.18 + tt * 2.55, arm = (i % 3) * Math.PI * 2 / 3;
        var ang = rr * 1.85 + arm + gauss() * 0.42 * (1 - tt * 0.45);
        var gx0 = Math.cos(ang) * rr, gz0 = Math.sin(ang) * rr, gy0 = gauss() * 0.1 * (1 - tt * 0.6);
        var q, ct = Math.cos(0.42), sn = Math.sin(0.42);
        B[j] = gx0; B[j + 1] = gy0 * ct - gz0 * sn; B[j + 2] = gy0 * sn + gz0 * ct;
      }
      RND[i * 4] = R(); RND[i * 4 + 1] = R() < 0.02 ? 2.3 : 0.55 + R() * 0.95; RND[i * 4 + 2] = R(); RND[i * 4 + 3] = R();
      COL[j] = accent.r; COL[j + 1] = accent.g; COL[j + 2] = accent.b;
    }
    // C — undulating grid.
    var cols = Math.round(Math.sqrt(N * 2.1)), rows = Math.ceil(N / cols);
    for (i = 0; i < N; i++) {
      j = i * 3;
      var c = i % cols, w = Math.floor(i / cols);
      C[j] = (c / (cols - 1) - 0.5) * 6.4;
      C[j + 1] = (w / (rows - 1) - 0.5) * 3.6;
      C[j + 2] = Math.sin(c * 0.11 + w * 0.08) * 0.14 + Math.sin(c * 0.031) * 0.1;
    }
    // D — emblem placeholder (torus knot) until the logo has been sampled.
    for (i = 0; i < N; i++) {
      j = i * 3;
      var t = R() * Math.PI * 2, pk = 2, qk = 3, rk = Math.cos(qk * t) + 2;
      var tube = 0.12 * Math.sqrt(R()), ta = R() * Math.PI * 2;
      D[j] = rk * Math.cos(pk * t) * 0.62 + Math.cos(ta) * tube;
      D[j + 1] = rk * Math.sin(pk * t) * 0.62 + Math.sin(ta) * tube;
      D[j + 2] = -Math.sin(qk * t) * 0.62 + gauss() * 0.04;
    }

    // ---------- Hero sculptures ----------
    var shapes = buildShapes(N);
    // P0 = form on screen, P1 = form being built; A always points at the settled one (used by the link maths).
    var P0 = new Float32Array(shapes.dust), P1 = new Float32Array(shapes.pos[0]), UU = new Float32Array(N * 2);
    for (i = 0; i < N; i++) { UU[i * 2] = -1; UU[i * 2 + 1] = shapes.sig[0][i]; }
    var A = P0, shapeIdx = 0, shapeK = 0, shapeRun = false, shapeDur = 2.7, introDone = false, introWait = 0.25;

    var geo = new THREE.BufferGeometry();
    var attrP = new THREE.BufferAttribute(P0, 3), attrN = new THREE.BufferAttribute(P1, 3), attrU = new THREE.BufferAttribute(UU, 2);
    geo.setAttribute('position', attrP);
    geo.setAttribute('aN', attrN);
    geo.setAttribute('aU', attrU);
    geo.setAttribute('aB', new THREE.BufferAttribute(B, 3));
    geo.setAttribute('aC', new THREE.BufferAttribute(C, 3));
    var attrD = new THREE.BufferAttribute(D, 3), attrCol = new THREE.BufferAttribute(COL, 3);
    geo.setAttribute('aD', attrD);
    geo.setAttribute('aCol', attrCol);
    geo.setAttribute('aRnd', new THREE.BufferAttribute(RND, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

    var U = {
      uTime: { value: 0 }, uSize: { value: (small || coarse) ? 2.9 : 2.6 }, uPR: { value: PR },
      uMouse: { value: new THREE.Vector2(9, 9) }, uVel: { value: new THREE.Vector2() }, uMouseK: { value: 0 }, uAspect: { value: 1 },
      uPulseT: { value: -1 }, uPulseC: { value: new THREE.Vector2() }, uFlow: { value: 1 }, uK: { value: 0 },
      uM: { value: new THREE.Vector3() }, uAccent: { value: new THREE.Vector3(accent.r, accent.g, accent.b) }, uInk: { value: new THREE.Vector3(ink.r, ink.g, ink.b) },
      uOpacity: { value: 1 }
    };
    // Additive glow that never writes alpha: the light adds to whatever page colour is behind the
    // canvas (needed for coloured theme backgrounds; on black it looks the same as plain additive).
    var GLOW = {
      blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor,
      blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor
    };
    var mat = new THREE.ShaderMaterial(Object.assign({
      uniforms: U, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false, depthTest: false
    }, GLOW));
    var points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    grp.add(points);

    // ---------- Emblem: sample the site logo ----------
    (function sampleLogo() {
      var src = opts.logo || (document.querySelector('.brand img') || {}).src;
      if (!src) return;
      var img = new Image();
      img.onload = function () {
        try {
          var W = 300, H = Math.max(1, Math.round(W * img.naturalHeight / img.naturalWidth));
          var c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
          var g2 = c2.getContext('2d');
          g2.drawImage(img, 0, 0, W, H);
          var px = g2.getImageData(0, 0, W, H).data, pool = [];
          for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
            var o = (y * W + x) * 4;
            if (px[o + 3] > 150 && px[o] + px[o + 1] + px[o + 2] > 90) pool.push(x, y, px[o], px[o + 1], px[o + 2]);
          }
          var n = pool.length / 5;
          if (n < 300) return;
          var span = 4.6, rr2 = mulberry(77);
          for (var k = 0; k < N; k++) {
            var pi = Math.floor(rr2() * n) * 5, jj = k * 3;
            D[jj] = ((pool[pi] + rr2()) / W - 0.5) * span;
            D[jj + 1] = -((pool[pi + 1] + rr2()) / H - 0.5) * span * H / W;
            D[jj + 2] = (rr2() - 0.5) * 0.1;
            // Recolour from the theme: saturated (brand green) pixels -> accent, neutral pixels -> ink.
            var cr = pool[pi + 2] / 255, cg = pool[pi + 3] / 255, cb = pool[pi + 4] / 255;
            var mx = Math.max(cr, cg, cb), mn = Math.min(cr, cg, cb), sat = mx > 0 ? (mx - mn) / mx : 0;
            var src = sat > 0.35 ? accent : ink;
            COL[jj] = src.r; COL[jj + 1] = src.g; COL[jj + 2] = src.b;
          }
          attrD.needsUpdate = true; attrCol.needsUpdate = true;
        } catch (e) { /* cross-origin canvas (file://): keep the knot */ }
      };
      img.src = src;
    })();

    // ---------- Live links near the cursor ----------
    var SUB = coarse ? 300 : 560, MAXL = 420, LINK = 0.3, CAND_R = 0.42;
    var subIdx = new Int32Array(SUB);
    for (i = 0; i < SUB; i++) subIdx[i] = Math.floor((i + R() * 0.9) * N / SUB) % N;
    var lpos = new Float32Array(MAXL * 6), lcol = new Float32Array(MAXL * 6);
    var lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3).setUsage(THREE.DynamicDrawUsage));
    lgeo.setAttribute('color', new THREE.BufferAttribute(lcol, 3).setUsage(THREE.DynamicDrawUsage));
    lgeo.setDrawRange(0, 0);
    var lines = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial(Object.assign({ vertexColors: true, transparent: true, depthWrite: false, depthTest: false }, GLOW)));
    lines.frustumCulled = false;
    cam.add(lines);
    var cand = new Float32Array(SUB * 4), candN = 0, linkCount = 0, ordBuf = new Int32Array(32);
    var vtmp = new THREE.Vector3(), ntmp = new THREE.Vector3(), ctmp = new THREE.Vector3();

    // Exact JS replica of the vertex shader for one particle; returns view-space position in vtmp.
    function particleView(idx, time, m, flow, mxs, mys, mk, aspect) {
      var jx = idx * 3, s = RND[idx * 4], st = RND[idx * 4 + 2];
      var t1 = ease(m.x * 1.4 - st * 0.4), t2 = ease(m.y * 1.4 - st * 0.4), t3 = ease(m.z * 1.4 - st * 0.4);
      var px = A[jx] + (B[jx] - A[jx]) * t1, py = A[jx + 1] + (B[jx + 1] - A[jx + 1]) * t1, pz = A[jx + 2] + (B[jx + 2] - A[jx + 2]) * t1;
      px += (C[jx] - px) * t2; py += (C[jx + 1] - py) * t2; pz += (C[jx + 2] - pz) * t2;
      px += (D[jx] - px) * t3; py += (D[jx + 1] - py) * t3; pz += (D[jx + 2] - pz) * t3;
      var a1 = flow * (1 - 0.75 * t3) * 0.045 * (0.3 + 0.7 * t1);
      var fx = Math.sin(py * 1.7 + time * 0.6 + s * 6.2831), fy = Math.sin(pz * 1.9 + time * 0.5 + s * 4.0), fz = Math.sin(px * 1.5 + time * 0.7 + s * 5.0);
      px += a1 * fx; py += a1 * fy; pz += a1 * fz;
      vtmp.set(px, py, pz).applyMatrix4(grp.matrixWorld).applyMatrix4(cam.matrixWorldInverse);
      ntmp.copy(vtmp).applyMatrix4(cam.projectionMatrix);
      var dx = (ntmp.x - mxs) * aspect, dy = ntmp.y - mys, d = Math.sqrt(dx * dx + dy * dy);
      var f = mk * Math.exp(-d * d * 22);
      if (d > 1e-4) { vtmp.x += dx / d * f * 0.2; vtmp.y += dy / d * f * 0.2; }
      vtmp.x += U.uVel.value.x * f * 0.05; vtmp.y += U.uVel.value.y * f * 0.05; vtmp.z += f * 0.35;
      return d;
    }

    function updateLinks(time, aspect) {
      var mk = U.uMouseK.value;
      if (mk < 0.03 || opa < 0.25 || shapeRun || !introDone) { lgeo.setDrawRange(0, 0); linkCount = 0; return; }
      var m = U.uM.value, mxs = U.uMouse.value.x, mys = U.uMouse.value.y, flow = U.uFlow.value;
      candN = 0;
      for (var k = 0; k < SUB && candN < 170; k++) {
        var d = particleView(subIdx[k], time, m, flow, mxs, mys, mk, aspect);
        if (d < CAND_R) { var o = candN * 4; cand[o] = vtmp.x; cand[o + 1] = vtmp.y; cand[o + 2] = vtmp.z; cand[o + 3] = d; candN++; }
      }
      var nl = 0, L2 = LINK * LINK, ar = accent.r, ag = accent.g, ab = accent.b;
      // Tethers: the cursor (projected onto the core's plane) reaches out to the nearest particles.
      ctmp.set(mxs, mys, 0.5).unproject(cam).sub(cam.position).normalize();
      var tk = (grp.position.z - cam.position.z) / ctmp.z;
      ctmp.multiplyScalar(tk).add(cam.position).applyMatrix4(cam.matrixWorldInverse);
      var TETH = Math.min(coarse ? 12 : 18, candN), order = ordBuf, oc = 0;
      for (var q = 0; q < candN; q++) {
        var dq = cand[q * 4 + 3], pos = oc < TETH ? oc++ : TETH;
        if (pos === TETH && dq >= cand[order[TETH - 1] * 4 + 3]) continue;
        if (pos === TETH) pos = TETH - 1;
        while (pos > 0 && cand[order[pos - 1] * 4 + 3] > dq) { order[pos] = order[pos - 1]; pos--; }
        order[pos] = q;
      }
      for (var tq = 0; tq < TETH && nl < MAXL; tq++) {
        var oq = order[tq] * 4, tl = Math.pow(1 - tq / TETH, 1.5) * (1 - cand[oq + 3] / CAND_R) * mk * 1.1, t6 = nl * 6;
        lpos[t6] = ctmp.x; lpos[t6 + 1] = ctmp.y; lpos[t6 + 2] = ctmp.z;
        lpos[t6 + 3] = cand[oq]; lpos[t6 + 4] = cand[oq + 1]; lpos[t6 + 5] = cand[oq + 2];
        lcol[t6] = ar * tl * 0.15; lcol[t6 + 1] = ag * tl * 0.15; lcol[t6 + 2] = ab * tl * 0.15;
        lcol[t6 + 3] = ar * tl; lcol[t6 + 4] = ag * tl; lcol[t6 + 5] = ab * tl;
        nl++;
      }
      for (var a = 0; a < candN && nl < MAXL; a++) {
        var oa = a * 4;
        for (var b = a + 1; b < candN && nl < MAXL; b++) {
          var ob = b * 4, ex = cand[oa] - cand[ob], ey = cand[oa + 1] - cand[ob + 1], ez = cand[oa + 2] - cand[ob + 2];
          var dd = ex * ex + ey * ey + ez * ez;
          if (dd > L2) continue;
          var al = Math.min(1, (1 - Math.sqrt(dd) / LINK) * (1 - Math.max(cand[oa + 3], cand[ob + 3]) / CAND_R) * mk * 2.2);
          var p6 = nl * 6;
          lpos[p6] = cand[oa]; lpos[p6 + 1] = cand[oa + 1]; lpos[p6 + 2] = cand[oa + 2];
          lpos[p6 + 3] = cand[ob]; lpos[p6 + 4] = cand[ob + 1]; lpos[p6 + 5] = cand[ob + 2];
          lcol[p6] = lcol[p6 + 3] = ar * al; lcol[p6 + 1] = lcol[p6 + 4] = ag * al; lcol[p6 + 2] = lcol[p6 + 5] = ab * al;
          nl++;
        }
      }
      linkCount = nl;
      lgeo.attributes.position.needsUpdate = true;
      lgeo.attributes.color.needsUpdate = true;
      lgeo.setDrawRange(0, nl * 2);
    }

    // ---------- Sizing, input ----------
    var vw = 1, vh = 1, aRect = null, aDirty = true, secT = null;
    var anc = { top: 0, left: 0, w: 1, h: 1 };
    function measure() {
      // Document-relative anchor box: read once, then derived from scrollY each frame (no layout reads while scrolling).
      if (opts.anchor) {
        var r0 = opts.anchor.getBoundingClientRect();
        anc = { top: r0.top + window.scrollY, left: r0.left, w: r0.width, h: r0.height };
      }
      secT = null;
    }
    function size(force) {
      var nw = window.innerWidth, nh = cv.clientHeight || window.innerHeight;
      // Mobile address-bar show/hide only changes the visual viewport; the canvas (100lvh) keeps its size.
      if (!force && nw === vw && Math.abs(nh - vh) < 2) { measure(); return; }
      vw = nw; vh = nh;
      renderer.setSize(vw, vh, false);
      cam.aspect = vw / vh; cam.updateProjectionMatrix();
      U.uAspect.value = vw / vh;
      measure();
    }
    size(true);
    function mark() {}
    var rzT = 0;
    window.addEventListener('resize', function () { clearTimeout(rzT); rzT = setTimeout(size, 120); });
    if ('ResizeObserver' in window) new ResizeObserver(function () { measure(); }).observe(document.body);
    window.addEventListener('scroll', mark, { passive: true });

    var tx = 0, ty = 0, cx = 0, cy = 0, drag = false, lx = 0, ly = 0, spotQ = false, mxn = 0.5, myn = 0.3;
    var mouseTarget = 0, mNdcX = 9, mNdcY = 9;
    function onMove(e) {
      mxn = e.clientX / vw; myn = e.clientY / vh;
      mNdcX = mxn * 2 - 1; mNdcY = -(myn * 2 - 1);
      if (e.pointerType === 'mouse' || drag) mouseTarget = motion ? 1 : 0.6;
      if (drag) { ty += (e.clientX - lx) * 0.0055; tx += (e.clientY - ly) * 0.0055; lx = e.clientX; ly = e.clientY; }
      else { tx = (myn - 0.5) * -0.42; ty = (mxn - 0.5) * 0.62; }
      if (opts.spot && !spotQ) {
        spotQ = true;
        requestAnimationFrame(function () {
          spotQ = false;
          opts.spot.style.transform = 'translate3d(' + (mxn * vw).toFixed(0) + 'px,' + (myn * vh).toFixed(0) + 'px,0)';
        });
      }
    }
    var downX = 0, downY = 0, downT = 0;
    function onDown(e) {
      if (e.target && e.target.closest && e.target.closest('a,button,input,textarea,select,[role="dialog"]')) return;
      drag = true; lx = downX = e.clientX; ly = downY = e.clientY; downT = performance.now();
      onMove(e);
    }
    function onUp(e) {
      var wasDrag = drag;
      drag = false;
      if (e && e.pointerType !== 'mouse') mouseTarget = 0;
      // A short, still press on the hero core counts as a click: send a shockwave through it.
      if (!wasDrag || !e || e.type !== 'pointerup') return;
      if (Math.abs(e.clientX - downX) > 6 || Math.abs(e.clientY - downY) > 6 || performance.now() - downT > 450) return;
      var r = opts.anchor && opts.anchor.getBoundingClientRect();
      if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) api.ping();
    }
    function onLeave() { mouseTarget = 0; }
    function onTouch(e) {
      var t = e.touches && e.touches[0];
      if (!t) return;
      mxn = t.clientX / vw; myn = t.clientY / vh;
      mNdcX = mxn * 2 - 1; mNdcY = -(myn * 2 - 1);
      if (e.type === 'touchstart') { mSm.x = mNdcX; mSm.y = mNdcY; }
      mouseTarget = motion ? 0.9 : 0.5;
    }
    function onTouchEnd(e) { if (!e.touches || !e.touches.length) mouseTarget = 0; }
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    // Tilt parallax on phones that expose orientation without a permission prompt (Android).
    if (coarse && motion && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      var base = null;
      window.addEventListener('deviceorientation', function (e) {
        if (e.beta == null || e.gamma == null || drag) return;
        if (!base) base = { b: e.beta, g: e.gamma };
        tx = Math.max(-0.45, Math.min(0.45, (e.beta - base.b) / 60 * -0.42));
        ty = Math.max(-0.6, Math.min(0.6, (e.gamma - base.g) / 45 * 0.6));
      }, { passive: true });
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    // ---------- Loop ----------
    var visH = 2 * Math.tan((40 * Math.PI / 180) / 2) * 5.6;
    var gx = 0, gy = 0, gs = 1, opa = 1, lastO2, raf = 0, frame = 0;
    var time = 0, lastT = 0, fps = 60, slowFor = 0, quality = 3;
    var boost = 0, boostT = 0, spinAcc = 0, pulseT = -1, sway = 0, TAU = Math.PI * 2;
    var mS = new THREE.Vector3(), mSm = new THREE.Vector2(9, 9), energy = 0, lastScrollY = window.scrollY;
    var euler = new THREE.Euler(), qI = new THREE.Quaternion(), qE = new THREE.Quaternion();
    var stats = { nodes: N, edges: 0, yaw: 0, pitch: 0, fps: 60, phase: 'CORE', morph: 0 };

    // The build has landed: the new form becomes the settled one.
    function settle() {
      P0.set(P1);
      for (var n = 0; n < N; n++) UU[n * 2] = UU[n * 2 + 1];
      attrP.needsUpdate = true; attrU.needsUpdate = true;
      shapeK = 0; shapeRun = false; introDone = true;
      U.uK.value = 0;
    }
    // Freeze a build in flight (same maths as the vertex shader) so a new one can start from where the particles are.
    function bake() {
      for (var n = 0; n < N; n++) {
        var j3 = n * 3, s = RND[n * 4], st = RND[n * 4 + 2], w4 = RND[n * 4 + 3];
        var sw = Math.max(0, Math.min(1, P1[j3 + 1] * 0.26 + 0.5));
        var k = ease(shapeK * 1.75 - (st + (sw - st) * 0.62) * 0.75), arc = Math.sin(k * Math.PI);
        var hx = P0[j3] + (P1[j3] - P0[j3]) * k, hy = P0[j3 + 1] + (P1[j3 + 1] - P0[j3 + 1]) * k, hz = P0[j3 + 2] + (P1[j3 + 2] - P0[j3 + 2]) * k;
        var an = arc * (0.55 + s * 0.9), cs = Math.cos(an), sn = Math.sin(an), grow = 1 + arc * (0.16 + w4 * 0.4);
        P0[j3] = (hx * cs - hz * sn) * grow; P0[j3 + 1] = hy * grow; P0[j3 + 2] = (hx * sn + hz * cs) * grow;
        UU[n * 2] = UU[n * 2] + (UU[n * 2 + 1] - UU[n * 2]) * k;
      }
    }
    function setShape(idx, instant) {
      idx = ((idx % shapes.pos.length) + shapes.pos.length) % shapes.pos.length;
      if (idx === shapeIdx) return;
      if (shapeRun || !introDone) bake();
      shapeIdx = idx;
      P1.set(shapes.pos[idx]);
      for (var n = 0; n < N; n++) UU[n * 2 + 1] = shapes.sig[idx][n];
      attrP.needsUpdate = true; attrN.needsUpdate = true; attrU.needsUpdate = true;
      shapeK = 0; shapeDur = 1.9; shapeRun = true; introDone = true;
      if (instant || !motion) settle();
    }

    if (!motion) settle();

    function top(id) {
      var el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 1e6;
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      now = now || performance.now();
      var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 1 / 60;
      if (lastT) fps = fps * 0.93 + (1 / Math.max(0.001, (now - lastT) / 1000)) * 0.07;
      lastT = now;
      frame++;

      var yS = window.scrollY;
      if (!secT) {
        var maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        secT = { e: top('expertise'), p: top('projects'), a: top('architecture'), max: maxS };
      }
      var pB = sstep((yS - (secT.e - vh * 0.95)) / (vh * 0.75));
      var pC = sstep((yS - (secT.a - vh * 1.05)) / (vh * 0.8));
      var dStart = Math.max(secT.max - vh * 0.85, secT.a + vh * 0.2);
      var pD = sstep((yS - dStart) / Math.max(1, secT.max - dStart - vh * 0.05));
      var dim = sstep((yS - (secT.p - vh * 0.4)) / (vh * 0.5)) * (1 - pC);
      // Damped scroll targets: morphs glide even when the page jumps (anchor links, fast flicks).
      mS.x = damp(mS.x, pB, 5, dt); mS.y = damp(mS.y, pC, 5, dt); mS.z = damp(mS.z, pD, 5, dt);
      pB = mS.x; pC = mS.y; pD = mS.z;
      U.uM.value.set(pB, pC, pD);

      // Motion: flow field, spin, mouse field strength, pulse.
      boost = damp(boost, boostT, 3, dt);
      // Scroll energy: a fast flick stirs the field, then it settles.
      var sv = (yS - lastScrollY) / Math.max(dt, 1e-3);
      lastScrollY = yS;
      energy = damp(energy, Math.min(1, Math.abs(sv) / 2400), Math.abs(sv) / 2400 > energy ? 8 : 2.2, dt);
      if (motion) { time += dt * (1 + boost * 1.5 + energy * 1.2); }
      // The sculpture faces the viewer and sways; past the hero the field spins freely again.
      if (pB < 0.02) spinAcc = damp(spinAcc, Math.round(spinAcc / TAU) * TAU, 2.6, dt);
      else if (motion) spinAcc += dt * 0.055 * (1 + boost * 4 + energy * 3) * (1 - pD) * pB;
      sway = motion ? Math.sin(now * 0.00042) * 0.4 * (1 - pB) * (1 - pD) : 0;
      // First build starts once the boot screen is gone, then every change runs on the same clock.
      if (!introDone && !shapeRun && !document.documentElement.classList.contains('is-booting')) {
        introWait -= dt;
        if (introWait <= 0) { shapeRun = true; shapeK = 0; }
      }
      if (shapeRun) {
        shapeK += dt / shapeDur;
        if (shapeK >= 1) settle();
      }
      U.uK.value = shapeK;
      U.uTime.value = time;
      U.uFlow.value = motion ? 1 + boost * 1.4 + energy * 1.8 : 0;
      U.uMouseK.value = damp(U.uMouseK.value, mouseTarget * (1 - dim * 0.7), 4, dt);
      // Spring-smoothed cursor + its velocity (for the wake behind fast moves).
      if (mSm.x > 5) { mSm.x = mNdcX; mSm.y = mNdcY; }
      var px0 = mSm.x, py0 = mSm.y;
      mSm.x = damp(mSm.x, mNdcX, 9, dt); mSm.y = damp(mSm.y, mNdcY, 9, dt);
      var vx = (mSm.x - px0) / Math.max(dt, 1e-3), vy = (mSm.y - py0) / Math.max(dt, 1e-3);
      var vl = Math.sqrt(vx * vx + vy * vy), vmax = 3;
      if (vl > vmax) { vx *= vmax / vl; vy *= vmax / vl; }
      U.uVel.value.set(damp(U.uVel.value.x, vx * (vw / vh), 6, dt), damp(U.uVel.value.y, vy, 6, dt));
      U.uMouse.value.set(mSm.x, mSm.y);
      if (pulseT >= 0) { pulseT += dt * 0.8; if (pulseT > 1.05) pulseT = -1; }
      U.uPulseT.value = pulseT;

      cx = damp(cx, tx, 3.2, dt); cy = damp(cy, ty, 3.2, dt);
      euler.set(cx + pC * 1.02, cy + spinAcc + sway, pC * 0.12);
      qE.setFromEuler(euler);
      grp.quaternion.copy(qE).slerp(qI, pD);

      // Sit inside the hero anchor box at the top, drift to the viewport centre as the page scrolls.
      var tX = 0, tY = 0, tS = 1, an = opts.anchor;
      if (an) {
        var r = { left: anc.left, top: anc.top - yS, width: anc.w, height: anc.h }, visW = visH * (vw / vh);
        var aw = (r.width / vw) * visW;
        var nearS = Math.max(0.24, aw / 4.5);
        var nearX = ((r.left + r.width / 2) / vw - 0.5) * visW;
        var nearY = -((r.top + r.height / 2) / vh - 0.5) * visH;
        var f = sstep((yS - vh * 0.06) / (vh * 0.7));
        var midS = Math.min(0.85, Math.max(0.5, 0.62 * Math.min(1.6, vw / vh)));
        var farS = Math.min(1.25, Math.max(0.8, vw / 1150));
        var emS = Math.min(1.15, (visW * 0.62) / 4.6, (visH * 0.5) / 3.1);
        var s1 = nearS + (midS - nearS) * f, s2 = s1 + (farS - s1) * pC;
        tS = s2 + (emS - s2) * pD;
        tX = nearX * (1 - f); tY = nearY * (1 - f) + visH * 0.12 * pD;
      }
      gx = damp(gx, tX, 4.5, dt); gy = damp(gy, tY, 4.5, dt); gs = damp(gs, tS, 4.5, dt);
      grp.position.set(gx, gy, 0);
      grp.scale.setScalar(gs);

      var tOpa = 1 - 0.06 * pB - (coarse || small ? 0.8 : 0.7) * dim - 0.15 * pC + 0.1 * pD;
      opa = damp(opa, tOpa, 3.5, dt);
      var o2 = Math.min(1, opa).toFixed(2);
      if (o2 !== lastO2) { lastO2 = o2; cv.style.opacity = o2; }

      grp.updateMatrixWorld(true);
      cam.updateMatrixWorld();
      if (frame % 2 === 0 || U.uMouseK.value < 0.03) updateLinks(time, vw / vh);
      // While the field is faded behind reading sections, 30 fps is visually identical and halves the GPU load.
      if (opa > 0.38 || frame % 2 === 0) renderer.render(scene, cam);

      // Adaptive quality: sustained low frame rate -> fewer particles, then pixel ratio 1.
      if (frame > 60) {
        slowFor = fps < 45 ? slowFor + dt : Math.max(0, slowFor - dt * 0.5);
        if (slowFor > 0.9 && quality > 0) {
          quality--; slowFor = 0;
          if (quality === 2) { renderer.setPixelRatio(1); U.uPR.value = 1; }
          else if (quality === 1) geo.setDrawRange(0, Math.floor(N * 0.6));
          else geo.setDrawRange(0, Math.floor(N * 0.4));
        }
      }

      stats.nodes = geo.drawRange.count === Infinity ? N : Math.min(N, geo.drawRange.count);
      stats.edges = linkCount;
      stats.yaw = (((cy + spinAcc + sway) * 180 / Math.PI) % 360 + 360) % 360 * (1 - pD);
      stats.pitch = (cx + pC * 1.02) * 180 / Math.PI * (1 - pD);
      stats.fps = fps;
      stats.phase = pD > 0.5 ? 'EMBLEM' : pC > 0.5 ? 'GRID' : pB > 0.5 ? 'GALAXY' : 'CORE';
      stats.morph = (pB + pC + pD) / 3;
    }
    loop();

    var api = {
      ping: function () {
        var r = opts.anchor && opts.anchor.getBoundingClientRect();
        var inside = r && mNdcX < 2 && (mxn * vw >= r.left && mxn * vw <= r.right && myn * vh >= r.top && myn * vh <= r.bottom);
        if (inside) U.uPulseC.value.set(mNdcX, mNdcY);
        else if (r) U.uPulseC.value.set(((r.left + r.width / 2) / vw) * 2 - 1, -(((r.top + r.height / 2) / vh) * 2 - 1));
        pulseT = 0;
        if (coarse && navigator.vibrate) { try { navigator.vibrate(8); } catch (e) { /* not allowed */ } }
        window.dispatchEvent(new CustomEvent('core:ping'));
      },
      boost: function (on) { boostT = on ? 1 : 0; },
      shape: function (idx, instant) { setShape(idx, instant); },
      stats: function () { return stats; },
      refresh: function () { measure(); },
      setMotion: function (m) { motion = m !== false; },
      destroy: function () {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', size);
        window.removeEventListener('scroll', mark);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        geo.dispose(); mat.dispose(); lgeo.dispose();
        renderer.dispose();
      }
    };
    return api;
  }

  window.GMCore = { init: init };
})();
