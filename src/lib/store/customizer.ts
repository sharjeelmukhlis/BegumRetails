import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GarmentType, Occasion, EmbroideryTechnique, EmbroideryDensity } from "@/lib/types";
import type {
  GarmentMeasurements,
  BottomMeasurements,
  LehengaSpecific,
  MeasurementProfile,
  StandardSize,
  Unit,
  Language,
  GarmentField,
  BottomField,
} from "@/lib/customize/schema";
import {
  standardSizeCharts,
  lehengaDefaults,
  recommendSize,
  shapeAdjustment,
  type SmartStartInput,
} from "@/lib/customize/standard-sizes";
import type { ShareSnapshot } from "@/lib/customize/share";

interface CustomizerSession {
  // Preferences
  unit: Unit;
  language: Language;

  // 1 — Base
  garmentType: GarmentType | null;
  occasion: Occasion | null;

  // 2 — Smart Start
  smartStart: SmartStartInput;
  recommendedSize: StandardSize | null;

  // 3 — Fit & measurements (canonical cm)
  selectedSize: StandardSize | null;
  refineMode: boolean;
  garment: Partial<GarmentMeasurements>;
  bottom: Partial<BottomMeasurements>;
  lehenga: Partial<LehengaSpecific>;

  // 4–6 — Design
  fabric: string | null;
  fabricColor: string | null;
  embroidery: EmbroideryTechnique | null;
  density: EmbroideryDensity | null;
  addons: string[];
  rush: boolean;

  // F — Profile library
  profiles: MeasurementProfile[];
}

interface CustomizerActions {
  setUnit: (unit: Unit) => void;
  setLanguage: (language: Language) => void;
  setGarmentType: (type: GarmentType) => void;
  setOccasion: (occasion: Occasion) => void;
  setSmartStart: (input: Partial<SmartStartInput>) => void;
  applySmartStart: () => void;
  applyStandardSize: (size: StandardSize) => void;
  setRefineMode: (refine: boolean) => void;
  setGarmentField: (field: GarmentField, value: number) => void;
  setBottomField: (field: BottomField, value: number | undefined) => void;
  setLehengaField: (field: keyof LehengaSpecific, value: number | LehengaSpecific["flareType"]) => void;
  setFabric: (fabric: string) => void;
  setFabricColor: (color: string) => void;
  setEmbroidery: (technique: EmbroideryTechnique) => void;
  setDensity: (density: EmbroideryDensity) => void;
  toggleAddon: (addon: string) => void;
  setRush: (rush: boolean) => void;
  saveProfile: (label: string) => void;
  loadProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  buildSnapshot: () => ShareSnapshot;
  reset: () => void;
}

const initialSession: CustomizerSession = {
  unit: "cm",
  language: "en",
  garmentType: null,
  occasion: null,
  smartStart: {},
  recommendedSize: null,
  selectedSize: null,
  refineMode: false,
  garment: {},
  bottom: {},
  lehenga: {},
  fabric: null,
  fabricColor: null,
  embroidery: null,
  density: null,
  addons: [],
  rush: false,
  profiles: [],
};

function fillFromSize(size: StandardSize, garmentType: GarmentType | null) {
  const chart = standardSizeCharts[size];
  const lehengaBase = lehengaDefaults[size];
  const isLehenga = garmentType === "lehenga" || garmentType === null;
  return {
    selectedSize: size,
    garment: { ...chart.garment },
    bottom: { ...chart.bottom },
    lehenga: isLehenga
      ? {
          lehengaLength: lehengaBase.lehengaLength,
          dupattaLength: lehengaBase.dupattaLength,
          flareType: "Circular" as const,
        }
      : {},
  };
}

export const useCustomizerStore = create<CustomizerSession & CustomizerActions>()(
  persist(
    (set, get) => ({
      ...initialSession,

      setUnit: (unit) => set({ unit }),
      setLanguage: (language) => set({ language }),
      setGarmentType: (garmentType) => set({ garmentType }),
      setOccasion: (occasion) => set({ occasion }),

      setSmartStart: (input) =>
        set((s) => ({ smartStart: { ...s.smartStart, ...input } })),

      applySmartStart: () => {
        const s = get();
        const size = recommendSize(s.smartStart);
        const filled = fillFromSize(size, s.garmentType);
        // Shape hint nudges one field toward the next size up.
        const adjustField = shapeAdjustment(s.smartStart.bodyShape);
        if (adjustField === "bust" || adjustField === "hip") {
          const sizes: StandardSize[] = ["XS", "S", "M", "L", "XL"];
          const next = sizes[Math.min(sizes.indexOf(size) + 1, sizes.length - 1)];
          filled.garment[adjustField] = standardSizeCharts[next].garment[adjustField];
        }
        set({ recommendedSize: size, ...filled });
      },

      applyStandardSize: (size) => set(fillFromSize(size, get().garmentType)),
      setRefineMode: (refineMode) => set({ refineMode }),

      setGarmentField: (field, value) =>
        set((s) => ({ garment: { ...s.garment, [field]: value } })),
      setBottomField: (field, value) =>
        set((s) => ({ bottom: { ...s.bottom, [field]: value } })),
      setLehengaField: (field, value) =>
        set((s) => ({ lehenga: { ...s.lehenga, [field]: value } })),

      setFabric: (fabric) => set({ fabric }),
      setFabricColor: (fabricColor) => set({ fabricColor }),
      setEmbroidery: (embroidery) => set({ embroidery }),
      setDensity: (density) => set({ density }),
      toggleAddon: (addon) =>
        set((s) => ({
          addons: s.addons.includes(addon)
            ? s.addons.filter((a) => a !== addon)
            : [...s.addons, addon],
        })),
      setRush: (rush) => set({ rush }),

      saveProfile: (label) => {
        const s = get();
        const garment = s.garment as GarmentMeasurements;
        const bottom = s.bottom as BottomMeasurements;
        const hasLehenga =
          s.lehenga.lehengaLength !== undefined &&
          s.lehenga.dupattaLength !== undefined &&
          s.lehenga.flareType !== undefined;
        const profile: MeasurementProfile = {
          id: `profile-${Date.now()}`,
          label,
          unit: s.unit,
          garment,
          bottom,
          lehengaSpecific: hasLehenga ? (s.lehenga as LehengaSpecific) : undefined,
          source: s.refineMode ? "custom-manual" : "standard-size",
          standardSizeMatched: s.selectedSize ?? undefined,
          savedAt: new Date().toISOString(),
        };
        set({ profiles: [...s.profiles, profile] });
      },

      loadProfile: (id) => {
        const profile = get().profiles.find((p) => p.id === id);
        if (!profile) return;
        set({
          unit: profile.unit,
          garment: { ...profile.garment },
          bottom: { ...profile.bottom },
          lehenga: profile.lehengaSpecific ? { ...profile.lehengaSpecific } : {},
          selectedSize: profile.standardSizeMatched ?? null,
          refineMode: profile.source !== "standard-size",
        });
      },

      deleteProfile: (id) =>
        set((s) => ({ profiles: s.profiles.filter((p) => p.id !== id) })),

      buildSnapshot: () => {
        const s = get();
        return {
          v: 1,
          garmentType: s.garmentType,
          occasion: s.occasion,
          size: s.selectedSize,
          unit: s.unit,
          garment: s.garment,
          bottom: s.bottom,
          lehenga: s.lehenga,
          fabric: s.fabric,
          fabricColor: s.fabricColor,
          embroidery: s.embroidery,
          density: s.density,
          addons: s.addons,
        };
      },

      reset: () => set((s) => ({ ...initialSession, profiles: s.profiles, language: s.language, unit: s.unit })),
    }),
    { name: "Begum-customizer-v2" }
  )
);
