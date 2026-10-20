"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/store/wishlist";
import { waLink } from "@/lib/whatsapp";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Clock,
  Ruler,
  ShieldCheck,
  MessageCircle,
  Truck,
  Eye,
} from "lucide-react";
import type { Occasion } from "@/lib/types";

// Flagship bridal lehengas specifically curated for the home showcase
const FLAGSHIP_SLUGS = [
  "zari-dream-lehenga",
  "ruby-court-lehenga",
  "resham-noor-lehenga",
  "champagne-walima-lehenga",
  "ivory-nikkah-lehenga",
  "marigold-mehndi-lehenga",
];

const OCCASION_TABS: { label: string; value: Occasion | "all" }[] = [
  { label: "All Masterpieces", value: "all" },
  { label: "Baraat", value: "baraat" },
  { label: "Nikkah", value: "nikkah" },
  { label: "Mehndi", value: "mehndi" },
  { label: "Walima", value: "walima" },
];

// Approximate conversion rates for overseas diaspora brides (UK, US, UAE)
function formatApproxUSD(pricePKR: number): string {
  const usd = Math.round(pricePKR / 278);
  return `~$${usd.toLocaleString("en-US")} USD`;
}

export function SignatureMasterpieces() {
  const [activeTab, setActiveTab] = useState<Occasion | "all">("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const wishlistedIds = useWishlistStore((s) => s.ids);
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const flagshipProducts = products.filter((p) => FLAGSHIP_SLUGS.includes(p.slug));

  const filteredProducts =
    activeTab === "all"
      ? flagshipProducts
      : flagshipProducts.filter((p) => p.occasion.includes(activeTab));

  return (
    <section
      data-parallax-section
      className="parallax-scene relative py-24 md:py-32 bg-ivory overflow-hidden border-b border-sand-300/40"
    >
      {/* Background luxury ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,202,159,0.12)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-emerald-900/5 blur-3xl" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" data-parallax="layer-1">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-800 mb-3">
              <Sparkles size={14} className="text-sand-600 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.25em] text-sand-600 font-medium">
                The Bridal Edit 2026
              </p>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,4rem)] text-emerald-900 leading-[0.92] tracking-tight">
              Signature Masterpieces
            </h2>
            <p className="mt-4 text-sm md:text-base text-charcoal/75 max-w-2xl leading-relaxed font-light">
              Flagship bridal lehengas hand-embroidered by master karigars in Lahore.
              Each silhouette is custom-crafted to your measurements with verified progress updates.
            </p>
          </div>

          <Link
            href="/collections/category/bridal-lehenga"
            className="group hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-900 hover:text-emerald-700 transition-colors py-2 border-b border-emerald-900/30 hover:border-emerald-900"
          >
            <span>View Full Collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Occasion Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {OCCASION_TABS.map((tab) => {
            const active = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "relative shrink-0 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 rounded-sm min-h-11",
                  active
                    ? "bg-emerald-900 text-ivory font-medium shadow-md shadow-emerald-950/15"
                    : "bg-sand-50/80 text-charcoal/70 border border-sand-300/60 hover:border-emerald-800/40 hover:text-emerald-900"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isHovered = hoveredCard === product.id;
              const isWishlisted = wishlistedIds.includes(product.id);
              const primaryImg = product.images[0];
              const detailImg = product.images[1] || primaryImg;

              const whatsappInquiryUrl = waLink(
                `Hello Begum Atelier, I am interested in inquiring about the *${product.name}* (Price: ${formatPrice(product.basePrice, "PKR")}). Could you please share custom fitting details and current lead time?`
              );

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  data-parallax="card"
                  className="group relative flex flex-col border border-sand-300/50 bg-ivory transition-all duration-500 hover:border-sand-400 hover:shadow-xl hover:shadow-charcoal/5"
                >
                  {/* Image Display with Drape/Detail Toggle */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand-100">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block absolute inset-0 focus:outline-none"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={primaryImg.src}
                        alt={primaryImg.alt}
                        fill
                        className={cn(
                          "object-cover transition-all duration-700 ease-out",
                          isHovered && detailImg ? "opacity-0 scale-105" : "opacity-100 scale-100"
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {detailImg && (
                        <Image
                          src={detailImg.src}
                          alt={detailImg.alt}
                          fill
                          className={cn(
                            "object-cover transition-all duration-700 ease-out",
                            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                          )}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </Link>

                    {/* Gradient Overlay for Top/Bottom Badges */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-emerald-950/20" />

                    {/* Top Row Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant={product.tier === "couture" ? "heritage" : "sand"}
                          className="rounded-none text-[9px] uppercase tracking-[0.18em] px-2.5 py-1"
                        >
                          {product.tier === "couture" ? "Couture Masterpiece" : "Signature Bridal"}
                        </Badge>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm text-emerald-900 shadow-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
                      >
                        <Heart
                          size={16}
                          className={cn(
                            "transition-colors",
                            isWishlisted
                              ? "fill-emerald-800 text-emerald-800"
                              : "text-emerald-900 stroke-[1.5]"
                          )}
                        />
                      </button>
                    </div>

                    {/* Bottom Bar on Image: Lead Time & Micro-Detail */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-ivory">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider text-sand-100">
                        <Clock size={11} className="text-sand-300" />
                        <span>{product.leadTimeDays ? `${Math.round(product.leadTimeDays / 7)} Wks Lead Time` : "Made to Order"}</span>
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.16em] text-sand-200/90 font-light hidden sm:inline-block">
                        Hover for detail
                      </span>
                    </div>
                  </div>

                  {/* Card Content Information */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                      {/* Artisan Attribution line */}
                      {product.artisan && (
                        <div className="flex items-center gap-2 text-[11px] text-charcoal/60 uppercase tracking-[0.15em] mb-1.5">
                          <span>{product.artisan.name}</span>
                          <span className="h-1 w-1 rounded-full bg-sand-400" />
                          <span>{product.artisan.city} ({product.artisan.technique})</span>
                        </div>
                      )}

                      {/* Product Title */}
                      <h3 className="font-display text-xl md:text-2xl text-emerald-900 leading-snug">
                        <Link
                          href={`/product/${product.slug}`}
                          className="hover:text-emerald-700 transition-colors"
                        >
                          {product.name}
                        </Link>
                      </h3>

                      {/* Tagline / Silhouette notes */}
                      <p className="mt-2 text-xs md:text-sm text-charcoal/70 line-clamp-2 leading-relaxed font-light">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price and Action Row */}
                    <div className="mt-5 pt-4 border-t border-sand-300/40">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <p className="font-serif text-lg md:text-xl font-medium text-emerald-900">
                            {formatPrice(product.basePrice, "PKR")}
                          </p>
                          <p className="text-[11px] text-charcoal/50 font-sans tracking-wide">
                            {formatApproxUSD(product.basePrice)}
                          </p>
                        </div>

                        <span className="text-[10px] uppercase tracking-wider text-sand-700 bg-sand-100/70 px-2 py-0.5">
                          {product.fabric}
                        </span>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 bg-emerald-900 text-ivory py-2.5 px-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-emerald-800 text-center min-h-11"
                        >
                          <Eye size={13} />
                          <span>View Piece</span>
                        </Link>

                        <a
                          href={whatsappInquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 border border-emerald-900/30 text-emerald-900 bg-sand-50/50 py-2.5 px-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-emerald-900 hover:text-ivory text-center min-h-11"
                        >
                          <MessageCircle size={13} />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View All Link */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/collections/category/bridal-lehenga"
            className="inline-flex items-center justify-center gap-2 w-full py-3 border border-emerald-900/20 bg-emerald-900 text-ivory text-xs uppercase tracking-[0.2em]"
          >
            Explore Complete Bridal Catalog <ArrowRight size={14} />
          </Link>
        </div>

        {/* Atelier Assurance Ribbon */}
        <div className="mt-16 pt-8 border-t border-sand-300/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-charcoal/80">
          <div className="flex items-center gap-3">
            <Ruler size={18} className="text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">Guaranteed Fit</p>
              <p className="text-[11px] text-charcoal/60">Guided video measurements</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">Staged Payments</p>
              <p className="text-[11px] text-charcoal/60">30% · 40% · 30% milestone plans</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">Verified Karigars</p>
              <p className="text-[11px] text-charcoal/60">Handcrafted in Lahore & Karachi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck size={18} className="text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">Global Insured Ship</p>
              <p className="text-[11px] text-charcoal/60">UK, US, UAE & worldwide courier</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
