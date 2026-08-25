"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { nav, site } from "@/lib/site";
import { glassNav } from "@/lib/ui";
import { Hanko } from "./Hanko";

/** Top navigation bar with active-route highlighting and a mobile menu. */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={"sticky top-0 z-40 " + glassNav}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2">
          <Hanko size="sm">日</Hanko>
          <span className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            {site.name}
          </span>
        </Link>

        <button
          type="button"
          className="rounded-md border border-white/40 bg-white/40 p-2 text-ink backdrop-blur md:hidden dark:border-white/10 dark:bg-black/20 dark:text-paper-100"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  "rounded-md px-3 py-2 text-sm font-medium transition " +
                  (isActive(item.href)
                    ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                    : "text-ink-light hover:bg-white/50 dark:text-paper-200 dark:hover:bg-white/10")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <ul id="primary-menu" className="border-t border-white/40 bg-white/50 px-4 py-2 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-black/30">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium " +
                  (isActive(item.href)
                    ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                    : "text-ink-light dark:text-paper-200")
                }
              >
                {item.glyph && <span className="font-jp text-ink-muted">{item.glyph}</span>}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
