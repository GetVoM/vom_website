import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { demoTestimonials } from "@/lib/i18n/dictionaries/demo";
import { TestimonialsSlider } from "./TestimonialsSlider";

export function Testimonials({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="testimonials" className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto max-w-[1280px] px-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] py-24 lg:py-32">
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="font-arabic text-[1.875rem] font-bold leading-[1.25] sm:text-[2.25rem]">{t.testimonials.heading}</h2>
          <p className="text-[1.0625rem] text-ink-700">{t.testimonials.body}</p>
        </div>
        <TestimonialsSlider
          locale={locale}
          items={demoTestimonials}
          labels={{ prev: t.testimonials.prev, next: t.testimonials.next, slideOf: t.testimonials.slideOf }}
        />
      </div>
    </section>
  );
}
