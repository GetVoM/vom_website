"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Editor, JSONContent } from "@tiptap/core";
import { deleteDraft, savePost, type PostInput } from "@/app/(admin)/admin/actions";
import { postPath, slugify } from "@/lib/admin/slug";
import type { Tables } from "@/lib/supabase/types";
import { useAdminHref } from "./AdminBase";
import { RichEditor } from "./RichEditor";
import { uploadImage } from "./upload";

type PostRow = Omit<Tables<"posts">, "content_json"> & { content_json: JSONContent | null };

interface Props {
  post: PostRow;
  categories: { id: string; name: string; path: string; lang: string }[];
  authors: { id: string; name: string; job_title: string | null }[];
  categoryIds: string[];
  twins: { id: string; title: string; lang: string }[];
}

/** A length counter that says whether the text is inside the range search results show. */
function Counter({ value, min, max }: { value: string; min: number; max: number }) {
  const length = value.trim().length;
  const state = length === 0 ? "empty" : length < min ? "short" : length > max ? "long" : "good";
  return (
    <span className="adm-counter num" data-state={state}>
      {length} / {min}–{max}
    </span>
  );
}

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

/**
 * The post editor: the body in Tiptap on the editor's schema (the same one the
 * public pages are rendered from), and a side panel for the address, search
 * fields, cover, topics, people, dates and status. Drafts save themselves;
 * a published post changes only when "نشر التغييرات" is pressed.
 */
export function PostEditor({ post, categories, authors, categoryIds, twins }: Props) {
  const href = useAdminHref();
  const everPublished = post.published_at !== null;
  const [status, setStatus] = useState(post.status);
  const [title, setTitle] = useState(post.title);
  const [typedPath, setTypedPath] = useState(post.path);
  const [pathTouched, setPathTouched] = useState(!post.path.includes("/draft-"));
  const [seoTitle, setSeoTitle] = useState(post.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post.seo_description ?? "");
  const [excerpt, setExcerpt] = useState(post.excerpt ?? "");
  const [cover, setCover] = useState({ url: post.cover_image ?? "", width: post.cover_width, height: post.cover_height });
  const [coverAlt, setCoverAlt] = useState(post.cover_alt ?? "");
  const [primary, setPrimary] = useState(post.primary_category_id ?? "");
  const [selected, setSelected] = useState(categoryIds);
  const [author, setAuthor] = useState(post.author_id ?? "");
  const [reviewer, setReviewer] = useState(post.reviewed_by_id ?? "");
  const [twin, setTwin] = useState(post.alternate_post_id ?? "");
  const [publishedAt, setPublishedAt] = useState(toLocalInput(post.published_at));
  const [dir, setDir] = useState<"rtl" | "ltr">(post.lang === "en" ? "ltr" : "rtl");
  const [note, setNote] = useState<{ kind: "idle" | "saving" | "saved" | "error"; text: string }>({ kind: "idle", text: "" });
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  const [editor, setEditor] = useState<Editor | null>(null);
  const markDirty = useCallback(() => setDirty(true), []);

  const languageCategories = categories.filter((category) => category.lang === post.lang);
  const touch = <T,>(set: (value: T) => void) => (value: T) => {
    set(value);
    setDirty(true);
  };

  // Until someone edits the address, it follows the title and the main topic.
  const autoSlug = !everPublished && !pathTouched ? slugify(title) : "";
  const path = autoSlug
    ? postPath({ lang: post.lang, type: post.type, categoryPath: categories.find((category) => category.id === primary)?.path ?? null, slug: autoSlug })
    : typedPath;

  const save = useCallback(
    async (intent: PostInput["intent"]) => {
      if (!editor) return false;
      setNote({ kind: "saving", text: "جارٍ الحفظ…" });
      const result = await savePost({
        id: post.id,
        title,
        path,
        lang: post.lang === "en" ? "en" : "ar",
        seoTitle,
        seoDescription,
        excerpt,
        coverImage: cover.url,
        coverAlt,
        coverWidth: cover.width,
        coverHeight: cover.height,
        primaryCategoryId: primary,
        categoryIds: selected,
        authorId: author,
        reviewedById: reviewer,
        alternatePostId: twin,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
        content: editor.getJSON(),
        intent,
      });
      if (!result.ok) {
        setNote({ kind: "error", text: result.message });
        return false;
      }
      if (intent === "publish") {
        setStatus("published");
        posthog.capture("post_published", { post_type: post.type, locale: post.lang });
      }
      if (intent === "unpublish") {
        setStatus("draft");
        posthog.capture("post_unpublished", { post_type: post.type, locale: post.lang });
      }
      setDirty(false);
      setNote({ kind: "saved", text: result.message ?? "حُفظ." });
      return true;
    },
    [editor, post.id, post.lang, title, path, seoTitle, seoDescription, excerpt, cover, coverAlt, primary, selected, author, reviewer, twin, publishedAt],
  );

  // Drafts save themselves a few seconds after the last change. A published
  // post never does: its page changes only when its editor says so.
  useEffect(() => {
    if (!dirty || status !== "draft") return;
    const timer = setTimeout(() => void save("save"), 3000);
    return () => clearTimeout(timer);
  }, [dirty, status, save]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const run = async (work: () => Promise<void>) => {
    setBusy(true);
    try {
      await work();
    } catch (error) {
      setNote({ kind: "error", text: error instanceof Error ? error.message : "حدث خطأ." });
    } finally {
      setBusy(false);
    }
  };

  const chooseCover = (file: File | undefined) =>
    file &&
    run(async () => {
      setCover(await uploadImage(file));
      setDirty(true);
    });

  return (
    <div className="adm-editor">
      <div className="adm-editor-main">
        <div className="adm-head">
          <Link href={href()} className="adm-back">
            كل المقالات
          </Link>
          <p className="adm-save-note" data-kind={note.kind} role="status" aria-live="polite">
            {note.text || (dirty ? "تغييرات غير محفوظة" : "")}
          </p>
        </div>

        <label className="adm-field adm-title-field">
          <span>العنوان (H1)</span>
          <textarea value={title} onChange={(event) => touch(setTitle)(event.target.value)} rows={2} dir={dir} placeholder="عنوان المقال" />
        </label>

        <RichEditor
          content={post.content_json ?? post.content_html}
          dir={dir}
          lang={post.lang}
          onDirChange={setDir}
          onChange={markDirty}
          onEditor={setEditor}
          onMessage={(kind, text) => setNote({ kind, text })}
        />
      </div>

      <aside className="adm-panel" aria-label="بيانات المقال">
        <div className="adm-actions">
          <p>
            <span className="adm-status" data-status={status}>
              {status === "published" ? "منشور" : "مسودة"}
            </span>
          </p>
          {status === "draft" ? (
            <>
              <button type="button" className="adm-btn adm-btn-primary" disabled={busy} onClick={() => run(async () => void (await save("publish")))}>
                نشر
              </button>
              <button type="button" className="adm-btn" disabled={busy} onClick={() => run(async () => void (await save("save")))}>
                حفظ المسودة
              </button>
            </>
          ) : (
            <>
              <button type="button" className="adm-btn adm-btn-primary" disabled={busy || !dirty} onClick={() => run(async () => void (await save("save")))}>
                نشر التغييرات
              </button>
              <button type="button" className="adm-btn" disabled={busy} onClick={() => run(async () => void (await save("unpublish")))}>
                إعادة إلى المسودات
              </button>
              <a className="adm-btn" href={encodeURI(path)} target="_blank" rel="noopener">
                فتح الصفحة
              </a>
            </>
          )}
          <button
            type="button"
            className="adm-btn"
            disabled={busy}
            onClick={() =>
              run(async () => {
                // A draft is saved first so the preview shows what is on screen.
                if (status === "draft" && !(await save("save"))) return;
                window.open(href(`posts/${post.id}/preview/`), "_blank", "noopener");
              })
            }
          >
            {status === "draft" ? "معاينة" : "معاينة النسخة المنشورة"}
          </button>
        </div>

        <fieldset className="adm-group">
          <legend>العنوان على الموقع</legend>
          <label className="adm-field">
            <span>المسار</span>
            <input
              value={path}
              dir="ltr"
              readOnly={everPublished}
              onChange={(event) => {
                setPathTouched(true);
                touch(setTypedPath)(event.target.value);
              }}
            />
          </label>
          <p className="adm-hint">
            {everPublished
              ? "سبق نشر هذا المقال، فمساره ثابت: تغييره يكسر الروابط ونتائج البحث."
              : "يُشتق من العنوان والتصنيف الرئيسي. بعد أول نشر يثبت ولا يمكن تغييره."}
          </p>
        </fieldset>

        <fieldset className="adm-group">
          <legend>محركات البحث</legend>
          <label className="adm-field">
            <span>
              عنوان SEO <Counter value={seoTitle} min={50} max={60} />
            </span>
            <input value={seoTitle} onChange={(event) => touch(setSeoTitle)(event.target.value)} dir={dir} />
          </label>
          <label className="adm-field">
            <span>
              الوصف <Counter value={seoDescription} min={120} max={155} />
            </span>
            <textarea value={seoDescription} onChange={(event) => touch(setSeoDescription)(event.target.value)} rows={3} dir={dir} />
          </label>
          <label className="adm-field">
            <span>المقتطف (يظهر في القوائم)</span>
            <textarea value={excerpt} onChange={(event) => touch(setExcerpt)(event.target.value)} rows={3} dir={dir} />
          </label>
        </fieldset>

        <fieldset className="adm-group">
          <legend>صورة الغلاف</legend>
          {cover.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.url} alt="" className="adm-cover" />
          )}
          <div className="adm-row">
            <button type="button" className="adm-btn" disabled={busy} onClick={() => coverRef.current?.click()}>
              {cover.url ? "تغيير الصورة" : "رفع صورة"}
            </button>
            {cover.url && (
              <button type="button" className="adm-btn" onClick={() => touch(setCover)({ url: "", width: null, height: null })}>
                إزالة
              </button>
            )}
          </div>
          <input ref={coverRef} type="file" accept="image/*" hidden onChange={(event) => { void chooseCover(event.target.files?.[0]); event.target.value = ""; }} />
          <label className="adm-field">
            <span>النص البديل للغلاف</span>
            <input value={coverAlt} onChange={(event) => touch(setCoverAlt)(event.target.value)} dir={dir} />
          </label>
        </fieldset>

        {post.type === "post" && (
          <fieldset className="adm-group">
            <legend>التصنيفات</legend>
            <label className="adm-field">
              <span>التصنيف الرئيسي</span>
              <select value={primary} onChange={(event) => touch(setPrimary)(event.target.value)}>
                <option value="">بلا تصنيف</option>
                {languageCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="adm-checks">
              {languageCategories.map((category) => (
                <label key={category.id}>
                  <input
                    type="checkbox"
                    checked={selected.includes(category.id) || primary === category.id}
                    disabled={primary === category.id}
                    onChange={(event) => touch(setSelected)(event.target.checked ? [...selected, category.id] : selected.filter((id) => id !== category.id))}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className="adm-group">
          <legend>الكاتب والمراجع</legend>
          <label className="adm-field">
            <span>الكاتب</span>
            <select value={author} onChange={(event) => touch(setAuthor)(event.target.value)}>
              <option value="">—</option>
              {authors.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>
          <label className="adm-field">
            <span>راجعه</span>
            <select value={reviewer} onChange={(event) => touch(setReviewer)(event.target.value)}>
              <option value="">—</option>
              {authors.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                  {person.job_title ? ` · ${person.job_title}` : ""}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset className="adm-group">
          <legend>النشر</legend>
          <label className="adm-field">
            <span>تاريخ النشر</span>
            <input type="datetime-local" value={publishedAt} onChange={(event) => touch(setPublishedAt)(event.target.value)} dir="ltr" />
          </label>
          <p className="adm-hint">يُترك فارغاً ليأخذ وقت النشر.</p>
          <label className="adm-field">
            <span>النسخة باللغة الأخرى (hreflang)</span>
            <select value={twin} onChange={(event) => touch(setTwin)(event.target.value)}>
              <option value="">لا توجد</option>
              {twins.map((other) => (
                <option key={other.id} value={other.id}>
                  {other.title || "(بلا عنوان)"}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        {!everPublished && (
          <form
            action={deleteDraft}
            onSubmit={(event) => {
              if (!window.confirm("حذف هذه المسودة نهائياً؟")) event.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" className="adm-btn adm-btn-danger">
              حذف المسودة
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
