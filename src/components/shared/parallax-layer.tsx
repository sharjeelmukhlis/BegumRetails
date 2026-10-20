"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  as?: "div" | "span" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || speed === 0 || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => (el.offsetHeight * speed * -1) / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: speed * 2,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [speed, prefersReducedMotion]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
