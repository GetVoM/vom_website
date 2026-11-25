#!/usr/bin/env node
/**
 * Pre-optimizes the raster images in public/ into public/images/optimized/, so the
 * site serves static files and never calls Vercel's image optimizer
 * (next.config.ts sets images.unoptimized). Run after adding or changing an image:
 *
 *   pnpm optimize:images
 *
 * - Width: twice the widest the image renders on the site (scripts/image-widths.json),
 *   at most 2560 px, never upscaled. An image missing from that file is sized for the
 *   1280 px container, with a warning, until it is measured.
 * - Images shown 480 CSS px wide or more also get 640 and 1280 px copies for srcset,
 *   where those are meaningfully smaller than the full file.
 * - A file can ask for extra widths in image-widths.json (`extra`), for a use the
 *   measurement cannot see, such as a CSS background drawn small.
 * - WebP at quality 80 (a file can be given its own quality in image-widths.json),
 *   transparency kept, EXIF orientation applied, metadata stripped. A PNG keeps the
 *   smaller of lossy and lossless WebP, so flat logos never grow.
 * - Outputs mirror the source path: /features/x.png becomes
 *   /images/optimized/features/x.webp, x-640w.webp and x-1280w.webp. The originals stay
 *   where they are, so every image URL that already exists keeps working.
 * - Left alone: SVGs (served as they are), /og/ (share images stay PNG), /wp-content/
 *   (WordPress files), the square logo in the JSON-LD, and this script's own output.
 * - lib/images/manifest.json lists every output with its size and a hash of its source
 *   and settings: a rerun encodes only what changed, and deletes the outputs of images
 *   that are gone. The site reads that manifest (lib/images/index.ts).
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(root, "public");
const OUT_PREFIX = "/images/optimized";
const OUT_DIR = join(PUBLIC, OUT_PREFIX);
const MANIFEST = join(root, "lib/images/manifest.json");
const WIDTHS_FILE = join(root, "scripts/image-widths.json");

const QUALITY = 80;
const MAX_WIDTH = 2560;
/** The site's content container: the width assumed for an image not yet measured. */
const DEFAULT_RENDERED = 1280;
/** Shown at least this wide (CSS px), an image also gets the smaller copies below. */
const VARIANT_FROM = 480;
const VARIANT_WIDTHS = [640, 1280];
/** A copy is made only when it is this much narrower than the full file. */
const VARIANT_GAP = 0.85;
const SKIP = [/^\/og\//, /^\/wp-content\//, /^\/images\/optimized\//, /^\/brand\/vom-mark-512\.png$/];
const RASTER = /\.(png|jpe?g|webp|avif)$/i;
// Part of every hash, so changing a rule re-encodes everything.
const SETTINGS = JSON.stringify({ QUALITY, MAX_WIDTH, DEFAULT_RENDERED, VARIANT_FROM, VARIANT_WIDTHS, VARIANT_GAP, sharp: sharp.versions.sharp });

const { widths: rendered, quality: qualityOverrides = {}, extra: extraWidths = {} } = JSON.parse(readFileSync(WIDTHS_FILE, "utf8"));
const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};

const sources = readdirSync(PUBLIC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && RASTER.test(entry.name))
  .map((entry) => `/${relative(PUBLIC, join(entry.parentPath, entry.name)).split("\\").join("/")}`)
  .filter((path) => !SKIP.some((pattern) => pattern.test(path)))
  .sort();

/** The output path for a source, with an optional width suffix. */
const outPath = (source, width) => `${OUT_PREFIX}${source.replace(RASTER, "")}${width ? `-${width}w` : ""}.webp`;

/** WebP of the source at `width`; for a PNG, the smaller of lossy and lossless. */
async function encode(file, width, quality, png) {
  const resized = () => sharp(file).rotate().resize({ width, withoutEnlargement: true });
  const lossy = await resized().webp({ quality, alphaQuality: 100, effort: 6 }).toBuffer({ resolveWithObject: true });
  if (!png) return lossy;
  const lossless = await resized().webp({ lossless: true, effort: 6 }).toBuffer({ resolveWithObject: true });
  return lossless.data.length < lossy.data.length ? lossless : lossy;
}

const manifest = {};
const unmeasured = [];
let encoded = 0;
let skipped = 0;

async function optimize(source) {
  const file = join(PUBLIC, source);
  const measured = rendered[source];
  if (!measured) unmeasured.push(source);
  const quality = qualityOverrides[source] ?? QUALITY;
  const extra = extraWidths[source] ?? [];
  const hash = createHash("sha1")
    .update(readFileSync(file))
    .update(`${SETTINGS}|${measured ?? DEFAULT_RENDERED}|${quality}|${extra.join(",")}`)
    .digest("hex")
    .slice(0, 16);

  const before = previous[source];
  const outputs = before ? [before.src, ...before.variants.map((v) => v.src)] : [];
  if (before?.hash === hash && outputs.every((path) => existsSync(join(PUBLIC, path)))) {
    manifest[source] = before;
    skipped++;
    return;
  }

  const meta = await sharp(file).rotate().metadata();
  // .rotate() reports the stored size; an EXIF rotation of 90/270 degrees swaps it.
  const swap = (meta.orientation ?? 1) >= 5;
  const intrinsic = swap ? meta.height : meta.width;
  const target = Math.min(intrinsic, MAX_WIDTH, 2 * (measured ?? DEFAULT_RENDERED));
  const png = meta.format === "png";

  const full = await encode(file, target, quality, png);
  mkdirSync(dirname(join(PUBLIC, outPath(source))), { recursive: true });
  writeFileSync(join(PUBLIC, outPath(source)), full.data);

  const variants = [];
  const widths = [...((measured ?? DEFAULT_RENDERED) >= VARIANT_FROM ? VARIANT_WIDTHS : []), ...extra];
  {
    for (const width of [...new Set(widths)].sort((a, b) => a - b)) {
      if (width >= full.info.width * VARIANT_GAP) continue;
      const copy = await encode(file, width, quality, png);
      writeFileSync(join(PUBLIC, outPath(source, width)), copy.data);
      variants.push({ width: copy.info.width, height: copy.info.height, src: outPath(source, width), bytes: copy.data.length });
    }
  }

  manifest[source] = {
    src: outPath(source),
    width: full.info.width,
    height: full.info.height,
    bytes: full.data.length,
    sourceBytes: readFileSync(file).length,
    variants,
    hash,
  };
  encoded++;
}

// sharp spreads each image over the cores; a few at a time keeps them all busy.
const queue = [...sources];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) await optimize(queue.shift());
  }),
);

// Remove outputs no manifest entry names (their source was deleted or renamed).
const keep = new Set(Object.values(manifest).flatMap((entry) => [entry.src, ...entry.variants.map((v) => v.src)]));
let removed = 0;
if (existsSync(OUT_DIR)) {
  for (const entry of readdirSync(OUT_DIR, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const path = `/${relative(PUBLIC, join(entry.parentPath, entry.name)).split("\\").join("/")}`;
    if (!keep.has(path)) {
      rmSync(join(PUBLIC, path));
      removed++;
    }
  }
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((key) => [key, manifest[key]]));
writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);

const kb = (n) => `${Math.round(n / 1024).toLocaleString("en")} KB`;
const entries = Object.values(sorted);
console.log(
  `${sources.length} images: ${encoded} encoded, ${skipped} unchanged, ${removed} stale outputs removed. ` +
    `Full-size files ${kb(entries.reduce((s, e) => s + e.bytes, 0))} from ${kb(entries.reduce((s, e) => s + e.sourceBytes, 0))} of sources; ` +
    `${entries.reduce((s, e) => s + e.variants.length, 0)} smaller copies.`,
);
if (unmeasured.length) {
  console.warn(`Not in scripts/image-widths.json, sized for ${DEFAULT_RENDERED} px: ${unmeasured.join(", ")}`);
}
