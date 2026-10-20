import React from "react";
import {
  CardPalette,
  CardTemplateConfig,
  CardAspect,
} from "@/lib/cards/types";
import { TEMPLATE_COMPONENTS } from "./templates";
import { isUrduScript, CARD_FONTS } from "@/lib/cards/fonts";
import { Couplet, POETRY_LIBRARY } from "@/lib/data/poetry";

export interface CardFrameProps {
  id?: string;
  template: CardTemplateConfig;
  palette: CardPalette;
  fontId: string;
  aspect: CardAspect;
  occasion: string;
  recipientName: string;
  senderName: string;
  message: string;
  date?: string;
  poetryEnabled: boolean;
  coupletId: string | null;
  customUrduCouplet?: [string, string];
  className?: string;
  svgRef?: React.Ref<SVGSVGElement>;
}

/**
 * Word-wrap helper that breaks a string into an array of lines
 * without breaking words (supports both English and Urdu).
 */
function wrapTextToLines(text: string, maxCharsPerLine: number): string[] {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + " " + word).length <= maxCharsPerLine) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export function CardFrame({
  id = "begum-card-svg",
  template,
  palette,
  fontId,
  aspect,
  occasion,
  recipientName,
  senderName,
  message,
  date,
  poetryEnabled,
  coupletId,
  customUrduCouplet,
  className = "",
  svgRef,
}: CardFrameProps) {
  const isSquare = aspect === "square";
  const width = 1080;
  const height = isSquare ? 1080 : 1350;

  // Selected Font
  const activeFont = CARD_FONTS.find((f) => f.id === fontId) || CARD_FONTS[0];

  // Resolve Template Component
  const TemplateOrnament = TEMPLATE_COMPONENTS[template.id] || TEMPLATE_COMPONENTS["gulzar-noor"];

  // Script detection
  const recipientIsUrdu = isUrduScript(recipientName);
  const senderIsUrdu = isUrduScript(senderName);
  const messageIsUrdu = isUrduScript(message);

  // Recipient font sizing & wrapping
  const cleanRecipient = recipientName.trim() || "Beloved";
  let recipientFontSize = 52;
  if (cleanRecipient.length > 24) {
    recipientFontSize = 36;
  } else if (cleanRecipient.length > 16) {
    recipientFontSize = 42;
  }
  const recipientLines = wrapTextToLines(cleanRecipient, cleanRecipient.length > 24 ? 22 : 18);

  // Occasion Display Title
  const occasionTitles: Record<string, string> = {
    love: "WITH ETERNAL LOVE",
    marriage: "ON YOUR SACRED UNION",
    anniversary: "HAPPY ANNIVERSARY",
    friendship: "IN HONOUR OF FRIENDSHIP",
    "thank-you": "WITH DEEPEST GRATITUDE",
  };
  const occTitle = occasionTitles[occasion] || occasionTitles["love"];

  // Resolve Couplet Data (Pure Urdu only)
  const resolvedCouplet: Couplet | undefined = POETRY_LIBRARY.find((c) => c.id === coupletId);
  const urduLines = customUrduCouplet && customUrduCouplet[0]
    ? customUrduCouplet
    : resolvedCouplet?.lines || (POETRY_LIBRARY.find((c) => c.occasion === occasion)?.lines || [
        "تیرے ہونے سے ہی روشن ہے مرا ہر لمحہ",
        "تُو نہ ہو تو یہ جہاں خواب سا لگتا ہے مجھے",
      ]);

  // Personal message lines
  const cleanMessage = message.trim();
  const maxChars = isSquare ? 40 : 46;
  const messageLines = wrapTextToLines(cleanMessage, maxChars).slice(0, isSquare && poetryEnabled ? 4 : 5);

  // Vertical layout calculations
  const occasionHeaderY = isSquare ? 175 : 210;
  const recipientStartY = isSquare ? 240 : 285;
  const poetryStartY = isSquare ? 400 : 460;
  const messageStartY = poetryEnabled
    ? (isSquare ? 630 : 750)
    : (isSquare ? 430 : 520);
  const senderY = isSquare ? (poetryEnabled ? 850 : 810) : (poetryEnabled ? 1040 : 940);
  const dateY = senderY + (isSquare ? 30 : 36);
  const brandingY = isSquare ? 995 : 1245;

  return (
    <svg
      id={id}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-auto select-none overflow-hidden ${className}`}
      style={{
        backgroundColor: palette.bg,
        fontFamily: activeFont.family,
      }}
    >
      <defs>
        {/* Real Luxury Multi-Stop Gold Foil Gradient */}
        <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4DB" />
          <stop offset="25%" stopColor={palette.goldStart} />
          <stop offset="50%" stopColor="#E0B76A" />
          <stop offset="75%" stopColor="#A87B32" />
          <stop offset="100%" stopColor={palette.goldEnd} />
        </linearGradient>

        <linearGradient id="softGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E8" />
          <stop offset="50%" stopColor="#E2BE76" />
          <stop offset="100%" stopColor="#B3873B" />
        </linearGradient>

        {/* Subtle Paper Grain Texture */}
        <filter id="card-paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.038 0"
          />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </defs>

      {/* Base Background with Paper Filter */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill={palette.bg}
        filter="url(#card-paper-grain)"
      />

      {/* Inner Card Tint */}
      {palette.innerBg && (
        <rect
          x="30"
          y="30"
          width={width - 60}
          height={height - 60}
          fill={palette.innerBg}
          fillOpacity="0.88"
        />
      )}

      {/* Render Haute Couture Template Ornaments */}
      <TemplateOrnament palette={palette} isSquare={isSquare} />

      {/* ─────────────────────────────────────────────────────────────
          1. OCCASION HEADER
         ───────────────────────────────────────────────────────────── */}
      <g transform={`translate(540, ${occasionHeaderY})`} textAnchor="middle">
        <circle cx="-130" cy="-5" r="2" fill="url(#goldFoil)" />
        <circle cx="130" cy="-5" r="2" fill="url(#goldFoil)" />
        <line x1="-115" y1="-5" x2="-30" y2="-5" stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
        <line x1="30" y1="-5" x2="115" y2="-5" stroke="url(#goldFoil)" strokeWidth="0.8" strokeOpacity="0.7" />
        <polygon points="0,-10 3.5,-5 0,0 -3.5,-5" fill="url(#goldFoil)" />

        <text
          y="16"
          fill={palette.accent}
          fontSize="13"
          letterSpacing="4.5"
          fontWeight="600"
          style={{ fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}
        >
          {occTitle}
        </text>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          2. RECIPIENT NAME (Typography-First)
         ───────────────────────────────────────────────────────────── */}
      <g transform={`translate(540, ${recipientStartY})`} textAnchor="middle">
        <text
          fill={palette.textPrimary}
          fontSize={recipientFontSize}
          fontWeight="600"
          letterSpacing={recipientIsUrdu ? "0" : "1.2"}
          style={{
            direction: recipientIsUrdu ? "rtl" : "ltr",
            fontFamily: recipientIsUrdu
              ? "'Noto Nastaliq Urdu', 'Amiri', serif"
              : activeFont.family,
          }}
        >
          {recipientLines.map((line, idx) => (
            <tspan
              key={idx}
              x="0"
              dy={idx === 0 ? "0" : `${recipientFontSize * 1.25}px`}
            >
              {line}
            </tspan>
          ))}
        </text>

        {/* Delicate gold hairline divider under recipient name */}
        <line
          x1="-70"
          y1={recipientLines.length * recipientFontSize * 0.85 + 16}
          x2="70"
          y2={recipientLines.length * recipientFontSize * 0.85 + 16}
          stroke="url(#goldFoil)"
          strokeWidth="1"
          strokeOpacity="0.75"
        />
        <circle
          cx="0"
          cy={recipientLines.length * recipientFontSize * 0.85 + 16}
          r="2.5"
          fill="url(#goldFoil)"
        />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          3. PURE URDU POETRY ZONE (Optional, Pure Nastaliq Only)
         ───────────────────────────────────────────────────────────── */}
      {poetryEnabled && (
        <g transform={`translate(540, ${poetryStartY})`} textAnchor="middle">
          {/* Subtle side decorative arabesque floral brackets */}
          <g opacity="0.6">
            <path d="M -340 -10 C -360 10, -360 40, -340 60" fill="none" stroke="url(#goldFoil)" strokeWidth="1" />
            <circle cx="-340" cy="-10" r="2" fill="url(#goldFoil)" />
            <circle cx="-340" cy="60" r="2" fill="url(#goldFoil)" />

            <path d="M 340 -10 C 360 10, 360 40, 340 60" fill="none" stroke="url(#goldFoil)" strokeWidth="1" />
            <circle cx="340" cy="-10" r="2" fill="url(#goldFoil)" />
            <circle cx="340" cy="60" r="2" fill="url(#goldFoil)" />
          </g>

          <text
            fill="url(#goldFoil)"
            fontSize={isSquare ? 24 : 28}
            fontWeight="500"
            style={{
              direction: "rtl",
              fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
            }}
          >
            <tspan x="0" dy="0">{urduLines[0]}</tspan>
            <tspan x="0" dy={isSquare ? "56px" : "64px"}>{urduLines[1]}</tspan>
          </text>

          {/* Understated Begum Emblem Line */}
          <g transform={`translate(0, ${isSquare ? 120 : 140})`}>
            <circle cx="-25" cy="0" r="1.5" fill="url(#goldFoil)" />
            <polygon points="0,-4 3,0 0,4 -3,0" fill="url(#goldFoil)" />
            <circle cx="25" cy="0" r="1.5" fill="url(#goldFoil)" />
          </g>
        </g>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. PERSONAL MESSAGE
         ───────────────────────────────────────────────────────────── */}
      {messageLines.length > 0 && (
        <g transform={`translate(540, ${messageStartY})`} textAnchor="middle">
          <text
            fill={palette.textPrimary}
            fontSize={isSquare ? 18 : 21}
            letterSpacing={messageIsUrdu ? "0" : "0.4"}
            style={{
              direction: messageIsUrdu ? "rtl" : "ltr",
              fontFamily: messageIsUrdu
                ? "'Noto Nastaliq Urdu', 'Amiri', serif"
                : activeFont.family,
            }}
          >
            {messageLines.map((line, idx) => (
              <tspan
                key={idx}
                x="0"
                dy={idx === 0 ? "0" : (isSquare ? "34px" : "38px")}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. SENDER SIGN-OFF
         ───────────────────────────────────────────────────────────── */}
      <g transform={`translate(540, ${senderY})`} textAnchor="middle">
        <text
          fill={palette.accent}
          fontSize="12.5"
          letterSpacing="3"
          style={{ fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}
        >
          {senderIsUrdu ? "خیر اندیش" : "With Love,"}
        </text>

        <text
          y="28"
          fill={palette.textPrimary}
          fontSize="24"
          fontWeight="600"
          style={{
            direction: senderIsUrdu ? "rtl" : "ltr",
            fontFamily: senderIsUrdu
              ? "'Noto Nastaliq Urdu', 'Amiri', serif"
              : activeFont.family,
          }}
        >
          {senderName.trim() || "Begum"}
        </text>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          6. OPTIONAL DATE
         ───────────────────────────────────────────────────────────── */}
      {date && date.trim() && (
        <g transform={`translate(540, ${dateY + 24})`} textAnchor="middle">
          <text
            fill={palette.textSecondary}
            fontSize="11.5"
            letterSpacing="2.5"
            fillOpacity="0.8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {date.trim()}
          </text>
        </g>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. PERMANENT INLINED BEGUM BRANDING
         ───────────────────────────────────────────────────────────── */}
      <g transform={`translate(540, ${brandingY})`} textAnchor="middle">
        {/* Inlined Begum Crest */}
        <g transform="translate(0, -30) scale(0.062) translate(-234, -252.5)">
          <path
            d="M457.333 306.32C419.967 208.603 286.981 199.592 286.981 199.592C312.997 192.665 381.355 166.878 381.355 102.57C381.355 38.2615 324.065 0 248.78 0H64.0431C64.0431 0 119.675 2.35606 119.675 51.9744V278.178C119.675 316.852 117.734 352.193 92.4117 377.556C92.4117 377.556 156.759 344.842 156.759 270.827V123.633C156.759 81.2569 155.653 21.096 155.328 4.42982H245.463C267.61 4.42982 347.035 20.5097 347.035 95.0784C347.035 212.892 237.29 201.079 237.29 201.079V203.24C237.29 203.24 270.092 199.918 316.997 210.308C363.913 220.699 453.582 274.866 428.26 383.288C402.298 494.468 312.704 468.671 274.515 451.614C236.325 434.557 191.479 399.368 112.054 398.25C32.6177 397.142 4.39001 436.783 0.520089 456.467C-3.34983 476.152 12.9754 516.9 99.5987 501.656C186.222 486.412 229.615 450.3 229.615 450.3L222.764 446.24C222.764 446.24 141.181 493.024 85.7667 499.256C30.3412 505.489 13.2897 489.865 5.2247 469.735C-2.84034 449.605 26.8074 405.698 81.6149 405.698C215.707 405.698 211.555 453.514 292.509 475.142C432.574 512.557 494.688 404.037 457.322 306.32H457.333Z"
            fill="url(#goldFoil)"
          />
        </g>

        {/* Wordmark */}
        <text
          y="0"
          fill="url(#goldFoil)"
          fontSize="13.5"
          fontWeight="700"
          letterSpacing="5.5"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          BEGUM
        </text>

        {/* Subline */}
        <text
          y="16"
          fill={palette.textSecondary}
          fontSize="9"
          letterSpacing="2.5"
          fillOpacity="0.75"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          begumretails.com
        </text>
      </g>
    </svg>
  );
}
