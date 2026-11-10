/**
 * The words around the guides (Arabic only). The Phase 2 card and the booking
 * line are the old WordPress template's own copy; the trial length (7 days) and
 * the writer and reviewer were confirmed by the owner on 2026-11-10.
 */
export const einvoicingCopy = {
  hubCrumb: "الفوترة الإلكترونية",
  catalogue: "الفهرس",
  catalogueLabel: "فهرس دليل الفوترة الإلكترونية",
  catalogueHeading: "فهرس الدليل",
  catalogueLede: "اثنتا عشرة بطاقة في أربعة أبواب، تبدأ من مفهوم الفاتورة الإلكترونية وتنتهي بغراماتها.",
  openCatalogue: "الفهرس",
  card: {
    label: "بطاقة الدليل",
    reading: "القراءة",
    writer: "كتابة",
    reviewer: "مراجعة",
    updated: "آخر تحديث",
    related: "ذات صلة",
    cards: "البطاقات",
    next: "البطاقة التالية",
    nextShort: "التالية",
  },
  authors: {
    writer: "نورة النافع",
    reviewer: "فيصل المطيري",
    reviewerTitle: "محاسب قانوني",
  },
  phaseTwo: {
    title: "جاهز للانتقال بأمان للمرحلة الثانية من الفوترة الإلكترونية مع ڤوم؟",
    cta: "ابدأ بتجربة مجانية لمدة 7 أيام",
    points: [
      "التوافق مع المرحلة الثانية للفاتورة الإلكترونية",
      "يعتبر ڤوم من مزودي الحلول المعتمدين",
      "بياناتك المالية محمية وفق أعلى معايير الحماية والخصوصية",
    ],
  },
  booking: {
    question: "تشعر بالتوهان أو التردد؟",
    line: "احجز مكالمة امتثال مجانية لمدة 15 دقيقة مع خبير معتمد",
    cta: "احجز المكالمة",
    newTab: "(تفتح في نافذة جديدة)",
  },
  newTab: "(يفتح في نافذة جديدة)",
} as const;

/** "N دقيقة" with Arabic number agreement. */
export function readingTime(minutes: number): string {
  if (minutes <= 1) return "دقيقة واحدة";
  if (minutes === 2) return "دقيقتان";
  if (minutes <= 10) return `${minutes} دقائق`;
  return `${minutes} دقيقة`;
}

/** A WordPress date as "5 سبتمبر 2025" (Gregorian, Western digits). */
export function guideDate(iso: string): string {
  return new Intl.DateTimeFormat("ar", {
    calendar: "gregory",
    numberingSystem: "latn",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Riyadh",
  }).format(new Date(iso));
}
