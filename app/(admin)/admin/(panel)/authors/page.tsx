import type { Metadata } from "next";
import { RecordForm } from "@/components/admin/RecordForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { Tables } from "@/lib/supabase/types";
import { saveAuthor } from "../../actions";

export const metadata: Metadata = { title: "الكتّاب" };

function Fields({ author }: { author?: Tables<"authors"> }) {
  return (
    <>
      {author && <input type="hidden" name="id" value={author.id} />}
      <div className="adm-grid">
        <label className="adm-field">
          <span>الاسم كما يظهر</span>
          <input name="name" defaultValue={author?.name} required />
        </label>
        <label className="adm-field">
          <span>المعرّف في الرابط {author && "(ثابت)"}</span>
          <input name="slug" defaultValue={author?.slug} dir="ltr" readOnly={Boolean(author)} required />
        </label>
        <label className="adm-field">
          <span>المسمى الوظيفي</span>
          <input name="jobTitle" defaultValue={author?.job_title ?? ""} />
        </label>
        <label className="adm-field">
          <span>المؤهلات</span>
          <input name="credentials" defaultValue={author?.credentials ?? ""} />
        </label>
      </div>
      <label className="adm-field">
        <span>نبذة</span>
        <textarea name="bio" rows={3} defaultValue={author?.bio ?? ""} />
      </label>
      <label className="adm-field">
        <span>روابط الحسابات (LinkedIn وغيره)، رابط في كل سطر</span>
        <textarea name="sameAs" rows={2} dir="ltr" defaultValue={author?.same_as.join("\n") ?? ""} />
      </label>
    </>
  );
}

/** Writers and the reviewing accountant. The same person can be both. */
export default async function AuthorsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("authors").select("*").order("name");
  if (error) throw new Error(error.message);
  return (
    <>
      <div className="adm-head">
        <h1>الكتّاب والمراجعون</h1>
      </div>
      <details className="adm-card">
        <summary>كاتب جديد</summary>
        <RecordForm action={saveAuthor} submit="إضافة">
          <Fields />
        </RecordForm>
      </details>
      {data.map((author) => (
        <details key={author.id} className="adm-card">
          <summary>
            {author.name}
            <span className="adm-path" dir="ltr">
              /author/{author.slug}/
            </span>
            {!author.bio && <span className="adm-flag">بلا نبذة</span>}
          </summary>
          <RecordForm action={saveAuthor} submit="حفظ">
            <Fields author={author} />
          </RecordForm>
        </details>
      ))}
    </>
  );
}
