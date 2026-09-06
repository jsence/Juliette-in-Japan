"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { languageNav } from "@/lib/site";
import { tab, tabActive, tabBar, tabIdle } from "@/lib/ui";

/** How far the fade at a scrolled edge reaches. */
const FADE = "1.25rem";

/**
 * Secondary navigation across the Language sub-pages, as a single tab bar.
 *
 * The strip never wraps: where it is too wide it scrolls sideways, and the edge
 * it can still scroll towards fades out to signal there is more. The fade is a
 * mask on the tabs rather than a gradient laid over them, so it works over the
 * bar's translucent surface whatever the page background happens to be.
 */
export function LanguageSubNav() {
  const pathname = usePathname();
  const scroller = useRef<HTMLDivElement>(null);
  const activeTab = useRef<HTMLAnchorElement>(null);
  const [hidden, setHidden] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setHidden({ start: el.scrollLeft > 2, end: el.scrollLeft < max - 2 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    // Bring the current page's tab into view when the strip starts scrolled.
    const active = activeTab.current;
    if (active) {
      el.scrollLeft = Math.max(0, active.offsetLeft - (el.clientWidth - active.clientWidth) / 2);
    }

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const stops = [
    hidden.start ? `transparent 0, black ${FADE}` : "black 0",
    hidden.end ? `black calc(100% - ${FADE}), transparent 100%` : "black 100%",
  ].join(", ");
  const mask = `linear-gradient(to right, ${stops})`;

  return (
    <nav aria-label="Language sections" className="mb-8">
      <div className={tabBar}>
        <div
          ref={scroller}
          className="no-scrollbar flex min-w-0 gap-1 overflow-x-auto"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {languageNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                ref={active ? activeTab : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={tab + " " + (active ? tabActive : tabIdle)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
