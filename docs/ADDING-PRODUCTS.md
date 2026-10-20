# Adding a Product

**Files involved:**

| Step | File | Purpose |
|------|------|---------|
| 1 | `src/lib/data/products.ts` | Product data object |
| 2 | `src/lib/data/faqs.ts` | Product-specific FAQs (optional) |
| 3 | `src/lib/data/collection-editorial.ts` | Editorial grid inserts (optional) |
| 4 | — | Run `npm run build` |

---

## Step 1: Add the Product Object

Open `src/lib/data/products.ts` and add a new object to the `products` array.

### Required Fields

```typescript
{
  id: "bl-025",                          // Unique ID: category-prefix + number
  slug: "my-new-lehenga",               // URL: /product/my-new-lehenga
  name: "My New Lehenga",
  description: "Full product description for the PDP.",
  category: "bridal-lehenga",           // See categories below
  occasion: ["baraat"],                 // "mehndi" | "nikkah" | "baraat" | "walima"
  images: [
    { src: img("https://images.unsplash.com/photo-XXXXX"), alt: "Description" },
  ],
  basePrice: 185000,                    // Price in PKR
  currency: "PKR",                      // "PKR" | "GBP" | "USD" | "CAD" | "AUD"
  tier: "bridal",                       // "entry" | "mid" | "bridal" | "couture"
  inStock: true,
  customizable: true,
  leadTimeDays: 90,
}
```

### Full Interface

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;              // Used as meta description (falls back to description)
  description: string;
  category: Category;            // See category list below
  occasion: Occasion[];          // One or more of: mehndi, nikkah, baraat, walima
  garmentType?: GarmentType;
  images: ProductImage[];        // Array of { src, alt, width?, height? }
  basePrice: number;
  currency: Currency;
  tier: SizeTier;                // entry | mid | bridal | couture
  artisan?: ArtisanCredit;       // { name, city, technique, yearsExperience? }
  inStock: boolean;
  customizable: boolean;
  leadTimeDays: number;
  sizes?: string[];
  featured?: boolean;
  bundleItems?: string[];        // Product IDs for "Complete the Look"
  color?: string;
  colorHex?: string;
  fabric?: string;
  popularity?: number;
  createdAt: Date;
}
```

### Available Categories

```
bridal-lehenga  |  bridal-dupatta       |  bridal-purse-potli
bridal-clutch   |  bridal-shoes-khussa  |  bridal-jewellery-sets
bridal-bangles  |  kalire               |  matha-patti
jhumar-passa    |  nath                 |  payal
kamarband       |  hair-accessories
```

### Product Image Helper

```typescript
import { img } from "./products";  // Helper is already defined at top of file

images: [
  { src: img("https://images.unsplash.com/photo-XXXXXXXXX"), alt: "Front view" },
  { src: img("https://images.unsplash.com/photo-YYYYYYYYY"), alt: "Detail of embroidery" },
],
```

The `img()` function appends `?auto=format&fit=crop&w=1200&q=85` automatically.

---

## Step 2: Add Product-Specific FAQs (Optional)

**File:** `src/lib/data/faqs.ts`

Add to the `productFAQSets` array:

```typescript
{
  productId: "bl-025",            // Must match product.id
  productSpecific: [
    {
      id: "bl-025-neckline",
      question: "Can the neckline be adjusted?",
      answer:
        "Yes on a custom order. The ready piece ships with the neckline shown. Choose **Customise** or message us before payment.",
      order: 10,
    },
  ],
},
```

---

## Step 3: Add Editorial Inserts (Optional)

**File:** `src/lib/data/collection-editorial.ts`

To feature the product in collection grid interleaving, add entries to the `editorialInserts` array.

---

## Step 4: Build

```bash
npm run build
```

The new product page will be generated at `/product/[slug]` automatically.

---

## Checklist

- [ ] Unique `id` following the prefix convention
- [ ] At least one image (Unsplash URL)
- [ ] Valid `category` from the list above
- [ ] `occasion` array has at least one value
- [ ] `leadTimeDays` is realistic (30-180 for bridal)
- [ ] `basePrice` is in the correct `currency`
- [ ] Build passes without errors
