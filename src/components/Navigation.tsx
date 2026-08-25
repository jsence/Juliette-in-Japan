"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { nav, site } from "@/lib/site";
import { Hanko } from "./Hanko";

/** Top navigation bar with active-route highlighting and a mobile menu. */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-300/70 bg-paper-100/85 backdrop-blur dark:border-sumi-border dark:bg-sumi/85">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2">
          <Hanko size="sm">日</Hanko>
          <span className="font-serif text-lg font-semibold text-ink dark:text-paper-100">
            {site.name}
          </span>
        </Link>

        <button
          type="button"
          className="rounded-md border border-paper-300 p-2 text-ink md:hidden dark:border-sumi-border dark:text-paper-100"
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
                    : "text-ink-light hover:bg-paper-200 dark:text-paper-200 dark:hover:bg-sumi-light")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <ul id="primary-menu" className="border-t border-paper-300 px-4 py-2 md:hidden dark:border-sumi-border">
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
