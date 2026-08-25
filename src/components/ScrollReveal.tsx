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
 * Respects prefers-reduced-motion by rendering statically.
 */
export function ScrollReveal({
  children,
  index = 0,
  className,
  as = "div",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(index * 0.06, 0.4) }}
    >
      {children}
    </MotionTag>
  );
}
