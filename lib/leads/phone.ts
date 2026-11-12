/**
 * The one check the campaign form makes (owner, 2026-11-12): a Saudi mobile
 * number, stored as 05XXXXXXXX. Visitors type it in many ways: with Arabic or
 * Persian digits, with spaces or dashes, with the country code (+966, 00966 or
 * 966) or without the leading zero. Each of those is read as the same number;
 * anything that is not a Saudi mobile is refused.
 *
 * Kept free of imports so the client form and `node --test` can both load it.
 */

const ARABIC_INDIC = /[٠-٩]/g;
const PERSIAN = /[۰-۹]/g;
/** Spaces, dashes, dots, brackets and the invisible direction marks a paste can carry. */
const NOISE = /[\s ​-‏‪-‮⁦-⁩؜\-–—.()/]/g;

export const SAUDI_MOBILE = /^05\d{8}$/;

/** The number as 05XXXXXXXX, or null when it is not a Saudi mobile. */
export function normaliseSaudiMobile(raw: string): string | null {
  let digits = raw
    .replace(ARABIC_INDIC, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(PERSIAN, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(NOISE, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  if (!/^\d+$/.test(digits)) return null;
  if (digits.startsWith("966")) digits = digits.slice(3);
  if (digits.startsWith("5") && digits.length === 9) digits = `0${digits}`;
  return SAUDI_MOBILE.test(digits) ? digits : null;
}
