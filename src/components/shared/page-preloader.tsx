"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Cinematic page preloader with curtain-wipe reveal.
 * Shows brand name, fades out, then lifts the emerald curtain.
 */
export function PagePreloader() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }

    // Phase 1: Show brand text for ~1.2s
    const t1 = setTimeout(() => setPhase("revealing"), 1200);
    // Phase 2: Curtain lifts over ~0.9s, then remove
    const t2 = setTimeout(() => setPhase("done"), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [prefersReducedMotion]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Curtain background */}
      <div
        className="absolute inset-0 bg-emerald-950 origin-top"
        style={{
          transform: phase === "revealing" ? "scaleY(0)" : "scaleY(1)",
          transition: "transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      />

      {/* Brand text */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: phase === "revealing" ? 0 : 1,
          transform: phase === "revealing" ? "translateY(-30px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.5s ease",
        }}
      >
        <p className="font-display text-sand-200/90 text-[clamp(2.5rem,8vw,5rem)] tracking-tight leading-none">
          Begum
        </p>
        <div
          className="h-px w-20 bg-sand-400/70 mx-auto mt-4 origin-left"
          style={{
            transform: phase === "loading" ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.3s ease",
          }}
        />
        <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-sand-300/60 font-light">
          Bridal Atelier · Lahore
        </p>
      </div>
    </div>
  );
}
