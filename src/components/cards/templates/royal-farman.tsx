import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function RoyalFarmanTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="royal-farman-ornaments pointer-events-none">
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

      {/* ── Top Royal Tughra Crest Header ── */}
      <g transform="translate(540, 84)">
        {/* Imperial Lobed Medallion Headpiece */}
        <path
          d="M 0 -36
             C 35 -36, 60 -22, 85 -10
             C 110 2, 140 8, 170 8
             C 150 20, 120 30, 90 32
             C 60 34, 30 36, 0 38
             C -30 36, -60 34, -90 32
             C -120 30, -150 20, -170 8
             C -140 8, -110 2, -85 -10
             C -60 -22, -35 -36, 0 -36 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.2"
          stroke="url(#goldFoil)"
          strokeWidth="1.6"
        />

        {/* Central Sun Disc */}
        <circle cx="0" cy="2" r="14" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.2" />
        <circle cx="0" cy="2" r="4.5" fill="url(#goldFoil)" />

        {/* Crown Spire */}
        <path d="M 0 -36 L 3 -48 L 0 -54 L -3 -48 Z" fill="url(#goldFoil)" />
        <circle cx="0" cy="-56" r="2" fill="url(#goldFoil)" />
      </g>

      {/* ── Ruled Farman Margins (Imperial Manuscript Guidelines) ── */}
      <line x1="84" y1="170" x2="84" y2={height - 130} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="6 3" />
      <line x1="996" y1="170" x2="996" y2={height - 130} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="6 3" />

      {/* ── Imperial Seal Ring at Bottom ── */}
      <g transform={`translate(540, ${height - 76})`}>
        <circle r="14" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.4" />
        <circle r="10" fill="none" stroke="url(#goldFoil)" strokeWidth="0.6" strokeDasharray="2 2" />
        <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#goldFoil)" />
        <line x1="-150" y1="0" x2="-22" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="22" y1="0" x2="150" y2="0" stroke="url(#goldFoil)" strokeWidth="1" strokeOpacity="0.5" />
      </g>
    </g>
  );
}
