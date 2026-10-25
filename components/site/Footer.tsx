import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { Icon } from "@/components/ui/Icon";

function FooterLink({ label, href, locale }: { label: string; href: string; locale: Locale }) {
  const cls = "text-ink-700 transition-colors hover:text-teal-700";
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
  const groups: [string, [string, string][]][] = [
    [t.footer.product, t.footer.links.product],
    [t.footer.support, t.footer.links.support],
    [t.footer.company, t.footer.links.company],
  ];
  return (
    <footer className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
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
          <div className="flex gap-5">
            <a href={site.social.tiktok} rel="noopener" className="num hover:text-teal-700">TikTok</a>
            <a href={site.social.x} rel="noopener" className="num hover:text-teal-700">X</a>
            <a href={site.social.instagram} rel="noopener" className="num hover:text-teal-700">Instagram</a>
            <a href={site.social.linkedin} rel="noopener" className="num hover:text-teal-700">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
