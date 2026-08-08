"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";

gsap.registerPlugin(ScrollTrigger);

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const circle1 = useRef<HTMLDivElement>(null);
  const circle2 = useRef<HTMLDivElement>(null);
  const circle3 = useRef<HTMLDivElement>(null);
  const circle4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = sectionRef.current?.querySelector(".statement-text");
      if (text) {
        gsap.from(text, {
          y: 120, opacity: 0, scale: 0.92, filter: "blur(4px)", duration: 2, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0, duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
        });
      }
      const sub = sectionRef.current?.querySelector(".statement-sub");
      if (sub) {
        gsap.from(sub, {
          y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power2.out",
          scrollTrigger: { trigger: sub, start: "top 80%" },
        });
      }

      const parallax = (el: HTMLDivElement | null, y: number) => {
        if (!el) return;
        gsap.to(el, { y, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
      };
      parallax(circle1.current, -60);
      parallax(circle2.current, -100);
      parallax(circle3.current, 80);
      parallax(circle4.current, 120);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />

      <div ref={circle1} className="absolute top-20 left-10 w-32 h-32 border border-sand-200/40 rounded-full" />
      <div ref={circle2} className="absolute top-32 left-24 w-16 h-16 border border-sand-200/30 rounded-full" />
      <div ref={circle3} className="absolute bottom-20 right-10 w-40 h-40 border border-sand-200/40 rounded-full" />
      <div ref={circle4} className="absolute bottom-32 right-28 w-20 h-20 border border-sand-200/30 rounded-full" />

      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-sand-400/60 font-medium mb-8">
            The Begum Philosophy
          </p>
          <h2 className="statement-text font-display text-[clamp(2.8rem,7vw,5.5rem)] text-emerald-800 leading-[0.88] tracking-tight text-balance">
            She was always royalty.
            <br />
            <span className="text-sand-500/70">We just help her dress like it.</span>
          </h2>
          <div
            ref={lineRef}
            className="origin-left w-16 h-px bg-sand-400 mx-auto mt-10 mb-8"
          />
          <p className="statement-sub text-charcoal/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Every stitch, every motif, every choice — guided by the same hand that has embroidered bridal dreams for generations in the ateliers of Lahore.
          </p>
        </div>
      </Container>
    </section>
  );
}
