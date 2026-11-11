import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/blog/PostPage";
import { requireAdmin } from "@/lib/admin/auth";
import { adminHref } from "@/lib/admin/path";
import { blogCopy } from "@/lib/content/posts";
import { preparePostHtml } from "@/lib/content/posts/html";
import type { Post } from "@/lib/content/posts/types";

export const metadata: Metadata = { title: "معاينة" };

/** The post as its public page will show it, from the last saved version, draft or published. */
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data } = await supabase
    .from("posts")
    .select(
      `*, author:authors!posts_author_id_fkey(*), reviewer:authors!posts_reviewed_by_id_fkey(*),
       primary_category:categories!posts_primary_category_id_fkey(id, path, name)`,
    )
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const lang = data.lang === "en" ? "en" : "ar";
  const body = preparePostHtml(data.content_html, blogCopy(lang).table);
  const person = (row: NonNullable<typeof data.author>) => ({
    id: row.id, slug: row.slug, name: row.name, jobTitle: row.job_title, bio: row.bio, avatar: row.avatar, sameAs: row.same_as, credentials: row.credentials,
  });
  const now = new Date().toISOString();
  const post: Post = {
    id: data.id,
    type: data.type === "news" ? "news" : "post",
    lang,
    path: data.path,
    title: data.title || "(بلا عنوان)",
    excerpt: data.excerpt,
    coverImage: data.cover_image,
    coverAlt: data.cover_alt,
    coverSize: data.cover_width && data.cover_height ? { width: data.cover_width, height: data.cover_height } : null,
    publishedAt: data.published_at ?? now,
    modifiedAt: data.modified_at ?? data.published_at ?? now,
    primaryCategory: data.primary_category,
    sections: body.sections,
    minutes: Math.max(1, Math.round(body.words / 200)),
    slug: data.slug,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    contentHtml: body.html,
    categories: [],
    author: data.author ? person(data.author) : null,
    reviewer: data.reviewer ? person(data.reviewer) : null,
    faq: null,
    alternatePath: null,
  };
  return (
    <div className="adm-preview" lang={lang} dir={lang === "en" ? "ltr" : "rtl"}>
      <p className="adm-preview-bar" lang="ar" dir="rtl">
        معاينة آخر نسخة محفوظة ({data.status === "published" ? "منشور" : "مسودة"}).{" "}
        <Link href={adminHref(`posts/${data.id}/`)}>العودة إلى التحرير</Link>
      </p>
      <PostPage post={post} />
    </div>
  );
}
