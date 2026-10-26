/*
 * Home-page interactions: boot sequence, name decode, rotating focus line,
 * live HUD around the 3D core, count-up stats and a trailing cursor ring.
 * Everything here is decorative: with JS off or reduced motion the hero reads the same.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>{}=+';
  var rand = function (n) { return Math.floor(Math.random() * n); };
  var lang = function () { return root.getAttribute('lang') === 'en' ? 'en' : 'fa'; };
  var core = function () { return window.__gmCore || null; };

  var DOMAINS = [
    { key: 'AI', fa: 'هوش مصنوعی و LLM', en: 'AI & LLM systems' },
    { key: 'SECURITY', fa: 'امنیت سایبری', en: 'Cyber security' },
    { key: 'DATA', fa: 'پایگاه داده و SQL Server', en: 'Databases & SQL Server' },
    { key: 'IOT', fa: 'IoT و فول‌استک', en: 'IoT & full-stack' }
  ];

  // ---------- Boot sequence (once per browser session) ----------
  function boot(done) {
    var seen = false;
    try { seen = sessionStorage.getItem('gm-boot') === '1'; sessionStorage.setItem('gm-boot', '1'); } catch (e) { seen = true; }
    if (seen || reduced) { done(); return; }

    var stats = core() && core().stats ? core().stats() : { nodes: 32000 };
    var lines = [
      ['> gmtec.core --init', ''],
      ['particles', Number(stats.nodes).toLocaleString('en-US')],
      ['shaders', 'glsl compiled'],
      ['emblem', 'sampled'],
      ['status', 'online']
    ];
    var el = document.createElement('div');
    el.className = 'boot';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="boot__in" dir="ltr">' +
      '<div class="boot__brand"><span class="boot__dot"></span>GMTEC · MEHRAN SABZALI</div>' +
      lines.map(function (l, i) {
        return '<div class="boot__l" style="--i:' + i + '">' +
          (l[1] ? '<span>' + l[0] + '</span><span class="boot__fill"></span><b>' + l[1] + '</b>' : '<span class="boot__cmd">' + l[0] + '</span>') + '</div>';
      }).join('') +
      '<div class="boot__bar"><i></i></div></div>';
    document.body.appendChild(el);
    root.classList.add('is-booting');

    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      el.classList.add('is-out');
      root.classList.remove('is-booting');
      done();
      setTimeout(function () { el.remove(); }, 900);
      window.removeEventListener('keydown', finish);
    };
    el.addEventListener('pointerdown', finish);
    window.addEventListener('keydown', finish);
    setTimeout(finish, 1500);
  }

  // ---------- Name: decode on load, ripple + re-scramble on hover ----------
  function initName() {
    var h = $('heroName');
    if (!h) return { play: function () {} };
    var text = h.textContent;
    h.textContent = '';
    var chars = text.split('').map(function (ch) {
      var s = document.createElement('span');
      s.className = ch === ' ' ? 'nm nm--sp' : 'nm';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.dataset.ch = ch;
      h.appendChild(s);
      return s;
    });

    // Lock each letter's width so random glyphs never shift the line.
    var lock = function () {
      // Measure the real letters, even if a scramble is mid-flight.
      var shown = chars.map(function (s) { return s.textContent; });
      chars.forEach(function (s) { s.style.width = ''; s.textContent = s.dataset.ch === ' ' ? '\u00a0' : s.dataset.ch; });
      chars.forEach(function (s) { s.style.width = s.getBoundingClientRect().width + 'px'; });
      chars.forEach(function (s, i) { s.textContent = shown[i]; });
    };
    lock();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(lock);
    window.addEventListener('resize', function () { lock(); });

    function scramble(s, dur) {
      if (s.dataset.ch === ' ' || s._busy) return;
      s._busy = true;
      var end = performance.now() + dur;
      s.classList.add('is-scr');
      (function tick() {
        if (performance.now() >= end) { s.textContent = s.dataset.ch; s.classList.remove('is-scr'); s._busy = false; return; }
        s.textContent = GLYPHS[rand(GLYPHS.length)];
        setTimeout(tick, 45);
      })();
    }

    if (finePointer && !reduced) {
      // Read letter positions once per hover, then write at most once per frame (no layout thrash).
      var boxes = null, px = 0, queued = false;
      h.addEventListener('pointerenter', function () {
        boxes = chars.map(function (s) { var r = s.getBoundingClientRect(); return [r.left + r.width / 2, r.width]; });
      });
      h.addEventListener('pointermove', function (e) {
        px = e.clientX;
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          if (!boxes) return;
          chars.forEach(function (s, i) {
            var d = Math.abs(px - boxes[i][0]) / (boxes[i][1] * 3.2), lift = Math.max(0, 1 - d);
            s.style.setProperty('--lift', (lift * lift * -0.12).toFixed(3) + 'em');
            s.style.setProperty('--wt', String(Math.round(lift * lift * 100)));
          });
        });
      });
      h.addEventListener('pointerleave', function () {
        chars.forEach(function (s) { s.style.setProperty('--lift', '0em'); s.style.setProperty('--glow', '0'); s.style.setProperty('--wt', '0'); });
      });
      chars.forEach(function (s) { s.addEventListener('pointerenter', function () { scramble(s, 260); }); });
    }

    return {
      play: function () {
        if (reduced) return;
        chars.forEach(function (s, i) { setTimeout(function () { scramble(s, 380 + i * 55); }, 120 + i * 18); });
      }
    };
  }

  // ---------- Rotating focus line, linked to the domain tokens and the core ----------
  function initRotator() {
    var box = $('heroRot'), tokens = document.querySelectorAll('[data-dom]');
    if (!box) return;
    var idx = 0, timer = 0, hold = false;
    box.classList.add('is-js');

    function render(animate) {
      var d = DOMAINS[idx], l = lang();
      var old = box.querySelector('.rot__w.is-on[data-l="' + l + '"]');
      var w = document.createElement('span');
      w.className = 'rot__w';
      w.setAttribute('data-l', l);
      w.textContent = d[l];
      box.querySelectorAll('.rot__w:not([data-l="' + l + '"])').forEach(function (n) { n.remove(); });
      box.appendChild(w);
      // Animate the slot width to the new word.
      var nw = w.getBoundingClientRect().width;
      box.style.width = nw + 'px';
      requestAnimationFrame(function () { w.classList.add('is-on'); });
      if (old) {
        old.classList.remove('is-on');
        old.classList.add('is-out');
        setTimeout(function () { old.remove(); }, animate ? 600 : 0);
      }
      Array.prototype.forEach.call(tokens, function (t) { t.classList.toggle('is-on', Number(t.getAttribute('data-dom')) === idx); });
      var f = document.querySelector('[data-hud="focus"]');
      if (f) f.textContent = d.key;
    }

    function next() { if (!hold) { idx = (idx + 1) % DOMAINS.length; render(true); } }
    function start() { clearInterval(timer); if (!reduced) timer = setInterval(next, 2800); }

    Array.prototype.forEach.call(tokens, function (t) {
      var go = function () {
        hold = true; idx = Number(t.getAttribute('data-dom')); render(true);
        if (core()) core().boost(true);
      };
      var leave = function () { hold = false; if (core()) core().boost(false); start(); };
      t.addEventListener('pointerenter', go);
      t.addEventListener('pointerleave', leave);
      t.addEventListener('click', function () { go(); if (core()) core().ping(); setTimeout(leave, 1600); });
    });

    window.addEventListener('gm:lang', function () { render(false); });
    render(false);
    start();
  }

  // ---------- Live HUD around the core ----------
  function initHud() {
    var hud = $('hud'), anchor = $('anchor');
    if (!hud || !anchor) return;
    var cells = {};
    Array.prototype.forEach.call(hud.querySelectorAll('[data-hud]'), function (b) { cells[b.getAttribute('data-hud')] = b; });
    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(anchor);
    }
    var fmt = function (v, w) { var s = Math.abs(v).toFixed(1); while (s.length < w) s = '0' + s; return s; };
    setInterval(function () {
      var c = core();
      if (!visible || !c || !c.stats) return;
      var st = c.stats();
      cells.yaw.textContent = fmt(st.yaw, 5) + '°';
      cells.pitch.textContent = (st.pitch < 0 ? '−' : '+') + fmt(st.pitch, 4) + '°';
      cells.fps.textContent = String(Math.min(144, Math.round(st.fps)));
      cells.nodes.textContent = Number(st.nodes).toLocaleString('en-US');
      cells.edges.textContent = String(st.edges);
      cells.phase.textContent = st.phase;
    }, 120);

    if (finePointer) {
      anchor.addEventListener('pointermove', function (e) {
        var r = anchor.getBoundingClientRect();
        hud.style.setProperty('--hx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
        hud.style.setProperty('--hy', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
        hud.classList.add('is-aim');
      });
      anchor.addEventListener('pointerleave', function () { hud.classList.remove('is-aim'); });
    }

    var ping = $('hudPing');
    window.addEventListener('core:ping', function () {
      hud.classList.remove('is-pinged');
      void hud.offsetWidth;
      hud.classList.add('is-pinged');
      if (ping) {
        ping.style.setProperty('--px', hud.style.getPropertyValue('--hx') || '50%');
        ping.style.setProperty('--py', hud.style.getPropertyValue('--hy') || '50%');
      }
    });
  }

  // ---------- Count-up for the meta numbers ----------
  function countUp() {
    if (reduced) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el, i) {
      var to = Number(el.getAttribute('data-count')), t0 = 0, dur = 1100 + i * 250;
      el.textContent = '0';
      setTimeout(function () {
        (function f(ts) {
          if (!t0) t0 = ts;
          var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          el.textContent = String(Math.round(to * e));
          if (k < 1) requestAnimationFrame(f);
        })(performance.now());
      }, 900);
    });
  }

  // ---------- Cursor ring (desktop, native cursor kept) ----------
  function initCursor() {
    if (!finePointer || reduced) return;
    var ring = document.createElement('div');
    ring.className = 'cring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    var x = -100, y = -100, rx = -100, ry = -100, on = false, raf = 0;
    var HOT = 'a, button, [data-pj], .fcard, .xcard, .layer, input, [data-dom], .hero__anchor';
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!on) { on = true; rx = x; ry = y; ring.classList.add('is-on'); }
      var t = e.target && e.target.closest ? e.target.closest(HOT) : null;
      ring.classList.toggle('is-hot', !!t);
      ring.classList.toggle('is-core', !!(t && t.classList.contains('hero__anchor')));
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { on = false; ring.classList.remove('is-on'); });
    window.addEventListener('pointerdown', function () { ring.classList.add('is-down'); });
    window.addEventListener('pointerup', function () { ring.classList.remove('is-down'); });
    function loop() {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
      raf = (Math.abs(x - rx) + Math.abs(y - ry) > 0.2) ? requestAnimationFrame(loop) : 0;
    }
  }

  // ---------- Magnetic header buttons ----------
  function initMagnetic() {
    if (!finePointer || reduced) return;
    Array.prototype.forEach.call(document.querySelectorAll('.hbtn, .brand'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = 'translate(' + (dx * 6).toFixed(1) + 'px,' + (dy * 5).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  function init() {
    initMagnetic();
    var name = initName();
    initRotator();
    initHud();
    initCursor();
    boot(function () { name.play(); countUp(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
