/**
 * The digital-ads campaign form (getvom.com/digital-ads-2023-landing-page/):
 * what the client form and the server schema share. Kept free of imports so the
 * client bundle and `node --test` can load it.
 */

/** The form's name in the `leads` table and in the admin filter: the page's slug (owner, 2026-11-12). */
export const DIGITAL_ADS_FORM = "digital-ads-2023-landing-page";

/**
 * The business sectors the old Elementor form offered, in its order. Spelling
 * fixes only (hamzas, «الترفية», «تجزية»), logged in
 * docs/content/campaigns/digital-ads-2023-text-changes.md. The old first option,
 * «قطاع الاعمال», was its placeholder; it is the field's label here.
 */
export const sectorLabel = "قطاع الأعمال";

export const sectors = [
  "الطاقة",
  "المواد الأساسية",
  "السلع الرأسمالية",
  "الخدمات التجارية والمهنية",
  "النقل",
  "السلع طويلة الأجل",
  "الخدمات الاستهلاكية",
  "الإعلام والترفيه",
  "تجزئة السلع الكمالية",
  "تجزئة الأغذية",
  "إنتاج الأغذية",
  "الرعاية الصحية",
  "البنوك",
  "الاستثمار والتمويل",
  "التأمين",
  "الاتصالات",
  "المرافق العامة",
  "إدارة وتطوير العقارات",
  "الصناديق العقارية المتداولة",
  "أخرى",
] as const;

/**
 * The Google Tag Manager contract (GTM-PS28X6L, read from its public gtm.js on
 * 2026-11-12). On the old page a custom HTML tag listened for Elementor's
 * jQuery `submit_success` and pushed this event; the trigger
 * `event == elementor_form_success AND form_id == c8749cd` fires the campaign's
 * conversions: Meta Lead, the Google Ads conversion, GA4 `generate_lead` and the
 * Stape server event. The new page has no jQuery, so the form pushes the same
 * event itself after a lead is saved. Change these only together with the
 * container.
 */
export const gtmFormSuccess = {
  event: "elementor_form_success",
  form_name: "Digital Ads 2026",
  form_id: "c8749cd",
} as const;
