#!/usr/bin/env node
/**
 * One-off import of the e-invoicing hub and its 12 guides from the saved
 * WordPress pages (getvom.com/e-invocing/index.html*) into MDX under
 * content/e-invoicing/. Kept so the migration can be repeated
 * (docs/architecture.md §4). Run: node scripts/import-einvoicing.mjs [--images]
 *
 * It keeps the text, its order, the headings, lists, links, tables, images and
 * FAQ questions one to one. Character fixes only: Arabic presentation forms
 * (the "ﭬﻮم" spelling) become ordinary letters, zero-width and non-breaking
 * spaces go, doubled spaces collapse. The closing lead form is dropped; the
 * page template carries the booking card that replaces it.
 *
 * --images also downloads every image's largest original from the live site
 * (plain GET, or the local download when it has the file) and writes it as WebP
 * into public/e-invoicing/, at most 1600 px wide.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import { altOverrides, figureReplacements } from "./einvoicing-overrides.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "getvom.com/e-invocing");
const outDir = join(root, "content/e-invoicing");
const imageDir = join(root, "public/e-invoicing");
const cacheDir = join(root, "node_modules/.cache/einvoicing-images");
const localUploads = join(root, "getvom.com");
const MAX_WIDTH = 1600;

/** Saved file → guide id (ASCII; the Arabic slug lives in lib/content/einvoicing/catalogue.ts). */
const files = {
  "index.html.12": "hub",
  "index.html.11": "what-is",
  "index.html.10": "requirements",
  "index.html.9": "phases",
  "index.html.7": "tax-invoice",
  "index.html.5": "how-to-issue",
  "index.html.1": "software",
  "index.html.8": "compliance",
  "index.html.4": "zatca-link",
  "index.html.3": "activation-code",
  "index.html.2": "qr-reader",
  "index.html.6": "subsidy",
  "index.html": "fines",
};

const FAQ_HEADING = /أسئل|اسئل/;
const BOOKING_LINE = /احجز مكالمة امتثال مجانية/;

// ---------------------------------------------------------------- text

/** Arabic presentation forms (FB50–FDFF, FE70–FEFF) to ordinary letters; invisible clutter out. */
function cleanText(text) {
  return text
    .replace(/[\uFB50-\uFDFF\uFE70-\uFEFF]/g, (ch) => (ch === "\uFEFF" ? "" : ch.normalize("NFKC")))
    .replace(/[\u200B\u2060]/g, "")
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/[ \t\r\n]+/g, " ");
}

/** Escapes text for an MDX markdown paragraph. */
function escapeMd(text) {
  return text.replace(/[\\*_[\]<>{}`~|]/g, (ch) => `\\${ch}`);
}

/** Escapes text for a JSX child. */
function escapeJsx(text) {
  return text.replace(/[{}<>]/g, (ch) => `{${JSON.stringify(ch)}}`);
}

/** A markdown block must not start with a character that would turn it into another block. */
function guardLineStart(md) {
  return md.replace(/^(\s*)([#>+-]|\d+[.)])/, (_, space, lead) => `${space}${lead.replace(/^([#>+-])/, "\\$1").replace(/^(\d+)([.)])/, "$1\\$2")}`);
}

/** Moves spaces from inside an inline wrapper to its outside: `<b> x </b>` → ` <b>x</b> `. */
function wrapTrimmed(inner, open, close) {
  const lead = inner.match(/^\s*/)[0];
  const trail = inner.match(/\s*$/)[0];
  const core = inner.trim();
  if (!core) return inner;
  return `${lead}${open}${core}${close}${trail}`;
}

// ---------------------------------------------------------------- links

function decodeCfEmail(hex) {
  const key = parseInt(hex.slice(0, 2), 16);
  let out = "";
  for (let i = 2; i < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
  return out;
}

function normaliseHref(raw) {
  if (!raw) return null;
  let href = raw.trim().replace(/&amp;/g, "&");
  if (href.startsWith("#")) return null;
  if (href.startsWith("//")) href = `https:${href}`;
  const cf = href.match(/\/cdn-cgi\/l\/email-protection#([0-9a-f]+)/i);
  if (cf) return `mailto:${decodeCfEmail(cf[1])}`;
  href = href.replace(/^https?:\/\/(www\.)?getvom\.com(?=\/|$)/, "");
  if (href.startsWith("/")) {
    try {
      href = decodeURI(href);
    } catch {
      /* keep as is */
    }
    if (/^\/pricing(-2)*\/?$/.test(href) || href === "/pricing-2-2/") href = "/pricing/";
  }
  return href;
}

function isExternal(href) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

/** Markdown link destination; wrapped in <> when it holds spaces or parentheses. */
function mdDestination(href) {
  return /[\s()]/.test(href) ? `<${href.replace(/[<>]/g, encodeURIComponent)}>` : href;
}

// ---------------------------------------------------------------- images

const images = new Map(); // output name → { url, width, height, local }

function largestSource(img) {
  const set = img.getAttribute("data-lazy-srcset") || img.getAttribute("srcset") || "";
  let best = null;
  for (const part of set.split(",")) {
    const [url, w] = part.trim().split(/\s+/);
    const width = parseInt(w, 10);
    if (url && width && (!best || width > best.width)) best = { url, width };
  }
  const src = img.getAttribute("data-lazy-src") || img.getAttribute("src");
  const attrW = parseInt(img.getAttribute("width") || "0", 10);
  const attrH = parseInt(img.getAttribute("height") || "0", 10);
  if (!best) best = { url: src, width: attrW };
  const height = attrW ? Math.round((best.width * attrH) / attrW) : attrH;
  return { url: best.url, width: best.width, height };
}

function figure(img, nearestHeading) {
  const { url, width, height } = largestSource(img);
  if (!url || url.startsWith("data:")) return "";
  const path = decodeURIComponent(url.replace(/^https?:\/\/(www\.)?getvom\.com/, ""));
  const file = path.split("/").pop();
  if (figureReplacements[file]) return figureReplacements[file];
  const dot = file.lastIndexOf(".");
  const name = `${file.slice(0, dot)}-${file.slice(dot + 1).toLowerCase()}.webp`;
  const scale = width > MAX_WIDTH ? MAX_WIDTH / width : 1;
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);
  images.set(name, { url: `https://getvom.com${path}`, local: join(localUploads, path), width: w, height: h });
  const original = cleanText(img.getAttribute("alt") || "").trim();
  const finalAlt = original || altOverrides[file] || nearestHeading || "";
  return `<Figure src="/e-invoicing/${name}" width={${w}} height={${h}} alt=${JSON.stringify(finalAlt)} />`;
}

// ---------------------------------------------------------------- inline

function isBoldSpan(el) {
  const style = (el.getAttribute("style") || "").replace(/\s/g, "");
  return /font-weight:(bold|[6-9]00)/.test(style);
}

/** Inline markdown for a node's children. Images are collected, not inlined. */
function inline(node, ctx, mode = "md") {
  let out = "";
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const text = cleanText(child.text);
      out += mode === "md" ? escapeMd(text) : escapeJsx(text);
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.rawTagName?.toLowerCase();
    if (["script", "style", "noscript", "svg"].includes(tag)) continue;
    if (tag === "img") {
      ctx.pendingImages.push(child);
      continue;
    }
    if (tag === "br") {
      out += mode === "md" ? "<br />" : "<br />";
      continue;
    }
    const inner = inline(child, ctx, mode);
    if (tag === "strong" || tag === "b" || (tag === "span" && isBoldSpan(child))) {
      out += wrapTrimmed(inner, "<strong>", "</strong>");
    } else if (tag === "em" || tag === "i") {
      out += wrapTrimmed(inner, "<em>", "</em>");
    } else if (tag === "a") {
      const href = normaliseHref(child.getAttribute("href"));
      let text = inner;
      if (/\[email(\s|&#160;)*protected\]/.test(child.text) && href?.startsWith("mailto:")) {
        text = mode === "md" ? escapeMd(href.slice(7)) : escapeJsx(href.slice(7));
      }
      if (!href || !text.trim()) {
        out += text;
      } else if (mode === "md") {
        out += wrapTrimmed(text, "[", `](${mdDestination(href)})`);
      } else {
        const attrs = isExternal(href) ? ` target="_blank" rel="noopener"` : "";
        out += wrapTrimmed(text, `<a href=${JSON.stringify(href)}${attrs}>`, "</a>");
      }
    } else if (tag === "ul" || tag === "ol" || tag === "table" || tag === "p" || tag === "div") {
      // Block content inside an inline context (a list inside a table cell is handled by the caller).
      out += ` ${inner} `;
    } else {
      out += inner;
    }
  }
  return out;
}

const tidy = (s) =>
  s
    .replace(/<\/strong>(\s*)<strong>/g, "$1")
    .replace(/<\/em>(\s*)<em>/g, "$1")
    .replace(/[ ]{2,}/g, " ")
    .replace(/:(?=[\u0621-\u064A])/g, ": ")
    .trim();

// ---------------------------------------------------------------- blocks

function listMd(list, ctx, depth = 0) {
  const ordered = list.rawTagName.toLowerCase() === "ol";
  const lines = [];
  let n = 1;
  for (const li of list.childNodes) {
    if (li.nodeType !== 1 || li.rawTagName.toLowerCase() !== "li") continue;
    const marker = ordered ? `${n++}.` : "-";
    const indent = "  ".repeat(depth) + (depth ? " ".repeat(ordered ? 1 : 0) : "");
    const nested = [];
    const shell = parse("<li></li>").firstChild;
    for (const c of li.childNodes) {
      const t = c.nodeType === 1 ? c.rawTagName.toLowerCase() : "";
      if (t === "ul" || t === "ol") nested.push(c);
      else shell.appendChild(c.clone());
    }
    // An item whose text starts like "7." must not turn into a nested numbered list.
    const text = guardLineStart(tidy(inline(shell, ctx)));
    if (text) lines.push(`${indent}${marker} ${text}`);
    for (const sub of nested) lines.push(listMd(sub, ctx, depth + 1));
  }
  return lines.join("\n");
}

function cellJsx(cell, ctx) {
  const parts = [];
  for (const c of cell.childNodes) {
    const t = c.nodeType === 1 ? c.rawTagName.toLowerCase() : "";
    if (t === "ul" || t === "ol") {
      const items = c.childNodes
        .filter((li) => li.nodeType === 1 && li.rawTagName.toLowerCase() === "li")
        .map((li) => `<li>${tidy(inline(li, ctx, "jsx"))}</li>`)
        .join("");
      parts.push(`<${t}>${items}</${t}>`);
    } else if (c.nodeType === 1 || c.nodeType === 3) {
      const shell = parse("<span></span>").firstChild;
      shell.appendChild(c.clone());
      const text = tidy(inline(shell, ctx, "jsx"));
      if (text) parts.push(text);
    }
  }
  return parts.join(" ");
}

function tableJsx(table, ctx) {
  const rows = table.querySelectorAll("tr");
  if (!rows.length) return "";
  // A one-cell table is WordPress layout around a single link, not data.
  const all = table.querySelectorAll("td,th");
  if (rows.length === 1 && all.length === 1) return guardLineStart(tidy(inline(all[0], ctx)));
  const cells = (tr) => tr.childNodes.filter((c) => c.nodeType === 1 && /^(td|th)$/i.test(c.rawTagName));
  const first = cells(rows[0]);
  const headerRow =
    rows[0].parentNode?.rawTagName?.toLowerCase() === "thead" ||
    first.every((c) => c.rawTagName.toLowerCase() === "th" || /^<p>\s*<(b|strong)>/i.test(c.innerHTML.trim()) || c.querySelector("b,strong")?.text.trim() === c.text.trim());
  const head = headerRow
    ? `<thead><tr>${first.map((c) => `<th>${cellJsx(c, ctx).replace(/<\/?strong>/g, "")}</th>`).join("")}</tr></thead>`
    : "";
  const span = (c) => {
    const n = parseInt(c.getAttribute("colspan") || "1", 10);
    return n > 1 ? ` colSpan={${n}}` : "";
  };
  // With a header row, each body row's first cell names the row.
  const body = rows
    .slice(headerRow ? 1 : 0)
    .map(
      (tr) =>
        `<tr>${cells(tr)
          .map((c, i) => {
            const tag = headerRow && i === 0 ? "th" : "td";
            return `<${tag}${span(c)}>${cellJsx(c, ctx)}</${tag}>`;
          })
          .join("")}</tr>`,
    )
    .join("\n");
  return `<Table>\n${head}${head ? "\n" : ""}<tbody>\n${body}\n</tbody>\n</Table>`;
}

/**
 * Collects the page's blocks in reading order from the Elementor widgets:
 * { kind: "heading", level, html } | { kind: "p", node } | { kind: "list", node }
 * | { kind: "table", node } | { kind: "img", node }.
 */
function collectBlocks(pageRoot) {
  const blocks = [];
  let stopped = false;
  const pushContent = (node) => {
    for (const c of node.childNodes) {
      if (c.nodeType === 3) {
        if (cleanText(c.text).trim()) blocks.push({ kind: "p", node: parse(`<p>${c.toString()}</p>`).firstChild });
        continue;
      }
      if (c.nodeType !== 1) continue;
      const t = c.rawTagName.toLowerCase();
      if (/^h[1-6]$/.test(t)) blocks.push({ kind: "heading", level: Number(t[1]), node: c });
      else if (t === "p") blocks.push({ kind: "p", node: c });
      else if (t === "ul" || t === "ol") blocks.push({ kind: "list", node: c });
      else if (t === "table") blocks.push({ kind: "table", node: c });
      else if (t === "img") blocks.push({ kind: "img", node: c });
      else if (t === "figure" || t === "div" || t === "blockquote" || t === "span") pushContent(c);
      else if (["script", "style", "noscript", "svg"].includes(t)) continue;
      else blocks.push({ kind: "p", node: c });
    }
  };
  const walk = (node) => {
    if (stopped) return;
    for (const c of node.childNodes) {
      if (stopped || c.nodeType !== 1) continue;
      const cls = c.getAttribute("class") || "";
      if (/elementor-widget-form/.test(cls)) {
        stopped = true;
        return;
      }
      if (/elementor-widget-divider/.test(cls)) continue;
      if (/elementor-widget-heading/.test(cls)) {
        const h = c.querySelector("h1,h2,h3,h4,h5,h6");
        if (h) blocks.push({ kind: "heading", level: Number(h.rawTagName[1]), node: h });
        else pushContent(c.querySelector(".elementor-widget-container") || c);
        continue;
      }
      if (/elementor-widget-text-editor/.test(cls)) {
        pushContent(c.querySelector(".elementor-widget-container") || c);
        continue;
      }
      if (/elementor-widget-image\b/.test(cls)) {
        const img = c.querySelector("img");
        if (img) blocks.push({ kind: "img", node: img });
        continue;
      }
      if (/elementor-widget-/.test(cls)) {
        console.warn(`  unhandled widget: ${cls.match(/elementor-widget-[a-z0-9-]+/)[0]}`);
        continue;
      }
      walk(c);
    }
  };
  walk(pageRoot);
  return blocks;
}

// ---------------------------------------------------------------- page

function convert(file, id) {
  const html = readFileSync(join(sourceDir, file), "utf8");
  const doc = parse(html, { comment: false });
  const pageRoot = doc.querySelector('[data-elementor-type="wp-page"]');
  const meta = {
    id,
    title: cleanText(doc.querySelector("title").text).trim(),
    description: cleanText(doc.querySelector('meta[name="description"]').getAttribute("content")).trim(),
    h1: cleanText(doc.querySelector("h1").text).trim(),
    canonical: decodeURI(doc.querySelector('link[rel="canonical"]').getAttribute("href")),
    published: doc.querySelector('meta[property="article:published_time"]').getAttribute("content"),
    modified: doc.querySelector('meta[property="article:modified_time"]').getAttribute("content"),
  };

  const blocks = collectBlocks(pageRoot);
  const out = [];
  let lede = null;
  let sawH2 = false;
  let h2 = 0;
  let faq = null; // { open: boolean } while inside an FAQ section
  let lastHeading = "";

  const closeQuestion = () => {
    if (faq?.question) {
      out.push("</Question>");
      faq.question = false;
    }
  };
  const closeFaq = () => {
    if (!faq) return;
    closeQuestion();
    out.push("</Faq>");
    faq = null;
  };

  for (const block of blocks) {
    const ctx = { pendingImages: [] };
    if (block.kind === "heading") {
      // Headings are bold already; WordPress often wrapped them in <strong> as well.
      const text = tidy(inline(block.node, ctx, "jsx")).replace(/<\/?strong>/g, "");
      if (!text || BOOKING_LINE.test(text)) continue;
      lastHeading = cleanText(block.node.text).trim();
      if (block.level <= 2) {
        closeFaq();
        if (!sawH2) out.push("<PhaseTwo />");
        sawH2 = true;
        h2 += 1;
        out.push(`<h2 id="s-${h2}">${text}</h2>`);
        if (FAQ_HEADING.test(lastHeading)) {
          out.push("<Faq>");
          faq = { question: false };
        }
      } else if (faq && block.level === 3) {
        closeQuestion();
        out.push(`<Question q={${JSON.stringify(cleanText(block.node.text).trim())}}>`);
        faq.question = true;
      } else {
        out.push(`<h${block.level}>${text}</h${block.level}>`);
      }
    } else if (block.kind === "p") {
      if (BOOKING_LINE.test(block.node.text)) continue;
      const md = guardLineStart(tidy(inline(block.node, ctx)));
      if (md && md !== "<br />") {
        if (!lede && !sawH2 && !out.length) {
          lede = tidy(inline(block.node, { pendingImages: [] }, "jsx"));
        } else {
          out.push(md);
        }
      }
    } else if (block.kind === "list") {
      const md = listMd(block.node, ctx);
      if (md) out.push(md);
    } else if (block.kind === "table") {
      out.push(tableJsx(block.node, ctx));
    } else if (block.kind === "img") {
      ctx.pendingImages.push(block.node);
    }
    for (const img of ctx.pendingImages) {
      const fig = figure(img, lastHeading);
      if (fig) out.push(fig);
    }
  }
  closeFaq();

  const body = out.join("\n\n").replace(/\n{3,}/g, "\n\n");
  const ledeExport = lede ? `export const lede = (\n  <>\n    ${lede}\n  </>\n);\n\n` : "export const lede = null;\n\n";
  const header = `{/* Imported from the WordPress page ${meta.canonical} by scripts/import-einvoicing.mjs. */}\n\n`;
  writeFileSync(join(outDir, `${id}.mdx`), `${ledeExport}${header}${body}\n`);

  const oldWords = pageRoot.text.replace(/\s+/g, " ").trim().split(" ").length;
  return { ...meta, h2: h2, oldWords };
}

// ---------------------------------------------------------------- run

mkdirSync(outDir, { recursive: true });
mkdirSync(join(root, "node_modules/.cache"), { recursive: true });
const summary = [];
for (const [file, id] of Object.entries(files)) {
  console.log(`${id} ← ${file}`);
  summary.push(convert(file, id));
}
writeFileSync(join(root, "node_modules/.cache/einvoicing-import.json"), JSON.stringify({ pages: summary, images: Object.fromEntries(images) }, null, 2));
console.log(`${summary.length} pages, ${images.size} images`);

if (process.argv.includes("--images")) {
  mkdirSync(cacheDir, { recursive: true });
  mkdirSync(imageDir, { recursive: true });
  for (const [name, image] of images) {
    const target = join(imageDir, name);
    if (existsSync(target)) continue;
    let source = image.local;
    if (!existsSync(source)) {
      source = join(cacheDir, image.url.split("/").pop());
      if (!existsSync(source)) {
        execFileSync("curl", ["-sSfL", "--retry", "3", "-A", "vom-website-migration", "-o", source, encodeURI(image.url)]);
      }
    }
    const args = ["-quiet", "-q", "90", "-m", "6", "-metadata", "none"];
    if (image.width >= MAX_WIDTH) args.push("-resize", String(MAX_WIDTH), "0");
    execFileSync("cwebp", [...args, source, "-o", target]);
    console.log(`  ${name}`);
  }
}
