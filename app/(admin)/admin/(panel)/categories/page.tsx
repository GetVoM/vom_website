import type { Metadata } from "next";
import { RecordForm } from "@/components/admin/RecordForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { Tables } from "@/lib/supabase/types";
import { saveCategory } from "../../actions";

export const metadata: Metadata = { title: "التصنيفات" };

function Fields({ category }: { category?: Tables<"categories"> }) {
  return (
    <>
      {category && <input type="hidden" name="id" value={category.id} />}
      <div className="adm-grid">
        <label className="adm-field">
          <span>الاسم</span>
          <input name="name" defaultValue={category?.name} required />
        </label>
        <label className="adm-field">
          <span>المسار {category && "(ثابت)"}</span>
          <input name="path" defaultValue={category?.path} dir="ltr" readOnly={Boolean(category)} required placeholder="/topic/" />
        </label>
        <label className="adm-field">
          <span>اللغة</span>
          <select name="lang" defaultValue={category?.lang ?? "ar"}>
            <option value="ar">عربي</option>
            <option value="en">English</option>
          </select>
        </label>
        <label className="adm-field">
          <span>عنوان SEO</span>
          <input name="seoTitle" defaultValue={category?.seo_title ?? ""} />
        </label>
      </div>
      <label className="adm-field">
        <span>وصف SEO</span>
        <textarea name="seoDescription" rows={2} defaultValue={category?.seo_description ?? ""} />
      </label>
      <label className="adm-field">
        <span>مقدمة الصفحة</span>
        <textarea name="intro" rows={3} defaultValue={category?.intro ?? ""} />
      </label>
    </>
  );
}

export default async function CategoriesPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("categories").select("*").order("lang").order("name");
  if (error) throw new Error(error.message);
  return (
    <>
      <div className="adm-head">
        <h1>التصنيفات</h1>
      </div>
      <details className="adm-card">
        <summary>تصنيف جديد</summary>
        <RecordForm action={saveCategory} submit="إضافة">
          <Fields />
        </RecordForm>
      </details>
      {data.map((category) => (
        <details key={category.id} className="adm-card">
          <summary>
            {category.name}
            <span className="adm-path" dir="ltr">
              {category.path}
            </span>
            {!category.seo_description && <span className="adm-flag">بلا وصف SEO</span>}
          </summary>
          <RecordForm action={saveCategory} submit="حفظ">
            <Fields category={category} />
          </RecordForm>
        </details>
      ))}
    </>
  );
}
