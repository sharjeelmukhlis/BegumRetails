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
  type MeasurementFieldKey,
  type GarmentField,
  type BottomField,
} from "@/lib/customize/schema";
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
import { SummaryPanel } from "@/components/customize/summary-panel";
import { EscapeHatch } from "@/components/customize/escape-hatch";
import { ProfileLibrary } from "@/components/customize/profile-library";
import { formatPrice, cn } from "@/lib/utils";
import { Video } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const garmentTypes: { value: GarmentType; label: string; ur: string }[] = [
  { value: "lehenga", label: "Lehenga", ur: "لہنگا" },
  { value: "sharara", label: "Sharara", ur: "شرارہ" },
  { value: "gharara", label: "Gharara", ur: "غرارہ" },
  { value: "bridal-suit", label: "Bridal Suit", ur: "برائیڈل سوٹ" },
];

const fabricColors = [
  { value: "emerald", label: "Emerald", hex: "#062319" },
  { value: "ivory", label: "Ivory", hex: "#FAF6EF" },
  { value: "blush", label: "Blush", hex: "#EDD5B0" },
  { value: "burgundy", label: "Burgundy", hex: "#6B1A2A" },
  { value: "sapphire", label: "Sapphire", hex: "#1a3a5c" },
  { value: "charcoal", label: "Charcoal", hex: "#14201B" },
  { value: "dusty-rose", label: "Dusty Rose", hex: "#c4a39e" },
  { value: "champagne", label: "Champagne", hex: "#E9CA9F" },
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
    <div className="flex items-start gap-4">
      <span className="font-display text-3xl text-sand-400 leading-none mt-1">{no}</span>
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-emerald-900 leading-tight">{title}</h2>
        {sub && <p className="mt-2 text-sm md:text-base text-charcoal/70 leading-relaxed max-w-[58ch]">{sub}</p>}
      </div>
    </div>
  );
}

export default function CustomizePage() {
  const state = useCustomizerStore();
  const [activeField, setActiveField] = useState<MeasurementFieldKey | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isUrdu = state.language === "ur";
  const isLehenga = state.garmentType === "lehenga" || state.garmentType === null;

  // Zari thread-line progress indicator, drawn by scroll.
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
            start: "top 55%",
            end: "bottom 85%",
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

  const fieldProps = (field: MeasurementFieldKey) => ({
    fieldKey: field,
    unit: state.unit,
    language: state.language,
    disabled: !state.refineMode && state.selectedSize !== null,
    standardValue: state.selectedSize ? getFieldValue(state.selectedSize, field) : undefined,
    standardSize: state.selectedSize,
    onActiveChange: setActiveField,
    flagged: flaggedFields.has(field),
  });

  return (
    <div className="bg-ivory pt-28 md:pt-32 pb-40 lg:pb-24">
      <Container>
        {/* Intro + persistent toggles */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-700 font-medium">Custom Design</p>
            <h1 className="mt-3 font-display text-emerald-950 text-[clamp(2rem,4.6vw,3.8rem)] leading-[0.95] max-w-[16ch]">
              Tell us what you see when you close your eyes.
            </h1>
            <p className="mt-4 text-base text-charcoal/72 leading-relaxed max-w-[54ch]">
              {isUrdu
                ? "ایک ہی صفحہ، سب کچھ آپ کی نظر کے سامنے — پیمائش، کپڑا، کڑھائی اور قیمت ساتھ ساتھ بنتی ہوئی۔"
                : "One living page — measurements, fabric, embroidery, and price, all in view, all connected. Nothing hides until a final step."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Unit toggle */}
            <div className="flex border border-charcoal/15" role="group" aria-label="Measurement unit">
              {(["cm", "in"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => state.setUnit(u)}
                  className={cn(
                    "px-3.5 py-2 text-[11px] uppercase tracking-wider transition-colors",
                    state.unit === u ? "bg-emerald-900 text-ivory" : "text-charcoal/60 hover:text-charcoal"
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
            {/* Language toggle */}
            <div className="flex border border-charcoal/15" role="group" aria-label="Language">
              {(["en", "ur"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => state.setLanguage(lang)}
                  className={cn(
                    "px-3.5 py-2 text-[11px] tracking-wider transition-colors",
                    state.language === lang ? "bg-emerald-900 text-ivory" : "text-charcoal/60 hover:text-charcoal"
                  )}
                >
                  {lang === "en" ? "EN" : "اردو"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          {/* Main flow */}
          <div ref={contentRef} className="lg:col-span-8 relative">
            {/* Zari thread progress line */}
            <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-sand-300/40" aria-hidden>
              <div
                ref={threadRef}
                className="h-full w-full origin-top"
                style={{ background: "linear-gradient(to bottom, #C9975A, #E9CA9F)" }}
              />
            </div>

            <div className="space-y-20">
              {/* 1 — Base selection */}
              <section id="base" aria-labelledby="base-heading">
                <SectionHeader
                  no="01"
                  title="The base"
                  sub={isUrdu ? "پہلے انداز چنیں، پھر موقع۔" : "Choose your silhouette, then the occasion it is for."}
                />
                <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {garmentTypes.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => state.setGarmentType(g.value)}
                      className={cn(
                        "p-4 text-left border transition-colors",
                        state.garmentType === g.value
                          ? "border-emerald-800 bg-emerald-50"
                          : "border-charcoal/12 hover:border-charcoal/30"
                      )}
                    >
                      <p className="text-sm font-medium text-charcoal">{isUrdu ? g.ur : g.label}</p>
                      <p className="text-[11px] text-charcoal/55 mt-1">
                        {isUrdu ? "بنیادی قیمت" : "from"} {formatPrice(baseGarmentPrices[g.value], "PKR")}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {occasions.map((o) => (
                    <button
                      key={o.slug}
                      onClick={() => state.setOccasion(o.slug as Occasion)}
                      className={cn(
                        "px-4 py-2 text-xs border rounded-full transition-colors",
                        state.occasion === o.slug
                          ? "bg-emerald-900 text-ivory border-emerald-900"
                          : "border-charcoal/15 text-charcoal/65 hover:border-emerald-800/40"
                      )}
                    >
                      {o.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* 2 — Find Your Fit */}
              <section id="find-your-fit" aria-labelledby="fit-heading">
                <SectionHeader
                  no="02"
                  title="Find your fit"
                  sub={
                    isUrdu
                      ? "تیس سیکنڈ کے جواب — اور ہم آپ کے لیے ایک سمجھ دار ابتدائی سائز بھر دیتے ہیں۔"
                      : "Thirty seconds of answers, and we pre-fill a smart starting size — you adjust from a good guess, never a blank form."
                  }
                />
                <div className="mt-7">
                  <SmartStart />
                </div>
                <div className="mt-6">
                  <EscapeHatch language={state.language} context="Hi! I need help finding my size on the Begum customizer." />
                </div>
              </section>

              {/* 3 — Fit & Measurements */}
              <section id="measurements" aria-labelledby="measure-heading">
                <SectionHeader
                  no="03"
                  title="Fit & measurements"
                  sub={
                    isUrdu
                      ? "ہر خانے کے پاس '?' ہے — دبائیں اور دیکھیں کہ وہ پیمائش جسم پر کہاں لی جاتی ہے۔"
                      : "Every field has its own measuring guide — tap the “?” to see exactly where that measurement is taken. The outline updates as you type."
                  }
                />

                {/* Recommended vs refine toggle */}
                <div className="mt-7 inline-flex border border-charcoal/15">
                  <button
                    onClick={() => state.setRefineMode(false)}
                    className={cn(
                      "px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors",
                      !state.refineMode ? "bg-emerald-900 text-ivory" : "text-charcoal/60 hover:text-charcoal"
                    )}
                  >
                    {isUrdu ? "تجویز کردہ سائز" : "Use recommended size"}
                  </button>
                  <button
                    onClick={() => state.setRefineMode(true)}
                    className={cn(
                      "px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors",
                      state.refineMode ? "bg-emerald-900 text-ivory" : "text-charcoal/60 hover:text-charcoal"
                    )}
                  >
                    {isUrdu ? "ہر پیمائش خود بدلیں" : "Refine every measurement"}
                  </button>
                </div>
                {state.selectedSize === null && (
                  <p className="mt-3 text-xs text-charcoal/55">
                    {isUrdu
                      ? "اوپر سے سائز چنیں یا 'میرا فٹ تلاش کریں' دبائیں — تمام خانے خود بھر جائیں گے۔"
                      : "Pick a size above (or use Find my fit) to pre-fill every field below."}
                  </p>
                )}

                <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
                  {/* Fields */}
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700 mb-4">
                        {t(uiStrings.garmentGroup, state.language)}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {GARMENT_FIELDS.map((field) => (
                          <MeasurementField
                            key={field}
                            {...fieldProps(field)}
                            value={state.garment[field as GarmentField]}
                            onChange={(v) => v !== undefined && state.setGarmentField(field as GarmentField, v)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700 mb-4">
                        {t(uiStrings.bottomGroup, state.language)}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {BOTTOM_FIELDS.map((field) => (
                          <MeasurementField
                            key={field}
                            {...fieldProps(field)}
                            value={state.bottom[field as BottomField]}
                            optional={field === "thigh"}
                            onChange={(v) => state.setBottomField(field as BottomField, v)}
                          />
                        ))}
                      </div>
                    </div>

                    {isLehenga && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700 mb-4">
                          {t(uiStrings.lehengaGroup, state.language)}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <MeasurementField
                            {...fieldProps("lehengaLength")}
                            value={state.lehenga.lehengaLength}
                            onChange={(v) => v !== undefined && state.setLehengaField("lehengaLength", v)}
                          />
                          <MeasurementField
                            {...fieldProps("dupattaLength")}
                            value={state.lehenga.dupattaLength}
                            onChange={(v) => v !== undefined && state.setLehengaField("dupattaLength", v)}
                          />
                        </div>
                        <div className="mt-4">
                          <p className="text-xs font-medium text-charcoal/80">
                            {isUrdu ? "گھیر کا انداز" : "Flare type"}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {FLARE_TYPES.map((flare) => (
                              <button
                                key={flare}
                                disabled={!state.refineMode && state.selectedSize !== null}
                                onClick={() => state.setLehengaField("flareType", flare)}
                                className={cn(
                                  "px-3.5 py-2 text-xs border transition-colors disabled:opacity-60",
                                  state.lehenga.flareType === flare
                                    ? "border-emerald-800 bg-emerald-50 text-emerald-900"
                                    : "border-charcoal/15 text-charcoal/65 hover:border-emerald-800/40"
                                )}
                              >
                                {flare}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fit-confidence notices — nudge, never block */}
                    {fitNotices.length > 0 && (
                      <div className="space-y-3">
                        {fitNotices.map((notice) => (
                          <div
                            key={notice.id}
                            className="border-l-2 border-sand-500/80 bg-sand-50/80 px-4 py-3"
                            dir={isUrdu ? "rtl" : "ltr"}
                            style={isUrdu ? { borderLeft: "none", borderRight: "2px solid rgba(201,151,90,0.8)" } : undefined}
                          >
                            <p className="text-xs text-charcoal/80 leading-relaxed">
                              {notice.message[state.language]}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <EscapeHatch
                      language={state.language}
                      context="Hi! I'm filling in my measurements on the Begum customizer and could use a hand."
                    />
                  </div>

                  {/* Live silhouette preview — beside the fields, always visible */}
                  <div className="md:sticky md:top-28">
                    <div className="border border-sand-300/55 bg-sand-50/40 p-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700 mb-3">
                        {isUrdu ? "آپ کا خاکہ — لکھتے ہی بدلتا ہے" : "Your outline — it moves as you type"}
                      </p>
                      <SilhouettePreview
                        garmentType={state.garmentType}
                        garment={state.garment}
                        bottom={state.bottom}
                        lehenga={state.lehenga}
                        activeField={activeField}
                      />
                      <p className="mt-3 text-[11px] text-charcoal/50 leading-relaxed">
                        {isUrdu
                          ? "یہ خاکہ تناسب دکھاتا ہے، تصویر نہیں — حتمی فٹ فٹنگ پر طے ہوتا ہے۔"
                          : "A proportion sketch, not a photograph — the final fit is confirmed at your fitting."}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4 — Fabric & Color */}
              <section id="fabric" aria-labelledby="fabric-heading">
                <SectionHeader
                  no="04"
                  title="Fabric & color"
                  sub={
                    isUrdu
                      ? "ہر کپڑا ویسا ہی فوٹوگراف ہوتا ہے جیسا وہ ہے — فلٹر کے بغیر۔"
                      : "Photographed exactly as it is — no filters, no guesswork. Swatches can be posted to you before anything is cut."
                  }
                />
                <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {fabricOptions.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => state.setFabric(f.value)}
                      className={cn(
                        "p-4 text-left border transition-colors",
                        state.fabric === f.value
                          ? "border-emerald-800 bg-emerald-50"
                          : "border-charcoal/12 hover:border-charcoal/30"
                      )}
                    >
                      <div className="w-full h-14 bg-gradient-to-br from-sand-100 to-sand-300 mb-2.5" />
                      <p className="text-xs font-medium text-charcoal">{f.label}</p>
                      <p className="text-[10px] text-charcoal/50 mt-0.5 leading-snug">{f.desc}</p>
                      <p className="text-[10px] text-emerald-800 mt-1.5">+{formatPrice(f.tierPrice, "PKR")}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3.5">
                  {fabricColors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => state.setFabricColor(c.value)}
                      className="flex flex-col items-center gap-1.5"
                      title={c.label}
                    >
                      <span
                        className={cn(
                          "block w-10 h-10 rounded-full border-2 transition-all",
                          state.fabricColor === c.value
                            ? "border-emerald-800 scale-110"
                            : "border-charcoal/10 hover:scale-105"
                        )}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] text-charcoal/55">{c.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-sand-300/50 bg-sand-50/60 px-4 py-3">
                  <p className="text-xs text-charcoal/65">
                    {isUrdu
                      ? "کپڑا ہاتھ میں لے کر دیکھنا چاہتی ہیں؟ ہم ڈاک سے سویچ بھیجتے ہیں۔"
                      : "Want to feel the fabric first? We post physical swatches worldwide."}
                  </p>
                  <Link href="/contact" className="text-xs text-emerald-800 underline underline-offset-2 hover:text-emerald-600">
                    {isUrdu ? "سویچ منگوائیں" : "Request swatches by post"}
                  </Link>
                </div>
              </section>

              {/* 5 — Embroidery & Detail */}
              <section id="embroidery" aria-labelledby="embroidery-heading">
                <SectionHeader
                  no="05"
                  title="Embroidery & detail"
                  sub={
                    isUrdu
                      ? "تکنیک اور گہرائی چنیں — قیمت پر اثر ساتھ ساتھ دِکھتا ہے۔"
                      : "Choose the technique and how dense the work runs — the price impact shows live, beside you, as you decide."
                  }
                />
                <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {embroideryTechniques.map((tech) => (
                    <button
                      key={tech.value}
                      onClick={() => state.setEmbroidery(tech.value)}
                      className={cn(
                        "p-4 text-left border transition-colors",
                        state.embroidery === tech.value
                          ? "border-emerald-800 bg-emerald-50"
                          : "border-charcoal/12 hover:border-charcoal/30"
                      )}
                    >
                      <p className="text-sm font-medium text-charcoal">{tech.label}</p>
                      <p className="text-[11px] text-charcoal/55 mt-1 leading-snug">{tech.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {(Object.keys(densityMultipliers) as Array<keyof typeof densityMultipliers>).map((d) => {
                    const density = densityMultipliers[d];
                    const base = state.garmentType ? baseGarmentPrices[state.garmentType] : baseGarmentPrices.lehenga;
                    const impact = Math.round(base * density.multiplier);
                    return (
                      <button
                        key={d}
                        onClick={() => state.setDensity(d)}
                        className={cn(
                          "p-4 text-center border transition-colors",
                          state.density === d
                            ? "border-emerald-800 bg-emerald-50"
                            : "border-charcoal/12 hover:border-charcoal/30"
                        )}
                      >
                        <p className="text-sm font-medium text-charcoal">{density.label}</p>
                        <p className="text-[11px] text-charcoal/55 mt-1">{density.desc}</p>
                        <p className="text-[11px] text-emerald-800 mt-1.5 font-medium tabular-nums">
                          {impact === 0 ? (isUrdu ? "بنیادی قیمت میں شامل" : "included in base") : `+${formatPrice(impact, "PKR")}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <EscapeHatch language={state.language} context="Hi! I'd like advice choosing embroidery for my custom Begum piece." />
                </div>
              </section>

              {/* 6 — Add-ons */}
              <section id="addons" aria-labelledby="addons-heading">
                <SectionHeader
                  no="06"
                  title="The finishing touches"
                  sub={isUrdu ? "دوپٹہ، پوتلی، کھسہ — سب ہم آہنگ۔" : "Dupatta styling, matching potli and khussa — coordinated to the same fabric and thread."}
                />
                <div className="mt-7 grid sm:grid-cols-2 gap-3">
                  {addonOptions.map((addon) => {
                    const selected = state.addons.includes(addon.value);
                    return (
                      <button
                        key={addon.value}
                        onClick={() => state.toggleAddon(addon.value)}
                        className={cn(
                          "p-4 text-left border transition-colors flex items-start gap-4",
                          selected ? "border-emerald-800 bg-emerald-50" : "border-charcoal/12 hover:border-charcoal/30"
                        )}
                      >
                        <span
                          className={cn(
                            "w-5 h-5 border mt-0.5 flex items-center justify-center shrink-0 text-ivory text-xs transition-colors",
                            selected ? "bg-emerald-800 border-emerald-800" : "border-charcoal/30"
                          )}
                        >
                          {selected && "✓"}
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-charcoal">{addon.label}</span>
                          <span className="block text-xs text-charcoal/55 mt-0.5">{addon.desc}</span>
                          <span className="block text-xs text-emerald-800 mt-1 font-medium">
                            +{formatPrice(addon.price, "PKR")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-charcoal/55">
                  {isUrdu ? "مکمل میچنگ سیٹ دیکھنا چاہیں تو —" : "For fully styled matching sets, see"}{" "}
                  <Link href="/collections/complete-the-look" className="text-emerald-800 underline underline-offset-2">
                    Complete the Look
                  </Link>
                </p>
              </section>

              {/* 7 — Review & staged price */}
              <section id="review" aria-labelledby="review-heading">
                <SectionHeader
                  no="07"
                  title="Review & staged price"
                  sub={
                    isUrdu
                      ? "پوری تفصیل، مرحلہ وار ادائیگی — کوئی حیرت نہیں۔"
                      : "The full itemized breakdown and the 30 / 40 / 30 schedule — you never pay for a stage you haven't approved."
                  }
                />

                <div className="mt-7 border border-sand-300/55 bg-sand-50/50 p-6 md:p-8">
                  {price.lines.length > 0 ? (
                    <>
                      <div className="space-y-2.5">
                        {price.lines.map((line) => (
                          <div key={line.label} className="flex justify-between gap-4 text-sm">
                            <span className="text-charcoal/70">{line.label}</span>
                            <span className="text-charcoal tabular-nums">{formatPrice(line.amount, "PKR")}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-5 border-t border-charcoal/10 flex justify-between items-baseline">
                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal/55">
                          {isUrdu ? "تخمینہ کل" : "Estimated total"}
                        </span>
                        <span className="font-display text-3xl text-emerald-900 tabular-nums">
                          {formatPrice(price.total, "PKR")}
                        </span>
                      </div>
                      <div className="mt-6 grid sm:grid-cols-3 gap-3">
                        {price.stages.map((stage, i) => (
                          <div key={stage.label} className="border border-sand-300/60 bg-ivory p-4">
                            <p className="font-display text-2xl text-emerald-900">{stage.percent}%</p>
                            <p className="text-[11px] text-charcoal/60 mt-1 leading-snug">{stage.label}</p>
                            <p className="text-sm text-charcoal mt-2 tabular-nums">{formatPrice(stage.amount, "PKR")}</p>
                            {i === 0 && (
                              <p className="text-[10px] text-emerald-800 mt-1">
                                {isUrdu ? "صرف یہی آج" : "only this, today"}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <label className="mt-5 flex items-center gap-3 text-xs text-charcoal/70 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={state.rush}
                          onChange={(e) => state.setRush(e.target.checked)}
                          className="accent-emerald-800 w-4 h-4"
                        />
                        {isUrdu
                          ? "جلدی درکار ہے (10 ہفتوں سے کم) — 15% رش فیس"
                          : "I need it in under 10 weeks (adds a 15% rush fee)"}
                      </label>
                    </>
                  ) : (
                    <p className="text-sm text-charcoal/55">
                      {isUrdu
                        ? "اوپر انتخاب مکمل کریں — تفصیل یہاں بنتی جائے گی۔"
                        : "Make your choices above — the breakdown builds here as you go."}
                    </p>
                  )}
                </div>

                {/* Profile save + library */}
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.22em] text-sand-700 mb-4">
                    {isUrdu ? "پیمائشی پروفائل محفوظ کریں" : "Save this fit for next time"}
                  </p>
                  <ProfileLibrary />
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/923209988777?text=${encodeURIComponent("Hi! I've completed my custom design on the Begum customizer and I'd like to confirm my order.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-900 text-ivory px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-emerald-800 transition-colors"
                  >
                    {isUrdu ? "آرڈر کی تصدیق کریں" : "Confirm with our team"}
                  </a>
                  <p className="text-[11px] text-charcoal/55 leading-relaxed self-center max-w-[40ch]">
                    {isUrdu
                      ? "تصدیق سے پہلے ایک حقیقی انسان آپ کی ہر پیمائش دوبارہ دیکھتا ہے۔"
                      : "A real person reviews every measurement with you before anything is confirmed or paid."}
                  </p>
                </div>
              </section>

              {/* 8 — Consultation */}
              <section id="consultation">
                <div className="border border-sand-300/55 bg-emerald-950 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-sand-300/80">
                      {isUrdu ? "کسی بھی مرحلے پر" : "Available at every step"}
                    </p>
                    <p className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight max-w-[22ch]">
                      {isUrdu
                        ? "ڈیزائنر سے آمنے سامنے بات کریں"
                        : "Meet your designer face to face"}
                    </p>
                    <p className="mt-3 text-sm text-sand-100/75 max-w-[48ch] leading-relaxed">
                      {isUrdu
                        ? "تیس منٹ کی ویڈیو کال — خاکے، کپڑے، اور آپ کے سوال۔ مفت، بغیر شرط۔"
                        : "A 30-minute video call — sketches, fabrics, and your questions. Free, and never gatekept behind finishing this page."}
                    </p>
                  </div>
                  <Link
                    href="/customize/consultation"
                    className="shrink-0 inline-flex items-center gap-2 bg-ivory text-emerald-900 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-sand-100 transition-colors"
                  >
                    <Video size={15} />
                    {isUrdu ? "ویڈیو کال بک کریں" : "Book a consultation"}
                  </Link>
                </div>
              </section>
            </div>
          </div>

          {/* Persistent summary rail */}
          <div className="lg:col-span-4">
            <SummaryPanel />
          </div>
        </div>
      </Container>
    </div>
  );
}
