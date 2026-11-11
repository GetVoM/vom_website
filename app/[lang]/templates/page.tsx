import type { Metadata } from "next";
import { lang } from "next/root-params";
import { TemplatesIndex, templatesIndexMetadata } from "@/components/blog/BlogIndex";
import { InvoiceTemplatesPage, invoiceTemplatesMetadata } from "@/components/invoice-templates/InvoiceTemplatesPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  return locale === "ar" ? templatesIndexMetadata(1) : invoiceTemplatesMetadata(locale);
}

/**
 * Two different pages share this address, one per language (owner, 2026-11-11):
 * - /templates/ (Arabic) is the index of the downloadable templates, as it was
 *   on WordPress. Single templates at /templates/<slug>/ and later pages at
 *   /templates/page/N/ are resolved by the catch-all route.
 * - /en/templates/ is the free invoice templates page, whose Arabic twin is at
 *   /نماذج-فواتير/. The templates themselves exist in Arabic only.
 */
export default async function TemplatesRoute() {
  const locale = await currentLocale();
  return locale === "ar" ? <TemplatesIndex page={1} /> : <InvoiceTemplatesPage locale={locale} />;
}
