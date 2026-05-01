"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

type LottieAnimationProps = {
  className?: string;
  path: string;
};

export function LottieAnimation({ className, path }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    let cancelled = false;

    async function loadAnimation() {
      const lottie = (await import("lottie-web")).default;

      if (!containerRef.current || cancelled) {
        return;
      }

      animation = lottie.loadAnimation({
        autoplay: true,
        container: containerRef.current,
        loop: true,
        path,
        renderer: "svg",
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: "xMidYMid meet",
        },
      });
    }

    loadAnimation();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, [path]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
