"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Shield, Camera, Ship, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { icon: Shield, title: "Staged Payments", desc: "30% / 40% / 30% — you approve before you pay" },
  { icon: Camera, title: "Real Photography", desc: "No AI, no retouching — what you see is what you get" },
  { icon: Ship, title: "Worldwide Shipping", desc: "Lahore to London, Karachi to California" },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Chat with your designer, always" },
];

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-ivory overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,202,159,0.04)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/40 to-transparent" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {trustItems.map((item, i) => (
            <div key={item.title} className="trust-item relative text-center md:px-8">
              {i < trustItems.length - 1 && (
                <div className="trust-divider hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-sand-200/60 origin-top" />
              )}
              <div className="trust-icon w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={22} className="text-emerald-800" />
              </div>
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-xs text-charcoal/50 mt-2 leading-relaxed max-w-[180px] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
