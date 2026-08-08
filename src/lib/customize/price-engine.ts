import type { GarmentType, EmbroideryDensity, EmbroideryTechnique } from "@/lib/types";

/**
 * Pure price engine — the single source of truth for the running price.
 * Used by both the sticky summary panel and the review section so the
 * numbers can never drift out of sync.
 */

export interface FabricOption {
  value: string;
  label: string;
  desc: string;
  tierPrice: number;
}

export interface AddonOption {
  value: string;
  label: string;
  desc: string;
  price: number;
}

export const baseGarmentPrices: Record<GarmentType, number> = {
  lehenga: 165000,
  sharara: 135000,
  gharara: 140000,
  "bridal-suit": 110000,
};

export const fabricOptions: FabricOption[] = [
  { value: "silk", label: "Pure Silk", desc: "Lustrous, heavyweight, traditional", tierPrice: 30000 },
  { value: "raw-silk", label: "Raw Silk", desc: "Textured, matte finish, modern", tierPrice: 24000 },
  { value: "velvet", label: "Velvet", desc: "Rich, soft, winter weddings", tierPrice: 32000 },
  { value: "chiffon", label: "Chiffon", desc: "Lightweight, flowing, graceful", tierPrice: 18000 },
  { value: "organza", label: "Organza", desc: "Crisp, sheer, structural volume", tierPrice: 20000 },
];

export const embroideryTechniques: { value: EmbroideryTechnique; label: string; desc: string }[] = [
  { value: "zardozi", label: "Zardozi", desc: "Gold & silver thread — regal, heavy" },
  { value: "dabka", label: "Dabka", desc: "Coiled wire — intricate, dimensional" },
  { value: "tilla", label: "Tilla", desc: "Fine metallic thread — delicate borders" },
  { value: "resham", label: "Resham", desc: "Silk thread — matte, colorful" },
];

/** Density multiplies the embroidery labour on top of the base. */
export const densityMultipliers: Record<EmbroideryDensity, { label: string; desc: string; multiplier: number }> = {
  light: { label: "Light", desc: "Borders and edges only", multiplier: 0 },
  medium: { label: "Medium", desc: "Scattered motifs, balanced", multiplier: 0.3 },
  heavy: { label: "Heavy", desc: "Full coverage, statement piece", multiplier: 0.6 },
};

export const addonOptions: AddonOption[] = [
  { value: "matching-dupatta", label: "Second Dupatta", desc: "Coordinated fabric & embroidery", price: 45000 },
  { value: "blouse-back-design", label: "Blouse Back Design", desc: "Intricate back detail, custom pattern", price: 15000 },
  { value: "cancan-petticoat", label: "Can-Can Petticoat", desc: "Extra volume, structured flare", price: 8000 },
  { value: "matching-potli", label: "Matching Potli", desc: "Mini purse, same fabric & embroidery", price: 12000 },
  { value: "matching-khussa", label: "Matching Khussa", desc: "Hand-stitched, coordinated thread work", price: 12500 },
  { value: "trial-dupatta", label: "Trial Dupatta", desc: "Plain fabric dupatta for rehearsal", price: 5000 },
  { value: "travel-packaging", label: "Travel Packaging", desc: "Secure garment bag + steam-free fold", price: 3000 },
];

export interface PriceInput {
  garmentType: GarmentType | null;
  fabric: string | null;
  embroidery: EmbroideryTechnique | null;
  density: EmbroideryDensity | null;
  addons: string[];
  rush?: boolean;
}

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  lines: PriceLine[];
  total: number;
  /** 30 / 40 / 30 staged schedule. */
  stages: { label: string; percent: number; amount: number }[];
}

export function computePrice(input: PriceInput): PriceBreakdown {
  const lines: PriceLine[] = [];

  const base = input.garmentType ? baseGarmentPrices[input.garmentType] : 0;
  if (base > 0) {
    const garmentLabel = input.garmentType === "bridal-suit" ? "Bridal Suit" : (input.garmentType as string).charAt(0).toUpperCase() + (input.garmentType as string).slice(1);
    lines.push({ label: `Base — ${garmentLabel}`, amount: base });
  }

  const fabric = fabricOptions.find((f) => f.value === input.fabric);
  if (fabric) lines.push({ label: `Fabric — ${fabric.label}`, amount: fabric.tierPrice });

  if (input.embroidery && input.density && base > 0) {
    const technique = embroideryTechniques.find((e) => e.value === input.embroidery);
    const density = densityMultipliers[input.density];
    const amount = Math.round(base * density.multiplier);
    lines.push({
      label: `Embroidery — ${technique?.label ?? input.embroidery}, ${density.label.toLowerCase()}`,
      amount,
    });
  }

  for (const addonValue of input.addons) {
    const addon = addonOptions.find((a) => a.value === addonValue);
    if (addon) lines.push({ label: addon.label, amount: addon.price });
  }

  let total = lines.reduce((sum, l) => sum + l.amount, 0);

  if (input.rush && total > 0) {
    const rushFee = Math.round(total * 0.15);
    lines.push({ label: "Rush delivery (under 10 weeks)", amount: rushFee });
    total += rushFee;
  }

  return {
    lines,
    total,
    stages: [
      { label: "To confirm your order", percent: 30, amount: Math.round(total * 0.3) },
      { label: "After you approve production photos", percent: 40, amount: Math.round(total * 0.4) },
      { label: "When your piece is ready to ship", percent: 30, amount: total - Math.round(total * 0.3) - Math.round(total * 0.4) },
    ],
  };
}
