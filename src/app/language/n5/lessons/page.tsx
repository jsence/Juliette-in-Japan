import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { N5SubNav } from "@/components/N5SubNav";
import { LessonList } from "@/components/LessonList";
import { lessons } from "@/lib/data";

export const metadata: Metadata = {
  title: "N5 lessons",
  description:
    "A guided path of numbered N5 lessons, each bundling a few grammar points with its vocabulary and kanji, ending in a drill.",
};

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <N5SubNav />
      <PageHeader
        title="Lessons"
        glyph="課"
        intro={
          <p>
            A guided path through N5. Each numbered lesson bundles a few grammar points with the
            vocabulary and kanji that go with them, and ends in a short drill. Work through them in
            order — your progress is saved in your browser.
          </p>
        }
      />
      <LessonList lessons={lessons} />
    </div>
  );
}
