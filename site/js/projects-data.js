// Project data for the portfolio pages. Business content only — no styling.
const FA = [
  {
    id: 25, cat: 'app ai', tag: 'ANDROID / WINDOWS', isNew: true, featured: true, visual: 'tasks',
    year: '2026', platforms: ['Android', 'Windows'],
    title: 'GMTask — مدیریت کار، یادداشت و تقویم جلالی', en: 'GMTask — Persian-first tasks, notes & AI assistant',
    sum: 'اپلیکیشن فارسی‌محور مدیریت کار، یادداشت و تقویم جلالی با دستیار هوش مصنوعی؛ یک نسخه برای اندروید و یک نسخه برای ویندوز که از طریق ابر با هم همگام می‌مانند.',
    ctx: 'ابزاری برای کار روزمره: کارها، یادداشت‌ها و برنامه روز در یک جا، با تقویم شمسی دقیق و تعطیلات رسمی. اولویت طراحی این بود که برنامه بدون اینترنت کامل کار کند و داده هیچ کاربری در دسترس دیگری نباشد.',
    ch: [
      'همگام‌سازی چنددستگاهی بدون از دست رفتن داده: شناسه مستقل از دستگاه، صف تغییرات و ادغام «آخرین نوشتن برنده» همراه با ثبت حذف‌ها.',
      'محاسبه دقیق تقویم جلالی و کارهای تکرارشونده، با آزمون رفت‌وبرگشت روزبه‌روز برای ۳۰ سال.',
      'هوش مصنوعی بدون قربانی کردن حریم خصوصی: کلید API رمزنگاری‌شده در Android Keystore و ارسال هیچ داده‌ای به مدل بدون درخواست صریح کاربر.'
    ],
    sol: [
      'Kotlin و Jetpack Compose برای اندروید و Compose Desktop برای ویندوز',
      'Room با مهاجرت‌های صریح، WorkManager برای یادآورها و ویجت صفحه اصلی',
      'Firestore با قوانین دسترسی فقط-مالک روی users/{uid}',
      'دستیار چندارائه‌دهنده (Gemini، OpenAI، Claude) با اعتبارسنجی خروجی مدل، و تجزیه‌گر محلی برای افزودن سریع کار',
      'گزارش بهره‌وری، نقشه حرارتی فعالیت، هدف روزانه و تایمر تمرکز'
    ],
    resp: [
      'طراحی و توسعه کامل نسخه اندروید و ویندوز',
      'ممیزی مهندسی و رفع مشکلات امنیتی و همگام‌سازی',
      'نوشتن مجموعه آزمون‌های واحد و آزمون‌های دستگاه',
      'CI و انتشار خودکار APK و نصب‌کننده ویندوز'
    ],
    val: 'یک اپ کامل و آفلاین‌محور روی دو پلتفرم با انتشار منظم نسخه‌ها؛ APK و نصب‌کننده ویندوز در هر نسخه خودکار ساخته و منتشر می‌شوند.',
    facts: [['1.9', 'نسخه'], ['2', 'پلتفرم'], ['67', 'فایل آزمون'], ['3', 'ارائه‌دهنده AI']],
    stack: ['Kotlin', 'Jetpack Compose', 'Compose Desktop', 'Room', 'WorkManager', 'Firebase', 'Gemini / OpenAI / Claude', 'GitHub Actions'],
    badge: 'مخزن خصوصی'
  },
  {
    id: 26, cat: 'database ai app', tag: 'DATABASE / DESKTOP', isNew: true, featured: true, visual: 'graph',
    year: '2026', platforms: ['Windows', 'Android', 'Web'],
    title: 'کاوشگر پایگاه داده (کاوش)', en: 'DataBase Kavosh — ERP schema explorer',
    sum: 'اپلیکیشن مستقل کاوش ساختار پایگاه داده نرم‌افزار سازمانی: جست‌وجوی فارسی میان هزاران جدول و ده‌ها هزار ستون، گراف بصری روابط، مسیریابی JOIN و تولید T-SQL؛ کاملاً آفلاین.',
    ctx: 'نوشتن هر گزارش روی ERP یعنی اول پیدا کردن جدول درست و مسیر اتصال جدول‌ها. کاوش این مرحله را از ساعت‌ها گشتن به چند ثانیه جست‌وجو می‌رساند و دانش تیم را هم در خودش نگه می‌دارد.',
    ch: [
      'جست‌وجوی فارسی دقیق با یکسان‌سازی حروف عربی و فارسی و ریشه‌یابی سبک، روی نام انگلیسی، عنوان فارسی و نام ستون‌ها.',
      'پیدا کردن کوتاه‌ترین مسیر JOIN میان دو جدول، با هشدار برای مسیرهای بلند یا تأییدنشده.',
      'دستیار کوئری‌نویسی که حتی با مدل زبانی ضعیف هم فقط کوئری معتبر تحویل بدهد.'
    ],
    sol: [
      'پایگاه دانش YAML به‌عنوان منبع حقیقت و ایندکس SQLite که همیشه از آن بازساخته می‌شود',
      'بک‌اند FastAPI و رابط React با گراف‌های D3 در چهار نما: نیرومحور، سلسله‌مراتبی، شعاعی و ERD',
      'دستیار پنج‌مرحله‌ای: بازیابی، انتخاب، زمینه‌سازی، نگارش و بازبینی؛ هر کوئری کلمه‌به‌کلمه در برابر ساختار واقعی سنجیده می‌شود',
      'اتصال به ارائه‌دهنده‌های مدل از طریق سه «گویش» API: OpenAI، Gemini و Anthropic',
      'بسته‌بندی PyInstaller و نصب‌کننده NSIS بدون نیاز به دسترسی مدیر، و نسخه اندروید آفلاین'
    ],
    resp: [
      'معماری پایگاه دانش، ایندکس و موتور جست‌وجو',
      'طراحی رابط کاربری واکنش‌گرا و گراف‌های روابط',
      'دستیار کوئری‌نویسی و بازبین T-SQL',
      'بسته‌بندی و انتشار خودکار برای ویندوز و اندروید'
    ],
    val: 'نصب با یک کلیک روی ویندوز و اندروید، بدون پایتون، Node.js یا اینترنت؛ دانشی که کاربر ثبت می‌کند با به‌روزرسانی از بین نمی‌رود.',
    facts: [['3.2', 'نسخه'], ['4', 'نمای گراف'], ['5', 'مرحله دستیار'], ['100%', 'آفلاین']],
    stack: ['Python', 'FastAPI', 'SQLite', 'React', 'D3.js', 'Tailwind', 'sqlglot', 'PyInstaller', 'Android WebView'],
    badge: 'مخزن خصوصی'
  },
  {
    id: 2, cat: 'ai', tag: 'AI / EDGE',
    title: 'ربات هوشمند یادگیری زبان', en: 'AI Language Learning Bot',
    sum: 'ربات تلگرامی مبتنی بر LLM با تطبیق هوشمند سطح، گیمیفیکیشن و ردیابی پیشرفت، اجراشده روی Cloudflare Edge.',
    ctx: 'ربات برای زبان‌آموزانی ساخته شد که تمرین روزانه کوتاه می‌خواهند. تمام سرویس روی Edge اجرا می‌شود تا هزینه ثابت ماهانه پایین بماند و زمان پاسخ برای همه کاربران یکسان باشد.',
    ch: [
      'اجرای مدل زبانی در محیط Edge با محدودیت حافظه و Cold Start زیر ۵۰ میلی‌ثانیه.',
      'ردیابی جریان مکالمه برای کاربران متعدد بدون session سنتی.',
      'سیستم adaptive که سطح سؤالات را بر پایه تاریخچه کاربر تنظیم می‌کند.'
    ],
    sol: [
      'هر پیام یک اجرای مستقل Worker است؛ وضعیت مکالمه در KV و D1 نگه داشته می‌شود',
      'لایه adaptive سطح سؤال بعدی را از تاریخچه پاسخ‌های کاربر می‌سازد',
      'اعتبارسنجی ورودی و خروجی مدل با Zod پیش از رسیدن به کاربر',
      'کنترل هزینه با سقف مصرف و صف‌بندی پیام‌ها در زمان اوج'
    ],
    resp: [
      'طراحی معماری serverless روی Cloudflare Workers',
      'یکپارچه‌سازی LLM API با کنترل هزینه و rate limiting',
      'ساخت موتور گیمیفیکیشن و امتیازدهی',
      'پیاده‌سازی webhook و مدیریت صف پیام‌ها'
    ],
    val: 'بیش از ۸۰۰ کاربر فعال روزانه، نرخ بازگشت ۷۲٪ و هزینه عملیاتی زیر ۱۵ دلار در ماه.',
    stack: ['Cloudflare Workers', 'OpenAI API', 'Telegram Bot API', 'D1', 'KV Storage', 'JavaScript', 'Zod']
  },
  {
    id: 3, cat: 'iot security', tag: 'IOT',
    title: 'اتوماسیون هوشمند IoT', en: 'IoT Automation & Monitoring',
    sum: 'کنترل و مانیتورینگ صنعتی مبتنی بر ESP32 با تونل امن VPN، داشبورد real-time و هشدار خودکار.',
    ctx: 'تأسیسات یک مجموعه صنعتی که اپراتور باید وضعیت تجهیزات پراکنده را ببیند، بدون آن‌که هیچ دستگاهی روی اینترنت عمومی باز باشد.',
    ch: [
      'ارتباط امن دستگاه‌های پراکنده با سرور مرکزی بدون افشای IP عمومی.',
      'مدیریت اتصال ناپایدار با buffering و ارسال مجدد داده در قطعی.',
      'اطلاع‌رسانی رویدادها در کمتر از ۱۰ ثانیه.'
    ],
    sol: [
      'هر گره ESP32 داده را با MQTT روی تونل WireGuard می‌فرستد؛ هیچ پورتی به بیرون باز نیست',
      'بافر محلی روی دستگاه، داده قطعی‌ها را پس از وصل‌شدن دوباره ارسال می‌کند',
      'سری‌های زمانی در InfluxDB و نمایش در Grafana با هشدار روی آستانه‌ها',
      'اطلاع‌رسانی رویدادها از طریق ربات تلگرام به شیفت اپراتور'
    ],
    resp: [
      'طراحی سخت‌افزار و برنامه‌نویسی firmware ESP32',
      'راه‌اندازی تونل امن WireGuard',
      'توسعه داشبورد real-time با Grafana',
      'پیاده‌سازی سیستم هشدار خودکار'
    ],
    val: 'کاهش ۸۰٪ در مداخلات دستی اپراتور و شناسایی خرابی ۴۸ ساعت زودتر.',
    stack: ['ESP32', 'Arduino C++', 'MQTT', 'WireGuard', 'Node.js', 'InfluxDB', 'Grafana', 'Raspberry Pi', 'WebSocket']
  },
  {
    id: 5, cat: 'ai web', tag: 'AUTOMATION',
    title: 'سیستم محتوا و سئوی خودکار', en: 'Automated Content & SEO Pipeline',
    sum: 'پایپ‌لاین تولید و انتشار محتوا با LLM، تحلیل رقبا، بهینه‌سازی سئو و زمان‌بندی انتشار.',
    ctx: 'تیم بازاریابی محتوا را دستی تولید و منتشر می‌کرد. هدف این بود که مراحل تکراری خودکار شود ولی تصمیم نهایی انتشار دست آدم بماند.',
    ch: [
      'طراحی پرامپت‌هایی که محتوای منحصربه‌فرد و Google-safe تولید کنند.',
      'یکپارچه‌سازی ۸ API مختلف در یک workflow بدون نقطه شکست واحد.',
      'پیاده‌سازی human-in-the-loop برای تأیید محتوا پیش از انتشار.'
    ],
    sol: [
      'پایپ‌لاین مرحله‌ای در FastAPI: crawl رقبا، استخراج کلیدواژه، تولید پیش‌نویس، بازبینی انسانی، انتشار زمان‌بندی‌شده',
      'هر مرحله مستقل و قابل تکرار است؛ خطای یک سرویس کل جریان را متوقف نمی‌کند',
      'داشبورد وضعیت هر قطعه محتوا از پیش‌نویس تا انتشار',
      'گزارش عملکرد از Search Console به همان داشبورد برمی‌گردد'
    ],
    resp: [
      'معماری پایپ‌لاین از crawl تا انتشار',
      'مهندسی پرامپت برای محتوای سئو‌محور',
      'ساخت داشبورد گزارش‌گیری و تحلیل',
      'یکپارچه‌سازی با ابزارهای مدیریت شبکه اجتماعی'
    ],
    val: 'صرفه‌جویی ۴۰ ساعت در هفته و سه برابر شدن سرعت انتشار.',
    stack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Selenium', 'GSC API', 'Airtable', 'Cron']
  },
  {
    id: 6, featured: true, visual: 'pipeline', cat: 'ai database', tag: 'AI / DATABASE',
    title: 'دستیار هوشمند ساخت گزارش SSRS', en: 'RepBuilderAssis — SSRS Report Assistant',
    sum: 'دستیاری که پرسش فارسی کاربر را روی دیتابیس ERP به T-SQL اعتبارسنجی‌شده و فایل RDL آماده تبدیل می‌کند.',
    ctx: 'گزارش‌های سازمانی روی یک ERP فارسی با ۳٬۴۲۸ جدول ساخته می‌شوند؛ نوشتن هر گزارش یعنی پیدا کردن جدول درست میان هزاران جدول و بعد ساختن فایل RDL. این ابزار همان مسیر را از یک پرسش فارسی شروع می‌کند.',
    ch: [
      'ساخت ایندکس دانشی از ۳٬۴۲۸ جدول ERP تا مدل بتواند جدول و فیلد درست را انتخاب کند.',
      'اعتبارسنجی خودکار کوئری تولیدشده پیش از تحویل، به‌جای اعتماد به خروجی مدل.',
      'تولید ساختار XML سالم RDL که Report Builder بدون خطا باز کند.'
    ],
    sol: [
      'ایندکس دانشی از schema شامل جدول، ستون، کلید، مسیر join و عنوان فارسی برای بازیابی پیش از تولید',
      'حلقه ایجنت: جست‌وجوی جدول، طرح کوئری JSON، اعتبارسنجی قطعی روی ایندکس، خودتصحیح، تولید T-SQL',
      'ساخت فایل RDL از طرح کوئری با رعایت پروفایل گزارش سازمان',
      'بنچمارک چندمدلی برای انتخاب مدل مناسب هر مرحله'
    ],
    resp: [
      'طراحی معماری ایندکس دانش و بازیابی',
      'پایپ‌لاین تولید و اعتبارسنجی T-SQL',
      'بنچمارک چندمدلی برای انتخاب مدل هر مرحله',
      'تولیدکننده فایل RDL'
    ],
    val: 'مسیر ساخت گزارش‌های سازمانی از چند ساعت کار دستی به چند دقیقه رسید.',
    stack: ['Python', 'LLM Orchestration', 'SQL Server', 'T-SQL', 'SSRS / RDL', 'Vector Index'],
    badge: 'مخزن خصوصی'
  },
  {
    id: 7, cat: 'ai database web', tag: 'AI / FULL-STACK',
    title: 'سامانه وب گزارش‌ساز هوشمند', en: 'AI SSRS Report Copilot — Web Platform',
    sum: 'نسخه وب کامل دستیار گزارش‌ساز: چت فارسی با استریم زنده، کاوشگر پایگاه دانش، بنچمارک چندمدلی و کتابخانه گزارش‌ها.',
    ctx: 'موتور گزارش‌ساز یک ابزار خط فرمان بود. این پروژه همان موتور را به سامانه وب فارسی تبدیل کرد تا کاربر بدون دانش SQL گزارش بسازد، مدل دلخواه خودش را وصل کند و دانش سازمانی را خودش تکمیل کند.',
    ch: [
      'استریم زنده مراحل ایجنت — انتخاب جدول، تلاش‌ها، اعتبارسنجی، SQL و چیدمان — روی SSE بدون قطع اتصال.',
      'اعمال زنده بازسازی ایندکس دانش بدون ری‌استارت سرور.',
      'رابط کاملاً راست‌به‌چپ که از ۳۹۰ پیکسل موبایل تا دسکتاپ یکسان کار کند.',
      'واسط یکسان برای مدل‌های Anthropic، OpenAI-compatible و Google.'
    ],
    sol: [
      'بک‌اند FastAPI روی موتور بازاستفاده‌شده، فرانت‌اند React با تم کنسول تاریک و فونت وزیرمتن',
      'چت با تایم‌لاین SSE و خروجی قابل دانلود در قالب SQL، TXT و RDL',
      'کاوشگر پایگاه دانش با جست‌وجوی جدول، ستون، enum و مسیر join',
      'دسته‌بندی پوشه‌ای گزارش‌ها، استفاده مجدد در چت و ذخیره رمزشده کلیدهای API با سقف هزینه روزانه'
    ],
    resp: [
      'توسعه فول‌استک: FastAPI در بک‌اند و React در فرانت‌اند',
      'بازاستفاده از موتور موجود و ساخت ایندکس پایگاه دانش',
      'ساخت کاوشگر دانش، بنچمارک چندمدلی، کتابخانه گزارش و تنظیمات',
      'آپلود فایل‌های RDL/SQL و استخراج جداول برای تکمیل دانش سازمان'
    ],
    val: 'ایندکس ۳٬۴۲۸ جدول و ۴۰٬۷۸۷ ستون قابل جست‌وجو؛ ۴۵ تست بک‌اند سبز و رابط تأییدشده روی موبایل ۳۹۰ پیکسل و دسکتاپ.',
    stack: ['FastAPI', 'Python', 'React', 'SSE', 'SQLite', 'T-SQL', 'SSRS / RDL', 'Anthropic API', 'OpenAI-compatible', 'Pytest'],
    badge: 'مخزن خصوصی'
  },
  {
    id: 9, cat: 'ai web', tag: 'DASHBOARD',
    title: 'داشبورد شخصی عملیات', en: 'Personal Ops Dashboard',
    sum: 'داشبورد شخصی که کارها، تقویم، ایمیل و شاخص‌ها را در یک صفحه جمع می‌کند و خلاصه روز را با مدل زبانی می‌سازد.',
    ctx: 'داده روز کاری در چند سرویس پخش بود. این داشبورد همه را در یک صفحه جمع می‌کند و خلاصه‌ای که مدل تولید می‌کند بالای همان صفحه می‌نشیند.',
    ch: [
      'یکپارچه‌سازی سرویس‌های گوگل با نگه‌داشتن توکن‌ها در سمت سرور.',
      'رندر نمودارهای زنده در صفحه پرعنصر بدون افت روانی رابط.'
    ],
    sol: [
      'React ۱۹ و Vite در فرانت‌اند، سرور Express در همان مخزن برای تماس‌های امن به API ها',
      'احراز هویت Firebase با محافظت مسیرها',
      'نمودارها با Recharts و انیمیشن‌های سبک',
      'خلاصه‌سازی روزانه با Gemini API'
    ],
    resp: [
      'توسعه فرانت‌اند React با TypeScript',
      'لایه سرور Express برای تماس‌های امن به API ها',
      'احراز هویت با Firebase و کنترل دسترسی',
      'ساخت نمودارها و جریان خلاصه‌سازی روز'
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Firebase', 'Google APIs', 'Recharts', 'Gemini API'],
    badge: 'مخزن خصوصی'
  },
  {
    id: 10, cat: 'ai web', tag: 'AI AGENT',
    title: 'ایجنت تحلیل وب‌سایت', en: 'site-recon',
    sum: 'ایجنت محلی که یک وب‌سایت را مثل یک مهندس بازاریابی می‌خواند و مستندش می‌کند؛ شواهد روی دستگاه خودت می‌ماند.',
    ctx: 'ابزاری برای وقتی که باید سریع بفهمی یک سایت چه می‌فروشد، چطور می‌فروشد و کجا لنگ می‌زند — بدون آن‌که داده از دستگاه بیرون برود.',
    ch: [
      'اجرای کامل تحلیل روی دستگاه کاربر، بدون ارسال داده به سرور بیرونی.',
      'تبدیل خروجی خام crawl به گزارشی که برای تیم بازاریابی خوانا باشد.'
    ],
    sol: [
      'crawl ساختاریافته صفحات و جمع‌آوری شواهد در قالب مشخص',
      'تحلیل با مدل زبانی روی همان دستگاه کاربر',
      'گزارش خروجی دسته‌بندی‌شده برای تیم بازاریابی'
    ],
    resp: [
      'طراحی جریان crawl و جمع‌آوری شواهد',
      'ساختاردهی گزارش خروجی',
      'انتشار به‌صورت پروژه کد باز'
    ],
    stack: ['Python', 'LLM', 'Web Crawling', 'Local-first'],
    link: 'https://github.com/mehransa96/Website-analyse-tool-site-recon'
  },
  {
    id: 11, cat: 'ai', tag: 'INFRASTRUCTURE',
    title: 'دروازه یکپارچه مدل‌های زبانی', en: 'freellmapi',
    sum: 'یک لایه پراکسی که ۱۶ ارائه‌دهنده مدل زبانی را زیر یک واسط یکسان جمع می‌کند تا جابه‌جایی بین مدل‌ها بدون تغییر کد ممکن شود.',
    ctx: 'وقتی کد به یک ارائه‌دهنده مدل قفل شود، هر تغییر قیمت یا قطعی سرویس یعنی بازنویسی. این لایه همان قفل را باز می‌کند.',
    ch: [
      'یکدست‌کردن تفاوت واسط و قالب پاسخ ارائه‌دهنده‌های مختلف.',
      'مدیریت خطا و جایگزینی خودکار مدل در زمان قطعی سرویس.'
    ],
    sol: [
      'یک نقطه پایانی سازگار با OpenAI جلوی ۱۶ ارائه‌دهنده',
      'ترجمه درخواست و پاسخ هر ارائه‌دهنده به قالب یکسان',
      'مسیریابی هوشمند و جایگزینی خودکار در زمان خطا یا اتمام سهمیه',
      'نگهداری کلیدهای دسترسی به‌صورت رمزشده'
    ],
    resp: [
      'طراحی واسط یکسان و لایه ترجمه درخواست',
      'پیاده‌سازی مسیریابی و fallback بین ارائه‌دهنده‌ها'
    ],
    stack: ['Python', 'API Gateway', 'LLM Providers', 'Async'],
    link: 'https://github.com/mehransa96/freellmapi'
  },
  {
    id: 15, cat: 'web', tag: 'PORTFOLIO',
    title: 'وب‌سایت شخصی و کارنامه فنی', en: 'Personal Portfolio — GMTec',
    sum: 'کارنامه فنی دوزبانه با نسخه فارسی راست‌به‌چپ و انگلیسی چپ‌به‌راست، فیلتر دسته‌ای پروژه‌ها و پنل جزئیات بازشونده.',
    ctx: 'نسخه اول سایت یک صفحه شلوغ با پنجره‌های شناور بود. بازطراحی روی سه چیز تمرکز داشت: خوانایی متن فارسی، ساختار اطلاعات پروژه‌ها و بارگذاری سریع بدون تصویر سنگین.',
    ch: [
      'یک ساختار برای دو جهت متن: فارسی راست‌به‌چپ و انگلیسی چپ‌به‌راست، روی یک منبع داده مشترک.',
      'نمایش جزئیات نزدیک به بیست پروژه بدون شلوغ‌شدن صفحه.',
      'انیمیشن‌های روان روی موبایل بدون افت عملکرد.'
    ],
    sol: [
      'داده پروژه‌ها در یک فایل مشترک، مستقل از لایه نمایش هر دو نسخه',
      'پنل جزئیات بازشونده با انیمیشن ارتفاع، به‌جای پنجره شناور',
      'نقشه سیستم زنده روی canvas به‌جای تصویر',
      'فیلتر دسته‌ای پروژه‌ها و پیوند متقابل نسخه فارسی و انگلیسی'
    ],
    resp: [
      'طراحی رابط و پیاده‌سازی هر دو نسخه فارسی و انگلیسی',
      'ساختاردهی محتوای پروژه‌ها و متن‌ها',
      'ساخت نقشه سیستم canvas و انیمیشن‌های صفحه'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'RTL / LTR', 'Vazirmatn']
  },
  {
    id: 16, cat: 'web ai', tag: 'CHROME EXTENSION',
    title: 'MyTab — افزونه صفحه تب جدید کروم', en: 'MyTab — Chrome New Tab Extension',
    sum: 'صفحه New Tab هوشمند و کاملاً سفارشی برای کروم که در چهار مرحله بازطراحی و توسعه به نسخه نهایی رسید.',
    ctx: 'صفحه تب جدید جایی است که روزی چند ده بار باز می‌شود. هدف این بود که همان صفحه ابزارهای روزمره — تقویم شمسی، دیکته صوتی، دسترسی سریع و چت — را یک‌جا داشته باشد و کاملاً روی سیستم طراحی Night Instrument بنشیند.',
    ch: [
      'تبدیل گفتار به متن دوزبانه فارسی و انگلیسی در محیط محدود افزونه.',
      'پشتیبانی هم‌زمان از دو جهت متن RTL و LTR با کلید تغییر جهت و تعویض فونت.',
      'یکپارچه‌سازی چت‌بات بدون افشای کلید دسترسی در سمت مرورگر.'
    ],
    sol: [
      'تبدیل گفتار به متن دوزبانه فارسی و انگلیسی',
      'تقویم شمسی (جلالی) و Speed Dial دسترسی سریع به سایت‌ها',
      'چت‌بات یکپارچه از طریق پروکسی Groq',
      'کلید تغییر جهت RTL/LTR و تعویض فونت، با پیاده‌سازی کامل سیستم طراحی Night Instrument'
    ],
    resp: [
      'طراحی و توسعه افزونه در چهار مرحله بازطراحی',
      'پیاده‌سازی گفتار به متن و تقویم شمسی',
      'اتصال چت‌بات از طریق پروکسی Groq',
      'پیاده‌سازی سیستم طراحی Night Instrument'
    ],
    stack: ['JavaScript', 'Chrome Extension APIs', 'Groq API', 'Night Instrument']
  },
  {
    id: 17, cat: 'web database', tag: 'PERSONAL PRODUCT',
    title: 'PowerGMTec — داشبورد شخصی', en: 'PowerGMTec — Personal Dashboard',
    sum: 'داشبورد شخصی مدیریت اطلاعات و فعالیت‌ها، ساخته‌شده با Next.js و مستقر روی زیرساخت Cloudflare.',
    ctx: 'یک محصول شخصی برای جمع‌کردن اطلاعات و فعالیت‌های روزمره در یک داشبورد، کاملاً روی زیرساخت Edge کلادفلر تا نگهداری‌اش سبک و کم‌هزینه بماند.',
    ch: [
      'مهاجرت اسکیمای ۱۸ جدولی به‌صورت ریموت روی Cloudflare D1.',
      'اجرای کامل اپلیکیشن روی زیرساخت Edge بدون سرور همیشه‌روشن.'
    ],
    sol: [
      'اپلیکیشن Next.js مستقر روی زیرساخت Cloudflare',
      'پایگاه داده Cloudflare D1 با اسکیمای ۱۸ جدولی',
      'مهاجرت ریموت اسکیما از طریق ابزارهای MCP'
    ],
    resp: [
      'طراحی و توسعه داشبورد با Next.js',
      'طراحی اسکیمای پایگاه داده و مهاجرت ریموت',
      'استقرار روی زیرساخت Cloudflare'
    ],
    stack: ['Next.js', 'Cloudflare D1', 'MCP Tools']
  },
  {
    id: 18, cat: 'web', tag: 'CONTENT PLATFORM',
    title: 'پلتفرم آموزشی GMTec', en: 'GMTec Learning Platform',
    sum: 'پلتفرم محتوایی و آموزشی مبتنی بر وردپرس با تمرکز بر ابزارهای هوش مصنوعی، مهندسی پرامپت، شبکه و امنیت و اینترنت اشیا.',
    ctx: 'خانه محتوایی برند GMTec: جایی برای انتشار آموزش‌های فنی در حوزه‌هایی که روی آن‌ها کار می‌کنم، از ابزارهای هوش مصنوعی تا شبکه و IoT.',
    sol: [
      'پلتفرم محتوایی روی وردپرس',
      'محورهای محتوا: ابزارهای هوش مصنوعی و مهندسی پرامپت',
      'محورهای محتوا: شبکه و امنیت و اینترنت اشیا (IoT)'
    ],
    resp: [
      'راه‌اندازی و مدیریت پلتفرم',
      'تولید و دسته‌بندی محتوای آموزشی'
    ],
    stack: ['WordPress']
  },
  {
    id: 19, cat: 'ai database', tag: 'CLI TOOL',
    title: 'Report Copilot — ابزار CLI تولید گزارش', en: 'Report Copilot — Report Generation CLI',
    sum: 'ابزار خط فرمان تولید خودکار گزارش‌های RDL و کوئری‌های T-SQL بر پایه یک پایگاه دانش نسخه‌بندی‌شده سه‌لایه.',
    ctx: 'ساخت گزارش سازمانی یعنی رفت‌وبرگشت میان اسکیمای دیتابیس، کوئری و فایل RDL. این ابزار همان چرخه را به یک فرمان تبدیل می‌کند و دانش لازم را نسخه‌بندی‌شده نگه می‌دارد.',
    ch: [
      'نگه‌داشتن دانش گزارش‌سازی به‌صورت نسخه‌بندی‌شده و قابل بازیابی در سه لایه مجزا.',
      'اجرای یک منطق واحد هم به‌عنوان MCP Server و هم به‌عنوان اپلیکیشن مستقل.'
    ],
    sol: [
      'پایگاه دانش سه‌لایه: ساختاری (Structural)، معنایی (Semantic)، رویه‌ای (Procedural)',
      'معماری دوحالته: MCP Server و اپلیکیشن مستقل روی یک هسته مشترک',
      'تولید خروجی RDL و کوئری T-SQL از همان پایگاه دانش',
      'نقشه راه شش‌فازی توسعه'
    ],
    resp: [
      'طراحی معماری پایگاه دانش سه‌لایه',
      'پیاده‌سازی ابزار CLI و MCP Server',
      'تولیدکننده RDL و T-SQL'
    ],
    stack: ['Python', 'T-SQL', 'RDL', 'MCP']
  },
  {
    id: 21, cat: 'ai', tag: 'AUTOMATION',
    title: 'گردش‌کارهای Agentic با n8n', en: 'Agentic Workflows with n8n',
    sum: 'طراحی و پیاده‌سازی گردش‌کارهای عامل‌محور و سیستم‌های RAG برای اتوماسیون فرایندها.',
    ctx: 'حوزه‌ای که مستمر روی آن کار می‌کنم: بستن فرایندهای تکراری به گردش‌کارهایی که خودشان تصمیم می‌گیرند کدام مرحله بعدی است و دانش لازم را از یک منبع بازیابی می‌کنند.',
    sol: [
      'گردش‌کارهای عامل‌محور (Agentic Workflows) روی n8n',
      'سیستم‌های RAG برای بازیابی دانش در جریان اتوماسیون',
      'اتصال LLM API ها به فرایندهای موجود'
    ],
    resp: [
      'طراحی و پیاده‌سازی گردش‌کارها',
      'ساخت لایه بازیابی دانش (RAG)'
    ],
    stack: ['n8n', 'RAG', 'LLM APIs']
  },
  {
    id: 22, cat: 'web', tag: 'DESIGN SYSTEM',
    title: 'Night Instrument — سیستم طراحی', en: 'Night Instrument — Design System',
    sum: 'سیستم طراحی اختصاصی با الهام از ابزارهای علمی برنجی ایرانی و اسلامی، پایه بصری محصولات GMTec.',
    ctx: 'محصولات مختلف به یک زبان بصری مشترک نیاز داشتند. نقطه شروع ابزارهای علمی برنجی ایرانی و اسلامی بود: سطح‌های فلزی کهنه، دقت خطوط و خوانایی اعداد.',
    sol: [
      'پالت رنگ: تُن‌های برنج کهنه (Aged Brass) با اکسنت‌های فیروزه‌ای ملایم (Muted Teal)',
      'تایپوگرافی: Hanken Grotesk برای متن و IBM Plex Mono برای کد و اعداد',
      'کاربرد در افزونه MyTab و سایر محصولات GMTec'
    ],
    resp: [
      'طراحی پالت رنگ و مقیاس تایپوگرافی',
      'پیاده‌سازی سیستم در محصولات GMTec'
    ],
    stack: ['Design System', 'Hanken Grotesk', 'IBM Plex Mono']
  },
  {
    id: 23, cat: 'security', tag: 'INFRASTRUCTURE',
    title: 'زیرساخت شخصی و امنیت شبکه', en: 'Personal Infrastructure & Network Security',
    sum: 'راه‌اندازی و مدیریت زیرساخت شخصی و ابزارهای دسترسی امن، از تونل معکوس تا CDN و مدیریت دامنه.',
    ctx: 'زیرساختی که پروژه‌های شخصی روی آن اجرا می‌شوند: دسترسی امن به سرویس‌های داخلی، لایه CDN جلوی دامنه و مدیریت متمرکز DNS.',
    sol: [
      'تونل معکوس (Reverse Tunnel) برای دسترسی امن به سرویس‌های داخلی',
      'پیکربندی CDN آروان‌کلاد',
      'راه‌اندازی VPN روی VPS هلند',
      'مدیریت دامنه zehn.space روی Cloudflare'
    ],
    resp: [
      'راه‌اندازی و نگهداری زیرساخت',
      'پیکربندی CDN، VPN و DNS'
    ],
    stack: ['Reverse Tunnel', 'ArvanCloud CDN', 'VPS', 'VPN', 'Cloudflare DNS']
  },
  {
    id: 24, cat: '', tag: 'SIDE PROJECT',
    title: 'پرینت سه‌بعدی', en: '3D Printing',
    sum: 'کار با تکنولوژی FDM و متریال‌های PLA و ABS، همراه با برنامه راه‌اندازی کسب‌وکار مبتنی بر اینستاگرام.',
    ctx: 'یک علاقه‌مندی جانبی که سمت ساخت فیزیکی کار را نگه می‌دارد: از چاپ قطعات تا برنامه‌ای برای تبدیل آن به یک کسب‌وکار کوچک.',
    sol: [
      'کار با تکنولوژی FDM',
      'متریال‌های PLA و ABS',
      'برنامه راه‌اندازی کسب‌وکار مبتنی بر اینستاگرام'
    ],
    stack: ['FDM', 'PLA', 'ABS']
  }
];

const EN = [
  {
    id: 25, cat: 'app ai', tag: 'ANDROID / WINDOWS', isNew: true, featured: true, visual: 'tasks',
    year: '2026', platforms: ['Android', 'Windows'],
    title: 'GMTask — tasks, notes & Jalali calendar', en: 'Persian-first productivity app with an AI assistant',
    sum: 'A Persian-first app for tasks, notes and the Jalali calendar with an AI assistant — one build for Android and one for Windows, kept in sync through the cloud.',
    ctx: 'A tool for everyday work: tasks, notes and the day’s plan in one place, with an exact Persian calendar and official holidays. The design priorities were that it works fully offline and that no user’s data is ever reachable by anyone else.',
    ch: [
      'Multi-device sync without data loss: device-independent ids, an outbox of changes and last-write-wins merging with tombstones for deletions.',
      'Exact Jalali calendar maths and recurring tasks, backed by a day-by-day round-trip test across 30 years.',
      'AI without giving up privacy: API keys encrypted with the Android Keystore, and nothing sent to a model unless the user explicitly asks.'
    ],
    sol: [
      'Kotlin and Jetpack Compose on Android, Compose Desktop on Windows',
      'Room with explicit migrations, WorkManager for reminders, and a home-screen widget',
      'Firestore with owner-only rules on users/{uid}',
      'Multi-provider assistant (Gemini, OpenAI, Claude) with validated model output, plus an on-device parser for quick-add',
      'Productivity reports, an activity heatmap, a daily goal and a focus timer'
    ],
    resp: [
      'End-to-end design and development of the Android and Windows apps',
      'Engineering audit and fixes across security and sync',
      'Unit and instrumented test suites',
      'CI and automated releases of the APK and Windows installer'
    ],
    val: 'A complete offline-first app on two platforms with regular releases; every version builds and publishes the APK and Windows installer automatically.',
    facts: [['1.9', 'Version'], ['2', 'Platforms'], ['67', 'Test files'], ['3', 'AI providers']],
    stack: ['Kotlin', 'Jetpack Compose', 'Compose Desktop', 'Room', 'WorkManager', 'Firebase', 'Gemini / OpenAI / Claude', 'GitHub Actions'],
    badge: 'Private repo'
  },
  {
    id: 26, cat: 'database ai app', tag: 'DATABASE / DESKTOP', isNew: true, featured: true, visual: 'graph',
    year: '2026', platforms: ['Windows', 'Android', 'Web'],
    title: 'DataBase Kavosh', en: 'ERP database schema explorer',
    sum: 'A standalone explorer for an enterprise ERP database: Persian search across thousands of tables and tens of thousands of columns, a visual relationship graph, JOIN path finding and T-SQL generation — fully offline.',
    ctx: 'Every ERP report starts with finding the right tables and how they join. Kavosh turns hours of digging into seconds of search, and keeps the team’s knowledge inside the tool.',
    ch: [
      'Accurate Persian search with Arabic/Persian letter normalisation and light stemming, across English names, Persian titles and column names.',
      'Finding the shortest JOIN path between two tables, with warnings for long or unverified routes.',
      'A query-writing assistant that only ever delivers valid queries, even with a weak language model.'
    ],
    sol: [
      'YAML knowledge base as the source of truth, with a SQLite index always rebuilt from it',
      'FastAPI backend and a React UI with D3 graphs in four views: force, hierarchical, radial and ERD',
      'Five-stage assistant — retrieve, select, ground, draft, verify — where every query is checked word by word against the real schema',
      'Model providers through three API “dialects”: OpenAI, Gemini and Anthropic',
      'PyInstaller build and an NSIS installer that needs no admin rights, plus an offline Android build'
    ],
    resp: [
      'Knowledge base, index and search engine architecture',
      'Responsive UI design and relationship graphs',
      'Query assistant and T-SQL verifier',
      'Packaging and automated releases for Windows and Android'
    ],
    val: 'One-click install on Windows and Android with no Python, Node.js or internet required; knowledge the user records survives every update.',
    facts: [['3.2', 'Version'], ['4', 'Graph views'], ['5', 'Assistant stages'], ['100%', 'Offline']],
    stack: ['Python', 'FastAPI', 'SQLite', 'React', 'D3.js', 'Tailwind', 'sqlglot', 'PyInstaller', 'Android WebView'],
    badge: 'Private repo'
  },
  {
    id: 2, cat: 'ai', tag: 'AI / EDGE',
    title: 'AI language-learning bot', en: 'LLM bot on Cloudflare Edge',
    sum: 'An LLM-based Telegram bot with adaptive levelling, gamification and progress tracking, running on Cloudflare Edge.',
    ctx: 'Built for learners who want a short daily drill. The whole service runs at the edge so monthly cost stays low and response time is the same for every user.',
    ch: [
      'Running a language model at the edge under tight memory limits with sub-50ms cold starts.',
      'Tracking conversation state for many users without traditional sessions.',
      'Adaptive difficulty driven by each user’s history.'
    ],
    sol: [
      'Every message is an isolated Worker invocation; conversation state lives in KV and D1',
      'The adaptive layer derives the next question level from the user’s answer history',
      'Model input and output validated with Zod before it reaches the user',
      'Cost control through spend caps and message queueing at peak'
    ],
    resp: [
      'Serverless architecture on Cloudflare Workers',
      'LLM API integration with cost control and rate limiting',
      'Gamification and scoring engine',
      'Webhook handling and message queueing'
    ],
    val: '800+ daily active users, 72% return rate, under $15/month to operate.',
    stack: ['Cloudflare Workers', 'OpenAI API', 'Telegram Bot API', 'D1', 'KV Storage', 'JavaScript', 'Zod']
  },
  {
    id: 3, cat: 'iot security', tag: 'IOT',
    title: 'IoT automation & monitoring', en: 'ESP32 fleet over WireGuard',
    sum: 'Industrial control and monitoring built on ESP32 with a secure VPN tunnel, real-time dashboard and automated alerting.',
    ctx: 'An industrial site where the operator needs to see the state of scattered equipment without a single device being exposed to the public internet.',
    ch: [
      'Securely connecting distributed devices to a central server without exposing public IPs.',
      'Surviving unstable links with buffering and replay of missed data.',
      'Event notification in under 10 seconds.'
    ],
    sol: [
      'Each ESP32 node publishes over MQTT inside a WireGuard tunnel; no inbound ports at all',
      'On-device buffering replays anything missed during an outage',
      'Time series in InfluxDB, visualised in Grafana with threshold alerts',
      'Event alerts delivered to the operator shift through a Telegram bot'
    ],
    resp: [
      'Hardware design and ESP32 firmware',
      'Secure WireGuard tunnel setup',
      'Real-time Grafana dashboard',
      'Automated alerting system'
    ],
    val: 'Operator intervention down 80%; failures detected 48 hours earlier.',
    stack: ['ESP32', 'Arduino C++', 'MQTT', 'WireGuard', 'Node.js', 'InfluxDB', 'Grafana', 'Raspberry Pi', 'WebSocket']
  },
  {
    id: 5, cat: 'ai web', tag: 'AUTOMATION',
    title: 'Automated content & SEO pipeline', en: 'LLM pipeline with human review',
    sum: 'An LLM pipeline for content generation and publishing, with competitor analysis, SEO optimisation and scheduling.',
    ctx: 'The marketing team produced and published everything by hand. The goal was to automate the repetitive steps while leaving the publish decision with a person.',
    ch: [
      'Prompts that produce original, Google-safe content.',
      'Eight APIs joined into one workflow with no single point of failure.',
      'Human-in-the-loop approval before anything publishes.'
    ],
    sol: [
      'A staged FastAPI pipeline: competitor crawl, keyword extraction, draft generation, human review, scheduled publishing',
      'Every stage is independent and repeatable, so one failing service does not stop the flow',
      'A dashboard tracking each piece from draft to published',
      'Search Console performance flows back into the same dashboard'
    ],
    resp: [
      'Pipeline architecture from crawl to publish',
      'Prompt engineering for SEO-oriented content',
      'Reporting and analytics dashboard',
      'Integration with social publishing tools'
    ],
    val: '40 hours saved per week and publishing throughput tripled.',
    stack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Selenium', 'GSC API', 'Airtable', 'Cron']
  },
  {
    id: 6, featured: true, visual: 'pipeline', cat: 'ai database', tag: 'AI / DATABASE',
    title: 'RepBuilderAssis', en: 'AI assistant for SSRS reports',
    sum: 'An assistant that turns a natural-language question about an ERP database into validated T-SQL and a ready RDL report file.',
    ctx: 'Enterprise reports are built against a Persian ERP with 3,428 tables. Writing one means finding the right tables among thousands, then producing an RDL file. This tool starts that path from a plain question.',
    ch: [
      'Building a knowledge index over 3,428 ERP tables so the model picks the right tables and fields.',
      'Validating every generated query before handing it over, rather than trusting model output.',
      'Emitting RDL XML that Report Builder opens without errors.'
    ],
    sol: [
      'A schema knowledge index — tables, columns, keys, join paths, Persian titles — retrieved before generation',
      'Agent loop: search tables, produce a JSON query plan, validate deterministically against the index, self-correct, assemble T-SQL',
      'RDL generated from the query plan following the organisation’s report profile',
      'Multi-model benchmarking to pick the right model per stage'
    ],
    resp: [
      'Knowledge index and retrieval architecture',
      'T-SQL generation and validation pipeline',
      'Multi-model benchmarking per stage',
      'RDL file generator'
    ],
    val: 'Enterprise report building went from hours of manual work to minutes.',
    stack: ['Python', 'LLM Orchestration', 'SQL Server', 'T-SQL', 'SSRS / RDL', 'Vector Index'],
    badge: 'Private repo'
  },
  {
    id: 7, cat: 'ai database web', tag: 'AI / FULL-STACK',
    title: 'AI SSRS report copilot', en: 'Full web platform on the report engine',
    sum: 'The full web version of the report assistant: Persian chat with live streaming, a knowledge-base explorer, multi-model benchmarking and a report library.',
    ctx: 'The report engine was a command-line tool. This project turned it into a Persian web platform so a user with no SQL can build a report, plug in whichever model they want, and extend the organisation’s knowledge themselves.',
    ch: [
      'Streaming the agent’s stages live — table search, attempts, validation, SQL and layout — over SSE without dropping the connection.',
      'Applying a rebuilt knowledge index live, with no server restart.',
      'A fully right-to-left interface that holds up from a 390px phone to desktop.',
      'One interface across Anthropic, OpenAI-compatible and Google models.'
    ],
    sol: [
      'FastAPI backend wrapping the reused engine; React frontend in a dark console theme',
      'Chat with an SSE timeline and downloadable output as SQL, TXT and RDL',
      'Knowledge explorer with search across tables, columns, enums and join paths',
      'Folder-based report catalog, reuse-in-chat, and encrypted API keys with a daily spend cap'
    ],
    resp: [
      'Full-stack build: FastAPI backend, React frontend',
      'Reusing the existing engine and building the knowledge index',
      'Knowledge explorer, multi-model benchmark, report catalog and settings',
      'RDL/SQL upload with table extraction to extend the knowledge base'
    ],
    val: '3,428 tables and 40,787 columns searchable; 45 backend tests green and the interface verified at 390px and desktop.',
    stack: ['FastAPI', 'Python', 'React', 'SSE', 'SQLite', 'T-SQL', 'SSRS / RDL', 'Anthropic API', 'OpenAI-compatible', 'Pytest'],
    badge: 'Private repo'
  },
  {
    id: 9, cat: 'ai web', tag: 'DASHBOARD',
    title: 'Personal ops dashboard', en: 'One page for tasks, calendar and metrics',
    sum: 'A personal dashboard pulling tasks, calendar, mail and metrics onto one page, with the day’s summary written by a language model.',
    ctx: 'The working day’s data was scattered across services. This dashboard collects it on one page, with a model-written summary sitting at the top.',
    ch: [
      'Integrating Google services while keeping tokens server-side.',
      'Rendering live charts on a dense page without losing interface smoothness.'
    ],
    sol: [
      'React 19 and Vite on the front, an Express server in the same repo proxying API calls safely',
      'Firebase authentication with protected routes',
      'Charts with Recharts and light motion',
      'Daily summarisation through the Gemini API'
    ],
    resp: [
      'React frontend in TypeScript',
      'Express server layer for safe API calls',
      'Firebase authentication and access control',
      'Charts and the daily summary flow'
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Firebase', 'Google APIs', 'Recharts', 'Gemini API'],
    badge: 'Private repo'
  },
  {
    id: 10, cat: 'ai web', tag: 'AI AGENT',
    title: 'site-recon', en: 'Local website analysis agent',
    sum: 'A local agent that reads a website the way a marketing engineer does, then documents it. Evidence stays on your machine.',
    ctx: 'For when you need to know quickly what a site sells, how it sells it and where it falls short — without any data leaving the machine.',
    ch: [
      'Running the whole analysis locally, with no data sent to an external server.',
      'Turning raw crawl output into a report a marketing team can actually read.'
    ],
    sol: [
      'Structured page crawl with evidence collected in a fixed shape',
      'Analysis by a language model on the user’s own machine',
      'A categorised output report written for a marketing team'
    ],
    resp: [
      'Crawl and evidence-collection flow',
      'Report structure and output',
      'Released as an open-source project'
    ],
    stack: ['Python', 'LLM', 'Web Crawling', 'Local-first'],
    link: 'https://github.com/mehransa96/Website-analyse-tool-site-recon'
  },
  {
    id: 11, cat: 'ai', tag: 'INFRASTRUCTURE',
    title: 'freellmapi', en: 'Unified gateway for 16 LLM providers',
    sum: 'A proxy layer that puts sixteen language-model providers behind one interface, so switching models needs no code change.',
    ctx: 'Once code is locked to one model provider, every price change or outage means a rewrite. This layer removes that lock-in.',
    ch: [
      'Normalising different provider interfaces and response formats.',
      'Error handling and automatic model fallback during outages.'
    ],
    sol: [
      'One OpenAI-compatible endpoint in front of sixteen providers',
      'Request and response translation per provider into one shape',
      'Smart routing with automatic failover on errors or exhausted quota',
      'Access keys held encrypted'
    ],
    resp: [
      'Unified interface and request translation layer',
      'Routing and fallback across providers'
    ],
    stack: ['Python', 'API Gateway', 'LLM Providers', 'Async'],
    link: 'https://github.com/mehransa96/freellmapi'
  },
  {
    id: 15, cat: 'web', tag: 'PORTFOLIO',
    title: 'Personal portfolio', en: 'Bilingual RTL/LTR portfolio — GMTec',
    sum: 'A bilingual technical portfolio with a right-to-left Persian version and a left-to-right English one, category filters and expandable detail panels.',
    ctx: 'The first version of the site was a crowded page built around floating windows. The redesign focused on three things: Persian text legibility, the information structure behind each project, and fast loading with no heavy imagery.',
    ch: [
      'One structure for two text directions — Persian RTL and English LTR — from a single shared data source.',
      'Showing detail for nearly twenty projects without crowding the page.',
      'Smooth motion on mobile with no performance cost.'
    ],
    sol: [
      'Project data in one shared file, independent of either version’s presentation layer',
      'Expandable detail panels animated by height instead of modal windows',
      'A live canvas system map instead of an image',
      'Category filtering and cross-links between the Persian and English versions'
    ],
    resp: [
      'Interface design and implementation of both language versions',
      'Structuring the project content and copy',
      'Canvas system map and page motion'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'RTL / LTR', 'Vazirmatn']
  },
  {
    id: 16, cat: 'web ai', tag: 'CHROME EXTENSION',
    title: 'MyTab', en: 'Custom Chrome new-tab page',
    sum: 'A smart, fully custom New Tab page for Chrome, taken to its final version through four rounds of redesign and development.',
    ctx: 'The new tab page opens dozens of times a day. The goal was to put the everyday tools there — a Jalali calendar, voice dictation, quick access and chat — on top of the Night Instrument design system.',
    ch: [
      'Bilingual Persian/English speech-to-text inside the constraints of an extension.',
      'Supporting both text directions with an RTL/LTR switch and font swapping.',
      'Integrating a chatbot without exposing an access key in the browser.'
    ],
    sol: [
      'Bilingual Persian and English speech-to-text',
      'Jalali (Persian) calendar and a Speed Dial for quick site access',
      'Integrated chatbot through a Groq proxy',
      'RTL/LTR direction switch and font swapping, with a full Night Instrument implementation'
    ],
    resp: [
      'Design and development across four redesign rounds',
      'Speech-to-text and Jalali calendar implementation',
      'Chatbot integration via a Groq proxy',
      'Night Instrument design-system implementation'
    ],
    stack: ['JavaScript', 'Chrome Extension APIs', 'Groq API', 'Night Instrument']
  },
  {
    id: 17, cat: 'web database', tag: 'PERSONAL PRODUCT',
    title: 'PowerGMTec', en: 'Personal dashboard on Cloudflare',
    sum: 'A personal dashboard for managing information and activity, built with Next.js and deployed on Cloudflare infrastructure.',
    ctx: 'A personal product that gathers day-to-day information and activity into one dashboard, running entirely on Cloudflare edge infrastructure to keep it cheap and low-maintenance.',
    ch: [
      'Migrating an 18-table schema remotely on Cloudflare D1.',
      'Running the whole application at the edge with no always-on server.'
    ],
    sol: [
      'Next.js application deployed on Cloudflare infrastructure',
      'Cloudflare D1 database with an 18-table schema',
      'Remote schema migration through MCP tooling'
    ],
    resp: [
      'Dashboard design and development in Next.js',
      'Database schema design and remote migration',
      'Deployment on Cloudflare'
    ],
    stack: ['Next.js', 'Cloudflare D1', 'MCP Tools']
  },
  {
    id: 18, cat: 'web', tag: 'CONTENT PLATFORM',
    title: 'GMTec learning platform', en: 'WordPress content platform',
    sum: 'A WordPress-based content and learning platform focused on AI tools, prompt engineering, networking and security, and IoT.',
    ctx: 'The content home of the GMTec brand: where technical write-ups go, across the areas I actually work in — from AI tooling to networking and IoT.',
    sol: [
      'Content platform built on WordPress',
      'Content tracks: AI tools and prompt engineering',
      'Content tracks: networking, security and IoT'
    ],
    resp: [
      'Platform setup and maintenance',
      'Producing and structuring the learning content'
    ],
    stack: ['WordPress']
  },
  {
    id: 19, cat: 'ai database', tag: 'CLI TOOL',
    title: 'Report Copilot', en: 'Report generation CLI',
    sum: 'A command-line tool that generates RDL reports and T-SQL queries from a versioned three-layer knowledge base.',
    ctx: 'Building an enterprise report means moving between the database schema, the query and the RDL file. This tool collapses that cycle into one command and keeps the knowledge it needs versioned.',
    ch: [
      'Holding report-building knowledge as three distinct, versioned, retrievable layers.',
      'Running one logic core both as an MCP server and as a standalone application.'
    ],
    sol: [
      'Three-layer knowledge base: structural, semantic and procedural',
      'Dual-mode architecture: MCP server and standalone app on a shared core',
      'RDL and T-SQL output generated from the same knowledge base',
      'A six-phase development roadmap'
    ],
    resp: [
      'Three-layer knowledge base architecture',
      'CLI tool and MCP server implementation',
      'RDL and T-SQL generator'
    ],
    stack: ['Python', 'T-SQL', 'RDL', 'MCP']
  },
  {
    id: 21, cat: 'ai', tag: 'AUTOMATION',
    title: 'Agentic workflows with n8n', en: 'Process automation and RAG',
    sum: 'Design and implementation of agentic workflows and RAG systems for process automation.',
    ctx: 'An area I work in continuously: turning repetitive processes into workflows that decide their own next step and retrieve the knowledge they need from a single source.',
    sol: [
      'Agentic workflows built on n8n',
      'RAG systems for knowledge retrieval inside the automation flow',
      'Wiring LLM APIs into existing processes'
    ],
    resp: [
      'Workflow design and implementation',
      'Building the retrieval (RAG) layer'
    ],
    stack: ['n8n', 'RAG', 'LLM APIs']
  },
  {
    id: 22, cat: 'web', tag: 'DESIGN SYSTEM',
    title: 'Night Instrument', en: 'In-house design system',
    sum: 'An in-house design system drawing on Persian and Islamic brass scientific instruments — the visual base for GMTec products.',
    ctx: 'Separate products needed one shared visual language. The starting point was Persian and Islamic brass scientific instruments: aged metal surfaces, precise linework, legible numerals.',
    sol: [
      'Palette: aged brass tones with muted teal accents',
      'Typography: Hanken Grotesk for text, IBM Plex Mono for code and numerals',
      'Applied in the MyTab extension and other GMTec products'
    ],
    resp: [
      'Palette and typographic scale',
      'Implementation across GMTec products'
    ],
    stack: ['Design System', 'Hanken Grotesk', 'IBM Plex Mono']
  },
  {
    id: 23, cat: 'security', tag: 'INFRASTRUCTURE',
    title: 'Personal infrastructure & network security', en: 'Tunnels, CDN, VPN and DNS',
    sum: 'Setting up and running personal infrastructure and secure-access tooling, from a reverse tunnel to CDN and domain management.',
    ctx: 'The infrastructure the personal projects run on: secure access to internal services, a CDN layer in front of the domain, and centralised DNS.',
    sol: [
      'Reverse tunnel for secure access to internal services',
      'ArvanCloud CDN configuration',
      'VPN on a Netherlands VPS',
      'zehn.space domain managed on Cloudflare'
    ],
    resp: [
      'Infrastructure setup and maintenance',
      'CDN, VPN and DNS configuration'
    ],
    stack: ['Reverse Tunnel', 'ArvanCloud CDN', 'VPS', 'VPN', 'Cloudflare DNS']
  },
  {
    id: 24, cat: '', tag: 'SIDE PROJECT',
    title: '3D printing', en: 'FDM side project',
    sum: 'Working with FDM technology and PLA and ABS materials, alongside a plan for an Instagram-based business.',
    ctx: 'A side interest that keeps the physical-making side of the work alive: from printing parts to a plan for turning it into a small business.',
    sol: [
      'Working with FDM technology',
      'PLA and ABS materials',
      'A plan for an Instagram-based business'
    ],
    stack: ['FDM', 'PLA', 'ABS']
  }
];

if (typeof window !== 'undefined') {
  window.__PORTFOLIO_DATA = { FA, EN };
  window.dispatchEvent(new CustomEvent('portfolio-data-ready'));
}
