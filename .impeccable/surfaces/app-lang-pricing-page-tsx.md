---
version: 1
slug: "app-lang-pricing-page-tsx"
primary_target: "app/[lang]/pricing/page.tsx"
related_targets: ["components/pricing/PricingPage.tsx","lib/content/pricing/index.ts"]
---

# Surface brief: pricing (`/pricing/` and `/en/pricing/`)

Scope: the pricing page in both locales, built from `lib/content/pricing/`; visitor mode Persuade. Audience: owners and finance staff of Saudi small and medium businesses comparing what VoM costs, arriving from searches such as "أسعار ڤوم" or "باقات ڤوم", from the header's Pricing link, or from the homepage's closing certificate. Job: see all four plans and their prices at once, understand what more money buys, see what every plan shares, get the VAT and Flex billing answers, then register on app.getvom.com (no credit card) or contact sales for Business. Proof and content: only the old pricing page (three plans, their limits and the ✓/✗ matrix) plus the owner's Flex facts. Constraints (owner, 2026-11-10): Flex (المرنة) is new: 29 SAR a month for the first user, 35 per additional user, 0.10 per transaction (any document: sales invoice, purchase bill, journal entry…), 0.25 per export (a report to PDF or Excel), charged automatically when usage reaches 250 SAR, every Unlimited feature included; prices shown before 15% VAT; the annual switch shows 2,700 / 3,500 SAR a year (two months free); Advanced 270 (5 users, 50-document limits), Unlimited 350 ("most popular"), Business by contacting sales are all current. English lives at the clean `/en/pricing/`; `/en/pricing-en/`, `/pricing-en/` and `/pricing-ar/` 301 to the canonical pages.

## Direction contract

THESIS: Four plans as four official sheets laid on the teal field, read the way a business compares quotations: price ruled off with the double teal underline, then what sets each plan apart; below, one honest ledger of only the rows where plans differ. It refuses the category default: glossy equal cards over a fifty-row checklist of identical ticks.

OWN-WORLD: The Official Record unchanged: paper, one slanted teal guilloche field, double-hairline doc-frames, Effra only, small pills, orange only on the one primary Register. New atoms: the plan sheet (a doc-frame: name, price at offer-figure scale over the double teal rule, a short ticked list, its button); the "most popular" seal (paper disc in the house double-ring recipe) stamped on Unlimited; the billing switch (a two-option pill of real radios); the comparison ledger (a ruled table with pinned plan heads, CSS-drawn ticks and dashes); the "in every plan" sheet; the Saudi riyal sign drawn as a CSS mask.

STORY: An owner searches "أسعار ڤوم" or clicks Pricing, sees every plan and price at once, flips monthly or annual, sees Flex start at 29, scans the ledger to learn what more money buys, confirms what every plan shares, reads the VAT and Flex billing answers, then registers (no card needed) or contacts sales for Business.

FIRST VIEWPORT: At 1440×900, RTL: a paper band with breadcrumb, the H1 "أسعار باقات ڤوم" at display-reading scale, the lede, the billing switch and the no-card note; below it a teal guilloche field with a slanted top edge, full bleed, holding four sheets across the 1280 container in the order Flex, Advanced, Unlimited, Business from the start (right). Unlimited sits 1.5rem higher, with the seal on its top start corner and the only orange Register; the VAT note in white under the sheets. Amended 2026-11-10 after the owner added Flex's module rates mid-build: the first viewport holds the band and the four sheets down to their names, figures and double rules (figures on one baseline); the ticked lists, the buttons and the VAT note continue just below the fold, because Flex's seven rate lines and Advanced's five limits set the shared body row, and cutting them would cut owner facts. Signature motion once on load, CSS only, ease-out-quint: the sheets rise onto the field one after another (0.7 s each, 0.08 s apart, from 0.1 s), then the seal stamps in (0.45 s from 0.75 s); reduced motion shows it finished. Below 1024 px two across; below 640 px stacked.

FORM: Plan sheets, candidate 2 on an ordered list of 7 (quotation, plan sheets, ledger first, growth staircase, Flex meter, plan receipts, plan seals), dealt (not the lead) and chosen by the owner. Seed key b7f81bb5. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
