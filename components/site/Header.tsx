import Image from "next/image";
import Link from "next/link";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: Locale;
  t: Dictionary;
  /** Path of the current page in the other locale, if it exists. */
  alternatePath?: string | null;
}

export function Header({ locale, t, alternatePath = "/" }: HeaderProps) {
  const other = otherLocale(locale);
  const links = [
    { label: t.nav.features, href: localePath(locale, locale === "ar" ? "/features/" : "/features-en/") },
    { label: t.nav.sectors, href: "#sectors" },
    { label: t.nav.pricing, href: localePath(locale, locale === "ar" ? "/pricing/" : "/pricing-en/") },
    {
      label: t.nav.einvoicing,
      href: localePath(locale, locale === "ar" ? "/الفوترة-الإلكترونية/" : "/zatca-e-invoicing-phase-2/"),
    },
    { label: t.nav.blog, href: localePath(locale, locale === "ar" ? "/blog/" : "/blog-en/") },
  ];
  const switchHref = alternatePath ? localePath(other, alternatePath) : localePath(other, "/");

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))]">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center" aria-label={t.brand.name}>
          <Image src={site.logo} alt={t.brand.name} width={110} height={36} priority={false} />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.9375rem] lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-ink/90 transition-colors hover:text-teal-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="num text-[0.875rem] text-ink-700 transition-colors hover:text-teal-700"
          >
            {t.nav.switchLocale}
          </Link>
          <a href={site.login} className="text-[0.9375rem] text-ink/90 transition-colors hover:text-teal-700">
            {t.nav.login}
          </a>
          <ButtonLink href={site.signup[locale]} variant="primary" className="h-10 px-4">
            {t.nav.start}
          </ButtonLink>
        </div>

        <MobileMenu
          links={[...links, { label: t.nav.login, href: site.login }]}
          switchLink={{ label: t.nav.switchLocale, href: switchHref, lang: other }}
          start={{ label: t.nav.start, href: site.signup[locale] }}
          labels={{ menu: t.nav.menu, close: t.nav.close }}
        />
      </div>
    </header>
  );
}
