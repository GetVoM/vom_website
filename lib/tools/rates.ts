/**
 * The fixed figures the calculators use. Each one names where it comes from, so
 * the reviewing accountant can confirm it (docs/content/tools/calculator-rules.md).
 * Nothing here is a live price: gold and silver prices are typed by the visitor
 * (owner, 2026-11-12).
 *
 * Kept free of imports so `node --test` can load it directly.
 */
export const rates = {
  /** Saudi VAT standard rate since 1 July 2020 (ZATCA). Also the old page's own copy («نسبة الضريبة في السعودية هي 15%»). */
  vatPercent: 15,
  /** Zakat on zakatable wealth: a quarter of a tenth. All four zakat pages state 2.5%. */
  zakatPercent: 2.5,
  /** Nisab in grams of gold (85 g, the common reading of 20 mithqal). */
  nisabGoldGrams: 85,
} as const;
