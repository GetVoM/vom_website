# Graph Report - vom-website  (2026-11-23)

## Corpus Check
- 309 files · ~264,045 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .css 2, .csv 2)

## Summary
- 2004 nodes · 5188 edges · 100 communities (90 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `87e3efac`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DigitalAds2023.tsx
- calculators.tsx
- track
- Icon
- Footer.tsx
- features/index.ts
- import-wordpress.mjs
- [lang]/layout.tsx
- config.ts
- CompareTable.tsx
- import-accounting-guide.mjs
- sectors/index.ts
- import-tools.mjs
- import-einvoicing.mjs
- Content inventory of getvom.com (WordPress)
- localePath
- next
- GuidePage.tsx
- PayResult.tsx
- dependencies
- PostEditor.tsx
- import-campaign-images.mjs
- features/assets.ts
- getToolBody
- package.json
- Product
- check-blog-urls.mjs
- pricing/index.ts
- NavLoader.tsx
- leads.ts
- invoice-templates-assets.mjs
- Architecture decisions
- routes.ts
- record.ts
- jsonld.ts
- LeadForm.tsx
- convert
- compilerOptions
- Sidebar.tsx
- getvom.com on Next.js: design document
- forms.ts
- Accounting Software Pillar Guide (برنامج محاسبة)
- getDictionary
- requireAdmin
- Locale
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
- analytics/server.ts
- InvoiceTemplatesPage.tsx
- Next.js 16.4.3 conventions digest
- react
- ToolPage.tsx
- Design directions for the new getvom.com
- SEO strategy for the getvom.com migration
- site.ts
- ref_node_fs
- auth.ts
- Profit margin calculator article (/tools/حاسبة-هامش-الربح/)
- getvom.com — all pages
- render.ts
- legal/index.ts
- scripts
- VoM website (getvom.com) — project instructions
- Digital-ads landing page: what changed from WordPress
- content/zatca-phase-2.ts
- classify.ts
- ZATCA Phase 2 page (English): what changed from WordPress
- allowBuilds
- gone/route.ts
- Apple Touch Icon (app/apple-icon.png)
- Site favicon (app/icon.svg): teal upward chevron mark
- vercel.json
- plans.ts
- Terms and conditions: text changes from the WordPress pages
- README.md
- .claude/CLAUDE.md
- ButtonLink
- signIn
- VAT calculator article (/tools/حاسبة-الضريبة/)
- StudentPage.tsx
- vom-pay-failure/page.tsx
- devDependencies
- docs/README.md

## God Nodes (most connected - your core abstractions)
1. `Components` - 125 edges
2. `next` - 100 edges
3. `Locale` - 74 edges
4. `Icon()` - 68 edges
5. `localePath()` - 67 edges
6. `react` - 55 edges
7. `getDictionary()` - 49 edges
8. `ButtonLink()` - 48 edges
9. `isLocale()` - 46 edges
10. `site` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Buttons` --references--> `ButtonLink()`  [INFERRED]
  DESIGN.md → components/ui/Button.tsx
- `Contents Rail (reading register)` --references--> `useActiveSection()`  [INFERRED]
  DESIGN.md → components/ui/useActiveSection.ts
- `Margin Contents` --references--> `useActiveSection()`  [INFERRED]
  DESIGN.md → components/ui/useActiveSection.ts
- `Risks to know before approving` --references--> `isLocale()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → lib/i18n/config.ts
- `Phase 1: schema and content layer` --references--> `generateSitemaps()`  [INFERRED]
  docs/superpowers/specs/2026-11-11-blog-backend.md → app/sitemap.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Tool articles funnel readers to VoM sign-up offers** — content_tools_discount, content_tools_vat, content_tools_zakat_base, content_tools_zakat_company, content_tools_margin, content_tools_salary, content_accounting_guide_free_trial_signup, content_tools_margin_growth_plan_offer [INFERRED 0.85]
- **Zakat calculator family (individual, zakat base, company)** — content_tools_zakat, content_tools_zakat_base, content_tools_zakat_company, content_tools_zakat_rate_2_5_percent, content_tools_zakat_base_zakat_base_concept [INFERRED 0.85]
- **Tool page lead + article split loaded by getToolBody** — content_tools_discount_lead, content_tools_margin_lead, content_tools_salary_lead, content_tools_vat_lead, content_tools_zakat_base_lead, content_tools_zakat_company_lead, content_tools_zakat_lead, lib_content_tools_index_gettoolbody [INFERRED 0.95]

## Communities (100 total, 10 thin omitted)

### Community 0 - "DigitalAds2023.tsx"
Cohesion: 0.31
Nodes (8): DigitalAds2023Page(), metadata, DigitalAds2023(), digitalAds2023, DIGITAL_ADS_FORM, gtmFormSuccess, sectorLabel, sectors

### Community 1 - "calculators.tsx"
Cohesion: 0.08
Nodes (74): allEmpty(), CalcProps, DiscountCalculator(), historyCache, historyDate, MarginCalculator(), NO_HISTORY, PricingCalculator() (+66 more)

### Community 2 - "track"
Cohesion: 0.22
Nodes (17): ReturnBar(), ExhibitStack(), ExhibitStackProps, DesktopNav(), NavGroup(), Header(), HeaderProps, LocaleSwitch() (+9 more)

### Community 3 - "Icon"
Cohesion: 0.14
Nodes (26): currentLocale(), generateMetadata(), HomePage(), Apps(), ClosingCertificate(), Props, DocumentStack(), Faq() (+18 more)

### Community 4 - "Footer.tsx"
Cohesion: 0.11
Nodes (21): ExplorerItem, IntegrationsExplorer(), Logo(), Props, ScreenVideo, VideoScreen(), Footer(), FooterLink() (+13 more)

### Community 5 - "features/index.ts"
Cohesion: 0.22
Nodes (11): featuresAr, ExhibitId, ModuleId, PartnerId, PhotoId, vomPayPost, featuresEn, FeaturedReport (+3 more)

### Community 6 - "import-wordpress.mjs"
Cohesion: 0.06
Nodes (55): 6. Images, fonts, scripts, args, authorByTerm, authorRows, BLOCKS, cacheDir, categoryByWpId, categoryRows (+47 more)

### Community 7 - "[lang]/layout.tsx"
Cohesion: 0.10
Nodes (27): AdminRootLayout(), metadata, CampaignLayout(), metadata, fontVariables, plexArabic, plexSans, GlobalNotFound() (+19 more)

### Community 8 - "config.ts"
Cohesion: 0.16
Nodes (24): AboutRoute(), currentLocale(), generateMetadata(), currentLocale(), FoodicsRoute(), generateMetadata(), currentLocale(), generateMetadata() (+16 more)

### Community 9 - "CompareTable.tsx"
Cohesion: 0.11
Nodes (9): Amount(), CellView(), HeadPrice(), RowHead(), Cell, compareGroups, planNames, planShortNames (+1 more)

### Community 10 - "import-accounting-guide.mjs"
Cohesion: 0.10
Nodes (38): altFixes, cellJsx(), cleanText(), collectBlocks(), convert(), escapeJsx(), escapeMd(), figure() (+30 more)

### Community 11 - "sectors/index.ts"
Cohesion: 0.08
Nodes (31): half, Row(), rows, CampaignImage, Testimonial, ClientKey, clients, homeClients (+23 more)

### Community 12 - "import-tools.mjs"
Cohesion: 0.09
Nodes (27): cacheDir, counts, escapeJsx(), escapeMd(), imageRoot, images, inline(), INLINE_TAGS (+19 more)

### Community 13 - "import-einvoicing.mjs"
Cohesion: 0.07
Nodes (35): accountingGuideMdxComponents, einvoicingMdxComponents, Faq(), PhaseTwo(), components, altOverrides, figureReplacements, cacheDir (+27 more)

### Community 14 - "Content inventory of getvom.com (WordPress)"
Cohesion: 0.29
Nodes (7): Content inventory of getvom.com (WordPress), Decisions in `url-map.csv`, Migration mechanics, Platform today, Quality work after launch, Quality work before launch, What exists

### Community 15 - "localePath"
Cohesion: 0.13
Nodes (16): currentLocale(), FeaturesRoute(), generateMetadata(), displaySize(), Entry(), entryCount(), EntryText(), Exhibits() (+8 more)

### Community 16 - "next"
Cohesion: 0.25
Nodes (5): Resources(), fmt(), VatCalculator(), next, posthog-js

### Community 17 - "GuidePage.tsx"
Cohesion: 0.06
Nodes (53): accountingGuideEntry(), blogEntries(), einvoicingEntries(), pagePairEntries(), pages, sitemap(), sitemapIds, SitemapPage (+45 more)

### Community 18 - "PayResult.tsx"
Cohesion: 0.13
Nodes (26): noChange(), PayErrorCode(), PayErrorMessage(), PayResultViewed(), readSearch(), usePayError(), Close(), Failure() (+18 more)

### Community 19 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @mdx-js/loader, @mdx-js/react, next, @next/mdx, @next/third-parties (+19 more)

### Community 20 - "PostEditor.tsx"
Cohesion: 0.12
Nodes (22): PostInput, EditPostPage(), metadata, AdminBase, useAdminHref(), EditorIcon(), EditorIconName, paths (+14 more)

### Community 21 - "import-campaign-images.mjs"
Cohesion: 0.20
Nodes (8): cacheDir, iconsAt, images, outDir, require, root, sharp, write()

### Community 22 - "features/assets.ts"
Cohesion: 0.13
Nodes (13): apiDocs, exhibitFiles, exhibitSizes, moduleExhibits, moduleIds, modulePhotos, partnerIds, partnerMarks (+5 more)

### Community 23 - "getToolBody"
Cohesion: 0.18
Nodes (20): ZATCA (Zakat, Tax and Customs Authority), Discount calculator article (/tools/حاسبة-الخصم/), Discount calculator lead (حاسبة-الخصم), Calculator id "discount", Zakat calculator article (/tools/حاسبة-الزكاة/), Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/), Zakat base calculator lead (حاسبة-الوعاء-الزكوي), Calculator id "zakat-base" (+12 more)

### Community 24 - "package.json"
Cohesion: 0.10
Nodes (19): eslintConfig, name, packageManager, private, version, eslint, eslint-config-next, @mdx-js/loader (+11 more)

### Community 25 - "Product"
Cohesion: 0.22
Nodes (12): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+4 more)

### Community 28 - "check-blog-urls.mjs"
Cohesion: 0.12
Nodes (23): node-html-parser, alternates(), base, check(), checkLanding(), checkLandingVariants(), checkPay(), checkPayLinks() (+15 more)

### Community 29 - "pricing/index.ts"
Cohesion: 0.28
Nodes (11): pricingAr, pricingEn, flexRates, PlanId, planPrice, reportCount, RowId, vatPercent (+3 more)

### Community 30 - "NavLoader.tsx"
Cohesion: 0.53
Nodes (4): cellOn(), finder(), NAVIGATION_START, qrPath

### Community 31 - "leads.ts"
Cohesion: 0.13
Nodes (25): ALL, cell(), Column, formColumns(), GET(), Lead, LeadsPage(), metadata (+17 more)

### Community 32 - "invoice-templates-assets.mjs"
Cohesion: 0.11
Nodes (19): cacheDir, copyDownload(), hero, hsvToRgb(), imageDir, publicFiles, record, recordInvoice() (+11 more)

### Community 33 - "Architecture decisions"
Cohesion: 0.15
Nodes (13): 10. Security headers, 11. Testing and quality gates, 12. Hosting and environments, 13. Backend services (blog, admin, leads), 1. Rendering: fully static, revalidated by tag, 2. Locales: Arabic at `/`, English at `/en`, no automatic redirects, 3. URLs: preserve first, restructure later, 6. Fonts: self-hosted through `next/font`, two families at most (+5 more)

### Community 34 - "routes.ts"
Cohesion: 0.12
Nodes (18): LangNotFound(), metadata, IconName, samples, copy, NotFound(), Ways(), alternateHref() (+10 more)

### Community 35 - "record.ts"
Cohesion: 0.15
Nodes (15): flushPostHogLogs(), posthogHost, posthogLogger, posthogLoggerProvider, Visitor, LeadFields, LeadContext, LeadOutcome (+7 more)

### Community 37 - "jsonld.ts"
Cohesion: 0.15
Nodes (23): AboutPage(), Charter(), Items(), FigureValue(), AccountingGuidePage(), partTitle(), JsonLd(), ToolsIndex() (+15 more)

### Community 38 - "LeadForm.tsx"
Cohesion: 0.17
Nodes (15): check(), Field, GtmFormSuccess, LeadForm(), LeadFormCopy, LeadFormProps, noChange(), OptionalEmail (+7 more)

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
Cohesion: 0.24
Nodes (6): leadForms, saudiMobile, normaliseSaudiMobile(), SAUDI_MOBILE, gtmFormSuccess, ZATCA_PHASE_2_FORM

### Community 44 - "Accounting Software Pillar Guide (برنامج محاسبة)"
Cohesion: 0.13
Nodes (18): Accounting Software Pillar Guide (برنامج محاسبة), closing export (final word s-8), Cloud vs traditional accounting software comparison, Saudi accounting software comparison table (VoM, Qoyod, SkySoft, global, Excel), Microsoft Excel (spreadsheet accounting), Accounting software FAQ (4 visible questions), Free options: Excel templates, VoM free plan, printable invoice templates, Key Points summary (المختصر المفيد) (+10 more)

### Community 45 - "getDictionary"
Cohesion: 0.33
Nodes (8): currentLocale(), generateMetadata(), GrowthRoute(), GrowthDisc(), growthMetadata(), GrowthPage(), dictionaries, getDictionary()

### Community 46 - "requireAdmin"
Cohesion: 0.17
Nodes (16): createPost(), day(), metadata, PostsPage(), metadata, PreviewPage(), requireAdmin(), ADMIN_BASE (+8 more)

### Community 47 - "Locale"
Cohesion: 0.05
Nodes (100): escape(), GET(), BlogRoute(), generateMetadata(), locale(), BlogPageRoute(), generateMetadata(), generateStaticParams() (+92 more)

### Community 48 - "Design System: VoM website (getvom.com)"
Cohesion: 0.10
Nodes (19): Colors, Design System: VoM website (getvom.com), Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 49 - "next.config.ts"
Cohesion: 0.11
Nodes (16): adminPath, csp, MEDIA_URL, mediaRedirects, nextConfig, POSTHOG_CSP, postLinkRedirects, retiredPaths (+8 more)

### Community 50 - "dictionaries/types.ts"
Cohesion: 0.08
Nodes (22): paths, Numbers(), icons, Line(), Percent(), CountUp(), CountUpProps, ar (+14 more)

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
Cohesion: 0.36
Nodes (11): currentLocale(), generateMetadata(), TermsRoute(), Clause(), EmailLink(), keepParentheses(), Section(), termsMetadata() (+3 more)

### Community 57 - "actions.ts"
Cohesion: 0.13
Nodes (24): ActionResult, authorInput, categoryInput, createUploadUrl(), deleteDraft(), fail(), optionalId, saveAuthor() (+16 more)

### Community 58 - "Tools: text changes from the WordPress pages"
Cohesion: 0.18
Nodes (9): Calculator by calculator, Constants for sign-off, Tools: calculator rules, Character fixes, every page, Images, Links, Structure, Tools: text changes from the WordPress pages (+1 more)

### Community 59 - "Components"
Cohesion: 0.02
Nodes (125): Admin (operate tool), Amounts and cells (HTML budget), App Slab and Store Badges, Arrival (ZATCA Phase 2), Article Body (ledger), Articles (sector pages), Attached Sheets, Billing Switch (+117 more)

### Community 60 - "extensions.ts"
Cohesion: 0.28
Nodes (8): Align, Callout, Figure, imageAttrs(), toNumber(), @tiptap/extension-details, @tiptap/extension-table, @tiptap/starter-kit

### Community 61 - "import-vom-pay.mjs"
Cohesion: 0.17
Nodes (12): body, cacheDir, html, icons, images, outDir, page, require (+4 more)

### Community 62 - "SectorPage.tsx"
Cohesion: 0.20
Nodes (15): englishOnly(), generateMetadata(), ZatcaPhase2Route(), sectorMetadata(), SectorPage(), SectorSeal(), Breadcrumb(), Crumb (+7 more)

### Community 63 - "analytics/server.ts"
Cohesion: 0.31
Nodes (7): AnalyticsEvent, AnalyticsEvents, Locale, Placed, captureServer(), getClient(), posthog-node

### Community 64 - "InvoiceTemplatesPage.tsx"
Cohesion: 0.24
Nodes (6): invoiceTemplatesMetadata(), InvoiceTemplatesPage(), Template(), getInvoiceTemplates(), fileSize(), templateCollectionJsonLd()

### Community 65 - "Next.js 16.4.3 conventions digest"
Cohesion: 0.13
Nodes (14): disallow, named, robots(), generateSitemaps(), 5. Metadata and structured data: generated from one source, 10. Gotchas when coding from 14/15 memory, 2. Rendering and caching model, 3. Routing for i18n (+6 more)

### Community 66 - "react"
Cohesion: 0.17
Nodes (15): ThumbIndex(), ThumbTab, MarginContents(), CatalogueRail(), CatalogueRailProps, RailTopic, ContentsEntry, TermsContents() (+7 more)

### Community 67 - "ToolPage.tsx"
Cohesion: 0.07
Nodes (45): arabicOnly(), generateMetadata(), ToolsIndexRoute(), generateMetadata(), generateStaticParams(), Props, resolve(), ToolRoute() (+37 more)

### Community 68 - "Design directions for the new getvom.com"
Cohesion: 0.20
Nodes (10): Brief as agreed with the owner, Colour roles (shared), Design directions for the new getvom.com, Standing exit, The three directions, Typeface, What happens after the pick, أ — الوثيقة (The Official Record) — the assigned lead (+2 more)

### Community 69 - "SEO strategy for the getvom.com migration"
Cohesion: 0.20
Nodes (10): 1. Goal and principle, 2. Baseline (crawled 2026-10-25), 3. Keyword clusters and the pages that own them, 4. Information architecture, 5. Technical SEO requirements, 6. Content migration rules, 7. Launch plan, 8. Measurement (+2 more)

### Community 70 - "site.ts"
Cohesion: 0.20
Nodes (14): ContactRoute(), currentLocale(), generateMetadata(), contactMetadata(), ContactPage(), Envelope(), Postmark(), channels (+6 more)

### Community 71 - "ref_node_fs"
Cohesion: 0.11
Nodes (16): csv, toolRows, toolIds, png(), require, root, sharp, sizes (+8 more)

### Community 72 - "auth.ts"
Cohesion: 0.23
Nodes (8): currentAdmin, serverSupabase(), Database, Json, PublicTables, TablesInsert, TablesUpdate, @supabase/supabase-js

### Community 73 - "Profit margin calculator article (/tools/حاسبة-هامش-الربح/)"
Cohesion: 0.29
Nodes (8): Subsidised VoM plans up to 90% for small businesses, Profit margin calculator article (/tools/حاسبة-هامش-الربح/), Free profit-margin spreadsheet templates (Google Sheets), Gross vs net profit margin, Growth plan offer: 90% off for 6 months (/growth-plan/), Profit margin calculator lead (حاسبة-هامش-الربح), Calculator id "margin", Calculator id "pricing"

### Community 74 - "getvom.com — all pages"
Cohesion: 0.29
Nodes (7): Blog articles, Blog categories, getvom.com — all pages, News, Pages, Templates, Tools

### Community 75 - "render.ts"
Cohesion: 0.38
Nodes (6): postExtensions, clean(), MEDIA_URL, safeHref(), safeSrc(), @tiptap/html

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
Cohesion: 0.17
Nodes (9): 1. Breaking changes and renames in v16 (vs 13 to 15), AccentHeading, icon(), PageImage, zatcaPhase2, config, configured, proxy() (+1 more)

### Community 81 - "classify.ts"
Cohesion: 0.23
Nodes (10): APP_HOST, ClassifiedLink, classifyLink(), DEMO_HOST, fileName(), hostOf(), OWN_HOSTS, SOCIAL (+2 more)

### Community 82 - "ZATCA Phase 2 page (English): what changed from WordPress"
Cohesion: 0.40
Nodes (5): Copy fixes, Form, Images, SEO, ZATCA Phase 2 page (English): what changed from WordPress

### Community 83 - "allowBuilds"
Cohesion: 0.40
Nodes (4): allowBuilds, core-js, sharp, unrs-resolver

### Community 88 - "plans.ts"
Cohesion: 0.17
Nodes (11): cells, documentRow, everyPlan, GroupId, no, noLimit, Period, rowLinks (+3 more)

### Community 89 - "Terms and conditions: text changes from the WordPress pages"
Cohesion: 0.40
Nodes (4): Arabic, English, Left unchanged, for the owner to decide, Terms and conditions: text changes from the WordPress pages

### Community 90 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 93 - "ButtonLink"
Cohesion: 0.14
Nodes (15): currentLocale(), generateMetadata(), PricingRoute(), sectorIcons, TrialCard(), CompareTable(), PlanSheet(), pricingMetadata() (+7 more)

### Community 94 - "signIn"
Cohesion: 0.53
Nodes (4): signIn(), LoginPage(), metadata, LoginForm()

### Community 95 - "VAT calculator article (/tools/حاسبة-الضريبة/)"
Cohesion: 0.60
Nodes (5): VAT calculator article (/tools/حاسبة-الضريبة/), VAT calculator lead (حاسبة-الضريبة), Calculator id "vat", Saudi VAT at 15% (in force since 1 January 2018), VAT-exclusive / VAT-inclusive price formulas

### Community 96 - "StudentPage.tsx"
Cohesion: 0.35
Nodes (9): currentLocale(), generateMetadata(), StudentRoute(), benefitPhotos, indexKey(), studentMetadata(), StudentPage(), TextbookForm() (+1 more)

### Community 98 - "vom-pay-failure/page.tsx"
Cohesion: 0.40
Nodes (8): currentLocale(), generateMetadata(), VomPayFailureRoute(), currentLocale(), generateMetadata(), VomPaySuccessRoute(), payMetadata(), PayResult()

### Community 100 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, node-html-parser, tailwindcss, @tailwindcss/turbopack, @types/mdx, @types/node (+3 more)

## Ambiguous Edges - Review These
- `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` → `Accounting by business sector index (15 Sector entries)`  [AMBIGUOUS]
  content/tools/zakat-base.mdx · relation: references

## Knowledge Gaps
- **26 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm`, `react-dom`, `remark-gfm` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 747 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `DigitalAds2023.tsx`, `track`, `Icon`, `Footer.tsx`, `[lang]/layout.tsx`, `config.ts`, `CompareTable.tsx`, `import-einvoicing.mjs`, `localePath`, `GuidePage.tsx`, `PayResult.tsx`, `PostEditor.tsx`, `package.json`, `NavLoader.tsx`, `leads.ts`, `invoice-templates-assets.mjs`, `routes.ts`, `jsonld.ts`, `Sidebar.tsx`, `getDictionary`, `requireAdmin`, `Locale`, `next.config.ts`, `TestimonialsSlider.tsx`, `TermsPage.tsx`, `actions.ts`, `SectorPage.tsx`, `InvoiceTemplatesPage.tsx`, `Next.js 16.4.3 conventions digest`, `react`, `ToolPage.tsx`, `site.ts`, `auth.ts`, `content/zatca-phase-2.ts`, `ButtonLink`, `signIn`, `StudentPage.tsx`, `vom-pay-failure/page.tsx`?**
  _High betweenness centrality (0.251) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `calculators.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07728474875110197 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: VoM website (getvom.com)`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `Icon` be split into smaller, more focused modules?**
  _Cohesion score 0.1417004048582996 - nodes in this community are weakly interconnected._
- **Why does `ButtonLink()` connect `ButtonLink` to `InvoiceTemplatesPage.tsx`, `StudentPage.tsx`, `track`, `Icon`, `Footer.tsx`, `jsonld.ts`, `site.ts`, `config.ts`, `CompareTable.tsx`, `import-einvoicing.mjs`, `getDictionary`, `Locale`, `localePath`, `GuidePage.tsx`, `PayResult.tsx`, `Components`, `SectorPage.tsx`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` and `Accounting by business sector index (15 Sector entries)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._