import type { Locale } from "@/lib/i18n/config";
import type { PayErrorCode } from "@/lib/leads/vom-pay";

/**
 * The VoM Pay result pages: getvom.com/vom-pay-success/ and /vom-pay-failure/,
 * and their English twins under /en/. The app sends a payer here after a VoM
 * Pay payment; nothing on the site links to them, the addresses stay exactly as
 * they were, and each speaks its own language (owner, 2026-11-12). Hidden from
 * search (url-map.csv keep-noindex).
 *
 * The Arabic copy is the old pages', one to one, with the spelling fixes logged
 * in docs/content/vom-pay-text-changes.md (the success page was read from the
 * mirror, the failure page from the live site, on 2026-11-12). WordPress served
 * the Arabic page at the English addresses too; the English copy is new, written
 * natively from the Arabic, and awaits the owner's approval. Strings marked
 * "new" in Arabic did not exist on the old pages.
 */

const dir = "/vom-pay";

export interface PayImage {
  src: string;
  width: number;
  height: number;
}

export const vomPayImages = {
  success: { src: `${dir}/success.webp`, width: 1200, height: 1646 },
  failure: { src: `${dir}/failure.webp`, width: 1200, height: 1646 },
  heroBg: { src: `${dir}/hero-bg.webp`, width: 1600, height: 1184 },
  vomAi: { src: `${dir}/vom-ai.webp`, width: 640, height: 363 },
  laptop: { src: `${dir}/laptop.webp`, width: 1600, height: 1153 },
  zatca: { src: `${dir}/zatca.webp`, width: 640, height: 168 },
} satisfies Record<string, PayImage>;

/** The six feature icons, in the old page's order (the first two were the same drawing there too). */
const featureIcons = ["einvoicing", "finance", "compliance", "ai", "support", "integrations"].map((name) => `${dir}/icon-${name}.webp`);

interface FormCopy {
  name: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  optional: string;
  submit: string;
  sending: string;
  errors: { name: string; phone: string; email: string; network: string };
  thanks: { heading: string; body: string; whatsapp: string };
}

export interface SuccessCopy {
  seoTitle: string;
  description: string;
  heading: string;
  line: string;
  /** The illustration's text alternative. */
  alt: string;
  formIntro: [string, string];
  form: FormCopy;
  /** The old pages' three lines: the lead becomes the features section's heading; «VoM AI» is drawn as its logo, named by `badge`. */
  pitch: { lead: string; badge: string; line: string };
  featuresHeading: string;
  laptopAlt: string;
  zatcaAlt: string;
  features: { title: string; body: string; icon: string }[];
  closing: string;
  register: string;
}

export interface FailureCopy {
  seoTitle: string;
  description: string;
  heading: string;
  alt: string;
  /** Shown before the code the app sent: «رمز الخطأ: 2». */
  codeLabel: string;
  messageHeading: string;
  /** The old page's three messages; 1 is also the general one, for a missing or unknown code. */
  messages: Record<PayErrorCode, string>;
  faqHeading: string;
  faq: { q: string; a: string }[];
}

const titles = (list: string[], bodies: string[]) => list.map((title, i) => ({ title, body: bodies[i], icon: featureIcons[i] }));

export const vomPaySuccess: Record<Locale, SuccessCopy> = {
  ar: {
    /** Kept byte for byte, as the other result and tool pages keep theirs. */
    seoTitle: "فوم باي - تمت العملية بنجاح - Vom",
    description: "هل أعجبتك تجربتك مع VoM Pay؟",
    heading: "تم الدفع بنجاح!",
    line: "هل أعجبتك تجربتك مع VoM Pay؟",
    /** new */
    alt: "هاتف تظهر على شاشته علامة صح، وبجانبه فاتورة وقطع نقدية",
    formIntro: ["الآن يمكنك تجربة VoM Pay في عملك مجاناً", "اترك بياناتك أدناه وسيتواصل معك أحد أعضاء فريقنا!"],
    form: {
      name: "الاسم",
      phone: "رقم الموبايل",
      /** The campaign form's example number. */
      phonePlaceholder: "0512345678",
      email: "البريد الإلكتروني",
      /** new, as on the campaign form */
      optional: "(اختياري)",
      submit: "إرسال",
      /** new, as on the campaign form */
      sending: "جارٍ الإرسال…",
      /** new, as on the campaign form */
      errors: {
        name: "اكتب اسمك الكامل.",
        phone: "أدخل رقم جوال سعودي من 10 أرقام يبدأ بـ 05، مثل 0512345678.",
        email: "تحقق من البريد الإلكتروني، أو اتركه فارغًا.",
        network: "تعذّر إرسال طلبك الآن. تحقق من اتصالك ثم أعد المحاولة، أو راسلنا على واتساب.",
      },
      /** new, as on the campaign form */
      thanks: {
        heading: "شكرًا لك، وصلنا طلبك.",
        body: "سيتواصل معك فريقنا بأسرع وقت ممكن.",
        whatsapp: "تحتاج ردًا أسرع؟ راسلنا على واتساب",
      },
    },
    pitch: {
      lead: "احصل على أسهل برنامج محاسبي معتمد من هيئة الزكاة والضريبة والجمارك للفوترة الإلكترونية",
      badge: "VoM AI",
      line: "مزود بالذكاء الاصطناعي لتحصل على تحليلاتك المالية بدقة أكبر",
    },
    featuresHeading: "مميزات",
    laptopAlt: "لوحة تحكم ڤوم على حاسوب محمول",
    zatcaAlt: "هيئة الزكاة والضريبة والجمارك",
    features: titles(
      ["الفوترة الإلكترونية", "إدارة مالية شاملة", "التوافق مع القوانين الضريبية", "تحليلات مالية ذكية باستخدام الذكاء الاصطناعي", "دعم فني مخصص", "تكامل مع التطبيقات الأخرى"],
      [
        "يتيح لك VoM إصدار الفواتير الإلكترونية المعتمدة من هيئة الزكاة والضريبة والجمارك للمرحلة الأولى والمرحلة الثانية بسهولة وفعالية، مما يساهم في ضمان التزامك بالمعايير الضريبية.",
        "VoM يوفر جميع الأدوات التي تحتاجها لإدارة الحسابات والفواتير والمصروفات في مكان واحد، مما يجعل عملياتك المالية سلسة ومنظمة.",
        "يساعدك VoM على الالتزام باللوائح الضريبية المحلية من خلال أدوات متطورة تضمن دقة وسهولة في التعامل مع الأمور الضريبية.",
        "مع ميزة VoM AI، يمكنك الاستفادة من تحليلات متقدمة تعتمد على الذكاء الاصطناعي، مما يوفر لك رؤى أعمق ويعزز دقة القرارات المالية.",
        "يوفر VoM فريق دعم متاح دائمًا لمساعدتك في أي استفسار أو مشكلة، مما يضمن لك تحقيق أقصى استفادة من البرنامج وتقنياته المتقدمة.",
        "يدعم الربط مع أنظمة نقاط البيع، ومنصات التجارة الإلكترونية، وأنظمة الموارد البشرية، مما يضمن لك تجربة متكاملة وسهلة.",
      ],
    ),
    closing: "استخدم VoM AI وحقق نقلة نوعية في إدارة أعمالك!",
    register: "سجل الآن",
  },
  /** All new: written natively from the Arabic, for the owner's approval. */
  en: {
    seoTitle: "VoM Pay: payment successful | VoM",
    description: "Your VoM Pay payment went through. Enjoyed it? Try VoM Pay in your own business, free.",
    heading: "Payment successful!",
    line: "Did you enjoy paying with VoM Pay?",
    alt: "A phone showing a tick, beside an invoice and coins",
    formIntro: ["Now you can try VoM Pay in your own business, free.", "Leave your details below and one of our team will be in touch!"],
    form: {
      name: "Name",
      phone: "Mobile number",
      phonePlaceholder: "0512345678",
      email: "Email",
      optional: "(optional)",
      submit: "Send",
      sending: "Sending…",
      errors: {
        name: "Enter your full name.",
        phone: "Enter a 10-digit Saudi mobile number starting with 05, like 0512345678.",
        email: "Check the email address, or leave it blank.",
        network: "We couldn’t send your details just now. Check your connection and try again, or message us on WhatsApp.",
      },
      thanks: {
        heading: "Thank you, we have your details.",
        body: "Our team will contact you as soon as possible.",
        whatsapp: "Need a faster reply? Message us on WhatsApp",
      },
    },
    pitch: {
      lead: "Get the easiest accounting software for e-invoicing, approved by the Zakat, Tax and Customs Authority",
      badge: "VoM AI",
      line: "With built-in AI, so your financial analysis is more accurate",
    },
    featuresHeading: "Features",
    laptopAlt: "VoM’s dashboard on a laptop",
    zatcaAlt: "Zakat, Tax and Customs Authority",
    features: titles(
      ["E-invoicing", "Complete financial management", "Tax compliance", "Smart financial analytics with AI", "Dedicated support", "Works with your other apps"],
      [
        "VoM lets you issue e-invoices approved by the Zakat, Tax and Customs Authority for Phase 1 and Phase 2, simply and efficiently, so you keep to the tax standards.",
        "VoM gives you every tool you need to manage your accounts, invoices and expenses in one place, so your finances run smoothly and stay organised.",
        "VoM helps you keep to local tax regulations, with advanced tools that make tax matters accurate and easy to handle.",
        "With VoM AI, you get advanced analytics driven by artificial intelligence, for deeper insight and sharper financial decisions.",
        "VoM’s support team is always on hand to help with any question or problem, so you get the most out of the software and its advanced features.",
        "VoM connects with point-of-sale systems, e-commerce platforms and HR systems, for a joined-up, easy experience.",
      ],
    ),
    closing: "Use VoM AI and transform the way you run your business!",
    register: "Register Now",
  },
};

export const vomPayFailure: Record<Locale, FailureCopy> = {
  ar: {
    /** Kept byte for byte. */
    seoTitle: "فوم باي - فشل الدفع - Vom",
    /** The old description was «رمز الخطأ: 1», the code's placeholder; it is now the general message. */
    description: "حدث خطأ ما في عملية الدفع",
    heading: "فشل الدفع!",
    /** new */
    alt: "هاتف تظهر على شاشته علامة خطأ، وبجانبه فاتورة",
    codeLabel: "رمز الخطأ:",
    messageHeading: "حصل خطأ في عملية الدفع!",
    /** The old page's script, with its spelling fixes. */
    messages: {
      "1": "حدث خطأ ما في عملية الدفع",
      "2": "تم دفع هذه الفاتورة بشكل كامل أو جزئي",
      "3": "المورد لم يعد نشطًا في خدمة VoM Pay",
    },
    faqHeading: "أسئلة شائعة",
    faq: [
      {
        q: "هل أستطيع وضع الشعار الخاص بي على الفاتورة؟",
        a: "بالتأكيد، بإمكانك وضع العلامة التجارية الخاصة بك على الفاتورة لضمان التوافق مع لوائح هيئة الزكاة والضريبة والجمارك.",
      },
      {
        q: "هل يمكنني منح الصلاحيات لمختلف الفريق؟",
        a: "يمكنك تنظيم وتخصيص صلاحيات فريقك بكل سهولة ويسر؛ بما يتوافق مع احتياجات ومهام أعضاء الفريق في هذا القطاع.",
      },
      {
        q: "هل ڤوم مناسب لعملي؟",
        a: "ستجد في نظام ڤوم شريكًا مثاليًّا ومساعدًا مهمًّا لإدارة المبيعات وإصدار الفواتير ومعالجة مسائل الضرائب وإعداد التقارير المخصصة لدعم الشركات الصغيرة والمتوسطة، حتى إذا كنت تفتقر إلى الخبرة في مجال المحاسبة.",
      },
    ],
  },
  /** All new: written natively from the Arabic, for the owner's approval. */
  en: {
    seoTitle: "VoM Pay: payment failed | VoM",
    description: "Your VoM Pay payment didn’t go through.",
    heading: "Payment failed!",
    alt: "A phone showing a cross, beside an invoice",
    codeLabel: "Error code:",
    messageHeading: "Something went wrong with your payment!",
    messages: {
      "1": "Something went wrong during the payment.",
      "2": "This invoice has already been paid, in full or in part.",
      "3": "This supplier is no longer active on VoM Pay.",
    },
    faqHeading: "Frequently asked questions",
    faq: [
      { q: "Can I put my own logo on the invoice?", a: "Absolutely. You can put your own brand on your invoices, in line with the Zakat, Tax and Customs Authority’s rules." },
      { q: "Can I give my team different permissions?", a: "Yes. You can set up and tailor your team’s permissions easily, to fit each member’s needs and tasks." },
      {
        q: "Is VoM right for my business?",
        a: "VoM is an ideal partner for small and medium-sized businesses: it manages your sales, issues your invoices, handles tax and prepares custom reports, even if you have no accounting experience.",
      },
    ],
  },
};
