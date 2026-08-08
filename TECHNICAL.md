# Begum — Technical Architecture

**Stack:** Next.js 16.2.10 · React 19.2.4 · TypeScript 5 · Tailwind CSS 4 · GSAP 3 · Zustand 5 · Lenis

**Site:** [bagum.com](https://bagum.com)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Data Layer (No CMS/DB)](#data-layer)
3. [Routing](#routing)
4. [State Management](#state-management)
5. [Styling & Animations](#styling--animations)
6. [Forms & Communication](#forms--communication)
7. [SEO & Structured Data](#seo--structured-data)
8. [Analytics](#analytics)
9. [Build & Deployment](#build--deployment)

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── journal/                  #   /journal, /journal/[slug]
│   ├── product/                  #   /product/[slug]
│   ├── collections/              #   /collections, occasion, category
│   ├── special-offer/            #   /special-offer, /special-offer/[slug]
│   ├── customize/                #   /customize, /customize/consultation, /customize/share
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── globals.css               # Tailwind v4 tokens, keyframes
│   └── ...                       # Static pages: about, contact, cart, checkout, etc.
├── components/
│   ├── home/                     # 12 homepage section components
│   ├── layout/                   # Header, Footer, CartSidebar, WhatsAppButton
│   ├── collection/               # PLP grid, filters, editorial inserts
│   ├── product/                  # ProductCard, ProductGallery, AddToCart
│   ├── customize/                # Customizer step components
│   ├── shared/                   # Reveal, FAQSection, PageShell, Logo, ParallaxLayer, etc.
│   ├── ui/                       # Container, Button, Badge, Card
│   ├── forms/                    # Consultation, Contact, Newsletter forms
│   ├── providers/                # SmoothScroll (Lenis)
│   └── analytics/                # Google Analytics, Microsoft Clarity
├── hooks/
│   ├── use-prefers-reduced-motion.ts
│   └── use-web3form.ts
└── lib/
    ├── data/                     # All content files (see below)
    ├── store/                    # Zustand stores (cart, wishlist, customizer)
    ├── customize/                # Schema, price engine, fit checks, measurement guides
    ├── types/                    # Shared TypeScript interfaces
    ├── seo/                      # FAQ JSON-LD helper
    ├── utils.ts                  # cn(), formatPrice(), slugify()
    ├── web3forms.ts              # Web3Forms API client
    └── whatsapp.ts               # WhatsApp message builders
```

---

## Data Layer

**There is no CMS, database, or API.** All content is hardcoded in TypeScript arrays under `src/lib/data/`. The site is fully statically generated at build time.

### Data Files

| File | Contents | Used By |
|------|----------|---------|
| `products.ts` | Product catalog (24 products), helper functions | PDP, PLP, search, cart |
| `journal.ts` | Journal articles (7 articles), categories | `/journal`, `/journal/[slug]` |
| `content.ts` | Brand values, timeline milestones, karigars, craft techniques | Brand pages |
| `offers.ts` | Special offers (3 offers) | `/special-offer`, `/[slug]` |
| `faqs.ts` | Category defaults, product FAQs, article FAQs, care guidance | PDP, articles |
| `collection-editorial.ts` | Editorial grid inserts for PLP | Collection PLP |
| `home-media.ts` | Homepage/hero image URLs | Homepage, offers, craft |

### Data Pattern

All data files export arrays of typed objects and helper functions:

```typescript
// products.ts — add a new product
export const products: Product[] = [
  {
    id: "bl-001",
    slug: "zari-dream-lehenga",
    name: "Zari Dream Lehenga",
    // ...
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
```

---

## Routing

All dynamic routes use `generateStaticParams` for full pre-rendering at build time.

| Route | Type | Params Source |
|-------|------|--------------|
| `/product/[slug]` | SSG | `products` array in `products.ts` |
| `/journal/[slug]` | SSG | `journalArticles` array in `journal.ts` |
| `/collections/occasion/[slug]` | SSG | `occasions` array in `products.ts` |
| `/collections/category/[slug]` | SSG | `categories` from types |
| `/special-offer/[slug]` | SSG | `offers` array in `offers.ts` |

### Adding a New Route

1. Create the page file in `src/app/`
2. For dynamic routes, export `generateStaticParams` and `generateMetadata`
3. Build automatically picks it up — no route registration needed

---

## State Management

Three Zustand stores, all persisted to `localStorage`:

| Store | Key Data | Persistence |
|-------|----------|-------------|
| `useCartStore` | Cart items, sidebar open state | `cart-v1` |
| `useWishlistStore` | Product IDs | `wishlist-v1` |
| `useCustomizerStore` | Full 7-step customizer state, measurement profiles | `customizer-v1`, `customizer-profiles-v1` |

**Pattern:**

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      // ...
    }),
    { name: "cart-v1" },
  ),
);
```

---

## Styling & Animations

### Tailwind CSS v4

Tokens are defined in `src/app/globals.css` via `@theme`:

```css
@theme {
  --color-emerald-50: oklch(0.96 0.05 160);
  --color-sand-50: oklch(0.97 0.02 80);
  --color-ivory: oklch(0.99 0.01 90);
  --font-serif: "Playfair Display", serif;
  --font-sans: "Instrument Sans", sans-serif;
  /* ... */
}
```

### Animations (GSAP + ScrollTrigger)

- **Homepage:** 4-layer parallax hero, word-by-word reveal, scroll-triggered fade-ins
- **Articles & Offers:** GSAP stagger card reveals, flip-clock countdown, shimmer buttons
- **Shared:** `ParallaxLayer` component, `Reveal` component for scroll-triggered fade-in

### Smooth Scroll

Lenis smooth scroll is applied globally via `SmoothScrollProvider`:

```typescript
// src/components/providers/smooth-scroll.tsx
<ReactLenis root options={{ lerp: 0.06 }}>
  {children}
</ReactLenis>
```

---

## Forms & Communication

### WhatsApp (Primary Channel)

- Floating button on every page
- "Ask about this piece" links on every product and article
- Checkout builds a WhatsApp message with order details
- Two numbers: `+92 320 9988777` (primary), `+92 302 4794282` (secondary)

### Web3Forms (Email Backup)

Contact and consultation forms submit to Web3Forms API, which emails the owner.

---

## SEO & Structured Data

- **Root layout:** Sets `title.template = "%s — Begum"` and default description
- **Dynamic pages:** Each uses `generateMetadata()` reading from data files
- **FAQPage JSON-LD:** Generated via `FaqJsonLd` component using `buildFaqPageJsonLd()`
- **Image alt text:** Required on all images
- **Semantic HTML:** `<article>`, `<section>`, `<nav>`, `<main>`, `<footer>` throughout

---

## Analytics

| Service | Component | ID Location |
|---------|-----------|-------------|
| Google Analytics | `src/components/analytics/google-analytics.tsx` | `.env.local` |
| Microsoft Clarity | `src/components/analytics/microsoft-clarity.tsx` | `.env.local` |

---

## Build & Deployment

```bash
npm run dev        # Development server
npm run build      # Production build (fully static)
npm run start      # Serve production build
```

**Build output:** 80 static routes, 0 errors.

The project has no database, no server, and no runtime API dependencies — it can be deployed on any static hosting (Vercel, Netlify, Cloudflare Pages, etc.).
