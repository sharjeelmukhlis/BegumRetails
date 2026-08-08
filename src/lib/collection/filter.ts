import type { Category, Occasion, Product } from "@/lib/types";

/** Ready-to-ship threshold — matches PDP lead-time messaging. */
export const READY_SHIP_DAYS = 7;

export type AvailabilityFilter = "ready" | "made-to-order";

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export type CollectionFilters = {
  category?: Category | null;
  occasion?: Occasion | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  availability?: AvailabilityFilter | null;
  color?: string | null;
  fabric?: string | null;
  sort: SortOption;
};

export type CollectionSearchParams = Record<string, string | string[] | undefined>;

export function isReadyToShip(product: Product): boolean {
  return product.inStock && product.leadTimeDays <= READY_SHIP_DAYS;
}

export function parseCollectionFilters(
  params: CollectionSearchParams,
  defaults: Partial<CollectionFilters> = {},
): CollectionFilters {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const minRaw = get("min");
  const maxRaw = get("max");
  const sortRaw = get("sort") as SortOption | undefined;
  const avail = get("avail") as AvailabilityFilter | undefined;

  return {
    category: (get("category") as Category | undefined) ?? defaults.category ?? null,
    occasion: (get("occasion") as Occasion | undefined) ?? defaults.occasion ?? null,
    minPrice: minRaw != null && minRaw !== "" ? Number(minRaw) : defaults.minPrice ?? null,
    maxPrice: maxRaw != null && maxRaw !== "" ? Number(maxRaw) : defaults.maxPrice ?? null,
    availability: avail ?? defaults.availability ?? null,
    color: get("color") ?? defaults.color ?? null,
    fabric: get("fabric") ?? defaults.fabric ?? null,
    sort: sortRaw && ["newest", "price-asc", "price-desc", "popular"].includes(sortRaw)
      ? sortRaw
      : defaults.sort ?? "newest",
  };
}

export function filtersToSearchParams(
  filters: CollectionFilters,
  locked: { category?: boolean; occasion?: boolean } = {},
): URLSearchParams {
  const sp = new URLSearchParams();
  if (filters.category && !locked.category) sp.set("category", filters.category);
  if (filters.occasion && !locked.occasion) sp.set("occasion", filters.occasion);
  if (filters.minPrice != null) sp.set("min", String(filters.minPrice));
  if (filters.maxPrice != null) sp.set("max", String(filters.maxPrice));
  if (filters.availability) sp.set("avail", filters.availability);
  if (filters.color) sp.set("color", filters.color);
  if (filters.fabric) sp.set("fabric", filters.fabric);
  if (filters.sort && filters.sort !== "newest") sp.set("sort", filters.sort);
  return sp;
}

export function applyCollectionFilters(
  products: Product[],
  filters: CollectionFilters,
): Product[] {
  let list = products.slice();

  if (filters.category) {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.occasion) {
    list = list.filter((p) => p.occasion.includes(filters.occasion!));
  }
  if (filters.minPrice != null && !Number.isNaN(filters.minPrice)) {
    list = list.filter((p) => p.basePrice >= filters.minPrice!);
  }
  if (filters.maxPrice != null && !Number.isNaN(filters.maxPrice)) {
    list = list.filter((p) => p.basePrice <= filters.maxPrice!);
  }
  if (filters.availability === "ready") {
    list = list.filter(isReadyToShip);
  } else if (filters.availability === "made-to-order") {
    list = list.filter((p) => !isReadyToShip(p));
  }
  if (filters.color) {
    list = list.filter(
      (p) => p.color?.toLowerCase() === filters.color!.toLowerCase(),
    );
  }
  if (filters.fabric) {
    list = list.filter(
      (p) => p.fabric?.toLowerCase() === filters.fabric!.toLowerCase(),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-desc":
      list.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "popular":
      list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      break;
    case "newest":
    default:
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
  }

  return list;
}

export function collectFilterOptions(products: Product[]) {
  const colors = new Map<string, string>();
  const fabrics = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const p of products) {
    if (p.color && p.colorHex) colors.set(p.color, p.colorHex);
    else if (p.color) colors.set(p.color, "#C9975A");
    if (p.fabric) fabrics.add(p.fabric);
    minPrice = Math.min(minPrice, p.basePrice);
    maxPrice = Math.max(maxPrice, p.basePrice);
  }

  return {
    colors: [...colors.entries()]
      .map(([name, hex]) => ({ name, hex }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    fabrics: [...fabrics].sort(),
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice,
  };
}

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  popular: "Most Popular",
};
