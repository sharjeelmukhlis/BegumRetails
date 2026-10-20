"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Vertical offset the element travels from, in px. */
  y?: number;
  delay?: number;
  as?: "div" | "section" | "article" | "figure";
}

/**
 * Fades and lifts content in when it enters the viewport.
 * Content is server-rendered visible; the animation only runs on the client,
 * so nothing is ever stuck invisible if JS or motion is unavailable.
 */
export function Reveal({
  children,
  className,
  id,
  y = 26,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [prefersReducedMotion, y, delay]);

  return (
    <Tag ref={ref as React.Ref<never>} id={id} className={className}>
      {children}
    </Tag>
  );
}
