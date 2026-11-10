import type { Locale } from "@/lib/i18n/config";
import {
  annualPrice,
  cells,
  compareGroups,
  monthlyPrice,
  planIds,
  planShortNames,
  popularPlan,
  type Cell,
  type PlanId,
  type PricingCopy,
} from "@/lib/content/pricing";
import { Amount } from "./Amount";

/**
 * The comparison ledger: only the rows where the plans differ, under plan heads
 * that stay pinned below the site header. A tick, dash or ∞ is drawn in CSS from
 * data-v over the cell's own word, which screen readers read; the markup stays
 * small because every cell is repeated in the page's RSC payload.
 */
export function CompareTable({ c, locale }: { c: PricingCopy; locale: Locale }) {
  return (
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
              {c.compare.groups[group.id]}
            </th>
          </tr>
          {group.rows.map((row) => (
            <tr key={row}>
              <th scope="row">{c.compare.rows[row]}</th>
              {planIds.map((id) => (
                <CellView key={id} cell={cells[row][id]} c={c} />
              ))}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

function HeadPrice({ id, c }: { id: PlanId; c: PricingCopy }) {
  const monthly = monthlyPrice[id];
  const annual = annualPrice(id);
  if (monthly === null) return <small>{c.contactShort}</small>;
  if (annual === null) {
    return (
      <small>
        {c.from} <Amount value={monthly} currency={c.currency} />
      </small>
    );
  }
  return (
    <>
      <small className="prc-period" data-period="monthly">
        <Amount value={monthly} currency={c.currency} />
      </small>
      <small className="prc-period" data-period="annual">
        <Amount value={annual} currency={c.currency} />
      </small>
    </>
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
