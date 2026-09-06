/**
 * Pure game logic for the Kana Recall typing drill.
 *
 * Kana come from the shared `data/kana.json` set (via `@/lib/data`) so the drill
 * can never drift from the reference tables.
 */

import { kana } from "./data";
import type { Kana, KanaGroup, KanaScript } from "@/types/content";

/* -------------------------------------------------------------------------- */
/* Setup model                                                                 */
/* -------------------------------------------------------------------------- */

export type RecallScript = KanaScript;

export type RecallVariant = "monographs" | "diacritics" | "digraphs";

/** A selectable gojūon row on the setup screen. */
export interface RecallRow {
  id: string;
  /** Japanese row label, e.g. "か行". */
  label: string;
  /** Single-letter hint shown beside the label. */
  hint: string;
  groups: KanaGroup[];
}

export const RECALL_ROWS: RecallRow[] = [
  { id: "vowels", label: "あ行", hint: "A", groups: ["vowels"] },
  { id: "k", label: "か行", hint: "K", groups: ["k"] },
  { id: "s", label: "さ行", hint: "S", groups: ["s"] },
  { id: "t", label: "た行", hint: "T", groups: ["t"] },
  { id: "n", label: "な行", hint: "N", groups: ["n"] },
  { id: "h", label: "は行", hint: "H", groups: ["h"] },
  { id: "m", label: "ま行", hint: "M", groups: ["m"] },
  { id: "y", label: "や行", hint: "Y", groups: ["y"] },
  { id: "r", label: "ら行", hint: "R", groups: ["r"] },
  { id: "w", label: "わ行", hint: "W", groups: ["w"] },
  { id: "n-final", label: "ん", hint: "N", groups: ["n-final"] },
];

export const DEFAULT_ROW_IDS = RECALL_ROWS.map((r) => r.id);

export const DEFAULT_VARIANTS: RecallVariant[] = ["monographs"];

export const DEFAULT_SCRIPTS: RecallScript[] = ["hiragana"];

export interface RecallSettings {
  scripts: RecallScript[];
  variants: RecallVariant[];
  rowIds: string[];
}

export const DEFAULT_SETTINGS: RecallSettings = {
  scripts: DEFAULT_SCRIPTS,
  variants: DEFAULT_VARIANTS,
  rowIds: DEFAULT_ROW_IDS,
};

/** Brief green flash before advancing on a correct answer. */
export const CORRECT_FLASH_MS = 500;

const MONOGRAPH_GROUPS = new Set<KanaGroup>([
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
]);

const DAKUTEN = "\u3099";
const HANDAKUTEN = "\u309a";

/** Strip a voiced or semi-voiced mark to recover the plain base kana. */
function plainBase(char: string): string {
  const parts = [...char.normalize("NFD")];
  if (parts[1] === DAKUTEN || parts[1] === HANDAKUTEN) return parts[0];
  return char;
}

/** Which recall row a kana belongs to — used to honour row selection for all variants. */
function anchorRowId(entry: Kana): string | null {
  if (MONOGRAPH_GROUPS.has(entry.group)) {
    return RECALL_ROWS.find((r) => r.groups.includes(entry.group))?.id ?? null;
  }

  const [first] = [...entry.char];
  const base = plainBase(first);
  const monograph = kana.find(
    (k) =>
      k.char === base &&
      k.script === entry.script &&
      MONOGRAPH_GROUPS.has(k.group)
  );
  if (!monograph) return null;
  return RECALL_ROWS.find((r) => r.groups.includes(monograph.group))?.id ?? null;
}

/** Every kana matching the current setup filters. */
export function buildRecallDeck(settings: RecallSettings): Kana[] {
  const scripts = new Set(settings.scripts);
  const variants = new Set(settings.variants);
  const rows = new Set(settings.rowIds);

  return kana.filter((entry) => {
    if (!scripts.has(entry.script)) return false;

    const rowId = anchorRowId(entry);
    if (!rowId || !rows.has(rowId)) return false;

    if (MONOGRAPH_GROUPS.has(entry.group)) return variants.has("monographs");
    if (entry.group === "dakuten" || entry.group === "handakuten") {
      return variants.has("diacritics");
    }
    if (entry.group === "yoon") return variants.has("digraphs");
    return false;
  });
}

/** How many kana a row contributes under the current script and variant filters. */
export function recallRowSize(row: RecallRow, settings: RecallSettings): number {
  const scripts = new Set(settings.scripts);
  const variants = new Set(settings.variants);
  return kana.filter((entry) => {
    if (!scripts.has(entry.script)) return false;
    if (row.groups.includes(entry.group)) return variants.has("monographs");
    if (entry.group === "dakuten" || entry.group === "handakuten") {
      return variants.has("diacritics") && anchorRowId(entry) === row.id;
    }
    if (entry.group === "yoon") {
      return variants.has("digraphs") && anchorRowId(entry) === row.id;
    }
    return false;
  }).length;
}

export function deckSize(settings: RecallSettings): number {
  return buildRecallDeck(settings).length;
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** One shuffled pass through the deck; each card appears once. */
export function shuffleDeck(cards: Kana[]): Kana[] {
  return shuffle(cards);
}

/* -------------------------------------------------------------------------- */
/* Romanisation matching                                                       */
/* -------------------------------------------------------------------------- */

/** Hepburn alternates learners commonly type. Keys and values are normalised. */
const ROMAJI_ALIASES: Record<string, string[]> = {
  shi: ["si"],
  chi: ["ti"],
  tsu: ["tu"],
  fu: ["hu"],
  ji: ["zi"],
  zu: ["du"],
  sha: ["sya"],
  shu: ["syu"],
  sho: ["syo"],
  cha: ["tya", "cya"],
  chu: ["tyu", "cyu"],
  cho: ["tyo", "cyo"],
  ja: ["zya", "jya"],
  ju: ["zyu", "jyu"],
  jo: ["zyo", "jyo"],
};

function normaliseRomaji(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, "");
}

/** Every romanisation accepted for `entry`, including common alternates. */
export function acceptedRomaji(entry: Kana): Set<string> {
  const canonical = normaliseRomaji(entry.romaji);
  const answers = new Set<string>([canonical]);

  for (const alt of ROMAJI_ALIASES[canonical] ?? []) answers.add(alt);

  // を / ヲ: particle reading "o" as well as the character name "wo".
  if (entry.char === "を" || entry.char === "ヲ") {
    answers.add("o");
    answers.add("wo");
  }

  return answers;
}

/** Whether `input` matches `entry`, case-insensitive with known Hepburn variants. */
export function matchesRomaji(input: string, entry: Kana): boolean {
  const typed = normaliseRomaji(input);
  if (!typed) return false;
  return acceptedRomaji(entry).has(typed);
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                 */
/* -------------------------------------------------------------------------- */

const SETTINGS_KEY = "jij.kana.recall.settings.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readRecallSettings(): RecallSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<RecallSettings>;

    const scripts = Array.isArray(parsed.scripts)
      ? parsed.scripts.filter((s): s is RecallScript => s === "hiragana" || s === "katakana")
      : DEFAULT_SETTINGS.scripts;

    const variants = Array.isArray(parsed.variants)
      ? parsed.variants.filter((v): v is RecallVariant =>
          v === "monographs" || v === "diacritics" || v === "digraphs"
        )
      : DEFAULT_SETTINGS.variants;

    const rowIds = Array.isArray(parsed.rowIds)
      ? parsed.rowIds.filter((id) => RECALL_ROWS.some((r) => r.id === id))
      : DEFAULT_SETTINGS.rowIds;

    return {
      scripts: scripts.length ? scripts : DEFAULT_SETTINGS.scripts,
      variants: variants.length ? variants : DEFAULT_SETTINGS.variants,
      rowIds: rowIds.length ? rowIds : DEFAULT_SETTINGS.rowIds,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeRecallSettings(settings: RecallSettings): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* storage may be unavailable */
  }
}

/** Resolve a list of character glyphs back to full kana entries (both scripts if present). */
export function kanaByChars(chars: string[]): Kana[] {
  const wanted = new Set(chars);
  return kana.filter((k) => wanted.has(k.char));
}
