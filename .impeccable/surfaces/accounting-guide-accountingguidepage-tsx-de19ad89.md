---
version: 1
slug: "accounting-guide-accountingguidepage-tsx-de19ad89"
primary_target: "components/accounting-guide/AccountingGuidePage.tsx"
related_targets: ["components/accounting-guide","lib/content/accounting-guide/index.ts","content/accounting-guide.mdx"]
---

# Surface brief: the accounting-software pillar (`/برنامج-محاسبة/`)

Scope: one Arabic-only page, `/برنامج-محاسبة/`, the site's pillar for «برنامج محاسبة», served by the catch-all route from `lib/content/accounting-guide/` with its body in `content/accounting-guide.mdx`; visitor mode Read, leaning Persuade. Audience: Saudi SME owners and finance staff choosing an accounting program, arriving from searches such as «برنامج محاسبة», «أفضل برنامج محاسبة في السعودية», «برنامج محاسبة معتمد من هيئة الزكاة», or from the footer. Job: understand what accounting software is and how to choose one, see where VoM stands, find their sector's page, then start the 7-day free trial or book the free 15-minute compliance call. Content: the old page's text, headings, images, tables, sector list and FAQ one to one (same H1 with «2025», same SEO title and description); character fixes only; the AI-prompt strips become text chips; the competitor table, the free plan section and the AI assistant section stay as written (owner, 2026-11-11). Constraints: hreflang `ar` + `x-default`; byline «كتابة: نورة النافع · مراجعة: فيصل المطيري، محاسب قانوني · آخر تحديث» with Article + WebPage `reviewedBy`; the lead form becomes the booking line to Calendly; no FAQPage schema; slug kept byte for byte.

## Direction contract

THESIS: The pillar is a bound handbook with a thumb index cut into its fore-edge. Eight tabs (00 the summary, 01–06 the chapters, 07 the closing word) stand off the contents sheet in the first view and stay on the page edge as you read, so a 4,300-word guide reads as eight short parts. It refuses the category default: a long blog post with a contents box and a sticky sidebar CTA.

OWN-WORLD: The Official Record unchanged: paper, one slanted teal guilloche field (hero) and one teal close band, double-hairline doc-frames, Effra only, teal-700 tabular numerals, orange only on the trial button. New atom: the thumb tab, a paper tab with a two-digit numeral, rounded on its outer side, standing off a sheet's fore-edge (the end edge in RTL); current tab pulled further out with a teal-600 edge and a folded-flag corner, read tabs ticked. Chapter plates reuse the register head (section numeral beside the H2 over a derived count line).

STORY: An owner searching «برنامج محاسبة» lands on the H1, sees a handbook of eight tabbed parts with its writer and reviewing accountant, jumps to the part they need (often 03 the comparison or 04 their sector), reads with the tabs marking where they are and what they have read, and ends at the teal close band with the trial button and the compliance call.

FIRST VIEWPORT: At 1440×900, RTL. Breadcrumb, then on the start 7/12 the H1 at display-guide scale, the hero line, the orange trial button and the three trust points as a ruled row with CSS icons. On the end 5/12 a slanted teal guilloche field bleeding to the viewport's end edge carries the contents sheet (doc-frame): «محتويات الدليل», eight rows (numeral, title, minutes), each row's thumb tab standing off the sheet's fore-edge onto the teal, and a byline foot (writer, reviewer, last update, reading time). Below the fold the reading grid starts: prose at a 56rem start-aligned measure, plates, figures, tables and the sector register spanning to the tab column. Motion once, CSS only: the sheet lifts 0.8s from 0.1s, then the eight tabs slide out of its edge 0.45s each from 0.45s, 0.06s apart, ease-out-quint. Reduced motion shows the finished state. Below 1024px the tabs become a sticky strip under the header.

FORM: Thumb-index handbook, candidate 5 on an ordered list of 7 (buyer's checklist, signed summary memo, three roads, index card 00, thumb-index handbook, proof first, sector directory), dealt with proof first and signed memo; the owner locked it. Raise from the declined cutting-bench challenger: state as a mark, read chapters ticked, current one flagged. Seed key 417ba534. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- The H1 keeps «2025»; the owner may want 2026.
- The free plan's limits are not in PRODUCT.md.
- The screenshots show the 2022 UI.
