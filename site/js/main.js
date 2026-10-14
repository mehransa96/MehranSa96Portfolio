(function () {
  'use strict';

  var STACK_GROUPS = [
    { label: 'AI / LLM', items: ['LangChain', 'OpenAI API', 'RAG Pipeline', 'Vector DB', 'Embeddings', 'Prompt Engineering', 'Fine-tuning', 'MCP', 'n8n'] },
    { label: 'SECURITY', items: ['CEH', 'Pen Testing', 'OWASP Top 10', 'Zero Trust', 'Metasploit', 'Burp Suite', 'Nmap', 'WireGuard'] },
    { label: 'DATABASE', items: ['SQL Server', 'T-SQL', 'SSRS / RDL', 'Query Tuning', 'PostgreSQL', 'Prisma', 'Redis', 'InfluxDB'] },
    { label: 'WEB / BACKEND', items: ['ASP.NET Core', 'C#', 'Python', 'Next.js', 'React', 'Node.js', 'Cloudflare Workers', 'Docker'] },
    { label: 'IOT / EMBEDDED', items: ['ESP32', 'Arduino C++', 'MQTT', 'WireGuard VPN', 'Raspberry Pi', 'Grafana'] }
  ];

  var ARCH = [
    {
      fa: 'دستیار گزارش SSRS', en: 'RepBuilderAssis',
      layers: [
        { fa: 'پرسش فارسی کاربر', en: 'Natural-language request', edge: 'PROMPT', bodyFa: 'کاربر گزارش مورد نیازش را به زبان فارسی توصیف می‌کند؛ لازم نیست نام جدول یا ساختار دیتابیس را بداند.', bodyEn: 'The user describes the report they need in plain Persian — no table names or schema knowledge required.', inFa: 'جمله فارسی', inEn: 'Persian sentence', outFa: 'درخواست ساخت‌یافته', outEn: 'Structured request', tech: ['Python', 'LLM'] },
        { fa: 'بازیابی از ایندکس دانشی', en: 'Schema knowledge retrieval', edge: 'RETRIEVE', bodyFa: 'ایندکسی از ساختار دیتابیس سازمان — جدول، ستون، کلید و عنوان فارسی — تا مدل جدول درست را میان هزاران جدول پیدا کند.', bodyEn: 'An index of the organisation’s schema — tables, columns, keys and Persian titles — so the model can find the right table among thousands.', inFa: 'درخواست ساخت‌یافته', inEn: 'Structured request', outFa: 'جدول‌ها و مسیر join', outEn: 'Tables and join paths', tech: ['Vector Index', 'Schema Graph'] },
        { fa: 'حلقه ایجنت و طرح کوئری', en: 'Agent loop / query plan', edge: 'PLAN', bodyFa: 'ایجنت یک طرح کوئری ساخت‌یافته می‌سازد و در صورت نیاز خودش آن را اصلاح می‌کند.', bodyEn: 'The agent builds a structured query plan and corrects itself when needed.', inFa: 'جدول‌ها و مسیر join', inEn: 'Tables and join paths', outFa: 'طرح کوئری JSON', outEn: 'JSON query plan', tech: ['Agent Loop', 'JSON Plan'] },
        { fa: 'اعتبارسنجی T-SQL', en: 'Deterministic T-SQL validation', edge: 'VALIDATE', bodyFa: 'کوئری تولیدشده پیش از تحویل اعتبارسنجی می‌شود؛ خروجی مدل بدون بررسی پذیرفته نمی‌شود.', bodyEn: 'The generated query is validated before delivery — model output is never trusted blindly.', inFa: 'طرح کوئری JSON', inEn: 'JSON query plan', outFa: 'T-SQL معتبر', outEn: 'Valid T-SQL', tech: ['T-SQL', 'SQL Server'] },
        { fa: 'تولید فایل RDL', en: 'RDL generation', edge: 'BUILD', bodyFa: 'خروجی نهایی یک فایل RDL است که Report Builder بدون خطا باز می‌کند.', bodyEn: 'The final output is an RDL file that Report Builder opens without errors.', inFa: 'T-SQL معتبر', inEn: 'Valid T-SQL', outFa: 'فایل RDL آماده', outEn: 'Ready RDL file', tech: ['SSRS / RDL', 'XML'] }
      ]
    },
    {
      fa: 'پایش IoT', en: 'IoT monitoring',
      layers: [
        { fa: 'گره ESP32', en: 'ESP32 node', edge: 'SENSORS', bodyFa: 'برد ESP32 داده حس‌گرها را می‌خواند و وضعیت خروجی‌ها را کنترل می‌کند.', bodyEn: 'The ESP32 board reads sensor data and drives the outputs.', inFa: 'حس‌گر فیزیکی', inEn: 'Physical sensors', outFa: 'بسته تلمتری', outEn: 'Telemetry packet', tech: ['ESP32', 'Arduino C++'] },
        { fa: 'بروکر MQTT', en: 'MQTT broker', edge: 'PUB / SUB', bodyFa: 'پیام‌ها روی موضوع‌های MQTT منتشر می‌شوند تا مصرف‌کننده‌ها مستقل از یکدیگر بمانند.', bodyEn: 'Messages are published on MQTT topics so consumers stay independent of each other.', inFa: 'بسته تلمتری', inEn: 'Telemetry packet', outFa: 'جریان موضوع‌ها', outEn: 'Topic stream', tech: ['MQTT', 'Mosquitto'] },
        { fa: 'تونل WireGuard', en: 'WireGuard tunnel', edge: 'ENCRYPTED', bodyFa: 'کل ترافیک داخل تونل رمزنگاری‌شده جابه‌جا می‌شود؛ هیچ پورتی روی اینترنت باز نمی‌ماند.', bodyEn: 'All traffic moves inside an encrypted tunnel — no port is left open on the internet.', inFa: 'جریان موضوع‌ها', inEn: 'Topic stream', outFa: 'جریان امن', outEn: 'Secured stream', tech: ['WireGuard', 'Zero Trust'] },
        { fa: 'ذخیره سری زمانی', en: 'Time-series store', edge: 'WRITE', bodyFa: 'داده در یک پایگاه سری زمانی نگه داشته می‌شود تا روند بلندمدت قابل تحلیل باشد.', bodyEn: 'Data lands in a time-series database so long-term trends stay analysable.', inFa: 'جریان امن', inEn: 'Secured stream', outFa: 'سری زمانی', outEn: 'Time series', tech: ['InfluxDB'] },
        { fa: 'داشبورد و هشدار', en: 'Dashboard and alerts', edge: 'QUERY', bodyFa: 'نمودارهای زنده و هشدارهای آستانه‌ای، برای دیدن وضعیت و واکنش سریع.', bodyEn: 'Live charts and threshold alerts for status at a glance and fast response.', inFa: 'سری زمانی', inEn: 'Time series', outFa: 'نمودار و هشدار', outEn: 'Charts and alerts', tech: ['Grafana'] }
      ]
    },
    {
      fa: 'ایجنت تحلیل وب‌سایت', en: 'site-recon',
      layers: [
        { fa: 'نشانی هدف', en: 'Target URL', edge: 'INPUT', bodyFa: 'کار با یک نشانی شروع می‌شود؛ همه مراحل روی دستگاه خود کاربر اجرا می‌شود.', bodyEn: 'It starts with a single URL — every step runs on the user’s own machine.', inFa: 'یک نشانی', inEn: 'One URL', outFa: 'صف پیمایش', outEn: 'Crawl queue', tech: ['CLI'] },
        { fa: 'پیمایش محلی', en: 'Local crawler', edge: 'FETCH', bodyFa: 'صفحه‌ها به‌صورت محلی خوانده می‌شوند و شواهد خام روی همان دستگاه ذخیره می‌ماند.', bodyEn: 'Pages are fetched locally and raw evidence stays on the same machine.', inFa: 'صف پیمایش', inEn: 'Crawl queue', outFa: 'HTML و دارایی‌ها', outEn: 'HTML and assets', tech: ['Python', 'Headless'] },
        { fa: 'استخراج و طبقه‌بندی', en: 'Extract and classify', edge: 'PARSE', bodyFa: 'ساختار صفحه، پیام‌ها و سیگنال‌های فنی از محتوا جدا و دسته‌بندی می‌شوند.', bodyEn: 'Page structure, messaging and technical signals are separated and categorised.', inFa: 'HTML و دارایی‌ها', inEn: 'HTML and assets', outFa: 'سیگنال ساخت‌یافته', outEn: 'Structured signals', tech: ['Parser', 'Heuristics'] },
        { fa: 'تحلیل با مدل زبانی', en: 'LLM analysis', edge: 'REASON', bodyFa: 'مدل سیگنال‌ها را مثل یک مهندس بازاریابی می‌خواند و نقاط قوت و ضعف را توضیح می‌دهد.', bodyEn: 'The model reads those signals like a marketing engineer and explains strengths and gaps.', inFa: 'سیگنال ساخت‌یافته', inEn: 'Structured signals', outFa: 'یافته‌های تحلیلی', outEn: 'Analytical findings', tech: ['LLM', 'Prompt Chain'] },
        { fa: 'گزارش مستند', en: 'Documented report', edge: 'REPORT', bodyFa: 'خروجی یک گزارش قابل تحویل است که هر ادعا به شواهد محلی وصل می‌شود.', bodyEn: 'The output is a deliverable report where each claim links back to local evidence.', inFa: 'یافته‌های تحلیلی', inEn: 'Analytical findings', outFa: 'گزارش نهایی', outEn: 'Final report', tech: ['Markdown', 'Report Build'] }
      ]
    }
  ];

  var T = {
    fa: { ctx: 'زمینه پروژه', ch: 'چالش‌های فنی', sol: 'رویکرد فنی', resp: 'نقش من', val: 'نتیجه', stack: 'استک', open: 'مشاهده مخزن', searchPh: 'جست‌وجو بین پروژه‌ها و بخش‌ها…', inLabel: 'ورودی', outLabel: 'خروجی', flowOn: 'توقف جریان', flowOff: 'پخش جریان', project: 'پروژه', section: 'بخش', empty: 'نتیجه‌ای پیدا نشد.', title: 'مهران سبزعلی | مهندس ارشد نرم‌افزار — هوش مصنوعی، امنیت، IoT' },
    en: { ctx: 'Context', ch: 'Technical challenges', sol: 'Approach', resp: 'My role', val: 'Outcome', stack: 'Stack', open: 'View repository', searchPh: 'Search projects and sections…', inLabel: 'Input', outLabel: 'Output', flowOn: 'Stop flow', flowOff: 'Play flow', project: 'PROJECT', section: 'SECTION', empty: 'No results.', title: 'Mehran Sabzali | Senior Software Engineer — AI, Security, IoT' }
  };

  var CATS = {
    fa: [['all', 'همه'], ['ai', 'هوش مصنوعی'], ['security', 'امنیت'], ['web', 'وب'], ['database', 'پایگاه داده'], ['iot', 'IoT']],
    en: [['all', 'All'], ['ai', 'AI'], ['security', 'Security'], ['web', 'Web'], ['database', 'Database'], ['iot', 'IoT']]
  };

  var SECTIONS = {
    fa: [['expertise', 'حوزه‌های تخصصی'], ['projects', 'پروژه‌های منتخب'], ['opensource', 'مخازن کد'], ['certs', 'گواهینامه‌ها'], ['stack', 'استک فنی'], ['about', 'درباره من'], ['architecture', 'نقشه معماری زنده']],
    en: [['expertise', 'Domains of work'], ['projects', 'Selected work'], ['opensource', 'Code repositories'], ['certs', 'Certificates'], ['stack', 'Technical stack'], ['about', 'About'], ['architecture', 'Live architecture map']]
  };

  var DEFAULT_PROJECT = 6; // RepBuilderAssis opens by default.

  var state = {
    lang: 'fa', filter: 'all', sel: DEFAULT_PROJECT, pjClosed: false,
    archTab: 0, archLayer: 0, flow: false,
    palOpen: false, q: '', palIdx: 0
  };

  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;
  var mqMobile = window.matchMedia('(max-width: 879.98px)');
  var mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var accent = (getComputedStyle(root).getPropertyValue('--accent') || '#00E28A').trim();
  var flowTimer = 0, palItems = [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function t() { return T[state.lang]; }
  function isMobile() { return mqMobile.matches; }

  // ---------- Data ----------
  function data() { return window.__PORTFOLIO_DATA || { FA: [], EN: [] }; }
  function list() { var d = data(); return (state.lang === 'en' ? d.EN : d.FA) || []; }
  function visible() {
    var f = state.filter;
    return list().filter(function (p) { return f === 'all' || (p.cat || '').split(' ').indexOf(f) >= 0; });
  }
  // Lighter technical detail for RepBuilderAssis (agreed in the design review).
  function softenRep(p) {
    if (!p || p.id !== 6) return p;
    var fix = function (s) { return typeof s === 'string' ? s.replace(/۳٬۴۲۸ جدول/g, 'هزاران جدول').replace(/3,428 tables/g, 'thousands of tables') : s; };
    var out = Object.assign({}, p);
    out.ctx = fix(p.ctx);
    if (p.ch) out.ch = p.ch.map(fix).filter(function (s) { return !/ایندکس دانشی|knowledge index/i.test(s); });
    if (p.sol) out.sol = p.sol.map(fix);
    return out;
  }

  // ---------- Projects ----------
  function effectiveSel(vis) {
    for (var i = 0; i < vis.length; i++) if (vis[i].id === state.sel) return state.sel;
    return vis[0] ? vis[0].id : null;
  }

  function rowHtml(p, i, on, mobile) {
    var mark = mobile ? (on ? '−' : '+') : (on ? '•' : '');
    return '<button type="button" class="pj-row' + (on ? ' is-on' : '') + '" data-pj="' + p.id + '"' +
      (mobile ? ' aria-expanded="' + on + '" aria-controls="pjDet"' : ' aria-current="' + (on ? 'true' : 'false') + '"') + '>' +
      '<span class="pj-row__num">' + pad(i + 1) + '</span>' +
      '<span class="pj-row__txt"><span class="pj-row__title">' + esc(p.title) + '</span>' +
      '<span class="pj-row__en" dir="ltr">' + esc(p.en) + '</span></span>' +
      '<span class="pj-row__end"><span class="pj-row__tag">' + esc(p.tag) + '</span>' +
      '<span class="pj-row__mark" aria-hidden="true">' + mark + '</span></span>' +
      '</button>';
  }

  function bullets(items, cls) {
    return '<ul class="det__bullets' + (cls ? ' ' + cls : '') + '">' +
      items.map(function (x) { return '<li><span>' + esc(x) + '</span></li>'; }).join('') + '</ul>';
  }
  function label(txt) { return '<div class="det__label"><span>' + esc(txt) + '</span></div>'; }

  function detailHtml(p, idx, total) {
    var tx = t(), h = '';
    h += '<div class="det">';
    h += '<div class="det__meta"><span class="det__num">' + (idx >= 0 ? pad(idx + 1) : '--') + ' / ' + pad(total) + '</span>';
    h += '<span class="det__badges">' + (p.badge ? '<span>' + esc(p.badge) + '</span>' : '') + '<span>' + esc(p.tag || '') + '</span></span></div>';
    h += '<h3>' + esc(p.title) + '</h3>';
    h += '<div class="det__en" dir="ltr">' + esc(p.en) + '</div>';
    h += '<p class="det__sum">' + esc(p.sum || '') + '</p>';
    if (p.ctx) h += label(tx.ctx) + '<p class="det__ctx">' + esc(p.ctx) + '</p>';
    if (p.ch && p.ch.length) h += label(tx.ch) + bullets(p.ch, 'det__bullets--accent');
    if (p.sol && p.sol.length) h += label(tx.sol) + bullets(p.sol);
    if (p.resp && p.resp.length) h += label(tx.resp) + bullets(p.resp);
    if (p.val) h += '<div class="det__val"><div class="det__val-k">' + esc(tx.val) + '</div><div class="det__val-v">' + esc(p.val) + '</div></div>';
    h += label(tx.stack) + '<div class="det__stack" dir="ltr">' + (p.stack || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>';
    if (p.link) h += '<a class="det__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(tx.open) + ' <span aria-hidden="true">↗</span></a>';
    h += '</div>';
    return h;
  }

  var lastDetKey = '';
  function renderProjects(opts) {
    opts = opts || {};
    var tx = t(), en = state.lang === 'en', all = list(), vis = visible();
    var mobile = isMobile(), closed = mobile && state.pjClosed;
    var effId = effectiveSel(vis);

    $('pjCount').textContent = pad(vis.length) + (en ? ' PROJECTS' : ' / ' + pad(all.length));

    $('pjFilters').innerHTML = CATS[state.lang].map(function (c) {
      return '<button type="button" class="pill" data-filter="' + c[0] + '" aria-pressed="' + (state.filter === c[0]) + '">' + esc(c[1]) + '</button>';
    }).join('');

    var rows = vis.map(function (p, i) { return rowHtml(p, i, p.id === effId && !closed, mobile); });
    var openIdx = -1;
    for (var i = 0; i < vis.length; i++) if (vis[i].id === effId) openIdx = i;
    var splitAt = (!mobile || closed || openIdx < 0) ? rows.length : openIdx + 1;
    var focusedId = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-pj');
    $('pjListA').innerHTML = rows.slice(0, splitAt).join('');
    $('pjListB').innerHTML = rows.slice(splitAt).join('');
    if (focusedId) {
      var keep = document.querySelector('[data-pj="' + (opts.focusId || focusedId) + '"]');
      if (keep) keep.focus({ preventScroll: true });
    }

    var det = $('pjDet');
    var sel = null, selIdx = openIdx;
    if (openIdx >= 0) sel = softenRep(vis[openIdx]);
    if (!sel || closed) {
      det.hidden = true;
      det.innerHTML = '';
      lastDetKey = '';
      return;
    }
    det.hidden = false;
    var key = sel.id + '|' + state.filter + '|' + state.lang + '|' + vis.length;
    if (key !== lastDetKey) {
      det.innerHTML = detailHtml(sel, selIdx, vis.length);
      det.scrollTop = 0;
      if (lastDetKey && det.animate && !mqReduced.matches) {
        det.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.16,.86,.2,1)' });
      }
      lastDetKey = key;
    }
  }

  function revealRow(id) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var el = document.querySelector('[data-pj="' + id + '"]');
        if (el) window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 76), behavior: mqReduced.matches ? 'auto' : 'smooth' });
      });
    });
  }

  function selectProject(id) {
    var mobile = isMobile();
    var vis = visible();
    if (mobile && id === effectiveSel(vis)) {
      state.pjClosed = !state.pjClosed;
      renderProjects({ focusId: id });
      revealRow(id);
      return;
    }
    state.sel = id;
    state.pjClosed = false;
    renderProjects({ focusId: id });
    if (mobile) revealRow(id);
  }

  function step(d) {
    var vis = visible();
    if (!vis.length) return;
    var ae = document.activeElement, focused = ae && ae.getAttribute && Number(ae.getAttribute('data-pj'));
    var cur = focused || effectiveSel(vis), i = 0;
    for (var n = 0; n < vis.length; n++) if (vis[n].id === cur) i = n;
    var next = vis[(i + d + vis.length) % vis.length];
    state.sel = next.id;
    state.pjClosed = false;
    renderProjects({ focusId: next.id });
    var row = document.querySelector('[data-pj="' + next.id + '"]');
    if (row) row.focus({ preventScroll: true });
    if (row && !isMobile()) row.scrollIntoView({ block: 'nearest' });
    if (isMobile()) revealRow(next.id);
  }

  function initProjects() {
    $('pjFilters').addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      state.filter = b.getAttribute('data-filter');
      renderProjects();
    });
    ['pjListA', 'pjListB'].forEach(function (id) {
      $(id).addEventListener('click', function (e) {
        var b = e.target.closest('[data-pj]');
        if (b) selectProject(Number(b.getAttribute('data-pj')));
      });
    });
    var wasMobile = isMobile();
    var onBp = function () {
      if (isMobile() !== wasMobile) { wasMobile = isMobile(); state.pjClosed = false; lastDetKey = ''; renderProjects(); }
    };
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', onBp); else mqMobile.addListener(onBp);
  }

  // ---------- Stack ----------
  function renderStack() {
    $('stackRows').innerHTML = STACK_GROUPS.map(function (g) {
      return '<div class="row row--stack"><div class="row__name" dir="ltr">' + esc(g.label) + '</div>' +
        '<div class="stack-items" dir="ltr">' + g.items.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div></div>';
    }).join('');
  }

  // ---------- Architecture map ----------
  function renderArch() {
    var en = state.lang === 'en', tx = t();
    var tab = ARCH[state.archTab], L = tab.layers, li = Math.min(state.archLayer, L.length - 1);

    $('archMeta').textContent = ARCH.length + ' SYSTEMS · ' + L.length + ' LAYERS';
    $('archTabs').innerHTML = ARCH.map(function (a, i) {
      var on = i === state.archTab;
      return '<button type="button" class="pill" role="tab" data-tab="' + i + '" aria-selected="' + on + '">' + esc(en ? a.en : a.fa) + '</button>';
    }).join('');

    var flowBtn = $('flowBtn');
    flowBtn.textContent = state.flow ? tx.flowOn : tx.flowOff;
    flowBtn.setAttribute('aria-pressed', String(state.flow));

    $('archLayers').innerHTML = L.map(function (l, i) {
      var on = i === li, h = '<div>';
      h += '<button type="button" class="layer' + (on ? ' is-on' : '') + '" data-layer="' + i + '" aria-current="' + on + '">' +
        '<span class="layer__num">' + pad(i + 1) + '</span>' +
        '<span class="layer__txt"><span class="layer__title">' + esc(en ? l.en : l.fa) + '</span>' +
        '<span class="layer__en" dir="ltr">' + esc(en ? l.fa : l.en) + '</span></span></button>';
      if (i < L.length - 1) {
        var wire = (i === li || i === li - 1) ? 'rgba(0,226,138,.5)' : '#1F2423';
        h += '<div class="wire' + (state.flow || on ? ' is-live' : '') + '" style="--wire:' + wire + '" aria-hidden="true">' +
          '<span class="wire__line"></span><span class="wire__pulse"></span><span class="wire__edge" dir="ltr">' + esc(l.edge) + '</span></div>';
      }
      return h + '</div>';
    }).join('');

    var cl = L[li];
    $('archPanel').innerHTML =
      '<div class="arch__kicker">' + esc((en ? tab.en : tab.fa) + ' · ' + pad(li + 1) + '/' + pad(L.length)) + '</div>' +
      '<h3>' + esc(en ? cl.en : cl.fa) + '</h3>' +
      '<div class="arch__en" dir="ltr">' + esc(en ? cl.fa : cl.en) + '</div>' +
      '<p class="arch__body">' + esc(en ? cl.bodyEn : cl.bodyFa) + '</p>' +
      '<div class="arch__io"><div><div class="arch__io-k">' + esc(tx.inLabel) + '</div><div class="arch__io-v">' + esc(en ? cl.inEn : cl.inFa) + '</div></div>' +
      '<div><div class="arch__io-k">' + esc(tx.outLabel) + '</div><div class="arch__io-v">' + esc(en ? cl.outEn : cl.outFa) + '</div></div></div>' +
      '<div class="arch__tech-k">' + esc(tx.stack) + '</div>' +
      '<div class="arch__tech" dir="ltr">' + cl.tech.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>';
  }

  function stopFlow() { clearInterval(flowTimer); state.flow = false; }
  function toggleFlow() {
    if (state.flow) { stopFlow(); renderArch(); return; }
    state.flow = true; state.archLayer = 0; renderArch();
    flowTimer = setInterval(function () {
      var n = ARCH[state.archTab].layers.length;
      if (state.archLayer + 1 >= n) { state.archLayer = n - 1; stopFlow(); }
      else state.archLayer++;
      renderArch();
    }, 1500);
  }

  function initArch() {
    $('archTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]');
      if (!b) return;
      stopFlow(); state.archTab = Number(b.getAttribute('data-tab')); state.archLayer = 0; renderArch();
    });
    $('archLayers').addEventListener('click', function (e) {
      var b = e.target.closest('[data-layer]');
      if (!b) return;
      stopFlow(); state.archLayer = Number(b.getAttribute('data-layer')); renderArch();
      var again = document.querySelector('[data-layer="' + state.archLayer + '"]');
      if (again) again.focus({ preventScroll: true });
    });
    $('flowBtn').addEventListener('click', toggleFlow);
  }

  // ---------- Command palette ----------
  function jump(id) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        var el = $(id);
        if (!el) return;
        window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 88), behavior: mqReduced.matches ? 'auto' : 'smooth' });
      });
    }, 50);
  }

  function palResults() {
    var tx = t(), q = (state.q || '').trim().toLowerCase(), out = [];
    SECTIONS[state.lang].forEach(function (s) {
      if (!q || s[1].toLowerCase().indexOf(q) >= 0) out.push({ kind: tx.section, label: s[1], run: function () { closePal(); jump(s[0]); } });
    });
    list().forEach(function (p) {
      var hay = (p.title + ' ' + p.en + ' ' + (p.stack || []).join(' ') + ' ' + (p.cat || '')).toLowerCase();
      if (!q || hay.indexOf(q) >= 0) out.push({ kind: tx.project, label: p.title, run: function () {
        closePal(); state.sel = p.id; state.filter = 'all'; state.pjClosed = false; renderProjects(); jump('projects');
      } });
    });
    return out.slice(0, 40);
  }

  function renderPal() {
    palItems = palResults();
    if (state.palIdx >= palItems.length) state.palIdx = Math.max(0, palItems.length - 1);
    $('palList').innerHTML = palItems.length ? palItems.map(function (r, i) {
      return '<button type="button" class="pal__item' + (i === state.palIdx ? ' is-active' : '') + '" role="option" id="pal-' + i + '" aria-selected="' + (i === state.palIdx) + '" data-i="' + i + '">' +
        '<span class="pal__kind">' + esc(r.kind) + '</span><span class="pal__label">' + esc(r.label) + '</span>' +
        '<span class="pal__enter" dir="ltr" aria-hidden="true">↵</span></button>';
    }).join('') : '<div class="pal__empty">' + esc(t().empty) + '</div>';
    $('palInput').setAttribute('aria-activedescendant', palItems.length ? 'pal-' + state.palIdx : '');
  }

  var palReturnFocus = null;
  function openPal() {
    closeMenu();
    state.palOpen = true; state.q = ''; state.palIdx = 0;
    palReturnFocus = document.activeElement;
    var input = $('palInput');
    input.value = '';
    input.placeholder = t().searchPh;
    renderPal();
    $('pal').hidden = false;
    document.body.style.overflow = 'hidden';
    input.focus();
  }
  function closePal() {
    if (!state.palOpen) return;
    state.palOpen = false;
    $('pal').hidden = true;
    document.body.style.overflow = '';
    if (palReturnFocus && palReturnFocus.focus) palReturnFocus.focus({ preventScroll: true });
  }
  function movePal(d) {
    if (!palItems.length) return;
    state.palIdx = (state.palIdx + d + palItems.length) % palItems.length;
    renderPal();
    var a = $('pal-' + state.palIdx);
    if (a) a.scrollIntoView({ block: 'nearest' });
  }

  function initPal() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-open-pal]'), function (b) { b.addEventListener('click', openPal); });
    $('pal').addEventListener('click', function (e) { if (e.target === $('pal')) closePal(); });
    $('palEsc').addEventListener('click', closePal);
    $('palInput').addEventListener('input', function (e) { state.q = e.target.value; state.palIdx = 0; renderPal(); });
    $('palInput').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); movePal(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); movePal(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (palItems[state.palIdx]) palItems[state.palIdx].run(); }
    });
    $('palList').addEventListener('click', function (e) {
      var b = e.target.closest('[data-i]');
      if (b && palItems[Number(b.getAttribute('data-i'))]) palItems[Number(b.getAttribute('data-i'))].run();
    });
  }

  // ---------- Header: mobile menu, progress ----------
  function closeMenu() {
    var btn = $('menuBtn');
    if (btn.getAttribute('aria-expanded') !== 'true') return;
    btn.setAttribute('aria-expanded', 'false');
    $('mmenu').hidden = true;
  }
  function initHeader() {
    var btn = $('menuBtn'), menu = $('mmenu');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    });
    // Collapse the menu first, then scroll: the header shrinks when it closes, which would shift the anchor target.
    menu.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      closeMenu();
      jump(a.getAttribute('href').slice(1));
    });
    var onBp = function () { if (!isMobile()) closeMenu(); };
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', onBp); else mqMobile.addListener(onBp);
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('#hdr')) closeMenu();
    });

    var bar = $('progress'), q = false, last = '';
    var update = function () {
      q = false;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / max)).toFixed(3);
      if (p !== last) { last = p; bar.style.transform = 'scaleX(' + p + ')'; }
    };
    window.addEventListener('scroll', function () { if (!q) { q = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---------- Keyboard ----------
  function initKeys() {
    window.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      if (k === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (state.palOpen) closePal(); else openPal(); return; }
      if (k === 'escape') { if (state.palOpen) { closePal(); return; } closeMenu(); return; }
      if (state.palOpen) {
        if (k === 'tab') { e.preventDefault(); $('palInput').focus(); }
        return;
      }
      // Arrow / j / k step through projects while focus is inside the project list.
      var ae = document.activeElement;
      if (!ae || !ae.closest || !ae.closest('#pjListA, #pjListB')) return;
      if (k === 'arrowdown' || k === 'j') { e.preventDefault(); step(1); }
      if (k === 'arrowup' || k === 'k') { e.preventDefault(); step(-1); }
    });
  }

  // ---------- Expertise cards: pointer light + tilt ----------
  function initCards() {
    Array.prototype.forEach.call(document.querySelectorAll('.xcard'), function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        if (!mqReduced.matches) {
          el.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
          el.style.setProperty('--ry', ((x - 0.5) * 7).toFixed(2) + 'deg');
        }
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.style.setProperty('--my', '-20%');
      });
    });
  }

  // ---------- Clock ----------
  function initClock() {
    var nodes = document.querySelectorAll('[data-clock]');
    var tick = function () {
      var s;
      try { s = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tehran', hour12: false }); }
      catch (e) { s = new Date().toLocaleTimeString('en-GB', { hour12: false }); }
      Array.prototype.forEach.call(nodes, function (n) { n.textContent = s; });
    };
    tick();
    setInterval(tick, 1000);
  }

  // ---------- Language ----------
  function setLang(lang, persist) {
    state.lang = lang === 'en' ? 'en' : 'fa';
    var en = state.lang === 'en';
    root.setAttribute('lang', en ? 'en' : 'fa');
    root.setAttribute('dir', en ? 'ltr' : 'rtl');
    $('langBtn').textContent = en ? 'FA' : 'EN';
    $('langBtn').setAttribute('aria-label', en ? 'فارسی' : 'English');
    document.title = t().title;
    $('palInput').placeholder = t().searchPh;
    lastDetKey = '';
    renderProjects();
    renderArch();
    if (state.palOpen) renderPal();
    if (core) core.refresh();
    if (persist) { try { localStorage.setItem('gm-lang', state.lang); } catch (e) { /* storage unavailable */ } }
  }

  // ---------- Boot ----------
  var core = null;
  function boot() {
    var y = $('year'); if (y) y.textContent = String(new Date().getFullYear());
    var lang = 'fa';
    var qs = /[?&]lang=(en|fa)\b/.exec(location.search);
    if (qs) lang = qs[1];
    else { try { lang = localStorage.getItem('gm-lang') || 'fa'; } catch (e) { /* storage unavailable */ } }

    renderStack();
    initProjects();
    initArch();
    initPal();
    initHeader();
    initKeys();
    initCards();
    initClock();
    setLang(lang, false);
    $('langBtn').addEventListener('click', function () { setLang(state.lang === 'en' ? 'fa' : 'en', true); });

    if (window.GMCore) {
      core = window.GMCore.init({
        canvas: $('core'), anchor: $('anchor'), spot: $('spot'),
        accent: accent, motion: !mqReduced.matches
      });
      var onMotion = function () { if (core) core.setMotion(!mqReduced.matches); };
      if (mqReduced.addEventListener) mqReduced.addEventListener('change', onMotion);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (core) core.refresh(); });
    }
  }

  if (window.__PORTFOLIO_DATA) boot();
  else window.addEventListener('portfolio-data-ready', boot, { once: true });
})();
