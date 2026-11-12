/**
 * The English ZATCA Phase 2 page's form (getvom.com/en/zatca-e-invoicing-phase-2/):
 * what the client form and the server schema share. Kept free of imports so the
 * client bundle and `node --test` can load it.
 */

/** The form's name in the `leads` table and in the admin filter: the page's slug, as the owner named the first form (2026-11-12). */
export const ZATCA_PHASE_2_FORM = "zatca-e-invoicing-phase-2";

/**
 * The Google Tag Manager contract (GTM-PS28X6L, read from its public gtm.js on
 * 2026-11-12). The old page's Elementor form was named «Digital Ads 2023» with
 * the id `e52c297`, and on success the container's custom HTML tag pushed this
 * event for it. No trigger listens for `form_id == e52c297` today, so it fires
 * no conversion; the owner can attach one in GTM without touching the site.
 * Change these only together with the container.
 */
export const gtmFormSuccess = {
  event: "elementor_form_success",
  form_name: "Digital Ads 2023",
  form_id: "e52c297",
} as const;
