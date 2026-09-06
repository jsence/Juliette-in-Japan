import type { Metadata } from "next";

import { KanjiIndex } from "@/components/language/KanjiIndex";

export const metadata: Metadata = {
  title: "N5 kanji",
  description: "Kanji cards with meanings, on'yomi, kun'yomi, stroke counts and common words.",
};

export default function KanjiPage() {
  return <KanjiIndex />;
}
