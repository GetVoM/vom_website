# Tools: text changes from the WordPress pages

The seven calculator pages under `/tools/` reproduce the WordPress tool pages saved in `getvom.com/tools/*.html` (downloaded 2026-11-10). The owner's rule is **the copy one to one, character fixes only** (set on the accounting pillar, 2026-11-11), plus the two factual corrections the owner approved on 2026-11-12. This file lists every change so the text can be checked against the original.

`scripts/import-tools.mjs` makes every change on import; `scripts/tools-overrides.mjs` holds the page-specific ones. Each replacement must match, or the import fails. The bodies are `content/tools/<id>.lead.mdx` (up to the last calculator) and `content/tools/<id>.mdx` (the article). Rerun with `node scripts/import-tools.mjs --images`; the counts below come from `node_modules/.cache/tools-import.json`.

The titles, descriptions and H1s live in `lib/content/tools/catalogue.ts`. The SEO titles and descriptions are kept byte for byte, apart from the presentation forms in the margin title and salary description: «ﭬوم» (U+FB6C plus a hidden U+202C) is now «ڤوم». `scripts/check-blog-urls.mjs` compares them after Unicode folding, so it still matches the crawl.

## Character fixes, every page

| Fix | vat | margin | discount | salary | zakat | zakat-company | zakat-base |
|---|---|---|---|---|---|---|---|
| Arabic presentation forms → ordinary letters («ﭬوم» → «ڤوم») | | | | 28 | | 3 | |
| Invisible direction and zero-width marks removed | | | | 28 | | 6 | |
| Non-breaking spaces → spaces | 51 | 14 | 4 | 88 | | 26 | 1 |
| Arabic-Indic digits → Western digits (DESIGN.md, Numbers; «١٥٪» → «15%») | 67 | | | | | | |
| Empty headings dropped | | | 1 | 2 | | | |

Spacing is tidied too: doubled spaces collapse, and a space follows a colon before an Arabic word («حاسبة الضريبة:حساب» → «حاسبة الضريبة: حساب», which also applies to the VAT H1). The SEO title keeps its original spacing.

## Wording and facts

| Page | Before → after | Why |
|---|---|---|
| vat | «بمعدل قدره 5٪» → «بمعدل قدره 15%» | Owner ruling 2026-11-12: the page itself says 15% further down |
| vat | «الهيئة العامة للزكاة والدخل» → «هيئة الزكاة والضريبة والجمارك» | Owner ruling 2026-11-12: the authority's current name |
| vat | إجراءت → إجراءات | Typo |
| discount | ماهو الفرق → ما هو الفرق | Typo |
| salary | لستكافئ → لتكافئ | Typo |
| salary | إحترافية → احترافية | Typo |
| salary | image alt «رنامج حساب الراتب» → «برنامج حساب الراتب» | The first letter was missing |
| zakat-company | الأموال الموجود → الأموال الموجودة | Typo |
| zakat-company | «حاسبة زكاة منصة زكاتي» → «1. حاسبة زكاة منصة زكاتي» | Its siblings read «2. …» and «3. …» |

Typos noticed but **not** changed, because they read as style or need the owner: «ويفوتون» and «التجار مسجلين» (vat); «قررت شركة الضريبة» (vat example); «برنامج حساب الراتب الشهري المجانية» (salary); «إذا لم يجري» (salary); «خذ عناء تسعير منتجاتك» (the margin page's pricing calculator intro); «مع فوم الحساب أوتوماتيكي» (discount H3).

## Structure

| Page | Change |
|---|---|
| every page | Each old calculator widget (its markup, styles and script) becomes a `<Calculator>` band at the same place. The widgets' own titles («آلة حاسبة الخصم», «آلة حاسبة الزكاة», «حاسبة الزكاة», «حاسبة تسعير المنتج وحساب هامش الربح» and its intro) are kept as the calculator's title in `lib/tools/copy.ts`. |
| margin | The two calculators sat side by side in the old page; they share one band behind a two-way switch. |
| zakat | The English Elementor heading «Zakat Calculator» above the Arabic calculator is dropped; the widget's own «آلة حاسبة الزكاة» heads it. |
| salary | Thirteen H3s sat inside one-item bullet lists (WordPress's way of adding a bullet); they are plain H3s now. One of the nine feature headings, «حساب صافي الراتب بعد خصم التأمينات», was an H2 among H3s and is now an H3. |
| salary, margin | The FAQ questions (H3s on salary, bold one-item bullets on margin) are the house FAQ disclosure; no FAQPage schema. |
| zakat-company | The heading «حاسبة زكاة منصة زكاتي» was an H3 inside a bullet; now a plain H3. The one-cell table around the intro's sign-up offer is a callout. |
| discount | The comparison table's ✔️/❌ and the three «✔» lines become drawn marks with «نعم»/«لا» for screen readers (5 marks); the words stay. |
| margin | Everything after the page's broken second script never rendered on the old site, and is dropped: a duplicate «ما يجب فعله بعد حساب هامش الربح» and its five H3s, «كيفية استخدام حاسبة هامش الربح وتسعير المنتج» (with «أدخل قيمة الإيرادات:», «أدخل تكلفة البضائع المباعة:», «اضغط على زر "احسب":»), «فوائد استخدام حاسبة هامش الربح» (with «توفير الوقت:», «دقة النتائج:», «تحسين إدارة الميزانية:»), the FAQ again, «في الختام» again, and the sign-up banner `2023/07/حاسبة-هامش-الربح1.png`. |
| every page | Each page's old featured image (above the H1) opens the article; vat, margin, salary, zakat-company and zakat-base had one. |

## Links

| Page | Before → after |
|---|---|
| vat | `/tax-zakat/السلع-والخدمات-المعفاة-من-ضريبة-القيم/` → `/invoicing/السلع-والخدمات-المعفاة-من-ضريبة-القيم/`: the post's real path (Supabase and url-map.csv); WordPress answered either category |
| zakat-company | `/tax-zakat/الامتثال-السريع-مع-هيئة-الزكاة/`: no such post exists in the WordPress inventory or in Supabase; the words «هيئة الزكاة والضريبة والجمارك» stay, the link is dropped |
| every page | Protocol-relative links (`//app.getvom.com/…`, `//zakaty.gov.sa/`) are written with `https:` |

## Images

Every image is stored in the repo under `public/tools/<id>/` as WebP (at most 1600 px wide, q90), each with a `.webp.json` provenance sidecar naming its source. All 17 were downloaded once: six from the local download, four from `media.getvom.com` and seven from the live site; nothing is fetched at request time (owner, 2026-11-12).
