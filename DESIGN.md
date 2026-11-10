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
---

# Design System: VoM website (getvom.com)

## Overview

**Creative North Star: "The Official Record" (الوثيقة)**

Every page is a document VoM issues to the visitor. The ground is white paper; authority arrives as one unbroken field of brand teal engraved with a fine guilloche, the lattice of certificates and banknotes. Paper objects (invoices, certificates, a sealed envelope, framed sheets) sit on that field with the precision of a government form: rounded double-hairline frames, double-ring seals, serial numbers, tabular numerals, a bilingual English line under the Arabic one. Effra sets everything, Arabic, Latin and digits alike, and the layout is built right-to-left first with every component mirrored for English.

The system is restrained by rule. Each page gets one signature idea (the document stack issuing itself on the homepage, the envelope opening on contact, the figures rolling on about, the scroll-spy contents on terms, the growth disc drawing its chart on the growth program, the screen lifting onto the field and its play seal stamping in on the integration pages) and the rest of the page stays quiet around it. Orange is the single hot colour and marks the one thing to press or the one "now". Buttons are small, precise pills. Sections alternate paper, the light paper-100 grey, and teal bands; depth is mostly tonal, with long teal-tinted shadows reserved for paper objects lifted off a field.

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

**The White-on-Teal Rule.** Text on a teal band is white (owner decision). At `teal` this measures about 2.4:1, below the AA floor in CLAUDE.md; this is an open conflict, not a validated pairing (see Do's and Don'ts).

## Typography

**Display Font:** Effra (with Segoe UI, SF Arabic, Geeza Pro, system-ui)
**Body Font:** Effra (same stack)

**Character:** A single humanist sans that covers Arabic, Latin and digits, so both locales share one voice. Hierarchy comes from weight and size, not from a second family.

### Hierarchy
- **Display** (700, 3rem / 4rem / 5rem, 1.1): page H1 on contact and about, set over the field or the figures.
- **Display, two-tier** (300 then 700, 2.5rem / 3.25rem / 3.75rem, 1.15): the homepage H1, a light tier in Slate over a bold tier in Ink. The growth program sets the light tier on its own line under a Display H1 (300, 1.5rem / 1.875rem / 2.25rem, 1.3, Slate, balanced, breaking only between phrases).
- **Display, integration** (700, 3rem / 4rem, then `clamp(3.75rem, 5.6vw, 5rem)` from 1024px, 1.1, balanced): the integration H1, the Display step made fluid at lg so a long partner name holds two lines in the 6/12 copy column.
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

Heading beside content (integration sections below the hero): each section is ruled off by a paper-200 top hairline and runs a 12-column split from 1024px, the H2 (Headline steps) on the start 4/12 and its content (ledger, offer list, sibling tiles) on the end 8/12, with a 2rem gap and 4rem / 6rem block padding. Below 1024px heading and content stack with a 2rem gap. The offer list and the sibling tiles go two across from 640px.

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
- The homepage runs more than one motion: the load sequence, the scroll-pinned steps (contracted), an idle float, a logo marquee and count-up numbers.

## Elevation & Depth

Depth is tonal first: paper, cool paper and teal bands do most of the work. Shadows appear under paper documents (the stack, certificates, cards on a field), on overlays, and as a hover response on report cards; they are long, soft and negatively spread so the object reads as lifted paper rather than a card.

### Shadow Vocabulary
- **Lifted sheet** (`box-shadow: 0 1px 2px rgba(2,2,2,0.08), 0 24px 48px -24px rgba(5,42,37,0.45), 0 60px 90px -40px rgba(5,42,37,0.35)`): documents in the homepage stack.
- **Object on field** (`box-shadow: 0 40px 80px -40px rgba(5,42,37,0.4)` to `0 32px 60px -28px rgba(5,42,37,0.6)`): the closing certificate, the about balance card, product images on teal.
- **Overlay** (`box-shadow: 0 24px 40px -24px rgba(5,42,37,0.35)`): the mobile menu panel; the terms contents panel uses the same teal tint, tighter: `0 18px 32px -16px rgb(5 42 37 / 0.22)`.
- **Hover lift** (`box-shadow: 0 24px 40px -28px rgba(5,42,37,0.4)` with translateY(-4px)): report cards.
- **Pressed edge** (`box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12)`): the primary button's base.

- **Seal drop** (`box-shadow: 0 14px 28px -14px rgb(5 42 37 / 0.6)`): the play seal resting on the poster.

- **Seal ring** (`box-shadow: 0 0 0 3px teal, 0 0 0 4px rgb(255 255 255 / 0.75)`): not elevation; a box-shadow used to draw the teal gap and white hairline around a partner seal or partner plate on teal.

### Named Rules
**The Teal Shadow Rule.** Shadows are tinted with Shadow Teal, never neutral grey, and belong to paper documents, overlays and hover states. Sections, tiles and frames at rest stay flat.

## Shapes

Corners are generous and consistent: pills for actions and inputs, 1.25rem for framed sheets and photographs, 1rem for tiles, 0.75rem for paper sheets and highlighted clauses. Fields are not rounded; they are cut with a slanted edge by `clip-path` (an 8% slant on the hero field, a 3.5rem slant on the growth doors' seam, a 4.5rem slant on the integration hero field, a 36 to 40px rise on panels and the figures band, a 2.25rem rise on the integration stage panel below 1024px, a 2.5rem rise on the integration close band's top edge), mirrored in RTL.

Lines carry authority. The document frame is a 1px teal-200 border with a second hairline 4px inside it (`inset 0 0 0 4px paper, inset 0 0 0 5px teal-200`). Seals and postmarks are circles with a 3 to 5px double border, rotated -8 to -10 degrees. Totals, the offer figure in a paper door and the last row of a posting ledger are ruled off with a 4px double teal underline. Elsewhere, divisions are single hairlines in paper-200 or paper-300.

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
- **Tick:** a 1.75rem `teal-100` disc holding a 16px teal-700 check, beside each item of a partner's offer list on paper-300 top rules.
- **Icon tile:** a 48px `teal-100` square at 1rem corners holding a 26px line icon in teal-700 (1.75 stroke), drawn from the shared `Icon` set.

### Navigation
- **Header:** sticky, 64px, paper at 85% with backdrop blur and a paper-200 bottom rule. Logo at the start, links at 0.9375rem in 90% ink turning teal-700 on hover, then locale switch, login and a small orange start pill. Below 1024px a round menu button opens a paper panel of ruled links.
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

### Growth Disc
An SVG redraw laid over the teal disc in a photograph, placed by percentage so it holds its position at every width: a white baseline, four bars and a rising arrow. It draws once on load in CSS only: the baseline's stroke (0.4s from 0.2s), the bars rising by scaleY from their base (0.6s each, staggered 0.1s from 0.4s), then the arrow (0.6s from 0.85s), all on ease-out-quint; the global reduced-motion rule leaves it finished. In LTR the photograph is mirrored so the arm still enters from the end edge; the disc is not, so the growth arrow always rises to the right.

### Contents Rail (reading register)
A 15rem list on a paper-200 hairline track. Entries are 0.875rem Slate with Graphite numerals; the current entry turns ink at weight 500 with a teal-700 numeral, and a 2px teal-600 thumb slides along the track (0.45s ease-out-quint). Below 1024px it collapses into a bar naming the current section with a button that opens the list as a panel.

### Clause
A two-column grid: a self-linking clause number in a 2.75rem gutter (0.875rem Graphite, teal-700 and underlined on hover), then the text with a bold ink lead label. A linked clause is washed in `teal-50` on arrival and fades to clear over 3.2s. Sub-items use an en-dash marker in Mist.

## Do's and Don'ts

### Do:
- **Do** keep the brand palette pinned: tints and shades of teal, orange, blue, near-black, the two greys and the light grey only, through the theme tokens.
- **Do** give each page one signature idea and one orchestrated motion on load (integration pages: the screen lifts 0.9s from 0.1s, then the play seal stamps 0.5s from 0.75s), using `cubic-bezier(0.22, 1, 0.36, 1)`, with every resting style being the finished state so reduced motion loses nothing.
- **Do** frame paper objects with the double hairline and certify with double-ring seals; rule off totals with the 4px double teal underline.
- **Do** cut teal fields with a slanted edge and mirror the slant, the arrows and any transform in RTL.
- **Do** set the English micro-label (0.625rem, uppercase, 0.08em tracking) only inside paper document objects, as the English line of an official form or a corner stamp.
- **Do** label demonstration data in every mock-up.
- **Do** switch the focus outline to white on any teal ground.
- **Do** set partner and third-party logos on a white seal disc on teal, or on the ringed white plate when the mark is a wordmark too wide for a disc, never directly on the field.
- **Do** draw partner marks at the context height times the mark's optical scale, so no partner outweighs another.
- **Do** use the reading register (no field, no guilloche, no buttons, teal only as a marker) for long documents.

### Don't:
- **Don't** put orange on anything but the primary action or the single "now" marker.
- **Don't** draw the guilloche on paper, on paper objects, on seals or in the reading register.
- **Don't** add a second typeface or load Effra from a third-party link.
- **Don't** use neutral grey shadows, or shadow sections, tiles and frames at rest.
- **Don't** place a micro-label or any small line above a heading as a kicker or eyebrow.
- **Don't** treat Mist (`ink-300`) as a text colour for content that must be read, or treat white on Record Teal and white on Action Orange as meeting AA; both measure below 3:1 and are open items.
