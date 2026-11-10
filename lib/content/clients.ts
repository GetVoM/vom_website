import type { Raster } from "./sectors/types";

/**
 * VoM's clients as the old site showed them: on the homepage's logo strip and on
 * the sector pages. Each name is as the client's logo writes it, for the alt text.
 * The logos come from the old site's uploads (see the provenance in each file); the
 * old pages' 2023/08/10.png is a photo of a gym, not a logo, and is left out.
 */
export const clients = {
  laof: { ar: "LAOF", en: "LAOF" },
  mieyar: { ar: "معيار", en: "Mieyar" },
  "khat-altashyeed": { ar: "خط التشييد للمقاولات", en: "Khat Al Tashyeed Contracting" },
  lucy: { ar: "Lucy", en: "Lucy" },
  "body-soul-mind": { ar: "Body Soul Mind", en: "Body Soul Mind" },
  "world-gate": { ar: "بوابة العالم", en: "World Gate" },
  "the-stage": { ar: "ذا ستيج", en: "The Stage" },
  sorour: { ar: "Sorour Entertainment", en: "Sorour Entertainment" },
  "al-sucre": { ar: "Al Sucré Pâtisserie", en: "Al Sucré Pâtisserie" },
  // TODO(owner): the client's name; the logo is a lone "L" mark.
  "l-monogram": { ar: "شعار عميل بحرف L", en: "Client monogram L" },
  "shawarma-and-sauce": { ar: "شاورما وصوص", en: "Shawarma and Sauce" },
  "shawarma-shuaib": { ar: "شاورما شعيب", en: "Shawarma Shuaib" },
  "sikka-8": { ar: "سكّة ٨", en: "Sikka 8" },
  "khubza-shawarma": { ar: "خبزة وشاورما", en: "Khubza w Shawarma" },
  "al-suraihi": { ar: "خالد السريحي محامون ومستشارون", en: "Al-Suraihi & Associates Law Firm" },
  "arkan-al-tasmeem": { ar: "أركان التصميم للاستشارات الهندسية", en: "Arkan Al Tasmeem Engineering Consultancy" },
  "ganat-alshawerma": { ar: "جنة الشاورما", en: "Ganat Alshawerma" },
  // TODO(owner): confirm the name; the wordmark reads "ثلاي" under three diamonds.
  thalay: { ar: "ثلاي", en: "Thalay" },
  "framboise-olive": { ar: "Framboise & Olive", en: "Framboise & Olive" },
  "usool-alruz": { ar: "أصول الرز", en: "Usool Al Ruz" },
  nawafeth: { ar: "نوافذ", en: "Nawafeth" },
  "uncle-khalil": { ar: "العم خليل", en: "Uncle Khalil's BBQ" },
  poem: { ar: "POEM", en: "POEM" },
  "out-of-line": { ar: "Out of Line", en: "Out of Line" },
  order: { ar: "أوردر", en: "Order" },
  okawa: { ar: "OKAWA", en: "OKAWA" },
  "music-house": { ar: "بيت الموسيقى", en: "Music House" },
  "move-it": { ar: "MOVE-IT", en: "MOVE-IT" },
  koy: { ar: "KOY & Bakery House", en: "KOY & Bakery House" },
  "green-fork": { ar: "قرين فورك", en: "Green Fork" },
  cazzela: { ar: "كازيلا", en: "Cazzela" },
  "time-entertainment": { ar: "Time Entertainment", en: "Time Entertainment" },
  // TODO(owner): confirm the name; the padel ball reads as the "H" of "Hala Padel".
  "hala-padel": { ar: "Hala Padel", en: "Hala Padel" },
  midway: { ar: "midway", en: "Midway" },
  "wakad-aljazeera": { ar: "وكاد الجزيرة للمقاولات العامة", en: "Wakad Al Jazeera General Contracting" },
  "wahed-kofta": { ar: "واحد كفتة", en: "Wahed Kofta" },
  "66-cups": { ar: "66 Cups", en: "66 Cups" },
  atmosphere: { ar: "Atmosphère", en: "Atmosphère" },
  abajur: { ar: "Abajur", en: "Abajur" },
  "mada-hr": { ar: "مدى الموارد البشرية", en: "Mada Human Resources" },
  meatful: { ar: "Meatful", en: "Meatful" },
  "ozzy-cafe": { ar: "Ozzy Cafe", en: "Ozzy Cafe" },
  rubys: { ar: "Ruby's Pastry & Chocolate", en: "Ruby's Pastry & Chocolate" },
  sette: { ar: "Sette", en: "Sette" },
  uvas: { ar: "UVAS", en: "UVAS" },
  "musk-sea": { ar: "بحر المسك", en: "Musk'sea" },
  bytc: { ar: "بيتك الحديث", en: "BYTC" },
  // TODO(owner): the client's name; the logo is a hand holding a falafel, with no wordmark.
  "falafel-hand": { ar: "شعار عميل: يد تمسك قرص فلافل", en: "Client logo: a hand holding a falafel" },
  thura: { ar: "ذرى للتمويل الجماعي بالدين", en: "Thura debt crowdfunding" },
  december: { ar: "صالون ديسمبر", en: "December Beauty Saloon" },
  hbex: { ar: "HBEX Height Express", en: "HBEX Height Express" },
  "ana-mashi": { ar: "Ana Mashi", en: "Ana Mashi" },
  "ramah-equestrian": { ar: "رامة للفروسية", en: "Ramah Equestrian" },
  homek: { ar: "هومك", en: "Homek" },
} satisfies Record<string, { ar: string; en: string }>;

export type ClientKey = keyof typeof clients;

/** A sector page's client seal: the logo centred on a 320 px square at an equal optical size. */
export function sealLogo(key: ClientKey): Raster {
  return { src: `/sectors/clients/${key}.png`, width: 320, height: 320 };
}

/** A homepage marquee tile: the logo centred on a 256 × 128 canvas at an equal optical size. */
export function tileLogo(key: ClientKey): Raster {
  return { src: `/clients/${key}.png`, width: 256, height: 128 };
}

/** The old homepage's logo strip, in its order: 47 logos. */
export const homeClients: ClientKey[] = [
  "laof", "mieyar", "khat-altashyeed", "lucy", "body-soul-mind", "world-gate",
  "the-stage", "sorour", "al-sucre", "poem", "l-monogram", "shawarma-and-sauce",
  "shawarma-shuaib", "sikka-8", "khubza-shawarma", "al-suraihi", "arkan-al-tasmeem", "ganat-alshawerma",
  "thalay", "framboise-olive", "ozzy-cafe", "bytc", "musk-sea", "uvas",
  "usool-alruz", "nawafeth", "uncle-khalil", "mada-hr", "order", "okawa",
  "music-house", "move-it", "koy", "green-fork", "cazzela", "time-entertainment",
  "hala-padel", "midway", "wakad-aljazeera", "wahed-kofta", "66-cups", "atmosphere",
  "abajur", "sette", "rubys", "meatful", "falafel-hand",
];
