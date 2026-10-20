import {
  Cormorant_Garamond,
  Cinzel,
  Playfair_Display,
  Amiri,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import { CardFontOption } from "./types";

export const fontCormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const fontCinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const fontAmiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

export const fontNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

export const CARD_FONTS: CardFontOption[] = [
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    family: "'Cormorant Garamond', Georgia, serif",
    sample: "Begum Royal Serif",
  },
  {
    id: "cinzel",
    name: "Cinzel",
    family: "'Cinzel', 'Times New Roman', serif",
    sample: "Mughal Imperial Caps",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    family: "'Playfair Display', Georgia, serif",
    sample: "Heirloom Elegance",
  },
  {
    id: "amiri",
    name: "Amiri",
    family: "'Amiri', 'Traditional Arabic', serif",
    sample: "خطِ امیري کلاسیک",
    isRtl: true,
  },
  {
    id: "nastaliq",
    name: "Noto Nastaliq Urdu",
    family: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif",
    sample: "نستعلیق شاہی خط",
    isRtl: true,
  },
];

export const GOOGLE_FONTS_EMBED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
`;

export function isUrduScript(text: string): boolean {
  if (!text) return false;
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}
