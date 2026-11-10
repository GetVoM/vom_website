/**
 * The e-invoicing catalogue: the hub (card 00) and its twelve guides, filed under
 * four topics. Arabic only. Titles, descriptions, H1s and dates are the WordPress
 * pages' own (imported 2026-11-10 by scripts/import-einvoicing.mjs); the topic
 * grouping, the numbering and the short card titles are an editorial choice made
 * for the "Index cards" layout. The bodies live in content/e-invoicing/<id>.mdx.
 */

export type GuideId =
  | "hub"
  | "what-is"
  | "requirements"
  | "phases"
  | "tax-invoice"
  | "how-to-issue"
  | "software"
  | "compliance"
  | "zatca-link"
  | "activation-code"
  | "qr-reader"
  | "subsidy"
  | "fines";

export type TopicId = "basics" | "issuing" | "linking" | "support";

export interface GuideEntry {
  id: GuideId;
  /** Catalogue number: 0 for the hub, then 1–12 in reading order. */
  number: number;
  /** The drawer it is filed in; the hub belongs to none. */
  topic: TopicId | null;
  /** The segment under /الفوترة-الإلكترونية/ ("" for the hub), kept byte for byte. */
  slug: string;
  /** Short title on index cards and in the catalogue rail. */
  cardTitle: string;
  h1: string;
  /** The WordPress SEO title, kept exactly. */
  seoTitle: string;
  description: string;
  published: string;
  modified: string;
}

export const HUB_SEGMENT = "الفوترة-الإلكترونية";

export const topics: { id: TopicId; name: string }[] = [
  { id: "basics", name: "الأساسيات" },
  { id: "issuing", name: "إصدار الفواتير" },
  { id: "linking", name: "الربط مع الهيئة" },
  { id: "support", name: "الدعم والغرامات" },
];

export const guides: GuideEntry[] = [
  {
    id: "hub",
    number: 0,
    topic: null,
    slug: "",
    cardTitle: "الدليل الشامل للفوترة الإلكترونية",
    h1: "الفوترة الإلكترونية في السعودية: الدليل الشامل للمنشآت",
    seoTitle: "الفوترة الإلكترونية في السعودية: تفاصيل المرحلة الثانية مع الربط والتكامل",
    description:
      "كل ما تحتاج إلى معرفته حول الفوترة الإلكترونية في السعودية: تعريفها، أهميتها، مراحل تطبيقها، وأفضل البرامج لتحقيق الامتثال لمتطلبات الهيئة وتجنب الغرامات.",
    published: "2025-08-30T05:45:28+00:00",
    modified: "2025-09-05T09:47:10+00:00",
  },
  {
    id: "what-is",
    number: 1,
    topic: "basics",
    slug: "الفاتورة-الالكترونية",
    cardTitle: "ما هي الفاتورة الإلكترونية",
    h1: "الفاتورة الإلكترونية في السعودية: جميع المعلومات الأساسية تجدها هنا",
    seoTitle: "ما هي الفاتورة الإلكترونية؟ نظرة عامة عليها من منظور زاكتا",
    description:
      "تعرف على كل ما يخص الفاتورة الإلكترونية السعودية؛ مفهومها، أهميتها، النموذج الصحيح لها، وكيفية تصميمها باستخدام فوم المحاسبي السحابي المعتمد من الهيئة.",
    published: "2025-08-30T09:04:49+00:00",
    modified: "2025-09-05T12:00:56+00:00",
  },
  {
    id: "requirements",
    number: 2,
    topic: "basics",
    slug: "متطلبات-الفوترة-الإلكترونية",
    cardTitle: "متطلبات الفوترة الإلكترونية",
    h1: "كل ما تحتاج لمعرفته حول متطلبات الفوترة الإلكترونية في السعودية",
    seoTitle: "دليلك الشامل لمتطلبات الفوترة الإلكترونية في السعودية",
    description:
      "كل ما تحتاج إلى معرفته حول متطلبات الفوترة الإلكترونية في السعودية وكيفية تطبيقها في منشأتك، وكيف يمكن لبرنامج فوم المحاسبي مساعدتك على الامتثال لتلك المتطلبات.",
    published: "2025-08-30T12:58:26+00:00",
    modified: "2025-09-02T18:00:51+00:00",
  },
  {
    id: "phases",
    number: 3,
    topic: "basics",
    slug: "مراحل-تطبيق-الفاتورة-الإلكترونية",
    cardTitle: "مراحل تطبيق الفاتورة الإلكترونية",
    h1: "ما هي مراحل تطبيق الفاتورة الإلكترونية؟",
    seoTitle: "ما هي مراحل تطبيق الفاتورة الإلكترونية في السعودية؟",
    description:
      "تعرّف على مراحل تطبيق الفاتورة الإلكترونية في السعودية خطوة بخطوة، وكيف تضمن الامتثال لمتطلبات هيئة الزكاة والدخل بسهولة وكفاءة.",
    published: "2025-08-30T13:29:10+00:00",
    modified: "2025-09-02T19:42:19+00:00",
  },
  {
    id: "tax-invoice",
    number: 4,
    topic: "basics",
    slug: "فواتير-ضريبية",
    cardTitle: "الفاتورة الضريبية",
    h1: "فاتورة ضريبية: الدليل الشامل لإنشاء فواتير ضريبية دقيقة",
    seoTitle: "فاتورة ضريبية: الدليل الشامل لإنشاء فواتير ضريبية دقيقة",
    description:
      "تعرّف على كل ما يخص إصدار فاتورة ضريبية في السعودية، من الشروط والمتطلبات التي حددتها هيئة الزكاة والضريبة والجمارك، إلى خطوات إعداد فواتير ضريبية معتمدة.",
    published: "2025-08-30T15:01:21+00:00",
    modified: "2025-09-02T18:08:49+00:00",
  },
  {
    id: "how-to-issue",
    number: 5,
    topic: "issuing",
    slug: "طريقة-عمل-و-إصدار-فاتورة-الكترونية",
    cardTitle: "طريقة عمل وإصدار فاتورة إلكترونية",
    h1: "تعرف على طريقة عمل وإصدار فاتورة إلكترونية سليمة في السعودية",
    seoTitle: "إليك طريقة عمل وإصدار فاتورة الكترونية معتمدة بخطوات بسيطة",
    description:
      "تعلم طريقة عمل وإصدار فاتورة الكترونية في السعودية بخطوات بسيطة، وحقق الامتثال الكامل لمتطلبات ZATCA بسهولة عبر برنامج فوم المعتمد.",
    published: "2025-08-30T15:47:41+00:00",
    modified: "2025-09-02T19:36:58+00:00",
  },
  {
    id: "software",
    number: 6,
    topic: "issuing",
    slug: "برنامج-فاتورة-إلكترونية",
    cardTitle: "برنامج فاتورة إلكترونية",
    h1: "برنامج فاتورة إلكترونية: 8 مزايا فريدة يقدمها إليك",
    seoTitle: "برنامج فاتورة إلكترونية من فوم بمزايا فريدة",
    description:
      "برنامج فاتورة إلكترونية من فوم، المعتمد من هيئة الزكاة والضريبة والجمارك: اكتشف مزاياه وأنشئ فواتير احترافية باستخدامه، وتابع مدفوعاتك عبره بسهولة وأمان.",
    published: "2025-08-30T17:37:10+00:00",
    modified: "2025-09-02T19:25:38+00:00",
  },
  {
    id: "compliance",
    number: 7,
    topic: "issuing",
    slug: "الامتثال-المالي",
    cardTitle: "الامتثال المالي",
    h1: "إليك أفضل استراتيجيات لتعزيز الامتثال المالي باستخدام الفوترة الإلكترونية للشركات الصغيرة",
    seoTitle: "7 استراتيجيات لتعزيز الامتثال المالي لمنشأتك بالفوترة الإلكترونية",
    description:
      "تعرف على أفضل 7 استراتيجيات تساعد شركتك الصغيرة في السعودية على تحقيق الامتثال المالي باستخدام الفوترة الإلكترونية، وتجنب الغرامات المالية باستخدام فوم المحاسبي.",
    published: "2025-08-30T14:39:29+00:00",
    modified: "2025-09-05T12:34:54+00:00",
  },
  {
    id: "zatca-link",
    number: 8,
    topic: "linking",
    slug: "ربط-الفاتورة-الالكترونية-مع-هيئة-الزك",
    cardTitle: "ربط الفاتورة الإلكترونية مع هيئة الزكاة",
    h1: "ربط الفاتورة الإلكترونية مع هيئة الزكاة: دليلك لتجنب المخالفات!",
    seoTitle: "دليلك لربط الفاتورة الإلكترونية مع هيئة الزكاة",
    description:
      "هل تواجه صعوبة في فهم متطلبات الهيئة للمرحلة الثانية من الفوترة الإلكترونية؟ لا تقلق، فسنقدم لك في هذا المقال كل ما تحتاج إليه لربط الفاتورة الإلكترونية مع هيئة الزكاة.",
    published: "2025-08-30T16:52:42+00:00",
    modified: "2025-09-05T14:42:15+00:00",
  },
  {
    id: "activation-code",
    number: 9,
    topic: "linking",
    slug: "رمز-التفعيل-الفاتورة-الإلكترونية",
    cardTitle: "رمز التفعيل",
    h1: "رمز التفعيل الفاتورة الإلكترونية: اربط نظامك بمنصة الهيئة بنجاح",
    seoTitle: "كل ما يهمك حول رمز التفعيل الفاتورة الإلكترونية",
    description:
      "هل تحتاج إلى فهم المقصود برمز التفعيل الفاتورة الإلكترونية؟ سنقدم لك في هذا المقال كل ما يخص هذا الرمز وكيفية تفعيله باستخدام برنامج فوم.",
    published: "2025-08-30T17:05:41+00:00",
    modified: "2025-09-05T14:41:59+00:00",
  },
  {
    id: "qr-reader",
    number: 10,
    topic: "linking",
    slug: "قارئ-qr-للفواتير-الالكترونية",
    cardTitle: "قارئ رمز الاستجابة السريعة",
    h1: "قارئ الاستجابة السريعة: كل ما تحتاجه لمعرفة معلومات الفاتورة الإلكترونية",
    seoTitle: "قارئ الاستجابة السريعة للفواتير الإلكترونية في السعودية",
    description:
      "تعرف على قارئ الاستجابة السريعة QR في الفواتير الإلكترونية المعتمدة من هيئة الزكاة والضريبة والجمارك في السعودية، وكيف يساعد على تعزيز الشفافية وإدارة الفواتير.",
    published: "2025-08-30T17:27:14+00:00",
    modified: "2025-09-01T23:40:47+00:00",
  },
  {
    id: "subsidy",
    number: 11,
    topic: "support",
    slug: "دعم-الهيئة-للفوترة-الإلكترونية",
    cardTitle: "دعم الهيئة للفوترة الإلكترونية",
    h1: "دعم الهيئة للفوترة الإلكترونية",
    seoTitle: "كيف تستفيد من دعم الهيئة للفوترة الإلكترونية؟",
    description:
      "تعرف على كيفية الاستفادة من دعم الهيئة للفوترة الإلكترونية للمنشآت الصغيرة والمتوسطة في السعودية، بقيمة تصل إلى 2500 ريال، وخطوات وشروط الحصول عليه.",
    published: "2025-08-30T15:28:16+00:00",
    modified: "2025-09-02T19:39:07+00:00",
  },
  {
    id: "fines",
    number: 12,
    topic: "support",
    slug: "غرامة-الفاتورة-إلكترونية",
    cardTitle: "غرامة الفاتورة الإلكترونية",
    h1: "هل تعرف كم تبلغ قيمة غرامة الفاتورة الإلكترونية؟ ستتفاجأ بالأرقام",
    seoTitle: "هل تعلم أن غرامة الفاتورة الإلكترونية قد تصل ل50 ألف ريال؟",
    description:
      "تعرف على غرامة الفاتورة الإلكترونية في السعودية، أبرز المخالفات وقيمة الغرامات التي قد تصل إلى 50,000 ريال، مع نصائح عملية لتجنبها.",
    published: "2025-08-30T17:50:16+00:00",
    modified: "2025-09-05T12:35:09+00:00",
  },
];

export const guideIds = guides.map((guide) => guide.id);

export function guideEntry(id: GuideId): GuideEntry {
  const entry = guides.find((guide) => guide.id === id);
  if (!entry) throw new Error(`Unknown e-invoicing guide: ${id}`);
  return entry;
}

/** The page's Arabic path, e.g. /الفوترة-الإلكترونية/فواتير-ضريبية/. */
export function guidePath(id: GuideId): string {
  const { slug } = guideEntry(id);
  return slug ? `/${HUB_SEGMENT}/${slug}/` : `/${HUB_SEGMENT}/`;
}

/** A catalogue number as printed on a card: two tabular digits. */
export function cardNumber(number: number): string {
  return String(number).padStart(2, "0");
}

/** The card after this one; the last card leads back to the hub. */
export function nextGuide(id: GuideId): GuideEntry {
  const index = guides.findIndex((guide) => guide.id === id);
  return guides[(index + 1) % guides.length];
}

/** Up to two neighbours in the same drawer, the next one first. */
export function relatedGuides(id: GuideId): GuideEntry[] {
  const entry = guideEntry(id);
  if (!entry.topic) return [];
  const drawer = guides.filter((guide) => guide.topic === entry.topic);
  const at = drawer.findIndex((guide) => guide.id === id);
  const order = [...drawer.slice(at + 1), ...drawer.slice(0, at)];
  return order.slice(0, 2);
}
