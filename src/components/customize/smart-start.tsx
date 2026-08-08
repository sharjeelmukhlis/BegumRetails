"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useCustomizerStore } from "@/lib/store/customizer";
import { STANDARD_SIZES, type StandardSize } from "@/lib/customize/schema";
import { cn } from "@/lib/utils";

/**
 * Find Your Fit — the 30-second smart start. Height, weight, usual size,
 * and an optional body-shape hint pre-fill a recommended starting size,
 * so the bride adjusts from a smart guess instead of a blank form.
 */
const bodyShapes = [
  {
    value: "even" as const,
    en: "Fairly even",
    ur: "متوازن",
    // Simple illustrated silhouettes, not clinical language.
    path: "M 20 6 C 14 14, 15 22, 17 30 C 14 40, 14 48, 18 56 L 30 56 C 34 48, 34 40, 31 30 C 33 22, 34 14, 28 6 Z",
  },
  {
    value: "fuller-bust" as const,
    en: "Fuller on top",
    ur: "اوپر سے بھری",
    path: "M 20 6 C 11 14, 12 24, 16 30 C 14 40, 15 48, 18 56 L 30 56 C 33 48, 34 40, 32 30 C 36 24, 37 14, 28 6 Z",
  },
  {
    value: "fuller-hip" as const,
    en: "Fuller on the hip",
    ur: "نیچے سے بھری",
    path: "M 20 6 C 15 13, 16 20, 18 27 C 12 38, 11 48, 16 56 L 32 56 C 37 48, 36 38, 30 27 C 32 20, 33 13, 28 6 Z",
  },
];

export function SmartStart() {
  const {
    language,
    smartStart,
    setSmartStart,
    applySmartStart,
    recommendedSize,
    selectedSize,
    applyStandardSize,
  } = useCustomizerStore();
  const [applied, setApplied] = useState(false);
  const isUrdu = language === "ur";

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="ss-height" className="text-xs font-medium text-charcoal/80">
            {isUrdu ? "قد (سینٹی میٹر)" : "Height (cm)"}
          </label>
          <input
            id="ss-height"
            type="number"
            inputMode="numeric"
            placeholder="163"
            value={smartStart.heightCm ?? ""}
            onChange={(e) =>
              setSmartStart({ heightCm: e.target.value ? parseFloat(e.target.value) : undefined })
            }
            className="mt-1.5 w-full px-3 py-2.5 text-sm bg-transparent border border-charcoal/15 focus:border-emerald-800 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="ss-weight" className="text-xs font-medium text-charcoal/80">
            {isUrdu ? "وزن (کلوگرام)" : "Weight (kg)"}
          </label>
          <input
            id="ss-weight"
            type="number"
            inputMode="numeric"
            placeholder="58"
            value={smartStart.weightKg ?? ""}
            onChange={(e) =>
              setSmartStart({ weightKg: e.target.value ? parseFloat(e.target.value) : undefined })
            }
            className="mt-1.5 w-full px-3 py-2.5 text-sm bg-transparent border border-charcoal/15 focus:border-emerald-800 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="ss-usual" className="text-xs font-medium text-charcoal/80">
            {isUrdu ? "عام سائز (کسی بھی برانڈ کا)" : "Usual size (any brand)"}
          </label>
          <select
            id="ss-usual"
            value={smartStart.usualSize ?? ""}
            onChange={(e) =>
              setSmartStart({ usualSize: (e.target.value || undefined) as StandardSize | undefined })
            }
            className="mt-1.5 w-full px-3 py-2.5 text-sm bg-transparent border border-charcoal/15 focus:border-emerald-800 focus:outline-none"
          >
            <option value="">{isUrdu ? "معلوم نہیں" : "Not sure"}</option>
            {STANDARD_SIZES.map((s) => (
              <option key={s} value={s}>
                {s} — Khaadi / Sapphire / international
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-charcoal/80">
          {isUrdu ? "جسمانی ساخت (اختیاری)" : "Body shape hint (optional)"}
        </p>
        <div className="mt-2 flex gap-3">
          {bodyShapes.map((shape) => (
            <button
              key={shape.value}
              type="button"
              onClick={() =>
                setSmartStart({
                  bodyShape: smartStart.bodyShape === shape.value ? undefined : shape.value,
                })
              }
              className={cn(
                "flex flex-col items-center gap-1.5 border px-4 py-3 transition-colors",
                smartStart.bodyShape === shape.value
                  ? "border-emerald-800 bg-emerald-50"
                  : "border-charcoal/12 hover:border-charcoal/30"
              )}
            >
              <svg viewBox="0 0 48 62" className="w-8 h-10">
                <path d={shape.path} fill="none" stroke="#062319" strokeWidth={1.6} />
              </svg>
              <span className="text-[10px] text-charcoal/65">{isUrdu ? shape.ur : shape.en}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => {
            applySmartStart();
            setApplied(true);
          }}
          className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-800 transition-colors"
        >
          <Sparkles size={14} />
          {isUrdu ? "میرا فٹ تلاش کریں" : "Find my fit"}
        </button>
        {applied && recommendedSize && (
          <p className="text-sm text-emerald-800" dir={isUrdu ? "rtl" : "ltr"}>
            {isUrdu
              ? `ہم تجویز کرتے ہیں: سائز ${recommendedSize} — نیچے ہر پیمائش خود بدل سکتی ہیں۔`
              : `We recommend starting from size ${recommendedSize} — every field below stays editable.`}
          </p>
        )}
      </div>

      {/* Direct size pills — standard sizing is a pre-fill, not a separate mode */}
      <div className="mt-7 pt-6 border-t border-sand-300/50">
        <p className="text-xs text-charcoal/60">
          {isUrdu ? "یا سیدھا کوئی سائز چنیں:" : "Or start directly from a size:"}
        </p>
        <div className="mt-2.5 flex gap-2">
          {STANDARD_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => applyStandardSize(size)}
              className={cn(
                "w-12 h-12 border text-sm transition-colors",
                selectedSize === size
                  ? "border-emerald-800 bg-emerald-900 text-ivory"
                  : "border-charcoal/15 text-charcoal/70 hover:border-emerald-800/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
