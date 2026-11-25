import { resolveImage } from "@/lib/images";

export interface PostSection {
  id: string;
  heading: string;
}


const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Turns a post's stored HTML into what the page shows. The stored HTML is the
 * editor's own output (a fixed set of tags, no attributes beyond href, src, alt
 * and sizes), so it is rewritten with patterns rather than parsed:
 * - every H2 gets an id, and the list of them becomes the margin's contents;
 * - images on the media domain get a srcset of the smaller copies made beside them
 *   (scripts/optimize-media.mjs, lib/images); every image loads lazily and keeps
 *   its size so the page does not shift;
 * - tables sit in a numbered region that scrolls sideways on narrow screens,
 *   their first row becomes column headers, and one-cell tables become callouts.
 */
export function preparePostHtml(stored: string, tableLabel: string): { html: string; sections: PostSection[]; words: number } {
  const sections: PostSection[] = [];
  let html = stored.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const id = `s-${sections.length + 1}`;
    sections.push({ id, heading: text(inner) });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  html = html.replace(/<img src="([^"]+)" alt="([^"]*)"(?: width="(\d+)" height="(\d+)")?>/g, (tag, src: string, alt: string, w?: string, h?: string) => {
    const image = resolveImage(src);
    if (!image?.srcSet) return tag.replace("<img ", '<img loading="lazy" decoding="async" ');
    const size = w && h ? ` width="${w}" height="${h}"` : "";
    return `<img src="${src}" srcset="${image.srcSet}" sizes="(min-width: 1024px) 46rem, 100vw" alt="${alt}"${size} loading="lazy" decoding="async">`;
  });

  let tables = 0;
  html = html.replace(/<table>([\s\S]*?)<\/table>/g, (table, inner: string) => {
    const rows = inner.match(/<tr[\s>]/g)?.length ?? 0;
    const cells = inner.match(/<t[dh][\s>]/g)?.length ?? 0;
    // WordPress writers boxed a note in a one-cell table: that is a callout, not a table.
    if (cells === 1) return `<aside class="callout">${inner.replace(/<\/?(tbody|tr|td|th)[^>]*>/g, "")}</aside>`;
    // Their header rows are plain cells; with more than one row, the first row heads the columns.
    const headed =
      rows >= 2 && !inner.includes("<th")
        ? inner.replace(/<tr>([\s\S]*?)<\/tr>/, (_, row: string) => `<tr>${row.replace(/<td(?=[\s>])/g, '<th scope="col"').replace(/<\/td>/g, "</th>")}</tr>`)
        : inner;
    tables += 1;
    return `<div class="blg-table" role="region" tabindex="0" aria-label="${tableLabel} ${tables}"><table>${headed}</table></div>`;
  });

  return { html, sections, words: text(stored).split(" ").filter(Boolean).length };
}
