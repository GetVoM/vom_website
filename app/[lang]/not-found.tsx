import type { Metadata } from "next";
import { lang } from "next/root-params";
import { isLocale } from "@/lib/i18n/config";
import { NotFound } from "@/components/site/NotFound";

export const metadata: Metadata = {
  title: { absolute: "404 | VoM" },
  robots: { index: false, follow: true },
};

/** Any address under the site that has no page: the catch-all routes end here, inside the header and footer. */
export default async function LangNotFound() {
  const value = await lang();
  return <NotFound locale={isLocale(value) ? value : "ar"} />;
}
