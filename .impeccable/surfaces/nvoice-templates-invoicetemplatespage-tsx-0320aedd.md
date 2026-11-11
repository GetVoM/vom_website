---
version: 1
slug: "nvoice-templates-invoicetemplatespage-tsx-0320aedd"
primary_target: "components/invoice-templates/InvoiceTemplatesPage.tsx"
related_targets: ["components/invoice-templates","lib/content/invoice-templates"]
---

# Surface brief: the invoice templates page (`/templates/`, `/en/templates/`)

Scope: one bilingual page at `/templates/` and `/en/templates/` (`app/[lang]/templates/page.tsx`, copy in `lib/content/invoice-templates/`). The owner moved it there from `/نماذج-فواتير/` and `/en/sales-invoices/` mid-build (2026-11-11), and those 301 to it. The finish review shipped it: the entry numeral became the sheet serial (01–06, slate, a CSS counter hidden from assistive tech), and the hinge's arrow is a real sign-up link. Visitor mode: persuade; visitor mode Persuade, with a download task. Audience: Saudi shop and SME owners searching «نماذج فواتير مجانية», «نموذج فاتورة ضريبية», «عرض سعر» (English: free invoice templates). Job, owner-ranked (2026-11-11): sign-up first; the six free Word and PDF templates are the hook. Content: the old page one to one (H1, intro, the e-invoicing note, H2, six cards with their Arabic names; character fixes only); English mirrors the Arabic card names (owner) and is rewritten natively, files labelled "In Arabic". Proof on hand: the six templates' uncropped full-page renders, the old hero's two stacked sheets, and a real VoM tax invoice with its QR (sample data, from the features page, its lime accent recoloured to brand teal). Constraints: the twelve files keep their `/wp-content/uploads/2023/10/` URLs byte for byte; hreflang ar/en/x-default; no byline.

## Direction contract

THESIS: Paper or record. The page faces what you can download (a template, printed plain) against what VoM issues (a tax invoice with its QR, on the teal field), and the old note («these templates don't support e-invoicing») is the hinge between them. It refuses the category default: a thumbnail grid of free downloads with a sign-up banner bolted on.

OWN-WORLD: The Official Record. Paper side: Cool Paper ground, slate text, no teal, template sheets in a single hairline frame like prints laid on a desk. Record side: the slanted teal guilloche field bleeding to the end edge, the VoM invoice as a paper sheet in the double hairline, the house double-ring ZATCA seal. Rule: anything you take away is slate paper; anything that leads into VoM carries teal. Orange only on the sign-up.

STORY: An owner searching for a free invoice template sees, in one view, the templates and the reason they fall short (no e-invoicing), next to the invoice VoM would issue instead; they sign up, or scroll to the six sheets, download Word or PDF, and leave past a closing teal band that offers the trial once more.

FIRST VIEWPORT: 1440×900, RTL. Breadcrumb; the H1 across the top (start 7/12) with the intro beside it (end 5/12). Below, a three-part row: start 5/12 the old hero's two stacked sheets on paper with a slate «Word · PDF» line; a 2/12 hinge holding the note as a short bold statement over a perforated vertical rule, its arrow pointing at the record; end 5/12 the slanted teal field with the orange «سجل الآن», then the VoM tax invoice cut from the top through its totals, QR visible, the ZATCA seal stamped on its corner, captioned as sample data. Phones: paper, the hinge as a perforated horizontal rule, then the record. Motion once, CSS only: the paper sheets settle 0.7s from 0.1s, the record sheet lifts 0.8s from 0.3s, the seal stamps 0.45s from 0.95s, ease-out-quint; reduced motion shows the finished state. Signature interaction: every template has an empty «QR code» box; hovering or focusing its «إنشاء أونلاين» link fills that box with a teal QR mark and a tiny VoM seal, the paper previewing the record it becomes. The six templates follow as a two-up catalogue (sheet beside its entry: numeral, H3, Word and PDF with sizes, the teal create-online link), one-up below 1024px.

FORM: Paper or record, candidate 1 on an ordered list of 7 (paper or record, swatch fan, specimen wall, print tray, compliance check, sample book, stamped into an e-invoice), dealt with the specimen wall (lead) and stamped; the owner locked it. Seed key 95ca805d. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- The card names promise a tax invoice, an e-invoice and quotes; every file is the same sales-invoice form (owner: keep).
- The PDFs are 2.3 MB each (Illustrator editing data); slimming them would change the files.
