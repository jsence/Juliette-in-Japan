import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { LanguageSubNav } from "@/components/LanguageSubNav";
import { ReviewDeck } from "@/components/ReviewDeck";

export const metadata: Metadata = {
  title: "Drills",
  description: "Flashcards with a simple spaced-repetition system, saved locally in your browser.",
};

export default function DrillsPage() {
  return (
    <div className="space-y-8">
      <LanguageSubNav />
      <PageHeader
        title="Drills"
        glyph="練"
        intro={
          <p>
            Flashcards built from the kanji, vocabulary and grammar data, scheduled with an{" "}
            <strong>SM-2 spaced-repetition</strong> algorithm. Choose a study mode — recognition,
            recall, kanji reading or cloze — and a deck by category, tag or what&apos;s due today.
            Card intervals and starred cards are stored in the browser&apos;s local storage; nothing
            is sent anywhere.
          </p>
        }
      />
      <ReviewDeck />
    </div>
  );
}
