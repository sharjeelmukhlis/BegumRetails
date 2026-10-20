export type CardOccasion = "all" | "thank-you" | "love" | "marriage" | "anniversary" | "friendship";
export type ConcreteOccasion = "thank-you" | "love" | "marriage" | "anniversary" | "friendship";
export type CardAspect = "portrait" | "square";

export interface CardPalette {
  id: string;
  name: string;
  bg: string;
  innerBg?: string;
  border: string;
  goldStart: string;
  goldEnd: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  ornamentFill: string;
  ornamentStroke: string;
  isDark: boolean;
}

export interface PoetryZoneConfig {
  x: number;
  y: number;
  width: number;
  maxLines: number;
}

export interface CardTemplateConfig {
  id: string;
  name: string;
  subtitle: string;
  occasions: ConcreteOccasion[];
  palettes: [CardPalette, CardPalette, CardPalette];
  defaultPaletteId: string;
  poetryZone: PoetryZoneConfig;
}

export interface CardState {
  templateId: string;
  paletteId: string;
  fontId: string;
  aspect: CardAspect;
  occasion: ConcreteOccasion;
  recipientName: string;
  senderName: string;
  message: string;
  date: string;
  poetryEnabled: boolean;
  coupletId: string | null;
  customUrduCouplet: [string, string];
}

export interface CardFontOption {
  id: string;
  name: string;
  family: string;
  sample: string;
  isRtl?: boolean;
}
