import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { site } from "@/lib/seo/site";
import { ButtonLink } from "@/components/ui/Button";
import { DocumentStack } from "./DocumentStack";
import { Guilloche } from "./Guilloche";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-field hidden lg:block">
        <Guilloche id="hero-guilloche" className="absolute inset-0 h-full w-full" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] pb-20 pt-14 lg:grid-cols-[7fr_5fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="flex flex-col gap-7">
          <h1 className="rise font-arabic text-[2.5rem] leading-[1.15] sm:text-[3.25rem] lg:text-[3.75rem]">
            <span className="block font-light text-ink-700">{t.hero.tierLight}</span>
            <span className="block font-bold">{t.hero.tierBold}</span>
          </h1>
          <p className="rise rise-2 max-w-[52ch] text-[1.0625rem] leading-[1.75] text-ink-700 sm:text-[1.125rem]">
            {t.hero.body}
          </p>
          <div className="rise rise-3 flex flex-wrap items-center gap-4">
            <ButtonLink href={site.signup[locale]} variant="primary" arrow>
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink href={site.demo} variant="ghost">
              {t.hero.secondary}
            </ButtonLink>
          </div>
          <p className="rise rise-4 text-[0.9375rem] text-ink-500">{t.hero.proof}</p>
        </div>

        <div className="relative flex justify-center lg:justify-start">
          <div className="absolute inset-0 -z-10 bg-teal-500 lg:hidden" style={{ clipPath: "polygon(0 18%, 100% 0, 100% 100%, 0 100%)" }}>
            <Guilloche id="hero-guilloche-sm" className="h-full w-full" />
          </div>
          <div className="w-full max-w-[500px] px-6 py-10 lg:px-0 lg:py-0">
            <DocumentStack t={t} />
            <p className="mt-5 text-center text-[0.75rem] text-white/80 lg:text-end">{t.hero.demoLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
