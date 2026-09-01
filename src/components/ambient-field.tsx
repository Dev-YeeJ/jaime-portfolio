"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

/**
 * Ambient texture behind the hero and the contact section.
 *
 * A fine engineering dot grid — a nod to the network diagrams behind two IT
 * Olympics runs — masked to fade out at the edges, with two slow blue washes
 * drifting over it. Painted entirely with transforms and opacity, so it stays
 * on the compositor.
 *
 * The pointer parallax is a few pixels at most, is only wired up for a fine
 * pointer, and is skipped under reduced motion (where the CSS drift also stops).
 */
export function AmbientField({ className }: { className?: string }) {
  const [parallax, setParallax] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setParallax(finePointer.matches && !reduced.matches);

    sync();
    finePointer.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!parallax) return;

    const onMove = (event: MouseEvent) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * 2;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 2;
      x.set(offsetX * 9);
      y.set(offsetY * 9);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, x, y]);

  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
        <div className="dot-field absolute -inset-16" />
      </motion.div>

      <div className="wash-a absolute -left-[15%] top-[-25%] h-[70vh] w-[70vh] rounded-full blur-3xl" />
      <div className="wash-b absolute -right-[10%] top-[15%] hidden h-[60vh] w-[60vh] rounded-full blur-3xl sm:block" />
    </div>
  );
}
