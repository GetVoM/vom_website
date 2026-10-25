"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { DemoIntegration } from "@/lib/i18n/dictionaries/demo";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";

interface Props {
  locale: Locale;
  items: DemoIntegration[];
  t: Dictionary["integrationsSection"];
  signupHref: string;
  docsHref: string;
}

function Logo({ item, size = 40 }: { item: DemoIntegration; size?: number }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo}
        alt=""
        width={size}
        height={size}
        className="rounded-xl bg-paper object-contain ring-1 ring-paper-200"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="num inline-flex items-center justify-center rounded-xl bg-teal-50 font-bold text-teal-700 ring-1 ring-teal-200"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {item.name.charAt(0)}
    </span>
  );
}

export function IntegrationsExplorer({ locale, items, t, signupHref, docsHref }: Props) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="grid gap-6 lg:grid-cols-[4fr_8fr]">
      <ul className="no-scrollbar -mx-[max(16px,env(safe-area-inset-left,0px))] flex gap-2 overflow-x-auto px-[max(16px,env(safe-area-inset-left,0px))] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" role="tablist">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 lg:shrink">
            <button
              type="button"
              role="tab"
              aria-selected={item.id === activeId}
              onClick={() => setActiveId(item.id)}
              data-active={item.id === activeId ? "" : undefined}
              className="int-item flex w-full items-center gap-3 rounded-[var(--radius-tile)] border border-paper-200 bg-paper px-4 py-3 text-start transition-colors hover:border-teal-300"
            >
              <Logo item={item} size={36} />
              <span className="flex min-w-0 flex-col">
                <span className="num text-[1rem] font-bold leading-tight" dir="ltr">{item.name}</span>
                <span className="truncate text-[0.75rem] text-ink-500">{item.category[locale]}</span>
              </span>
              <span
                className={`ms-auto hidden shrink-0 rounded-pill px-2 py-0.5 text-[0.6875rem] font-bold lg:inline ${item.live ? "bg-teal-500 text-white" : "border border-paper-300 text-ink-500"}`}
              >
                {item.live ? t.live : t.soon}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div key={active.id} className="panel-swap doc-frame flex flex-col gap-8 bg-paper p-7 sm:p-10" role="tabpanel">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo item={active} size={64} />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="num text-[1.75rem] font-bold leading-none" dir="ltr">{active.name}</span>
                <span className={`rounded-pill px-2.5 py-1 text-[0.75rem] font-bold ${active.live ? "bg-teal-500 text-white" : "border border-paper-300 text-ink-500"}`}>
                  {active.live ? t.live : t.soon}
                </span>
              </div>
              <span className="text-[0.9375rem] text-teal-700">{active.category[locale]}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[0.8125rem] text-ink-500" aria-hidden="true">
            <span className="rounded-pill border border-paper-300 px-3 py-1">{t.details.flow[0]}</span>
            <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
            <span className="rounded-pill bg-teal-500 px-3 py-1 font-bold text-white">{t.details.flow[1]}</span>
            <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
            <span className="rounded-pill border border-paper-300 px-3 py-1">{t.details.flow[2]}</span>
          </div>
        </div>

        <p className="max-w-[62ch] text-[1.0625rem] leading-[1.75] text-ink-700">{active.description[locale]}</p>

        <dl className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-[var(--radius-tile)] bg-teal-50 p-5">
            <dd className="num text-[2rem] font-bold leading-none text-teal-700">
              {active.live ? `${fmt(active.stats.clients)}+` : fmt(active.stats.clients)}
            </dd>
            <dt className="text-[0.875rem] text-teal-800">{active.live ? t.details.clients : t.details.waitlist}</dt>
          </div>
          <div className="flex flex-col gap-1 rounded-[var(--radius-tile)] bg-paper-100 p-5">
            <dd className="num text-[2rem] font-bold leading-none">{active.live ? fmt(active.stats.invoices) : "—"}</dd>
            <dt className="text-[0.875rem] text-ink-700">{t.details.invoices}</dt>
          </div>
          <div className="flex flex-col gap-1 rounded-[var(--radius-tile)] bg-paper-100 p-5">
            <dd className="text-[1.5rem] font-bold leading-none">{active.stats.sync[locale]}</dd>
            <dt className="text-[0.875rem] text-ink-700">{t.details.sync}</dt>
          </div>
        </dl>

        <div className="flex flex-col gap-4">
          <h3 className="text-[1rem] font-bold">{t.details.how}</h3>
          <ol className="grid gap-3 sm:grid-cols-3">
            {active.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-700">
                <span className="num flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal-300 text-[0.8125rem] font-bold text-teal-700">
                  {i + 1}
                </span>
                {step[locale]}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-teal-200 pt-6">
          <a
            href={signupHref}
            rel="noopener"
            className="inline-flex h-11 items-center gap-2 rounded-pill bg-orange-500 px-5 text-[0.9375rem] font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition-colors hover:bg-orange-600"
          >
            {t.details.activate}
            <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
          </a>
          <a href={docsHref} rel="noopener" className="text-[0.9375rem] font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-700">
            {t.docs}
          </a>
        </div>
      </div>
    </div>
  );
}
