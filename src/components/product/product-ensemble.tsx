"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Sparkles, ArrowRight, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";

interface ProductEnsembleProps {
  primaryProduct: Product;
  ensembleItems: Product[];
}

export function ProductEnsemble({ primaryProduct, ensembleItems }: ProductEnsembleProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (ensembleItems.length === 0) return null;

  const handleQuickAdd = (item: Product) => {
    addItem({
      id: `${item.id}-quick`,
      productId: item.id,
      name: item.name,
      image: item.images[0]?.src ?? "",
      price: item.basePrice,
      quantity: 1,
      size: item.sizes?.[0] ?? undefined,
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <div className="mt-12 border-t border-sand-300/60 pt-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-sand-800 font-medium tracking-[0.2em] uppercase">
            <Sparkles size={13} className="text-sand-600" />
            Curated Ensemble
          </div>
          <h3 className="font-display text-2xl text-emerald-950 mt-1">
            Complete the Bridal Suite
          </h3>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Artisanal accents matched to the tone and occasion of this piece.
          </p>
        </div>
        <Link
          href={`/collections/occasion/${primaryProduct.occasion[0] ?? "baraat"}`}
          className="text-xs text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1 underline underline-offset-4"
        >
          View all {primaryProduct.occasion[0]} pieces <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {ensembleItems.slice(0, 4).map((item) => {
          const isAdded = addedIds[item.id];
          return (
            <div
              key={item.id}
              className="group flex flex-col bg-sand-50/50 border border-sand-300/60 p-2.5 transition-all hover:border-sand-400 hover:shadow-sm"
            >
              <Link href={`/product/${item.slug}`} className="relative aspect-[3/4] overflow-hidden bg-sand-100 mb-2.5 block">
                <Image
                  src={item.images[0]?.src || ""}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute bottom-2 left-2 bg-emerald-950/75 backdrop-blur-xs px-2 py-0.5 text-[9px] uppercase tracking-wider text-sand-200">
                  {item.category.replace(/^bridal-/, "").replace(/-/g, " ")}
                </span>
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-display text-sm text-emerald-950 line-clamp-1 group-hover:text-emerald-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs font-semibold text-emerald-900 mt-1">
                    {formatPrice(item.basePrice, item.currency)}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-sand-300/40">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ivory hover:bg-emerald-900 hover:text-ivory text-emerald-950 border border-sand-300 text-[10px] font-medium uppercase tracking-wider py-1.5 transition-colors"
                  >
                    {isAdded ? (
                      <span>Added!</span>
                    ) : (
                      <>
                        <Plus size={11} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                  <Link
                    href={`/product/${item.slug}`}
                    className="p-1.5 text-charcoal/60 hover:text-emerald-900 border border-sand-300 hover:border-emerald-800 transition-colors"
                    title="View item details"
                  >
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
