# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold: Next.js 16.4.3 (App Router, `cacheComponents` and `partialPrefetching` on), React 19.3, Tailwind CSS v4, TypeScript, pnpm. Hosting: Vercel (confirmed by the user on 2026-10-25). The bundled Next.js docs in `node_modules/next/dist/docs/` are the API authority; see `CLAUDE.md`.

## Users

Primary: owners and finance staff of small and mid-sized businesses in Saudi Arabia who must issue ZATCA-compliant e-invoices (Phase 2), record sales, purchases and expenses, and read financial reports without employing a full-time accountant. The current site names fifteen sectors it serves: restaurants and cafés, beauty salons, gyms and sports clubs, law firms, design offices, marketing agencies, logistics companies, travel agencies, car maintenance centres, e-commerce stores and apps, perfume shops, real estate and contracting, investment firms, printing and advertising, and childcare centres.

Secondary audiences present on the current site: accountants and bookkeepers who manage several clients; accounting students (a student package exists); merchants of integration partners (Foodics, Zid, Marn, Prexle); English-speaking owners and expatriate finance staff (the English mirror exists for them).

Language: Arabic first. English is a full mirror of the marketing pages; the blog is Arabic only today.

## Product Purpose

VoM (ڤوم / ﭬوم / فوم) is a cloud accounting program for Saudi SMEs: ZATCA-approved e-invoicing with QR codes, sales and purchases, expenses, inventory with reorder thresholds, fixed assets with depreciation, cost centres, a basic HR and payroll module, around fourteen financial reports, an iOS app, a public API, and an integrations marketplace. Plans on the current pricing page: Advanced at 270 SAR/month, Unlimited at 350 SAR/month, Business by contacting sales; annual billing gives two months free. Free trial without a credit card. These prices come from the public site and must be reconfirmed before launch.

The website's job is to win Arabic organic search for accounting, e-invoicing, zakat and tax queries in Saudi Arabia, and to convert that traffic into free-trial sign-ups at app.getvom.com or demo bookings. Success is measured by trial sign-ups and demo bookings from organic traffic, rankings preserved or improved through the migration, and passing Core Web Vitals.

## Positioning

"البرنامج المحاسبي الأسهل في السعودية": the easiest accounting program in Saudi Arabia. Supporting claims the site already makes: ZATCA-approved; built in Saudi Arabia since 2021 with a product update every two weeks; more than 4,000 users in the Kingdom; no credit card needed to try it; direct submission to ZATCA Phase 2. The name comes from the French "vous-mêmes" (yourselves, by yourself); the tagline on the English site is "Value of Money".

## Operating Context

- Sign-up and login happen on a separate app at app.getvom.com (Arabic and English registration pages). The website never handles accounts.
- Demo booking runs through Calendly (calendly.com/get-vom/vom-demo). Support runs through a Zendesk help centre, a Crisp chat widget, and WhatsApp (+966 50 230 9337).
- API documentation lives at app.getvom.com/en/docs/api.
- Integrations: Foodics and Marn (restaurant POS), Zid (e-commerce), Prexle (POS). Partnership news items exist for Nuqta, Mola and "ليزي وايت".
- Payment links are sold as "VoM Pay"; success and failure landing pages exist.
- Analytics today: Google Tag Manager container GTM-PS28X6L; TikTok pixel; PixelYourSite.
- Current site: WordPress with Elementor, Rank Math, Polylang and WP Rocket. Content inventory and SEO baseline are in `docs/content/` and `docs/seo/`.

## Capabilities and Constraints

- Arabic is served at the root (`/`), English under `/en`. Both must stay at those paths to preserve rankings and existing links.
- Content to migrate: about 230 Arabic blog posts, 15 sector pages in each language, 45 downloadable templates, 7 interactive calculators, 5 news items, an e-invoicing hub with 14 guides, pricing, features, about, contact, terms, student package, growth plan, 4 integration pages, a glossary.
- Content management: deferred by the user on 2026-10-25 ("we will integrate a CMS or build one a bit later, not the concern for now"). The site must read content through one swappable content layer so that storage can change later without touching pages.
- Undecided: whether the growth plan and student package pages stay; whether the blog gets an English edition; which CMS, if any.

## Brand Commitments

Binding, set by the user on 2026-10-25: keep the logo, the colours and the fonts.

- Logo: the teal hand-script "vom" wordmark (source today: getvom.com/wp-content/uploads/2023/10/vom-logo.png, 220×72 PNG). A vector master is needed from the team. Arabic wordmark form: ڤوم.
- Colours: teal #17BAA3 (primary; the logo colour), orange #FF7300 (call-to-action accent), blue #0694FF (secondary accent), near-black #020202, greys #54595F and #6B6B6B, light backgrounds #F4F7FC and #F4F4F4.
- Typeface: Effra by Dalton Maag, the only typeface, covering Arabic, Latin and Greek in Light (300), Regular (400), Medium (500) and Bold (700). Verified on 2026-10-25 from the font files' character maps. The files on the current server are Dalton Maag desktop TTFs; a web-font licence must be confirmed or purchased before the new site ships them (open item).
- Voice: Arabic, direct, second person singular; calls to action are "سجل الآن", "تجربة مجانية", "احجز عرضًا توضيحيًا". English copy on the current site reads as translated and should be rewritten natively.

## Evidence on Hand

- Claims on the site: 4,000+ users; ZATCA approval badge; customer logo walls on sector pages (image files only).
- Testimonials exist on the homepage but every attribution is the placeholder "Client One". They must not be reused until real names and businesses are supplied.
- Blog posts carry Article schema with a named author (most often Abass Sahrawi) and a "reviewed by" chartered accountant (Faisal Al-Mutairi). Other authors in WordPress: Abdulrahman Fani, Noura Alnafea, Islam, Maha, Miled Elias, Hamza Ait. Author bios are empty, and one is lorem ipsum.
- Team named on the about page: Michael Aswad (founder and CEO), Noura Alnafea (co-founder and COO), Yasmine Mokhtar (CTO).
- Absent and not to be invented: high-resolution product screenshots, case studies, press coverage, ratings or awards, an official ZATCA listing reference.

## Product Principles

1. Compliance is the reason to switch: show ZATCA readiness through real product detail, never through claims alone.
2. Easiest, not fullest: simplicity is the differentiator, so every page must feel lighter than a competitor's.
3. Arabic is the design language, not a translation: layout, type and copy are built right-to-left first, and English is a true mirror.
4. The content library is a product: blog, templates and calculators are acquisition assets with their own quality bar, not footer links.
5. Speed is part of trust: the site must be fast on Saudi mobile networks.

## Accessibility & Inclusion

Right-to-left and left-to-right parity in every component. Western Arabic digits (0–9) as on the current site, to be confirmed. Keyboard navigation with visible focus. WCAG 2.2 AA contrast: orange #FF7300 fails for small text on white, so it is reserved for buttons and large elements with dark text or paired with darker tints.
