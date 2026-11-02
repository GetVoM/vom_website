import type { Metadata } from "next";
import Image from "next/image";
import { localePath, otherLocale, type Locale } from "@/lib/i18n/config";
import type { AboutCharter, AboutItem } from "@/lib/i18n/dictionaries/types";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { aboutPaths } from "@/lib/i18n/routes";
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FigureValue } from "./FigureValue";

export function aboutMetadata(locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).about.seo;
  const meta = buildMetadata({
    locale,
    path: aboutPaths[locale],
    alternatePath: aboutPaths[otherLocale(locale)],
    title,
    description,
    image: `/og/about-${locale}.png`,
  });
  // The full SEO title, not the "%s | VoM" template.
  return { ...meta, title: { absolute: title } };
}

/** Icon, heading and text. The icon is drawn by the stylesheet from the `ai-` class. */
function Items({ items, columns }: { items: AboutItem[]; columns: string }) {
  return (
    <ul className={`grid gap-x-10 gap-y-9 ${columns}`}>
      {items.map((item) => (
        <li key={item.title} className={`about-item ai-${item.icon}`}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Charter({ charter, photo, alt, width, height }: { charter: AboutCharter; photo: string; alt: string; width: number; height: number }) {
  return (
    <div className="doc-frame bg-paper p-3">
      <Image
        src={photo}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 600px, 100vw"
        className="aspect-[16/9] w-full rounded-[0.75rem] object-cover"
      />
      <div className="p-4 lg:p-7">
        <h2 className="text-[1.5rem] font-bold leading-[1.3] lg:text-[1.75rem]">{charter.heading}</h2>
        <p className="mt-4 about-copy">{charter.body}</p>
        {charter.list && (
          <ul className="mt-5 flex flex-col gap-3">
            {charter.list.map((line) => (
              <li key={line} className="flex gap-3 text-[1rem] leading-[1.6]">
                <Icon name="check" size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-teal-700" />
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.about;
  const path = aboutPaths[locale];
  const crumbs = [{ label: t.nav.home, href: localePath(locale, "/") }, { label: a.crumb }];
  const digitsBefore = (index: number) =>
    a.figures.slice(0, index).reduce((sum, figure) => sum + figure.value.replace(/\D/g, "").length, 0);

  return (
    <>
      <JsonLd data={aboutPageJsonLd(locale, path, a.seo.title, a.seo.description, a.team.members)} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.nav.home, path: "/" }, { name: a.crumb, path }])} />

      <section className="about-hero">
        <div className="page-wrap flex w-full flex-col gap-5 pt-8 lg:pt-12">
          <Breadcrumb items={crumbs} label={t.nav.breadcrumb} />
          <div className="about-hero-copy flex flex-col gap-4">
            <h1 className="text-[3rem] font-bold leading-[1.1] sm:text-[4rem] lg:text-[5rem]">{a.heading}</h1>
            <p className="max-w-[40ch] text-[1.1875rem] leading-[1.55] text-ink-700 lg:text-[1.375rem]">{a.lede}</p>
          </div>
        </div>

        <div className="about-art-slot">
          <div className="about-art">
            <Image
              src="/about/business-owner.png"
              alt={a.images.owner}
              width={640}
              height={510}
              preload
              sizes="(min-width: 1180px) 416px, 100vw"
              className="h-auto w-full"
            />
            <span className="about-demo">{t.hero.demoLabel}</span>
          </div>
        </div>

        <div className="figures">
          <div className="figures-band guilloche-tile" aria-hidden="true" />
          <div className="page-wrap relative">
            <ul className="figures-grid">
              {a.figures.map((figure, i) => (
                <li key={figure.value}>
                  <a href={`#${figure.target}`} className="figure-link" data-short={figure.value.length === 1 || undefined}>
                    <FigureValue value={figure.value} offset={digitsBefore(i)} />
                    <span className="figure-label">
                      <span className="figure-text">{figure.label}</span>
                      <Icon name="arrow" size={16} className="figure-arrow" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex max-w-[62ch] flex-col gap-4 about-copy">
          {a.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div>
          <h2 className="about-heading">{a.answer.heading}</h2>
          <p className="mt-5 text-[1.25rem] leading-[1.65] lg:text-[1.375rem]">{a.answer.body}</p>
        </div>
      </section>

      <section className="page-wrap pb-16 lg:pb-24">
        <h2 className="about-heading">{a.story.heading}</h2>
        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="lg:order-2">
            <Image
              src="/about/growth-illustration.png"
              alt={a.images.growth}
              width={1200}
              height={1001}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full lg:sticky lg:top-24"
            />
          </div>
          <div className="border-b-[4px] border-double border-teal-500">
            {a.story.rows.map((row) => (
              <article key={row.id} id={row.id} className="story-row">
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {row.figures.map((index) => (
                    <div key={index} className="max-w-[16rem]">
                      <div className="story-number num">
                        <span>{a.figures[index].value}</span>
                      </div>
                      <p className="story-note">{a.figures[index].label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[1.125rem] leading-[1.8]">{row.body}</p>
                {row.challenge && (
                  <div className="mt-6">
                    <h3 className="text-[1.25rem] font-bold leading-snug">{row.challenge.heading}</h3>
                    <p className="mt-2 about-copy">{row.challenge.body}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-paper-200 bg-paper-100">
        <div className="page-wrap py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="lg:order-2">
              <h2 className="about-heading">{a.why.heading}</h2>
              {a.why.body && <p className="mt-5 about-copy">{a.why.body}</p>}
              {a.why.listHeading && <h3 className="mt-8 text-[1.375rem] font-bold">{a.why.listHeading}</h3>}
              <div className="mt-6">
                {/* An odd count stacks, so no entry is left alone on a row. */}
                <Items items={a.why.items} columns={a.why.items.length % 2 ? "" : "sm:grid-cols-2"} />
              </div>
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Image
                src="/about/owner-laptop.jpg"
                alt={a.images.laptop}
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="about-photo aspect-square"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-4 border-t-[4px] border-double border-teal-500 pt-8 lg:mt-16 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:pt-10">
            <h2 className="about-heading">{a.why.result.heading}</h2>
            <p className="max-w-[58ch] text-[1.25rem] leading-[1.65]">{a.why.result.body}</p>
          </div>
        </div>
      </section>

      <section className="page-wrap py-16 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <h2 className="about-heading">{a.today.heading}</h2>
            <div className="mt-5 flex max-w-[62ch] flex-col gap-4 about-copy">
              {a.today.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <Image
            src="/about/owner-reports.jpg"
            alt={a.images.reports}
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="about-photo aspect-[3/2]"
          />
        </div>
        <div className="mt-12">
          <Items items={a.today.items} columns="sm:grid-cols-3" />
        </div>
      </section>

      <section className="guilloche-dark guilloche-tile text-white">
        <div className="page-wrap py-20 lg:py-28">
          <p className="max-w-[46ch] text-balance text-[1.75rem] font-bold leading-[1.3] sm:text-[2.25rem] lg:text-[2.75rem]">{a.statement}</p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="hero-field about-field guilloche-tile hidden lg:block" aria-hidden="true" />
        <div className="page-wrap grid items-center gap-10 pt-16 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:py-24">
          <div>
            <h2 className="about-heading">{a.approach.heading}</h2>
            <div className="mt-8">
              <Items items={a.approach.items} columns="sm:grid-cols-2" />
            </div>
          </div>
          <div className="relative -mx-4 flex flex-col items-center gap-3 px-4 pb-12 pt-16 lg:mx-0 lg:p-0">
            <div className="contact-panel guilloche-tile absolute inset-0 -z-10 bg-teal-500 lg:hidden" aria-hidden="true" />
            <Image
              src="/about/current-balance.png"
              alt={a.images.balance}
              width={348}
              height={595}
              sizes="300px"
              className="h-auto w-[280px] rounded-[var(--radius-card)] shadow-[0_32px_60px_-28px_rgba(5,42,37,0.6)] lg:w-[300px]"
            />
            <span className="rounded-pill bg-paper px-3 py-1 text-[0.75rem] text-ink-700">{t.hero.demoLabel}</span>
          </div>
        </div>
      </section>

      <section className="border-y border-paper-200 bg-paper-100">
        <div className="page-wrap py-16 lg:py-24">
          <p className="max-w-[34ch] text-balance text-[1.625rem] font-bold leading-[1.3] sm:text-[2rem] lg:text-[2.5rem]">{a.closingStatement}</p>
          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
            <Charter charter={a.vision} photo="/about/boardroom.jpg" alt={a.images.boardroom} width={600} height={338} />
            <Charter charter={a.mission} photo="/about/team-meeting.jpg" alt={a.images.meeting} width={626} height={418} />
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-8 py-16 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="about-heading">{a.values.heading}</h2>
          <p className="mt-5 about-copy">{a.values.intro}</p>
        </div>
        <dl>
          {a.values.items.map((value) => (
            <div key={value.title} className={`about-value ai-${value.icon}`}>
              <dt>{value.title}</dt>
              <dd>{value.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-paper-200 bg-paper-100">
        <div className="page-wrap py-16 lg:py-24">
          <div className="grid gap-5 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <h2 className="about-heading">{a.team.heading}</h2>
            <p className="max-w-[62ch] about-copy">{a.team.intro}</p>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-14">
            {a.team.members.map((member) => (
              <li key={member.name}>
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  width={1280}
                  height={1280}
                  sizes="(min-width: 640px) 32vw, 100vw"
                  className="team-photo"
                />
                <p className="team-name" lang="en">
                  {member.name}
                </p>
                <p className="team-role">{member.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[62ch] text-[1.125rem] leading-[1.8] lg:mt-14">{a.team.outro}</p>
        </div>
      </section>

      <section className="guilloche-dark guilloche-tile">
        <div className="page-wrap py-16 lg:py-24">
          <div className="doc-frame mx-auto flex max-w-[820px] flex-col items-center gap-5 bg-paper px-6 py-12 text-center shadow-[0_40px_80px_-40px_rgba(5,42,37,0.6)] lg:px-16 lg:py-16">
            <h2 className="about-heading">{a.cta.heading}</h2>
            <p className="max-w-[48ch] text-[1.125rem] leading-[1.7] text-ink-700">{a.cta.body}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <ButtonLink href={site.signup[locale]} variant="primary" arrow>
                {a.cta.primary}
              </ButtonLink>
              <ButtonLink href={site.demo} variant="ghost" external>
                {a.cta.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
