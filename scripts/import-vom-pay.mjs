/**
 * One-off import of the VoM Pay result pages' images
 * (getvom.com/vom-pay-success/ and /vom-pay-failure/), so the pages never fetch
 * them from WordPress or R2. Each image is downloaded once from the live site's
 * uploads (the local mirror holds only the HTML), re-encoded to WebP q90, and
 * written to public/vom-pay/ with a `.webp.json` sidecar naming its source.
 *
 * The success page's six feature icons were inline SVGs, each wrapping a bitmap;
 * they are rastered from the mirrored page in page order.
 *
 *   node scripts/import-vom-pay.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/vom-pay");
const page = join(root, "getvom.com/vom-pay-success/index.html");
const cacheDir = join(root, "node_modules/.cache/vom-pay");
const MAX_WIDTH = 1600;
const ICON_WIDTH = 256;
const UPLOADS = "https://getvom.com/wp-content/uploads/";

/** [file name here, path under wp-content/uploads, max width] */
const images = [
  ["success", "2024/08/Image-08.png", 1200],
  ["failure", "2024/08/error-page-icon.png", 1200],
  ["hero-bg", "2024/08/error-page-bg-scaled.jpg", MAX_WIDTH],
  ["vom-ai", "2024/08/logo-with-ai.png", 640],
  ["laptop", "2024/08/Image-09.png", MAX_WIDTH],
  ["zatca", "2024/08/Image-10-1.png", 640],
];

/** The six feature icons in page order. */
const icons = ["einvoicing", "finance", "compliance", "ai", "support", "integrations"];

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

mkdirSync(outDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

async function write(name, input, prompt, maxWidth) {
  const target = join(outDir, `${name}.webp`);
  const image = sharp(input);
  const { width } = await image.metadata();
  const info = await image
    .resize({ width: Math.min(width ?? maxWidth, maxWidth), withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(target);
  writeFileSync(`${target}.json`, `${JSON.stringify({ prompt, createdAt: new Date().toISOString() }, null, 2)}\n`);
  console.log(`  ${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

for (const [name, path, maxWidth] of images) {
  const cached = join(cacheDir, `${name}${path.slice(path.lastIndexOf("."))}`);
  if (!existsSync(cached)) execFileSync("curl", ["-sSfL", "--retry", "2", "-A", "Mozilla/5.0", "-o", cached, encodeURI(`${UPLOADS}${path}`)], { stdio: "pipe" });
  await write(name, cached, `Sourced, not generated: getvom.com/wp-content/uploads/${path} from the old VoM Pay result pages, downloaded from the live site and re-encoded to WebP q90 at most ${maxWidth}px wide by scripts/import-vom-pay.mjs.`, maxWidth);
}

const html = readFileSync(page, "utf8");
const body = html.slice(html.indexOf('data-elementor-type="wp-page"'), html.indexOf('data-elementor-type="footer"'));
const svgs = [...body.matchAll(/elementor-icon-box-icon[\s\S]*?(<svg[\s\S]*?<\/svg>)/g)].map((match) => match[1]);
if (svgs.length !== icons.length) throw new Error(`expected ${icons.length} icons, found ${svgs.length}`);
for (const [i, svg] of svgs.entries()) {
  // WordPress stripped the scheme from the namespaces; librsvg needs it back.
  const source = svg.replaceAll('"//www.w3.org/', '"http://www.w3.org/');
  await write(
    `icon-${icons[i]}`,
    await sharp(Buffer.from(source), { density: 288 }).png().toBuffer(),
    `Sourced, not generated: feature icon ${i + 1} of 6 on the old /vom-pay-success/ (an inline SVG wrapping a bitmap, read from the mirrored page), rastered and encoded to WebP q90 at most ${ICON_WIDTH}px wide by scripts/import-vom-pay.mjs.`,
    ICON_WIDTH,
  );
}
