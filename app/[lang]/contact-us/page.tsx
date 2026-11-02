import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { ContactPage, contactMetadata } from "@/components/contact/ContactPage";

export function generateMetadata(): Metadata {
  return contactMetadata("ar");
}

/** Arabic contact page at /contact-us/. The English twin keeps its own slug. */
export default async function ContactRoute() {
  if ((await lang()) !== "ar") notFound();
  return <ContactPage locale="ar" />;
}
