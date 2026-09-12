import type { WorkAudienceRegister } from "@/types/work";
import { REGISTER_META } from "@/lib/work/register-meta";

interface RegisterTagProps {
  register: WorkAudienceRegister;
  className?: string;
}

export function RegisterTag({ register, className = "" }: RegisterTagProps) {
  const meta = REGISTER_META[register];
  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.tagClass} ${className}`}
    >
      {meta.short}
    </span>
  );
}

/** Sticky legend for keigo and phrase-heavy pages. */
export function RegisterLegend({ className = "" }: { className?: string }) {
  const keys: WorkAudienceRegister[] = ["internal-peer", "internal-senior", "client"];
  return (
    <div
      className={`sticky top-16 z-10 flex flex-wrap items-center gap-2 rounded-lg border border-paper-300 bg-paper-50/95 px-3 py-2 text-xs shadow-sm backdrop-blur-sm dark:border-sumi-border dark:bg-sumi/95 ${className}`}
      aria-label="Register legend"
    >
      <span className="font-semibold text-ink-muted dark:text-paper-300">Register:</span>
      {keys.map((key) => (
        <span key={key} className="flex items-center gap-1.5 text-ink-light dark:text-paper-200">
          <RegisterTag register={key} />
          <span className="hidden sm:inline">{REGISTER_META[key].audience}</span>
        </span>
      ))}
    </div>
  );
}

export function audienceForTable(register: WorkAudienceRegister): string {
  return REGISTER_META[register].audience;
}
