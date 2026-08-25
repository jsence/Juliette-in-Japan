import kanaData from "../../data/kana.json";
import kanjiData from "../../data/kanji.json";
import vocabularyData from "../../data/vocabulary.json";
import grammarData from "../../data/grammar.json";
import resourcesData from "../../data/resources.json";

import type {
  Kana,
  Kanji,
  VocabEntry,
  GrammarPoint,
  Resource,
  KanaScript,
  KanaGroup,
} from "@/types/content";

export const kana = kanaData as Kana[];
export const kanji = kanjiData as Kanji[];
export const vocabulary = vocabularyData as VocabEntry[];
export const grammar = grammarData as GrammarPoint[];
export const resources = resourcesData as Resource[];

/** Ordered kana groups as they appear in a gojūon table. */
export const kanaGroupOrder: KanaGroup[] = [
  "vowels",
  "k",
  "s",
  "t",
  "n",
  "h",
  "m",
  "y",
  "r",
  "w",
  "n-final",
  "dakuten",
  "handakuten",
  "yoon",
];

export const kanaGroupLabels: Record<KanaGroup, string> = {
  vowels: "Vowels",
  k: "K",
  s: "S",
  t: "T",
  n: "N",
  h: "H",
  m: "M",
  y: "Y",
  r: "R",
  w: "W",
  "n-final": "ん / ン",
  dakuten: "Dakuten (゛)",
  handakuten: "Handakuten (゜)",
  yoon: "Yōon (contracted)",
};

/** Filter kana by script and return them grouped in gojūon order. */
export function getKanaByScript(script: KanaScript): {
  group: KanaGroup;
  label: string;
  items: Kana[];
}[] {
  return kanaGroupOrder
    .map((group) => ({
      group,
      label: kanaGroupLabels[group],
      items: kana.filter((k) => k.script === script && k.group === group),
    }))
    .filter((row) => row.items.length > 0);
}

/** Group vocabulary entries by their theme, preserving first-seen order. */
export function getVocabularyByTheme(): { theme: string; items: VocabEntry[] }[] {
  const themes: string[] = [];
  const byTheme = new Map<string, VocabEntry[]>();
  for (const entry of vocabulary) {
    if (!byTheme.has(entry.theme)) {
      byTheme.set(entry.theme, []);
      themes.push(entry.theme);
    }
    byTheme.get(entry.theme)!.push(entry);
  }
  return themes.map((theme) => ({ theme, items: byTheme.get(theme)! }));
}

/** Group grammar points by category, preserving first-seen order. */
export function getGrammarByCategory(): { category: string; items: GrammarPoint[] }[] {
  const categories: string[] = [];
  const byCategory = new Map<string, GrammarPoint[]>();
  for (const point of grammar) {
    if (!byCategory.has(point.category)) {
      byCategory.set(point.category, []);
      categories.push(point.category);
    }
    byCategory.get(point.category)!.push(point);
  }
  return categories.map((category) => ({ category, items: byCategory.get(category)! }));
}
