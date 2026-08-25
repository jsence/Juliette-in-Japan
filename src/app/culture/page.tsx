import type { Metadata } from "next";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Culture",
  description: "Short, dated notes on history, traditions, regions and food — what I learned this week.",
};

export default function CulturePage() {
  return (
    <PostList
      collection="culture"
      title="Culture"
      glyph="文"
      intro={
        <p>
          Short, dated notes on history, traditions, regions and food. These are
          &ldquo;what I learned this week&rdquo; entries — not an encyclopedia, and not exhaustive.
        </p>
      }
    />
  );
}
