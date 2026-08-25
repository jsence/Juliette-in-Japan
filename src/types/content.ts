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

/**
 * A segment of Japanese text with an optional furigana reading, used to build
 * accessible <ruby> markup. A segment with no `reading` renders as plain text
 * (kana, punctuation, spacing); a segment with a `reading` renders as ruby.
 */
export interface RubySegment {
  /** The base text (kanji or kana). */
  t: string;
  /** Furigana reading shown above the base text, when the base has kanji. */
  r?: string;
}

/**
 * An example sentence for a grammar point, with furigana-ready segments,
 * romaji and an English translation. Sourced only from open corpora — never
 * generated. When a genuine source id is unavailable it is simply omitted and
 * the sentence should be reconciled against a real corpus export.
 */
export interface GrammarExample {
  /** The Japanese sentence, split into furigana-ready segments. */
  segments: RubySegment[];
  /** Hepburn romaji for the whole sentence. */
  romaji: string;
  /** English translation. */
  en: string;
  /** Corpus the sentence originates from. */
  source: "Tatoeba" | "NHK Easy";
  /** Stable id / permalink within the source corpus, when known. */
  sourceId?: string;
}

/**
 * The 11 functional grammar categories. Ordered as they appear in the index.
 * Grammar is organised by what it *does*, not alphabetically.
 */
export const GRAMMAR_CATEGORIES = [
  { slug: "basics", label: "Basic sentence", glyph: "文", blurb: "The copula and the shape of a simple statement." },
  { slug: "particles", label: "Particles", glyph: "を", blurb: "The small words that mark roles: は が を に で へ と も." },
  { slug: "adjectives", label: "Adjectives", glyph: "形", blurb: "い- and な-adjectives and how they conjugate." },
  { slug: "verb-forms", label: "Verb forms", glyph: "動", blurb: "ます, て, た and ない forms and the dictionary form." },
  { slug: "existence", label: "Existence", glyph: "在", blurb: "Saying something is (or isn't) there: ある and いる." },
  { slug: "questions", label: "Questions", glyph: "問", blurb: "Turning statements into questions and question words." },
  { slug: "requests", label: "Requests & suggestions", glyph: "願", blurb: "Asking, inviting and suggesting: てください, ましょう, ませんか." },
  { slug: "desire-ability", label: "Desire & ability", glyph: "望", blurb: "Wanting and being able to: たい, ほしい, できる." },
  { slug: "connecting", label: "Connecting ideas", glyph: "接", blurb: "Joining clauses: て, から, ので, が." },
  { slug: "comparison", label: "Comparison", glyph: "比", blurb: "Comparing things: より, のほうが, いちばん." },
  { slug: "time-frequency", label: "Time & frequency", glyph: "時", blurb: "When and how often: から〜まで, ごろ, frequency adverbs." },
] as const;

export type GrammarCategorySlug = (typeof GRAMMAR_CATEGORIES)[number]["slug"];

/** A single N5 grammar point, organised by function. */
export interface GrammarPoint {
  /** Stable id used for cross-references and flashcards, e.g. "desu". */
  id: string;
  /** URL slug within its category, e.g. "desu". */
  slug: string;
  /** Functional category this point belongs to. */
  category: GrammarCategorySlug;
  /** Display title, e.g. "です — polite copula". */
  title: string;
  /** The Japanese form itself, e.g. "〜です". */
  form: string;
  /** Visual construction formula as ordered tokens, e.g. ["Noun", "は", "Noun", "です"]. */
  formula: string[];
  /** One-sentence meaning. */
  meaning: string;
  /** Longer human-written explanation (authored, never generated). */
  explanation: string;
  /** Example sentences from open corpora only (may be empty). */
  examples: GrammarExample[];
  /** Common mistakes learners make with this point. */
  mistakes: string[];
  /** Ids of related grammar points. */
  related: string[];
  /** Free-form tags for filtering / flashcard decks. */
  tags: string[];
}

/** A multiple-choice drill question at the end of a lesson. */
export interface DrillQuestion {
  id: string;
  /** The prompt (English cue or a sentence with a blank). */
  prompt: string;
  /** Answer choices. */
  choices: string[];
  /** Index of the correct choice in `choices`. */
  answer: number;
  /** Optional short explanation shown after answering. */
  explain?: string;
}

/** A guided lesson bundling grammar, vocabulary and kanji, ending with a drill. */
export interface Lesson {
  /** Ordinal position in the path (1-based). */
  number: number;
  /** Stable id / URL slug, e.g. "lesson-01". */
  id: string;
  title: string;
  summary: string;
  /** Grammar point ids covered by this lesson. */
  grammarIds: string[];
  /** Vocabulary words (matching VocabEntry.word) introduced here. */
  vocabWords: string[];
  /** Kanji characters (matching Kanji.char) introduced here. */
  kanjiChars: string[];
  /** End-of-lesson drill questions. */
  drill: DrillQuestion[];
}

/** The four flashcard study modes. */
export type StudyMode = "recognition" | "recall" | "kanji-reading" | "cloze";

/** SM-2 scheduling state stored per card (per mode). */
export interface Sm2State {
  /** Easiness factor (SM-2), starts at 2.5. */
  ease: number;
  /** Current inter-repetition interval in days. */
  interval: number;
  /** Number of successful repetitions in a row. */
  reps: number;
  /** Times the card has been forgotten. */
  lapses: number;
  /** ISO date (YYYY-MM-DD) the card is next due. */
  due: string;
  /** ISO date of the last review. */
  last?: string;
}

/** Persisted scheduling map: cardId → SM-2 state. */
export type ScheduleStore = Record<string, Sm2State>;

/** One side of a study card: either Japanese (with furigana) or plain text. */
export interface CardFace {
  /** Japanese text split into furigana-ready segments, when the face is JP. */
  segments?: RubySegment[];
  /** Plain text (e.g. an English prompt/answer), when the face is not JP. */
  text?: string;
  /** Optional secondary line (reading, romaji, or a hint). */
  sub?: string;
}

/** A runtime study card, derived from typed content for a given mode. */
export interface StudyCard {
  /** Stable id, unique per (source item, mode). */
  id: string;
  mode: StudyMode;
  /** Prompt shown first. */
  front: CardFace;
  /** Answer shown after flipping. */
  back: CardFace;
  /** Deck grouping label (vocab theme, "kanji", or grammar category). */
  deck: string;
  /** Tags for deck filtering. */
  tags: string[];
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
