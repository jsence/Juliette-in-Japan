/**
 * Shared content types for the "Juliette in Japan" study data.
 *
 * Sourcing rules (see /language/n5 source note):
 *  - Kanji readings and stroke counts follow KANJIDIC2.
 *  - Word definitions follow JMdict.
 *  - Example sentences must come from established corpora (Tatoeba, NHK Easy).
 *    Never invent them — leave `exampleSentences: []` empty instead.
 */

/** A single example sentence sourced from an established corpus. */
export interface ExampleSentence {
  /** Japanese sentence text. */
  jp: string;
  /** English translation. */
  en: string;
  /** Corpus the sentence originates from. */
  source: "Tatoeba" | "NHK Easy";
  /** Optional stable id / permalink within the source corpus. */
  sourceId?: string;
}

/** Script family for a kana character. */
export type KanaScript = "hiragana" | "katakana";

/** Row grouping within the gojūon ordering. */
export type KanaGroup =
  | "vowels"
  | "k"
  | "s"
  | "t"
  | "n"
  | "h"
  | "m"
  | "y"
  | "r"
  | "w"
  | "n-final"
  | "dakuten"
  | "handakuten"
  | "yoon";

/** A single kana character with reading and stroke metadata. */
export interface Kana {
  /** The kana glyph, e.g. "あ". */
  char: string;
  /** Rōmaji reading (Hepburn), e.g. "a". */
  romaji: string;
  script: KanaScript;
  group: KanaGroup;
  /** Stroke count for writing practice. */
  strokes: number;
  /** Optional note (e.g. pronunciation caveat, historical usage). */
  note?: string;
}

/** A vocabulary word used in a compound example on a kanji card. */
export interface KanjiWord {
  /** Word in Japanese, e.g. "日本". */
  word: string;
  /** Reading in kana, e.g. "にほん". */
  reading: string;
  /** English meaning (per JMdict). */
  meaning: string;
}

/** A study card for a single kanji (readings/strokes per KANJIDIC2). */
export interface Kanji {
  /** The kanji character, e.g. "日". */
  char: string;
  /** Primary English meaning(s), per JMdict/KANJIDIC2. */
  meanings: string[];
  /** On'yomi readings in katakana, per KANJIDIC2. */
  onyomi: string[];
  /** Kun'yomi readings in hiragana, per KANJIDIC2. */
  kunyomi: string[];
  /** Stroke count, per KANJIDIC2. */
  strokes: number;
  /** 2–3 common words that use this kanji. */
  words: KanjiWord[];
}

/** Thematic grouping for N5 vocabulary. */
export type VocabTheme =
  | "numbers"
  | "time"
  | "family"
  | "food"
  | "transport"
  | "verbs"
  | "adjectives"
  | "places"
  | "people"
  | "everyday";

/** Part of speech, following JMdict conventions (simplified). */
export type PartOfSpeech =
  | "noun"
  | "verb-u"
  | "verb-ru"
  | "verb-irregular"
  | "i-adjective"
  | "na-adjective"
  | "adverb"
  | "particle"
  | "expression"
  | "counter"
  | "pronoun";

/** A single vocabulary entry (definitions follow JMdict). */
export interface VocabEntry {
  /** Word in its usual written form, e.g. "食べる". */
  word: string;
  /** Reading in kana, e.g. "たべる". */
  reading: string;
  /** English meaning(s) per JMdict. */
  meaning: string;
  partOfSpeech: PartOfSpeech;
  theme: VocabTheme;
  /** Example sentences from established corpora only (may be empty). */
  exampleSentences: ExampleSentence[];
}

/** A single N5 grammar point. */
export interface GrammarPoint {
  /** Stable slug, e.g. "particle-wa". */
  id: string;
  /** Display title, e.g. "は (topic particle)". */
  title: string;
  /** Grammatical structure/pattern, e.g. "Noun + は + comment". */
  structure: string;
  /** Human-written explanation (authored, not generated). */
  explanation: string;
  /** Category for grouping in the UI. */
  category:
    | "copula"
    | "particles"
    | "adjectives"
    | "verb-forms"
    | "existence"
    | "comparison"
    | "desire"
    | "reason";
  /** Example sentences from established corpora only (may be empty). */
  exampleSentences: ExampleSentence[];
}

/** External study resource with a personal comment. */
export interface Resource {
  name: string;
  url: string;
  /** Short category label, e.g. "Textbook", "Reading", "SRS". */
  category: string;
  /** Juliette's own comment on the resource. */
  comment: string;
  /** Whether the resource is free. */
  free: boolean;
}

/** Frontmatter shared by MDX posts (journal / culture / work). */
export interface PostFrontmatter {
  title: string;
  /** ISO date string, e.g. "2026-08-24". */
  date: string;
  tags: string[];
  summary: string;
}

/** A parsed MDX post with its raw body content. */
export interface Post extends PostFrontmatter {
  slug: string;
  /** Content collection the post belongs to. */
  collection: PostCollection;
  content: string;
}

export type PostCollection = "journal" | "culture" | "work";

/** A flashcard shape used by the review/SRS feature. */
export interface Flashcard {
  id: string;
  front: string;
  /** Optional reading shown as furigana / secondary line. */
  reading?: string;
  back: string;
  theme?: string;
}
