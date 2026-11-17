import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary, SocialId } from "@/lib/i18n/dictionaries/types";
import { integrationPaths } from "@/lib/i18n/routes";
import { integrationIds } from "@/lib/integrations";
import { site } from "@/lib/seo/site";
import { StoreBadges } from "@/components/ui/StoreBadges";

/** The Authority's lockup with the Phase 2 tick, from the old site (public/zatca-phase-2/). */
const zatcaBadge = { src: "/zatca-phase-2/badge.webp", width: 1600, height: 384 };

// Drawn from public/icons/social.svg, so these paths are not repeated in every page's HTML.
const socials: { id: SocialId; href: string }[] = [
  { id: "facebook", href: site.social.facebook },
  { id: "tiktok", href: site.social.tiktok },
  { id: "x", href: site.social.x },
  { id: "instagram", href: site.social.instagram },
  { id: "linkedin", href: site.social.linkedin },
];

function FooterLink({ label, href, locale, group }: { label: string; href: string; locale: Locale; group: string }) {
  const cls = "link-quiet";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} rel="noopener" data-track="footer_link_clicked" data-track-group={group}>
        {label}
      </a>
    );
  }
  return (
    <Link href={localePath(locale, href)} className={cls} data-track="footer_link_clicked" data-track-group={group}>
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
  // The third entry names the group in analytics, the same in both languages.
  const groups: [string, [string, string][], string][] = [
    [t.footer.product, t.footer.links.product, "product"],
    [t.footer.marketplace, marketplace, "marketplace"],
    [t.footer.support, t.footer.links.support, "support"],
    [t.footer.company, t.footer.links.company, "company"],
  ];
  return (
    <footer data-track-section="footer" className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] pb-14 pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-1">
            <Image src={site.logo} alt={t.brand.name} width={96} height={31} />
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-700">{t.footer.about}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Image
                src={zatcaBadge.src}
                alt={t.footer.approved}
                width={zatcaBadge.width}
                height={zatcaBadge.height}
                sizes="184px"
                className="h-11 w-auto"
              />
              <StoreBadges ios={t.apps.ios} />
            </div>
          </div>
          {groups.map(([title, links, group]) => (
            <div key={title} className="flex flex-col gap-3 text-[0.9375rem]">
              <div className="font-bold">{title}</div>
              {links.map(([label, href]) => (
                <FooterLink key={label} label={label} href={href} locale={locale} group={group} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-teal-500 text-white">
        <div className="site-footer-strip mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-3 text-[0.875rem]">
          <span>
            © <span className="num">{year}</span> {t.brand.name}. {t.footer.rights}.
          </span>
          <ul className="-mx-2.5 flex items-center" aria-label={t.contact.follow.heading}>
            {socials.map(({ id, href }) => (
              <li key={id}>
                <a
                  href={href}
                  rel="noopener"
                  className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
