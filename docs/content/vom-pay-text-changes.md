# VoM Pay result pages: what changed from WordPress

After a VoM Pay payment, the app sends the payer to one of four addresses:

- `/vom-pay-success/` and `/vom-pay-failure/`, in Arabic
- `/en/vom-pay-success/` and `/en/vom-pay-failure/`, in English

Nothing on the site links to them. The addresses stay exactly as they were, and each speaks its own language (owner, 2026-11-12). They are hidden from search (`noindex, follow`, out of the sitemap; `url-map.csv` keep-noindex).

The success page was read from the mirror (`getvom.com/vom-pay-success/`, Elementor page 15087). The failure page was read from the live site on 2026-11-12. WordPress served the Arabic page at the two English addresses, with the Arabic blog's title and the canonical `/en/blog-en/en/`.

The owner's rule is **the Arabic copy one to one, spelling fixes only**. The English is new, written natively from the Arabic (owner, 2026-11-12), and awaits the owner's approval.

Where things are:

- **Copy:** `lib/content/vom-pay.ts`.
- **Form name, GTM contract and error codes:** `lib/leads/vom-pay.ts`.
- **Images:** `scripts/import-vom-pay.mjs`. Every image has a `.webp.json` sidecar naming its source.

## The failure page's error codes

The app adds `?vom_pay_errors=<code>` to the failure address. The old page had a script meant to show the code and its message, but it never ran. Every visitor saw «رمز الخطأ: 1» over an Arabic placeholder paragraph («أبجد هوز حطي كلمن…»). The rebuild makes it work (owner, 2026-11-12):

| Code | Arabic (the old script's, spelling fixed) | English (new) |
|---|---|---|
| 1, and the general message | حدث خطأ ما في عملية الدفع | Something went wrong during the payment. |
| 2 | تم دفع هذه الفاتورة بشكل كامل أو جزئي | This invoice has already been paid, in full or in part. |
| 3 | المورد لم يعد نشطًا في خدمة VoM Pay | This supplier is no longer active on VoM Pay. |

- **Unknown code:** the code is shown with the general message.
- **No code, or anything that isn't 1–4 digits:** the general message alone, without a code line.

The placeholder paragraph is gone.

## Kept byte for byte

- The Arabic SEO titles: «فوم باي - تمت العملية بنجاح - Vom» and «فوم باي - فشل الدفع - Vom».

## Arabic fixes

| Where | Before → after | Why |
|---|---|---|
| Success line and description | «هل اعجبتك» → «هل أعجبتك» | Hamza |
| Invitation | «اترك بياناتك ادناه و سيتواصل معك احد اعضاء فريقنا!» → «اترك بياناتك أدناه وسيتواصل معك أحد أعضاء فريقنا!» | Hamzas; the conjunction joins its word |
| Pitch | «احصل على اسهل برنامج محاسبي معتمد من هيئة الزكاة و الضريبة و الجمارك للفوترة الالكترونية» → «أسهل…الزكاة والضريبة والجمارك…الإلكترونية» | Hamzas; the conjunction joins its word |
| Pitch | «بدقة اكبر» → «بدقة أكبر» | Hamza |
| Feature 6 | «و منصات» → «ومنصات» | The conjunction joins its word |
| Form | «البريد الالكتروني» → «البريد الإلكتروني»; «ارسال» → «إرسال» | Hamzas |
| Failure message heading | «حصل خطا في عملية الدفع!» → «حصل خطأ…» | Hamza |
| Code 2 | «بشكل كامل او جزئي» → «أو» | Hamza |
| Code 3 | «VoM pay» → «VoM Pay» | Brand casing |
| FAQ 1 | «هل استطيع» → «هل أستطيع» | Hamza |
| FAQ 3 | «هل فوم مناسب لعملي؟» → «هل ڤوم…» | The brand's Arabic spelling, as in the answer under it |
| Failure description | «رمز الخطأ: 1» (the code's placeholder) → the general message | The old description was the placeholder |

## Structure

- **Success page:**
  - The old pitch's three lines are now the features section's opening. The first line is its heading, «VoM AI» is drawn as its logo (the logo's alt is «VoM AI»), and the third line sits under the heading.
  - «مميزات» heads the six features.
  - The invitation's two lines are the form sheet's head.
- **Failure page:** the FAQ keeps its three questions and answers as a visible list. Its FAQPage schema is dropped, per the site-wide ruling.
- **Second FAQ answer:** it ends «في هذا القطاع», left over from a sector page. It is kept in Arabic and left out of the English.

## Form

| Old Elementor form («VomPayForm», id `619dac9`) | Now |
|---|---|
| Placeholders «الاسم (مطلوب)», «رقم الموبايل (مطلوب)», «البريد الالكتروني» | Real labels «الاسم», «رقم الموبايل», «البريد الإلكتروني (اختياري)»; the example `0512345678` as the mobile's placeholder |
| Only the mobile enforced (`type="number"`) | Name and a Saudi mobile required, email optional and checked only when typed (owner, 2026-11-12); the mobile stored as `05XXXXXXXX` |
| One Arabic form | One form for both languages, saved as `vom-pay-success`; the lead's `locale` says which |

**New copy** (it did not exist on the old pages, and needs the owner's approval):
- the Arabic field errors, «جارٍ الإرسال…», the network error and the thank-you. These reuse the campaign form's wording.
- the illustrations' alt text in both languages
- all the English

## Images

| Old (`2024/08/`) | Now (`public/vom-pay/`) |
|---|---|
| `Image-08.png` (phone with a tick, invoice, coins) | `success.webp`, alt describing it |
| `error-page-icon.png` (phone with a cross, invoice) | `failure.webp`, alt describing it |
| `error-page-bg-scaled.jpg` (the light-blue ribbon behind both heroes) | `hero-bg.webp`, the status panel's background |
| `logo-with-ai.png` | `vom-ai.webp`, alt «VoM AI» |
| `Image-09.png` (laptop) | `laptop.webp` |
| `Image-10-1.png` (ZATCA's logo) | `zatca.webp`, alt «هيئة الزكاة والضريبة والجمارك» / "Zakat, Tax and Customs Authority" |
| Six inline SVG feature icons, each wrapping a bitmap | `icon-*.webp` at 256px; the first two are the same drawing, as on the old page |
