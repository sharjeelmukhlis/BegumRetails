"use client";

import { useState } from "react";
import { ChevronUp, Share2, Check } from "lucide-react";
import { useCustomizerStore } from "@/lib/store/customizer";
import { computePrice, fabricOptions, embroideryTechniques, densityMultipliers, addonOptions } from "@/lib/customize/price-engine";
import { encodeSnapshot } from "@/lib/customize/share";
import { SilhouettePreview } from "./silhouette-preview";
import { formatPrice, cn } from "@/lib/utils";

/**
 * Persistent live summary — desktop: sticky side rail; mobile: expandable
 * bottom sheet. Silhouette thumbnail, selections, itemized price, and the
 * staged 30/40/30 schedule. Always visible, never a surprise at the end.
 */
export function SummaryPanel() {
  const state = useCustomizerStore();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUrdu = state.language === "ur";

  const price = computePrice({
    garmentType: state.garmentType,
    fabric: state.fabric,
    embroidery: state.embroidery,
    density: state.density,
    addons: state.addons,
    rush: state.rush,
  });

  const fabricLabel = fabricOptions.find((f) => f.value === state.fabric)?.label;
  const embroideryLabel = embroideryTechniques.find((e) => e.value === state.embroidery)?.label;
  const densityLabel = state.density ? densityMultipliers[state.density].label : null;

  const handleShare = async () => {
    const encoded = encodeSnapshot(state.buildSnapshot());
    const url = `${window.location.origin}/customize/share?d=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(isUrdu ? "لنک کاپی کریں:" : "Copy this link:", url);
    }
  };

  const body = (
    <>
      <div className="flex gap-4">
        <div className="w-20 shrink-0 border border-sand-300/50 bg-sand-50/50 p-1">
          <SilhouettePreview
            garmentType={state.garmentType}
            garment={state.garment}
            bottom={state.bottom}
            lehenga={state.lehenga}
          />
        </div>
        <div className="min-w-0 text-xs text-charcoal/70 space-y-1.5">
          <p className="text-sm font-medium text-charcoal capitalize">
            {state.garmentType ? state.garmentType.replace("-", " ") : isUrdu ? "لباس منتخب کریں" : "Choose your base"}
            {state.occasion && <span className="text-charcoal/50"> · {state.occasion}</span>}
          </p>
          {state.selectedSize && (
            <p>
              {isUrdu ? "سائز" : "Size"} {state.selectedSize}
              {state.refineMode && <span className="text-emerald-800"> · {isUrdu ? "حسبِ پیمائش" : "refined"}</span>}
            </p>
          )}
          {fabricLabel && <p>{fabricLabel}{state.fabricColor ? ` · ${state.fabricColor}` : ""}</p>}
          {embroideryLabel && <p>{embroideryLabel}{densityLabel ? ` · ${densityLabel}` : ""}</p>}
          {state.addons.length > 0 && (
            <p>{state.addons.length} {isUrdu ? "اضافی اشیاء" : `add-on${state.addons.length > 1 ? "s" : ""}`}</p>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-sand-300/50 space-y-2">
        {price.lines.map((line) => (
          <div key={line.label} className="flex justify-between gap-3 text-xs">
            <span className="text-charcoal/65">{line.label}</span>
            <span className="text-charcoal/85 tabular-nums shrink-0">{formatPrice(line.amount, "PKR")}</span>
          </div>
        ))}
        {price.lines.length === 0 && (
          <p className="text-xs text-charcoal/50">
            {isUrdu ? "انتخاب کے ساتھ قیمت یہاں بنتی جائے گی۔" : "Your price builds here as you choose."}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-charcoal/10 flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/55">
          {isUrdu ? "تخمینہ کل" : "Estimated total"}
        </span>
        <span className="font-display text-2xl text-emerald-900 tabular-nums">
          {formatPrice(price.total, "PKR")}
        </span>
      </div>

      {price.total > 0 && (
        <div className="mt-4 space-y-1.5">
          {price.stages.map((stage) => (
            <div key={stage.label} className="flex justify-between gap-3 text-[11px]">
              <span className="text-charcoal/55">{stage.percent}% — {stage.label}</span>
              <span className="text-charcoal/75 tabular-nums shrink-0">{formatPrice(stage.amount, "PKR")}</span>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleShare}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-emerald-900/25 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-emerald-900 hover:bg-emerald-50 transition-colors"
      >
        {copied ? <Check size={14} /> : <Share2 size={14} />}
        {copied
          ? isUrdu ? "لنک کاپی ہو گیا" : "Link copied"
          : isUrdu ? "تصدیق کے لیے شیئر کریں" : "Share to verify"}
      </button>
      <p className="mt-2 text-[10px] text-charcoal/45 leading-relaxed" dir={isUrdu ? "rtl" : "ltr"}>
        {isUrdu
          ? "اپنی امی یا درزی کو بھیجیں — وہ تصدیقی لنک پر سب کچھ دیکھ سکتے ہیں، بدل نہیں سکتے۔"
          : "Send it to your mother or tailor back home — they see everything, change nothing."}
      </p>
    </>
  );

  return (
    <>
      {/* Desktop: sticky side rail */}
      <aside className="hidden lg:block sticky top-28 border border-sand-300/55 bg-ivory p-6 max-h-[calc(100vh-8.5rem)] overflow-y-auto">
        <p className="text-[10px] uppercase tracking-[0.24em] text-sand-700 mb-4">
          {isUrdu ? "آپ کا انتخاب" : "Your piece so far"}
        </p>
        {body}
      </aside>

      {/* Mobile: expandable bottom sheet */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[60] border-t border-sand-300/60 bg-ivory shadow-[0_-8px_30px_rgba(6,35,25,0.12)]">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5"
          aria-expanded={expanded}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
            {isUrdu ? "تخمینہ کل" : "Estimated total"}
          </span>
          <span className="flex items-center gap-3">
            <span className="font-display text-xl text-emerald-900 tabular-nums">
              {formatPrice(price.total, "PKR")}
            </span>
            <ChevronUp size={16} className={cn("text-charcoal/50 transition-transform", expanded && "rotate-180")} />
          </span>
        </button>
        <div className={cn("overflow-hidden transition-all duration-300 px-5", expanded ? "max-h-[65vh] overflow-y-auto pb-6" : "max-h-0")}>
          {body}
        </div>
      </div>
    </>
  );
}
