import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Arts",
  description: "Literature, visual arts, crafts and performance traditions in Japan.",
};

export default function ArtsPage() {
  return (
    <StubPage
      title="Arts"
      glyph="芸"
      sectionHref="/culture"
      sectionLabel="Culture"
      intro={
        <p>
          An introduction to Japanese literature, visual arts, crafts and performance — from
          classical forms to contemporary practice.
        </p>
      }
    />
  );
}
