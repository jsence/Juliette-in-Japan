"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { nav, sections, site } from "@/lib/site";
import { glassNav } from "@/lib/ui";
import { Hanko } from "./Hanko";

/** Top navigation with section dropdowns and a mobile menu. */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const homeItem = nav[0];
  const sectionItems = sections;

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

        <ul className="hidden items-center gap-0.5 md:flex">
          <li>
            <Link
              href={homeItem.href}
              aria-current={isActive(homeItem.href) ? "page" : undefined}
              className={
                "rounded-md px-3 py-2 text-sm font-medium transition " +
                (isActive(homeItem.href)
                  ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                  : "text-ink-light hover:bg-white/50 dark:text-paper-200 dark:hover:bg-white/10")
              }
            >
              {homeItem.label}
            </Link>
          </li>
          {sectionItems.map((section) => (
            <li key={section.href} className="group relative">
              <Link
                href={section.href}
                aria-current={isActive(section.href) ? "page" : undefined}
                className={
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition " +
                  (isActive(section.href)
                    ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                    : "text-ink-light hover:bg-white/50 dark:text-paper-200 dark:hover:bg-white/10")
                }
              >
                {section.label}
                <span className="text-[10px] opacity-60" aria-hidden="true">▾</span>
              </Link>
              <ul
                className={
                  "invisible absolute left-0 top-full z-50 min-w-[12rem] translate-y-1 rounded-lg border border-white/50 bg-white/80 py-1 opacity-0 shadow-glass backdrop-blur-md transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-white/10 dark:bg-sumi/90"
                }
              >
                {section.subPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="block px-4 py-2 text-sm text-ink-light hover:bg-white/60 hover:text-hanko dark:text-paper-200 dark:hover:bg-white/10 dark:hover:text-hanko-light"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div id="primary-menu" className="border-t border-white/40 bg-white/50 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-black/30">
          <ul className="px-4 py-2">
            <li>
              <Link
                href={homeItem.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(homeItem.href) ? "page" : undefined}
                className={
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium " +
                  (isActive(homeItem.href)
                    ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                    : "text-ink-light dark:text-paper-200")
                }
              >
                {homeItem.glyph && <span className="font-jp text-ink-muted">{homeItem.glyph}</span>}
                {homeItem.label}
              </Link>
            </li>
            {sectionItems.map((section) => {
              const sectionOpen = expanded === section.href;
              return (
                <li key={section.href}>
                  <div className="flex items-center">
                    <Link
                      href={section.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(section.href) ? "page" : undefined}
                      className={
                        "flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium " +
                        (isActive(section.href)
                          ? "bg-hanko/10 text-hanko dark:text-hanko-light"
                          : "text-ink-light dark:text-paper-200")
                      }
                    >
                      <span className="font-jp text-ink-muted">{section.glyph}</span>
                      {section.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={sectionOpen}
                      aria-label={`Toggle ${section.label} sub-pages`}
                      className="rounded-md px-2 py-2 text-ink-muted"
                      onClick={() => setExpanded(sectionOpen ? null : section.href)}
                    >
                      {sectionOpen ? "▴" : "▾"}
                    </button>
                  </div>
                  {sectionOpen && (
                    <ul className="ml-6 border-l border-white/40 pl-2 dark:border-white/10">
                      {section.subPages.map((page) => (
                        <li key={page.href}>
                          <Link
                            href={page.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-1.5 text-sm text-ink-muted hover:text-hanko dark:text-paper-300 dark:hover:text-hanko-light"
                          >
                            {page.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
