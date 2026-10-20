"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  artisanOverlay?: ReactNode;
  productName?: string;
}

export function ProductGallery({ images, artisanOverlay, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for lightbox & gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "ArrowLeft") {
          setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === "ArrowRight") {
          setLightbox((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        } else if (e.key === "Escape") {
          setLightbox(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, images.length]);

  if (images.length === 0) return null;

  const currentImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      {/* Primary Display Stage */}
      <div className="relative group overflow-hidden bg-sand-100 border border-sand-300/60 aspect-[3/4] sm:aspect-[4/5] shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.src}
            initial={reducedMotion ? false : { opacity: 0.4, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0.2 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full h-full cursor-zoom-in"
            onClick={() => setLightbox(activeIndex)}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt || productName || "Bridal masterpiece angle"}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Floating Controls */}
        <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto inline-flex items-center gap-1.5 bg-emerald-950/75 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-sans tracking-[0.2em] text-sand-200 border border-sand-400/20 shadow-sm">
            <Sparkles size={11} className="text-sand-400" />
            <span>Angle {activeIndex + 1} of {images.length}</span>
          </span>

          <button
            type="button"
            onClick={() => setLightbox(activeIndex)}
            className="pointer-events-auto inline-flex items-center gap-1.5 bg-ivory/90 hover:bg-ivory text-emerald-950 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] shadow-md transition-all border border-sand-300/80 active:scale-95"
            aria-label="Enlarge and inspect embroidery detail"
          >
            <ZoomIn size={13} className="text-emerald-800" />
            <span className="hidden sm:inline">Inspect Detail</span>
            <span className="sm:hidden">Zoom</span>
          </button>
        </div>

        {/* Gallery Next / Previous Arrows (if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-ivory/85 hover:bg-ivory text-emerald-950 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 border border-sand-300/70 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Previous view"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-ivory/85 hover:bg-ivory text-emerald-950 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 border border-sand-300/70 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Next view"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Artisan stamp overlay on primary view */}
        {activeIndex === 0 && artisanOverlay}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-16 sm:h-24 sm:w-20 shrink-0 overflow-hidden bg-sand-100 border transition-all duration-200 text-left",
                i === activeIndex
                  ? "border-emerald-800 ring-2 ring-emerald-800/20 shadow-md scale-[1.02]"
                  : "border-sand-300/80 opacity-70 hover:opacity-100 hover:border-sand-400",
              )}
              aria-label={`View angle ${i + 1}: ${img.alt || "garment angle"}`}
              aria-current={i === activeIndex}
            >
              <Image
                src={img.src}
                alt={img.alt || `Angle thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
              />
              <span className="absolute bottom-0 inset-x-0 bg-emerald-950/70 py-0.5 text-center text-[9px] font-sans font-medium text-sand-200 tracking-wider">
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Full-screen Atelier Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={images[lightbox].alt || "Begum Couture Inspection"}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-emerald-950/95 backdrop-blur-md p-4 sm:p-8"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            {/* Lightbox Header Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between text-ivory z-20 pb-2">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-sand-300">Begum Atelier Detail Inspection</span>
                <span className="text-xs text-sand-400/80 font-mono">
                  [{lightbox + 1} / {images.length}]
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="p-2 text-ivory/80 hover:text-ivory hover:bg-emerald-900/50 rounded-full transition-colors"
                aria-label="Close zoom inspection"
              >
                <X size={26} />
              </button>
            </div>

            {/* Lightbox Center Image Stage with Arrows */}
            <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto">
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
                  }}
                  className="absolute left-2 sm:left-4 z-30 w-12 h-12 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-sand-200 flex items-center justify-center shadow-2xl transition-all border border-sand-400/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.div
                key={images[lightbox].src}
                className="relative h-[70vh] sm:h-[78vh] w-full"
                initial={reducedMotion ? false : { scale: 0.96, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reducedMotion ? undefined : { scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt || "Enlarged embroidery inspection"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-2 sm:right-4 z-30 w-12 h-12 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-sand-200 flex items-center justify-center shadow-2xl transition-all border border-sand-400/30"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Lightbox Bottom Thumbnail Dock */}
            {images.length > 1 && (
              <div
                className="flex items-center gap-2.5 pt-3 z-20 overflow-x-auto max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, i) => (
                  <button
                    key={`lb-${img.src}-${i}`}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className={cn(
                      "relative h-14 w-12 sm:h-16 sm:w-14 shrink-0 overflow-hidden border transition-all",
                      i === lightbox
                        ? "border-sand-300 ring-2 ring-sand-300/40 opacity-100 scale-105"
                        : "border-emerald-800/60 opacity-50 hover:opacity-80",
                    )}
                    aria-label={`Switch to image ${i + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
