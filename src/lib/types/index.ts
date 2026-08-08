export type Occasion = "mehndi" | "nikkah" | "baraat" | "walima";
export type Category =
  | "bridal-lehenga"
  | "bridal-dupatta"
  | "bridal-purse-potli"
  | "bridal-clutch"
  | "bridal-shoes-khussa"
  | "bridal-jewellery-sets"
  | "bridal-bangles"
  | "kalire"
  | "matha-patti"
  | "jhumar-passa"
  | "nath"
  | "payal"
  | "kamarband"
  | "hair-accessories";
export type GarmentType = "lehenga" | "sharara" | "gharara" | "bridal-suit";
export type EmbroideryTechnique = "zardozi" | "dabka" | "tilla" | "resham";
export type EmbroideryDensity = "light" | "medium" | "heavy";
export type SizeTier = "entry" | "mid" | "bridal" | "couture";
export type Currency = "PKR" | "GBP" | "USD" | "CAD" | "AUD";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArtisanCredit {
  name: string;
  city: string;
  technique: string;
  yearsExperience?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  category: Category;
  occasion: Occasion[];
  garmentType?: GarmentType;
  images: ProductImage[];
  basePrice: number;
  currency: Currency;
  tier: SizeTier;
  artisan?: ArtisanCredit;
  inStock: boolean;
  customizable: boolean;
  leadTimeDays: number;
  sizes?: string[];
  featured?: boolean;
  bundleItems?: string[];
  /** Primary colour label for PLP swatch filters. */
  color?: string;
  /** Hex for the colour swatch chip. */
  colorHex?: string;
  /** Fabric / material label for PLP filters. */
  fabric?: string;
  /** Soft popularity signal for "Most Popular" sort. */
  popularity?: number;
  createdAt: Date;
}

export interface SizeMeasurements {
  waist: number;
  bust: number;
  hip: number;
  blouseLength: number;
  lehengaLength: number;
  lehengaWidth: "a-line" | "circular";
  sleeveLength: number;
  dupattaLength: number;
}

export interface CustomizerState {
  step: number;
  garmentType: GarmentType | null;
  occasion: Occasion | null;
  sizing: "standard" | "custom";
  size?: string;
  measurements: Partial<SizeMeasurements>;
  fabricSwatch: string | null;
  fabricColor: string | null;
  embroidery: EmbroideryTechnique | null;
  embroideryDensity: EmbroideryDensity | null;
  addons: string[];
  priceEstimate: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  customization?: Partial<CustomizerState>;
}

export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface RealBrideStory {
  id: string;
  name: string;
  city: string;
  image: string;
  quote: string;
  productName: string;
}
