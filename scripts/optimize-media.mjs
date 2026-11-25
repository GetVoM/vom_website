#!/usr/bin/env node
/**
 * Makes smaller copies of the blog's images on the media domain (Cloudflare R2) and
 * uploads them beside the originals, so posts get a srcset without Vercel's image
 * optimizer (next.config.ts sets images.unoptimized). Writes the list of what exists
 * to lib/images/media-manifest.json, which the site reads (lib/images/index.ts).
 *
 *   pnpm optimize:media            dry run: encodes everything, uploads nothing
 *   pnpm optimize:media --upload   uploads the new copies and updates the manifest
 *
 * Run it after publishing posts, then deploy: until an image is in the manifest it
 * is served as uploaded (at most 1600 px wide), which still works.
 * - Every image a published post uses (cover or body) gets 640 and 1280 px WebP
 *   copies (quality 80), where narrower than the original; a cover also gets 384 px
 *   for the post lists, and a JPEG share image at most 1200 px wide (not every social
 *   network reads WebP), made from the WordPress original beside it when there is one.
 * - Copies are named after the original: <name>-w640.webp, <name>-og.jpg. An object
 *   already in the bucket is never overwritten; originals are only read.
 * - An image already in the manifest is skipped, so a rerun only handles new images
 *   (--force redoes them all).
 * Needs NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (posts are read with
 * the public key) and, to upload, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 * and R2_BUCKET, all in .env.local.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(root, "lib/images/media-manifest.json");
const UPLOAD = process.argv.includes("--upload");
const FORCE = process.argv.includes("--force");
const env = process.env;
const MEDIA_URL = (env.MEDIA_BASE_URL || "https://media.getvom.com").replace(/\/$/, "");

const QUALITY = 80;
const BODY_WIDTHS = [640, 1280];
const COVER_WIDTHS = [384, 640, 1280];
/** A copy is made only when it is this much narrower than the original. */
const GAP = 0.85;
const OG_WIDTH = 1200;
const PARALLEL = 6;
const CACHE = "public, max-age=31536000, immutable";

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are needed (.env.local).");
  process.exit(1);
}
if (UPLOAD && !(env.R2_ACCOUNT_ID && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY && env.R2_BUCKET)) {
  console.error("Uploading needs R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET (.env.local).");
  process.exit(1);
}
const s3 = UPLOAD
  ? new S3Client({
      region: "auto",
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
    })
  : null;

/** URLs and the manifest hold keys percent-encoded; the bucket stores them decoded. */
const bucketKey = (key) => key.split("/").map(decodeURIComponent).join("/");
const stem = (key) => key.replace(/\.[^./]+$/, "");

async function exists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: env.R2_BUCKET, Key: bucketKey(key) }));
    return true;
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404) return false;
    throw error;
  }
}

/** Uploads unless the key is taken; never overwrites. Returns whether it wrote. */
async function put(key, body, contentType) {
  if (await exists(key)) return false;
  await s3.send(new PutObjectCommand({ Bucket: env.R2_BUCKET, Key: bucketKey(key), Body: body, ContentType: contentType, CacheControl: CACHE }));
  return true;
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

/** Every published post's cover and body HTML, a page at a time. */
async function publishedPosts() {
  const rows = [];
  for (let offset = 0; ; offset += 100) {
    const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=cover_image,content_html&status=eq.published&order=id&limit=100&offset=${offset}`;
    const response = await fetch(url, { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` } });
    if (!response.ok) throw new Error(`Supabase answered ${response.status}: ${await response.text()}`);
    const page = await response.json();
    rows.push(...page);
    if (page.length < 100) return rows;
  }
}

/** The WordPress original beside an imported WebP (same name, PNG or JPEG), if the media domain has one. */
async function wordpressOriginal(key) {
  for (const ext of ["png", "jpg", "jpeg", "PNG", "JPG"]) {
    const response = await fetch(`${MEDIA_URL}/${stem(key)}.${ext}`, { method: "HEAD" });
    if (response.ok) return `${MEDIA_URL}/${stem(key)}.${ext}`;
  }
  return null;
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const posts = await publishedPosts();
const covers = new Set();
const images = new Set();
for (const post of posts) {
  for (const src of [post.cover_image, ...[...post.content_html.matchAll(/<img src="([^"]+)"/g)].map((m) => m[1])]) {
    if (!src?.startsWith(`${MEDIA_URL}/`)) continue;
    const key = src.slice(MEDIA_URL.length + 1);
    images.add(key);
    if (src === post.cover_image) covers.add(key);
  }
}
const todo = [...images].filter((key) => FORCE || !manifest[key] || (covers.has(key) && !manifest[key].og)).sort();

// Prove the key mapping on a real object before writing anything.
if (UPLOAD && todo.length && !(await exists(todo[0]))) {
  console.error(`The bucket has no object at ${bucketKey(todo[0])}: the key mapping is wrong; nothing was uploaded.`);
  process.exit(1);
}

const totals = { images: 0, copies: 0, written: 0, bytes: 0, og: 0, failed: [] };

async function handle(key) {
  try {
    const original = await download(`${MEDIA_URL}/${key}`);
    const meta = await sharp(original).metadata();
    const cover = covers.has(key);
    const variants = [];
    for (const width of cover ? COVER_WIDTHS : BODY_WIDTHS) {
      if (width >= meta.width * GAP) continue;
      const { data, info } = await sharp(original).rotate().resize({ width }).webp({ quality: QUALITY, effort: 6 }).toBuffer({ resolveWithObject: true });
      const copy = `${stem(key)}-w${width}.webp`;
      if (UPLOAD && (await put(copy, data, "image/webp"))) totals.written++;
      variants.push({ key: copy, width: info.width, height: info.height });
      totals.copies++;
      totals.bytes += data.length;
    }
    let og;
    if (cover) {
      const source = (await wordpressOriginal(key)) ?? `${MEDIA_URL}/${key}`;
      const input = source.endsWith(key) ? original : await download(source);
      const { data, info } = await sharp(input)
        .rotate()
        .resize({ width: OG_WIDTH, withoutEnlargement: true })
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer({ resolveWithObject: true });
      const ogKey = `${stem(key)}-og.jpg`;
      if (UPLOAD && (await put(ogKey, data, "image/jpeg"))) totals.written++;
      og = { key: ogKey, width: info.width, height: info.height };
      totals.og++;
      totals.bytes += data.length;
    }
    manifest[key] = { width: meta.width, height: meta.height, variants, ...(og ? { og } : {}) };
    totals.images++;
  } catch (error) {
    totals.failed.push(`${key}: ${error.message}`);
  }
}

const queue = [...todo];
await Promise.all(
  Array.from({ length: PARALLEL }, async () => {
    while (queue.length) await handle(queue.shift());
  }),
);

if (UPLOAD) {
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((key) => [key, manifest[key]]));
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
}
console.log(
  `${posts.length} posts, ${images.size} media images (${covers.size} covers), ${todo.length} to do. ` +
    `${totals.images} handled: ${totals.copies} copies and ${totals.og} share images, ${Math.round(totals.bytes / 1024 / 1024)} MB` +
    (UPLOAD ? `; ${totals.written} objects uploaded, manifest updated.` : ". Dry run: nothing uploaded (add --upload)."),
);
if (totals.failed.length) console.warn(`Failed (left as they are):\n  ${totals.failed.join("\n  ")}`);
