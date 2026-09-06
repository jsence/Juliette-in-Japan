import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KanaIndex } from "@/components/language/KanaIndex";
import { kanaPosition } from "@/lib/characters";
import { kana } from "@/lib/data";

interface Params {
  params: { char: string };
}

/** Every kana gets its own statically generated page. */
export function generateStaticParams() {
  return kana.map((k) => ({ char: k.char }));
}

function find(param: string) {
  const char = decodeURIComponent(param);
  return kana.find((k) => k.char === char);
}

export function generateMetadata({ params }: Params): Metadata {
  const entry = find(params.char);
  if (!entry) return { title: "Kana" };

  const script = entry.script === "hiragana" ? "Hiragana" : "Katakana";
  const { row, column } = kanaPosition(entry);
  const place = row && column ? ` It sits at ${row} · ${column}.` : "";

  return {
    title: `${entry.char} (${entry.romaji}) — ${script}`,
    description: `${script} ${entry.char}, read "${entry.romaji}", written in ${entry.strokes} ${
      entry.strokes === 1 ? "stroke" : "strokes"
    }.${place} With animated stroke order and JMdict example words.`,
  };
}

export default function KanaCharacterPage({ params }: Params) {
  const entry = find(params.char);
  if (!entry) notFound();

  return <KanaIndex initialChar={entry.char} />;
}
