import type {
  GarmentMeasurements,
  BottomMeasurements,
  StandardSize,
  MeasurementFieldKey,
} from "./schema";
import { STANDARD_SIZES } from "./schema";

/**
 * Standard size charts (all values in cm) the industry field set:
 * Neck Depth, Shoulder, Sleeves Length, Armhole, Bust, Hip, Shirt Length
 * plus Waist, Thigh, Length, Hem for the bottom piece.
 *
 * Standard sizes are the pre-filled starting point for custom
 * measurements never a separate disconnected mode.
 */
export interface StandardSizeChart {
  garment: GarmentMeasurements;
  bottom: Required<BottomMeasurements>;
}

export const standardSizeCharts: Record<StandardSize, StandardSizeChart> = {
  XS: {
    garment: { neckDepth: 17, shoulder: 35.5, sleevesLength: 54.5, armhole: 40.5, bust: 84, hip: 92, shirtLength: 96.5 },
    bottom: { waist: 66, thigh: 56, length: 96.5, hem: 33 },
  },
  S: {
    garment: { neckDepth: 18, shoulder: 37, sleevesLength: 56, armhole: 43, bust: 89, hip: 97, shirtLength: 99 },
    bottom: { waist: 71, thigh: 58.5, length: 99, hem: 35.5 },
  },
  M: {
    garment: { neckDepth: 19, shoulder: 38.5, sleevesLength: 57, armhole: 45.5, bust: 94, hip: 102, shirtLength: 101.5 },
    bottom: { waist: 76, thigh: 61, length: 101.5, hem: 38 },
  },
  L: {
    garment: { neckDepth: 20, shoulder: 40.5, sleevesLength: 58.5, armhole: 48.5, bust: 101.5, hip: 109, shirtLength: 104 },
    bottom: { waist: 84, thigh: 63.5, length: 104, hem: 40.5 },
  },
  XL: {
    garment: { neckDepth: 21, shoulder: 42, sleevesLength: 59.5, armhole: 52, bust: 109, hip: 117, shirtLength: 106.5 },
    bottom: { waist: 91.5, thigh: 66, length: 106.5, hem: 43 },
  },
};

/** Default lehenga-specific starting values (cm) per size. */
export const lehengaDefaults: Record<StandardSize, { lehengaLength: number; dupattaLength: number }> = {
  XS: { lehengaLength: 99, dupattaLength: 250 },
  S: { lehengaLength: 101.5, dupattaLength: 250 },
  M: { lehengaLength: 104, dupattaLength: 260 },
  L: { lehengaLength: 106.5, dupattaLength: 260 },
  XL: { lehengaLength: 109, dupattaLength: 270 },
};

export function getFieldValue(size: StandardSize, field: MeasurementFieldKey): number | undefined {
  const chart = standardSizeCharts[size];
  if (field in chart.garment) return chart.garment[field as keyof GarmentMeasurements];
  if (field in chart.bottom) return chart.bottom[field as keyof Required<BottomMeasurements>];
  const lehenga = lehengaDefaults[size];
  if (field === "lehengaLength") return lehenga.lehengaLength;
  if (field === "dupattaLength") return lehenga.dupattaLength;
  return undefined;
}

/**
 * Find the standard size whose chart is closest to the given measurements
 * (weighted toward bust/hip/waist, the fit-critical fields).
 */
export function nearestStandardSize(garment: Partial<GarmentMeasurements>, bottom: Partial<BottomMeasurements>): StandardSize {
  let best: StandardSize = "M";
  let bestScore = Infinity;
  for (const size of STANDARD_SIZES) {
    const chart = standardSizeCharts[size];
    let score = 0;
    if (garment.bust !== undefined) score += Math.abs(garment.bust - chart.garment.bust) * 2;
    if (garment.hip !== undefined) score += Math.abs(garment.hip - chart.garment.hip) * 2;
    if (bottom.waist !== undefined) score += Math.abs(bottom.waist - chart.bottom.waist) * 2;
    if (garment.shoulder !== undefined) score += Math.abs(garment.shoulder - chart.garment.shoulder);
    if (garment.shirtLength !== undefined) score += Math.abs(garment.shirtLength - chart.garment.shirtLength) * 0.5;
    if (score < bestScore) {
      bestScore = score;
      best = size;
    }
  }
  return best;
}

/**
 * Smart Start: recommend a starting size from the 30-second quiz.
 * Height (cm), weight (kg), usual ready-to-wear size, and an optional
 * body-shape hint. Deliberately simple and transparent a starting
 * point to adjust from, not a verdict.
 */
export interface SmartStartInput {
  heightCm?: number;
  weightKg?: number;
  usualSize?: StandardSize;
  bodyShape?: "even" | "fuller-bust" | "fuller-hip";
}

export function recommendSize(input: SmartStartInput): StandardSize {
  // Usual ready-to-wear size is the strongest signal when present.
  if (input.usualSize) return input.usualSize;

  if (input.heightCm && input.weightKg) {
    const bmi = input.weightKg / Math.pow(input.heightCm / 100, 2);
    if (bmi < 18.5) return "XS";
    if (bmi < 21.5) return "S";
    if (bmi < 24.5) return "M";
    if (bmi < 28) return "L";
    return "XL";
  }
  return "M";
}

/** Which single field to nudge up a size for a given body-shape hint. */
export function shapeAdjustment(shape: SmartStartInput["bodyShape"]): MeasurementFieldKey | null {
  if (shape === "fuller-bust") return "bust";
  if (shape === "fuller-hip") return "hip";
  return null;
}
