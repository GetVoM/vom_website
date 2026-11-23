# Graph Report - vom-website  (2026-11-23)

## Corpus Check
- 316 files · ~266,687 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .css 2, .csv 2)

## Summary
- 2027 nodes · 5323 edges · 109 communities (99 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 122 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7df0f7f0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DigitalAds2023.tsx
- calculators.tsx
- track
- [lang]/page.tsx
- IntegrationPage.tsx
- Locale
- import-wordpress.mjs
- [lang]/layout.tsx
- IntegrationPage
- CompareTable.tsx
- import-accounting-guide.mjs
- sectors/index.ts
- import-tools.mjs
- import-einvoicing.mjs
- Content inventory of getvom.com (WordPress)
- FeaturesPage.tsx
- withPostHog
- GuidePage.tsx
- PayResult.tsx
- dependencies
- PostEditor.tsx
- import-campaign-images.mjs
- Phase 1: schema and content layer
- getToolBody
- package.json
- Product
- check-blog-urls.mjs
- Icon
- NavLoader.tsx
- leads.ts
- invoice-templates-assets.mjs
- Architecture decisions
- routes.ts
- record.ts
- localePath
- LeadForm.tsx
- convert
- compilerOptions
- Sidebar.tsx
- getvom.com on Next.js: design document
- forms.ts
- Accounting Software Pillar Guide (برنامج محاسبة)
- growth-plan/page.tsx
- auth.ts
- [...slug]/page.tsx
- Design System: VoM website (getvom.com)
- next.config.ts
- dictionaries/types.ts
- VoM Pay result pages: what changed from WordPress
- TestimonialsSlider.tsx
- Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/)
- invoice-templates/index.ts
- import-zatca-phase-2.mjs
- TermsPage.tsx
- actions.ts
- Tools: text changes from the WordPress pages
- Components
- extensions.ts
- import-vom-pay.mjs
- SectorPage.tsx
- track.ts
- getDictionary
- Next.js 16.4.3 conventions digest
- react
- ToolPage.tsx
- Design directions for the new getvom.com
- SEO strategy for the getvom.com migration
- contact-us/page.tsx
- ref_node_fs
- supabase/types.ts
- Profit margin calculator article (/tools/حاسبة-هامش-الربح/)
- getvom.com — all pages
- site.ts
- legal/index.ts
- scripts
- GET
- Digital-ads landing page: what changed from WordPress
- content/zatca-phase-2.ts
- Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import
- ZATCA Phase 2 page (English): what changed from WordPress
- allowBuilds
- gone/route.ts
- Apple Touch Icon (app/apple-icon.png)
- Site favicon (app/icon.svg): teal upward chevron mark
- vercel.json
- ToolsIndex.tsx
- Terms and conditions: text changes from the WordPress pages
- README.md
- .claude/CLAUDE.md
- accounting-guide/mdx.tsx
- isLocale
- VAT calculator article (/tools/حاسبة-الضريبة/)
- student-package/page.tsx
- config.ts
- vom-pay-failure/page.tsx
- AccountingGuidePage.tsx
- devDependencies
- next
- Reports.tsx
- docs/README.md
- about-us/page.tsx
- pricing/page.tsx
- templates/page.tsx
- terms-and-conditions/page.tsx
- Envelope.tsx

## God Nodes (most connected - your core abstractions)
1. `Components` - 125 edges
2. `next` - 102 edges
3. `Locale` - 75 edges
4. `localePath()` - 70 edges
5. `Icon()` - 68 edges
6. `react` - 57 edges
7. `getDictionary()` - 49 edges
8. `ButtonLink()` - 48 edges
9. `isLocale()` - 46 edges
10. `site` - 43 edges

## Surprising Connections (you probably didn't know these)
- `Buttons` --references--> `ButtonLink()`  [INFERRED]
  DESIGN.md → components/ui/Button.tsx
- `Decisions I am making (say if you disagree)` --references--> `postPaths()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → lib/content/posts/index.ts
- `Risks to know before approving` --references--> `isLocale()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → lib/i18n/config.ts
- `Phase 1: schema and content layer` --references--> `Resolved`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → app/[lang]/[...slug]/page.tsx
- `What exploration found (facts the plan rests on)` --references--> `Resolved`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → app/[lang]/[...slug]/page.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Tool articles funnel readers to VoM sign-up offers** — content_tools_discount, content_tools_vat, content_tools_zakat_base, content_tools_zakat_company, content_tools_margin, content_tools_salary, content_accounting_guide_free_trial_signup, content_tools_margin_growth_plan_offer [INFERRED 0.85]
- **Zakat calculator family (individual, zakat base, company)** — content_tools_zakat, content_tools_zakat_base, content_tools_zakat_company, content_tools_zakat_rate_2_5_percent, content_tools_zakat_base_zakat_base_concept [INFERRED 0.85]
- **Tool page lead + article split loaded by getToolBody** — content_tools_discount_lead, content_tools_margin_lead, content_tools_salary_lead, content_tools_vat_lead, content_tools_zakat_base_lead, content_tools_zakat_company_lead, content_tools_zakat_lead, lib_content_tools_index_gettoolbody [INFERRED 0.95]

## Communities (109 total, 10 thin omitted)

### Community 0 - "DigitalAds2023.tsx"
Cohesion: 0.31
Nodes (8): DigitalAds2023Page(), metadata, DigitalAds2023(), digitalAds2023, DIGITAL_ADS_FORM, gtmFormSuccess, sectorLabel, sectors

### Community 1 - "calculators.tsx"
Cohesion: 0.08
Nodes (74): allEmpty(), CalcProps, DiscountCalculator(), historyCache, historyDate, MarginCalculator(), NO_HISTORY, PricingCalculator() (+66 more)

### Community 2 - "track"
Cohesion: 0.23
Nodes (17): ReturnBar(), DesktopNav(), NavGroup(), Header(), LocaleSwitch(), LocaleSwitchProps, MobileMenu(), MobileMenuProps (+9 more)

### Community 3 - "[lang]/page.tsx"
Cohesion: 0.15
Nodes (20): currentLocale(), generateMetadata(), HomePage(), Apps(), ClosingCertificate(), Props, Faq(), Guilloche() (+12 more)

### Community 4 - "IntegrationPage.tsx"
Cohesion: 0.19
Nodes (13): ExplorerItem, ScreenVideo, VideoScreen(), IntegrationId, Integration, integrationIds, integrations, IntegrationVideo (+5 more)

### Community 5 - "Locale"
Cohesion: 0.13
Nodes (22): metadata, ar, en, postDate(), MEDIA_URL, PostSection, preparePostHtml(), text() (+14 more)

### Community 6 - "import-wordpress.mjs"
Cohesion: 0.06
Nodes (53): args, authorByTerm, authorRows, BLOCKS, cacheDir, categoryByWpId, categoryRows, cleanText() (+45 more)

### Community 7 - "[lang]/layout.tsx"
Cohesion: 0.06
Nodes (47): AdminRootLayout(), metadata, CampaignLayout(), metadata, fontVariables, plexArabic, plexSans, GlobalNotFound() (+39 more)

### Community 8 - "IntegrationPage"
Cohesion: 0.24
Nodes (14): currentLocale(), FoodicsRoute(), generateMetadata(), currentLocale(), generateMetadata(), LazyWaitRoute(), currentLocale(), generateMetadata() (+6 more)

### Community 9 - "CompareTable.tsx"
Cohesion: 0.08
Nodes (32): Amount(), CellView(), CompareTable(), HeadPrice(), RowHead(), pricingAr, pricingEn, Cell (+24 more)

### Community 10 - "import-accounting-guide.mjs"
Cohesion: 0.10
Nodes (38): altFixes, cellJsx(), cleanText(), collectBlocks(), convert(), escapeJsx(), escapeMd(), figure() (+30 more)

### Community 11 - "sectors/index.ts"
Cohesion: 0.08
Nodes (32): half, Row(), rows, TopClients(), CampaignImage, Testimonial, ClientKey, clients (+24 more)

### Community 12 - "import-tools.mjs"
Cohesion: 0.09
Nodes (27): cacheDir, counts, escapeJsx(), escapeMd(), imageRoot, images, inline(), INLINE_TAGS (+19 more)

### Community 13 - "import-einvoicing.mjs"
Cohesion: 0.10
Nodes (32): Faq(), PhaseTwo(), altOverrides, figureReplacements, cacheDir, cellJsx(), cleanText(), collectBlocks() (+24 more)

### Community 14 - "Content inventory of getvom.com (WordPress)"
Cohesion: 0.29
Nodes (7): Content inventory of getvom.com (WordPress), Decisions in `url-map.csv`, Migration mechanics, Platform today, Quality work after launch, Quality work before launch, What exists

### Community 15 - "FeaturesPage.tsx"
Cohesion: 0.07
Nodes (33): displaySize(), Entry(), entryCount(), EntryText(), Exhibits(), markWidth, PlanMark(), Section() (+25 more)

### Community 16 - "withPostHog"
Cohesion: 0.22
Nodes (8): GlobalError(), 8. Analytics and third parties, postHogStarted(), startedPostHog(), waiting, withPostHog(), posthogExtensions, posthog-js

### Community 17 - "GuidePage.tsx"
Cohesion: 0.08
Nodes (37): accountingGuideMdxComponents, ReadTracker(), CatalogueRail(), BookingCard(), CatalogueField(), guideMetadata(), GuidePage(), ogImage() (+29 more)

### Community 18 - "PayResult.tsx"
Cohesion: 0.12
Nodes (28): noChange(), PayErrorCode(), PayErrorMessage(), PayResultViewed(), readSearch(), usePayError(), Close(), Failure() (+20 more)

### Community 19 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @mdx-js/loader, @mdx-js/react, next, @next/mdx, @next/third-parties (+19 more)

### Community 20 - "PostEditor.tsx"
Cohesion: 0.12
Nodes (22): PostInput, EditPostPage(), metadata, AdminBase, useAdminHref(), EditorIcon(), EditorIconName, paths (+14 more)

### Community 21 - "import-campaign-images.mjs"
Cohesion: 0.20
Nodes (8): cacheDir, iconsAt, images, outDir, require, root, sharp, write()

### Community 22 - "Phase 1: schema and content layer"
Cohesion: 0.25
Nodes (20): escape(), GET(), resolveBlog(), 4. Content layer: one interface, swappable storage, Phase 1: schema and content layer, asLocale(), asType(), failed() (+12 more)

### Community 23 - "getToolBody"
Cohesion: 0.18
Nodes (20): ZATCA (Zakat, Tax and Customs Authority), Discount calculator article (/tools/حاسبة-الخصم/), Discount calculator lead (حاسبة-الخصم), Calculator id "discount", Zakat calculator article (/tools/حاسبة-الزكاة/), Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/), Zakat base calculator lead (حاسبة-الوعاء-الزكوي), Calculator id "zakat-base" (+12 more)

### Community 24 - "package.json"
Cohesion: 0.07
Nodes (25): eslintConfig, name, packageManager, private, version, config, configured, @aws-sdk/client-s3 (+17 more)

### Community 25 - "Product"
Cohesion: 0.22
Nodes (12): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+4 more)

### Community 28 - "check-blog-urls.mjs"
Cohesion: 0.12
Nodes (23): node-html-parser, alternates(), base, check(), checkLanding(), checkLandingVariants(), checkPay(), checkPayLinks() (+15 more)

### Community 29 - "Icon"
Cohesion: 0.16
Nodes (15): ExhibitStack(), ExhibitStackProps, Features(), Glimpse(), IconName, samples, IntegrationsExplorer(), Logo() (+7 more)

### Community 30 - "NavLoader.tsx"
Cohesion: 0.33
Nodes (7): DocumentStack(), cellOn(), finder(), QrCode(), Steps(), NAVIGATION_START, qrPath

### Community 31 - "leads.ts"
Cohesion: 0.18
Nodes (20): ALL, cell(), Column, formColumns(), GET(), Lead, LeadsPage(), metadata (+12 more)

### Community 32 - "invoice-templates-assets.mjs"
Cohesion: 0.11
Nodes (19): cacheDir, copyDownload(), hero, hsvToRgb(), imageDir, publicFiles, record, recordInvoice() (+11 more)

### Community 33 - "Architecture decisions"
Cohesion: 0.18
Nodes (11): 10. Security headers, 11. Testing and quality gates, 12. Hosting and environments, 13. Backend services (blog, admin, leads), 1. Rendering: fully static, revalidated by tag, 3. URLs: preserve first, restructure later, 6. Fonts: self-hosted through `next/font`, two families at most, 7. Images and media (+3 more)

### Community 34 - "routes.ts"
Cohesion: 0.18
Nodes (22): accountingGuideEntry(), blogEntries(), einvoicingEntries(), pagePairEntries(), pages, sitemap(), SitemapPage, toolEntries() (+14 more)

### Community 35 - "record.ts"
Cohesion: 0.14
Nodes (17): flushPostHogLogs(), posthogHost, posthogLogger, posthogLoggerProvider, captureServer(), getClient(), Visitor, isLeadForm() (+9 more)

### Community 37 - "localePath"
Cohesion: 0.16
Nodes (27): AboutPage(), Charter(), Items(), FigureValue(), ContactPage(), FeaturesPage(), PlanSheet(), pricingMetadata() (+19 more)

### Community 38 - "LeadForm.tsx"
Cohesion: 0.14
Nodes (19): check(), Field, GtmFormSuccess, LeadForm(), LeadFormCopy, LeadFormProps, noChange(), OptionalEmail (+11 more)

### Community 39 - "convert"
Cohesion: 0.20
Nodes (19): boldQuestion(), cellJsx(), cleanText(), collectBlocks(), convert(), count(), figure(), guardLineStart() (+11 more)

### Community 40 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 41 - "Sidebar.tsx"
Cohesion: 0.21
Nodes (12): signOut(), PanelLayout(), Shell(), PanelLoading(), Loader(), content, inbox, Item (+4 more)

### Community 42 - "getvom.com on Next.js: design document"
Cohesion: 0.24
Nodes (11): Anti-goals (what would make this a failure even if it worked), Constraints, Decisions already made, Delivery shape, getvom.com on Next.js: design document, Goals, Intent, Left to the builder (+3 more)

### Community 43 - "forms.ts"
Cohesion: 0.22
Nodes (7): LeadFields, leadForms, saudiMobile, normaliseSaudiMobile(), SAUDI_MOBILE, gtmFormSuccess, ZATCA_PHASE_2_FORM

### Community 44 - "Accounting Software Pillar Guide (برنامج محاسبة)"
Cohesion: 0.13
Nodes (18): Accounting Software Pillar Guide (برنامج محاسبة), closing export (final word s-8), Cloud vs traditional accounting software comparison, Saudi accounting software comparison table (VoM, Qoyod, SkySoft, global, Excel), Microsoft Excel (spreadsheet accounting), Accounting software FAQ (4 visible questions), Free options: Excel templates, VoM free plan, printable invoice templates, Key Points summary (المختصر المفيد) (+10 more)

### Community 45 - "growth-plan/page.tsx"
Cohesion: 0.83
Nodes (3): currentLocale(), generateMetadata(), GrowthRoute()

### Community 46 - "auth.ts"
Cohesion: 0.22
Nodes (12): createPost(), day(), metadata, PostsPage(), PreviewPage(), currentAdmin, requireAdmin(), ADMIN_BASE (+4 more)

### Community 47 - "[...slug]/page.tsx"
Cohesion: 0.15
Nodes (34): generateMetadata(), generateStaticParams(), INVOICE_TEMPLATES_SEGMENT, PreservedPathRoute(), Props, resolve(), Resolved, splitPage() (+26 more)

### Community 48 - "Design System: VoM website (getvom.com)"
Cohesion: 0.10
Nodes (19): Colors, Design System: VoM website (getvom.com), Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 49 - "next.config.ts"
Cohesion: 0.11
Nodes (16): adminPath, csp, MEDIA_URL, mediaRedirects, nextConfig, POSTHOG_CSP, postLinkRedirects, retiredPaths (+8 more)

### Community 50 - "dictionaries/types.ts"
Cohesion: 0.13
Nodes (15): Resources(), fmt(), VatCalculator(), en, AboutCharter, AboutIcon, AboutItem, GrowthFeature (+7 more)

### Community 51 - "VoM Pay result pages: what changed from WordPress"
Cohesion: 0.25
Nodes (7): Arabic fixes, Form, Images, Kept byte for byte, Structure, The failure page's error codes, VoM Pay result pages: what changed from WordPress

### Community 52 - "TestimonialsSlider.tsx"
Cohesion: 0.39
Nodes (6): initial(), Props, TestimonialsSlider(), Testimonial, testimonials, Text

### Community 53 - "Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/)"
Cohesion: 0.28
Nodes (9): VoM 7-day free trial sign-up (no bank card, app.getvom.com/ar/company-register-show), Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/), Employee allowances in Saudi salaries, Daily salary formula (annual or monthly / working days; hourly rate x hours), Salary calculator lead (برنامج-حساب-الراتب-حاسبة-الرواتب), Calculator id "salary-annual", Calculator id "salary-net", Payroll software features (+1 more)

### Community 54 - "invoice-templates/index.ts"
Cohesion: 0.23
Nodes (10): invoiceTemplatesAr, invoiceTemplatesEn, heroSheets, InvoiceTemplate, invoiceTemplates, recordInvoice, TemplateFile, TemplateId (+2 more)

### Community 55 - "import-zatca-phase-2.mjs"
Cohesion: 0.14
Nodes (14): body, cacheDir, done, html, icons, images, mirror, outDir (+6 more)

### Community 56 - "TermsPage.tsx"
Cohesion: 0.61
Nodes (7): Clause(), EmailLink(), keepParentheses(), Section(), TermsPage(), withEmail(), getTerms()

### Community 57 - "actions.ts"
Cohesion: 0.19
Nodes (16): authorInput, categoryInput, createUploadUrl(), deleteDraft(), fail(), optionalId, saveAuthor(), saveCategory() (+8 more)

### Community 58 - "Tools: text changes from the WordPress pages"
Cohesion: 0.33
Nodes (6): Character fixes, every page, Images, Links, Structure, Tools: text changes from the WordPress pages, Wording and facts

### Community 59 - "Components"
Cohesion: 0.02
Nodes (123): Admin (operate tool), Amounts and cells (HTML budget), App Slab and Store Badges, Arrival (ZATCA Phase 2), Article Body (ledger), Articles (sector pages), Attached Sheets, Billing Switch (+115 more)

### Community 60 - "extensions.ts"
Cohesion: 0.17
Nodes (14): Align, Callout, Figure, imageAttrs(), postExtensions, toNumber(), clean(), MEDIA_URL (+6 more)

### Community 61 - "import-vom-pay.mjs"
Cohesion: 0.17
Nodes (12): body, cacheDir, html, icons, images, outDir, page, require (+4 more)

### Community 62 - "SectorPage.tsx"
Cohesion: 0.13
Nodes (26): englishOnly(), generateMetadata(), ZatcaPhase2Route(), GrowthDisc(), GrowthPage(), sectorMetadata(), SectorPage(), SectorSeal() (+18 more)

### Community 63 - "track.ts"
Cohesion: 0.42
Nodes (5): AnalyticsEvent, AnalyticsEvents, Locale, Placed, posthog-node

### Community 64 - "getDictionary"
Cohesion: 0.17
Nodes (16): aboutMetadata(), contactMetadata(), featuresMetadata(), growthMetadata(), invoiceTemplatesMetadata(), InvoiceTemplatesPage(), Template(), termsMetadata() (+8 more)

### Community 65 - "Next.js 16.4.3 conventions digest"
Cohesion: 0.17
Nodes (12): robots(), generateSitemaps(), 5. Metadata and structured data: generated from one source, 10. Gotchas when coding from 14/15 memory, 2. Rendering and caching model, 3. Routing for i18n, 4. Metadata and SEO APIs, 5. Redirects at scale (+4 more)

### Community 66 - "react"
Cohesion: 0.18
Nodes (14): ThumbIndex(), ThumbTab, MarginContents(), CatalogueRailProps, RailCard, RailTopic, ContentsEntry, TermsContents() (+6 more)

### Community 67 - "ToolPage.tsx"
Cohesion: 0.07
Nodes (43): generateMetadata(), generateStaticParams(), Props, resolve(), ToolRoute(), CalcBand(), toolsCopy, Calculator() (+35 more)

### Community 68 - "Design directions for the new getvom.com"
Cohesion: 0.20
Nodes (10): Brief as agreed with the owner, Colour roles (shared), Design directions for the new getvom.com, Standing exit, The three directions, Typeface, What happens after the pick, أ — الوثيقة (The Official Record) — the assigned lead (+2 more)

### Community 69 - "SEO strategy for the getvom.com migration"
Cohesion: 0.22
Nodes (9): 1. Goal and principle, 2. Baseline (crawled 2026-10-25), 3. Keyword clusters and the pages that own them, 4. Information architecture, 6. Content migration rules, 7. Launch plan, 8. Measurement, 9. Answer engine optimisation (AEO) (+1 more)

### Community 70 - "contact-us/page.tsx"
Cohesion: 0.83
Nodes (3): ContactRoute(), currentLocale(), generateMetadata()

### Community 71 - "ref_node_fs"
Cohesion: 0.11
Nodes (16): csv, toolRows, toolIds, png(), require, root, sharp, sizes (+8 more)

### Community 72 - "supabase/types.ts"
Cohesion: 0.15
Nodes (15): ActionResult, AuthorsPage(), Fields(), metadata, CategoriesPage(), Fields(), metadata, RecordForm() (+7 more)

### Community 73 - "Profit margin calculator article (/tools/حاسبة-هامش-الربح/)"
Cohesion: 0.29
Nodes (8): Subsidised VoM plans up to 90% for small businesses, Profit margin calculator article (/tools/حاسبة-هامش-الربح/), Free profit-margin spreadsheet templates (Google Sheets), Gross vs net profit margin, Growth plan offer: 90% off for 6 months (/growth-plan/), Profit margin calculator lead (حاسبة-هامش-الربح), Calculator id "margin", Calculator id "pricing"

### Community 74 - "getvom.com — all pages"
Cohesion: 0.29
Nodes (7): Blog articles, Blog categories, getvom.com — all pages, News, Pages, Templates, Tools

### Community 75 - "site.ts"
Cohesion: 0.21
Nodes (9): disallow, named, sitemapIds, socials, zatcaBadge, AppleGlyph(), StoreBadge(), StoreBadges() (+1 more)

### Community 76 - "legal/index.ts"
Cohesion: 0.54
Nodes (4): termsAr, termsEn, LegalClause, LegalSection

### Community 77 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, check:urls, dev, lint, start, test, typecheck

### Community 78 - "GET"
Cohesion: 0.19
Nodes (16): ar(), bare(), en(), GET(), item(), url(), graphify, How to work here (+8 more)

### Community 79 - "Digital-ads landing page: what changed from WordPress"
Cohesion: 0.40
Nodes (5): Character and spelling fixes, Digital-ads landing page: what changed from WordPress, Form, Images, Kept byte for byte

### Community 80 - "content/zatca-phase-2.ts"
Cohesion: 0.25
Nodes (6): 1. Breaking changes and renames in v16 (vs 13 to 15), AccentHeading, icon(), PageImage, zatcaPhase2, proxy()

### Community 81 - "Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import"
Cohesion: 0.14
Nodes (13): Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import, Context, Decisions I am making (say if you disagree), Docs and env, Phase 0: Supabase project (after approval, through the MCP), Phase 2: WordPress import (`scripts/import-wordpress.mjs`), Phase 3: admin, Phase 4: lead plumbing only (no forms) (+5 more)

### Community 82 - "ZATCA Phase 2 page (English): what changed from WordPress"
Cohesion: 0.50
Nodes (4): Copy fixes, Form, Images, ZATCA Phase 2 page (English): what changed from WordPress

### Community 83 - "allowBuilds"
Cohesion: 0.40
Nodes (4): allowBuilds, core-js, sharp, unrs-resolver

### Community 88 - "ToolsIndex.tsx"
Cohesion: 0.27
Nodes (8): arabicOnly(), generateMetadata(), ToolsIndexRoute(), Plate(), PlateArt(), ToolsIndex(), toolsIndexMetadata(), toolCollectionJsonLd()

### Community 89 - "Terms and conditions: text changes from the WordPress pages"
Cohesion: 0.40
Nodes (4): Arabic, English, Left unchanged, for the owner to decide, Terms and conditions: text changes from the WordPress pages

### Community 90 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 93 - "accounting-guide/mdx.tsx"
Cohesion: 0.22
Nodes (3): sectorIcons, TrialCard(), accountingGuide

### Community 94 - "isLocale"
Cohesion: 0.32
Nodes (10): BlogRoute(), generateMetadata(), locale(), BlogPageRoute(), generateMetadata(), generateStaticParams(), Props, resolve() (+2 more)

### Community 95 - "VAT calculator article (/tools/حاسبة-الضريبة/)"
Cohesion: 0.60
Nodes (5): VAT calculator article (/tools/حاسبة-الضريبة/), VAT calculator lead (حاسبة-الضريبة), Calculator id "vat", Saudi VAT at 15% (in force since 1 January 2018), VAT-exclusive / VAT-inclusive price formulas

### Community 96 - "student-package/page.tsx"
Cohesion: 0.83
Nodes (3): currentLocale(), generateMetadata(), StudentRoute()

### Community 97 - "config.ts"
Cohesion: 0.29
Nodes (7): currentLocale(), FeaturesRoute(), generateMetadata(), generateMetadata(), locale(), NewsRoute(), defaultLocale

### Community 98 - "vom-pay-failure/page.tsx"
Cohesion: 0.40
Nodes (8): currentLocale(), generateMetadata(), VomPayFailureRoute(), currentLocale(), generateMetadata(), VomPaySuccessRoute(), payMetadata(), PayResult()

### Community 99 - "AccountingGuidePage.tsx"
Cohesion: 0.36
Nodes (8): accountingGuideMetadata(), AccountingGuidePage(), partTitle(), AccountingGuideModule, getAccountingGuideBody(), getAccountingGuideOutline(), isAccountingGuidePath(), partNumber()

### Community 100 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, node-html-parser, tailwindcss, @tailwindcss/turbopack, @types/mdx, @types/node (+3 more)

### Community 101 - "next"
Cohesion: 0.36
Nodes (7): LangNotFound(), metadata, TrackOnMount(), copy, NotFound(), Ways(), next

### Community 102 - "Reports.tsx"
Cohesion: 0.31
Nodes (6): Reports(), icons, Line(), Percent(), ReportIcon(), ReportId

### Community 103 - "docs/README.md"
Cohesion: 0.21
Nodes (5): This is NOT the Next.js you know, Calculator by calculator, Constants for sign-off, Tools: calculator rules, Planning documents

### Community 104 - "about-us/page.tsx"
Cohesion: 0.83
Nodes (3): AboutRoute(), currentLocale(), generateMetadata()

### Community 105 - "pricing/page.tsx"
Cohesion: 0.83
Nodes (3): currentLocale(), generateMetadata(), PricingRoute()

### Community 106 - "templates/page.tsx"
Cohesion: 0.83
Nodes (3): currentLocale(), generateMetadata(), TemplatesRoute()

### Community 107 - "terms-and-conditions/page.tsx"
Cohesion: 0.83
Nodes (3): currentLocale(), generateMetadata(), TermsRoute()

## Ambiguous Edges - Review These
- `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` → `Accounting by business sector index (15 Sector entries)`  [AMBIGUOUS]
  content/tools/zakat-base.mdx · relation: references

## Knowledge Gaps
- **26 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@next/third-parties`, `@tiptap/pm`, `remark-gfm` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 743 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `DigitalAds2023.tsx`, `track`, `[lang]/page.tsx`, `IntegrationPage.tsx`, `Locale`, `[lang]/layout.tsx`, `IntegrationPage`, `CompareTable.tsx`, `FeaturesPage.tsx`, `withPostHog`, `GuidePage.tsx`, `PayResult.tsx`, `PostEditor.tsx`, `package.json`, `Icon`, `NavLoader.tsx`, `leads.ts`, `invoice-templates-assets.mjs`, `routes.ts`, `localePath`, `LeadForm.tsx`, `Sidebar.tsx`, `growth-plan/page.tsx`, `auth.ts`, `[...slug]/page.tsx`, `next.config.ts`, `dictionaries/types.ts`, `TestimonialsSlider.tsx`, `TermsPage.tsx`, `actions.ts`, `SectorPage.tsx`, `getDictionary`, `react`, `ToolPage.tsx`, `contact-us/page.tsx`, `supabase/types.ts`, `site.ts`, `ToolsIndex.tsx`, `isLocale`, `student-package/page.tsx`, `config.ts`, `vom-pay-failure/page.tsx`, `AccountingGuidePage.tsx`, `Reports.tsx`, `about-us/page.tsx`, `pricing/page.tsx`, `templates/page.tsx`, `terms-and-conditions/page.tsx`, `Envelope.tsx`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@next/third-parties` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `calculators.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07728474875110197 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: VoM website (getvom.com)`, `react`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `[lang]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14623655913978495 - nodes in this community are weakly interconnected._
- **Why does `ButtonLink()` connect `localePath` to `getDictionary`, `track`, `AccountingGuidePage.tsx`, `[lang]/page.tsx`, `IntegrationPage.tsx`, `IntegrationPage`, `CompareTable.tsx`, `import-einvoicing.mjs`, `[...slug]/page.tsx`, `FeaturesPage.tsx`, `GuidePage.tsx`, `Icon`, `PayResult.tsx`, `Components`, `accounting-guide/mdx.tsx`, `SectorPage.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` and `Accounting by business sector index (15 Sector entries)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._