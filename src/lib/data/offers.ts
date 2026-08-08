import { ArrowRight, Sparkles, Shield, Clock, Ruler, Heart, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  original: number;
  discounted: number;
  badge: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  terms: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaIcon?: ComponentType<{ size?: number; className?: string }>;
  perks: Array<{ icon: ComponentType<{ size?: number; className?: string }>; label: string }>;
  image?: string;
}

export const offers: Offer[] = [
  {
    id: "bridal-suite",
    title: "The Bridal Suite",
    subtitle: "Lehenga · Dupatta · Jewellery Set",
    heroHeadline: "Your complete bridal look from one atelier",
    original: 245000,
    discounted: 179000,
    badge: "Save 66,000",
    shortDescription:
      "Choose any couture lehenga, a hand-embroidered dupatta, and a matching jewellery set at a price that honours the full ensemble.",
    description:
      "The Bridal Suite is our most loved offer — and for good reason. Instead of piecing together your bridal look from different vendors, you get a perfectly cohesive ensemble from one atelier. Start with any couture lehenga from our collection, add a hand-embroidered dupatta that complements its palette and technique, and finish with a matching jewellery set. The result is a bridal look that feels intentional, cohesive, and entirely yours. Every piece is handcrafted by a named karigar, using the same embroidery language and design philosophy — so your lehenga, dupatta, and jewellery speak to each other.",
    highlights: [
      "Choose any couture lehenga from our collection",
      "Hand-embroidered dupatta matched to your lehenga",
      "Matching jewellery set — your choice of style",
      "Save ₹66,000 compared to individual pricing",
      "Staged payment available — 30/40/30",
      "Free delivery within Pakistan",
    ],
    terms: [
      "Offer valid on full-price couture lehengas only",
      "Dupatta and jewellery must be selected from the Bridal Suite collection",
      "Cannot be combined with other promotions or discounts",
      "Custom sizing available at no extra charge",
      "Standard lead times apply based on the lehenga selected",
      "Offer ends 1 September 2026",
    ],
    ctaLabel: "Build Your Bridal Suite",
    ctaHref: "/collections/complete-the-look",
    perks: [
      { icon: Shield, label: "Staged payment — 30/40/30" },
      { icon: Ruler, label: "Free custom sizing" },
      { icon: Clock, label: "Free delivery within Pakistan" },
    ],
  },
  {
    id: "sisters",
    title: "Sisters of the Bride",
    subtitle: "Buy 2 lehengas, get 15% off the third",
    heroHeadline: "Celebrate together, save together",
    original: 0,
    discounted: 15,
    badge: "Group Offer",
    shortDescription:
      "For brides dressing their sisters, cousins, or bridal party. Mix tiers and styles — the discount applies to the lowest-priced piece.",
    description:
      "Weddings are about the people who stand beside you. The Sisters of the Bride offer is designed for brides dressing their sisters, cousins, or bridal party. Buy any two lehengas — across any tier, style, or occasion — and receive 15% off the third, lowest-priced piece. Mix bridal lehengas with mehndi-ready shararas or nikkah suits. This offer works on both ready-to-ship and custom orders, so every sister gets a look that feels personal. Whether your bridal party is two or twelve, the discount scales — apply the offer to every group of three.",
    highlights: [
      "Buy 2 lehengas, get 15% off the third (lowest-priced)",
      "Mix tiers, styles, and occasions freely",
      "Valid on ready-to-ship and custom orders",
      "Applies to every group of 3 — no limit on total pieces",
      "Free size consultations for each piece",
      "Dedicated WhatsApp group for your bridal party",
    ],
    terms: [
      "Discount applies to the lowest-priced piece in each group of 3",
      "All 3 lehengas must be in the same order",
      "Cannot be combined with other promotions",
      "Valid for ready-to-ship and custom orders",
      "Custom order lead times apply to made-to-order pieces",
      "Offer ends 1 September 2026",
    ],
    ctaLabel: "Shop for the Bridal Party",
    ctaHref: "/collections/occasion/mehndi",
    perks: [
      { icon: Shield, label: "15% off the third piece" },
      { icon: Heart, label: "Bridal party WhatsApp group" },
      { icon: Ruler, label: "Free size consultation each" },
    ],
  },
  {
    id: "first-purchase",
    title: "First Purchase Welcome",
    subtitle: "Free size consultation on custom order",
    heroHeadline: "Your first custom piece, perfected",
    original: 5000,
    discounted: 0,
    badge: "New Bride",
    shortDescription:
      "First time ordering custom? We walk you through measurements over a video call — no charge. Our karigars use your exact proportions for a flawless fit.",
    description:
      "Ordering a custom bridal piece for the first time can feel daunting — especially when it involves measurements across continents. The First Purchase Welcome offer removes that hesitation entirely. When you place your first custom order with us, we include a complimentary video-based size consultation with our master karigars. No awkward self-measuring, no guesswork. One of our senior karigars will walk you through every measurement over a video call, note your fit preferences, and translate them directly into the pattern. The result is a lehenga, sharara, or bridal suit that fits like it was tailored next door — because it was.",
    highlights: [
      "Complimentary 1-on-1 video call with a master karigar",
      "Every measurement taken by an expert — no self-measuring",
      "Your fit preferences noted and applied to the pattern",
      "Worth PKR 5,000 — included free with your first custom order",
      "Available for all garment types: lehenga, sharara, gharara, suit",
      "Post-delivery fit follow-up included",
    ],
    terms: [
      "Valid on first custom order per customer",
      "Must be a full custom order (not ready-to-ship)",
      "Video consultation scheduled after design approval",
      "Cannot be redeemed for cash or transferred",
      "Standard custom order lead times apply",
      "Offer ends 1 September 2026",
    ],
    ctaLabel: "Start Your Custom Piece",
    ctaHref: "/customize",
    perks: [
      { icon: Heart, label: "1-on-1 with master karigar" },
      { icon: Ruler, label: "No self-measuring needed" },
      { icon: MessageCircle, label: "Post-delivery fit follow-up" },
    ],
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.id === slug);
}
