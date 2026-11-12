import { homeClients } from "@/lib/content/clients";

/**
 * The paid-campaign landing page getvom.com/digital-ads-2023-landing-page/,
 * read from the live page on 2026-11-12. Arabic only, linked from nowhere on
 * the site, hidden from search (owner, 2026-11-12). Its form posts to the leads
 * backend as `digital-ads-2023-landing-page` (lib/leads/digital-ads-2023.ts).
 *
 * The copy is the old page's, one to one, with the character and spelling
 * fixes logged in docs/content/campaigns/digital-ads-2023-text-changes.md.
 * Strings marked "new" did not exist on the old page and await the owner's
 * approval. The testimonials are the old page's quotes and avatars, copied
 * exactly; the template's placeholder name «Client One» under each one is
 * dropped (owner, 2026-11-12).
 */

const dir = "/campaigns/digital-ads-2023";

export interface CampaignImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Testimonial {
  quote: string;
  avatar: CampaignImage;
}

/** A quote's avatar: the old page's square crop of a client's logo (2023/08/<n>.png). */
const avatar = (n: string, alt: string): CampaignImage => ({ src: `${dir}/avatar-${n}.webp`, width: 1000, height: 1000, alt });

export const digitalAds2023 = {
  path: "/digital-ads-2023-landing-page/",
  /** Kept byte for byte, as the tools and templates indexes keep theirs. */
  seoTitle: "برنامج المحاسبة السحابي الاول في السعودية - جرب مجانا | ڤوم",
  description: "ڤوم برنامج محاسبي سحابي معتمد من هيئة الزكاة والضريبة والجمارك، تستطيع من خلاله إصدار فواتير إلكترونية وإدارة جميع المبيعات و المشتريات و تسجيل المصروفات",
  /** The site's features card; the old page's og:image was a client's logo. */
  ogImage: "/og/features-ar.png",

  /** The heading ends in ZATCA's logo: «… المعتمد من [هيئة الزكاة والضريبة والجمارك]». */
  heading: "سهّل إدارتك المالية وصدّر فواتيرك الإلكترونية مع ڤوم المعتمد من",
  zatca: { src: `${dir}/zatca.webp`, width: 420, height: 73, alt: "هيئة الزكاة والضريبة والجمارك" },
  lede: "ڤوم برنامج محاسبي سحابي معتمد من هيئة الزكاة والضريبة والجمارك، تستطيع من خلاله إصدار فواتير إلكترونية وإدارة جميع المبيعات والمشتريات وتسجيل المصروفات لاستخراج جميع التقارير المالية المطلوبة للمنشأة",
  callToAction: "سجل الآن ليتواصل معك فريقنا بأسرع وقت ممكن",

  banner: { src: `${dir}/banner.webp`, width: 1200, height: 800, alt: "ثلاثة من رواد الأعمال يعملون على حواسيبهم حول طاولة اجتماعات" },

  featuresHeading: "مميزات ڤوم",
  features: [
    { title: "سجل وتتبع إيرادات ومصروفات الشركة", icon: { src: `${dir}/feature-1.webp`, width: 582, height: 582 } },
    { title: "إعداد الفوترة الإلكترونية لمنشأتك", icon: { src: `${dir}/feature-2.webp`, width: 647, height: 647 } },
    { title: "الربط مع أنظمة متعددة ومختلفة", icon: { src: `${dir}/feature-3.webp`, width: 458, height: 582 } },
    { title: "تقارير مالية متعددة", icon: { src: `${dir}/feature-4.webp`, width: 582, height: 541 } },
  ],

  /** The old page's logo carousel: the homepage's 47 client logos, in the same order. */
  clients: homeClients,

  rating: { src: `${dir}/rating.webp`, width: 512, height: 115, alt: "تقييم خمس نجوم" },
  testimonials: [
    { quote: "شركة ڤوم تقدم خدمة متميزة وتجاوبهم سريع، مناسب الشركات الصغيرة والناشئة", avatar: avatar("33", "Time Entertainment") },
    { quote: "فخور بوجود برنامج سعودي بهذه الكفاءة العالية", avatar: { src: `${dir}/avatar-abdulaziz.webp`, width: 400, height: 400, alt: "صورة صاحب الرأي" } },
    { quote: "بشكل عام البرنامج ممتاز وسهل الاستخدام", avatar: avatar("23", "العم خليل") },
    {
      quote: "برنامج المحاسبة فوم برنامج ممتاز جدا ويتميز بإمكانيات عالية لا تجدها في البرامج المحاسبية الاخرى وفريق الدعم والتدريب ماشاء الله على طول متواصلين معي",
      avatar: avatar("25", "Out of Line"),
    },
    { quote: "البرنامج ممتاز وسهل الاستخدام ومن افضل الاشياء فيه هم الموظفين والدعم وتعاونهم", avatar: avatar("8", "Sorour Entertainment") },
    {
      quote: "أشكر الطاقم الفني ومتميز في تعامله وفي إنجازاته ومساعدتهم للعملاء وانا واحد من العملاء بخصوص البرنامج جدا سهل وسلس وبسيط جدا ولا يحتاج إلى اي جهد فانا انصح فيه وبقوة",
      avatar: avatar("30", "KOY & Bakery House"),
    },
  ] satisfies Testimonial[],

  /** The old page's second carousel, under the testimonials: 12 round logos, in its order. */
  partners: [
    "أرامكو السعودية، ريادة الأعمال",
    "سند SAND",
    "صندوق الأمير سلطان بن عبدالعزيز التنموي",
    "F5",
    "شارك هب Sharik Hub",
    "أبعاد ABAAD",
    "500",
    "AstroLabs",
    "وادي طيبة Taibah Valley",
    "المكان The Space",
    "JOVIA",
    "Genius Co-Working Space",
  ].map((alt, i): CampaignImage => ({ src: `${dir}/round-${String(i + 1).padStart(2, "0")}.webp`, width: 1024, height: 1024, alt })),

  form: {
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    phonePlaceholder: "0512345678",
    /** new: the sector select's empty option, so it does not read as already chosen. */
    sectorChoose: "اختر قطاعك",
    submit: "سجل الآن",
    /** new */
    optional: "(اختياري)",
    /** new */
    sending: "جارٍ الإرسال…",
    /** new */
    errors: {
      name: "اكتب اسمك الكامل.",
      phone: "أدخل رقم جوال سعودي من 10 أرقام يبدأ بـ 05، مثل 0512345678.",
      email: "تحقق من البريد الإلكتروني، أو اتركه فارغًا.",
      sector: "اختر قطاعًا من القائمة.",
      network: "تعذّر إرسال طلبك الآن. تحقق من اتصالك ثم أعد المحاولة، أو راسلنا على واتساب.",
    },
    /** new */
    thanks: {
      heading: "شكرًا لك، وصلنا طلبك.",
      body: "سيتواصل معك فريقنا بأسرع وقت ممكن.",
      whatsapp: "تحتاج ردًا أسرع؟ راسلنا على واتساب",
    },
  },

  /** new: the floating button's name for screen readers. */
  whatsappLabel: "راسلنا على واتساب",
} as const;
