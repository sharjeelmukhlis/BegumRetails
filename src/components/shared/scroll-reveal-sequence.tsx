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
  /** Optional per-item image that transitions synchronously with this item on scroll. */
  media?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

interface ScrollRevealSequenceProps {
  eyebrow: string;
  heading: string;
  items: SequenceItem[];
  /** Optional static fallback image if items do not have individual media. */
  media?: { src: string; alt: string };
  theme?: "emerald" | "ivory";
}

/**
 * Pinned scroll sequence: the section pins to the viewport and each item
 * (and its corresponding image) is revealed one at a time as the user scrolls
 * (GSAP ScrollTrigger scrub).
 * Used by The Craft (The Mughal Archive techniques) and Brand Story (values).
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

  const hasItemMedia = items.some((item) => Boolean(item.media));
  const hasAnyMedia = hasItemMedia || Boolean(media);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || items.length < 2) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-seq-panel]");
      const counters = gsap.utils.toArray<HTMLElement>("[data-seq-counter]");
      const mediaPanels = gsap.utils.toArray<HTMLElement>("[data-seq-media]");

      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(counters, { autoAlpha: 0.35 });
      gsap.set(counters[0], { autoAlpha: 1 });

      if (mediaPanels.length > 0) {
        gsap.set(mediaPanels, { autoAlpha: 0, scale: 1.05, zIndex: 1 });
        gsap.set(mediaPanels[0], { autoAlpha: 1, scale: 1, zIndex: 10 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${items.length * 100}%`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        // Text transition out / in
        tl.to(panels[i - 1], { autoAlpha: 0, y: -28, duration: 0.4, ease: "power2.in" }, i)
          .to(counters[i - 1], { autoAlpha: 0.35, duration: 0.2 }, i)
          .fromTo(
            panel,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            i + 0.3
          )
          .to(counters[i], { autoAlpha: 1, duration: 0.2 }, i + 0.3);

        // Synchronous Image transition out / in with distinct scale and z-index elevation
        if (mediaPanels.length > i) {
          tl.to(
            mediaPanels[i - 1],
            { autoAlpha: 0, scale: 0.96, duration: 0.45, ease: "power2.inOut" },
            i
          ).fromTo(
            mediaPanels[i],
            { autoAlpha: 0, scale: 1.08, zIndex: 10 + i },
            { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out", zIndex: 10 + i },
            i + 0.25
          );
        }
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
          <div className="mt-12 space-y-16">
            {items.map((item) => (
              <div key={item.id} className="grid md:grid-cols-12 gap-8 items-center border-b border-sand-300/20 pb-12">
                <div className="md:col-span-7">
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
                {item.media && (
                  <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden border border-sand-300/30">
                    <Image src={item.media.src} alt={item.media.alt} fill className="object-cover" sizes="40vw" />
                  </div>
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
      <div className="flex min-h-screen flex-col justify-center py-16 sm:py-20">
        <Container>
          {/* Header Row */}
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

          {/* Dual Column: Text & Synchronous Images */}
          <div className={cn("mt-10 grid gap-8 lg:gap-12 items-center", hasAnyMedia ? "lg:grid-cols-12" : "")}>
            {/* Left Column: Changing Text Statements */}
            <div className={cn("relative min-h-[300px] sm:min-h-[340px] lg:h-[48vh] order-2 lg:order-1", hasAnyMedia ? "lg:col-span-7" : "max-w-4xl")}>
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

            {/* Right Column: Synchronously Changing Image Panels */}
            {hasAnyMedia && (
              <div className="w-full lg:col-span-5 order-1 lg:order-2">
                <div
                  className={cn(
                    "relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[36vh] sm:max-h-[44vh] lg:max-h-[52vh] w-full overflow-hidden border shadow-2xl",
                    dark ? "border-sand-300/25 bg-emerald-900/40" : "border-sand-300/50 bg-sand-100"
                  )}
                >
                  {hasItemMedia ? (
                    items.map((item, i) =>
                      item.media ? (
                        <div
                          key={item.id}
                          data-seq-media
                          className="absolute inset-0 overflow-hidden"
                          style={{ zIndex: i === 0 ? 10 : 1 }}
                        >
                          <Image
                            src={item.media.src}
                            alt={item.media.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            priority={i === 0}
                          />
                          <div
                            className={cn(
                              "absolute inset-0",
                              dark
                                ? "bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent"
                                : "bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent"
                            )}
                          />
                          {/* Provenance badge over the changing image */}
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-sand-100">
                            <div>
                              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-sand-300 block">
                                {item.kicker || eyebrow}
                              </span>
                              <span className="font-serif text-xs sm:text-sm font-semibold text-ivory">
                                {item.title}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-sand-200/90 text-emerald-950 text-[9px] font-mono uppercase font-bold tracking-wider">
                              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      ) : null
                    )
                  ) : (
                    media && (
                      <div className="relative h-full w-full">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          className="object-cover"
                          sizes="40vw"
                        />
                        <div
                          className={cn(
                            "absolute inset-0",
                            dark ? "bg-emerald-950/25" : "bg-emerald-950/10"
                          )}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
