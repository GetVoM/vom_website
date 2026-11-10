import type { ClientKey } from "../clients";
import type { Raster, SectorId } from "./types";

/**
 * The sector photos: the old pages' hero images, cut out of the tablet bezel they
 * were drawn in. Sources and provenance are embedded in each file.
 */
export const sectorPhotos: Record<SectorId, Raster> = {
  restaurants: { src: "/sectors/restaurants/photo.jpg", width: 643, height: 440 },
  beauty: { src: "/sectors/beauty/photo.jpg", width: 756, height: 513 },
  gyms: { src: "/sectors/gyms/photo.jpg", width: 757, height: 513 },
  law: { src: "/sectors/law/photo.jpg", width: 756, height: 514 },
  design: { src: "/sectors/design/photo.jpg", width: 769, height: 519 },
  marketing: { src: "/sectors/marketing/photo.jpg", width: 769, height: 528 },
  logistics: { src: "/sectors/logistics/photo.jpg", width: 753, height: 514 },
  travel: { src: "/sectors/travel/photo.jpg", width: 769, height: 517 },
  "car-care": { src: "/sectors/car-care/photo.jpg", width: 769, height: 526 },
  ecommerce: { src: "/sectors/ecommerce/photo.jpg", width: 756, height: 513 },
  perfume: { src: "/sectors/perfume/photo.jpg", width: 777, height: 537 },
  "real-estate": { src: "/sectors/real-estate/photo.jpg", width: 756, height: 513 },
  investment: { src: "/sectors/investment/photo.jpg", width: 757, height: 514 },
  printing: { src: "/sectors/printing/photo.jpg", width: 753, height: 514 },
  childcare: { src: "/sectors/childcare/photo.jpg", width: 753, height: 501 },
};


/** Each sector's clients, in the old page's order; sectors whose page had none are empty. */
export const sectorClients: Record<SectorId, ClientKey[]> = {
  restaurants: [
    "laof", "lucy", "al-sucre", "shawarma-and-sauce", "shawarma-shuaib", "sikka-8", "khubza-shawarma",
    "ganat-alshawerma", "framboise-olive", "usool-alruz", "uncle-khalil", "poem", "out-of-line", "okawa",
    "koy", "green-fork", "cazzela", "midway", "wahed-kofta", "66-cups",
  ],
  beauty: ["december"],
  gyms: ["body-soul-mind", "l-monogram"],
  law: ["al-suraihi"],
  design: ["arkan-al-tasmeem"],
  marketing: ["mieyar", "the-stage", "thalay", "nawafeth", "time-entertainment"],
  logistics: ["hbex", "ana-mashi"],
  travel: ["world-gate"],
  "car-care": [],
  ecommerce: ["order", "atmosphere", "abajur", "ramah-equestrian", "homek", "ana-mashi"],
  perfume: ["atmosphere"],
  "real-estate": ["khat-altashyeed", "arkan-al-tasmeem", "wakad-aljazeera"],
  investment: ["move-it", "thura"],
  printing: [],
  childcare: [],
};

/** Article card images: 640 × 366, the old cards' covers cropped to one shape. */
export const readingImage = { width: 640, height: 366 };
