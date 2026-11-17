import { blogCopy, listPosts } from "@/lib/content/posts";
import { site } from "@/lib/seo/site";

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The blog's RSS feed, at /feed/ as it was on WordPress (next.config.ts
 * rewrites that address here): the thirty latest Arabic posts with their
 * excerpts. Readers and aggregators that followed the old feed keep working,
 * and crawlers find new posts sooner.
 */
export async function GET() {
  const copy = blogCopy("ar");
  const { posts } = await listPosts({ lang: "ar", size: 30 });
  const items = posts
    .map((post) => {
      const url = `${site.url}${encodeURI(post.path)}`;
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        ...(post.primaryCategory ? [`      <category>${escape(post.primaryCategory.name)}</category>`] : []),
        ...(post.excerpt ? [`      <description>${escape(post.excerpt)}</description>`] : []),
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  const newest = posts[0] ? new Date(posts[0].publishedAt).toUTCString() : new Date(0).toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(copy.blog.h1)}</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/feed/" rel="self" type="application/rss+xml" />
    <description>${escape(copy.blog.description)}</description>
    <language>ar</language>
    <lastBuildDate>${newest}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
