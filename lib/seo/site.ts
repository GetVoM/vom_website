export const site = {
  url: "https://getvom.com",
  name: { ar: "ڤوم", en: "VoM" },
  legalName: "VoM",
  foundingYear: "2021",
  appUrl: "https://app.getvom.com",
  signup: {
    ar: "https://app.getvom.com/ar/company-register-show",
    en: "https://app.getvom.com/en/company-register-show",
  },
  login: "https://app.getvom.com",
  demo: "https://calendly.com/get-vom/vom-demo",
  /** The growth program's application forms (Google Forms), for startups and for partners. */
  growthForms: {
    apply: "https://docs.google.com/forms/d/e/1FAIpQLScb6FWY925nc438AnhClM6pILJtPe07HxgbxtCpFeblPhqVfw/viewform",
    partner: "https://docs.google.com/forms/d/e/1FAIpQLSdY8Pu1FyqTVVMUMgoU9I3gpiwI1G7TWHZgTtRIS_j9P2_UuQ/viewform",
  },
  /**
   * The student package's links, on the team's short-link service so its click
   * counts keep working (owner, 2026-11-10). A student signs up in the app
   * (?is_student=1); a university fills in a Google Form.
   */
  studentLinks: {
    student: { ar: "https://sa.getvom.com/AR-SP-RG", en: "https://sa.getvom.com/EN-SP-RG" },
    university: { ar: "https://sa.getvom.com/SP_AR", en: "https://sa.getvom.com/SP_EN" },
  },
  appStore: "https://apps.apple.com/us/app/vom/id1561019943",
  // TODO: replace with the real Google Play listing URL from the team.
  googlePlay: "https://play.google.com/store/search?q=vom%20accounting&c=apps",
  whatsapp: "+966502309337",
  whatsappUrl: "https://api.whatsapp.com/send/?phone=966502309337",
  phoneDisplay: "+966 50 230 9337",
  email: "info@getvom.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100084350145003",
    tiktok: "https://www.tiktok.com/@getvom",
    x: "https://x.com/GetVOM",
    instagram: "https://www.instagram.com/get.vom",
    linkedin: "https://www.linkedin.com/company/getvom",
  },
  gtmId: "GTM-PS28X6L",
  logo: "/brand/vom-logo.png",
} as const;
