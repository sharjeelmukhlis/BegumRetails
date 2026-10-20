"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface Stage {
  id: string;
  roman: string;
  title: { en: string; ur: string };
}

export const ATELIER_STAGES: Stage[] = [
  { id: "base", roman: "I", title: { en: "Silhouette", ur: "بنیادی انداز" } },
  { id: "measurements", roman: "II", title: { en: "Proportions", ur: "پیمائش" } },
  { id: "fabric", roman: "III", title: { en: "Silk & Palette", ur: "کپڑا و رنگ" } },
  { id: "embroidery", roman: "IV", title: { en: "Karigari", ur: "کڑھائی" } },
  { id: "addons", roman: "V", title: { en: "Finishing", ur: "تکمیل" } },
  { id: "review", roman: "VI", title: { en: "Ledger", ur: "حساب" } },
];

interface StageNavigatorProps {
  language: "en" | "ur";
}

export function StageNavigator({ language }: StageNavigatorProps) {
  const [activeStage, setActiveStage] = useState<string>("base");
  const isUrdu = language === "ur";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (let i = ATELIER_STAGES.length - 1; i >= 0; i--) {
        const stage = ATELIER_STAGES[i];
        const el = document.getElementById(stage.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveStage(stage.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -140;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const activeIndex = ATELIER_STAGES.findIndex((s) => s.id === activeStage);
  const progressPercent = Math.round(((activeIndex + 1) / ATELIER_STAGES.length) * 100);

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-y border-sand-300/40 py-2 px-3 md:px-8 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        {/* Horizontal Touch-Scrollable Stages Bar (Mobile & Desktop) */}
        <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth flex-1 -mx-1 px-1">
          {ATELIER_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeStage;
            const isCompleted = idx < activeIndex;

            return (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.id)}
                className={cn(
                  "group shrink-0 flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 text-xs transition-all rounded-xs select-none active:scale-95",
                  isActive
                    ? "bg-emerald-950 text-sand-200 shadow-xs font-semibold ring-1 ring-sand-400/30"
                    : isCompleted
                      ? "bg-sand-200/40 text-charcoal hover:text-emerald-950 font-normal"
                      : "text-charcoal/60 hover:text-charcoal font-normal"
                )}
              >
                <span
                  className={cn(
                    "font-serif text-[10px] md:text-[11px]",
                    isActive ? "text-sand-300 font-bold" : "text-sand-700"
                  )}
                >
                  {stage.roman}.
                </span>
                <span className="uppercase text-[9px] md:text-[10px] tracking-[0.14em] md:tracking-[0.16em] whitespace-nowrap">
                  {isUrdu ? stage.title.ur : stage.title.en}
                </span>
                {isCompleted && (
                  <span className="text-[8px] md:text-[9px] text-emerald-800 font-bold ml-0.5">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Completion Progress Indicator */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0 pl-1 border-l border-sand-300/40">
          <div className="w-12 md:w-16 h-1 bg-sand-300/40 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-emerald-900 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-charcoal/60 font-mono font-medium">
            {progressPercent}%
          </span>
        </div>
      </div>
    </div>
  );
}
