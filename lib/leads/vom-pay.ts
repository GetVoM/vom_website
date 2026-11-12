/**
 * The VoM Pay success page's form (getvom.com/vom-pay-success/ and
 * /en/vom-pay-success/): what the client form and the server schema share. Kept
 * free of imports so the client bundle and `node --test` can load it.
 */

/** The form's name in the `leads` table and in the admin filter: the page's slug, as the owner named the first form (2026-11-12). Both languages post it; the lead's `locale` tells them apart. */
export const VOM_PAY_FORM = "vom-pay-success";

/**
 * The Google Tag Manager contract (GTM-PS28X6L, read from its public gtm.js on
 * 2026-11-12). The old page's Elementor form was named «VomPayForm» with the id
 * `619dac9`, and on success the container's custom HTML tag pushed this event
 * for it. No trigger listens for `form_id == 619dac9` today, so it fires no
 * conversion; the owner can attach one in GTM without touching the site.
 * Change these only together with the container.
 */
export const gtmFormSuccess = {
  event: "elementor_form_success",
  form_name: "VomPayForm",
  form_id: "619dac9",
} as const;

/**
 * The failure page's codes, as the app sends them in `?vom_pay_errors=`. The old
 * page's script held these three; its messages are in lib/content/vom-pay.ts.
 */
export const payErrorCodes = ["1", "2", "3"] as const;
export type PayErrorCode = (typeof payErrorCodes)[number];

/** What the app sent, if it looks like a code at all: digits only, at most four. */
export function readPayError(search: string): string | null {
  const value = new URLSearchParams(search).get("vom_pay_errors")?.trim() ?? "";
  return /^\d{1,4}$/.test(value) ? value : null;
}

export const isKnownPayError = (code: string | null): code is PayErrorCode => code !== null && (payErrorCodes as readonly string[]).includes(code);
