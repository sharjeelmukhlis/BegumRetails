"use client";

import React, { useState, useReducer, useRef } from "react";
import {
  CardAspect,
  CardOccasion,
  ConcreteOccasion,
  CardState,
} from "@/lib/cards/types";
import { CARD_TEMPLATES, getTemplateById } from "@/lib/cards/templates-config";
import { CARD_FONTS, isUrduScript } from "@/lib/cards/fonts";
import { POETRY_LIBRARY, getCoupletsByOccasion } from "@/lib/data/poetry";
import { SUGGESTED_MESSAGES } from "@/lib/data/card-messages";
import { CardFrame } from "./card-frame";
import { downloadCardPng, shareCard } from "@/lib/cards/export-card";
import {
  Sparkles,
  Download,
  Share2,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
  Wand2,
  Type,
  Palette,
  Shuffle,
  Info,
  Calendar,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";

type Action =
  | { type: "SET_TEMPLATE"; payload: string }
  | { type: "SET_PALETTE"; payload: string }
  | { type: "SET_FONT"; payload: string }
  | { type: "SET_ASPECT"; payload: CardAspect }
  | { type: "SET_OCCASION"; payload: ConcreteOccasion }
  | { type: "SET_RECIPIENT"; payload: string }
  | { type: "SET_SENDER"; payload: string }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "TOGGLE_POETRY"; payload?: boolean }
  | { type: "SET_COUPLET_ID"; payload: string | null }
  | { type: "SET_CUSTOM_URDU"; payload: [string, string] }
  | { type: "RESET" };

const initialState: CardState = {
  templateId: "shah-jahani-mehrab",
  paletteId: "sjm-burgundy",
  fontId: "cormorant",
  aspect: "portrait",
  occasion: "love",
  recipientName: "",
  senderName: "",
  message: "Every day with you feels like a garden in full bloom. Loving you is my life's most precious gift.",
  date: "17 October 2026",
  poetryEnabled: false, // Default to OFF so user is never forced to include poetry
  coupletId: "ur-love-1",
  customUrduCouplet: ["", ""],
};

function cardReducer(state: CardState, action: Action): CardState {
  switch (action.type) {
    case "SET_TEMPLATE": {
      const template = getTemplateById(action.payload);
      return {
        ...state,
        templateId: action.payload,
        paletteId: template.defaultPaletteId,
      };
    }
    case "SET_PALETTE":
      return { ...state, paletteId: action.payload };
    case "SET_FONT":
      return { ...state, fontId: action.payload };
    case "SET_ASPECT":
      return { ...state, aspect: action.payload };
    case "SET_OCCASION": {
      const occ = action.payload;
      const filteredCouplets = getCoupletsByOccasion(occ);
      const defaultCouplet = filteredCouplets[0]?.id || null;
      return {
        ...state,
        occasion: occ,
        coupletId: defaultCouplet,
      };
    }
    case "SET_RECIPIENT":
      return { ...state, recipientName: action.payload };
    case "SET_SENDER":
      return { ...state, senderName: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload.slice(0, 220) };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "TOGGLE_POETRY":
      return {
        ...state,
        poetryEnabled: action.payload !== undefined ? action.payload : !state.poetryEnabled,
      };
    case "SET_COUPLET_ID":
      return {
        ...state,
        coupletId: action.payload,
        poetryEnabled: Boolean(action.payload),
      };
    case "SET_CUSTOM_URDU":
      return {
        ...state,
        customUrduCouplet: action.payload,
        poetryEnabled: true,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function CardGenerator() {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const [activeTabOccasion, setActiveTabOccasion] = useState<CardOccasion>("all");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [showSuggestModal, setShowSuggestModal] = useState<boolean>(false);
  const [suggestCategory, setSuggestCategory] = useState<"All" | "English" | "Urdu">("All");

  const previewSvgRef = useRef<SVGSVGElement>(null);

  // Active Template and Palette
  const currentTemplate = getTemplateById(state.templateId);
  const currentPalette =
    currentTemplate.palettes.find((p) => p.id === state.paletteId) || currentTemplate.palettes[0];

  // Templates filtered by occasion tab
  const filteredTemplates = CARD_TEMPLATES.filter((t) => {
    if (activeTabOccasion === "all") return true;
    return t.occasions.includes(activeTabOccasion);
  });

  // Filtered Couplets for the current occasion (pure Urdu only)
  const availableCouplets = POETRY_LIBRARY.filter((c) => c.occasion === state.occasion);

  // Shuffle Couplets
  const handleShuffleCouplet = () => {
    if (availableCouplets.length > 1) {
      const remaining = availableCouplets.filter((c) => c.id !== state.coupletId);
      const randomCouplet = remaining[Math.floor(Math.random() * remaining.length)];
      if (randomCouplet) {
        dispatch({ type: "SET_COUPLET_ID", payload: randomCouplet.id });
      }
    }
  };

  // Download Handler
  const handleDownload = async () => {
    if (!previewSvgRef.current) return;
    setIsExporting(true);
    try {
      await downloadCardPng({
        svgElement: previewSvgRef.current,
        filename: `Begum-Card-${state.recipientName.replace(/\s+/g, "_") || "Royal"}.png`,
        isSquare: state.aspect === "square",
      });
      setShareToast("Card downloaded successfully in 2x print quality.");
      setTimeout(() => setShareToast(null), 4000);
    } catch (err) {
      console.error(err);
      setShareToast("Export failed. Please try again.");
      setTimeout(() => setShareToast(null), 3500);
    } finally {
      setIsExporting(false);
    }
  };

  // Share Handler
  const handleShare = async () => {
    if (!previewSvgRef.current) return;
    setIsExporting(true);
    try {
      const res = await shareCard({
        svgElement: previewSvgRef.current,
        recipientName: state.recipientName,
        senderName: state.senderName,
        isSquare: state.aspect === "square",
      });

      if (res.method === "share-api") {
        setShareToast("Card shared successfully!");
      } else if (res.method === "clipboard") {
        setShareToast("Card image copied to clipboard! Ready to paste.");
      } else {
        setShareToast("Opening WhatsApp with your greeting...");
      }
      setTimeout(() => setShareToast(null), 4500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const isFormValid = state.recipientName.trim().length > 0 && state.senderName.trim().length > 0;

  return (
    <div id="card-studio" className="relative py-12 md:py-16">
      <Container>
        {/* Step Indicator Navigation */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-sand-300/60 pb-4">
            {[
              { num: 1, label: "Choose Art Template" },
              { num: 2, label: "Personal Message" },
              { num: 3, label: "Urdu Poetry (Optional)" },
              { num: 4, label: "Final Preview & Export" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase transition-colors ${
                  currentStep === s.num
                    ? "font-semibold text-emerald-900 border-b-2 border-emerald-900 pb-4 -mb-4.5"
                    : currentStep > s.num
                    ? "text-emerald-800/70 hover:text-emerald-950"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono ${
                    currentStep === s.num
                      ? "bg-emerald-900 text-ivory"
                      : currentStep > s.num
                      ? "bg-emerald-800/15 text-emerald-900"
                      : "bg-sand-200 text-charcoal/50"
                  }`}
                >
                  {currentStep > s.num ? <Check size={12} /> : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Layout: 2-Column Desktop, Sticky Preview Mobile */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Controls & Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            {/* ── STEP 1: CHOOSE TEMPLATE & OCCASION ── */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sand-200">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-emerald-950 font-normal">
                      Select Mughal & Persian Ornament
                    </h2>
                    <p className="text-sm text-charcoal/65 mt-1 font-sans">
                      Handcrafted gilded gold borders, authentic pietra-dura arches, and regal illumination.
                    </p>
                  </div>

                  {/* Occasion Filter Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                    {(
                      [
                        { id: "all", label: "All" },
                        { id: "love", label: "Love" },
                        { id: "marriage", label: "Marriage" },
                        { id: "anniversary", label: "Anniversary" },
                        { id: "friendship", label: "Friendship" },
                        { id: "thank-you", label: "Thank You" },
                      ] as const
                    ).map((occ) => (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => {
                          setActiveTabOccasion(occ.id);
                          if (occ.id !== "all") {
                            dispatch({ type: "SET_OCCASION", payload: occ.id });
                          }
                        }}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                          activeTabOccasion === occ.id
                            ? "bg-emerald-900 text-ivory font-medium shadow-sm"
                            : "bg-sand-100 text-charcoal/70 hover:bg-sand-200"
                        }`}
                      >
                        {occ.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 10 Template Thumbnails Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => {
                    const isSelected = state.templateId === template.id;
                    const defaultPal = template.palettes[0];
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => dispatch({ type: "SET_TEMPLATE", payload: template.id })}
                        className={`group relative flex flex-col p-2.5 rounded-sm border transition-all text-left bg-white ${
                          isSelected
                            ? "border-emerald-800 ring-2 ring-emerald-800/30 shadow-md"
                            : "border-sand-300 hover:border-emerald-700/60 hover:shadow-sm"
                        }`}
                      >
                        {/* Live mini preview */}
                        <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-sand-100 flex items-center justify-center border border-sand-200/80">
                          <CardFrame
                            template={template}
                            palette={defaultPal}
                            fontId={state.fontId}
                            aspect="portrait"
                            occasion={state.occasion}
                            recipientName={state.recipientName || "Begum"}
                            senderName=""
                            message=""
                            poetryEnabled={false}
                            coupletId={null}
                            className="w-full h-full pointer-events-none"
                          />
                          {isSelected && (
                            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900 text-ivory shadow">
                              <Check size={12} />
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5">
                          <p className="font-serif text-sm font-medium text-emerald-950 group-hover:text-emerald-800 transition-colors">
                            {template.name}
                          </p>
                          <p className="text-[11px] text-charcoal/55 truncate font-sans">
                            {template.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-emerald-800 transition-colors rounded-sm shadow-sm"
                  >
                    Next: Personal Message <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: PERSONAL DETAILS & TYPOGRAPHY ── */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="pb-2 border-b border-sand-200">
                  <h2 className="font-serif text-2xl md:text-3xl text-emerald-950 font-normal">
                    Craft Your Message & Aesthetics
                  </h2>
                  <p className="text-sm text-charcoal/65 mt-1 font-sans">
                    Enter names, write your card message, and choose your royal palette.
                  </p>
                </div>

                {/* Recipient & Sender Input Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5">
                      Recipient Name <span className="text-rose-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={state.recipientName}
                      onChange={(e) => dispatch({ type: "SET_RECIPIENT", payload: e.target.value })}
                      placeholder="e.g. Ayesha Khan or عائشہ خان"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 text-charcoal"
                    />
                    {isUrduScript(state.recipientName) && (
                      <p className="text-[11px] text-emerald-800 mt-1 flex items-center gap-1 font-mono">
                        <Sparkles size={11} /> Urdu detected — auto-switched to Nastaliq RTL
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5">
                      Sender Name <span className="text-rose-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={state.senderName}
                      onChange={(e) => dispatch({ type: "SET_SENDER", payload: e.target.value })}
                      placeholder="e.g. Farhan or فرحان"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 text-charcoal"
                    />
                  </div>
                </div>

                {/* Personal Message with Counter and "Suggest a Message" */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium">
                      Personal Message
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowSuggestModal(true)}
                        className="inline-flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-medium transition-colors"
                      >
                        <Wand2 size={12} /> Suggest a message
                      </button>
                      <span
                        aria-live="polite"
                        className={`text-xs font-mono ${
                          state.message.length >= 210 ? "text-amber-700 font-semibold" : "text-charcoal/50"
                        }`}
                      >
                        {state.message.length}/220
                      </span>
                    </div>
                  </div>
                  <textarea
                    rows={4}
                    value={state.message}
                    onChange={(e) => dispatch({ type: "SET_MESSAGE", payload: e.target.value })}
                    placeholder="Write a heartfelt line..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 text-charcoal resize-none"
                  />
                </div>

                {/* Optional Date & Occasion Confirmation */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5">
                      Occasion
                    </label>
                    <select
                      value={state.occasion}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_OCCASION",
                          payload: e.target.value as ConcreteOccasion,
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 text-charcoal"
                    >
                      <option value="love">Love</option>
                      <option value="marriage">Marriage</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="friendship">Friendship</option>
                      <option value="thank-you">Thank You</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5">
                      Date (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={state.date}
                        onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })}
                        placeholder="e.g. 17 October 2026 or 18 Rajab 1448"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 text-charcoal"
                      />
                      <Calendar size={14} className="absolute right-3 top-3 text-charcoal/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Typeface Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-2 flex items-center gap-1.5">
                    <Type size={14} /> Typeface Calligraphy (5 Court Fonts)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {CARD_FONTS.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => dispatch({ type: "SET_FONT", payload: font.id })}
                        className={`p-2.5 rounded-sm border text-left transition-all ${
                          state.fontId === font.id
                            ? "border-emerald-800 bg-emerald-800/5 ring-1 ring-emerald-800"
                            : "border-sand-300 bg-white hover:border-sand-400"
                        }`}
                      >
                        <p className="text-xs font-semibold text-emerald-950 truncate">{font.name}</p>
                        <p
                          className="text-xs text-charcoal/60 mt-1 truncate"
                          style={{ fontFamily: font.family }}
                        >
                          {font.sample}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Palette Picker (3 Curated Palettes for the Active Template) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-2 flex items-center gap-1.5">
                    <Palette size={14} /> Accent Palette ({currentTemplate.name})
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentTemplate.palettes.map((palette) => (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => dispatch({ type: "SET_PALETTE", payload: palette.id })}
                        className={`flex items-center gap-3 p-3 rounded-sm border text-left transition-all ${
                          state.paletteId === palette.id
                            ? "border-emerald-800 bg-sand-100 ring-1 ring-emerald-800"
                            : "border-sand-300 bg-white hover:border-sand-400"
                        }`}
                      >
                        <div
                          className="h-7 w-7 rounded-full border border-sand-400/60 shadow-inner shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${palette.bg} 50%, ${palette.border} 50%)`,
                          }}
                        />
                        <div className="truncate">
                          <p className="text-xs font-medium text-emerald-950 truncate">{palette.name}</p>
                          <p className="text-[10px] text-charcoal/50 uppercase tracking-widest">
                            {palette.isDark ? "Velvet Dark" : "Linen Light"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal font-medium"
                  >
                    <ChevronLeft size={14} /> Back to Templates
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-emerald-800 transition-colors rounded-sm shadow-sm"
                  >
                    Next: Urdu Poetry (Optional) <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: URDU POETRY ZONE (OPTIONAL) ── */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sand-200">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-emerald-950 font-normal">
                      Royal Urdu Poetry (شاعری)
                    </h2>
                    <p className="text-sm text-charcoal/65 mt-1 font-sans">
                      Optional: Select an authentic Urdu couplet in Nastaliq calligraphy, or skip to keep your personal message centered.
                    </p>
                  </div>

                  {/* Poetry On / Off Toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-charcoal/70 font-medium">
                      Include Poetry:
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={state.poetryEnabled}
                      onClick={() => dispatch({ type: "TOGGLE_POETRY" })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        state.poetryEnabled ? "bg-emerald-900" : "bg-sand-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          state.poetryEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Option 1: "No Poetry / بغیر شاعری" Button Card */}
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_POETRY", payload: false })}
                    className={`w-full p-4 rounded-sm border text-left transition-all flex items-center justify-between ${
                      !state.poetryEnabled
                        ? "border-emerald-800 bg-sand-100/80 ring-1 ring-emerald-800 shadow-sm"
                        : "border-sand-300 bg-white hover:border-sand-400"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-emerald-950">
                        No Poetry (بغیر شاعری) — Keep Card Focused on Personal Message
                      </p>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Your personal message will be elegantly enlarged and centered in the royal frame.
                      </p>
                    </div>
                    {!state.poetryEnabled && (
                      <span className="text-emerald-900 font-semibold text-xs flex items-center gap-1 shrink-0">
                        <Check size={14} /> Selected
                      </span>
                    )}
                  </button>

                  {/* Shuffle Button if poetry enabled */}
                  {state.poetryEnabled && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs uppercase tracking-wider text-charcoal/60 font-mono">
                        Select a Nastaliq Couplet
                      </span>
                      <button
                        type="button"
                        onClick={handleShuffleCouplet}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-sand-100 border border-sand-300 hover:border-sand-400 text-emerald-950 rounded-sm transition-colors"
                      >
                        <Shuffle size={12} /> Shuffle Couplets
                      </button>
                    </div>
                  )}

                  {/* Pure Urdu Couplets Grid */}
                  {state.poetryEnabled && (
                    <div className="grid gap-3 pt-1">
                      {availableCouplets.map((couplet) => {
                        const isSelected = state.coupletId === couplet.id;
                        return (
                          <button
                            key={couplet.id}
                            type="button"
                            onClick={() => dispatch({ type: "SET_COUPLET_ID", payload: couplet.id })}
                            className={`p-4 rounded-sm border text-right transition-all ${
                              isSelected
                                ? "border-emerald-800 bg-sand-50 ring-1 ring-emerald-800 shadow-sm"
                                : "border-sand-300 bg-white hover:border-sand-400"
                            }`}
                          >
                            <div className="flex items-center justify-between pb-1 border-b border-sand-200/60 mb-2">
                              {isSelected ? (
                                <span className="text-emerald-900 font-semibold text-xs flex items-center gap-1">
                                  <Check size={13} /> Selected
                                </span>
                              ) : (
                                <span />
                              )}
                              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 bg-emerald-800/10 px-2 py-0.5 rounded-sm">
                                اردو شاعری
                              </span>
                            </div>

                            <p
                              dir="rtl"
                              className="text-base md:text-lg text-emerald-950 font-medium leading-[2.4]"
                              style={{ fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif" }}
                            >
                              {couplet.lines[0]}
                              <br />
                              {couplet.lines[1]}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal font-medium"
                  >
                    <ChevronLeft size={14} /> Back to Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-emerald-800 transition-colors rounded-sm shadow-sm"
                  >
                    Next: Final Export <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: PREVIEW & ACTIONS ── */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="pb-2 border-b border-sand-200">
                  <h2 className="font-serif text-2xl md:text-3xl text-emerald-950 font-normal">
                    Royal Export & Sharing
                  </h2>
                  <p className="text-sm text-charcoal/65 mt-1 font-sans">
                    Download in ultra-sharp 2x print resolution or share directly.
                  </p>
                </div>

                {/* Aspect Ratio Toggle (Portrait vs Square) */}
                <div className="flex items-center gap-3 p-4 bg-sand-100 rounded-sm border border-sand-200">
                  <span className="text-xs uppercase tracking-wider text-charcoal/70 font-medium">
                    Card Dimensions:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "SET_ASPECT", payload: "portrait" })}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all ${
                        state.aspect === "portrait"
                          ? "bg-emerald-900 text-ivory font-medium shadow-sm"
                          : "bg-white text-charcoal/70 border border-sand-300"
                      }`}
                    >
                      Portrait (1080 × 1350)
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "SET_ASPECT", payload: "square" })}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all ${
                        state.aspect === "square"
                          ? "bg-emerald-900 text-ivory font-medium shadow-sm"
                          : "bg-white text-charcoal/70 border border-sand-300"
                      }`}
                    >
                      Square (1080 × 1080)
                    </button>
                  </div>
                </div>

                {/* Validation Banner if missing recipient or sender */}
                {!isFormValid && (
                  <div className="flex items-center gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-sm text-amber-900 text-xs">
                    <Info size={16} className="shrink-0 text-amber-700" />
                    <span>
                      Please enter both <strong>Recipient Name</strong> and <strong>Sender Name</strong> in Step 2 to enable download.
                    </span>
                  </div>
                )}

                {/* Actions: Download, Share, Reset */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    disabled={!isFormValid || isExporting}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-ivory px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-sm shadow-md"
                  >
                    <Download size={16} />
                    {isExporting ? "Rendering 2x PNG..." : "Download PNG (2x)"}
                  </button>

                  <button
                    type="button"
                    disabled={!isFormValid || isExporting}
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 bg-sand-200 hover:bg-sand-300 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-950 border border-sand-400/80 px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-sm"
                  >
                    <Share2 size={16} />
                    Share Card (WhatsApp / File)
                  </button>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-sand-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal font-medium"
                  >
                    <ChevronLeft size={14} /> Back to Poetry
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch({ type: "RESET" })}
                    className="inline-flex items-center gap-1 text-xs text-charcoal/40 hover:text-rose-700 transition-colors uppercase tracking-wider"
                  >
                    <RotateCcw size={12} /> Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Live Interactive Card Canvas Preview (5 Cols, Sticky) */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="rounded-sm border border-sand-300 bg-white p-3 md:p-4 shadow-xl shadow-charcoal/5">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-sand-200">
                <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-950 font-medium flex items-center gap-1.5">
                  <Sparkles size={13} className="text-sand-600" /> Live Vector Preview
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/50">
                  {state.aspect === "square" ? "1080 × 1080" : "1080 × 1350"}
                </span>
              </div>

              {/* The Rendered SVG Card Frame */}
              <div className="relative w-full rounded-sm overflow-hidden shadow-inner border border-sand-200">
                <CardFrame
                  svgRef={previewSvgRef}
                  template={currentTemplate}
                  palette={currentPalette}
                  fontId={state.fontId}
                  aspect={state.aspect}
                  occasion={state.occasion}
                  recipientName={state.recipientName}
                  senderName={state.senderName}
                  message={state.message}
                  date={state.date}
                  poetryEnabled={state.poetryEnabled}
                  coupletId={state.coupletId}
                  customUrduCouplet={state.customUrduCouplet}
                  className="w-full"
                />
              </div>

              {/* Toast Feedback */}
              {shareToast && (
                <div className="mt-3 p-3 bg-emerald-900 text-ivory text-xs rounded-sm text-center animate-fadeIn shadow-md">
                  {shareToast}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* ── MODAL: SUGGEST A MESSAGE POPUP ── */}
      {showSuggestModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-xl max-h-[85vh] bg-ivory rounded-sm shadow-2xl border border-sand-300 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-sand-200 bg-sand-100/60">
              <h3 className="font-serif text-lg text-emerald-950 font-normal">
                Curated Court Messages for {state.occasion.toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setShowSuggestModal(false)}
                className="text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal px-2 py-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Filter by Category: All / English / Urdu (No Roman) */}
            <div className="flex items-center gap-1.5 px-6 py-3 border-b border-sand-200 bg-white">
              {(["All", "English", "Urdu"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSuggestCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-sm transition-colors ${
                    suggestCategory === cat
                      ? "bg-emerald-900 text-ivory font-medium"
                      : "bg-sand-100 text-charcoal/70 hover:bg-sand-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {SUGGESTED_MESSAGES.filter((m) => {
                if (m.occasion !== state.occasion) return false;
                if (suggestCategory === "All") return true;
                return m.category === suggestCategory;
              }).map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => {
                    dispatch({ type: "SET_MESSAGE", payload: msg.text });
                    setShowSuggestModal(false);
                  }}
                  className="w-full text-left p-3.5 bg-white border border-sand-300 hover:border-emerald-800 rounded-sm transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-800 bg-emerald-800/10 px-2 py-0.5 rounded-sm">
                      {msg.category}
                    </span>
                    <span className="text-xs text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Select line →
                    </span>
                  </div>
                  <p
                    className={`text-sm text-charcoal leading-relaxed ${
                      msg.category === "Urdu" ? "text-right font-serif leading-loose" : ""
                    }`}
                  >
                    “{msg.text}”
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
