import type { Metadata } from "next";

import { SectionIndex } from "@/components/SectionIndex";
import { getSection } from "@/lib/site";

export const metadata: Metadata = {
  title: "Life in Japan",
  description: "Regions, food and the routines of daily life across the archipelago.",
};

const section = getSection("life")!;

export default function LifePage() {
  return (
    <SectionIndex
      section={section}
      intro={
        <p>
          Practical notes on living in Japan — regional character, food and dining customs, and
          the routines of everyday life from housing to transport.
        </p>
      }
    />
  );
}
