/** Pages surfaced in the homepage "Latest additions" row, newest first. */
export interface LatestPage {
  href: string;
  title: string;
  /** ISO date string, e.g. "2026-08-24". */
  date: string;
}

/** Curated list — update when substantive page content changes. */
export const latestPages: LatestPage[] = [
  { href: "/language/grammar", title: "Grammar", date: "2026-08-24" },
  { href: "/language/drills", title: "Drills", date: "2026-08-22" },
  { href: "/culture/seasons", title: "Seasons", date: "2026-02-03" },
  { href: "/work/communication-codes", title: "Communication codes", date: "2026-01-15" },
  { href: "/language/kana", title: "Kana", date: "2026-01-10" },
];

export function getLatestPages(limit = 3): LatestPage[] {
  return [...latestPages]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
