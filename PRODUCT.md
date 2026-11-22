# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold: Next.js 16.4.3 (App Router, `cacheComponents` and `partialPrefetching` on), React 19.3, Tailwind CSS v4, TypeScript, pnpm. Hosting: Vercel (confirmed by the user on 2026-10-25). The bundled Next.js docs in `node_modules/next/dist/docs/` are the API authority; see `CLAUDE.md`.

## Users

Primary: owners and finance staff of small and mid-sized businesses in Saudi Arabia who must issue ZATCA-compliant e-invoices (Phase 2), record sales, purchases and expenses, and read financial reports without employing a full-time accountant. The current site names fifteen sectors it serves: restaurants and cafés, beauty salons, gyms and sports clubs, law firms, design offices, marketing agencies, logistics companies, travel agencies, car maintenance centres, e-commerce stores and apps, perfume shops, real estate and contracting, investment firms, printing and advertising, and childcare centres.

Secondary audiences present on the current site: accountants and bookkeepers who manage several clients; accounting students (a student package exists); merchants of integration partners (Foodics, Zid, Marn); English-speaking owners and expatriate finance staff (the English mirror exists for them).

Language: Arabic first. English is a full mirror of the marketing pages; the blog is Arabic only today.

## Product Purpose

VoM (ڤوم / ﭬوم / فوم) is a cloud accounting program for Saudi SMEs: ZATCA-approved e-invoicing with QR codes, sales and purchases, expenses, inventory with reorder thresholds, fixed assets with depreciation, cost centres, a basic HR and payroll module, fourteen financial reports, an iOS app (the Android app is not yet accepted by Google Play, so the site must not mention it; owner, 2026-11-16), a public API, and an integrations marketplace. Plans (confirmed by the owner on 2026-11-10; prices before 15% VAT): Flex, pay as you go, from 29 SAR/month for the first user, then 35 SAR per extra user, 0.10 SAR per transaction (sales invoices are priced separately and must never be shown as 0.10), 0.25 SAR per report export, monthly modules (ZATCA integration 10, each cost centre 10, assets 7, integrations 20), charged automatically when usage reaches 250 SAR, every Unlimited feature; Advanced at 2,700 SAR a year (5 users, 50 of each document, 1 invoice template, no assets or app integrations); Unlimited at 3,500 SAR a year, the most popular; Business by contacting sales (adds the API; dedicated technical support is in Unlimited too, owner 2026-11-19). Flex is the only monthly plan: Advanced and Unlimited are sold yearly only, with Business beside them (owner, 2026-11-19; they were 270 / 350 SAR a month with two months free yearly). Every plan includes inventory with several warehouses, HR and payroll, recurring invoices and entries, the 17 reports, and ZATCA Phase 1 and Phase 2 (Flex pays 10 SAR a month for its ZATCA integration) (owner, 2026-11-19). Free trial without a credit card, for 7 days (the e-invoicing guides' trial card says so; confirmed by the owner on 2026-11-10). A free plan also exists (owner, 2026-11-11): the accounting pillar `/برنامج-محاسبة/` describes it as ZATCA-compliant e-invoices, customer and sales records, simplified tax reports, and an upgrade path without data loss; its limits are not recorded yet, and the pricing page does not show it. The data lives in `lib/content/pricing/plans.ts`; reconfirm before launch.

VoM ships a built-in AI assistant (owner, 2026-11-11): the accounting pillar describes it explaining why the profit margin changed, which branch drains cash flow and which product stopped paying, and answering questions such as a sales forecast for next month or how sales changed between two months.

The website's job is to win Arabic organic search for accounting, e-invoicing, zakat and tax queries in Saudi Arabia, and to convert that traffic into free-trial sign-ups at app.getvom.com or demo bookings. Success is measured by trial sign-ups and demo bookings from organic traffic, rankings preserved or improved through the migration, and passing Core Web Vitals.

## Positioning

"البرنامج المحاسبي الأسهل في السعودية": the easiest accounting program in Saudi Arabia. Supporting claims the site already makes: ZATCA-approved; built in Saudi Arabia since 2021 with a product update every two weeks; more than 4,000 users in the Kingdom; no credit card needed to try it; direct submission to ZATCA Phase 2. The name comes from the French "vous-mêmes" (yourselves, by yourself); the tagline on the English site is "Value of Money".

## Operating Context

- Sign-up and login happen on a separate app at app.getvom.com (Arabic and English registration pages). The website never handles accounts.
- Demo booking runs through Calendly (calendly.com/get-vom/vom-demo). Support runs through a Zendesk help centre, a Crisp chat widget, and WhatsApp (+966 50 230 9337).
- API documentation lives at app.getvom.com/en/docs/api.
- Integrations: Foodics and Marn (restaurant POS), Zid (e-commerce). The old features page also listed ZenHR and Order; the owner confirmed on 2026-11-10 they are no longer integrations. Prexle (POS) was removed from the site on 2026-11-12 (owner): no page, link or mention of it. Partnership news items exist for Nuqta, Mola and "ليزي وايت". LazyWait ("ليزي وايت", restaurant POS) is a working integration in the app; since 2026-11-16 (owner) it has its own page at `/vom-lazywait/` (content from the app's integration code: sales, returns, payment methods, branches, customers), the owner-supplied logo, and a place in the footer, homepage tabs, features and pricing. It has no video. The site now counts 4 integrations. Customer count for the site is 5,000+ (owner, 2026-11-16). "Free plan" on the pillar page means the 7-day trial (owner, 2026-11-16).
- The features page was rewritten on 2026-11-16 from the app's own code (`~/Herd/vom`, billing in `~/Herd/vom_subscription`), not from the old WordPress page: 13 sections, 17 reports. Two owner decisions (2026-11-16) govern its wording and the site's: (1) the app's cost centres are called "branches" on the website, because visitors understand that word and the support team sets them up at onboarding; (2) the ZATCA link is described as "one click". **That is not in the app yet (enrolment is done by VoM's team); it is in active development. Reconfirm it is live before launch.** Things the app does not have, and the site must not claim: multi-currency, bank feeds, stock counts, OCR or photo capture in the web app, payroll allowances / GOSI / leave / advances, approval workflows, two-factor login.
- Payment links are sold as "VoM Pay"; success and failure landing pages exist.
- Paid campaigns land on `/digital-ads-2023-landing-page/` (Arabic, noindex, no site navigation). Its form is the site's first live lead form (2026-11-12): name and a Saudi mobile (05XXXXXXXX) required, email and business sector optional; leads land in the `leads` table as `digital-ads-2023-landing-page` and show in the admin under that name.
- The English ZATCA Phase 2 page `/en/zatca-e-invoicing-phase-2/` (the English navbar's e-invoicing item, paired with the Arabic e-invoicing hub) carries the second live lead form (2026-11-12): name and a Saudi mobile, both required; leads land as `zatca-e-invoicing-phase-2`. No GTM conversion is attached to it yet.
- VoM Pay result pages: after a payment the app sends the payer to `/vom-pay-success/` or `/vom-pay-failure/` (`/en/…` for English); those addresses must never change. The failure page shows the app's `?vom_pay_errors=` code and its message (1 general, 2 invoice already paid, 3 supplier no longer active on VoM Pay). The success page invites the payer to try VoM Pay and carries the third live lead form, `vom-pay-success` (name and Saudi mobile required, email optional).
- Analytics today: Google Tag Manager container GTM-PS28X6L; TikTok pixel; PixelYourSite.
- Current site: WordPress with Elementor, Rank Math, Polylang and WP Rocket. Content inventory and SEO baseline are in `docs/content/` and `docs/seo/`.

## Capabilities and Constraints

- Arabic is served at the root (`/`), English under `/en`. Both must stay at those paths to preserve rankings and existing links.
- Content to migrate: about 230 Arabic blog posts, 15 sector pages in each language, 45 downloadable templates, 7 interactive calculators (Arabic only, `/tools/`; built 2026-11-12), 5 news items, an e-invoicing hub with 12 guides (13 pages, Arabic only; built 2026-11-10), the accounting-software pillar `/برنامج-محاسبة/` (Arabic only; built 2026-11-11), pricing, features (built 2026-11-10), about, contact, terms, student package, growth plan, 4 integration pages, a glossary.
- Content management: deferred by the user on 2026-10-25 ("we will integrate a CMS or build one a bit later, not the concern for now"). The site must read content through one swappable content layer so that storage can change later without touching pages.
- Undecided: whether the growth plan and student package pages stay; whether the blog gets an English edition; which CMS, if any.

## Brand Commitments

Binding, set by the user on 2026-10-25: keep the logo, the colours and the fonts. On 2026-11-19 the owner replaced the logo and the typeface (below); the colours stand.

- Logo: the "VoM Accounting" lockup, the teal hand-script "vom" with "Accounting" in dark grey (owner, 2026-11-19; the vector master is public/brand/vom-logo.svg, about 5.6 to 1). It is used in every language. The bare "vom" wordmark (public/integrations/vom-mark.png) stays only where the lockup would be too small to read: beside partner logos on the integration pages and in the student-package letterhead. The square chevron (public/brand/vom-mark-512.png) stays as the favicon and the structured-data logo. The social share images in public/og still carry the old wordmark and Effra and are to be remade. Arabic wordmark form: ڤوم.
- Colours: teal #17BAA3 (primary; the logo colour; the only teal on the site, for text as well, with no tints or shades: owner, 2026-11-19), orange #FF7300 (call-to-action accent), blue #0694FF (secondary accent), near-black #020202, greys #54595F and #6B6B6B, light backgrounds #F4F7FC and #F4F4F4.
- Typeface: IBM Plex Sans for Latin text and every digit, IBM Plex Sans Arabic for Arabic (owner, 2026-11-19), in Light (300), Regular (400), Medium (500) and Bold (700). Both are OFL-licensed, so there is no web licence to buy. Effra (Dalton Maag), the face until then, is gone from the site and the repo, which closes its licence question.
- Buttons (owner, 2026-11-19): orange for the page's main call to action; every other button is the teal pill (white ground, teal border and text, filled teal with white text on hover).
- Voice: Arabic, direct, second person singular; calls to action are "سجل الآن", "تجربة مجانية", "احجز عرضًا توضيحيًا". English copy on the current site reads as translated and should be rewritten natively.

## Evidence on Hand

- Claims on the site: 4,000+ users; ZATCA approval badge; customer logo walls on sector pages (image files only).
- Testimonials: the homepage shows eight real quotes the owner supplied on 2026-11-22, each with the person ("أ. ناديه"), the business and its logo or the person's photo (`lib/content/testimonials.ts`); Ruwad Al Jawda Business Services has no logo yet. They carry no star ratings. The old site's quotes were attributed to the placeholder "Client One" and are not reused. One exception, by the owner's instruction (2026-11-12): the paid-campaign page `/digital-ads-2023-landing-page/` keeps its six quotes and their avatars exactly as the old page showed them, with the «Client One» name dropped and no attribution in its place.
- Blog posts carry Article schema with a named author (most often Abass Sahrawi) and a "reviewed by" chartered accountant (Faisal Al-Mutairi). Other authors in WordPress: Abdulrahman Fani, Noura Alnafea, Islam, Maha, Miled Elias, Hamza Ait. Author bios are empty, and one is lorem ipsum.
- The e-invoicing hub and its 12 guides show a byline (owner, 2026-11-10): written by Noura Alnafea (نورة النافع), reviewed by Faisal Al-Mutairi (فيصل المطيري), chartered accountant (محاسب قانوني); their WordPress publish and modified dates (2025-08-30 to 2025-09-05) are kept.
- Team named on the about page: Michael Aswad (Co-Founder & CEO), Noura Alnafea (Co-Founder & COO), Yasmine Mokhtar (Head of Development). Titles confirmed by the owner on 2026-11-02.
- Product screenshots: the old features page held 17 real VoM screens from October 2023 (up to about 2400 px wide), now in `public/features/` (2026-11-10); newer ones would be welcome if the app has changed.
- Absent and not to be invented: case studies, press coverage, ratings or awards, an official ZATCA listing reference.

## Product Principles

1. Compliance is the reason to switch: show ZATCA readiness through real product detail, never through claims alone.
2. Easiest, not fullest: simplicity is the differentiator, so every page must feel lighter than a competitor's.
3. Arabic is the design language, not a translation: layout, type and copy are built right-to-left first, and English is a true mirror.
4. The content library is a product: blog, templates and calculators are acquisition assets with their own quality bar, not footer links.
5. Speed is part of trust: the site must be fast on Saudi mobile networks.

## Accessibility & Inclusion

Right-to-left and left-to-right parity in every component. Western Arabic digits (0–9) as on the current site, to be confirmed. Keyboard navigation with visible focus. WCAG 2.2 AA contrast, with one owner exception (2026-11-19): teal #17BAA3 is used for text, links and the secondary button although it measures about 2.4:1 on white (and white on it the same). Orange #FF7300 fails for small text on white, so it is reserved for buttons and large elements with dark text or paired with darker tints.
