# Graph Report - vom-website  (2026-11-19)

## Corpus Check
- 308 files · ~261,382 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .css 2, .csv 2)

## Summary
- 1998 nodes · 5172 edges · 109 communities (99 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a2da0e2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Locale
- calculators.tsx
- react
- [lang]/page.tsx
- InvoiceTemplatesPage.tsx
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
- config.ts
- leads.ts
- invoice-templates-assets.mjs
- Architecture decisions
- [slug]/page.tsx
- record.ts
- jsonld.ts
- LeadForm.tsx
- convert
- compilerOptions
- requireAdmin
- getvom.com on Next.js: design document
- AccountingGuidePage.tsx
- Accounting Software Pillar Guide (برنامج محاسبة)
- [...slug]/page.tsx
- actions.ts
- Phase 1: schema and content layer
- Design System: VoM website (getvom.com)
- next.config.ts
- forms.ts
- VoM Pay result pages: what changed from WordPress
- track
- useActiveSection
- invoice-templates/index.ts
- import-zatca-phase-2.mjs
- TermsPage.tsx
- signIn
- Tools: text changes from the WordPress pages
- Components
- extensions.ts
- import-vom-pay.mjs
- AboutPage.tsx
- getDictionary
- SectorPage.tsx
- Next.js 16.4.3 conventions digest
- features/index.ts
- dictionaries/types.ts
- Design directions for the new getvom.com
- SEO strategy for the getvom.com migration
- NotFound.tsx
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
- tools/index.ts
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
- Icon
- features/assets.ts
- Breadcrumb
- isLocale
- digital-ads-2023-landing-page/page.tsx
- analytics/server.ts
- next
- devDependencies
- Integrations.tsx
- TopClients.tsx
- breadcrumbJsonLd
- templates/page.tsx
- Numbers.tsx
- NavLoader.tsx
- feed/route.ts
- ref_node_url

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

## Communities (109 total, 10 thin omitted)

### Community 0 - "Locale"
Cohesion: 0.11
Nodes (26): metadata, HeaderProps, LocaleSwitchProps, ar, en, postDate(), MEDIA_URL, PostSection (+18 more)

### Community 1 - "calculators.tsx"
Cohesion: 0.07
Nodes (80): allEmpty(), CalcBand(), CalcProps, DiscountCalculator(), historyCache, historyDate, MarginCalculator(), NO_HISTORY (+72 more)

### Community 2 - "react"
Cohesion: 0.31
Nodes (13): DesktopNav(), NavGroup(), Header(), LocaleSwitch(), MobileMenu(), MobileMenuProps, NavAnchor(), MenuId (+5 more)

### Community 3 - "[lang]/page.tsx"
Cohesion: 0.21
Nodes (15): currentLocale(), generateMetadata(), HomePage(), Apps(), DocumentStack(), Faq(), Guilloche(), Hero() (+7 more)

### Community 4 - "InvoiceTemplatesPage.tsx"
Cohesion: 0.20
Nodes (8): invoiceTemplatesMetadata(), Template(), getInvoiceTemplates(), fileSize(), buildMetadata(), fallbackImage(), OG_LOCALE, site

### Community 5 - "ToolPage.tsx"
Cohesion: 0.10
Nodes (28): arabicOnly(), generateMetadata(), ToolsIndexRoute(), toolsCopy, Byline(), ogImage(), person(), toolMetadata() (+20 more)

### Community 6 - "import-wordpress.mjs"
Cohesion: 0.06
Nodes (55): 6. Images, fonts, scripts, args, authorByTerm, authorRows, BLOCKS, cacheDir, categoryByWpId, categoryRows (+47 more)

### Community 7 - "[lang]/layout.tsx"
Cohesion: 0.06
Nodes (48): AdminRootLayout(), metadata, CampaignLayout(), metadata, fontVariables, plexArabic, plexSans, GlobalNotFound() (+40 more)

### Community 8 - "IntegrationPage.tsx"
Cohesion: 0.13
Nodes (26): currentLocale(), FoodicsRoute(), generateMetadata(), currentLocale(), generateMetadata(), LazyWaitRoute(), currentLocale(), generateMetadata() (+18 more)

### Community 9 - "CompareTable.tsx"
Cohesion: 0.07
Nodes (31): Amount(), CellView(), HeadPrice(), RowHead(), pricingAr, pricingEn, Cell, cells (+23 more)

### Community 10 - "import-accounting-guide.mjs"
Cohesion: 0.10
Nodes (38): altFixes, cellJsx(), cleanText(), collectBlocks(), convert(), escapeJsx(), escapeMd(), figure() (+30 more)

### Community 11 - "sectors/index.ts"
Cohesion: 0.12
Nodes (23): ClientKey, eInvoicing, generalReading, sectorsAr, readingImage, sectorClients, sectorPhotos, attachments (+15 more)

### Community 12 - "import-tools.mjs"
Cohesion: 0.09
Nodes (29): cacheDir, counts, coverLines, covers, escapeJsx(), escapeMd(), imageRoot, images (+21 more)

### Community 13 - "import-einvoicing.mjs"
Cohesion: 0.07
Nodes (35): accountingGuideMdxComponents, einvoicingMdxComponents, Faq(), PhaseTwo(), components, altOverrides, figureReplacements, cacheDir (+27 more)

### Community 14 - "docs/README.md"
Cohesion: 0.17
Nodes (9): This is NOT the Next.js you know, Content inventory of getvom.com (WordPress), Decisions in `url-map.csv`, Migration mechanics, Platform today, Quality work after launch, Quality work before launch, What exists (+1 more)

### Community 15 - "FeaturesPage.tsx"
Cohesion: 0.15
Nodes (9): displaySize(), Entry(), entryCount(), EntryText(), Exhibits(), markWidth, PlanMark(), Section() (+1 more)

### Community 16 - "routes.ts"
Cohesion: 0.12
Nodes (24): accountingGuideEntry(), blogEntries(), einvoicingEntries(), pagePairEntries(), pages, sitemap(), sitemapIds, SitemapPage (+16 more)

### Community 17 - "GuidePage.tsx"
Cohesion: 0.09
Nodes (38): CatalogueRail(), BookingCard(), CatalogueField(), guideMetadata(), GuidePage(), ogImage(), railCard(), DrawerCard() (+30 more)

### Community 18 - "PayResult.tsx"
Cohesion: 0.10
Nodes (33): currentLocale(), generateMetadata(), VomPayFailureRoute(), currentLocale(), generateMetadata(), VomPaySuccessRoute(), noChange(), PayErrorCode() (+25 more)

### Community 19 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, @mdx-js/loader, @mdx-js/react, next, @next/mdx, @next/third-parties (+19 more)

### Community 20 - "PostEditor.tsx"
Cohesion: 0.12
Nodes (24): createUploadUrl(), PostInput, EditPostPage(), metadata, AdminBase, useAdminHref(), EditorIcon(), EditorIconName (+16 more)

### Community 21 - "import-campaign-images.mjs"
Cohesion: 0.22
Nodes (8): cacheDir, iconsAt, images, outDir, require, root, sharp, write()

### Community 22 - "supabase/types.ts"
Cohesion: 0.14
Nodes (15): ActionResult, AuthorsPage(), Fields(), metadata, CategoriesPage(), Fields(), metadata, RecordForm() (+7 more)

### Community 23 - "getToolBody"
Cohesion: 0.18
Nodes (20): ZATCA (Zakat, Tax and Customs Authority), Discount calculator article (/tools/حاسبة-الخصم/), Discount calculator lead (حاسبة-الخصم), Calculator id "discount", Zakat calculator article (/tools/حاسبة-الزكاة/), Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/), Zakat base calculator lead (حاسبة-الوعاء-الزكوي), Calculator id "zakat-base" (+12 more)

### Community 24 - "package.json"
Cohesion: 0.09
Nodes (22): eslintConfig, name, packageManager, private, version, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, eslint (+14 more)

### Community 25 - "Product"
Cohesion: 0.22
Nodes (12): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+4 more)

### Community 28 - "check-blog-urls.mjs"
Cohesion: 0.12
Nodes (23): node-html-parser, alternates(), base, check(), checkLanding(), checkLandingVariants(), checkPay(), checkPayLinks() (+15 more)

### Community 29 - "BlogIndex.tsx"
Cohesion: 0.30
Nodes (20): generateMetadata(), locale(), NewsRoute(), PreservedPathRoute(), authorMetadata(), AuthorPage(), BlogIndex(), CategoryPage() (+12 more)

### Community 30 - "config.ts"
Cohesion: 0.21
Nodes (19): currentLocale(), FeaturesRoute(), generateMetadata(), currentLocale(), generateMetadata(), PricingRoute(), featuresMetadata(), FeaturesPage() (+11 more)

### Community 31 - "leads.ts"
Cohesion: 0.17
Nodes (21): ALL, cell(), Column, formColumns(), GET(), Lead, LeadsPage(), metadata (+13 more)

### Community 32 - "invoice-templates-assets.mjs"
Cohesion: 0.11
Nodes (19): cacheDir, copyDownload(), hero, hsvToRgb(), imageDir, publicFiles, record, recordInvoice() (+11 more)

### Community 33 - "Architecture decisions"
Cohesion: 0.10
Nodes (19): disallow, named, robots(), generateSitemaps(), 10. Security headers, 11. Testing and quality gates, 12. Hosting and environments, 13. Backend services (blog, admin, leads) (+11 more)

### Community 34 - "[slug]/page.tsx"
Cohesion: 0.29
Nodes (8): generateMetadata(), generateStaticParams(), Props, resolve(), ToolRoute(), decode(), toolFromSlug(), toolStaticParams()

### Community 35 - "record.ts"
Cohesion: 0.14
Nodes (16): flushPostHogLogs(), posthogHost, posthogLogger, posthogLoggerProvider, Visitor, LeadFields, leadForms, LeadContext (+8 more)

### Community 37 - "jsonld.ts"
Cohesion: 0.26
Nodes (12): planIds, planPeriod, absolute(), articleJsonLd(), contactPageJsonLd(), guideJsonLd(), JsonLd, personNode() (+4 more)

### Community 38 - "LeadForm.tsx"
Cohesion: 0.14
Nodes (19): check(), Field, GtmFormSuccess, LeadForm(), LeadFormCopy, LeadFormProps, noChange(), OptionalEmail (+11 more)

### Community 39 - "convert"
Cohesion: 0.19
Nodes (20): boldQuestion(), cellJsx(), cleanText(), collectBlocks(), convert(), count(), cover(), figure() (+12 more)

### Community 40 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 41 - "requireAdmin"
Cohesion: 0.16
Nodes (14): PanelLayout(), Shell(), PanelLoading(), PreviewPage(), Loader(), content, inbox, Item (+6 more)

### Community 42 - "getvom.com on Next.js: design document"
Cohesion: 0.24
Nodes (11): Anti-goals (what would make this a failure even if it worked), Constraints, Decisions already made, Delivery shape, getvom.com on Next.js: design document, Goals, Intent, Left to the builder (+3 more)

### Community 43 - "AccountingGuidePage.tsx"
Cohesion: 0.15
Nodes (11): AccountingGuidePage(), partTitle(), sectorIcons, TrialCard(), ButtonLinkProps, Variant, accountingGuide, AccountingGuideModule (+3 more)

### Community 44 - "Accounting Software Pillar Guide (برنامج محاسبة)"
Cohesion: 0.13
Nodes (18): Accounting Software Pillar Guide (برنامج محاسبة), closing export (final word s-8), Cloud vs traditional accounting software comparison, Saudi accounting software comparison table (VoM, Qoyod, SkySoft, global, Excel), Microsoft Excel (spreadsheet accounting), Accounting software FAQ (4 visible questions), Free options: Excel templates, VoM free plan, printable invoice templates, Key Points summary (المختصر المفيد) (+10 more)

### Community 45 - "[...slug]/page.tsx"
Cohesion: 0.15
Nodes (15): generateMetadata(), generateStaticParams(), INVOICE_TEMPLATES_SEGMENT, Props, resolve(), splitPage(), accountingGuideMetadata(), categoryMetadata() (+7 more)

### Community 46 - "actions.ts"
Cohesion: 0.15
Nodes (21): authorInput, categoryInput, createPost(), deleteDraft(), fail(), optionalId, saveAuthor(), saveCategory() (+13 more)

### Community 47 - "Phase 1: schema and content layer"
Cohesion: 0.31
Nodes (18): resolveBlog(), 4. Content layer: one interface, swappable storage, Phase 1: schema and content layer, asLocale(), asType(), failed(), getAuthor(), getCategory() (+10 more)

### Community 48 - "Design System: VoM website (getvom.com)"
Cohesion: 0.10
Nodes (19): Colors, Design System: VoM website (getvom.com), Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 49 - "next.config.ts"
Cohesion: 0.11
Nodes (16): adminPath, csp, MEDIA_URL, mediaRedirects, nextConfig, POSTHOG_CSP, postLinkRedirects, retiredPaths (+8 more)

### Community 50 - "forms.ts"
Cohesion: 0.18
Nodes (11): clients, DIGITAL_ADS_FORM, gtmFormSuccess, sectorLabel, sectors, saudiMobile, normaliseSaudiMobile(), SAUDI_MOBILE (+3 more)

### Community 51 - "VoM Pay result pages: what changed from WordPress"
Cohesion: 0.25
Nodes (7): Arabic fixes, Form, Images, Kept byte for byte, Structure, The failure page's error codes, VoM Pay result pages: what changed from WordPress

### Community 52 - "track"
Cohesion: 0.20
Nodes (11): ReturnBar(), ExhibitStack(), ExhibitStackProps, ClosingCertificate(), Props, Testimonials(), Props, TestimonialsSlider() (+3 more)

### Community 53 - "useActiveSection"
Cohesion: 0.16
Nodes (13): ThumbIndex(), ThumbTab, MarginContents(), CatalogueRailProps, RailCard, RailTopic, ContentsEntry, TermsContents() (+5 more)

### Community 54 - "invoice-templates/index.ts"
Cohesion: 0.23
Nodes (10): invoiceTemplatesAr, invoiceTemplatesEn, heroSheets, InvoiceTemplate, invoiceTemplates, recordInvoice, TemplateFile, TemplateId (+2 more)

### Community 55 - "import-zatca-phase-2.mjs"
Cohesion: 0.14
Nodes (14): body, cacheDir, done, html, icons, images, mirror, outDir (+6 more)

### Community 56 - "TermsPage.tsx"
Cohesion: 0.33
Nodes (12): currentLocale(), generateMetadata(), TermsRoute(), Clause(), EmailLink(), keepParentheses(), Section(), termsMetadata() (+4 more)

### Community 57 - "signIn"
Cohesion: 0.53
Nodes (4): signIn(), LoginPage(), metadata, LoginForm()

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
Cohesion: 0.35
Nodes (8): ContactRoute(), currentLocale(), generateMetadata(), contactMetadata(), ContactPage(), Envelope(), Postmark(), getDictionary()

### Community 64 - "SectorPage.tsx"
Cohesion: 0.21
Nodes (15): currentLocale(), generateMetadata(), StudentRoute(), sectorMetadata(), SectorPage(), SectorSeal(), JsonLd(), benefitPhotos (+7 more)

### Community 65 - "Next.js 16.4.3 conventions digest"
Cohesion: 0.25
Nodes (8): 10. Gotchas when coding from 14/15 memory, 2. Rendering and caching model, 3. Routing for i18n, 5. Redirects at scale, 7. MDX, 8. Config worth enabling, 9. Production checklist and deployment, Next.js 16.4.3 conventions digest

### Community 66 - "features/index.ts"
Cohesion: 0.22
Nodes (11): featuresAr, ExhibitId, ModuleId, PartnerId, PhotoId, vomPayPost, featuresEn, FeaturedReport (+3 more)

### Community 67 - "dictionaries/types.ts"
Cohesion: 0.13
Nodes (13): en, AboutCharter, AboutIcon, AboutItem, GrowthFeature, GrowthIcon, GrowthPartner, IntegrationCopy (+5 more)

### Community 68 - "Design directions for the new getvom.com"
Cohesion: 0.20
Nodes (10): Brief as agreed with the owner, Colour roles (shared), Design directions for the new getvom.com, Standing exit, The three directions, Typeface, What happens after the pick, أ — الوثيقة (The Official Record) — the assigned lead (+2 more)

### Community 69 - "SEO strategy for the getvom.com migration"
Cohesion: 0.20
Nodes (10): 1. Goal and principle, 2. Baseline (crawled 2026-10-25), 3. Keyword clusters and the pages that own them, 4. Information architecture, 5. Technical SEO requirements, 6. Content migration rules, 7. Launch plan, 8. Measurement (+2 more)

### Community 70 - "NotFound.tsx"
Cohesion: 0.43
Nodes (5): LangNotFound(), metadata, copy, NotFound(), Ways()

### Community 71 - "features-images.mjs"
Cohesion: 0.28
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
Cohesion: 0.17
Nodes (9): 1. Breaking changes and renames in v16 (vs 13 to 15), AccentHeading, icon(), PageImage, zatcaPhase2, config, configured, proxy() (+1 more)

### Community 81 - "tools/index.ts"
Cohesion: 0.20
Nodes (9): csv, toolRows, ToolId, toolIds, ToolCover, toolCovers, MdxBody, ToolOutline (+1 more)

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

### Community 93 - "Icon"
Cohesion: 0.22
Nodes (11): Features(), Glimpse(), IconName, samples, Glyph(), Reports(), TextbookSpread(), Icon() (+3 more)

### Community 94 - "features/assets.ts"
Cohesion: 0.14
Nodes (12): apiDocs, exhibitSizes, moduleExhibits, moduleIds, modulePhotos, partnerIds, partnerMarks, partnerPaths (+4 more)

### Community 95 - "Breadcrumb"
Cohesion: 0.32
Nodes (9): englishOnly(), generateMetadata(), ZatcaPhase2Route(), Breadcrumb(), Crumb, Accent(), Icon(), zatcaPhase2Metadata() (+1 more)

### Community 96 - "isLocale"
Cohesion: 0.32
Nodes (10): BlogRoute(), generateMetadata(), locale(), BlogPageRoute(), generateMetadata(), generateStaticParams(), Props, resolve() (+2 more)

### Community 97 - "digital-ads-2023-landing-page/page.tsx"
Cohesion: 0.24
Nodes (7): DigitalAds2023Page(), metadata, DigitalAds2023(), CampaignImage, digitalAds2023, Testimonial, homeClients

### Community 98 - "analytics/server.ts"
Cohesion: 0.31
Nodes (7): AnalyticsEvent, AnalyticsEvents, Locale, Placed, captureServer(), getClient(), posthog-node

### Community 99 - "next"
Cohesion: 0.39
Nodes (4): Resources(), fmt(), VatCalculator(), next

### Community 100 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, node-html-parser, tailwindcss, @tailwindcss/turbopack, @types/mdx, @types/node (+3 more)

### Community 101 - "Integrations.tsx"
Cohesion: 0.48
Nodes (5): Integrations(), ExplorerItem, IntegrationsExplorer(), Logo(), Props

### Community 102 - "TopClients.tsx"
Cohesion: 0.47
Nodes (5): half, Row(), rows, TopClients(), tileLogo()

### Community 103 - "breadcrumbJsonLd"
Cohesion: 0.40
Nodes (7): currentLocale(), generateMetadata(), GrowthRoute(), GrowthDisc(), growthMetadata(), GrowthPage(), breadcrumbJsonLd()

### Community 104 - "templates/page.tsx"
Cohesion: 0.70
Nodes (4): currentLocale(), generateMetadata(), TemplatesRoute(), templatesIndexMetadata()

### Community 105 - "Numbers.tsx"
Cohesion: 0.60
Nodes (3): Numbers(), CountUp(), CountUpProps

### Community 106 - "NavLoader.tsx"
Cohesion: 0.50
Nodes (4): cellOn(), finder(), NAVIGATION_START, qrPath

### Community 108 - "ref_node_url"
Cohesion: 0.25
Nodes (5): png(), require, root, sharp, sizes

## Ambiguous Edges - Review These
- `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` → `Accounting by business sector index (15 Sector entries)`  [AMBIGUOUS]
  content/tools/zakat-base.mdx · relation: references

## Knowledge Gaps
- **26 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm`, `react-dom`, `remark-gfm` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 747 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Locale`, `calculators.tsx`, `react`, `[lang]/page.tsx`, `InvoiceTemplatesPage.tsx`, `ToolPage.tsx`, `[lang]/layout.tsx`, `IntegrationPage.tsx`, `CompareTable.tsx`, `import-einvoicing.mjs`, `FeaturesPage.tsx`, `routes.ts`, `GuidePage.tsx`, `PayResult.tsx`, `PostEditor.tsx`, `supabase/types.ts`, `package.json`, `BlogIndex.tsx`, `config.ts`, `leads.ts`, `invoice-templates-assets.mjs`, `Architecture decisions`, `[slug]/page.tsx`, `LeadForm.tsx`, `requireAdmin`, `AccountingGuidePage.tsx`, `[...slug]/page.tsx`, `actions.ts`, `next.config.ts`, `forms.ts`, `track`, `useActiveSection`, `TermsPage.tsx`, `signIn`, `AboutPage.tsx`, `getDictionary`, `SectorPage.tsx`, `NotFound.tsx`, `content/zatca-phase-2.ts`, `tools/index.ts`, `Icon`, `Breadcrumb`, `isLocale`, `digital-ads-2023-landing-page/page.tsx`, `Integrations.tsx`, `breadcrumbJsonLd`, `templates/page.tsx`, `NavLoader.tsx`?**
  _High betweenness centrality (0.254) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@tiptap/pm` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Locale` be split into smaller, more focused modules?**
  _Cohesion score 0.11051693404634581 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: VoM website (getvom.com)`, `useActiveSection`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `calculators.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06891385767790262 - nodes in this community are weakly interconnected._
- **Why does `ButtonLink()` connect `config.ts` to `react`, `[lang]/page.tsx`, `InvoiceTemplatesPage.tsx`, `IntegrationPage.tsx`, `CompareTable.tsx`, `import-einvoicing.mjs`, `FeaturesPage.tsx`, `GuidePage.tsx`, `PayResult.tsx`, `BlogIndex.tsx`, `AccountingGuidePage.tsx`, `[...slug]/page.tsx`, `Components`, `AboutPage.tsx`, `getDictionary`, `SectorPage.tsx`, `Icon`, `Breadcrumb`, `Integrations.tsx`, `breadcrumbJsonLd`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Zakat base calculator article (/tools/حاسبة-الوعاء-الزكوي/)` and `Accounting by business sector index (15 Sector entries)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._