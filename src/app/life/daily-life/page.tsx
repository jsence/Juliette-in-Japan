import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Daily life",
  description: "Housing, transport, shopping and social routines in Japan.",
};

export default function DailyLifePage() {
  return (
    <StubPage
      title="Daily life"
      glyph="日"
      sectionHref="/life"
      sectionLabel="Life in Japan"
      intro={
        <p>
          What everyday life looks like — housing types, commuting, convenience-store culture,
          garbage sorting and other routines that shape daily experience.
        </p>
      }
    />
  );
}
