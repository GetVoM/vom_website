import type { Metadata } from "next";
import { lang } from "next/root-params";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { softwareJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { TopClients } from "@/components/home/TopClients";
import { Numbers } from "@/components/home/Numbers";
import { Apps } from "@/components/home/Apps";
import { Testimonials } from "@/components/home/Testimonials";
import { Integrations } from "@/components/home/Integrations";
import { Reports } from "@/components/home/Reports";
import { Features } from "@/components/home/Features";
import { MonthStrip } from "@/components/home/MonthStrip";
import { Steps } from "@/components/home/Steps";
import { ZatcaBand } from "@/components/home/ZatcaBand";
import { Sectors } from "@/components/home/Sectors";
import { Resources } from "@/components/home/Resources";
import { Faq } from "@/components/home/Faq";
import { ClosingCertificate } from "@/components/home/ClosingCertificate";

async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  const meta = buildMetadata({
    locale,
    path: "/",
    title: t.seo.homeTitle,
    description: t.seo.homeDescription,
  });
  // The homepage title is the full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: t.seo.homeTitle } };
}

export default async function HomePage() {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  const compareHref = localePath(locale, locale === "ar" ? "/pricing/" : "/pricing-en/");

  return (
    <>
      <JsonLd data={softwareJsonLd(locale, t.brand.description)} />
      <Hero locale={locale} t={t} />
      <TopClients t={t} />
      <MonthStrip t={t} />
      <Steps t={t} />
      <Features locale={locale} t={t} />
      <ZatcaBand locale={locale} t={t} />
      <Numbers t={t} />
      <Reports locale={locale} t={t} />
      <Apps t={t} />
      <Testimonials locale={locale} t={t} />
      <Sectors locale={locale} t={t} />
      <Integrations locale={locale} t={t} />
      <Resources locale={locale} t={t} />
      <Faq t={t} />
      <ClosingCertificate t={t} signupHref={site.signup[locale]} compareHref={compareHref} />
    </>
  );
}
