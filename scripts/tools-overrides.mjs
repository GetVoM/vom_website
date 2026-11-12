/**
 * Page-by-page decisions for scripts/import-tools.mjs. Every entry is a change
 * to the old copy and is listed in docs/content/tools/text-changes.md.
 */

/** Saved file (getvom.com/tools/<file>.html) → tool id (lib/content/tools/catalogue.ts). */
export const files = {
  "حاسبة-الضريبة": "vat",
  "حاسبة-هامش-الربح": "margin",
  "حاسبة-الخصم": "discount",
  "برنامج-حساب-الراتب-حاسبة-الرواتب": "salary",
  "حاسبة-الزكاة": "zakat",
  "حاسبة-الزكاة-للشركات": "zakat-company",
  "حاسبة-الوعاء-الزكوي": "zakat-base",
};

/**
 * Exact-text replacements on the imported copy: [before, after, why]. Each must
 * match at least once or the import fails, so a re-import never drifts silently.
 */
export const replacements = {
  vat: [
    // Owner ruling, 2026-11-12: the rate is 15% (as the same page says further down) and the authority is ZATCA.
    ["بمعدل قدره 5%", "بمعدل قدره 15%", "fact (owner)"],
    ["الهيئة العامة للزكاة والدخل", "هيئة الزكاة والضريبة والجمارك", "fact (owner)"],
    ["إجراءت", "إجراءات", "typo"],
  ],
  discount: [["ماهو الفرق", "ما هو الفرق", "typo"]],
  salary: [
    ["لستكافئ", "لتكافئ", "typo"],
    ["إحترافية", "احترافية", "typo"],
  ],
  "zakat-company": [
    ["الأموال الموجود ", "الأموال الموجودة ", "typo"],
    // Its siblings read «2. …» and «3. …»; this one was a bullet with no number.
    ["<h3>حاسبة زكاة منصة زكاتي</h3>", "<h3>1. حاسبة زكاة منصة زكاتي</h3>", "numbering"],
  ],
};

/** Headings that are dropped: page-builder leftovers, not copy. */
export const dropHeadings = {
  // An English Elementor heading above the Arabic calculator, whose own title («آلة حاسبة الزكاة») now heads it.
  zakat: ["Zakat Calculator"],
};

/** Headings whose level changes: [text, from, to]. */
export const headingLevels = {
  // One of nine software features, each an H3 in a bullet; this one alone was typed as an H2.
  salary: [["حساب صافي الراتب بعد خصم التأمينات", 2, 3]],
};

/** A paragraph that starts with this text ends the FAQ (it follows the last answer but is not part of it). */
export const faqStop = {
  margin: /^إليك قالب إكسل مجاني/,
};

/**
 * Internal links whose target moved or never existed: old path → new path, or
 * null to keep the words and drop the link.
 */
export const linkFixes = {
  // The post lives under /invoicing/ (its path in Supabase and url-map.csv); WordPress answered either category.
  "/tax-zakat/السلع-والخدمات-المعفاة-من-ضريبة-القيم/": "/invoicing/السلع-والخدمات-المعفاة-من-ضريبة-القيم/",
  // No such post in the WordPress inventory or in Supabase.
  "/tax-zakat/الامتثال-السريع-مع-هيئة-الزكاة/": null,
};

/** Image alt text fixes: original file name → alt. */
export const altFixes = {
  // The old alt dropped the first letter (رنامج).
  "برنامج-حساب-الراتب4.png": "برنامج حساب الراتب",
};
