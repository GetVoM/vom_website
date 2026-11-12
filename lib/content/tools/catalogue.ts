/**
 * The financial tools: the `/tools/` index and its seven calculators. Arabic
 * only. Slugs, SEO titles, descriptions, H1s, dates and bylines are the
 * WordPress pages' own (getvom.com/tools/*.html, imported 2026-11-12 by
 * scripts/import-tools.mjs), with the character fixes logged in
 * docs/content/tools/text-changes.md. The groups, the short card titles and the
 * card lines are new, written for the index (pending the owner's approval).
 * The bodies live in content/tools/<id>.mdx.
 *
 * Kept free of path aliases so `node --test` can load it directly.
 */

export type ToolId = "vat" | "margin" | "salary" | "discount" | "zakat" | "zakat-company" | "zakat-base";

/** One calculator widget; a page can hold more than one (margin, salary). */
export type CalculatorId =
  | "vat"
  | "margin"
  | "pricing"
  | "salary-net"
  | "salary-annual"
  | "discount"
  | "zakat"
  | "zakat-company"
  | "zakat-base";

export type ToolGroupId = "tax-pricing" | "payroll" | "zakat";

/** Supabase author slugs (the old Article JSON-LD bylines); each has a page at /author/<slug>/. */
export type AuthorSlug = "abasssahrawi" | "abdulrahman" | "faisal";

export interface ToolEntry {
  id: ToolId;
  group: ToolGroupId;
  /** The segment under /tools/, kept byte for byte. */
  slug: string;
  /** The tool's short name: index cards, breadcrumb, navigation. */
  cardTitle: string;
  /** One line on the index card (new copy). */
  cardLine: string;
  h1: string;
  /** The WordPress SEO title, kept exactly. */
  seoTitle: string;
  description: string;
  published: string;
  modified: string;
  author: AuthorSlug;
  reviewer: AuthorSlug;
  /** The page's calculators, in the order they appear in the body. */
  calculators: CalculatorId[];
}

export const TOOLS_SEGMENT = "tools";

export const toolsIndex = {
  path: "/tools/",
  /** The old archive's title and description, kept byte for byte like the templates index's. */
  seoTitle: "Tools - Vom",
  description: "Tools Archive - Vom",
  h1: "الأدوات المالية",
} as const;

export const toolGroups: { id: ToolGroupId; name: string }[] = [
  { id: "tax-pricing", name: "الضريبة والتسعير" },
  { id: "payroll", name: "الرواتب" },
  { id: "zakat", name: "الزكاة" },
];

export const tools: ToolEntry[] = [
  {
    id: "vat",
    group: "tax-pricing",
    slug: "حاسبة-الضريبة",
    cardTitle: "حاسبة الضريبة",
    cardLine: "أضف ضريبة القيمة المضافة إلى المبلغ أو استخرجها منه.",
    h1: "حاسبة الضريبة: حساب ضريبة القيمة المضافة",
    seoTitle: "حاسبة الضريبة:حساب ضريبة القيمة المضافة في السعودية",
    description:
      "حاسبة الضريبة في السعودية هذه من فوم تم تصميمها لتساعدك على حساب ضريبة القيمة المضافة وكذا تزويدك بمعلومات مهمة حول الإجراءات الضريبية.",
    published: "2024-07-06T04:39:42+00:00",
    modified: "2025-08-26T16:06:43+00:00",
    author: "abasssahrawi",
    reviewer: "faisal",
    calculators: ["vat"],
  },
  {
    id: "margin",
    group: "tax-pricing",
    slug: "حاسبة-هامش-الربح",
    cardTitle: "حاسبة هامش الربح",
    cardLine: "احسب سعر البيع والربح وهامش الربح من التكلفة ونسبة الزيادة.",
    h1: "حاسبة هامش الربح: حاسبة فعلية وقالب أكسل مجاني لأتمتة عملية الحساب",
    seoTitle: "حاسبة هامش الربح وتسعير المنتج المجانية من ڤوم",
    description: "احسب هامش الربح الخاص بك بسرعة وسهولة باستخدام حاسبة هامش الربح وتسعير المنتج. اكتشف كيفية تحسين أرباحك اليوم.",
    published: "2024-07-20T10:35:05+00:00",
    modified: "2025-08-22T14:38:23+00:00",
    author: "abasssahrawi",
    reviewer: "faisal",
    calculators: ["margin", "pricing"],
  },
  {
    id: "discount",
    group: "tax-pricing",
    slug: "حاسبة-الخصم",
    cardTitle: "حاسبة الخصم",
    cardLine: "اعرف السعر بعد الخصم ومقدار ما توفّره.",
    h1: "حساب الخصم: أداتك لتوفير المال بكل سهولة",
    seoTitle: "حاسبة الخصم: حساب الخصم بسهولة",
    description:
      "اكتشف كيفية حساب الخصم بدقة وسرعة مع حاسبة الخصم الإلكترونية. سواء كنت تبحث عن حساب خصم ١٥٪ أو تريد معرفة السعر بعد الخصم، هذه الأداة تقدم لك الحل.",
    published: "2024-07-30T11:25:50+00:00",
    modified: "2025-07-17T03:35:59+00:00",
    author: "abdulrahman",
    reviewer: "faisal",
    calculators: ["discount"],
  },
  {
    id: "salary",
    group: "payroll",
    slug: "برنامج-حساب-الراتب-حاسبة-الرواتب",
    cardTitle: "حاسبة الرواتب",
    cardLine: "احسب صافي راتبك الشهري، وحوّل الراتب السنوي إلى شهري.",
    h1: "برنامج حساب الراتب: مميزاته وإمكاناته، وفوائده للشركات والمؤسسات",
    seoTitle: "حساب الراتب الشهري الإجمالي في السعودية مع حاسبة الرواتب",
    description:
      "هل تحتاج إلى حساب راتبك الشهري بدقة؟ تعرف على كيفية حساب الراتب مع البدلات والخصومات باستخدام حاسبة الراتب من ڤوم. حساب الرواتب السعودي مع الامتثال الكامل لقوانين الزكاة والضريبة.",
    published: "2025-03-13T09:02:59+00:00",
    modified: "2025-09-05T14:35:36+00:00",
    author: "abasssahrawi",
    reviewer: "faisal",
    calculators: ["salary-net", "salary-annual"],
  },
  {
    id: "zakat",
    group: "zakat",
    slug: "حاسبة-الزكاة",
    cardTitle: "حاسبة الزكاة",
    cardLine: "احسب زكاة مالك من مدخراتك واستثماراتك وذهبك بعد خصم ديونك.",
    h1: "حاسبة الزكاة: أداتك لحساب الزكاة بدقة ويُسر",
    seoTitle: "حاسبة زكاة المال - أداة حساب الزكاة أون لاين",
    description:
      "استخدم حاسبة زكاة المال لحساب زكاة أون لاين بسهولة، الذهب وغيرها بدقة وفق الشريعة الإسلامية. أداة سهلة وموثوقة لضمان أداء زكاتك بالطريقة الصحيحة. جربها الآن.",
    published: "2024-08-21T11:02:05+00:00",
    modified: "2024-08-22T10:34:11+00:00",
    author: "abdulrahman",
    reviewer: "faisal",
    calculators: ["zakat"],
  },
  {
    id: "zakat-company",
    group: "zakat",
    slug: "حاسبة-الزكاة-للشركات",
    cardTitle: "حاسبة الزكاة للشركات",
    cardLine: "احسب زكاة شركتك من المبلغ الخاضع للزكاة.",
    h1: "حاسبة الزكاة للشركات: دليل حساب زكاة شركتك بدقة وتوفير آلاف الريالات",
    seoTitle: "حاسبة الزكاة للشركات: أسرع طريقة لحساب الزكاة دون أخطاء",
    description:
      "هل تواجه مشاكل في حساب زكاة المال الخاصة بشركتك؟ إذا كنت كذلك، سنقدم لك في هذا المقال حاسبة الزكاة للشركات لتسهيل تلك العملية عليك.",
    published: "2025-04-27T18:17:43+00:00",
    modified: "2025-08-22T14:16:35+00:00",
    author: "abasssahrawi",
    reviewer: "faisal",
    calculators: ["zakat-company"],
  },
  {
    id: "zakat-base",
    group: "zakat",
    slug: "حاسبة-الوعاء-الزكوي",
    cardTitle: "حاسبة الوعاء الزكوي",
    cardLine: "احسب وعاءك الزكوي من النقود ووزن الذهب والفضة والاستثمارات.",
    h1: "حاسبة الوعاء الزكوي: دليلك لتحقيق التكافل الاجتماعي",
    seoTitle: "حاسبة الوعاء الزكوي: دليلك لتحقيق التكافل الاجتماعي",
    description:
      "تعرَّف على كيفية حساب وعاء الزكاة بسهولة ودقة مع حاسبة الوعاء الزكوي. اكتشف الطريقة الـمُثلَى لضمان التزامك بالشريعة الإسلامية وتحقيق التكافل الاجتماعي.",
    published: "2024-07-31T07:46:06+00:00",
    modified: "2024-07-31T07:46:06+00:00",
    author: "abasssahrawi",
    reviewer: "faisal",
    calculators: ["zakat-base"],
  },
];

export const toolIds = tools.map((tool) => tool.id);

export function toolEntry(id: ToolId): ToolEntry {
  const entry = tools.find((tool) => tool.id === id);
  if (!entry) throw new Error(`Unknown tool: ${id}`);
  return entry;
}

/** The tool's path, unencoded: /tools/<slug>/. */
export function toolPath(id: ToolId): string {
  return `/${TOOLS_SEGMENT}/${toolEntry(id).slug}/`;
}

/** The same group first, then the rest, for the "other tools" list on a tool page. */
export function siblingTools(id: ToolId): ToolEntry[] {
  const group = toolEntry(id).group;
  const others = tools.filter((tool) => tool.id !== id);
  return [...others.filter((tool) => tool.group === group), ...others.filter((tool) => tool.group !== group)];
}

/** The newest modified date of any tool: the index's own last-modified. */
export const toolsModified = tools.map((tool) => tool.modified).sort().at(-1) as string;
