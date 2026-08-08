"use client";

import Link from "next/link";
import { KeyboardEvent, useRef } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

export function CompleteTheLook() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 320 : -320;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  const lookProducts = products
    .filter((p) => p.category !== "bridal-shoes-khussa")
    .slice(0, 8);

  return (
    <section data-parallax-section className="parallax-scene py-28 md:py-36 bg-emerald-800 text-ivory overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-12" data-parallax="layer-1">
          <div>
            <p className="ctl-label text-xs uppercase tracking-[0.25em] text-sand-400/60 font-medium">
              Complete the Look
            </p>
            <h2 className="ctl-heading font-display text-[clamp(2rem,4.5vw,4rem)] text-ivory mt-3 leading-[0.92]">
              Dressed head <br />to toe
            </h2>
          </div>
          <Link
            href="/collections/complete-the-look"
            className="hidden md:flex items-center gap-2 text-sm text-sand-300 hover:text-ivory transition-colors group"
          >
            View all edits
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-12 pb-4 snap-x snap-mandatory scrollbar-none"
        role="region"
        aria-label="Complete the look products carousel"
        tabIndex={0}
        onKeyDown={handleTrackKeyDown}
      >
        {lookProducts.map((product, i) => (
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
          className="ctl-item flex-shrink-0 w-[240px] md:w-[280px] snap-start border border-dashed border-ivory/20 flex items-center justify-center group hover:border-ivory/40 transition-colors"
        >
          <span className="text-sm text-sand-300 group-hover:text-ivory transition-colors flex items-center gap-2">
            View all edits <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
