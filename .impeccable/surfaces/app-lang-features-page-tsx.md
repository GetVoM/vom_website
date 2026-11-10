---
version: 1
slug: "app-lang-features-page-tsx"
primary_target: "app/[lang]/features/page.tsx"
related_targets: ["components/features/FeaturesPage.tsx","lib/content/features/index.ts"]
---

# Surface brief: features (`/features/` and `/en/features/`)

Scope: the features page in both locales, built from `lib/content/features/`; visitor mode Persuade. Audience: owners and finance staff of Saudi small and medium businesses checking whether VoM covers their work, arriving from the header's Features link, the homepage's "all features" links, the sector pages, or searches such as "مميزات برنامج محاسبة". Job: see every module and what it does at a glance, check the line they care about (invoices, purchases, stock, payroll, reports, permissions, integrations), see the real screen that proves it, then register on app.getvom.com or book a demo. Proof and content: only the old features page (11 modules, their lines, 17 real VoM screenshots from October 2023, three cut-out photos, the reports illustration and screen) plus the owner's additions of 2026-11-10: the Android app, the public API (Business plan) and VoM Pay payment links (facts from the kept VoM Pay post). Constraints (owner, 2026-11-10): integrations shown are Foodics, Zid, Marn and Prexle only (ZenHR and Order dropped); the Arabic SEO title is rewritten; English lives at `/en/features/`, which the live site already serves (`/en/features-en/` and `/features-en/` 301 there). Plan-dependent lines (the "unlimited" ones, ten templates, assets, integrations, the API) carry a marker to one note that links to the plan comparison, so no line overclaims for the Advanced plan.

## Direction contract

THESIS: The product as an official register of what it does: eleven numbered sections, every capability a ruled, numbered entry, the "unlimited" ones stamped «بلا حد» in the limit column, and each section's real screens attached beside it as sheets to page through. It refuses the category default: a bento wall of icon cards and marketing screenshots, or a long zig-zag of feature blurbs.

OWN-WORLD: The Official Record unchanged: paper, one slanted teal guilloche field, double-hairline doc-frames, Effra only, orange only on the primary Register. New atoms: the register sheet (a doc-frame contents list: number, module, entry count, ruled, with a total line); the register entry (a ruled row numbered 1.1, text, limit cell); the «بلا حد» stamp (a small double-ring ink stamp in teal-700, the seal recipe at entry scale); the attached sheets (a stack of paper sheets holding real screenshots, the top one paged off to show the next, with "attached 2 of 3"); the plan marker (a superscript dagger to one plan note).

STORY: An owner clicks Features, sees the whole register on the teal field beside the promise, jumps to the module they care about, reads its entries and sees which are unlimited, pages through the real screens that prove them, checks reports, integrations and support, then registers or books a demo from the close.

FIRST VIEWPORT: At 1440×900, RTL: the 1280 container splits about 5/7. Start side (right) on paper: breadcrumb, the H1 «مميزات ڤوم» at display scale, the subline at title scale, one body line, «سجل الآن» (orange, primary) and the demo link. End side: a slanted teal guilloche field bleeding to the viewport's end edge holds the register sheet, a doc-frame titled with the old page's own contents heading «المميزات التي تقدمها ڤوم», listing the eleven sections as links (number, title, entry count) down to the total line «11 قسمًا · 58 بندًا», where the house ZATCA seal («معتمد» / هيئة الزكاة والضريبة والجمارك, the homepage certificate's wording) is stamped, all inside the first viewport. Amended in the build: a «بلا حد» stamp on the total would have claimed every entry unlimited, which is untrue for the Advanced plan; the «بلا حد» stamps stay on the individual entries, qualified by the plan marker. On phones: the copy and the button first, then the field, with the sheet's first rows inside the first screen. Signature motion once on load, CSS only, ease-out: the register's rows rule in one after another, then the seal stamps onto the sheet's foot; reduced motion shows it finished. The one interaction: paging each section's attached sheets.

FORM: Feature register, candidate 3 on an ordered list of 7 (annotated screens, the app unfolded, feature register, paper trail, role desks, module switchboard, one spec sheet), dealt as the roll's lead and chosen by the owner. Seed key 0d87e8d1. Code-led (no image generation).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
