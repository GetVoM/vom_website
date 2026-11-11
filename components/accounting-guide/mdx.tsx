import type { ReactNode } from "react";
import { accountingGuide } from "@/lib/content/accounting-guide/copy";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { site } from "@/lib/seo/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The house components the accounting guide's MDX body uses, on top of the
 * e-invoicing set (Figure, Table, Faq, Question and the prose link). Markup
 * stays lean: every word is repeated in the page's RSC payload.
 */

/** The old page's inline trial block: its hero line and the trial link, as one card. */
function TrialCard({ title, cta }: { title: string; cta: string }) {
  return (
    <aside className="ein-phase acg-trial" aria-label={title}>
      <p className="ein-phase-title">{title}</p>
      <ButtonLink href={site.signup.ar} className="ein-phase-cta" arrow>
        {cta}
      </ButtonLink>
    </aside>
  );
}

/** The summary's six points, as a ruled and numbered sheet (the numbers are CSS counters). */
function KeyPoints({ children }: { children: ReactNode }) {
  return <div className="acg-points">{children}</div>;
}

/**
 * Questions put to VoM's AI assistant. The old page showed them as pictures of
 * text; here they are text, each with the old picture's description for screen
 * readers.
 */
function PromptChips({ items }: { items: { q: string; label: string }[] }) {
  return (
    <ul className="acg-chips" role="list" aria-label={accountingGuide.chipsLabel}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="sr-only">{item.label}: </span>
          {item.q}
        </li>
      ))}
    </ul>
  );
}

const sectorIcons = new Map<string, string>(getDictionary("ar").sectors.items.map((item) => [item.id, item.icon]));

/** The fifteen sectors, each with its pictogram (drawn in CSS from `data-icon`) and its paragraph. */
function Sectors({ children }: { children: ReactNode }) {
  return (
    <ul className="acg-sectors" role="list">
      {children}
    </ul>
  );
}

function Sector({ id, children }: { id: string; children: ReactNode }) {
  return <li data-icon={sectorIcons.get(id)}>{children}</li>;
}

/** A table's yes/no mark (the old page's ✅/❌), drawn in the line-icon stroke; read as «نعم»/«لا». */
function Mark({ v }: { v: "yes" | "no" }) {
  return (
    <span className="acg-mark" data-mark={v}>
      <span className="sr-only">{v === "yes" ? "نعم" : "لا"}</span>
    </span>
  );
}

export const accountingGuideMdxComponents = {
  TrialCard,
  Mark,
  KeyPoints,
  PromptChips,
  Sectors,
  Sector,
};
