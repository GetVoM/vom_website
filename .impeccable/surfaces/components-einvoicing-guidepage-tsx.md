---
version: 1
slug: "components-einvoicing-guidepage-tsx"
primary_target: "components/einvoicing/GuidePage.tsx"
related_targets: ["components/einvoicing","lib/content/einvoicing/index.ts","content/e-invoicing"]
---

# Surface brief: the e-invoicing hub and its 12 guides (`/الفوترة-الإلكترونية/…`)

Scope: thirteen Arabic-only pages, the hub `/الفوترة-الإلكترونية/` and twelve guides under it, served by the catch-all route from `lib/content/einvoicing/` with bodies in `content/e-invoicing/*.mdx`; visitor mode Read. Audience: owners, accountants and finance staff of Saudi SMEs who must comply with ZATCA e-invoicing (Phase 2), arriving from searches such as «الفاتورة الإلكترونية», «ربط الفاتورة الإلكترونية مع هيئة الزكاة», «غرامة الفاتورة الإلكترونية», from the header's E-invoicing link, or from one guide to another. Job: read a full guide comfortably, see where it sits in the set, move to the next or a related guide, then start the 7-day free trial or book the free 15-minute compliance call. Content: the old pages' text, headings, images, tables and FAQs one to one (same H1, same body, same SEO title and description); character fixes only. Constraints (owner, 2026-11-10): Arabic only (hreflang `ar` + `x-default`); the old lead form is replaced by the offer line with a button to the Calendly booking; a visible byline «كتابة: نورة النافع · مراجعة: فيصل المطيري، محاسب قانوني · آخر تحديث …» plus Article schema with author, reviewer and the WordPress dates; the trial card keeps «ابدأ بتجربة مجانية لمدة 7 أيام»; no FAQPage schema; every slug kept byte for byte.

## Direction contract

THESIS: The thirteen pages are one card catalogue on e-invoicing. The hub is the drawer: on a teal field, twelve index cards filed behind four topic dividers. Every guide is one card, pinned beside its title with its catalogue entries (number, topic, reading time, writer, reviewer, last update, related cards), and the same catalogue runs down every page's rail. It refuses the category default: a blog listing of thumbnail cards, and long posts with a "related posts" row bolted on.

OWN-WORLD: The Official Record unchanged: paper, one slanted teal guilloche field (hub only), double-hairline doc-frames, Effra only, tabular teal-700 numerals, orange only on the trial Register. New atoms: the index card (a doc-frame with a numbered head, `03 · الأساسيات`, and ruled key/value lines like pricing's Flex rates), the topic divider (a paper tab standing above its cards), the two-level catalogue rail (topics, then cards, then the current card's sections).

STORY: An owner searching «الفاتورة الإلكترونية» lands on a guide and sees at once that it is card 03 of a twelve-card file, who wrote it and which accountant reviewed it; reads with the catalogue at hand; follows the next card or a related one; on the hub sees the whole file in one view; starts the 7-day trial from the Phase 2 card or books the free 15-minute compliance call.

FIRST VIEWPORT: At 1440×900, RTL. Guide: breadcrumb, then the H1 at display-reading scale with the lede on the start 8/12 and the guide's index card pinned on the end 4/12; below a paper-200 hairline the catalogue rail begins on the start side and the text on the end side. Hub: breadcrumb, H1, lede and the hub's own card (00) above a full-bleed teal guilloche field with a slanted top edge, four topic dividers standing across the 1280 container with their cards filed under them. Motion once, CSS only: on the hub the cards file into their dividers (0.6 s rise, 0.06 s apart, ease-out-quint); on a guide the pinned card settles in. Reduced motion shows the finished state.

FORM: Index cards, candidate 6 on an ordered list of 7 (chaptered handbook, compliance route, dossier tabs, invoice anatomy, answer first, index cards, timeline spine), dealt and chosen by the owner. Seed key 461575f9. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
