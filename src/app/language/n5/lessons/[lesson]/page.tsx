import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { N5SubNav } from "@/components/N5SubNav";
import { Hanko } from "@/components/Hanko";
import { GrammarCard } from "@/components/GrammarCard";
import { VocabTable } from "@/components/VocabTable";
import { KanjiCard } from "@/components/KanjiCard";
import { LessonDrill } from "@/components/LessonDrill";
import { lessons, getLessonById, resolveLesson } from "@/lib/data";

interface Params {
  params: { lesson: string };
}

export function generateStaticParams() {
  return lessons.map((l) => ({ lesson: l.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const lesson = getLessonById(params.lesson);
  if (!lesson) return {};
  return { title: `Lesson ${lesson.number}: ${lesson.title}`, description: lesson.summary };
}

export default function LessonPage({ params }: Params) {
  const lesson = getLessonById(params.lesson);
  if (!lesson) notFound();

  const { grammar, vocab, kanji } = resolveLesson(lesson);
  const prev = lessons.find((l) => l.number === lesson.number - 1);
  const next = lessons.find((l) => l.number === lesson.number + 1);

  return (
    <div className="space-y-10">
      <N5SubNav />

      <div>
        <Link
          href="/language/n5/lessons"
          className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
        >
          ← All lessons
        </Link>
      </div>

      <header className="flex items-center gap-3">
        <Hanko size="md">課</Hanko>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-hanko dark:text-hanko-light">
            Lesson {lesson.number}
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink dark:text-paper-100 sm:text-4xl">
            {lesson.title}
          </h1>
        </div>
      </header>
      <p className="max-w-2xl text-ink-light dark:text-paper-200">{lesson.summary}</p>

      {grammar.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Grammar</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {grammar.map((point) => (
              <GrammarCard key={point.id} point={point} />
            ))}
          </div>
        </section>
      )}

      {vocab.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Vocabulary</h2>
          <VocabTable entries={vocab} caption={`Lesson ${lesson.number} vocabulary`} />
        </section>
      )}

      {kanji.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Kanji</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kanji.map((k) => (
              <KanjiCard key={k.char} kanji={k} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper-100">Drill</h2>
        <LessonDrill lessonId={lesson.id} questions={lesson.drill} />
      </section>

      <nav className="flex items-center justify-between border-t border-paper-200 pt-6 dark:border-sumi-border">
        {prev ? (
          <Link
            href={`/language/n5/lessons/${prev.id}`}
            className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
          >
            ← Lesson {prev.number}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/language/n5/lessons/${next.id}`}
            className="text-sm font-medium text-hanko hover:underline dark:text-hanko-light"
          >
            Lesson {next.number} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
