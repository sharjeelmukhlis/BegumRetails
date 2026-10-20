"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, SlidersHorizontal, X } from "lucide-react";
import type { Category, Occasion, Product } from "@/lib/types";
import { categories, occasions } from "@/lib/data/products";
import {
  type AvailabilityFilter,
  type CollectionFilters,
  type SortOption,
  SORT_LABELS,
  collectFilterOptions,
} from "@/lib/collection/filter";
import { formatPrice, cn } from "@/lib/utils";

interface CollectionFiltersBarProps {
  products: Product[];
  filters: CollectionFilters;
  onChange: (next: CollectionFilters) => void;
  /** Lock occasion/category when already on a scoped route. */
  lockOccasion?: boolean;
  lockCategory?: boolean;
  resultCount: number;
}

export function CollectionFiltersBar({
  products,
  filters,
  onChange,
  lockOccasion,
  lockCategory,
  resultCount,
}: CollectionFiltersBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const options = useMemo(() => collectFilterOptions(products), [products]);
  const reducedMotion = useReducedMotion();

  const set = (patch: Partial<CollectionFilters>) =>
    onChange({ ...filters, ...patch });

  const activeChips = buildActiveChips(filters, { lockOccasion, lockCategory });

  return (
    <div className="relative">
      {/* Soft ivory divider under header */}
      <div className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />

      {/* Desktop filter bar */}
      <div className="hidden lg:block pt-5 pb-2">
        {/* Quick Filter Presets */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-sand-300/40 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase tracking-[0.2em] text-sand-800 font-semibold shrink-0">
            Quick Filter:
          </span>
          <button
            type="button"
            onClick={() => set({ availability: filters.availability === "ready" ? null : "ready" })}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-all text-[11px] shrink-0",
              filters.availability === "ready"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
                : "border-sand-300/80 bg-white/60 text-charcoal/70 hover:border-sand-400"
            )}
          >
            ⚡ Ready to Ship
          </button>
          <button
            type="button"
            onClick={() => set({ maxPrice: filters.maxPrice === 250000 ? null : 250000 })}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-all text-[11px] shrink-0",
              filters.maxPrice === 250000
                ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
                : "border-sand-300/80 bg-white/60 text-charcoal/70 hover:border-sand-400"
            )}
          >
            Under PKR 250k
          </button>
          <button
            type="button"
            onClick={() => set({ sort: filters.sort === "price-asc" ? "newest" : "price-asc" })}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-all text-[11px] shrink-0",
              filters.sort === "price-asc"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
                : "border-sand-300/80 bg-white/60 text-charcoal/70 hover:border-sand-400"
            )}
          >
            Price: Low to High
          </button>
          <button
            type="button"
            onClick={() => set({ sort: filters.sort === "price-desc" ? "newest" : "price-desc" })}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-all text-[11px] shrink-0",
              filters.sort === "price-desc"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
                : "border-sand-300/80 bg-white/60 text-charcoal/70 hover:border-sand-400"
            )}
          >
            Price: High to Low
          </button>
        </div>

        <div className="flex items-end justify-between gap-6 mb-4">
          <p className="text-xs text-charcoal/50">
            <span className="font-medium text-emerald-900">{resultCount}</span>
            {resultCount === 1 ? " piece" : " pieces"}
          </p>
          <label className="flex items-center gap-2 text-xs text-charcoal/55">
            Sort
            <select
              value={filters.sort}
              onChange={(e) => set({ sort: e.target.value as SortOption })}
              className="border border-sand-300/70 bg-ivory px-3 py-2 text-xs text-emerald-900 focus:outline-none focus:border-emerald-800"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {!lockCategory && (
          <FilterRow label="Category">
            <FilterPill
              active={!filters.category}
              onClick={() => set({ category: null })}
            >
              All
            </FilterPill>
            {categories.map((c) => (
              <FilterPill
                key={c.slug}
                active={filters.category === c.slug}
                onClick={() =>
                  set({
                    category: filters.category === c.slug ? null : (c.slug as Category),
                  })
                }
              >
                {c.name}
              </FilterPill>
            ))}
          </FilterRow>
        )}

        {!lockOccasion && (
          <FilterRow label="Occasion">
            <FilterPill
              active={!filters.occasion}
              onClick={() => set({ occasion: null })}
            >
              All
            </FilterPill>
            {occasions.map((o) => (
              <FilterPill
                key={o.slug}
                active={filters.occasion === o.slug}
                onClick={() =>
                  set({
                    occasion:
                      filters.occasion === o.slug ? null : (o.slug as Occasion),
                  })
                }
              >
                {o.name}
              </FilterPill>
            ))}
          </FilterRow>
        )}

        <div className="grid grid-cols-3 gap-8 mt-2">
          <FilterRow label="Availability">
            {(
              [
                { id: null, label: "Any" },
                { id: "ready" as const, label: "Ready to Ship" },
                { id: "made-to-order" as const, label: "Made to Order" },
              ] as { id: AvailabilityFilter | null; label: string }[]
            ).map((a) => (
              <FilterPill
                key={a.label}
                active={filters.availability === a.id || (!filters.availability && a.id === null)}
                onClick={() => set({ availability: a.id })}
              >
                {a.label}
              </FilterPill>
            ))}
          </FilterRow>

          <FilterRow label="Colour">
            <FilterPill active={!filters.color} onClick={() => set({ color: null })}>
              All
            </FilterPill>
            {options.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() =>
                  set({ color: filters.color === c.name ? null : c.name })
                }
                title={c.name}
                aria-label={c.name}
                aria-pressed={filters.color === c.name}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-transform",
                  filters.color === c.name
                    ? "border-emerald-800 scale-110"
                    : "border-sand-300/80 hover:scale-105",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </FilterRow>

          <FilterRow label="Fabric">
            <FilterPill active={!filters.fabric} onClick={() => set({ fabric: null })}>
              All
            </FilterPill>
            {options.fabrics.map((f) => (
              <FilterPill
                key={f}
                active={filters.fabric === f}
                onClick={() => set({ fabric: filters.fabric === f ? null : f })}
              >
                {f}
              </FilterPill>
            ))}
          </FilterRow>
        </div>

        <PriceRange
          minBound={options.minPrice}
          maxBound={options.maxPrice}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={(minPrice, maxPrice) => set({ minPrice, maxPrice })}
        />
      </div>

      {/* Mobile Quick Filter Presets */}
      <div className="flex lg:hidden items-center gap-1.5 pt-3 pb-1 overflow-x-auto no-scrollbar -mx-1 px-1">
        <button
          type="button"
          onClick={() => set({ availability: filters.availability === "ready" ? null : "ready" })}
          className={cn(
            "px-2.5 py-1 text-[10px] rounded-full border transition-all shrink-0",
            filters.availability === "ready"
              ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
              : "border-sand-300/80 bg-white/70 text-charcoal/70"
          )}
        >
          ⚡ Ready to Ship
        </button>
        <button
          type="button"
          onClick={() => set({ maxPrice: filters.maxPrice === 250000 ? null : 250000 })}
          className={cn(
            "px-2.5 py-1 text-[10px] rounded-full border transition-all shrink-0",
            filters.maxPrice === 250000
              ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
              : "border-sand-300/80 bg-white/70 text-charcoal/70"
          )}
        >
          Under PKR 250k
        </button>
        <button
          type="button"
          onClick={() => set({ sort: filters.sort === "price-asc" ? "newest" : "price-asc" })}
          className={cn(
            "px-2.5 py-1 text-[10px] rounded-full border transition-all shrink-0",
            filters.sort === "price-asc"
              ? "bg-emerald-950 text-sand-200 border-emerald-950 font-medium"
              : "border-sand-300/80 bg-white/70 text-charcoal/70"
          )}
        >
          Price: Low
        </button>
      </div>

      {/* Mobile: single Filter & Sort button */}
      <div className="flex lg:hidden items-center justify-between gap-3 pt-2 pb-2">
        <p className="text-xs text-charcoal/50">
          <span className="font-medium text-emerald-900">{resultCount}</span>
          {resultCount === 1 ? " piece" : " pieces"}
        </p>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 border border-sand-300/70 bg-ivory px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-emerald-900"
        >
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          Filter & Sort
          {activeChips.length > 0 && (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center bg-emerald-800 px-1.5 text-[10px] text-ivory">
              {activeChips.length}
            </span>
          )}
        </button>
      </div>

      {/* Active chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-3 pb-1">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onChange({ ...filters, ...chip.clear })}
              className="inline-flex items-center gap-1.5 border border-sand-300/70 bg-sand-50/80 px-2.5 py-1 text-[11px] text-charcoal/70 hover:border-emerald-800/40 transition-colors"
            >
              {chip.label}
              <X size={12} strokeWidth={1.5} />
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...filters,
                category: lockCategory ? filters.category : null,
                occasion: lockOccasion ? filters.occasion : null,
                minPrice: null,
                maxPrice: null,
                availability: null,
                color: null,
                fabric: null,
                sort: "newest",
              })
            }
            className="text-[11px] uppercase tracking-[0.14em] text-emerald-800 underline underline-offset-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-emerald-950/50"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filter and sort"
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-ivory rounded-t-lg p-6 pb-10"
              initial={reducedMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reducedMotion ? undefined : { y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="font-display text-xl text-emerald-900">Filter & Sort</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                  className="p-2 text-charcoal/50"
                >
                  <X size={20} />
                </button>
              </div>

              <label className="block text-[10px] uppercase tracking-[0.2em] text-sand-700 mb-2">
                Sort
              </label>
              <select
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value as SortOption })}
                className="mb-5 w-full border border-sand-300/70 bg-ivory px-3 py-3 text-sm text-emerald-900"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>

              {!lockCategory && (
                <MobileSection title="Category">
                  <div className="flex flex-wrap gap-2">
                    <FilterPill active={!filters.category} onClick={() => set({ category: null })}>
                      All
                    </FilterPill>
                    {categories.map((c) => (
                      <FilterPill
                        key={c.slug}
                        active={filters.category === c.slug}
                        onClick={() =>
                          set({
                            category:
                              filters.category === c.slug
                                ? null
                                : (c.slug as Category),
                          })
                        }
                      >
                        {c.name}
                      </FilterPill>
                    ))}
                  </div>
                </MobileSection>
              )}

              {!lockOccasion && (
                <MobileSection title="Occasion">
                  <div className="flex flex-wrap gap-2">
                    <FilterPill active={!filters.occasion} onClick={() => set({ occasion: null })}>
                      All
                    </FilterPill>
                    {occasions.map((o) => (
                      <FilterPill
                        key={o.slug}
                        active={filters.occasion === o.slug}
                        onClick={() =>
                          set({
                            occasion:
                              filters.occasion === o.slug
                                ? null
                                : (o.slug as Occasion),
                          })
                        }
                      >
                        {o.name}
                      </FilterPill>
                    ))}
                  </div>
                </MobileSection>
              )}

              <MobileSection title="Availability">
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: null, label: "Any" },
                      { id: "ready" as const, label: "Ready to Ship" },
                      { id: "made-to-order" as const, label: "Made to Order" },
                    ] as { id: AvailabilityFilter | null; label: string }[]
                  ).map((a) => (
                    <FilterPill
                      key={a.label}
                      active={
                        filters.availability === a.id ||
                        (!filters.availability && a.id === null)
                      }
                      onClick={() => set({ availability: a.id })}
                    >
                      {a.label}
                    </FilterPill>
                  ))}
                </div>
              </MobileSection>

              <MobileSection title="Colour">
                <div className="flex flex-wrap gap-2.5">
                  {options.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() =>
                        set({ color: filters.color === c.name ? null : c.name })
                      }
                      className={cn(
                        "h-8 w-8 rounded-full border-2",
                        filters.color === c.name
                          ? "border-emerald-800"
                          : "border-sand-300",
                      )}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </MobileSection>

              <MobileSection title="Fabric">
                <div className="flex flex-wrap gap-2">
                  {options.fabrics.map((f) => (
                    <FilterPill
                      key={f}
                      active={filters.fabric === f}
                      onClick={() =>
                        set({ fabric: filters.fabric === f ? null : f })
                      }
                    >
                      {f}
                    </FilterPill>
                  ))}
                </div>
              </MobileSection>

              <MobileSection title="Price">
                <PriceRange
                  minBound={options.minPrice}
                  maxBound={options.maxPrice}
                  minPrice={filters.minPrice}
                  maxPrice={filters.maxPrice}
                  onChange={(minPrice, maxPrice) => set({ minPrice, maxPrice })}
                />
              </MobileSection>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="mt-4 w-full bg-emerald-800 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory"
              >
                Show {resultCount} {resultCount === 1 ? "piece" : "pieces"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-sand-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2 items-center">{children}</div>
    </div>
  );
}

function MobileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-t border-sand-300/50 pt-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-sand-700 mb-3">{title}</p>
      {children}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "snap-start flex-shrink-0 px-3.5 py-1.5 text-xs border transition-colors duration-300",
        active
          ? "bg-emerald-800 text-sand-100 border-emerald-800"
          : "bg-ivory text-emerald-900 border-sand-300/80 hover:border-emerald-800/40",
      )}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

function PriceRange({
  minBound,
  maxBound,
  minPrice,
  maxPrice,
  onChange,
}: {
  minBound: number;
  maxBound: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  onChange: (min: number | null, max: number | null) => void;
}) {
  const [localMin, setLocalMin] = useState(String(minPrice ?? ""));
  const [localMax, setLocalMax] = useState(String(maxPrice ?? ""));

  useEffect(() => {
    setLocalMin(minPrice != null ? String(minPrice) : "");
    setLocalMax(maxPrice != null ? String(maxPrice) : "");
  }, [minPrice, maxPrice]);

  const commit = () => {
    const min = localMin === "" ? null : Number(localMin);
    const max = localMax === "" ? null : Number(localMax);
    onChange(
      min != null && !Number.isNaN(min) ? min : null,
      max != null && !Number.isNaN(max) ? max : null,
    );
  };

  return (
    <div className="mt-1 mb-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-sand-700 mb-2 lg:mb-2">
        Price{" "}
        <span className="normal-case tracking-normal text-charcoal/40">
          ({formatPrice(minBound)} – {formatPrice(maxBound)})
        </span>
      </p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          placeholder="Min"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="w-full max-w-[140px] border border-sand-300/70 bg-ivory px-3 py-2 text-xs text-emerald-900 focus:outline-none focus:border-emerald-800"
        />
        <span className="text-charcoal/30 text-xs">to</span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Max"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="w-full max-w-[140px] border border-sand-300/70 bg-ivory px-3 py-2 text-xs text-emerald-900 focus:outline-none focus:border-emerald-800"
        />
      </div>
    </div>
  );
}

function buildActiveChips(
  filters: CollectionFilters,
  locks: { lockOccasion?: boolean; lockCategory?: boolean },
) {
  const chips: { key: string; label: string; clear: Partial<CollectionFilters> }[] = [];

  if (filters.category && !locks.lockCategory) {
    const name = categories.find((c) => c.slug === filters.category)?.name;
    chips.push({
      key: "category",
      label: name ?? filters.category,
      clear: { category: null },
    });
  }
  if (filters.occasion && !locks.lockOccasion) {
    const name = occasions.find((o) => o.slug === filters.occasion)?.name;
    chips.push({
      key: "occasion",
      label: name ?? filters.occasion,
      clear: { occasion: null },
    });
  }
  if (filters.availability === "ready") {
    chips.push({
      key: "avail",
      label: "Ready to Ship",
      clear: { availability: null },
    });
  }
  if (filters.availability === "made-to-order") {
    chips.push({
      key: "avail",
      label: "Made to Order",
      clear: { availability: null },
    });
  }
  if (filters.color) {
    chips.push({
      key: "color",
      label: filters.color,
      clear: { color: null },
    });
  }
  if (filters.fabric) {
    chips.push({
      key: "fabric",
      label: filters.fabric,
      clear: { fabric: null },
    });
  }
  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice != null ? formatPrice(filters.minPrice) : "…";
    const max = filters.maxPrice != null ? formatPrice(filters.maxPrice) : "…";
    chips.push({
      key: "price",
      label: `${min} – ${max}`,
      clear: { minPrice: null, maxPrice: null },
    });
  }
  if (filters.sort !== "newest") {
    chips.push({
      key: "sort",
      label: SORT_LABELS[filters.sort],
      clear: { sort: "newest" },
    });
  }

  return chips;
}

export function CollectionEmptyState() {
  return (
    <div className="py-20 md:py-28 text-center max-w-lg mx-auto">
      <p className="font-display text-2xl md:text-3xl text-emerald-900 leading-snug">
        Nothing quite matches yet
      </p>
      <p className="mt-3 text-sm text-charcoal/60 leading-relaxed">
        Try adjusting your filters, or let us help you find it a real person, not a chatbot.
      </p>
      <a
        href="https://wa.me/923209988777?text=Hi%20Begum%20%E2%80%94%20I%20was%20browsing%20the%20collections%20and%20couldn%27t%20find%20quite%20what%20I%20need."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-800 hover:text-emerald-600 transition-colors"
      >
        <MessageCircle size={18} />
        Ask us on WhatsApp
      </a>
    </div>
  );
}
