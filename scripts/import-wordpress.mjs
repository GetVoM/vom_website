#!/usr/bin/env node
/**
 * Imports the WordPress blog into Supabase and its media into Cloudflare R2.
 *
 *   node --env-file=.env.local scripts/import-wordpress.mjs [--dry-run] [--limit N] [--refresh] [--skip-media]
 *
 * Rules:
 * - Read-only against WordPress: GET requests only.
 * - Idempotent: every record is upserted on its WordPress id, so the script can
 *   be re-run up to launch day. `--refresh` re-downloads the REST responses
 *   (they are cached in node_modules/.cache/wp-import).
 * - `--dry-run` converts everything and prints the report without writing to
 *   Supabase or R2. `--limit N` takes the first N posts.
 * - Templates (the "templates" post type) are read from their public pages,
 *   because their REST route is taken by WordPress itself (see wpTemplates).
 * - Paths, H1, body, dates, author, reviewer, cover and categories are kept
 *   exactly. SEO titles and descriptions come from the crawl inventory
 *   (docs/content/wp-url-inventory.csv), because Rank Math is not in the REST API.
 * - Bodies are cleaned to the editor's schema (lib/editor/extensions.ts) and
 *   stored twice: the Tiptap document and the HTML rendered from it.
 * - Media: the original file goes to R2 at its WordPress key, so old URLs keep
 *   resolving through the /wp-content/uploads redirect; images also get a
 *   `<stem>.webp` (at most 1600 px wide) beside it, which the content uses.
 * - Author bios are not imported (they are placeholders on WordPress), and
 *   author slugs made from email addresses are replaced.
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import { createClient } from "@supabase/supabase-js";
import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { generateHTML, generateJSON } from "@tiptap/html/server";
import { postExtensions } from "../lib/editor/extensions.ts";

const require = createRequire(import.meta.url);
// sharp ships with Next.js; resolve it from there rather than adding a dependency.
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = join(root, "node_modules/.cache/wp-import");
mkdirSync(cacheDir, { recursive: true });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const refresh = args.includes("--refresh");
const skipMedia = args.includes("--skip-media");
const limit = args.includes("--limit") ? Number(args[args.indexOf("--limit") + 1]) : Infinity;

const env = (name, required = true) => {
  const value = process.env[name];
  if (!value && required) throw new Error(`${name} is not set (see .env.example)`);
  return value;
};
const WP = (env("WP_BASE_URL", false) || "https://getvom.com").replace(/\/$/, "");
const MEDIA = (env("MEDIA_BASE_URL", false) || "https://media.getvom.com").replace(/\/$/, "");
const wpAuth =
  process.env.WP_USER && process.env.WP_APP_PASSWORD
    ? { Authorization: `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64")}` }
    : {};

/* ---------------------------------------------------------------- helpers */

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [header, ...body] = rows;
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", laquo: "«", raquo: "»", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" };
const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => entities[name] ?? m);
const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (text) => escapeHtml(text).replace(/"/g, "&quot;");
/** Direction marks, zero-width characters and non-breaking spaces carry no content. */
const cleanText = (text) => text.replace(/[​-‏‪-‮⁦-⁩﻿]/g, "").replace(/ /g, " ");
const plainText = (html) => cleanText(decodeEntities(html.replace(/<[^>]+>/g, " "))).replace(/\s+/g, " ").trim();
const decodedPath = (url) => {
  const { pathname } = new URL(url, WP);
  try { return decodeURI(pathname); } catch { return pathname; }
};

async function wpAll(type, query = "") {
  const file = join(cacheDir, `${type}.json`);
  if (!refresh && existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const out = [];
  for (let page = 1; ; page++) {
    const response = await fetch(`${WP}/wp-json/wp/v2/${type}?per_page=50&page=${page}${query}`, { headers: wpAuth });
    if (!response.ok) throw new Error(`WordPress ${type} page ${page}: ${response.status}`);
    out.push(...(await response.json()));
    if (page >= Number(response.headers.get("x-wp-totalpages"))) break;
  }
  writeFileSync(file, JSON.stringify(out));
  return out;
}

async function pool(items, size, worker) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) await worker(items[next++]);
    }),
  );
}

/* ---------------------------------------------------------------- report */

const report = {
  missingFromImport: [], notInUrlMap: [], seoFromLivePage: [], seoMismatch: [], noSeo: [], noReviewer: [], noAuthor: [],
  demotedH1: [], textChanged: [], dropped: {}, externalImages: [], brokenMedia: [], duplicatePaths: [], noCover: [],
  skippedCategories: [], renamedAuthorSlugs: [], blogDefaultSeo: [], brokenTemplates: [],
};
const noteDropped = (tag) => { report.dropped[tag] = (report.dropped[tag] || 0) + 1; };

/* ---------------------------------------------------------------- media */

/** key (decoded, no leading slash) → { url, width, height } once uploaded. */
const mediaFile = join(cacheDir, "media.json");
const mediaDone = existsSync(mediaFile) ? JSON.parse(readFileSync(mediaFile, "utf8")) : {};
const mediaWanted = new Set();
const RASTER = /\.(jpe?g|png|webp|gif|avif)$/i;

/** The R2 key for a WordPress upload URL, or null when the URL is not one. */
function uploadKey(url) {
  let u;
  try { u = new URL(url, WP); } catch { return null; }
  if (!/(^|\.)getvom\.com$/.test(u.hostname) || !u.pathname.startsWith("/wp-content/uploads/")) return null;
  // Some links to files carry a trailing slash; the file's key has none.
  return decodedPath(u.href).slice(1).replace(/\/+$/, "");
}
/** Files this site serves itself from public/ (the invoice templates, the e-invoicing PDF) stay where they are. */
const servedHere = (key) => existsSync(join(root, "public", key));
const webpKey = (key) => (RASTER.test(key) && !/\.gif$/i.test(key) ? key.replace(/\.[^.]+$/, ".webp") : key);
const mediaUrl = (key) => `${MEDIA}/${encodeURI(key)}`;
/** Registers an upload and returns the URL the content will use. */
function wantMedia(url) {
  const key = uploadKey(url);
  if (!key) return null;
  mediaWanted.add(key);
  return mediaUrl(webpKey(key));
}

const contentTypes = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif", svg: "image/svg+xml", pdf: "application/pdf", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", xls: "application/vnd.ms-excel", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", doc: "application/msword", zip: "application/zip" };

async function uploadMedia() {
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: env("R2_ACCESS_KEY_ID"), secretAccessKey: env("R2_SECRET_ACCESS_KEY") },
  });
  const Bucket = env("R2_BUCKET");
  const exists = async (Key) => s3.send(new HeadObjectCommand({ Bucket, Key })).then(() => true, () => false);
  const put = (Key, Body, ContentType) =>
    s3.send(new PutObjectCommand({ Bucket, Key, Body, ContentType, CacheControl: "public, max-age=31536000, immutable" }));
  const todo = [...mediaWanted].filter((key) => !mediaDone[key]);
  let done = 0;
  await pool(todo, 6, async (key) => {
    try {
      const response = await fetch(`${WP}/${encodeURI(key)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const original = Buffer.from(await response.arrayBuffer());
      const ext = key.split(".").pop().toLowerCase();
      if (!(await exists(key))) await put(key, original, contentTypes[ext] ?? "application/octet-stream");
      const entry = { url: mediaUrl(webpKey(key)) };
      if (RASTER.test(key)) {
        const image = sharp(original, { animated: /\.gif$/i.test(key) });
        const meta = await image.metadata();
        const width = Math.min(meta.width, 1600);
        entry.width = width;
        entry.height = Math.round((meta.height / meta.width) * width);
        if (webpKey(key) !== key) {
          const webp = await image.rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
          await put(webpKey(key), webp, "image/webp");
        }
      }
      mediaDone[key] = entry;
    } catch (error) {
      report.brokenMedia.push(`${key}: ${error.message}`);
    }
    if (++done % 50 === 0) {
      writeFileSync(mediaFile, JSON.stringify(mediaDone));
      console.error(`  media ${done}/${todo.length}`);
    }
  });
  writeFileSync(mediaFile, JSON.stringify(mediaDone));
}

/* ---------------------------------------------------------------- body cleaning */

const DROP = new Set(["script", "style", "noscript", "svg", "iframe", "form", "input", "button", "select", "textarea", "label", "colgroup", "col", "object", "embed", "video", "audio"]);
const INLINE_MARKS = { strong: "strong", b: "strong", em: "em", i: "em", u: "u", s: "s", strike: "s", del: "s", code: "code" };
const BLOCKS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "table", "blockquote", "figure", "pre", "hr", "div", "section", "article"]);

/** A Google Docs paste wraps everything in `<b style="font-weight: 400">`: that is not bold. */
function weight(el) {
  const match = /font-weight:\s*([a-z0-9]+)/i.exec(el.getAttribute("style") ?? "");
  if (!match) return null;
  return match[1] === "bold" || Number(match[1]) >= 600 ? "bold" : "normal";
}

function linkAttrs(href) {
  let url;
  try { url = new URL(href, WP); } catch { return null; }
  if (!/^https?:$/.test(url.protocol)) return /^(mailto|tel):/.test(href) ? { href } : null;
  const localKey = uploadKey(url.href);
  if (localKey && servedHere(localKey)) return { href: `/${localKey}` };
  const upload = wantMedia(url.href);
  if (upload) return { href: mediaUrl(uploadKey(url.href)), target: "_blank", rel: "noopener" };
  if (/^(www\.)?getvom\.com$/.test(url.hostname)) {
    for (const key of [...url.searchParams.keys()]) if (key.startsWith("utm_")) url.searchParams.delete(key);
    const path = decodedPath(url.href);
    if (path === "/" && !url.search && url.hash) return null; // an in-page anchor
    return { href: `${path}${url.search}${url.hash}` };
  }
  return { href: url.href, target: "_blank", rel: "noopener" };
}

function figureHtml(img, caption = "") {
  // Saved pages carry a lazy-load placeholder in `src`; the real address is beside it.
  const src = [img.getAttribute("src"), img.getAttribute("data-lazy-src"), img.getAttribute("data-src")].find((value) => value && !value.startsWith("data:")) ?? "";
  if (!src) return "";
  const media = wantMedia(src);
  if (!media) report.externalImages.push(src);
  const key = uploadKey(src);
  const size = key && mediaDone[key]?.width ? mediaDone[key] : { width: Number(img.getAttribute("width")) || null, height: Number(img.getAttribute("height")) || null };
  const width = size.width ? Math.min(size.width, 1600) : null;
  const height = size.width ? Math.round((size.height / size.width) * width) : null;
  const alt = cleanText(decodeEntities(img.getAttribute("alt") ?? "")).replace(/\s+/g, " ").trim();
  const dims = width && height ? ` width="${width}" height="${height}"` : "";
  return `<figure><img src="${escapeAttr(media ?? src)}" alt="${escapeAttr(alt)}"${dims}>${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}</figure>`;
}

/** Inline content of a node. Images found on the way are pushed to `figures`. */
function inline(node, figures, { marks = true } = {}) {
  let out = "";
  for (const child of node.childNodes) {
    if (child.nodeType === 3) { out += escapeHtml(cleanText(decodeEntities(child.rawText))); continue; }
    if (child.nodeType !== 1) continue;
    const tag = child.rawTagName.toLowerCase();
    if (DROP.has(tag)) { noteDropped(tag); continue; }
    if (tag === "br") { out += "<br>"; continue; }
    if (tag === "img") { figures.push(figureHtml(child)); continue; }
    const inner = inline(child, figures, { marks });
    if (tag === "a") {
      const attrs = linkAttrs(decodeEntities(child.getAttribute("href") ?? ""));
      if (!attrs || !inner.replace(/<br>/g, "").trim()) { out += inner; continue; }
      out += `<a href="${escapeAttr(attrs.href)}"${attrs.target ? ` target="${attrs.target}" rel="${attrs.rel}"` : ""}>${inner}</a>`;
      continue;
    }
    let mark = marks ? INLINE_MARKS[tag] : undefined;
    const w = weight(child);
    if (marks && w === "bold") mark = mark ?? "strong";
    if (w === "normal" && mark === "strong") mark = undefined;
    out += mark && inner.trim() ? `<${mark}>${inner}</${mark}>` : inner;
  }
  return out;
}

// Neighbouring runs of the same mark are one run: `<b>a</b> <b>b</b>` would
// otherwise lose the space between them when the editor parses it.
const tidy = (html) =>
  html
    .replace(/[ \t\n]+/g, " ")
    .replace(/<\/(strong|em|u|s)>( ?)<\1>/g, "$2")
    .replace(/^(\s|<br>)+|(\s|<br>)+$/g, "");

function listHtml(el, tag, ctx) {
  const items = el.childNodes.filter((n) => n.nodeType === 1 && n.rawTagName.toLowerCase() === "li");
  // WordPress FAQ blocks are lists whose items are a heading and its answer:
  // a list item cannot start with a heading, so those lists become plain blocks.
  if (items.some((li) => li.querySelector("h1,h2,h3,h4,h5,h6"))) return items.map((li) => blocks(li, ctx)).join("");
  const rendered = items.map((li) => {
    const inner = blocks(li, ctx);
    return inner ? `<li>${inner}</li>` : "";
  }).join("");
  return rendered ? `<${tag}>${rendered}</${tag}>` : "";
}

function tableHtml(el, ctx) {
  const rows = el.querySelectorAll("tr").map((tr) => {
    const cells = tr.childNodes.filter((n) => n.nodeType === 1 && /^t[dh]$/i.test(n.rawTagName)).map((cell) => {
      const tag = cell.rawTagName.toLowerCase();
      const span = ["colspan", "rowspan"].map((a) => (Number(cell.getAttribute(a)) > 1 ? ` ${a}="${Number(cell.getAttribute(a))}"` : "")).join("");
      return `<${tag}${span}>${blocks(cell, ctx) || "<p></p>"}</${tag}>`;
    }).join("");
    return cells ? `<tr>${cells}</tr>` : "";
  }).join("");
  return rows ? `<table><tbody>${rows}</tbody></table>` : "";
}

/** Block content of a node: loose inline runs become paragraphs. */
function blocks(node, ctx) {
  let out = "";
  let run = [];
  const flush = () => {
    if (!run.length) return;
    const figures = [];
    const holder = parse("<x></x>").firstChild;
    for (const n of run) holder.appendChild(n.clone());
    const html = tidy(inline(holder, figures));
    if (html) out += `<p>${html}</p>`;
    out += figures.join("");
    run = [];
  };
  for (const child of node.childNodes) {
    if (child.nodeType === 3) { if (child.rawText.trim()) run.push(child); continue; }
    if (child.nodeType !== 1) continue;
    const tag = child.rawTagName.toLowerCase();
    if (DROP.has(tag)) { noteDropped(tag); continue; }
    if (!BLOCKS.has(tag) && !["li", "tbody", "thead", "tr", "td", "th", "figcaption"].includes(tag)) { run.push(child); continue; }
    flush();
    const figures = [];
    if (/^h[1-6]$/.test(tag)) {
      let level = Number(tag[1]);
      if (level === 1) { level = 2; ctx.demotedH1 = true; }
      if (level > 4) level = 4;
      const html = tidy(inline(child, figures, { marks: false }));
      if (html) out += `<h${level}>${html}</h${level}>`;
      out += figures.join("");
    } else if (tag === "p") {
      const html = tidy(inline(child, figures));
      if (html) out += `<p>${html}</p>`;
      out += figures.join("");
    } else if (tag === "ul" || tag === "ol") out += listHtml(child, tag, ctx);
    else if (tag === "table") out += tableHtml(child, ctx);
    else if (tag === "blockquote") { const inner = blocks(child, ctx); if (inner) out += `<blockquote>${inner}</blockquote>`; }
    else if (tag === "pre") { const text = escapeHtml(decodeEntities(child.text)); if (text.trim()) out += `<pre><code>${text}</code></pre>`; }
    else if (tag === "hr") out += "<hr>";
    else if (tag === "figure") {
      const img = child.querySelector("img");
      if (img) out += figureHtml(img, cleanText(child.querySelector("figcaption")?.text ?? "").replace(/\s+/g, " ").trim());
      else out += blocks(child, ctx);
    } else out += blocks(child, ctx); // div, section, article and stray table parts: keep what is inside
  }
  flush();
  return out;
}

function convertBody(rendered) {
  const ctx = { demotedH1: false };
  const cleaned = blocks(parse(rendered, { blockTextElements: { script: false, style: false, pre: true } }), ctx);
  const json = generateJSON(cleaned, postExtensions);
  const html = generateHTML(json, postExtensions)
    .replace(/<colgroup>.*?<\/colgroup>/g, "")
    .replace(/ style="[^"]*"/g, "")
    .replace(/<p><\/p>/g, "");
  return { json, html, cleaned, demotedH1: ctx.demotedH1 };
}

/* ---------------------------------------------------------------- main */

const urlMap = parseCsv(readFileSync(join(root, "docs/content/url-map.csv"), "utf8"));
const inventory = new Map(parseCsv(readFileSync(join(root, "docs/content/wp-url-inventory.csv"), "utf8")).map((r) => [r.path_decoded, r]));
const mapByPath = new Map(urlMap.map((r) => [r.old_path_decoded, r]));

console.error("Reading WordPress…");
const [wpPosts, wpNews, wpCategories, wpAuthors] = await Promise.all([
  wpAll("posts", "&_embed=1"), wpAll("news", "&_embed=1"), wpAll("categories"), wpAll("ppma_author"),
]);

/**
 * The "templates" post type cannot be read through the REST API: its route,
 * /wp/v2/templates, is taken by WordPress's own block-template endpoint. So the
 * list comes from the search endpoint and each template is read from its public
 * page: the H1, the post content widget, the cover, and the dates, writer and
 * reviewer the page publishes in its Article schema. Each is shaped like a REST
 * record so the rest of the import treats it as one.
 */
async function wpTemplates() {
  const indexFile = join(cacheDir, "templates-index.json");
  let index;
  if (!refresh && existsSync(indexFile)) index = JSON.parse(readFileSync(indexFile, "utf8"));
  else {
    index = [];
    for (let page = 1; ; page++) {
      const response = await fetch(`${WP}/wp-json/wp/v2/search?subtype=templates&per_page=50&page=${page}`);
      if (!response.ok) throw new Error(`WordPress template list page ${page}: ${response.status}`);
      index.push(...(await response.json()));
      if (page >= Number(response.headers.get("x-wp-totalpages"))) break;
    }
    writeFileSync(indexFile, JSON.stringify(index));
  }
  mkdirSync(join(cacheDir, "templates"), { recursive: true });
  const out = [];
  for (const entry of index) {
    const file = join(cacheDir, "templates", `${entry.id}.html`);
    let html;
    if (!refresh && existsSync(file)) html = readFileSync(file, "utf8");
    else {
      const response = await fetch(entry.url);
      if (!response.ok) { report.brokenTemplates.push(`${decodedPath(entry.url)}: HTTP ${response.status}`); continue; }
      html = await response.text();
      writeFileSync(file, html);
    }
    const page = parse(html);
    const content = page.querySelector(".elementor-widget-theme-post-content .elementor-widget-container") ?? page.querySelector(".elementor-widget-theme-post-content");
    const title = page.querySelector(".elementor-widget-theme-post-title h1")?.text ?? page.querySelector("h1")?.text;
    let article;
    for (const script of page.querySelectorAll('script[type="application/ld+json"]')) {
      if (script.getAttribute("class")) continue; // the plugin's second copy
      try { const data = JSON.parse(script.text); if (data["@type"] === "Article") article = data; } catch { /* not JSON */ }
    }
    if (!content || !title || !article?.datePublished) { report.brokenTemplates.push(`${decodedPath(entry.url)}: page not understood`); continue; }
    const personSlug = (person) => /\/author\/([^/]+)\//.exec(person?.url ?? "")?.[1];
    const cover = page.querySelector('meta[property="og:image"]')?.getAttribute("content");
    out.push({
      id: entry.id,
      link: entry.url,
      title: { rendered: title.trim() },
      content: { rendered: content.innerHTML },
      excerpt: { rendered: page.querySelector('meta[name="description"]')?.getAttribute("content") ?? "" },
      date_gmt: article.datePublished.replace(/\+00:00$/, ""),
      modified_gmt: (article.dateModified ?? article.datePublished).replace(/\+00:00$/, ""),
      categories: [],
      _people: [personSlug(article.author), personSlug(article.reviewedBy)].filter(Boolean).map((slug) => decodeURIComponent(slug)),
      _embedded: cover ? { "wp:featuredmedia": [{ source_url: new URL(cover, WP).href, alt_text: page.querySelector(".elementor-widget-theme-post-featured-image img")?.getAttribute("alt") ?? "" }] } : {},
    });
  }
  return out;
}
const wpTemplateRecords = await wpTemplates();

/* authors */
const REVIEWER_SLUG = "faisal";
// The job title the live pages publish for the reviewer in their Article schema.
const REVIEWER_TITLE = "محاسب قانوني ومراجع معتمد";
const slugFixes = { "hamzaithrochgmail-com": "hamza-ait", "nektoublekgmail-com": "vom" };
const authorRows = new Map(); // base slug → row
const authorByTerm = new Map(); // term id → base slug
for (const term of wpAuthors) {
  const raw = decodeURIComponent(term.slug);
  const base = raw.replace(/-en$/, "");
  const slug = slugFixes[base] ?? base;
  if (slugFixes[base] && !report.renamedAuthorSlugs.includes(`${base} → ${slug}`)) report.renamedAuthorSlugs.push(`${base} → ${slug}`);
  authorByTerm.set(term.id, slug);
  // The Arabic term wins over its "-en" duplicate.
  if (!authorRows.has(slug) || !raw.endsWith("-en")) {
    authorRows.set(slug, { wp_id: term.id, slug, name: cleanText(decodeEntities(term.name)).trim(), job_title: slug === REVIEWER_SLUG ? REVIEWER_TITLE : null });
  }
}

/* categories */
const categoryRows = [];
const categoryByWpId = new Map();
for (const cat of wpCategories) {
  const path = decodedPath(cat.link);
  const mapped = mapByPath.get(path);
  if ((mapped && mapped.proposed_action !== "keep") || (!mapped && cat.count === 0)) {
    report.skippedCategories.push(`${path} (${mapped ? mapped.proposed_action : "empty, not in url-map"})`);
    continue;
  }
  if (!mapped) report.notInUrlMap.push(`category ${path}`);
  const seo = inventory.get(path);
  const row = {
    wp_id: cat.id, path, slug: decodeURIComponent(cat.slug),
    // The archive's visible heading on the live site, where the crawl recorded one.
    name: cleanText((seo?.h1 || decodeEntities(cat.name)).normalize("NFKC")).trim(),
    lang: path.startsWith("/en/") ? "en" : "ar",
    seo_title: seo?.title || null, seo_description: seo?.meta_description || null,
    intro: plainText(cat.description ?? "") || null,
  };
  categoryRows.push(row);
  categoryByWpId.set(cat.id, row);
}

/* posts and news */
async function liveSeo(path) {
  const response = await fetch(`${WP}${encodeURI(path)}`);
  if (!response.ok) return null;
  const head = parse(await response.text()).querySelector("head");
  return {
    title: decodeEntities(head?.querySelector("title")?.text ?? "").trim(),
    meta_description: decodeEntities(head?.querySelector('meta[name="description"]')?.getAttribute("content") ?? "").trim(),
  };
}

const records = [];
const seenPaths = new Map();
const source = [
  ...wpPosts.map((p) => ({ ...p, _type: "post" })),
  ...wpNews.map((p) => ({ ...p, _type: "news" })),
  ...wpTemplateRecords.map((p) => ({ ...p, _type: "template" })),
].slice(0, limit === Infinity ? undefined : limit);

for (const wp of source) {
  const path = decodedPath(wp.link);
  if (seenPaths.has(path)) report.duplicatePaths.push(`${path} (wp ${seenPaths.get(path)} and ${wp.id})`);
  seenPaths.set(path, wp.id);
  if (!mapByPath.has(path)) report.notInUrlMap.push(`${wp._type} ${path} (wp ${wp.id})`);

  let seo = inventory.get(path);
  if (!seo?.title) {
    seo = await liveSeo(path);
    if (seo?.title) report.seoFromLivePage.push(path); else report.noSeo.push(path);
  }

  // WordPress gave some pages the blog index's title and description by mistake;
  // those pages fall back to their own title and excerpt.
  const blogDefault = inventory.get("/blog/");
  if (seo && blogDefault && path !== "/blog/" && seo.title === blogDefault.title) {
    report.blogDefaultSeo.push(path);
    seo = null;
  }

  const authorSlug = (raw) => { const base = raw.replace(/-en$/, ""); return slugFixes[base] ?? base; };
  const terms = wp._people
    ? wp._people.map(authorSlug).filter((slug) => authorRows.has(slug))
    : wp.authors?.length
    ? wp.authors.map((a) => authorByTerm.get(a.term_id)).filter(Boolean)
    : (wp.ppma_author ?? []).map((id) => authorByTerm.get(id)).filter(Boolean);
  const reviewer = terms.includes(REVIEWER_SLUG) ? REVIEWER_SLUG : null;
  const author = terms.find((slug) => slug !== REVIEWER_SLUG) ?? null;
  if (!reviewer) report.noReviewer.push(path);
  if (!author) report.noAuthor.push(path);

  const body = convertBody(wp.content.rendered);
  if (body.demotedH1) report.demotedH1.push(path);
  const before = plainText(body.cleaned), after = plainText(body.html);
  if (before !== after) report.textChanged.push(`${path} (${before.length} → ${after.length} characters)`);

  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  const coverKey = media?.source_url ? uploadKey(media.source_url) : null;
  if (!coverKey) report.noCover.push(path);
  const segments = path.split("/").filter(Boolean);
  const wpCats = (wp.categories ?? []).map((id) => categoryByWpId.get(id)).filter(Boolean);
  const primary = wpCats.find((c) => c.path === `/${segments.slice(0, -1).join("/")}/`) ?? wpCats[0] ?? null;

  records.push({
    row: {
      wp_id: wp.id, type: wp._type, lang: path.startsWith("/en/") ? "en" : "ar", path, slug: segments.at(-1),
      title: cleanText(decodeEntities(wp.title.rendered)).trim(),
      seo_title: seo?.title || null, seo_description: seo?.meta_description || null,
      excerpt: plainText(wp.excerpt?.rendered ?? "").replace(/\s*\[…\]$/, "…") || null,
      content_json: body.json, content_html: body.html,
      cover_image: coverKey ? wantMedia(media.source_url) : null,
      cover_alt: media?.alt_text ? cleanText(decodeEntities(media.alt_text)).replace(/\s+/g, " ").trim() : null,
      status: "published", published_at: `${wp.date_gmt}Z`, modified_at: `${wp.modified_gmt}Z`,
    },
    coverKey, author, reviewer, primary: primary?.wp_id ?? null, categories: wpCats.map((c) => c.wp_id), raw: wp.content.rendered,
  });
}

/* media, then a second pass so every figure carries its real size */
if (!dryRun && !skipMedia) {
  console.error(`Uploading media: ${mediaWanted.size} files referenced…`);
  await uploadMedia();
  for (const record of records) {
    const body = convertBody(record.raw);
    record.row.content_json = body.json;
    record.row.content_html = body.html;
    const cover = record.coverKey ? mediaDone[record.coverKey] : null;
    record.row.cover_width = cover?.width ?? null;
    record.row.cover_height = cover?.height ?? null;
  }
}

/* url-map coverage */
for (const row of urlMap) {
  // The four index pages are routes of the site, not records.
  if (!["post", "news", "template"].includes(row.type) || row.proposed_action !== "keep" || ["/blog/", "/news/", "/en/news/", "/templates/"].includes(row.old_path_decoded)) continue;
  if (!seenPaths.has(row.old_path_decoded)) report.missingFromImport.push(`${row.type} ${row.old_path_decoded}`);
}
/* inventory cross-check: the stored SEO fields equal the crawl's */
for (const { row } of records) {
  const crawl = inventory.get(row.path);
  if (crawl && !report.blogDefaultSeo.includes(row.path) && (crawl.title !== row.seo_title || (crawl.meta_description || null) !== row.seo_description)) report.seoMismatch.push(row.path);
}

/* write */
if (!dryRun) {
  const db = createClient(env("NEXT_PUBLIC_SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } });
  const must = ({ data, error }, what) => { if (error) throw new Error(`${what}: ${error.message}`); return data; };

  const authors = must(await db.from("authors").upsert([...authorRows.values()], { onConflict: "wp_id" }).select("id, slug"), "authors");
  const authorId = new Map(authors.map((a) => [a.slug, a.id]));
  const categories = must(await db.from("categories").upsert(categoryRows, { onConflict: "wp_id" }).select("id, wp_id"), "categories");
  const categoryId = new Map(categories.map((c) => [c.wp_id, c.id]));

  const postIds = new Map();
  for (let i = 0; i < records.length; i += 20) {
    const batch = records.slice(i, i + 20).map((r) => ({
      ...r.row,
      author_id: r.author ? authorId.get(r.author) ?? null : null,
      reviewed_by_id: r.reviewer ? authorId.get(r.reviewer) ?? null : null,
      primary_category_id: r.primary ? categoryId.get(r.primary) ?? null : null,
    }));
    for (const p of must(await db.from("posts").upsert(batch, { onConflict: "wp_id" }).select("id, wp_id"), "posts")) postIds.set(p.wp_id, p.id);
    console.error(`  posts ${Math.min(i + 20, records.length)}/${records.length}`);
  }
  const ids = [...postIds.values()];
  for (let i = 0; i < ids.length; i += 100) must(await db.from("post_categories").delete().in("post_id", ids.slice(i, i + 100)), "post_categories delete");
  const links = records.flatMap((r) => r.categories.map((c) => ({ post_id: postIds.get(r.row.wp_id), category_id: categoryId.get(c) }))).filter((l) => l.post_id && l.category_id);
  for (let i = 0; i < links.length; i += 500) must(await db.from("post_categories").insert(links.slice(i, i + 500)), "post_categories insert");
}

/* report */
const summary = {
  mode: dryRun ? "dry run (nothing written)" : skipMedia ? "written, media skipped" : "written",
  wordpress: { posts: wpPosts.length, news: wpNews.length, categories: wpCategories.length, authorTerms: wpAuthors.length },
  imported: {
    posts: records.filter((r) => r.row.type === "post").length, news: records.filter((r) => r.row.type === "news").length,
    templates: records.filter((r) => r.row.type === "template").length,
    categories: categoryRows.length, authors: authorRows.size, mediaReferenced: mediaWanted.size, mediaUploaded: Object.keys(mediaDone).length,
  },
  urlMapKeepRows: {
    post: urlMap.filter((r) => r.type === "post" && r.proposed_action === "keep").length,
    news: urlMap.filter((r) => r.type === "news" && r.proposed_action === "keep").length,
  },
};
writeFileSync(join(cacheDir, "report.json"), JSON.stringify({ summary, report }, null, 2));
console.log(JSON.stringify(summary, null, 2));
const show = (title, list, max = 12) => {
  console.log(`\n${title}: ${list.length}`);
  for (const item of list.slice(0, max)) console.log(`  ${item}`);
  if (list.length > max) console.log(`  … ${list.length - max} more (node_modules/.cache/wp-import/report.json)`);
};
show("url-map keep rows with no imported record", report.missingFromImport);
show("Imported but not in url-map", report.notInUrlMap);
show("Duplicate paths", report.duplicatePaths);
show("SEO title read from the live page (not in the inventory)", report.seoFromLivePage);
show("No SEO title found", report.noSeo);
show("Carried the blog index's title on WordPress (now use their own)", report.blogDefaultSeo);
show("SEO fields differ from the inventory", report.seoMismatch);
show("Posts with no reviewer", report.noReviewer);
show("Posts with no author", report.noAuthor);
show("Posts with no cover image", report.noCover);
show("Body H1 demoted to H2", report.demotedH1);
show("Text changed by the editor round trip", report.textChanged);
show("Images hosted elsewhere (left as they are)", [...new Set(report.externalImages)]);
show("Broken media", report.brokenMedia);
show("Templates that could not be read", report.brokenTemplates);
show("Categories not imported", report.skippedCategories, 20);
show("Author slugs replaced", report.renamedAuthorSlugs);
console.log(`\nDropped elements: ${Object.entries(report.dropped).map(([k, v]) => `${k} ${v}`).join(", ") || "none"}`);
