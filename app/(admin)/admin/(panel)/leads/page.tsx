import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";
import { adminHref } from "@/lib/admin/path";
import { leadsQuery } from "@/lib/admin/leads";

export const metadata: Metadata = { title: "الطلبات" };

const when = (iso: string) => new Intl.DateTimeFormat("ar", { numberingSystem: "latn", calendar: "gregory", dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" }).format(new Date(iso));

/** What visitors sent through the site's forms: filter by form and date, export as CSV. */
export default async function LeadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { supabase } = await requireAdmin();
  const { form = "", from = "", to = "" } = await searchParams;
  const [{ data, count, error }, { data: forms }] = await Promise.all([leadsQuery(supabase, { form, from, to }).limit(200), supabase.from("leads").select("form").limit(5000)]);
  if (error) throw new Error(error.message);
  const formNames = [...new Set((forms ?? []).map((row) => row.form))].sort();
  const exportHref = `${adminHref("leads/export/")}?${new URLSearchParams({ ...(form && { form }), ...(from && { from }), ...(to && { to }) })}`;

  return (
    <>
      <div className="adm-head">
        <h1>الطلبات</h1>
        <a className="adm-btn" href={exportHref}>
          تصدير CSV
        </a>
      </div>
      <form method="get" action={adminHref("leads/")} className="adm-filters">
        <label className="adm-field">
          <span>النموذج</span>
          <select name="form" defaultValue={form}>
            <option value="">الكل</option>
            {formNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
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
              <th scope="col">النموذج</th>
              <th scope="col">الاسم</th>
              <th scope="col">البريد</th>
              <th scope="col">الجوال</th>
              <th scope="col">المنشأة</th>
              <th scope="col">الرسالة</th>
              <th scope="col">الصفحة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lead) => (
              <tr key={lead.id}>
                <td className="num">{when(lead.created_at)}</td>
                <td>{lead.form}</td>
                <td>{lead.name ?? "—"}</td>
                <td dir="ltr">{lead.email ?? "—"}</td>
                <td dir="ltr">{lead.phone ?? "—"}</td>
                <td>{lead.company ?? "—"}</td>
                <td className="adm-message">{lead.message ?? "—"}</td>
                <td dir="ltr" className="adm-path">
                  {lead.page_path ?? "—"}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="adm-muted">
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
