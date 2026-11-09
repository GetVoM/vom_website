---
version: 1
slug: "app-lang-terms-and-conditions-page-tsx"
primary_target: "app/[lang]/terms-and-conditions/page.tsx"
related_targets: []
---

# Surface brief: terms and conditions (Arabic `/terms-and-conditions/`, English `/en/terms-and-conditions/`)

Scope: the terms page in both locales, visitor mode Read. Audience: subscribers, prospects and VoM Pay merchants who open the page to check one thing (refunds, training, data, liability, fees) rather than read it through; payment partners who need a public terms URL. Job: find the clause fast, read it comfortably, link to it. Content: the old WordPress terms pages, each language with its own structure (Arabic folds "Access and Data Export" into البيانات, so clause numbers differ by language). Typo fixes only, no rewording (owner, 2026-11-09); every change is logged in `docs/content/legal/terms-text-changes.md`. Constraints: minimal, readability first (owner); no "last updated" date (owner, 2026-11-09); `/terms-and-conditions-ar/` is a 301 to `/terms-and-conditions/` (owner, 2026-11-09); the old page had no images, so none are added.

Open with the owner (raised 2026-11-09, undecided): the introduction's first sentence is cut off in both languages and names only one party, which the typo-only rule cannot repair; Arabic "خدمات المرافق" stands for "Escort services"; and the page HTML (Arabic about 263 KB, English about 223 KB, roughly 49 KB and 45 KB gzipped) is over the 100 KB budget because the 58 KB legal text is also inlined in the RSC payload, which needs an explicit owner exception or a decision.

## Direction contract

THESIS: The terms read as a well-set legal document: one column of text, every clause numbered and linkable, and a contents rail that always shows where you are. It refuses the category's grey wall of text under a banner, and the accordion that hides clauses from search and Ctrl+F.

OWN-WORLD: The Official Record world at its quietest: paper white, near-black ink, Effra only, paper-200 hairlines, teal-600 section numerals, teal-700 for the active contents entry. No teal field, no guilloche, no buttons. New atoms: hanging clause numbers in a narrow gutter that link to themselves, bold lead labels, a teal thumb that slides along a hairline track in the rail, a teal-50 wash on a linked clause.

STORY: The visitor arrives from the footer, a support link or search, reads the title, the section count and the notices email, picks a section in the contents, finds the clause by its bold label or number and can copy its link. A deep link lands on the clause, highlighted.

FIRST VIEWPORT: From 1024 px the page fills the site container (1280 px, aligned with the header; owner, 2026-11-09): breadcrumb, H1 at 3.5rem and the meta line across the full width from the start edge, ruled off by a hairline; below it the contents rail, 15rem, on the start side, sticky under the header, listing every section, and the text column filling the rest of the width, starting with the introduction. Below 1024 px: H1 2.5rem, meta, then a sticky bar under the header naming the current section with a button that opens the contents. Signature interaction: scroll-spy contents with the sliding thumb, and per-clause anchors.

FORM: Contents rail, option A of three layouts shown in the brainstorm companion, chosen by the owner on 2026-11-09. Owner-pinned, so no concept roll and no seed key. Code-led (no image generation in this session).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
