/**
 * Pure URL helpers for character pages and stroke data.
 *
 * Kept free of any `data/` imports so client components can use them without
 * pulling the whole content dataset into the page bundle.
 */

/** KanjiVG names its files by zero-padded hex codepoint, e.g. 03042.json. */
function strokeFileId(char: string): string {
  return char.codePointAt(0)!.toString(16).padStart(5, "0");
}

/**
 * URLs for a character's stroke data. Contracted kana such as きゃ are written as
 * two glyphs, so they return one URL per component in writing order.
 */
export function strokeDataUrls(char: string): string[] {
  return [...char].map((part) => `/strokes/${strokeFileId(part)}.json`);
}

/** Route for a character's own page. */
export function characterHref(kind: "kana" | "kanji", char: string): string {
  return `/language/${kind}/${encodeURIComponent(char)}`;
}
