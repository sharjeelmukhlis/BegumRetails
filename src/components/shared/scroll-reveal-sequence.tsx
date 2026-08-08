"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface SequenceItem {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  meta?: string;
}

interface ScrollRevealSequenceProps {
  eyebrow: string;
  heading: string;
  items: SequenceItem[];
  /** Optional persistent image shown beside the changing statements. */
  media?: { src: string; alt: string };
  theme?: "emerald" | "ivory";
}

/**
 * Pinned scroll sequence: the section pins to the viewport and each item
 * is revealed one at a time as the user scrolls (GSAP ScrollTrigger scrub).
 * Used by Brand Story (values) and The Craft (techniques).
 * Falls back to a static stacked layout for reduced-motion users.
 */
export function ScrollRevealSequence({
  eyebrow,
  heading,
  items,
  media,
  theme = "emerald",
}: ScrollRevealSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const dark = theme === "emerald";

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || items.length < 2) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-seq-panel]");
      const counters = gsap.utils.toArray<HTMLElement>("[data-seq-counter]");

      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(counters, { autoAlpha: 0.35 });
      gsap.set(counters[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${items.length * 85}%`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.4, ease: "power2.in" }, i)
          .to(counters[i - 1], { autoAlpha: 0.35, duration: 0.2 }, i)
          .fromTo(
            panel,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            i + 0.3
          )
          .to(counters[i], { autoAlpha: 1, duration: 0.2 }, i + 0.3);
      });
      // Hold the last item on screen briefly before unpinning.
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, items.length]);

  const surface = dark ? "bg-emerald-950 text-ivory" : "bg-ivory text-charcoal";
  const eyebrowColor = dark ? "text-sand-300/90" : "text-sand-700";
  const kickerColor = dark ? "text-sand-200/70" : "text-sand-700";
  const titleColor = dark ? "text-ivory" : "text-emerald-900";
  const bodyColor = dark ? "text-sand-100/80" : "text-charcoal/78";
  const metaColor = dark ? "text-sand-300/80" : "text-emerald-800";
  const ruleColor = dark ? "bg-sand-300/30" : "bg-sand-400/50";

  // Static, fully-visible fallback for reduced motion.
  if (prefersReducedMotion) {
    return (
      <section className={cn("py-24", surface)}>
        <Container>
          <p className={cn("text-xs uppercase tracking-[0.25em] font-medium", eyebrowColor)}>{eyebrow}</p>
          <h2 className={cn("font-display text-[clamp(1.9rem,4vw,3.4rem)] mt-3 leading-[0.95]", titleColor)}>
            {heading}
          </h2>
          <div className="mt-12 space-y-12">
            {items.map((item) => (
              <div key={item.id} className="max-w-3xl">
                {item.kicker && (
                  <p className={cn("text-[10px] uppercase tracking-[0.24em]", kickerColor)}>{item.kicker}</p>
                )}
                <h3 className={cn("font-display text-3xl md:text-4xl mt-2 leading-tight", titleColor)}>
                  {item.title}
                </h3>
                {item.body && <p className={cn("mt-3 leading-relaxed", bodyColor)}>{item.body}</p>}
                {item.meta && (
                  <p className={cn("mt-3 text-xs uppercase tracking-[0.2em]", metaColor)}>{item.meta}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={cn("relative min-h-screen overflow-hidden", surface)}>
      <div className="flex min-h-screen flex-col justify-center py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className={cn("text-xs uppercase tracking-[0.25em] font-medium", eyebrowColor)}>{eyebrow}</p>
              <h2 className={cn("font-display text-[clamp(1.7rem,3.4vw,2.9rem)] mt-2 leading-[0.95] max-w-[24ch]", titleColor)}>
                {heading}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3" aria-hidden>
              {items.map((item, i) => (
                <span
                  key={item.id}
                  data-seq-counter
                  className={cn("font-display text-sm tabular-nums", dark ? "text-sand-200" : "text-emerald-900")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>

          <div className={cn("mt-8 h-px w-full", ruleColor)} />

          <div className={cn("mt-10 grid gap-10 items-center", media ? "lg:grid-cols-12" : "")}>
            <div className={cn("relative h-[46vh] min-h-[300px]", media ? "lg:col-span-7" : "max-w-4xl")}>
              {items.map((item) => (
                <div key={item.id} data-seq-panel className="absolute inset-0 flex flex-col justify-center">
                  {item.kicker && (
                    <p className={cn("text-[11px] uppercase tracking-[0.26em]", kickerColor)}>{item.kicker}</p>
                  )}
                  <h3 className={cn("font-display text-[clamp(2rem,5vw,4.4rem)] mt-3 leading-[0.92] max-w-[16ch]", titleColor)}>
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className={cn("mt-5 text-sm md:text-lg leading-relaxed max-w-[52ch]", bodyColor)}>
                      {item.body}
                    </p>
                  )}
                  {item.meta && (
                    <p className={cn("mt-5 text-[11px] md:text-xs uppercase tracking-[0.22em]", metaColor)}>
                      {item.meta}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {media && (
              <div className="hidden lg:block lg:col-span-5">
                <div className={cn("relative aspect-[4/5] max-h-[52vh] overflow-hidden border", dark ? "border-sand-300/25" : "border-sand-300/50")}>
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                  <div className={cn("absolute inset-0", dark ? "bg-emerald-950/25" : "bg-emerald-950/10")} />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
