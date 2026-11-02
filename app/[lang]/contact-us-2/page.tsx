import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { ContactPage, contactMetadata } from "@/components/contact/ContactPage";

export function generateMetadata(): Metadata {
  return contactMetadata("en");
}

/** English contact page at /en/contact-us-2/, the slug WordPress gave it. */
export default async function ContactRoute() {
  if ((await lang()) !== "en") notFound();
  return <ContactPage locale="en" />;
}
