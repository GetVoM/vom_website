import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { demoIntegrations } from "@/lib/i18n/dictionaries/demo";
import { integrationPaths } from "@/lib/i18n/routes";
import { integrationIds, integrations } from "@/lib/integrations";
import { site } from "@/lib/seo/site";
import { IntegrationsExplorer, type ExplorerItem } from "./IntegrationsExplorer";

export function Integrations({ locale, t }: { locale: Locale; t: Dictionary }) {
  const s = t.integrationsSection;

  // Partners with a page of their own say what that page says, and link to it.
  const partners: ExplorerItem[] = integrationIds.map((id) => {
    const page = t.integrationPages.items[id];
    return {
      id,
      name: integrations[id].name,
      logo: integrations[id].icon,
      category: page.category,
      description: page.lede,
      live: true,
      flow: [page.partner, s.details.flow[1]],
      sync: page.sync,
      page: {
        href: localePath(locale, integrationPaths[id][locale]),
        label: s.details.page.replace("{partner}", page.partner),
      },
    };
  });

  const demos: ExplorerItem[] = demoIntegrations.map((item) => ({
    id: item.id,
    name: item.name,
    logo: item.logo,
    category: item.category[locale],
    description: item.description[locale],
    live: item.live,
    flow: s.details.flow,
    stats: { clients: item.stats.clients, invoices: item.stats.invoices, sync: item.stats.sync[locale] },
    steps: item.steps.map((step) => step[locale]),
  }));

  return (
    <section id="integrations" className="border-t border-paper-200">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="max-w-[30ch] font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{s.heading}</h2>
          <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-700">{s.body}</p>
        </div>
        <IntegrationsExplorer
          items={[...partners, ...demos]}
          t={s}
          signupHref={site.signup[locale]}
          docsHref={`${site.appUrl}/en/docs/api`}
        />
      </div>
    </section>
  );
}
