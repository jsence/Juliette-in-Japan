import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Beliefs",
  description: "Shinto, Buddhism and everyday spiritual practice in Japan.",
};

export default function BeliefsPage() {
  return (
    <StubPage
      title="Beliefs"
      glyph="信"
      sectionHref="/culture"
      sectionLabel="Culture"
      intro={
        <p>
          How Shinto and Buddhism coexist in daily life — shrines and temples, festivals, life-cycle
          rituals and the blend of practice and custom that shapes the calendar year.
        </p>
      }
    />
  );
}
