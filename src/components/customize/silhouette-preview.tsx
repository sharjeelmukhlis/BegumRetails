"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { GarmentType } from "@/lib/types";
import type {
  GarmentMeasurements,
  BottomMeasurements,
  LehengaSpecific,
  MeasurementFieldKey,
} from "@/lib/customize/schema";
import { standardSizeCharts, lehengaDefaults } from "@/lib/customize/standard-sizes";

/**
 * Live 2D silhouette preview — an isolated, props-driven component.
 * Drawn as a humanoid bridal fashion illustration: a soft-featured face,
 * filled neck and décolletage, volumetric arms and hands, a darted choli,
 * a kali-panelled skirt with boota motifs, a translucent dupatta, and
 * khussa feet. Reshapes smoothly (framer-motion path morphing) as
 * measurements change.
 */
interface SilhouettePreviewProps {
  garmentType: GarmentType | null;
  garment: Partial<GarmentMeasurements>;
  bottom: Partial<BottomMeasurements>;
  lehenga: Partial<LehengaSpecific>;
  activeField?: MeasurementFieldKey | null;
  className?: string;
}

const fallback = standardSizeCharts.M;
const fallbackLehenga = lehengaDefaults.M;

const CX = 150;
const HEAD_CY = 50;
const SHOULDER_Y = 92;
const K = 2.1;
const KW = 2.1;

const INK = "#062319";
const GOLD = "#C9975A";
const SKIN = "#F0D9BE";
const SKIN_DEEP = "#E4C4A0";
const HAIR = "#2A1F18";

/** Front-view half-width from a circumference measurement. */
const halfW = (circumference: number) => (circumference / 3 / 2) * KW * 1.9;

const KALI_FRACTIONS = [-0.68, -0.36, 0, 0.36, 0.68];
const HEM_SCALLOPS = 6;

const BOOTA_ROWS: { t: number; spread: number[] }[] = [
  { t: 0.4, spread: [-0.5, 0, 0.5] },
  { t: 0.64, spread: [-0.66, -0.22, 0.22, 0.66] },
];

const bootaPath = (x: number, y: number) =>
  `M ${x} ${y - 3.4} Q ${x + 3.4} ${y} ${x} ${y + 3.4} Q ${x - 3.4} ${y} ${x} ${y - 3.4} Z ` +
  `M ${x - 3.4} ${y} Q ${x} ${y - 3.4} ${x + 3.4} ${y} Q ${x} ${y + 3.4} ${x - 3.4} ${y} Z`;

export function SilhouettePreview({
  garmentType,
  garment,
  bottom,
  lehenga,
  activeField,
  className,
}: SilhouettePreviewProps) {
  const reducedMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bodiceGrad = `bodice-${uid}`;
  const skirtGrad = `skirt-${uid}`;
  const dupattaGrad = `dupatta-${uid}`;
  const skinGrad = `skin-${uid}`;
  const hairGrad = `hair-${uid}`;

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

  // ---- Derived geometry ----
  const shoulderHalf = (g.shoulder / 2) * KW;
  const neckHalf = Math.min(shoulderHalf * 0.42, 23);
  const neckDepthPx = g.neckDepth * K * 0.85;
  const bustHalf = halfW(g.bust);
  const hipHalf = halfW(g.hip);
  const shirtHemY = SHOULDER_Y + g.shirtLength * K * 0.82;
  const bustY = SHOULDER_Y + 52;
  const waistY = SHOULDER_Y + 96;
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
      ? 0.62
      : l.flareType === "A-line"
        ? 0.4
        : 0.18;
  const lehengaHemHalf = waistHalf + l.lehengaLength * K * flareFactor;
  const hemHalfActual = mermaid ? lehengaHemHalf + l.lehengaLength * 0.5 : lehengaHemHalf;
  const kneeY = waistY + (lehengaHemY - waistY) * 0.68;
  const hemY = isLehenga ? lehengaHemY : trouserHemY;
  const trouserHemHalf = (b.hem / 3) * KW * (isFlaredTrouser ? 2.4 : 1.15);
  const hemHalfNow = isLehenga ? hemHalfActual : trouserHemHalf + 8;

  const skirtHalfAt = (t: number) =>
    mermaid
      ? waistHalf + (hemHalfActual - waistHalf) * Math.pow(t, 4)
      : waistHalf + (hemHalfActual - waistHalf) * t;

  // ---- Bodice ----
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

  const dart = (dir: 1 | -1) =>
    `M ${CX + dir * bustHalf * 0.42} ${bustY + 4} C ${CX + dir * bustHalf * 0.4} ${bustY + 18}, ${CX + dir * waistHalf * 0.5} ${waistY - 18}, ${CX + dir * waistHalf * 0.48} ${waistY - 2}`;

  const collarbone = (dir: 1 | -1) =>
    `M ${CX + dir * neckHalf * 0.9} ${SHOULDER_Y + 5} Q ${CX + dir * neckHalf * 0.4} ${SHOULDER_Y + 10} ${CX + dir * 3} ${SHOULDER_Y + 8}`;

  // Skin visible through the neckline cutout
  const chestPath = [
    `M ${CX - neckHalf * 0.95} ${SHOULDER_Y - 2}`,
    `C ${CX - neckHalf * 0.55} ${SHOULDER_Y + neckDepthPx * 0.4}, ${CX - neckHalf * 0.35} ${SHOULDER_Y + neckDepthPx * 0.95}, ${CX} ${SHOULDER_Y + neckDepthPx + 2}`,
    `C ${CX + neckHalf * 0.35} ${SHOULDER_Y + neckDepthPx * 0.95}, ${CX + neckHalf * 0.55} ${SHOULDER_Y + neckDepthPx * 0.4}, ${CX + neckHalf * 0.95} ${SHOULDER_Y - 2}`,
    `Q ${CX} ${SHOULDER_Y + neckDepthPx * 0.55} ${CX - neckHalf * 0.95} ${SHOULDER_Y - 2}`,
    "Z",
  ].join(" ");

  // Short filled neck — chin sits close to the collarbone (humanoid, not croquis)
  const chinY = HEAD_CY + 26;
  const neckFill = [
    `M ${CX - 9} ${chinY - 2}`,
    `C ${CX - 9.5} ${chinY + 6}, ${CX - 10.5} ${SHOULDER_Y - 8}, ${CX - 12} ${SHOULDER_Y}`,
    `L ${CX + 12} ${SHOULDER_Y}`,
    `C ${CX + 10.5} ${SHOULDER_Y - 8}, ${CX + 9.5} ${chinY + 6}, ${CX + 9} ${chinY - 2}`,
    "Z",
  ].join(" ");

  // Larger soft oval face (jaw narrower than temples)
  const facePath = [
    `M ${CX} ${HEAD_CY - 24}`,
    `C ${CX + 19} ${HEAD_CY - 24}, ${CX + 24} ${HEAD_CY - 8}, ${CX + 23.5} ${HEAD_CY + 4}`,
    `C ${CX + 23} ${HEAD_CY + 16}, ${CX + 14} ${HEAD_CY + 25}, ${CX} ${chinY}`,
    `C ${CX - 14} ${HEAD_CY + 25}, ${CX - 23} ${HEAD_CY + 16}, ${CX - 23.5} ${HEAD_CY + 4}`,
    `C ${CX - 24} ${HEAD_CY - 8}, ${CX - 19} ${HEAD_CY - 24}, ${CX} ${HEAD_CY - 24}`,
    "Z",
  ].join(" ");

  // Hair volume framing the face + low bridal bun
  const hairPath = [
    `M ${CX - 22} ${HEAD_CY - 6}`,
    `C ${CX - 26} ${HEAD_CY - 24}, ${CX - 12} ${HEAD_CY - 34}, ${CX} ${HEAD_CY - 33}`,
    `C ${CX + 12} ${HEAD_CY - 34}, ${CX + 26} ${HEAD_CY - 24}, ${CX + 22} ${HEAD_CY - 6}`,
    `C ${CX + 24} ${HEAD_CY + 4}, ${CX + 20} ${HEAD_CY + 14}, ${CX + 17} ${HEAD_CY + 18}`,
    `L ${CX + 14} ${HEAD_CY + 10}`,
    `C ${CX + 12} ${HEAD_CY - 2}, ${CX + 7} ${HEAD_CY - 12}, ${CX} ${HEAD_CY - 14}`,
    `C ${CX - 7} ${HEAD_CY - 12}, ${CX - 12} ${HEAD_CY - 2}, ${CX - 14} ${HEAD_CY + 10}`,
    `L ${CX - 17} ${HEAD_CY + 18}`,
    `C ${CX - 20} ${HEAD_CY + 14}, ${CX - 24} ${HEAD_CY + 4}, ${CX - 22} ${HEAD_CY - 6}`,
    "Z",
  ].join(" ");
  const bunPath = [
    `M ${CX + 12} ${HEAD_CY - 26}`,
    `C ${CX + 12} ${HEAD_CY - 36}, ${CX + 24} ${HEAD_CY - 38}, ${CX + 26} ${HEAD_CY - 28}`,
    `C ${CX + 28} ${HEAD_CY - 18}, ${CX + 18} ${HEAD_CY - 16}, ${CX + 12} ${HEAD_CY - 22}`,
    "Z",
  ].join(" ");

  const sleeveGeom = (dir: 1 | -1) => {
    const x0 = CX + dir * shoulderHalf;
    const yCuff = SHOULDER_Y + sleeveLen;
    const xCuffOuter = x0 + dir * (sleeveLen * sleeveAngle + sleeveWidth * 0.35);
    const xCuffInner = xCuffOuter - dir * sleeveWidth * 1.05;
    const xUnderarm = x0 - dir * sleeveWidth * 1.02;
    const body = [
      `M ${x0} ${SHOULDER_Y + 2}`,
      `C ${x0 + dir * sleeveWidth * 0.55} ${SHOULDER_Y + sleeveLen * 0.3}, ${xCuffOuter + dir * 3} ${yCuff - sleeveLen * 0.22}, ${xCuffOuter} ${yCuff}`,
      `L ${xCuffInner} ${yCuff + 4}`,
      `C ${xCuffInner - dir * 3} ${SHOULDER_Y + sleeveLen * 0.55}, ${xUnderarm} ${SHOULDER_Y + sleeveWidth * 1.9}, ${xUnderarm} ${SHOULDER_Y + sleeveWidth * 1.35}`,
      "Z",
    ].join(" ");
    const cuff = `M ${xCuffInner + dir * 2} ${yCuff - 5} L ${xCuffOuter - dir * 2} ${yCuff - 6}`;
    const fold = `M ${x0 + dir * sleeveWidth * 0.1} ${SHOULDER_Y + 14} C ${x0 + dir * sleeveWidth * 0.25} ${SHOULDER_Y + sleeveLen * 0.45}, ${(xCuffOuter + xCuffInner) / 2 + dir * 2} ${yCuff - sleeveLen * 0.25}, ${(xCuffOuter + xCuffInner) / 2} ${yCuff - 4}`;
    return { body, cuff, fold, xCuffOuter, xCuffInner, yCuff };
  };
  const sleeveL = sleeveGeom(-1);
  const sleeveR = sleeveGeom(1);

  // Soft skin shoulder pad where the sleeve meets the neckline
  const shoulderSkin = (dir: 1 | -1) => [
    `M ${CX + dir * neckHalf * 0.85} ${SHOULDER_Y - 3}`,
    `Q ${CX + dir * (shoulderHalf * 0.55)} ${SHOULDER_Y - 8} ${CX + dir * shoulderHalf} ${SHOULDER_Y + 1}`,
    `Q ${CX + dir * (shoulderHalf * 0.7)} ${SHOULDER_Y + 10} ${CX + dir * (neckHalf * 0.7)} ${SHOULDER_Y + 6}`,
    "Z",
  ].join(" ");

  // Filled forearm + articulated hand with distinct fingers
  const armGeom = (s: ReturnType<typeof sleeveGeom>, dir: 1 | -1) => {
    const handY = Math.min(Math.max(waistY + 38, s.yCuff + 20), hemY - 28);
    const handX = CX + dir * (Math.max(shirtHemHalf, waistHalf * 0.9) + 12);
    const wristW = 5.6;
    const forearm = [
      `M ${s.xCuffOuter - dir * 1.5} ${s.yCuff + 1}`,
      `C ${s.xCuffOuter + dir * 1.5} ${(s.yCuff + handY) / 2 - 4}, ${handX + dir * (wristW + 1.5)} ${handY - 14}, ${handX + dir * wristW} ${handY - 1}`,
      `L ${handX - dir * wristW} ${handY - 1}`,
      `C ${handX - dir * (wristW + 1.5)} ${handY - 14}, ${s.xCuffInner - dir * 1} ${(s.yCuff + handY) / 2}, ${s.xCuffInner + dir * 2} ${s.yCuff + 3}`,
      "Z",
    ].join(" ");
    const palm = [
      `M ${handX - 5.5} ${handY}`,
      `Q ${handX} ${handY - 4.5} ${handX + 5.5} ${handY}`,
      `Q ${handX + 6} ${handY + 7} ${handX + 4} ${handY + 11}`,
      `Q ${handX} ${handY + 12.5} ${handX - 4} ${handY + 11}`,
      `Q ${handX - 6} ${handY + 7} ${handX - 5.5} ${handY}`,
      "Z",
    ].join(" ");
    // Filled finger ovals — clearly humanoid, not mitten tips
    const finger = (ox: number, oy: number, len = 7.5) =>
      `M ${handX + ox - 1.35} ${handY + oy} Q ${handX + ox} ${handY + oy - 1.5} ${handX + ox + 1.35} ${handY + oy} L ${handX + ox + 1.2} ${handY + oy + len} Q ${handX + ox} ${handY + oy + len + 2.2} ${handX + ox - 1.2} ${handY + oy + len} Z`;
    const fingers = [
      finger(-3.4, 10, 7),
      finger(-1.1, 11, 8),
      finger(1.3, 11, 7.8),
      finger(3.6, 10, 6.6),
    ].join(" ");
    const thumb = [
      `M ${handX + dir * 5} ${handY + 1}`,
      `Q ${handX + dir * 9.5} ${handY + 3} ${handX + dir * 8.5} ${handY + 8}`,
      `Q ${handX + dir * 6.5} ${handY + 9} ${handX + dir * 4.5} ${handY + 5}`,
      "Z",
    ].join(" ");
    return { forearm, palm, fingers, thumb, handX, handY };
  };
  const armL = armGeom(sleeveL, -1);
  const armR = armGeom(sleeveR, 1);

  const hemScallops = (() => {
    const segW = (2 * hemHalfActual) / HEM_SCALLOPS;
    let d = "";
    for (let i = 0; i < HEM_SCALLOPS; i += 1) {
      const x0 = CX - hemHalfActual + segW * i;
      d += ` Q ${x0 + segW / 2} ${lehengaHemY + 11} ${x0 + segW} ${lehengaHemY}`;
    }
    return d;
  })();

  const lehengaPath = [
    `M ${CX - waistHalf} ${waistY}`,
    mermaid
      ? `C ${CX - waistHalf - 6} ${kneeY}, ${CX - waistHalf - 2} ${kneeY + 10}, ${CX - hemHalfActual} ${lehengaHemY}`
      : `C ${CX - waistHalf - (hemHalfActual - waistHalf) * 0.35} ${waistY + (lehengaHemY - waistY) * 0.4}, ${CX - hemHalfActual * 0.9} ${lehengaHemY - 30}, ${CX - hemHalfActual} ${lehengaHemY}`,
    hemScallops,
    mermaid
      ? `C ${CX + waistHalf + 2} ${kneeY + 10}, ${CX + waistHalf + 6} ${kneeY}, ${CX + waistHalf} ${waistY}`
      : `C ${CX + hemHalfActual * 0.9} ${lehengaHemY - 30}, ${CX + waistHalf + (hemHalfActual - waistHalf) * 0.35} ${waistY + (lehengaHemY - waistY) * 0.4}, ${CX + waistHalf} ${waistY}`,
    "Z",
  ].join(" ");

  const kaliLine = (f: number) =>
    `M ${CX + f * waistHalf * 0.85} ${waistY + 10} Q ${CX + f * skirtHalfAt(0.5) * 0.96} ${(waistY + lehengaHemY) / 2}, ${CX + f * hemHalfActual * 0.88} ${lehengaHemY - 8}`;

  const skirtShade = (dir: 1 | -1) =>
    `M ${CX + dir * waistHalf * 0.72} ${waistY + 22} C ${CX + dir * skirtHalfAt(0.45) * 0.85} ${waistY + (lehengaHemY - waistY) * 0.45}, ${CX + dir * hemHalfActual * 0.74} ${lehengaHemY - 44}, ${CX + dir * hemHalfActual * 0.68} ${lehengaHemY - 18}`;

  const hemBorderOuter = `M ${CX - hemHalfActual * 0.97} ${lehengaHemY - 15} Q ${CX} ${lehengaHemY - 3} ${CX + hemHalfActual * 0.97} ${lehengaHemY - 15}`;
  const hemBorderInner = `M ${CX - hemHalfActual * 0.93} ${lehengaHemY - 27} Q ${CX} ${lehengaHemY - 16} ${CX + hemHalfActual * 0.93} ${lehengaHemY - 27}`;

  const waistbandPath = `M ${CX - waistHalf} ${waistY} h ${waistHalf * 2} v 8 h ${-waistHalf * 2} Z`;

  const bootas = BOOTA_ROWS.flatMap(({ t, spread }, row) =>
    spread.map((f, i) => {
      const y = waistY + (lehengaHemY - waistY) * t;
      const x = CX + f * skirtHalfAt(t) * 0.78;
      return { key: `${row}-${i}`, d: bootaPath(x, y) };
    }),
  );

  const scallopDots = Array.from({ length: HEM_SCALLOPS - 1 }, (_, i) => {
    const segW = (2 * hemHalfActual) / HEM_SCALLOPS;
    return { key: i, cx: CX - hemHalfActual + segW * (i + 1), cy: lehengaHemY + 2 };
  });

  const trouserLeg = (dir: 1 | -1) => {
    const inner = dir * 4;
    const thighHalf = ((b.thigh ?? 58) / 3) * KW * 0.95;
    const xTop = CX + inner;
    const xOuter = CX + dir * waistHalf;
    return [
      `M ${xTop} ${waistY + 6}`,
      `L ${xOuter} ${waistY + 6}`,
      `C ${CX + dir * thighHalf} ${waistY + 70}, ${CX + dir * (thighHalf * 0.6 + trouserHemHalf * 0.5)} ${trouserHemY - 40}, ${CX + dir * (4 + trouserHemHalf)} ${trouserHemY}`,
      `Q ${CX + dir * (4 + trouserHemHalf * 0.5)} ${trouserHemY + 6} ${xTop} ${trouserHemY}`,
      "Z",
    ].join(" ");
  };

  const trouserFold = (dir: 1 | -1) => {
    const thighHalf = ((b.thigh ?? 58) / 3) * KW * 0.95;
    return `M ${CX + dir * thighHalf * 0.5} ${waistY + 44} Q ${CX + dir * thighHalf * 0.45} ${(waistY + trouserHemY) / 2}, ${CX + dir * (4 + trouserHemHalf) * 0.55} ${trouserHemY - 8}`;
  };

  const trouserCuff = (dir: 1 | -1) =>
    `M ${CX + dir * 5} ${trouserHemY - 9} Q ${CX + dir * (4 + trouserHemHalf) * 0.55} ${trouserHemY - 13} ${CX + dir * (2 + trouserHemHalf)} ${trouserHemY - 7}`;

  // Humanoid foot in a khussa — ankle taper + pointed toe
  const foot = (dir: 1 | -1) => {
    const x = CX + dir * 14;
    const y = hemY + 8;
    return [
      `M ${x - dir * 3} ${y - 4}`,
      `C ${x - dir * 5} ${y + 1}, ${x - dir * 8} ${y + 5}, ${x - dir * 2} ${y + 7}`,
      `Q ${x + dir * 4} ${y + 8.5} ${x + dir * 11} ${y + 3}`,
      `Q ${x + dir * 8} ${y - 1}, ${x + dir * 2} ${y - 3}`,
      `Q ${x - dir * 1} ${y - 5}, ${x - dir * 3} ${y - 4}`,
      "Z",
    ].join(" ");
  };

  const dupattaDrop = Math.min(l.dupattaLength * 0.62, hemY - SHOULDER_Y - 24);
  const dupattaPanel = [
    `M ${CX - shoulderHalf + 2} ${SHOULDER_Y - 2}`,
    `C ${CX - shoulderHalf - 28} ${SHOULDER_Y + l.dupattaLength * 0.33}, ${CX - shoulderHalf - 16} ${SHOULDER_Y + l.dupattaLength * 0.52}, ${CX - shoulderHalf + 8} ${SHOULDER_Y + dupattaDrop}`,
    `Q ${CX - shoulderHalf + 16} ${SHOULDER_Y + dupattaDrop + 6} ${CX - shoulderHalf + 24} ${SHOULDER_Y + dupattaDrop - 8}`,
    `C ${CX - shoulderHalf + 2} ${SHOULDER_Y + l.dupattaLength * 0.46}, ${CX - shoulderHalf - 8} ${SHOULDER_Y + l.dupattaLength * 0.3}, ${CX - shoulderHalf + 16} ${SHOULDER_Y + 4}`,
    "Z",
  ].join(" ");
  const dupattaEdge = `M ${CX - shoulderHalf + 2} ${SHOULDER_Y - 2} C ${CX - shoulderHalf - 28} ${SHOULDER_Y + l.dupattaLength * 0.33}, ${CX - shoulderHalf - 16} ${SHOULDER_Y + l.dupattaLength * 0.52}, ${CX - shoulderHalf + 8} ${SHOULDER_Y + dupattaDrop}`;

  const transition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 170, damping: 26 };

  const isActive = (fields: MeasurementFieldKey[]) =>
    activeField != null && fields.includes(activeField);

  const strokeFor = (fields: MeasurementFieldKey[]) =>
    isActive(fields) ? GOLD : INK;
  const strokeWidthFor = (fields: MeasurementFieldKey[]) => (isActive(fields) ? 2.4 : 1.3);

  const bottomFields: MeasurementFieldKey[] = isLehenga
    ? ["waist", "length", "hem", "lehengaLength"]
    : ["waist", "thigh", "length", "hem"];

  const viewHeight = Math.max(hemY, shirtHemY) + 48;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 300 ${viewHeight}`}
        className="w-full h-auto"
        role="img"
        aria-label="Live sketch of your garment, updating as you adjust measurements"
      >
        <defs>
          <linearGradient id={bodiceGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBF7F0" />
            <stop offset="100%" stopColor="#F1E3CC" />
          </linearGradient>
          <linearGradient id={skirtGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9CA9F" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#E2B778" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#C9975A" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={dupattaGrad} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.16" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.05" />
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

        {/* Floor shadow */}
        <motion.ellipse
          animate={{ cx: CX, cy: hemY + 18, rx: hemHalfNow * 0.85 }}
          initial={false}
          transition={transition}
          ry={7}
          fill={INK}
          opacity={0.06}
        />

        {/* ---- Humanoid figure: hair, face, neck ---- */}
        <g>
          {/* Hair mass behind the face */}
          <path d={hairPath} fill={`url(#${hairGrad})`} opacity={0.92} />
          <path d={bunPath} fill={`url(#${hairGrad})`} opacity={0.95} />
          {/* Bun highlight ring */}
          <ellipse
            cx={CX + 19}
            cy={HEAD_CY - 27}
            rx={6.5}
            ry={5.2}
            fill="none"
            stroke={`${GOLD}66`}
            strokeWidth={0.8}
          />

          {/* Neck */}
          <path
            d={neckFill}
            fill={`url(#${skinGrad})`}
            stroke={`${INK}40`}
            strokeWidth={0.9}
          />

          {/* Face oval */}
          <path
            d={facePath}
            fill={`url(#${skinGrad})`}
            stroke={`${INK}4D`}
            strokeWidth={1}
          />

          {/* Ears */}
          <ellipse
            cx={CX - 23}
            cy={HEAD_CY + 3}
            rx={3.6}
            ry={5}
            fill={SKIN}
            stroke={`${INK}40`}
            strokeWidth={0.8}
          />
          <ellipse
            cx={CX + 23}
            cy={HEAD_CY + 3}
            rx={3.6}
            ry={5}
            fill={SKIN}
            stroke={`${INK}40`}
            strokeWidth={0.8}
          />

          {/* Soft hairline fringe over the forehead */}
          <path
            d={`M ${CX - 16} ${HEAD_CY - 14} Q ${CX - 5} ${HEAD_CY - 22} ${CX} ${HEAD_CY - 16} Q ${CX + 5} ${HEAD_CY - 22} ${CX + 16} ${HEAD_CY - 14}`}
            fill="none"
            stroke={HAIR}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.55}
          />

          {/* Brows */}
          <path
            d={`M ${CX - 13} ${HEAD_CY - 3} Q ${CX - 8} ${HEAD_CY - 6.5} ${CX - 3.5} ${HEAD_CY - 3.2}`}
            fill="none"
            stroke={`${INK}80`}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <path
            d={`M ${CX + 3.5} ${HEAD_CY - 3.2} Q ${CX + 8} ${HEAD_CY - 6.5} ${CX + 13} ${HEAD_CY - 3}`}
            fill="none"
            stroke={`${INK}80`}
            strokeWidth={1.2}
            strokeLinecap="round"
          />

          {/* Eyes */}
          <ellipse cx={CX - 8} cy={HEAD_CY + 2.5} rx={4} ry={2} fill={`${INK}1A`} />
          <ellipse cx={CX + 8} cy={HEAD_CY + 2.5} rx={4} ry={2} fill={`${INK}1A`} />
          <circle cx={CX - 8} cy={HEAD_CY + 2.5} r={1.3} fill={INK} opacity={0.75} />
          <circle cx={CX + 8} cy={HEAD_CY + 2.5} r={1.3} fill={INK} opacity={0.75} />
          <path
            d={`M ${CX - 12} ${HEAD_CY + 1.2} Q ${CX - 8} ${HEAD_CY - 0.5} ${CX - 4} ${HEAD_CY + 1.2}`}
            fill="none"
            stroke={`${INK}66`}
            strokeWidth={0.95}
            strokeLinecap="round"
          />
          <path
            d={`M ${CX + 4} ${HEAD_CY + 1.2} Q ${CX + 8} ${HEAD_CY - 0.5} ${CX + 12} ${HEAD_CY + 1.2}`}
            fill="none"
            stroke={`${INK}66`}
            strokeWidth={0.95}
            strokeLinecap="round"
          />

          {/* Nose */}
          <path
            d={`M ${CX} ${HEAD_CY + 3} Q ${CX + 1.8} ${HEAD_CY + 9} ${CX} ${HEAD_CY + 12}`}
            fill="none"
            stroke={`${INK}4D`}
            strokeWidth={0.95}
            strokeLinecap="round"
          />

          {/* Lips */}
          <path
            d={`M ${CX - 5} ${HEAD_CY + 17} Q ${CX} ${HEAD_CY + 15.2} ${CX + 5} ${HEAD_CY + 17} Q ${CX} ${HEAD_CY + 20} ${CX - 5} ${HEAD_CY + 17}`}
            fill="#C97B7B"
            opacity={0.55}
            stroke={`${INK}33`}
            strokeWidth={0.6}
          />

          {/* Chin hint */}
          <path
            d={`M ${CX - 6} ${HEAD_CY + 23} Q ${CX} ${chinY - 1} ${CX + 6} ${HEAD_CY + 23}`}
            fill="none"
            stroke={`${INK}26`}
            strokeWidth={0.8}
            strokeLinecap="round"
          />

          {/* Jewelry: maang tikka + jhumkay */}
          <line
            x1={CX}
            y1={HEAD_CY - 16}
            x2={CX}
            y2={HEAD_CY - 7}
            stroke={`${GOLD}CC`}
            strokeWidth={1}
          />
          <circle cx={CX} cy={HEAD_CY - 5} r={2.3} fill={GOLD} opacity={0.85} />
          <circle cx={CX - 23} cy={HEAD_CY + 10} r={2.2} fill={GOLD} opacity={0.75} />
          <circle cx={CX + 23} cy={HEAD_CY + 10} r={2.2} fill={GOLD} opacity={0.75} />
          <line
            x1={CX - 23}
            y1={HEAD_CY + 12}
            x2={CX - 23}
            y2={HEAD_CY + 17}
            stroke={`${GOLD}99`}
            strokeWidth={0.8}
          />
          <line
            x1={CX + 23}
            y1={HEAD_CY + 12}
            x2={CX + 23}
            y2={HEAD_CY + 17}
            stroke={`${GOLD}99`}
            strokeWidth={0.8}
          />
        </g>

        {/* Feet — under the hem */}
        {([-1, 1] as const).map((dir) => (
          <motion.path
            key={`foot-${dir}`}
            animate={{ d: foot(dir) }}
            initial={false}
            transition={transition}
            fill={`${GOLD}4D`}
            stroke={`${INK}59`}
            strokeWidth={0.9}
          />
        ))}

        {/* ---- Bottom garment ---- */}
        {isLehenga ? (
          <g key="lehenga">
            <motion.path
              animate={{ d: lehengaPath }}
              initial={false}
              transition={transition}
              fill={`url(#${skirtGrad})`}
              stroke={strokeFor(bottomFields)}
              strokeWidth={strokeWidthFor(bottomFields)}
              strokeLinejoin="round"
            />
            {([-1, 1] as const).map((dir) => (
              <motion.path
                key={`shade-${dir}`}
                animate={{ d: skirtShade(dir) }}
                initial={false}
                transition={transition}
                fill="none"
                stroke={INK}
                strokeOpacity={0.05}
                strokeWidth={7}
                strokeLinecap="round"
              />
            ))}
            {KALI_FRACTIONS.map((f) => (
              <motion.path
                key={f}
                animate={{ d: kaliLine(f) }}
                initial={false}
                transition={transition}
                fill="none"
                stroke={`${INK}30`}
                strokeWidth={0.9}
              />
            ))}
            {bootas.map((m) => (
              <motion.path
                key={m.key}
                animate={{ d: m.d }}
                initial={false}
                transition={transition}
                fill={`${GOLD}1F`}
                stroke={`${GOLD}8C`}
                strokeWidth={0.9}
              />
            ))}
            <motion.path
              animate={{ d: hemBorderOuter }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${GOLD}CC`}
              strokeWidth={1.3}
              strokeDasharray="1.5 3.5"
              strokeLinecap="round"
            />
            <motion.path
              animate={{ d: hemBorderInner }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${GOLD}80`}
              strokeWidth={0.9}
              strokeDasharray="1 4"
              strokeLinecap="round"
            />
            {scallopDots.map((dot) => (
              <motion.circle
                key={dot.key}
                animate={{ cx: dot.cx, cy: dot.cy }}
                initial={false}
                transition={transition}
                r={1.4}
                fill={GOLD}
                opacity={0.75}
              />
            ))}
            <motion.path
              animate={{ d: waistbandPath }}
              initial={false}
              transition={transition}
              fill={`${GOLD}26`}
              stroke={strokeFor(["waist"])}
              strokeWidth={strokeWidthFor(["waist"])}
            />
          </g>
        ) : (
          <g key="trousers">
            {([-1, 1] as const).map((dir) => (
              <g key={dir}>
                <motion.path
                  animate={{ d: trouserLeg(dir) }}
                  initial={false}
                  transition={transition}
                  fill={`url(#${skirtGrad})`}
                  stroke={strokeFor(bottomFields)}
                  strokeWidth={strokeWidthFor(bottomFields)}
                  strokeLinejoin="round"
                />
                <motion.path
                  animate={{ d: trouserFold(dir) }}
                  initial={false}
                  transition={transition}
                  fill="none"
                  stroke={`${INK}30`}
                  strokeWidth={0.9}
                />
                <motion.path
                  animate={{ d: trouserCuff(dir) }}
                  initial={false}
                  transition={transition}
                  fill="none"
                  stroke={`${GOLD}A6`}
                  strokeWidth={1}
                  strokeDasharray="1.5 3"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        )}

        {isLehenga && l.flareType === "Layered" && (
          <>
            <motion.path
              animate={{
                d: `M ${CX - (waistHalf + hemHalfActual) / 2} ${waistY + (lehengaHemY - waistY) * 0.46} Q ${CX} ${waistY + (lehengaHemY - waistY) * 0.46 + 15} ${CX + (waistHalf + hemHalfActual) / 2} ${waistY + (lehengaHemY - waistY) * 0.46}`,
              }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${INK}59`}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <motion.path
              animate={{
                d: `M ${CX - (waistHalf * 0.5 + hemHalfActual * 1.3) / 2} ${waistY + (lehengaHemY - waistY) * 0.74} Q ${CX} ${waistY + (lehengaHemY - waistY) * 0.74 + 14} ${CX + (waistHalf * 0.5 + hemHalfActual * 1.3) / 2} ${waistY + (lehengaHemY - waistY) * 0.74}`,
              }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${INK}40`}
              strokeWidth={0.9}
              strokeDasharray="3 4"
            />
          </>
        )}

        {/* ---- Sleeves ---- */}
        {([sleeveL, sleeveR] as const).map((s, i) => (
          <g key={i}>
            <motion.path
              animate={{ d: s.body }}
              initial={false}
              transition={transition}
              fill={`url(#${bodiceGrad})`}
              stroke={strokeFor(["shoulder", "sleevesLength", "armhole"])}
              strokeWidth={strokeWidthFor(["shoulder", "sleevesLength", "armhole"])}
              strokeLinejoin="round"
            />
            <motion.path
              animate={{ d: s.fold }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${INK}26`}
              strokeWidth={0.9}
            />
            <motion.path
              animate={{ d: s.cuff }}
              initial={false}
              transition={transition}
              fill="none"
              stroke={`${GOLD}99`}
              strokeWidth={1}
              strokeDasharray="1.5 3"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Soft shoulder skin pads */}
        {([-1, 1] as const).map((dir) => (
          <motion.path
            key={`shoulder-${dir}`}
            animate={{ d: shoulderSkin(dir) }}
            initial={false}
            transition={transition}
            fill={`url(#${skinGrad})`}
            stroke={`${INK}26`}
            strokeWidth={0.7}
          />
        ))}

        {/* ---- Filled forearms + articulated hands ---- */}
        {([armL, armR] as const).map((a, i) => (
          <g key={i}>
            <motion.path
              animate={{ d: a.forearm }}
              initial={false}
              transition={transition}
              fill={`url(#${skinGrad})`}
              stroke={`${INK}4D`}
              strokeWidth={1}
              strokeLinejoin="round"
            />
            <motion.path
              animate={{ d: a.palm }}
              initial={false}
              transition={transition}
              fill={`url(#${skinGrad})`}
              stroke={`${INK}4D`}
              strokeWidth={1}
              strokeLinejoin="round"
            />
            <motion.path
              animate={{ d: a.thumb }}
              initial={false}
              transition={transition}
              fill={`url(#${skinGrad})`}
              stroke={`${INK}4D`}
              strokeWidth={0.9}
              strokeLinejoin="round"
            />
            <motion.path
              animate={{ d: a.fingers }}
              initial={false}
              transition={transition}
              fill={`url(#${skinGrad})`}
              stroke={`${INK}59`}
              strokeWidth={0.85}
              strokeLinejoin="round"
            />
            <motion.circle
              animate={{ cx: a.handX, cy: a.handY + 5 }}
              initial={false}
              transition={transition}
              r={1.15}
              fill={GOLD}
              opacity={0.7}
            />
          </g>
        ))}

        {/* Décolletage skin under the neckline */}
        <motion.path
          animate={{ d: chestPath }}
          initial={false}
          transition={transition}
          fill={`url(#${skinGrad})`}
          stroke="none"
          opacity={0.95}
        />

        {/* ---- Bodice ---- */}
        <motion.path
          animate={{ d: shirtPath }}
          initial={false}
          transition={transition}
          fill={`url(#${bodiceGrad})`}
          stroke={strokeFor(["neckDepth", "bust", "hip", "shirtLength"])}
          strokeWidth={strokeWidthFor(["neckDepth", "bust", "hip", "shirtLength"])}
          strokeLinejoin="round"
        />
        {([-1, 1] as const).map((dir) => (
          <motion.path
            key={`dart-${dir}`}
            animate={{ d: dart(dir) }}
            initial={false}
            transition={transition}
            fill="none"
            stroke={`${INK}21`}
            strokeWidth={0.9}
          />
        ))}
        {([-1, 1] as const).map((dir) => (
          <motion.path
            key={`clav-${dir}`}
            animate={{ d: collarbone(dir) }}
            initial={false}
            transition={transition}
            fill="none"
            stroke={`${INK}40`}
            strokeWidth={0.9}
            strokeLinecap="round"
          />
        ))}
        <motion.path
          animate={{ d: necklineTrim }}
          initial={false}
          transition={transition}
          fill="none"
          stroke={activeField === "neckDepth" ? GOLD : `${GOLD}99`}
          strokeWidth={activeField === "neckDepth" ? 1.6 : 1}
          strokeDasharray="1.5 3"
          strokeLinecap="round"
        />
        <motion.circle
          animate={{ cx: CX, cy: SHOULDER_Y + neckDepthPx + 13 }}
          initial={false}
          transition={transition}
          r={1.6}
          fill={GOLD}
          opacity={0.7}
        />

        {/* ---- Dupatta ---- */}
        <motion.path
          animate={{ d: dupattaPanel }}
          initial={false}
          transition={transition}
          fill={`url(#${dupattaGrad})`}
          stroke={activeField === "dupattaLength" ? GOLD : `${INK}38`}
          strokeWidth={activeField === "dupattaLength" ? 2 : 1}
          strokeLinejoin="round"
        />
        <motion.path
          animate={{ d: dupattaEdge }}
          initial={false}
          transition={transition}
          fill="none"
          stroke={activeField === "dupattaLength" ? `${GOLD}CC` : `${GOLD}73`}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
