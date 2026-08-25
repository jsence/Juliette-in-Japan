import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "History",
  description: "Key periods and events that shape modern Japan.",
};

export default function HistoryPage() {
  return (
    <StubPage
      title="History"
      glyph="史"
      sectionHref="/culture"
      sectionLabel="Culture"
      intro={
        <p>
          An overview of the major periods and turning points in Japanese history — from early
          state formation through the Edo period, Meiji modernisation and the post-war era.
        </p>
      }
    />
  );
}
