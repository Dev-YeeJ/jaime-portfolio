"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

const noop = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // The resolved theme is unknowable on the server, so the first paint has to be
  // theme-agnostic. Reading "am I hydrated?" as an external store keeps that
  // guard out of an effect, which would otherwise cause a cascading render.
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      // Before mount the resolved theme is unknown, so the label stays neutral
      // rather than claiming a direction it might have to reverse.
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Switch theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "relative grid size-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-accent-tint hover:text-accent",
        className,
      )}
    >
      <Sun
        aria-hidden
        strokeWidth={1.75}
        className={clsx(
          "absolute size-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        aria-hidden
        strokeWidth={1.75}
        className={clsx(
          "absolute size-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
}
