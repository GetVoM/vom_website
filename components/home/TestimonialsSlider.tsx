"use client";

import { useEffect, useRef, useState } from "react";
import { ImageView } from "@/components/ui/ImageView";
import type { Locale } from "@/lib/i18n/config";
import type { Testimonial } from "@/lib/content/testimonials";
import { Icon } from "@/components/ui/Icon";
import { track as trackEvent } from "@/lib/analytics/track";

interface Props {
  locale: Locale;
  items: Testimonial[];
  labels: { prev: string; next: string; slideOf: string; more: string; less: string };
}

/**
 * Quote lengths, in characters, that change a card: a quote this short is set larger so
 * its card does not stand mostly empty, and one this long gets two columns' width on a
 * wide screen so it does not stretch every card in the row to its height. On a phone,
 * where it cannot widen, it shows its first eight lines and a button for the rest.
 */
const short = 60;
const long = 260;

/** The business's first letter, skipping the Arabic "شركة" or "مؤسسة" a name may open with. */
const initial = (business: string) => business.replace(/^(شركة|مؤسسة)\s+/, "").charAt(0);

export function TestimonialsSlider({ locale, items, labels }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const rtl = locale === "ar";

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 20;
      // Scrolled to the end, the last card is in view even when the cards before it are too.
      const atEnd = el.scrollWidth - el.clientWidth - Math.abs(el.scrollLeft) < 4;
      const i = atEnd ? items.length - 1 : Math.round(Math.abs(el.scrollLeft) / step);
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
        className="no-scrollbar -mx-[max(16px,env(safe-area-inset-left,0px))] flex snap-x snap-mandatory scroll-px-[max(16px,env(safe-area-inset-left,0px))] gap-5 overflow-x-auto scroll-smooth px-[max(16px,env(safe-area-inset-left,0px))] pb-2 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {items.map((item) => {
          const length = item.quote[locale].length;
          const clamped = length > long && !expanded;
          const quoteId = `quote-${item.name.en.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <figure
              key={item.name.en}
              className={`doc-frame flex w-[88%] shrink-0 snap-start flex-col justify-between gap-8 bg-paper p-7 sm:p-9 ${length > long ? "lg:w-[calc((100%-40px)*2/3+20px)]" : "sm:w-[62%] lg:w-[calc((100%-40px)/3)]"}`}
            >
              <div className="flex flex-col gap-5">
                <svg viewBox="0 0 32 24" width="32" height="24" fill="currentColor" className="text-teal-500 rtl:-scale-x-100" aria-hidden="true">
                  <path d="M0 24V14C0 6 4.5 1.3 12 0l1.3 3.2C9 4.6 6.9 7.4 6.6 11H13v13zM18 24V14c0-8 4.5-12.7 12-14l1.3 3.2C27 4.6 24.9 7.4 24.6 11H31v13z" />
                </svg>
                <blockquote
                  id={quoteId}
                  className={`font-arabic text-ink ${length < short ? "text-[1.375rem] leading-[1.6] sm:text-[1.625rem]" : "text-[1.125rem] leading-[1.75] sm:text-[1.1875rem]"} ${clamped ? "line-clamp-8 sm:line-clamp-none" : ""}`}
                >
                  {item.quote[locale]}
                </blockquote>
                {length > long && (
                  <button
                    type="button"
                    onClick={() => setExpanded((open) => !open)}
                    aria-expanded={expanded}
                    aria-controls={quoteId}
                    className="self-start text-[0.9375rem] font-bold text-teal-500 underline-offset-4 hover:underline sm:hidden"
                  >
                    {expanded ? labels.less : labels.more}
                  </button>
                )}
              </div>
              <figcaption className="flex items-center gap-4 border-t border-paper-200 pt-6">
                {item.logo ? (
                  <ImageView
                    src={item.logo}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="h-14 w-14 shrink-0 rounded-[14px] border border-paper-200 bg-white object-cover"
                  />
                ) : (
                  <span
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-teal-500 text-[1.5rem] font-bold text-white"
                    aria-hidden="true"
                  >
                    {initial(item.business[locale])}
                  </span>
                )}
                {/* Three lines tall, so a business name that wraps does not lift this card's rule above its neighbours'. */}
                <span className="flex min-h-[4rem] min-w-0 flex-col justify-center gap-0.5 text-[0.9375rem] leading-snug">
                  <span className="font-bold">{item.name[locale]}</span>
                  <span className="text-ink-500">{item.business[locale]}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.name.en}
              type="button"
              onClick={() => {
                trackEvent("testimonial_slide_changed", { index: i, method: "dot" });
                goTo(i);
              }}
              data-index={i}
              aria-label={`${i + 1} ${labels.slideOf} ${items.length}`}
              aria-current={index === i ? "true" : undefined}
              className={`h-2 rounded-pill transition-all duration-300 ${index === i ? "w-7 bg-teal-500" : "w-2 bg-paper-300 hover:bg-teal-500"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              trackEvent("testimonial_slide_changed", { index: Math.max(0, index - 1), method: "previous" });
              go(-1);
            }}
            aria-label={labels.prev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/70 text-ink transition-colors hover:bg-paper"
          >
            <Icon name="chevron" size={18} className="ltr:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => {
              trackEvent("testimonial_slide_changed", { index: Math.min(items.length - 1, index + 1), method: "next" });
              go(1);
            }}
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
