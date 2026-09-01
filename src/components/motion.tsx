"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One easing curve and one distance for the entire site. Keeping the motion
 * vocabulary this small is what makes it read as authored rather than applied.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const RISE = 20;

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px to rise from. Ignored under reduced motion. */
  y?: number;
};

/** Fade + rise once, when scrolled into view. */
export function Reveal({ children, className, delay = 0, y = RISE }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Elements the stagger helpers can render as, so list markup stays valid. */
type Tag = "div" | "ul" | "ol" | "li" | "section";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: Tag;
};

/** Parent for grouped reveals — pair with <StaggerItem>. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.07,
  as = "div",
}: StaggerProps) {
  const Component = motion[as];

  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  y = RISE,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}

/**
 * A hairline that draws itself from the left. Used under section headings and
 * across the lane rail, so the same gesture recurs at every scale.
 */
export function RuleWipe({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={className ?? "h-px w-full bg-border"}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
