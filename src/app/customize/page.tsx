"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { useCustomizerStore } from "@/lib/store/customizer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { occasions } from "@/lib/data/products";
import type { GarmentType, Occasion } from "@/lib/types";
import {
  GARMENT_FIELDS,
  BOTTOM_FIELDS,
  FLARE_TYPES,
  STANDARD_SIZES,
  displayValue,
  type MeasurementFieldKey,
  type GarmentField,
  type BottomField,
} from "@/lib/customize/schema";
import { encodeSnapshot } from "@/lib/customize/share";
import { getFieldValue } from "@/lib/customize/standard-sizes";
import { runFitChecks } from "@/lib/customize/fit-checks";
import { uiStrings, t } from "@/lib/customize/measurement-guides";
import {
  computePrice,
  baseGarmentPrices,
  fabricOptions,
  embroideryTechniques,
  densityMultipliers,
  addonOptions,
} from "@/lib/customize/price-engine";
import { SmartStart } from "@/components/customize/smart-start";
import { MeasurementField } from "@/components/customize/measurement-field";
import { SilhouettePreview } from "@/components/customize/silhouette-preview";
import { ProfileLibrary } from "@/components/customize/profile-library";
import { StageNavigator } from "@/components/customize/stage-navigator";
import { generateAtelierCardImage } from "@/lib/customize/atelier-card-canvas";
import { formatPrice, cn } from "@/lib/utils";
import { Video, Sparkles, MessageCircle, Ruler, CheckCircle2, ChevronDown, Download, Copy, Check, X, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const garmentTypes: { value: GarmentType; label: string; ur: string; desc: string }[] = [
  {
    value: "lehenga",
    label: "Lehenga",
    ur: "لہنگا",
    desc: "Voluminous kali skirt paired with an artisanal choli and draped sheer dupatta.",
  },
  {
    value: "sharara",
    label: "Sharara",
    ur: "شرارہ",
    desc: "Dramatic flared legs fitted at the knee, creating an ethereal flowing sweep.",
  },
  {
    value: "gharara",
    label: "Gharara",
    ur: "غرارہ",
    desc: "Awadh royal heritage silhouette gathered at the knee with ornate gota ruche.",
  },
  {
    value: "bridal-suit",
    label: "Bridal Suit",
    ur: "برائیڈل سوٹ",
    desc: "Contemporary structured straight-line royal kurti with tailored bottom.",
  },
];

const fabricColors = [
  { value: "emerald", label: "Emerald", hex: "#062319" },
  { value: "burgundy", label: "Burgundy", hex: "#6B1A2A" },
  { value: "sapphire", label: "Sapphire", hex: "#1a3a5c" },
  { value: "ivory", label: "Ivory", hex: "#FAF6EF" },
  { value: "champagne", label: "Champagne", hex: "#E9CA9F" },
  { value: "blush", label: "Blush", hex: "#EDD5B0" },
  { value: "charcoal", label: "Charcoal", hex: "#14201B" },
  { value: "dusty-rose", label: "Dusty Rose", hex: "#c4a39e" },
];

function SectionHeader({
  no,
  title,
  sub,
}: {
  no: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-4 pb-5 border-b border-sand-300/40">
      <span className="font-display text-4xl text-sand-400 font-bold leading-none mt-1">
        {no}
      </span>
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-emerald-950 leading-tight">
          {title}
        </h2>
        {sub && (
          <p className="mt-2 text-sm md:text-base text-charcoal/70 leading-relaxed max-w-[62ch]">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CustomizePage() {
  const state = useCustomizerStore();
  const [activeField, setActiveField] = useState<MeasurementFieldKey | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [exportingImage, setExportingImage] = useState(false);
  const [previewCardUrl, setPreviewCardUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileSketchExpanded, setMobileSketchExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const sketchContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isUrdu = state.language === "ur";
  const isLehenga = state.garmentType === "lehenga" || state.garmentType === null;

  // 1-Click WhatsApp Couture Dossier with full Atelier UI Card generation
  const handleConfirmOrderWhatsApp = async () => {
    setExportingImage(true);

    // 1. Generate share snapshot URL & Order Reference
    const snapshot = state.buildSnapshot();
    const encoded = encodeSnapshot(snapshot);
    const origin = typeof window !== "undefined" ? window.location.origin : "https://bagum.com";
    const shareUrl = `${origin}/customize/share?d=${encoded}`;
    const orderCode = `BGM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const u = state.unit;
    const g = state.garment;
    const b = state.bottom;
    const l = state.lehenga;

    // 2. Format itemized body proportions
    const measurementsList: { label: string; value: string }[] = [];
    if (g.bust) measurementsList.push({ label: "Bust", value: `${displayValue(g.bust, u)} ${u}` });
    if (b.waist) measurementsList.push({ label: "Waist", value: `${displayValue(b.waist, u)} ${u}` });
    if (g.hip) measurementsList.push({ label: "Hip", value: `${displayValue(g.hip, u)} ${u}` });
    if (g.shoulder) measurementsList.push({ label: "Shoulder", value: `${displayValue(g.shoulder, u)} ${u}` });
    if (g.neckDepth) measurementsList.push({ label: "Neck Depth", value: `${displayValue(g.neckDepth, u)} ${u}` });
    if (g.shirtLength) measurementsList.push({ label: "Kurti Length", value: `${displayValue(g.shirtLength, u)} ${u}` });
    if (g.sleevesLength) measurementsList.push({ label: "Sleeves", value: `${displayValue(g.sleevesLength, u)} ${u}` });
    if (g.armhole) measurementsList.push({ label: "Armhole", value: `${displayValue(g.armhole, u)} ${u}` });
    if (b.thigh) measurementsList.push({ label: "Thigh", value: `${displayValue(b.thigh, u)} ${u}` });
    if (b.length) measurementsList.push({ label: "Trouser Length", value: `${displayValue(b.length, u)} ${u}` });
    if (b.hem) measurementsList.push({ label: "Hem", value: `${displayValue(b.hem, u)} ${u}` });
    if (l.lehengaLength) measurementsList.push({ label: "Lehenga Length", value: `${displayValue(l.lehengaLength, u)} ${u}` });
    if (l.flareType) measurementsList.push({ label: "Skirt Flare", value: `${l.flareType}` });
    if (l.dupattaLength) measurementsList.push({ label: "Dupatta", value: `${displayValue(l.dupattaLength, u)} ${u}` });

    const milestoneList = [
      { label: "Deposit (30% Today)", amount: formatPrice(price.stages[0]?.amount || 0, "PKR") },
      { label: "Stage 2 Karigari (40%)", amount: formatPrice(price.stages[1]?.amount || 0, "PKR") },
      { label: "Stage 3 Fitting (30%)", amount: formatPrice(price.stages[2]?.amount || 0, "PKR") },
    ];

    // 3. Render High-Resolution Atelier Couture Card Image (1200x800 Canvas)
    try {
      const svg = sketchContainerRef.current?.querySelector("svg") || null;
      const { dataUrl } = await generateAtelierCardImage({
        svgElement: svg,
        garmentType: state.garmentType || "Lehenga",
        occasion: state.occasion || "Baraat",
        fabricLabel: activeFabricObj.label,
        fabricColorLabel: activeColorObj.label,
        embroideryLabel: activeEmbroideryObj.label,
        density: state.density || "Medium",
        addons: state.addons.map((a) => addonOptions.find((o) => o.value === a)?.label || a),
        unit: u,
        measurements: measurementsList,
        totalPrice: formatPrice(price.total, "PKR"),
        milestones: milestoneList,
        orderRef: orderCode,
        shareUrl,
      });

      setPreviewCardUrl(dataUrl);

      // Auto-trigger clean download of the official atelier dossier card
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `begum-${state.garmentType || "bridal"}-atelier-card.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.warn("Could not generate atelier card image:", err);
    } finally {
      setExportingImage(false);
    }

    // 4. Compile WhatsApp Message Text
    const measureLines = measurementsList.map((m) => `• ${m.label}: ${m.value}`).join("\n");

    const message = [
      "👑 *BEGUM HAUTE COUTURE — BESPOKE BRIDAL DOSSIER*",
      `Order Ref: ${orderCode}`,
      "────────────────────────────",
      `👗 *Silhouette:* ${(state.garmentType || "Lehenga").toUpperCase()}`,
      `🎉 *Occasion:* ${(state.occasion || "Baraat").toUpperCase()}`,
      `🎨 *Palette & Silk:* ${activeColorObj.label} (${activeFabricObj.label})`,
      `✨ *Karigari:* ${activeEmbroideryObj.label} (${(state.density || "medium").toUpperCase()} Density)`,
      state.addons.length > 0
        ? `💎 *Add-ons:* ${state.addons.map((a) => addonOptions.find((o) => o.value === a)?.label || a).join(", ")}`
        : null,
      "",
      `📐 *PROPORTIONS & MEASUREMENTS (${u.toUpperCase()}):*`,
      measureLines || "Standard Size M Proportions",
      "",
      "────────────────────────────",
      `💰 *Estimated Total:* ${formatPrice(price.total, "PKR")}`,
      `📅 *Deposit (30% Today):* ${formatPrice(price.stages[0]?.amount || 0, "PKR")}`,
      `📅 *Stage 2 Karigari (40%):* ${formatPrice(price.stages[1]?.amount || 0, "PKR")}`,
      `📅 *Stage 3 Final Fitting (30%):* ${formatPrice(price.stages[2]?.amount || 0, "PKR")}`,
      "────────────────────────────",
      `🖼️ *Atelier Card Image:* Downloaded to device (begum-${state.garmentType || "bridal"}-atelier-card.png)`,
      `🌐 *Live Atelier Verification Link:*`,
      shareUrl,
      "",
      "I have attached my bespoke atelier card image. Please review my proportions and connect me with the master karigar.",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/923209988777?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setOrderSent(true);
    setTimeout(() => setOrderSent(false), 5000);
  };

  // Zari thread progress line
  useEffect(() => {
    if (prefersReducedMotion || !threadRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        threadRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 45%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const fitNotices = runFitChecks(state.garment, state.bottom, state.lehenga);
  const flaggedFields = new Set(fitNotices.flatMap((n) => n.fields));

  const price = computePrice({
    garmentType: state.garmentType,
    fabric: state.fabric,
    embroidery: state.embroidery,
    density: state.density,
    addons: state.addons,
    rush: state.rush,
  });

  // Fields are ALWAYS editable — no locking out
  const fieldProps = (field: MeasurementFieldKey) => ({
    fieldKey: field,
    unit: state.unit,
    language: state.language,
    disabled: false,
    standardValue: state.selectedSize ? getFieldValue(state.selectedSize, field) : undefined,
    standardSize: state.selectedSize,
    onActiveChange: setActiveField,
    flagged: flaggedFields.has(field),
  });

  const activeColorObj =
    fabricColors.find((c) => c.value === state.fabricColor) || fabricColors[0];
  const activeFabricObj =
    fabricOptions.find((f) => f.value === state.fabric) || fabricOptions[0];
  const activeEmbroideryObj =
    embroideryTechniques.find((e) => e.value === state.embroidery) || embroideryTechniques[0];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* ── Haute Couture Grand Atelier Entrance Banner ─────────────────────── */}
      <section className="relative pt-24 pb-10 md:pt-40 md:pb-20 overflow-hidden bg-emerald-950 text-ivory">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 20%, rgba(233,202,159,0.3), transparent 70%)",
          }}
        />

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-2 sm:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sand-400/30 bg-emerald-900/50 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.35em] text-sand-300">
              <Sparkles size={12} className="text-sand-400 shrink-0" />
              <span>Haute Couture Bespoke Salon · Atelier Lahore</span>
            </div>

            <h1 className="mt-4 sm:mt-5 font-display text-[clamp(1.85rem,5.2vw,4.2rem)] leading-[1] sm:leading-[0.96] tracking-tight text-ivory">
              {isUrdu
                ? "آپ کی آنکھوں کا خواب، ہماری دستکاری"
                : "Tell us what you see when you close your eyes."}
            </h1>

            <p className="mt-4 text-sm md:text-base text-sand-100/80 max-w-2xl mx-auto leading-relaxed font-light">
              {isUrdu
                ? "ایک ہی جاندار صفحہ پیمائش، کپڑا، کڑھائی اور قیمت ساتھ ساتھ بنتی ہوئی۔ ایک ماہر کاریگر آرڈر سے پہلے ہر تفصیل کی تصدیق کرتا ہے۔"
                : "One living atelier salon — measurements in inches or centimeters, pure silk, hand-zardozi, and staged milestones. Nothing is cut until you approve."}
            </p>

            {/* Language & Primary Unit Switcher */}
            <div className="mt-7 inline-flex items-center gap-4 bg-emerald-900/60 border border-sand-300/30 backdrop-blur-md px-4 py-2 rounded-sm text-xs">
              {/* Unit Toggle */}
              <div className="flex items-center gap-2" role="group" aria-label="Measurement unit">
                <span className="text-[10px] uppercase tracking-wider text-sand-300/70 flex items-center gap-1">
                  <Ruler size={12} /> Unit:
                </span>
                {(["in", "cm"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => state.setUnit(u)}
                    className={cn(
                      "px-3 py-1 uppercase tracking-wider transition-all rounded-xs font-medium",
                      state.unit === u
                        ? "bg-sand-300 text-emerald-950 font-bold shadow-xs"
                        : "text-sand-200/70 hover:text-sand-100"
                    )}
                  >
                    {u === "in" ? "Inches (in)" : "Centimeters (cm)"}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-sand-300/25" />

              {/* Language Switcher */}
              <div className="flex items-center gap-1.5" role="group" aria-label="Language selection">
                {(["en", "ur"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => state.setLanguage(lang)}
                    className={cn(
                      "px-2.5 py-1 tracking-wider transition-all rounded-xs font-medium",
                      state.language === lang
                        ? "bg-sand-300 text-emerald-950 font-bold shadow-xs"
                        : "text-sand-200/70 hover:text-sand-100"
                    )}
                  >
                    {lang === "en" ? "English" : "اردو"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Sticky Architectural Stage Navigator ───────────────────────── */}
      <StageNavigator language={state.language} />

      {/* ── Main Couture Virtual Atelier Salon ───────────────────────────── */}
      <main className="py-6 md:py-12 lg:py-16 pb-28 lg:pb-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* ── Left Column: Couture Sketchpad Easel (Order 1, Sticky on Desktop) ─────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-36 order-1">
              <div className="relative border border-sand-300/60 bg-[#FAF6EF] p-4 sm:p-6 shadow-[0_12px_32px_rgba(3,20,14,0.06)] rounded-sm">
                {/* Atelier Easel Header */}
                <div className="flex items-center justify-between pb-3 border-b border-sand-300/40">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-sand-800 font-semibold">
                      Begum Atelier · Lahore
                    </span>
                    <p className="text-xs text-charcoal/80 font-medium capitalize mt-0.5">
                      {activeColorObj.label} {activeFabricObj.label}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Immediate Unit Switcher on Sketchpad */}
                    <div className="inline-flex border border-sand-400/40 bg-sand-100/50 p-0.5 rounded-xs">
                      {(["in", "cm"] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => state.setUnit(u)}
                          className={cn(
                            "px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-2xs transition-all",
                            state.unit === u
                              ? "bg-emerald-950 text-sand-200"
                              : "text-charcoal/60 hover:text-charcoal"
                          )}
                        >
                          {u}
                        </button>
                      ))}
                    </div>

                    {/* Mobile Expand / Collapse Sketch Button */}
                    <button
                      type="button"
                      onClick={() => setMobileSketchExpanded(!mobileSketchExpanded)}
                      className="lg:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border border-sand-400/50 bg-sand-200/50 text-emerald-950 rounded-xs transition-colors active:scale-95"
                      aria-expanded={mobileSketchExpanded}
                      aria-label="Toggle Atelier Sketch"
                    >
                      <Eye size={12} />
                      <span>{mobileSketchExpanded ? "Hide" : "Sketch"}</span>
                      <span className="text-[9px]">{mobileSketchExpanded ? "▲" : "▼"}</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Glance Summary Bar when sketch is collapsed */}
                {!mobileSketchExpanded && (
                  <div className="lg:hidden pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-charcoal/50 block">Estimated Total</span>
                      <span className="font-display text-base font-bold text-emerald-950">{formatPrice(price.total, "PKR")}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileSketchExpanded(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/10 hover:bg-emerald-950 hover:text-sand-200 text-emerald-950 rounded-xs text-xs font-medium transition-colors"
                    >
                      <Eye size={13} />
                      <span>{isUrdu ? "خاکہ کھولیں" : "View Live Sketch"}</span>
                    </button>
                  </div>
                )}

                {/* Live Silhouette Illustration with immediate reactive scaling */}
                <div
                  ref={sketchContainerRef}
                  className={cn(
                    "py-3 md:py-4 max-w-[280px] mx-auto transition-all duration-300",
                    !mobileSketchExpanded && "hidden lg:block"
                  )}
                >
                  <SilhouettePreview
                    garmentType={state.garmentType}
                    garment={state.garment}
                    bottom={state.bottom}
                    lehenga={state.lehenga}
                    fabricColor={state.fabricColor}
                    fabric={state.fabric}
                    embroidery={state.embroidery}
                    density={state.density}
                    unit={state.unit}
                    activeField={activeField}
                  />
                </div>

                {/* Live Specification Pills */}
                <div className={cn("pt-3 border-t border-sand-300/40 space-y-2", !mobileSketchExpanded && "hidden lg:block")}>
                  <div className="flex items-center justify-between text-[11px] text-charcoal/70">
                    <span className="text-sand-700 font-medium">Embroidery:</span>
                    <span className="font-semibold text-emerald-950 capitalize">
                      {activeEmbroideryObj.label} ({state.density || "Medium"})
                    </span>
                  </div>

                  {activeField && (
                    <div className="bg-sand-100/70 border border-sand-300/50 px-2.5 py-1 text-[11px] text-emerald-950 flex items-center justify-between rounded-xs">
                      <span className="text-sand-800 font-medium capitalize">
                        Focusing {activeField}:
                      </span>
                      <span className="font-bold">
                        {state.unit === "in" ? 'Measuring in Inches (")' : "Measuring in Centimeters (cm)"}
                      </span>
                    </div>
                  )}

                  {/* Live Staged Price Snapshot */}
                  <div className="mt-2 pt-2 border-t border-sand-300/30 flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-charcoal/50">
                        Estimated Total
                      </p>
                      <p className="font-display text-xl text-emerald-950 font-bold tabular-nums">
                        {formatPrice(price.total, "PKR")}
                      </p>
                    </div>
                    <a
                      href="#review"
                      className="px-3 py-1 bg-emerald-950/10 text-emerald-950 border border-emerald-950/20 text-[10px] uppercase tracking-wider font-semibold hover:bg-emerald-950 hover:text-ivory transition-colors rounded-2xs"
                    >
                      View Ledger
                    </a>
                  </div>

                  {/* ── Primary Begum Atelier Card CTA: Confirm Order on WhatsApp ── */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleConfirmOrderWhatsApp}
                      disabled={exportingImage}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xs shadow-md border",
                        orderSent
                          ? "bg-emerald-800 text-sand-100 border-sand-300/50 cursor-default"
                          : "bg-emerald-950 text-sand-200 border-sand-400/50 hover:bg-emerald-900 hover:text-sand-100 hover:shadow-lg active:scale-[0.99]"
                      )}
                    >
                      {orderSent ? (
                        <>
                          <CheckCircle2 size={16} className="text-sand-300 animate-pulse" />
                          <span>{isUrdu ? "آرڈر واٹس ایپ پر ارسال ہو گیا" : "Order Sent to WhatsApp"}</span>
                        </>
                      ) : exportingImage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-sand-300/30 border-t-sand-300 rounded-full animate-spin" />
                          <span>{isUrdu ? "خاکہ تیار کیا جا رہا ہے..." : "Preparing Atelier Sketch..."}</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle size={16} className="text-sand-300" />
                          <span>{isUrdu ? "واٹس ایپ پر آرڈر کنفرم کریں" : "Confirm Order on WhatsApp"}</span>
                        </>
                      )}
                    </button>
                    <p className="mt-1.5 text-[10px] text-center text-charcoal/60 leading-tight">
                      {isUrdu
                        ? "خاکہ خود بخود ڈاؤن لوڈ ہو جائے گا اور تمام ناپ کاریگر کو ارسال ہو جائیں گے"
                        : "Includes high-res sketch illustration download & full bespoke specs"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Salon Fitting Stages (7 Cols) ────────────────── */}
            <div
              ref={contentRef}
              className="lg:col-span-7 relative order-2 space-y-12 md:space-y-16 lg:space-y-20"
            >
              {/* Zari Thread Guide */}
              <div
                className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-sand-300/40"
                aria-hidden
              >
                <div
                  ref={threadRef}
                  className="h-full w-full origin-top"
                  style={{ background: "linear-gradient(to bottom, #C9975A, #E9CA9F)" }}
                />
              </div>

              {/* ── STAGE 01: SILHOUETTE & OCCASION ─────────────────────────── */}
              <section id="base" aria-labelledby="base-heading" className="scroll-mt-36">
                <SectionHeader
                  no="01"
                  title="The Base Silhouette"
                  sub={
                    isUrdu
                      ? "پہلے اپنا شاہکار انداز چنیں، پھر جس تقریب کے لیے آپ اسے تیار کروانا چاہتی ہیں۔"
                      : "Select your foundational bridal silhouette, followed by the auspicious wedding occasion."
                  }
                />

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {garmentTypes.map((g) => {
                    const isSelected = state.garmentType === g.value;
                    return (
                      <button
                        key={g.value}
                        onClick={() => state.setGarmentType(g.value)}
                        className={cn(
                          "p-5 text-left border rounded-xs transition-all duration-300 relative group",
                          isSelected
                            ? "border-emerald-950 bg-white shadow-sm ring-1 ring-emerald-950"
                            : "border-charcoal/15 bg-white/70 hover:border-sand-400 hover:bg-white"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-emerald-950">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                        <p className="text-base font-display text-emerald-950 font-bold">
                          {isUrdu ? g.ur : g.label}
                        </p>
                        <p className="text-xs text-charcoal/65 mt-1.5 leading-relaxed">
                          {g.desc}
                        </p>
                        <p className="text-xs font-semibold text-emerald-900 mt-3 pt-3 border-t border-charcoal/10">
                          {isUrdu ? "بنیادی قیمت" : "From"} {formatPrice(baseGarmentPrices[g.value], "PKR")}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Occasion Selection */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-800 mb-3">
                    {isUrdu ? "موقع کا انتخاب" : "Select Occasion"}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {occasions.map((o) => (
                      <button
                        key={o.slug}
                        onClick={() => state.setOccasion(o.slug as Occasion)}
                        className={cn(
                          "px-4 py-2 text-xs border rounded-full transition-all duration-300",
                          state.occasion === o.slug
                            ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-xs font-medium"
                            : "border-charcoal/20 bg-white/60 text-charcoal/70 hover:border-emerald-900/40"
                        )}
                      >
                        {o.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── STAGE 02: PROPORTIONS & MEASUREMENTS ─────────────────────── */}
              <section id="measurements" aria-labelledby="measure-heading" className="scroll-mt-36">
                <SectionHeader
                  no="02"
                  title="Fit & Proportions"
                  sub={
                    isUrdu
                      ? "اپنا سائز منتخب کریں یا ہر پیمائش اپنی مرضی کے مطابق انچ یا سینٹی میٹر میں درج کریں۔"
                      : "Start from standard proportions or enter your exact custom measurements in inches or centimeters."
                  }
                />

                {/* Quick Unit & Size Preset Controls */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 border border-sand-300/60 bg-white rounded-xs">
                  {/* Standard Size Buttons */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block mb-1.5 font-medium">
                      Start from Size:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {STANDARD_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => state.applyStandardSize(size)}
                          className={cn(
                            "w-10 h-10 border text-xs font-semibold transition-all rounded-xs",
                            state.selectedSize === size
                              ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-xs"
                              : "border-charcoal/15 bg-white text-charcoal/70 hover:border-sand-400"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prominent Unit Switcher */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block mb-1.5 font-medium">
                      Measurement Unit:
                    </span>
                    <div className="inline-flex border border-sand-400/60 bg-sand-100/40 p-0.5 rounded-xs">
                      {(["in", "cm"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => state.setUnit(u)}
                          className={cn(
                            "px-4 py-2 text-xs font-semibold tracking-wider transition-all rounded-xs",
                            state.unit === u
                              ? "bg-emerald-950 text-sand-200 shadow-xs"
                              : "text-charcoal/70 hover:text-charcoal"
                          )}
                        >
                          {u === "in" ? "Inches (in)" : "Centimeters (cm)"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Collapsible Smart Start Quiz */}
                <div className="mt-4">
                  <button
                    onClick={() => setQuizOpen(!quizOpen)}
                    className="w-full flex items-center justify-between p-3.5 border border-sand-300/40 bg-sand-100/40 text-xs text-charcoal/80 hover:bg-sand-100/70 transition-colors rounded-xs"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles size={14} className="text-sand-700" />
                      <span>{isUrdu ? "فٹ کوئز: 30 سیکنڈ میں اپنا سائز جانیں" : "Not sure of your size? Take the 30-Second Fit Quiz"}</span>
                    </span>
                    <ChevronDown size={15} className={cn("transition-transform duration-300", quizOpen && "rotate-180")} />
                  </button>

                  {quizOpen && (
                    <div className="p-5 border border-t-0 border-sand-300/40 bg-white rounded-b-xs">
                      <SmartStart />
                    </div>
                  )}
                </div>

                {/* Measurement Input Groups (Always Unlocked) */}
                <div className="mt-6 space-y-6">
                  {/* Choli / Kurti Group */}
                  <div className="border border-sand-300/50 bg-white p-6 rounded-xs shadow-xs">
                    <p className="text-xs uppercase tracking-[0.25em] text-sand-800 font-semibold mb-4">
                      {t(uiStrings.garmentGroup, state.language)} ({state.unit === "in" ? "Inches" : "Centimeters"})
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {GARMENT_FIELDS.map((field) => (
                        <MeasurementField
                          key={field}
                          {...fieldProps(field)}
                          value={state.garment[field as GarmentField]}
                          onChange={(v) => {
                            if (v !== undefined) {
                              state.setGarmentField(field as GarmentField, v);
                              state.setRefineMode(true);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Group */}
                  <div className="border border-sand-300/50 bg-white p-6 rounded-xs shadow-xs">
                    <p className="text-xs uppercase tracking-[0.25em] text-sand-800 font-semibold mb-4">
                      {t(uiStrings.bottomGroup, state.language)} ({state.unit === "in" ? "Inches" : "Centimeters"})
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {BOTTOM_FIELDS.map((field) => (
                        <MeasurementField
                          key={field}
                          {...fieldProps(field)}
                          value={state.bottom[field as BottomField]}
                          optional={field === "thigh"}
                          onChange={(v) => {
                            state.setBottomField(field as BottomField, v);
                            state.setRefineMode(true);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Lehenga Specifics */}
                  {isLehenga && (
                    <div className="border border-sand-300/50 bg-white p-6 rounded-xs shadow-xs">
                      <p className="text-xs uppercase tracking-[0.25em] text-sand-800 font-semibold mb-4">
                        {t(uiStrings.lehengaGroup, state.language)} ({state.unit === "in" ? "Inches" : "Centimeters"})
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <MeasurementField
                          {...fieldProps("lehengaLength")}
                          value={state.lehenga.lehengaLength}
                          onChange={(v) => {
                            if (v !== undefined) {
                              state.setLehengaField("lehengaLength", v);
                              state.setRefineMode(true);
                            }
                          }}
                        />
                        <MeasurementField
                          {...fieldProps("dupattaLength")}
                          value={state.lehenga.dupattaLength}
                          onChange={(v) => {
                            if (v !== undefined) {
                              state.setLehengaField("dupattaLength", v);
                              state.setRefineMode(true);
                            }
                          }}
                        />
                      </div>

                      {/* Flare Types */}
                      <div className="mt-5 pt-4 border-t border-sand-200">
                        <p className="text-xs font-semibold text-charcoal/80 mb-2.5">
                          {isUrdu ? "گھیر کا انداز" : "Skirt Flare Cut"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {FLARE_TYPES.map((flare) => (
                            <button
                              key={flare}
                              onClick={() => state.setLehengaField("flareType", flare)}
                              className={cn(
                                "px-4 py-2 text-xs border rounded-xs transition-all",
                                state.lehenga.flareType === flare
                                  ? "border-emerald-950 bg-emerald-950 text-sand-200 font-semibold"
                                  : "border-charcoal/15 bg-white text-charcoal/70 hover:border-sand-400"
                              )}
                            >
                              {flare}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fit Notices */}
                  {fitNotices.length > 0 && (
                    <div className="space-y-3">
                      {fitNotices.map((notice) => (
                        <div
                          key={notice.id}
                          className="border-l-3 border-sand-500 bg-sand-100/60 p-4 rounded-r-xs"
                        >
                          <p className="text-xs text-charcoal/80 leading-relaxed font-medium">
                            {notice.message[state.language]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* ── STAGE 03: PURE SILK & PALETTE ───────────────────────────── */}
              <section id="fabric" aria-labelledby="fabric-heading" className="scroll-mt-36">
                <SectionHeader
                  no="03"
                  title="Pure Silk & Royal Palette"
                  sub={
                    isUrdu
                      ? "خالص ریشم اور باوقار رنگ۔ حقیقی سویچز آپ کے دروازے پر بھیجے جا سکتے ہیں۔"
                      : "Handpicked pure silks and velvets woven in Lahore. Swatches can be posted worldwide prior to cutting."
                  }
                />

                {/* Fabric Type Cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {fabricOptions.map((f) => {
                    const isSelected = state.fabric === f.value;
                    return (
                      <button
                        key={f.value}
                        onClick={() => state.setFabric(f.value)}
                        className={cn(
                          "p-4 text-left border rounded-xs transition-all relative",
                          isSelected
                            ? "border-emerald-950 bg-white shadow-sm ring-1 ring-emerald-950"
                            : "border-charcoal/15 bg-white/70 hover:border-sand-400 hover:bg-white"
                        )}
                      >
                        <p className="text-sm font-semibold text-emerald-950">{f.label}</p>
                        <p className="text-[11px] text-charcoal/60 mt-1 leading-snug">{f.desc}</p>
                        <p className="text-xs text-emerald-900 mt-2 font-semibold">
                          +{formatPrice(f.tierPrice, "PKR")}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Color Swatch Circles */}
                <div className="mt-6 border border-sand-300/50 bg-white p-6 rounded-xs shadow-xs">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-800 mb-4">
                    {isUrdu ? "شاہی رنگ چنیں" : "Royal Color Palette"}
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                    {fabricColors.map((c) => {
                      const isSelected = state.fabricColor === c.value;
                      return (
                        <button
                          key={c.value}
                          onClick={() => state.setFabricColor(c.value)}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <span
                            className={cn(
                              "w-11 h-11 rounded-full border-2 transition-all duration-300 shadow-xs relative",
                              isSelected
                                ? "border-emerald-950 scale-110 shadow-md ring-2 ring-sand-400"
                                : "border-black/10 group-hover:scale-105"
                            )}
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <span className="absolute inset-0 flex items-center justify-center text-ivory text-xs drop-shadow">
                                ✓
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-charcoal/70 font-medium group-hover:text-charcoal text-center">
                            {c.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Swatch Dispatch Banner */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sand-300/50 bg-sand-100/50 p-4 rounded-xs">
                  <p className="text-xs text-charcoal/75">
                    {isUrdu
                      ? "کیا آپ کپڑے کو چھو کر دیکھنا چاہتی ہیں؟ ہم دنیا بھر میں اصل سویچز بھیجتے ہیں۔"
                      : "Want to feel the weave and sheen in person? We dispatch physical swatch cards worldwide."}
                  </p>
                  <Link
                    href="/contact"
                    className="shrink-0 text-xs text-emerald-950 font-semibold underline underline-offset-4 hover:text-emerald-800"
                  >
                    {isUrdu ? "سویچ منگوائیں" : "Request Swatches by Post &rarr;"}
                  </Link>
                </div>
              </section>

              {/* ── STAGE 04: EMBROIDERY & KARIGARI ─────────────────────────── */}
              <section id="embroidery" aria-labelledby="embroidery-heading" className="scroll-mt-36">
                <SectionHeader
                  no="04"
                  title="Hand Karigari & Density"
                  sub={
                    isUrdu
                      ? "لاہور کے ماہر کاریگروں کے ہاتھ کی زر دوزی اور دبکہ۔ کام کی کثافت سے حتمی جھلک بدلتی ہے۔"
                      : "Authentic royal embroidery techniques executed entirely by master artisans. Density dynamically updates the sketchpad."
                  }
                />

                {/* Technique Cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {embroideryTechniques.map((tech) => {
                    const isSelected = state.embroidery === tech.value;
                    return (
                      <button
                        key={tech.value}
                        onClick={() => state.setEmbroidery(tech.value)}
                        className={cn(
                          "p-5 text-left border rounded-xs transition-all relative",
                          isSelected
                            ? "border-emerald-950 bg-white shadow-sm ring-1 ring-emerald-950"
                            : "border-charcoal/15 bg-white/70 hover:border-sand-400 hover:bg-white"
                        )}
                      >
                        <p className="text-base font-display text-emerald-950 font-bold">
                          {tech.label}
                        </p>
                        <p className="text-xs text-charcoal/65 mt-1.5 leading-relaxed">
                          {tech.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Density Multipliers */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-800 mb-3">
                    {isUrdu ? "کام کا پھیلاؤ (کثافت)" : "Embroidery Coverage & Density"}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(densityMultipliers) as Array<keyof typeof densityMultipliers>).map(
                      (d) => {
                        const density = densityMultipliers[d];
                        const base = state.garmentType
                          ? baseGarmentPrices[state.garmentType]
                          : baseGarmentPrices.lehenga;
                        const impact = Math.round(base * density.multiplier);
                        const isSelected = state.density === d;

                        return (
                          <button
                            key={d}
                            onClick={() => state.setDensity(d)}
                            className={cn(
                              "p-4 text-center border rounded-xs transition-all",
                              isSelected
                                ? "border-emerald-950 bg-emerald-950 text-sand-200 font-semibold shadow-xs"
                                : "border-charcoal/15 bg-white text-charcoal hover:border-sand-400"
                            )}
                          >
                            <p className="text-sm font-semibold">{density.label}</p>
                            <p
                              className={cn(
                                "text-[11px] mt-1",
                                isSelected ? "text-sand-300" : "text-charcoal/60"
                              )}
                            >
                              {density.desc}
                            </p>
                            <p
                              className={cn(
                                "text-xs mt-2 font-semibold tabular-nums",
                                isSelected ? "text-sand-200" : "text-emerald-900"
                              )}
                            >
                              {impact === 0
                                ? isUrdu
                                  ? "شامل ہے"
                                  : "Included"
                                : `+${formatPrice(impact, "PKR")}`}
                            </p>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </section>

              {/* ── STAGE 05: FINISHING TOUCHES ─────────────────────────────── */}
              <section id="addons" aria-labelledby="addons-heading" className="scroll-mt-36">
                <SectionHeader
                  no="05"
                  title="Heirloom Finishing Accents"
                  sub={
                    isUrdu
                      ? "دوپٹہ، پوتلی اور کھسہ بالکل اسی کپڑے اور دھاگے سے تیار کیا جاتا ہے۔"
                      : "Coordinated accessories hand-embroidered with identical thread, stones, and pure silk tone."
                  }
                />

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {addonOptions.map((addon) => {
                    const selected = state.addons.includes(addon.value);
                    return (
                      <button
                        key={addon.value}
                        onClick={() => state.toggleAddon(addon.value)}
                        className={cn(
                          "p-5 text-left border rounded-xs transition-all flex items-start gap-4",
                          selected
                            ? "border-emerald-950 bg-white shadow-xs ring-1 ring-emerald-950"
                            : "border-charcoal/15 bg-white/70 hover:border-sand-400 hover:bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "w-5 h-5 border mt-0.5 flex items-center justify-center shrink-0 text-ivory text-xs transition-colors rounded-xs",
                            selected
                              ? "bg-emerald-950 border-emerald-950"
                              : "border-charcoal/30 bg-white"
                          )}
                        >
                          {selected && "✓"}
                        </span>
                        <div>
                          <span className="block text-sm font-semibold text-charcoal">
                            {addon.label}
                          </span>
                          <span className="block text-xs text-charcoal/60 mt-1 leading-snug">
                            {addon.desc}
                          </span>
                          <span className="block text-xs text-emerald-900 mt-2 font-semibold">
                            +{formatPrice(addon.price, "PKR")}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── STAGE 06: ATELIER LEDGER & MILESTONES ─────────────────────── */}
              <section id="review" aria-labelledby="review-heading" className="scroll-mt-36">
                <SectionHeader
                  no="06"
                  title="Atelier Ledger & Milestones"
                  sub={
                    isUrdu
                      ? "30 / 40 / 30 شفاف ادائیگی۔ ہر مرحلے پر تصدیقی تصاویر اور ویڈیو کالز۔"
                      : "Transparent 30 / 40 / 30 milestone breakdown. You receive high-resolution progress media before authorizing subsequent stages."
                  }
                />

                <div className="mt-6 border border-sand-300/60 bg-white p-6 md:p-8 rounded-xs shadow-xs">
                  {price.lines.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {price.lines.map((line) => (
                          <div key={line.label} className="flex justify-between gap-4 text-sm">
                            <span className="text-charcoal/70">{line.label}</span>
                            <span className="text-charcoal font-medium tabular-nums">
                              {formatPrice(line.amount, "PKR")}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-5 border-t border-charcoal/15 flex justify-between items-baseline">
                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60 font-semibold">
                          {isUrdu ? "تخمینہ کل" : "Estimated Total"}
                        </span>
                        <span className="font-display text-3xl text-emerald-950 font-bold tabular-nums">
                          {formatPrice(price.total, "PKR")}
                        </span>
                      </div>

                      {/* Staged Milestone Cards */}
                      <div className="mt-7 grid sm:grid-cols-3 gap-3">
                        {price.stages.map((stage, i) => (
                          <div
                            key={stage.label}
                            className={cn(
                              "border p-4 rounded-xs",
                              i === 0
                                ? "bg-emerald-950 text-ivory border-sand-400 shadow-xs"
                                : "bg-sand-50/70 border-sand-300/60 text-charcoal"
                            )}
                          >
                            <p className="font-display text-2xl text-sand-300 font-bold">
                              {stage.percent}%
                            </p>
                            <p
                              className={cn(
                                "text-xs mt-1 leading-snug",
                                i === 0 ? "text-sand-100" : "text-charcoal/70"
                              )}
                            >
                              {stage.label}
                            </p>
                            <p
                              className={cn(
                                "text-sm font-semibold mt-2 tabular-nums",
                                i === 0 ? "text-sand-200" : "text-emerald-950"
                              )}
                            >
                              {formatPrice(stage.amount, "PKR")}
                            </p>
                            {i === 0 && (
                              <p className="text-[10px] text-sand-400 mt-1 uppercase tracking-wider">
                                {isUrdu ? "صرف یہی آج" : "Deposit required today"}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      <label className="mt-6 flex items-center gap-3 text-xs text-charcoal/80 cursor-pointer p-3 bg-sand-50 border border-sand-300/40 rounded-xs">
                        <input
                          type="checkbox"
                          checked={state.rush}
                          onChange={(e) => state.setRush(e.target.checked)}
                          className="accent-emerald-950 w-4 h-4"
                        />
                        <span>
                          {isUrdu
                            ? "جلدی درکار ہے (10 ہفتوں سے کم) 15 فیصد رش فیس شامل ہوگی"
                            : "Rush Order: Need delivery in under 10 weeks (adds a 15% priority atelier fee)"}
                        </span>
                      </label>
                    </>
                  ) : (
                    <p className="text-sm text-charcoal/60">
                      {isUrdu
                        ? "اوپر انتخاب مکمل کریں، تفصیل یہاں بنتی جائے گی۔"
                        : "Select your silhouette above to generate an itemized quote."}
                    </p>
                  )}
                </div>

                {/* Save Profile */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-sand-800 font-semibold mb-3">
                    {isUrdu ? "پیمائشی پروفائل محفوظ کریں" : "Save Sizing Profile for Future Orders"}
                  </p>
                  <ProfileLibrary />
                </div>

                {/* WhatsApp Dossier Confirmation */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleConfirmOrderWhatsApp}
                    disabled={exportingImage}
                    className={cn(
                      "inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium shadow-[0_10px_25px_rgba(3,20,14,0.2)] transition-all hover:scale-[1.01]",
                      orderSent
                        ? "bg-emerald-800 text-sand-100"
                        : "bg-emerald-950 text-sand-200 hover:bg-emerald-900"
                    )}
                  >
                    {orderSent ? (
                      <>
                        <CheckCircle2 size={16} className="text-sand-300" />
                        <span>{isUrdu ? "آرڈر واٹس ایپ پر ارسال ہو گیا" : "Order Sent to WhatsApp"}</span>
                      </>
                    ) : exportingImage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-sand-300/30 border-t-sand-300 rounded-full animate-spin" />
                        <span>{isUrdu ? "خاکہ تیار کیا جا رہا ہے..." : "Preparing Atelier Sketch..."}</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} />
                        <span>{isUrdu ? "کاریگر سے بات کریں (واٹس ایپ)" : "Confirm Order on WhatsApp"}</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-charcoal/60 leading-relaxed self-center max-w-[38ch]">
                    {isUrdu
                      ? "ایک حقیقی ماہر کاریگر پیمائش کا دوبارہ جائزہ لیتا ہے، اس لیے غلطی کا کوئی اندیشہ نہیں۔"
                      : "A master tailor personally verifies every measurement with you before any fabric is cut."}
                  </p>
                </div>
              </section>

              {/* ── STAGE 07: PRIVATE CONSULTATION CALLOUT ──────────────────── */}
              <section id="consultation" className="scroll-mt-36">
                <div className="border border-sand-300/40 bg-emerald-950 text-ivory p-8 md:p-12 rounded-xs shadow-[0_15px_40px_rgba(0,0,0,0.18)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-sand-300/80">
                      Private Salon Appointment
                    </span>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight max-w-[20ch]">
                      {isUrdu ? "ڈیزائنر سے آمنے سامنے ملیں" : "Meet Your Designer Face to Face"}
                    </h3>
                    <p className="mt-3 text-sm text-sand-100/75 max-w-[46ch] leading-relaxed font-light">
                      {isUrdu
                        ? "30 منٹ کی ون آن ون ویڈیو کال۔ کپڑے، کڑھائی اور کسٹم فٹ کے تمام سوالات مفت اور بلا جھجھک۔"
                        : "A complimentary 30-minute private video consultation with our head couturier. Review fabric swatches, sketch ideas, and ask questions freely."}
                    </p>
                  </div>
                  <Link
                    href="/customize/consultation"
                    className="shrink-0 inline-flex items-center gap-2 bg-ivory text-emerald-950 px-7 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-sand-100 transition-all shadow-md"
                  >
                    <Video size={16} />
                    <span>{isUrdu ? "ویڈیو کال بک کریں" : "Book Video Salon"}</span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>

      {/* ── Mobile Persistent Floating Atelier Action Bar ──────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#FAF6EF]/95 backdrop-blur-md border-t border-sand-300/70 px-4 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-6px_25px_rgba(3,20,14,0.12)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs uppercase tracking-wider text-emerald-950 font-bold tabular-nums">
              {formatPrice(price.total, "PKR")}
            </span>
          </div>
          <span className="text-[10px] text-charcoal/60 truncate block capitalize">
            {state.garmentType || "Lehenga"} · {state.unit === "in" ? 'Inches (")' : "CM"}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileSketchExpanded(!mobileSketchExpanded);
              if (!mobileSketchExpanded) {
                window.scrollTo({ top: 320, behavior: "smooth" });
              }
            }}
            className="px-2.5 py-2 text-[10px] uppercase tracking-wider font-semibold border border-sand-400/60 bg-white/90 text-emerald-950 rounded-xs flex items-center gap-1 active:scale-95 transition-transform"
          >
            <Eye size={12} className="text-sand-700" />
            <span>{mobileSketchExpanded ? "Hide" : "Sketch"}</span>
          </button>

          <button
            type="button"
            onClick={handleConfirmOrderWhatsApp}
            disabled={exportingImage}
            className="px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold bg-emerald-950 text-sand-200 rounded-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform border border-sand-400/40"
          >
            {exportingImage ? (
              <div className="w-3.5 h-3.5 border-2 border-sand-300/30 border-t-sand-300 rounded-full animate-spin" />
            ) : (
              <MessageCircle size={13} className="text-sand-300" />
            )}
            <span>{isUrdu ? "واٹس ایپ آرڈر" : "Confirm"}</span>
          </button>
        </div>
      </div>

      {/* ── Bespoke Atelier Dossier Card Modal Preview ──────────────────────── */}
      {previewCardUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewCardUrl(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF6EF] border border-sand-300 shadow-2xl p-4 sm:p-6 md:p-8 rounded-sm max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setPreviewCardUrl(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-charcoal/60 hover:text-charcoal bg-sand-200/50 hover:bg-sand-200 rounded-full transition-colors"
              aria-label="Close card preview"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="text-center pb-3 sm:pb-4 border-b border-sand-300/40 pr-8 sm:pr-0">
              <span className="text-[10px] uppercase tracking-[0.26em] sm:tracking-[0.3em] text-sand-800 font-semibold">
                Begum Haute Couture · Atelier Lahore
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-emerald-950 mt-1">
                Your Bespoke Atelier Dossier Card
              </h2>
              <p className="text-[11px] sm:text-xs text-charcoal/70 mt-1 max-w-lg mx-auto">
                Official atelier specification card & mannequin sketch generated in high resolution.
                Ready to submit to our master karigar on WhatsApp.
              </p>
            </div>

            {/* Image Preview Box */}
            <div className="mt-4 sm:mt-5 border border-sand-300/60 bg-white p-1.5 sm:p-2 rounded-xs shadow-inner overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewCardUrl}
                alt="Begum Bespoke Bridal Atelier Dossier Card"
                className="w-full h-auto max-h-[50vh] sm:max-h-[58vh] object-contain rounded-xs shadow-xs"
              />
            </div>

            {/* Modal Action Controls (Mobile Friendly Stack) */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-sand-300/40">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href={`https://wa.me/923209988777?text=${encodeURIComponent(
                    `Hi Begum Atelier! I have completed my custom bespoke design on the Virtual Atelier in ${state.unit === "in" ? "Inches" : "Centimeters"} (Estimated Total: ${formatPrice(price.total, "PKR")}). I am sharing my downloaded Atelier Card image with you.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-950 text-sand-200 px-5 py-3 sm:py-2.5 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-emerald-900 transition-colors rounded-xs shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>Open WhatsApp (+92 320 9988777)</span>
                </a>

                <a
                  href={previewCardUrl}
                  download={`begum-${state.garmentType || "bridal"}-atelier-card.png`}
                  className="inline-flex items-center justify-center gap-2 bg-sand-200/80 text-emerald-950 border border-sand-400/50 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-sand-300 transition-colors rounded-xs"
                >
                  <Download size={14} />
                  <span>Save Image</span>
                </a>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-300/30">
                <button
                  onClick={() => {
                    const snapshot = state.buildSnapshot();
                    const encoded = encodeSnapshot(snapshot);
                    const origin = typeof window !== "undefined" ? window.location.origin : "https://bagum.com";
                    navigator.clipboard.writeText(`${origin}/customize/share?d=${encoded}`);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-emerald-950 px-3 py-2 border border-sand-300 rounded-xs"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>

                <button
                  onClick={() => setPreviewCardUrl(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
