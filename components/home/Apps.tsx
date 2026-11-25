import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Guilloche } from "./Guilloche";

export function Apps({ t }: { t: Dictionary }) {
  const a = t.apps;
  return (
    <section id="apps" className="relative overflow-hidden border-t border-paper-200">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:grid-cols-[6fr_6fr] lg:gap-16 lg:py-32">
        <div className="flex flex-col gap-7">
          <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem] lg:text-[2.5rem]">{a.heading}</h2>
          <p className="max-w-[52ch] text-[1.0625rem] leading-[1.75] text-ink-700">{a.body}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {a.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Icon name="check" size={11} strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <StoreBadges ios={a.ios} />
          </div>
        </div>

        <figure className="flex flex-col items-center gap-3">
          {/* The cut-out's arm leaves the photo at its bottom edge, so the photo sits on the panel's
              bottom and takes its rounded corners there; the phone rises above the panel's top. */}
          <div className="relative isolate w-full max-w-[520px]">
            <div className="absolute inset-x-0 bottom-0 top-[22%] -z-10 rounded-[36px] bg-teal-500 sm:rounded-[48px]">
              <Guilloche className="h-full w-full rounded-[36px] sm:rounded-[48px]" />
            </div>
            <Image
              src="/home/mobile-app.webp"
              alt={a.image}
              width={1028}
              height={1221}
              sizes="(min-width: 640px) 520px, calc(100vw - 32px)"
              className="h-auto w-full [clip-path:inset(0_round_0_0_36px_36px)] sm:[clip-path:inset(0_round_0_0_48px_48px)]"
            />
          </div>
          <figcaption className="text-[0.75rem] text-ink-500">{t.hero.demoLabel}</figcaption>
        </figure>
      </div>
    </section>
  );
}
