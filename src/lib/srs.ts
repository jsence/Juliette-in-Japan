import type {
  Sm2State,
  StudyCard,
  StudyMode,
  RubySegment,
  GrammarPoint,
} from "@/types/content";
import { vocabulary, kanji, grammar } from "./data";

/* -------------------------------------------------------------------------- */
/* SM-2 scheduling (pure functions)                                            */
/* -------------------------------------------------------------------------- */

export const DEFAULT_EASE = 2.5;
export const MIN_EASE = 1.3;

/** Answer grades mapped to SM-2 quality scores. */
export const GRADES = {
  again: 2,
  hard: 3,
  good: 4,
  easy: 5,
} as const;
export type GradeKey = keyof typeof GRADES;

/** Today as an ISO date string (YYYY-MM-DD), local time. */
export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return todayIso(d);
}

/** A brand-new card (no stored state) is always due. */
export function isDue(state: Sm2State | undefined, today: string = todayIso()): boolean {
  if (!state) return true;
  return state.due <= today;
}

/**
 * Apply an SM-2 update for a given quality grade (0–5), returning new state.
 * Failing grades (q < 3) reset the repetition count and schedule the card
 * for the next day; passing grades grow the interval by the easiness factor.
 */
export function schedule(
  prev: Sm2State | undefined,
  quality: number,
  today: string = todayIso()
): Sm2State {
  const base: Sm2State = prev ?? {
    ease: DEFAULT_EASE,
    interval: 0,
    reps: 0,
    lapses: 0,
    due: today,
  };

  let { ease, interval, reps, lapses } = base;

  if (quality < 3) {
    reps = 0;
    lapses += 1;
    interval = 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ease);

    ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (ease < MIN_EASE) ease = MIN_EASE;
  }

  return {
    ease: Math.round(ease * 100) / 100,
    interval,
    reps,
    lapses,
    due: addDays(today, interval),
    last: today,
  };
}

/* -------------------------------------------------------------------------- */
/* Card building (pure, derived from typed content)                            */
/* -------------------------------------------------------------------------- */

const jp = (text: string): RubySegment[] => [{ t: text }];

/** Build every study card for a given mode from the typed data. */
export function buildCards(mode: StudyMode): StudyCard[] {
  switch (mode) {
    case "recognition":
      return [
        ...vocabulary.map<StudyCard>((v) => ({
          id: `rec:vocab:${v.word}`,
          mode,
          front: { segments: jp(v.word), sub: v.reading },
          back: { text: v.meaning },
          deck: v.theme,
          tags: [v.theme, "vocabulary", v.partOfSpeech],
        })),
        ...kanji.map<StudyCard>((k) => ({
          id: `rec:kanji:${k.char}`,
          mode,
          front: { segments: jp(k.char) },
          back: { text: k.meanings.join(", ") },
          deck: "kanji",
          tags: ["kanji"],
        })),
      ];

    case "recall":
      return vocabulary.map<StudyCard>((v) => ({
        id: `rcl:vocab:${v.word}`,
        mode,
        front: { text: v.meaning },
        back: { segments: jp(v.word), sub: v.reading },
        deck: v.theme,
        tags: [v.theme, "vocabulary", v.partOfSpeech],
      }));

    case "kanji-reading":
      return kanji.map<StudyCard>((k) => ({
        id: `kr:kanji:${k.char}`,
        mode,
        front: { segments: jp(k.char) },
        back: {
          text: [...k.kunyomi, ...k.onyomi].filter(Boolean).join("、") || "—",
          sub: k.meanings.join(", "),
        },
        deck: "kanji",
        tags: ["kanji", "reading"],
      }));

    case "cloze":
      return grammar.flatMap<StudyCard>((point) =>
        point.examples.map((ex, i) => {
          const target = pickClozeIndex(ex.segments);
          const answer = ex.segments[target]?.t ?? "";
          const blanked: RubySegment[] = ex.segments.map((seg, idx) =>
            idx === target ? { t: "＿＿" } : seg
          );
          return {
            id: `cz:${point.id}:${i}`,
            mode,
            front: { segments: blanked, sub: ex.en },
            back: { text: answer, sub: ex.romaji },
            deck: point.category,
            tags: ["grammar", point.category, point.id, ...point.tags],
          };
        })
      );
  }
}

/** Choose which segment to blank in a cloze card (prefer a kanji segment). */
function pickClozeIndex(segments: RubySegment[]): number {
  const withReading = segments.findIndex((s) => s.r);
  if (withReading >= 0) return withReading;
  // Otherwise blank the first non-final, non-empty segment.
  const idx = segments.findIndex((s, i) => i < segments.length - 1 && s.t.trim().length > 0);
  return idx >= 0 ? idx : 0;
}

/** A recognition-style card for a single grammar point (used by "starred"). */
export function grammarPointCard(point: GrammarPoint): StudyCard {
  return {
    id: `rec:grammar:${point.id}`,
    mode: "recognition",
    front: { segments: jp(point.form) },
    back: { text: point.meaning, sub: point.title },
    deck: point.category,
    tags: ["grammar", point.category, point.id],
  };
}

/** All distinct deck labels available across modes. */
export function allDecks(): string[] {
  const set = new Set<string>();
  for (const v of vocabulary) set.add(v.theme);
  set.add("kanji");
  for (const c of grammar) if (c.examples.length) set.add(c.category);
  return [...set];
}
