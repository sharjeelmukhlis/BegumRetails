"use client";

import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/shared/logo";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { homeMedia } from "@/lib/data/home-media";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const frontOrnamentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(mediaRef.current, { clearProps: "all" });
      gsap.set(contentRef.current, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        mediaRef.current,
        { scale: 1.08, opacity: 0.58 },
        { scale: 1, opacity: 1, duration: 1.25 }
      )
        .fromTo(
          brandRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.75"
        )
        .fromTo(
          headlineRef.current,
          { y: 48, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          sublineRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.4"
        )
        .fromTo(
          metaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          ctaRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          badgeRef.current,
          { y: 26, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75 },
          "-=0.45"
        );

      gsap.to(mediaRef.current, {
        y: 52,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      gsap.to(contentRef.current, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
        },
      });

      gsap.to(glowRef.current, {
        y: 34,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.to(frontOrnamentRef.current, {
        y: -22,
        rotation: -3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="parallax-scene relative min-h-screen overflow-hidden bg-emerald-950" data-parallax-section>
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src={homeMedia.heroStill.src}
          alt={homeMedia.heroStill.alt}
          fill
          className="object-cover object-[center_34%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-950/52 to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/88 via-emerald-950/20 to-transparent" />
      </div>

      <div
        ref={glowRef}
        data-parallax="layer-2"
        className="pointer-events-none absolute inset-0 z-10 opacity-90"
        style={{ background: "radial-gradient(ellipse 52% 46% at 62% 34%, rgba(233,202,159,0.18), transparent 65%)" }}
      />

      <div className="relative z-30 flex min-h-screen items-center px-8 md:px-16 lg:px-24">
        <div ref={contentRef} data-parallax="layer-1" className="mx-auto w-full max-w-6xl pt-20 md:pt-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="max-w-3xl border-l border-sand-300/35 bg-emerald-950/20 backdrop-blur-[2px] pl-5 md:pl-7 py-2">
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-sand-100/80 font-light uppercase">
                Pakistani Bridal Couture
              </p>
              <p
                ref={brandRef}
                className="mt-4 flex items-center gap-3 md:gap-4"
              >
                <BrandMark
                  size={72}
                  theme="on-dark"
                  className="h-[clamp(2.2rem,7vw,4.5rem)] w-auto opacity-95"
                  alt=""
                />
                <span className="font-display text-sand-200/90 text-[clamp(2.4rem,10vw,7.2rem)] leading-[0.8] tracking-tight">
                  Begum
                </span>
              </p>
              <h1
                ref={headlineRef}
                className="mt-3 font-display text-ivory text-[clamp(2.3rem,6.4vw,4.8rem)] leading-[0.9] tracking-tight max-w-[13ch]"
              >
                Every bride, a Begum
              </h1>
              <p
                ref={sublineRef}
                className="mt-4 max-w-2xl text-sm md:text-lg text-sand-100/85 leading-relaxed"
              >
                Handcrafted bridal lehengas, zardozi, and bespoke silhouettes by master karigars in Lahore.
              </p>
            </div>
            <div ref={metaRef} className="mt-6 flex flex-wrap items-center gap-3 md:gap-4 text-[10px] md:text-xs uppercase tracking-[0.22em] text-sand-200/70">
              <span>Hand Embroidery</span>
              <span className="h-px w-6 bg-sand-300/40" />
              <span>Bespoke Fit</span>
              <span className="h-px w-6 bg-sand-300/40" />
              <span>Worldwide Delivery</span>
            </div>
            <div ref={ctaRef} className="mt-9 flex items-center">
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-ivory text-emerald-900 px-7 md:px-9 py-3.5 md:py-4 text-[11px] md:text-xs tracking-[0.28em] uppercase transition-colors duration-500 hover:bg-sand-100"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-100/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span>Explore the Collection</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>
            </div>
            <div className="mt-10 hidden md:flex items-center gap-2 text-ivory/55">
              <span className="h-px w-16 bg-gradient-to-r from-transparent via-sand-300/70 to-sand-300/20" />
              <span className="text-[10px] uppercase tracking-[0.22em]">Scroll</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent via-sand-300/70 to-sand-300/20" />
            </div>
          </div>

          <div ref={badgeRef} className="hidden lg:block lg:col-span-4 justify-self-end w-full max-w-[300px] border border-sand-200/25 bg-emerald-950/35 backdrop-blur-sm p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-sand-200/75">Bridal Edit</p>
            <p className="font-display text-3xl text-ivory mt-2">2026</p>
            <p className="text-xs text-sand-100/70 leading-relaxed mt-2">
              Signature silhouettes, heritage embroidery, and custom fit crafted for your wedding story.
            </p>
            <div className="mt-4 pt-4 border-t border-sand-300/20 text-[10px] uppercase tracking-[0.2em] text-sand-200/70 flex items-center justify-between">
              <span>Since 1994</span>
              <span>Atelier Lahore</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.16em] text-sand-200/70">
              <span className="border border-sand-300/20 px-2 py-2 text-center">Zardozi</span>
              <span className="border border-sand-300/20 px-2 py-2 text-center">Dabka</span>
              <span className="border border-sand-300/20 px-2 py-2 text-center">Resham</span>
              <span className="border border-sand-300/20 px-2 py-2 text-center">Bespoke</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={frontOrnamentRef}
        data-parallax="layer-3"
        className="pointer-events-none absolute right-8 md:right-16 bottom-12 md:bottom-16 z-20 hidden md:block"
      >
        <div className="w-40 h-40 rounded-full border border-sand-300/40" />
        <div className="absolute inset-5 rounded-full border border-sand-300/30" />
        <div className="absolute inset-10 rounded-full border border-sand-300/20" />
      </div>
    </section>
  );
}
