import type { Metadata } from "next";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Journal",
  description: "Dated personal entries: reflections, doubts, mistakes and discoveries.",
};

export default function JournalPage() {
  return (
    <PostList
      collection="journal"
      title="Journal"
      glyph="記"
      intro={
        <p>
          Dated entries — reflections, doubts, mistakes and small discoveries. Kept honest, kept
          in order, so the consistency (or the gaps) are visible.
        </p>
      }
    />
  );
}
