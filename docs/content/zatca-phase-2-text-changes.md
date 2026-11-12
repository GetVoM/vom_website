# ZATCA Phase 2 page (English): what changed from WordPress

`/en/zatca-e-invoicing-phase-2/` is English only. The English navbar's e-invoicing item, the Resources menu, the footer and the homepage's resources list all link to it. It was read from the mirrored WordPress page (`getvom.com/en/zatca-e-invoicing-phase-2/index.html`, Elementor page 13954) on 2026-11-12.

The owner's rule is **the copy one to one, spelling fixes only**. Three owner rulings (2026-11-12) go beyond it:

- **SEO tags:** the page has a new English title and description.
- **Arabic twin:** it is paired with the Arabic e-invoicing hub `/الفوترة-الإلكترونية/` for the language switch and hreflang.
- **Heading:** the second «How to Get Started» heading is renamed.

Where things are:

- **Copy and images:** `lib/content/zatca-phase-2.ts`.
- **Form name and the GTM contract:** `lib/leads/zatca-phase-2.ts`.
- **Image import:** `scripts/import-zatca-phase-2.mjs`. Every image has a `.webp.json` sidecar naming its source.

## SEO

| | Old (WordPress) | Now |
|---|---|---|
| Title | «مدونة محاسبة متخصصة في كل ما يخص المحاسبة» (the Arabic blog's) | «ZATCA E-Invoicing Phase 2: The Integration Phase \| VoM» |
| Description | the Arabic blog's description | «What ZATCA's second e-invoicing phase requires, how to connect to Fatoora step by step, and how VoM submits your tax and simplified invoices for you.» |
| Canonical | `/en/blog-en/en/` | `https://getvom.com/en/zatca-e-invoicing-phase-2/` |
| hreflang | none | `en` (itself), `ar` and `x-default` (the Arabic e-invoicing hub) |
| `og:image` | the 1650×396 ZATCA badge | `/og/zatca-phase-2-en.png` (1200×630) |
| H1 | «Integration Phase» | kept |

## Copy fixes

| Where | Before → after | Why |
|---|---|---|
| Second "How…" heading | «How to Get Started in the Second Phase ?» → «How Does the Second Phase Work?» | Owner, 2026-11-12. The old page repeated the first heading over the tax/simplified comparison. |
| First "How…" heading | «…Second Phase ?» → «…Second Phase?» | Space before the question mark |
| Form button | «Regester Now» → «Register Now» | Typo |
| Step 1 | «notifies taxpayers about the Wave of linking» → «the wave of linking» | Capital letter mid-sentence |
| VoM's five | «the Vom accounting software», «as Vom ensures», «our Vom accounting software» → «VoM» | Brand casing |
| VoM's five | trailing colons dropped from the five item titles («Facilitating the Submission Process:» → «…Process») | They are headings now |
| Tax invoices, step 1 | a zero-width space after «tax invoice.» removed | Character fix |
| Enhance | two trailing line breaks removed | Character fix |
| Quotes and apostrophes | "Fatoora", 'Fatoora' and “Fatoora” → “Fatoora”; «Kingdom's», «taxpayer's», «we'll» → curly apostrophes | One style |
| Step 3 | the bold on «“Fatoora platform”» dropped; the quotes stay | Style, not copy |

Everything else is verbatim. That includes the paragraphs without a final full stop (Approval's second line, Commitment, Ensure, Enhance, steps 5–7), which are kept as they were.

## Form

| Old Elementor form («Digital Ads 2023», id `e52c297`) | Now |
|---|---|
| Placeholders only: «Full Name», «Phone 0512345678» | Real labels «Full Name» and «Phone», with `0512345678` kept as the phone's placeholder |
| Both fields required; phone pattern `[0-9()#&+*-=.]+` | Both required; the phone must be a Saudi mobile, stored as `05XXXXXXXX` (`lib/leads/phone.ts`, the rule the owner set for the first form) |
| Hidden fields `source=Campaign`, `utm_source`, `utm_campaign` | The form's name in the leads table (`zatca-e-invoicing-phase-2`) says where it came from; the URL's `utm_*`, `gclid` and `fbclid` are saved in the lead's `utm` |
| Elementor's own success message | A thank-you with a WhatsApp link |

**New copy** (it did not exist on the old page, and needs the owner's approval):
- the field errors: «Enter your full name.» and «Enter a 10-digit Saudi mobile number starting with 05, like 0512345678.»
- «Sending…»
- the network error: «We couldn’t send your details just now. Check your connection and try again, or message us on WhatsApp.»
- the thank-you: «Thank you, we have your details.» / «Our team will contact you as soon as possible.» / «Need a faster reply? Message us on WhatsApp»

## Images

| Old | Now |
|---|---|
| ZATCA «Phase 2 e-invoicing» badge `2024/04/Untitfgdgfled-1-02.png`, no alt | `public/zatca-phase-2/badge.webp`, alt «Zakat, Tax and Customs Authority: Phase 2 e-invoicing» |
| VoM logo `2024/04/Green-Logo.png` beside the badge | The site's own logo (`/brand/vom-logo.png`, the same mark), joined to the badge by the drawn line |
| Laptop mock-up `2024/04/ZATCA-10.png` (2048px copy), no alt | `laptop.webp`, alt «VoM’s dashboard on a laptop, with a Phase 2 e-invoice in front of it» |
| Four ribbon photos `2024/04/Student5-11…14.png`, no alt | `ensure.webp`, `enhance.webp`, `issue.webp`, `comply.webp`, each with an alt describing the photo, in the old page's pairing (Ensure 12, Enhance 11, Issue 14, Comply 13) |
| 18 inline SVG icons, each wrapping a bitmap (36–70 KB) | 14 unique `icon-*.webp` at 256px; the four that repeat (seller, buyer, authority, stored invoice) are written once. They are decorative beside their text |
