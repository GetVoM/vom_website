---
version: 1
slug: "components-campaigns-digitalads2023-tsx"
primary_target: "components/campaigns/DigitalAds2023.tsx"
related_targets: ["app/(campaigns)/digital-ads-2023-landing-page/page.tsx","components/campaigns/LeadForm.tsx"]
---

# Surface brief: the digital-ads campaign landing page (`/digital-ads-2023-landing-page/`)

Scope: one Arabic-only, paid-campaign page, `app/(campaigns)/digital-ads-2023-landing-page/page.tsx` → `components/campaigns/DigitalAds2023.tsx`, with the lead form `components/campaigns/LeadForm.tsx`; copy and images from `lib/content/campaigns/digital-ads-2023.ts`. Its own root layout `app/(campaigns)/layout.tsx`: no site header, navigation or footer. Visitor mode Persuade: the visitor arrives from an ad and the one success is a submitted lead (name and Saudi mobile required; email and sector optional). Hidden from search (noindex, follow; owner 2026-11-12), so the SEO title and description are kept as they were and no structured data is owed. Copy, photo, four feature icons, 47 client logos, the star image, the six quotes with their avatars and the 12 round logos are the old page's, one to one; the quotes' placeholder name «Client One» is removed (owner, 2026-11-12). The form's success pushes the old Elementor event to GTM (`elementor_form_success`, form_id c8749cd); that contract is in `lib/leads/digital-ads-2023.ts` and must not change with the design.

## Direction contract

THESIS: The form that stays. On desktop the form never leaves the screen: a sticky teal panel at the end side holds the paper form while the story scrolls past it on the start side. On a phone the form follows the headline, and a slim «سجل الآن» bar brings it back once it has scrolled away. It refuses the category default: a hero with one form, then a long page whose every later section ends in a button that scrolls back up.

OWN-WORLD: The Official Record. The panel is the teal guilloche field at teal-600 (white text on teal, about 3.8:1; teal-500 measures 2.4:1), a full-width band with the house 2.25rem slanted top edge below 1024px and a rounded sticky card from 1024px; the form is a white paper sheet in the double-hairline doc frame, lifted onto the field as the tool pages' sheets are. The ZATCA logo closes the heading on its own white plate, like the issuing authority's mark on a record. The story column is paper: the photo in a doc frame, the four features as a ruled 2×2 with their old illustrations, the 47 client logos as a quiet tiled wall with its short last row centred (no marquee beside the form), the star image over six quote cards, each closed by its round avatar, the 12 round logos in their own block. After the photo each section is filed under a paper-200 hairline, as the features register is. Orange appears once: the «سجل الآن» submit (the phone bar repeats the same action). The floating WhatsApp button is a teal disc with the white glyph (no new hue); below 1024px it steps aside while the form panel is on screen, so it never covers a field.

STORY: The visitor reads the promise and the ZATCA mark, sees the form beside it, and can register at any point of the scroll; each section below adds one kind of proof (the product's features, who uses it, what they say). Success replaces the form with a thank-you and a WhatsApp link in the same panel, and the panel's «سجل الآن…» title goes away. A failed call keeps the entries and shows a message.

FIRST VIEWPORT: 1440×900 RTL. Start 7/12: the VoM wordmark, then the H1 (display-reading, bold) «سهّل إدارتك المالية وصدّر فواتيرك الإلكترونية مع ڤوم المعتمد من» ending in the ZATCA plate, then the lede. End 5/12, sticky from 1.5rem: the teal panel, its title «سجل الآن ليتواصل معك فريقنا بأسرع وقت ممكن» in white, the sheet with four labelled fields (name, mobile, then email and sector marked optional) and the full-width orange «سجل الآن». Phones (390): wordmark, H1, lede, then the panel as a full-bleed band with the sheet, then the story; the return bar slides up from the bottom once the panel is above the viewport, beside the WhatsApp disc. From 1024px wide and up to 820px tall the panel tightens (smaller paddings, 2.75rem fields) so it stays sticky down to 621px of window; it scrolls inside itself if error messages make it taller than the window. At 620px and below it scrolls with the page and the return bar (20rem, beside the WhatsApp disc) takes over. Motion once: the sheet lifts 1.5rem into place on load (0.6s, ease-out-quint); reduced motion shows it settled and the bar appears without sliding.

FORM: The form that stays, candidate 2 on an ordered list of 6 (split hero with the form card, the form that stays, the registration slip, photo-led hero with an overlapping form, proof beside the promise, the form twice), dealt with the registration slip and proof beside the promise; the owner locked it. Seed key ee13c94d. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- The SEO title claims «الاول في السعودية»; kept one to one.
- The quotes carry no names (the old page's «Client One» was a placeholder, removed on the owner's instruction); real names would make them credible.
- New copy awaiting approval: the optional marks, the sector select's «اختر قطاعك», the field and network errors, the sending state, the thank-you, the WhatsApp button's label.
- The orange submit carries white 17px bold text at about 2.7:1, the site-wide `btn-primary` pairing; DESIGN.md records it as an open conflict.
- No privacy notice at the point of collection; it needs new copy and a target page from the owner.
- The quote avatars' alt text names the five client logos they show.
