import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Hierarchy",
  description: "Rank, seniority and how authority works in Japanese organisations.",
};

export default function HierarchyPage() {
  return (
    <StubPage
      title="Hierarchy"
      glyph="位"
      sectionHref="/work"
      sectionLabel="Work"
      intro={
        <p>
          How rank and seniority shape decision-making, seating order, language choice and daily
          interaction in Japanese workplaces.
        </p>
      }
    />
  );
}
