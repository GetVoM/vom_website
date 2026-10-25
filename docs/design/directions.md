# Design directions for the new getvom.com

Date: 2026-10-25. Mockups: https://claude.ai/artifact/7GCrRoKwJgTDsGhwWeJNwd (private canvas, three artboards, 1440 px wide, Arabic homepage only). The chosen direction becomes the direction contract in the surface brief and, after the build, `DESIGN.md`.

## Brief as agreed with the owner

- Goal: a whole new, modern, gorgeous site. The current site is dated. No reference sites; the bar is "gorgeous".
- Pinned by the owner: the logo, the colours and the fonts stay.
- Mode of the homepage: Persuade. The visitor is a Saudi small-business owner who must become ZATCA-compliant and wants accounting without an accountant. The page must make the offer intelligible in one line, show the mechanism (sale → e-invoice with QR → reported to ZATCA → report), and expose one primary action: start the free trial.
- Shared across all directions: Arabic right-to-left first; teal is the structural ink; orange appears only on the single primary action per view; blue is secondary and rare; no gradients, glass, emoji or stock-photo heroes; real content from the current site (sectors, integrations, article titles, plan prices) and labelled demonstration data in product mock-ups.

## Typeface

Correction (2026-10-25, later the same day): an earlier version of this document claimed the Effra files on getvom.com had no Arabic glyphs. That was wrong; a crude check misread the font tables. Parsing the character maps shows every Effra file (Light, Regular, Medium, Bold) carries the Arabic block and presentation forms, including ڤ, and the browser renders Arabic with them. Effra is therefore the single typeface for Arabic, Latin and digits, as the owner asked.

The mockups on the design canvas were set in Almarai for Arabic before this was verified; the coded site uses Effra throughout.

Open item: the files on the server are Dalton Maag desktop TTFs (copyright 2016, modification requires written permission). A web-font licence must be confirmed or purchased before launch, and the TTFs should then be converted to subset WOFF2 under that licence.

## Colour roles (shared)

| Role | Value | Use |
|---|---|---|
| Teal, brand | `#17BAA3` | Structural ink: rules, seams, badges, headings on dark, the one drenched band |
| Teal, deep | `#0B5248` / `#0F6B5E` | Text on light that must read as brand; dark panels |
| Teal, tints | `#BFEAE2`, `#EEFAF7` | Highlight rows, secondary bars |
| Orange | `#FF7300` | The primary call to action only, plus one signal line per direction (ledger margin, frieze rule, today marker) |
| Blue | `#0694FF` | Rare: frieze dots, links in the blog system |
| Ink | `#020202` | Body text and headlines |
| Greys | `#54595F`, `#6B6B6B`, `#9AA3AD` | Secondary text, labels |
| Light | `#F4F7FC`, `#E6EEF3` | Panels, hairlines |

Orange on white fails AA for small text; it is never used for text under 24 px.

## The three directions

### أ — الوثيقة (The Official Record) — the assigned lead

World: the paper of Saudi officialdom. Commercial registration certificates, ZATCA certificates, Absher printouts: double-rule frames, bilingual labels (Arabic above, small English below), serial numbers, a seal, a QR block.
First viewport: headline on the right, an issued "certificate of compliance" for a sample business on the left, standing in front of one unbroken teal field that bleeds off the page. The certificate is the proof: VAT number, status "متوافق مع المرحلة الثانية", last reported invoice, QR, seal.
Signature elements: the month strip (31 ticks, teal where invoices were reported, orange for today), the three-step flow drawn as framed nodes with arrows, the deep-teal ZATCA band.
What it says: this is the compliant, official choice; nothing here is improvised.
Honest risk: can tip into bureaucratic coldness if seals and frames multiply. The build must keep headline scale and white space generous and limit document chrome to the hero and the pricing frame.

### ب — الدفتر (The Ledger) — Impeccable's pick

World: ledger paper. Teal ruled lines every 36 px across whole sections, an orange margin rule on the right, tabular numerals, the debit/credit/balance grammar.
First viewport: a light-weight headline ("دفتر حسابات يكتب نفسه.") beside a live ledger card whose last entry is the invoice just reported to ZATCA. The numbers are the hero.
Signature elements: the steps as numbered ledger entries, three report sheets (income statement, balance sheet, VAT return) drawn on ruled paper, integrations as ledger lines.
Signature motion for the build: rows post themselves on load, one orchestrated sequence, numbers settle, the ZATCA badge lands last.
What it says: accounting that writes itself; precision without effort.
Honest risk: a ledger can read as old-fashioned. The modernity comes from type scale, restraint and motion; if those slip, it looks like a template with lines on it. It is also the direction most accounting products could plausibly ship, so it is the most familiar of the three.

### ج — البلاط (Najd Tiles) — the fused challenger

World: a tiled hall. The seed dealt an azulejo station hall (cobalt scenes on white tiles, seams running through every scene, patterned friezes separating panels); translated into Saudi material, it becomes a Najdi tile and frieze system in teal on white, with orange and blue allowed only inside the frieze borders.
First viewport: a centred headline at poster scale, then a product dashboard composed on a visible 80 px tile grid whose seams run through every panel; one panel (ZATCA status) is deepened to dark teal as the active tile.
Signature elements: friezes as section breaks, the fifteen sectors as a tile wall, integrations in cartouche frames, a drenched teal band for the ZATCA message.
What it says: built for Saudi businesses, by Saudis, with pride.
Honest risk: ornament becomes template the moment the grid discipline is broken. Every layout decision must snap to whole tiles; no element may straddle a seam casually.

## Standing exit

The category standard (hero with screenshot, logo strip, feature cards, pricing table, FAQ) is always available if the owner prefers the familiar path. If chosen, we pick two or three products whose craft sets the bar and execute that convention at full fidelity.

## What happens after the pick

1. Record the direction contract (thesis, own-world, story, first viewport, form, finish) in the surface brief for the homepage.
2. Define the token system in `app/globals.css` and build the homepage first viewport in code, then the rest of the homepage, then the page templates (sector, post, template, tool, pricing).
3. Review desktop and mobile in both locales, run the design detector, fix in one batch.
4. Write `DESIGN.md` from the built system.
