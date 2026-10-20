"use client";

import Link from "next/link";
import { KeyboardEvent, useRef } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data/products";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function CompleteTheLook() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 320 : -320;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const delta = direction === "right" ? 340 : -340;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Curate finishing accessories: jewellery, potlis, khussas, and dupattas
  const accessoryProducts = products
    .filter((p) => p.category !== "bridal-lehenga")
    .slice(0, 8);

  return (
    <section data-parallax-section className="parallax-scene py-24 md:py-32 bg-emerald-950 text-ivory overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-parallax="layer-1">
          <div>
            <div className="inline-flex items-center gap-2 text-sand-300 mb-2">
              <Sparkles size={13} />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-sand-300/80 font-medium">
                Finishing Details
              </p>
            </div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] text-ivory leading-[0.92]">
              Dressed Head to Toe
            </h2>
            <p className="mt-3 text-xs md:text-sm text-sand-200/70 max-w-lg leading-relaxed font-light">
              Handmade khussas, zardozi potlis, matha pattis, and heirloom dupattas to complete your bridal silhouette.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left in complete the look"
                className="h-10 w-10 flex items-center justify-center border border-sand-300/30 text-sand-200 hover:text-ivory hover:border-sand-200 hover:bg-emerald-900/40 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right in complete the look"
                className="h-10 w-10 flex items-center justify-center border border-sand-300/30 text-sand-200 hover:text-ivory hover:border-sand-200 hover:bg-emerald-900/40 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <Link
              href="/collections/complete-the-look"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand-300 hover:text-ivory transition-colors group py-2"
            >
              <span>View All Accessories</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-12 pb-6 snap-x snap-mandatory scrollbar-none"
        role="region"
        aria-label="Complete the look accessories carousel"
        tabIndex={0}
        onKeyDown={handleTrackKeyDown}
      >
        {accessoryProducts.map((product, i) => (
          <div
            key={product.id}
            className="ctl-item flex-shrink-0 w-[240px] md:w-[280px] snap-start"
            data-parallax="card"
          >
            <ProductCard product={product} index={i} variant="on-dark" />
          </div>
        ))}

        <Link
          href="/collections/complete-the-look"
          className="ctl-item flex-shrink-0 w-[240px] md:w-[280px] snap-start border border-dashed border-sand-300/30 bg-emerald-900/20 flex flex-col items-center justify-center p-6 group hover:border-sand-300/60 hover:bg-emerald-900/40 transition-colors text-center"
        >
          <Sparkles size={24} className="text-sand-300 mb-3" />
          <span className="font-display text-xl text-ivory">Explore All Pieces</span>
          <span className="text-xs text-sand-300/70 mt-2 flex items-center gap-1.5 uppercase tracking-wider">
            View Accessories <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
