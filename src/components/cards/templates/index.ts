import React from "react";
import { CardPalette } from "@/lib/cards/types";
import { GulzarNoorTemplate } from "./gulzar-noor";
import { ShahJahaniMehrabTemplate } from "./shah-jahani-mehrab";
import { JaaliIshqTemplate } from "./jaali-ishq";
import { ShamsaSunburstTemplate } from "./shamsa-sunburst";
import { SarvBulbulTemplate } from "./sarv-bulbul";
import { LachakToranjTemplate } from "./lachak-toranj";
import { ButaPaisleyTemplate } from "./buta-paisley";
import { KashiTileTemplate } from "./kashi-tile";
import { LotusMinarTemplate } from "./lotus-minar";
import { RoyalFarmanTemplate } from "./royal-farman";

export interface TemplateOrnamentProps {
  palette: CardPalette;
  isSquare: boolean;
}

export const TEMPLATE_COMPONENTS: Record<string, React.FC<TemplateOrnamentProps>> = {
  "gulzar-noor": GulzarNoorTemplate,
  "shah-jahani-mehrab": ShahJahaniMehrabTemplate,
  "jaali-ishq": JaaliIshqTemplate,
  "shamsa-sunburst": ShamsaSunburstTemplate,
  "sarv-bulbul": SarvBulbulTemplate,
  "lachak-toranj": LachakToranjTemplate,
  "buta-paisley": ButaPaisleyTemplate,
  "kashi-tile": KashiTileTemplate,
  "lotus-minar": LotusMinarTemplate,
  "royal-farman": RoyalFarmanTemplate,
};
