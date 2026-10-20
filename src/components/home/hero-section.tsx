"use client";

import Link from "next/link";
import Image from "next/image";
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
  const eyebrowWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowLineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeChipsRef = useRef<HTMLSpanElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const frontOrnamentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // ── Entrance & Scroll Parallax Timeline ───────────────────────
  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set([mediaRef.current, contentRef.current, badgeRef.current], {
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline — instant, confident, cinematic
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });

      // Background image slow zoom-in & brighten
      tl.fromTo(
        mediaRef.current,
        { scale: 1.14, opacity: 0.2, filter: "brightness(0.7)" },
        { scale: 1.0, opacity: 1, filter: "brightness(1)", duration: 1.9, ease: "power2.out" }
      );

      // Ambient warm radial spotlight
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.9, scale: 1.0, duration: 1.6, ease: "sine.out" },
        "-=1.7"
      );

      // Eyebrow label slide up
      tl.fromTo(
        eyebrowWrapRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=1.5"
      );

      // Gold hairline draw
      tl.fromTo(
        eyebrowLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
        "-=1.2"
      );

      // Brand Title "Begum" masked vertical reveal
      tl.fromTo(
        brandRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=1.2"
      );

      // Headline ("Every bride, a Begum") word-by-word reveal
      if (headlineWordsRef.current.length) {
        tl.fromTo(
          headlineWordsRef.current,
          { yPercent: 120, rotate: 2, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.9"
        );
      }

      // Subtitle fade and slide
      tl.fromTo(
        sublineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Metadata tags
      tl.fromTo(
        metaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // CTA Buttons
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Right Column Bridal Edit Card
      tl.fromTo(
        badgeRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.8"
      );

      // Stagger chips inside right column card
      if (badgeChipsRef.current.length) {
        tl.fromTo(
          badgeChipsRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.5)" },
          "-=0.6"
        );
      }

      // Decorative concentric rings
      tl.fromTo(
        frontOrnamentRef.current,
        { opacity: 0, scale: 0.85, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "power2.out" },
        "-=0.8"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // ── Dedicated, silky Scroll Parallax ──────────────────────
      // Media moves down + zooms slightly for cinematic depth
      gsap.to(mediaRef.current, {
        yPercent: 22,
        scale: 1.08,
        filter: "brightness(0.45)",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content translates upwards and gently fades out
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.15,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "85% top",
          scrub: 0.8,
        },
      });

      // Right badge card moves faster upwards
      gsap.to(badgeRef.current, {
        yPercent: -26,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      // Ornament rings rotate on scroll
      gsap.to(frontOrnamentRef.current, {
        yPercent: -35,
        rotate: 35,
        scale: 0.8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Scroll indicator fades out immediately on first scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "15% top",
          scrub: 0.3,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ── Interactive 3D Mouse Parallax (Tilting & Floating) ─────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const hero = heroRef.current;
    if (!hero) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const animateTilt = () => {
      // Smooth lerp damping
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (mediaRef.current) {
        gsap.set(mediaRef.current, {
          x: -currentX * 22,
          y: -currentY * 22,
        });
      }

      if (badgeRef.current) {
        gsap.set(badgeRef.current, {
          x: currentX * 26,
          y: currentY * 26,
          rotateY: currentX * 12,
          rotateX: -currentY * 12,
          transformPerspective: 1000,
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          x: currentX * 40,
          y: currentY * 40,
        });
      }

      if (frontOrnamentRef.current) {
        gsap.set(frontOrnamentRef.current, {
          x: -currentX * 18,
          y: -currentY * 18,
        });
      }

      rafId = requestAnimationFrame(animateTilt);
    };

    // Only enable on desktop with fine mouse pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches) {
      hero.addEventListener("mousemove", handleMouseMove, { passive: true });
      rafId = requestAnimationFrame(animateTilt);
    }

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const words = ["Every", "bride,", "a", "Begum"];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[105vh] overflow-hidden bg-emerald-950 select-none"
    >
      {/* Background image layer */}
      <div
        ref={mediaRef}
        className="absolute inset-0 will-change-transform transform-gpu pointer-events-none"
      >
        <Image
          src={homeMedia.heroStill.src}
          alt={homeMedia.heroStill.alt}
          fill
          className="object-cover object-[center_34%]"
          priority
          sizes="100vw"
        />
        {/* Layered luxury lighting gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/96 via-emerald-950/65 to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
        {/* Vignette for cinematic editorial focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,13,9,0.7)_100%)]" />
      </div>

      {/* Ambient warm glow that softly tracks cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 55% 48% at 60% 36%, rgba(237,213,176,0.22), transparent 70%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-30 flex min-h-[105vh] items-center px-6 sm:px-8 md:px-16 lg:px-24">
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-6xl pt-24 md:pt-28 pb-20 grid lg:grid-cols-12 gap-10 items-end will-change-transform"
        >
          {/* Main Hero Column */}
          <div className="lg:col-span-8">
            <div className="max-w-3xl border-l-2 border-sand-400/50 bg-emerald-950/30 backdrop-blur-[4px] pl-5 md:pl-8 py-4">
              {/* Eyebrow with gold hairline */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div ref={eyebrowWrapRef} className="will-change-transform">
                  <span className="text-[10px] md:text-xs tracking-[0.45em] text-sand-300/80 font-light uppercase">
                    Pakistani Bridal Couture
                  </span>
                </div>
                <div
                  ref={eyebrowLineRef}
                  className="h-px w-16 bg-gradient-to-r from-sand-400/80 to-transparent origin-left"
                />
              </div>

              {/* Master Brand Typography with Gold Shimmer */}
              <div className="mt-4 overflow-hidden">
                <p
                  ref={brandRef}
                  className="will-change-transform text-[clamp(2.8rem,10vw,7.8rem)] leading-[0.8] tracking-tight font-display"
                >
                  <span className="text-gold-shimmer font-bold drop-shadow-[0_2px_24px_rgba(237,213,176,0.25)]">
                    Begum
                  </span>
                </p>
              </div>

              {/* Headline with word-by-word masked reveal */}
              <h1 className="mt-4 font-display text-ivory text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.92] tracking-tight max-w-[14ch]">
                {words.map((word, idx) => (
                  <span
                    key={word + idx}
                    className="inline-block overflow-hidden mr-[0.3em] last:mr-0 align-top"
                  >
                    <span
                      ref={(el) => {
                        if (el) headlineWordsRef.current[idx] = el;
                      }}
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                ref={sublineRef}
                className="mt-5 max-w-2xl text-sm md:text-lg text-sand-100/85 leading-relaxed font-light will-change-transform"
              >
                Handcrafted bridal lehengas, zardozi, and bespoke silhouettes by master
                karigars in Lahore.
              </p>
            </div>

            {/* Spec metadata tags */}
            <div
              ref={metaRef}
              className="mt-7 flex flex-wrap items-center gap-3 md:gap-5 text-[10px] md:text-xs uppercase tracking-[0.25em] text-sand-200/70 will-change-transform"
            >
              <span className="text-sand-100 font-medium">Hand Embroidery</span>
              <span className="h-px w-8 bg-gradient-to-r from-sand-400/60 to-transparent" />
              <span className="text-sand-100 font-medium">Bespoke Fit</span>
              <span className="h-px w-8 bg-gradient-to-r from-sand-400/60 to-transparent" />
              <span className="text-sand-100 font-medium">Worldwide Delivery</span>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="mt-9 flex flex-wrap items-center gap-4 will-change-transform"
            >
              <Link
                href="/collections"
                className="magnetic-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden bg-ivory text-emerald-950 px-8 md:px-10 py-4 text-[11px] md:text-xs tracking-[0.3em] uppercase font-medium shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-sand-100 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-200/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative font-semibold">Explore the Collection</span>
                <svg
                  className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </Link>

              <Link
                href="/customize/consultation"
                className="magnetic-btn group inline-flex items-center justify-center gap-2.5 border border-sand-300/40 bg-emerald-950/60 backdrop-blur-md text-sand-100 px-7 md:px-9 py-4 text-[11px] md:text-xs tracking-[0.26em] uppercase transition-all duration-400 hover:bg-ivory hover:text-emerald-950 hover:border-ivory hover:scale-[1.02]"
              >
                <span>Book Consultation</span>
                <span className="text-sand-300 group-hover:text-emerald-950 transition-colors">
                  &rarr;
                </span>
              </Link>
            </div>

            {/* Mobile craft chips */}
            <div className="mt-7 flex flex-wrap gap-2 lg:hidden">
              {["Zardozi", "Dabka", "Resham", "Bespoke"].map((chip) => (
                <span
                  key={chip}
                  className="border border-sand-300/30 bg-emerald-950/60 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-sand-200/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right column luxury atelier card with 3D tilt */}
          <div
            ref={badgeRef}
            className="hidden lg:block lg:col-span-4 justify-self-end w-full max-w-[320px] border border-sand-200/25 bg-emerald-950/50 backdrop-blur-lg p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] will-change-transform rounded-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-sand-300/80">
                Bridal Edit
              </p>
              <span className="inline-block w-2 h-2 rounded-full bg-sand-400 animate-pulse" />
            </div>
            <p className="font-display text-4xl text-ivory mt-2 leading-none">2026</p>
            <p className="text-xs text-sand-100/75 leading-relaxed mt-3">
              Signature silhouettes, heritage embroidery, and custom fit crafted for your
              wedding story.
            </p>
            <div className="mt-5 pt-4 border-t border-sand-300/20 text-[10px] uppercase tracking-[0.22em] text-sand-200/70 flex items-center justify-between">
              <span>Since 1994</span>
              <span>Atelier Lahore</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-[10px] uppercase tracking-[0.16em] text-sand-200/80">
              {["Zardozi", "Dabka", "Resham", "Bespoke"].map((t, idx) => (
                <span
                  key={t}
                  ref={(el) => {
                    if (el) badgeChipsRef.current[idx] = el;
                  }}
                  className="border border-sand-300/20 bg-emerald-900/40 px-2 py-2 text-center backdrop-blur-sm hover:border-sand-300/50 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with animated indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 will-change-transform"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-sand-200/60 font-light">
          Scroll to Discover
        </span>
        <div className="w-px h-10 relative overflow-hidden bg-sand-400/20">
          <div className="absolute w-full h-full bg-gradient-to-b from-sand-300 via-sand-400 to-transparent animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Decorative concentric circles */}
      <div
        ref={frontOrnamentRef}
        className="pointer-events-none absolute right-8 md:right-20 bottom-20 md:bottom-28 z-20 hidden md:block will-change-transform"
      >
        <div className="w-48 h-48 rounded-full border border-sand-300/20" />
        <div className="absolute inset-5 rounded-full border border-sand-300/15" />
        <div className="absolute inset-10 rounded-full border border-sand-300/10" />
        <div className="absolute inset-[3.75rem] rounded-full border border-sand-300/5" />
      </div>
    </section>
  );
}
