#!/usr/bin/env node
/**
 * One-off import of the seven WordPress tool pages (getvom.com/tools/<slug>.html,
 * the saved download) into MDX under content/tools/. Kept so the migration can
 * be repeated (docs/architecture.md §4). Run: node scripts/import-tools.mjs [--images]
 *
 * The copy is kept one to one: text, order, headings, lists, links, tables,
 * images and FAQ questions. Character fixes only (Arabic presentation forms such
 * as «ﭬوم», invisible direction marks, non-breaking spaces, Arabic-Indic digits
 * to Western ones per DESIGN.md), plus the owner-approved replacements in
 * scripts/tools-overrides.mjs. Each old calculator widget (its markup, styles and
 * script) becomes a <Calculator id="…" /> marker at the same place; the
 * calculators themselves are React components (components/tools/calculators/).
 *
 * --images downloads every image once (the local download first, then
 * media.getvom.com, then the live site) and writes it as WebP, at most 1600 px
 * wide, into public/tools/<id>/ with a provenance sidecar. Nothing is fetched at
 * request time (owner, 2026-11-12).
 *
 * The text helpers are forked from scripts/import-einvoicing.mjs, which runs on
 * its own and exports nothing; changing it would risk its imported output.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";
import { tools } from "../lib/content/tools/catalogue.ts";
import { altFixes, dropHeadings, faqStop, files, headingLevels, linkFixes, replacements } from "./tools-overrides.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "getvom.com/tools");
const localUploads = join(root, "getvom.com");
const outDir = join(root, "content/tools");
const imageRoot = join(root, "public/tools");
const cacheDir = join(root, "node_modules/.cache/tools-images");
const MAX_WIDTH = 1600;

const START = 'data-widget_type="theme-post-content.default"><div class="elementor-widget-container">';
const END = '<div class="elementor-element elementor-element-39b2243 related-posts-a';
const FAQ_HEADING = /أسئل|اسئل/;

// ---------------------------------------------------------------- counts

/** Every character fix, counted per page, for docs/content/tools/text-changes.md. */
let counts = {};
const count = (key, n = 1) => {
  if (n) counts[key] = (counts[key] ?? 0) + n;
};

// ---------------------------------------------------------------- text

const PRESENTATION = /[\uFB50-\uFDFF\uFE70-\uFEFE]/g;
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\u061C\uFEFF]/g;
const INDIC = /[\u0660-\u0669]/g;

function cleanText(text) {
  count("presentation forms", (text.match(PRESENTATION) ?? []).length);
  count("invisible marks", (text.match(INVISIBLE) ?? []).length);
  count("Arabic-Indic digits", (text.match(INDIC) ?? []).length);
  count("non-breaking spaces", (text.match(/[\u00A0\u202F]/g) ?? []).length);
  return text
    .replace(PRESENTATION, (ch) => ch.normalize("NFKC"))
    .replace(INVISIBLE, "")
    .replace(INDIC, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/(\d)\u066A/g, "$1%")
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/[ \t\r\n]+/g, " ");
}

const plain = (node) => cleanText(node.text).trim();

function escapeMd(text) {
  return text.replace(/[\\*_[\]<>{}`~|]/g, (ch) => `\\${ch}`);
}

function escapeJsx(text) {
  return text.replace(/[{}<>]/g, (ch) => `{${JSON.stringify(ch)}}`);
}

function guardLineStart(md) {
  return md.replace(/^(\s*)([#>+-]|\d+[.)])/, (_, space, lead) => `${space}${lead.replace(/^([#>+-])/, "\\$1").replace(/^(\d+)([.)])/, "$1\\$2")}`);
}

function wrapTrimmed(inner, open, close) {
  const lead = inner.match(/^\s*/)[0];
  const trail = inner.match(/\s*$/)[0];
  const core = inner.trim();
  if (!core) return inner;
  return `${lead}${open}${core}${close}${trail}`;
}

const tidy = (s) =>
  s
    .replace(/<\/strong>(\s*)<strong>/g, "$1")
    .replace(/<\/em>(\s*)<em>/g, "$1")
    .replace(/[ ]{2,}/g, " ")
    .replace(/:(?=[\u0621-\u064A])/g, ": ")
    .trim();

// ---------------------------------------------------------------- links

/** The URL contract: old path → { action, target }. */
const urlMap = new Map(
  readFileSync(join(root, "docs/content/url-map.csv"), "utf8")
    .split("\n")
    .slice(1)
    .map((line) => line.split(","))
    .filter((cells) => cells.length > 5)
    .map(([, , path, , action, target]) => [path, { action, target }]),
);

const linkReport = [];

function normaliseHref(raw) {
  if (!raw) return null;
  let href = raw.trim().replace(/&amp;/g, "&");
  if (href.startsWith("#")) return null;
  if (href.startsWith("//")) href = `https:${href}`;
  href = href.replace(/^https?:\/\/(www\.)?getvom\.com(?=\/|$)/, "");
  if (href.startsWith("/")) {
    try {
      href = decodeURI(href);
    } catch {
      /* keep as is */
    }
    const path = href.split("#")[0];
    if (path in linkFixes) {
      linkReport.push(`${path} → ${linkFixes[path] ?? "(link dropped, words kept)"} (override)`);
      count(linkFixes[path] ? "links pointed at the post's real path" : "dead links dropped (words kept)");
      return linkFixes[path];
    }
    const row = urlMap.get(path) ?? urlMap.get(`${path.replace(/\/?$/, "/")}`);
    if (row?.action === "redirect" && row.target) {
      linkReport.push(`${path} → ${row.target} (redirect row)`);
      count("links rewritten to their redirect target");
      href = row.target;
    } else if (row?.action === "retire") {
      linkReport.push(`${path} is a retire row (kept, will 410)`);
    } else if (!row) {
      linkReport.push(`${path} is not in url-map.csv`);
    }
  }
  return href;
}

const isExternal = (href) => /^https?:\/\//.test(href) || href.startsWith("mailto:");
const mdDestination = (href) => (/[\s()]/.test(href) ? `<${href.replace(/[<>]/g, encodeURIComponent)}>` : href);

// ---------------------------------------------------------------- images

/** Every image to download: output name → { path, width, height }. */
const images = new Map();

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
  if (!best || (attrW && attrW > best.width)) best = { url: src, width: attrW };
  return { url: best.url, width: best.width || attrW, height: attrW ? Math.round((best.width * attrH) / attrW) : attrH };
}

/** The uploads path of an image URL, decoded, with WordPress size suffixes and Elementor thumbs undone. */
function uploadsPath(url) {
  let path = decodeURIComponent(url.replace(/^https?:\/\/(www\.)?getvom\.com/, ""));
  path = path.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
  return path;
}

/** Registers an image for download and returns its figure; `href` keeps the link the old image carried. */
function figure(img, ctx, href) {
  const { url, width, height } = largestSource(img);
  if (!url || url.startsWith("data:")) return null;
  const path = uploadsPath(url);
  const file = path.split("/").pop();
  ctx.imageN += 1;
  const name = `${ctx.id}/body-${ctx.imageN}.webp`;
  images.set(name, { path, width, height });
  let alt = cleanText(img.getAttribute("alt") || "").trim();
  if (altFixes[file]) {
    alt = altFixes[file];
    count("alt text fixes");
  }
  return { type: "figure", name, alt, href };
}

// ---------------------------------------------------------------- inline

function isBoldSpan(el) {
  return /font-weight:(bold|[6-9]00)/.test((el.getAttribute("style") || "").replace(/\s/g, ""));
}

/** Inline markdown (or JSX) for a node's children. Images are collected in ctx, with the link around them. */
function inline(node, ctx, mode = "md", linkHref = null) {
  let out = "";
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const text = cleanText(child.text);
      out += mode === "md" ? escapeMd(text) : escapeJsx(text);
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.rawTagName?.toLowerCase();
    if (["script", "style", "noscript", "svg", "input", "button", "label"].includes(tag)) continue;
    if (tag === "img") {
      ctx.pending.push({ img: child, href: linkHref });
      continue;
    }
    if (tag === "br") {
      out += "<br />";
      continue;
    }
    if (tag === "a") {
      const href = normaliseHref(child.getAttribute("href"));
      const text = inline(child, ctx, mode, href);
      if (!href || !text.trim()) out += text;
      else if (mode === "md") out += wrapTrimmed(text, "[", `](${mdDestination(href)})`);
      else out += wrapTrimmed(text, `<a href=${JSON.stringify(href)}${isExternal(href) ? ` target="_blank" rel="noopener"` : ""}>`, "</a>");
      continue;
    }
    const inner = inline(child, ctx, mode, linkHref);
    if (tag === "strong" || tag === "b" || (tag === "span" && isBoldSpan(child))) out += wrapTrimmed(inner, "<strong>", "</strong>");
    else if (tag === "em" || tag === "i") out += wrapTrimmed(inner, "<em>", "</em>");
    else if (["ul", "ol", "table", "p", "div", "h1", "h2", "h3", "h4"].includes(tag)) out += ` ${inner} `;
    else out += inner;
  }
  return out;
}

// ---------------------------------------------------------------- blocks

const INLINE_TAGS = new Set(["span", "strong", "b", "em", "i", "a", "br", "img", "sup", "sub", "u"]);
const hasControls = (node) => node.querySelectorAll("input,button,select,textarea").length > 0;
const isEmpty = (node) => !plain(node) && !node.querySelector("img");

/**
 * The page's blocks in reading order:
 * heading | p | list | table | calc (a calculator widget, or a run of loose
 * paragraphs holding form controls) | img.
 */
function collectBlocks(container) {
  const blocks = [];
  let inlineRun = null;
  const flush = () => {
    if (inlineRun && plain(inlineRun)) blocks.push({ kind: "p", node: inlineRun });
    inlineRun = null;
  };
  const pushCalc = (node, loose) => {
    const last = blocks.at(-1);
    if (loose && last?.kind === "calc" && last.loose) return;
    blocks.push({ kind: "calc", node, loose });
  };
  const walk = (node) => {
    for (const c of node.childNodes) {
      if (c.nodeType === 3) {
        if (cleanText(c.text).trim()) (inlineRun ??= parse("<p></p>").firstChild).appendChild(c.clone());
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = c.rawTagName.toLowerCase();
      const cls = c.getAttribute("class") || "";
      if (INLINE_TAGS.has(tag) && !c.querySelector("p,div,ul,ol,table,h1,h2,h3,h4,input,button")) {
        if (tag === "img") {
          flush();
          blocks.push({ kind: "img", node: c });
        } else (inlineRun ??= parse("<p></p>").firstChild).appendChild(c.clone());
        continue;
      }
      flush();
      if (["script", "style", "noscript", "svg"].includes(tag)) continue;
      if (/elementor-widget-html/.test(cls)) {
        pushCalc(c, false);
        continue;
      }
      if (/^h[1-6]$/.test(tag)) {
        blocks.push({ kind: "heading", level: Number(tag[1]), node: c });
        continue;
      }
      if (tag === "p") {
        if (hasControls(c)) pushCalc(c, true);
        else if (!isEmpty(c)) blocks.push({ kind: "p", node: c });
        else if (blocks.at(-1)?.kind === "calc" && blocks.at(-1).loose) continue; // the &nbsp; between loose controls
        continue;
      }
      if (tag === "ul" || tag === "ol") {
        blocks.push({ kind: "list", node: c });
        continue;
      }
      if (tag === "table") {
        blocks.push({ kind: "table", node: c });
        continue;
      }
      if ((tag === "div" || tag === "section") && hasControls(c) && !/elementor-(section|column|widget-wrap|element|container)\b/.test(cls) && !c.querySelector(".elementor-widget")) {
        pushCalc(c, false);
        continue;
      }
      walk(c);
    }
    flush();
  };
  walk(container);
  return blocks;
}

// ---------------------------------------------------------------- lists and tables

/** A list whose items are only headings was WordPress's way of putting a bullet before an H3. */
function headingList(list) {
  const items = list.childNodes.filter((c) => c.nodeType === 1);
  if (!items.length) return null;
  const heads = items.map((li) => {
    const kids = li.childNodes.filter((c) => c.nodeType === 1 || cleanText(c.text).trim());
    return kids.length === 1 && /^h[1-6]$/i.test(kids[0].rawTagName ?? "") ? kids[0] : null;
  });
  return heads.every(Boolean) ? heads : null;
}

/** A one-item list whose item is all bold and asks something: an FAQ question written as a bullet. */
function boldQuestion(list) {
  const items = list.childNodes.filter((c) => c.nodeType === 1);
  if (items.length !== 1) return null;
  const li = items[0];
  const bold = li.querySelectorAll("b,strong").map(plain).join(" ").trim();
  const text = plain(li);
  return bold && bold === text && /[؟?]$/.test(text) ? text : null;
}

function listMd(list, ctx, depth = 0) {
  const ordered = list.rawTagName.toLowerCase() === "ol";
  const lines = [];
  let n = parseInt(list.getAttribute("start") || "1", 10) || 1;
  for (const li of list.childNodes) {
    if (li.nodeType !== 1 || li.rawTagName.toLowerCase() !== "li") continue;
    const marker = ordered ? `${n++}.` : "-";
    // WordPress marks a sub-bullet with aria-level="2" on a separate list.
    const level = depth + Math.max(0, parseInt(li.getAttribute("aria-level") || "1", 10) - 1);
    const indent = "  ".repeat(level) + (level && ordered ? " " : "");
    const nested = [];
    const shell = parse("<li></li>").firstChild;
    for (const c of li.childNodes) {
      const t = c.nodeType === 1 ? c.rawTagName.toLowerCase() : "";
      if (t === "ul" || t === "ol") nested.push(c);
      else shell.appendChild(c.clone());
    }
    const text = guardLineStart(tidy(inline(shell, ctx)));
    if (text) lines.push(`${indent}${marker} ${text}`);
    for (const sub of nested) lines.push(listMd(sub, ctx, level + 1));
  }
  return lines.join("\n");
}

/** The old ✔️/❌ emoji become drawn marks (with «نعم»/«لا» for screen readers); the words stay. */
function marks(jsx) {
  const before = jsx;
  const out = jsx.replace(/✔️?\s*/g, '<Mark v="yes" /> ').replace(/❌\s*/g, '<Mark v="no" /> ').replace(/\s+$/, "");
  if (out !== before) count("emoji ticks and crosses drawn as marks", (before.match(/✔|❌/g) ?? []).length);
  return out;
}

function cellJsx(cell, ctx) {
  return marks(tidy(inline(cell, ctx, "jsx")));
}

function tableBlock(table, ctx) {
  const rows = table.querySelectorAll("tr");
  if (!rows.length) return null;
  const all = table.querySelectorAll("td,th");
  // A one-cell table is a WordPress box around a call to action: a callout, not data.
  if (rows.length === 1 && all.length === 1) {
    count("one-cell tables as callouts");
    const paras = all[0].querySelectorAll("p");
    const parts = (paras.length ? paras : [all[0]]).map((p) => guardLineStart(tidy(inline(p, ctx)))).filter(Boolean);
    return `<Callout>\n\n${parts.join("\n\n")}\n\n</Callout>`;
  }
  const cells = (tr) => tr.childNodes.filter((c) => c.nodeType === 1 && /^(td|th)$/i.test(c.rawTagName));
  const first = cells(rows[0]);
  const headerRow =
    rows[0].parentNode?.rawTagName?.toLowerCase() === "thead" ||
    first.every((c) => c.rawTagName.toLowerCase() === "th" || c.querySelector("b,strong")?.text.trim() === c.text.trim());
  const head = headerRow ? `<thead><tr>${first.map((c) => `<th>${cellJsx(c, ctx).replace(/<\/?strong>/g, "")}</th>`).join("")}</tr></thead>` : "";
  const body = rows
    .slice(headerRow ? 1 : 0)
    .map((tr) => `<tr>${cells(tr).map((c, i) => { const tag = headerRow && i === 0 ? "th" : "td"; return `<${tag}>${cellJsx(c, ctx)}</${tag}>`; }).join("")}</tr>`)
    .join("\n");
  return `<Table>\n${head}${head ? "\n" : ""}<tbody>\n${body}\n</tbody>\n</Table>`;
}

// ---------------------------------------------------------------- page

function wordCount(text) {
  return text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
}

function convert(file, id) {
  counts = {};
  const entry = tools.find((tool) => tool.id === id);
  const html = readFileSync(join(sourceDir, `${file}.html`), "utf8");
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start < 0 || end < 0) throw new Error(`${file}: body markers not found`);
  const container = parse(html.slice(start + START.length, end), { comment: false, blockTextElements: { script: true, style: true, noscript: true } });

  const ctx = { id, imageN: 0, pending: [] };
  const out = [];
  const calculators = [...entry.calculators];
  const drop = dropHeadings[id] ?? [];
  const levels = headingLevels[id] ?? [];
  let h2 = 0;
  let faq = null; // { open: boolean, question: boolean } inside an FAQ section
  let lastList = null; // { index, kind } of the list just written, to merge the next one into

  const flushImages = () => {
    for (const { img, href } of ctx.pending.splice(0)) {
      const fig = figure(img, ctx, href);
      if (fig) out.push(fig);
    }
  };
  const closeQuestion = () => {
    if (faq?.question) out.push("</Question>");
    if (faq) faq.question = false;
  };
  const closeFaq = () => {
    if (!faq) return;
    closeQuestion();
    if (faq.open) out.push("</Faq>");
    faq = null;
  };
  const openQuestion = (q) => {
    closeQuestion();
    if (!faq.open) out.push("<Faq>");
    faq.open = true;
    out.push(`<Question q={${JSON.stringify(q)}}>`);
    faq.question = true;
  };
  const heading = (node, level) => {
    const text = tidy(inline(node, ctx, "jsx")).replace(/<\/?strong>/g, "");
    const words = plain(node);
    if (!words) {
      count("empty headings dropped");
      return;
    }
    if (drop.includes(words)) {
      count("page-builder headings dropped");
      return;
    }
    const change = levels.find(([t]) => t === words);
    if (change) {
      level = change[2];
      count("heading levels corrected");
    }
    if (level <= 2) {
      closeFaq();
      h2 += 1;
      out.push(`<h2 id="s-${h2}">${text}</h2>`);
      if (FAQ_HEADING.test(words)) faq = { open: false, question: false };
    } else if (faq && level === 3) {
      openQuestion(words);
    } else {
      out.push(`<h${Math.min(level, 4)}>${text}</h${Math.min(level, 4)}>`);
    }
  };

  for (const block of collectBlocks(container)) {
    if (block.kind === "calc") {
      const calc = calculators.shift();
      if (!calc) throw new Error(`${id}: more calculator widgets than the catalogue lists`);
      closeFaq();
      // Calculators side by side in the old page share one band (margin's two).
      const last = out.at(-1);
      if (last?.type === "calc") last.ids.push(calc);
      else out.push({ type: "calc", ids: [calc] });
      continue;
    }
    if (block.kind === "heading") {
      heading(block.node, block.level);
    } else if (block.kind === "p") {
      const text = plain(block.node);
      if (faq && faqStop[id]?.test(text)) closeFaq();
      const md = marks(guardLineStart(tidy(inline(block.node, ctx))));
      if (md && md !== "<br />") out.push(md);
    } else if (block.kind === "list") {
      const heads = headingList(block.node);
      const question = faq && boldQuestion(block.node);
      if (heads) {
        count("headings unwrapped from one-item lists", heads.length);
        for (const h of heads) heading(h, Number(h.rawTagName[1]));
      } else if (question) {
        openQuestion(question);
      } else {
        const md = listMd(block.node, ctx);
        // WordPress wrote each bullet as its own list; adjacent lists of one kind read as one.
        const kind = block.node.rawTagName.toLowerCase();
        if (md && lastList?.index === out.length - 1 && lastList.kind === kind) out[out.length - 1] += `\n${md}`;
        else if (md) out.push(md);
        if (md) lastList = { index: out.length - 1, kind };
      }
    } else if (block.kind === "table") {
      const table = tableBlock(block.node, ctx);
      if (table) out.push(table);
    } else if (block.kind === "img") {
      ctx.pending.push({ img: block.node, href: null });
    }
    flushImages();
  }
  closeFaq();
  if (calculators.length) throw new Error(`${id}: calculators not placed: ${calculators.join(", ")}`);

  // Owner-approved replacements; each must apply.
  let body = out.filter(Boolean);
  const applied = [];
  for (const [before, after, why] of replacements[id] ?? []) {
    let hits = 0;
    body = body.map((part) => {
      if (typeof part !== "string") return part;
      const pieces = part.split(before);
      hits += pieces.length - 1;
      return pieces.join(after);
    });
    if (!hits) throw new Error(`${id}: replacement not found: ${before}`);
    applied.push({ before, after, why, hits });
  }

  const oldText = container.querySelectorAll("script,style,noscript").reduce((text, s) => text.replace(s.text, " "), container.text);
  return { id, file, body, applied, counts: { ...counts }, oldWords: wordCount(cleanText(oldText)) };
}

/** The featured image above the old H1, at its full-size original. */
function cover(file, id) {
  const html = readFileSync(join(sourceDir, `${file}.html`), "utf8");
  const i = html.indexOf("elementor-widget-theme-post-featured-image");
  if (i < 0) return null;
  const img = parse(html.slice(i, i + 4000)).querySelector("img");
  if (!img) return null;
  const og = parse(html).querySelector('meta[property="og:image"]')?.getAttribute("content");
  const path = og ? uploadsPath(og) : uploadsPath(img.getAttribute("data-lazy-src") || img.getAttribute("src"));
  const file2 = path.split("/").pop();
  const name = `${id}/cover.webp`;
  images.set(name, { path, width: 0, height: 0 });
  let alt = cleanText(img.getAttribute("alt") || "").trim();
  if (altFixes[file2]) alt = altFixes[file2];
  return { name, alt };
}

// ---------------------------------------------------------------- images

async function writeImages() {
  const require = createRequire(import.meta.url);
  const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));
  mkdirSync(cacheDir, { recursive: true });
  for (const [name, image] of images) {
    const target = join(imageRoot, name);
    mkdirSync(dirname(target), { recursive: true });
    let from = join(localUploads, image.path);
    let origin = `the local download (getvom.com${image.path})`;
    if (!existsSync(from)) {
      from = join(cacheDir, name.replace("/", "__") + image.path.slice(image.path.lastIndexOf(".")));
      if (!existsSync(from)) {
        const sources = [`https://media.getvom.com${image.path}`, `https://getvom.com${image.path}`];
        let ok = false;
        for (const url of sources) {
          try {
            execFileSync("curl", ["-sSfL", "--retry", "2", "-o", from, encodeURI(url)], { stdio: "pipe" });
            origin = url;
            ok = true;
            break;
          } catch {
            /* next source */
          }
        }
        if (!ok) throw new Error(`could not download ${image.path}`);
      } else origin = `the cached download of ${image.path}`;
    }
    const meta = await sharp(from).metadata();
    let pipeline = sharp(from);
    if (meta.width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH });
    await pipeline.webp({ quality: 90 }).toFile(target);
    const { width, height } = await sharp(target).metadata();
    image.width = width;
    image.height = height;
    writeFileSync(
      `${target}.json`,
      `${JSON.stringify(
        {
          prompt: `Sourced, not generated: getvom.com${image.path} from the old /tools/ page, taken from ${origin}, re-encoded to WebP q90 at most ${MAX_WIDTH}px wide by scripts/import-tools.mjs.`,
          createdAt: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
    );
    console.log(`  ${name} ← ${origin} (${width}×${height})`);
  }
}

/** Width and height of a written image (after --images), or the old page's. */
async function dims(name) {
  const target = join(imageRoot, name);
  if (existsSync(target)) {
    const require = createRequire(import.meta.url);
    const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));
    const { width, height } = await sharp(target).metadata();
    return { width, height };
  }
  const image = images.get(name);
  const scale = image.width > MAX_WIDTH ? MAX_WIDTH / image.width : 1;
  return { width: Math.round(image.width * scale), height: Math.round(image.height * scale) };
}

// ---------------------------------------------------------------- run

mkdirSync(outDir, { recursive: true });
const pages = [];
const covers = {};
for (const [file, id] of Object.entries(files)) {
  console.log(`${id} ← ${file}.html`);
  pages.push(convert(file, id));
  covers[id] = cover(file, id);
}
if (process.argv.includes("--images")) await writeImages();

/**
 * Each page is written as two files: <id>.lead.mdx, everything up to and
 * including its last calculator (the old pages all open with their tools,
 * sometimes after a heading or an intro), shown full width as the poster
 * bands; and <id>.mdx, the article that follows, read beside the contents.
 */
for (const page of pages) {
  const parts = [];
  for (const part of page.body) {
    if (typeof part === "string") {
      parts.push(part);
    } else if (part.type === "calc") {
      parts.push(`<Calculator ids={${JSON.stringify(part.ids)}} />`);
    } else {
      const { width, height } = await dims(part.name);
      const href = part.href ? ` href=${JSON.stringify(part.href)}` : "";
      parts.push(`<Figure src="/tools/${part.name}" width={${width}} height={${height}} alt=${JSON.stringify(part.alt)}${href} />`);
    }
  }
  const split = parts.findLastIndex((part) => part.startsWith("<Calculator ")) + 1;
  const header = `{/* Imported from the WordPress page /tools/${page.file}/ by scripts/import-tools.mjs. */}\n\n`;
  const join2 = (list) => list.join("\n\n").replace(/\n{3,}/g, "\n\n");
  writeFileSync(join(outDir, `${page.id}.lead.mdx`), `${header}${join2(parts.slice(0, split))}\n`);
  writeFileSync(join(outDir, `${page.id}.mdx`), `${header}${join2(parts.slice(split))}\n`);
  page.newWords = wordCount(join2(parts).replace(/<[^>]+>|\]\([^)]*\)|[[\]*#>{}\\]/g, " "));
}

// The covers: the featured image each old page showed above its H1.
const coverLines = [];
for (const [id, c] of Object.entries(covers)) {
  if (!c) continue;
  const { width, height } = await dims(c.name);
  coverLines.push(`  ${JSON.stringify(id)}: { src: "/tools/${c.name}", width: ${width}, height: ${height}, alt: ${JSON.stringify(c.alt)} },`);
}
writeFileSync(
  join(root, "lib/content/tools/covers.ts"),
  `/** Generated by scripts/import-tools.mjs: the featured image each old tool page showed above its H1. */\nimport type { ToolId } from "./catalogue.ts";\n\nexport interface ToolCover {\n  src: string;\n  width: number;\n  height: number;\n  alt: string;\n}\n\nexport const toolCovers: Partial<Record<ToolId, ToolCover>> = {\n${coverLines.join("\n")}\n};\n`,
);

mkdirSync(join(root, "node_modules/.cache"), { recursive: true });
writeFileSync(
  join(root, "node_modules/.cache/tools-import.json"),
  JSON.stringify({ pages: pages.map((page) => ({ ...page, body: undefined })), links: [...new Set(linkReport)], images: Object.fromEntries(images) }, null, 2),
);
for (const page of pages) console.log(`${page.id}: ${page.oldWords} → ${page.newWords} words`, page.counts, page.applied.map((a) => `${a.before}→${a.after} ×${a.hits}`));
for (const line of new Set(linkReport)) console.log(`  link: ${line}`);
