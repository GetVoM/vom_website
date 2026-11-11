import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { invoiceTemplatesAr } from "./ar";
import { invoiceTemplatesEn } from "./en";
import type { InvoiceTemplatesCopy } from "./types";

export * from "./templates";
export type { InvoiceTemplatesCopy } from "./types";

/**
 * The invoice templates page's copy. Pages read it only through this layer, so
 * the storage behind it (TypeScript modules now, a CMS later) can change.
 */
export function getInvoiceTemplates(locale: Locale): InvoiceTemplatesCopy {
  return locale === "ar" ? invoiceTemplatesAr : invoiceTemplatesEn;
}
