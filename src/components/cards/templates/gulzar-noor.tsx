import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function GulzarNoorTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="gulzar-noor-ornaments pointer-events-none">
      {/* ── Gilded Triple-Hairline Frame ── */}
      <rect
        x="36"
        y="36"
        width="1008"
        height={height - 72}
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="1.2"
        strokeOpacity="0.85"
      />
      <rect
        x="44"
        y="44"
        width="992"
        height={height - 88}
        fill="none"
        stroke={stroke}
        strokeWidth="0.6"
        strokeOpacity="0.4"
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
      <rect
        x="62"
        y="62"
        width="956"
        height={height - 124}
        fill="none"
        stroke={stroke}
        strokeWidth="0.6"
        strokeOpacity="0.35"
      />

      {/* ── 4 Royal Filigree Corner Brackets (Mughal Arabesque Scroll) ── */}
      {[
        { x: 54, y: 54, scaleX: 1, scaleY: 1 },
        { x: 1026, y: 54, scaleX: -1, scaleY: 1 },
        { x: 54, y: height - 54, scaleX: 1, scaleY: -1 },
        { x: 1026, y: height - 54, scaleX: -1, scaleY: -1 },
      ].map((pt, idx) => (
        <g key={idx} transform={`translate(${pt.x}, ${pt.y}) scale(${pt.scaleX}, ${pt.scaleY})`}>
          {/* Corner L-bracket gold accent */}
          <path
            d="M 0 0 L 85 0 C 70 8, 55 18, 45 35 C 38 48, 36 65, 36 85 L 0 85 Z"
            fill="url(#goldFoil)"
            fillOpacity="0.12"
          />
          <path
            d="M 0 45 C 22 45, 45 22, 45 0"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="1.5"
          />
          <path
            d="M 0 75 C 38 75, 75 38, 75 0"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
          <path
            d="M 12 12 C 28 4, 38 18, 30 30 C 22 38, 8 28, 12 12 Z"
            fill="url(#goldFoil)"
            fillOpacity="0.75"
          />
          <circle cx="20" cy="20" r="2.5" fill="#FFF8E7" />
        </g>
      ))}

      {/* ── Top Royal Floral Crest (Iris & Mughal Palmette) ── */}
      <g transform="translate(540, 72)">
        {/* Central Iris Blossom */}
        <path
          d="M 0 -22 C 10 -10, 16 4, 0 24 C -16 4, -10 -10, 0 -22 Z"
          fill="url(#goldFoil)"
        />
        <path
          d="M 0 -6 C 14 -18, 28 -8, 16 12 C 10 20, 0 24, 0 24"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <path
          d="M 0 -6 C -14 -18, -28 -8, -16 12 C -10 20, 0 24, 0 24"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />

        {/* Flanking Gilded Vine Trails */}
        <path
          d="M -22 14 C -60 14, -100 2, -150 16 C -190 28, -240 12, -300 20"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <path
          d="M 22 14 C 60 14, 100 2, 150 16 C 190 28, 240 12, 300 20"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />

        {/* Delicate Tendril Leaves */}
        {[-80, -140, -210, -280, 80, 140, 210, 280].map((x) => (
          <g key={x} transform={`translate(${x}, 16)`}>
            <circle cx="0" cy="0" r="2.5" fill="url(#goldFoil)" />
            <path
              d="M 0 0 C 4 -8, 12 -4, 0 0"
              fill="url(#goldFoil)"
            />
          </g>
        ))}
      </g>

      {/* ── Bottom Mirrored Symmetrical Arabesque Crest ── */}
      <g transform={`translate(540, ${height - 72}) scale(1, -1)`}>
        <path
          d="M 0 -18 C 8 -8, 14 4, 0 20 C -14 4, -8 -8, 0 -18 Z"
          fill="url(#goldFoil)"
        />
        <path
          d="M -18 12 C -50 12, -90 2, -140 14 C -180 24, -220 10, -270 18"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <path
          d="M 18 12 C 50 12, 90 2, 140 14 C 180 24, 220 10, 270 18"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
      </g>
    </g>
  );
}
