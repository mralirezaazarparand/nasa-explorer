"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

function useLenis() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      if (!document.hidden) {
        rafRef.current = requestAnimationFrame(raf);
      }
    }

    rafRef.current = requestAnimationFrame(raf);

    function handleVisibility() {
      if (!document.hidden && !rafRef.current) {
        rafRef.current = requestAnimationFrame(raf);
      }
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      lenis.destroy();
    };
  }, []);
}

export { useLenis };
