/**
 * Each tool's cover: the owner's set of 2026-11-23 («الأدوات المالية»), one per
 * calculator, shown on its /tools/ plate and above its article. They replace the
 * old pages' featured images (which scripts/import-tools.mjs brought over and no
 * longer writes); a replaced file took a new name, so no image cache keeps the old
 * one. Sizes are the files' own. The alt texts of the five old covers are kept.
 */
import type { ToolId } from "./catalogue.ts";

export interface ToolCover {
  src: string;
  width: number;
  height: number;
  alt: string;
  /**
   * The cover's own background colour, sampled from its top and bottom edges. Set
   * on the two wider covers, which the index plate (cut to 1600 by 915) shows
   * whole on this ground instead of cropping away their title or illustration.
   */
  ground?: string;
}

export const toolCovers: Record<ToolId, ToolCover> = {
  "vat": { src: "/tools/vat/cover-v2.webp", width: 1600, height: 915, alt: "حاسبة الضريبة" },
  "margin": { src: "/tools/margin/cover-v2.webp", width: 1600, height: 915, alt: "حاسبة هامش الربح" },
  "discount": { src: "/tools/discount/cover.webp", width: 1540, height: 904, alt: "حاسبة الخصم" },
  "salary": { src: "/tools/salary/cover-v2.webp", width: 1600, height: 915, alt: "برنامج حساب الراتب" },
  "zakat": { src: "/tools/zakat/cover.webp", width: 1536, height: 888, alt: "حاسبة الزكاة" },
  "zakat-company": { src: "/tools/zakat-company/cover-v2.webp", width: 1920, height: 843, alt: "حاسبة الزكاة للشركات", ground: "#F6EFE8" },
  "zakat-base": { src: "/tools/zakat-base/cover-v2.webp", width: 1920, height: 843, alt: "حاسبة الوعاء الزكوي", ground: "#EFE8E2" },
};
