import type { InvoiceTemplatesCopy } from "./types";

/**
 * The old Arabic page's words, one to one (owner, 2026-11-11), with character
 * fixes only: the H1's «محٜانية» (U+065C, a dot below, made the ح read as ج)
 * reads «مجانية»; «و المجانية», «و قوالب» and «قوالب و نماذج» lose the stray
 * space; «على ان» takes its hamza; the note's comma before «إذا» becomes a full stop, since
 * the page sets the statement and the offer as two lines; the description's «Word ،PDF» comma sits after
 * Word. The six card names stay as written although every file is the same sales
 * invoice form (owner). The paper line, the record caption, the alts and the
 * closing band are new: the page's own labels, no new claims.
 */
export const invoiceTemplatesAr: InvoiceTemplatesCopy = {
  seo: {
    title: "نماذج فواتير مجانية جاهزة | Word Excel PDF",
    description:
      "هل تحتاج نماذج فواتير يمكنك تخصيصها؟ إليك مجموعة قوالب ونماذج فواتير مجانية وجاهزة للتحميل والطباعة أونلاين - حملها الآن Word، PDF مباشرة.",
  },
  published: "2024-08-10T12:47:58+00:00",
  modified: "2024-08-11T22:32:41+00:00",
  crumb: "نماذج فواتير",
  h1: "نماذج فواتير مجانية",
  intro:
    "في ڤوم، ندرك أن إنشاء فواتير احترافية يعد جزءاً مهماً من إدارة أعمالك بكفاءة. لتسهيل هذه العملية بالنسبة لك، يسعدنا أن نقدم مجموعة مختارة من قوالب الفواتير عالية الجودة، والقابلة للتخصيص، والمجانية تماماً.",
  note: {
    statement: "نود التنويه على أن هذه القوالب لا تدعم الفوترة الإلكترونية.",
    offer: "إذا كنت تبحث عن فواتير إلكترونية يمكنك تجربة النظام هنا مجاناً",
  },
  register: "سجل الآن",
  paperLine: "6 نماذج للطباعة · Word وPDF",
  heroAlt: "نماذج فواتير: صفحتان من نموذج فاتورة مبيعات بتصميم أخضر وبرتقالي",
  record: {
    alt: "فاتورة ضريبية صادرة من ڤوم برمز QR: بيانات البائع والعميل، بند الخدمة، الضريبة والإجمالي",
    caption: "فاتورة ضريبية صادرة من ڤوم · بيانات تجريبية",
  },
  h2: "نماذج فواتير وقوالب فاتورة مجانية جاهزة للتحميل والطباعة",
  templates: {
    sales: { name: "نموذج فاتورة مبيعات", alt: "تصميم فاتورة مبيعات بخطوط زرقاء فاتحة، صفحة كاملة" },
    tax: { name: "نموذج فاتورة ضريبية", alt: "تصميم فاتورة مبيعات بترويسة خضراء وبرتقالية، صفحة كاملة" },
    "e-invoice": { name: "نموذج فاتورة إلكترونية", alt: "تصميم فاتورة مبيعات بإطار أخضر وجدول مستدير، صفحة كاملة" },
    business: { name: "قالب فاتورة الأعمال", alt: "تصميم فاتورة مبيعات بكتلة زرقاء لبيانات المنشأة، صفحة كاملة" },
    quote: { name: "عرض أسعار المبيعات", alt: "تصميم فاتورة مبيعات بإطار برتقالي، صفحة كاملة" },
    "company-quote": { name: "نموذج عرض سعر للشركات", alt: "تصميم فاتورة مبيعات رمادي بجدول داكن، صفحة كاملة" },
  },
  download: {
    word: "Word",
    pdf: "PDF",
    lead: (name) => `تحميل ${name} بصيغة `,
  },
  createOnline: "إنشاء أونلاين",
  close: {
    line: "تبحث عن فواتير إلكترونية؟ أصدرها من ڤوم، المعتمد من هيئة الزكاة والضريبة والجمارك.",
    cta: "ابدأ بتجربة مجانية لمدة 7 أيام",
  },
};
