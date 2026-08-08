"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import type { MeasurementFieldKey, Language } from "@/lib/customize/schema";
import { measurementGuides, uiStrings, t } from "@/lib/customize/measurement-guides";

/**
 * Per-field guided measuring: an illustrated diagram showing exactly
 * where the measurement is taken, with numbered bilingual steps and
 * the field's most common mistake.
 */
interface MeasurementGuideModalProps {
  fieldKey: MeasurementFieldKey;
  language: Language;
  open: boolean;
  onClose: () => void;
}

const gold = "#C9975A";
const ink = "#062319";

function GuideDiagram({ diagram }: { diagram: string }) {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-auto" aria-hidden>
      {/* Schematic figure */}
      <circle cx={150} cy={42} r={18} fill="none" stroke={`${ink}55`} strokeWidth={1.4} />
      <line x1={150} y1={60} x2={150} y2={88} stroke={`${ink}55`} strokeWidth={1.4} />
      {/* Torso */}
      <path
        d="M 112 92 L 188 92 C 196 130, 190 160, 186 180 C 192 210, 194 230, 190 250 L 110 250 C 106 230, 108 210, 114 180 C 110 160, 104 130, 112 92 Z"
        fill="#FAF6EF"
        stroke={`${ink}77`}
        strokeWidth={1.4}
      />
      {/* Arms */}
      <path d="M 112 92 L 92 120 L 100 200 L 112 198" fill="none" stroke={`${ink}55`} strokeWidth={1.4} />
      <path d="M 188 92 L 208 120 L 200 200 L 188 198" fill="none" stroke={`${ink}55`} strokeWidth={1.4} />
      {/* Legs */}
      <path d="M 118 250 L 122 370 M 182 250 L 178 370" fill="none" stroke={`${ink}55`} strokeWidth={1.4} />
      <line x1={100} y1={378} x2={200} y2={378} stroke={`${ink}33`} strokeWidth={1.2} strokeDasharray="4 4" />

      {/* Highlight per field */}
      {diagram === "neck" && (
        <g>
          <line x1={150} y1={92} x2={150} y2={134} stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={150} cy={92} r={4} fill={gold} />
          <circle cx={150} cy={134} r={4} fill={gold} />
        </g>
      )}
      {diagram === "shoulder" && (
        <g>
          <line x1={112} y1={92} x2={188} y2={92} stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={112} cy={92} r={4} fill={gold} />
          <circle cx={188} cy={92} r={4} fill={gold} />
        </g>
      )}
      {diagram === "sleeve" && (
        <g>
          <path d="M 188 92 L 208 120 L 200 200" fill="none" stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={188} cy={92} r={4} fill={gold} />
          <circle cx={200} cy={200} r={4} fill={gold} />
        </g>
      )}
      {diagram === "armhole" && (
        <ellipse cx={184} cy={112} rx={13} ry={24} fill="none" stroke={gold} strokeWidth={3} transform="rotate(-12 184 112)" />
      )}
      {diagram === "bust" && <ellipse cx={150} cy={138} rx={44} ry={9} fill="none" stroke={gold} strokeWidth={3} />}
      {diagram === "hip" && <ellipse cx={150} cy={216} rx={46} ry={9} fill="none" stroke={gold} strokeWidth={3} />}
      {diagram === "shirt-length" && (
        <g>
          <line x1={118} y1={92} x2={118} y2={250} stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={118} cy={92} r={4} fill={gold} />
          <circle cx={118} cy={250} r={4} fill={gold} />
        </g>
      )}
      {diagram === "waist" && <ellipse cx={150} cy={182} rx={38} ry={8} fill="none" stroke={gold} strokeWidth={3} />}
      {diagram === "thigh" && <ellipse cx={124} cy={272} rx={17} ry={7} fill="none" stroke={gold} strokeWidth={3} />}
      {diagram === "trouser-length" && (
        <g>
          <line x1={104} y1={182} x2={104} y2={370} stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={104} cy={182} r={4} fill={gold} />
          <circle cx={104} cy={370} r={4} fill={gold} />
        </g>
      )}
      {diagram === "hem" && <ellipse cx={122} cy={368} rx={14} ry={6} fill="none" stroke={gold} strokeWidth={3} />}
      {diagram === "lehenga-length" && (
        <g>
          <line x1={196} y1={182} x2={196} y2={376} stroke={gold} strokeWidth={3} strokeLinecap="round" />
          <circle cx={196} cy={182} r={4} fill={gold} />
          <circle cx={196} cy={376} r={4} fill={gold} />
        </g>
      )}
      {diagram === "dupatta" && (
        <path
          d="M 118 96 C 80 160, 90 260, 130 330"
          fill="none"
          stroke={gold}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
      )}
    </svg>
  );
}

export function MeasurementGuideModal({ fieldKey, language, open, onClose }: MeasurementGuideModalProps) {
  const guide = measurementGuides[fieldKey];
  const isUrdu = language === "ur";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label={t(uiStrings.close, language)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${t(uiStrings.guideTitle, language)}: ${t(guide.label, language)}`}
            className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto bg-ivory border border-sand-300/60"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ivory/95 backdrop-blur-sm border-b border-sand-300/50 px-6 py-4">
              <div dir={isUrdu ? "rtl" : "ltr"}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700">
                  {t(uiStrings.guideTitle, language)}
                </p>
                <h3 className="font-display text-xl text-emerald-900 mt-0.5">{t(guide.label, language)}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                aria-label={t(uiStrings.close, language)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-6">
              <div className="bg-sand-50/70 border border-sand-300/40 p-4">
                <GuideDiagram diagram={guide.diagram} />
              </div>

              <div dir={isUrdu ? "rtl" : "ltr"}>
                <ol className="space-y-4">
                  {guide.steps[language].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 inline-flex h-6 w-6 items-center justify-center border border-sand-400/70 bg-sand-50 text-[11px] text-emerald-900">
                        {i + 1}
                      </span>
                      <p className="text-sm text-charcoal/85 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 border-l-2 border-sand-500/70 bg-sand-50/70 p-4" style={isUrdu ? { borderLeft: "none", borderRight: "2px solid rgba(201,151,90,0.7)" } : undefined}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-sand-700">
                    {t(uiStrings.commonMistakeTitle, language)}
                  </p>
                  <p className="mt-2 text-sm text-charcoal/85 leading-relaxed">
                    {t(guide.commonMistake, language)}
                  </p>
                </div>

                <a
                  href="https://wa.me/923209988777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-800 hover:text-emerald-600 transition-colors"
                >
                  <MessageCircle size={15} />
                  {language === "ur"
                    ? "پھر بھی الجھن ہے؟ فٹ ماہر سے بات کریں"
                    : "Still unsure? Talk to a fit expert"}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
