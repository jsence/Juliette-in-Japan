import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KanjiIndex } from "@/components/language/KanjiIndex";
import { kanji } from "@/lib/data";

interface Params {
  params: { char: string };
}

/** Every kanji gets its own statically generated page. */
export function generateStaticParams() {
  return kanji.map((k) => ({ char: k.char }));
}

function find(param: string) {
  const char = decodeURIComponent(param);
  return kanji.find((k) => k.char === char);
}

export function generateMetadata({ params }: Params): Metadata {
  const entry = find(params.char);
  if (!entry) return { title: "Kanji" };

  return {
    title: `${entry.char} — ${entry.meanings.join(", ")}`,
    description: `The kanji ${entry.char} (${entry.meanings.join(", ")}): ${
      entry.strokes
    } strokes, radical ${entry.radical.char}, on'yomi ${
      entry.onyomi.join("、") || "—"
    }, kun'yomi ${
      entry.kunyomi.join("、") || "—"
    }. With animated stroke order and JMdict example words.`,
  };
}

export default function KanjiCharacterPage({ params }: Params) {
  const entry = find(params.char);
  if (!entry) notFound();

  return <KanjiIndex initialChar={entry.char} />;
}
