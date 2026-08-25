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

/** Hero — full-bleed background, left-aligned content column. */
export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-50%", "-38%"]);

  const enter = reduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative left-1/2 min-h-[85dvh] w-screen max-w-[100vw] -translate-x-1/2"
    >
      {/* Full-bleed overlays — fade to transparent, no panel edges */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50/40 via-transparent to-transparent dark:from-sumi-light/25" />

        {/* Seigaiha — full hero texture, soft mask (faint behind copy, denser at edges) */}
        <motion.div
          className="absolute inset-0 text-ink opacity-[0.09] dark:text-paper-100 dark:opacity-[0.08]"
          style={{
            ...(reduceMotion ? {} : { y: patternY }),
            WebkitMaskImage:
              "radial-gradient(ellipse 115% 95% at 22% 46%, transparent 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.72) 72%, black 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "radial-gradient(ellipse 115% 95% at 22% 46%, transparent 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.72) 72%, black 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskComposite: "intersect",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="hero-seigaiha" width="72" height="36" patternUnits="userSpaceOnUse">
                <path
                  d="M0 36 C18 12 36 12 54 36 S90 60 108 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.85"
                />
                <path
                  d="M-36 36 C-18 12 0 12 18 36 S54 60 72 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.85"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-seigaiha)" />
          </svg>
        </motion.div>
      </div>

      {/* Watermark — right third of viewport, bleeding off the right edge */}
      <motion.p
        className="pointer-events-none absolute right-0 top-1/2 z-[1] hidden select-none font-jp text-[min(72vh,22rem)] font-semibold leading-none tracking-tight text-ink opacity-[0.10] [writing-mode:vertical-rl] sm:block dark:text-paper-100 dark:opacity-[0.08]"
        style={
          reduceMotion
            ? { x: "32%", y: "-50%" }
            : { x: "32%", y: watermarkY }
        }
        lang="ja"
        aria-hidden="true"
      >
        日本
      </motion.p>

      <div className="relative z-10 mx-auto flex min-h-[85dvh] w-full max-w-5xl flex-col justify-center px-4 py-14">
        <div className="flex w-full max-w-xl items-stretch gap-5 sm:max-w-2xl sm:gap-7 lg:max-w-2xl">
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
            className="relative min-w-0 flex-1"
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
