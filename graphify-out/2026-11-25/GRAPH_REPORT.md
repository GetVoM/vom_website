# Graph Report - vom-website  (2026-11-25)

## Corpus Check
- 321 files · ~268,058 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .css 2, .csv 2)

## Summary
- 2050 nodes · 5436 edges · 101 communities (92 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d52b6c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GuidePage.tsx
- calculators.tsx
- MobileMenu.tsx
- localePath
- Image
- optimizedSrc
- import-wordpress.mjs
- [lang]/layout.tsx
- Locale
- CompareTable.tsx
- import-accounting-guide.mjs
- sectors/index.ts
- import-tools.mjs
- import-einvoicing.mjs
- ref_node_fs
- features/assets.ts
- withPostHog
- einvoicing/index.ts
- PayResult.tsx
- dependencies
- RichEditor.tsx
- import-campaign-images.mjs
- posts/index.ts
- getToolBody
- package.json
- Product
- check-blog-urls.mjs
- PostPage.tsx
- pricing/index.ts
- leads.ts
- invoice-templates-assets.mjs
- Architecture decisions
- config.ts
- record.ts
- getDictionary
- LeadForm.tsx
- convert
- compilerOptions
- Sidebar.tsx
- getvom.com on Next.js: design document
- forms.test.ts
- Accounting Software Pillar Guide (برنامج محاسبة)
- einvoicing/mdx.tsx
- adminHref
- BlogIndex.tsx
- Design System: VoM website (getvom.com)
- next.config.ts
- IndexCard.tsx
- VoM Pay result pages: what changed from WordPress
- plans.ts
- Salary calculator article (/tools/برنامج-حساب-الراتب-حاسبة-الرواتب/)
- invoice-templates/index.ts
- import-zatca-phase-2.mjs
- TermsPage.tsx
- actions.ts
- Tools: text changes from the WordPress pages
- Components
- extensions.ts
- import-vom-pay.mjs
- next
- react
- signIn
- Next.js 16.4.3 conventions digest
- useActiveSection
- ToolPage.tsx
- Design directions for the new getvom.com
- SEO strategy for the getvom.com migration
- Numbers.tsx
- ref_node_url
- auth.ts
- Profit margin calculator article (/tools/حاسبة-هامش-الربح/)
- getvom.com — all pages
- FeaturesPage.tsx
- legal/index.ts
- scripts
- GET
- Digital-ads landing page: what changed from WordPress
- Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import
- ZATCA Phase 2 page (English): what changed from WordPress
- allowBuilds
- gone/route.ts
- Apple Touch Icon (app/apple-icon.png)
- Site favicon (app/icon.svg): teal upward chevron mark
- vercel.json
- Terms and conditions: text changes from the WordPress pages
- README.md
- .claude/CLAUDE.md
- accounting-guide/mdx.tsx
- isLocale
- VAT calculator article (/tools/حاسبة-الضريبة/)
- StudentPage.tsx
- vom-pay-failure/page.tsx
- AccountingGuidePage
- ReportIcon.tsx
- docs/README.md
- AboutPage.tsx
- [...slug]/page.tsx

## God Nodes (most connected - your core abstractions)
1. `Components` - 125 edges
2. `next` - 97 edges
3. `Locale` - 75 edges
4. `localePath()` - 70 edges
5. `Icon()` - 68 edges
6. `react` - 57 edges
7. `Image()` - 51 edges
8. `getDictionary()` - 49 edges
9. `ButtonLink()` - 48 edges
10. `isLocale()` - 46 edges

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

## Communities (101 total, 9 thin omitted)

### Community 0 - "GuidePage.tsx"
Cohesion: 0.20
Nodes (12): CatalogueRail(), CatalogueRailProps, RailCard, RailTopic, BookingCard(), CatalogueField(), guideMetadata(), GuidePage() (+4 more)

### Community 1 - "calculators.tsx"
Cohesion: 0.08
Nodes (74): allEmpty(), CalcProps, DiscountCalculator(), historyCache, historyDate, MarginCalculator(), NO_HISTORY, PricingCalculator() (+66 more)

### Community 2 - "MobileMenu.tsx"
Cohesion: 0.32
Nodes (12): DesktopNav(), NavGroup(), Header(), LocaleSwitch(), MobileMenu(), MobileMenuProps, NavAnchor(), MenuId (+4 more)

### Community 3 - "localePath"
Cohesion: 0.08
Nodes (47): currentLocale(), generateMetadata(), HomePage(), Apps(), ClosingCertificate(), Props, DocumentStack(), Faq() (+39 more)

### Community 4 - "Image"
Cohesion: 0.12
Nodes (22): Envelope(), Postmark(), ExplorerItem, IntegrationsExplorer(), Logo(), Props, ScreenVideo, VideoScreen() (+14 more)

### Community 5 - "optimizedSrc"
Cohesion: 0.20
Nodes (13): metadata, PreviewPage(), PostSection, preparePostHtml(), text(), WIDTHS, isSmallMedia(), MEDIA_URL (+5 more)

### Community 6 - "import-wordpress.mjs"
Cohesion: 0.06
Nodes (55): 6. Images, fonts, scripts, args, authorByTerm, authorRows, BLOCKS, cacheDir, categoryByWpId, categoryRows (+47 more)

### Community 7 - "[lang]/layout.tsx"
Cohesion: 0.06
Nodes (45): AdminRootLayout(), metadata, CampaignLayout(), metadata, fontVariables, plexArabic, plexSans, GlobalNotFound() (+37 more)

### Community 8 - "Locale"
Cohesion: 0.12
Nodes (24): currentLocale(), FoodicsRoute(), generateMetadata(), currentLocale(), generateMetadata(), LazyWaitRoute(), currentLocale(), generateMetadata() (+16 more)

### Community 9 - "CompareTable.tsx"
Cohesion: 0.11
Nodes (11): Amount(), CellView(), CompareTable(), HeadPrice(), RowHead(), compareGroups, planNames, planPeriod (+3 more)

### Community 10 - "import-accounting-guide.mjs"
Cohesion: 0.10
Nodes (38): altFixes, cellJsx(), cleanText(), collectBlocks(), convert(), escapeJsx(), escapeMd(), figure() (+30 more)

### Community 11 - "sectors/index.ts"
Cohesion: 0.07
Nodes (40): DigitalAds2023Page(), metadata, DigitalAds2023(), half, Row(), rows, TopClients(), CampaignImage (+32 more)

### Community 12 - "import-tools.mjs"
Cohesion: 0.09
Nodes (27): cacheDir, counts, escapeJsx(), escapeMd(), imageRoot, images, inline(), INLINE_TAGS (+19 more)

### Community 13 - "import-einvoicing.mjs"
Cohesion: 0.10
Nodes (32): Faq(), PhaseTwo(), altOverrides, figureReplacements, cacheDir, cellJsx(), cleanText(), collectBlocks() (+24 more)

### Community 14 - "ref_node_fs"
Cohesion: 0.12
Nodes (11): csv, toolRows, toolIds, SMALL_IMAGE_BYTES, media, MEDIA_URL, OUT, root (+3 more)

### Community 15 - "features/assets.ts"
Cohesion: 0.10
Nodes (24): featuresAr, apiDocs, exhibitFiles, ExhibitId, exhibitSizes, moduleExhibits, ModuleId, moduleIds (+16 more)

### Community 16 - "withPostHog"
Cohesion: 0.22
Nodes (8): GlobalError(), 8. Analytics and third parties, postHogStarted(), startedPostHog(), waiting, withPostHog(), posthogExtensions, posthog-js

### Community 17 - "einvoicing/index.ts"
Cohesion: 0.17
Nodes (15): GuideId, guideIds, guidePath(), guides, HUB_SEGMENT, nextGuide(), relatedGuides(), TopicId (+7 more)

### Community 18 - "PayResult.tsx"
Cohesion: 0.12
Nodes (27): noChange(), PayErrorCode(), PayErrorMessage(), PayResultViewed(), readSearch(), usePayError(), Close(), Failure() (+19 more)

### Community 19 - "dependencies"
Cohesion: 0.05
Nodes (38): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @mdx-js/loader, @mdx-js/react, next, @next/mdx, @next/third-parties (+30 more)

### Community 20 - "RichEditor.tsx"
Cohesion: 0.27
Nodes (9): EditorIcon(), EditorIconName, paths, BLOCKS, Button(), Props, RichEditor(), Text() (+1 more)

### Community 21 - "import-campaign-images.mjs"
Cohesion: 0.22
Nodes (8): cacheDir, iconsAt, images, outDir, require, root, sharp, write()

### Community 22 - "posts/index.ts"
Cohesion: 0.17
Nodes (28): 4. Content layer: one interface, swappable storage, Phase 1: schema and content layer, asLocale(), asType(), failed(), getAuthor(), getCategory(), getPost() (+20 more)

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

### Community 29 - "PostPage.tsx"
Cohesion: 0.24
Nodes (13): authorPath(), description(), postMetadata(), PostPage(), ar, barePath(), en, postDate() (+5 more)

### Community 30 - "pricing/index.ts"
Cohesion: 0.28
Nodes (11): pricingAr, pricingEn, flexRates, PlanId, planPrice, reportCount, RowId, vatPercent (+3 more)

### Community 31 - "leads.ts"
Cohesion: 0.16
Nodes (21): ALL, cell(), Column, formColumns(), GET(), Lead, LeadsPage(), metadata (+13 more)

### Community 32 - "invoice-templates-assets.mjs"
Cohesion: 0.11
Nodes (19): cacheDir, copyDownload(), hero, hsvToRgb(), imageDir, publicFiles, record, recordInvoice() (+11 more)

### Community 33 - "Architecture decisions"
Cohesion: 0.11
Nodes (17): disallow, named, robots(), generateSitemaps(), 10. Security headers, 11. Testing and quality gates, 12. Hosting and environments, 13. Backend services (blog, admin, leads) (+9 more)

### Community 34 - "config.ts"
Cohesion: 0.15
Nodes (21): ContactRoute(), currentLocale(), generateMetadata(), contactMetadata(), copy, Ways(), defaultLocale, otherLocale() (+13 more)

### Community 35 - "record.ts"
Cohesion: 0.14
Nodes (18): flushPostHogLogs(), posthogHost, posthogLogger, posthogLoggerProvider, captureServer(), getClient(), Visitor, isLeadForm() (+10 more)

### Community 37 - "getDictionary"
Cohesion: 0.14
Nodes (35): currentLocale(), generateMetadata(), PricingRoute(), ContactPage(), FeaturesPage(), GrowthPage(), IntegrationPage(), InvoiceTemplatesPage() (+27 more)

### Community 38 - "LeadForm.tsx"
Cohesion: 0.13
Nodes (23): check(), Field, GtmFormSuccess, LeadForm(), LeadFormCopy, LeadFormProps, noChange(), OptionalEmail (+15 more)

### Community 39 - "convert"
Cohesion: 0.20
Nodes (19): boldQuestion(), cellJsx(), cleanText(), collectBlocks(), convert(), count(), figure(), guardLineStart() (+11 more)

### Community 40 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 41 - "Sidebar.tsx"
Cohesion: 0.19
Nodes (13): PanelLayout(), Shell(), PanelLoading(), AdminBase, useAdminHref(), Loader(), content, inbox (+5 more)

### Community 42 - "getvom.com on Next.js: design document"
Cohesion: 0.24
Nodes (11): Anti-goals (what would make this a failure even if it worked), Constraints, Decisions already made, Delivery shape, getvom.com on Next.js: design document, Goals, Intent, Left to the builder (+3 more)

### Community 43 - "forms.test.ts"
Cohesion: 0.27
Nodes (3): VOM_PAY_FORM, gtmFormSuccess, ZATCA_PHASE_2_FORM

### Community 44 - "Accounting Software Pillar Guide (برنامج محاسبة)"
Cohesion: 0.13
Nodes (18): Accounting Software Pillar Guide (برنامج محاسبة), closing export (final word s-8), Cloud vs traditional accounting software comparison, Saudi accounting software comparison table (VoM, Qoyod, SkySoft, global, Excel), Microsoft Excel (spreadsheet accounting), Accounting software FAQ (4 visible questions), Free options: Excel templates, VoM free plan, printable invoice templates, Key Points summary (المختصر المفيد) (+10 more)

### Community 45 - "einvoicing/mdx.tsx"
Cohesion: 0.18
Nodes (5): accountingGuideMdxComponents, einvoicingMdxComponents, Figure(), einvoicingCopy, components

### Community 46 - "adminHref"
Cohesion: 0.25
Nodes (9): createPost(), signOut(), day(), metadata, PostsPage(), ADMIN_BASE, ADMIN_SEGMENT, adminHref() (+1 more)

### Community 47 - "BlogIndex.tsx"
Cohesion: 0.33
Nodes (17): PreservedPathRoute(), authorMetadata(), AuthorPage(), BlogIndex(), categoryMetadata(), CategoryPage(), ListHead(), ListJsonLd() (+9 more)

### Community 48 - "Design System: VoM website (getvom.com)"
Cohesion: 0.10
Nodes (19): Colors, Design System: VoM website (getvom.com), Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 49 - "next.config.ts"
Cohesion: 0.11
Nodes (16): adminPath, csp, MEDIA_URL, mediaRedirects, nextConfig, POSTHOG_CSP, postLinkRedirects, retiredPaths (+8 more)

### Community 50 - "IndexCard.tsx"
Cohesion: 0.27
Nodes (8): DrawerCard(), NextCard(), PinnedCard(), topicName(), cardNumber(), topics, guideDate(), readingTime()

### Community 51 - "VoM Pay result pages: what changed from WordPress"
Cohesion: 0.25
Nodes (7): Arabic fixes, Form, Images, Kept byte for byte, Structure, The failure page's error codes, VoM Pay result pages: what changed from WordPress

### Community 52 - "plans.ts"
Cohesion: 0.15
Nodes (12): Cell, cells, documentRow, everyPlan, GroupId, no, noLimit, Period (+4 more)

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
Cohesion: 0.18
Nodes (20): authorInput, categoryInput, createUploadUrl(), deleteDraft(), fail(), optionalId, PostInput, saveAuthor() (+12 more)

### Community 58 - "Tools: text changes from the WordPress pages"
Cohesion: 0.33
Nodes (6): Character fixes, every page, Images, Links, Structure, Tools: text changes from the WordPress pages, Wording and facts

### Community 59 - "Components"
Cohesion: 0.02
Nodes (123): Admin (operate tool), Amounts and cells (HTML budget), App Slab and Store Badges, Arrival (ZATCA Phase 2), Article Body (ledger), Articles (sector pages), Attached Sheets, Billing Switch (+115 more)

### Community 60 - "extensions.ts"
Cohesion: 0.13
Nodes (17): EditPostPage(), metadata, Align, Callout, Figure, imageAttrs(), postExtensions, toNumber() (+9 more)

### Community 61 - "import-vom-pay.mjs"
Cohesion: 0.17
Nodes (12): body, cacheDir, html, icons, images, outDir, page, require (+4 more)

### Community 62 - "next"
Cohesion: 0.11
Nodes (23): currentLocale(), generateMetadata(), GrowthRoute(), englishOnly(), generateMetadata(), ZatcaPhase2Route(), accountingGuideMetadata(), channels (+15 more)

### Community 63 - "react"
Cohesion: 0.24
Nodes (11): ReadTracker(), TrackOnMount(), ReturnBar(), ExhibitStack(), ExhibitStackProps, AnalyticsEvent, AnalyticsEvents, Locale (+3 more)

### Community 64 - "signIn"
Cohesion: 0.53
Nodes (4): signIn(), LoginPage(), metadata, LoginForm()

### Community 65 - "Next.js 16.4.3 conventions digest"
Cohesion: 0.12
Nodes (14): 10. Gotchas when coding from 14/15 memory, 1. Breaking changes and renames in v16 (vs 13 to 15), 2. Rendering and caching model, 3. Routing for i18n, 5. Redirects at scale, 7. MDX, 8. Config worth enabling, 9. Production checklist and deployment (+6 more)

### Community 66 - "useActiveSection"
Cohesion: 0.22
Nodes (10): ThumbIndex(), ThumbTab, MarginContents(), ContentsEntry, TermsContents(), TermsContentsProps, readingLine(), useActiveSection() (+2 more)

### Community 67 - "ToolPage.tsx"
Cohesion: 0.05
Nodes (57): arabicOnly(), generateMetadata(), ToolsIndexRoute(), generateMetadata(), generateStaticParams(), Props, resolve(), ToolRoute() (+49 more)

### Community 68 - "Design directions for the new getvom.com"
Cohesion: 0.20
Nodes (10): Brief as agreed with the owner, Colour roles (shared), Design directions for the new getvom.com, Standing exit, The three directions, Typeface, What happens after the pick, أ — الوثيقة (The Official Record) — the assigned lead (+2 more)

### Community 69 - "SEO strategy for the getvom.com migration"
Cohesion: 0.22
Nodes (9): 1. Goal and principle, 2. Baseline (crawled 2026-10-25), 3. Keyword clusters and the pages that own them, 4. Information architecture, 6. Content migration rules, 7. Launch plan, 8. Measurement, 9. Answer engine optimisation (AEO) (+1 more)

### Community 70 - "Numbers.tsx"
Cohesion: 0.60
Nodes (3): Numbers(), CountUp(), CountUpProps

### Community 71 - "ref_node_url"
Cohesion: 0.14
Nodes (13): png(), require, root, sharp, sizes, art(), images, outDir (+5 more)

### Community 72 - "auth.ts"
Cohesion: 0.14
Nodes (18): ActionResult, AuthorsPage(), Fields(), metadata, CategoriesPage(), Fields(), metadata, RecordForm() (+10 more)

### Community 73 - "Profit margin calculator article (/tools/حاسبة-هامش-الربح/)"
Cohesion: 0.29
Nodes (8): Subsidised VoM plans up to 90% for small businesses, Profit margin calculator article (/tools/حاسبة-هامش-الربح/), Free profit-margin spreadsheet templates (Google Sheets), Gross vs net profit margin, Growth plan offer: 90% off for 6 months (/growth-plan/), Profit margin calculator lead (حاسبة-هامش-الربح), Calculator id "margin", Calculator id "pricing"

### Community 74 - "getvom.com — all pages"
Cohesion: 0.29
Nodes (7): Blog articles, Blog categories, getvom.com — all pages, News, Pages, Templates, Tools

### Community 75 - "FeaturesPage.tsx"
Cohesion: 0.11
Nodes (16): currentLocale(), FeaturesRoute(), generateMetadata(), displaySize(), Entry(), entryCount(), EntryText(), Exhibits() (+8 more)

### Community 76 - "legal/index.ts"
Cohesion: 0.54
Nodes (4): termsAr, termsEn, LegalClause, LegalSection

### Community 77 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, check:urls, dev, images:small-media, lint, start, test (+1 more)

### Community 78 - "GET"
Cohesion: 0.19
Nodes (16): ar(), bare(), en(), GET(), item(), url(), graphify, How to work here (+8 more)

### Community 79 - "Digital-ads landing page: what changed from WordPress"
Cohesion: 0.40
Nodes (5): Character and spelling fixes, Digital-ads landing page: what changed from WordPress, Form, Images, Kept byte for byte

### Community 81 - "Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import"
Cohesion: 0.13
Nodes (14): Resolved, Blog backend (Supabase + R2), admin editor, lead plumbing, WordPress import, Context, Decisions I am making (say if you disagree), Docs and env, Phase 0: Supabase project (after approval, through the MCP), Phase 2: WordPress import (`scripts/import-wordpress.mjs`), Phase 3: admin (+6 more)

### Community 82 - "ZATCA Phase 2 page (English): what changed from WordPress"
Cohesion: 0.50
Nodes (4): Copy fixes, Form, Images, ZATCA Phase 2 page (English): what changed from WordPress

### Community 83 - "allowBuilds"
Cohesion: 0.40
Nodes (4): allowBuilds, core-js, sharp, unrs-resolver

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
Cohesion: 0.19
Nodes (17): escape(), GET(), BlogRoute(), generateMetadata(), locale(), BlogPageRoute(), generateMetadata(), generateStaticParams() (+9 more)

### Community 95 - "VAT calculator article (/tools/حاسبة-الضريبة/)"
Cohesion: 0.60
Nodes (5): VAT calculator article (/tools/حاسبة-الضريبة/), VAT calculator lead (حاسبة-الضريبة), Calculator id "vat", Saudi VAT at 15% (in force since 1 January 2018), VAT-exclusive / VAT-inclusive price formulas

### Community 96 - "StudentPage.tsx"
Cohesion: 0.32
Nodes (10): currentLocale(), generateMetadata(), StudentRoute(), ReportIcon(), benefitPhotos, indexKey(), studentMetadata(), StudentPage() (+2 more)

### Community 98 - "vom-pay-failure/page.tsx"
Cohesion: 0.40
Nodes (8): currentLocale(), generateMetadata(), VomPayFailureRoute(), currentLocale(), generateMetadata(), VomPaySuccessRoute(), payMetadata(), PayResult()

### Community 99 - "AccountingGuidePage"
Cohesion: 0.19
Nodes (13): AccountingGuidePage(), partTitle(), AccountingGuideModule, getAccountingGuideBody(), getAccountingGuideOutline(), isAccountingGuidePath(), partNumber(), countWords() (+5 more)

### Community 102 - "ReportIcon.tsx"
Cohesion: 0.40
Nodes (4): icons, Line(), Percent(), ReportId

### Community 103 - "docs/README.md"
Cohesion: 0.13
Nodes (12): This is NOT the Next.js you know, Content inventory of getvom.com (WordPress), Decisions in `url-map.csv`, Migration mechanics, Platform today, Quality work after launch, Quality work before launch, What exists (+4 more)

### Community 104 - "AboutPage.tsx"
Cohesion: 0.36
Nodes (8): AboutRoute(), currentLocale(), generateMetadata(), aboutMetadata(), AboutPage(), Charter(), Items(), FigureValue()

### Community 106 - "[...slug]/page.tsx"
Cohesion: 0.16
Nodes (14): generateMetadata(), generateStaticParams(), INVOICE_TEMPLATES_SEGMENT, Props, resolve(), resolveBlog(), splitPage(), currentLocale() (+6 more)

## Ambiguous Edges - Review These
- `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` → `Accounting by business sector index (15 Sector entries)`  [AMBIGUOUS]
  content/tools/zakat-base.mdx · relation: references

## Knowledge Gaps
- **26 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@next/third-parties`, `@tiptap/pm`, `remark-gfm` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `GuidePage.tsx`, `MobileMenu.tsx`, `localePath`, `Image`, `optimizedSrc`, `[lang]/layout.tsx`, `Locale`, `CompareTable.tsx`, `sectors/index.ts`, `withPostHog`, `einvoicing/index.ts`, `PayResult.tsx`, `posts/index.ts`, `package.json`, `PostPage.tsx`, `leads.ts`, `invoice-templates-assets.mjs`, `Architecture decisions`, `config.ts`, `getDictionary`, `LeadForm.tsx`, `Sidebar.tsx`, `einvoicing/mdx.tsx`, `adminHref`, `BlogIndex.tsx`, `next.config.ts`, `IndexCard.tsx`, `TermsPage.tsx`, `actions.ts`, `extensions.ts`, `signIn`, `ToolPage.tsx`, `auth.ts`, `FeaturesPage.tsx`, `isLocale`, `StudentPage.tsx`, `vom-pay-failure/page.tsx`, `AccountingGuidePage`, `AboutPage.tsx`, `[...slug]/page.tsx`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@next/third-parties` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `calculators.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07728474875110197 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: VoM website (getvom.com)`, `useActiveSection`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Should `localePath` be split into smaller, more focused modules?**
  _Cohesion score 0.08340649692712906 - nodes in this community are weakly interconnected._
- **Why does `ButtonLink()` connect `getDictionary` to `GuidePage.tsx`, `StudentPage.tsx`, `config.ts`, `AccountingGuidePage`, `localePath`, `Image`, `MobileMenu.tsx`, `AboutPage.tsx`, `CompareTable.tsx`, `FeaturesPage.tsx`, `einvoicing/mdx.tsx`, `import-einvoicing.mjs`, `BlogIndex.tsx`, `PayResult.tsx`, `accounting-guide/mdx.tsx`, `Components`, `PostPage.tsx`, `next`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` and `Accounting by business sector index (15 Sector entries)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._