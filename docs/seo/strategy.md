# SEO strategy for the getvom.com migration

Date: 2026-10-25. Owner of this document: the website project. Companion files: `docs/content/wp-url-inventory.csv` (what exists today, per URL) and `docs/content/url-map.csv` (what happens to each URL). Semrush data was unavailable on this date (the account has no API units); the baseline below comes from a full crawl of the sitemaps plus the WordPress REST API, and must be completed with a Google Search Console export before launch.

## 1. Goal and principle

Goal: move 413 indexed URLs to a new platform, design and markup without losing rankings, then grow Arabic organic traffic for accounting, e-invoicing, zakat and tax queries in Saudi Arabia and convert it into free-trial sign-ups.

Principle: change one thing at a time where search engines are concerned. The platform, design and markup are changing at launch, so URLs, titles, descriptions and headings are preserved at launch unless they are broken. Improvements to titles, structure and content follow in measured batches after the migration has settled.

## 2. Baseline (crawled 2026-10-25)

| Measure | Value |
|---|---|
| URLs in sitemaps | 413 (230 posts, 93 pages, 45 templates, 8 tools, 7 news, 30 categories) |
| Returning 200 | 410; 3 URLs in the sitemap return 404 |
| Pages with an English twin (hreflang pair) | 66 |
| English URLs | 41 |
| Missing meta description | 17 (mostly category archives) |
| Missing H1 | 17 |
| Titles over 60 characters | 359 |
| Duplicate titles | 5 groups |
| Canonical differs from the URL | 40 (to be inspected one by one) |
| Average HTML size | 461 KB (maximum 1.6 MB; homepage about 1 MB) |
| Structured data present | BreadcrumbList on all; Article with Person author on 287; FAQPage on 31; Organization |
| Canonical and og:url format | Relative paths (should be absolute) |
| Homepage og:image | Missing |

Strengths to preserve: Arabic keyword slugs, Article schema with a named author and a "reviewed by" chartered accountant, FAQ blocks on sector and guide pages, a deep content library (about 1,400 words of body per post), hreflang pairs on the marketing pages, a robots.txt that already welcomes AI search crawlers.

## 3. Keyword clusters and the pages that own them

Arabic, Saudi Arabia, unless marked. Volumes to be filled from Search Console and Semrush.

| Cluster | Example queries | Owning page type |
|---|---|---|
| Accounting software, head terms | برنامج محاسبة، برنامج محاسبة سحابي، برنامج محاسبي، أفضل برنامج محاسبة في السعودية، برنامج محاسبة معتمد من هيئة الزكاة، أسعار برامج المحاسبة، برنامج حسابات | Home, `/برنامج-محاسبة/` pillar, pricing, features |
| E-invoicing | الفاتورة الإلكترونية، الفوترة الإلكترونية المرحلة الثانية، برنامج فاتورة إلكترونية، ربط الفاتورة الإلكترونية مع هيئة الزكاة، غرامة الفاتورة الإلكترونية، فاتورة ضريبية مبسطة | `/الفوترة-الإلكترونية/` pillar and its 14 guides, e-invoicing feature page |
| Verticals | برنامج محاسبة للمطاعم، برنامج محاسبة لصالونات التجميل، برنامج محاسبة لمكاتب المحاماة، محاسبة المقاولات، برنامج محاسبة للمتاجر الإلكترونية، برنامج محاسبة زد | 15 sector pages, integration pages, industry posts |
| Zakat and tax | حساب الزكاة، حاسبة الزكاة، الإقرار الضريبي، ضريبة القيمة المضافة، حاسبة الضريبة، ضريبة الاستقطاع، غرامات التأخير | Tools (calculators), tax-zakat category posts |
| Learn accounting | القيود المحاسبية، دفتر الأستاذ، ميزان المراجعة، القيد المزدوج، الفرق بين دائن ومدين، قائمة الدخل، الميزانية العمومية | Accounting and finance category posts, glossary |
| Templates | نموذج فاتورة ضريبية excel، نموذج سند قبض، نموذج ميزانية عمومية excel، نموذج مسير رواتب، نموذج مخالصة مالية، نموذج دراسة جدوى | 45 template pages |
| Payroll and HR | مسير الرواتب، حساب الراتب، خصم الغياب من الراتب، وصف وظيفي للمحاسب | HR posts, salary calculator |
| Business and legal | السجل التجاري، تسجيل العلامة التجارية، رسوم الغرفة التجارية، شركة الشخص الواحد | Business-legal posts |
| Comparisons | مقارنة بين Zoho Books وڤوم، عيوب أودو، بدائل قيود، ڤوم أم دفترة | Existing comparison posts; new comparison pages (see gaps) |
| English | accounting software Saudi Arabia, ZATCA e-invoicing software, ZATCA phase 2, ZATCA approved accounting software | `/en/` home, features, e-invoicing page, sector pages |

Competitive set to track: Qoyod, Wafeq, Daftra, Zoho Books, Mezan, Odoo, Rewaa. Wafeq publishes direct comparison pages and a content hub; Qoyod runs a template academy. Both patterns already exist in VoM's library in embryo and should be developed, not copied.

## 4. Information architecture

URLs stay as they are (see `docs/architecture.md` §3). The structure below is about how pages relate, not where they live.

- Home → pillars: `/برنامج-محاسبة/` (what cloud accounting is and how to choose), `/الفوترة-الإلكترونية/` (compliance), features, pricing.
- Pillars → sector pages (15) → relevant guides, templates and tools for that sector.
- Blog index → 10 live categories (accounting, tax-zakat, finance, financial-analysis, business-legal, hr, firms, invoicing, industries, integrations) plus smaller topical categories; empty or duplicated categories redirect to the blog index.
- Templates and tools are first-class hubs with their own index pages, intro copy and internal links, not blog afterthoughts.
- Every post ends with related posts, one relevant template or tool, and the trial call to action.
- Author pages for the writers and the reviewing accountant, with real bios and credentials (today one bio is lorem ipsum).

Gaps worth filling after launch, in priority order:

1. A ZATCA Phase 2 wave checker tool (which integration wave applies to my business) and a VAT registration threshold checker. Tools earn links and answer high-intent queries.
2. Honest comparison pages for the main alternatives (ڤوم مقابل قيود، وافق، دفترة، Zoho Books), built from a shared template with the same feature matrix.
3. A real glossary hub (one page per term) replacing the thin `/glossary/` page; the "learn accounting" posts link into it.
4. Customer stories once real customers agree to be named; the current "Client One" testimonials come down at launch.
5. English editions of the e-invoicing pillar and the top ten guides if Search Console shows English demand.

## 5. Technical SEO requirements

Metadata (Next.js Metadata API, `lib/seo/`):

- `metadataBase` set to `https://getvom.com`; canonical always absolute and self-referencing; the relative canonicals of today disappear.
- Title template `%s | ڤوم` for Arabic and `%s | VoM` for English; titles 50 to 60 characters; descriptions 120 to 155 characters; both unique per URL. Launch ships the current titles where they exist; the 359 long titles are shortened in batches afterwards.
- `alternates.languages` with `ar`, `en` and `x-default` (Arabic) only on the 66 true pairs; no hreflang to a page that does not exist in the other language.
- `robots: index, follow, max-image-preview: large, max-snippet: -1`; `noindex` for thank-you and payment-result pages.
- Open Graph and Twitter cards with a generated 1200×630 image per page type, Arabic text rendered with an Arabic font passed to `ImageResponse`; `og:locale` `ar_SA` / `en_SA`.

Structured data (JSON-LD, one block per page, validated in tests):

- Root: `Organization` (name, logo, sameAs for TikTok, X, Instagram, LinkedIn) and `WebSite`.
- Home, features, pricing: `SoftwareApplication` (`applicationCategory: BusinessApplication`, `operatingSystem: Web, iOS`) with `Offer` entries for the published plans in SAR. No `aggregateRating` until real reviews exist.
- Posts and guides: `Article` with `author` (Person with URL), `reviewedBy` (Person with jobTitle), `datePublished`, `dateModified`, `image`, `publisher`.
- All pages: `BreadcrumbList` matching the visible breadcrumb.
- Pages with FAQ sections: `FAQPage`. Calculators: `HowTo` where the page explains steps; otherwise `WebApplication`.

Sitemaps and robots:

- Sitemaps split by type (pages, posts, templates, tools, news) with `lastModified` from content and `alternates.languages` per entry; `robots.ts` lists them all; nothing with `noindex` or a 404 is listed.
- `robots.txt` keeps today's allowances for AI search crawlers and disallows `/api/`.

URLs and redirects:

- `trailingSlash: true`; preserved paths resolve exactly; the 10 `redirect` rows get a 301 straight to the final target (no chains); the 11 `retire` rows return 410; the 3 dead sitemap URLs leave the sitemap.
- Pagination keeps WordPress paths (`/blog/page/2/`), each page self-canonical.
- 404s return a real 404 status (`notFound()` before streaming; `global-not-found`).

Performance (budgets in `CLAUDE.md`): fully static pages; two preloaded font weights per family with Arabic subsetting; `next/image` with AVIF and WebP, explicit sizes, one `preload` per page; third-party scripts after interaction; HTML under 100 KB versus 461 KB today.

Right-to-left correctness: `<html lang="ar" dir="rtl">`, logical CSS properties throughout, numerals and Latin terms isolated with `dir="ltr"` spans where needed, mirrored icons where direction has meaning.

## 6. Content migration rules

- Posts, templates, tools, news, sector pages and the e-invoicing guides migrate one to one: same path, same H1, same body, same images (re-encoded), same publish and modified dates, same author and reviewer.
- HTML from WordPress is converted to MDX; editor artefacts (`data-start`, `data-end` attributes, empty paragraphs, inline styles) are stripped; headings re-levelled so each page has one H1.
- Images keep their descriptive Arabic filenames and alt text; missing alt text is written during import review.
- The 17 missing descriptions are written before launch; the 5 duplicate titles are resolved before launch; the 40 canonical mismatches are inspected and either kept (if they are deliberate consolidations) or fixed.
- English marketing copy is rewritten natively before launch; placeholder testimonials are removed.
- Sector pages are expanded after launch (target 900 to 1,200 words with sector workflows, FAQ, related templates and tools); at launch they migrate as they are.

## 7. Launch plan

Before launch:

1. Export from Search Console: top queries and pages for 16 months, Core Web Vitals report, links report. Export GA4 landing pages. Export backlinks from Semrush when units are available. These become the ranking baseline.
2. Build on a preview URL with `X-Robots-Tag: noindex` on every preview deployment.
3. Run the redirect and SEO assertion suite against the preview: every row of `url-map.csv` returns the expected status; every `keep` row has the expected title, description, canonical, hreflang and JSON-LD.
4. Visual and content QA of the top 50 URLs by traffic in both locales, desktop and mobile.

Launch day:

5. Switch DNS to Vercel. Keep WordPress reachable on a temporary hostname with `noindex` for media fallback and comparison.
6. Submit the new sitemaps in Search Console; request indexing for the top 20 URLs; verify robots.txt and the live canonical of the homepage.
7. Watch Vercel logs for 404 and 5xx; fix within the day.

After launch:

8. Re-crawl with the same script and diff against `wp-url-inventory.csv`.
9. Weekly for eight weeks: rankings for the top 50 queries, organic sessions, indexed-page count, Core Web Vitals field data, crawl errors.
10. Then begin the improvement batches: titles, sector page expansion, new tools, comparison pages, glossary.
11. Retire WordPress after three months, keeping media redirects.

## 8. Measurement

- Organic sessions and new users per locale (GA4 via GTM).
- Trial starts from organic: click events on the trial call to action with page and locale, joined with app-side sign-ups where the team can share them.
- Rankings for the top 50 Arabic queries and top 20 English queries.
- Share of pages passing Core Web Vitals in Search Console.
- Indexed pages (target: all `keep` rows, nothing else).

## 9. Answer engine optimisation (AEO)

Added 2026-10-25 after the owner named AEO as a top factor alongside SEO and design. AEO means being the source that AI answer engines (Google AI Overviews and AI Mode, ChatGPT search, Perplexity, Bing Copilot, Gemini) cite when someone asks about accounting software, e-invoicing or zakat in Saudi Arabia. The levers overlap with SEO but the content shape is different.

Content shape:

- Every pillar, sector and guide page opens with a direct answer: a two-sentence definition or verdict before any marketing copy, written so it can be quoted alone ("ڤوم هو برنامج محاسبة سحابي سعودي معتمد من هيئة الزكاة والضريبة والجمارك، يصدر الفواتير الإلكترونية للمرحلة الثانية ويعطي تقارير مالية لحظية للمنشآت الصغيرة والمتوسطة.").
- A visible FAQ block on every page type with short, factual answers (40 to 80 words), marked up as `FAQPage`. Questions are the real questions people ask, taken from Search Console, support tickets and the Zendesk help centre.
- Tables for anything comparable: plans and limits, invoice types and their ZATCA treatment, Phase 2 waves and thresholds, competitor comparisons. Answer engines lift tables well.
- Dated facts carry their date in the text (regulation changes, prices, thresholds) and the page shows a visible "last reviewed" date with the reviewer's name and credential.
- Entity consistency: the same name forms (ڤوم, VoM), the same description, the same founding year, team and address on the site, the app, the App Store listing, LinkedIn, Crunchbase or similar, and Wikidata if an entry is warranted.

Markup and access:

- `Organization` with `sameAs`, `foundingDate`, `founder`, `contactPoint`; `SoftwareApplication` with `offers`; `Article` with `author` and `reviewedBy` carrying `jobTitle` and `sameAs`; `FAQPage`; `BreadcrumbList`; `WebPage` with `speakable` on the definition paragraphs.
- `robots.txt` keeps the current allowances for OAI-SearchBot and adds PerplexityBot, ClaudeBot, Google-Extended and Bingbot explicitly; a `/llms.txt` describes the site and lists the pillar pages; the sitemaps carry accurate `lastModified`.
- Clean semantic HTML: one H1, hierarchical H2 and H3 that read as questions or claims, no content hidden behind interaction that a crawler cannot expand, FAQ answers present in the HTML not loaded on click.
- Author pages with credentials, and a visible editorial policy page describing how content is reviewed by a chartered accountant.

Measurement: track citations and referrals from answer engines in GA4 (referrer and UTM from ChatGPT, Perplexity, Copilot), monitor branded query volume in Search Console, and sample twenty core questions monthly in each engine to see whether getvom.com is cited.
