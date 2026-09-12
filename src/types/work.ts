/** Who you are speaking or writing to — colour-coded on every phrase. */
export type WorkAudienceRegister = "internal-peer" | "internal-senior" | "client";

export interface WorkPhrase {
  id: string;
  japanese: string;
  ruby?: { text: string; reading: string }[];
  romaji: string;
  english: string;
  register: WorkAudienceRegister;
  /** When to use — English only; no inline Japanese. */
  usage: string;
}

export interface WorkTermRow {
  id: string;
  japanese: string;
  ruby?: { text: string; reading: string }[];
  romaji: string;
  meaning: string;
  usage?: string;
}

export interface WorkConcept {
  id: string;
  title: string;
  ruby?: { kanji: string; reading: string };
  romaji?: string;
  /** English-only; keep each entry to at most ~3 lines on screen. */
  summaryLines: string[];
  /** Short imperatives — English only. */
  whatToDo: string[];
  terms?: WorkTermRow[];
}

export interface WorkDoDont {
  do: string[];
  dont: string[];
}

export interface KeigoVerbCell {
  text: string;
  ruby?: { text: string; reading: string }[];
}

export interface KeigoVerbRow {
  id: string;
  label: string;
  labelRuby?: { text: string; reading: string }[];
  plain: KeigoVerbCell;
  teineigo: KeigoVerbCell;
  sonkeigo: KeigoVerbCell;
  kenjougo: KeigoVerbCell;
}

export interface WorkEmailExample {
  subject: string;
  bodyLines: { text: string; ruby?: { text: string; reading: string }[]; callout?: number }[];
  callouts: { id: number; title: string; detail: string }[];
}

export interface WorkPageContent {
  slug: string;
  title: string;
  glyph: string;
  description: string;
  /** Short intro paragraphs — English only. */
  introLines: string[];
  tldr: string[];
  concepts: WorkConcept[];
  phrases: WorkPhrase[];
  phraseSections?: { title: string; phrases: WorkPhrase[] }[];
  doDont: WorkDoDont;
  sources: string[];
  keigo?: {
    verbRows: KeigoVerbRow[];
    emailExample: WorkEmailExample;
  };
}
