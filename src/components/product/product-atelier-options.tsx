"use client";

import { useState } from "react";
import { Check, Feather } from "lucide-react";
import { cn } from "@/lib/utils";

interface AtelierOptionsProps {
  initialColor?: string;
  initialColorHex?: string;
  initialFabric?: string;
}

const COLORWAYS = [
  { name: "Royal Emerald", hex: "#0B3D2E", description: "Deep Mughal jade silk" },
  { name: "Crimson Ruby", hex: "#8B1E2D", description: "Heirloom bridal scarlet" },
  { name: "Antique Ochre", hex: "#C9975A", description: "Muted metallic gold luster" },
  { name: "Midnight Sapphire", hex: "#122538", description: "Celestial navy velvet" },
  { name: "Ivory Pearl", hex: "#F5F0E6", description: "Sacred pristine katan" },
];

const FABRICS = [
  { name: "Pure Katan Silk (80g)", note: "Traditional bridal drape with royal sheen" },
  { name: "Handwoven Raw Silk", note: "Textured heritage handloom with architectural flare" },
  { name: "Tissue Organza Overlay", note: "Luminous sheer shimmer catching evening chandeliers" },
];

export function ProductAtelierOptions({
  initialColor,
  initialColorHex,
  initialFabric,
}: AtelierOptionsProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor ?? "Royal Emerald");
  const [selectedFabric, setSelectedFabric] = useState(initialFabric ?? "Pure Katan Silk (80g)");

  return (
    <div className="space-y-5 border-t border-b border-sand-300/60 py-5">
      {/* Colorway / Swatch Selector */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-emerald-950 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sand-600 inline-block" />
            Atelier Color Tone: <strong className="font-semibold text-emerald-900">{selectedColor}</strong>
          </span>
          <span className="text-[10px] text-charcoal/50 uppercase tracking-widest">
            Dyed to order
          </span>
        </div>

        <div className="flex items-center gap-3">
          {COLORWAYS.map((c) => {
            const isSelected = selectedColor === c.name || (initialColorHex && c.hex.toLowerCase() === initialColorHex.toLowerCase() && selectedColor === initialColor);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                title={`${c.name} - ${c.description}`}
                className={cn(
                  "group relative w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center p-0.5",
                  isSelected
                    ? "border-emerald-950 ring-2 ring-sand-400 ring-offset-2 scale-110 shadow-md"
                    : "border-sand-300/80 hover:border-sand-500 hover:scale-105",
                )}
                aria-label={`Select color ${c.name}`}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                {isSelected && (
                  <Check
                    size={13}
                    className={c.name === "Ivory Pearl" ? "text-emerald-950 absolute" : "text-ivory absolute"}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric Substrate Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-emerald-950 flex items-center gap-1.5">
            <Feather size={12} className="text-sand-700" />
            Silk Substrate:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {FABRICS.map((f) => {
            const isSelected = selectedFabric === f.name || selectedFabric.includes(f.name.split(" ")[0]);
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => setSelectedFabric(f.name)}
                className={cn(
                  "p-2.5 text-left border transition-all text-xs",
                  isSelected
                    ? "border-emerald-950 bg-emerald-950/5 text-emerald-950 shadow-xs"
                    : "border-sand-300/70 hover:border-sand-400 text-charcoal/70 bg-ivory",
                )}
              >
                <p className="font-medium text-emerald-950">{f.name}</p>
                <p className="text-[10px] text-charcoal/60 mt-0.5 line-clamp-1">{f.note}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Craftsmanship Specs Ribbon */}
      <div className="grid grid-cols-3 gap-2 bg-sand-100/50 border border-sand-300/60 p-2.5 text-center text-xs">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-charcoal/50">Karigari Hours</span>
          <span className="font-display font-medium text-emerald-950 text-sm">380+ Hours</span>
        </div>
        <div className="border-x border-sand-300/60">
          <span className="block text-[10px] uppercase tracking-wider text-charcoal/50">Gold Zari</span>
          <span className="font-display font-medium text-emerald-950 text-sm">Pure Silver Core</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-charcoal/50">Flare Width</span>
          <span className="font-display font-medium text-emerald-950 text-sm">6.5 Meters</span>
        </div>
      </div>
    </div>
  );
}
