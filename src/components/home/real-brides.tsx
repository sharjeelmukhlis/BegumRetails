"use client";

import Image from "next/image";
import { KeyboardEvent, useRef } from "react";
import { Container } from "@/components/ui/container";
import { realBrideStories } from "@/lib/data/products";

export function RealBridesSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleMarqueeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!marqueeRef.current) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 360 : -360;
    marqueeRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const doubled = [...realBrideStories, ...realBrideStories];

  return (
    <section data-parallax-section className="parallax-scene py-28 md:py-36 bg-sand-50/50 overflow-hidden">
      <Container>
        <div className="mb-14" data-parallax="layer-1">
          <p className="text-xs uppercase tracking-[0.25em] text-sand-500 font-medium">
            Real Brides
          </p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] text-emerald-800 mt-3 leading-[0.92]">
            Worn by Begums <br />around the world
          </h2>
        </div>
      </Container>

      <div className="relative">
        <div
          className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 snap-x snap-mandatory scrollbar-none"
          ref={marqueeRef}
          role="region"
          aria-label="Real bride stories carousel"
          tabIndex={0}
          onKeyDown={handleMarqueeKeyDown}
        >
          {doubled.map((bride, i) => (
            <div
              key={`${bride.id}-${i}`}
              className="bride-card flex-shrink-0 w-[320px] md:w-[380px] snap-start group"
              data-parallax="card"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={bride.image}
                  alt={`${bride.name} wearing ${bride.productName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-900/10 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
                  <p className="text-sm text-ivory/90 leading-relaxed italic font-light">
                    &ldquo;{bride.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-ivory/20">
                      <Image src={bride.image} alt={`${bride.name} portrait`} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">{bride.name}</p>
                      <p className="text-xs text-sand-200/60">{bride.city}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-[10px] uppercase tracking-wider text-ivory/40 font-medium">
                    {(i % realBrideStories.length) + 1}.{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
