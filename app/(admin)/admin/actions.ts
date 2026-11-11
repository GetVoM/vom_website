"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";
import { assertAdmin } from "@/lib/admin/auth";
import { adminHref } from "@/lib/admin/path";
import { slugify } from "@/lib/admin/slug";
import { renderPostBody } from "@/lib/editor/render";
import { serverSupabase } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/types";

/**
 * Every admin mutation. Each action checks the `admins` list on the server
 * before it does anything (assertAdmin), writes with the signed-in user's own
 * session so row level security applies, and then expires the cache tags the
 * change touches, so the public pages show it without a redeploy.
 */

export type ActionResult = { ok: true; message?: string } | { ok: false; message: string };

const fail = (message: string): ActionResult => ({ ok: false, message });

/** Must match the cookie named in proxy.ts `config.matcher`. */
const ADMIN_COOKIE = "vom_admin";

/* ------------------------------------------------------------ session */

export async function signIn(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return fail("أدخل البريد الإلكتروني وكلمة المرور.");
  const supabase = await serverSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return fail("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
  // Marks this browser as an admin's, so proxy.ts runs for it and keeps the session fresh.
  (await cookies()).set(ADMIN_COOKIE, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(adminHref());
}

export async function signOut() {
  const supabase = await serverSupabase();
  await supabase.auth.signOut();
  (await cookies()).delete(ADMIN_COOKIE);
  redirect(adminHref("login/"));
}

/* ------------------------------------------------------------ posts */

export async function createPost(form: FormData) {
  const { supabase } = await assertAdmin();
  const requested = form.get("type");
  const type = requested === "news" || requested === "template" ? requested : "post";
  const lang = form.get("lang") === "en" ? "en" : "ar";
  const key = crypto.randomUUID().slice(0, 8);
  const { data, error } = await supabase
    .from("posts")
    .insert({ type, lang, title: "", slug: `draft-${key}`, path: `${lang === "en" ? "/en" : ""}/draft-${key}/`, status: "draft" })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  redirect(adminHref(`posts/${data.id}/`));
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || null);
const optionalId = z
  .string()
  .uuid()
  .nullable()
  .or(z.literal("").transform(() => null));

const postInput = z.object({
  id: z.string().uuid(),
  title: z.string().trim().max(300),
  path: z
    .string()
    .trim()
    .max(400)
    .regex(/^\/[^\s?#]*\/$/, "المسار يبدأ وينتهي بشرطة مائلة، مثل ‎/accounting/ميزان-المراجعة/"),
  lang: z.enum(["ar", "en"]),
  seoTitle: optionalText(200),
  seoDescription: optionalText(400),
  excerpt: optionalText(600),
  coverImage: optionalText(1000),
  coverAlt: optionalText(300),
  coverWidth: z.number().int().positive().nullable(),
  coverHeight: z.number().int().positive().nullable(),
  primaryCategoryId: optionalId,
  categoryIds: z.array(z.string().uuid()).max(30),
  authorId: optionalId,
  reviewedById: optionalId,
  alternatePostId: optionalId,
  publishedAt: z.string().datetime({ offset: true }).nullable(),
  content: z.unknown(),
  /** What to do with the status: keep it, publish, or take the post back to draft. */
  intent: z.enum(["save", "publish", "unpublish"]),
});

export type PostInput = z.input<typeof postInput>;

export async function savePost(input: PostInput): Promise<ActionResult> {
  const { supabase } = await assertAdmin();
  const parsed = postInput.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "البيانات غير صالحة.");
  const post = parsed.data;

  const { data: current, error: readError } = await supabase
    .from("posts")
    .select("id, status, path, published_at, primary_category_id, type")
    .eq("id", post.id)
    .maybeSingle();
  if (readError || !current) return fail("لم يُعثر على المقال.");

  const everPublished = current.published_at !== null;
  // A published address is indexed and linked to: it does not change from here.
  if (everPublished && post.path !== current.path) return fail("لا يمكن تغيير مسار مقال سبق نشره. أي تغيير يحتاج إلى تحويل 301.");
  if (post.lang === "en" !== post.path.startsWith("/en/")) return fail("مسار المقال الإنجليزي يبدأ بـ ‎/en/‎ والعربي لا يبدأ به.");

  const publishing = post.intent === "publish";
  const status = post.intent === "save" ? current.status : publishing ? "published" : "draft";
  if (status === "published") {
    if (!post.title) return fail("أضف عنواناً قبل النشر.");
    if (post.path.includes("/draft-")) return fail("حدّد مسار المقال قبل النشر.");
  }

  let body;
  try {
    body = renderPostBody(post.content);
  } catch {
    return fail("تعذّر حفظ محتوى المقال.");
  }
  const now = new Date().toISOString();
  const categoryIds = [...new Set([...post.categoryIds, ...(post.primaryCategoryId ? [post.primaryCategoryId] : [])])];

  const { error } = await supabase
    .from("posts")
    .update({
      title: post.title,
      path: post.path,
      slug: post.path.split("/").filter(Boolean).at(-1) ?? slugify(post.title),
      lang: post.lang,
      seo_title: post.seoTitle,
      seo_description: post.seoDescription,
      excerpt: post.excerpt,
      cover_image: post.coverImage,
      cover_alt: post.coverAlt,
      cover_width: post.coverImage ? post.coverWidth : null,
      cover_height: post.coverImage ? post.coverHeight : null,
      primary_category_id: post.primaryCategoryId,
      author_id: post.authorId,
      reviewed_by_id: post.reviewedById,
      alternate_post_id: post.alternatePostId,
      content_json: body.json as Json,
      content_html: body.html,
      status,
      published_at: status === "published" ? (post.publishedAt ?? current.published_at ?? now) : (post.publishedAt ?? current.published_at),
      // "Last reviewed" on the page: the moment a published post was last saved.
      ...(status === "published" && { modified_at: now }),
    })
    .eq("id", post.id);
  if (error) return fail(error.code === "23505" ? "هذا المسار مستخدم في مقال آخر." : `تعذّر الحفظ: ${error.message}`);

  const { error: unlinkError } = await supabase.from("post_categories").delete().eq("post_id", post.id);
  if (unlinkError) return fail(`تعذّر حفظ التصنيفات: ${unlinkError.message}`);
  if (categoryIds.length > 0) {
    const { error: linkError } = await supabase.from("post_categories").insert(categoryIds.map((category_id) => ({ post_id: post.id, category_id })));
    if (linkError) return fail(`تعذّر حفظ التصنيفات: ${linkError.message}`);
  }

  // Only what the public can see needs refreshing: a draft that stays a draft touches nothing.
  if (status === "published" || current.status === "published") {
    updateTag(`post-${post.id}`);
    updateTag("posts");
    for (const id of new Set([...categoryIds, ...(current.primary_category_id ? [current.primary_category_id] : [])])) updateTag(`category-${id}`);
  }
  return { ok: true, message: publishing ? "نُشر المقال." : post.intent === "unpublish" ? "أُعيد المقال إلى المسودات." : "حُفظ." };
}

export async function deleteDraft(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = String(form.get("id") ?? "");
  // Published posts are never deleted from here: their address must keep answering.
  const { error } = await supabase.from("posts").delete().eq("id", id).eq("status", "draft").is("published_at", null);
  if (error) throw new Error(error.message);
  redirect(adminHref());
}

/* ------------------------------------------------------------ categories and authors */

const categoryInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "أدخل اسم التصنيف.").max(120),
  path: z.string().trim().regex(/^\/[^\s?#]*\/$/, "المسار يبدأ وينتهي بشرطة مائلة، مثل ‎/accounting/"),
  lang: z.enum(["ar", "en"]),
  seoTitle: optionalText(200),
  seoDescription: optionalText(400),
  intro: optionalText(2000),
});

export async function saveCategory(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const { supabase } = await assertAdmin();
  const parsed = categoryInput.safeParse({
    id: form.get("id") || undefined,
    name: form.get("name") ?? "",
    path: form.get("path") ?? "",
    lang: form.get("lang") ?? "ar",
    seoTitle: form.get("seoTitle") ?? "",
    seoDescription: form.get("seoDescription") ?? "",
    intro: form.get("intro") ?? "",
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "البيانات غير صالحة.");
  const { id, name, path, lang, seoTitle, seoDescription, intro } = parsed.data;
  const row = { name, lang, seo_title: seoTitle, seo_description: seoDescription, intro };
  // An existing category keeps its address; only a new one takes the path given.
  const { error } = id
    ? await supabase.from("categories").update(row).eq("id", id)
    : await supabase.from("categories").insert({ ...row, path, slug: path.split("/").filter(Boolean).at(-1) ?? slugify(name) });
  if (error) return fail(error.code === "23505" ? "هذا المسار مستخدم في تصنيف آخر." : `تعذّر الحفظ: ${error.message}`);
  updateTag("categories");
  updateTag("posts");
  if (id) updateTag(`category-${id}`);
  return { ok: true, message: "حُفظ التصنيف." };
}

const authorInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "أدخل الاسم.").max(120),
  slug: z.string().trim().regex(/^[\p{L}\p{N}-]+$/u, "المعرّف حروف وأرقام وشرطات فقط."),
  jobTitle: optionalText(200),
  credentials: optionalText(400),
  bio: optionalText(3000),
  sameAs: z.string().max(2000),
});

export async function saveAuthor(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const { supabase } = await assertAdmin();
  const parsed = authorInput.safeParse({
    id: form.get("id") || undefined,
    name: form.get("name") ?? "",
    slug: form.get("slug") ?? "",
    jobTitle: form.get("jobTitle") ?? "",
    credentials: form.get("credentials") ?? "",
    bio: form.get("bio") ?? "",
    sameAs: form.get("sameAs") ?? "",
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "البيانات غير صالحة.");
  const { id, name, slug, jobTitle, credentials, bio, sameAs } = parsed.data;
  const links = sameAs.split(/\s+/).filter(Boolean);
  if (!links.every((link) => /^https:\/\//.test(link))) return fail("روابط الحسابات تبدأ بـ https://");
  const row = { name, job_title: jobTitle, credentials, bio, same_as: links };
  // An existing author keeps their address (/author/<slug>/).
  const { error } = id ? await supabase.from("authors").update(row).eq("id", id) : await supabase.from("authors").insert({ ...row, slug });
  if (error) return fail(error.code === "23505" ? "هذا المعرّف مستخدم." : `تعذّر الحفظ: ${error.message}`);
  updateTag("authors");
  updateTag("posts");
  return { ok: true, message: "حُفظ الكاتب." };
}

/* ------------------------------------------------------------ image uploads */

/**
 * A short-lived address the browser can PUT one WebP image to, straight into
 * the media bucket, under uploads/YYYY/MM/. The content type is fixed in the
 * signature, so nothing but a WebP can be sent with it.
 */
export async function createUploadUrl(name: string): Promise<{ ok: true; uploadUrl: string; publicUrl: string } | { ok: false; message: string }> {
  await assertAdmin();
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return { ok: false, message: "تخزين الصور غير مهيأ." };
  const stem = slugify(name.replace(/\.[^.]+$/, "")) || "image";
  const now = new Date();
  const key = `uploads/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${stem}-${crypto.randomUUID().slice(0, 8)}.webp`;
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, ContentType: "image/webp", CacheControl: "public, max-age=31536000, immutable" }),
    { expiresIn: 300, signableHeaders: new Set(["content-type"]) },
  );
  const media = (process.env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");
  return { ok: true, uploadUrl, publicUrl: `${media}/${encodeURI(key)}` };
}
