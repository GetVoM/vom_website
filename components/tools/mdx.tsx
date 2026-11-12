import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CalculatorId } from "@/lib/content/tools/catalogue";
import { CalcBand } from "./calculators";

/**
 * The tool pages' own MDX components, passed to their bodies through the
 * `components` prop (the global map in mdx-components.tsx supplies the shared
 * Table, Faq, Question, Mark and the prose link). Markup stays lean: every word
 * of a body is repeated in the page's RSC payload.
 */

/** The poster band: a full-width teal field holding one calculator, or two behind a switch. */
function Calculator({ ids, label }: { ids: CalculatorId[]; label: string }) {
  return (
    <section className="tol-band guilloche-tile" aria-label={label}>
      <div className="page-wrap">
        <CalcBand ids={ids} />
      </div>
    </section>
  );
}

/**
 * An image from the old page, framed. Several were banners linking to the
 * sign-up or the homepage, and keep that link.
 */
function Figure({ src, width, height, alt, href }: { src: string; width: number; height: number; alt: string; href?: string }) {
  const image = <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 1024px) 760px, 100vw" />;
  return (
    <figure className="ein-figure tol-figure-frame" style={{ maxWidth: Math.min(760, width) }}>
      {href ? (
        href.startsWith("/") ? (
          <Link href={href} prefetch={false} className="tol-figure-link">
            {image}
          </Link>
        ) : (
          <a href={href} className="tol-figure-link">
            {image}
          </a>
        )
      ) : (
        image
      )}
    </figure>
  );
}

/** A boxed call to action from the old page (a one-cell table there). */
function Callout({ children }: { children: ReactNode }) {
  return <aside className="tol-callout">{children}</aside>;
}

/** The components for one page; the band is named after the page's tool. */
export function toolMdxComponents(label: string) {
  return {
    Calculator: ({ ids }: { ids: CalculatorId[] }) => <Calculator ids={ids} label={label} />,
    Figure,
    Callout,
  };
}
