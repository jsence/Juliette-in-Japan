import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Regions",
  description: "Prefectures, cities and regional character across the archipelago.",
};

export default function RegionsPage() {
  return (
    <StubPage
      title="Regions"
      glyph="地"
      sectionHref="/life"
      sectionLabel="Life in Japan"
      intro={
        <p>
          An overview of Japan&apos;s regions and prefectures — how geography, climate and history
          shape local character, dialect and cuisine.
        </p>
      }
    />
  );
}
