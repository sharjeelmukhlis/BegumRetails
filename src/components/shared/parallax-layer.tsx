"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    const el = ref.current;
    if (!el || speed === 0) return;
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
  }, [speed]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
