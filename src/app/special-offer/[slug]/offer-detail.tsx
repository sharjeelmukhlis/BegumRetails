"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getOfferBySlug } from "@/lib/data/offers";
import { ArrowRight, MessageCircle, Check, ChevronLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function OfferDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const offer = getOfferBySlug(slug);
  if (!offer) notFound();

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.25")
        .fromTo(headlineRef.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.35")
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");

      gsap.from("[data-anim='hl']", {
        opacity: 0, x: -20, stagger: 0.08, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: highlightsRef.current, start: "top 75%" },
      });

      gsap.from("[data-anim='term']", {
        opacity: 0, y: 15, stagger: 0.06, duration: 0.4, ease: "power2.out",
        scrollTrigger: { trigger: termsRef.current, start: "top 75%" },
      });

      gsap.fromTo(finalRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: finalRef.current, start: "top 80%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={pageRef} className="relative bg-ivory pt-28 pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_12%,rgba(6,35,25,0.04),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_86%_70%,rgba(201,151,90,0.06),transparent_50%)]" />

      <section ref={heroRef} className="relative">
        <Container>
          <div className="mb-8">
            <Link
              href="/special-offer"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal/40 hover:text-emerald-800 transition-colors"
            >
              <ChevronLeft size={14} /> Back to all offers
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div ref={badgeRef} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-800/5 border border-emerald-800/10 text-emerald-800 text-[10px] uppercase tracking-[0.22em] font-medium mb-5">
              {offer.badge}
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 leading-[0.9] tracking-tight max-w-3xl"
            >
              {offer.title}
            </h1>

            <div className="w-14 h-px bg-sand-400/70 my-5" />

            <p ref={subRef} className="text-lg text-charcoal/60 leading-relaxed max-w-2xl">
              {offer.heroHeadline}
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-charcoal/40">Starting from</p>
                <p className="font-display text-3xl sm:text-4xl text-emerald-800 -mt-0.5">
                  {offer.discounted > 1000
                    ? `PKR ${offer.discounted.toLocaleString()}`
                    : `${offer.discounted}% Off`}
                </p>
                {offer.original > 0 && (
                  <p className="text-sm text-charcoal/30 line-through">{offer.original.toLocaleString()} PKR</p>
                )}
              </div>
              <Button size="lg" className="bg-emerald-800 text-ivory hover:bg-emerald-700" asChild>
                <a href={offer.ctaHref}>
                  {offer.ctaLabel} <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section ref={highlightsRef} className="mt-16 md:mt-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <h2 className="font-display text-xl md:text-2xl text-emerald-800 mb-4">About this offer</h2>
                <div className="w-8 h-px bg-sand-400 mb-5" />
                <p className="text-charcoal/65 leading-relaxed text-[15px]">{offer.description}</p>
              </div>

              <div className="border border-sand-300/40 bg-sand-50/60 p-6 md:p-8 self-start">
                <h3 className="text-[10px] uppercase tracking-[0.24em] text-charcoal/50 font-medium mb-4">
                  What&rsquo;s included
                </h3>
                <ul className="space-y-3">
                  {offer.highlights.map((h) => (
                    <li key={h} data-anim="hl" className="flex items-start gap-3 text-sm text-charcoal/70">
                      <Check size={14} className="mt-0.5 shrink-0 text-emerald-800" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section ref={termsRef} className="mt-16 md:mt-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="border border-sand-300/30 p-8 md:p-10">
              <h3 className="text-[10px] uppercase tracking-[0.24em] text-charcoal/50 font-medium mb-5">
                Terms &amp; Conditions
              </h3>
              <div className="w-8 h-px bg-sand-400 mb-5" />
              <ul className="space-y-2.5">
                {offer.terms.map((t) => (
                  <li key={t} data-anim="term" className="flex items-start gap-2.5 text-sm text-charcoal/50">
                    <span className="w-1 h-1 rounded-full bg-charcoal/20 mt-2 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-16 md:mt-20">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {offer.perks.map((perk) => (
              <div key={perk.label} className="flex items-center gap-3 p-5 border border-sand-300/30 bg-sand-50/60">
                <perk.icon size={16} className="shrink-0 text-emerald-800" />
                <span className="text-sm text-charcoal/70">{perk.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section ref={finalRef} className="mt-16 md:mt-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center p-10 md:p-14 border border-sand-300/40 bg-[radial-gradient(ellipse_at_center,rgba(6,35,25,0.02),transparent)]">
            <h2 className="font-display text-2xl md:text-3xl text-emerald-800 leading-tight">
              Ready to take this offer?
            </h2>
            <p className="text-charcoal/60 mt-3 leading-relaxed">
              Start your order online or message us on WhatsApp we&rsquo;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button size="lg" className="bg-emerald-800 text-ivory hover:bg-emerald-700" asChild>
                <a href={offer.ctaHref}>
                  {offer.ctaLabel} <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-charcoal/20 text-charcoal hover:bg-ivory/80" asChild>
                <a href={`https://wa.me/923209988777?text=Hi%20Begum!%20I%27m%20interested%20in%20the%20${encodeURIComponent(offer.title)}%20offer`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} className="mr-2" /> Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
