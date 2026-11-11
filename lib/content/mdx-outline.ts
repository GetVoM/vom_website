/** Arabic reading pace used for every reading time on the site. */
export const WORDS_PER_MINUTE = 200;

export interface MdxSection {
  id: string;
  heading: string;
  /** Words from this H2 to the next one. */
  words: number;
  minutes: number;
}

export interface MdxOutline {
  sections: MdxSection[];
  words: number;
  minutes: number;
}

const H2 = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g;

/** The words a reader sees in a slice of MDX source: no tags, figures, comments, link targets or export wrappers. */
function countWords(source: string): number {
  const text = source
    .replace(/^export const lede = \(\s*<>|<\/>\s*\);/gm, " ")
    .replace(/^export const (?!lede\b)\w+ = \(?/gm, " ")
    .replace(/^\s*(<>|<\/>|\);)\s*$/gm, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<Figure[^>]*\/>/g, " ")
    .replace(/<[^>]+>|\]\([^)]*\)|[[\]*#>{}]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

const minutesFor = (words: number) => Math.max(1, Math.round(words / WORDS_PER_MINUTE));

/**
 * A long MDX page's H2 sections (for a contents rail) and its length, read from
 * the source so they can never drift from the body. The H2s are raw
 * `<h2 id="…">` tags, as the WordPress import scripts write them.
 */
export function mdxOutline(source: string): MdxOutline {
  const matches = [...source.matchAll(H2)];
  const sections = matches.map((match, i) => {
    const words = countWords(source.slice(match.index, matches[i + 1]?.index ?? source.length));
    return {
      id: match[1],
      heading: match[2].replace(/<[^>]+>/g, "").trim(),
      words,
      minutes: minutesFor(words),
    };
  });
  const words = countWords(source);
  return { sections, words, minutes: minutesFor(words) };
}
