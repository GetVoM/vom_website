import type { StudentSpread } from "@/lib/i18n/dictionaries/types";

/**
 * The form a textbook prints beside a concept, drawn in hairlines: a T-account
 * pair, a tax-invoice skeleton, a subsidiary-ledger card or a receipt voucher.
 * Decorative: the concept line under it carries the meaning.
 */
export function TextbookForm({ form, amount }: { form: StudentSpread["form"]; amount: string }) {
  const l = form.labels;

  if (form.kind === "taccount") {
    // Debit is the start side of a T in both languages: right in Arabic, left in English.
    return (
      <div className="stu-form stu-form-t" aria-hidden="true">
        {[
          { name: l[0], debit: amount, credit: "" },
          { name: l[1], debit: "", credit: amount },
        ].map((account) => (
          <div key={account.name} className="stu-t">
            <span className="stu-t-name">{account.name}</span>
            <span className="stu-t-side">
              <span className="stu-t-label">{l[2]}</span>
              <span className="num">{account.debit}</span>
            </span>
            <span className="stu-t-side">
              <span className="stu-t-label">{l[3]}</span>
              <span className="num">{account.credit}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (form.kind === "invoice") {
    return (
      <div className="stu-form stu-form-sheet" aria-hidden="true">
        <span className="stu-form-title">{l[0]}</span>
        <span className="stu-blank">{l[1]}</span>
        <span className="stu-blank">{l[2]}</span>
        <span className="stu-form-rule">{l[3]}</span>
        <span className="stu-blank stu-blank-empty" />
        <span className="stu-blank stu-blank-empty" />
        <span className="stu-blank">{l[4]}</span>
        <span className="stu-blank stu-form-total">{l[5]}</span>
      </div>
    );
  }

  if (form.kind === "ledger") {
    return (
      <div className="stu-form stu-form-sheet" aria-hidden="true">
        <span className="stu-form-title">{l[0]}</span>
        <span className="stu-ledger-grid">
          <span>{l[1]}</span>
          <span>{l[2]}</span>
          <span>{l[3]}</span>
          <span className="stu-ledger-rows" />
        </span>
      </div>
    );
  }

  return (
    <div className="stu-form stu-form-sheet" aria-hidden="true">
      <span className="stu-form-head">
        <span className="stu-form-title">{l[0]}</span>
        <span className="stu-blank stu-blank-short">{l[1]}</span>
      </span>
      <span className="stu-blank">{l[2]}</span>
      <span className="stu-blank">{l[3]}</span>
      <span className="stu-blank">{l[4]}</span>
    </div>
  );
}
