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
    },
    {
      fa: 'دستیار کوئری کاوش', en: 'Kavosh query assistant',
      layers: [
        { fa: 'بازیابی جدول‌های نامزد', en: 'Candidate retrieval', edge: 'RETRIEVE', bodyFa: 'جدول‌های نامزد با جست‌وجوی فارسی خود برنامه پیدا می‌شوند؛ در این مرحله هیچ مدل زبانی دخالت ندارد.', bodyEn: 'Candidate tables come from the app’s own Persian search — no language model is involved at this stage.', inFa: 'پرسش فارسی', inEn: 'Persian question', outFa: 'جدول‌های نامزد', outEn: 'Candidate tables', tech: ['Full-text Index', 'Persian Stemming'] },
        { fa: 'انتخاب محدود', en: 'Constrained selection', edge: 'SELECT', bodyFa: 'مدل فقط از میان همان نامزدها انتخاب می‌کند؛ هر نامی که در فهرست نباشد دور ریخته می‌شود.', bodyEn: 'The model may only choose among those candidates; any name outside the list is discarded.', inFa: 'جدول‌های نامزد', inEn: 'Candidate tables', outFa: 'جدول‌های منتخب', outEn: 'Chosen tables', tech: ['LLM', 'Allow-list'] },
        { fa: 'زمینه‌سازی', en: 'Grounding', edge: 'GROUND', bodyFa: 'ستون‌ها، کلیدها، مقادیر کددار و شرط‌های JOIN از ایندکس بیرون کشیده می‌شوند؛ مدل JOIN نمی‌سازد، JOIN به او داده می‌شود.', bodyEn: 'Columns, keys, coded values and JOIN conditions are pulled from the index — the model never invents a JOIN, it is given one.', inFa: 'جدول‌های منتخب', inEn: 'Chosen tables', outFa: 'زمینه دقیق', outEn: 'Exact context', tech: ['SQLite Index', 'Join Graph'] },
        { fa: 'نگارش کوئری', en: 'Drafting', edge: 'DRAFT', bodyFa: 'مدل با همین زمینه کوئری T-SQL را می‌نویسد.', bodyEn: 'The model writes the T-SQL query from that context alone.', inFa: 'زمینه دقیق', inEn: 'Exact context', outFa: 'پیش‌نویس T-SQL', outEn: 'T-SQL draft', tech: ['OpenAI / Gemini / Anthropic'] },
        { fa: 'بازبینی و تصحیح', en: 'Verify and retry', edge: 'VERIFY', bodyFa: 'هر نام جدول، ستون و مسیر JOIN با ساختار واقعی سنجیده می‌شود؛ متن ایراد به مدل برمی‌گردد تا دور بعد تصحیح کند.', bodyEn: 'Every table, column and JOIN path is checked against the real schema; the error text goes back to the model for the next round.', inFa: 'پیش‌نویس T-SQL', inEn: 'T-SQL draft', outFa: 'کوئری تأییدشده', outEn: 'Verified query', tech: ['sqlglot', 'Schema Check'] }
      ]
    }
  ];

  var T = {
    fa: { ctx: 'زمینه پروژه', ch: 'چالش‌های فنی', sol: 'رویکرد فنی', resp: 'نقش من', val: 'نتیجه', stack: 'استک', open: 'مشاهده مخزن', searchPh: 'جست‌وجو بین پروژه‌ها و بخش‌ها…', inLabel: 'ورودی', outLabel: 'خروجی', flowOn: 'توقف جریان', flowOff: 'پخش جریان', project: 'پروژه', section: 'بخش', empty: 'نتیجه‌ای پیدا نشد.', isNew: 'جدید', details: 'جزئیات پروژه', more: 'جزئیات', close: 'بستن', prev: 'قبلی', next: 'بعدی', noMatch: 'پروژه‌ای با این مشخصات پیدا نشد.', reset: 'پاک کردن فیلترها', searchPj: 'جست‌وجو در پروژه‌ها، فناوری‌ها…', title: 'مهران سبزعلی | مهندس ارشد نرم‌افزار — هوش مصنوعی، امنیت، IoT' },
    en: { ctx: 'Context', ch: 'Technical challenges', sol: 'Approach', resp: 'My role', val: 'Outcome', stack: 'Stack', open: 'View repository', searchPh: 'Search projects and sections…', inLabel: 'Input', outLabel: 'Output', flowOn: 'Stop flow', flowOff: 'Play flow', project: 'PROJECT', section: 'SECTION', empty: 'No results.', isNew: 'NEW', details: 'Project details', more: 'Details', close: 'Close', prev: 'Previous', next: 'Next', noMatch: 'No project matches these filters.', reset: 'Clear filters', searchPj: 'Search projects, technologies…', title: 'Mehran Sabzali | Senior Software Engineer — AI, Security, IoT' }
  };

  var CATS = {
    fa: [['all', 'همه'], ['ai', 'هوش مصنوعی'], ['security', 'امنیت'], ['web', 'وب'], ['database', 'پایگاه داده'], ['app', 'اپلیکیشن'], ['iot', 'IoT']],
    en: [['all', 'All'], ['ai', 'AI'], ['security', 'Security'], ['web', 'Web'], ['database', 'Database'], ['app', 'Apps'], ['iot', 'IoT']]
  };

  var SECTIONS = {
    fa: [['expertise', 'حوزه‌های تخصصی'], ['projects', 'پروژه‌های منتخب'], ['opensource', 'مخازن کد'], ['certs', 'گواهینامه‌ها'], ['stack', 'استک فنی'], ['about', 'درباره من'], ['architecture', 'نقشه معماری زنده']],
    en: [['expertise', 'Domains of work'], ['projects', 'Selected work'], ['opensource', 'Code repositories'], ['certs', 'Certificates'], ['stack', 'Technical stack'], ['about', 'About'], ['architecture', 'Live architecture map']]
  };

  var state = {
    lang: 'fa', filter: 'all', pq: '',
    archTab: 0, archLayer: 0, flow: false,
    palOpen: false, q: '', palIdx: 0
  };

  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;
  var mqMobile = window.matchMedia('(max-width: 879.98px)');
  var mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var accent = (getComputedStyle(root).getPropertyValue('--accent') || '#98FFE0').trim();
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
  function inCat(p, f) { return f === 'all' || (p.cat || '').split(' ').indexOf(f) >= 0; }
  function matchesQuery(p, q) {
    if (!q) return true;
    var hay = [p.title, p.en, p.tag, p.sum, (p.stack || []).join(' '), (p.platforms || []).join(' ')].join(' ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }
  function visible() {
    var f = state.filter, q = (state.pq || '').trim().toLowerCase();
    return list().filter(function (p) { return inCat(p, f) && matchesQuery(p, q); });
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

  // ---------- Project visuals (site/js/visuals.js) ----------
  function visualFor(p) { return window.GMVisuals ? window.GMVisuals.forProject(p) : ''; }

  // ---------- Featured showcase ----------
  function renderFeatured() {
    var tx = t(), feats = list().filter(function (p) { return p.featured; });
    feats.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
    $('pjFeat').innerHTML = feats.map(function (p, i) {
      var facts = (p.facts || []).map(function (f) { return '<div><b dir="ltr">' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('');
      var chips = (p.platforms && p.platforms.length ? p.platforms : (p.stack || []).slice(0, 4))
        .map(function (s) { return '<span class="chip">' + esc(s) + '</span>'; }).join('');
      return '<article class="fcard" data-feat="' + p.id + '" style="--d:' + (i * 90) + 'ms">' +
        '<div class="fcard__vis">' + visualFor(p) + '<span class="fcard__idx" dir="ltr">' + pad(i + 1) + ' / ' + pad(feats.length) + '</span></div>' +
        '<div class="fcard__body">' +
        '<div class="fcard__meta"><span class="fcard__tag" dir="ltr">' + esc(p.tag) + '</span>' +
        (p.isNew ? '<span class="tag-new">' + esc(tx.isNew) + '</span>' : '') +
        (p.badge ? '<span class="fcard__badge">' + esc(p.badge) + '</span>' : '') + '</div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p class="fcard__en" dir="ltr">' + esc(p.en) + '</p>' +
        '<p class="fcard__sum">' + esc(p.sum) + '</p>' +
        (facts ? '<div class="fcard__facts">' + facts + '</div>' : '') +
        '<div class="fcard__foot"><div class="chips" dir="ltr">' + chips + '</div>' +
        '<button type="button" class="fcard__go" data-open="' + p.id + '">' + esc(tx.details) + ' <span aria-hidden="true">' + (state.lang === 'en' ? '→' : '←') + '</span></button></div>' +
        '</div></article>';
    }).join('');
    $('featDots').innerHTML = feats.map(function (p, i) {
      return '<button type="button" data-dot="' + i + '" aria-label="' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
    }).join('');
    initTilt($('pjFeat').querySelectorAll('.fcard'));
    observeReveal($('pjFeat').querySelectorAll('.fcard'));
  }

  function initFeatured() {
    var box = $('pjFeat');
    box.addEventListener('click', function (e) {
      var card = e.target.closest('[data-feat]');
      if (card) openProject(Number(card.getAttribute('data-feat')), card.querySelector('.fcard__go'));
    });
    // Mobile carousel: keep the dots in step with the swipe position.
    var q = false;
    box.addEventListener('scroll', function () {
      if (q) return; q = true;
      requestAnimationFrame(function () {
        q = false;
        var cards = box.querySelectorAll('.fcard'), mid = box.getBoundingClientRect().left + box.clientWidth / 2, best = 0, bd = 1e9;
        Array.prototype.forEach.call(cards, function (c, i) {
          var r = c.getBoundingClientRect(), dd = Math.abs(r.left + r.width / 2 - mid);
          if (dd < bd) { bd = dd; best = i; }
        });
        Array.prototype.forEach.call($('featDots').children, function (b, i) { b.setAttribute('aria-current', String(i === best)); });
      });
    }, { passive: true });
    $('featDots').addEventListener('click', function (e) {
      var b = e.target.closest('[data-dot]');
      if (!b) return;
      var c = box.querySelectorAll('.fcard')[Number(b.getAttribute('data-dot'))];
      if (c) box.scrollTo({ left: c.offsetLeft - box.offsetLeft - (box.clientWidth - c.clientWidth) / 2, behavior: 'smooth' });
    });
  }

  // ---------- Projects: overview cards ----------
  function arrow() { return state.lang === 'en' ? '→' : '←'; }

  function cardHtml(p, i) {
    var tx = t(), chips = (p.platforms && p.platforms.length ? p.platforms : (p.stack || [])).slice(0, 3)
      .map(function (s) { return '<span class="chip">' + esc(s) + '</span>'; }).join('');
    return '<article class="pcard" data-pj="' + p.id + '" style="--d:' + Math.min(i, 8) * 45 + 'ms">' +
      '<div class="pcard__vis">' + visualFor(p) +
      '<span class="pcard__num" dir="ltr">' + pad(i + 1) + '</span>' +
      (p.isNew ? '<span class="tag-new pcard__new">' + esc(tx.isNew) + '</span>' : '') + '</div>' +
      '<div class="pcard__body">' +
      '<div class="pcard__meta"><span class="pcard__tag" dir="ltr">' + esc(p.tag || '') + '</span>' +
      (p.year ? '<span class="pcard__year" dir="ltr">' + esc(p.year) + '</span>' : '') + '</div>' +
      '<h3 class="pcard__title">' + esc(p.title) + '</h3>' +
      '<p class="pcard__sum">' + esc(p.sum || '') + '</p>' +
      '<div class="pcard__foot"><div class="chips pcard__chips" dir="ltr">' + chips + '</div>' +
      '<button type="button" class="pcard__go" data-open="' + p.id + '" aria-haspopup="dialog">' +
      '<span>' + esc(tx.more) + '</span><i aria-hidden="true">' + arrow() + '</i></button></div>' +
      '</div></article>';
  }

  function bullets(items, cls) {
    return '<ul class="det__bullets' + (cls ? ' ' + cls : '') + '">' +
      items.map(function (x) { return '<li><span>' + esc(x) + '</span></li>'; }).join('') + '</ul>';
  }
  function label(txt) { return '<div class="det__label"><span>' + esc(txt) + '</span></div>'; }

  function detailHtml(p, idx, total) {
    var tx = t(), h = '';
    h += '<div class="det__band">' + visualFor(p) +
      '<div class="det__band-top"><span class="det__badges">' + (p.isNew ? '<span class="tag-new">' + esc(tx.isNew) + '</span>' : '') +
      (p.badge ? '<span>' + esc(p.badge) + '</span>' : '') + '<span dir="ltr">' + esc(p.tag || '') + '</span></span></div>' +
      '<span class="det__glyph" dir="ltr" aria-hidden="true">' + pad(idx + 1) + '</span></div>';
    h += '<div class="det">';
    h += '<h3 id="sheetTitle">' + esc(p.title) + '</h3>';
    h += '<div class="det__en" dir="ltr">' + esc(p.en) + '</div>';
    if ((p.platforms && p.platforms.length) || p.year) {
      h += '<div class="det__plat" dir="ltr">' + (p.platforms || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') +
        (p.year ? '<span class="det__year">' + esc(p.year) + '</span>' : '') + '</div>';
    }
    h += '<p class="det__sum">' + esc(p.sum || '') + '</p>';
    if (p.facts && p.facts.length) {
      h += '<div class="det__facts">' + p.facts.map(function (f) { return '<div><b dir="ltr">' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('') + '</div>';
    }
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

  function renderProjects() {
    var tx = t(), en = state.lang === 'en', all = list(), vis = visible();
    $('pjCount').textContent = pad(vis.length) + (en ? ' / ' + pad(all.length) + ' PROJECTS' : ' / ' + pad(all.length));

    var q = (state.pq || '').trim().toLowerCase();
    $('pjFilters').innerHTML = CATS[state.lang].map(function (c) {
      var n = all.filter(function (p) { return inCat(p, c[0]) && matchesQuery(p, q); }).length;
      return '<button type="button" class="pill" data-filter="' + c[0] + '" aria-pressed="' + (state.filter === c[0]) + '"' + (n ? '' : ' data-empty') + '>' +
        esc(c[1]) + '<span class="pill__n" dir="ltr">' + n + '</span></button>';
    }).join('');

    var box = $('pjCards');
    box.innerHTML = vis.length ? vis.map(cardHtml).join('') :
      '<div class="pj-empty"><b>' + esc(tx.noMatch) + '</b><button type="button" data-reset>' + esc(tx.reset) + '</button></div>';
    var cards = box.querySelectorAll('.pcard');
    initTilt(cards);
    watchCards(cards);
    if (sheet.open) renderSheet(false);
  }

  // Card illustrations animate only while they matter: on hover (mouse) or while a card
  // sits in the middle band of the screen (touch), so 25 drawings never run at once.
  var cardIO = null;
  function watchCards(cards) {
    if (cardIO) cardIO.disconnect();
    if (!('IntersectionObserver' in window)) return;
    cardIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('is-live', en.isIntersecting);
        if (en.isIntersecting && !en.target.classList.contains('is-seen')) en.target.classList.add('is-seen');
      });
    }, { rootMargin: hoverCapable() ? '0px' : '-38% 0px -38% 0px', threshold: 0 });
    Array.prototype.forEach.call(cards, function (c) { cardIO.observe(c); });
  }
  function hoverCapable() { return window.matchMedia('(hover: hover) and (pointer: fine)').matches; }

  // ---------- Project details sheet (bottom sheet on phones, centred panel on desktop) ----------
  var sheet = { open: false, id: null, ret: null, pushed: false, closing: 0 };

  function sheetList() {
    var vis = visible();
    for (var i = 0; i < vis.length; i++) if (vis[i].id === sheet.id) return vis;
    return list();
  }

  function renderSheet(animate, dir) {
    var L = sheetList(), idx = 0;
    for (var i = 0; i < L.length; i++) if (L[i].id === sheet.id) idx = i;
    var p = softenRep(L[idx]);
    if (!p) return;
    var body = $('pjDet');
    body.innerHTML = detailHtml(p, idx, L.length);
    body.scrollTop = 0;
    $('sheetCount').textContent = pad(idx + 1) + ' / ' + pad(L.length);
    var prev = L[(idx - 1 + L.length) % L.length], next = L[(idx + 1) % L.length], tx = t();
    $('sheetPrev').innerHTML = '<i aria-hidden="true">' + (state.lang === 'en' ? '←' : '→') + '</i><span><small>' + esc(tx.prev) + '</small><b>' + esc(prev.title) + '</b></span>';
    $('sheetNext').innerHTML = '<span><small>' + esc(tx.next) + '</small><b>' + esc(next.title) + '</b></span><i aria-hidden="true">' + arrow() + '</i>';
    $('sheetPrev').hidden = $('sheetNext').hidden = L.length < 2;
    $('sheetClose').setAttribute('aria-label', tx.close);
    if (animate && body.animate && !mqReduced.matches) {
      var dx = (dir || 0) * (state.lang === 'en' ? 1 : -1) * 28;
      body.animate([{ opacity: 0, transform: 'translateX(' + dx + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.16,.86,.2,1)' });
    }
  }

  function lockScroll(on) {
    var w = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingInlineEnd = on && w > 0 ? w + 'px' : '';
    root.classList.toggle('is-locked', on);
  }

  function openSheet(id, opts) {
    opts = opts || {};
    var el = $('pjSheet');
    clearTimeout(sheet.closing);
    sheet.id = id;
    if (!sheet.open) {
      sheet.ret = opts.ret || document.activeElement;
      sheet.open = true;
      closeMenu();
      el.hidden = false;
      el.removeAttribute('inert');
      lockScroll(true);
      $('sheetPanel').style.removeProperty('--sy');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-open'); }); });
      if (!opts.fromHistory) {
        try { history.pushState({ pj: id }, '', '#project-' + id); sheet.pushed = true; } catch (e) { sheet.pushed = false; }
      }
      setTimeout(function () { $('sheetClose').focus({ preventScroll: true }); }, 60);
    }
    renderSheet(false);
  }

  function closeSheet(fromHistory) {
    if (!sheet.open) return;
    if (!fromHistory && sheet.pushed) { sheet.pushed = false; history.back(); return; }
    sheet.open = false; sheet.pushed = false;
    var el = $('pjSheet');
    el.classList.remove('is-open');
    el.setAttribute('inert', '');
    lockScroll(false);
    sheet.closing = setTimeout(function () { el.hidden = true; $('pjDet').innerHTML = ''; $('sheetPanel').style.removeProperty('--sy'); }, 460);
    var back = sheet.ret && document.contains(sheet.ret) ? sheet.ret : document.querySelector('[data-pj="' + sheet.id + '"] .pcard__go');
    if (back && back.focus) back.focus({ preventScroll: true });
  }

  function sheetStep(d) {
    var L = sheetList(), idx = 0;
    for (var i = 0; i < L.length; i++) if (L[i].id === sheet.id) idx = i;
    sheet.id = L[(idx + d + L.length) % L.length].id;
    try { if (sheet.pushed) history.replaceState({ pj: sheet.id }, '', '#project-' + sheet.id); } catch (e) { /* history unavailable */ }
    renderSheet(true, d);
  }

  function initSheet() {
    var el = $('pjSheet'), panel = $('sheetPanel'), body = $('pjDet');
    el.addEventListener('click', function (e) { if (e.target.closest('[data-sheet-close]')) closeSheet(); });
    $('sheetClose').addEventListener('click', function () { closeSheet(); });
    $('sheetPrev').addEventListener('click', function () { sheetStep(-1); });
    $('sheetNext').addEventListener('click', function () { sheetStep(1); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        var f = panel.querySelectorAll('button:not([hidden]), a[href]'), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener('popstate', function (e) {
      var m = /^#project-(\d+)$/.exec(location.hash);
      if (sheet.open && !m) closeSheet(true);
      else if (m && e.state && e.state.pj) { sheet.pushed = true; openSheet(Number(m[1]), { fromHistory: true }); }
    });

    // Drag down to dismiss (phones): from the grab bar, or from the body when it is scrolled to the top.
    var y0 = 0, dy = 0, t0 = 0, drag = false, armed = false;
    panel.addEventListener('touchstart', function (e) {
      if (!isMobile()) return;
      armed = !!e.target.closest('.sheet__bar') || body.scrollTop <= 0;
      drag = false; dy = 0; y0 = e.touches[0].clientY; t0 = performance.now();
    }, { passive: true });
    panel.addEventListener('touchmove', function (e) {
      if (!armed) return;
      var m = e.touches[0].clientY - y0;
      if (!drag) {
        if (m > 6 && (body.scrollTop <= 0 || e.target.closest('.sheet__bar'))) { drag = true; panel.classList.add('is-dragging'); }
        else if (m < -6) { armed = false; return; }
        else return;
      }
      dy = Math.max(0, m);
      panel.style.setProperty('--sy', dy + 'px');
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    panel.addEventListener('touchend', function () {
      if (!drag) { armed = false; return; }
      drag = armed = false;
      panel.classList.remove('is-dragging');
      var v = dy / Math.max(1, performance.now() - t0);
      if (dy > panel.offsetHeight * 0.22 || (v > 0.6 && dy > 40)) closeSheet();
      else panel.style.removeProperty('--sy');
    });
  }

  function openProject(id, ret) { openSheet(id, { ret: ret }); }

  function initProjects() {
    $('pjFilters').addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      state.filter = b.getAttribute('data-filter');
      renderProjects();
      b = document.querySelector('[data-filter="' + state.filter + '"]');
      if (b && b.scrollIntoView && isMobile()) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
    var st = 0;
    $('pjSearch').addEventListener('input', function (e) {
      clearTimeout(st);
      var v = e.target.value;
      st = setTimeout(function () { state.pq = v; renderProjects(); }, 120);
    });
    $('pjCards').addEventListener('click', function (e) {
      if (e.target.closest('[data-reset]')) {
        state.filter = 'all'; state.pq = ''; $('pjSearch').value = ''; renderProjects(); return;
      }
      var c = e.target.closest('[data-pj]');
      if (c) openProject(Number(c.getAttribute('data-pj')), c.querySelector('.pcard__go'));
    });
    initFeatured();
    initSheet();
    var m = /^#project-(\d+)$/.exec(location.hash);
    if (m && list().some(function (p) { return p.id === Number(m[1]); })) {
      try { history.replaceState(null, '', location.pathname + location.search + '#projects'); } catch (e) { /* history unavailable */ }
      setTimeout(function () { openProject(Number(m[1])); }, 300);
    }
  }

  // ---------- Scroll reveal ----------
  var revealIO = null;
  function observeReveal(nodes) {
    if (!revealIO) return;
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.classList.contains('is-in')) return;
      el.classList.add('rv');
      revealIO.observe(el);
    });
  }
  function initReveal() {
    if (!('IntersectionObserver' in window) || mqReduced.matches) return;
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        revealIO.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    // Stagger siblings inside the same group.
    ['.exp-grid > .xcard', '#opensource .row', '#certs .tile', '#stack .row', '.tiles--values .tile'].forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el, i) { el.style.setProperty('--d', (i % 6) * 80 + 'ms'); });
    });
    observeReveal(document.querySelectorAll('.sec-head, .sub-head, .xcard, .pj-label, .pj-bar, .pj-grid, #opensource .row, .tile, #stack .row, .about__frame, .about__text > div, .arch__intro, .arch__grid, .cta'));
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
        var wire = (i === li || i === li - 1) ? 'rgba(152, 255, 224, .5)' : '#164347';
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
        closePal(); openProject(p.id);
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
  // ---------- Drawer menu (slides in from the start edge: right in Persian, left in English) ----------
  var drawerReturn = null;
  function menuIsOpen() { return $('menuBtn').getAttribute('aria-expanded') === 'true'; }
  function setDrawer(open) {
    var btn = $('menuBtn'), d = $('mmenu'), scrim = $('scrim');
    if (open === menuIsOpen()) return;
    btn.setAttribute('aria-expanded', String(open));
    d.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    d.setAttribute('aria-hidden', String(!open));
    if (open) { d.removeAttribute('inert'); } else { d.setAttribute('inert', ''); }
    d.style.removeProperty('--dx');
    root.classList.toggle('is-locked', open);
    if (open) {
      drawerReturn = document.activeElement;
      setTimeout(function () { var f = d.querySelector('.drawer__nav a'); if (f) f.focus({ preventScroll: true }); }, 60);
    } else if (drawerReturn && drawerReturn.focus) {
      drawerReturn.focus({ preventScroll: true });
    }
  }
  function closeMenu() { setDrawer(false); }
  function initHeader() {
    var btn = $('menuBtn'), d = $('mmenu');
    btn.addEventListener('click', function () { setDrawer(!menuIsOpen()); });
    $('drawerClose').addEventListener('click', closeMenu);
    $('scrim').addEventListener('click', closeMenu);
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      closeMenu();
      jump(a.getAttribute('href').slice(1));
    });
    // Keep keyboard focus inside the open drawer.
    d.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = d.querySelectorAll('a, button'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // Swipe the drawer back toward its edge to close it; it follows the finger.
    var x0 = 0, y0 = 0, dx = 0, tracking = false, horizontal = null;
    d.addEventListener('touchstart', function (e) {
      if (!menuIsOpen()) return;
      tracking = true; horizontal = null; dx = 0;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    d.addEventListener('touchmove', function (e) {
      if (!tracking) return;
      var mx = e.touches[0].clientX - x0, my = e.touches[0].clientY - y0;
      if (horizontal === null && (Math.abs(mx) > 8 || Math.abs(my) > 8)) horizontal = Math.abs(mx) > Math.abs(my);
      if (!horizontal) return;
      var rtl = root.getAttribute('dir') === 'rtl';
      dx = rtl ? Math.max(0, mx) : Math.min(0, mx);
      d.classList.add('is-dragging');
      d.style.setProperty('--dx', dx + 'px');
      $('scrim').style.opacity = String(Math.max(0, 1 - Math.abs(dx) / d.offsetWidth));
    }, { passive: true });
    d.addEventListener('touchend', function () {
      if (!tracking) return;
      tracking = false;
      d.classList.remove('is-dragging');
      $('scrim').style.opacity = '';
      if (Math.abs(dx) > d.offsetWidth * 0.28) closeMenu();
      else d.style.removeProperty('--dx');
    });
    var onBp = function () { if (!isMobile()) closeMenu(); };
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', onBp); else mqMobile.addListener(onBp);

    var bar = $('progress'), q = false, last = '', toTop = $('toTop');
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: mqReduced.matches ? 'auto' : 'smooth' });
      var b = document.querySelector('.brand'); if (b) b.focus({ preventScroll: true });
    });
    var update = function () {
      q = false;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / max)).toFixed(3);
      if (p !== last) {
        last = p; bar.style.transform = 'scaleX(' + p + ')';
        toTop.style.setProperty('--p', p);
      }
      toTop.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.9);
      // Compact after the first few pixels; tuck away while reading down, return on any upward scroll.
      var y = window.scrollY, hdr = $('hdr'), dy = y - lastY;
      hdr.classList.toggle('is-compact', y > 24);
      var menuOpen = $('menuBtn').getAttribute('aria-expanded') === 'true';
      // Accumulate distance per direction so slow/smooth scrolling still counts.
      if ((dy > 0) !== (travel > 0)) travel = 0;
      travel += dy;
      if (menuOpen || state.palOpen || y < 320) hdr.classList.remove('is-hidden');
      else if (travel > 24) hdr.classList.add('is-hidden');
      else if (travel < -14) hdr.classList.remove('is-hidden');
      lastY = y;
    };
    var lastY = window.scrollY, travel = 0;
    // Keyboard users tabbing into the header always get it back.
    $('hdr').addEventListener('focusin', function () { $('hdr').classList.remove('is-hidden'); });
    window.addEventListener('scroll', function () { if (!q) { q = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---------- Keyboard ----------
  function initKeys() {
    window.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      if (k === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (state.palOpen) closePal(); else openPal(); return; }
      if (k === 'escape') { if (state.palOpen) { closePal(); return; } if (sheet.open) { closeSheet(); return; } closeMenu(); return; }
      if (state.palOpen) {
        if (k === 'tab') { e.preventDefault(); $('palInput').focus(); }
        return;
      }
      // Arrow keys page through projects while the details sheet is open (mirrored in RTL).
      if (sheet.open && (k === 'arrowleft' || k === 'arrowright')) {
        var ae = document.activeElement;
        if (ae && /^(INPUT|TEXTAREA)$/.test(ae.tagName)) return;
        e.preventDefault();
        sheetStep((k === 'arrowright') === (state.lang === 'en') ? 1 : -1);
      }
    });
  }

  // ---------- Cards: pointer light + tilt ----------
  function initTilt(nodes) {
    Array.prototype.forEach.call(nodes, function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        if (!mqReduced.matches) {
          el.style.setProperty('--rx', ((0.5 - y) * 4).toFixed(2) + 'deg');
          el.style.setProperty('--ry', ((x - 0.5) * 6).toFixed(2) + 'deg');
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
    $('pjSearch').placeholder = t().searchPj;
    renderFeatured();
    renderProjects();
    renderArch();
    if (state.palOpen) renderPal();
    if (core) core.refresh();
    window.dispatchEvent(new CustomEvent('gm:lang', { detail: state.lang }));
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
    initTilt(document.querySelectorAll('.xcard'));
    initReveal();
    initClock();
    setLang(lang, false);
    $('langBtn').addEventListener('click', function () {
      var next = state.lang === 'en' ? 'fa' : 'en';
      // Crossfade the switch (direction flips RTL <-> LTR) where the browser supports view transitions.
      if (document.startViewTransition && !mqReduced.matches) document.startViewTransition(function () { setLang(next, true); });
      else setLang(next, true);
    });

    if (window.GMCore) {
      core = window.GMCore.init({
        canvas: $('core'), anchor: $('anchor'), spot: $('spot'),
        accent: accent, motion: !mqReduced.matches
      });
      window.__gmCore = core;
      var onMotion = function () { if (core) core.setMotion(!mqReduced.matches); };
      if (mqReduced.addEventListener) mqReduced.addEventListener('change', onMotion);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (core) core.refresh(); });
    }
  }

  if (window.__PORTFOLIO_DATA) boot();
  else window.addEventListener('portfolio-data-ready', boot, { once: true });
})();
