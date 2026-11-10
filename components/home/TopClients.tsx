import { clients, homeClients, tileLogo, type ClientKey } from "@/lib/content/clients";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { optimizedSrc } from "@/lib/image-url";

/** The old homepage's 47 client logos, split across the two rows. */
const half = Math.ceil(homeClients.length / 2);
const rows = [homeClients.slice(0, half), homeClients.slice(half)];

/** One endless row: the logos twice, the second copy hidden from assistive tech. */
function Row({ logos, locale, reverse = false }: { logos: ClientKey[]; locale: Locale; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="marquee-mask overflow-hidden" dir="ltr">
      <div className="marquee" data-reverse={reverse || undefined}>
        {doubled.map((key, i) => {
          const copy = i >= logos.length;
          return (
            <div key={`${key}-${i}`} className="logo-tile" aria-hidden={copy || undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedSrc(tileLogo(key).src, 256)}
                alt={copy ? "" : clients[key][locale]}
                width={160}
                height={80}
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TopClients({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="clients" className="border-b border-paper-200 bg-paper-100">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-arabic text-[1.5rem] font-bold leading-snug sm:text-[1.75rem]">{t.clients.heading}</h2>
            <p className="text-[1rem] text-ink-700">{t.clients.body}</p>
          </div>
          <div className="flex items-center gap-3 rounded-pill border border-teal-200 bg-paper px-4 py-2 text-[0.9375rem]">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            <span className="font-bold">{t.clients.count}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Row logos={rows[0]} locale={locale} />
          <Row logos={rows[1]} locale={locale} reverse />
        </div>
      </div>
    </section>
  );
}
