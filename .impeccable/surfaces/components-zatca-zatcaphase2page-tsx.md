---
version: 1
slug: "components-zatca-zatcaphase2page-tsx"
primary_target: "components/zatca/ZatcaPhase2Page.tsx"
related_targets: ["app/[lang]/zatca-e-invoicing-phase-2/page.tsx","components/forms/LeadForm.tsx","lib/content/zatca-phase-2.ts"]
---

# Surface brief: the English ZATCA Phase 2 page (`/en/zatca-e-invoicing-phase-2/`)

Scope: one English-only page, `app/[lang]/zatca-e-invoicing-phase-2/page.tsx` → `components/zatca/ZatcaPhase2Page.tsx`, inside the site's header and footer, with the shared lead form `components/forms/LeadForm.tsx`; copy and images from `lib/content/zatca-phase-2.ts`. The English navbar's e-invoicing item; paired with the Arabic e-invoicing hub for the language switch and hreflang (owner, 2026-11-12). Visitor mode Persuade: a business owner who must connect to Fatoora learns what Phase 2 asks and leaves name and mobile (both required) or signs up or books a call. Indexed, with a new English title and description (owner, 2026-11-12). Copy, images and the 18 icons are the old page's, one to one; the second "How…" heading is renamed «How Does the Second Phase Work?» (owner). The form's success pushes the old Elementor event (`elementor_form_success`, form_id e52c297); that contract is in `lib/leads/zatca-phase-2.ts`.

## Direction contract

THESIS: The Phase 2 link. The page draws the integration it sells: in the first screen one teal line leaves the VoM mark, loops once like the ribbon in the old photos, and lands on ZATCA's Phase 2 badge. The same line, same weight, then runs down the page as its thread: a margin line every section hangs on, branching into the seven steps and the two invoice flows, and ending above the closing Register Now. It refuses the category default of a hero, then a stack of same-size icon cards.

OWN-WORLD: The Official Record, as the Arabic hub wears it. Paper ground; the teal-600 guilloche field holds the paper lead sheet (the doc frame, double hairline) at the end side; the ZATCA badge on a white plate in a paper-300 hairline; the line is 2px teal-500, its stations ringed paper discs, its step nodes teal-700 numerals in ringed discs; photos at the sheet radius in a paper-200 hairline; icons small on paper. Headings keep the old page's accent words in teal-700. Orange only on Register Now (the submit and the sign-up links); Book a call is the outlined secondary. The close is the house slanted teal guilloche band in white.

STORY: The visitor reads «Integration Phase», sees VoM linked to ZATCA's Phase 2 mark and the form beside it; scrolling, they learn what Phase 2 is, what it asks, the seven steps to connect, how tax and simplified invoices travel, and what VoM does for them; they register in the form, sign up, or book a call. Success swaps the form for a thank-you and a WhatsApp link in the same field.

FIRST VIEWPORT: 1440×900 LTR under the 64px header. Start 7/12: breadcrumb, H1 «Integration Phase» at display size, the lede, then the lockup row: the VoM mark, the drawn teal line with its loop, the ZATCA badge plate. End 5/12: the teal guilloche field with the paper sheet (Full Name, Phone with 0512345678, full-width orange Register Now). Phones (390): breadcrumb, H1, lede, lockup scaled, then the field as a full-bleed band with the sheet; the thread becomes a start-edge margin line. Motion once: the line draws from VoM to the badge (0.9s from 0.15s, ease-out-quint) and the badge's ring closes at its end; reduced motion shows it drawn.

FORM: The Phase 2 link, candidate 7 on an ordered list of 7 (index card, swimlane, form that stays, seven-step spine, readiness check, poster bands, the Phase 2 link), dealt with the readiness check and the index card; the owner locked it. Seed key 3180c769. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- New copy awaiting approval: the form's errors, sending state, network fallback and thank-you.
- «Register Now» names two actions, as on the old page: the form (a callback) and the app sign-up links.
- No conversion tag listens for this form in GTM (form_id e52c297); the old Google Ads user-data tag (Elementor class) does not fire.
- The orange submit's white text measures about 2.7:1, the site-wide `btn-primary` conflict recorded in DESIGN.md.
- The laptop mock-up shows VoM's Arabic interface on an English page; it is the old page's image.
