import type { Metadata } from "next";

import { KeigoPageLayout } from "@/components/work/KeigoPageLayout";
import { requireWorkPage } from "@/lib/work";

const SLUG = "keigo";
const page = requireWorkPage(SLUG);

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function WorkKeigoPage() {
  return <KeigoPageLayout page={page} />;
}
