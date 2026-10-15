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
    fa: { ctx: 'زمینه پروژه', ch: 'چالش‌های فنی', sol: 'رویکرد فنی', resp: 'نقش من', val: 'نتیجه', stack: 'استک', open: 'مشاهده مخزن', searchPh: 'جست‌وجو بین پروژه‌ها و بخش‌ها…', inLabel: 'ورودی', outLabel: 'خروجی', flowOn: 'توقف جریان', flowOff: 'پخش جریان', project: 'پروژه', section: 'بخش', empty: 'نتیجه‌ای پیدا نشد.', isNew: 'جدید', details: 'جزئیات پروژه', prev: 'قبلی', next: 'بعدی', noMatch: 'پروژه‌ای با این مشخصات پیدا نشد.', reset: 'پاک کردن فیلترها', searchPj: 'جست‌وجو در پروژه‌ها، فناوری‌ها…', title: 'مهران سبزعلی | مهندس ارشد نرم‌افزار — هوش مصنوعی، امنیت، IoT' },
    en: { ctx: 'Context', ch: 'Technical challenges', sol: 'Approach', resp: 'My role', val: 'Outcome', stack: 'Stack', open: 'View repository', searchPh: 'Search projects and sections…', inLabel: 'Input', outLabel: 'Output', flowOn: 'Stop flow', flowOff: 'Play flow', project: 'PROJECT', section: 'SECTION', empty: 'No results.', isNew: 'NEW', details: 'Project details', prev: 'Previous', next: 'Next', noMatch: 'No project matches these filters.', reset: 'Clear filters', searchPj: 'Search projects, technologies…', title: 'Mehran Sabzali | Senior Software Engineer — AI, Security, IoT' }
  };

  var CATS = {
    fa: [['all', 'همه'], ['ai', 'هوش مصنوعی'], ['security', 'امنیت'], ['web', 'وب'], ['database', 'پایگاه داده'], ['app', 'اپلیکیشن'], ['iot', 'IoT']],
    en: [['all', 'All'], ['ai', 'AI'], ['security', 'Security'], ['web', 'Web'], ['database', 'Database'], ['app', 'Apps'], ['iot', 'IoT']]
  };

  var SECTIONS = {
    fa: [['expertise', 'حوزه‌های تخصصی'], ['projects', 'پروژه‌های منتخب'], ['opensource', 'مخازن کد'], ['certs', 'گواهینامه‌ها'], ['stack', 'استک فنی'], ['about', 'درباره من'], ['architecture', 'نقشه معماری زنده']],
    en: [['expertise', 'Domains of work'], ['projects', 'Selected work'], ['opensource', 'Code repositories'], ['certs', 'Certificates'], ['stack', 'Technical stack'], ['about', 'About'], ['architecture', 'Live architecture map']]
  };

  var DEFAULT_PROJECT = 6; // RepBuilderAssis opens by default.

  var state = {
    lang: 'fa', filter: 'all', pq: '', sel: DEFAULT_PROJECT, pjClosed: false,
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

  // ---------- Project visuals ----------
  // Seeded PRNG so every project gets the same signature drawing on every visit.
  function rng(seed) {
    var s = (seed * 2654435761) >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }

  // A unique constellation per project: an orbit of nodes, chords between them and a lit core.
  function sigilSvg(p) {
    var r = rng(p.id * 97 + 13), n = 6 + Math.floor(r() * 5), cx = 200, cy = 110, R = 78, pts = [], h = '';
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + r() * 0.5, rr = R * (0.72 + r() * 0.34);
      pts.push([cx + Math.cos(a) * rr * 1.55, cy + Math.sin(a) * rr]);
    }
    h += '<ellipse cx="200" cy="110" rx="128" ry="84" class="v-ring"/><ellipse cx="200" cy="110" rx="70" ry="46" class="v-ring v-ring--in"/>';
    for (i = 0; i < n; i++) {
      var j = (i + 1 + Math.floor(r() * (n - 2))) % n;
      h += '<line x1="' + pts[i][0].toFixed(1) + '" y1="' + pts[i][1].toFixed(1) + '" x2="' + pts[j][0].toFixed(1) + '" y2="' + pts[j][1].toFixed(1) + '" class="v-edge' + (i % 3 === 0 ? ' v-edge--hot' : '') + '"/>';
      h += '<line x1="200" y1="110" x2="' + pts[i][0].toFixed(1) + '" y2="' + pts[i][1].toFixed(1) + '" class="v-spoke"/>';
    }
    pts.forEach(function (q, k) {
      h += '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="' + (k % 3 === 0 ? 3.6 : 2.4) + '" class="v-node' + (k % 3 === 0 ? ' v-node--hot' : '') + '" style="--i:' + k + '"/>';
    });
    h += '<circle cx="200" cy="110" r="9" class="v-core"/><circle cx="200" cy="110" r="18" class="v-halo"/>';
    return '<svg class="vis vis--sigil" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + h + '</svg>';
  }

  // GMTask: Jalali month grid on a phone, a checklist ticking itself off, and the desktop window behind.
  function tasksSvg() {
    var h = '<rect x="168" y="22" width="206" height="150" rx="6" class="v-win"/><rect x="168" y="22" width="206" height="16" rx="6" class="v-win-bar"/>';
    h += '<circle cx="180" cy="30" r="2.4" class="v-dot"/><circle cx="189" cy="30" r="2.4" class="v-dot"/>';
    for (var k = 0; k < 4; k++) {
      var y = 56 + k * 26;
      h += '<rect x="246" y="' + y + '" width="11" height="11" rx="2" class="v-box"/>';
      h += '<path d="M248.5 ' + (y + 5.5) + ' l2.6 2.8 l4.6 -5.4" class="v-tick" style="--i:' + k + '"/>';
      h += '<rect x="265" y="' + (y + 2) + '" width="' + (88 - k * 13) + '" height="3" rx="1.5" class="v-line"/>';
      h += '<rect x="265" y="' + (y + 8) + '" width="' + (52 - k * 6) + '" height="2" rx="1" class="v-line v-line--dim"/>';
    }
    h += '<rect x="246" y="158" width="108" height="3" rx="1.5" class="v-track"/><rect x="246" y="158" width="108" height="3" rx="1.5" class="v-fill"/>';
    h += '<rect x="40" y="30" width="112" height="178" rx="14" class="v-phone"/><rect x="72" y="36" width="48" height="5" rx="2.5" class="v-notch"/>';
    h += '<rect x="52" y="52" width="58" height="5" rx="2.5" class="v-line"/><rect x="52" y="61" width="34" height="3" rx="1.5" class="v-line v-line--dim"/>';
    for (var d = 0; d < 35; d++) {
      var c = d % 7, row = Math.floor(d / 7), x = 52 + c * 12.4, yy = 76 + row * 13;
      var cls = d === 17 ? 'v-day v-day--today' : (d === 6 || d === 13 || d === 20 || d === 27 || d === 34) ? 'v-day v-day--off' : ([3, 9, 15, 22, 24, 30].indexOf(d) >= 0 ? 'v-day v-day--busy' : 'v-day');
      h += '<rect x="' + x.toFixed(1) + '" y="' + yy + '" width="9" height="9" rx="2" class="' + cls + '"/>';
    }
    h += '<circle cx="' + (52 + 3 * 12.4 + 4.5).toFixed(1) + '" cy="' + (76 + 2 * 13 + 4.5) + '" r="9" class="v-pulse"/>';
    h += '<rect x="52" y="148" width="88" height="22" rx="5" class="v-chip"/><rect x="59" y="157" width="40" height="3" rx="1.5" class="v-line"/>';
    h += '<rect x="52" y="176" width="88" height="22" rx="5" class="v-chip v-chip--dim"/>';
    return '<svg class="vis vis--tasks" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + h + '</svg>';
  }

  // Kavosh: a schema graph with the shortest JOIN path lighting up between two tables.
  function graphSvg() {
    var N = [[46, 62, 'FIN3.Voucher'], [118, 34], [172, 92, ''], [96, 132], [40, 176], [236, 46], [250, 150, ''], [310, 98], [356, 44], [362, 172, 'GNR.Party'], [180, 188], [292, 196]];
    var E = [[0, 1], [0, 3], [1, 2], [2, 3], [3, 4], [1, 5], [2, 6], [5, 7], [6, 7], [7, 8], [7, 9], [6, 10], [10, 4], [6, 11], [11, 9], [5, 8]];
    var P = [[0, 3], [3, 2], [2, 6], [6, 7], [7, 9]];
    var h = '';
    E.forEach(function (e) { h += '<line x1="' + N[e[0]][0] + '" y1="' + N[e[0]][1] + '" x2="' + N[e[1]][0] + '" y2="' + N[e[1]][1] + '" class="v-edge"/>'; });
    var d = 'M' + N[P[0][0]][0] + ' ' + N[P[0][0]][1];
    P.forEach(function (e) { d += ' L' + N[e[1]][0] + ' ' + N[e[1]][1]; });
    h += '<path d="' + d + '" class="v-path"/><path d="' + d + '" class="v-path-flow"/>';
    N.forEach(function (n, i) {
      var onPath = [0, 3, 2, 6, 7, 9].indexOf(i) >= 0, end = i === 0 || i === 9;
      h += '<rect x="' + (n[0] - (end ? 8 : 5)) + '" y="' + (n[1] - (end ? 8 : 5)) + '" width="' + (end ? 16 : 10) + '" height="' + (end ? 16 : 10) + '" rx="' + (end ? 4 : 2.5) + '" class="v-table' + (onPath ? ' v-table--on' : '') + (end ? ' v-table--end' : '') + '" style="--i:' + i + '"/>';
      if (n[2]) h += '<text x="' + n[0] + '" y="' + (n[1] + (n[1] > 150 ? -16 : 24)) + '" class="v-label" text-anchor="middle">' + n[2] + '</text>';
    });
    h += '<text x="200" y="18" class="v-label v-label--k" text-anchor="middle">JOIN PATH · 5 HOPS</text>';
    return '<svg class="vis vis--graph" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + h + '</svg>';
  }

  // RepBuilderAssis: question → retrieval → plan → validated T-SQL → RDL, with a packet travelling the line.
  var svgUid = 0;
  function pipelineSvg() {
    var rid = 'pipe-route-' + (++svgUid);
    var S = [['PROMPT', 52, 70], ['RETRIEVE', 128, 150], ['PLAN', 200, 70], ['VALIDATE', 272, 150], ['RDL', 348, 70]];
    var d = 'M' + S.map(function (s) { return s[1] + ' ' + s[2]; }).join(' L');
    var h = '<path id="' + rid + '" d="' + d + '" class="v-path"/><path d="' + d + '" class="v-path-flow"/>';
    S.forEach(function (s, i) {
      h += '<rect x="' + (s[1] - 32) + '" y="' + (s[2] - 15) + '" width="64" height="30" rx="5" class="v-stage' + (i === 3 ? ' v-stage--check' : '') + '" style="--i:' + i + '"/>';
      h += '<text x="' + s[1] + '" y="' + (s[2] + 3.5) + '" class="v-label v-label--stage" text-anchor="middle">' + s[0] + '</text>';
      h += '<text x="' + s[1] + '" y="' + (s[2] + (s[2] < 100 ? -24 : 32)) + '" class="v-label" text-anchor="middle">0' + (i + 1) + '</text>';
    });
    h += '<path d="M262 151 l6 6 l12 -13" class="v-tick v-tick--big"/>';
    h += '<circle r="5" class="v-packet"><animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto"><mpath href="#' + rid + '"/></animateMotion></circle>';
    h += '<text x="200" y="208" class="v-label v-label--k" text-anchor="middle">SELECT … FROM … JOIN … ✓</text>';
    return '<svg class="vis vis--pipeline" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + h + '</svg>';
  }

  function visualFor(p) {
    if (p.visual === 'tasks') return tasksSvg();
    if (p.visual === 'graph') return graphSvg();
    if (p.visual === 'pipeline') return pipelineSvg();
    return sigilSvg(p);
  }

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

  function openProject(id) {
    state.sel = id; state.filter = 'all'; state.pq = ''; state.pjClosed = false;
    $('pjSearch').value = '';
    renderProjects({ force: true });
    if (isMobile()) { revealRow(id); return; }
    var grid = document.querySelector('.pj-grid');
    window.scrollTo({ top: Math.max(0, grid.getBoundingClientRect().top + window.scrollY - 84), behavior: mqReduced.matches ? 'auto' : 'smooth' });
    var row = document.querySelector('[data-pj="' + id + '"]');
    if (row) row.scrollIntoView({ block: 'nearest' });
  }

  function initFeatured() {
    var box = $('pjFeat');
    box.addEventListener('click', function (e) {
      var card = e.target.closest('[data-feat]');
      if (card) openProject(Number(card.getAttribute('data-feat')));
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
      '<span class="pj-row__txt"><span class="pj-row__title">' + esc(p.title) +
      (p.isNew ? ' <span class="tag-new tag-new--sm">' + esc(t().isNew) + '</span>' : '') + '</span>' +
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
    var tx = t(), en = state.lang === 'en', h = '';
    h += '<div class="det__band">' + visualFor(p) +
      '<div class="det__band-top"><span class="det__num">' + (idx >= 0 ? pad(idx + 1) : '--') + ' / ' + pad(total) + '</span>' +
      '<span class="det__badges">' + (p.isNew ? '<span class="tag-new">' + esc(tx.isNew) + '</span>' : '') +
      (p.badge ? '<span>' + esc(p.badge) + '</span>' : '') + '<span dir="ltr">' + esc(p.tag || '') + '</span></span></div>' +
      '<span class="det__glyph" dir="ltr" aria-hidden="true">' + pad(p.id) + '</span></div>';
    h += '<div class="det">';
    h += '<h3>' + esc(p.title) + '</h3>';
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
    if (total > 1) {
      h += '<div class="det__nav">' +
        '<button type="button" data-step="-1"><span aria-hidden="true">' + (en ? '←' : '→') + '</span> ' + esc(tx.prev) + '</button>' +
        '<span class="det__nav-k" dir="ltr">' + pad(idx + 1) + ' / ' + pad(total) + '</span>' +
        '<button type="button" data-step="1">' + esc(tx.next) + ' <span aria-hidden="true">' + (en ? '→' : '←') + '</span></button></div>';
    }
    h += '</div>';
    return h;
  }

  var lastDetKey = '';
  function renderProjects(opts) {
    opts = opts || {};
    var tx = t(), en = state.lang === 'en', all = list(), vis = visible();
    var mobile = isMobile(), closed = mobile && state.pjClosed;
    var effId = effectiveSel(vis);

    $('pjCount').textContent = pad(vis.length) + (en ? ' / ' + pad(all.length) + ' PROJECTS' : ' / ' + pad(all.length));

    var q = (state.pq || '').trim().toLowerCase();
    $('pjFilters').innerHTML = CATS[state.lang].map(function (c) {
      var n = all.filter(function (p) { return inCat(p, c[0]) && matchesQuery(p, q); }).length;
      return '<button type="button" class="pill" data-filter="' + c[0] + '" aria-pressed="' + (state.filter === c[0]) + '"' + (n ? '' : ' data-empty') + '>' +
        esc(c[1]) + '<span class="pill__n" dir="ltr">' + n + '</span></button>';
    }).join('');

    var rows = vis.map(function (p, i) { return rowHtml(p, i, p.id === effId && !closed, mobile); });
    var openIdx = -1;
    for (var i = 0; i < vis.length; i++) if (vis[i].id === effId) openIdx = i;
    var splitAt = (!mobile || closed || openIdx < 0) ? rows.length : openIdx + 1;
    var focusedId = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-pj');
    $('pjListA').innerHTML = rows.length ? rows.slice(0, splitAt).join('') :
      '<div class="pj-empty"><b>' + esc(tx.noMatch) + '</b><button type="button" data-reset>' + esc(tx.reset) + '</button></div>';
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
    if (key !== lastDetKey || opts.force) {
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

  function step(d, fromDetail) {
    var vis = visible();
    if (!vis.length) return;
    var ae = document.activeElement, focused = !fromDetail && ae && ae.getAttribute && Number(ae.getAttribute('data-pj'));
    var cur = focused || effectiveSel(vis), i = 0;
    for (var n = 0; n < vis.length; n++) if (vis[n].id === cur) i = n;
    var next = vis[(i + d + vis.length) % vis.length];
    state.sel = next.id;
    state.pjClosed = false;
    renderProjects({ focusId: next.id });
    var row = document.querySelector('[data-pj="' + next.id + '"]');
    if (row && !fromDetail) row.focus({ preventScroll: true });
    if (row && !isMobile()) row.scrollIntoView({ block: 'nearest' });
    if (isMobile()) revealRow(next.id);
  }

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
    ['pjListA', 'pjListB'].forEach(function (id) {
      $(id).addEventListener('click', function (e) {
        if (e.target.closest('[data-reset]')) {
          state.filter = 'all'; state.pq = ''; $('pjSearch').value = ''; renderProjects(); return;
        }
        var b = e.target.closest('[data-pj]');
        if (b) selectProject(Number(b.getAttribute('data-pj')));
      });
    });
    $('pjDet').addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]');
      if (b) step(Number(b.getAttribute('data-step')), true);
    });
    initFeatured();
    var wasMobile = isMobile();
    var onBp = function () {
      if (isMobile() !== wasMobile) { wasMobile = isMobile(); state.pjClosed = false; lastDetKey = ''; renderProjects(); }
    };
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', onBp); else mqMobile.addListener(onBp);
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
    lastDetKey = '';
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
    $('langBtn').addEventListener('click', function () { setLang(state.lang === 'en' ? 'fa' : 'en', true); });

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
