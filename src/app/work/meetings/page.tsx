import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Meetings",
  description: "How meetings are run in Japanese workplaces, from preparation to follow-up.",
};

export default function MeetingsPage() {
  return (
    <StubPage
      title="Meetings"
      glyph="会"
      sectionHref="/work"
      sectionLabel="Work"
      intro={
        <p>
          Meeting culture in Japan — preparation, consensus-building, the role of silence and how
          decisions are recorded and followed up.
        </p>
      }
    />
  );
}
