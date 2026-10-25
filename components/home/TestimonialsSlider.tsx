"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { DemoTestimonial } from "@/lib/i18n/dictionaries/demo";
import { Icon } from "@/components/ui/Icon";

interface Props {
  locale: Locale;
  items: DemoTestimonial[];
  labels: { prev: string; next: string; slideOf: string };
}

export function TestimonialsSlider({ locale, items, labels }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const rtl = locale === "ar";

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 20;
      const i = Math.round(Math.abs(el.scrollLeft) / step);
      setIndex(Math.min(items.length - 1, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const go = (delta: number) => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + 20;
    const sign = rtl ? -1 : 1;
    el.scrollBy({ left: sign * delta * step, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + 20;
    const sign = rtl ? -1 : 1;
    el.scrollTo({ left: sign * i * step, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={track}
        className="no-scrollbar -mx-[max(16px,env(safe-area-inset-left,0px))] flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(16px,env(safe-area-inset-left,0px))] pb-2 lg:mx-0 lg:px-0"
      >
        {items.map((item) => (
          <figure
            key={item.name.en}
            className="doc-frame flex w-[88%] shrink-0 snap-start flex-col justify-between gap-8 bg-paper p-7 sm:w-[62%] sm:p-9 lg:w-[calc((100%-40px)/3)]"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-1 text-teal-500" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Icon key={s} name="star" size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-arabic text-[1.125rem] leading-[1.65] text-ink sm:text-[1.25rem]">
                {item.quote[locale]}
              </blockquote>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 rounded-[var(--radius-tile)] bg-teal-50 px-4 py-3">
                <span className="num text-[1.75rem] font-bold leading-none text-teal-700">{item.metric.value}</span>
                <span className="text-[0.875rem] leading-snug text-teal-800">{item.metric.label[locale]}</span>
              </div>
              <figcaption className="flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-teal-200 ring-offset-2 ring-offset-paper"
                />
                <span className="flex flex-col text-[0.9375rem]">
                  <span className="font-bold">{item.name[locale]}</span>
                  <span className="text-ink-500">
                    {item.role[locale]}
                    {rtl ? "، " : ", "}
                    {item.business[locale]}
                  </span>
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.name.en}
              type="button"
              onClick={() => goTo(i)}
              data-index={i}
              aria-label={`${i + 1} ${labels.slideOf} ${items.length}`}
              aria-current={index === i ? "true" : undefined}
              className={`h-2 rounded-pill transition-all duration-300 ${index === i ? "w-7 bg-teal-500" : "w-2 bg-teal-200 hover:bg-teal-300"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.prev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/70 text-ink transition-colors hover:bg-paper"
          >
            <Icon name="chevron" size={18} className="ltr:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-ink-700"
          >
            <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
