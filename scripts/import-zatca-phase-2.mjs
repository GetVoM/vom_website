/**
 * One-off import of the English ZATCA Phase 2 page's images
 * (getvom.com/en/zatca-e-invoicing-phase-2/), so the page never fetches them
 * from WordPress or R2. Each image is read from the local mirror in getvom.com/
 * (or fetched from the live site's uploads when the mirror lacks it),
 * re-encoded to WebP q90, and written to public/zatca-phase-2/ with a
 * `.webp.json` sidecar naming its source.
 *
 * The page's 18 icons were inline SVGs, each wrapping a bitmap (36–70 KB).
 * They are rastered from the mirrored page in page order; the four that repeat
 * (seller, buyer, authority, stored invoice) are written once.
 *
 *   node scripts/import-zatca-phase-2.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/zatca-phase-2");
const mirror = join(root, "getvom.com");
const page = join(mirror, "en/zatca-e-invoicing-phase-2/index.html");
const cacheDir = join(root, "node_modules/.cache/zatca-phase-2");
const MAX_WIDTH = 1600;
const ICON_WIDTH = 256;
const UPLOADS = "https://getvom.com/wp-content/uploads/";

/** [file name here, path under wp-content/uploads]. The laptop's original is not mirrored; its 2048px copy is. */
const images = [
  ["badge", "2024/04/Untitfgdgfled-1-02.png"],
  ["laptop", "2024/04/ZATCA-10-2048x1037.png"],
  ["ensure", "2024/04/Student5-12.png"],
  ["enhance", "2024/04/Student5-11.png"],
  ["issue", "2024/04/Student5-14.png"],
  ["comply", "2024/04/Student5-13.png"],
];

/** The icons in page order: readiness (3), getting started (7), tax invoices (4), simplified invoices (4). */
const icons = [
  "approval",
  "integrate",
  "commitment",
  "notify",
  "portal",
  "fatoora",
  "setup",
  "otp-generate",
  "otp-insert",
  "invoicing",
  "seller",
  "authority",
  "buyer",
  "stored",
  "seller",
  "buyer",
  "stored",
  "authority",
];

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

mkdirSync(outDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

async function write(name, input, prompt, maxWidth = MAX_WIDTH) {
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

for (const [name, path] of images) {
  let source = join(mirror, "wp-content/uploads", path);
  if (!existsSync(source)) {
    source = join(cacheDir, `${name}${path.slice(path.lastIndexOf("."))}`);
    if (!existsSync(source)) execFileSync("curl", ["-sSfL", "--retry", "2", "-A", "Mozilla/5.0", "-o", source, encodeURI(`${UPLOADS}${path}`)], { stdio: "pipe" });
  }
  await write(name, source, `Sourced, not generated: getvom.com/wp-content/uploads/${path} from the old /en/zatca-e-invoicing-phase-2/, re-encoded to WebP q90 at most ${MAX_WIDTH}px wide by scripts/import-zatca-phase-2.mjs.`);
}

const html = readFileSync(page, "utf8");
const body = html.slice(html.indexOf('data-elementor-type="wp-page"'), html.indexOf('data-elementor-type="footer"'));
const svgs = [...body.matchAll(/elementor-icon-box-icon[\s\S]*?(<svg[\s\S]*?<\/svg>)/g)].map((match) => match[1]);
if (svgs.length !== icons.length) throw new Error(`expected ${icons.length} icons, found ${svgs.length}`);
const done = new Set();
for (const [i, svg] of svgs.entries()) {
  const name = `icon-${icons[i]}`;
  if (done.has(name)) continue;
  done.add(name);
  // WordPress stripped the scheme from the namespaces; librsvg needs it back.
  const source = svg.replaceAll('"//www.w3.org/', '"http://www.w3.org/');
  await write(
    name,
    await sharp(Buffer.from(source), { density: 288 }).png().toBuffer(),
    `Sourced, not generated: icon ${i + 1} of 18 on the old /en/zatca-e-invoicing-phase-2/ (an inline SVG wrapping a bitmap, read from the mirrored page), rastered and encoded to WebP q90 at most ${ICON_WIDTH}px wide by scripts/import-zatca-phase-2.mjs.`,
    ICON_WIDTH,
  );
}
