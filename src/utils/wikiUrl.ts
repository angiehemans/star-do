const BASE = "https://stardewvalleywiki.com";

/**
 * Builds a Stardew Valley Wiki URL from an item or character name.
 * e.g. "Fried Egg" → "https://stardewvalleywiki.com/Fried_Egg"
 *      "Emily"     → "https://stardewvalleywiki.com/Emily"
 */
export function wikiUrl(name: string): string {
  // Strip parenthetical qualifiers like "(Forage)" or quantity suffixes like "(99)"
  const clean = name.replace(/\s*\(.*?\)\s*/g, "").replace(/\s*\d+$/, "").trim();
  const slug = clean.replace(/ /g, "_");
  return `${BASE}/${slug}`;
}
