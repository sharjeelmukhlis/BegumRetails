"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { isReadyToShip } from "@/lib/collection/filter";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";

interface ProductCardProps {
  product: Product;
  /** Stagger index for entrance animation. */
  index?: number;
  className?: string;
  /** Dark surface variant (e.g. home Complete the Look). */
  variant?: "default" | "on-dark";
}

/** Accessories / footwear can quick-add; garments with sizing go to PDP. */
function canQuickAdd(product: Product): boolean {
  if (product.customizable) return false;
  if (product.garmentType) return false;
  if (product.category === "bridal-lehenga") return false;
  return true;
}

export function ProductCard({
  product,
  index = 0,
  className,
  variant = "default",
}: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const wishlisted = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  const primary = product.images[0];
  const secondary = product.images[1];
  const ready = isReadyToShip(product);
  const showQuickAdd = canQuickAdd(product);
  const onDark = variant === "on-dark";

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      image: primary.src,
      price: product.basePrice,
      quantity: 1,
    });
    useCartStore.setState({ isOpen: true });
  };

  return (
    <motion.article
      className={cn("group relative", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.45, delay: Math.min(index, 12) * 0.05, ease: [0.22, 1, 0.36, 1] }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              hovered && secondary ? "opacity-0" : "opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                hovered ? "opacity-100" : "opacity-0",
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Tier badge — top left */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            <Badge
              variant={
                product.tier === "bridal" || product.tier === "couture"
                  ? "heritage"
                  : "sand"
              }
              className="rounded-none text-[9px] tracking-[0.14em] px-2 py-0.5"
            >
              {product.tier}
            </Badge>
          </div>

          {/* Availability — top right, under wishlist */}
          <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "flex h-8 w-8 items-center justify-center bg-ivory/90 text-emerald-900 transition-opacity",
                "opacity-100 md:opacity-0 md:group-hover:opacity-100",
              )}
            >
              <Heart
                size={15}
                className={wishlisted ? "fill-emerald-800 text-emerald-800" : ""}
                strokeWidth={1.5}
              />
            </button>
            <span
              className={cn(
                "text-[9px] uppercase tracking-[0.14em] px-2 py-0.5",
                ready
                  ? "bg-ivory/90 text-emerald-900"
                  : "bg-emerald-950/70 text-sand-100",
              )}
            >
              {ready ? "Ready to Ship" : "Made to Order"}
            </span>
          </div>

          {/* Quick add — bottom, hover only on desktop */}
          {showQuickAdd && (
            <button
              type="button"
              onClick={handleQuickAdd}
              className={cn(
                "absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-1.5",
                "bg-ivory/95 py-2.5 text-[10px] uppercase tracking-[0.18em] text-emerald-900",
                "opacity-0 translate-y-1 transition-all duration-300",
                "group-hover:opacity-100 group-hover:translate-y-0",
                "hidden md:flex",
              )}
            >
              <Plus size={12} strokeWidth={1.5} /> Quick Add
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3
            className={cn(
              "text-sm font-medium transition-colors leading-snug",
              onDark
                ? "text-ivory group-hover:text-sand-200"
                : "text-charcoal group-hover:text-emerald-800",
            )}
          >
            {product.name}
          </h3>
          {product.artisan && (
            <p className={cn("text-xs", onDark ? "text-sand-200/50" : "text-charcoal/40")}>
              by {product.artisan.name}, {product.artisan.city}
            </p>
          )}
          <p
            className={cn(
              "text-sm font-medium",
              onDark ? "text-sand-200" : "text-emerald-800",
            )}
          >
            {formatPrice(product.basePrice, product.currency)}
          </p>
          {product.customizable && (
            <p
              className={cn(
                "text-[10px] uppercase tracking-[0.14em]",
                onDark ? "text-sand-300/60" : "text-sand-700",
              )}
            >
              Also available as Custom
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

/** Ivory/sand shimmer skeleton matching card proportions. */
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-gradient-to-br from-sand-100 via-sand-200/40 to-sand-100" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-3/4 bg-sand-200/60" />
        <div className="h-3 w-1/2 bg-sand-100" />
        <div className="h-3.5 w-1/3 bg-sand-200/50" />
      </div>
    </div>
  );
}
