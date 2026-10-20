import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function JaaliIshqTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="jaali-ishq-ornaments pointer-events-none">
      <defs>
        {/* Subtle, fine-line authentic geometric jaali lattice */}
        <pattern
          id="royal-jaali-mesh"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 14 0 L 34 0 L 48 14 L 48 34 L 34 48 L 14 48 L 0 34 L 0 14 Z"
            fill="none"
            stroke="url(#goldFoil)"
            strokeWidth="0.6"
            strokeOpacity="0.16"
          />
          <circle cx="24" cy="24" r="1.5" fill="url(#goldFoil)" fillOpacity="0.25" />
        </pattern>
      </defs>

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
        strokeOpacity="0.3"
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

      {/* Subtle Jaali Lattice Texture across the border field */}
      <rect
        x="56"
        y="56"
        width="968"
        height={height - 112}
        fill="url(#royal-jaali-mesh)"
      />

      {/* ── Central Royal Plaque Cartouche (Solid background void for clean reading) ── */}
      <g transform={`translate(540, ${isSquare ? 520 : 640})`}>
        {/* Subtle Royal Octagonal / Ogival Cartouche Plinth */}
        <path
          d={`M -380 ${isSquare ? -340 : -420}
             L 380 ${isSquare ? -340 : -420}
             C 410 ${isSquare ? -340 : -420}, 430 ${isSquare ? -320 : -390}, 430 ${isSquare ? -290 : -360}
             L 430 ${isSquare ? 290 : 360}
             C 430 ${isSquare ? 320 : 390}, 410 ${isSquare ? 340 : 420}, 380 ${isSquare ? 340 : 420}
             L -380 ${isSquare ? 340 : 420}
             C -410 ${isSquare ? 340 : 420}, -430 ${isSquare ? 320 : 390}, -430 ${isSquare ? 290 : 360}
             L -430 ${isSquare ? -290 : -360}
             C -430 ${isSquare ? -320 : -390}, -410 ${isSquare ? -340 : -420}, -380 ${isSquare ? -340 : -420} Z`}
          fill={palette.innerBg || palette.bg}
          fillOpacity="0.96"
          stroke="url(#goldFoil)"
          strokeWidth="1.6"
        />

        {/* Inner Delicate Beaded Inset Line */}
        <path
          d={`M -370 ${isSquare ? -330 : -410}
             L 370 ${isSquare ? -330 : -410}
             C 395 ${isSquare ? -330 : -410}, 418 ${isSquare ? -310 : -380}, 418 ${isSquare ? -280 : -350}
             L 418 ${isSquare ? 280 : 350}
             C 418 ${isSquare ? 310 : 380}, 395 ${isSquare ? 330 : 410}, 370 ${isSquare ? 330 : 410}
             L -370 ${isSquare ? 330 : 410}
             C -395 ${isSquare ? 330 : 410}, -418 ${isSquare ? 310 : 380}, -418 ${isSquare ? 280 : 350}
             L -418 ${isSquare ? -280 : -350}
             C -418 ${isSquare ? -310 : -380}, -395 ${isSquare ? -330 : -410}, -370 ${isSquare ? -330 : -410} Z`}
          fill="none"
          stroke={stroke}
          strokeWidth="0.8"
          strokeDasharray="4 3"
          strokeOpacity="0.5"
        />

        {/* Top Cartouche Crown Rosette */}
        <g transform={`translate(0, ${isSquare ? -340 : -420})`}>
          <circle cx="0" cy="0" r="14" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="url(#goldFoil)" />
          <path d="M 0 -14 L 3 -22 L 0 -26 L -3 -22 Z" fill="url(#goldFoil)" />
        </g>

        {/* Bottom Cartouche Pendant Rosette */}
        <g transform={`translate(0, ${isSquare ? 340 : 420})`}>
          <circle cx="0" cy="0" r="14" fill={palette.bg} stroke="url(#goldFoil)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="url(#goldFoil)" />
          <path d="M 0 14 L 3 22 L 0 26 L -3 22 Z" fill="url(#goldFoil)" />
        </g>
      </g>
    </g>
  );
}
