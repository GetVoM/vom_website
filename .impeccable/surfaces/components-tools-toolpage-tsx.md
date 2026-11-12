---
version: 1
slug: "components-tools-toolpage-tsx"
primary_target: "components/tools/ToolPage.tsx"
related_targets: ["components/tools","lib/content/tools","content/tools","lib/tools"]
---

# Surface brief: the calculator pages (`/tools/<slug>/`)

Scope: seven Arabic-only pages on one template, `app/[lang]/tools/[slug]/page.tsx` → `components/tools/ToolPage.tsx`, copy in `content/tools/<id>.mdx` (imported one to one by `scripts/import-tools.mjs`, fixes logged in `docs/content/tools/text-changes.md`), metadata in `lib/content/tools/catalogue.ts`, arithmetic in `lib/tools/`. Visitor mode Operate, with a Read body. Audience: Saudi owners, accountants and individuals searching «حاسبة الضريبة», «حاسبة الزكاة», «حاسبة هامش الربح», «حساب الراتب», «حاسبة الخصم», arriving from search or from 24 blog links. Job: get the number, trust it, read the explanation if wanted, then start the trial. Owner rulings (2026-11-12): old fields, just working (no GOSI, no new modes); nisab = 85 g × a gold price the visitor types; VAT copy's 5% and old authority name corrected; byline kept (writer, reviewer Faisal Al-Mutairi, dates); images stored locally; no FAQPage schema; hreflang ar + x-default.

## Direction contract

THESIS: The answer as the poster. Each calculator is a full-width teal band: the fields sit on a paper sheet, and the answer stands beside them in large white tabular figures that change as you type. It refuses the category default: a small grey form in a sidebar box with a "Calculate" button and a result line under it.

OWN-WORLD: The Official Record. A paper title row (breadcrumb, H1 at the guide display steps, a byline line). The band is the slanted teal guilloche field, bled full width, white text (the owner's White-on-Teal Rule). The input sheet is a doc-frame paper sheet (double hairline, 0.75rem radius) with the house inputs. The answer: a white label, the poster figure (700, tabular, riyal sign through `.sar`), then the secondary figures in a row ruled by white hairlines, closed by the double white rule. Orange only on the trial button in the close band.

STORY: The visitor types and sees the answer at poster scale at once; the old labels and result sentences are kept, so the number reads in their words. Below, the article explains the rule with the page's own worked examples, a contents list on longer pages, the other tools, then the trial.

FIRST VIEWPORT: 1440×900 RTL. Title row: breadcrumb, H1 on the start 9/12, byline under it. Then the band: the sheet on the start 5/12 (title if the old widget had one, fields, the old button label), the answer on the end 7/12. Where the old copy puts a heading or intro before the calculator, it stays above the band. Adjacent calculators (margin) share one band behind a two-way switch; separated ones (salary) get a band each. Phones: sheet, then the answer; the button scrolls to the answer. Motion once: the sheet lifts onto the band (0.6s, ease-out-quint); reduced motion shows it settled.

FORM: The answer as the poster, candidate 6 on an ordered list of 7 (worksheet lines, instrument on the field, slip beside the reading, book spread, adding-machine tape, answer as the poster, index card), dealt with the tape (lead) and the instrument; the owner locked it. Seed key 0a66b6d0. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- Index SEO title «Tools - Vom» kept byte for byte; an Arabic title would rank better (owner's call).
- Salary keeps «نسبة الضرائب (%)», though Saudi Arabia has no income tax on salaries (owner: old fields).
- Empty fields start the poster at a muted 0.00 with a prompt; only VAT is prefilled (its old default, 2,500 at 15%).
