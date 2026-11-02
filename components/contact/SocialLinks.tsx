import type { Dictionary, SocialId } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { SocialGlyph } from "./SocialGlyph";

const channels: { id: SocialId; href: string }[] = [
  { id: "facebook", href: site.social.facebook },
  { id: "x", href: site.social.x },
  { id: "linkedin", href: site.social.linkedin },
  { id: "instagram", href: site.social.instagram },
  { id: "tiktok", href: site.social.tiktok },
  { id: "whatsapp", href: site.whatsappUrl },
];

export function SocialLinks({ t }: { t: Dictionary }) {
  return (
    <section className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-16 lg:py-20">
        <h2 className="font-arabic text-[1.625rem] font-bold leading-[1.25] sm:text-[2rem]">{t.contact.follow.heading}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {channels.map(({ id, href }) => (
            <li key={id}>
              <a
                href={href}
                rel="noopener"
                className="flex h-16 items-center gap-3 rounded-[var(--radius-tile)] border border-paper-300 bg-paper px-4 text-[0.9375rem] font-bold transition-colors hover:border-teal-500 hover:bg-teal-50"
              >
                <span className="shrink-0 text-teal-700">
                  <SocialGlyph id={id} size={22} />
                </span>
                {t.contact.follow.items[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
