# Graph Report - vom-website  (2026-11-19)

## Corpus Check
- 308 files · ~261,691 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .css 2, .csv 2)

## Summary
- 2000 nodes · 5177 edges · 96 communities (87 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a2da0e2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- posts/index.ts
- calculators.tsx
- Header.tsx
- Icon
- jsonld.ts
- ToolPage.tsx
- import-wordpress.mjs
- [lang]/layout.tsx
- IntegrationPage.tsx
- CompareTable.tsx
- import-accounting-guide.mjs
- sectors/index.ts
- import-tools.mjs
- import-einvoicing.mjs
- docs/README.md
- FeaturesPage.tsx
- routes.ts
- GuidePage.tsx
- PayResult.tsx
- dependencies
- PostEditor.tsx
- import-campaign-images.mjs
- supabase/types.ts
- getToolBody
- package.json
- Product
- check-blog-urls.mjs
- BlogIndex.tsx
- (campaigns)/layout.tsx
- leads.ts
- invoice-templates-assets.mjs
- Architecture decisions
- track
- record.ts
- PostPage.tsx
- LeadForm.tsx
- convert
- compilerOptions
- Sidebar.tsx
- getvom.com on Next.js: design document
- classify.ts
- Accounting Software Pillar Guide (برنامج محاسبة)
- [...slug]/page.tsx
- auth.ts
- Phase 1: schema and content layer
- Design System: VoM website (getvom.com)
- next.config.ts
- forms.ts
- VoM Pay result pages: what changed from WordPress
- config.ts
- Tracker.tsx
- invoice-templates/index.ts
- import-zatca-phase-2.mjs
- TermsPage.tsx
- actions.ts
- Tools: text changes from the WordPress pages
- Components
- extensions.ts
- import-vom-pay.mjs
- AboutPage.tsx
- getDictionary
- StudentPage.tsx
- Next.js 16.4.3 conventions digest
- Design directions for the new getvom.com
- SEO strategy for the getvom.com migration
- not-found.tsx
- features-images.mjs
- Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import
- Profit margin calculator article (/tools/حاسبة-هامش-الربح/)
- getvom.com — all pages
- Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/)
- legal/index.ts
- scripts
- VoM website (getvom.com) — project instructions
- Digital-ads landing page: what changed from WordPress
- content/zatca-phase-2.ts
- ZATCA Phase 2 page (English): what changed from WordPress
- allowBuilds
- gone/route.ts
- Apple Touch Icon (app/apple-icon.png)
- Site favicon (app/icon.svg): teal upward chevron mark
- vercel.json
- VAT calculator article (/tools/حاسبة-الضريبة/)
- Terms and conditions: text changes from the WordPress pages
- README.md
- .claude/CLAUDE.md
- ZatcaPhase2Page.tsx
- isLocale
- DigitalAds2023.tsx
- devDependencies
- next
- ref_node_fs

## God Nodes (most connected - your core abstractions)
1. `Components` - 126 edges
2. `next` - 99 edges
3. `Locale` - 74 edges
4. `Icon()` - 68 edges
5. `localePath()` - 67 edges
6. `react` - 54 edges
7. `getDictionary()` - 49 edges
8. `ButtonLink()` - 48 edges
9. `isLocale()` - 46 edges
10. `JsonLd()` - 41 edges

## Surprising Connections (you probably didn't know these)
- `Buttons` --references--> `ButtonLink()`  [INFERRED]
  DESIGN.md → components/ui/Button.tsx
- `Decisions I am making (say if you disagree)` --references--> `postPaths()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → lib/content/posts/index.ts
- `Risks to know before approving` --references--> `isLocale()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → lib/i18n/config.ts
- `Phase 1: schema and content layer` --references--> `Resolved`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → app/[lang]/[...slug]/page.tsx
- `Phase 1: schema and content layer` --references--> `generateSitemaps()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → app/sitemap.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Tool articles funnel readers to VoM sign-up offers** — content_tools_discount, content_tools_vat, content_tools_zakat_base, content_tools_zakat_company, content_tools_margin, content_tools_salary, content_accounting_guide_free_trial_signup, content_tools_margin_growth_plan_offer [INFERRED 0.85]
- **Zakat calculator family (individual, zakat base, company)** — content_tools_zakat, content_tools_zakat_base, content_tools_zakat_company, content_tools_zakat_rate_2_5_percent, content_tools_zakat_base_zakat_base_concept [INFERRED 0.85]
- **Tool page lead + article split loaded by getToolBody** — content_tools_discount_lead, content_tools_margin_lead, content_tools_salary_lead, content_tools_vat_lead, content_tools_zakat_base_lead, content_tools_zakat_company_lead, content_tools_zakat_lead, lib_content_tools_index_gettoolbody [INFERRED 0.95]

## Communities (96 total, 9 thin omitted)

### Community 0 - "posts/index.ts"
Cohesion: 0.15
Nodes (19): metadata, PreviewPage(), MEDIA_URL, PostSection, preparePostHtml(), text(), WIDTHS, POSTS_PER_PAGE (+11 more)

### Community 1 - "calculators.tsx"
Cohesion: 0.07
Nodes (76): allEmpty(), CalcProps, DiscountCalculator(), historyCache, historyDate, MarginCalculator(), NO_HISTORY, PricingCalculator() (+68 more)

### Community 2 - "Header.tsx"
Cohesion: 0.38
Nodes (10): DesktopNav(), NavGroup(), MobileMenu(), MobileMenuProps, NavAnchor(), MenuId, NavItem, NavLink (+2 more)

### Community 3 - "Icon"
Cohesion: 0.09
Nodes (47): currentLocale(), generateMetadata(), HomePage(), Apps(), ClosingCertificate(), Props, DocumentStack(), Faq() (+39 more)

### Community 4 - "jsonld.ts"
Cohesion: 0.08
Nodes (44): currentLocale(), generateMetadata(), GrowthRoute(), currentLocale(), generateMetadata(), PricingRoute(), accountingGuideMetadata(), FeaturesPage() (+36 more)

### Community 5 - "ToolPage.tsx"
Cohesion: 0.07
Nodes (45): arabicOnly(), generateMetadata(), ToolsIndexRoute(), generateMetadata(), generateStaticParams(), Props, resolve(), ToolRoute() (+37 more)

### Community 6 - "import-wordpress.mjs"
Cohesion: 0.06
Nodes (55): 6. Images, fonts, scripts, args, authorByTerm, authorRows, BLOCKS, cacheDir, categoryByWpId, categoryRows (+47 more)

### Community 7 - "[lang]/layout.tsx"
Cohesion: 0.18
Nodes (15): GlobalNotFound(), metadata, ensureStatic, metadata, RootLayout(), paths, SocialGlyph(), Footer() (+7 more)

### Community 8 - "IntegrationPage.tsx"
Cohesion: 0.14
Nodes (23): currentLocale(), FoodicsRoute(), generateMetadata(), currentLocale(), generateMetadata(), LazyWaitRoute(), currentLocale(), generateMetadata() (+15 more)

### Community 9 - "CompareTable.tsx"
Cohesion: 0.07
Nodes (34): Amount(), CellView(), CompareTable(), HeadPrice(), RowHead(), pricingAr, pricingEn, getPricing() (+26 more)

### Community 10 - "import-accounting-guide.mjs"
Cohesion: 0.10
Nodes (38): altFixes, cellJsx(), cleanText(), collectBlocks(), convert(), escapeJsx(), escapeMd(), figure() (+30 more)

### Community 11 - "sectors/index.ts"
Cohesion: 0.14
Nodes (19): eInvoicing, generalReading, sectorsAr, readingImage, sectorClients, sectorPhotos, attachments, customers (+11 more)

### Community 12 - "import-tools.mjs"
Cohesion: 0.09
Nodes (29): cacheDir, counts, coverLines, covers, escapeJsx(), escapeMd(), imageRoot, images (+21 more)

### Community 13 - "import-einvoicing.mjs"
Cohesion: 0.06
Nodes (37): accountingGuideMdxComponents, sectorIcons, TrialCard(), einvoicingMdxComponents, Faq(), PhaseTwo(), components, altOverrides (+29 more)

### Community 14 - "docs/README.md"
Cohesion: 0.17
Nodes (9): This is NOT the Next.js you know, Content inventory of getvom.com (WordPress), Decisions in `url-map.csv`, Migration mechanics, Platform today, Quality work after launch, Quality work before launch, What exists (+1 more)

### Community 15 - "FeaturesPage.tsx"
Cohesion: 0.06
Nodes (41): currentLocale(), FeaturesRoute(), generateMetadata(), ExhibitStack(), ExhibitStackProps, displaySize(), Entry(), entryCount() (+33 more)

### Community 16 - "routes.ts"
Cohesion: 0.14
Nodes (23): accountingGuideEntry(), blogEntries(), einvoicingEntries(), pagePairEntries(), pages, sitemap(), SitemapPage, toolEntries() (+15 more)

### Community 17 - "GuidePage.tsx"
Cohesion: 0.05
Nodes (62): AccountingGuidePage(), partTitle(), ThumbIndex(), ThumbTab, MarginContents(), CatalogueRail(), CatalogueRailProps, RailCard (+54 more)

### Community 18 - "PayResult.tsx"
Cohesion: 0.10
Nodes (36): currentLocale(), generateMetadata(), VomPayFailureRoute(), currentLocale(), generateMetadata(), VomPaySuccessRoute(), noChange(), PayErrorCode() (+28 more)

### Community 19 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @mdx-js/loader, @mdx-js/react, next, @next/mdx, @next/third-parties (+19 more)

### Community 20 - "PostEditor.tsx"
Cohesion: 0.12
Nodes (23): createUploadUrl(), deleteDraft(), PostInput, EditPostPage(), metadata, EditorIcon(), EditorIconName, paths (+15 more)

### Community 21 - "import-campaign-images.mjs"
Cohesion: 0.22
Nodes (8): cacheDir, iconsAt, images, outDir, require, root, sharp, write()

### Community 22 - "supabase/types.ts"
Cohesion: 0.15
Nodes (15): ActionResult, AuthorsPage(), Fields(), metadata, CategoriesPage(), Fields(), metadata, RecordForm() (+7 more)

### Community 23 - "getToolBody"
Cohesion: 0.18
Nodes (20): ZATCA (Zakat, Tax and Customs Authority), Discount calculator article (/tools/حاسبة-الخصم/), Discount calculator lead (حاسبة-الخصم), Calculator id "discount", Zakat calculator article (/tools/حاسبة-الزكاة/), Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/), Zakat base calculator lead (حاسبة-الوعاء-الزكوي), Calculator id "zakat-base" (+12 more)

### Community 24 - "package.json"
Cohesion: 0.08
Nodes (22): eslintConfig, name, packageManager, private, version, config, configured, eslint (+14 more)

### Community 25 - "Product"
Cohesion: 0.22
Nodes (12): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+4 more)

### Community 28 - "check-blog-urls.mjs"
Cohesion: 0.12
Nodes (23): node-html-parser, alternates(), base, check(), checkLanding(), checkLandingVariants(), checkPay(), checkPayLinks() (+15 more)

### Community 29 - "BlogIndex.tsx"
Cohesion: 0.41
Nodes (14): PreservedPathRoute(), AuthorPage(), BlogIndex(), CategoryPage(), ListHead(), ListJsonLd(), NewsIndex(), paginationLabels() (+6 more)

### Community 30 - "(campaigns)/layout.tsx"
Cohesion: 0.17
Nodes (10): AdminRootLayout(), metadata, CampaignLayout(), metadata, fontVariables, plexArabic, plexSans, AdminBaseProvider() (+2 more)

### Community 31 - "leads.ts"
Cohesion: 0.16
Nodes (22): ALL, cell(), Column, formColumns(), GET(), Lead, LeadsPage(), metadata (+14 more)

### Community 32 - "invoice-templates-assets.mjs"
Cohesion: 0.11
Nodes (19): cacheDir, copyDownload(), hero, hsvToRgb(), imageDir, publicFiles, record, recordInvoice() (+11 more)

### Community 33 - "Architecture decisions"
Cohesion: 0.15
Nodes (13): 10. Security headers, 11. Testing and quality gates, 12. Hosting and environments, 13. Backend services (blog, admin, leads), 1. Rendering: fully static, revalidated by tag, 2. Locales: Arabic at `/`, English at `/en`, no automatic redirects, 3. URLs: preserve first, restructure later, 6. Fonts: self-hosted through `next/font`, two families at most (+5 more)

### Community 34 - "track"
Cohesion: 0.26
Nodes (9): ReturnBar(), ScreenVideo, VideoScreen(), LocaleSwitch(), LocaleSwitchProps, track(), alternateHref(), decodeSegment() (+1 more)

### Community 35 - "record.ts"
Cohesion: 0.11
Nodes (22): flushPostHogLogs(), posthogHost, posthogLogger, posthogLoggerProvider, AnalyticsEvent, AnalyticsEvents, Locale, Placed (+14 more)

### Community 37 - "PostPage.tsx"
Cohesion: 0.25
Nodes (12): authorPath(), description(), postMetadata(), PostPage(), ar, barePath(), en, postDate() (+4 more)

### Community 38 - "LeadForm.tsx"
Cohesion: 0.18
Nodes (14): check(), Field, GtmFormSuccess, LeadForm(), LeadFormCopy, noChange(), OptionalEmail, OptionalSector (+6 more)

### Community 39 - "convert"
Cohesion: 0.19
Nodes (20): boldQuestion(), cellJsx(), cleanText(), collectBlocks(), convert(), count(), cover(), figure() (+12 more)

### Community 40 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 41 - "Sidebar.tsx"
Cohesion: 0.14
Nodes (15): signOut(), PanelLayout(), Shell(), PanelLoading(), AdminBase, useAdminHref(), Loader(), content (+7 more)

### Community 42 - "getvom.com on Next.js: design document"
Cohesion: 0.24
Nodes (11): Anti-goals (what would make this a failure even if it worked), Constraints, Decisions already made, Delivery shape, getvom.com on Next.js: design document, Goals, Intent, Left to the builder (+3 more)

### Community 43 - "classify.ts"
Cohesion: 0.21
Nodes (10): APP_HOST, ClassifiedLink, classifyLink(), DEMO_HOST, fileName(), hostOf(), OWN_HOSTS, SOCIAL (+2 more)

### Community 44 - "Accounting Software Pillar Guide (برنامج محاسبة)"
Cohesion: 0.13
Nodes (18): Accounting Software Pillar Guide (برنامج محاسبة), closing export (final word s-8), Cloud vs traditional accounting software comparison, Saudi accounting software comparison table (VoM, Qoyod, SkySoft, global, Excel), Microsoft Excel (spreadsheet accounting), Accounting software FAQ (4 visible questions), Free options: Excel templates, VoM free plan, printable invoice templates, Key Points summary (المختصر المفيد) (+10 more)

### Community 45 - "[...slug]/page.tsx"
Cohesion: 0.12
Nodes (20): generateMetadata(), generateStaticParams(), INVOICE_TEMPLATES_SEGMENT, Props, resolve(), splitPage(), currentLocale(), generateMetadata() (+12 more)

### Community 46 - "auth.ts"
Cohesion: 0.23
Nodes (11): createPost(), day(), metadata, PostsPage(), currentAdmin, requireAdmin(), ADMIN_BASE, ADMIN_SEGMENT (+3 more)

### Community 47 - "Phase 1: schema and content layer"
Cohesion: 0.25
Nodes (20): escape(), GET(), resolveBlog(), 4. Content layer: one interface, swappable storage, Phase 1: schema and content layer, asLocale(), asType(), failed() (+12 more)

### Community 48 - "Design System: VoM website (getvom.com)"
Cohesion: 0.10
Nodes (19): Colors, Design System: VoM website (getvom.com), Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 49 - "next.config.ts"
Cohesion: 0.11
Nodes (16): adminPath, csp, MEDIA_URL, mediaRedirects, nextConfig, POSTHOG_CSP, postLinkRedirects, retiredPaths (+8 more)

### Community 50 - "forms.ts"
Cohesion: 0.18
Nodes (10): LeadFormProps, LeadForm, LeadFormDefinition, leadForms, saudiMobile, text(), LeadState, messages (+2 more)

### Community 51 - "VoM Pay result pages: what changed from WordPress"
Cohesion: 0.25
Nodes (7): Arabic fixes, Form, Images, Kept byte for byte, Structure, The failure page's error codes, VoM Pay result pages: what changed from WordPress

### Community 52 - "config.ts"
Cohesion: 0.32
Nodes (8): Testimonials(), Props, TestimonialsSlider(), HeaderProps, defaultLocale, Locale, DemoTestimonial, demoTestimonials

### Community 53 - "Tracker.tsx"
Cohesion: 0.60
Nodes (5): placeOf(), textOf(), Tracker(), trackProps(), trackNamed()

### Community 54 - "invoice-templates/index.ts"
Cohesion: 0.23
Nodes (10): invoiceTemplatesAr, invoiceTemplatesEn, heroSheets, InvoiceTemplate, invoiceTemplates, recordInvoice, TemplateFile, TemplateId (+2 more)

### Community 55 - "import-zatca-phase-2.mjs"
Cohesion: 0.14
Nodes (14): body, cacheDir, done, html, icons, images, mirror, outDir (+6 more)

### Community 56 - "TermsPage.tsx"
Cohesion: 0.36
Nodes (11): currentLocale(), generateMetadata(), TermsRoute(), Clause(), EmailLink(), keepParentheses(), Section(), termsMetadata() (+3 more)

### Community 57 - "actions.ts"
Cohesion: 0.17
Nodes (16): authorInput, categoryInput, fail(), optionalId, saveAuthor(), saveCategory(), savePost(), signIn() (+8 more)

### Community 58 - "Tools: text changes from the WordPress pages"
Cohesion: 0.18
Nodes (9): Calculator by calculator, Constants for sign-off, Tools: calculator rules, Character fixes, every page, Images, Links, Structure, Tools: text changes from the WordPress pages (+1 more)

### Community 59 - "Components"
Cohesion: 0.02
Nodes (124): Admin (operate tool), Amounts and cells (HTML budget), App Slab and Store Badges, Arrival (ZATCA Phase 2), Article Body (ledger), Articles (sector pages), Attached Sheets, Billing Switch (+116 more)

### Community 60 - "extensions.ts"
Cohesion: 0.17
Nodes (14): Align, Callout, Figure, imageAttrs(), toNumber(), clean(), MEDIA_URL, renderPostBody() (+6 more)

### Community 61 - "import-vom-pay.mjs"
Cohesion: 0.17
Nodes (12): body, cacheDir, html, icons, images, outDir, page, require (+4 more)

### Community 62 - "AboutPage.tsx"
Cohesion: 0.33
Nodes (9): AboutRoute(), currentLocale(), generateMetadata(), aboutMetadata(), AboutPage(), Charter(), Items(), FigureValue() (+1 more)

### Community 63 - "getDictionary"
Cohesion: 0.23
Nodes (11): ContactRoute(), currentLocale(), generateMetadata(), contactMetadata(), ContactPage(), Envelope(), Postmark(), SocialLinks() (+3 more)

### Community 64 - "StudentPage.tsx"
Cohesion: 0.32
Nodes (9): currentLocale(), generateMetadata(), StudentRoute(), benefitPhotos, indexKey(), studentMetadata(), StudentPage(), TextbookForm() (+1 more)

### Community 65 - "Next.js 16.4.3 conventions digest"
Cohesion: 0.17
Nodes (12): robots(), generateSitemaps(), 5. Metadata and structured data: generated from one source, 10. Gotchas when coding from 14/15 memory, 2. Rendering and caching model, 3. Routing for i18n, 4. Metadata and SEO APIs, 5. Redirects at scale (+4 more)

### Community 68 - "Design directions for the new getvom.com"
Cohesion: 0.20
Nodes (10): Brief as agreed with the owner, Colour roles (shared), Design directions for the new getvom.com, Standing exit, The three directions, Typeface, What happens after the pick, أ — الوثيقة (The Official Record) — the assigned lead (+2 more)

### Community 69 - "SEO strategy for the getvom.com migration"
Cohesion: 0.20
Nodes (10): 1. Goal and principle, 2. Baseline (crawled 2026-10-25), 3. Keyword clusters and the pages that own them, 4. Information architecture, 5. Technical SEO requirements, 6. Content migration rules, 7. Launch plan, 8. Measurement (+2 more)

### Community 70 - "not-found.tsx"
Cohesion: 0.67
Nodes (3): LangNotFound(), metadata, NotFound()

### Community 71 - "features-images.mjs"
Cohesion: 0.24
Nodes (8): art(), images, outDir, require, root, screen(), sharp, uploads

### Community 72 - "Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import"
Cohesion: 0.13
Nodes (14): Resolved, Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import, Context, Decisions I am making (say if you disagree), Docs and env, Phase 0: Supabase project (after approval, through the MCP), Phase 2: WordPress import (`scripts/import-wordpress.mjs`), Phase 3: admin (+6 more)

### Community 73 - "Profit margin calculator article (/tools/حاسبة-هامش-الربح/)"
Cohesion: 0.29
Nodes (8): Subsidised VoM plans up to 90% for small businesses, Profit margin calculator article (/tools/حاسبة-هامش-الربح/), Free profit-margin spreadsheet templates (Google Sheets), Gross vs net profit margin, Growth plan offer: 90% off for 6 months (/growth-plan/), Profit margin calculator lead (حاسبة-هامش-الربح), Calculator id "margin", Calculator id "pricing"

### Community 74 - "getvom.com — all pages"
Cohesion: 0.29
Nodes (7): Blog articles, Blog categories, getvom.com — all pages, News, Pages, Templates, Tools

### Community 75 - "Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/)"
Cohesion: 0.28
Nodes (9): VoM 7-day free trial sign-up (no bank card, app.getvom.com/ar/company-register-show), Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/), Employee allowances in Saudi salaries, Daily salary formula (annual or monthly / working days; hourly rate x hours), Salary calculator lead (برنامج-حساب-الراتب-حاسبة-الرواتب), Calculator id "salary-annual", Calculator id "salary-net", Payroll software features (+1 more)

### Community 76 - "legal/index.ts"
Cohesion: 0.54
Nodes (4): termsAr, termsEn, LegalClause, LegalSection

### Community 77 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, check:urls, dev, lint, start, test, typecheck

### Community 78 - "VoM website (getvom.com) — project instructions"
Cohesion: 0.29
Nodes (7): graphify, How to work here, Non-negotiables, Stack and conventions, VoM website (getvom.com) — project instructions, What this is, Where things are

### Community 79 - "Digital-ads landing page: what changed from WordPress"
Cohesion: 0.40
Nodes (5): Character and spelling fixes, Digital-ads landing page: what changed from WordPress, Form, Images, Kept byte for byte

### Community 80 - "content/zatca-phase-2.ts"
Cohesion: 0.25
Nodes (6): 1. Breaking changes and renames in v16 (vs 13 to 15), AccentHeading, icon(), PageImage, zatcaPhase2, proxy()

### Community 82 - "ZATCA Phase 2 page (English): what changed from WordPress"
Cohesion: 0.40
Nodes (5): Copy fixes, Form, Images, SEO, ZATCA Phase 2 page (English): what changed from WordPress

### Community 83 - "allowBuilds"
Cohesion: 0.40
Nodes (4): allowBuilds, core-js, sharp, unrs-resolver

### Community 88 - "VAT calculator article (/tools/حاسبة-الضريبة/)"
Cohesion: 0.60
Nodes (5): VAT calculator article (/tools/حاسبة-الضريبة/), VAT calculator lead (حاسبة-الضريبة), Calculator id "vat", Saudi VAT at 15% (in force since 1 January 2018), VAT-exclusive / VAT-inclusive price formulas

### Community 89 - "Terms and conditions: text changes from the WordPress pages"
Cohesion: 0.40
Nodes (4): Arabic, English, Left unchanged, for the owner to decide, Terms and conditions: text changes from the WordPress pages

### Community 90 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 95 - "ZatcaPhase2Page.tsx"
Cohesion: 0.24
Nodes (12): englishOnly(), generateMetadata(), ZatcaPhase2Route(), half, Row(), rows, TopClients(), Accent() (+4 more)

### Community 96 - "isLocale"
Cohesion: 0.22
Nodes (14): BlogRoute(), generateMetadata(), locale(), BlogPageRoute(), generateMetadata(), generateStaticParams(), Props, resolve() (+6 more)

### Community 97 - "DigitalAds2023.tsx"
Cohesion: 0.16
Nodes (15): DigitalAds2023Page(), metadata, DigitalAds2023(), CampaignImage, digitalAds2023, Testimonial, ClientKey, clients (+7 more)

### Community 100 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, node-html-parser, tailwindcss, @tailwindcss/turbopack, @types/mdx, @types/node (+3 more)

### Community 106 - "next"
Cohesion: 0.14
Nodes (14): disallow, named, sitemapIds, channels, cellOn(), finder(), FooterLink(), socials (+6 more)

### Community 108 - "ref_node_fs"
Cohesion: 0.16
Nodes (8): csv, toolRows, toolIds, png(), require, root, sharp, sizes

## Ambiguous Edges - Review These
- `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` → `Accounting by business sector index (15 Sector entries)`  [AMBIGUOUS]
  content/tools/zakat-base.mdx · relation: references

## Knowledge Gaps
- **26 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm`, `react-dom`, `remark-gfm` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 747 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `posts/index.ts`, `calculators.tsx`, `Header.tsx`, `Icon`, `jsonld.ts`, `ToolPage.tsx`, `[lang]/layout.tsx`, `IntegrationPage.tsx`, `CompareTable.tsx`, `import-einvoicing.mjs`, `FeaturesPage.tsx`, `routes.ts`, `GuidePage.tsx`, `PayResult.tsx`, `PostEditor.tsx`, `supabase/types.ts`, `package.json`, `BlogIndex.tsx`, `(campaigns)/layout.tsx`, `leads.ts`, `invoice-templates-assets.mjs`, `track`, `PostPage.tsx`, `Sidebar.tsx`, `[...slug]/page.tsx`, `auth.ts`, `next.config.ts`, `forms.ts`, `config.ts`, `TermsPage.tsx`, `actions.ts`, `AboutPage.tsx`, `getDictionary`, `StudentPage.tsx`, `not-found.tsx`, `ZatcaPhase2Page.tsx`, `isLocale`, `DigitalAds2023.tsx`?**
  _High betweenness centrality (0.250) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `calculators.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07359781121751026 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: VoM website (getvom.com)`, `GuidePage.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `Icon` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Why does `ButtonLink()` connect `Icon` to `StudentPage.tsx`, `Header.tsx`, `jsonld.ts`, `PostPage.tsx`, `[lang]/layout.tsx`, `IntegrationPage.tsx`, `CompareTable.tsx`, `import-einvoicing.mjs`, `FeaturesPage.tsx`, `GuidePage.tsx`, `PayResult.tsx`, `ZatcaPhase2Page.tsx`, `Components`, `BlogIndex.tsx`, `AboutPage.tsx`, `getDictionary`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` and `Accounting by business sector index (15 Sector entries)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._