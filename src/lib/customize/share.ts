import type { GarmentType, Occasion, EmbroideryTechnique, EmbroideryDensity } from "@/lib/types";
import type { GarmentMeasurements, BottomMeasurements, LehengaSpecific, StandardSize, Unit } from "./schema";

/**
 * Share-to-verify: a compact, URL-safe snapshot of the current
 * measurement + design state, so a bride can send a read-only link
 * to her mother or tailor before confirming.
 */
export interface ShareSnapshot {
  v: 1;
  garmentType: GarmentType | null;
  occasion: Occasion | null;
  size: StandardSize | null;
  unit: Unit;
  garment: Partial<GarmentMeasurements>;
  bottom: Partial<BottomMeasurements>;
  lehenga?: Partial<LehengaSpecific>;
  fabric: string | null;
  fabricColor: string | null;
  embroidery: EmbroideryTechnique | null;
  density: EmbroideryDensity | null;
  addons: string[];
}

function toBase64Url(json: string): string {
  const b64 = typeof window === "undefined"
    ? Buffer.from(json, "utf-8").toString("base64")
    : btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(encoded: string): string {
  const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  return typeof window === "undefined"
    ? Buffer.from(b64, "base64").toString("utf-8")
    : decodeURIComponent(escape(atob(b64)));
}

export function encodeSnapshot(snapshot: ShareSnapshot): string {
  return toBase64Url(JSON.stringify(snapshot));
}

export function decodeSnapshot(encoded: string): ShareSnapshot | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    if (parsed?.v !== 1) return null;
    return parsed as ShareSnapshot;
  } catch {
    return null;
  }
}
