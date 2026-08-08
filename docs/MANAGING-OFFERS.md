# Managing Special Offers & Promotions

**Files involved:**

| File | Purpose |
|------|---------|
| `src/lib/data/offers.ts` | Offer data (pricing, terms, highlights) |
| `src/app/special-offer/page.tsx` | Overview page (client component with GSAP) |
| `src/app/special-offer/[slug]/page.tsx` | Offer detail page (server wrapper) |
| `src/app/special-offer/[slug]/offer-detail.tsx` | Offer detail content (client component) |

---

## Offer Data Structure

**File:** `src/lib/data/offers.ts`

```typescript
interface Offer {
  id: string;
  slug: string;                    // URL: /special-offer/[slug]
  title: string;
  subtitle: string;
  description: string;             // Shown on overview cards
  heroImage: string;               // URL for hero section
  pricing: {
    original: string;              // e.g. "PKR 350,000"
    offer: string;                 // e.g. "PKR 280,000"
    savings: string;               // e.g. "Save PKR 70,000"
  };
  highlights: string[];            // Bullet points for detail page
  terms: string[];                 // Terms & conditions
  perks: {                         // Featured benefits
    icon: string;                  // Emoji or icon name
    title: string;
    description: string;
  }[];
  cta: {
    label: string;                 // Button text
    href: string;                  // Link or WhatsApp URL
  };
}
```

---

## Adding a New Offer

### 1. Add the data

Open `src/lib/data/offers.ts` and add to the `offers` array:

```typescript
{
  id: "spring-collection",
  slug: "spring-collection",
  title: "Spring Bridal Collection",
  subtitle: "Pre-order your spring 2026 bridal ensemble",
  description: "Reserve your custom spring bridal outfit with exclusive early-bird pricing.",
  heroImage: "https://images.unsplash.com/photo-XXXXXXXXX?auto=format&fit=crop&w=1600&q=85",
  pricing: {
    original: "PKR 400,000",
    offer: "PKR 320,000",
    savings: "Save PKR 80,000",
  },
  highlights: [
    "Free fabric swatch kit shipped to your door",
    "Complimentary video consultation worth PKR 5,000",
    "Priority karigar booking — skip the 8-week waitlist",
    "Free express shipping within Pakistan",
  ],
  terms: [
    "Offer valid for orders placed before March 15, 2026.",
    "Cannot be combined with other promotions.",
    "Full payment terms: 30/40/30 as per standard policy.",
    "Custom orders are non-cancellable after fabric procurement.",
  ],
  perks: [
    {
      icon: "🎨",
      title: "Curated Palette",
      description: "Access to 12 exclusive spring colourways not available in the standard collection.",
    },
    {
      icon: "📸",
      title: "Extended Milestone Photography",
      description: "Two additional checkpoints during production — 6 total instead of the standard 4.",
    },
    {
      icon: "📦",
      title: "Complimentary Shipping",
      description: "Free insured shipping within Pakistan. 50% off international shipping.",
    },
  ],
  cta: {
    label: "Claim This Offer",
    href: "https://wa.me/923209988777?text=Hi%20Begum%20—%20I'm%20interested%20in%20the%20Spring%20Collection%20offer.",
  },
},
```

### 2. Build

```bash
npm run build
```

The overview page and detail page will be generated automatically via `generateStaticParams`.

---

## How It Works

- **Overview page** (`/special-offer`): Renders all offers as cards with GSAP stagger reveal
- **Detail pages** (`/special-offer/[slug]`): Server component wrapper + client `OfferDetail` component
- The detail page hero uses the same 4-layer parallax pattern as the homepage
- All offers use `page.tsx` → reads `offers` array → passes to client component

---

## Customizing the Overview Page

**File:** `src/app/special-offer/page.tsx`

- Hero section with dark emerald theme
- 4-layer parallax background
- Flip-clock countdown (edit the target date)
- Shimmer CTA buttons
- GSAP stagger card reveals

To change the countdown date, find the target date in the component and update it.
