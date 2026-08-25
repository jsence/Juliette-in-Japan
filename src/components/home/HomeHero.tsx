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

/** Hero with layered pattern, parallax and staggered entrance. */
export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], ["-50%", "-26%"]);

  const enter = reduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[85dvh] flex-col justify-center overflow-hidden pb-6"
    >
      {/* Layered backgrounds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50/70 via-transparent to-paper dark:from-sumi/40 dark:to-sumi" />

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[52%] text-hanko opacity-[0.035] dark:opacity-[0.025] [mask-image:linear-gradient(to_top,black_0%,black_22%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_22%,transparent_100%)]"
          style={reduceMotion ? undefined : { y: patternY }}
        >
          <svg className="h-full w-full" preserveAspectRatio="xMidYMax slice">
            <defs>
              <pattern id="hero-seigaiha" width="48" height="24" patternUnits="userSpaceOnUse">
                <path
                  d="M0 24 C12 8 24 8 36 24 S60 40 72 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.65"
                />
                <path
                  d="M-24 24 C-12 8 0 8 12 24 S36 40 48 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.65"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-seigaiha)" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-0 top-1/2 translate-x-[18%] select-none font-jp text-[clamp(18rem,52vw,36rem)] font-semibold leading-none text-hanko opacity-[0.035] dark:text-hanko-light dark:opacity-[0.03]"
          style={reduceMotion ? { y: "-50%" } : { y: kanjiY }}
          aria-hidden="true"
        >
          日
        </motion.div>

        <div className="paper-grain absolute inset-0 opacity-35" />
      </div>

      <div className="relative z-10 flex items-stretch gap-6 py-12 sm:gap-10 lg:gap-14">
        <aside
          className="hidden shrink-0 sm:flex sm:items-center sm:pt-2"
          aria-hidden="true"
        >
          <p
            className="border-l border-hanko/25 pl-4 font-jp text-[0.8125rem] leading-relaxed tracking-[0.42em] text-hanko/65 [writing-mode:vertical-rl] dark:border-hanko-light/20 dark:text-hanko-light/60"
            lang="ja"
          >
            日本語・文化・仕事
          </p>
        </aside>

        <motion.div
          {...enter}
          variants={staggerContainer}
          className="relative flex min-w-0 flex-1 flex-col gap-7 sm:gap-8"
        >
          <div
            className="pointer-events-none absolute -left-6 top-4 h-56 w-[min(100%,28rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(179,53,43,0.14)_0%,rgba(244,236,224,0)_68%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_center,rgba(200,91,80,0.12)_0%,rgba(28,26,23,0)_68%)]"
            aria-hidden="true"
          />

          <motion.div variants={staggerItem} className="relative flex items-center gap-3">
            <span className="h-px w-10 shrink-0 bg-hanko/45 dark:bg-hanko-light/40" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-hanko dark:text-hanko-light">
              Documentation
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="relative max-w-4xl font-serif text-[clamp(2.75rem,7.5vw,5.25rem)] font-bold leading-[0.88] tracking-[-0.03em]"
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
            className="relative max-w-lg text-base leading-relaxed text-ink-light dark:text-paper-200 sm:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div variants={staggerItem}>
            <Link
              href="/language"
              className="inline-flex rounded-md bg-hanko px-7 py-3 text-base font-medium text-paper-50 shadow-glass transition hover:bg-hanko-dark hover:shadow-glass-dark"
            >
              Start with N5
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#inside-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.78, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-ink-muted transition hover:text-hanko dark:text-paper-400 dark:hover:text-hanko-light"
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
    </section>
  );
}
