import type { Metadata } from "next";

import { KanaIndex } from "@/components/language/KanaIndex";

export const metadata: Metadata = {
  title: "Kana — hiragana & katakana",
  description:
    "The two N5 syllabaries: hiragana and katakana, with stroke counts, dakuten/handakuten, yōon, sokuon and long vowels.",
};

export default function KanaPage() {
  return <KanaIndex />;
}
