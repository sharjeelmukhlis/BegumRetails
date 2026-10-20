import React from "react";
import { CardPalette } from "@/lib/cards/types";

interface TemplateProps {
  palette: CardPalette;
  isSquare: boolean;
}

export function SarvBulbulTemplate({ palette, isSquare }: TemplateProps) {
  const height = isSquare ? 1080 : 1350;
  const stroke = palette.ornamentStroke || palette.border;

  return (
    <g className="sarv-bulbul-ornaments pointer-events-none">
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

      {/* ── Left Slender Persian Cypress Tree (Sarv of Eternity) ── */}
      <g transform={`translate(86, ${height - 130})`}>
        {/* Slender tapered flame cypress silhouette */}
        <path
          d="M 0 0
             C 10 -35, 18 -100, 20 -190
             C 22 -300, 14 -390, 2 -460
             C 0 -475, -3 -475, -5 -460
             C -17 -390, -25 -300, -23 -190
             C -21 -100, -13 -35, 0 0 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.15"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        {/* Graceful curved tip */}
        <path
          d="M 2 -460 C 5 -475, 12 -482, 20 -480 C 16 -475, 10 -472, -5 -460"
          fill="url(#goldFoil)"
        />
        {/* Fine gold foliage branches */}
        {[-70, -140, -210, -280, -350, -410].map((y) => (
          <g key={y}>
            <line x1="-14" y1={y + 10} x2="0" y2={y} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="14" y1={y + 10} x2="0" y2={y} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>
        ))}
      </g>

      {/* ── Right Symmetrical Cypress Tree ── */}
      <g transform={`translate(994, ${height - 130}) scale(-1, 1)`}>
        <path
          d="M 0 0
             C 10 -35, 18 -100, 20 -190
             C 22 -300, 14 -390, 2 -460
             C 0 -475, -3 -475, -5 -460
             C -17 -390, -25 -300, -23 -190
             C -21 -100, -13 -35, 0 0 Z"
          fill="url(#goldFoil)"
          fillOpacity="0.15"
          stroke="url(#goldFoil)"
          strokeWidth="1.2"
        />
        <path
          d="M 2 -460 C 5 -475, 12 -482, 20 -480 C 16 -475, 10 -472, -5 -460"
          fill="url(#goldFoil)"
        />
        {[-70, -140, -210, -280, -350, -410].map((y) => (
          <g key={y}>
            <line x1="-14" y1={y + 10} x2="0" y2={y} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="14" y1={y + 10} x2="0" y2={y} stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>
        ))}
      </g>

      {/* ── Nightingale & Rose Blossom Branch at Top Left ── */}
      <g transform="translate(130, 180)">
        {/* Curving Rose Branch */}
        <path
          d="M -15 65 C 10 40, 50 32, 95 44 C 120 52, 155 38, 180 14"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <circle cx="95" cy="44" r="6" fill="url(#goldFoil)" />

        {/* Perched Nightingale (Bulbul) */}
        <path
          d="M 64 36
             C 58 24, 66 12, 78 12
             C 85 12, 91 16, 94 22
             C 99 28, 94 38, 76 42 Z"
          fill="url(#goldFoil)"
        />
        <polygon points="94,18 103,20 94,23" fill="url(#goldFoil)" />
        <polygon points="64,36 42,52 52,37" fill="url(#goldFoil)" />
      </g>

      {/* Symmetrical Nightingale at Top Right */}
      <g transform="translate(950, 180) scale(-1, 1)">
        <path
          d="M -15 65 C 10 40, 50 32, 95 44 C 120 52, 155 38, 180 14"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="1.4"
        />
        <circle cx="95" cy="44" r="6" fill="url(#goldFoil)" />

        <path
          d="M 64 36
             C 58 24, 66 12, 78 12
             C 85 12, 91 16, 94 22
             C 99 28, 94 38, 76 42 Z"
          fill="url(#goldFoil)"
        />
        <polygon points="94,18 103,20 94,23" fill="url(#goldFoil)" />
        <polygon points="64,36 42,52 52,37" fill="url(#goldFoil)" />
      </g>
    </g>
  );
}
