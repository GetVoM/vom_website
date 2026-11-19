import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import { featuresPaths } from "@/lib/i18n/routes";
import type { ModuleId } from "@/lib/content/features";
import {
  cells,
  compareGroups,
  planIds,
  planPeriod,
  planPrice,
  planShortNames,
  popularPlan,
  rowLinks,
  type Cell,
  type PlanId,
  type PricingCopy,
  type RowId,
} from "@/lib/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { Amount } from "./Amount";

/**
 * The comparison ledger: every capability, grouped under the features page's own
 * section titles, under plan heads that stay pinned below the site header. All four
 * plans show whichever billing period is chosen, each head priced as it is billed.
 * A tick or dash is drawn in CSS from data-v over the cell's own word, which
 * screen readers read; "Unlimited" shows as its word. The markup stays small
 * because every cell is repeated in the page's RSC payload.
 */
export function CompareTable({
  c,
  locale,
  groupTitles,
}: {
  c: PricingCopy;
  locale: Locale;
  groupTitles: Record<ModuleId, string>;
}) {
  const features = localePath(locale, featuresPaths[locale]);

  return (
    <>
      <table className="prc-table">
        <caption className="sr-only">{c.compare.caption}</caption>
        <colgroup>
          <col className="prc-col-feature" />
          {planIds.map((id) => (
            <col key={id} {...(id === popularPlan && { className: "prc-col-popular" })} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">{c.compare.feature}</span>
            </th>
            {planIds.map((id) => (
              <th key={id} scope="col" {...(id === popularPlan && { "data-popular": "" })}>
                <b>{planShortNames[id][locale]}</b>
                <HeadPrice id={id} c={c} />
              </th>
            ))}
          </tr>
        </thead>
        {compareGroups.map((group) => (
          <tbody key={group.id}>
            <tr>
              <th scope="rowgroup" colSpan={planIds.length + 1}>
                {groupTitles[group.id]}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row}>
                <RowHead row={row} c={c} features={features} />
                {planIds.map((id) => (
                  <CellView key={id} cell={cells[row][id]} c={c} />
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <div className="prc-table-more">
        <ButtonLink href={features} variant="secondary" arrow data-track="pricing_features_clicked">
          {c.compare.more}
        </ButtonLink>
      </div>
    </>
  );
}

function RowHead({ row, c, features }: { row: RowId; c: PricingCopy; features: string }) {
  const label = c.compare.rows[row];
  const section = rowLinks[row];
  const note = c.compare.notes[row];
  return (
    <th scope="row">
      {section ? (
        <Link href={`${features}#${section}`} className="prc-link">
          {label}
        </Link>
      ) : (
        label
      )}
      {note && <small>{note}</small>}
    </th>
  );
}

/** The plan's price as it is billed: Flex from its monthly start, the fixed plans a year, Business by sales. */
function HeadPrice({ id, c }: { id: PlanId; c: PricingCopy }) {
  const price = planPrice[id];
  if (price === null) return <small>{c.contactShort}</small>;
  const monthly = planPeriod[id] === "monthly";
  return (
    <small>
      {monthly && <>{c.from} </>}
      <Amount value={price} currency={c.currency} />
      <span className="prc-unit">{monthly ? c.per.month : c.per.year}</span>
    </small>
  );
}

function CellView({ cell, c }: { cell: Cell; c: PricingCopy }) {
  switch (cell.kind) {
    case "yes":
      return <td data-v="y">{c.compare.yes}</td>;
    case "no":
      return <td data-v="n">{c.compare.no}</td>;
    case "unlimited":
      return <td data-v="i">{c.compare.unlimited}</td>;
    case "usage":
      return (
        <td>
          <small>{c.compare.usage}</small>
        </td>
      );
    case "count":
      return (
        <td>
          {cell.value}
          {cell.each && <small>{c.compare.each}</small>}
        </td>
      );
    case "rate":
      return (
        <td>
          <Amount value={cell.value} currency={c.currency} />
          <small>{c.per[cell.per]}</small>
        </td>
      );
  }
}
