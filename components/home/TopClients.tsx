import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { demoLogos } from "@/lib/i18n/dictionaries/demo";

function Row({ reverse = false }: { reverse?: boolean }) {
  const logos = reverse ? [...demoLogos].reverse() : demoLogos;
  const doubled = [...logos, ...logos];
  return (
    <div className="marquee-mask overflow-hidden" dir="ltr">
      <div className="marquee" data-reverse={reverse ? "" : undefined} dir="ltr">
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="logo-tile flex h-20 w-44 shrink-0 items-center justify-center rounded-[var(--radius-tile)] border border-paper-200 bg-paper px-6"
            aria-hidden={i >= logos.length}
          >
            <Image src={logo.src} alt={logo.name} width={120} height={36} style={{ width: "auto", height: 36, maxWidth: 120 }} className="object-contain" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopClients({ t }: { t: Dictionary }) {
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
          <Row />
          <Row reverse />
        </div>
        <p className="text-[0.75rem] text-ink-300">{t.clients.note}</p>
      </div>
    </section>
  );
}
