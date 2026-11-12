---
version: 1
slug: "components-vompay-payresult-tsx"
primary_target: "components/vompay/PayResult.tsx"
related_targets: ["app/[lang]/vom-pay-success/page.tsx","app/[lang]/vom-pay-failure/page.tsx","components/vompay/PayError.tsx","lib/content/vom-pay.ts"]
---

# Surface brief: the VoM Pay result pages (`/vom-pay-success/`, `/vom-pay-failure/`, and their `/en/` twins)

Scope: one template, `components/vompay/PayResult.tsx`, for both outcomes in both languages, rendered by `app/[lang]/vom-pay-success/page.tsx` and `app/[lang]/vom-pay-failure/page.tsx` inside the site's header and footer; copy in `lib/content/vom-pay.ts`, the error-code reader in `components/vompay/PayError.tsx`, the shared form `components/forms/LeadForm.tsx`. The app sends a payer here right after a VoM Pay payment; nothing on the site links to the pages, the addresses stay exactly as they were, and each speaks its language (owner, 2026-11-12). Hidden from search (noindex, follow; out of the sitemap). Visitor mode Persuade: the payer learns the outcome at a glance; on success they are invited to try VoM Pay in their own business (name and Saudi mobile required, email optional, saved as `vom-pay-success`); on failure they read why (the app's `?vom_pay_errors=` code and its message) and the three FAQs. Copy and images are the old pages', Arabic one to one; English written natively (owner).

## Direction contract

THESIS: Status beside the form. The first screen holds both halves of the moment: on the start side, the outcome (the old illustration on the old light-blue ribbon panel, the status at display size and its line); on the end side, what comes next. On success that is the invitation and the form on the teal field; on failure, the message for the app's code and the FAQ. It refuses the old centred stack, where the next step waited a screen below the status.

OWN-WORLD: The Official Record. The status panel is the old pages' own light-blue ribbon image at the card radius, the illustration standing in it, the success status in Engraver's Teal (teal-700), the failure status in ink (no red; orange stays on actions; the illustration's own orange cross carries the failure). The success field is teal-600 guilloche holding the paper lead sheet in the doc frame; the invitation is the sheet's head, ink on paper, over the 4px double teal rule. The failure end side is a paper sheet in the doc frame with the message under the same rule, the FAQ in the house details pattern under it. Below on success: the pitch as the section's statement beside the VoM AI logo, «مميزات» over the six features as a ruled register (icons, titles, bodies; the first feature beside the laptop and ZATCA's logo plate), and the house slanted teal-600 close band with «سجل الآن».

STORY: The payer sees at once that the payment went through or failed. Success: they are invited to try VoM Pay free and can leave their details beside the status, then read what VoM does and sign up. Failure: they see the code and what it means, then the questions people ask.

FIRST VIEWPORT: 1440×900 under the 64px header, Arabic (start on the right; English mirrors). Start 6/12: the ribbon panel with the illustration (about 20rem tall), «تم الدفع بنجاح!» at display size in teal-700, «هل أعجبتك تجربتك مع VoM Pay؟». End 6/12, top-aligned: the teal field with the sheet: «الآن يمكنك تجربة VoM Pay في عملك مجاناً» (bold), «اترك بياناتك أدناه…», the double rule, name, mobile, email (optional), the full-width orange «إرسال». Failure: the same panel with «فشل الدفع!» in ink and «رمز الخطأ: N» when the app sent one; end side the message sheet then three FAQ rows. Phones (390): the panel, then the field as a full-bleed slanted band (success) or the sheet and FAQ (failure). Motion once: the illustration rises 1rem into place and fades in (0.8s from 0.1s, ease-out-quint); reduced motion shows it at rest.

FORM: Status beside the form, candidate 3 on an ordered list of 7 (the stamped record, the receipt slip, status beside the form, a two-step strip, the centred stack, the status band, the phone frame), dealt with the stamped record and the status band; the owner locked it. Seed key 734d58dc. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- All English copy is new, as are the Arabic form's errors and thank-you (reused from the campaign form) and the illustrations' alt text; they await the owner's approval.
- No GTM conversion listens for the form (form_id 619dac9).
- Open AA failure awaiting the owner's ruling: white text on #FF7300 measures about 2.7:1 against the 4.5:1 floor on both orange buttons these pages carry, the form's «إرسال» / "Send" and the close band's «سجل الآن» / "Register Now" (the site-wide `btn-primary` conflict).
- The second FAQ answer ends «في هذا القطاع», left over from a sector page; kept one to one in Arabic, dropped in the English.
- The feature list's first two icons are the same drawing, as on the old page.
- With no code or code 1, the failure sheet's old heading «حصل خطأ في عملية الدفع!» and the general message «حدث خطأ ما في عملية الدفع» say nearly the same thing; both are old copy (the heading from the page, the message from its script), kept for the owner to decide.
