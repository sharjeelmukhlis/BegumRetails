"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function HomeParallaxController() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-parallax-section]").forEach((section) => {
        const layer1 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-1']");
        const layer2 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-2']");
        const layer3 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-3']");
        const cards = section.querySelectorAll<HTMLElement>("[data-parallax='card']");

        if (layer1.length) {
          gsap.to(layer1, {
            y: -16,
            rotateX: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        if (layer2.length) {
          gsap.to(layer2, {
            y: -28,
            rotateX: 1.2,
            scale: 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.35,
            },
          });
        }

        if (layer3.length) {
          gsap.to(layer3, {
            y: -40,
            rotateX: 1.6,
            scale: 1.015,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.55,
            },
          });
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 18, opacity: 1 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return null;
}
