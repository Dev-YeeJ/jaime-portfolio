"use client";

import dynamic from "next/dynamic";

/*
  lottie-web reaches for `document` as soon as it draws, so the player is
  loaded on the client only. That also keeps the engine out of the initial
  bundle — nothing downloads it until a card carrying an animation renders.
*/
const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800/50">
      <span className="text-xs text-muted">Loading animation…</span>
    </div>
  ),
});

export function LottiePlayer({ src }: { src: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <Lottie
        src={src}
        loop
        autoplay
        className="h-full w-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
}
