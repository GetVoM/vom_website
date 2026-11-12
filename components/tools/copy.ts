import type { CalculatorId } from "@/lib/content/tools/catalogue";

/** The tool pages' own words (new copy; the bodies are the old pages'). */
export const toolsCopy = {
  byline: {
    writer: "كتابة",
    reviewer: "مراجعة",
    updated: "آخر تحديث",
  },
  /** The old template's contents box heading. */
  contents: "محتويات المقال",
  /** The index's intro (new copy, pending the owner's approval). */
  intro: "احسب ضريبة القيمة المضافة وهامش الربح والخصم وصافي الراتب والزكاة في ثوانٍ، بأدوات مجانية لا تحتاج إلى تسجيل. اختر الحاسبة، وأدخل أرقامك، وتظهر النتيجة مباشرة.",
  open: "افتح الحاسبة",
  /** Index plates for the two tools with no old cover: each page's own worked example. */
  drawn: {
    discount: { figure: "20%", line: "1,000 ← 800", alt: "خصم 20% على 1,000 ريال يصبح 800 ريال" },
    zakat: { figure: "2.5%", line: "من صافي المال بعد الديون", alt: "الزكاة 2.5% من صافي المال بعد الديون" },
  },
  others: "أدوات مالية أخرى",
  all: "كل الأدوات المالية",
  /** Each calculator's name in its WebApplication JSON-LD. */
  apps: {
    vat: "حاسبة ضريبة القيمة المضافة",
    margin: "حاسبة هامش الربح",
    pricing: "حاسبة تسعير المنتج وحساب هامش الربح",
    "salary-net": "حاسبة صافي الراتب",
    "salary-annual": "حاسبة الراتب الشهري من الراتب السنوي",
    discount: "حاسبة الخصم",
    zakat: "حاسبة الزكاة",
    "zakat-company": "حاسبة الزكاة للشركات",
    "zakat-base": "حاسبة الوعاء الزكوي",
  } satisfies Record<CalculatorId, string>,
} as const;
