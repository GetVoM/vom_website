import localFont from "next/font/local";

/**
 * Effra (Dalton Maag) is the pinned brand face and covers Arabic, Latin and
 * Greek, so it is the only typeface on the site. Weights: Light 300,
 * Regular 400, Medium 500, Bold 700. A web-font licence for these files must
 * be confirmed with Dalton Maag before launch (open item in PRODUCT.md).
 */
export const effra = localFont({
  src: [
    { path: "./fonts/effra/effra-light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/effra/effra-regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/effra/effra-medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/effra/effra-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-effra",
  display: "swap",
  fallback: ["Segoe UI", "SF Arabic", "Geeza Pro", "Noto Sans Arabic", "system-ui", "sans-serif"],
});
