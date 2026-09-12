/** Register label for business phrases — wrong level is a common mistake. */
export type PhraseRegister =
  | "Internal · polite (です・ます)"
  | "Internal · humble (team / upward)"
  | "Client · polite"
  | "Client · humble"
  | "Client · respectful (相手を高める)"
  | "Neutral · polite (either side)";

export interface WorkPhrase {
  id: string;
  /** Plain Japanese; use `ruby` when furigana is needed on kanji. */
  japanese: string;
  /** Optional furigana segments for ruby rendering. */
  ruby?: { text: string; reading: string }[];
  romaji: string;
  english: string;
  register: PhraseRegister;
  usage: string;
}

export interface WorkConcept {
  id: string;
  title: string;
  ruby?: { kanji: string; reading: string };
  romaji?: string;
  summary: string;
  whatToDo: string[];
}

export interface WorkDoDont {
  do: string[];
  dont: string[];
}

export interface WorkPageContent {
  slug: string;
  title: string;
  glyph: string;
  description: string;
  intro: string;
  concepts: WorkConcept[];
  phrases: WorkPhrase[];
  /** When set, replaces flat `phrases` list with grouped sections (e.g. keigo). */
  phraseSections?: { title: string; phrases: WorkPhrase[] }[];
  doDont: WorkDoDont;
  sources: string[];
}
