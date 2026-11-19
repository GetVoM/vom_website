import type { Locale } from "@/lib/i18n/config";
import { flexRates, planNames, planPeriod, planPrice, popularPlan, type PlanId, type PricingCopy } from "@/lib/content/pricing";
import { ButtonLink } from "@/components/ui/Button";
import { Amount } from "./Amount";

/**
 * One plan as an official sheet on the teal field: its name, the price ruled off
 * with the accountant's double rule, then what sets it apart and its button. Each
 * plan has one period (Flex monthly, the rest yearly), so one price; the billing
 * switch shows or hides whole sheets. List keys are indexes: a text key would
 * repeat the copy in the RSC payload.
 */
export function PlanSheet({ id, c, locale, href }: { id: PlanId; c: PricingCopy; locale: Locale; href: string }) {
  const copy = c.plans[id];
  const popular = id === popularPlan;
  const price = planPrice[id];

  return (
    <article className="prc-sheet" {...(popular && { "data-popular": "" })}>
      <h2 className="prc-name">{planNames[id][locale]}</h2>
      {/* After the name in reading order; stamped on the sheet's top start corner. */}
      {popular && (
        <p className="prc-seal">
          {c.popular}
          <span aria-hidden="true">{c.sealMicro}</span>
        </p>
      )}
      <p className="prc-summary">{copy.summary}</p>

      <div className="prc-price">
        {price === null ? (
          <p className="prc-contact">{c.contactPrice}</p>
        ) : planPeriod[id] === "monthly" ? (
          <p className="prc-amount">
            <span className="prc-from">{c.from}</span>
            <Amount value={price} currency={c.currency} className="prc-figure" />
            <span>{c.per.firstUser}</span>
            <span className="prc-chip">{c.billing.monthlyOnly}</span>
          </p>
        ) : (
          <p className="prc-amount">
            <Amount value={price} currency={c.currency} className="prc-figure" />
            <span>{c.per.year}</span>
          </p>
        )}
      </div>

      {/* Rates and points share one row, so the buttons line up across the sheets.
          Flex's rates are ruled lines, the ledger's own grammar, not boxes. */}
      <div className="prc-body">
        {id === "flex" && (
          <dl className="prc-rates">
            {(
              [
                [c.flex.extraUser, flexRates.extraUser],
                [c.flex.zatca, flexRates.zatca],
                [c.flex.costCentre, flexRates.costCentre],
                [c.flex.assets, flexRates.assets],
                [c.flex.integrations, flexRates.integrations],
                [c.flex.transaction, flexRates.transaction],
                [c.flex.export, flexRates.export],
              ] as const
            ).map(([label, value], i) => (
              <div key={i}>
                <dt>{label}</dt>
                <dd>
                  <Amount value={value} currency={c.currency} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="prc-points" role="list">
          {copy.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
          {id === "flex" && (
            <li>
              {/* A no-break space keeps the amount with the word before it. */}
              {c.flex.autoCharge}{"\u00a0"}
              <Amount value={flexRates.autoCharge} currency={c.currency} />
            </li>
          )}
        </ul>
      </div>

      <ButtonLink
        href={href}
        variant={popular ? "primary" : "secondary"}
        className="prc-cta"
        data-track="pricing_plan_cta_clicked"
        data-track-plan={id}
      >
        {copy.cta}
      </ButtonLink>
    </article>
  );
}
