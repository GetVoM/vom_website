#!/usr/bin/env node
/**
 * Checks the blog's URL contract against a running site.
 *
 *   node scripts/check-blog-urls.mjs [base URL, default http://localhost:3100]
 *
 * For every post, news, category and template row of docs/content/url-map.csv:
 * - keep: 200, the title and description the crawl recorded
 *   (docs/content/wp-url-inventory.csv), and an absolute canonical pointing at
 *   the page itself on https://getvom.com;
 * - redirect: one 301 to the listed target;
 * - retire: 404 or 410.
 * Known, deliberate differences are listed in EXCEPTIONS. Exits 1 on any failure.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const SITE = "https://getvom.com";

/** path → why its title or description differs from the crawl on purpose. */
const EXCEPTIONS = {
  "/en/accounting-software/choose-accounting-software/": "WordPress gave it the blog index's Arabic title and description; it now uses its own",
};

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

const urlMap = parseCsv(readFileSync(join(root, "docs/content/url-map.csv"), "utf8")).filter((r) => ["post", "news", "category", "template"].includes(r.type));
const inventory = new Map(parseCsv(readFileSync(join(root, "docs/content/wp-url-inventory.csv"), "utf8")).map((r) => [r.path_decoded, r]));
const norm = (text) => (text ?? "").replace(/\s+/g, " ").trim();
const decode = (text) => { try { return decodeURI(text); } catch { return text; } };

const failures = [];
const counts = { keep: 0, redirect: 0, retire: 0, exceptions: 0 };

async function check(row) {
  const path = row.old_path_decoded;
  const response = await fetch(`${base}${encodeURI(path)}`, { redirect: "manual" });
  const fail = (why) => failures.push(`${row.proposed_action.padEnd(8)} ${path}  ${why}`);

  if (row.proposed_action === "redirect") {
    counts.redirect++;
    const location = decode(response.headers.get("location") ?? "").replace(base, "").replace(SITE, "");
    if (response.status !== 301) fail(`status ${response.status}, expected 301`);
    else if (location !== row.proposed_target) fail(`redirects to ${location}, expected ${row.proposed_target}`);
    return;
  }
  if (row.proposed_action === "retire") {
    counts.retire++;
    if (![404, 410].includes(response.status)) fail(`status ${response.status}, expected 404 or 410`);
    return;
  }
  if (row.proposed_action !== "keep") return;
  counts.keep++;
  if (response.status !== 200) return fail(`status ${response.status}, expected 200`);
  const head = parse(await response.text()).querySelector("head");
  const title = norm(head?.querySelector("title")?.text);
  const description = norm(head?.querySelector('meta[name="description"]')?.getAttribute("content"));
  const canonical = decode(head?.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "");
  if (canonical !== `${SITE}${path}`) fail(`canonical ${canonical || "missing"}`);
  if (!title) fail("no title");
  if (!description) fail("no description");
  const crawl = inventory.get(path);
  if (!crawl) return;
  if (EXCEPTIONS[path]) { counts.exceptions++; return; }
  if (norm(crawl.title) && title !== norm(crawl.title)) fail(`title "${title}" ≠ crawl "${norm(crawl.title)}"`);
  if (norm(crawl.meta_description) && description !== norm(crawl.meta_description)) fail(`description differs from the crawl`);
}

let next = 0;
await Promise.all(Array.from({ length: 8 }, async () => { while (next < urlMap.length) await check(urlMap[next++]); }));

console.log(`Checked ${urlMap.length} post, news, category and template rows against ${base}`);
console.log(`  keep ${counts.keep} · redirect ${counts.redirect} · retire ${counts.retire} · deliberate exceptions ${counts.exceptions}`);
for (const [path, why] of Object.entries(EXCEPTIONS)) console.log(`  exception: ${path} (${why})`);
if (failures.length) {
  console.log(`\n${failures.length} FAILED`);
  for (const line of failures.sort()) console.log(`  ${line}`);
  process.exit(1);
}
console.log("\nAll passed.");
