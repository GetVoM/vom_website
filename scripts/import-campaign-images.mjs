/**
 * One-off download of the digital-ads landing page's images
 * (getvom.com/digital-ads-2023-landing-page/), so the page never fetches them
 * from WordPress or R2. Each image is fetched once from the live site's uploads
 * (R2 does not hold them), re-encoded to WebP q90 at most 1600 px wide, and
 * written to public/campaigns/digital-ads-2023/ with a `.webp.json` sidecar
 * naming its source.
 *
 * The 47-logo wall is the homepage's client logos, already in public/clients/;
 * it is not downloaded again.
 *
 * The four feature icons were inline SVG illustrations (40–56 KB each, with an
 * embedded bitmap). Pass the page structure saved from the browser to raster
 * them too:
 *
 *   node scripts/import-campaign-images.mjs [--icons .playwright-mcp/lp-structure.json]
 *
 * where the JSON holds `icons: [{ title, svg }]` in page order.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/campaigns/digital-ads-2023");
const cacheDir = join(root, "node_modules/.cache/campaign-images");
const MAX_WIDTH = 1600;
const UPLOADS = "https://getvom.com/wp-content/uploads/";

/** [file name here, path under wp-content/uploads] */
const images = [
  ["banner", "2023/10/2d8ce26ff859c2f55d0a7c2891ad1a94.jpg"],
  ["zatca", "2023/08/Artboard-3.png"],
  ["rating", "2023/08/rating-e1692016573554.png"],
  ["avatar-abdulaziz", "2023/08/عبدالعزيز.jpeg"],
  // The quotes' avatars: the old page's square crops (the homepage tiles in public/clients/ are 2:1).
  ["avatar-33", "2023/08/33.png"],
  ["avatar-23", "2023/08/23.png"],
  ["avatar-25", "2023/08/25.png"],
  ["avatar-8", "2023/08/8.png"],
  ["avatar-30", "2023/08/30.png"],
  ...["13", "02-1", "03-1", "04-1", "05-1", "06-1", "07-1", "08-1", "09-1", "10-1", "11-1", "12-1"].map((n, i) => [`round-${String(i + 1).padStart(2, "0")}`, `2023/10/Untitled-7-${n}-1024x1024.png`]),
];

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

mkdirSync(outDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

async function write(name, input, prompt) {
  const target = join(outDir, `${name}.webp`);
  const image = sharp(input);
  const { width } = await image.metadata();
  const info = await image
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(target);
  writeFileSync(`${target}.json`, `${JSON.stringify({ prompt, createdAt: new Date().toISOString() }, null, 2)}\n`);
  console.log(`  ${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

for (const [name, path] of images) {
  const cached = join(cacheDir, `${name}${path.slice(path.lastIndexOf("."))}`);
  if (!existsSync(cached)) execFileSync("curl", ["-sSfL", "--retry", "2", "-A", "Mozilla/5.0", "-o", cached, encodeURI(`${UPLOADS}${path}`)], { stdio: "pipe" });
  await write(name, cached, `Sourced, not generated: getvom.com/wp-content/uploads/${path} from the old /digital-ads-2023-landing-page/, downloaded from the live site and re-encoded to WebP q90 at most ${MAX_WIDTH}px wide by scripts/import-campaign-images.mjs.`);
}

const iconsAt = process.argv.indexOf("--icons");
if (iconsAt > -1) {
  const raw = JSON.parse(readFileSync(process.argv[iconsAt + 1], "utf8"));
  const { icons } = typeof raw === "string" ? JSON.parse(raw) : raw;
  for (const [i, { title, svg }] of icons.entries()) {
    // WordPress stripped the scheme from the namespaces; librsvg needs it back.
    const source = svg.replaceAll('"//www.w3.org/', '"http://www.w3.org/');
    await write(
      `feature-${i + 1}`,
      await sharp(Buffer.from(source), { density: 288 }).png().toBuffer(),
      `Sourced, not generated: the inline SVG illustration of the feature «${title}» on the old /digital-ads-2023-landing-page/ (read from the live page on 2026-11-12), rastered at 288 dpi and encoded to WebP q90 by scripts/import-campaign-images.mjs.`,
    );
  }
}
