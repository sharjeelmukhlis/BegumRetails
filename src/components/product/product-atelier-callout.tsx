"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Wand2, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/types";

interface AtelierCalloutProps {
  product: Product;
}

export function ProductAtelierCallout({ product }: AtelierCalloutProps) {
  const garment = product.garmentType ?? (product.category === "bridal-lehenga" ? "lehenga" : undefined);
  const primaryOccasion = product.occasion[0] ?? "baraat";
  const customizerUrl = garment
    ? `/customize?garment=${garment}&occasion=${primaryOccasion}&ref=${product.slug}`
    : `/customize?occasion=${primaryOccasion}&ref=${product.slug}`;

  return (
    <div className="relative overflow-hidden rounded-none border border-sand-400/80 bg-gradient-to-br from-emerald-950 via-[#072d21] to-[#041c14] p-5 sm:p-6 text-ivory shadow-lg">
      {/* Decorative Gold Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-sand-400/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-sand-400/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-400/20 border border-sand-400/40 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase text-sand-300">
            <Sparkles size={11} className="text-sand-300 animate-pulse" />
            Begum Virtual Atelier
          </span>
          <span className="text-[11px] text-sand-200/70">Custom Tailoring</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl text-sand-200 tracking-wide leading-snug">
          Customize This Silhouette to Your Measurements
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-sand-100/80 leading-relaxed max-w-lg">
          Take the {product.name} design into our 3D Alteration Canvas. Adjust blouse length, flare diameter, embroidery density, and fabric swatches in real time.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-2.5 my-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-sand-200">
            <CheckCircle2 size={13} className="text-sand-400 shrink-0" />
            <span>Interactive 3D Mannequin</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-sand-200">
            <CheckCircle2 size={13} className="text-sand-400 shrink-0" />
            <span>Live CM / Inches Alterations</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-sand-200">
            <CheckCircle2 size={13} className="text-sand-400 shrink-0" />
            <span>Instant Atelier Dossier Card</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-sand-200">
            <CheckCircle2 size={13} className="text-sand-400 shrink-0" />
            <span>Direct Karigar WhatsApp Order</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={customizerUrl}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-sand-400 hover:bg-sand-300 text-emerald-950 font-medium px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.16em] transition-all shadow-md active:scale-[0.99]"
          >
            <Wand2 size={16} />
            <span>Launch Virtual Atelier for This Piece</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
