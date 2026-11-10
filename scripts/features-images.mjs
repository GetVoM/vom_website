#!/usr/bin/env node
/**
 * One-off import of the features page's images from the saved WordPress site
 * (getvom.com/wp-content/uploads/) into public/features/ as WebP. Kept so the
 * migration can be repeated. Run: node scripts/features-images.mjs
 *
 * Screenshots lose only the flat margin around them (trim), then are scaled to
 * at most 1600 px wide; photos keep their alpha. Prexle's mark is the partner
 * half of the old "VoM | Prexle" lockup, which the download does not hold: it is
 * read from the live site's upload (a plain GET of a public image) when missing.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
// sharp ships with Next.js; resolve it from there rather than adding a dependency.
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const uploads = join(root, "getvom.com/wp-content/uploads");
const outDir = join(root, "public/features");
const cacheDir = join(root, "node_modules/.cache/features-images");
const MAX_WIDTH = 1600;

/** Output name → source upload, and how to treat it. */
const images = {
  // Sales and e-invoicing
  "sales-reminders": { src: "2023/10/ميزة-تتبع-حالات-السداد-للفواتير.png", kind: "screen" },
  "sales-invoice": { src: "2023/10/فاتورة-الكترونية.jpg", kind: "screen" },
  "sales-status": { src: "2023/10/حالات-السداد.png", kind: "screen" },
  // Purchases: the old page filed this expenses list under reports (its breadcrumb reads المشتريات / المصروفات).
  "purchases-expenses": { src: "2023/08/screen1.png", kind: "screen" },
  // Products and services
  "products-add": { src: "2023/10/اضافة-منتج_خدمة_-مصروف_حزمة.png", kind: "screen" },
  "products-categories": { src: "2023/10/تسجيل-التصنيفات.png", kind: "screen" },
  "products-units": { src: "2023/10/تسجيل-الوحدات.png", kind: "screen" },
  // Accounting and assets
  "accounting-assets": { src: "2023/10/إدارة-الأصول.png", kind: "screen" },
  "accounting-chart": { src: "2023/10/شجرة-الحسابات.png", kind: "screen" },
  "accounting-entries": { src: "2023/10/ميزة-النسخ-للقيد.png", kind: "screen" },
  // HR (the old purchases slider showed these same files by mistake)
  "hr-positions": { src: "2023/10/اضافة-المناصب.png", kind: "screen" },
  "hr-employees": { src: "2023/10/اضافة-الموظفين.png", kind: "screen" },
  "hr-payroll": { src: "2023/10/جدول-الرواتب.png", kind: "screen" },
  // Invoice templates
  "templates-design": { src: "2023/10/تحديد-اللون-واختيار-النموذج.png", kind: "screen" },
  "templates-bank": { src: "2023/10/إضافة-الحساب-البنكي.png", kind: "screen" },
  "templates-terms": { src: "2023/10/إضافة-الشروط-والأحكام.png", kind: "screen" },
  // Users and permissions
  "permissions-roles": { src: "2023/10/اضافة-صلاحيات.jpeg", kind: "screen" },
  "permissions-users": { src: "2023/10/اضافة-مستخدمين.jpeg", kind: "screen" },
  // Reports: the old page's illustration of the reports dashboard
  "reports-dashboard": { src: "2023/08/Artboard-22.png", kind: "art" },
  // Cut-out photos
  "photo-sales": { src: "2023/08/Untitled-sd3.png", kind: "art" },
  "photo-purchases": { src: "2023/08/Untitled-13.png", kind: "art" },
  "photo-app": { src: "2023/08/Isolated_right_hand_with_smartphone-1-e1692264443400.png", kind: "art" },
};

const PREXLE_URL = "https://getvom.com/wp-content/uploads/2023/09/Untitled2-1-02.png";

async function screen(input) {
  // Trim the flat margin the screenshot was taken with, keeping a hair of it.
  // sharp runs trim, resize and extend in a fixed order, so each step is its own pass.
  const trimmed = await sharp(input).flatten({ background: "#ffffff" }).trim({ threshold: 6 }).toBuffer();
  const framed = await sharp(trimmed).extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#ffffff" }).toBuffer();
  return sharp(framed).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 90, effort: 6 });
}

function art(input) {
  return sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100, effort: 6 });
}

async function prexleMark() {
  mkdirSync(cacheDir, { recursive: true });
  const cached = join(cacheDir, "prexle-lockup.png");
  if (!existsSync(cached)) execFileSync("curl", ["-sSfL", "-A", "Mozilla/5.0", "-o", cached, PREXLE_URL]);
  const { width, height } = await sharp(cached).metadata();
  // The lockup reads "VoM | Prexle"; Prexle's half starts after the divider, at 66% of the width.
  const left = Math.round(width * 0.66);
  const half = await sharp(cached).extract({ left, top: 0, width: width - left, height }).toBuffer();
  const mark = await sharp(half).trim().toBuffer();
  return sharp(mark).webp({ quality: 90, alphaQuality: 100, effort: 6 });
}

mkdirSync(outDir, { recursive: true });
for (const [name, { src, kind }] of Object.entries(images)) {
  const input = join(uploads, src);
  const pipeline = kind === "screen" ? await screen(input) : art(input);
  const out = join(outDir, `${name}.webp`);
  const info = await pipeline.toFile(out);
  console.log(`${name}.webp ${info.width}×${info.height} ${Math.round(info.size / 1024)} KB`);
}
const prexle = await (await prexleMark()).toFile(join(outDir, "prexle-mark.webp"));
console.log(`prexle-mark.webp ${prexle.width}×${prexle.height} ${Math.round(prexle.size / 1024)} KB`);
