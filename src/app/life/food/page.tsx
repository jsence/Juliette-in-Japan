import type { Metadata } from "next";

import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Food",
  description: "Cuisine, dining customs and the role of food in daily life in Japan.",
};

export default function FoodPage() {
  return (
    <StubPage
      title="Food"
      glyph="食"
      sectionHref="/life"
      sectionLabel="Life in Japan"
      intro={
        <p>
          Japanese cuisine beyond the stereotypes — everyday meals, dining etiquette, seasonal
          ingredients and how food fits into social life.
        </p>
      }
    />
  );
}
