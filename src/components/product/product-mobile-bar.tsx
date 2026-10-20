"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, MessageCircle, Check, Wand2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import type { Product } from "@/lib/types";

interface ProductMobileBarProps {
  product: Product;
  whatsappHref: string;
}

export function ProductMobileBar({ product, whatsappHref }: ProductMobileBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const garment = product.garmentType ?? (product.category === "bridal-lehenga" ? "lehenga" : "lehenga");
  const primaryOccasion = product.occasion[0] ?? "baraat";
  const customizerUrl = `/customize?garment=${garment}&occasion=${primaryOccasion}&ref=${product.slug}`;

  useEffect(() => {
    const handleScroll = () => {
      // Show bar once user has scrolled past 260px
      if (window.scrollY > 260) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuickAdd = () => {
    addItem({
      id: `${product.id}-mobile-os`,
      productId: product.id,
      name: product.name,
      image: product.images[0]?.src ?? "",
      price: product.basePrice,
      quantity: 1,
      size: product.sizes?.[0] ?? undefined,
    });
    useCartStore.setState({ isOpen: true });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-ivory/98 backdrop-blur-lg border-t border-sand-300/80 px-3.5 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:hidden transition-all duration-300">
      <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
        {/* Left: Thumbnail & Price */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative w-10 h-12 shrink-0 overflow-hidden bg-sand-100 border border-sand-300/60">
            <Image
              src={product.images[0]?.src || ""}
              alt={product.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-xs text-emerald-950 font-medium truncate">
              {product.name}
            </p>
            <p className="text-xs font-semibold text-emerald-900 mt-0.5">
              {formatPrice(product.basePrice, product.currency)}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Always Available Customize Button */}
          <Link
            href={customizerUrl}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-sand-400 to-sand-300 hover:from-sand-300 hover:to-sand-200 text-emerald-950 border border-sand-500/40 px-3 py-2.5 text-[10px] font-semibold tracking-wider uppercase shadow-sm active:scale-95 transition-all"
          >
            <Wand2 size={12} className="text-emerald-950" />
            <span>Customize</span>
          </Link>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="inline-flex items-center gap-1 bg-emerald-950 hover:bg-emerald-900 text-sand-200 border border-sand-400/30 px-3 py-2.5 text-[10px] font-medium tracking-wider uppercase shadow-sm active:scale-95 transition-all disabled:opacity-50"
          >
            {justAdded ? (
              <>
                <Check size={12} className="text-sand-300" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} className="text-sand-400" />
                <span>Add</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Inquire */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-none bg-sand-200/70 hover:bg-sand-300 text-emerald-950 flex items-center justify-center border border-sand-300/80 transition-colors shrink-0"
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
