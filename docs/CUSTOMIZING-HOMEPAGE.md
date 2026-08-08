# Customizing the Homepage

**Directory:** `src/components/home/`

The homepage is composed of 12 section components, mounted in `src/app/page.tsx`. Each section uses GSAP scroll-triggered animations.

---

## Section Components

| Component | File | Description |
|-----------|------|-------------|
| Hero | `hero-section.tsx` | 4-layer parallax, word-by-word reveal, warm spotlight glow |
| Brand Statement | `brand-statement-section.tsx` | Circle-drift parallax on brand tagline |
| Editorial Spread | `editorial-spread-section.tsx` | Full-bleed editorial image with text overlay |
| Shop by Occasion | `shop-by-occasion-section.tsx` | Occasion cards (mehndi, nikkah, baraat, walima) |
| Complete the Look | `complete-the-look-section.tsx` | Bundle/product pairings |
| Custom Offering | `custom-offering-section.tsx` | Custom design CTA |
| Craftsmanship Spotlight | `craftsmanship-spotlight-section.tsx` | Karigar showcase |
| Trust Strip | `trust-strip-section.tsx` | Logos, badges, guarantees |
| Real Brides | `real-brides-section.tsx` | Bride testimonial cards |
| Journal Preview | `journal-preview-section.tsx` | Latest 2-3 articles |
| Newsletter CTA | `newsletter-section.tsx` | Email signup |
| Instagram Wall | `instagram-wall-section.tsx` | Social proof grid |

---

## Changing the Hero Image

**File:** `src/lib/data/home-media.ts`

```typescript
// Change the hero image URL:
heroImage: "https://images.unsplash.com/photo-YOUR_NEW_ID?auto=format&fit=crop&w=1920&q=85",
```

The hero has 4 parallax layers at different scroll speeds. To change individual layers, edit the `ParallaxLayer` props in `hero-section.tsx`.

---

## Adding/Removing Sections

**File:** `src/app/page.tsx`

Each section is imported and rendered in order. To add a new section, create the component in `src/components/home/` and add it to the page:

```typescript
// src/app/page.tsx
import NewSection from "@/components/home/new-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatementSection />
      <NewSection />         {/* Add here */}
      <EditorialSpreadSection />
      {/* ...rest */}
    </>
  );
}
```

To remove a section, delete its import and JSX tag.

---

## GSAP Animation Notes

- Each section uses `useGSAP` hook for scroll-triggered animations
- The `Reveal` component (`src/components/shared/reveal.tsx`) wraps any element for fade-in
- `ParallaxLayer` (`src/components/shared/parallax-layer.tsx`) handles parallax motion
- Animation timing: defaults use `duration: 1.2`, `ease: "power3.out"`

### Creating a New Animated Section

```typescript
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewSection() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current?.querySelectorAll(".animate-item"), {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={ref} className="py-24">
      <h2 className="animate-item text-3xl font-serif">New Section</h2>
      <p className="animate-item mt-4">Content here</p>
    </section>
  );
}
```

---

## Home-Media Data

**File:** `src/lib/data/home-media.ts`

Controls image URLs used across the homepage. Update image URLs here rather than in individual components:

```typescript
export const homeMedia = {
  heroImage: "...",
  heroMobileImage: "...",
  atelierPortrait: "...",
  editorialImage: "...",
  // ...etc
};
```

---

## Color & Styling

Brand tokens are in `src/app/globals.css`:

```css
@theme {
  --color-emerald-900: oklch(0.35 0.12 160);
  --color-sand-100: oklch(0.95 0.02 80);
  /* etc */
}
```

To change the brand palette, edit the OKLCH values in `globals.css`.
