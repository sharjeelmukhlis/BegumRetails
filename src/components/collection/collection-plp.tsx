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
      <header className="mb-6 md:mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">
          {eyebrow}
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
          {title}
        </h1>
        {description && (
          <p className="text-charcoal/60 mt-3 max-w-xl leading-relaxed">{description}</p>
        )}
      </header>

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
  let usedInsertIds = new Set<string>();

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
