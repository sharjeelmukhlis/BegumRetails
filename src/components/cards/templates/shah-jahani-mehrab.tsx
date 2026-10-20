import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function ShahJahaniMehrabTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="shah-jahani-mehrab-ornaments pointer-events-none">
      {/* ── Outer Hairline Frame ── */}
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

      {/* ── Architectural Mughal Cusped Archway (Diwan-i-Khas Mehrab) ── */}
      {/* Left side up to Apex (540, 92) and down to right */}
      <path
        d="M 120 440
           L 120 360
           C 120 300, 160 280, 195 250
           C 230 220, 255 195, 295 170
           C 340 142, 380 126, 430 112
           C 475 99, 515 90, 540 76
           C 565 90, 605 99, 650 112
           C 700 126, 740 142, 785 170
           C 825 195, 850 220, 885 250
           C 920 280, 960 300, 960 360
           L 960 440"
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="2.4"
      />

      {/* Inner Delicate Beaded Arch Line */}
      <path
        d="M 132 440
           L 132 365
           C 132 308, 170 289, 204 260
           C 238 231, 262 206, 301 182
           C 345 155, 384 139, 432 126
           C 475 113, 514 105, 540 92
           C 566 105, 605 113, 648 126
           C 696 139, 735 155, 779 182
           C 818 206, 842 231, 876 260
           C 910 289, 948 308, 948 365
           L 948 440"
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        strokeOpacity="0.75"
      />

      {/* Arch Apex Kalash / Finial Spire */}
      <g transform="translate(540, 68)">
        <path d="M 0 -24 L 3 -12 L 8 -6 L 0 0 L -8 -6 L -3 -12 Z" fill="url(#goldFoil)" />
        <circle cx="0" cy="-28" r="3" fill="url(#goldFoil)" />
        <circle cx="0" cy="-35" r="1.5" fill="#FFF8E7" />
      </g>

      {/* ── Flanking Spandrel Pietra-Dura Carnations ── */}
      {/* Left Spandrel */}
      <g transform="translate(190, 140)">
        <path
          d="M 0 80 C 25 45, 65 15, 115 5"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <circle cx="95" cy="18" r="5" fill="url(#goldFoil)" />
        <circle cx="50" cy="48" r="3.5" fill="url(#goldFoil)" />
      </g>

      {/* Right Spandrel */}
      <g transform="translate(890, 140) scale(-1, 1)">
        <path
          d="M 0 80 C 25 45, 65 15, 115 5"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <circle cx="95" cy="18" r="5" fill="url(#goldFoil)" />
        <circle cx="50" cy="48" r="3.5" fill="url(#goldFoil)" />
      </g>

      {/* ── Slender Side Colonnettes (Engraved Mughal Pillars) ── */}
      {/* Left Column */}
      <g transform="translate(114, 440)">
        <line x1="0" y1="0" x2="0" y2={height - 540} stroke="url(#goldFoil)" strokeWidth="1.6" />
        <line x1="8" y1="0" x2="8" y2={height - 540} stroke="url(#goldFoil)" strokeWidth="0.6" strokeOpacity="0.5" />
        {/* Column Capital */}
        <polygon points="-4,0 12,0 8,8 -1,8" fill="url(#goldFoil)" />
        {/* Column Base */}
        <polygon points="-4,380 12,380 8,372 -1,372" transform={`translate(0, ${height - 920})`} fill="url(#goldFoil)" />
      </g>

      {/* Right Column */}
      <g transform="translate(958, 440)">
        <line x1="0" y1="0" x2="0" y2={height - 540} stroke="url(#goldFoil)" strokeWidth="1.6" />
        <line x1="-8" y1="0" x2="-8" y2={height - 540} stroke="url(#goldFoil)" strokeWidth="0.6" strokeOpacity="0.5" />
        <polygon points="-12,0 4,0 1,8 -8,8" fill="url(#goldFoil)" />
        <polygon points="-12,380 4,380 1,372 -8,372" transform={`translate(0, ${height - 920})`} fill="url(#goldFoil)" />
      </g>
    </g>
  );
}
