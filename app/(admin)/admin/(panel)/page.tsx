import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminHref } from "@/lib/admin/path";
import { createPost } from "../actions";

export const metadata: Metadata = { title: "المقالات" };

const PAGE = 50;

const day = (iso: string | null) => (iso ? new Intl.DateTimeFormat("ar", { numberingSystem: "latn", calendar: "gregory", dateStyle: "medium", timeZone: "Asia/Riyadh" }).format(new Date(iso)) : "—");

/** The posts list: search by title, filter by status, type and category. */
export default async function PostsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { supabase } = await requireAdmin();
  const { q = "", status = "", category = "", type = "", page = "1" } = await searchParams;
  const from = (Math.max(1, Number(page) || 1) - 1) * PAGE;

  const columns = "id, title, path, type, lang, status, published_at, updated_at, primary_category:categories!posts_primary_category_id_fkey(name)";
  let query = supabase.from("posts").select(category ? `${columns}, post_categories!inner(category_id)` : columns, { count: "exact" });
  if (q) query = query.ilike("title", `%${q.replace(/[%_\\]/g, "\\$&")}%`);
  if (status === "draft" || status === "published") query = query.eq("status", status);
  if (type === "post" || type === "news" || type === "template") query = query.eq("type", type);
  if (category) query = query.eq("post_categories.category_id", category);
  const [{ data, count, error }, { data: categories }] = await Promise.all([
    query
      .order("updated_at", { ascending: false })
      .range(from, from + PAGE - 1)
      .overrideTypes<
        { id: string; title: string; path: string; type: string; lang: string; status: string; published_at: string | null; updated_at: string; primary_category: { name: string } | null }[],
        { merge: false }
      >(),
    supabase.from("categories").select("id, name").order("name"),
  ]);
  if (error) throw new Error(error.message);
  const total = count ?? 0;
  const pageHref = (n: number) => `${adminHref()}?${new URLSearchParams({ ...(q && { q }), ...(status && { status }), ...(type && { type }), ...(category && { category }), page: String(n) })}`;
  const current = Math.floor(from / PAGE) + 1;

  return (
    <>
      <div className="adm-head">
        <h1>المقالات</h1>
        <form action={createPost} className="adm-row">
          <select name="type" aria-label="النوع" defaultValue="post">
            <option value="post">مقال</option>
            <option value="news">خبر</option>
            <option value="template">قالب</option>
          </select>
          <select name="lang" aria-label="اللغة" defaultValue="ar">
            <option value="ar">عربي</option>
            <option value="en">English</option>
          </select>
          <button type="submit" className="adm-btn adm-btn-primary">
            مقال جديد
          </button>
        </form>
      </div>

      <form method="get" action={adminHref()} className="adm-filters" role="search">
        <label className="adm-field">
          <span>بحث في العناوين</span>
          <input name="q" type="search" defaultValue={q} />
        </label>
        <label className="adm-field">
          <span>الحالة</span>
          <select name="status" defaultValue={status}>
            <option value="">الكل</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </label>
        <label className="adm-field">
          <span>النوع</span>
          <select name="type" defaultValue={type}>
            <option value="">الكل</option>
            <option value="post">مقال</option>
            <option value="news">خبر</option>
            <option value="template">قالب</option>
          </select>
        </label>
        <label className="adm-field">
          <span>التصنيف</span>
          <select name="category" defaultValue={category}>
            <option value="">الكل</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="adm-btn">
          تصفية
        </button>
      </form>

      <p className="adm-muted num">{total} نتيجة</p>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th scope="col">العنوان</th>
              <th scope="col">النوع والتصنيف</th>
              <th scope="col">الحالة</th>
              <th scope="col">تاريخ النشر</th>
              <th scope="col">آخر تعديل</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post) => (
              <tr key={post.id}>
                <th scope="row">
                  <Link href={adminHref(`posts/${post.id}/`)} dir={post.lang === "en" ? "ltr" : undefined}>
                    {post.title || "(بلا عنوان)"}
                  </Link>
                  <span className="adm-path" dir="ltr">
                    {post.path}
                  </span>
                </th>
                <td>
                  <span className="adm-type" data-type={post.type}>
                    {post.type === "news" ? "خبر" : post.type === "template" ? "قالب" : "مقال"}
                  </span>
                  {post.type === "post" && post.primary_category && <span className="adm-cell-note">{post.primary_category.name}</span>}
                </td>
                <td>
                  <span className="adm-status" data-status={post.status}>
                    {post.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="num">{day(post.published_at)}</td>
                <td className="num">{day(post.updated_at)}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="adm-muted">
                  لا توجد مقالات بهذه الشروط.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > PAGE && (
        <nav className="adm-row" aria-label="الصفحات">
          {current > 1 && (
            <Link className="adm-btn" href={pageHref(current - 1)}>
              السابق
            </Link>
          )}
          <span className="adm-muted num">
            صفحة {current} من {Math.ceil(total / PAGE)}
          </span>
          {from + PAGE < total && (
            <Link className="adm-btn" href={pageHref(current + 1)}>
              التالي
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
