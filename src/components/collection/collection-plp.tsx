"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Category, Occasion, Product } from "@/lib/types";
import type { EditorialInsert } from "@/lib/data/collection-editorial";
import { getEditorialInsertsForScope } from "@/lib/data/collection-editorial";
import {
  type CollectionFilters,
  applyCollectionFilters,
  filtersToSearchParams,
  parseCollectionFilters,
} from "@/lib/collection/filter";
import { ProductCard } from "@/components/product/product-card";
import { EditorialInsertCard } from "@/components/collection/editorial-insert";
import {
  CollectionEmptyState,
  CollectionFiltersBar,
} from "@/components/collection/collection-filters";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { categories, occasions } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

type GridItem =
  | { kind: "product"; product: Product; index: number }
  | { kind: "editorial"; insert: EditorialInsert };

interface CollectionPLPProps {
  products: Product[];
  title: string;
  description?: string;
  eyebrow?: string;
  /** Pre-scoped occasion (locks that filter). */
  lockedOccasion?: Occasion | null;
  /** Pre-scoped category (locks that filter). */
  lockedCategory?: Category | null;
  /** Initial URL search params from the server. */
  initialParams?: Record<string, string | string[] | undefined>;
}

export function CollectionPLP({
  products,
  title,
  description,
  eyebrow = "Collection",
  lockedOccasion = null,
  lockedCategory = null,
  initialParams = {},
}: CollectionPLPProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<CollectionFilters>(() =>
    parseCollectionFilters(initialParams, {
      occasion: lockedOccasion,
      category: lockedCategory,
      sort: "newest",
    }),
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mobileDensity, setMobileDensity] = useState<"comfortable" | "dense">(
    "dense",
  );

  const syncUrl = useCallback(
    (next: CollectionFilters) => {
      const sp = filtersToSearchParams(next, {
        occasion: Boolean(lockedOccasion),
        category: Boolean(lockedCategory),
      });
      const qs = sp.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [lockedCategory, lockedOccasion, pathname, router],
  );

  const handleFiltersChange = (next: CollectionFilters) => {
    const merged: CollectionFilters = {
      ...next,
      occasion: lockedOccasion ?? next.occasion,
      category: lockedCategory ?? next.category,
    };
    setFilters(merged);
    setVisible(PAGE_SIZE);
    syncUrl(merged);
  };

  const filtered = useMemo(
    () => applyCollectionFilters(products, filters),
    [products, filters],
  );

  const inserts = useMemo(
    () =>
      getEditorialInsertsForScope({
        occasion: lockedOccasion ?? filters.occasion,
        category: lockedCategory ?? filters.category,
      }),
    [lockedOccasion, lockedCategory, filters.occasion, filters.category],
  );

  const pageProducts = filtered.slice(0, visible);
  const gridItems = useMemo(
    () => interleaveEditorial(pageProducts, inserts),
    [pageProducts, inserts],
  );

  return (
    <div>
      {/* ── Collection Header ── */}
      <header className="mb-6 md:mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-[0.24em] text-sand-800 font-semibold">
            {eyebrow}
          </span>
          <span className="text-[10px] bg-sand-200/60 text-emerald-950 px-2 py-0.5 rounded-full font-mono">
            {filtered.length} {filtered.length === 1 ? "design" : "designs"}
          </span>
        </div>
        <h1 className="font-display text-[clamp(2.1rem,5vw,3.8rem)] text-emerald-950 leading-[0.98]">
          {title}
        </h1>
        {description && (
          <p className="text-charcoal/70 mt-3 max-w-2xl leading-relaxed text-sm md:text-base font-light">
            {description}
          </p>
        )}
      </header>

      {/* ── Visual Occasion Mood Galleries (Only when occasion is not locked) ── */}
      {!lockedOccasion && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-sand-800 font-semibold flex items-center gap-1.5">
              <Sparkles size={11} className="text-sand-600" />
              <span>Browse by Wedding Occasion</span>
            </span>
            {filters.occasion && (
              <button
                type="button"
                onClick={() => handleFiltersChange({ ...filters, occasion: null })}
                className="text-[11px] text-emerald-900 underline hover:text-emerald-700"
              >
                Clear occasion filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {occasions.map((occ) => {
              const isSelected = filters.occasion === occ.slug;
              const count = products.filter((p) => p.occasion.includes(occ.slug)).length;
              return (
                <button
                  key={occ.slug}
                  type="button"
                  onClick={() =>
                    handleFiltersChange({
                      ...filters,
                      occasion: isSelected ? null : occ.slug,
                    })
                  }
                  className={cn(
                    "group relative overflow-hidden rounded-xs border text-left transition-all duration-300 aspect-[16/10] sm:aspect-[16/9] flex flex-col justify-end p-3 select-none active:scale-98",
                    isSelected
                      ? "border-emerald-950 ring-2 ring-emerald-950 shadow-md"
                      : "border-sand-300/60 hover:border-sand-400 hover:shadow-xs"
                  )}
                >
                  <Image
                    src={occ.image}
                    alt={occ.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      isSelected ? "opacity-45" : "opacity-30 group-hover:opacity-40"
                    )}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/45 to-transparent" />
                  <div className="relative z-10 text-ivory">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm sm:text-base font-bold text-ivory group-hover:text-sand-200 transition-colors">
                        {occ.name}
                      </span>
                      <span className="text-[10px] text-sand-300/90 font-mono">
                        {count}
                      </span>
                    </div>
                    <p className="text-[10px] text-sand-100/75 line-clamp-1 mt-0.5 font-light">
                      {occ.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 w-2 h-2 rounded-full bg-sand-300 ring-2 ring-emerald-950 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Top Category Quick Discovery Pills (Only when category is not locked) ── */}
      {!lockedCategory && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-6 -mx-1 px-1">
          <button
            type="button"
            onClick={() => handleFiltersChange({ ...filters, category: null })}
            className={cn(
              "shrink-0 px-3 py-1.5 text-xs rounded-full border transition-all duration-200 uppercase tracking-wider text-[10px] font-medium",
              !filters.category
                ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-2xs"
                : "border-sand-300/80 bg-white/70 text-charcoal/70 hover:border-sand-400"
            )}
          >
            All Categories ({products.length})
          </button>
          {categories.slice(0, 7).map((cat) => {
            const isSelected = filters.category === cat.slug;
            const count = products.filter((p) => p.category === cat.slug).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() =>
                  handleFiltersChange({
                    ...filters,
                    category: isSelected ? null : (cat.slug as Category),
                  })
                }
                className={cn(
                  "shrink-0 px-3 py-1.5 text-xs rounded-full border transition-all duration-200 tracking-wider text-[10px] font-medium",
                  isSelected
                    ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-2xs"
                    : "border-sand-300/80 bg-white/70 text-charcoal/70 hover:border-sand-400"
                )}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      <CollectionFiltersBar
        products={products}
        filters={filters}
        onChange={handleFiltersChange}
        lockOccasion={Boolean(lockedOccasion)}
        lockCategory={Boolean(lockedCategory)}
        resultCount={filtered.length}
      />

      {/* Mobile density toggle */}
      <div className="flex md:hidden items-center justify-end gap-2 mt-3 mb-1">
        <span className="text-[10px] uppercase tracking-[0.16em] text-charcoal/40">
          View
        </span>
        <button
          type="button"
          onClick={() => setMobileDensity("comfortable")}
          className={cn(
            "px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] border",
            mobileDensity === "comfortable"
              ? "border-emerald-800 bg-emerald-800 text-ivory"
              : "border-sand-300 text-charcoal/50",
          )}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => setMobileDensity("dense")}
          className={cn(
            "px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] border",
            mobileDensity === "dense"
              ? "border-emerald-800 bg-emerald-800 text-ivory"
              : "border-sand-300 text-charcoal/50",
          )}
        >
          2
        </button>
      </div>

      {filtered.length === 0 ? (
        <CollectionEmptyState />
      ) : (
        <>
          <div
            className={cn(
              "mt-6 grid gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10",
              mobileDensity === "comfortable"
                ? "grid-cols-1"
                : "grid-cols-2",
              "md:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {gridItems.map((item) =>
              item.kind === "product" ? (
                <ProductCard
                  key={item.product.id}
                  product={item.product}
                  index={item.index}
                />
              ) : (
                <EditorialInsertCard key={item.insert.id} insert={item.insert} />
              ),
            )}
          </div>

          {visible < filtered.length && (
            <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
              <p className="text-xs text-charcoal/50">
                Showing {Math.min(visible, filtered.length)} of {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="border border-emerald-800 bg-ivory px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-emerald-900 hover:bg-emerald-800 hover:text-ivory transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function interleaveEditorial(
  products: Product[],
  inserts: EditorialInsert[],
): GridItem[] {
  const sorted = [...inserts].sort((a, b) => a.afterCount - b.afterCount);
  const items: GridItem[] = [];
  let insertPtr = 0;
  const usedInsertIds = new Set<string>();

  products.forEach((product, index) => {
    items.push({ kind: "product", product, index });
    const count = index + 1;
    while (
      insertPtr < sorted.length &&
      sorted[insertPtr].afterCount === count &&
      !usedInsertIds.has(sorted[insertPtr].id)
    ) {
      usedInsertIds.add(sorted[insertPtr].id);
      items.push({ kind: "editorial", insert: sorted[insertPtr] });
      insertPtr += 1;
    }
  });

  return items;
}
