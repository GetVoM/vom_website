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
---

# Design System: VoM website (getvom.com)

## Overview

**Creative North Star: "The Official Record" (الوثيقة)**

Every page is a document VoM issues to the visitor. The ground is white paper; authority arrives as one unbroken field of brand teal engraved with a fine guilloche, the lattice of certificates and banknotes. Paper objects (invoices, certificates, a sealed envelope, framed sheets) sit on that field with the precision of a government form: rounded double-hairline frames, double-ring seals, serial numbers, tabular numerals, a bilingual English line under the Arabic one. Effra sets everything, Arabic, Latin and digits alike, and the layout is built right-to-left first with every component mirrored for English.

The system is restrained by rule. Each page gets one signature idea (the document stack issuing itself on the homepage, the envelope opening on contact, the figures rolling on about, the scroll-spy contents on terms) and the rest of the page stays quiet around it. Orange is the single hot colour and marks the one thing to press or the one "now". Buttons are small, precise pills. Sections alternate paper, the light paper-100 grey, and teal bands; depth is mostly tonal, with long teal-tinted shadows reserved for paper objects lifted off a field.

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
- **Display, two-tier** (300 then 700, 2.5rem / 3.25rem / 3.75rem, 1.15): the homepage H1, a light tier in Slate over a bold tier in Ink.
- **Display, reading** (700, 2.5rem, 3.5rem from 1024px, 1.15): the H1 of long documents.
- **Headline** (700, 1.875rem / 2.25rem / 2.5rem, 1.2 to 1.25): section H2s. About uses 2.75rem at lg (observed drift, see Layout).
- **Title** (700, 1.375rem, 1.5rem from 1024px, 1.35): terms section titles and team names.
- **Item title** (700, 1.125rem to 1.25rem, 1.375): list entries, values, cards.
- **Body** (400, 1.0625rem, 1.6): the default. Marketing copy runs at 1.7 to 1.8 line height in Slate, capped at 44 to 62ch.
- **Body, reading** (400, 1.0625rem, 1.125rem from 1024px, 1.75, Arabic 1.85): legal reading, in Reading Ink. The text column fills the page container beside the contents rail (owner, 2026-11-09), so lines run long at wide screens: about 125 characters in Arabic and 90 in English at 1440px.
- **Label** (400 to 700, 0.875rem to 0.9375rem): nav, buttons, meta, footer.
- **Caption** (400, 0.75rem to 0.8125rem): dates, demonstration-data labels, mock-up rows.
- **Figure** (700, 1): tabular numerals. 3 to 3.5rem in teal-700 on the homepage record; 4.5 to 5.5rem on about story rows; poster scale `clamp(8.75rem, 12.2vw, 11rem)` in white on the about band.

### Named Rules
**The Effra Only Rule.** One family, loaded through `next/font/local`, weights 300, 400, 500 and 700. No second face, no third-party font link.

**The Tabular Figure Rule.** Every number that can be compared (amounts, serials, dates, counts, clause numbers) is tabular and set `dir="ltr"` inside Arabic text.

## Layout

The page is a 1280px column with a 16px gutter that respects safe-area insets. Composition is asymmetric: hero and closing sections split 7/12 to 5/12 (or 6/5, 8/4), with copy on the start side and the field or object on the end side. Headings balance, H1 to H3 track at -0.01em.

Section rhythm: 4rem / 6rem (about), 5rem / 7rem (teal bands), 6rem / 8rem (homepage sections), stacked mobile value first, lg value from 1024px. Stacks inside a column step at 1rem, 1.25rem, 1.5rem and 1.75rem gaps.

Responsive: 640px (type steps up), 1024px (columns, desktop header nav, terms rail), 1180px (about figures side by side). Below 1024px the slanted teal field becomes a full-width teal panel under the copy, with a slanted top edge, and the paper object sits on it.

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
- The homepage runs more than one motion: the load sequence, the scroll-pinned steps (contracted), an idle float, a logo marquee and count-up numbers.

## Elevation & Depth

Depth is tonal first: paper, cool paper and teal bands do most of the work. Shadows appear under paper documents (the stack, certificates, cards on a field), on overlays, and as a hover response on report cards; they are long, soft and negatively spread so the object reads as lifted paper rather than a card.

### Shadow Vocabulary
- **Lifted sheet** (`box-shadow: 0 1px 2px rgba(2,2,2,0.08), 0 24px 48px -24px rgba(5,42,37,0.45), 0 60px 90px -40px rgba(5,42,37,0.35)`): documents in the homepage stack.
- **Object on field** (`box-shadow: 0 40px 80px -40px rgba(5,42,37,0.4)` to `0 32px 60px -28px rgba(5,42,37,0.6)`): the closing certificate, the about balance card, product images on teal.
- **Overlay** (`box-shadow: 0 24px 40px -24px rgba(5,42,37,0.35)`): the mobile menu panel; the terms contents panel uses the same teal tint, tighter: `0 18px 32px -16px rgb(5 42 37 / 0.22)`.
- **Hover lift** (`box-shadow: 0 24px 40px -28px rgba(5,42,37,0.4)` with translateY(-4px)): report cards.
- **Pressed edge** (`box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12)`): the primary button's base.

### Named Rules
**The Teal Shadow Rule.** Shadows are tinted with Shadow Teal, never neutral grey, and belong to paper documents, overlays and hover states. Sections, tiles and frames at rest stay flat.

## Shapes

Corners are generous and consistent: pills for actions and inputs, 1.25rem for framed sheets and photographs, 1rem for tiles, 0.75rem for paper sheets and highlighted clauses. Fields are not rounded; they are cut with a slanted edge by `clip-path` (an 8% slant on the hero field, a 36 to 40px rise on panels and the figures band), mirrored in RTL.

Lines carry authority. The document frame is a 1px teal-200 border with a second hairline 4px inside it (`inset 0 0 0 4px paper, inset 0 0 0 5px teal-200`). Seals and postmarks are circles with a 3 to 5px double border, rotated -8 to -10 degrees. Totals are ruled off with a 4px double teal underline. Elsewhere, divisions are single hairlines in paper-200 or paper-300.

## Components

### Buttons
Small, precise and pill-shaped, in Effra bold at 0.9375rem, often with a 16px arrow that flips in RTL.
- **Shape:** full pill (999px), 44px tall (40px in the header).
- **Primary:** Action Orange with white text, 20px inline padding, a pressed 2px inner base; hover `orange-600`. One per view.
- **Secondary:** transparent with an 80% ink border; hover full ink border and Cool Paper.
- **Ghost:** text with a 2px teal underline at 6px offset; hover the underline turns ink. Pairs with the primary.
- **Inverse:** white with Deep Teal text, for teal bands; hover `teal-50`.
- **Focus / Active:** 2px teal outline at 3px offset; active nudges 1px down.

### Inputs / Fields
- **Style:** pill input, 48px, paper-300 border on paper, 20px padding.
- **Focus:** border turns Record Teal, no glow.

### Cards / Containers
- **Document frame:** Paper, 1.25rem corners, double hairline, 28 to 40px padding, internal dividers in teal-200. Used for the homepage record, certificates and about's vision and mission sheets.
- **Tiles:** Paper with a paper-200 or paper-300 border at 1rem corners; link tiles hover to a teal border on `teal-50`.
- **Icon tile:** a 48px `teal-100` square at 1rem corners holding a 26px line icon in teal-700 (1.75 stroke).

### Navigation
- **Header:** sticky, 64px, paper at 85% with backdrop blur and a paper-200 bottom rule. Logo at the start, links at 0.9375rem in 90% ink turning teal-700 on hover, then locale switch, login and a small orange start pill. Below 1024px a round menu button opens a paper panel of ruled links.
- **Breadcrumb:** 0.875rem Graphite with mirrored chevrons; current page in Slate.
- **Footer:** Cool Paper, a four-column grid, quiet links in Slate turning teal-700, outlined pill app-store links, a hairline above the legal line.

### Seal and Postmark
Double-ring circles that certify: teal on paper (96px certificate seal, 68px envelope seal, 76px postmark), white on teal (220px closing seal). Slightly rotated, set in bold Effra with tabular numerals.

### Contents Rail (reading register)
A 15rem list on a paper-200 hairline track. Entries are 0.875rem Slate with Graphite numerals; the current entry turns ink at weight 500 with a teal-700 numeral, and a 2px teal-600 thumb slides along the track (0.45s ease-out-quint). Below 1024px it collapses into a bar naming the current section with a button that opens the list as a panel.

### Clause
A two-column grid: a self-linking clause number in a 2.75rem gutter (0.875rem Graphite, teal-700 and underlined on hover), then the text with a bold ink lead label. A linked clause is washed in `teal-50` on arrival and fades to clear over 3.2s. Sub-items use an en-dash marker in Mist.

## Do's and Don'ts

### Do:
- **Do** keep the brand palette pinned: tints and shades of teal, orange, blue, near-black, the two greys and the light grey only, through the theme tokens.
- **Do** give each page one signature idea and one orchestrated motion on load, using `cubic-bezier(0.22, 1, 0.36, 1)`, with every resting style being the finished state so reduced motion loses nothing.
- **Do** frame paper objects with the double hairline and certify with double-ring seals; rule off totals with the 4px double teal underline.
- **Do** cut teal fields with a slanted edge and mirror the slant, the arrows and any transform in RTL.
- **Do** set the English micro-label (0.625rem, uppercase, 0.08em tracking) only inside paper document objects, as the English line of an official form or a corner stamp.
- **Do** label demonstration data in every mock-up.
- **Do** use the reading register (no field, no guilloche, no buttons, teal only as a marker) for long documents.

### Don't:
- **Don't** put orange on anything but the primary action or the single "now" marker.
- **Don't** draw the guilloche on paper, on paper objects, on seals or in the reading register.
- **Don't** add a second typeface or load Effra from a third-party link.
- **Don't** use neutral grey shadows, or shadow sections, tiles and frames at rest.
- **Don't** place a micro-label or any small line above a heading as a kicker or eyebrow.
- **Don't** treat Mist (`ink-300`) as a text colour for content that must be read, or treat white on Record Teal and white on Action Orange as meeting AA; both measure below 3:1 and are open items.
