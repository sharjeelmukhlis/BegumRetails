"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Award-level parallax controller with deep multi-layer scroll effects,
 * cinematic scale, rotation, and opacity transitions between sections.
 */
export function HomeParallaxController() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Per-section parallax layers ──────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-parallax-section]").forEach((section) => {
        const layer1 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-1']");
        const layer2 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-2']");
        const layer3 = section.querySelectorAll<HTMLElement>("[data-parallax='layer-3']");
        const cards = section.querySelectorAll<HTMLElement>("[data-parallax='card']");

        if (layer1.length) {
          gsap.to(layer1, {
            y: -24,
            rotateX: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        }

        if (layer2.length) {
          gsap.to(layer2, {
            y: -40,
            rotateX: 1.0,
            scale: 1.012,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          });
        }

        if (layer3.length) {
          gsap.to(layer3, {
            y: -56,
            rotateX: 1.4,
            scale: 1.018,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        }

        // ── Staggered card entrance with vertical + opacity ──
        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 60, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
              },
            }
          );
        }
      });

      // ── Section heading reveals (cinematic word-by-word) ────────
      document.querySelectorAll<HTMLElement>("[data-text-reveal]").forEach((el) => {
        const text = el.textContent || "";
        const words = text.split(/\s+/);
        el.innerHTML = words
          .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`)
          .join(" ");

        const innerSpans = el.querySelectorAll<HTMLElement>("span > span");
        gsap.to(innerSpans, {
          y: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        });
      });

      // ── Horizontal line reveals ─────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-line-reveal]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
            },
          }
        );
      });

      // ── Image scale-in reveal ───────────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-img-reveal]").forEach((wrapper) => {
        const img = wrapper.querySelector("img, [data-nimg]");
        if (!img) return;

        gsap.fromTo(
          wrapper,
          { clipPath: "inset(12% 12% 12% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
            },
          }
        );
      });

      // ── Sections fade+slide up on scroll ────────────────────────
      document.querySelectorAll<HTMLElement>("[data-section-reveal]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return null;
}
