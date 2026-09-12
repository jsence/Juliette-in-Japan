import type { WorkAudienceRegister } from "@/types/work";

export const REGISTER_META: Record<
  WorkAudienceRegister,
  { short: string; audience: string; tagClass: string }
> = {
  "internal-peer": {
    short: "Internal · peer",
    audience: "Peers, same team, routine internal mail",
    tagClass:
      "border-teal-700/30 bg-teal-50/90 text-teal-900 dark:border-teal-400/25 dark:bg-teal-950/50 dark:text-teal-100",
  },
  "internal-senior": {
    short: "Internal · senior",
    audience: "Manager, other departments, upward requests",
    tagClass:
      "border-amber-800/25 bg-amber-50/90 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/40 dark:text-amber-100",
  },
  client: {
    short: "Client",
    audience: "External clients, vendors, partner companies",
    tagClass:
      "border-hanko/35 bg-paper-50 text-hanko dark:border-hanko-light/40 dark:bg-sumi-light dark:text-hanko-light",
  },
};
