"use client";

import Link from "next/link";
import Image from "next/image";
import { KeyboardEvent, useRef } from "react";
import { Container } from "@/components/ui/container";
import { realBrideStories } from "@/lib/data/products";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Quote } from "lucide-react";

// Helper to map bride stories to exact product slugs
function getBrideProductSlug(productName: string): string {
  if (productName.toLowerCase().includes("zari dream")) return "zari-dream-lehenga";
  if (productName.toLowerCase().includes("resham noor")) return "resham-noor-lehenga";
  if (productName.toLowerCase().includes("ruby court")) return "ruby-court-lehenga";
  return "zari-dream-lehenga";
}

export function RealBridesSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleMarqueeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!marqueeRef.current) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 380 : -380;
    marqueeRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    if (!marqueeRef.current) return;
    const delta = direction === "right" ? 400 : -400;
    marqueeRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Keep stories list rich for the carousel
  const stories = [...realBrideStories, ...realBrideStories];

  return (
    <section data-parallax-section className="parallax-scene py-24 md:py-32 bg-sand-50/50 overflow-hidden border-b border-sand-300/40">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-parallax="layer-1">
          <div>
            <div className="inline-flex items-center gap-1.5 text-sand-600 mb-2">
              <div className="flex text-sand-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-sand-500" />
                ))}
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] font-medium ml-1">
                Verified Bride Stories
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,4rem)] text-emerald-900 leading-[0.92]">
              Worn by Begums <br />Around the World
            </h2>
            <p className="mt-3 text-xs md:text-sm text-charcoal/70 max-w-lg leading-relaxed font-light">
              From historic venues in Lahore to ballrooms in London, New York, and Dubai.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left in bride reviews"
                className="h-10 w-10 flex items-center justify-center border border-sand-400/60 bg-ivory text-emerald-900 hover:bg-emerald-900 hover:text-ivory transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right in bride reviews"
                className="h-10 w-10 flex items-center justify-center border border-sand-400/60 bg-ivory text-emerald-900 hover:bg-emerald-900 hover:text-ivory transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <Link
              href="/real-brides"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-900 hover:text-emerald-700 transition-colors py-2 border-b border-emerald-900/30"
            >
              <span>View All 50+ Stories</span>
              <ArrowRight size={14} />
            </Link>
          </div>
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
          {stories.map((bride, i) => {
            const productSlug = getBrideProductSlug(bride.productName);

            return (
              <div
                key={`${bride.id}-${i}`}
                className="bride-card flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] snap-start group border border-sand-300/60 bg-ivory shadow-sm transition-all duration-300 hover:shadow-md"
                data-parallax="card"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-sand-100">
                  <Image
                    src={bride.image}
                    alt={`${bride.name} wearing ${bride.productName}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 300px, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/25 to-transparent z-10" />

                  {/* City Badge & Index */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                    <span className="bg-ivory/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-950 font-medium">
                      {bride.city}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-sand-200/70 font-mono">
                      0{(i % realBrideStories.length) + 1}
                    </span>
                  </div>

                  {/* Quote and Bride Info */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6 text-ivory">
                    <Quote size={20} className="text-sand-400 mb-2 opacity-80" />
                    <p className="text-xs md:text-sm text-ivory/95 leading-relaxed font-light italic">
                      &ldquo;{bride.quote}&rdquo;
                    </p>

                    <div className="mt-4 pt-4 border-t border-sand-300/25 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ivory">{bride.name}</p>
                        <p className="text-[11px] text-sand-300/80 font-light">{bride.city} Wedding</p>
                      </div>

                      {/* Direct Outfit Link */}
                      <Link
                        href={`/product/${productSlug}`}
                        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-sand-200 hover:text-ivory bg-emerald-900/60 hover:bg-emerald-800 px-3 py-1.5 border border-sand-300/30 transition-colors"
                      >
                        <span>View Lehenga</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
