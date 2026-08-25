"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { site } from "@/lib/site";

/** Full-viewport hero with layered pattern, parallax and a scroll cue. */
export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden"
    >
      {/* Layered backgrounds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50/80 via-transparent to-paper dark:from-sumi/50 dark:to-sumi" />
        <motion.div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]"
          style={reduceMotion ? undefined : { y: patternY }}
        >
          <svg className="h-full w-full text-hanko" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="seigaiha" width="48" height="24" patternUnits="userSpaceOnUse">
                <path
                  d="M0 24 C12 8 24 8 36 24 S60 40 72 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
                <path
                  d="M-24 24 C-12 8 0 8 12 24 S36 40 48 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#seigaiha)" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute -right-[8%] top-[12%] select-none font-jp text-[min(42vw,22rem)] font-semibold leading-none text-hanko/10 dark:text-hanko-light/10"
          style={reduceMotion ? undefined : { y: kanjiY }}
        >
          日
        </motion.div>
        <div className="paper-grain absolute inset-0 opacity-40" />
      </div>

      <motion.div
        className="relative z-10 grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
        style={reduceMotion ? undefined : { y: contentY }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-ink dark:text-paper-100">
              {site.name}
            </h1>
            <p
              className="font-jp text-lg leading-relaxed tracking-widest text-hanko/80 dark:text-hanko-light/80 sm:[writing-mode:vertical-rl] sm:text-xl"
              lang="ja"
            >
              日本語・文化・仕事
            </p>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-ink-light dark:text-paper-200 sm:text-xl">
            {site.tagline}
          </p>
          <div>
            <Link
              href="/language"
              className="inline-flex rounded-md bg-hanko px-7 py-3 text-base font-medium text-paper-50 shadow-glass transition hover:bg-hanko-dark hover:shadow-glass-dark"
            >
              Start with N5
            </Link>
          </div>
        </div>
      </motion.div>

      <a
        href="#inside-heading"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ink-muted transition hover:text-hanko dark:text-paper-400 dark:hover:text-hanko-light"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          aria-hidden="true"
          className="text-lg leading-none"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </a>
    </section>
  );
}
