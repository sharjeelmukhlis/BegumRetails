import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function LotusMinarTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="lotus-minar-ornaments pointer-events-none">
      {/* ── Gilded Triple-Hairline Frame ── */}
      <rect
        x="36"
        y="36"
        width="1008"
        height={height - 72}
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <rect
        x="44"
        y="44"
        width="992"
        height={height - 88}
        fill="none"
        stroke={stroke}
        strokeWidth="0.6"
        strokeOpacity="0.35"
      />
      <rect
        x="54"
        y="54"
        width="972"
        height={height - 108}
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="1.8"
      />

      {/* ── Top Lotus Blossom Crest ── */}
      <g transform="translate(540, 82)">
        {/* Central Lotus Petal */}
        <path
          d="M 0 -26 C 8 -12, 12 8, 0 24 C -12 8, -8 -12, 0 -26 Z"
          fill="url(#goldFoil)"
        />
        {/* Flanking Left & Right Petals */}
        <path
          d="M -3 6 C -18 -6, -30 4, -20 20 C -10 26, -4 22, -3 6 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.8"
        />
        <path
          d="M 3 6 C 18 -6, 30 4, 20 20 C 10 26, 4 22, 3 6 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.8"
        />
        {/* Calyx Base */}
        <polygon points="-12,24 12,24 0,32" fill="url(#goldFoil)" />

        {/* Flanking Fine Hairlines */}
        <line x1="-160" y1="24" x2="-28" y2="24" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.75" />
        <line x1="28" y1="24" x2="160" y2="24" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.75" />
      </g>

      {/* ── Bottom Mughal Architectural Skyline (Subtle Hairline Silhouettes) ── */}
      <g transform={`translate(0, ${height - 110})`}>
        {/* Plinth Balustrade Line */}
        <line x1="54" y1="40" x2="1026" y2="40" stroke="url(#goldFoil)" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Central Taj / Badshahi Bulbous Onion Dome Silhouette */}
        <g transform="translate(540, 40)">
          <path
            d="M -32 0 C -32 -25, -42 -48, 0 -75 C 42 -48, 32 -25, 32 0 Z"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
          <line x1="0" y1="-75" x2="0" y2="-90" stroke="url(#goldFoil)" strokeWidth="1.2" />
          <circle cx="0" cy="-92" r="2" fill="url(#goldFoil)" />
        </g>

        {/* Flanking Chhatri Minarets */}
        {[
          { x: 180, h: 65 },
          { x: 320, h: 48 },
          { x: 760, h: 48 },
          { x: 900, h: 65 },
        ].map((m, idx) => (
          <g key={idx} transform={`translate(${m.x}, 40)`}>
            <line x1="0" y1="0" x2="0" y2={-m.h} stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.35" />
            <path
              d={`M -6 ${-m.h} C -6 ${-m.h - 10}, 0 ${-m.h - 16}, 0 ${-m.h - 18} C 0 ${-m.h - 16}, 6 ${-m.h - 10}, 6 ${-m.h} Z`}
              fill="none"
              stroke="url(#goldFoil)"
              strokeWidth="0.9"
              strokeOpacity="0.5"
            />
          </g>
        ))}
      </g>
    </g>
  );
}
