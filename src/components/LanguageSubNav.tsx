"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageNav } from "@/lib/site";

/** Secondary navigation shown across the Language sub-pages. */
export function LanguageSubNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Language sections" className="mb-8 flex flex-wrap gap-2">
      {languageNav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              "rounded-full px-3 py-1.5 text-sm font-medium transition " +
              (active
                ? "bg-hanko text-paper-50"
                : "border border-white/50 bg-white/30 text-ink-light backdrop-blur hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:text-paper-200 dark:hover:bg-white/10")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
