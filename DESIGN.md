---
name: VoM website (getvom.com)
description: Saudi cloud accounting, presented as an official record being issued, Arabic first and mirrored in English.
colors:
  teal: "#17baa3"
  teal-50: "#eefaf7"
  teal-100: "#ddf5f0"
  teal-200: "#bfeae2"
  teal-300: "#8edccf"
  teal-600: "#13937f"
  teal-700: "#0f6b5e"
  teal-800: "#0b5248"
  teal-950: "#052a25"
  orange: "#ff7300"
  orange-50: "#fff2e6"
  orange-600: "#d96200"
  ink: "#020202"
  ink-700: "#54595f"
  ink-500: "#6b6b6b"
  ink-300: "#9aa3ad"
  paper: "#ffffff"
  paper-100: "#f4f7fc"
  paper-200: "#e6eef3"
  paper-300: "#d7e3ec"
  reading-ink: "color-mix(in oklab, #020202 86%, white)"
typography:
  display:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "3rem (sm 4rem, lg 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  display-two-tier:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "2.5rem (sm 3.25rem, lg 3.75rem)"
    fontWeight: "300 then 700"
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  display-reading:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "2.5rem (lg 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.875rem (sm 2.25rem, lg 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.375rem (lg 1.5rem)"
    fontWeight: 700
    lineHeight: 1.35
  item-title:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.375
  body:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-reading:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.0625rem (lg 1.125rem)"
    fontWeight: 400
    lineHeight: "1.75 (Arabic 1.85)"
  lede:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "1.0625rem (sm 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  figure:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "3rem (sm 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tnum"
  figure-offer:
    fontFamily: "Effra, Segoe UI, SF Arabic, Geeza Pro, system-ui, sans-serif"
    fontSize: "5.5rem (sm 7rem, lg 8rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
rounded:
  pill: "999px"
  card: "1.25rem"
  tile: "1rem"
  sheet: "0.75rem"
  focus: "4px"
spacing:
  gutter: "16px"
  stack: "1.5rem"
  section: "4rem"
  section-band: "5rem"
  section-home: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.orange-600}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.paper-100}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 8px"
    height: "44px"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal-800}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-inverse-hover:
    backgroundColor: "{colors.teal-50}"
  input-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "64px"
  doc-frame:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "28px"
  link-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "0 16px"
    height: "64px"
  link-tile-hover:
    backgroundColor: "{colors.teal-50}"
  partner-seal:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "4.5rem (lg 5.5rem)"
  icon-tile:
    backgroundColor: "{colors.teal-100}"
    textColor: "{colors.teal-700}"
    rounded: "{rounded.tile}"
    size: "48px"
  contents-rail:
    textColor: "{colors.ink-700}"
    width: "15rem"
  clause:
    textColor: "{colors.reading-ink}"
    rounded: "{rounded.sheet}"
    padding: "8px 12px"
  video-screen:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "10px"
    width: "36rem"
  play-seal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal-700}"
    rounded: "{rounded.pill}"
    size: "3.75rem (sm 4.5rem)"
  video-pill:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  video-pill-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal-800}"
  posting-ledger:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "8px 20px 24px (sm 12px 40px 32px, lg inline 48px)"
  letterhead-lockup:
    height: "2.25rem (lg 2.75rem)"
  partner-plate:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "0 16px (sm 0 24px)"
    height: "4rem (sm 4.5rem)"
  integration-tile:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "24px"
  integration-tile-hover:
    backgroundColor: "{colors.teal-50}"
  textbook-page:
    backgroundColor: "{colors.paper-100}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.card}"
    padding: "1.25rem 1.25rem 1.5rem (sm 1.5rem 1.5rem 1.75rem)"
  textbook-page-vom:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.25rem 1.25rem 1.5rem (sm 1.5rem 1.5rem 1.75rem)"
  textbook-form-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-500}"
    rounded: "{rounded.sheet}"
    padding: "0.875rem 1rem 1rem"
  report-index:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.25rem (sm 1rem 2.5rem)"
  free-seal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal-700}"
    rounded: "{rounded.pill}"
    size: "6.5rem"
  free-seal-white:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "7.5rem (sm 8.5rem)"
  attachment-chip:
    backgroundColor: "{colors.teal-50}"
    textColor: "{colors.teal-800}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  sector-seal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.teal-700}"
    rounded: "{rounded.pill}"
    size: "7.75rem (lg 9.5rem)"
  sector-seal-white:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "8.25rem"
  photo-plate:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "10px"
    width: "34rem"
  clause-sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "0.5rem 1.25rem (lg 0.75rem 2.5rem)"
  feature-tile:
    backgroundColor: "{colors.teal-50}"
    textColor: "{colors.teal-700}"
    rounded: "{rounded.sheet}"
    size: "2.75rem"
  client-seal:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    width: "7rem"
  register-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "0.5rem (lg 1rem 0.5rem)"
    height: "3.75rem"
  register-link-hover:
    backgroundColor: "{colors.teal-50}"
---

# Design System: VoM website (getvom.com)

## Overview

**Creative North Star: "The Official Record" (الوثيقة)**

Every page is a document VoM issues to the visitor. The ground is white paper; authority arrives as one unbroken field of brand teal engraved with a fine guilloche, the lattice of certificates and banknotes. Paper objects (invoices, certificates, a sealed envelope, framed sheets) sit on that field with the precision of a government form: rounded double-hairline frames, double-ring seals, serial numbers, tabular numerals, a bilingual English line under the Arabic one. Effra sets everything, Arabic, Latin and digits alike, and the layout is built right-to-left first with every component mirrored for English.

The system is restrained by rule. Each page gets one signature idea (the document stack issuing itself on the homepage, the envelope opening on contact, the figures rolling on about, the scroll-spy contents on terms, the growth disc drawing its chart on the growth program, the screen lifting onto the field and its play seal stamping in on the integration pages, the textbook spread on the student package, where one entry as the textbook prints it faces the VoM record it becomes and the record writes itself in, the sector's own seal stamped onto its own photo on the fifteen sector pages) and the rest of the page stays quiet around it. Orange is the single hot colour and marks the one thing to press or the one "now". Buttons are small, precise pills. Sections alternate paper, the light paper-100 grey, and teal bands; depth is mostly tonal, with long teal-tinted shadows reserved for paper objects lifted off a field.

The reading register, introduced by the terms and conditions page, is the same world at its quietest: no field, no guilloche, no buttons, only paper, near-black ink, paper-200 hairlines and teal used as a marker on numerals and the active place in the contents.

**Key Characteristics:**
- Paper white ground, brand-teal fields carrying a fine white guilloche, and nothing engraved on paper.
- Double hairlines everywhere authority is claimed: frames, seals, postmarks, the accountant's double rule under totals.
- Effra only, in four weights (300, 400, 500, 700), with tabular numerals for every figure.
- Small pill buttons; orange only on the primary action.
- One orchestrated motion per page on load, with a reduced-motion fallback that removes it.
- Arabic RTL first; slanted field edges, transforms and arrows flip for LTR.

## Colors

A pinned brand palette of teal, orange and near-black on cool paper, extended only with tints and shades of those hues.

### Primary
- **Record Teal** (`teal`): the field colour. Hero and contact fields with a slanted edge, full-width bands (ZATCA, contact close, about statement), the about figures band, active ticks and progress, the double rule under totals, selection highlight and the focus ring.
- **Engraver's Teal** (`teal-700`): teal as ink. Links, seal and postmark strokes, figure numerals on paper, icon strokes in tiles, the current entry in the terms contents, hovered nav links.
- **Hairline Teal** (`teal-200`): the double-hairline frame, dividers inside document objects, inactive chart bars.
- **Washed Teal** (`teal-50`, `teal-100`): the wash on a landed anchor (story row, linked clause), selected chips and hovered link tiles (`teal-50`), and the icon tiles behind line icons (`teal-100`).
- **Marker Teal** (`teal-600`): section numerals and the sliding contents thumb in the reading register.
- **Deep Teal** (`teal-800`): text on the inverse (white) button and on selected chips.
- **Shadow Teal** (`teal-950`): never a fill; the tint of every lifted shadow, as `rgba(5, 42, 37, a)`.

### Secondary
- **Action Orange** (`orange`): the primary button, the "today" tick, the last point on the ZATCA timeline, overdue and reorder states inside product mock-ups. Hover is `orange-600`; `orange-50` is the background of a warning row in a mock-up.

### Neutral
- **Record Ink** (`ink`): headings and default text.
- **Slate** (`ink-700`): body copy on marketing pages, ledes, footer links, meta lines.
- **Graphite** (`ink-500`): captions, breadcrumbs, proof lines, clause numbers at rest.
- **Mist** (`ink-300`): list markers in the reading register and the bilingual micro-label. Below AA as text (about 2.6:1 on paper); see Do's and Don'ts.
- **Paper** (`paper`): the ground and every paper object.
- **Cool Paper** (`paper-100`): alternate section ground (footer, social links, about's "why" and closing sections).
- **Hairline** (`paper-200`): section borders, header rule, terms hairlines and the contents track.
- **Rule** (`paper-300`): input and tile borders, inactive ticks, row dividers on about.
- **Reading Ink** (`reading-ink`): body text of long legal reading, 86% ink, slightly softer than Record Ink.

Brand blue (`#0694FF`) is pinned in PRODUCT.md and defined in the theme but is not used on any shipped surface.

### Named Rules
**The One Hot Colour Rule.** Orange marks the single action to take or the single "now" (today's tick, the latest milestone). It is never a background field, a heading colour or decoration.

**The Guilloche-on-Teal Rule.** The guilloche is drawn in white at 10 to 14% opacity on teal fields only. Never on paper, on paper objects, on seals or on the reading register.

**The Book-in-Slate Rule.** On a textbook spread the textbook page is the book's, so it is printed in Slate and Graphite on Cool Paper with ink-300 and paper-300 hairlines and no teal; teal, the double hairline and the double teal rule belong to the facing VoM page. The book's own total keeps its accountant's double rule, drawn 3px in Graphite.

**The White-on-Teal Rule.** Text on a teal band is white (owner decision). At `teal` this measures about 2.4:1, below the AA floor in CLAUDE.md; this is an open conflict, not a validated pairing (see Do's and Don'ts).

## Typography

**Display Font:** Effra (with Segoe UI, SF Arabic, Geeza Pro, system-ui)
**Body Font:** Effra (same stack)

**Character:** A single humanist sans that covers Arabic, Latin and digits, so both locales share one voice. Hierarchy comes from weight and size, not from a second family.

### Hierarchy
- **Display** (700, 3rem / 4rem / 5rem, 1.1): page H1 on contact and about, set over the field or the figures.
- **Display, two-tier** (300 then 700, 2.5rem / 3.25rem / 3.75rem, 1.15): the homepage H1, a light tier in Slate over a bold tier in Ink. The growth program sets the light tier on its own line under a Display H1 (300, 1.5rem / 1.875rem / 2.25rem, 1.3, Slate, balanced, breaking only between phrases).
- **Display, integration** (700, 3rem / 4rem, then `clamp(3.75rem, 5.6vw, 5rem)` from 1024px, 1.1, balanced): the integration H1, the Display step made fluid at lg so a long partner name holds two lines in the 6/12 copy column.
- **Display, student** (700, 3rem / 4rem, then `clamp(3.5rem, 5vw, 4.5rem)` from 1024px, 1.1, balanced): the student package H1, 2rem under the breadcrumb (no letterhead lockup), smaller than the integration clamp because its copy column is 5/12 (see Observed drift).
- **Display, reading** (700, 2.5rem, 3.5rem from 1024px, 1.15): the H1 of long documents.
- **Headline** (700, 1.875rem / 2.25rem / 2.5rem, 1.2 to 1.25): section H2s. About uses 2.75rem at lg and the growth features heading drops to `clamp(1.625rem, 2.2vw, 2rem)` at lg (observed drift, see Layout).
- **Title** (700, 1.375rem, 1.5rem from 1024px, 1.3 to 1.35): terms section titles, team names and the headings of the two growth doors.
- **Item title** (700, 1.125rem to 1.25rem, 1.375): list entries, values, cards, the partner record in a ledger row.
- **Body** (400, 1.0625rem, 1.6): the default. Marketing copy runs at 1.7 to 1.8 line height in Slate, capped at 44 to 62ch.
- **Body, reading** (400, 1.0625rem, 1.125rem from 1024px, 1.75, Arabic 1.85): legal reading, in Reading Ink. The text column fills the page container beside the contents rail (owner, 2026-11-09), so lines run long at wide screens: about 125 characters in Arabic and 90 in English at 1440px.
- **Label** (400 to 700, 0.875rem to 0.9375rem): nav, buttons, meta, footer.
- **Caption** (400, 0.75rem to 0.8125rem): dates, demonstration-data labels, mock-up rows.
- **Figure** (700, 1): tabular numerals. 3 to 3.5rem in teal-700 on the homepage record; 4.5 to 5.5rem on about story rows; poster scale `clamp(8.75rem, 12.2vw, 11rem)` in white on the about band.
- **Offer figure** (700, 5.5rem / 7rem / 8rem, 0.8, -0.02em, teal-700): a single offer figure inside a paper door, beside a bold label (1.5rem, 1.875rem from 1024px) over a Slate duration (1.125rem, 1.25rem from 1024px), the group ruled off with the double teal underline. On the growth closing band the same figure runs white at `clamp(5.5rem, 13vw, 10.5rem)`, 0.9, inside a closing line set at 1.75rem / 2.25rem / 2.5rem. The integration close band sets its closing line at the same three steps (700, 1.25, 26ch, balanced).

### Named Rules
**The Effra Only Rule.** One family, loaded through `next/font/local`, weights 300, 400, 500 and 700. No second face, no third-party font link.

**The Tabular Figure Rule.** Every number that can be compared (amounts, serials, dates, counts, clause numbers) is tabular and set `dir="ltr"` inside Arabic text.

## Layout

The page is a 1280px column with a 16px gutter that respects safe-area insets. Composition is asymmetric: hero and closing sections split 7/12 to 5/12 (or 6/5, 8/4), with copy on the start side and the field or object on the end side. Headings balance, H1 to H3 track at -0.01em.

Section rhythm: 4rem / 6rem (about), 5rem / 7rem (teal bands), 6rem / 8rem (homepage sections), stacked mobile value first, lg value from 1024px. Stacks inside a column step at 1rem, 1.25rem, 1.5rem and 1.75rem gaps.

Responsive: 640px (type steps up), 768px (footer link columns go four across), 1024px (columns, desktop header nav, terms rail), 1180px (about figures side by side). Below 1024px the slanted teal field becomes a full-width teal panel under the copy, with a slanted top edge, and the paper object sits on it.

Two doors (growth program, from 1024px): under the 7/5 copy-and-photo row, a paper doc-frame door takes the start 5/12 and a teal guilloche field the end 7/12. The field's slanted start edge (a 3.5rem slant at the top) is the seam between the doors, and the field bleeds to the viewport's end edge through `--bleed: max(16px, calc((100vw - 1280px) / 2 + 16px))`; its content stays in the container with a 5rem start pad. A cut-out photograph sits on paper at the end of the copy row, bottom-aligned so the arm appears to rise out of the field, and reaches past the container by at most 8rem. Below 1024px the order is copy, paper door, photo, field; the field becomes a full-width panel with a 2.25rem slanted top edge, high on the end side where the arm rises, and the photo overlaps it by 2rem.

Integration hero (from 1024px): copy on the start 6/12 (breadcrumb, letterhead lockup, H1, lede, Register and a ghost "watch" link that also starts the video), vertically centred; the stage on the end 6/12. The stage's teal guilloche field is cut by a 4.5rem slant on its start edge and bleeds to the viewport's end edge through the same `--bleed` as the growth doors; the stage pads 4.5rem on its start side so the screen sits wholly on teal. Below 1024px the copy comes first, then the field becomes a full-width panel (negative 16px inline margin) with a 2.25rem slanted top edge, high on the end side, holding the screen centred at up to 36rem.

Student hero (from 1024px): the integration hero's grid, copy and field, re-proportioned. Copy on the start 5/12 (breadcrumb, H1, lede, the orange student Register and a secondary university Register that opens in a new tab), vertically centred; the stage on the end 7/12 holding the open textbook spread, up to 40rem wide and aligned to the stage's start. The field shares the integration field: a 4.5rem slant on its start edge, the same `--bleed` to the viewport's end edge and a 4.5rem start pad. Between 1024 and 1279px, where the spread is narrowest, the slant and the pad both drop to 3rem, the spread's tables drop to 0.8125rem and its pages pad 1.125rem inline. From 640px the stage keeps 2.5rem under the spread for the seal that hangs below it. Below 1024px: copy first, then the field as a full-width panel (negative 16px inline margin) with a 2.25rem slanted top edge, high on the end side, the spread centred on it with its pages stacked (side by side again from 640px).

Sector hero (from 1024px): the integration hero's grid. Copy on the start 6/12 (breadcrumb, H1, lede, Register and a ghost demo link, then a Graphite "no credit card" note with a teal-700 check), vertically centred with 3rem / 4.5rem block padding; the stage on the end 6/12. The field is the same guilloche field: a 4.5rem slant on its start edge, the shared `--bleed` to the viewport's end edge and a 4.5rem start pad, so the photo plate (up to 34rem) sits wholly on teal; the stage pads 4rem top and 5.25rem bottom to leave room for the seal that hangs below the plate. Below 1024px: copy first, then the field as a full-width panel (negative 16px inline margin) with a 2.25rem slanted top edge, high on the end side, the plate centred on it.

Sector sections: the integration split (paper-200 top hairline, H2 on the start 4/12, content on the end 8/12, 2rem gap, 4rem / 6rem block padding) carries the clause sheet (on Cool Paper, with the heading and its "more features" link sticky 6rem from the top from 1024px), the client seals and the questions. The articles and the sector register are full-width blocks under their heading: articles two across from 640px and four from 1024px; the register two across on phones, three from 640px and seven from 1024px (two rows of seven for the other fourteen sectors). Sections with no data (clients, articles) drop out.

Heading beside content (integration sections below the hero): each section is ruled off by a paper-200 top hairline and runs a 12-column split from 1024px, the H2 (Headline steps) on the start 4/12 and its content (ledger, offer list, sibling tiles) on the end 8/12, with a 2rem gap and 4rem / 6rem block padding. Below 1024px heading and content stack with a 2rem gap. The offer list and the sibling tiles go two across from 640px. The student page runs the same split: its features heading is sticky 6rem from the top from 1024px beside a column of textbook spreads (2rem apart), the reports section sits on Cool Paper with the Report Index in the 8/12, and each benefit is a plate (photo then caption, `1.35fr 1fr` from 640px with a 2rem gap) ruled off by paper-300 hairlines.

Grid with a heading cell (growth features): from 640px the section heading takes the first cell of the grid and the items fill the rest through `subgrid`, so the heading and the items share one row line and the last row closes (two columns at 640px, four at 1024px with a 2.5rem gap). The heading carries the same 1px paper-300 top rule and 1.5rem pad as each item.

The reading register is a single column of text that fills the page container. From 1024px the header row (breadcrumb, title, meta) spans the full container width and is ruled off by a paper-200 hairline; below it a 15rem contents rail sits on the start side, sticky 6rem from the top, separated by a 4.5rem gap from the text column, which takes the rest of the width. Below 1024px the contents become a bar stuck under the 64px header. Clause numbers hang in a 2.75rem gutter.

### Observed drift (recorded, not repaired)
- Section H2 at lg is 2.5rem on the homepage and 2.75rem on about (`about-heading`); contact's closing H2 reaches 3rem.
- The orange pill is rebuilt by hand in the mobile menu (40px, no pressed base, no hover) and in the closing certificate form (48px) instead of using the primary button; the header overrides it to 40px.
- Guilloche stroke opacity varies: 0.11 on the hero and contact fields, 0.14 on bands and the CSS tile, about 0.1 on the apps panel.
- The ZATCA band's paper cards use a black shadow (`rgba(0,0,0,0.6)`), where every other shadow is teal-tinted.
- Seal numerals use `font-extrabold` (800), a weight Effra is not loaded in, so the browser synthesises it.
- The page container is the `page-wrap` class on about and terms but repeated inline utilities on home, contact, header and footer (same values).
- Small icon tiles and calculator inputs use a 0.75rem radius (`rounded-xl`) where list icon tiles use the 1rem tile radius.
- `--measure: 62ch` is defined on `:root` but unused; about writes 62ch literally; terms sets no measure.
- Marketing body text is Slate (`ink-700`); the reading register uses Reading Ink (86% ink). This is a deliberate register difference, recorded so it is not mistaken for drift.
- Growth: the in-grid features heading is `clamp(1.625rem, 2.2vw, 2rem)` at lg, below the 2.5rem headline step, so it fits two lines in one grid cell; the closing line starts at 1.75rem where the headline ramp starts at 1.875rem.
- Growth: the closing teal band pads 4rem / 4.5rem and 5rem / 5.5rem, not the 5rem / 7rem of other teal bands.
- Growth: the partner field reuses the CSS guilloche tile, so it draws at 0.14 opacity where the hero and contact fields draw at 0.11.
- Icon tiles exist twice: about draws them as CSS masks on pseudo-elements; growth renders the shared `Icon` component inside a 48px tile. Same look, two implementations.
- The inverse button on the homepage ZATCA band keeps the default teal focus outline on a teal ground, where it is invisible; growth overrides it to white on both its teal surfaces.
- Integration: the single-rule ledger (Zid) sets its partner record at 1.5rem / 1.75rem and its VoM result at 1.25rem / 1.375rem, off the type ramp (between Title and Headline), so one row still reads as a statement.
- Integration: the screen's poster is clipped at a 0.625rem radius, a value not in the radius scale (card 1.25rem, tile 1rem, sheet 0.75rem); the screen's 10px bezel replaces the doc-frame's 28 to 40px padding.
- Integration: the hero field and the close band reuse the CSS guilloche tile at 0.14 opacity, where the hero and contact fields draw at 0.11.
- Integration: the close band pads 6rem / 4.5rem and 7rem / 5.5rem (the top includes the 2.5rem slant), not the 5rem / 7rem of other teal bands.
- Integration: the play seal carries a single white outline ring at 5px offset, where seals elsewhere are double-ring; the surface brief asked for a double ring and the build shipped one.
- Student: the H1 is `clamp(3.5rem, 5vw, 4.5rem)` from 1024px, a fluid step outside the Display ramp; at 1024px it resolves to 3.5rem, smaller than the 4rem it holds from 640px, so the H1 steps down when the columns open.
- Student: off-ramp sizes. 1rem for the VoM list items and the index entries (between Label 0.9375rem and Body 1.0625rem); 0.75rem as the running text of the textbook forms, table heads and the record meta and foot (the Caption floor carrying form content); 0.8125rem for the hero tables between 1024 and 1279px; 0.875rem for T-account amounts; 1.25rem for the spread and plate titles (Item title upper bound, not the 1.125rem token). The closing line runs 1.375rem / 1.625rem / 1.875rem, off the integration close line's 1.75rem / 2.25rem / 2.5rem; the seal word is 1.375rem on the free seal and 1.625rem on the white seal.
- Student: seal sizes 6.5rem (104px) for the free seal and 7.5rem / 8.5rem for the white closing seal sit outside the recorded seal sizes (96, 68, 76 and 220px).
- Student: the features spreads carry a shadow at rest on paper (`0 1px 2px rgb(2 2 2 / 0.06), 0 24px 48px -30px rgb(5 42 37 / 0.35)`), against the Teal Shadow Rule's flat-at-rest frames, and its first layer is neutral.
- Student: the free seal's drop is `0 14px 28px -14px rgb(5 42 37 / 0.45)`, lighter than the play seal's 0.6.
- Student: the tick is a 1.5rem disc with a 0.875rem check drawn as a CSS pseudo-element, where the integration offer list renders a 1.75rem disc with a 16px `Icon` check. Same look, two sizes and two implementations.
- Student: textbook forms draw T-account rules at 1.5px and the book total's double rule at 3px, between the 1px hairline and the 4px VoM double rule.
- Student: the hero field and the close band reuse the CSS guilloche tile at 0.14 opacity; the close band pads 6rem / 4.5rem and 7rem / 5.5rem like the integration close band, and its row gap is 3rem where the integration close uses 3.5rem.
- Student: the brief's seal micro-label read "STUDENT PACKAGE · FREE"; the build ships "Student package" in both locales.
- Student: the brief said the totals' double rule draws; the build reveals it with the totals row's cells rather than drawing it separately.
- Sector: the H1 starts at 2.5rem and runs 3rem from 640px and `clamp(3rem, 4.2vw, 3.875rem)` from 1024px, a fluid step below the Display ramp (3rem / 4rem / 5rem) so the keyword-led H1 holds two or three lines in the 6/12 column.
- Sector: off-ramp sizes. Clause titles 1.1875rem and clause numerals 1.375rem (between Item title and Title); seal name 0.8125rem (0.9375rem from 1024px) and seal micro 0.6875rem; the closing line 1.5rem / 1.75rem, below the integration close line's 1.75rem / 2.25rem / 2.5rem.
- Sector: the seal rotates -6deg where seals elsewhere sit at -8 to -10deg, and stamps from 1.12x where the play and free seals stamp from 1.35x (the brief specified 1.12). Its sizes (7.75rem, 9.5rem, 8.25rem) add to the recorded seal sizes.
- Sector: the clause icon tile is a third icon-tile implementation: 2.75rem, `teal-50`, the 0.75rem sheet radius and a 1.5rem icon as a data-URI background, where list icon tiles are 48px `teal-100` at the 1rem tile radius.
- Sector: client seals carry a drop shadow at rest on paper (`0 14px 24px -18px rgb(5 42 37 / 0.5)`), against the Teal Shadow Rule's flat-at-rest objects.
- Sector: the FAQ redraws the plus in its own 1.75rem ringed disc (`teal-300` hairline) inside the shared `.faq` disclosure, and its focus outline is 2px Record Teal at 4px offset with a 4px radius.
- Sector: the hero field and the close band reuse the CSS guilloche tile at 0.14 opacity; the close band pads 6rem / 4.5rem and 7rem / 5.5rem with a 2.5rem slanted top edge, like the integration close band.
- Sector: client logos are greyed on their 320px canvases, so the clients read as one register rather than in their own colours (unlike the partner seal, which keeps the partner's colours).
- The homepage runs more than one motion: the load sequence, the scroll-pinned steps (contracted), an idle float, a logo marquee and count-up numbers.

## Elevation & Depth

Depth is tonal first: paper, cool paper and teal bands do most of the work. Shadows appear under paper documents (the stack, certificates, cards on a field), on overlays, and as a hover response on report cards; they are long, soft and negatively spread so the object reads as lifted paper rather than a card.

### Shadow Vocabulary
- **Lifted sheet** (`box-shadow: 0 1px 2px rgba(2,2,2,0.08), 0 24px 48px -24px rgba(5,42,37,0.45), 0 60px 90px -40px rgba(5,42,37,0.35)`): documents in the homepage stack.
- **Object on field** (`box-shadow: 0 40px 80px -40px rgba(5,42,37,0.4)` to `0 32px 60px -28px rgba(5,42,37,0.6)`): the closing certificate, the about balance card, product images on teal.
- **Overlay** (`box-shadow: 0 24px 40px -24px rgba(5,42,37,0.35)`): the mobile menu panel; the terms contents panel uses the same teal tint, tighter: `0 18px 32px -16px rgb(5 42 37 / 0.22)`.
- **Hover lift** (`box-shadow: 0 24px 40px -28px rgba(5,42,37,0.4)` with translateY(-4px)): report cards.
- **Pressed edge** (`box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12)`): the primary button's base.

- **Seal drop** (`box-shadow: 0 14px 28px -14px rgb(5 42 37 / 0.6)`): the play seal resting on the poster; the free seal on the textbook spread uses it at 0.45.

- **Stamped seal** (`box-shadow: 0 16px 30px -14px rgb(5 42 37 / 0.55)`, after the seal's three inset rings): the sector seal hung on its photo plate, between the free seal's 0.45 and the play seal's 0.6.

- **Seal ring** (`box-shadow: 0 0 0 3px teal, 0 0 0 4px rgb(255 255 255 / 0.75)`): not elevation; a box-shadow used to draw the teal gap and white hairline around a partner seal or partner plate on teal.

### Named Rules
**The Teal Shadow Rule.** Shadows are tinted with Shadow Teal, never neutral grey, and belong to paper documents, overlays and hover states. Sections, tiles and frames at rest stay flat.

## Shapes

Corners are generous and consistent: pills for actions and inputs, 1.25rem for framed sheets and photographs, 1rem for tiles, 0.75rem for paper sheets and highlighted clauses. Fields are not rounded; they are cut with a slanted edge by `clip-path` (an 8% slant on the hero field, a 3.5rem slant on the growth doors' seam, a 4.5rem slant on the integration hero field, a 36 to 40px rise on panels and the figures band, a 2.25rem rise on the integration stage panel below 1024px, a 2.5rem rise on the integration and student close bands' top edge, a 3rem slant on the student field between 1024 and 1279px, a 4.5rem slant on the sector field, a 2.25rem rise on the sector stage panel below 1024px and a 2.5rem rise on the sector close band), mirrored in RTL.

Lines carry authority. The document frame is a 1px teal-200 border with a second hairline 4px inside it (`inset 0 0 0 4px paper, inset 0 0 0 5px teal-200`). Seals and postmarks are circles with a 3 to 5px double border, rotated -8 to -10 degrees; the sector seal draws its rings as inset shadows (a heavy 3px outer ring, a 4px gap in the ground colour, a 1px hairline) and turns -6 degrees. Totals, the offer figure in a paper door and the last row of a posting ledger are ruled off with a 4px double teal underline. Elsewhere, divisions are single hairlines in paper-200 or paper-300.

## Components

### Buttons
Small, precise and pill-shaped, in Effra bold at 0.9375rem, often with a 16px arrow that flips in RTL.
- **Shape:** full pill (999px), 44px tall (40px in the header).
- **Primary:** Action Orange with white text, 20px inline padding, a pressed 2px inner base; hover `orange-600`. One per view.
- **Secondary:** transparent with an 80% ink border; hover full ink border and Cool Paper.
- **Ghost:** text with a 2px teal underline at 6px offset; hover the underline turns ink. Pairs with the primary.
- **Inverse:** white with Deep Teal text, for teal bands; hover `teal-50`.
- **Focus / Active:** 2px teal outline at 3px offset; active nudges 1px down. On a teal ground the outline is white.
- **New tab:** a link button that opens in a new tab (the growth application forms) sets `target="_blank"` and appends a visually hidden " (opens in a new tab)" after its label.

### Inputs / Fields
- **Style:** pill input, 48px, paper-300 border on paper, 20px padding.
- **Focus:** border turns Record Teal, no glow.

### Cards / Containers
- **Document frame:** Paper, 1.25rem corners, double hairline, 28 to 40px padding, internal dividers in teal-200. Used for the homepage record, certificates and about's vision and mission sheets.
- **Tiles:** Paper with a paper-200 or paper-300 border at 1rem corners; link tiles hover to a teal border on `teal-50`.
- **Integration tile:** a sibling-integration link: Paper, 1px paper-300 border, 1rem corners, 1.5rem padding, the partner mark over its name in bold Slate, a teal-700 arrow at the end; hover turns the border Record Teal on `teal-50` and nudges the arrow 4px toward the end edge (mirrored in RTL).
- **Tick:** a 1.75rem `teal-100` disc holding a 16px teal-700 check, beside each item of a partner's offer list on paper-300 top rules. The student page draws it in CSS only (see The CSS-drawn Tick).
- **Icon tile:** a 48px `teal-100` square at 1rem corners holding a 26px line icon in teal-700 (1.75 stroke), drawn from the shared `Icon` set.

### Navigation
- **Header:** sticky, 64px, paper at 85% with backdrop blur and a paper-200 bottom rule. Logo at the start, links at 0.9375rem in 90% ink turning teal-700 on hover, then locale switch, login and a small orange start pill. The links are Home, Features, Sectors (a menu), Pricing, E-invoicing and Business support (a menu). Below 1024px a round menu button opens a paper panel of ruled links, scrollable to the viewport, where the two menus become sections that expand in place (sectors two across with their icon tiles, support as its labelled groups).
- **Mega menu:** a disclosure, not an ARIA menu. The trigger is a button with `aria-expanded` and a 14px chevron that turns from down to up; it opens after an 80ms rest of the mouse, or on click, Enter or Space, and closes on Escape (focus returns to the trigger), on leaving the header for 220ms, on a click outside, on tabbing out, and when one of its links is followed. The panel is a full-width paper sheet under the header with the overlay shadow, dropping in over 0.22s (6px and opacity, ease-out-quint) and lifting out a little faster, over 0.16s ease-in, with `display` held until the fade ends (`transition-behavior: allow-discrete`); moving straight from one menu to the other swaps the panels at once. A closed panel carries the `hidden` attribute, dropped only while it is open and for the 0.2s of its fade, so it stays shut even without the stylesheet. Inside the 1280px container, its links run on the start side and a 19rem teal guilloche field with a 2.5rem slanted start edge bleeds to the viewport's end edge (the hero field's `--bleed`), carrying white text. Sectors: three ruled columns read down each column, each entry a 2.5rem teal-50 tile at the sheet radius with the sector's 1.5-stroke line icon in teal-700 (drawn by CSS masks from the shared icon set) beside the name at 0.9375rem, weight 500; hover turns the tile Record Teal and the icon white; the field holds the homepage's sector line and an "All sectors" link. Business support: labelled groups (a bold 0.9375rem heading over a teal-200 hairline, links at 0.9375rem in Slate); a group of more than six links, or a lone group, runs in two columns up to 36rem; the last group (Help) sits on the field in white. Links to other sites carry a small arrow turned 45° outward, mirrored in Arabic. The panels are in the HTML when closed so their links are crawled; menu links do not prefetch.
- **Breadcrumb:** 0.875rem Graphite with mirrored chevrons; current page in Slate.
- **Footer:** Cool Paper; the brand block then four link columns (product, resources, company, and Marketplace listing the three integration pages). Two link columns on phones, four from 768px with the brand block on its own row, and `1.6fr + 4×1fr` in one row from 1024px; quiet links in Slate turning teal-700, outlined pill app-store links, a hairline above the legal line.

### Seal and Postmark
Double-ring circles that certify: teal on paper (96px certificate seal, 68px envelope seal, 76px postmark), white on teal (220px closing seal). Slightly rotated, set in bold Effra with tabular numerals.

### Partner Seal
A third-party logo on its own white disc, ringed by a 3px teal gap and a white hairline at 75%, in a grid on a teal field: 4.5rem (5.5rem from 1024px), six across from 640px (6×2) and four across below (4×3). The disc carries the partner's own colours, so other marks never sit directly on teal.

**Plate variant.** A wordmark too wide for a disc (Foodics is about 7:1) sits on a rounded white plate carrying the same ring (3px teal gap, white hairline at 75%): 4rem tall (4.5rem from 640px), 1rem corners, 1rem inline padding (1.5rem from 640px), the mark centred at the context height.

### Partner Mark
Partner wordmarks differ in proportion, so each is drawn at a context height times its own optical scale: `.integ-mark` sets `height: calc(var(--mark-h) * var(--mark-scale))`, each context sets `--mark-h` (1.375rem in a ledger head, 1.5rem / 1.75rem in the emblem, 2rem on an integration tile, 3rem in the offer's mark tile) and each mark carries its scale (Foodics 0.72, Marn 0.9, Zid 1.25, VoM 1), so no partner outweighs another at the same height. On paper the mark sits directly on the ground; on teal it always sits on a seal disc or plate.

### Letterhead Lockup
The VoM | partner lockup image set at one fixed height, 2.25rem (2.75rem from 1024px), between the breadcrumb and the H1 on an integration page, whatever the lockup's proportions. It is the page's letterhead, not a kicker: an image of two marks, never a line of text.

### Screen
A video on its paper sheet on the teal field. A doc-frame (double hairline, 1.25rem corners) with a 10px bezel holds a 16:9 poster on an ink ground, up to 36rem wide, lifted with the object-on-field shadow (`0 32px 60px -28px rgb(5 42 37 / 0.6)`). Only the poster ships: the whole poster is a real `<button>` (a click-to-play facade) and the youtube-nocookie player loads in its place when pressed, taking focus. A white play seal (3.75rem, 4.5rem from 640px) with a teal-700 triangle that points right in both languages, a 1.5px white outline ring at 5px offset and the seal drop shadow sits at the poster's centre, or where a poster names a clearer spot through `--seal-x` / `--seal-y`. Hover scales the poster to 1.02, the seal to 1.06 and opens the ring to 7px. Focus is drawn inside the clipped edge as a teal-then-white inset ring. Under the screen in white: the title and tabular length; when a page has two videos they become pills (44px, white 60% hairline, hover white 12%; the chosen one `aria-pressed`, solid white with Deep Teal text) that switch and start the video. English pages add "(in Arabic)" at 0.875rem. It is the page's signature motion, once on load in CSS only: the screen lifts 1.5rem onto the field while its shadow lengthens (0.9s from 0.1s), then the play seal stamps in from 1.35× scale and zero opacity (0.5s from 0.75s), both on ease-out-quint; the global reduced-motion rule shows the finished state.

### Posting Ledger
What each partner record becomes in VoM, ruled like a journal on a doc-frame sheet. A head row names the two columns (partner mark, then VoM mark, at 0.9375rem Slate) over a teal-200 rule; each row is the partner record (Item title) → the VoM result (Body, Slate), with a teal-700 arrow that flips in RTL and a screen-reader colon between them. From 640px the row is a `2fr 1.25rem 3fr` grid; below it the record runs full width with arrow and result beneath. Rows divide on teal-200 hairlines and the last row closes on the 4px double teal rule. A single-rule ledger is set large (see Observed drift) with 1.75rem row padding.

### Connection Emblem
On the integration close band: VoM's plate and the partner's plate (Partner Seal, plate variant) joined by a white double hairline (a 5px gap between 1px white rules, 1.5rem long, 2.5rem from 640px). From 1024px emblem, closing line and Register share one row (`auto 1fr auto`, 3.5rem gap). Decorative, `aria-hidden`.

### Textbook Spread
Two pages on a spine: one concept as the textbook prints it, facing what VoM does with it. The pages share one grid with 1.25rem outer corners. The textbook page is Cool Paper printed in Slate, unframed; the VoM page is Paper inside the double-hairline frame (1px teal-200 border, a second hairline 4px in). Each page pads 1.25rem / 1.25rem / 1.5rem (1.5rem / 1.5rem / 1.75rem from 640px) and carries a fold shade on its spine edge: a 1.25rem gradient to Shadow Teal at 7% on the textbook page and 5% on the VoM page. Side by side from 640px, the textbook page on the start side and the shade mirrored in RTL; below 640px the pages stack, textbook above VoM, the spine becomes a horizontal fold and the corners move to the outer top and bottom. In the features section the two pages stretch to equal height: the VoM page's list grows to fill its page, so the 4px double teal rule that closes it sits at the page foot and a short list beside a taller textbook page reads as margin. In the hero the spread is a `figure` up to 40rem holding the textbook entry beside a VoM journal record (title, serial and date in a meta list, lines on teal-200 hairlines, the totals row on the 4px double teal rule, an attachment chip in teal-50 and Deep Teal, and the demonstration-data label in Graphite).

### Page Letterhead and Folio
Every page opens with a mark alone over a hairline, 1rem above the title with 0.75rem under the mark, so the facing titles align. The VoM page's letterhead is VoM's mark at 1.125rem over a teal-200 hairline; the textbook page's is the book line icon (1.125rem, Graphite stroke, drawn in CSS) over a paper-300 hairline. The letterhead is a mark, never text. "In the textbook" (في الكتاب) is the textbook page's running foot, not a heading: 0.8125rem Graphite pushed to the page foot, followed by a paper-300 rule to the page edge, like a folio.

### Textbook Notation
The journal entry as the textbook writes it, in a table: column heads at 0.75rem weight 500 in Graphite over an ink-300 rule; the account wording first, then the debit and credit amounts in 4.5rem columns with paper-300 rules between them and tabular numerals aligned to the end. The debited account sits flush and the credited account is indented 1.5rem (من حـ/ … then إلى حـ/ …; in English, debit flush, credit indented). The memo runs under the lines, in parentheses, at 0.8125rem Graphite across all columns.

### Textbook Forms
The printed forms a textbook sets beside a concept, drawn in HTML hairlines in Graphite at 0.75rem and decorative (`aria-hidden`; the concept line under it carries the meaning). The **T-account pair**: two Ts side by side with a 1.25rem gap, the account name in bold Slate over a 1.5px Slate bar, the debit and credit sides split by a 1.5px Slate stem, debit on the start side in both languages. The **tax-invoice skeleton**: a Paper sheet (paper-300 border, 0.75rem corners) with a centred bold title, labelled blanks that end in a dotted ink-300 line, a ruled line-item head, empty blanks, and a total closed by a 3px Graphite double rule. The **subsidiary-ledger card**: the same sheet with three column heads over an ink-300 rule and three empty rows ruled in CSS gradients (1.625rem pitch, paper-300) with the column rules carried down. The **receipt voucher**: the sheet with its title and a short number blank in one row, then three labelled blanks.

### Report Index
The reports as a book's index page: one framed Paper sheet (doc-frame) on the Cool Paper reports section, padded 0.75rem 1.25rem (1rem 2.5rem from 640px). Entries are sorted on the keyword per locale (the leading "تقرير" and the definite article in Arabic, the trailing "report" in English, dropped for sorting only), each at 1rem weight 500 beside its own 48px report icon, on paper-300 rules. From 640px it runs two columns, 2.5rem apart, read down each column in turn (`grid-auto-flow: column` over a row count set from the list), and the second column's head starts on the sheet's edge like the first. The section heading sets its figure in teal-700 tabular numerals.

### Free Seal
The double-ring seal of the student package: a 6.5rem Paper disc with a 4px double teal-700 ring, rotated -8deg, the word in bold (1.375rem) over the micro-label (0.625rem, uppercase, 0.08em tracking, LTR, 4.75rem wide), with the seal drop at 0.45. On the spread it lives in the VoM page: side by side it hangs across the spine's foot, centred on the spine and 2.5rem below the pages, and the record foot pads 3.25rem on its start side to clear it; stacked it sits on the fold, centred on the top edge of the VoM page 1rem from its end. The **white variant** on the close band is the word only, in white on a transparent disc with a white double ring, 7.5rem (8.5rem from 640px), word at 1.625rem; from 1024px it leads the close row (`auto 1fr auto`, 3rem gap) before the closing line and the two Register buttons stacked.

### The CSS-drawn Tick
The list marker on the VoM page: a 1.5rem teal-100 disc holding a 0.875rem teal-700 check (1.75 stroke), drawn as a `::before` pseudo-element with an inline SVG background, so the list carries no icon markup. Items are 1rem Slate on teal-200 hairlines with a 0.75rem gap to the tick.

### Signature motion (student package)
Once on load, CSS only, ease-out-quint. The spread lifts 1.5rem onto the field while its shadow lengthens to the object-on-field shadow (0.8s from 0.1s). The record's cells then write in by `clip-path` from the reading start (left to right in English, right to left in Arabic), 0.4s each with the cells of a row staggered 0.07s: the first line from 0.45s, the second from 0.6s, the totals row with its double rule from 0.78s. The free seal stamps in from 1.35x scale and zero opacity (0.45s from 1.05s), so the whole sequence ends at about 1.5s. Resting styles are the finished state; the global reduced-motion rule shows it finished.

### Growth Disc
An SVG redraw laid over the teal disc in a photograph, placed by percentage so it holds its position at every width: a white baseline, four bars and a rising arrow. It draws once on load in CSS only: the baseline's stroke (0.4s from 0.2s), the bars rising by scaleY from their base (0.6s each, staggered 0.1s from 0.4s), then the arrow (0.6s from 0.85s), all on ease-out-quint; the global reduced-motion rule leaves it finished. In LTR the photograph is mirrored so the arm still enters from the end edge; the disc is not, so the growth arrow always rises to the right.

### Contents Rail (reading register)
A 15rem list on a paper-200 hairline track. Entries are 0.875rem Slate with Graphite numerals; the current entry turns ink at weight 500 with a teal-700 numeral, and a 2px teal-600 thumb slides along the track (0.45s ease-out-quint). Below 1024px it collapses into a bar naming the current section with a button that opens the list as a panel.

### Clause
A two-column grid: a self-linking clause number in a 2.75rem gutter (0.875rem Graphite, teal-700 and underlined on hover), then the text with a bold ink lead label. A linked clause is washed in `teal-50` on arrival and fades to clear over 3.2s. Sub-items use an en-dash marker in Mist.

### Sector Seal
The sector's own seal, struck onto that sector's photo: a Paper disc (7.75rem) in Engraver's Teal holding the sector pictogram (1.75rem, a CSS mask from the shared sector icon set through `data-icon`), the sector name in bold (0.8125rem, balanced, 6rem wide) and the micro-label "ڤوم" / "VoM" (0.6875rem at 85%), turned -6deg. Its rings are inset shadows on `--seal-ground`: a heavy 3px ring in the current colour, a 4px gap in the ground colour and a 1px hairline (`inset 0 0 0 3px currentColor, inset 0 0 0 7px var(--seal-ground), inset 0 0 0 8px currentColor`), so the gap always matches what the seal sits on. Decorative (`aria-hidden`); the H1 and breadcrumb name the sector. **Stamp variant:** hung on the photo plate's lower start corner, 2.75rem below it on phones; from 1024px it grows to 9.5rem (pictogram 2.25rem, name 0.9375rem) and hangs 3.75rem past the plate's start edge and 3.25rem below it, bridging photo and copy, with the stamped-seal drop. **White variant:** on the close band, 8.25rem, white on Record Teal with the ground set to teal; from 1024px it leads the close row (`auto 1fr auto`, 3.5rem gap) before the closing line and the two buttons (Register, then the inverse demo button).

### Photo Plate
The sector photograph, cut from the old page's tablet frame, on a Paper sheet: the double hairline (1px teal-200 border, a second hairline 4px in) at 1.25rem corners with a 10px bezel, the photo 3:2 at 0.75rem corners on a `teal-100` ground, up to 34rem wide, carrying the object-on-field shadow (`0 32px 60px -28px rgb(5 42 37 / 0.6)`). It is the Screen's sheet without a video; the photo is the page's one preloaded image.

### Clause Sheet
What VoM does for the sector, as one document: a doc-frame on the Cool Paper features section holding four numbered clauses on teal-200 hairline rules, padded 0.5rem 1.25rem (0.75rem 2.5rem from 1024px). From 1024px the clauses run 2×2 with a 3rem column gap, only the first row ruled beneath. Each clause is a `2rem 1fr` grid: its feature icon on top in the text column, then the clause numeral (bold 1.375rem, Engraver's Teal, tabular) in the gutter beside the bold title (1.1875rem), then the body in Slate at 1.75 line height. The icon is drawn by the clause's own `::before` from `data-feature`: a 2.75rem `teal-50` tile at the sheet radius holding a 1.5rem teal-700 line icon (1.5 stroke) as a data-URI background. The ten kinds (costs, customers, expenses, reports, operations, attachments, payroll, billing, connect, projects) are the old pages' icon kinds, redrawn in the house line style.

### Client Seals
Real clients of the sector, each logo on a white disc clipped to its circle and ringed twice from outside (a 3px paper gap, a 1px teal-300 ring, a 2px paper gap, a 1px teal-200 hairline). Logos are pre-set, greyed and centred, on a 320px square canvas at an equal optical size, so one width (92% of the disc) fits all and no client outweighs another. Four across on phones (up to 7rem each), `auto-fill` at 5.5rem minimum from 640px; a list of fewer than four sets fixed 7rem columns so the discs do not stretch. The logo's alt is the client's name.

### Sector Register
The other fourteen sectors as links: each a ringed pictogram beside (on phones) or over (from 1024px) the name in bold 0.9375rem. The ring is the link's `::before` (a 2.75rem Paper disc, 3.5rem from 1024px, with a 1.5px teal-700 ring, a gap and a teal-300 hairline as inset shadows) and the pictogram its `::after` (1.25rem, teal-700, a CSS mask from `data-icon`), so each entry is a bare `<a>` with its name. Hover washes the link `teal-50` at the tile radius and turns the disc Record Teal with white rings and a white pictogram. Focus is the 2px teal outline at 4px offset.

### Articles (sector pages)
Arabic article cards: the cover at the sheet radius with a paper-200 hairline ring, the title under it in bold 1.0625rem; hover lifts the cover 2px with a teal-200 ring and a teal shadow, and underlines the title in Record Teal.

### Icons from data attributes (HTML budget)
Repeated decoration on the sector pages carries no markup: the clause icons, the seal pictogram and the register's ringed pictograms are drawn in CSS pseudo-elements from `data-feature` and `data-icon` (the `--ic` / `--fi` custom properties hold the SVGs), so the HTML holds only the attribute. Repeated small images (client logos, article covers) are plain `<img>` tags pointing at one image-optimizer URL at a fixed width (256px, 640px) with no srcset, lazy and async; only the hero photo goes through `next/image` with `sizes` and `preload`.

### Signature motion (sector pages)
Once on load, CSS only, ease-out-quint. The photo plate lifts onto the field with the shared `screen-lift` (1.5rem and the shadow lengthening, 0.9s from 0.1s), then the seal stamps in from 1.12x scale and zero opacity (0.45s from 0.75s), so the sequence ends at about 1.2s. Resting styles are the finished state; the global reduced-motion rule shows it finished.

## Do's and Don'ts

### Do:
- **Do** keep the brand palette pinned: tints and shades of teal, orange, blue, near-black, the two greys and the light grey only, through the theme tokens.
- **Do** give each page one signature idea and one orchestrated motion on load (integration pages: the screen lifts 0.9s from 0.1s, then the play seal stamps 0.5s from 0.75s; student package: the spread lifts 0.8s from 0.1s, the record writes in from 0.45s, the seal stamps 0.45s from 1.05s; sector pages: the photo plate lifts 0.9s from 0.1s, then the sector seal stamps 0.45s from 0.75s), using `cubic-bezier(0.22, 1, 0.36, 1)`, with every resting style being the finished state so reduced motion loses nothing.
- **Do** frame paper objects with the double hairline and certify with double-ring seals; rule off totals with the 4px double teal underline.
- **Do** cut teal fields with a slanted edge and mirror the slant, the arrows and any transform in RTL.
- **Do** set the English micro-label (0.625rem, uppercase, 0.08em tracking) only inside paper document objects, as the English line of an official form or a corner stamp.
- **Do** label demonstration data in every mock-up.
- **Do** print a textbook page in Slate on Cool Paper with no teal and no frame, and give teal, the double hairline and the double teal rule to the facing VoM page.
- **Do** switch the focus outline to white on any teal ground.
- **Do** set partner and third-party logos on a white seal disc on teal, or on the ringed white plate when the mark is a wordmark too wide for a disc, never directly on the field.
- **Do** draw partner marks at the context height times the mark's optical scale, so no partner outweighs another.
- **Do** use the reading register (no field, no guilloche, no buttons, teal only as a marker) for long documents.
- **Do** draw seal rings as inset shadows on a `--seal-ground` that matches the surface the seal sits on, so the gap between the rings is always the ground.
- **Do** draw icons repeated across a page (clause icons, register pictograms) in CSS pseudo-elements from data attributes, and serve repeated small images through one optimizer URL without a srcset, to keep the HTML inside its budget.
- **Do** pre-set third-party logos on a common square canvas at an equal optical size, so one width fits every seal.

### Don't:
- **Don't** put orange on anything but the primary action or the single "now" marker.
- **Don't** draw the guilloche on paper, on paper objects, on seals or in the reading register.
- **Don't** add a second typeface or load Effra from a third-party link.
- **Don't** use neutral grey shadows, or shadow sections, tiles and frames at rest.
- **Don't** place a micro-label or any small line above a heading as a kicker or eyebrow.
- **Don't** treat Mist (`ink-300`) as a text colour for content that must be read, or treat white on Record Teal and white on Action Orange as meeting AA; both measure below 3:1 and are open items.
