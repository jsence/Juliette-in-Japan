"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { Kana } from "@/types/content";
import {
  MAX_HP,
  REVEAL_MS,
  buildPool,
  makeQuestion,
  timerForWave,
  type GameSettings,
  type Question,
} from "@/lib/kanaGame";
import { BattleBackdrop } from "./BattleBackdrop";
import { CountdownRing } from "./CountdownRing";
import { FighterSprite, type FighterPose } from "./FighterSprite";
import { HeartBar } from "./HeartBar";

/** Outcome of a finished run, handed to the results screen. */
export interface RunStats {
  waves: number;
  correct: number;
  answered: number;
  /** Average reaction time over correct answers, in ms. */
  averageMs: number;
  missed: Kana[];
}

interface BattleArenaProps {
  settings: GameSettings;
  onGameOver: (stats: RunStats) => void;
  onQuit: () => void;
}

type Phase = "asking" | "correct" | "wrong" | "waveClear";

const CORRECT_MS = 480;
const WAVE_CLEAR_MS = 950;

export function BattleArena({ settings, onGameOver, onQuit }: BattleArenaProps) {
  const reduceMotion = useReducedMotion();
  const poolRef = useRef<Kana[]>(buildPool(settings.rowIds));

  const [wave, setWave] = useState(1);
  const [playerHp, setPlayerHp] = useState(MAX_HP);
  const [enemyHp, setEnemyHp] = useState(MAX_HP);
  const [question, setQuestion] = useState<Question | null>(() =>
    makeQuestion(poolRef.current, settings.choices)
  );
  const [phase, setPhase] = useState<Phase>("asking");
  const [picked, setPicked] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(() => timerForWave(settings, 1));

  // Run totals; kept in refs so the game loop never reads stale values.
  const statsRef = useRef({ correct: 0, answered: 0, totalMs: 0, missed: [] as Kana[] });
  const deadlineRef = useRef(0);
  const allowanceRef = useRef(timerForWave(settings, 1));
  const askedAtRef = useRef(0);
  const settledRef = useRef(false);

  const allowance = timerForWave(settings, wave);

  /** Move to the next question, or end the run when the player is out of HP. */
  const nextQuestion = useCallback(
    (nextWave: number) => {
      const q = makeQuestion(poolRef.current, settings.choices, question?.answer.char);
      allowanceRef.current = timerForWave(settings, nextWave);
      setQuestion(q);
      setPicked(null);
      setRemaining(allowanceRef.current);
      setPhase("asking");
    },
    [settings, question?.answer.char]
  );

  /** Resolve the current question. `char` is null on timeout. */
  const answer = useCallback(
    (char: string | null) => {
      if (settledRef.current || !question) return;
      settledRef.current = true;

      const isCorrect = char === question.answer.char;
      const stats = statsRef.current;
      stats.answered += 1;
      setPicked(char);

      if (isCorrect) {
        stats.correct += 1;
        stats.totalMs += performance.now() - askedAtRef.current;
        setPhase("correct");
        setEnemyHp((hp) => hp - 1);
      } else {
        stats.missed.push(question.answer);
        setPhase("wrong");
        setPlayerHp((hp) => hp - 1);
      }
    },
    [question]
  );

  // Keep a stable handle for the animation-frame loop.
  const answerRef = useRef(answer);
  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  /* --------------------------- countdown loop --------------------------- */

  useEffect(() => {
    if (phase !== "asking" || !question) return;

    settledRef.current = false;
    const start = performance.now();
    askedAtRef.current = start;
    deadlineRef.current = start + allowanceRef.current;

    let frame = 0;
    const tick = () => {
      const left = deadlineRef.current - performance.now();
      if (left <= 0) {
        setRemaining(0);
        answerRef.current(null);
        return;
      }
      setRemaining(left);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, question]);

  /* ------------------------- phase transitions -------------------------- */

  useEffect(() => {
    if (phase === "asking") return;

    // A defeated enemy interrupts the normal flow with a wave-clear beat.
    if (phase === "correct" && enemyHp === 0) {
      const t = setTimeout(() => setPhase("waveClear"), CORRECT_MS);
      return () => clearTimeout(t);
    }

    if (phase === "waveClear") {
      const t = setTimeout(() => {
        const next = wave + 1;
        setWave(next);
        setEnemyHp(MAX_HP);
        nextQuestion(next);
      }, WAVE_CLEAR_MS);
      return () => clearTimeout(t);
    }

    if (phase === "wrong" && playerHp === 0) {
      const t = setTimeout(() => {
        const s = statsRef.current;
        onGameOver({
          waves: wave - 1,
          correct: s.correct,
          answered: s.answered,
          averageMs: s.correct > 0 ? s.totalMs / s.correct : 0,
          missed: s.missed,
        });
      }, REVEAL_MS);
      return () => clearTimeout(t);
    }

    const delay = phase === "wrong" ? REVEAL_MS : CORRECT_MS;
    const t = setTimeout(() => nextQuestion(wave), delay);
    return () => clearTimeout(t);
  }, [phase, enemyHp, playerHp, wave, nextQuestion, onGameOver]);

  /* --------------------------- keyboard input --------------------------- */

  useEffect(() => {
    if (phase !== "asking" || !question) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > question.choices.length) return;
      e.preventDefault();
      answerRef.current(question.choices[n - 1].char);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, question]);

  if (!question) {
    return (
      <p className="text-ink-muted dark:text-paper-300">
        No kana selected — go back and choose at least one row.
      </p>
    );
  }

  const samuraiPose: FighterPose = phase === "correct" || phase === "waveClear" ? "attack" : "idle";
  const ninjaPose: FighterPose =
    phase === "wrong" ? "attack" : phase === "correct" || phase === "waveClear" ? "hit" : "idle";

  const animate = !reduceMotion;
  const progress = remaining / allowance;
  // Landed hits are fully described by the wave and the enemy's remaining HP.
  const hits = (wave - 1) * MAX_HP + (MAX_HP - enemyHp);

  return (
    <div className="space-y-5">
      {/* HUD */}
      <div className="flex items-start justify-between gap-4">
        <HeartBar hp={playerHp} max={MAX_HP} label="Samurai" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-pixel text-[0.625rem] uppercase tracking-wider text-hanko dark:text-hanko-light">
            Wave {wave}
          </span>
          <span className="font-pixel text-[0.5rem] text-ink-muted dark:text-paper-300">
            {hits} {hits === 1 ? "hit" : "hits"}
          </span>
        </div>
        <HeartBar hp={enemyHp} max={MAX_HP} label="Ninja" align="right" />
      </div>

      {/* Stage */}
      <div
        className={
          // Height-capped so the stage and the answer buttons stay on screen
          // together on a standard laptop viewport.
          "relative aspect-[16/9] max-h-[42dvh] w-full overflow-hidden rounded-xl border border-ink/15 shadow-glass dark:border-paper-100/10 dark:shadow-glass-dark " +
          (phase === "waveClear" && animate ? "animate-victory-flash" : "") +
          (phase === "wrong" && animate ? " animate-screen-shake" : "")
        }
      >
        <BattleBackdrop depth={wave} />

        {/* Romaji speech bubble, anchored over the ninja */}
        <div className="absolute right-[3%] top-[6%] z-20 w-[46%] max-w-[13rem]">
          <div className="relative rounded-lg border-2 border-ink/70 bg-paper-50 px-3 py-2.5 text-center shadow-[3px_3px_0_rgba(43,38,32,0.35)] dark:border-paper-100/60 dark:bg-sumi-light">
            <p
              className="font-pixel text-base leading-none text-ink dark:text-paper-100 sm:text-xl"
              aria-live="polite"
            >
              {question.answer.romaji}
            </p>
            {/* bubble tail pointing down at the ninja */}
            <span
              className="absolute -bottom-2 right-8 h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-ink/70 dark:border-t-paper-100/60"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Samurai */}
        <div
          className={
            "absolute bottom-[18%] left-[6%] z-10 h-[46%] w-[22%] transition-transform duration-200 sm:left-[12%] " +
            (animate && (phase === "correct" || phase === "waveClear")
              ? "translate-x-[28%] -translate-y-1"
              : "")
          }
        >
          <FighterSprite fighter="samurai" pose={samuraiPose} />
        </div>

        {/* Ninja */}
        <div
          className={
            "absolute bottom-[18%] right-[6%] z-10 h-[46%] w-[22%] transition-transform duration-200 sm:right-[12%] " +
            (animate && phase === "wrong" ? "-translate-x-[28%] -translate-y-1 " : "") +
            (animate && phase === "correct" ? "translate-x-[6%] " : "") +
            (phase === "waveClear" ? "opacity-0 " : "opacity-100")
          }
        >
          <div
            className={
              phase === "correct" && animate
                ? "h-full w-full animate-hit-flash"
                : "h-full w-full"
            }
          >
            <FighterSprite fighter="ninja" pose={ninjaPose} />
          </div>
        </div>

        {/* Timer — top-left, clear of both fighters */}
        <div className="absolute left-2 top-2 z-20 origin-top-left scale-[0.7] sm:left-3 sm:top-3 sm:scale-100">
          <CountdownRing progress={progress} remainingMs={remaining} />
        </div>

        {/* Miss / wave banners */}
        {phase === "wrong" && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-hanko/15 backdrop-blur-[1px]">
            <div className="rounded-lg border-2 border-hanko bg-paper-50 px-5 py-3 text-center dark:bg-sumi-light">
              <p className="font-pixel text-[0.625rem] uppercase text-hanko dark:text-hanko-light">
                {picked === null ? "Too slow" : "Miss"}
              </p>
              <p className="mt-2 font-jp text-3xl font-semibold text-ink dark:text-paper-100">
                {question.answer.char}
              </p>
              <p className="mt-1 text-xs text-ink-muted dark:text-paper-300">
                {question.answer.romaji}
              </p>
            </div>
          </div>
        )}

        {phase === "waveClear" && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <p className="font-pixel text-sm text-hanko drop-shadow-[2px_2px_0_rgba(250,246,238,0.9)] sm:text-lg dark:text-hanko-light">
              Wave {wave} clear!
            </p>
          </div>
        )}
      </div>

      {/* Answer choices */}
      <div
        className={
          "grid gap-3 " + (question.choices.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")
        }
      >
        {question.choices.map((choice, i) => {
          const isAnswer = choice.char === question.answer.char;
          const isPicked = picked === choice.char;
          const settled = phase === "correct" || phase === "wrong";

          let tone =
            "border-white/50 bg-white/40 text-ink hover:-translate-y-0.5 hover:border-hanko/50 hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:text-paper-100 dark:hover:bg-white/10";
          if (settled && isAnswer) {
            tone = "border-emerald-600 bg-emerald-600/20 text-ink dark:text-paper-100";
          } else if (settled && isPicked) {
            tone = "border-hanko bg-hanko/20 text-ink dark:text-paper-100";
          } else if (settled) {
            tone = "border-white/40 bg-white/20 text-ink/40 dark:border-white/5 dark:text-paper-100/40";
          }

          return (
            <button
              key={choice.char}
              type="button"
              disabled={phase !== "asking"}
              onClick={() => answer(choice.char)}
              className={
                "relative rounded-xl border-2 py-5 font-jp text-4xl font-semibold shadow-glass backdrop-blur-md transition duration-200 disabled:cursor-default sm:py-6 sm:text-5xl " +
                tone
              }
            >
              <span
                className="absolute left-2 top-1.5 font-pixel text-[0.5rem] text-ink-muted dark:text-paper-300"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              {choice.char}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-ink-muted dark:text-paper-300">
          Press <kbd className="font-pixel text-[0.625rem]">1</kbd>–
          <kbd className="font-pixel text-[0.625rem]">{question.choices.length}</kbd> to answer.
        </p>
        <button
          type="button"
          onClick={onQuit}
          className="rounded-md border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-ink/5 dark:border-paper-100/20 dark:text-paper-300 dark:hover:bg-white/5"
        >
          Quit
        </button>
      </div>
    </div>
  );
}
