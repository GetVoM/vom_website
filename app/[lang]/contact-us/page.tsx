import type { Metadata } from "next";
import { lang } from "next/root-params";
import { ContactPage, contactMetadata } from "@/components/contact/ContactPage";
import { isLocale, type Locale } from "@/lib/i18n/config";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  return contactMetadata(await currentLocale());
}

/** Contact page at /contact-us/ and /en/contact-us/. */
export default async function ContactRoute() {
  return <ContactPage locale={await currentLocale()} />;
}
