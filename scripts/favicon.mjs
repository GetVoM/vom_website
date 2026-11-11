#!/usr/bin/env node
/**
 * The site icon: the old getvom.com favicon, the teal chevron (the circumflex of
 * the "vôm" wordmark). WordPress only held it as a 30×21 px PNG
 * (wp-content/uploads/2021/09/faveicon.png, upscaled to 512 px as
 * cropped-faveicon.png), so it is redrawn here as a vector traced from those
 * pixels: two square-ended arms at 45°, the arm 9 px thick measured vertically
 * in the source, in brand teal #17BAA3 (the source pixels read #14C3A5).
 *
 * Writes the App Router's icon files (app/favicon.ico with 16, 32 and 48 px
 * PNG entries, app/icon.svg, and app/apple-icon.png at 180 px on white, since
 * iOS shows a transparent touch icon on black). Run: node scripts/favicon.mjs
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
// sharp ships with Next.js; resolve it from there rather than adding a dependency.
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const TEAL = "#17BAA3";
/** The chevron on a 32-unit square, centred by its bounding box (traced from the 30×21 source). */
const CHEVRON = "M16 6.25 30 20.25 24.52 25.72 16 17.2 7.48 25.72 2 20.25Z";

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="${TEAL}" d="${CHEVRON}"/></svg>\n`;
/** The touch icon: the same mark on white, inset so it sits inside iOS's rounded mask. */
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#fff"/><path fill="${TEAL}" d="${CHEVRON}" transform="translate(16 16) scale(0.7) translate(-16 -15.4)"/></svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * (size / 32) * 4 }).resize(size, size).png().toBuffer();

/** An .ico holding PNG entries (understood by every current browser and by Windows since Vista). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

writeFileSync(join(root, "app/icon.svg"), iconSvg);
const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map(async (size) => ({ size, data: await png(iconSvg, size) })));
writeFileSync(join(root, "app/favicon.ico"), ico(entries));
writeFileSync(join(root, "app/apple-icon.png"), await png(appleSvg, 180));
console.log("app/icon.svg, app/favicon.ico (16/32/48), app/apple-icon.png (180)");
