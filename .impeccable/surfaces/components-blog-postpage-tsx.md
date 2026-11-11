---
version: 1
slug: "components-blog-postpage-tsx"
primary_target: "components/blog/PostPage.tsx"
related_targets: ["components/blog","lib/content/posts"]
---

# Surface brief: the blog (post, blog index, category archive, author page)

Scope: one family of pages on one structure. Posts and news at their preserved WordPress paths (`/<category>/<slug>/`, two at root, `/news/<slug>/`), the blog index `/blog/` with `/blog/page/N/`, category archives at their root paths, author pages at `/author/<slug>/`. Content comes from Supabase through `lib/content/posts/`; bodies are sanitised HTML. Visitor mode: Read. Audience: Saudi owners, finance staff and students who arrive from Google with one question (what is a trial balance, how is zakat calculated). Job, owner-ranked (2026-11-11): read the article and jump between its sections; the trial is offered at the end only; the blog index leads with topics. Proof on hand: a named writer, a reviewing chartered accountant (Faisal Al-Mutairi, «محاسب قانوني ومراجع معتمد»), publish and review dates, the cover image. Constraints: paths, H1, body, dates, author and reviewer exactly as on WordPress; visible author, reviewer and "last reviewed" date; Article and BreadcrumbList JSON-LD, no FAQPage; fully static; no bios until real ones exist.

## Direction contract

THESIS: The ledger page. An article is written on a ruled ledger sheet: one vertical teal rule splits the sheet into a narrow margin, where the section numbers and the contents live, and a wide column where the article runs. It refuses the category default: a centred article column with a floating contents box and a sidebar of promotions.

OWN-WORLD: The Official Record, at its quietest. White sheet on Cool Paper; one teal margin rule the full height of the article; margin entries in slate with tabular numerals; a ledger heading across the top (date, topic, title) ruled above and below with hairlines; the reviewer's sign-off as a ruled line with the house double-ring mark. No teal fields, no guilloche, until the closing band. Orange only on the trial button in that band.

STORY: A reader lands from search, sees at once what the article covers and that an accountant reviewed it, reads, uses the margin to jump between sections, and at the foot meets related entries from the same topic and one trial offer.

FIRST VIEWPORT: 1440×900, RTL. Breadcrumb. The ledger heading spans the container: a slim row with the date, the topic (a link) and the reading time in slate, the H1 beneath it at display size across about 10/12, hairlines above and below. Under it the sheet: start 3/12 the margin, sticky, holding the numbered contents (01, 02, …) with the teal rule on its inner edge; end 9/12 the body column opening with the byline (written by, reviewed by with job title and the double-ring mark, last reviewed date), then the cover image, then the first paragraph. Phones: heading, then the collapsed "contents" row that opens the numbered list, then byline and cover (the contents row comes first so the owner's top-ranked path, jumping within the article, is on the first screen); the teal rule becomes a short rule beside each H2's number. Motion once, CSS only: the margin rule draws down 0.8s, the heading settles 0.5s; reduced motion shows the finished state. Signature interaction: each H2 carries its number in the margin; the entry for the section being read is inked in teal and its number repeats on the rule.

FORM: The ledger page, candidate 1 on an ordered list of 7 (ledger page, reviewed document, receipt roll, case file, gazette circular, study sheet, statement of account), dealt with the case file (lead) and the statement; the owner picked it. Seed key 51fc1508. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## The family

- Blog index: topics are the ledger's accounts. Ruled rows, one per topic, each with its name, its count and its three latest entries; then the latest entries of the whole blog as dated lines, paginated.
- Category archive: one account opened: its heading, intro when one exists, then dated entries, paginated.
- Author page: the person's name and title as the heading, then their entries. No bio until a real one is written.

## Unresolved

- Six records have no reviewer on WordPress (two posts, four news items).
- Author bios are placeholders on WordPress and were not imported.
