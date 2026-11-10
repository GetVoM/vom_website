import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { ButtonLink } from "@/components/ui/Button";
import { DesktopNav } from "./DesktopNav";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import type { NavItem, NavMenus } from "./navTypes";

interface HeaderProps {
  locale: Locale;
  t: Dictionary;
}

export function Header({ locale, t }: HeaderProps) {
  const home = localePath(locale, "/");
  const items: NavItem[] = [
    { kind: "link", label: t.nav.home, href: home },
    { kind: "link", label: t.nav.features, href: localePath(locale, locale === "ar" ? "/features/" : "/features-en/") },
    { kind: "menu", id: "sectors" },
    { kind: "link", label: t.nav.pricing, href: localePath(locale, locale === "ar" ? "/pricing/" : "/pricing-en/") },
    {
      kind: "link",
      label: t.nav.einvoicing,
      href: localePath(locale, locale === "ar" ? "/الفوترة-الإلكترونية/" : "/zatca-e-invoicing-phase-2/"),
    },
    { kind: "menu", id: "support" },
  ];

  // One object for both menus, so the page carries the menu data once.
  const menus: NavMenus = {
    sectors: {
      label: t.nav.sectors,
      line: t.sectors.heading,
      all: { label: t.sectors.all, href: `${home}#sectors` },
      items: t.sectors.items.map((sector) => ({
        label: sector.name,
        href: localePath(locale, `/${sector.slug}/`),
        icon: sector.icon,
      })),
    },
    support: {
      label: t.nav.support,
      groups: t.nav.supportGroups.map((group) => ({
        heading: group.heading,
        links: group.links.map((link) => ({
          label: link.label,
          href: link.href.startsWith("http") ? link.href : localePath(locale, link.href),
        })),
      })),
    },
  };

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))]">
        <Link href={home} className="flex shrink-0 items-center" aria-label={t.brand.name}>
          <Image src={site.logo} alt={t.brand.name} width={110} height={36} priority={false} />
        </Link>

        <DesktopNav items={items} menus={menus} label={t.nav.menu} />

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitch
            locale={locale}
            label={t.nav.switchLocale}
            className="num text-[0.875rem] text-ink-700 transition-colors hover:text-teal-700"
          />
          <a href={site.login} className="text-[0.9375rem] link-nav">
            {t.nav.login}
          </a>
          <ButtonLink href={site.signup[locale]} variant="primary" className="h-10 px-4">
            {t.nav.start}
          </ButtonLink>
        </div>

        <MobileMenu
          items={items}
          menus={menus}
          login={{ label: t.nav.login, href: site.login }}
          locale={locale}
          switchLabel={t.nav.switchLocale}
          start={{ label: t.nav.start, href: site.signup[locale] }}
          labels={{ menu: t.nav.menu, close: t.nav.close }}
        />
      </div>
    </header>
  );
}
