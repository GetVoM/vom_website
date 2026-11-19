"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/analytics/track";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** One tab, already in the page's language. */
export interface ExplorerItem {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  description: string;
  /** The pills beside the name: where the data starts, then where it goes. */
  flow: string[];
  /** What moves into VoM, from the partner's integration page. */
  sync?: { heading: string; rows: { from: string; to: string }[] };
  page?: { href: string; label: string };
}

interface Props {
  items: ExplorerItem[];
  t: Dictionary["integrationsSection"];
  signupHref: string;
  docsHref: string;
}

function Logo({ item, size = 40 }: { item: ExplorerItem; size?: number }) {
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
      className="num inline-flex items-center justify-center rounded-xl bg-teal-500 font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {item.name.charAt(0)}
    </span>
  );
}

export function IntegrationsExplorer({ items, t, signupHref, docsHref }: Props) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const selectIntegration = (item: ExplorerItem) => {
    if (item.id === activeId) return;
    setActiveId(item.id);
    track("integration_selected", { integration_id: item.id, is_live: true });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[4fr_8fr]">
      <ul className="no-scrollbar -mx-[max(16px,env(safe-area-inset-left,0px))] flex gap-2 overflow-x-auto px-[max(16px,env(safe-area-inset-left,0px))] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" role="tablist">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 lg:shrink">
            <button
              type="button"
              role="tab"
              aria-selected={item.id === activeId}
              onClick={() => selectIntegration(item)}
              data-active={item.id === activeId ? "" : undefined}
              className="int-item flex w-full items-center gap-3 rounded-[var(--radius-tile)] border border-paper-200 bg-paper px-4 py-3 text-start transition-colors hover:border-teal-500"
            >
              <Logo item={item} size={36} />
              <span className="flex min-w-0 flex-col">
                <span className="num text-[1rem] font-bold leading-tight" dir="ltr">{item.name}</span>
                <span className="truncate text-[0.75rem] text-ink-500">{item.category}</span>
              </span>
              <span className="ms-auto hidden shrink-0 rounded-pill bg-teal-500 px-2 py-0.5 text-[0.6875rem] font-bold text-white lg:inline">
                {t.live}
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
                <span className="rounded-pill bg-teal-500 px-2.5 py-1 text-[0.75rem] font-bold text-white">{t.live}</span>
              </div>
              <span className="text-[0.9375rem] text-teal-500">{active.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[0.8125rem] text-ink-500" aria-hidden="true">
            {active.flow.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <Icon name="arrow" size={14} className="rtl:-scale-x-100" />}
                <span
                  className={
                    i === 1
                      ? "rounded-pill bg-teal-500 px-3 py-1 font-bold text-white"
                      : "rounded-pill border border-paper-300 px-3 py-1"
                  }
                >
                  {step}
                </span>
              </Fragment>
            ))}
          </div>
        </div>

        <p className="max-w-[62ch] text-[1.0625rem] leading-[1.75] text-ink-700">{active.description}</p>

        {active.sync && (
          <div className="flex flex-col gap-3">
            <h3 className="text-[1rem] font-bold">{active.sync.heading}</h3>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {active.sync.rows.map((row) => (
                <li key={row.from} className="flex flex-col gap-1 border-t border-paper-200 py-3 text-[0.9375rem] leading-snug">
                  <span className="font-bold">
                    {row.from}
                    <span className="sr-only">: </span>
                  </span>
                  <span className="flex gap-2 text-ink-700">
                    <Icon name="arrow" size={16} className="mt-0.5 shrink-0 text-teal-500 rtl:-scale-x-100" />
                    {row.to}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 border-t border-teal-500 pt-6">
          <a
            href={signupHref}
            rel="noopener"
            className="btn btn-primary"
          >
            {t.details.activate}
            <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
          </a>
          {active.page && (
            <ButtonLink href={active.page.href} variant="secondary" arrow>
              {active.page.label}
            </ButtonLink>
          )}
          <a href={docsHref} rel="noopener" className="text-[0.9375rem] font-bold text-teal-500 underline decoration-teal-500 underline-offset-4 hover:decoration-2">
            {t.docs}
          </a>
        </div>
      </div>
    </div>
  );
}
