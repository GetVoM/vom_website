import type { Metadata } from "next";
import { lang } from "next/root-params";
import { InvoiceTemplatesPage, invoiceTemplatesMetadata } from "@/components/invoice-templates/InvoiceTemplatesPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return invoiceTemplatesMetadata(await currentLocale());
}

/**
 * The free invoice templates at /templates/ and /en/templates/ (owner,
 * 2026-11-11). The old /نماذج-فواتير/, /en/sales-invoices/ and /sales-invoices/
 * redirect here (next.config.ts). Single templates under /templates/<slug>/ are
 * still for the catch-all route.
 */
export default async function TemplatesRoute() {
  return <InvoiceTemplatesPage locale={await currentLocale()} />;
}
