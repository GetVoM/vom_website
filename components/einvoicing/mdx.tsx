import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, type AnchorHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { einvoicingCopy } from "@/lib/content/einvoicing/copy";
import { site } from "@/lib/seo/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The house components the e-invoicing MDX bodies use (wired up through the root
 * mdx-components.tsx). Markup stays lean on purpose: every word of a guide is
 * repeated in the page's RSC payload, so no per-paragraph classes; the body is
 * styled from `.ein-body` in app/globals.css.
 */

/** A markdown link: internal paths navigate in the app, others open a new tab. */
function BodyLink({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} prefetch={false} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external && { target: "_blank", rel: "noopener" })} {...rest}>
      {children}
      {external && <span className="sr-only"> {einvoicingCopy.newTab}</span>}
    </a>
  );
}

/**
 * An image from the old page, framed. Tall pictures (infographics, phone
 * screens) are held narrower than wide ones so they never fill a whole screen.
 */
function Figure({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  const tall = height > width * 1.15;
  const max = tall ? 520 : 760;
  return (
    <figure className="ein-figure" style={{ maxWidth: Math.min(max, width) }}>
      <Image src={src} width={width} height={height} alt={alt} sizes={`(min-width: 1024px) ${max}px, 100vw`} />
    </figure>
  );
}

/** A data table; it scrolls sideways inside its frame on narrow screens. */
function Table({ children }: { children: ReactNode }) {
  return (
    <div className="ein-table">
      <table>{children}</table>
    </div>
  );
}

/** The guide's questions, in the house `details.faq` pattern; the first is open. */
function Faq({ children }: { children: ReactNode }) {
  const questions = Children.toArray(children).filter(isValidElement) as ReactElement<{ open?: boolean }>[];
  return <div className="ein-faq">{questions.map((question, i) => (i === 0 ? cloneElement(question, { open: true }) : question))}</div>;
}

function Question({ q, open, children }: { q: string; open?: boolean; children: ReactNode }) {
  return (
    <details className="faq" open={open}>
      <summary>
        <span>{q}</span>
        <span className="faq-icon ein-faq-icon" aria-hidden="true" />
      </summary>
      <div className="ein-answer">{children}</div>
    </details>
  );
}

/**
 * The old template's Phase 2 card, in the text after the introduction: the trial
 * button and three assurances, their icons drawn in CSS.
 */
function PhaseTwo() {
  const c = einvoicingCopy.phaseTwo;
  return (
    <aside className="ein-phase" aria-label={c.title}>
      <p className="ein-phase-title">{c.title}</p>
      <ul className="ein-phase-points" role="list">
        {c.points.map((point, i) => (
          <li key={i} data-icon={i}>
            {point}
          </li>
        ))}
      </ul>
      <ButtonLink href={site.signup.ar} className="ein-phase-cta">
        {c.cta}
      </ButtonLink>
    </aside>
  );
}

export const einvoicingMdxComponents = {
  a: BodyLink,
  Figure,
  Table,
  Faq,
  Question,
  PhaseTwo,
};
