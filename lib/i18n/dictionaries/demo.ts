/**
 * DEMO CONTENT. Everything in this file is invented for design review on
 * 2026-10-25 at the owner's request. Client logos are well-known brands used
 * as stand-ins, testimonials and portraits are placeholders, and several
 * integration partners and all integration statistics are made up. Replace
 * with real, approved material before launch. PRODUCT.md › Evidence on Hand
 * lists what is real.
 */

export interface DemoLogo {
  name: string;
  src: string;
}

export interface DemoTestimonial {
  quote: { ar: string; en: string };
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  business: { ar: string; en: string };
  avatar: string;
  metric: { value: string; label: { ar: string; en: string } };
}

export interface DemoIntegration {
  id: string;
  name: string;
  logo: string | null;
  category: { ar: string; en: string };
  body: { ar: string; en: string };
  description: { ar: string; en: string };
  live: boolean;
  stats: { clients: number; invoices: number; sync: { ar: string; en: string } };
  steps: { ar: string; en: string }[];
}

export const demoLogos: DemoLogo[] = [
  { name: "Google", src: "/demo/logos/google.svg" },
  { name: "Meta", src: "/demo/logos/meta.svg" },
  { name: "Netflix", src: "/demo/logos/netflix.svg" },
  { name: "Spotify", src: "/demo/logos/spotify.svg" },
  { name: "Airbnb", src: "/demo/logos/airbnb.svg" },
  { name: "Uber", src: "/demo/logos/uber.svg" },
  { name: "Shopify", src: "/demo/logos/shopify.svg" },
  { name: "Stripe", src: "/demo/logos/stripe.svg" },
  { name: "Notion", src: "/demo/logos/notion.svg" },
  { name: "Figma", src: "/demo/logos/figma.svg" },
  { name: "Nike", src: "/demo/logos/nike.svg" },
];

export const demoTestimonials: DemoTestimonial[] = [
  {
    quote: {
      ar: "كنت أخاف من المرحلة الثانية أكثر مما أخاف من الضريبة نفسها. مع ڤوم، أول فاتورة وصلت الهيئة قبل أن أنتهي من طباعتها للعميل.",
      en: "I was more afraid of Phase 2 than of the tax itself. With VoM, my first invoice reached the Authority before I had finished printing it for the customer.",
    },
    name: { ar: "عبدالله الحربي", en: "Abdullah Al Harbi" },
    role: { ar: "المالك", en: "Owner" },
    business: { ar: "مطاعم الديوانية، الرياض", en: "Al Diwaniya Restaurants, Riyadh" },
    avatar: "/demo/avatars/1.jpg",
    metric: { value: "0", label: { ar: "فاتورة مرفوضة منذ الربط", en: "rejected invoices since go-live" } },
  },
  {
    quote: {
      ar: "أدير ثلاثة فروع من جوالي. قائمة الدخل تتحدّث مع كل عملية بيع، ولم أفتح ملف إكسل منذ سنة.",
      en: "I run three branches from my phone. The income statement updates with every sale, and I have not opened a spreadsheet in a year.",
    },
    name: { ar: "نورة القحطاني", en: "Noura Al Qahtani" },
    role: { ar: "المديرة التنفيذية", en: "Managing director" },
    business: { ar: "صالون لمسة، جدة", en: "Lamsa Salon, Jeddah" },
    avatar: "/demo/avatars/2.jpg",
    metric: { value: "3", label: { ar: "فروع من جوال واحد", en: "branches from one phone" } },
  },
  {
    quote: {
      ar: "كمحاسب قانوني، ما يهمني هو القيود الصحيحة والتقارير التي تصمد أمام المراجعة. ڤوم يعطيني الاثنين، وعملائي يفهمون أرقامهم لأول مرة.",
      en: "As a chartered accountant, what matters to me is correct entries and reports that survive an audit. VoM gives me both, and my clients understand their numbers for the first time.",
    },
    name: { ar: "خالد العتيبي", en: "Khalid Al Otaibi" },
    role: { ar: "محاسب قانوني", en: "Chartered accountant" },
    business: { ar: "مكتب العتيبي للمحاسبة، الدمام", en: "Al Otaibi Accounting, Dammam" },
    avatar: "/demo/avatars/3.jpg",
    metric: { value: "18", label: { ar: "منشأة يديرها من حساب واحد", en: "businesses managed from one account" } },
  },
  {
    quote: {
      ar: "ربطنا زد بڤوم في عشر دقائق. كل طلب يصبح قيدًا وفاتورة من دون أن يلمسه أحد.",
      en: "We connected Zid to VoM in ten minutes. Every order becomes an entry and an invoice without anyone touching it.",
    },
    name: { ar: "سارة الدوسري", en: "Sara Al Dossary" },
    role: { ar: "المديرة المالية", en: "Finance manager" },
    business: { ar: "متجر نُسك، الرياض", en: "Nusuk Store, Riyadh" },
    avatar: "/demo/avatars/4.jpg",
    metric: { value: "10", label: { ar: "دقائق لربط المتجر", en: "minutes to connect the store" } },
  },
  {
    quote: {
      ar: "أصوّر فاتورة المورد بالجوال وتدخل المشتريات وحدها. المحاسب يراجع آخر الشهر فقط.",
      en: "I photograph the supplier's invoice on my phone and the purchase books itself. The accountant only reviews at month end.",
    },
    name: { ar: "محمد الشهري", en: "Mohammed Al Shehri" },
    role: { ar: "المالك", en: "Owner" },
    business: { ar: "مركز المحرك لصيانة السيارات، جدة", en: "Al Muharrik Auto Care, Jeddah" },
    avatar: "/demo/avatars/5.jpg",
    metric: { value: "6", label: { ar: "ساعات موفّرة أسبوعيًا", en: "hours saved every week" } },
  },
  {
    quote: {
      ar: "كنا نؤجل الفوترة لنهاية الشهر. الآن تخرج الفاتورة مع تسليم المشروع، والتحصيل أسرع بأسابيع.",
      en: "We used to postpone invoicing to month end. Now the invoice goes out with the project delivery, and collection is weeks faster.",
    },
    name: { ar: "ريم العمري", en: "Reem Al Amri" },
    role: { ar: "شريكة مؤسسة", en: "Co-founder" },
    business: { ar: "أفق للتصميم، الخبر", en: "Ufuq Design, Khobar" },
    avatar: "/demo/avatars/6.jpg",
    metric: { value: "3", label: { ar: "أسابيع أسرع في التحصيل", en: "weeks faster collection" } },
  },
];

export const demoIntegrations: DemoIntegration[] = [
  {
    id: "foodics",
    name: "Foodics",
    logo: "/demo/integrations/foodics.png",
    category: { ar: "نقاط بيع المطاعم", en: "Restaurant POS" },
    body: { ar: "مبيعات المطعم تصل فواتير جاهزة", en: "Restaurant sales arrive as invoices" },
    description: {
      ar: "كل طلب يُغلق على كاشير فودكس يصل إلى ڤوم كفاتورة ضريبية مبسطة برمز QR، ويُبلَّغ إلى زاتكا، ويُرحَّل إلى قائمة الدخل في اللحظة نفسها. المرتجعات تصبح إشعارات دائنة تلقائيًا.",
      en: "Every order closed on a Foodics till reaches VoM as a simplified tax invoice with a QR code, is reported to ZATCA, and is posted to the income statement at the same moment. Refunds become credit notes automatically.",
    },
    live: true,
    stats: { clients: 100, invoices: 48000, sync: { ar: "أقل من دقيقة", en: "under a minute" } },
    steps: [
      { ar: "اربط حساب فودكس من إعدادات ڤوم بضغطة واحدة.", en: "Connect your Foodics account from VoM settings in one click." },
      { ar: "اختر الفروع وحسابات الإيراد لكل فرع.", en: "Choose the branches and the revenue account for each." },
      { ar: "تصل كل عملية بيع فاتورةً مبلّغة وقيدًا مرحّلًا.", en: "Every sale arrives as a reported invoice and a posted entry." },
    ],
  },
  {
    id: "zid",
    name: "Zid",
    logo: "/demo/integrations/zid.png",
    category: { ar: "تجارة إلكترونية", en: "E-commerce" },
    body: { ar: "طلبات متجرك قيود مرحّلة", en: "Store orders become entries" },
    description: {
      ar: "طلبات متجرك على زد تصبح فواتير إلكترونية وقيودًا محاسبية، مع تسوية المدفوعات ورسوم الشحن تلقائيًا. المخزون في ڤوم يتحدّث مع كل طلب.",
      en: "Your Zid store orders become e-invoices and accounting entries, with payments and shipping fees reconciled automatically. VoM inventory updates with every order.",
    },
    live: true,
    stats: { clients: 240, invoices: 61000, sync: { ar: "لحظي", en: "real time" } },
    steps: [
      { ar: "فعّل ڤوم من سوق تطبيقات زد.", en: "Enable VoM from the Zid app marketplace." },
      { ar: "اربط المنتجات بالأصناف في ڤوم مرة واحدة.", en: "Map products to VoM items once." },
      { ar: "كل طلب مدفوع يصبح فاتورة وقيدًا.", en: "Every paid order becomes an invoice and an entry." },
    ],
  },
  {
    id: "salla",
    name: "Salla",
    logo: "/demo/integrations/salla.png",
    category: { ar: "تجارة إلكترونية", en: "E-commerce" },
    body: { ar: "مزامنة الطلبات والمرتجعات", en: "Orders and returns in sync" },
    description: {
      ar: "تكامل سلة قيد الإطلاق: مزامنة الطلبات والمرتجعات والمدفوعات، مع فوترة إلكترونية مبلّغة لكل طلب.",
      en: "The Salla integration is launching soon: orders, returns and payments in sync, with a reported e-invoice for every order.",
    },
    live: false,
    stats: { clients: 85, invoices: 0, sync: { ar: "لحظي", en: "real time" } },
    steps: [
      { ar: "سجّل في قائمة الانتظار من إعدادات ڤوم.", en: "Join the waitlist from VoM settings." },
      { ar: "سنربط متجرك عند الإطلاق دون أي إعداد منك.", en: "We connect your store at launch with no setup from you." },
      { ar: "الطلبات السابقة تُستورد في أول مزامنة.", en: "Past orders are imported in the first sync." },
    ],
  },
  {
    id: "marn",
    name: "Marn",
    logo: "/demo/integrations/marn.png",
    category: { ar: "نقاط بيع", en: "Point of sale" },
    body: { ar: "الكاشير والمخزون في مكان واحد", en: "Cashier and inventory together" },
    description: {
      ar: "مبيعات مرن تصل إلى ڤوم مع تفاصيل الأصناف وطرق الدفع، فتتحدّث الفواتير والمخزون والتقارير معًا.",
      en: "Marn sales reach VoM with item details and payment methods, so invoices, inventory and reports update together.",
    },
    live: true,
    stats: { clients: 70, invoices: 22000, sync: { ar: "أقل من دقيقة", en: "under a minute" } },
    steps: [
      { ar: "اربط حساب مرن من إعدادات ڤوم.", en: "Connect your Marn account from VoM settings." },
      { ar: "اختر طريقة ترحيل المدفوعات النقدية والشبكة.", en: "Choose how cash and card payments are posted." },
      { ar: "تصل كل عملية بيع فاتورةً مبلّغة.", en: "Every sale arrives as a reported invoice." },
    ],
  },
  {
    id: "prexle",
    name: "Prexle",
    logo: "/demo/integrations/prexle.png",
    category: { ar: "كاشير", en: "Cashier" },
    body: { ar: "كل عملية بيع فاتورة مبلّغة", en: "Every sale a reported invoice" },
    description: {
      ar: "كاشير بريكسل يرسل كل عملية بيع إلى ڤوم مع رمز QR المعتمد، والإقفال اليومي يصبح قيدًا واحدًا مرتبًا.",
      en: "The Prexle cashier sends every sale to VoM with the approved QR code, and the daily close becomes one tidy entry.",
    },
    live: true,
    stats: { clients: 55, invoices: 17000, sync: { ar: "أقل من دقيقة", en: "under a minute" } },
    steps: [
      { ar: "فعّل ڤوم من لوحة بريكسل.", en: "Enable VoM from the Prexle dashboard." },
      { ar: "اربط الفروع بحسابات الإيراد.", en: "Map branches to revenue accounts." },
      { ar: "الإقفال اليومي يُرحَّل تلقائيًا.", en: "The daily close is posted automatically." },
    ],
  },
  {
    id: "rewaa",
    name: "Rewaa",
    logo: "/demo/integrations/rewaa.png",
    category: { ar: "مخزون", en: "Inventory" },
    body: { ar: "حركة المخزون تُرحَّل تلقائيًا", en: "Stock movements posted automatically" },
    description: {
      ar: "قيد الإطلاق: حركة المخزون في رواء تنعكس على ڤوم، فتعرف تكلفة البضاعة المباعة لحظة بلحظة.",
      en: "Launching soon: stock movements in Rewaa are reflected in VoM, so you know your cost of goods sold to the minute.",
    },
    live: false,
    stats: { clients: 40, invoices: 0, sync: { ar: "كل ساعة", en: "hourly" } },
    steps: [
      { ar: "سجّل في قائمة الانتظار.", en: "Join the waitlist." },
      { ar: "اربط المستودعات بالأصناف.", en: "Map warehouses to items." },
      { ar: "تكلفة البضاعة المباعة تُحسب تلقائيًا.", en: "Cost of goods sold is calculated automatically." },
    ],
  },
  {
    id: "moyasar",
    name: "Moyasar",
    logo: "/demo/integrations/moyasar.png",
    category: { ar: "مدفوعات", en: "Payments" },
    body: { ar: "التحصيل الإلكتروني مع كل فاتورة", en: "Online collection on every invoice" },
    description: {
      ar: "قيد الإطلاق: رابط دفع ميسر مع كل فاتورة، وتسوية المبالغ المحصّلة مع الرسوم في القيد نفسه.",
      en: "Launching soon: a Moyasar payment link on every invoice, with collected amounts and fees reconciled in the same entry.",
    },
    live: false,
    stats: { clients: 120, invoices: 0, sync: { ar: "لحظي", en: "real time" } },
    steps: [
      { ar: "سجّل في قائمة الانتظار.", en: "Join the waitlist." },
      { ar: "اربط حساب ميسر التاجر.", en: "Connect your Moyasar merchant account." },
      { ar: "كل فاتورة تحمل رابط دفع.", en: "Every invoice carries a payment link." },
    ],
  },
  {
    id: "tap",
    name: "Tap",
    logo: null,
    category: { ar: "مدفوعات", en: "Payments" },
    body: { ar: "مدى وأبل باي على روابط الدفع", en: "mada and Apple Pay on payment links" },
    description: {
      ar: "قيد الإطلاق: مدى وأبل باي وفيزا وماستركارد على روابط الدفع التي ترسلها مع فواتيرك.",
      en: "Launching soon: mada, Apple Pay, Visa and Mastercard on the payment links you send with your invoices.",
    },
    live: false,
    stats: { clients: 95, invoices: 0, sync: { ar: "لحظي", en: "real time" } },
    steps: [
      { ar: "سجّل في قائمة الانتظار.", en: "Join the waitlist." },
      { ar: "اربط حساب Tap.", en: "Connect your Tap account." },
      { ar: "المدفوعات تُسوّى مع الفواتير تلقائيًا.", en: "Payments are reconciled to invoices automatically." },
    ],
  },
  {
    id: "nuqta",
    name: "Nuqta",
    logo: "/demo/integrations/nuqta.png",
    category: { ar: "ولاء العملاء", en: "Loyalty" },
    body: { ar: "النقاط والخصومات في القيد نفسه", en: "Points and discounts in the same entry" },
    description: {
      ar: "خصومات نقاط الولاء من نقطة تُقيَّد تلقائيًا على الفاتورة، فتبقى الإيرادات والخصومات دقيقة في التقارير.",
      en: "Loyalty discounts from Nuqta are booked on the invoice automatically, keeping revenue and discounts accurate in reports.",
    },
    live: true,
    stats: { clients: 30, invoices: 9000, sync: { ar: "لحظي", en: "real time" } },
    steps: [
      { ar: "اربط حساب نقطة من إعدادات ڤوم.", en: "Connect your Nuqta account from VoM settings." },
      { ar: "اختر حساب الخصومات.", en: "Choose the discounts account." },
      { ar: "كل خصم ولاء يظهر في الفاتورة والقيد.", en: "Every loyalty discount appears on the invoice and the entry." },
    ],
  },
  {
    id: "mola",
    name: "Mola",
    logo: null,
    category: { ar: "توصيل", en: "Delivery" },
    body: { ar: "طلبات التوصيل تُقيَّد لحظيًا", en: "Delivery orders booked instantly" },
    description: {
      ar: "طلبات التوصيل من مولا تصل إلى ڤوم كفواتير، مع فصل رسوم التوصيل والعمولات في حسابات مستقلة.",
      en: "Delivery orders from Mola reach VoM as invoices, with delivery fees and commissions separated into their own accounts.",
    },
    live: true,
    stats: { clients: 45, invoices: 12000, sync: { ar: "أقل من دقيقة", en: "under a minute" } },
    steps: [
      { ar: "اربط حساب مولا.", en: "Connect your Mola account." },
      { ar: "اختر حسابات الرسوم والعمولات.", en: "Choose the fee and commission accounts." },
      { ar: "كل طلب توصيل فاتورة مبلّغة.", en: "Every delivery order is a reported invoice." },
    ],
  },
];
