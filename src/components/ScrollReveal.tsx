"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger index — small delay per element for a gentle cascade. */
  index?: number;
  className?: string;
  /** Render as a different element (defaults to div). */
  as?: "div" | "section" | "li" | "article";
}

/**
 * Restrained scroll-reveal: a soft fade + short upward drift, once.
 * Respects prefers-reduced-motion by settling straight to the visible state.
 *
 * The motion element is rendered in both cases on purpose. Swapping it for a
 * plain tag once `useReducedMotion` resolves leaves Framer Motion's imperative
 * inline `opacity: 0` on the hydrated node, which hides the section for good.
 */
export function ScrollReveal({
  children,
  index = 0,
  className,
  as = "div",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut", delay: Math.min(index * 0.06, 0.4) }
      }
    >
      {children}
    </MotionTag>
  );
}
