/**
 * What VoM's customers say, for the homepage. The owner supplied the eight quotes,
 * their attributions and the logos and photos on 2026-11-22. The Arabic is theirs
 * word for word, with two typo fixes ("مناسب الشركات" took its missing لـ, and the
 * "٣" is written 3 like every other figure on the site) and no closing full stop.
 * The English is our own rendering; the businesses' English names follow their
 * logos where the logo has one (Daisy Day care, REFD, TIME, Uncle Khalil's BBQ,
 * Tamheed) and are transliterated otherwise.
 *
 * There are no ratings: none was given, and stars would claim one.
 */

type Text = { ar: string; en: string };

export interface Testimonial {
  quote: Text;
  /** The person, as the customer gave it ("أ." in Arabic; the first name alone in English). */
  name: Text;
  /** The business, or the person's field. */
  business: Text;
  /** A square logo or photo, 192 by 192 px; without one the card shows the business's initial. */
  logo?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      ar: "كنت أحتاج برنامج محاسبي يفهمني، مو أنا أفهمه، ومع ڤوم صار كل شيء واضح، وسهّل عليّ الشغل والتقارير بشكل كبير",
      en: "I needed accounting software that understands me, not software I have to understand. With VoM everything became clear, and my work and reports got a lot easier",
    },
    name: { ar: "أ. ناديه", en: "Nadia" },
    business: { ar: "مؤسسة الأقحوان لرياض الأطفال", en: "Daisy Day Care" },
    logo: "/testimonials/daisy-day-care.webp",
  },
  {
    quote: {
      ar: "من أول يوم، فريق رواد الجودة لخدمات الأعمال تعامل مع ڤوم بكل سهولة وبدون أي تعقيد، واكتشفوا أن القيمة اللي يقدمها ڤوم تستحق تكلفته",
      en: "From day one, the team at Ruwad Al Jawda Business Services found VoM easy to work with, without any complications, and saw that the value it delivers is worth what it costs",
    },
    name: { ar: "أ. محمود", en: "Mahmoud" },
    business: { ar: "شركة رواد الجودة لخدمات الأعمال", en: "Ruwad Al Jawda Business Services" },
  },
  {
    quote: {
      ar: "قبل ڤوم، التقارير الشهرية كانت تاخذ منا أسبوع إلى أسبوع ونص، والحين أقدر أشوف أرقامي وتحليلاتي بأي وقت",
      en: "Before VoM, our monthly reports took us a week to a week and a half. Now I can see my numbers and analysis whenever I want",
    },
    name: { ar: "أ. فاطمة", en: "Fatimah" },
    business: { ar: "شركة رفد الانسانية للخدمات التجارية", en: "REFD Al Insaniya Commercial Services" },
    logo: "/testimonials/refd.webp",
  },
  {
    quote: {
      ar: "شركة ڤوم تقدم خدمة متميزة وتجاوبهم سريع، مناسب للشركات الصغيرة والناشئة",
      en: "VoM gives outstanding service and they respond quickly. It suits small businesses and startups",
    },
    name: { ar: "أ. عبادة", en: "Obadah" },
    business: { ar: "شركة الوقت للفعاليات الترفيهية", en: "TIME Entertainment Events" },
    logo: "/testimonials/time-events.webp",
  },
  {
    quote: {
      ar: "فخور بوجود برنامج سعودي بهذه الكفاءة العالية",
      en: "Proud to have Saudi software this capable",
    },
    name: { ar: "أ. عبدالعزيز بن فهد", en: "Abdulaziz bin Fahd" },
    business: { ar: "في قطاع التأثير", en: "Influencer" },
    logo: "/testimonials/abdulaziz-bin-fahd-v2.webp",
  },
  {
    quote: {
      ar: "بشكل عام البرنامج ممتاز وسهل الاستخدام",
      en: "Overall, the software is excellent and easy to use",
    },
    name: { ar: "أ. إسلام", en: "Islam" },
    business: { ar: "مطعم العم خليل - شركة الأعضاء السبعة", en: "Uncle Khalil's BBQ, Seven Members Company" },
    logo: "/testimonials/uncle-khalil.webp",
  },
  {
    quote: {
      ar: "أهم شيء في ڤوم سهولة الشاشات والدعم الفني، أنجزنا اللي نحتاجه في وقت أقل، ومع التطوير المستمر صار البرنامج يواكب احتياجاتنا",
      en: "What matters most with VoM is how easy the screens are, and the technical support. We get what we need done in less time, and with constant development the software keeps up with our needs",
    },
    name: { ar: "أ. محمد", en: "Mohammed" },
    business: { ar: "شركة تمهيد للخدمات التجارية", en: "Tamheed Commercial Services" },
    logo: "/testimonials/tamheed.webp",
  },
  {
    quote: {
      ar: "تجربتي مع ڤوم امانة رتبت لي الشغل رغم قلة خبرتي بالأمور المحاسبية، وصار شغلي أكثر احترافية ووضوح، وأي معلومة أحتاج أرجع لها ألقاها مسجلة. واللي يميزهم الصراحة الدعم، ما واجهت أي مشكلة إلا وحلوها لي واقترحوا علي حلول بديلة. بعد 3 سنوات أقدر أقول إن تجربتي معهم ناجحة بامتياز، ممتن للعاملين في ڤوم",
      en: "Honestly, VoM put my work in order even though I have little accounting experience. My work is more professional and clearer now, and anything I need to look back at, I find on record. What really sets them apart is the support: every problem I ran into, they solved, and they suggested other ways to do things too. After 3 years I can say my experience with them has been an outstanding success. I'm grateful to everyone who works at VoM",
    },
    name: { ar: "أ. عبدالله الشبل", en: "Abdullah Al Shibl" },
    business: { ar: "في قطاع التأثير", en: "Influencer" },
    logo: "/testimonials/abdullah-alshibl.webp",
  },
];
