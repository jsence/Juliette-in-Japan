import type { Metadata } from "next";

import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Working in Japan",
  description:
    "Notes on workplace hierarchy, meeting etiquette, business keigo, the hiring process, visa types, and breakdowns of real job postings.",
};

export default function WorkPage() {
  return (
    <PostList
      collection="work"
      title="Working in Japan"
      glyph="働"
      intro={
        <p>
          The professional side: hierarchy, meeting etiquette, business{" "}
          <span className="font-jp">keigo</span>, the hiring process, visa types, and breakdowns of
          real job postings I analyse. Written as I learn it — corrections welcome.
        </p>
      }
    />
  );
}
