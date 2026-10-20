"use client";

import { useState } from "react";
import { ChevronUp, Share2, Check, Video, MessageCircle } from "lucide-react";
import { useCustomizerStore } from "@/lib/store/customizer";
import {
  computePrice,
  fabricOptions,
  embroideryTechniques,
  densityMultipliers,
} from "@/lib/customize/price-engine";
import { encodeSnapshot } from "@/lib/customize/share";
import { SilhouettePreview } from "./silhouette-preview";
import { formatPrice, cn } from "@/lib/utils";

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

  const generateWhatsAppDossier = () => {
    const lines = [
      "✨ *BEGUM BRIDAL ATELIER — CUSTOM ORDER DOSSIER*",
      "────────────────────────────",
      `👗 *Silhouette:* ${state.garmentType ? state.garmentType.toUpperCase() : "Lehenga"}`,
      `🎉 *Occasion:* ${state.occasion || "Bridal"}`,
      `📏 *Size Mode:* ${state.selectedSize ? `Size ${state.selectedSize}` : "Custom Bespoke"} ${state.refineMode ? "(Refined)" : ""}`,
      `🧵 *Fabric:* ${fabricLabel || "Raw Silk"} (${state.fabricColor || "Emerald"})`,
      `✨ *Embroidery:* ${embroideryLabel || "Zardozi"} (${densityLabel || "Medium"})`,
      state.addons.length > 0 ? `💎 *Add-ons:* ${state.addons.join(", ")}` : "",
      "────────────────────────────",
      `💰 *Estimated Total:* ${formatPrice(price.total, "PKR")}`,
      "📅 *Milestone Schedule:* 30% Inception / 40% Karigari / 30% Final Fit",
      "────────────────────────────",
      "I would like to review this custom piece with the master atelier designer.",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/923209988777?text=${encodeURIComponent(lines)}`;
  };

  const body = (
    <div className="space-y-6">
      {/* Mannequin Preview Card */}
      <div className="flex gap-4 p-4 rounded-sm bg-emerald-950/40 border border-sand-300/20 backdrop-blur-md">
        <div className="w-24 shrink-0 bg-emerald-950/80 border border-sand-300/30 p-1.5 rounded-sm">
          <SilhouettePreview
            garmentType={state.garmentType}
            garment={state.garment}
            bottom={state.bottom}
            lehenga={state.lehenga}
            fabricColor={state.fabricColor}
            embroidery={state.embroidery}
            density={state.density}
            showDimensions={false}
          />
        </div>

        <div className="min-w-0 text-xs text-sand-200/80 space-y-2 flex-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-sand-400">Atelier Selection</p>
            <p className="text-sm font-display text-ivory capitalize mt-0.5">
              {state.garmentType ? state.garmentType.replace("-", " ") : isUrdu ? "لباس منتخب کریں" : "Bespoke Silhouette"}
            </p>
          </div>

          <div className="space-y-1 text-[11px] text-sand-100/70 border-t border-sand-300/15 pt-2">
            {state.occasion && (
              <p className="flex justify-between">
                <span className="text-sand-300/50">Occasion:</span>
                <span className="capitalize text-ivory font-medium">{state.occasion}</span>
              </p>
            )}
            <p className="flex justify-between">
              <span className="text-sand-300/50">Palette:</span>
              <span className="capitalize text-ivory font-medium">
                {state.fabricColor || "Emerald"} {fabricLabel ? `· ${fabricLabel}` : ""}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-sand-300/50">Karigari:</span>
              <span className="capitalize text-ivory font-medium">
                {embroideryLabel || "Zardozi"} {densityLabel ? `(${densityLabel})` : ""}
              </span>
            </p>
            {state.selectedSize && (
              <p className="flex justify-between">
                <span className="text-sand-300/50">Proportion:</span>
                <span className="text-ivory font-medium">
                  {state.selectedSize} {state.refineMode ? "(Refined)" : ""}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Itemized Price Ledger */}
      <div className="p-4 rounded-sm bg-sand-50/50 border border-sand-300/40 space-y-2.5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700 font-semibold mb-2">
          {isUrdu ? "قیمت کی تفصیل" : "Itemized Atelier Cost"}
        </p>
        {price.lines.map((line) => (
          <div key={line.label} className="flex justify-between gap-3 text-xs">
            <span className="text-charcoal/70">{line.label}</span>
            <span className="text-charcoal/90 font-medium tabular-nums shrink-0">
              {formatPrice(line.amount, "PKR")}
            </span>
          </div>
        ))}
        {price.lines.length === 0 && (
          <p className="text-xs text-charcoal/50 italic">
            {isUrdu ? "انتخاب کے ساتھ قیمت یہاں بنتی جائے گی۔" : "Your quote compiles as you make choices."}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-charcoal/15 flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-charcoal/70 font-semibold">
            {isUrdu ? "تخمینہ کل" : "Estimated Total"}
          </span>
          <span className="font-display text-2xl text-emerald-950 tabular-nums">
            {formatPrice(price.total, "PKR")}
          </span>
        </div>
      </div>

      {/* 30/40/30 Staged Milestone Schedule */}
      {price.total > 0 && (
        <div className="p-4 rounded-sm bg-emerald-950 text-ivory border border-sand-300/25 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand-300/80">
            {isUrdu ? "30 / 40 / 30 مرحلہ وار ادائیگی" : "30 / 40 / 30 Staged Milestone Schedule"}
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            {price.stages.map((stage, i) => (
              <div
                key={stage.label}
                className={cn(
                  "p-2 rounded-xs border transition-all",
                  i === 0
                    ? "bg-sand-400/20 border-sand-400 text-ivory"
                    : "bg-emerald-900/40 border-sand-300/15 text-sand-200/70"
                )}
              >
                <p className="font-display text-lg text-sand-200">{stage.percent}%</p>
                <p className="text-[9px] uppercase tracking-wider text-sand-300/70 mt-0.5 line-clamp-1">
                  {i === 0 ? "Deposit" : i === 1 ? "Karigari" : "Final Fit"}
                </p>
                <p className="text-[11px] font-medium text-ivory mt-1 tabular-nums">
                  {formatPrice(stage.amount, "PKR")}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-sand-300/60 leading-relaxed text-center">
            {isUrdu
              ? "پہلا مرحلہ صرف 30 فیصد بعد میں ہر مرحلے کی منظوری پر ادائیگی۔"
              : "Only 30% initial deposit required today. You never pay for a stage before approving it."}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5 pt-1">
        {/* WhatsApp Dossier Confirmation */}
        <a
          href={generateWhatsAppDossier()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900 text-ivory py-3.5 px-4 text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 hover:bg-emerald-800 shadow-[0_8px_20px_rgba(3,20,14,0.25)] hover:scale-[1.01]"
        >
          <MessageCircle size={15} />
          <span>{isUrdu ? "آرڈر کی تصدیق کریں (واٹس ایپ)" : "Confirm Order on WhatsApp"}</span>
        </a>

        <div className="grid grid-cols-2 gap-2">
          {/* Share / Save link */}
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-1.5 border border-charcoal/20 bg-ivory py-2.5 px-3 text-[11px] uppercase tracking-wider text-charcoal/80 transition-colors hover:bg-sand-100 hover:border-charcoal/40"
          >
            {copied ? <Check size={13} className="text-emerald-800" /> : <Share2 size={13} />}
            <span>{copied ? (isUrdu ? "کاپی ہو گیا" : "Link Copied!") : isUrdu ? "شیئر کریں" : "Share Dossier"}</span>
          </button>

          {/* Book Consultation */}
          <a
            href="/customize/consultation"
            className="inline-flex items-center justify-center gap-1.5 border border-charcoal/20 bg-ivory py-2.5 px-3 text-[11px] uppercase tracking-wider text-charcoal/80 transition-colors hover:bg-sand-100 hover:border-charcoal/40"
          >
            <Video size={13} />
            <span>{isUrdu ? "ویڈیو کال" : "Book Call"}</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside
        className="hidden lg:block sticky top-36 border border-sand-300/40 bg-sand-50/70 backdrop-blur-md p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
        aria-label="Customizer live summary"
      >
        <div className="flex items-center justify-between pb-4 border-b border-sand-300/40 mb-5">
          <p className="font-display text-lg text-emerald-950">Atelier Dossier</p>
          <span className="text-[10px] uppercase tracking-[0.2em] text-sand-700 bg-sand-200/50 px-2 py-0.5 rounded-xs">
            Live Quote
          </span>
        </div>
        {body}
      </aside>

      {/* Mobile Expandable Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-emerald-950 text-ivory border-t border-sand-400/30 shadow-[0_-10px_30px_rgba(0,0,0,0.35)]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left"
          aria-expanded={expanded}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-sand-300/70">
              {state.garmentType ? state.garmentType : "Bespoke Silhouette"} · Total
            </p>
            <p className="font-display text-xl text-ivory tabular-nums mt-0.5">
              {formatPrice(price.total, "PKR")}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-sand-200">
            <span>{expanded ? "Close" : "Review Dossier"}</span>
            <ChevronUp size={16} className={cn("transition-transform duration-300", expanded && "rotate-180")} />
          </div>
        </button>

        {expanded && (
          <div className="max-h-[75vh] overflow-y-auto px-5 pb-6 pt-2 bg-ivory text-charcoal">
            {body}
          </div>
        )}
      </div>
    </>
  );
}
