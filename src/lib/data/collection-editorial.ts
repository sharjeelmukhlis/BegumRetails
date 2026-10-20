import type { Category, Occasion } from "@/lib/types";

export type EditorialInsertType = "shop-the-look" | "karigar" | "quote";

export type EditorialInsert = {
  id: string;
  /** Insert after this many products in the filtered result (0-based count). */
  afterCount: number;
  type: EditorialInsertType;
  /** Span: 1 = single cell, 2 = double-width on md+. */
  span?: 1 | 2;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
  /** Limit to these occasions; omit = all. */
  occasions?: Occasion[];
  /** Limit to these categories; omit = all. */
  categories?: Category[];
};

/**
 * Editorial breaks for collection grids configurable, not hardcoded in the component.
 * Positions are "after N products" so they adapt as filters change.
 */
export const collectionEditorialInserts: EditorialInsert[] = [
  {
    id: "baraat-karigar",
    afterCount: 4,
    type: "karigar",
    span: 2,
    title: "Meet Muhammad Ali",
    body: "Thirty-two years of zardozi and dabka in Lahore. Every Baraat piece that leaves his adda carries his name.",
    ctaLabel: "The Craft",
    ctaHref: "/the-craft#muhammad-ali",
    image: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Zardozi embroidery in progress",
    occasions: ["baraat"],
  },
  {
    id: "baraat-look",
    afterCount: 8,
    type: "shop-the-look",
    span: 2,
    title: "Shop the Baraat look",
    body: "Lehenga, jewellery, khussa curated as one entrance, not three afterthoughts.",
    ctaLabel: "Complete the Look",
    ctaHref: "/collections/complete-the-look",
    image: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Full bridal baraat look",
    occasions: ["baraat"],
  },
  {
    id: "mehndi-quote",
    afterCount: 4,
    type: "quote",
    span: 2,
    title: "Move first, pose second",
    body: "The mehndi is the night you dance. Choose weight you can forget by the second dhol.",
    ctaLabel: "Read the guide",
    ctaHref: "/journal/mehndi-dressing-guide",
    occasions: ["mehndi"],
  },
  {
    id: "nikkah-quote",
    afterCount: 4,
    type: "quote",
    span: 2,
    title: "The quietest night is often the most photographed",
    body: "Ivories, soft golds, restrained embroidery the register of the nikkah.",
    ctaLabel: "Shop Nikkah",
    ctaHref: "/collections/occasion/nikkah",
    occasions: ["nikkah"],
  },
  {
    id: "walima-look",
    afterCount: 4,
    type: "shop-the-look",
    span: 2,
    title: "Composure after the crescendo",
    body: "Champagnes, pastels, silver-toned work the walima closes the sequence with polish, not power.",
    ctaLabel: "Walima edit",
    ctaHref: "/collections/occasion/walima",
    image: "https://images.unsplash.com/photo-1695876722054-3307043651eb?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Walima reception bridal styling",
    occasions: ["walima"],
  },
  {
    id: "lehenga-craft",
    afterCount: 6,
    type: "karigar",
    span: 2,
    title: "Every lehenga, a named hand",
    body: "We do not sell anonymous embroidery. The karigar who stitched your piece is credited on the product and on The Craft.",
    ctaLabel: "Meet the hands",
    ctaHref: "/the-craft",
    image: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Karigar embroidery detail",
    categories: ["bridal-lehenga"],
  },
  {
    id: "all-collections-quote",
    afterCount: 8,
    type: "quote",
    span: 2,
    title: "Every bride, a Begum",
    body: "Clothes that state her dignity without her having to.",
    ctaLabel: "Brand Story",
    ctaHref: "/brand-story",
  },
];

export function getEditorialInsertsForScope(scope: {
  occasion?: Occasion | null;
  category?: Category | null;
}): EditorialInsert[] {
  return collectionEditorialInserts.filter((insert) => {
    if (insert.occasions && scope.occasion) {
      return insert.occasions.includes(scope.occasion);
    }
    if (insert.categories && scope.category) {
      return insert.categories.includes(scope.category);
    }
    // Global inserts (no occasion/category lock) show on /collections
    if (!insert.occasions && !insert.categories) return true;
    // On occasion pages, only occasion-scoped (or global) inserts
    if (scope.occasion) return !insert.categories || !insert.categories.length;
    if (scope.category) return !insert.occasions || !insert.occasions.length;
    return !insert.occasions && !insert.categories;
  });
}
