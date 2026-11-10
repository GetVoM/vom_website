import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary, SocialId } from "@/lib/i18n/dictionaries/types";
import { integrationPaths } from "@/lib/i18n/routes";
import { integrationIds } from "@/lib/integrations";
import { site } from "@/lib/seo/site";
import { Icon } from "@/components/ui/Icon";
// Drawn from public/icons/social.svg, so these paths are not repeated in every page's HTML.
const socials: { id: SocialId; href: string }[] = [
  { id: "tiktok", href: site.social.tiktok },
  { id: "x", href: site.social.x },
  { id: "instagram", href: site.social.instagram },
  { id: "linkedin", href: site.social.linkedin },
];

function FooterLink({ label, href, locale }: { label: string; href: string; locale: Locale }) {
  const cls = "link-quiet";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} rel="noopener">
        {label}
      </a>
    );
  }
  return (
    <Link href={localePath(locale, href)} className={cls}>
      {label}
    </Link>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = 2026;
  // The integration pages, named and addressed as the pages themselves are.
  const marketplace: [string, string][] = integrationIds.map((id) => [
    t.integrationPages.items[id].crumb,
    integrationPaths[id][locale],
  ]);
  const groups: [string, [string, string][]][] = [
    [t.footer.product, t.footer.links.product],
    [t.footer.marketplace, marketplace],
    [t.footer.support, t.footer.links.support],
    [t.footer.company, t.footer.links.company],
  ];
  return (
    <footer className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-1">
            <Image src={site.logo} alt={t.brand.name} width={96} height={31} />
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-700">{t.footer.about}</p>
            <div className="flex items-center gap-2 text-[0.875rem] text-teal-800">
              <Icon name="check" size={16} className="text-teal-500" />
              <span>{t.footer.approved}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={site.appStore}
                rel="noopener"
                className="inline-flex w-fit items-center gap-2 rounded-pill border border-ink/70 px-4 py-2 text-[0.875rem] text-ink transition-colors hover:bg-paper"
              >
                {t.apps.ios}
              </a>
              <a
                href={site.googlePlay}
                rel="noopener"
                className="inline-flex w-fit items-center gap-2 rounded-pill border border-ink/70 px-4 py-2 text-[0.875rem] text-ink transition-colors hover:bg-paper"
              >
                {t.apps.android}
              </a>
            </div>
          </div>
          {groups.map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3 text-[0.9375rem]">
              <div className="font-bold">{title}</div>
              {links.map(([label, href]) => (
                <FooterLink key={label} label={label} href={href} locale={locale} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper-200 pt-6 text-[0.8125rem] text-ink-500">
          <span>
            © <span className="num">{year}</span> {t.brand.name}. {t.footer.rights}.
          </span>
          <ul className="-mx-2.5 flex items-center" aria-label={t.contact.follow.heading}>
            {socials.map(({ id, href }) => (
              <li key={id}>
                <a
                  href={href}
                  rel="noopener"
                  className="flex size-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-paper hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  <svg width={18} height={18} fill="currentColor" aria-hidden="true" focusable="false">
                    <use href={`/icons/social.svg#${id}`} />
                  </svg>
                  <span className="sr-only">{t.contact.follow.items[id]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
