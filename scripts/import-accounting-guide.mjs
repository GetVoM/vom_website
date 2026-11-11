#!/usr/bin/env node
/**
 * One-off import of the accounting-software pillar `/برنامج-محاسبة/` from the
 * saved WordPress page (getvom.com/accounting_app/index.html) into
 * content/accounting-guide.mdx. Kept so the migration can be repeated
 * (docs/architecture.md §4). Run: node scripts/import-accounting-guide.mjs [--images]
 *
 * It keeps the body's text, its order, headings, lists, links, tables, images
 * and FAQ one to one (owner, 2026-11-11). Character fixes only: Arabic
 * presentation forms become ordinary letters, invisible clutter goes, and the
 * typos in `typos` below are corrected (each one is logged). Layout changes:
 * - the old inline trial block becomes <TrialCard />, the summary's list sits in <KeyPoints>;
 * - the two AI-assistant prompt strips (pictures of text) become <PromptChips> as real text;
 * - the sector list becomes <Sectors> with one <Sector id> per entry, each link checked
 *   against the sector pages' paths in lib/i18n/routes.ts;
 * - the closing H2 «الكلمة الأخيرة» is exported as `closing` for the page's close band,
 *   its trailing trial link as `closingCta`;
 * - an image shown twice in a row on the old page is shown once; utm parameters go;
 * - the WordPress hero, contents box and lead form are not part of the body (the page
 *   template renders the hero and the booking line).
 *
 * --images writes the old page's images to public/accounting-guide/ as WebP (at most
 * 1600 px wide) with a provenance sidecar. Screenshots on the old neon-green frame
 * lose the frame (it is not a brand colour); each screen keeps its own window chrome.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "getvom.com/accounting_app/index.html");
const outFile = join(root, "content/accounting-guide.mdx");
const imageDir = join(root, "public/accounting-guide");
const uploads = join(root, "getvom.com");
const MAX_WIDTH = 1600;

const FAQ_HEADING = /أسئل|اسئل/;
const CLOSING_HEADING = /^الكلمة الأخيرة/;
const BOOKING_LINE = /احجز مكالمة امتثال مجانية/;
const TRIAL_LINE = /^يعتبر فوم من أفضل برامج المحاسبة المعتمدة/;
const SIGNUP = /app\.getvom\.com\/ar\/company-register-show/;

/** Character-level typos on the old page: wrong letter or misplaced diacritic. */
const typos = [
  ["يعبر فوم", "يعتبر فوم"],
  ["ومٌعتمَد", "ومُعتمَد"],
  ["لـ زاكتا", "لـ زاتكا"],
  ["تتفادها", "تتفاداها"],
  ["وحتًّى", "وحتَّى"], // tanween fath where a fatha belongs
];
const typoHits = Object.fromEntries(typos.map(([from]) => [from, 0]));

/** Old upload file → output image (ASCII name) or a text replacement. */
const imageMap = {
  "مثال-تطبيقي-كيف-يطبق-فوم-هذه-المعايير.png": { name: "dashboard", frame: "green" },
  "فوم-أحد-الحلول-السحابية.png": { name: "features-grid", frame: "green" },
  "مراة-رقمية-لعملك.png": { name: "overview", frame: "green" },
  "لماذا-بدا-كثيرون-يثقون-بفوم.png": { name: "tax-settings", frame: "flat" },
  "تطبيق-المرحلة-الثانية-من-الفوترة-الإلكترونية.png": { name: "reports", frame: "green" },
  "وش-تقدر-تسوى-مع-فوم.png": { name: "inventory", frame: "none" },
  "قوالب-محاسبية-جاهزة-بصيغة-Excel.png": { name: "excel-templates", frame: "none" },
  // The AI assistant's prompt strips: transcribed from the images, word for word.
  "توقع-المبيعات.png": { chip: "ماهو المتوقع ان تكون مبيعاتي خلال شهر يونيو 2025 بناءً على مبيعات ابريل 2025 ومايو 2025" },
  "تغير-المبيعات.png": { chip: "كيف تغيرت المبيعات بين فبراير وأبريل؟" },
};

/** Character fixes in the old alt texts (a stray hyphen, a missing hamza). */
const altFixes = {
  "فوم-أحد الحلول السحابية": "فوم أحد الحلول السحابية",
  "مراة رقمية لعملك": "مرآة رقمية لعملك",
  "لماذا بدا كثيرون يثقون بفوم": "لماذا بدأ كثيرون يثقون بفوم",
};

/**
 * Link targets that were wrong on the old page, by link text: this trial
 * link pointed at the homepage (with a chatgpt.com utm tag).
 */
const linkFixes = {
  "ابدأ تجربتك المجانية 7 أيام بدون بطاقة بنكية": "https://app.getvom.com/ar/company-register-show",
  // The Arabic invoice templates page is at its WordPress path (owner, 2026-11-11).
  "استعرض نماذج الفواتير المجانية": "/نماذج-فواتير/",
};

/** Chapter H3s that open a numbered option get a line icon (drawn in CSS). */
const h3Icons = [
  [/^1\. منشأة ناشئة/, "seed"],
  [/^2\. منشأة قائمة/, "building"],
  [/^3\. منشأة تهدف/, "shield"],
  [/^1\. قوالب محاسبية/, "sheet"],
  [/^2\. باقة ڤوم المجانية/, "gift"],
  [/^3\. نماذج فواتير/, "invoice"],
];

// ---------------------------------------------------------------- sector paths

/** Arabic sector path → sector id, read from lib/i18n/routes.ts (the one source of truth). */
const sectorByPath = new Map();
{
  const routes = readFileSync(join(root, "lib/i18n/routes.ts"), "utf8");
  const block = routes.slice(routes.indexOf("export const sectorPaths"));
  for (const m of block.matchAll(/^\s+"?([a-z-]+)"?: \{ ar: "([^"]+)"/gm)) sectorByPath.set(m[2], m[1]);
  if (sectorByPath.size !== 15) throw new Error(`expected 15 sector paths in routes.ts, found ${sectorByPath.size}`);
}

// ---------------------------------------------------------------- text

function cleanText(text) {
  let out = text
    .replace(/[\uFB50-\uFDFF\uFE70-\uFEFF]/g, (ch) => (ch === "\uFEFF" ? "" : ch.normalize("NFKC")))
    .replace(/[\u200B\u2060]/g, "")
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/[ \t\r\n]+/g, " ");
  for (const [from, to] of typos) {
    if (out.includes(from)) {
      typoHits[from] += out.split(from).length - 1;
      out = out.replaceAll(from, to);
    }
  }
  return out;
}

const escapeMd = (text) => text.replace(/[\\*_[\]<>{}`~|]/g, (ch) => `\\${ch}`);
const escapeJsx = (text) => text.replace(/[{}<>]/g, (ch) => `{${JSON.stringify(ch)}}`);

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

// ---------------------------------------------------------------- links

const links = [];

function normaliseHref(raw) {
  if (!raw) return null;
  let href = raw.trim().replace(/&amp;/g, "&");
  if (href.startsWith("#")) return null;
  if (href.startsWith("//")) href = `https:${href}`;
  href = href.replace(/^https?:\/\/(www\.)?getvom\.com(?=\/|$)/, "");
  // utm parameters (the old page carried ?utm_source=chatgpt.com) are dropped.
  href = href.replace(/[?&]utm_[a-z]+=[^&#]*/g, "").replace(/^([^?]*)&/, "$1?");
  if (href.startsWith("/")) {
    try {
      href = decodeURI(href);
    } catch {
      /* keep as is */
    }
  }
  if (href === "") href = "/";
  links.push(href);
  return href;
}

const isExternal = (href) => /^https?:\/\//.test(href) || href.startsWith("mailto:");
const mdDestination = (href) => (/[\s()]/.test(href) ? `<${href.replace(/[<>]/g, encodeURIComponent)}>` : href);

// ---------------------------------------------------------------- images

const images = new Map(); // output name → { file, width, height, frame }
const seenFiles = new Set();

function imageFile(img) {
  const src = img.getAttribute("data-lazy-src") || img.getAttribute("src") || "";
  if (!src || src.startsWith("data:")) return null;
  return decodeURIComponent(src.replace(/^https?:\/\/(www\.)?getvom\.com/, ""));
}

/** A <Figure>, a chip { q, label }, or "" for a repeated or unknown image. */
function figure(img) {
  const path = imageFile(img);
  if (!path) return "";
  const file = path.split("/").pop();
  const entry = imageMap[file];
  if (!entry) throw new Error(`unmapped image ${file}`);
  if (seenFiles.has(file)) return "";
  seenFiles.add(file);
  const rawAlt = cleanText(img.getAttribute("alt") || "").trim();
  const alt = altFixes[rawAlt] ?? rawAlt;
  if (entry.chip) return { q: entry.chip, label: alt };
  const width = parseInt(img.getAttribute("width") || "0", 10);
  const height = parseInt(img.getAttribute("height") || "0", 10);
  images.set(entry.name, { file: join(uploads, path), width, height, frame: entry.frame });
  return { figure: entry.name, alt };
}

// ---------------------------------------------------------------- inline

function isBoldSpan(el) {
  const style = (el.getAttribute("style") || "").replace(/\s/g, "");
  return /font-weight:(bold|[6-9]00)/.test(style);
}

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
      out += "<br />";
      continue;
    }
    const inner = inline(child, ctx, mode);
    if (tag === "strong" || tag === "b" || (tag === "span" && isBoldSpan(child))) {
      out += wrapTrimmed(inner, "<strong>", "</strong>");
    } else if (tag === "em" || tag === "i") {
      out += wrapTrimmed(inner, "<em>", "</em>");
    } else if (tag === "a") {
      const href = linkFixes[cleanText(child.text).trim()] ?? normaliseHref(child.getAttribute("href"));
      if (!href || !inner.trim()) {
        out += inner;
      } else if (mode === "md") {
        out += wrapTrimmed(inner, "[", `](${mdDestination(href)})`);
      } else {
        const attrs = isExternal(href) ? ` target="_blank" rel="noopener"` : "";
        out += wrapTrimmed(inner, `<a href=${JSON.stringify(href)}${attrs}>`, "</a>");
      }
    } else if (["ul", "ol", "table", "p", "div"].includes(tag)) {
      out += ` ${inner} `;
    } else {
      out += inner;
    }
  }
  return out;
}

const tidy = (s) =>
  s
    // WordPress closed some list items with a stray line break, inside or after a link.
    .replace(/\s*<br \/>\s*(?=\]\()/g, "")
    .replace(/\s*<br \/>\s*$/g, "")
    .replace(/<\/strong>(\s*)<strong>/g, "$1")
    .replace(/<\/em>(\s*)<em>/g, "$1")
    .replace(/[ ]{2,}/g, " ")
    .replace(/:(?=[\u0621-\u064A])/g, ": ")
    .trim();

// ---------------------------------------------------------------- blocks

const items = (list) => list.childNodes.filter((li) => li.nodeType === 1 && li.rawTagName.toLowerCase() === "li");

function listMd(list, ctx) {
  const ordered = list.rawTagName.toLowerCase() === "ol";
  return items(list)
    .map((li, i) => `${ordered ? `${i + 1}.` : "-"} ${guardLineStart(tidy(inline(li, ctx)))}`)
    .join("\n");
}

function listJsx(list, ctx) {
  const tag = list.rawTagName.toLowerCase();
  return `<${tag}>\n${items(list)
    .map((li) => `      <li>${tidy(inline(li, ctx, "jsx"))}</li>`)
    .join("\n")}\n    </${tag}>`;
}

/**
 * Sector entries: the old page pasted its sector list as 15 one-item lists, each
 * linking one sector page. Returns the entries' MDX, or null when the list is
 * anything else.
 */
function sectorEntries(list, ctx) {
  const entries = items(list);
  const ids = entries.map((li) => {
    const a = li.querySelector("a");
    const href = a && decodeURI(a.getAttribute("href").replace(/^https?:\/\/(www\.)?getvom\.com/, ""));
    return href ? sectorByPath.get(href) : undefined;
  });
  if (ids.every((id) => !id)) return null;
  if (!ids.every(Boolean)) throw new Error(`sector list entry without a sector link: ${ids}`);
  return entries.map((li, i) => ({ id: ids[i], mdx: `<Sector id="${ids[i]}">\n\n${guardLineStart(tidy(inline(li, ctx)))}\n\n</Sector>` }));
}

/** The old ✅/❌ emoji become drawn marks (with «نعم»/«لا» for screen readers); the words stay. */
const marks = (jsx) => jsx.replace(/✅\s*/g, '<Mark v="yes" /> ').replace(/❌\s*/g, '<Mark v="no" /> ');

function cellJsx(cell, ctx) {
  const shell = parse("<span></span>").firstChild;
  for (const c of cell.childNodes) shell.appendChild(c.clone());
  return marks(tidy(inline(shell, ctx, "jsx")));
}

function tableJsx(table, ctx) {
  const rows = table.querySelectorAll("tr");
  const cells = (tr) => tr.childNodes.filter((c) => c.nodeType === 1 && /^(td|th)$/i.test(c.rawTagName));
  const first = cells(rows[0]);
  const headerRow = first.every((c) => c.querySelector("b,strong")?.text.trim() === c.text.trim());
  const labels = first.map((c) => cleanText(c.text).trim());
  const head = headerRow ? `<thead><tr>${first.map((c) => `<th>${cellJsx(c, ctx).replace(/<\/?strong>/g, "")}</th>`).join("")}</tr></thead>\n` : "";
  // Each cell carries its column's name, so phones can read a row as label/value pairs.
  const label = (i) => (headerRow ? ` data-label=${JSON.stringify(labels[i])}` : "");
  const body = rows
    .slice(headerRow ? 1 : 0)
    .map((tr) => `<tr>${cells(tr).map((c, i) => (headerRow && i === 0 ? `<th>${cellJsx(c, ctx)}</th>` : `<td${label(i)}>${cellJsx(c, ctx)}</td>`)).join("")}</tr>`)
    .join("\n");
  return { jsx: `<Table>\n${head}<tbody>\n${body}\n</tbody>\n</Table>`, rows: rows.length - (headerRow ? 1 : 0) };
}

function collectBlocks(pageRoot) {
  const blocks = [];
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
      else if (["figure", "div", "blockquote", "span"].includes(t)) pushContent(c);
      else if (!["script", "style", "noscript", "svg"].includes(t)) blocks.push({ kind: "p", node: c });
    }
  };
  for (const widget of pageRoot.querySelectorAll(".elementor-widget")) {
    const cls = widget.getAttribute("class") || "";
    if (/elementor-widget-heading/.test(cls)) {
      const h = widget.querySelector("h1,h2,h3,h4,h5,h6");
      if (h) blocks.push({ kind: "heading", level: Number(h.rawTagName[1]), node: h });
    } else if (/elementor-widget-text-editor/.test(cls)) {
      pushContent(widget.querySelector(".elementor-widget-container") || widget);
    } else {
      throw new Error(`unhandled widget: ${cls}`);
    }
  }
  return blocks;
}

// ---------------------------------------------------------------- page

function convert() {
  const html = readFileSync(source, "utf8");
  const doc = parse(html, { comment: false });
  const pageRoot = doc.querySelector('[data-elementor-type="wp-page"]');
  const blocks = collectBlocks(pageRoot);

  const out = [];
  const closing = [];
  let closingCta = null;
  let h2 = 0;
  let section = "intro"; // intro | body | faq | closing
  let faqOpen = false;
  let questionOpen = false;
  let keyPointsDone = false;
  let pendingTrial = null;
  const counts = { h2: 0, h3: 0, h4: 0, tables: [], figures: 0, chips: 0, sectors: 0, questions: 0 };

  let sectorBuffer = [];
  const flushSectors = () => {
    if (!sectorBuffer.length) return;
    const ids = sectorBuffer.map((e) => e.id);
    if (new Set(ids).size !== 15 || ids.length !== 15) throw new Error(`sector list should name 15 distinct sectors, got ${ids}`);
    out.push(`<Sectors>\n\n${sectorBuffer.map((e) => e.mdx).join("\n\n")}\n\n</Sectors>`);
    counts.sectors = ids.length;
    sectorBuffer = [];
  };

  const closeFaq = () => {
    if (questionOpen) out.push("</Question>");
    if (faqOpen) out.push("</Faq>");
    faqOpen = questionOpen = false;
  };

  const emitImages = (pending) => {
    let chips = [];
    const flushChips = () => {
      if (!chips.length) return;
      // The two strips sit in consecutive paragraphs on the old page: one group of chips.
      const previous = out.at(-1)?.match(/^<PromptChips items=\{(.*)\} \/>$/);
      if (previous) chips = [...JSON.parse(previous[1]), ...chips];
      if (previous) out.pop();
      out.push(`<PromptChips items={${JSON.stringify(chips)}} />`);
      chips = [];
    };
    for (const img of pending) {
      const result = figure(img);
      if (!result) continue;
      if (result.q) {
        chips.push(result);
        counts.chips += 1;
        continue;
      }
      flushChips();
      const image = images.get(result.figure);
      // Wide screenshots run the reading column's full width; the rest keep the guide figure's measure.
      const wide = image.width >= 1400 && image.width / image.height >= 1.8 ? " wide" : "";
      out.push(`<Figure src="/accounting-guide/${result.figure}.webp" width={${image.width}} height={${image.height}} alt=${JSON.stringify(result.alt)}${wide} />`);
      counts.figures += 1;
    }
    flushChips();
  };

  for (const block of blocks) {
    const ctx = { pendingImages: [] };
    const sectors = block.kind === "list" && section !== "closing" ? sectorEntries(block.node, ctx) : null;
    if (sectors) {
      sectorBuffer.push(...sectors);
      continue;
    }
    flushSectors();
    if (block.kind === "heading") {
      const plain = cleanText(block.node.text).trim();
      const text = tidy(inline(block.node, ctx, "jsx")).replace(/<\/?strong>/g, "");
      if (!text) continue;
      if (block.level <= 2) {
        closeFaq();
        h2 += 1;
        counts.h2 += 1;
        if (CLOSING_HEADING.test(plain)) {
          section = "closing";
          closing.push(`<h2 id="s-${h2}">${text}</h2>`);
          continue;
        }
        section = FAQ_HEADING.test(plain) ? "faq" : "body";
        out.push(`<h2 id="s-${h2}">${text}</h2>`);
      } else if (section === "faq" && block.level === 3) {
        if (!faqOpen) out.push("<Faq>");
        if (questionOpen) out.push("</Question>");
        out.push(`<Question q={${JSON.stringify(plain)}}>`);
        faqOpen = questionOpen = true;
        counts.questions += 1;
      } else {
        const icon = block.level === 3 ? h3Icons.find(([re]) => re.test(plain))?.[1] : undefined;
        out.push(`<h${block.level}${icon ? ` data-icon="${icon}"` : ""}>${text}</h${block.level}>`);
        counts[`h${block.level}`] = (counts[`h${block.level}`] ?? 0) + 1;
      }
    } else if (block.kind === "p") {
      const plain = cleanText(block.node.text).trim();
      if (!plain || BOOKING_LINE.test(plain)) continue;
      if (section === "closing") {
        let jsx = tidy(inline(block.node, ctx, "jsx"));
        // The closing paragraph ends on the trial link; the band shows it as its button.
        const trailing = jsx.match(/\s*<a href="(https:\/\/app\.getvom\.com\/ar\/company-register-show)"[^>]*>([^<]+)<\/a>\s*\.?$/);
        if (trailing) {
          closingCta = trailing[2].trim();
          jsx = jsx.slice(0, trailing.index).trim();
        }
        closing.push(`<p>${jsx}</p>`);
        continue;
      }
      // The old inline trial block: the hero line, then a paragraph that is only the trial link.
      if (TRIAL_LINE.test(plain)) {
        pendingTrial = plain;
        continue;
      }
      // A paragraph that is only a link (and its closing full stop).
      const linkText = block.node.querySelectorAll("a").length === 1 ? cleanText(block.node.querySelector("a").text).trim() : null;
      const onlyLink = linkText !== null && plain.replace(/[.،]$/, "") === linkText;
      if (pendingTrial && onlyLink && SIGNUP.test(block.node.querySelector("a").getAttribute("href"))) {
        out.push(`<TrialCard title=${JSON.stringify(pendingTrial)} cta=${JSON.stringify(linkText)} />`);
        pendingTrial = null;
        continue;
      }
      if (pendingTrial) throw new Error("trial line without its trial link");
      let md = guardLineStart(tidy(inline(block.node, ctx)));
      // FAQ answers were bold from end to end on the old page (styling, not emphasis).
      if (section === "faq" && questionOpen) md = md.replace(/<\/?strong>/g, "");
      // A line that is only <strong>…</strong> is a JSX block to MDX (no <p>): write it as markdown bold.
      const whole = md.match(/^<strong>([\s\S]*)<\/strong>$/);
      if (whole && !whole[1].includes("<strong>")) md = `**${whole[1]}**`;
      if (md && md !== "<br />") out.push(md);
    } else if (block.kind === "list") {
      if (section === "closing") {
        closing.push(listJsx(block.node, ctx));
        continue;
      }
      if (h2 === 1 && !keyPointsDone) {
        out.push(`<KeyPoints>\n\n${listMd(block.node, ctx)}\n\n</KeyPoints>`);
        keyPointsDone = true;
      } else {
        out.push(listMd(block.node, ctx));
      }
    } else if (block.kind === "table") {
      const { jsx, rows } = tableJsx(block.node, ctx);
      out.push(jsx);
      counts.tables.push(rows);
    } else if (block.kind === "img") {
      ctx.pendingImages.push(block.node);
    }
    emitImages(ctx.pendingImages);
  }
  flushSectors();
  closeFaq();
  if (!closingCta) throw new Error("closing trial link not found");

  const body = out.join("\n\n").replace(/\n{3,}/g, "\n\n");
  const header = "{/* Imported from the WordPress page /برنامج-محاسبة/ by scripts/import-accounting-guide.mjs. */}\n\n";
  const closingExport = `export const closing = (\n  <>\n    ${closing.join("\n    ")}\n  </>\n);\n\nexport const closingCta = ${JSON.stringify(closingCta)};\n`;
  writeFileSync(outFile, `${header}${body}\n\n${closingExport}`);

  const oldWords = pageRoot.text.replace(/\s+/g, " ").trim().split(" ").length;
  return { counts, oldWords, typoHits, links: [...new Set(links)] };
}

// ---------------------------------------------------------------- run

mkdirSync(dirname(outFile), { recursive: true });
mkdirSync(join(root, "node_modules/.cache"), { recursive: true });
const summary = convert();
summary.images = Object.fromEntries([...images].map(([name, image]) => [name, { ...image, file: image.file.replace(`${root}/`, "") }]));
writeFileSync(join(root, "node_modules/.cache/accounting-guide-import.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ ...summary.counts, oldWords: summary.oldWords, typoHits: summary.typoHits, images: images.size, links: summary.links.length }, null, 2));

{
  const require = createRequire(import.meta.url);
  // sharp ships with Next.js; resolve it from there rather than adding a dependency.
  const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));
  const GREEN = "#0bf268";
  const writeImages = process.argv.includes("--images");
  mkdirSync(imageDir, { recursive: true });
  for (const [name, image] of images) {
    const target = join(imageDir, `${name}.webp`);
    if (writeImages || !existsSync(target)) {
      let pipeline = sharp(image.file);
      if (image.frame === "green") {
        // Cut the neon frame, then 3 px more so its anti-aliased edge goes too.
        // Flatten into its own buffer first: chained, trim() reads the pre-flatten alpha.
        const flat = await sharp(image.file).flatten({ background: GREEN }).removeAlpha().png().toBuffer();
        const trimmed = await sharp(flat).trim({ background: GREEN, threshold: 40 }).png().toBuffer({ resolveWithObject: true });
        const { width, height } = trimmed.info;
        pipeline = sharp(trimmed.data).extract({ left: 3, top: 3, width: width - 6, height: height - 6 });
      } else if (image.frame === "flat") {
        pipeline = sharp(await sharp(image.file).flatten({ background: "#ffffff" }).trim({ threshold: 6 }).png().toBuffer());
      }
      await pipeline.flatten({ background: "#ffffff" }).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 90, effort: 6 }).toFile(target);
      const sourcePath = image.file.replace(`${uploads}/`, "");
      writeFileSync(
        `${target}.json`,
        `${JSON.stringify(
          {
            prompt: `Sourced, not generated: getvom.com/${sourcePath} from the old /برنامج-محاسبة/ page${image.frame === "green" ? ", its neon-green frame trimmed" : ""}, re-encoded to WebP q90 by scripts/import-accounting-guide.mjs.`,
            createdAt: new Date().toISOString(),
          },
          null,
          2,
        )}\n`,
      );
      console.log(`  wrote ${name}.webp`);
    }
    const { width, height } = await sharp(target).metadata();
    image.out = { width, height };
  }
  // Figure sizes in the MDX follow the written files.
  let mdx = readFileSync(outFile, "utf8");
  for (const [name, image] of images) {
    mdx = mdx.replace(new RegExp(`(src="/accounting-guide/${name}\\.webp" )width=\\{\\d+\\} height=\\{\\d+\\}`), `$1width={${image.out.width}} height={${image.out.height}}`);
  }
  writeFileSync(outFile, mdx);
}
if (!existsSync(outFile)) throw new Error("no output");
