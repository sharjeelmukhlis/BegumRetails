"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Check, Sparkles, Wand2, Ruler, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFitSignal } from "@/components/product/product-fit-signal";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const sizes = product.sizes ?? [];
  const needsSize = sizes.length > 0;
  const [sizeMode, setSizeMode] = useState<"standard" | "bespoke">("standard");
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const garment = product.garmentType ?? (product.category === "bridal-lehenga" ? "lehenga" : undefined);
  const primaryOccasion = product.occasion[0] ?? "baraat";
  const customizerUrl = garment
    ? `/customize?garment=${garment}&occasion=${primaryOccasion}&ref=${product.slug}`
    : `/customize?occasion=${primaryOccasion}&ref=${product.slug}`;

  const handleAdd = () => {
    if (needsSize && sizeMode === "standard" && !size) {
      setError(true);
      return;
    }

    addItem({
      id: `${product.id}-${sizeMode === "bespoke" ? "bespoke-custom" : (size ?? "os")}`,
      productId: product.id,
      name: sizeMode === "bespoke" ? `${product.name} (Bespoke Made-to-Measure)` : product.name,
      image: product.images[0]?.src ?? "",
      price: product.basePrice,
      quantity: 1,
      size: sizeMode === "bespoke" ? "Custom Made-to-Measure" : (size ?? undefined),
    });

    useCartStore.setState({ isOpen: true });
    setError(false);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Sizing Mode Tabs (Standard vs Bespoke) */}
      {needsSize && (
        <div className="border border-sand-300/80 bg-sand-50/60 p-1 flex items-center">
          <button
            type="button"
            onClick={() => {
              setSizeMode("standard");
              setError(false);
            }}
            className={cn(
              "flex-1 py-2 px-3 text-xs uppercase tracking-wider font-medium transition-all text-center",
              sizeMode === "standard"
                ? "bg-emerald-950 text-sand-200 shadow-sm"
                : "text-charcoal/70 hover:text-emerald-950",
            )}
          >
            Standard Size
          </button>
          <button
            type="button"
            onClick={() => {
              setSizeMode("bespoke");
              setError(false);
            }}
            className={cn(
              "flex-1 py-2 px-3 text-xs uppercase tracking-wider font-medium transition-all text-center flex items-center justify-center gap-1.5",
              sizeMode === "bespoke"
                ? "bg-sand-400 text-emerald-950 font-semibold shadow-sm"
                : "text-charcoal/70 hover:text-emerald-950",
            )}
          >
            <Sparkles size={12} className={sizeMode === "bespoke" ? "text-emerald-950" : "text-sand-600"} />
            Bespoke Made-to-Measure
          </button>
        </div>
      )}

      {/* Standard Size Selector Mode */}
      {sizeMode === "standard" && needsSize && (
        <div>
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">Select Size:</span>
              {size && <span className="text-xs font-semibold text-emerald-950">{size}</span>}
            </div>
            <Link
              href="/size-guide"
              className="text-xs text-sand-800 hover:text-emerald-900 underline underline-offset-4 font-medium flex items-center gap-1"
            >
              <Ruler size={13} /> Size Guide
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={cn(
                  "min-w-12 h-11 px-4 text-xs font-medium uppercase tracking-wider border transition-all duration-200",
                  size === s
                    ? "border-emerald-950 bg-emerald-950 text-sand-200 shadow-md ring-1 ring-emerald-950"
                    : error
                      ? "border-red-400 bg-ivory text-charcoal/70"
                      : "border-sand-300 bg-ivory hover:border-emerald-900 text-charcoal/80 hover:bg-sand-50",
                )}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-600 mt-2 font-medium" role="alert">
              Please select a size to proceed with your order
            </p>
          )}

          <div className="mt-3">
            <ProductFitSignal sizes={sizes} />
          </div>
        </div>
      )}

      {/* Bespoke Made-to-Measure Mode Explainer */}
      {sizeMode === "bespoke" && (
        <div className="border border-sand-400/60 bg-sand-100/50 p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-950 uppercase tracking-wider">
            <ShieldCheck size={15} className="text-sand-700" />
            Flawless Custom Fit Guarantee
          </div>
          <p className="text-xs text-charcoal/75 leading-relaxed">
            Your blouse length, necklines, lehenga flair, and waist cut will be tailored to your exact measurements with virtual 3D approval before needlework starts.
          </p>
          <div className="pt-1">
            <Link
              href={customizerUrl}
              className="inline-flex items-center gap-1 text-xs text-emerald-900 font-semibold underline underline-offset-4 hover:text-emerald-700"
            >
              Preview 3D Mannequin Alteration Canvas <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* Primary Action Buttons: CUSTOMIZE + ADD TO CART */}
      <div className="space-y-3 pt-2">
        {/* Prominent High-Glamour Customize Button */}
        <Link
          href={customizerUrl}
          className="group relative w-full flex items-center justify-center gap-2.5 overflow-hidden border border-sand-400/90 bg-gradient-to-r from-sand-400 via-sand-300 to-sand-400 hover:from-sand-300 hover:via-sand-200 hover:to-sand-300 text-emerald-950 py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.99]"
        >
          {/* Shimmer sweep animation */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform" />
          <Wand2 size={16} className="text-emerald-950 group-hover:rotate-12 transition-transform duration-300" />
          <span>Customize in Begum Virtual Atelier</span>
          <Sparkles size={15} className="text-emerald-950 animate-pulse" />
        </Link>

        {/* Add to Cart / Order Button */}
        <Button
          size="lg"
          className="w-full bg-emerald-950 hover:bg-emerald-900 text-sand-200 border border-sand-400/30 py-4 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium shadow-md transition-all active:scale-[0.99] h-auto"
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {justAdded ? (
            <span className="flex items-center gap-2">
              <Check size={18} className="text-sand-300" /> Piece Added to Bridal Bag
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-sand-400" />
              {sizeMode === "bespoke" ? "Order as Bespoke Made-to-Measure" : "Add to Bridal Bag"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
