"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { workNav } from "@/lib/site";

/** Secondary navigation across Work guide pages (matches N5 tab style). */
export function WorkSubNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Work sections" className="mb-8 flex flex-wrap gap-2">
      {workNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              "rounded-full px-3 py-1.5 text-sm font-medium transition " +
              (active
                ? "bg-hanko text-paper-50"
                : "border border-paper-300 text-ink-light hover:bg-paper-200 dark:border-sumi-border dark:text-paper-200 dark:hover:bg-sumi-light")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
