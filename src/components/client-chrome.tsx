"use client";

import dynamic from "next/dynamic";

/**
 * The cursor is purely decorative and never needed for first paint, so it is
 * split out of the initial bundle and mounted client-side only.
 */
const Cursor = dynamic(() => import("./cursor").then((m) => m.Cursor), { ssr: false });

export function ClientChrome() {
  return <Cursor />;
}
