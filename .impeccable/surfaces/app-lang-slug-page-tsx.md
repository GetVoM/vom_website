---
version: 1
slug: "app-lang-slug-page-tsx"
primary_target: "app/[lang]/[...slug]/page.tsx"
related_targets: ["components/sectors/SectorPage.tsx","lib/content/sectors/index.ts"]
---

# Surface brief: sector pages (15 sectors × Arabic `/<arabic-slug>/` and English `/en/accounting-software-for-<sector>/`)

Scope: the 15 sector landing pages (restaurants, beauty salons, gyms, law firms, design offices, marketing agencies, logistics, travel, car maintenance, apps and e-commerce, perfume stores, real estate and construction, investment firms, printing and advertising, day care), in both locales, on one template fed by `lib/content/sectors/`; visitor mode Persuade. They are the site's vertical SEO pages, served by the catch-all `app/[lang]/[...slug]/page.tsx`. Audience: owners and managers of Saudi small and medium businesses in that trade, arriving from searches such as "برنامج محاسبة للمطاعم", from the homepage sector tiles or from the header's Sectors menu. Job: recognise a page made for their trade, see what VoM does for it, see businesses like theirs on VoM, get their questions answered, then register on app.getvom.com (no credit card) or book a demo. Proof and content: only the old pages (the sector photo, four sector features, real client logos, the FAQ, the Arabic article cards, the Arabic restaurants video). Constraints (owner, 2026-11-10): every H1 leads with the search phrase ("برنامج محاسبة لـ…" / "Accounting software for …"); Arabic SEO titles stay except printing's (it named marketing agencies) and e-commerce's (90 characters); Arabic copy gets typo fixes only; English keeps the old English page's own features and FAQs, rewritten natively; Arabic article cards link straight to each post's kept URL without UTM tags; Arabic slugs stay byte for byte; English `-2` / `-en` slugs and their unprefixed forms 301 to the clean `/en/accounting-software-for-<sector>/`. A section with no data drops out (clients, the video, the articles).

## Direction contract

THESIS: Every sector page carries its own seal, the sector's mark struck onto that sector's own photo on the teal field, so a restaurant owner lands on a page that is visibly theirs, then reads what VoM does for them as four numbered clauses. It refuses the category's sector template: a stock-photo hero over four icon cards and a logo strip with the noun swapped.

OWN-WORLD: The Official Record unchanged: paper, one slanted teal guilloche field, double-hairline frames, Effra only, small pills, orange only on Register. New atoms: the sector seal (paper disc, teal double ring with a heavy outer ring and a hairline inner ring, the sector pictogram as a CSS mask, the sector name in bold and the micro "ڤوم" / "VoM"); the clause sheet (one doc-frame, four numbered clauses on hairline rules, tabular numerals); client seals (each logo on a white disc in a hairline ring, the growth partner-seal grammar); the sector register (the other 14 sectors as small ringed pictograms with names, linking out); the close band's white seal.

STORY: A restaurant owner searches "برنامج محاسبة للمطاعم", lands on a page headed with exactly that, sees their trade's photo stamped with its seal, reads the lede and registers (no card needed) or books a demo. Below: four clauses of what VoM does for restaurants, the restaurants already on VoM, the questions owners ask, articles to read next, and every other sector; the page closes on Register.

FIRST VIEWPORT: At 1440×900, RTL: start 6/12 holds breadcrumb, the keyword-led H1 at display scale, lede, orange Register, ghost "احجز عرضًا توضيحيًا" and the "no credit card" note; end 6/12 a teal guilloche field cut by a slanted start edge, bleeding to the viewport end, holding the sector photo (bezel removed) in a paper doc-frame about 34rem wide, with the seal (about 9.5rem) overlapping the frame's lower start corner, bridging photo and copy. Signature motion once on load, about 1.2 s, ease-out-quint: the photo lifts onto the field, then the seal stamps in (scale 1.12 to 1, opacity); reduced motion shows it finished. Below 1024 px: copy, then the field as a panel with a slanted top edge.

FORM: Sector seal, candidate 5 on an ordered list of 7, dealt lead and chosen by the owner. Seed key 1971f24c. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
