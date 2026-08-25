import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { N5SubNav } from "@/components/N5SubNav";
import { ReviewDeck } from "@/components/ReviewDeck";

export const metadata: Metadata = {
  title: "Review",
  description: "Flashcards with a simple spaced-repetition system, saved locally in your browser.",
};

export default function ReviewPage() {
  return (
    <div className="space-y-8">
      <N5SubNav />
      <PageHeader
        title="Review"
        glyph="復"
        intro={
          <p>
            Flashcards built from the kanji, vocabulary and grammar data, scheduled with an{" "}
            <strong>SM-2 spaced-repetition</strong> algorithm. Pick a study mode — recognition,
            recall, kanji reading or cloze — choose a deck by category, tag or what&apos;s due
            today, and grade yourself. Intervals, your streak and starred cards are saved in your
            browser&apos;s local storage; nothing is sent anywhere.
          </p>
        }
      />
      <ReviewDeck />
    </div>
  );
}
