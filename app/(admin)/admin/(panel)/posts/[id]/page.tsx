import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { PostEditor } from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "تحرير مقال" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [post, categories, authors, links, others] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("id, name, path, lang").order("name"),
    supabase.from("authors").select("id, name, job_title").order("name"),
    supabase.from("post_categories").select("category_id").eq("post_id", id),
    supabase.from("posts").select("id, title, lang").neq("id", id).order("title").limit(2000),
  ]);
  const row = post.data;
  if (!row) notFound();
  return (
    <PostEditor
      post={{ ...row, content_json: row.content_json as JSONContent | null }}
      categories={categories.data ?? []}
      authors={authors.data ?? []}
      categoryIds={(links.data ?? []).map((link) => link.category_id)}
      // The twin is a post in the other language.
      twins={(others.data ?? []).filter((other) => other.lang !== row.lang)}
    />
  );
}
