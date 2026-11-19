import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

/**
 * IBM Plex is the brand face (owner, 2026-11-19): Plex Sans for Latin text and
 * every digit, Plex Sans Arabic for Arabic. Both are OFL, fetched at build time
 * and served from this site. The stack in globals.css puts Plex Sans first, so
 * Latin glyphs come from its one variable file and Arabic glyphs, which it lacks,
 * fall through to Plex Sans Arabic. Plex Sans must carry no fallback of its own:
 * next/font's automatic one is a local Arial with no unicode-range, which has
 * Arabic glyphs and so drew every Arabic letter before Plex Sans Arabic could.
 * Turbopack ignores `adjustFontFallback: false` and drops that face only when a
 * `fallback` list is given, hence the empty one. The site uses weights 300, 400,
 * 500 and 700.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

/** Both faces' variables, for the `<html>` of every root layout. */
export const fontVariables = `${plexSans.variable} ${plexArabic.variable}`;
