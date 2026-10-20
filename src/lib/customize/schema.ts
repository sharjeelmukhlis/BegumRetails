import { z } from "zod";

// ---------- Core vocabulary ----------

export const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type StandardSize = (typeof STANDARD_SIZES)[number];

export const FLARE_TYPES = ["A-line", "Circular", "Mermaid", "Layered"] as const;
export type FlareType = (typeof FLARE_TYPES)[number];

export type Unit = "cm" | "in";
export type Language = "en" | "ur";

export const GARMENT_FIELDS = [
  "neckDepth",
  "shoulder",
  "sleevesLength",
  "armhole",
  "bust",
  "hip",
  "shirtLength",
] as const;
export type GarmentField = (typeof GARMENT_FIELDS)[number];

export const BOTTOM_FIELDS = ["waist", "thigh", "length", "hem"] as const;
export type BottomField = (typeof BOTTOM_FIELDS)[number];

export const LEHENGA_FIELDS = ["lehengaLength", "dupattaLength"] as const;
export type LehengaField = (typeof LEHENGA_FIELDS)[number];

export type MeasurementFieldKey = GarmentField | BottomField | LehengaField;

// ---------- Zod schemas (all values stored canonically in cm) ----------

const cm = (min: number, max: number) => z.number().min(min).max(max);

export const garmentMeasurementsSchema = z.object({
  neckDepth: cm(8, 35),
  shoulder: cm(25, 60),
  sleevesLength: cm(10, 75),
  armhole: cm(28, 70),
  bust: cm(60, 160),
  hip: cm(65, 170),
  shirtLength: cm(50, 140),
});
export type GarmentMeasurements = z.infer<typeof garmentMeasurementsSchema>;

export const bottomMeasurementsSchema = z.object({
  waist: cm(50, 150),
  thigh: cm(35, 100).optional(),
  length: cm(70, 130),
  hem: cm(20, 90),
});
export type BottomMeasurements = z.infer<typeof bottomMeasurementsSchema>;

export const lehengaSpecificSchema = z.object({
  lehengaLength: cm(80, 130),
  flareType: z.enum(FLARE_TYPES),
  dupattaLength: cm(180, 350),
});
export type LehengaSpecific = z.infer<typeof lehengaSpecificSchema>;

export const measurementProfileSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  unit: z.enum(["cm", "in"]),
  garment: garmentMeasurementsSchema,
  bottom: bottomMeasurementsSchema,
  lehengaSpecific: lehengaSpecificSchema.optional(),
  source: z.enum(["standard-size", "custom-manual", "ai-photo-estimate"]),
  standardSizeMatched: z.enum(STANDARD_SIZES).optional(),
  savedAt: z.string(),
});
export type MeasurementProfile = z.infer<typeof measurementProfileSchema>;

// ---------- Unit helpers ----------

export function cmToIn(v: number): number {
  return Math.round((v / 2.54) * 10) / 10;
}

export function inToCm(v: number): number {
  return Math.round(v * 2.54 * 10) / 10;
}

/** Format a canonical-cm value for display in the chosen unit. */
export function displayValue(cmValue: number, unit: Unit): number {
  return unit === "cm" ? Math.round(cmValue * 10) / 10 : cmToIn(cmValue);
}

/** Parse a user-entered value in the chosen unit back to canonical cm. */
export function toCanonicalCm(entered: number, unit: Unit): number {
  return unit === "cm" ? entered : inToCm(entered);
}
