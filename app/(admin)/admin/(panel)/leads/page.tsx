import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";
import { adminHref } from "@/lib/admin/path";
import { formShape, leadFormCounts, leadsQuery, payloadLabel, textRecord } from "@/lib/admin/leads";
import type { SharedField } from "@/lib/leads/forms";

export const metadata: Metadata = { title: "الطلبات" };

const when = (iso: string) => new Intl.DateTimeFormat("ar", { numberingSystem: "latn", calendar: "gregory", dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" }).format(new Date(iso));

const sharedHeading: Record<SharedField, string> = {
  name: "الاسم",
  email: "البريد",
  phone: "الجوال",
  company: "المنشأة",
  message: "الرسالة",
};

/** Where the lead came from: the campaign tags, then a mark for an ad click. */
function source(utm: Record<string, string>) {
  const tags = [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(" / ");
  const click = utm.gclid ? "Google Ads" : utm.fbclid ? "Meta" : "";
  return [tags, click].filter(Boolean).join(" · ") || "—";
}

/**
 * What visitors sent through the site's forms. One chip per form (each form is
 * named by its page's slug), a date range, and a CSV export of what is shown.
 * With a form chosen, the columns are that form's own fields.
 */
export default async function LeadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { supabase } = await requireAdmin();
  const { form = "", from = "", to = "" } = await searchParams;
  const [{ data, count, error }, counts] = await Promise.all([leadsQuery(supabase, { form, from, to }).limit(200), leadFormCounts(supabase, { from, to })]);
  if (error) throw new Error(error.message);

  const query = (next: Record<string, string>) => {
    const params = new URLSearchParams(Object.entries({ form, from, to, ...next }).filter(([, value]) => value));
    return params.size > 0 ? `?${params}` : "";
  };
  const exportHref = `${adminHref("leads/export/")}${query({})}`;
  const shape = formShape(form || undefined);
  // Date, source and page, plus the form column and the details column when no form is chosen.
  const columnCount = 3 + shape.shared.length + (form ? shape.payload.length : 2);

  return (
    <>
      <div className="adm-head">
        <h1>الطلبات</h1>
        <a className="adm-btn" href={exportHref}>
          تصدير CSV
        </a>
      </div>
      <nav className="adm-forms" aria-label="النماذج">
        <a href={`${adminHref("leads/")}${query({ form: "" })}`} aria-current={form ? undefined : "page"}>
          الكل <span className="num">{counts.total}</span>
        </a>
        {counts.forms.map(({ name, count: formCount }) => (
          <a key={name} href={`${adminHref("leads/")}${query({ form: name })}`} aria-current={form === name ? "page" : undefined}>
            <bdi dir="ltr">{name}</bdi> <span className="num">{formCount}</span>
          </a>
        ))}
      </nav>
      <form method="get" action={adminHref("leads/")} className="adm-filters">
        {form && <input type="hidden" name="form" value={form} />}
        <label className="adm-field">
          <span>من تاريخ</span>
          <input type="date" name="from" defaultValue={from} dir="ltr" />
        </label>
        <label className="adm-field">
          <span>إلى تاريخ</span>
          <input type="date" name="to" defaultValue={to} dir="ltr" />
        </label>
        <button type="submit" className="adm-btn">
          تصفية
        </button>
      </form>
      <p className="adm-muted num">
        {count ?? 0} طلب{(count ?? 0) > 200 ? "، تظهر أحدث 200. التصدير يشملها كلها." : ""}
      </p>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th scope="col">التاريخ</th>
              {!form && <th scope="col">النموذج</th>}
              {shape.shared.map((field) => (
                <th key={field} scope="col">
                  {sharedHeading[field]}
                </th>
              ))}
              {form ? (
                shape.payload.map(([key, label]) => (
                  <th key={key} scope="col">
                    {label}
                  </th>
                ))
              ) : (
                <th scope="col">تفاصيل</th>
              )}
              <th scope="col">المصدر</th>
              <th scope="col">الصفحة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lead) => {
              const payload = textRecord(lead.payload);
              return (
                <tr key={lead.id}>
                  <td className="num">{when(lead.created_at)}</td>
                  {!form && (
                    <td>
                      <bdi dir="ltr">{lead.form}</bdi>
                    </td>
                  )}
                  {shape.shared.map((field) => (
                    <td key={field} dir={field === "email" || field === "phone" ? "ltr" : undefined} className={field === "message" ? "adm-message" : undefined}>
                      {lead[field] ?? "—"}
                    </td>
                  ))}
                  {form ? (
                    shape.payload.map(([key]) => <td key={key}>{payload[key] ?? "—"}</td>)
                  ) : (
                    <td>
                      {Object.keys(payload).length === 0
                        ? "—"
                        : Object.entries(payload).map(([key, value]) => (
                            <span key={key} className="adm-cell-note">
                              {payloadLabel(lead.form, key)}: {value}
                            </span>
                          ))}
                    </td>
                  )}
                  <td dir="ltr" className="adm-path">
                    {source(textRecord(lead.utm))}
                  </td>
                  <td dir="ltr" className="adm-path">
                    {lead.page_path ?? "—"}
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={columnCount} className="adm-muted">
                  لا توجد طلبات بعد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
