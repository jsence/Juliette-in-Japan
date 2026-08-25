"use client";

import { useState } from "react";

import type { DrillQuestion } from "@/types/content";
import { useLessonProgress } from "@/lib/lessonStore";

interface LessonDrillProps {
  lessonId: string;
  questions: DrillQuestion[];
}

/** End-of-lesson multiple-choice drill; completing it marks the lesson done. */
export function LessonDrill({ lessonId, questions }: LessonDrillProps) {
  const { isComplete, setComplete, ready } = useLessonProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredAll = questions.every((q) => answers[q.id] !== undefined);
  const correctCount = questions.filter((q) => answers[q.id] === q.answer).length;
  const done = ready && isComplete(lessonId);

  const choose = (q: DrillQuestion, choice: number) => {
    if (answers[q.id] !== undefined) return; // lock after answering
    setAnswers((a) => ({ ...a, [q.id]: choice }));
  };

  return (
    <div className="space-y-6">
      <ol className="space-y-5">
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const answered = chosen !== undefined;
          return (
            <li key={q.id} className="rounded-lg border border-paper-300 bg-paper-50 p-4 dark:border-sumi-border dark:bg-sumi-light">
              <p className="font-medium text-ink dark:text-paper-100">
                {qi + 1}. {q.prompt}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.choices.map((choice, ci) => {
                  const isAnswer = ci === q.answer;
                  const isChosen = ci === chosen;
                  let cls =
                    "rounded-md border px-3 py-2 text-left text-sm transition font-jp ";
                  if (!answered) {
                    cls +=
                      "border-paper-300 text-ink-light hover:border-hanko/50 hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi";
                  } else if (isAnswer) {
                    cls += "border-emerald-600 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300";
                  } else if (isChosen) {
                    cls += "border-hanko bg-hanko/10 text-hanko dark:text-hanko-light";
                  } else {
                    cls += "border-paper-300 text-ink-muted dark:border-sumi-border dark:text-paper-300";
                  }
                  return (
                    <button
                      key={ci}
                      type="button"
                      disabled={answered}
                      onClick={() => choose(q, ci)}
                      className={cls}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {answered && q.explain && (
                <p className="mt-3 text-sm text-ink-muted dark:text-paper-300">
                  {chosen === q.answer ? "Correct — " : "Not quite — "}
                  {q.explain}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="rounded-lg border border-paper-300 bg-paper-100 p-4 dark:border-sumi-border dark:bg-sumi">
        {answeredAll ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-light dark:text-paper-200">
              You scored{" "}
              <span className="font-semibold text-ink dark:text-paper-100">
                {correctCount} / {questions.length}
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => setComplete(lessonId, !done)}
              className={
                "rounded-md px-4 py-2 text-sm font-medium transition " +
                (done
                  ? "border border-hanko text-hanko hover:bg-hanko/10"
                  : "bg-hanko text-paper-50 hover:bg-hanko-dark")
              }
            >
              {done ? "Completed — mark incomplete" : "Mark lesson complete"}
            </button>
          </div>
        ) : (
          <p className="text-sm text-ink-muted dark:text-paper-300">
            Answer all {questions.length} questions to finish the lesson.
          </p>
        )}
      </div>
    </div>
  );
}
