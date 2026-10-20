# Changing SEO

Begum uses Next.js built-in metadata API. No plugins needed.

---

## Where SEO Is Configured

| Scope | File | Method |
|-------|------|--------|
| Global defaults | `src/app/layout.tsx` | `export const metadata` |
| Static pages | Each page file | `export const metadata` |
| Dynamic pages | Each `[slug]/page.tsx` | `export async function generateMetadata()` |

---

## Global Metadata (Root Layout)

**File:** `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: {
    default: "Begum — Every Bride, a Begum",        // Homepage title
    template: "%s — Begum",                          // All other pages: "Page Name — Begum"
  },
  description: "Handcrafted Pakistani bridal wear and accessories by master karigars. "
    + "Shop lehengas, khussa, jewellery, and dupatta — each piece made to order.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};
```

### To change:
- **Site name suffix:** Edit the `template` string
- **Homepage title:** Edit the `default` string
- **Site description:** Edit the `description` string

---

## Static Pages

Add or edit `export const metadata` in the page file:

```typescript
// src/app/the-craft/page.tsx
export const metadata: Metadata = {
  title: "The Craft — Begum",
  description: "Meet the master karigars behind every hand-embroidered bridal piece.",
};
```

---

## Dynamic Pages (Products, Journal, Collections)

Each dynamic route exports `generateMetadata` that reads from data files:

### Product Pages (`/product/[slug]`)

```typescript
// src/app/product/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  return {
    title: `${product.name} — Begum`,
    description: product.tagline ?? product.description.slice(0, 160),
  };
}
```

**SEO fields on the product:**
- `tagline` — Used as meta description (recommended: 120-160 chars)
- `description` — Fallback if no tagline (auto-truncated to 160 chars)

### Journal Articles (`/journal/[slug]`)

```typescript
return {
  title: `${article.title} — Begum Journal`,
  description: article.excerpt,
};
```

**SEO field on articles:**
- `excerpt` — Used directly as meta description (keep under 160 chars)

### Collection Pages

```typescript
// Occasion
title: `${occasion.name} Collection — Begum`

// Category
title: `${category.name} — Begum`
```

---

## FAQ Structured Data (JSON-LD)

FAQ sections on product and article pages automatically generate `FAQPage` schema:

```typescript
import { FaqJsonLd, buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";

// In the component:
const faqs = resolveProductFaqs(product.id, product.category);
const jsonLd = buildFaqPageJsonLd(faqs);
// <FaqJsonLd data={jsonLd} />
```

**To modify:** The JSON-LD is generated automatically from the FAQ data in `faqs.ts`. Changes to FAQs automatically update the structured data.

---

## Quick SEO Checklist

- [ ] Every page has a unique `title` (appends " — Begum" automatically)
- [ ] Every page has a `description` under 160 characters
- [ ] All images have descriptive `alt` text
- [ ] Products have a `tagline` (used as meta description)
- [ ] Articles have an `excerpt` (used as meta description)
- [ ] FAQ content is up to date (feeds JSON-LD structured data)
- [ ] Run `npm run build` and check the route list is correct

---

## Common Changes

| Change | Where |
|--------|-------|
| Change site name from "Begum" | `layout.tsx` → `metadata.title.template` |
| Update homepage description | `layout.tsx` → `metadata.description` |
| Change a product's search snippet | Add/edit `tagline` in `products.ts` |
| Update an article's search snippet | Edit `excerpt` in `journal.ts` |
| Add FAQ structured data | Add FAQ entries in `faqs.ts` |
| Update favicon | Replace files in `public/` |
