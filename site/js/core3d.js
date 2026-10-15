/*
 * Nested wireframe core (three.js r149).
 * Scroll morph: core -> node network (at #expertise) -> flat lattice (at #architecture).
 * Mouse moves parallax, dragging orbits, the hero anchor box sets the initial position and size.
 */
(function () {
  'use strict';

  function init(opts) {
    var THREE = window.THREE, cv = opts.canvas;
    if (!THREE || !cv) return null;

    var accent = opts.accent || '#00E28A';
    var motion = opts.motion !== false;
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      cv.style.display = 'none';
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(40, 1, 0.1, 120);
    cam.position.set(0, 0, 5.6);
    var grp = new THREE.Group();
    scene.add(grp);

    // Three point layouts sharing one buffer: A = nested shells, B = node network, C = flat lattice.
    var N = 744, PER = N / 3;
    var PA = new Float32Array(N * 3), PB = new Float32Array(N * 3), PC = new Float32Array(N * 3);
    var cur = new Float32Array(N * 3);
    var GOLD = Math.PI * (3 - Math.sqrt(5));
    var shellR = [1.52, 1.02, 0.6];
    var cols = 28;
    var i, j, k;
    for (i = 0; i < N; i++) {
      var s = i % 3;
      k = Math.floor(i / 3);
      var y = 1 - (k / (PER - 1)) * 2, rr = Math.sqrt(Math.max(0, 1 - y * y)), th = GOLD * k;
      var R = shellR[s];
      PA[i * 3] = Math.cos(th) * rr * R; PA[i * 3 + 1] = y * R; PA[i * 3 + 2] = Math.sin(th) * rr * R;
      var R2 = 1.15 + s * 0.42 + Math.sin(k * 0.73) * 0.3;
      PB[i * 3] = Math.cos(th * 1.31) * rr * R2 * 1.5;
      PB[i * 3 + 1] = y * R2 * 1.25 + Math.sin(k * 0.41) * 0.14;
      PB[i * 3 + 2] = Math.sin(th * 1.31) * rr * R2 * 1.5;
      var col = i % cols, row = Math.floor(i / cols);
      PC[i * 3] = (col / (cols - 1) - 0.5) * 5.6;
      PC[i * 3 + 1] = (row / (Math.ceil(N / cols) - 1) - 0.5) * 3.1;
      PC[i * 3 + 2] = Math.sin(col * 0.55 + row * 0.42) * 0.16;
    }
    cur.set(PA);

    var posAttr = new THREE.BufferAttribute(cur, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);

    function dist(P, a, b) {
      var dx = P[a * 3] - P[b * 3], dy = P[a * 3 + 1] - P[b * 3 + 1], dz = P[a * 3 + 2] - P[b * 3 + 2];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    // Network edges: each node links to its two nearest neighbours in layout B (deduplicated, length-capped).
    var idxB = [], idxC = [], seen = new Set();
    for (i = 0; i < N; i++) {
      var best = -1, bd = 1e9, b2 = -1, bd2 = 1e9;
      for (j = 0; j < N; j++) {
        if (j === i) continue;
        var dd = dist(PB, i, j);
        if (dd < bd) { b2 = best; bd2 = bd; best = j; bd = dd; } else if (dd < bd2) { b2 = j; bd2 = dd; }
      }
      [[best, bd, 0.9], [b2, bd2, 0.75]].forEach(function (e) {
        var jj = e[0];
        if (jj < 0 || e[1] > e[2]) return;
        var key = i < jj ? i + '_' + jj : jj + '_' + i;
        if (seen.has(key)) return;
        seen.add(key); idxB.push(i, jj);
      });
      var c2 = i % cols;
      if (c2 < cols - 1 && i + 1 < N) idxC.push(i, i + 1);
      if (i + cols < N) idxC.push(i, i + cols);
    }

    function mkLines(idx, color, op) {
      var g = new THREE.BufferGeometry();
      g.setAttribute('position', posAttr);
      g.setIndex(idx);
      var o = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: op }));
      grp.add(o);
      return o;
    }
    var lnB = mkLines(idxB, accent, 0);
    var lnC = mkLines(idxC, 0x8A9391, 0);

    var shells = [];
    [[1.52, 1, 0.2], [1.02, 1, 0.42], [0.6, 0, 0.75]].forEach(function (sh, n) {
      var g = new THREE.IcosahedronGeometry(sh[0], sh[1]);
      var m = new THREE.LineSegments(new THREE.WireframeGeometry(g), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: sh[2] }));
      m.userData = { base: sh[2], sp: [0.0011 + n * 0.0007, 0.0016 - n * 0.0004, 0.0005 + n * 0.0003] };
      grp.add(m); shells.push(m); g.dispose();
    });

    var pg = new THREE.BufferGeometry();
    pg.setAttribute('position', posAttr);
    var pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xE7E9E8, size: 0.028, transparent: true, opacity: 0.5, sizeAttenuation: true }));
    grp.add(pts);

    var nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.85 }));
    var halo = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 22), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.07 }));
    grp.add(nucleus); grp.add(halo);
    var ringPts = [];
    for (k = 0; k < 108; k++) { var a = k / 108 * Math.PI * 2; ringPts.push(new THREE.Vector3(Math.cos(a) * 1.95, 0, Math.sin(a) * 1.95)); }
    var ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color: 0xE7E9E8, transparent: true, opacity: 0.12 }));
    ring.rotation.x = 0.44; grp.add(ring);

    // Pulse wave: a ring that expands through the shells when the core is clicked.
    var waveGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
    var waves = [0, 1].map(function () {
      var w = new THREE.LineLoop(waveGeo, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false }));
      w.rotation.x = Math.PI / 2; w.visible = false; grp.add(w); return w;
    });
    var pulse = -1, boost = 0, boostT = 0, spinAcc = 0;

    // Signals: small points travelling along network edges.
    var SIG = 46, sigPos = new Float32Array(SIG * 3), sig = [];
    var nE = idxB.length / 2;
    for (k = 0; k < SIG; k++) sig.push({ e: Math.floor(Math.random() * nE), t: Math.random(), v: 0.004 + Math.random() * 0.009 });
    var sigGeo = new THREE.BufferGeometry();
    sigGeo.setAttribute('position', new THREE.BufferAttribute(sigPos, 3));
    var sigPts = new THREE.Points(sigGeo, new THREE.PointsMaterial({ color: accent, size: 0.07, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false }));
    grp.add(sigPts);

    var vw = 1, vh = 1, aRect = null, aDirty = true, secT = null;
    function size() {
      vw = window.innerWidth; vh = window.innerHeight;
      renderer.setSize(vw, vh, false);
      cam.aspect = vw / vh; cam.updateProjectionMatrix();
      aDirty = true; secT = null;
    }
    size();
    function mark() { aDirty = true; }
    window.addEventListener('resize', size);
    window.addEventListener('scroll', mark, { passive: true });

    var tx = 0, ty = 0, cx = 0, cy = 0, drag = false, lx = 0, ly = 0, spotQ = false, mxn = 0.5, myn = 0.3;
    function onMove(e) {
      mxn = e.clientX / vw; myn = e.clientY / vh;
      if (drag) { ty += (e.clientX - lx) * 0.0055; tx += (e.clientY - ly) * 0.0055; lx = e.clientX; ly = e.clientY; }
      else { tx = (myn - 0.5) * -0.42; ty = (mxn - 0.5) * 0.62; }
      if (opts.spot && !spotQ) {
        spotQ = true;
        requestAnimationFrame(function () {
          spotQ = false;
          opts.spot.style.setProperty('--sx', (mxn * 100).toFixed(1) + '%');
          opts.spot.style.setProperty('--sy', (myn * 100).toFixed(1) + '%');
        });
      }
    }
    var downX = 0, downY = 0, downT = 0;
    function onDown(e) {
      if (e.target && e.target.closest && e.target.closest('a,button,input,textarea,select,[role="dialog"]')) return;
      drag = true; lx = downX = e.clientX; ly = downY = e.clientY; downT = performance.now();
    }
    function onUp(e) {
      var wasDrag = drag;
      drag = false;
      // A short, still press on the hero core counts as a click: send a pulse through it.
      if (!wasDrag || !e || e.type !== 'pointerup' || !aRect) return;
      if (Math.abs(e.clientX - downX) > 6 || Math.abs(e.clientY - downY) > 6 || performance.now() - downT > 450) return;
      var r = opts.anchor && opts.anchor.getBoundingClientRect();
      if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) api.ping();
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });

    function sstep(x) { var t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); }
    var visH = 2 * Math.tan((40 * Math.PI / 180) / 2) * 5.6;
    var fps = 60, lastT = 0, stats = { nodes: N, edges: idxB.length / 2, yaw: 0, pitch: 0, fps: 60, phase: 'CORE', morph: 0 };
    var frame = 0, gx = 0, gy = 0, gs = 1, opa = 1, lastPB, lastPC, lastO2, ft = 0, lowQ = false, skip = false, raf = 0;

    function top(id) {
      var el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 1e6;
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      frame++;
      var yS = window.scrollY;
      if (!secT || frame % 45 === 1) secT = { e: top('expertise'), p: top('projects'), a: top('architecture') };

      var pB = sstep((yS - (secT.e - vh * 0.95)) / (vh * 0.75));
      var pC = sstep((yS - (secT.a - vh * 1.05)) / (vh * 0.8));
      var dim = sstep((yS - (secT.p - vh * 0.4)) / (vh * 0.5)) * (1 - pC);
      if (lastPB === undefined || Math.abs(pB - lastPB) > 0.0008 || Math.abs(pC - lastPC) > 0.0008) {
        lastPB = pB; lastPC = pC;
        for (var n = 0; n < N * 3; n++) {
          var ab = PA[n] + (PB[n] - PA[n]) * pB;
          cur[n] = ab + (PC[n] - ab) * pC;
        }
        posAttr.needsUpdate = true;
      }

      shells.forEach(function (sh) {
        sh.material.opacity = sh.userData.base * (1 - pB);
        sh.visible = sh.material.opacity > 0.004;
        if (motion && sh.visible) { sh.rotation.x += sh.userData.sp[0]; sh.rotation.y += sh.userData.sp[1]; sh.rotation.z += sh.userData.sp[2]; }
      });
      lnB.material.opacity = 0.4 * pB * (1 - pC * 0.92);
      lnC.material.opacity = 0.3 * pC;
      pts.material.opacity = 0.46 + 0.18 * pB * (1 - pC) - 0.1 * pC;
      var sigOp = 0.95 * pB * (1 - pC);
      sigPts.material.opacity = sigOp;
      sigPts.visible = sigOp > 0.01;
      if (sigPts.visible) {
        for (var q = 0; q < SIG; q++) {
          var g = sig[q];
          if (motion) g.t += g.v;
          if (g.t > 1) { g.t = 0; g.e = Math.floor(Math.random() * nE); }
          var a1 = idxB[g.e * 2] * 3, b1 = idxB[g.e * 2 + 1] * 3;
          sigPos[q * 3] = cur[a1] + (cur[b1] - cur[a1]) * g.t;
          sigPos[q * 3 + 1] = cur[a1 + 1] + (cur[b1 + 1] - cur[a1 + 1]) * g.t;
          sigPos[q * 3 + 2] = cur[a1 + 2] + (cur[b1 + 2] - cur[a1 + 2]) * g.t;
        }
        sigGeo.attributes.position.needsUpdate = true;
      }
      nucleus.material.opacity = 0.85 * (1 - pB);
      halo.material.opacity = 0.07 * (1 - pB);
      ring.material.opacity = 0.12 * (1 - pB * 0.8);

      cx += (tx - cx) * 0.055; cy += (ty - cy) * 0.055;
      boost += (boostT - boost) * 0.05;
      if (motion) spinAcc += 0.0009 * (1 + boost * 4);
      var spin = spinAcc;
      grp.rotation.x = cx + pC * 1.02;
      grp.rotation.y = cy + spin;
      grp.rotation.z = pC * 0.12;

      // Sit inside the hero anchor box at the top, drift to the viewport centre as the page scrolls.
      var tX = 0, tY = 0, tS = 1, an = opts.anchor;
      if (an) {
        if (aDirty || !aRect) { aRect = an.getBoundingClientRect(); aDirty = false; }
        var r = aRect;
        var aw = (r.width / vw) * visH * (vw / vh);
        var nearS = Math.max(0.24, aw / 4.6);
        var nearX = ((r.left + r.width / 2) / vw - 0.5) * visH * (vw / vh);
        var nearY = -((r.top + r.height / 2) / vh - 0.5) * visH;
        var f = sstep((yS - vh * 0.06) / (vh * 0.7));
        var midS = Math.min(0.82, Math.max(0.5, 0.62 * Math.min(1.6, vw / vh)));
        var farS = Math.min(1.25, Math.max(0.8, vw / 1150));
        var s1 = nearS + (midS - nearS) * f;
        tS = s1 + (farS - s1) * pC;
        tX = nearX * (1 - f); tY = nearY * (1 - f);
      }
      gx += (tX - gx) * 0.08; gy += (tY - gy) * 0.08; gs += (tS - gs) * 0.08;
      grp.position.set(gx, gy, 0);
      grp.scale.setScalar(gs);

      // Fade behind long reading sections (projects, about).
      var tOpa = 1 - 0.06 * pB - 0.6 * dim - 0.18 * pC;
      opa += (tOpa - opa) * 0.06;
      var o2 = opa.toFixed(2);
      if (o2 !== lastO2) { lastO2 = o2; cv.style.opacity = o2; }

      var b = motion ? 1 + Math.sin(frame / 72) * 0.08 : 1;
      if (pulse >= 0) {
        pulse += 0.018;
        var k2 = Math.max(0, 1 - pulse);
        b *= 1 + Math.sin(Math.min(1, pulse * 3) * Math.PI) * 0.9 * k2;
        shells.forEach(function (sh, n) {
          var ph = Math.max(0, pulse * 1.6 - n * 0.16);
          sh.scale.setScalar(1 + Math.sin(Math.min(1, ph) * Math.PI) * 0.14 * k2);
        });
        waves.forEach(function (w, n) {
          var ph = pulse - n * 0.22;
          w.visible = ph > 0 && ph < 1;
          if (w.visible) { w.scale.setScalar(0.15 + ph * 1.35); w.material.opacity = (1 - ph) * 0.75 * (1 - pB); }
        });
        if (pulse >= 1.3) { pulse = -1; waves.forEach(function (w) { w.visible = false; }); shells.forEach(function (sh) { sh.scale.setScalar(1); }); }
      }
      nucleus.scale.setScalar(b);
      halo.scale.setScalar(motion ? 1 + Math.sin(frame / 72 + 1) * 0.15 : 1);
      if (motion) ring.rotation.z += 0.0012;

      // Adaptive quality: drop pixel ratio, then render every other frame, on slow devices.
      var t0 = performance.now();
      if (!skip || frame % 2 === 0) renderer.render(scene, cam);
      ft = ft * 0.9 + (performance.now() - t0) * 0.1;
      var now = performance.now();
      if (lastT) fps = fps * 0.92 + (1000 / Math.max(1, now - lastT)) * 0.08;
      lastT = now;
      stats.yaw = ((grp.rotation.y * 180 / Math.PI) % 360 + 360) % 360;
      stats.pitch = grp.rotation.x * 180 / Math.PI;
      stats.fps = fps;
      stats.phase = pC > 0.5 ? 'LATTICE' : pB > 0.5 ? 'NETWORK' : 'CORE';
      stats.morph = pB * 0.5 + pC * 0.5;
      if (frame > 40 && ft > 28 && !lowQ) { lowQ = true; renderer.setPixelRatio(1); size(); }
      else if (frame > 120 && ft > 28 && lowQ) skip = true;
    }
    loop();

    var api = {
      ping: function () {
        pulse = 0;
        window.dispatchEvent(new CustomEvent('core:ping'));
      },
      boost: function (on) { boostT = on ? 1 : 0; },
      stats: function () { return stats; },
      refresh: function () { secT = null; aDirty = true; },
      setMotion: function (m) { motion = m !== false; },
      destroy: function () {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', size);
        window.removeEventListener('scroll', mark);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        renderer.dispose();
      }
    };
    return api;
  }

  window.GMCore = { init: init };
})();
