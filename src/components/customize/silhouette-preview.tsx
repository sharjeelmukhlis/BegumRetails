"use client";

import { useId } from "react";
import type { GarmentType, EmbroideryDensity } from "@/lib/types";
import type {
  GarmentMeasurements,
  BottomMeasurements,
  LehengaSpecific,
  MeasurementFieldKey,
  Unit,
} from "@/lib/customize/schema";
import { displayValue } from "@/lib/customize/schema";
import { standardSizeCharts, lehengaDefaults } from "@/lib/customize/standard-sizes";

interface SilhouettePreviewProps {
  garmentType: GarmentType | null;
  garment: Partial<GarmentMeasurements>;
  bottom: Partial<BottomMeasurements>;
  lehenga: Partial<LehengaSpecific>;
  activeField?: MeasurementFieldKey | string | null;
  fabricColor?: string | null;
  fabric?: string | null;
  embroidery?: string | null;
  density?: EmbroideryDensity | string | null;
  unit?: Unit;
  className?: string;
  showDimensions?: boolean;
}

const fallback = standardSizeCharts.M;
const fallbackLehenga = lehengaDefaults.M;

const CX = 150;
const HEAD_CY = 48;
const SHOULDER_Y = 88;
const K = 2.15;
const KW = 2.15;

const INK = "#062319";
const GOLD = "#C9975A";
const GOLD_LIGHT = "#E9CA9F";
const GOLD_BRIGHT = "#FFD700";
const SKIN = "#F0D9BE";
const SKIN_DEEP = "#E4C4A0";
const HAIR = "#2A1F18";

/** Front-view half-width from circumference in cm */
const halfW = (circumference: number) => (circumference / 3 / 2) * KW * 1.95;

const KALI_FRACTIONS = [-0.68, -0.36, 0, 0.36, 0.68];

const bootaPath = (x: number, y: number, s: number = 3.5) =>
  `M ${x} ${y - s} Q ${x + s} ${y} ${x} ${y + s} Q ${x - s} ${y} ${x} ${y - s} Z ` +
  `M ${x - s} ${y} Q ${x} ${y - s} ${x + s} ${y} Q ${x} ${y + s} ${x - s} ${y} Z`;

// Luxury color palette profiles for dynamic fabric shading
const COLOR_PROFILES: Record<
  string,
  {
    bodice: [string, string, string];
    skirt: [string, string, string];
    dupatta: string;
    dupattaOpacity: number;
    accent: string;
    darkInk: string;
  }
> = {
  emerald: {
    bodice: ["#0E3B2C", "#07261C", "#03140E"],
    skirt: ["#124B38", "#0A3023", "#04160F"],
    dupatta: "#0F4A37",
    dupattaOpacity: 0.42,
    accent: "#E9CA9F",
    darkInk: "#020B07",
  },
  burgundy: {
    bodice: ["#7D1A2E", "#55111F", "#340812"],
    skirt: ["#8E1E34", "#611323", "#3C0A15"],
    dupatta: "#7E192E",
    dupattaOpacity: 0.42,
    accent: "#F1D2A9",
    darkInk: "#23040B",
  },
  sapphire: {
    bodice: ["#1C3D66", "#122A47", "#0A1B2E"],
    skirt: ["#224B7D", "#153357", "#0C1E34"],
    dupatta: "#204675",
    dupattaOpacity: 0.4,
    accent: "#E2C69B",
    darkInk: "#06101B",
  },
  ivory: {
    bodice: ["#FFFDF8", "#F4ECE0", "#E8D9C2"],
    skirt: ["#FFFDF9", "#F5EFE4", "#EADBCE"],
    dupatta: "#EFE6D6",
    dupattaOpacity: 0.48,
    accent: "#C9975A",
    darkInk: "#1D1914",
  },
  blush: {
    bodice: ["#FDF2E7", "#F2D8C0", "#E4BFA1"],
    skirt: ["#FCF0E3", "#F1D5BC", "#DFB496"],
    dupatta: "#F1D5BC",
    dupattaOpacity: 0.4,
    accent: "#C9975A",
    darkInk: "#291710",
  },
  champagne: {
    bodice: ["#FAF0DD", "#EFD7AB", "#DCB67E"],
    skirt: ["#FBF2E1", "#F1D9AE", "#DEB980"],
    dupatta: "#EFD8B1",
    dupattaOpacity: 0.42,
    accent: "#C9975A",
    darkInk: "#251B0D",
  },
  charcoal: {
    bodice: ["#2E3734", "#1F2624", "#131816"],
    skirt: ["#353F3C", "#242C29", "#151B19"],
    dupatta: "#242C29",
    dupattaOpacity: 0.42,
    accent: "#E9CA9F",
    darkInk: "#0A0D0C",
  },
  "dusty-rose": {
    bodice: ["#D8B1AB", "#C0938C", "#A5746C"],
    skirt: ["#DFC0BA", "#C89992", "#AB7971"],
    dupatta: "#C89992",
    dupattaOpacity: 0.42,
    accent: "#EDD5B0",
    darkInk: "#281412",
  },
};

export function SilhouettePreview({
  garmentType,
  garment,
  bottom,
  lehenga,
  activeField,
  fabricColor = "emerald",
  density = "medium",
  unit = "in",
  className,
  showDimensions = true,
}: SilhouettePreviewProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bodiceGrad = `bodice-${uid}`;
  const skirtGrad = `skirt-${uid}`;
  const dupattaGrad = `dupatta-${uid}`;
  const skinGrad = `skin-${uid}`;
  const hairGrad = `hair-${uid}`;
  const goldSheenGrad = `gold-sheen-${uid}`;

  const colorProfile = COLOR_PROFILES[fabricColor || "emerald"] || COLOR_PROFILES.emerald;

  // Measurement values with fallback to Size M
  const g = {
    neckDepth: garment.neckDepth ?? fallback.garment.neckDepth,
    shoulder: garment.shoulder ?? fallback.garment.shoulder,
    sleevesLength: garment.sleevesLength ?? fallback.garment.sleevesLength,
    armhole: garment.armhole ?? fallback.garment.armhole,
    bust: garment.bust ?? fallback.garment.bust,
    hip: garment.hip ?? fallback.garment.hip,
    shirtLength: garment.shirtLength ?? fallback.garment.shirtLength,
  };
  const b = {
    waist: bottom.waist ?? fallback.bottom.waist,
    thigh: bottom.thigh ?? fallback.bottom.thigh,
    length: bottom.length ?? fallback.bottom.length,
    hem: bottom.hem ?? fallback.bottom.hem,
  };
  const l = {
    lehengaLength: lehenga.lehengaLength ?? fallbackLehenga.lehengaLength,
    flareType: lehenga.flareType ?? "Circular",
    dupattaLength: lehenga.dupattaLength ?? fallbackLehenga.dupattaLength,
  };

  // ---- Dynamic Geometric Derivations ----
  const shoulderHalf = (g.shoulder / 2) * KW;
  const neckHalf = Math.min(shoulderHalf * 0.44, 24);
  const neckDepthPx = g.neckDepth * K * 0.88;
  const bustHalf = halfW(g.bust);
  const hipHalf = halfW(g.hip);
  const shirtHemY = SHOULDER_Y + g.shirtLength * K * 0.82;
  const bustY = SHOULDER_Y + 50;
  const waistY = SHOULDER_Y + 94;
  const waistHalf = halfW(b.waist);
  const shirtHemHalf = Math.min(hipHalf * 0.94, waistHalf + (shirtHemY - waistY) * 0.32);

  const sleeveLen = g.sleevesLength * K * 0.8;
  const sleeveWidth = Math.max(14, (g.armhole / 3) * 0.9);
  const sleeveAngle = 0.24;

  const isLehenga = garmentType === "lehenga" || garmentType === null;
  const isFlaredTrouser = garmentType === "sharara" || garmentType === "gharara";
  const lehengaHemY = waistY + l.lehengaLength * K * 0.86;
  const trouserHemY = waistY + b.length * K * 0.86;

  const mermaid = l.flareType === "Mermaid";
  const flareFactor =
    l.flareType === "Circular" || l.flareType === "Layered"
      ? 0.64
      : l.flareType === "A-line"
        ? 0.42
        : 0.2;
  const lehengaHemHalf = waistHalf + l.lehengaLength * K * flareFactor;
  const hemHalfActual = mermaid ? lehengaHemHalf + l.lehengaLength * 0.52 : lehengaHemHalf;
  const hemY = isLehenga ? lehengaHemY : trouserHemY;
  const trouserHemHalf = (b.hem / 3) * KW * (isFlaredTrouser ? 2.4 : 1.15);
  const hemHalfNow = isLehenga ? hemHalfActual : trouserHemHalf + 8;

  const skirtHalfAt = (t: number) =>
    mermaid
      ? waistHalf + (hemHalfActual - waistHalf) * Math.pow(t, 4)
      : waistHalf + (hemHalfActual - waistHalf) * t;

  // ---- Bodice Silhouette Path ----
  const shirtPath = [
    `M ${CX - shoulderHalf} ${SHOULDER_Y + 2}`,
    `L ${CX - neckHalf} ${SHOULDER_Y - 4}`,
    `C ${CX - neckHalf * 0.6} ${SHOULDER_Y + neckDepthPx * 0.35}, ${CX - neckHalf * 0.38} ${SHOULDER_Y + neckDepthPx * 0.92}, ${CX} ${SHOULDER_Y + neckDepthPx}`,
    `C ${CX + neckHalf * 0.38} ${SHOULDER_Y + neckDepthPx * 0.92}, ${CX + neckHalf * 0.6} ${SHOULDER_Y + neckDepthPx * 0.35}, ${CX + neckHalf} ${SHOULDER_Y - 4}`,
    `L ${CX + shoulderHalf} ${SHOULDER_Y + 2}`,
    `C ${CX + bustHalf + 8} ${bustY}, ${CX + waistHalf + 3} ${waistY - 16}, ${CX + waistHalf} ${waistY}`,
    `C ${CX + waistHalf + (shirtHemHalf - waistHalf) * 0.55} ${waistY + (shirtHemY - waistY) * 0.4}, ${CX + shirtHemHalf} ${shirtHemY - 16}, ${CX + shirtHemHalf} ${shirtHemY}`,
    `Q ${CX} ${shirtHemY + 10} ${CX - shirtHemHalf} ${shirtHemY}`,
    `C ${CX - shirtHemHalf} ${shirtHemY - 16}, ${CX - waistHalf - (shirtHemHalf - waistHalf) * 0.55} ${waistY + (shirtHemY - waistY) * 0.4}, ${CX - waistHalf} ${waistY}`,
    `C ${CX - waistHalf - 3} ${waistY - 16}, ${CX - bustHalf - 8} ${bustY}, ${CX - shoulderHalf} ${SHOULDER_Y + 2}`,
    "Z",
  ].join(" ");

  const necklineTrim = `M ${CX - neckHalf * 0.82} ${SHOULDER_Y + 1} C ${CX - neckHalf * 0.5} ${SHOULDER_Y + neckDepthPx * 0.5}, ${CX - neckHalf * 0.3} ${SHOULDER_Y + neckDepthPx + 7}, ${CX} ${SHOULDER_Y + neckDepthPx + 8} C ${CX + neckHalf * 0.3} ${SHOULDER_Y + neckDepthPx + 7}, ${CX + neckHalf * 0.5} ${SHOULDER_Y + neckDepthPx * 0.5}, ${CX + neckHalf * 0.82} ${SHOULDER_Y + 1}`;

  const chinY = HEAD_CY + 26;
  const neckFill = [
    `M ${CX - 9} ${chinY - 2}`,
    `C ${CX - 9.5} ${chinY + 6}, ${CX - 10.5} ${SHOULDER_Y - 8}, ${CX - 12} ${SHOULDER_Y}`,
    `L ${CX + 12} ${SHOULDER_Y}`,
    `C ${CX + 10.5} ${SHOULDER_Y - 8}, ${CX + 9.5} ${chinY + 6}, ${CX + 9} ${chinY - 2}`,
    "Z",
  ].join(" ");

  const facePath = `M ${CX - 19} ${HEAD_CY - 5} C ${CX - 21} ${HEAD_CY + 12}, ${CX - 12} ${chinY}, ${CX} ${chinY} C ${CX + 12} ${chinY}, ${CX + 21} ${HEAD_CY + 12}, ${CX + 19} ${HEAD_CY - 5} C ${CX + 17} ${HEAD_CY - 23}, ${CX - 17} ${HEAD_CY - 23}, ${CX - 19} ${HEAD_CY - 5} Z`;
  const hairPath = `M ${CX - 23} ${HEAD_CY - 2} C ${CX - 25} ${HEAD_CY - 28}, ${CX + 25} ${HEAD_CY - 28}, ${CX + 23} ${HEAD_CY - 2} C ${CX + 25} ${HEAD_CY + 12}, ${CX + 21} ${HEAD_CY + 22}, ${CX + 17} ${HEAD_CY + 25} L ${CX - 17} ${HEAD_CY + 25} C ${CX - 21} ${HEAD_CY + 22}, ${CX - 25} ${HEAD_CY + 12}, ${CX - 23} ${HEAD_CY - 2} Z`;

  // Arms and sleeves
  const sleeve = (dir: 1 | -1) => {
    const sX = CX + dir * shoulderHalf;
    const sY = SHOULDER_Y + 2;
    const eX = sX + dir * Math.sin(sleeveAngle) * sleeveLen;
    const eY = sY + Math.cos(sleeveAngle) * sleeveLen;
    const nx = Math.cos(sleeveAngle) * sleeveWidth * 0.5 * dir;
    const ny = -Math.sin(sleeveAngle) * sleeveWidth * 0.5;
    return `M ${sX - nx} ${sY - ny} L ${sX + nx} ${sY + ny} L ${eX + nx * 0.8} ${eY + ny * 0.8} L ${eX - nx * 0.8} ${eY - ny * 0.8} Z`;
  };

  const hand = (dir: 1 | -1) => {
    const sX = CX + dir * shoulderHalf;
    const sY = SHOULDER_Y + 2;
    const eX = sX + dir * Math.sin(sleeveAngle) * sleeveLen;
    const eY = sY + Math.cos(sleeveAngle) * sleeveLen;
    const hX = eX + dir * 6;
    const hY = eY + 18;
    return `M ${eX - 4} ${eY} C ${hX - 3} ${hY - 4}, ${hX} ${hY + 6}, ${hX + 3} ${hY} C ${hX + 4} ${hY - 6}, ${eX + 4} ${eY + 2}, ${eX + 4} ${eY} Z`;
  };

  // Lehenga Skirt Path
  const lehengaPath = [
    `M ${CX - waistHalf} ${waistY}`,
    `C ${CX - waistHalf * 1.05} ${waistY + (lehengaHemY - waistY) * 0.3}, ${CX - hemHalfActual * 0.8} ${lehengaHemY - 20}, ${CX - hemHalfActual} ${lehengaHemY}`,
    `Q ${CX} ${lehengaHemY + 18} ${CX + hemHalfActual} ${lehengaHemY}`,
    `C ${CX + hemHalfActual * 0.8} ${lehengaHemY - 20}, ${CX + waistHalf * 1.05} ${waistY + (lehengaHemY - waistY) * 0.3}, ${CX + waistHalf} ${waistY}`,
    "Z",
  ].join(" ");

  // Trouser Path (Sharara / Gharara / Suit)
  const trouserPath = (dir: 1 | -1) => {
    const wX = CX + dir * (waistHalf * 0.85);
    const midX = CX + dir * (trouserHemHalf * 0.55);
    const tX = CX + dir * trouserHemHalf;
    return [
      `M ${CX} ${waistY + 15}`,
      `L ${wX} ${waistY}`,
      `C ${midX} ${waistY + (trouserHemY - waistY) * 0.45}, ${tX + dir * 10} ${trouserHemY - 24}, ${tX} ${trouserHemY}`,
      `L ${CX + dir * 6} ${trouserHemY}`,
      `C ${CX + dir * 14} ${trouserHemY - 30}, ${CX + dir * 5} ${waistY + 45}, ${CX} ${waistY + 15}`,
      "Z",
    ].join(" ");
  };

  // Dupatta drape
  const dupattaPanel = [
    `M ${CX - shoulderHalf - 4} ${SHOULDER_Y + 8}`,
    `C ${CX - shoulderHalf - 18} ${waistY}, ${CX - hemHalfActual * 0.6} ${lehengaHemY * 0.7}, ${CX - hemHalfActual * 0.7} ${lehengaHemY}`,
    `L ${CX - hemHalfActual * 0.4} ${lehengaHemY + 6}`,
    `C ${CX - hemHalfActual * 0.28} ${lehengaHemY * 0.65}, ${CX - waistHalf * 0.6} ${waistY + 18}, ${CX + shoulderHalf - 8} ${SHOULDER_Y + 12}`,
    "Z",
  ].join(" ");

  const viewHeight = Math.max(hemY, shirtHemY) + 52;

  // Active field dimension ribbon calculation with unit awareness
  type DimensionGuide =
    | { type: "horizontal"; y: number; x1: number; x2: number; label: string }
    | { type: "vertical"; x: number; y1: number; y2: number; label: string }
    | { type: "diagonal"; x1: number; y1: number; x2: number; y2: number; label: string };

  const getDimensionGuides = (): DimensionGuide | null => {
    if (!activeField || !showDimensions) return null;
    const u = unit || "in";

    switch (activeField) {
      case "bust":
        return {
          type: "horizontal",
          y: bustY,
          x1: CX - bustHalf - 6,
          x2: CX + bustHalf + 6,
          label: `Bust: ${displayValue(g.bust, u)} ${u}`,
        };
      case "waist":
        return {
          type: "horizontal",
          y: waistY,
          x1: CX - waistHalf - 6,
          x2: CX + waistHalf + 6,
          label: `Waist: ${displayValue(b.waist, u)} ${u}`,
        };
      case "hip":
        return {
          type: "horizontal",
          y: waistY + 28,
          x1: CX - hipHalf - 6,
          x2: CX + hipHalf + 6,
          label: `Hip: ${displayValue(g.hip, u)} ${u}`,
        };
      case "shoulder":
        return {
          type: "horizontal",
          y: SHOULDER_Y - 8,
          x1: CX - shoulderHalf,
          x2: CX + shoulderHalf,
          label: `Shoulder: ${displayValue(g.shoulder, u)} ${u}`,
        };
      case "neckDepth":
        return {
          type: "vertical",
          x: CX,
          y1: SHOULDER_Y - 4,
          y2: SHOULDER_Y + neckDepthPx,
          label: `Neck: ${displayValue(g.neckDepth, u)} ${u}`,
        };
      case "shirtLength":
        return {
          type: "vertical",
          x: CX + shoulderHalf + 14,
          y1: SHOULDER_Y,
          y2: shirtHemY,
          label: `Kurti: ${displayValue(g.shirtLength, u)} ${u}`,
        };
      case "sleevesLength":
        return {
          type: "diagonal",
          x1: CX + shoulderHalf,
          y1: SHOULDER_Y + 2,
          x2: CX + shoulderHalf + Math.sin(sleeveAngle) * sleeveLen,
          y2: SHOULDER_Y + 2 + Math.cos(sleeveAngle) * sleeveLen,
          label: `Sleeve: ${displayValue(g.sleevesLength, u)} ${u}`,
        };
      case "lehengaLength":
        return {
          type: "vertical",
          x: CX + hemHalfActual + 14,
          y1: waistY,
          y2: lehengaHemY,
          label: `Length: ${displayValue(l.lehengaLength, u)} ${u}`,
        };
      case "dupattaLength":
        return {
          type: "vertical",
          x: CX - hemHalfActual - 14,
          y1: SHOULDER_Y,
          y2: lehengaHemY + 10,
          label: `Dupatta: ${displayValue(l.dupattaLength, u)} ${u}`,
        };
      case "hem":
      case "flareType":
        return {
          type: "horizontal",
          y: lehengaHemY + 12,
          x1: CX - hemHalfActual,
          x2: CX + hemHalfActual,
          label: `Flare: ${l.flareType}`,
        };
      default:
        return null;
    }
  };

  const dim = getDimensionGuides();

  return (
    <div className={`relative ${className || ""}`}>
      <svg
        viewBox={`0 0 300 ${viewHeight}`}
        className="w-full h-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
        role="img"
        aria-label="Live sketch of your bespoke bridal garment"
      >
        <defs>
          {/* Dynamic Silk Bodice Gradient */}
          <linearGradient id={bodiceGrad} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor={colorProfile.bodice[0]} />
            <stop offset="50%" stopColor={colorProfile.bodice[1]} />
            <stop offset="100%" stopColor={colorProfile.bodice[2]} />
          </linearGradient>

          {/* Dynamic Silk Skirt Gradient */}
          <linearGradient id={skirtGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorProfile.skirt[0]} />
            <stop offset="60%" stopColor={colorProfile.skirt[1]} />
            <stop offset="100%" stopColor={colorProfile.skirt[2]} />
          </linearGradient>

          {/* Sheer Dupatta Gradient */}
          <linearGradient id={dupattaGrad} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={colorProfile.dupatta} stopOpacity={colorProfile.dupattaOpacity} />
            <stop offset="100%" stopColor={colorProfile.dupatta} stopOpacity={colorProfile.dupattaOpacity * 0.4} />
          </linearGradient>

          {/* Metallic Gold Sheen */}
          <linearGradient id={goldSheenGrad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.8" />
            <stop offset="50%" stopColor={GOLD_BRIGHT} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id={skinGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SKIN} />
            <stop offset="100%" stopColor={SKIN_DEEP} />
          </linearGradient>

          <radialGradient id={hairGrad} cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#4A3428" />
            <stop offset="100%" stopColor={HAIR} />
          </radialGradient>
        </defs>

        {/* Ambient Floor Shadow */}
        <ellipse
          cx={CX}
          cy={hemY + 18}
          rx={hemHalfNow * 0.88}
          ry={8}
          fill={INK}
          opacity={0.12}
        />

        {/* Humanoid Atelier Figure */}
        <g opacity={0.96}>
          <path d={hairPath} fill={`url(#${hairGrad})`} />
          <path d={neckFill} fill={`url(#${skinGrad})`} stroke={`${INK}30`} strokeWidth={0.8} />
          <path d={facePath} fill={`url(#${skinGrad})`} stroke={`${INK}40`} strokeWidth={0.9} />

          {/* Maang Tikka Jewelry in Solid Gold */}
          <line x1={CX} y1={HEAD_CY - 16} x2={CX} y2={HEAD_CY - 6} stroke={GOLD} strokeWidth={1.2} />
          <circle cx={CX} cy={HEAD_CY - 4} r={2.5} fill={`url(#${goldSheenGrad})`} />
          <circle cx={CX - 22} cy={HEAD_CY + 10} r={2.2} fill={GOLD} opacity={0.85} />
          <circle cx={CX + 22} cy={HEAD_CY + 10} r={2.2} fill={GOLD} opacity={0.85} />
        </g>

        {/* Arms & Hands */}
        {([-1, 1] as const).map((dir) => (
          <g key={`arm-${dir}`}>
            <path
              d={sleeve(dir)}
              fill={`url(#${bodiceGrad})`}
              stroke={colorProfile.accent}
              strokeWidth={0.7}
              strokeOpacity={0.6}
            />
            {/* Gold bangle trim at cuff */}
            <line
              x1={CX + dir * shoulderHalf + dir * Math.sin(sleeveAngle) * (sleeveLen - 4) - 6}
              y1={SHOULDER_Y + 2 + Math.cos(sleeveAngle) * (sleeveLen - 4)}
              x2={CX + dir * shoulderHalf + dir * Math.sin(sleeveAngle) * (sleeveLen - 4) + 6}
              y2={SHOULDER_Y + 2 + Math.cos(sleeveAngle) * (sleeveLen - 4)}
              stroke={GOLD}
              strokeWidth={1.4}
            />
            <path
              d={hand(dir)}
              fill={SKIN}
              stroke={`${INK}20`}
              strokeWidth={0.6}
            />
          </g>
        ))}

        {/* Lower Garment (Lehenga or Trouser) */}
        {isLehenga ? (
          <g key="lehenga-group">
            <path
              d={lehengaPath}
              fill={`url(#${skirtGrad})`}
              stroke={colorProfile.accent}
              strokeWidth={0.8}
              strokeOpacity={0.5}
            />

            {/* Kali Panel Creases */}
            {KALI_FRACTIONS.map((f, i) => (
              <path
                key={`kali-${i}`}
                d={`M ${CX + waistHalf * f} ${waistY + 4} Q ${CX + (hemHalfActual * f * 0.7)} ${waistY + (lehengaHemY - waistY) * 0.5} ${CX + hemHalfActual * f} ${lehengaHemY}`}
                fill="none"
                stroke={colorProfile.accent}
                strokeWidth={0.75}
                strokeOpacity={0.35}
              />
            ))}

            {/* Authentic Metallic Gold Bootas across the skirt */}
            {density !== "light" && density !== "minimal" && (
              <g className="transition-opacity duration-300">
                {/* Row 1 bootis */}
                {[-0.45, 0, 0.45].map((spread, idx) => {
                  const bY = waistY + (lehengaHemY - waistY) * 0.42;
                  const bX = CX + skirtHalfAt(0.42) * spread;
                  return (
                    <path
                      key={`boota-1-${idx}`}
                      d={bootaPath(bX, bY, 3.2)}
                      fill={GOLD_LIGHT}
                      opacity={0.85}
                    />
                  );
                })}
                {/* Row 2 bootis */}
                {[-0.65, -0.22, 0.22, 0.65].map((spread, idx) => {
                  const bY = waistY + (lehengaHemY - waistY) * 0.68;
                  const bX = CX + skirtHalfAt(0.68) * spread;
                  return (
                    <path
                      key={`boota-2-${idx}`}
                      d={bootaPath(bX, bY, 3.6)}
                      fill={GOLD_LIGHT}
                      opacity={0.9}
                    />
                  );
                })}
                {/* Bridal Heavy extra spray */}
                {(density === "heavy" || density === "bridal") && (
                  <>
                    {[-0.5, -0.15, 0.15, 0.5].map((spread, idx) => {
                      const bY = waistY + (lehengaHemY - waistY) * 0.84;
                      const bX = CX + skirtHalfAt(0.84) * spread;
                      return (
                        <path
                          key={`boota-3-${idx}`}
                          d={bootaPath(bX, bY, 4.2)}
                          fill={GOLD_BRIGHT}
                          opacity={0.95}
                        />
                      );
                    })}
                  </>
                )}
              </g>
            )}

            {/* Rich Zardozi Hem Border */}
            <path
              d={`M ${CX - hemHalfActual} ${lehengaHemY - 14} Q ${CX} ${lehengaHemY + 4} ${CX + hemHalfActual} ${lehengaHemY - 14} L ${CX + hemHalfActual} ${lehengaHemY} Q ${CX} ${lehengaHemY + 18} ${CX - hemHalfActual} ${lehengaHemY} Z`}
              fill={`url(#${goldSheenGrad})`}
              opacity={density === "heavy" ? 0.95 : 0.75}
            />
          </g>
        ) : (
          <g key="trouser-group">
            {([-1, 1] as const).map((dir) => (
              <path
                key={`trouser-leg-${dir}`}
                d={trouserPath(dir)}
                fill={`url(#${skirtGrad})`}
                stroke={colorProfile.accent}
                strokeWidth={0.8}
                strokeOpacity={0.5}
              />
            ))}
          </g>
        )}

        {/* Bodice (Choli / Kurti) */}
        <path
          d={shirtPath}
          fill={`url(#${bodiceGrad})`}
          stroke={colorProfile.accent}
          strokeWidth={0.85}
          strokeOpacity={0.6}
        />

        {/* Gold Embroidered Neckline Collar */}
        <path
          d={necklineTrim}
          fill="none"
          stroke={GOLD}
          strokeWidth={activeField === "neckDepth" ? 2.4 : 1.6}
          strokeDasharray="2 3"
        />

        {/* Translucent Silk Dupatta */}
        <path
          d={dupattaPanel}
          fill={`url(#${dupattaGrad})`}
          stroke={activeField === "dupattaLength" ? GOLD : colorProfile.accent}
          strokeWidth={activeField === "dupattaLength" ? 2 : 0.8}
          strokeOpacity={0.7}
        />

        {/* Glowing Gold Measurement Dimension Line & Callout */}
        {dim && (
          <g className="pointer-events-none">
            {dim.type === "horizontal" && (
              <>
                <line
                  x1={dim.x1}
                  y1={dim.y}
                  x2={dim.x2}
                  y2={dim.y}
                  stroke={GOLD_BRIGHT}
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
                <circle cx={dim.x1} cy={dim.y} r={3} fill={GOLD_BRIGHT} />
                <circle cx={dim.x2} cy={dim.y} r={3} fill={GOLD_BRIGHT} />
                <rect
                  x={CX - 45}
                  y={dim.y - 10}
                  width={90}
                  height={20}
                  rx={10}
                  fill="#03140E"
                  stroke={GOLD}
                  strokeWidth={1}
                />
                <text
                  x={CX}
                  y={dim.y + 4}
                  textAnchor="middle"
                  fill="#F1E2C8"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  {dim.label}
                </text>
              </>
            )}

            {dim.type === "vertical" && (
              <>
                <line
                  x1={dim.x}
                  y1={dim.y1}
                  x2={dim.x}
                  y2={dim.y2}
                  stroke={GOLD_BRIGHT}
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
                <circle cx={dim.x} cy={dim.y1} r={3} fill={GOLD_BRIGHT} />
                <circle cx={dim.x} cy={dim.y2} r={3} fill={GOLD_BRIGHT} />
                <rect
                  x={dim.x - 45}
                  y={(dim.y1 + dim.y2) / 2 - 10}
                  width={90}
                  height={20}
                  rx={10}
                  fill="#03140E"
                  stroke={GOLD}
                  strokeWidth={1}
                />
                <text
                  x={dim.x}
                  y={(dim.y1 + dim.y2) / 2 + 4}
                  textAnchor="middle"
                  fill="#F1E2C8"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  {dim.label}
                </text>
              </>
            )}

            {dim.type === "diagonal" && (
              <>
                <line
                  x1={dim.x1}
                  y1={dim.y1}
                  x2={dim.x2}
                  y2={dim.y2}
                  stroke={GOLD_BRIGHT}
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
                <circle cx={dim.x1} cy={dim.y1} r={3} fill={GOLD_BRIGHT} />
                <circle cx={dim.x2} cy={dim.y2} r={3} fill={GOLD_BRIGHT} />
                <rect
                  x={(dim.x1 + dim.x2) / 2 - 45}
                  y={(dim.y1 + dim.y2) / 2 - 10}
                  width={90}
                  height={20}
                  rx={10}
                  fill="#03140E"
                  stroke={GOLD}
                  strokeWidth={1}
                />
                <text
                  x={(dim.x1 + dim.x2) / 2}
                  y={(dim.y1 + dim.y2) / 2 + 4}
                  textAnchor="middle"
                  fill="#F1E2C8"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  {dim.label}
                </text>
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
