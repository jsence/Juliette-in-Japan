"use client";

import Link from "next/link";

import type { Lesson } from "@/types/content";
import { ProgressBar } from "./ProgressBar";
import { useLessonProgress } from "@/lib/lessonStore";

interface LessonListProps {
  lessons: Lesson[];
}

/** The guided lesson path with per-lesson completion from localStorage. */
export function LessonList({ lessons }: LessonListProps) {
  const { isComplete, completed, ready } = useLessonProgress();
  const doneCount = ready ? completed.filter((id) => lessons.some((l) => l.id === id)).length : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-paper-300 bg-paper-50 p-5 dark:border-sumi-border dark:bg-sumi-light">
        <ProgressBar
          value={doneCount}
          max={lessons.length}
          label={`Lessons completed`}
        />
      </div>

      <ol className="space-y-3">
        {lessons.map((lesson) => {
          const done = ready && isComplete(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/language/n5/lessons/${lesson.id}`}
                className="group flex items-start gap-4 rounded-lg border border-paper-300 bg-paper-50 p-4 shadow-sm transition hover:border-hanko/50 hover:shadow-md dark:border-sumi-border dark:bg-sumi-light"
              >
                <span
                  className={
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold " +
                    (done
                      ? "bg-hanko text-paper-50"
                      : "border border-paper-300 text-ink-muted dark:border-sumi-border dark:text-paper-300")
                  }
                  aria-hidden="true"
                >
                  {done ? "✓" : lesson.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-hanko dark:text-paper-100 dark:group-hover:text-hanko-light">
                      Lesson {lesson.number}: {lesson.title}
                    </h3>
                    {done && (
                      <span className="shrink-0 text-xs font-medium text-hanko dark:text-hanko-light">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-light dark:text-paper-200">{lesson.summary}</p>
                  <p className="mt-2 text-xs text-ink-muted dark:text-paper-300">
                    {lesson.grammarIds.length} grammar · {lesson.vocabWords.length} words ·{" "}
                    {lesson.kanjiChars.length} kanji · {lesson.drill.length}-question drill
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
