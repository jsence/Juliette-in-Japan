/**
 * Derived facts about individual characters, assembled for the detail panels.
 *
 * Everything here is computed from the typed data rather than stored a second
 * time: a kana's place in the gojūon grid and its voiced or contracted relatives
 * both fall out of Unicode normalisation, so there is no table to keep in sync.
 *
 * This module imports the content data, so it belongs to server components only.
 * The panels receive plain `KanaDetail` / `KanjiDetail` objects as props.
 */
import { kana, exampleWords } from "./data";
import type {
  ExampleWord,
  Kana,
  KanaDetail,
  KanaPosition,
  KanaScript,
  Kanji,
  KanjiDetail,
  RelatedKana,
} from "@/types/content";

/** Combining dakuten (゛) — か + this = が. */
const DAKUTEN = "\u3099";
/** Combining handakuten (゜) — は + this = ぱ. */
const HANDAKUTEN = "\u309a";

const kanaByChar = new Map(kana.map((k) => [k.char, k]));

/** The あ-column member of each row, e.g. hiragana "k" → か, used to name it. */
const rowRepresentative = new Map<string, string>();
/** The vowel kana for each column, e.g. hiragana "a" → あ. */
const columnRepresentative = new Map<string, string>();

/** The final vowel of a rōmaji reading, or null for ん. */
function lastVowel(romaji: string): string | null {
  const match = romaji.match(/[aiueo](?![\s\S]*[aiueo])/);
  return match ? match[0] : null;
}

for (const entry of kana) {
  const key = `${entry.script}:${entry.group}`;
  if (lastVowel(entry.romaji) === "a" && !rowRepresentative.has(key)) {
    rowRepresentative.set(key, entry.char);
  }
  if (entry.group === "vowels") {
    columnRepresentative.set(`${entry.script}:${entry.romaji}`, entry.char);
  }
}

/** Split a kana into its plain base and any diacritic mark. */
function decompose(char: string): [string, string | null] {
  const parts = [...char.normalize("NFD")];
  const mark = parts[1] === DAKUTEN || parts[1] === HANDAKUTEN ? parts[1] : null;
  return [parts[0], mark];
}

/** Recombine a base kana with a diacritic, e.g. か + ゛ → が. */
function compose(base: string, mark: string): string {
  return (base + mark).normalize("NFC");
}

/**
 * Where a kana sits in the gojūon grid, as row (行) and column (段).
 *
 * The row is named after its あ-column member carrying the same diacritic, so ぢ
 * reports だ行 — derived from ち — rather than the ざ行 its "ji" reading would
 * suggest. ん sits outside the grid and reports nulls.
 */
export function kanaPosition(entry: Kana): KanaPosition {
  if (entry.group === "n-final") return { row: null, column: null };

  const [firstChar] = [...entry.char];
  const [base, mark] = decompose(firstChar);
  const group = (kanaByChar.get(base) ?? kanaByChar.get(firstChar))?.group ?? entry.group;

  let rowChar = rowRepresentative.get(`${entry.script}:${group}`) ?? null;
  if (rowChar && mark) rowChar = compose(rowChar, mark);

  const vowel = lastVowel(entry.romaji);
  const columnChar = vowel ? columnRepresentative.get(`${entry.script}:${vowel}`) : null;

  return {
    row: rowChar ? `${rowChar}行` : null,
    column: columnChar ? `${columnChar}段` : null,
  };
}

/** Contracted kana in the same script whose first character is `char`. */
function combinationsOf(char: string, script: KanaScript): Kana[] {
  return kana.filter((k) => k.group === "yoon" && k.script === script && [...k.char][0] === char);
}

/**
 * The kana worth seeing beside this one: its plain form, its voiced and
 * semi-voiced variants, and any contracted forms built on it.
 */
export function relatedKana(entry: Kana): RelatedKana[] {
  const related: RelatedKana[] = [];
  const add = (char: string, relation: RelatedKana["relation"]) => {
    const found = kanaByChar.get(char);
    if (found && !related.some((r) => r.char === char)) {
      related.push({ char: found.char, romaji: found.romaji, relation });
    }
  };

  if (entry.group === "yoon") {
    const [firstChar] = [...entry.char];
    add(firstChar, "base");
    for (const sibling of combinationsOf(firstChar, entry.script)) {
      if (sibling.char !== entry.char) add(sibling.char, "series");
    }
    return related;
  }

  const [base, mark] = decompose(entry.char);
  if (mark) {
    add(base, "base");
    // は carries both a voiced (ば) and a semi-voiced (ぱ) form; show the sibling.
    const sibling = mark === DAKUTEN ? HANDAKUTEN : DAKUTEN;
    add(compose(base, sibling), sibling === DAKUTEN ? "dakuten" : "handakuten");
  } else {
    add(compose(entry.char, DAKUTEN), "dakuten");
    add(compose(entry.char, HANDAKUTEN), "handakuten");
  }

  for (const combination of combinationsOf(entry.char, entry.script)) {
    add(combination.char, "combination");
  }

  return related;
}

/** JMdict-sourced example words for a character; empty when none is verified. */
export function exampleWordsFor(char: string): ExampleWord[] {
  return exampleWords[char] ?? [];
}

/** Everything a kana detail panel needs, as a serialisable object. */
export function buildKanaDetail(entry: Kana): KanaDetail {
  const { row, column } = kanaPosition(entry);
  return {
    kind: "kana",
    char: entry.char,
    romaji: entry.romaji,
    script: entry.script,
    strokes: entry.strokes,
    note: entry.note,
    row,
    column,
    related: relatedKana(entry),
    words: exampleWordsFor(entry.char),
  };
}

/** Everything a kanji detail panel needs, as a serialisable object. */
export function buildKanjiDetail(entry: Kanji): KanjiDetail {
  return {
    kind: "kanji",
    char: entry.char,
    meanings: entry.meanings,
    onyomi: entry.onyomi,
    kunyomi: entry.kunyomi,
    strokes: entry.strokes,
    radical: entry.radical,
    words: exampleWordsFor(entry.char),
  };
}
