import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
      <JsonLd data={faqJsonLd(t.faq.items)} />
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.faq.heading}</h2>
        <div className="flex flex-col border-t border-teal-200">
          {t.faq.items.map((item, i) => (
            <details key={item.q} className="faq group border-b border-teal-200" open={i === 0}>
              <summary className="flex items-center justify-between gap-6 py-5 text-[1.0625rem] font-bold leading-snug hover:text-teal-800">
                <span>{item.q}</span>
                <span className="faq-icon inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal-300 text-teal-700">
                  <Icon name="plus" size={14} strokeWidth={2.25} />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-[1rem] leading-relaxed text-ink-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
