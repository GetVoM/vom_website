import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { demoIntegrations } from "@/lib/i18n/dictionaries/demo";
import { site } from "@/lib/seo/site";
import { IntegrationsExplorer } from "./IntegrationsExplorer";

export function Integrations({ locale, t }: { locale: Locale; t: Dictionary }) {
  const s = t.integrationsSection;
  return (
    <section id="integrations" className="border-t border-paper-200">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="max-w-[30ch] font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{s.heading}</h2>
          <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-700">{s.body}</p>
        </div>
        <IntegrationsExplorer
          locale={locale}
          items={demoIntegrations}
          t={s}
          signupHref={site.signup[locale]}
          docsHref={`${site.appUrl}/en/docs/api`}
        />
      </div>
    </section>
  );
}
