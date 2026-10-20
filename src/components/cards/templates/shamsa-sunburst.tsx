import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function ShamsaSunburstTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="shamsa-sunburst-ornaments pointer-events-none">
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

      {/* ── Top Persian Illuminated Shamsa Medallion (Illuminated Manuscript Frontispiece) ── */}
      <g transform="translate(540, 126)">
        {/* 32 Delicate Radiant Sunburst Needles */}
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = i * 11.25;
          const isMajor = i % 2 === 0;
          const rayLen = isMajor ? 62 : 48;
          return (
            <line
              key={angle}
              x1="0"
              y1="0"
              x2="0"
              y2={-rayLen}
              transform={`rotate(${angle})`}
              stroke="url(#goldFoil)"
              strokeWidth={isMajor ? "1.4" : "0.75"}
              strokeOpacity={isMajor ? "0.9" : "0.5"}
            />
          );
        })}

        {/* 16 Persian Teardrop Gold Petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = i * 22.5;
          return (
            <path
              key={`petal-${angle}`}
              d="M 0 -24 C -5 -34 0 -42 0 -42 C 0 -42 5 -34 0 -24 Z"
              transform={`rotate(${angle})`}
              fill="url(#goldFoil)"
            />
          );
        })}

        {/* Concentric Illuminated Gold Rings */}
        <circle r="34" fill={palette.ornamentFill || palette.bg} stroke="url(#goldFoil)" strokeWidth="1.8" />
        <circle r="26" fill="none" stroke="url(#goldFoil)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle r="18" fill="url(#goldFoil)" />
        <circle r="10" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1" />
        <circle r="3.5" fill="url(#goldFoil)" />

        {/* Flanking Gilded Cloudband Wings (Persian Miniature Style) */}
        <path
          d="M -45 0 C -95 -14, -150 10, -220 0 C -180 18, -130 8, -80 15 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.4"
          stroke="url(#goldFoil)"
          strokeWidth="1"
        />
        <path
          d="M 45 0 C 95 -14, 150 10, 220 0 C 180 18, 130 8, 80 15 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.4"
          stroke="url(#goldFoil)"
          strokeWidth="1"
        />
      </g>

      {/* ── Illuminated Dividing Hairlines ── */}
      <g transform="translate(540, 215)">
        <line x1="-320" y1="0" x2="320" y2="0" stroke="url(#goldFoil)" strokeWidth="1.2" strokeOpacity="0.75" />
        <circle cx="-320" cy="0" r="2.5" fill="url(#goldFoil)" />
        <circle cx="320" cy="0" r="2.5" fill="url(#goldFoil)" />
        <circle cx="0" cy="0" r="3.5" fill="url(#goldFoil)" />
      </g>

      {/* Bottom Symmetrical Accent Bar */}
      <g transform={`translate(540, ${height - 72})`}>
        <circle cx="0" cy="0" r="10" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="3" fill="url(#goldFoil)" />
        <line x1="-160" y1="0" x2="-20" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="20" y1="0" x2="160" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.6" />
      </g>
    </g>
  );
}
