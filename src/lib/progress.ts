/** Date formatting helpers used across dated content (journal, culture, work). */

/** Format an ISO date as e.g. "6 January 2026" in English. */
export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
