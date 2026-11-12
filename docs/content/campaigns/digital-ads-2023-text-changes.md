# Digital-ads landing page: what changed from WordPress

`/digital-ads-2023-landing-page/` is a paid-campaign page. It is Arabic only, linked from nowhere on the site, and hidden from search (`noindex, follow`; out of the sitemap; owner, 2026-11-12). It was read from the live page on 2026-11-12. The HTML sits behind a Cloudflare challenge, so it was read in a browser; the images were downloaded from `getvom.com/wp-content/uploads`, because R2 does not hold them.

The owner's rule is **the copy one to one, spelling fixes only**. The testimonials' quotes and avatars are **copied exactly** (owner, 2026-11-12, overriding PRODUCT.md's rule for this page only). The template's placeholder name «Client One» under each quote is **removed**, with nothing in its place (owner, 2026-11-12).

- **Copy and images:** `lib/content/campaigns/digital-ads-2023.ts`.
- **Form options and the GTM contract:** `lib/leads/digital-ads-2023.ts`.
- **Image import:** `scripts/import-campaign-images.mjs`. Every image has a `.webp.json` sidecar naming its source.

## Kept byte for byte

- **SEO title:** «برنامج المحاسبة السحابي الاول في السعودية - جرب مجانا | ڤوم», including the claim «الاول في السعودية».
- **Meta description:** the old one, with its leading space trimmed. It keeps «و المشتريات و تسجيل» as it was.
- **The six quotes, as customers wrote them:** «مناسب الشركات», «فوم», «الاخرى», «ماشاء الله», «افضل الاشياء», «وانا», «اي» and «انصح فيه» are not corrected.

## Character and spelling fixes

| Where | Before → after | Why |
|---|---|---|
| Heading, «مميزات ﭬوم» | «ﭬوم» (presentation form) → «ڤوم» | Character fix, as on every rebuilt page |
| Lede | leading non-breaking space removed | Character fix |
| Lede | «المبيعات و المشتريات و تسجيل» → «المبيعات والمشتريات وتسجيل» | The conjunction joins its word |
| Features | «سجل و تتبع إيرادات و مصروفات الشركة» → «سجل وتتبع إيرادات ومصروفات الشركة» | Same |
| Features | «الربط مع أنظمة متعددة و مختلفة» → «الربط مع أنظمة متعددة ومختلفة» | Same |
| Sector list | «قطاع الاعمال» → «قطاع الأعمال» (now the select's empty option, not a choice) | Hamza; the old first option was a placeholder that the form accepted as a value |
| Sector list | «المواد الاساسية» → «المواد الأساسية», «السلع الراسمالية» → «السلع الرأسمالية», «السلع طويلة الاجل» → «السلع طويلة الأجل», «انتاج الاغذية» → «إنتاج الأغذية», «التامين» → «التأمين», «ادارة وتطوير العقارات» → «إدارة وتطوير العقارات» | Hamzas |
| Sector list | «الاعلام والترفية» → «الإعلام والترفيه», «تجزية الاغذية» → «تجزئة الأغذية» | Typos |
| Sector list | « الخدمات التجارية والمهنية» → «الخدمات التجارية والمهنية» | Leading space |

## Form

| Old Elementor form | Now |
|---|---|
| Placeholders only, no labels | Real labels from the old placeholder words («الاسم الكامل», «رقم الجوال», «البريد الإلكتروني», «قطاع الأعمال»), with the example `0512345678` kept as the mobile's placeholder |
| All four fields required | Name and mobile required; email and sector optional, marked «(اختياري)» (owner, 2026-11-12) |
| Mobile pattern `[0-9()#&+*-=.]+` | A Saudi mobile only, stored as `05XXXXXXXX` (owner, 2026-11-12). Arabic or Persian digits, spaces and dashes, `+966`, `00966`, `966` or no leading zero are all read as the same number (`lib/leads/phone.ts`) |
| Hidden fields `source=Campaign`, `utm_source`, `utm_campaign` | The form's name in the leads table says where it came from (`digital-ads-2023-landing-page`). The URL's `utm_*`, `gclid` and `fbclid` are saved in the lead's `utm` |
| Button «سجل الآن» | Kept |

**New copy** (it did not exist on the old page, and needs the owner's approval):
- «(اختياري)»
- «اختر قطاعك», the sector select's empty option (the old placeholder «قطاع الأعمال» is now the field's label)
- the field errors (name, mobile, email, sector)
- «جارٍ الإرسال…»
- the network error
- the thank-you («شكرًا لك، وصلنا طلبك.» / «سيتواصل معك فريقنا بأسرع وقت ممكن.» / «تحتاج ردًا أسرع؟ راسلنا على واتساب»)
- the WhatsApp button's label «راسلنا على واتساب»
- the screen-reader label for the logo wall («47 شعارًا لعملاء ڤوم»)

## Images

| Old | Now |
|---|---|
| Heading's ZATCA logo `2023/08/Artboard-3.png`, alt «هيئة الزكاة» | `public/campaigns/digital-ads-2023/zatca.webp`, alt «هيئة الزكاة والضريبة والجمارك» (completes the heading's sentence) |
| Banner background `2023/10/2d8ce26ff859c2f55d0a7c2891ad1a94.jpg` | `banner.webp`, now a framed photo with alt text |
| Four inline SVG illustrations (40–56 KB each) | `feature-1…4.webp`, rastered from the same SVGs |
| 47 client logos `2023/08/N.png` (carousel) | The homepage's same 47 tiles in `public/clients/`, as a still wall |
| Star image `rating-e1692016573554.png` | `rating.webp`, alt «تقييم خمس نجوم» |
| Quote avatars `33.png`, `عبدالعزيز.jpeg`, `23.png`, `25.png`, `8.png`, `30.png`, alt «المؤثرين» | `avatar-*.webp`, alt naming each logo (Time Entertainment, العم خليل, Out of Line, Sorour Entertainment, KOY & Bakery House) or «صورة صاحب الرأي» |
| 12 round logos `2023/10/Untitled-7-*-1024x1024.png`, alt "Untitled-7-NN" | `round-01…12.webp`, alt naming each one |
| `og:image` `2023/08/1.png` (a client's logo) | The site's features card `/og/features-ar.png` |
| Floating WhatsApp button (Font Awesome icon) | A teal disc with the WhatsApp mark, same link |

The old page had no site header, navigation or footer. The new one has none either; the VoM wordmark at the top is not a link.
