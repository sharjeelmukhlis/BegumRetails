"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import type { MeasurementFieldKey, Language, Unit, StandardSize } from "@/lib/customize/schema";
import { displayValue, toCanonicalCm } from "@/lib/customize/schema";
import { measurementGuides, t } from "@/lib/customize/measurement-guides";
import { MeasurementGuideModal } from "./measurement-guide-modal";
import { cn } from "@/lib/utils";

/**
 * One measurement field: unit-aware input, per-field "?" guide trigger,
 * and the quiet live delta-from-standard indicator.
 */
interface MeasurementFieldProps {
  fieldKey: MeasurementFieldKey;
  /** Canonical value in cm. */
  value: number | undefined;
  onChange: (cmValue: number | undefined) => void;
  unit: Unit;
  language: Language;
  disabled?: boolean;
  optional?: boolean;
  /** Standard-chart value (cm) for the currently selected size. */
  standardValue?: number;
  standardSize?: StandardSize | null;
  onActiveChange?: (field: MeasurementFieldKey | null) => void;
  flagged?: boolean;
}

export function MeasurementField({
  fieldKey,
  value,
  onChange,
  unit,
  language,
  disabled,
  optional,
  standardValue,
  standardSize,
  onActiveChange,
  flagged,
}: MeasurementFieldProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const guide = measurementGuides[fieldKey];
  const isUrdu = language === "ur";

  const shown = value !== undefined ? displayValue(value, unit) : "";

  // Delta from the selected standard size — quiet reassurance, not an alarm.
  let delta: string | null = null;
  if (value !== undefined && standardValue !== undefined && standardSize) {
    const diffCm = Math.round((value - standardValue) * 10) / 10;
    if (Math.abs(diffCm) >= 0.5) {
      const shownDiff = unit === "cm" ? Math.abs(diffCm) : Math.abs(displayValue(value, "in") - displayValue(standardValue, "in"));
      const rounded = Math.round(shownDiff * 10) / 10;
      delta =
        language === "ur"
          ? `سائز ${standardSize} سے ${rounded}${unit === "cm" ? " سینٹی میٹر" : " انچ"} ${diffCm > 0 ? "زیادہ" : "کم"}`
          : `${rounded}${unit} ${diffCm > 0 ? "fuller" : "trimmer"} than size ${standardSize}`;
    }
  }

  return (
    <div className={cn("group", disabled && "opacity-60")}>
      <div className="flex items-center justify-between gap-2" dir={isUrdu ? "rtl" : "ltr"}>
        <label
          htmlFor={`field-${fieldKey}`}
          className="text-xs font-medium text-charcoal/80 tracking-wide"
        >
          {t(guide.label, language)}
          {optional && (
            <span className="text-charcoal/45 font-normal"> {language === "ur" ? "(اختیاری)" : "(optional)"}</span>
          )}
        </label>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="p-1 text-sand-700 hover:text-emerald-800 transition-colors"
          aria-label={`${t(guide.label, language)} — ${language === "ur" ? "ناپنے کا طریقہ" : "how to measure"}`}
        >
          <HelpCircle size={15} />
        </button>
      </div>

      <div className="relative mt-1.5">
        <input
          id={`field-${fieldKey}`}
          type="number"
          inputMode="decimal"
          step={unit === "cm" ? 0.5 : 0.25}
          value={shown}
          disabled={disabled}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              if (optional) onChange(undefined);
              return;
            }
            const num = parseFloat(raw);
            if (!Number.isNaN(num)) onChange(toCanonicalCm(num, unit));
          }}
          onFocus={() => onActiveChange?.(fieldKey)}
          onBlur={() => onActiveChange?.(null)}
          className={cn(
            "w-full px-3 py-2.5 pr-11 text-sm bg-transparent border focus:outline-none transition-colors",
            flagged
              ? "border-sand-500/80 focus:border-sand-600"
              : "border-charcoal/15 focus:border-emerald-800"
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-charcoal/40 pointer-events-none">
          {unit}
        </span>
      </div>

      <p className={cn("mt-1 text-[11px] leading-snug min-h-[15px]", flagged ? "text-sand-700" : "text-charcoal/50")} dir={isUrdu ? "rtl" : "ltr"}>
        {delta ?? ""}
      </p>

      <MeasurementGuideModal
        fieldKey={fieldKey}
        language={language}
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
      />
    </div>
  );
}
