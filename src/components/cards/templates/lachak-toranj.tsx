import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function LachakToranjTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="lachak-toranj-ornaments pointer-events-none">
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

      {/* ── 4 Persian Carpet Corner Arabesques (Lachak) ── */}
      {/* Top Left */}
      <g transform="translate(54, 54)">
        <path
          d="M 0 0
             L 130 0
             C 115 32, 90 58, 58 90
             C 32 115, 0 130, 0 130 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.12"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <path
          d="M 0 0 L 95 0 C 70 30, 30 70, 0 95 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
        <circle cx="38" cy="38" r="5" fill="url(#goldFoil)" />
      </g>

      {/* Top Right */}
      <g transform="translate(1026, 54) scale(-1, 1)">
        <path
          d="M 0 0
             L 130 0
             C 115 32, 90 58, 58 90
             C 32 115, 0 130, 0 130 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.12"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <circle cx="38" cy="38" r="5" fill="url(#goldFoil)" />
      </g>

      {/* Bottom Left */}
      <g transform={`translate(54, ${height - 54}) scale(1, -1)`}>
        <path
          d="M 0 0
             L 130 0
             C 115 32, 90 58, 58 90
             C 32 115, 0 130, 0 130 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.12"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <circle cx="38" cy="38" r="5" fill="url(#goldFoil)" />
      </g>

      {/* Bottom Right */}
      <g transform={`translate(1026, ${height - 54}) scale(-1, -1)`}>
        <path
          d="M 0 0
             L 130 0
             C 115 32, 90 58, 58 90
             C 32 115, 0 130, 0 130 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.12"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <circle cx="38" cy="38" r="5" fill="url(#goldFoil)" />
      </g>

      {/* ── Central Toranj Ogival Medallion Frame (Delicate Hairline) ── */}
      <g transform={`translate(540, ${isSquare ? 520 : 640})`}>
        <path
          d={`M 0 ${isSquare ? -260 : -320}
             C 210 ${isSquare ? -240 : -300}, 370 ${isSquare ? -140 : -160}, 370 0
             C 370 ${isSquare ? 140 : 160}, 210 ${isSquare ? 240 : 300}, 0 ${isSquare ? 260 : 320}
             C -210 ${isSquare ? 240 : 300}, -370 ${isSquare ? 140 : 160}, -370 0
             C -370 ${isSquare ? -140 : -160}, -210 ${isSquare ? -240 : -300}, 0 ${isSquare ? -260 : -320} Z`}
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        {/* Top Finial Pendant */}
        <g transform={`translate(0, ${isSquare ? -260 : -320})`}>
          <path d="M 0 -18 L 4 -8 L 0 0 L -4 -8 Z" fill="url(#goldFoil)" />
          <circle cx="0" cy="-22" r="2.5" fill="url(#goldFoil)" />
        </g>
        {/* Bottom Finial Pendant */}
        <g transform={`translate(0, ${isSquare ? 260 : 320})`}>
          <path d="M 0 18 L 4 8 L 0 0 L -4 8 Z" fill="url(#goldFoil)" />
          <circle cx="0" cy="22" r="2.5" fill="url(#goldFoil)" />
        </g>
      </g>
    </g>
  );
}
