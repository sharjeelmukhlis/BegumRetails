"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { TimelineMilestone } from "@/lib/data/content";

gsap.registerPlugin(ScrollTrigger);

interface JourneyTimelineProps {
  milestones: TimelineMilestone[];
}

/**
 * Vertical scroll-driven timeline: a progress spine draws itself as the user
 * scrolls (scrubbed), and each milestone lifts in as it enters the viewport.
 */
export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Timeline spine */}
      <div className="absolute left-[19px] md:left-1/2 top-2 bottom-2 w-px bg-sand-300/50 md:-translate-x-1/2" aria-hidden>
        <div ref={spineRef} className="h-full w-full bg-emerald-800 origin-top" />
      </div>

      <ol className="space-y-14 md:space-y-20">
        {milestones.map((m, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={m.id} data-milestone className="relative">
              {/* Node */}
              <span
                className="absolute left-[19px] md:left-1/2 top-2 h-3 w-3 -translate-x-1/2 rotate-45 border border-emerald-800 bg-ivory"
                aria-hidden
              />
              <div className="pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-14">
                <div
                  className={`${
                    flip
                      ? "md:order-2 md:pl-14"
                      : "md:order-1 md:pr-14 md:text-right"
                  }`}
                >
                  <p className="font-display text-4xl md:text-5xl text-emerald-900 leading-none">{m.year}</p>
                  <h3 className="text-lg md:text-xl font-semibold text-charcoal mt-3">{m.title}</h3>
                  <p
                    className={`mt-3 text-sm md:text-base text-charcoal/75 leading-relaxed max-w-[52ch] ${
                      flip ? "" : "md:ml-auto"
                    }`}
                  >
                    {m.description}
                  </p>
                </div>

                <div className={`${flip ? "md:order-1 md:pr-14" : "md:order-2 md:pl-14"} mt-5 md:mt-0`}>
                  {m.image && (
                    <div className="relative aspect-[16/10] max-w-md overflow-hidden border border-sand-300/50">
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-emerald-950/10" />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
