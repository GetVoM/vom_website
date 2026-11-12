/**
 * Reads a number the way a Saudi visitor types it. Arabic keyboards send
 * Arabic-Indic digits (٠–٩) and the Arabic decimal and thousands marks (٫ ٬);
 * Persian keyboards send ۰–۹; people paste "12,345.67", "١٥٪" or an amount with
 * the riyal sign. An empty field is "no value", never 0.
 *
 * Kept free of imports so `node --test` can load it directly.
 */

export type ParseError = "invalid" | "negative" | "tooLarge";

export interface Parsed {
  value: number | null;
  error?: ParseError;
}

/** Above this the figures stop meaning anything (a trillion riyals). */
export const MAX_VALUE = 1e12;

const ARABIC_INDIC = /[٠-٩]/g;
const PERSIAN = /[۰-۹]/g;

/** Arabic-Indic and Persian digits to 0–9; the Arabic decimal mark to "."; separators, signs and invisible marks out. */
export function normaliseDigits(raw: string): string {
  return raw
    .replace(ARABIC_INDIC, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(PERSIAN, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/٫/g, ".")
    .replace(/[٬,،'\s  ​-‏‪-‮⁦-⁩؜]/g, "")
    .replace(/[%٪⃁]|ر\.?س|ريال|SAR/gi, "");
}

export function parseAmount(raw: string): Parsed {
  const text = normaliseDigits(raw);
  if (text === "") return { value: null };
  if (/^[-−]/.test(text)) return { value: null, error: "negative" };
  if (!/^\d*\.?\d*$/.test(text) || text === ".") return { value: null, error: "invalid" };
  const value = Number(text);
  if (!Number.isFinite(value)) return { value: null, error: "invalid" };
  if (value > MAX_VALUE) return { value: null, error: "tooLarge" };
  return { value };
}
