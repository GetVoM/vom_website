import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { effra } from "@/app/fonts";
import { dirOf, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { site } from "@/lib/seo/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "@/app/globals.css";

export const ensureStatic = "navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "VoM", template: "%s | VoM" },
  applicationName: "VoM",
  formatDetection: { telephone: false },
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={effra.variable}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd(locale)} />
        <JsonLd data={websiteJsonLd(locale)} />
        <Header locale={locale} t={t} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
