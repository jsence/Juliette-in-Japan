"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

import { site } from "@/lib/site";

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Hero — single left-aligned column on the page background. */
export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  const enter = reduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative -mx-4 min-h-[85dvh] overflow-hidden border-b border-ink/10 dark:border-paper-300/10"
    >
      {/* Background — full bleed within the main column */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] via-paper-50 to-paper-200 dark:from-sumi-light dark:via-sumi dark:to-[#141210]" />
        <div className="paper-grain absolute inset-0 opacity-25" />

        {/* Seigaiha — thin bottom band, fades upward */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[120px] text-ai opacity-[0.07] [mask-image:linear-gradient(to_top,black_30%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent_100%)] dark:opacity-[0.05]"
          style={reduceMotion ? undefined : { y: patternY }}
        >
          <svg className="h-full w-full" preserveAspectRatio="xMidYMax slice">
            <defs>
              <pattern id="hero-seigaiha-band" width="56" height="28" patternUnits="userSpaceOnUse">
                <path
                  d="M0 28 C14 10 28 10 42 28 S70 46 84 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M-28 28 C-14 10 0 10 14 28 S42 46 56 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-seigaiha-band)" />
          </svg>
        </motion.div>

        {/* Far-right margin watermark */}
        <p
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 select-none font-jp text-[clamp(5rem,14vw,9rem)] leading-none tracking-tight text-ai opacity-[0.04] [writing-mode:vertical-rl] sm:block dark:text-ai-light dark:opacity-[0.03]"
          lang="ja"
        >
          日本
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85dvh] max-w-5xl flex-col justify-center px-4 py-14">
        <div className="flex items-stretch gap-5 sm:gap-7">
          <aside className="hidden shrink-0 sm:flex sm:items-center" aria-hidden="true">
            <p
              className="border-l border-ai/35 pl-4 font-jp text-[0.8125rem] leading-relaxed tracking-[0.42em] text-ai-muted [writing-mode:vertical-rl] dark:border-ai-light/25 dark:text-ai-light/70"
              lang="ja"
            >
              日本語・文化・仕事
            </p>
          </aside>

          <motion.div
            {...enter}
            variants={staggerContainer}
            className="min-w-0 flex-1"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-3">
              <span className="h-px w-10 shrink-0 bg-ai/50 dark:bg-ai-light/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-ai dark:text-ai-light">
                Documentation
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="mt-7 font-serif text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em] lg:whitespace-nowrap"
            >
              <span className="text-ink dark:text-paper-100">Juliette in </span>
              <span className="text-hanko dark:text-hanko-light">Japan</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-lg text-base leading-relaxed text-ink-light dark:text-paper-200 sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-8">
              <Link
                href="/language"
                className="group inline-flex items-center gap-2.5 rounded-md bg-hanko px-7 py-3 text-base font-medium text-paper-50 shadow-glass transition duration-300 hover:-translate-y-0.5 hover:bg-hanko-dark hover:shadow-[0_4px_6px_rgba(43,38,32,0.08),0_16px_32px_-12px_rgba(43,38,32,0.35)] dark:hover:shadow-glass-dark"
              >
                Start with N5
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#inside-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.78, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-ai-muted transition hover:text-ai dark:text-ai-light/70 dark:hover:text-ai-light"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
          <motion.span
            aria-hidden="true"
            className="inline-block text-lg leading-none"
            animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
