// Structured brand content — headless-CMS-ready shapes.
// Pages render from this data so milestones, karigars, and values
// can be updated without touching page components.

export interface BrandValue {
  id: string;
  kicker: string;
  statement: string;
  detail: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
}

export interface JourneyStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface KarigarProfile {
  id: string;
  name: string;
  city: string;
  yearsExperience: number;
  specialty: string;
  techniques: string[];
  quote: string;
  workImage?: { src: string; alt: string };
}

export interface CraftTechnique {
  id: string;
  name: string;
  origin: string;
  description: string;
  timePerPiece: string;
}

export interface ProductionStage {
  step: string;
  title: string;
  description: string;
  proof?: string;
}

export const brandValues: BrandValue[] = [
  {
    id: "dignity",
    kicker: "On nobility",
    statement: "Nobility is dignity, not display.",
    detail:
      "Begum was never about wealth. It is a title of grace and ownership of the moment. We design so a bride carries herself, not just a garment.",
  },
  {
    id: "craft",
    kicker: "On making",
    statement: "Craft over speed. Always.",
    detail:
      "A bridal piece that takes four months takes four months. We do not compress hand embroidery into factory timelines, and we never will.",
  },
  {
    id: "names",
    kicker: "On transparency",
    statement: "Real names. Real hands.",
    detail:
      "Every Begum piece carries the name and city of the karigar who made it. Not 'our artisans' — Muhammad Ali of Lahore, Fatima Tariq of Karachi.",
  },
  {
    id: "honesty",
    kicker: "On trust",
    statement: "Honesty over the sales pitch.",
    detail:
      "Real photography, staged payments, honest sizing. If a fabric will not survive a monsoon baraat, we say so before you order — not after.",
  },
];

export const journeyMilestones: TimelineMilestone[] = [
  {
    id: "founding",
    year: "1994",
    title: "A single atelier in Lahore",
    description:
      "The first workshop opens with three karigars, serving bridal families through hand embroidery commissions passed along by word of mouth.",
    image: {
      src: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
      alt: "Zardozi hand embroidery in progress at the atelier",
    },
  },
  {
    id: "first-international",
    year: "2003",
    title: "The first international order",
    description:
      "A bride in Manchester commissions a baraat lehenga sight unseen, trusting fabric swatches sent by post and weekly photographs. The remote process begins here.",
  },
  {
    id: "couture",
    year: "2008",
    title: "From embroidery service to couture house",
    description:
      "Begum moves beyond embroidery-only commissions into full bridal couture — silhouette, structure, and fittings under one roof.",
    image: {
      src: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
      alt: "Begum bridal lehenga with heritage embroidery",
    },
  },
  {
    id: "karigar-network",
    year: "2014",
    title: "The karigar partnership network",
    description:
      "Partnerships extend to master karigars in Karachi and Gujranwala, each credited by name on the pieces they make — the start of our transparency pillar.",
  },
  {
    id: "remote-bespoke",
    year: "2018",
    title: "Remote bespoke, formalised",
    description:
      "Video consultations, guided self-measurement, and staged photo approvals become a defined process. Diaspora brides design from London, Toronto, and Dubai.",
    image: {
      src: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
      alt: "Bridal couture portrait with handworked detail",
    },
  },
  {
    id: "occasion-lines",
    year: "2022",
    title: "Four occasions, four languages of dress",
    description:
      "Dedicated Mehndi, Nikkah, Baraat, and Walima lines launch — each with its own embroidery register, weight, and mood.",
  },
  {
    id: "today",
    year: "Today",
    title: "Heritage, carried forward",
    description:
      "Thirty-plus karigars. Brides on four continents. The same rule as 1994: nothing leaves the atelier that we would not put on our own family.",
  },
];

// Only figures the site already stands behind elsewhere.
export const journeyStats: JourneyStat[] = [
  { id: "karigars", value: 30, suffix: "+", label: "Master karigars, credited by name" },
  { id: "continents", value: 4, label: "Continents with Begum brides" },
  { id: "generations", value: 3, label: "Generations of craft heritage" },
  { id: "avg-years", value: 24, label: "Average years of experience per karigar" },
];

export const karigarProfiles: KarigarProfile[] = [
  {
    id: "muhammad-ali",
    name: "Muhammad Ali",
    city: "Lahore",
    yearsExperience: 32,
    specialty: "Zardozi & Dabka",
    techniques: ["Zardozi", "Dabka"],
    quote: "My father taught me when I was twelve. Now my son works beside me.",
    workImage: {
      src: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
      alt: "Zardozi and dabka embroidery detail by Muhammad Ali",
    },
  },
  {
    id: "fatima-tariq",
    name: "Fatima Tariq",
    city: "Karachi",
    yearsExperience: 18,
    specialty: "Resham",
    techniques: ["Resham"],
    quote: "Silk thread is like painting. Every color tells a different story.",
    workImage: {
      src: "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
      alt: "Resham silk threadwork in sunrise tones by Fatima Tariq",
    },
  },
  {
    id: "rabia-anwar",
    name: "Rabia Anwar",
    city: "Lahore",
    yearsExperience: 22,
    specialty: "Tilla",
    techniques: ["Tilla"],
    quote: "The finest tilla needs the steadiest hands. This art taught me patience.",
    workImage: {
      src: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
      alt: "Fine tilla border work on silk by Rabia Anwar",
    },
  },
];

export const craftTechniques: CraftTechnique[] = [
  {
    id: "zardozi",
    name: "Zardozi",
    origin: "Persia, carried through the Mughal courts",
    description:
      "Gold and silver thread built up over padding, often set with pearls and stones. The most regal technique in the atelier — and the slowest.",
    timePerPiece: "8–14 weeks on a full bridal lehenga",
  },
  {
    id: "dabka",
    name: "Dabka",
    origin: "Punjab atelier tradition",
    description:
      "Coiled metal wire stitched into dimensional, spring-like motifs that catch light from every angle. It gives a baraat lehenga its depth.",
    timePerPiece: "6–10 weeks alongside zardozi",
  },
  {
    id: "tilla",
    name: "Tilla",
    origin: "Kashmir & Punjab",
    description:
      "Fine metallic thread for borders and edging — lighter than zardozi, equally luminous. The quiet detail you notice only when it moves.",
    timePerPiece: "2–4 weeks for borders and dupatta edges",
  },
  {
    id: "resham",
    name: "Resham",
    origin: "South Asia, Mughal period",
    description:
      "Silk thread with a matte finish, used for florals, gradients, and color no metal can reach. This is where a mehndi piece gets its joy.",
    timePerPiece: "4–8 weeks depending on density",
  },
  {
    id: "gota",
    name: "Gota",
    origin: "Rajasthan & Punjab festive tradition",
    description:
      "Woven gold ribbon appliqué, folded and stitched into borders and motifs. Festive, light, and made to dance in — the mehndi-night signature.",
    timePerPiece: "1–3 weeks for trims and accents",
  },
];

export const productionStages: ProductionStage[] = [
  {
    step: "01",
    title: "Sketch & consultation",
    description: "Silhouette, neckline, and motif direction agreed with your designer — in person or over video.",
  },
  {
    step: "02",
    title: "Fabric selection",
    description: "Base fabric chosen from swatches. Diaspora brides receive swatches by post before anything is cut.",
    proof: "Photo approval — 30% payment confirms your order",
  },
  {
    step: "03",
    title: "Base construction",
    description: "The garment is cut and structured — kali panels, can-can, and lining built before a single motif is placed.",
  },
  {
    step: "04",
    title: "Hand embroidery",
    description: "Your named karigar executes the motif work by hand. The longest stage, and the reason the piece is yours alone.",
    proof: "Mid-production photos — approve before the 40% stage",
  },
  {
    step: "05",
    title: "Fitting & adjustment",
    description: "Guided fittings — in the atelier or remotely against your measurement profile — until drape and movement feel right.",
  },
  {
    step: "06",
    title: "Final quality check",
    description: "Every hook, weight, and thread-end inspected before the piece is packed in a preservation garment bag.",
    proof: "Final photos — the last 30% is due only now",
  },
];

export const sourcingNotes = [
  {
    title: "Fabrics",
    detail: "Raw silk, organza, and velvet sourced from established Pakistani mills we have worked with for over a decade.",
  },
  {
    title: "Threads & metals",
    detail: "Zari and dabka wire sourced regionally from specialist suppliers — the same houses our karigars' families have always used.",
  },
  {
    title: "Fair work",
    detail: "Karigars are paid per commission at rates they set with us, credited by name, and never anonymised behind the brand.",
  },
];
