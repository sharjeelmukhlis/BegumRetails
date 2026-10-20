import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function KashiTileTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="kashi-tile-ornaments pointer-events-none">
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

      {/* ── Top Girih Geometric Strapwork Pediment ── */}
      <g transform="translate(540, 78)">
        {/* Central 8-pointed Girih Star */}
        <polygon
          points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
          fill="url(#goldFoil)"
        />
        <circle cx="0" cy="0" r="3" fill={palette.bg} />
        {/* Flanking geometric strapwork lines */}
        <path
          d="M -30 0 L -60 12 L -90 0 L -120 12 L -160 0 L -220 0 L -260 12 L -320 0"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <path
          d="M 30 0 L 60 12 L 90 0 L 120 12 L 160 0 L 220 0 L 260 12 L 320 0"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
      </g>

      {/* ── Bottom Mirrored Girih Pediment ── */}
      <g transform={`translate(540, ${height - 78}) scale(1, -1)`}>
        <polygon
          points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
          fill="url(#goldFoil)"
        />
        <circle cx="0" cy="0" r="3" fill={palette.bg} />
        <path
          d="M -30 0 L -60 12 L -90 0 L -120 12 L -160 0 L -220 0 L -260 12 L -320 0"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <path
          d="M 30 0 L 60 12 L 90 0 L 120 12 L 160 0 L 220 0 L 260 12 L 320 0"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
      </g>
    </g>
  );
}
