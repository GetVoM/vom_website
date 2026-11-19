/**
 * DEMO CONTENT. The testimonials and their portraits in this file are invented
 * placeholders, made for design review on 2026-10-25 at the owner's request, and
 * are live on the homepage until real, approved quotes replace them (owner,
 * 2026-11-16: keep until the content arrives). The client logos are no longer
 * here: they are the old site's own, in lib/content/clients.ts.
 */

export interface DemoTestimonial {
  quote: { ar: string; en: string };
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  business: { ar: string; en: string };
  avatar: string;
  metric: { value: string; label: { ar: string; en: string } };
}

export const demoTestimonials: DemoTestimonial[] = [
  {
    quote: {
      ar: "كنت أخاف من المرحلة الثانية أكثر مما أخاف من الضريبة نفسها. مع ڤوم، أول فاتورة وصلت الهيئة قبل أن أنتهي من طباعتها للعميل",
      en: "I was more afraid of Phase 2 than of the tax itself. With VoM, my first invoice reached the Authority before I had finished printing it for the customer",
    },
    name: { ar: "عبدالله الحربي", en: "Abdullah Al Harbi" },
    role: { ar: "المالك", en: "Owner" },
    business: { ar: "مطاعم الديوانية، الرياض", en: "Al Diwaniya Restaurants, Riyadh" },
    avatar: "/demo/avatars/1.jpg",
    metric: { value: "0", label: { ar: "فاتورة مرفوضة منذ الربط", en: "rejected invoices since go-live" } },
  },
  {
    quote: {
      ar: "أدير ثلاثة فروع من جوالي. قائمة الدخل تتحدّث مع كل عملية بيع، ولم أفتح ملف إكسل منذ سنة",
      en: "I run three branches from my phone. The income statement updates with every sale, and I have not opened a spreadsheet in a year",
    },
    name: { ar: "نورة القحطاني", en: "Noura Al Qahtani" },
    role: { ar: "المديرة التنفيذية", en: "Managing director" },
    business: { ar: "صالون لمسة، جدة", en: "Lamsa Salon, Jeddah" },
    avatar: "/demo/avatars/2.jpg",
    metric: { value: "3", label: { ar: "فروع من جوال واحد", en: "branches from one phone" } },
  },
  {
    quote: {
      ar: "كمحاسب قانوني، ما يهمني هو القيود الصحيحة والتقارير التي تصمد أمام المراجعة. ڤوم يعطيني الاثنين، وعملائي يفهمون أرقامهم لأول مرة",
      en: "As a chartered accountant, what matters to me is correct entries and reports that survive an audit. VoM gives me both, and my clients understand their numbers for the first time",
    },
    name: { ar: "خالد العتيبي", en: "Khalid Al Otaibi" },
    role: { ar: "محاسب قانوني", en: "Chartered accountant" },
    business: { ar: "مكتب العتيبي للمحاسبة، الدمام", en: "Al Otaibi Accounting, Dammam" },
    avatar: "/demo/avatars/3.jpg",
    metric: { value: "18", label: { ar: "منشأة يديرها من حساب واحد", en: "businesses managed from one account" } },
  },
  {
    quote: {
      ar: "ربطنا زد بڤوم في عشر دقائق. كل طلب يصبح قيدًا وفاتورة من دون أن يلمسه أحد",
      en: "We connected Zid to VoM in ten minutes. Every order becomes an entry and an invoice without anyone touching it",
    },
    name: { ar: "سارة الدوسري", en: "Sara Al Dossary" },
    role: { ar: "المديرة المالية", en: "Finance manager" },
    business: { ar: "متجر نُسك، الرياض", en: "Nusuk Store, Riyadh" },
    avatar: "/demo/avatars/4.jpg",
    metric: { value: "10", label: { ar: "دقائق لربط المتجر", en: "minutes to connect the store" } },
  },
  {
    quote: {
      ar: "أصوّر فاتورة المورد بالجوال وتدخل المشتريات وحدها. المحاسب يراجع آخر الشهر فقط",
      en: "I photograph the supplier's invoice on my phone and the purchase books itself. The accountant only reviews at month end",
    },
    name: { ar: "محمد الشهري", en: "Mohammed Al Shehri" },
    role: { ar: "المالك", en: "Owner" },
    business: { ar: "مركز المحرك لصيانة السيارات، جدة", en: "Al Muharrik Auto Care, Jeddah" },
    avatar: "/demo/avatars/5.jpg",
    metric: { value: "6", label: { ar: "ساعات موفّرة أسبوعيًا", en: "hours saved every week" } },
  },
  {
    quote: {
      ar: "كنا نؤجل الفوترة لنهاية الشهر. الآن تخرج الفاتورة مع تسليم المشروع، والتحصيل أسرع بأسابيع",
      en: "We used to postpone invoicing to month end. Now the invoice goes out with the project delivery, and collection is weeks faster",
    },
    name: { ar: "ريم العمري", en: "Reem Al Amri" },
    role: { ar: "شريكة مؤسسة", en: "Co-founder" },
    business: { ar: "أفق للتصميم، الخبر", en: "Ufuq Design, Khobar" },
    avatar: "/demo/avatars/6.jpg",
    metric: { value: "3", label: { ar: "أسابيع أسرع في التحصيل", en: "weeks faster collection" } },
  },
];
