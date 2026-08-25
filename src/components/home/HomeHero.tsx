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

/** Incomplete enso circle — brushstroke visual for the hero right column. */
function HeroEnso({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="120"
        cy="120"
        r="92"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="460 120"
        transform="rotate(-38 120 120)"
      />
    </svg>
  );
}

/** Hero with asymmetric layout, glass text panel and staggered entrance. */
export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const ensoY = useTransform(scrollYProgress, [0, 1], ["-50%", "-32%"]);

  const enter = reduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative left-1/2 min-h-[85dvh] w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-b border-ink/10 dark:border-paper-300/10"
    >
      {/* Layered backgrounds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] via-paper-50 to-paper-200 dark:from-sumi-light dark:via-sumi dark:to-[#141210]" />
        <div className="paper-grain absolute inset-0 opacity-30" />
      </div>

      {/* Seigaiha footer band */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 border-t border-ai/15 text-ai opacity-[0.12] dark:border-ai-light/10 dark:opacity-[0.09]"
        style={reduceMotion ? undefined : { y: patternY }}
        aria-hidden="true"
      >
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
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

      <div className="relative z-10 mx-auto flex min-h-[85dvh] max-w-7xl flex-col justify-center px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(240px,0.75fr)] lg:gap-6 xl:gap-10">
          {/* Left column — rail + glass text panel */}
          <div className="flex items-stretch gap-5 sm:gap-7 lg:gap-8">
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
              className="relative min-w-0 flex-1 rounded-2xl border border-white/40 bg-white/30 p-7 shadow-glass backdrop-blur-md dark:border-white/10 dark:bg-black/25 dark:shadow-glass-dark sm:p-9 lg:p-10"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <span className="h-px w-10 shrink-0 bg-ai/50 dark:bg-ai-light/40" />
                <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-ai dark:text-ai-light">
                  Documentation
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="mt-7 max-w-xl font-serif text-[clamp(2.75rem,6.5vw,5rem)] font-bold leading-[0.88] tracking-[-0.03em]"
              >
                <span className="text-ink dark:text-paper-100">Juliette in </span>
                <span className="relative inline-block text-hanko dark:text-hanko-light">
                  Japan
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-hanko/70 via-hanko/35 to-transparent dark:from-hanko-light/70 dark:via-hanko-light/30"
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-6 max-w-md text-base leading-relaxed text-ink-light dark:text-paper-200 sm:text-lg"
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

          {/* Right column — enso visual */}
          <div className="relative hidden min-h-[16rem] lg:block" aria-hidden="true">
            <motion.div
              className="pointer-events-none absolute right-0 top-1/2 translate-x-[28%] text-ai opacity-[0.07] dark:text-ai-light dark:opacity-[0.06]"
              style={reduceMotion ? { y: "-50%" } : { y: ensoY }}
            >
              <HeroEnso className="h-[min(52vh,28rem)] w-[min(52vh,28rem)]" />
            </motion.div>
          </div>
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
