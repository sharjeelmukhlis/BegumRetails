"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  artisanOverlay?: ReactNode;
}

export function ProductGallery({ images, artisanOverlay }: ProductGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setLightbox(i)}
            className={cn(
              "group relative w-full overflow-hidden bg-sand-100 text-left",
              i === 0 ? "aspect-[4/5]" : "aspect-[4/5]",
            )}
            aria-label={`Enlarge image: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-ivory/90 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-emerald-900 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn size={12} /> Inspect
            </span>
            {i === 0 && artisanOverlay}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox != null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={images[lightbox].alt}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-emerald-950/92 p-4 md:p-10"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 text-ivory/80 hover:text-ivory"
              aria-label="Close zoom"
            >
              <X size={24} />
            </button>
            <motion.div
              className="relative h-full w-full max-w-4xl"
              initial={reducedMotion ? false : { scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox(i);
                    }}
                    className={cn(
                      "h-1.5 w-6 transition-colors",
                      i === lightbox ? "bg-sand-300" : "bg-ivory/30 hover:bg-ivory/50",
                    )}
                    aria-label={`Show image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
