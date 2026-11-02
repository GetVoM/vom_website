import type { Metadata } from "next";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { contactPaths } from "@/lib/i18n/routes";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { Guilloche } from "@/components/home/Guilloche";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Envelope } from "./Envelope";
import { SocialLinks } from "./SocialLinks";

export function contactMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).contact.seo;
  const meta = buildMetadata({
    locale,
    path: contactPaths[locale],
    alternatePath: contactPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/contact-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const path = contactPaths[locale];
  const crumbs = [
    { label: t.nav.home, href: localePath(locale, "/") },
    { label: c.heading },
  ];

  return (
    <>
      <JsonLd data={contactPageJsonLd(locale, path, c.seo.title, c.seo.description)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: c.heading, path }])} />

      <section className="relative isolate overflow-hidden">
        <div className="hero-field contact-field hidden lg:block">
          <Guilloche id="contact-guilloche" className="absolute inset-0 h-full w-full" />
        </div>

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] pt-8 lg:grid-cols-[7fr_5fr] lg:py-16">
          <div className="flex flex-col gap-6">
            <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
            <h1 className="font-arabic text-[3rem] font-bold leading-[1.1] sm:text-[4rem] lg:text-[5rem]">{c.heading}</h1>
            <p className="max-w-[44ch] text-[1.0625rem] leading-[1.75] text-ink-700 sm:text-[1.1875rem]">{c.intro}</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={site.whatsappUrl} variant="primary" arrow>
                {c.whatsappCta}
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="ghost" external>
                {c.emailCta}
              </ButtonLink>
            </div>
          </div>

          <div className="relative -mx-[max(16px,env(safe-area-inset-left,0px))] flex justify-center px-[max(16px,env(safe-area-inset-left,0px))] pb-14 pt-16 lg:mx-0 lg:justify-start lg:p-0">
            <div className="contact-panel absolute inset-0 -z-10 bg-teal-500 lg:hidden">
              <Guilloche id="contact-guilloche-sm" className="h-full w-full" />
            </div>
            <Envelope t={t} />
          </div>
        </div>
      </section>

      <SocialLinks t={t} />

      <section className="guilloche-dark relative overflow-hidden text-white">
        <Guilloche id="contact-close-guilloche" className="absolute inset-0 h-full w-full" stroke="rgba(255,255,255,0.14)" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-20 lg:grid-cols-[8fr_4fr] lg:py-28">
          <div className="flex flex-col gap-5">
            <h2 className="font-arabic text-[2rem] font-bold leading-[1.2] sm:text-[2.5rem] lg:text-[3rem]">{c.question.heading}</h2>
            <p className="max-w-[58ch] text-[1.0625rem] leading-[1.75] sm:text-[1.125rem]">{c.question.body}</p>
            <p className="max-w-[44ch] text-balance text-[1.25rem] font-bold leading-snug">{c.question.reply}</p>
          </div>

          <div className="contact-seal justify-self-center lg:justify-self-end" aria-hidden="true">
            <span className="num text-[5rem] font-bold leading-[0.9]">24</span>
            <span className="text-[1.125rem] font-bold leading-tight">{c.question.sealUnit}</span>
            <span className="text-[0.75rem] leading-tight">{c.question.sealNote}</span>
          </div>
        </div>
      </section>
    </>
  );
}
