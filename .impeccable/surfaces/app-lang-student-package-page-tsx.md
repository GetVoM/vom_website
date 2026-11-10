---
version: 1
slug: "app-lang-student-package-page-tsx"
primary_target: "app/[lang]/student-package/page.tsx"
related_targets: ["components/student/StudentPage.tsx"]
---

# Surface brief: student package (Arabic `/student-package/`; English `/en/student-package/`)

Scope: the student package page in both locales; visitor mode Persuade. Audience: accounting students at Saudi universities, arriving from search ("برنامج محاسبة للطلاب") or sent by a lecturer, and the university departments that enrol them. Job: understand that the package is the real VoM, free, for practising what they learn in class; register as a student, or register a university through its form. Proof and content: only the old page (H1, lede, the free badge, five feature groups, the 14 reports with their icons, three benefits with their photos, the closing paragraph, both register links). Constraints: dictionaries hold the copy; Arabic typo fixes only, English rewritten natively; the owner confirmed every fact is current (2026-11-10); the buttons keep the sa.getvom.com short links (owner); the university form opens in a new tab; `/en/student-package-2/` and `/student-package-2/` are 301s to `/en/student-package/`; `/get-free-version/` 301s to `/` (owner). The four textbook concept lines and the hero entry are authored copy approved with the plan; the textbook column order (account wording first, then debit and credit amounts) is an open item for the owner to confirm.

## Direction contract

THESIS: Students know accounting from the textbook; the page shows each textbook concept beside what VoM does with it, and the first viewport proves it with one entry carried from the book into VoM. It refuses the category's free-plan hero over an icon feature grid.

OWN-WORLD: Official Record unchanged: paper, the slanted teal guilloche field, double-hairline frames, Effra only, small pills, orange only on the student Register. New atoms: the textbook spread (two paper pages on a spine: the textbook page in cool paper-100, printed in Slate with no frame; the VoM page white with the double-hairline doc-frame and teal accents); textbook notation (من حـ/ … إلى حـ/ … with the credit line indented and tabular amounts; English native: debited account flush, credited indented, explanation in parentheses); textbook forms (T-account pair, tax-invoice skeleton, subsidiary-ledger card, receipt voucher, drawn in HTML hairlines); the report index (14 reports as a book's index page, each beside its icon); the free seal (double ring, "مجانية", micro-label STUDENT PACKAGE · FREE).

STORY: The student sees the entry they learned in class, من حـ/ النقدية إلى حـ/ رأس المال, become a VoM journal record, and understands this is the real system, free; they register as a student, or a university registers through the second door. Below, every feature group pairs what they studied with what VoM does, then the 14 reports, then how the package helps them; the page closes on both doors.

FIRST VIEWPORT: At 1440×900, RTL: start 5/12 holds breadcrumb, H1 at display scale, lede, orange "سجّل الآن كطالب" and a secondary "سجّل كمنشأة جامعية" (new tab); end 7/12 a teal guilloche field cut by a slanted start edge, bleeding to the viewport end, holding the open spread (about 40rem): textbook page on the start side with the capital entry in notation, VoM page on the end side with a journal record (serial, date, lines, attachment chip, totals closed by the double teal rule, labelled demonstration data), the free seal stamped across the lower spine. Signature motion once on load, CSS only, about 1.4 s on ease-out-quint: the spread lifts onto the field, the VoM rows write in from the spine side, the totals' double rule draws, the seal stamps; reduced motion shows it finished. Below 1024 px: copy, then the field as a full-width panel with a slanted top edge; the pages stack, textbook above VoM, and the motion runs downward.

FORM: Textbook beside system, candidate 6 on an ordered list of 7, dealt lead and chosen by the owner. Seed key 3455213a. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
