#!/usr/bin/env node
/**
 * One-off import of the invoice templates page's assets (/نماذج-فواتير/ and
 * /en/sales-invoices/). Kept so the migration can be repeated.
 * Run: node scripts/invoice-templates-assets.mjs
 *
 * Downloads: the twelve Word and PDF files are copied byte for byte from the
 * saved site to public/wp-content/uploads/2023/10/, so their WordPress URLs keep
 * working (backlinks, bookmarks, GA4 file_download events), and each copy is
 * checked against its source's SHA-1.
 *
 * Images: the old page showed the top 1024×713 crop of each template. The
 * uncropped full-page renders (about 2552×3579) and the hero's two stacked
 * sheets are not in the download, so they are read from the live site's uploads
 * (a plain GET of public images), cached under node_modules/.cache, scaled to
 * at most 1600 px on the long side and written as WebP with their alpha.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
// sharp ships with Next.js; resolve it from there rather than adding a dependency.
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const UPLOADS = "wp-content/uploads/2023/10";
const savedDir = join(root, "getvom.com", UPLOADS);
const publicFiles = join(root, "public", UPLOADS);
const imageDir = join(root, "public/invoice-templates");
const cacheDir = join(root, "node_modules/.cache/invoice-templates");
const LIVE = `https://getvom.com/${UPLOADS}`;
const MAX_SIDE = 1600;

/** The six templates in the old page's order: output name, uncropped render, Word file, PDF file. */
const templates = [
  { id: "sales", image: "INV10_Mesa-de-trabajo-1-copy-3.png", docx: "INV-1-1.docx", pdf: "INV1.pdf" },
  { id: "tax", image: "INV10_Mesa-de-trabajo-1-copy.png", docx: "INV-2-.docx", pdf: "INV2.pdf" },
  { id: "e-invoice", image: "INV10_Mesa-de-trabajo-1-06.png", docx: "INV-3.docx", pdf: "INV3.pdf" },
  { id: "business", image: "INV10-02.png", docx: "INV-4.docx", pdf: "INV4.pdf" },
  { id: "quote", image: "INV10-04.png", docx: "INV-5.docx", pdf: "INV5.pdf" },
  { id: "company-quote", image: "INV10-05.png", docx: "INV-6.docx", pdf: "INV6.pdf" },
];
const hero = { id: "hero", image: "Header.png" };

/**
 * The record: a real tax invoice issued in VoM (sample data), the old features
 * page's «فاتورة-الكترونية.jpg». Its accent is the lime the sample company
 * picked in VoM's invoice designer; it is recoloured to brand teal, and the
 * sheet is cut from the top through its totals (QR, parties, lines, totals).
 */
const record = { id: "vom-invoice", src: "فاتورة-الكترونية.jpg", keep: 0.545 };
const TEAL = { h: 172, s: 0.877, v: 0.729 }; // #17BAA3 in HSV

const sha1 = (file) => createHash("sha1").update(readFileSync(file)).digest("hex");

function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, max ? d / max : 0, max / 255];
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m].map((n) => Math.round(n * 255));
}

async function recordInvoice() {
  const input = join(savedDir, record.src);
  const trimmed = await sharp(input).flatten({ background: "#ffffff" }).trim({ threshold: 6 }).toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  const cut = await sharp(trimmed)
    .extract({ left: 0, top: 0, width, height: Math.round(height * record.keep) })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { data, info } = cut;
  // The lime is the only saturated yellow-green on the sheet: move it to teal's
  // hue, scaling its value so the full lime lands on #17BAA3 and its
  // anti-aliased edges stay smooth.
  for (let i = 0; i < data.length; i += info.channels) {
    const [h, s, v] = rgbToHsv(data[i], data[i + 1], data[i + 2]);
    if (h < 65 || h > 140 || s < 0.25) continue;
    const [r, g, b] = hsvToRgb(TEAL.h, Math.min(1, s * 1.04), Math.min(1, v * 0.88));
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  const info2 = await sharp(data, { raw: info })
    .resize({ width: MAX_SIDE, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toFile(join(imageDir, `${record.id}.webp`));
  writeFileSync(
    join(imageDir, `${record.id}.webp.json`),
    `${JSON.stringify(
      {
        prompt: `Sourced, not generated: getvom.com/${UPLOADS}/${record.src}, a tax invoice issued in VoM with sample data (the old features page's image), its margin trimmed, cut from the top through its totals, its lime accent recoloured to brand teal #17BAA3, re-encoded to WebP q90 by scripts/invoice-templates-assets.mjs.`,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
  return { width: info2.width, height: info2.height, kb: Math.round(info2.size / 1024) };
}

function copyDownload(name) {
  const from = join(savedDir, name);
  const to = join(publicFiles, name);
  copyFileSync(from, to);
  if (sha1(from) !== sha1(to)) throw new Error(`${name}: the copy differs from the saved file`);
  return statSync(to).size;
}

function source(name) {
  const cached = join(cacheDir, name);
  if (!existsSync(cached)) execFileSync("curl", ["-sSfL", "-A", "Mozilla/5.0", "-o", cached, `${LIVE}/${name}`]);
  return cached;
}

async function webp(name, out) {
  const input = source(name);
  const info = await sharp(input)
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(join(imageDir, `${out}.webp`));
  writeFileSync(
    join(imageDir, `${out}.webp.json`),
    `${JSON.stringify(
      {
        prompt: `Sourced, not generated: getvom.com/${UPLOADS}/${name}, the uncropped original of an image on the old /نماذج-فواتير/ page, re-encoded to WebP q90 by scripts/invoice-templates-assets.mjs.`,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
  return { width: info.width, height: info.height, kb: Math.round(info.size / 1024) };
}

mkdirSync(publicFiles, { recursive: true });
mkdirSync(imageDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

const summary = [];
for (const template of templates) {
  const docx = copyDownload(template.docx);
  const pdf = copyDownload(template.pdf);
  const image = await webp(template.image, template.id);
  summary.push({ id: template.id, docx: [template.docx, docx], pdf: [template.pdf, pdf], image });
}
const heroImage = await webp(hero.image, hero.id);
const recordImage = await recordInvoice();

for (const row of summary) {
  console.log(
    `${row.id.padEnd(14)} ${row.image.width}×${row.image.height} ${row.image.kb} KB · ${row.docx[0]} ${row.docx[1]} B · ${row.pdf[0]} ${row.pdf[1]} B`,
  );
}
console.log(`${"hero".padEnd(14)} ${heroImage.width}×${heroImage.height} ${heroImage.kb} KB`);
console.log(`${record.id.padEnd(14)} ${recordImage.width}×${recordImage.height} ${recordImage.kb} KB`);
console.log("12 downloads copied to public/wp-content/uploads/2023/10/, SHA-1 matched.");
