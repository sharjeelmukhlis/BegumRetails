"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Shield, Camera, Globe, MessageCircle } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { icon: Shield, title: "Staged Payments", desc: "30% / 40% / 30% milestone approvals before you pay" },
  { icon: Camera, title: "Real Photography", desc: "Zero AI or filtered photos. What you see is what you wear" },
  { icon: Globe, title: "Express Worldwide", desc: "Insured courier from Lahore atelier to UK, US, UAE & beyond" },
  { icon: MessageCircle, title: "WhatsApp Atelier Support", desc: "Direct 1:1 access to your designer and karigar updates" },
];

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const dividers = sectionRef.current?.querySelectorAll(".trust-divider");
      if (dividers) {
        gsap.from(dividers, { scaleY: 0, duration: 0.8, stagger: 0.15, ease: "power3.inOut", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
      }
      const items = sectionRef.current?.querySelectorAll(".trust-item");
      if (items) {
        gsap.from(items, { y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
      }
      const icons = sectionRef.current?.querySelectorAll(".trust-icon");
      if (icons) {
        icons.forEach((icon) => {
          gsap.to(icon, { y: -10, ease: "none", scrollTrigger: { trigger: icon.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 bg-sand-50/60 overflow-hidden border-b border-sand-300/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,202,159,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {trustItems.map((item, i) => (
            <div key={item.title} className="trust-item relative text-center md:px-8">
              {i < trustItems.length - 1 && (
                <div className="trust-divider hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-sand-200/80 origin-top" />
              )}
              <div className="trust-icon w-12 h-12 rounded-full bg-emerald-900/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={22} className="text-emerald-900" />
              </div>
              <h4 className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-xs text-charcoal/75 mt-2 leading-relaxed max-w-[200px] mx-auto font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
