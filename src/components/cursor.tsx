"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";
import { EASE } from "./motion";

const INTERACTIVE = "a, button, [role='button'], select, summary, [data-cursor-hover]";

/** Over these the native I-beam is restored, so the dot gets out of the way. */
const TEXT_FIELD = "input:not([type='button']):not([type='submit']), textarea";

/**
 * A small dot that trails the real pointer, opening into a hairline ring over
 * anything clickable.
 *
 * Only mounts for a fine pointer (never on touch) and never under reduced
 * motion, where a lagging cursor is exactly the kind of thing being opted out
 * of — there, the native cursor is left alone.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overText, setOverText] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 750, damping: 42, mass: 0.32 });
  const springY = useSpring(y, { stiffness: 750, damping: 42, mass: 0.32 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(finePointer.matches && !reduced.matches);

    sync();
    finePointer.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Hide the native cursor only while this one is genuinely active.
    document.documentElement.dataset.cursor = "custom";

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
      setOverText(Boolean(target?.closest?.(TEXT_FIELD)));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className={clsx(
          "-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent transition-colors duration-200",
          hovering ? "bg-transparent" : "bg-accent",
        )}
        animate={{
          width: hovering ? 30 : 8,
          height: hovering ? 30 : 8,
          opacity: visible && !overText ? 1 : 0,
        }}
        initial={{ width: 8, height: 8, opacity: 0 }}
        transition={{ duration: 0.24, ease: EASE }}
      />
    </motion.div>
  );
}
