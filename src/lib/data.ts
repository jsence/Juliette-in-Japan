import kanaData from "../../data/kana.json";
import kanjiData from "../../data/kanji.json";
import vocabularyData from "../../data/vocabulary.json";
import grammarData from "../../data/grammar.json";
import resourcesData from "../../data/resources.json";
import lessonsData from "../../data/lessons.json";

import {
  GRAMMAR_CATEGORIES,
  type Kana,
  type Kanji,
  type VocabEntry,
  type GrammarPoint,
  type GrammarCategorySlug,
  type Resource,
  type Lesson,
  type KanaScript,
  type KanaGroup,
} from "@/types/content";

export const kana = kanaData as Kana[];
export const kanji = kanjiData as Kanji[];
export const vocabulary = vocabularyData as VocabEntry[];
export const grammar = grammarData as GrammarPoint[];
export const resources = resourcesData as Resource[];
export const lessons = (lessonsData as Lesson[]).slice().sort((a, b) => a.number - b.number);

export { GRAMMAR_CATEGORIES };

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

export type GrammarCategoryMeta = (typeof GRAMMAR_CATEGORIES)[number];

/** Look up the metadata (label, glyph, blurb) for a grammar category slug. */
export function getCategoryMeta(slug: string): GrammarCategoryMeta | undefined {
  return GRAMMAR_CATEGORIES.find((c) => c.slug === slug);
}

/** All grammar points in a category, in data order. */
export function getGrammarByCategorySlug(slug: GrammarCategorySlug): GrammarPoint[] {
  return grammar.filter((p) => p.category === slug);
}

/**
 * The 11 categories, each with its points, in the canonical category order.
 * Empty categories are still returned so the index reflects the full taxonomy.
 */
export function getGrammarCategories(): {
  meta: GrammarCategoryMeta;
  items: GrammarPoint[];
}[] {
  return GRAMMAR_CATEGORIES.map((meta) => ({
    meta,
    items: grammar.filter((p) => p.category === meta.slug),
  }));
}

/** Find a single grammar point by its id. */
export function getGrammarPointById(id: string): GrammarPoint | undefined {
  return grammar.find((p) => p.id === id);
}

/** Find a single grammar point by category slug + point slug. */
export function getGrammarPoint(
  category: string,
  slug: string
): GrammarPoint | undefined {
  return grammar.find((p) => p.category === category && p.slug === slug);
}

/** Every (category, point) slug pair, for generateStaticParams. */
export function getGrammarPointParams(): { category: string; point: string }[] {
  return grammar.map((p) => ({ category: p.category, point: p.slug }));
}

/** Find a lesson by its id/slug. */
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

/** Resolve a lesson's referenced content into concrete data objects. */
export function resolveLesson(lesson: Lesson): {
  grammar: GrammarPoint[];
  vocab: VocabEntry[];
  kanji: Kanji[];
} {
  return {
    grammar: lesson.grammarIds
      .map((id) => grammar.find((p) => p.id === id))
      .filter((p): p is GrammarPoint => Boolean(p)),
    vocab: lesson.vocabWords
      .map((w) => vocabulary.find((v) => v.word === w))
      .filter((v): v is VocabEntry => Boolean(v)),
    kanji: lesson.kanjiChars
      .map((c) => kanji.find((k) => k.char === c))
      .filter((k): k is Kanji => Boolean(k)),
  };
}
