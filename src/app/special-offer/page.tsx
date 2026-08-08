"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { homeMedia } from "@/lib/data/home-media";
import { offers } from "@/lib/data/offers";
import { Sparkles, Clock, Shield, ArrowRight, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  { icon: Shield, label: "Staged payment — 30/40/30" },
  { icon: Clock, label: "Free delivery within Pakistan" },
  { icon: Sparkles, label: "Dedicated stylist on WhatsApp" },
];

function useCountdown(target: string) {
  const calc = useCallback(() => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
    const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
    return { d: pad(diff / 86400000), h: pad((diff % 86400000) / 3600000), m: pad((diff % 3600000) / 60000), s: pad((diff % 60000) / 1000) };
  }, [target]);
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, [calc]);
  return time;
}

export default function SpecialOfferPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const countdown = useCountdown("2026-09-01T00:00:00+05:00");
  const heroImage = homeMedia.atelierPortrait;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(mediaRef.current, { scale: 1.06, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.7")
        .fromTo(headlineRef.current, { y: 44, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.85 }, "-=0.5")
        .fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left center" }, "-=0.4")
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35")
        .fromTo(clockRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.25")
        .fromTo(ctaRowRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.25");

      gsap.to(mediaRef.current, {
        y: 44, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      gsap.to(contentRef.current, {
        y: -14, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      gsap.to(glowRef.current, {
        y: 28, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom bottom", scrub: 1.1 },
      });
      gsap.to(ornamentRef.current, {
        y: -18, rotation: -3, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
      });

      gsap.from("[data-anim='card']", {
        y: 44, opacity: 0, stagger: 0.18, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: offersRef.current, start: "top 65%" },
      });

      gsap.from("[data-anim='perk']", {
        opacity: 0, y: 20, stagger: 0.12, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: perksRef.current, start: "top 80%" },
      });

      gsap.fromTo(finalCtaRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: finalCtaRef.current, start: "top 80%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const unitLabel = { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" } as const;
  const countUnits = ["d", "h", "m", "s"] as const;

  return (
    <div ref={pageRef} className="relative">
      {/* ───── HERO ───── */}
      <section ref={heroRef} className="parallax-scene relative min-h-[80vh] md:min-h-screen overflow-hidden bg-emerald-950" data-parallax-section>
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover object-[center_30%]" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-950/52 to-emerald-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/88 via-emerald-950/20 to-transparent" />
        </div>

        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-80"
          style={{ background: "radial-gradient(ellipse 52% 46% at 62% 34%, rgba(233,202,159,0.16), transparent 65%)" }}
        />

        <div className="relative z-30 flex min-h-[80vh] md:min-h-screen items-center px-8 md:px-16 lg:px-24">
          <div ref={contentRef} className="mx-auto w-full max-w-6xl pt-20 md:pt-24 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="border-l border-sand-300/35 bg-emerald-950/20 backdrop-blur-[2px] pl-5 md:pl-7 py-2">
                <div ref={badgeRef} className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-[0.28em] text-sand-100/80 font-light uppercase">
                  <Sparkles size={11} className="text-sand-400" />
                  Limited Time Offerings
                </div>
                <h1
                  ref={headlineRef}
                  className="mt-4 font-display text-ivory text-[clamp(2.4rem,6.8vw,5.2rem)] leading-[0.88] tracking-tight"
                >
                  Offers as
                  <br />
                  <em className="not-italic text-sand-200">exceptional</em>
                  <br />
                  as you are
                </h1>
                <div ref={dividerRef} className="mt-5 h-px w-16 bg-sand-300/50 origin-left" />
                <p ref={subRef} className="mt-4 max-w-xl text-sm md:text-base text-sand-100/75 leading-relaxed">
                  Curated savings on handcrafted bridal wear. Every piece honours your story — not a markup that doesn&rsquo;t.
                </p>
              </div>

              <div ref={clockRef} className="mt-8 md:mt-10 pl-5 md:pl-7">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={12} className="text-sand-400" />
                  <span className="text-[9px] uppercase tracking-[0.28em] text-sand-200/50">Offers end in</span>
                </div>
                <div className="inline-flex items-center gap-2 md:gap-2.5">
                  {mounted ? (
                    countUnits.map((unit, i) => (
                      <div key={unit} className="flex items-center gap-2 md:gap-2.5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-12 md:w-12 md:h-14 bg-emerald-950/50 border border-sand-200/20 flex items-center justify-center">
                            <span className="font-display text-lg md:text-xl text-sand-200 tabular-nums">{countdown[unit]}</span>
                          </div>
                          <span className="text-[7px] uppercase tracking-[0.16em] text-sand-200/35 mt-1">{unitLabel[unit]}</span>
                        </div>
                        {i < 3 && <span className="text-sand-200/20 font-display text-base -mt-5">:</span>}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 md:gap-2.5 min-h-[68px] md:min-h-[80px]">
                      {(["Days","Hours","Minutes","Seconds"] as const).map((label, i) => (
                        <div key={label} className="flex items-center gap-2 md:gap-2.5">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-12 md:w-12 md:h-14 bg-emerald-950/50 border border-sand-200/20 flex items-center justify-center">
                              <span className="font-display text-lg md:text-xl text-sand-200/30 tabular-nums">00</span>
                            </div>
                            <span className="text-[7px] uppercase tracking-[0.16em] text-sand-200/20 mt-1">{label}</span>
                          </div>
                          {i < 3 && <span className="text-sand-200/10 font-display text-base -mt-5">:</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div ref={ctaRowRef} className="mt-8 md:mt-10 flex items-center gap-4 pl-5 md:pl-7">
                <a
                  href="#offers"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-ivory text-emerald-900 px-7 md:px-8 py-3 md:py-3.5 text-[10px] md:text-xs tracking-[0.28em] uppercase transition-colors duration-500 hover:bg-sand-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-100/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span>View offers</span>
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M1 7h12M8 2l5 5-5 5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/923209988777?text=Hi%20Begum!%20Tell%20me%20about%20your%20special%20offers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-sand-200/70 hover:text-sand-100 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle size={14} /> Ask on WhatsApp
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4 justify-self-end w-full max-w-[280px] border border-sand-200/25 bg-emerald-950/35 backdrop-blur-sm p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-sand-200/75">The Edit</p>
              <p className="font-display text-3xl text-ivory mt-2">2026</p>
              <p className="text-xs text-sand-100/70 leading-relaxed mt-2">
                Three curated offers for the bride who values craftsmanship as much as value.
              </p>
              <div className="mt-4 pt-4 border-t border-sand-300/20 text-[10px] uppercase tracking-[0.2em] text-sand-200/70 flex items-center justify-between">
                <span>Since 1994</span>
                <span>Atelier Lahore</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ornamentRef}
          className="pointer-events-none absolute right-8 md:right-16 bottom-10 md:bottom-14 z-20 hidden md:block"
        >
          <div className="w-28 h-28 rounded-full border border-sand-300/35" />
          <div className="absolute inset-4 rounded-full border border-sand-300/25" />
          <div className="absolute inset-8 rounded-full border border-sand-300/15" />
        </div>
      </section>

      {/* ───── OFFERS ───── */}
      <section id="offers" ref={offersRef} className="relative py-24 md:py-32 bg-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_12%,rgba(6,35,25,0.03),transparent_45%)]" />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />

        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sand-600 font-medium">Curated for you</p>
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] text-emerald-800 mt-4 leading-tight">
              Choose your offer
            </h2>
            <div className="w-12 h-px bg-sand-400 mx-auto mt-5" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
            {offers.map((offer) => (
              <div
                key={offer.id}
                data-anim="card"
                className="group relative grid md:grid-cols-[1fr_auto] bg-gradient-to-br from-ivory to-sand-50 shadow-[0_2px_20px_-8px_rgba(6,35,25,0.06)] hover:shadow-[0_8px_30px_-8px_rgba(6,35,25,0.12)] transition-shadow duration-500"
              >
                <div className="absolute inset-0 border border-sand-300/40 group-hover:border-emerald-800/20 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 p-8 md:p-12 lg:p-14">
                  <span className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.22em] font-medium text-emerald-800 bg-emerald-800/5 border border-emerald-800/10 mb-5">
                    {offer.badge}
                  </span>

                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-emerald-800 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-1.5 tracking-wide font-medium">{offer.subtitle}</p>

                  <div className="w-6 h-px bg-sand-400/70 my-5" />

                  <p className="text-charcoal/65 leading-relaxed text-[15px] max-w-lg">
                    {offer.description}
                  </p>

                  <div className="mt-7 pt-7 border-t border-sand-300/30 flex items-center gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-charcoal/35">Starting from</p>
                      <p className="font-display text-2xl md:text-3xl text-emerald-800 -mt-0.5">
                        {offer.discounted > 1000
                          ? `PKR ${(offer.discounted / 1000).toFixed(0)},000`
                          : `${offer.discounted}% Off`}
                      </p>
                      {offer.original > 0 && (
                        <p className="text-xs text-charcoal/25 line-through mt-0.5">{offer.original.toLocaleString()} PKR</p>
                      )}
                    </div>
                    <div className="h-10 w-px bg-sand-300/40" />
                    <Button variant="outline" size="sm" className="border-charcoal/15 text-charcoal hover:bg-sand-50 hover:border-emerald-800/30" asChild>
                      <Link href={`/special-offer/${offer.id}`}>
                        View details <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative z-10 flex items-center md:items-end justify-end md:justify-center px-8 md:px-0 md:pr-14 pb-8 md:pb-14">
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] uppercase tracking-[0.28em] text-emerald-800/40 font-medium">Save</span>
                    <span className="font-display text-4xl md:text-5xl lg:text-6xl text-emerald-800 leading-none -mt-1">
                      {offer.discounted > 1000
                        ? `₹${((offer.original - offer.discounted) / 1000).toFixed(0)}K`
                        : `${offer.discounted}%`}
                    </span>
                    <span className="text-[10px] text-charcoal/35 uppercase tracking-[0.18em] mt-0.5">
                      {offer.discounted > 1000 ? "Saved" : "discount"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── DIVIDER ORNAMENT ───── */}
      <div className="relative bg-ivory">
        <div className="mx-auto w-px h-12 bg-gradient-to-b from-sand-300/60 to-transparent" />
        <div className="mx-auto -mt-3 w-12 h-12 rounded-full border border-sand-300/40 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-sand-300/30" />
        </div>
        <div className="mx-auto w-px h-12 bg-gradient-to-t from-sand-300/60 to-transparent" />
      </div>

      {/* ───── PERKS ───── */}
      <section ref={perksRef} className="relative pb-20 md:pb-28 bg-ivory">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div key={perk.label} data-anim="perk" className="flex items-center gap-3 p-5 border border-sand-300/30 bg-sand-50/60">
                <perk.icon size={16} className="shrink-0 text-emerald-800" />
                <span className="text-sm text-charcoal/70">{perk.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="relative py-20 md:py-28 bg-emerald-950 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(233,202,159,0.05), transparent 70%)" }} />
        <div ref={finalCtaRef}>
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="border-t border-sand-200/15 w-12 mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-ivory leading-tight">
                Not sure which offer
                <br />
                <span className="text-sand-300">fits your bridal look?</span>
              </h2>
              <p className="text-sand-100/55 mt-4 leading-relaxed max-w-md mx-auto">
                Message us on WhatsApp and we&rsquo;ll match you with the right piece at the right price.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <a
                  href="https://wa.me/923209988777?text=Hi%20Begum!%20I%27m%20interested%20in%20your%20special%20offers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-ivory text-emerald-900 px-8 md:px-10 py-3.5 md:py-4 text-[11px] md:text-xs tracking-[0.28em] uppercase transition-colors duration-500 hover:bg-sand-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-100/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <Button variant="outline" size="lg" className="border-sand-200/25 text-sand-200 hover:bg-sand-100/10 hover:text-sand-100" asChild>
                  <Link href="/collections">
                    Browse all <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
