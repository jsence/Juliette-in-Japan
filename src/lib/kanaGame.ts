/**
 * Pure game logic for the Kana Battle duel.
 *
 * Every kana shown comes from the shared `data/kana.json` set (via `@/lib/data`)
 * so the game can never drift from the reference tables.
 */

import { kana } from "./data";
import type { Kana, KanaGroup } from "@/types/content";

/** A selectable row on the setup screen, mapped to underlying kana groups. */
export interface KanaRow {
  id: string;
  /** Japanese row label, e.g. "か行". */
  label: string;
  /** Romaji hint shown under the label. */
  hint: string;
  groups: KanaGroup[];
}

export const KANA_ROWS: KanaRow[] = [
  { id: "vowels", label: "あ行", hint: "a i u e o", groups: ["vowels"] },
  { id: "k", label: "か行", hint: "ka ki ku ke ko", groups: ["k"] },
  { id: "s", label: "さ行", hint: "sa shi su se so", groups: ["s"] },
  { id: "t", label: "た行", hint: "ta chi tsu te to", groups: ["t"] },
  { id: "n", label: "な行", hint: "na ni nu ne no", groups: ["n"] },
  { id: "h", label: "は行", hint: "ha hi fu he ho", groups: ["h"] },
  { id: "m", label: "ま行", hint: "ma mi mu me mo", groups: ["m"] },
  { id: "y", label: "や行", hint: "ya yu yo", groups: ["y"] },
  { id: "r", label: "ら行", hint: "ra ri ru re ro", groups: ["r"] },
  { id: "w", label: "わ行・ん", hint: "wa wo n", groups: ["w", "n-final"] },
  { id: "dakuten", label: "濁音・半濁音", hint: "ga za da ba pa", groups: ["dakuten", "handakuten"] },
  { id: "yoon", label: "拗音", hint: "kya shu cho", groups: ["yoon"] },
];

/** Row ids enabled by default (the plain gojūon). */
export const DEFAULT_ROW_IDS = KANA_ROWS.filter(
  (r) => r.id !== "dakuten" && r.id !== "yoon"
).map((r) => r.id);

export type ChoiceCount = 2 | 3 | 4;

/** Reaction-time presets, in milliseconds per question. */
export const SPEED_PRESETS = {
  relaxed: { label: "Relaxed", ms: 5000 },
  normal: { label: "Normal", ms: 3000 },
  hard: { label: "Hard", ms: 1500 },
} as const;

export type SpeedKey = keyof typeof SPEED_PRESETS;

export interface GameSettings {
  rowIds: string[];
  choices: ChoiceCount;
  speed: SpeedKey;
}

export const DEFAULT_SETTINGS: GameSettings = {
  rowIds: DEFAULT_ROW_IDS,
  choices: 4,
  speed: "normal",
};

/** Hit points for both duellists. */
export const MAX_HP = 3;

/** Each cleared wave shortens the timer by this much, down to `MIN_TIMER_MS`. */
export const WAVE_SPEEDUP_MS = 150;
export const MIN_TIMER_MS = 1000;

/** Time the correct answer stays on screen after a miss. */
export const REVEAL_MS = 1000;

/* -------------------------------------------------------------------------- */
/* Pool + question building                                                    */
/* -------------------------------------------------------------------------- */

const hiragana = kana.filter((k) => k.script === "hiragana");

/** Every hiragana belonging to the selected rows. */
export function buildPool(rowIds: string[]): Kana[] {
  const groups = new Set<KanaGroup>();
  for (const row of KANA_ROWS) {
    if (rowIds.includes(row.id)) {
      for (const g of row.groups) groups.add(g);
    }
  }
  return hiragana.filter((k) => groups.has(k.group));
}

/** How many kana a given row contributes (shown as a count on the setup screen). */
export function rowSize(row: KanaRow): number {
  return hiragana.filter((k) => row.groups.includes(k.group)).length;
}

export interface Question {
  /** The kana the player must identify. */
  answer: Kana;
  /** Shuffled options including the answer. */
  choices: Kana[];
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build one question. Distractors are drawn from the selected pool first and
 * topped up from the full hiragana set when the pool is smaller than the
 * requested number of choices.
 */
export function makeQuestion(
  pool: Kana[],
  choiceCount: ChoiceCount,
  avoid?: string
): Question | null {
  if (pool.length === 0) return null;

  const candidates = pool.length > 1 && avoid ? pool.filter((k) => k.char !== avoid) : pool;
  const answer = candidates[Math.floor(Math.random() * candidates.length)];

  const distractors: Kana[] = [];
  const seen = new Set([answer.char]);

  for (const k of shuffle(pool)) {
    if (distractors.length >= choiceCount - 1) break;
    if (seen.has(k.char) || k.romaji === answer.romaji) continue;
    seen.add(k.char);
    distractors.push(k);
  }

  // Small pools (e.g. や行 alone) need filling from the wider set.
  if (distractors.length < choiceCount - 1) {
    for (const k of shuffle(hiragana)) {
      if (distractors.length >= choiceCount - 1) break;
      if (seen.has(k.char) || k.romaji === answer.romaji) continue;
      seen.add(k.char);
      distractors.push(k);
    }
  }

  return { answer, choices: shuffle([answer, ...distractors]) };
}

/** Timer allowance for a wave, ramping down as waves are cleared. */
export function timerForWave(settings: GameSettings, wave: number): number {
  const base = SPEED_PRESETS[settings.speed].ms;
  return Math.max(MIN_TIMER_MS, base - (wave - 1) * WAVE_SPEEDUP_MS);
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                 */
/* -------------------------------------------------------------------------- */

const SETTINGS_KEY = "jij.kana.game.settings.v1";
const BEST_KEY = "jij.kana.game.best.v1";

export interface BestScore {
  waves: number;
  correct: number;
  accuracy: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readSettings(): GameSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<GameSettings>;
    const rowIds = Array.isArray(parsed.rowIds)
      ? parsed.rowIds.filter((id) => KANA_ROWS.some((r) => r.id === id))
      : DEFAULT_SETTINGS.rowIds;
    const choices = ([2, 3, 4] as ChoiceCount[]).includes(parsed.choices as ChoiceCount)
      ? (parsed.choices as ChoiceCount)
      : DEFAULT_SETTINGS.choices;
    const speed =
      parsed.speed && parsed.speed in SPEED_PRESETS ? parsed.speed : DEFAULT_SETTINGS.speed;
    return { rowIds: rowIds.length ? rowIds : DEFAULT_SETTINGS.rowIds, choices, speed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeSettings(settings: GameSettings): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* storage may be unavailable */
  }
}

export function readBest(): BestScore | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(BEST_KEY);
    return raw ? (JSON.parse(raw) as BestScore) : null;
  } catch {
    return null;
  }
}

/** Store a run if it beats the stored best (waves first, then correct answers). */
export function saveBest(score: BestScore): BestScore {
  const prev = readBest();
  const better =
    !prev || score.waves > prev.waves || (score.waves === prev.waves && score.correct > prev.correct);
  if (!better) return prev!;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(BEST_KEY, JSON.stringify(score));
    } catch {
      /* storage may be unavailable */
    }
  }
  return score;
}
