"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFitSignal } from "@/components/product/product-fit-signal";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface AddToCartProps {
  product: Pick<
    Product,
    "id" | "name" | "basePrice" | "images" | "sizes" | "customizable" | "inStock"
  >;
}

export function AddToCart({ product }: AddToCartProps) {
  const sizes = product.sizes ?? [];
  const needsSize = sizes.length > 0;
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (needsSize && !size) {
      setError(true);
      return;
    }

    addItem({
      id: `${product.id}-${size ?? "os"}`,
      productId: product.id,
      name: product.name,
      image: product.images[0]?.src ?? "",
      price: product.basePrice,
      quantity: 1,
      size: size ?? undefined,
    });

    useCartStore.setState({ isOpen: true });
    setError(false);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div>
      {needsSize && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs uppercase tracking-wider text-charcoal/50">Size</p>
            {error && (
              <p className="text-xs text-heritage-500" role="alert">
                Please select a size
              </p>
            )}
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
                  "min-w-12 px-4 py-2 text-sm border transition-colors bg-ivory",
                  size === s
                    ? "border-emerald-800 text-emerald-900 bg-sand-50"
                    : error
                      ? "border-heritage-500/50 text-charcoal/70"
                      : "border-sand-300/70 hover:border-emerald-800 hover:text-emerald-800",
                )}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>
          <Link
            href="/size-guide"
            className="text-xs text-emerald-800 underline mt-2 inline-block underline-offset-2"
          >
            Size guide
          </Link>
          <ProductFitSignal sizes={sizes} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {justAdded ? (
            <>
              <Check size={18} className="mr-2" /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="mr-2" /> Add to Cart
            </>
          )}
        </Button>
        {product.customizable && (
          <Button variant="outline" size="lg" className="flex-1" asChild>
            <Link href="/customize">Customize This Piece</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
