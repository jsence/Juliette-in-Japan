import type { Metadata } from "next";

import { SectionIndex } from "@/components/SectionIndex";
import { getSection } from "@/lib/site";

export const metadata: Metadata = {
  title: "Culture",
  description: "History, beliefs, seasonal customs and the arts that shape everyday life in Japan.",
};

const section = getSection("culture")!;

export default function CulturePage() {
  return (
    <SectionIndex
      section={section}
      intro={
        <p>
          Notes on Japanese history, spiritual traditions, seasonal customs and the arts. Each
          sub-section covers a distinct topic rather than aiming to be exhaustive.
        </p>
      }
    />
  );
}
