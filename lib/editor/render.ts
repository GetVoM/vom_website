import "server-only";
import { generateHTML } from "@tiptap/html/server";
import type { JSONContent } from "@tiptap/core";
import { postExtensions } from "./extensions";

const MEDIA_URL = (process.env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");

/** Links may go to a page on this site, the web, an email address or a phone number. */
const safeHref = (href: unknown): href is string => typeof href === "string" && /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(href.trim());
/** Images come from the media bucket, or from another https address (a few imported ones do). */
const safeSrc = (src: unknown): src is string => typeof src === "string" && (src.startsWith(`${MEDIA_URL}/`) || /^https:\/\//i.test(src));

/**
 * Cleans an editor document that came from the browser. The schema already
 * limits which nodes and marks exist; this removes what the schema cannot
 * judge: link targets and image sources that are not ordinary addresses.
 */
function clean(node: JSONContent): JSONContent | null {
  if (node.type === "figure" && !safeSrc(node.attrs?.src)) return null;
  const marks = node.marks?.filter((mark) => mark.type !== "link" || safeHref(mark.attrs?.href));
  const content = node.content?.map(clean).filter((child): child is JSONContent => child !== null);
  return { ...node, ...(marks && { marks }), ...(content && { content }) };
}

/**
 * The stored form of a post body: the cleaned editor document and the HTML
 * rendered from it. The HTML is built on the server from the schema alone, so
 * nothing outside the schema (scripts, styles, event handlers) can reach a page.
 */
export function renderPostBody(doc: unknown): { json: JSONContent; html: string } {
  if (!doc || typeof doc !== "object" || (doc as JSONContent).type !== "doc") throw new Error("Not an editor document");
  const json = clean(doc as JSONContent) ?? { type: "doc", content: [] };
  const html = generateHTML(json, postExtensions)
    .replace(/<colgroup>.*?<\/colgroup>/g, "")
    .replace(/ style="[^"]*"/g, "")
    .replace(/<p><\/p>/g, "");
  return { json, html };
}
