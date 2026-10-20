import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function ButaPaisleyTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  // Refined Kashmiri Paisley Motif
  const renderPaisley = (scale: number = 0.75) => (
    <g transform={`scale(${scale})`}>
      <path
        d="M 0 0
           C 20 -15, 42 -8, 42 20
           C 42 50, 16 68, -8 76
           C -38 84, -58 60, -58 25
           C -58 -12, -32 -42, -4 -64
           C 12 -76, 25 -85, 26 -98
           C 28 -106, 20 -110, 12 -106
           C 2 -102, -8 -90, -12 -76"
        fill="url(#goldFoil)"
        fillOpacity="0.2"
        stroke="url(#goldFoil)"
        strokeWidth="1.2"
      />
      <circle cx="-8" cy="25" r="9" fill="url(#goldFoil)" fillOpacity="0.3" stroke="url(#goldFoil)" strokeWidth="0.8" />
      <circle cx="-8" cy="25" r="3" fill="#FFF8E7" />
    </g>
  );

  return (
    <g className="buta-paisley-ornaments pointer-events-none">
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

      {/* ── 4 Kashmiri Buta Corner Motifs ── */}
      <g transform="translate(110, 115)">{renderPaisley(0.7)}</g>
      <g transform="translate(970, 115) scale(-1, 1)">{renderPaisley(0.7)}</g>
      <g transform={`translate(110, ${height - 115}) scale(1, -1)`}>{renderPaisley(0.7)}</g>
      <g transform={`translate(970, ${height - 115}) scale(-1, -1)`}>{renderPaisley(0.7)}</g>

      {/* Top Center Delicate Paisley Plume */}
      <g transform="translate(540, 78)">
        <path
          d="M 0 -18 C 12 -8, 20 6, 0 24 C -20 6, -12 -8, 0 -18 Z"
          fill="url(#goldFoil)"
        />
        <line x1="-140" y1="4" x2="-25" y2="4" stroke="url(#goldFoil)" strokeWidth="1" />
        <line x1="25" y1="4" x2="140" y2="4" stroke="url(#goldFoil)" strokeWidth="1" />
      </g>

      {/* Bottom Center Rosette */}
      <g transform={`translate(540, ${height - 72})`}>
        <circle cx="0" cy="0" r="8" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="2.5" fill="url(#goldFoil)" />
        <line x1="-140" y1="0" x2="-18" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="18" y1="0" x2="140" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.6" />
      </g>
    </g>
  );
}
