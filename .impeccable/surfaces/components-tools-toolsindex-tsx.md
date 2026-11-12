---
version: 1
slug: "components-tools-toolsindex-tsx"
primary_target: "components/tools/ToolsIndex.tsx"
related_targets: ["app/[lang]/tools/page.tsx","lib/content/tools"]
---

# Surface brief: the tools index (`/tools/`)

Scope: one Arabic-only page, `app/[lang]/tools/page.tsx` → `components/tools/ToolsIndex.tsx`, listing the seven calculators from `lib/content/tools/catalogue.ts` (groups, card titles, card lines), with covers from `lib/content/tools/covers.ts`. Visitor mode Operate (pick a tool). Audience: visitors from the header's «الأدوات المالية» group, the footer, the homepage VAT block and search for «أدوات مالية» / «حاسبات مالية». The old WordPress page was a bare archive (title «Tools - Vom», H1 «الأدوات المالية»): title, description and H1 are kept byte for byte (templates-index precedent); the intro and card lines are new copy, pending the owner's approval. JSON-LD CollectionPage + ItemList and BreadcrumbList; hreflang ar + x-default.

## Direction contract

THESIS: Cover plates. Each tool is a framed plate showing its own old cover, filed under its group, so the index reads as the set of instruments it is. It refuses the category default: a grid of identical icon cards with a calculator glyph on each.

OWN-WORLD: The Official Record on paper. Plates in the double-hairline doc-frame at the card radius, the image inside at the sheet radius; the name (item title, ink), one Slate line, a teal-700 "open" link with the arrow. The two tools with no old cover (discount, zakat) get a drawn plate: the teal guilloche field with the page's own worked example set as a white poster figure (discount «20%» and «1,000 ← 800»; zakat «2.5%»), the same language as the tool pages' bands. Group headings on paper-200 rules. Orange only in the close band.

STORY: The visitor sees all seven tools in three groups within a scroll, recognises the one they came for by its picture and name, and opens it; the trial band closes the page.

FIRST VIEWPORT: 1440×900 RTL. Breadcrumb, H1 and a two-line intro on the start 8/12. Then «الضريبة والتسعير» with its three plates three across. Payroll's single plate lies across the row (image on the start 7/12, words on the end 5/12); zakat's three plates three across. Phones: one plate per row. Motion once: the plates rise 1rem in reading order, 60ms apart, ease-out-quint; reduced motion shows them settled.

FORM: Cover plates, candidate 7 on an ordered list of 7 (instrument drawer on the field, live VAT first, formula register, keypad, receipt, tabbed single calculator, cover plates), dealt with the receipt and live VAT first; the owner locked it. Seed key bbbaca97. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- The SEO title «Tools - Vom» and description «Tools Archive - Vom» are kept; Arabic ones would rank better (owner's call).
- The covers carry their old titles as baked-in text, so a plate shows its name twice.
