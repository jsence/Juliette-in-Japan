import type { Metadata } from "next";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Culture & History",
  description: "Dated entries on Japanese traditions, regions, food and history.",
};

export default function CulturePage() {
  return (
    <PostList
      collection="culture"
      title="Culture & History"
      glyph="文"
      intro={
        <p>
          Dated entries on Japanese traditions, regions, food and history. Each entry covers a
          single topic rather than aiming to be exhaustive.
        </p>
      }
    />
  );
}
