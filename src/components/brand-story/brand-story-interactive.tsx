"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Check,
  X,
  Compass,
  MapPin,
  Layers,
  HeartHandshake,
  ScrollText,
  Volume2,
  VolumeX,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// 1. ANATOMY OF A BEGUM HEIRLOOM (5 Sacred Structural Layers)
// ─────────────────────────────────────────────────────────────
interface GarmentLayer {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  leadTime: string;
  artisanRole: string;
  description: string;
  specifications: string[];
  image: string;
  craftProof: string;
}

const HEIRLOOM_LAYERS: GarmentLayer[] = [
  {
    id: "layer-silk",
    number: "01",
    title: "80-Gram Pure Pit-Loom Katan Silk",
    subtitle: "The Handwoven Substrate",
    leadTime: "3 to 4 Weeks Looming",
    artisanRole: "Master Weavers of Multan & Punjab",
    description:
      "A Begum lehenga never touches synthetic polyester or mill-extruded satin. Our substrate is spun from pure mulberry cocoons on traditional wooden pit-looms. Naturally breathable, it possesses the tensile fiber strength to support 14 kilograms of precious metal bullion without pulling or sagging over decades.",
    specifications: [
      "100% natural mulberry raw silk with zero chemical silicon wash",
      "Hand-dyed in small earthen vats using heritage azo-free pigments",
      "Liquid drape that flows with walking kinetic rhythm",
    ],
    image:
      "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    craftProof: "Certified zero-synthetic burn-tested silk swatch included in every folio.",
  },
  {
    id: "layer-bullion",
    number: "02",
    title: "Pure 24k Gold & Silver Bullion",
    subtitle: "Zardozi & Dabka Metalwork",
    leadTime: "300 to 450 Needle Hours",
    artisanRole: "Master Karigars (Ustad Muhammad Ali & Team)",
    description:
      "Unlike modern commercial bridalwear that stitches plastic-core copper wire coated in chemical lacquer, Begum commissions real beaten silver and gold bullion from generational metal-spinners. It catches candlelight with warm royal brilliance and is rigorously tested to prevent oxidation for over 30 years.",
    specifications: [
      "Hand-drawn fine metallic nakshi, dabka, and coiled spring wire",
      "Pounded silver bullion beaten to microscopic micron thickness",
      "Micro-stitched over raised organic cotton cording for 3D architectural relief",
    ],
    image:
      "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    craftProof: "Archival non-tarnish alloy laboratory certificate with every piece.",
  },
  {
    id: "layer-pearls",
    number: "03",
    title: "Basra Seed Pearls & Semi-Precious Inlays",
    subtitle: "Hand-Anchored Micro-Beading",
    leadTime: "60 to 80 Precision Hours",
    artisanRole: "Senior Adda Embroidery Specialists",
    description:
      "Every floral bud and imperial arch motif is punctuated with real micro seed pearls, natural mother-of-pearl cabochons, and uncut semi-precious stones. Each stone is individually anchored with double-twisted silk thread, ensuring zero beads can fall off during the wedding celebration.",
    specifications: [
      "Basra-inspired iridescent micro seed pearls",
      "Natural cabochons set in bezel-embroidered metallic rims",
      "Zero commercial hot-melt glue or machine-heat stamping",
    ],
    image:
      "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
    craftProof: "Hand-knotted double silk anchors, tested to withstand 15kg tensile pull.",
  },
  {
    id: "layer-can-can",
    number: "04",
    title: "Kinetic Pelvic Weight-Relief Harness",
    subtitle: "Haute Couture Anatomical Structure",
    leadTime: "2 Weeks Structural Tailoring",
    artisanRole: "Senior Master Cutter & Architectural Tailor",
    description:
      "A heavy bridal lehenga should never feel like a claustrophobic prison. Begum's proprietary internal architecture distributes the 12–16 kilogram weight evenly across the bride's pelvic girdle rather than pulling down on the waistline, giving her complete freedom to float, turn, and sit gracefully without fatigue.",
    specifications: [
      "Multi-tiered graduated horsehair and flexible anatomical armature",
      "Internal padded pelvic support waistband with dual-stage closure",
      "Eliminates heavy lower-back strain during 8-hour wedding receptions",
    ],
    image:
      "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    craftProof: "Custom-balanced to bride's personal lumbar curvature.",
  },
  {
    id: "layer-seal",
    number: "05",
    title: "The Stitched Karigar Cartouche & Seal",
    subtitle: "Named Human Provenance",
    leadTime: "Final Quality Review",
    artisanRole: "Personal Stitch of the Master Karigar",
    description:
      "We fiercely reject corporate anonymity. Inside the silk hem lining of every Begum bridal creation, a hand-embroidered parchment label is stitched bearing the full name and city of the master artisan who dedicated months of his life to making your ensemble.",
    specifications: [
      "Embroidered artisan attribution: name, atelier city, and year",
      "Unique archive serial registration number cataloged in Lahore",
      "Permanent connection between the artisan's hands and the bride's family",
    ],
    image:
      "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    craftProof: "Lifetime provenance record stored in our Gulberg archive folio.",
  },
];

// ─────────────────────────────────────────────────────────────
// 2. RADICAL COMPARISON: THE BEGUM STANDARD VS COMMERCIAL BRIDAL
// ─────────────────────────────────────────────────────────────
interface ComparisonPoint {
  dimension: string;
  begumStandard: string;
  commercialMarket: string;
  whyItMatters: string;
}

const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    dimension: "Embroidery Execution",
    begumStandard: "100% Hand-stitched at a traditional wooden adda frame (350–500+ hours).",
    commercialMarket: "High-speed computerized multi-needle machine stamping with glued borders.",
    whyItMatters:
      "Hand embroidery breathes with organic depth and light reflection; machine embroidery is flat, stiff, and lacks soul.",
  },
  {
    dimension: "Fabric Composition",
    begumStandard: "Pure 80g handloom mulberry katan silk & natural raw organza.",
    commercialMarket: "Polyester, synthetic blends, and chemical plastic tissue.",
    whyItMatters:
      "Pure silks breathe gracefully in warm banquets, drape with liquid poise, and survive generations without decaying.",
  },
  {
    dimension: "Artisan Attribution",
    begumStandard: "Named karigar credited with stitched label & fair living wages (3x regional standard).",
    commercialMarket: "Faceless piece-rate sweatshops hidden behind corporate brand secrecy.",
    whyItMatters:
      "True luxury begins with the dignity of the human hands who brought your bridal dream into existence.",
  },
  {
    dimension: "Financial Payment Model",
    begumStandard: "Staged 30% / 40% / 30% with recorded HD photo/video proof at each stage.",
    commercialMarket: "100% payment demanded upfront before seeing a single stitch.",
    whyItMatters:
      "You retain financial control and sign off on fabric and needlework before final dispatch.",
  },
  {
    dimension: "Internal Weight Architecture",
    begumStandard: "Proprietary pelvic weight-relief armature that balances 14kg weightlessly.",
    commercialMarket: "Stiff, abrasive plastic can-can that bruises the waist and weighs down shoulders.",
    whyItMatters:
      "A bride should dance, glide, and smile through her Baraat, not endure a torture harness.",
  },
  {
    dimension: "Preservation & Heirlooms",
    begumStandard: "Delivered in handcrafted Sheesham wood bridal chest & unbleached organic muslin.",
    commercialMarket: "Disposable synthetic vinyl garment bag that traps toxic moisture and oxidizes metal.",
    whyItMatters:
      "Protects pure gold and silver bullion zardozi from oxidation so your daughter can wear it decades from now.",
  },
];

// ─────────────────────────────────────────────────────────────
// 3. GLOBAL DIASPORA BRIDES: BRIDGING 6,000 MILES
// ─────────────────────────────────────────────────────────────
interface DiasporaHub {
  city: string;
  country: string;
  distanceFromLahore: string;
  activeBrides: string;
  brideName: string;
  ensemble: string;
  venue: string;
  quote: string;
  image: string;
  fittingMethod: string;
}

const DIASPORA_HUBS: DiasporaHub[] = [
  {
    city: "London",
    country: "United Kingdom",
    distanceFromLahore: "6,300 km",
    activeBrides: "240+ Brides",
    brideName: "Zara Khan-Patel",
    ensemble: "Custom Resham Noor Bridal Lehenga",
    venue: "The Savoy, London",
    quote:
      "Designing my wedding lehenga from London felt daunting until my first video consultation with Sherjeel. The fabric swatches arrived in Mayfair within three days, and when the gown arrived, it fit to the millimeter. My grandmother cried seeing the named karigar label inside.",
    image:
      "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
    fittingMethod: "Live 1-on-1 Video Consultation & Swatch Courier to Central London",
  },
  {
    city: "Toronto",
    country: "Canada",
    distanceFromLahore: "11,100 km",
    activeBrides: "180+ Brides",
    brideName: "Meherrin Sheikh",
    ensemble: "Imperial Zari Court Farshi",
    venue: "The Carlu, Toronto",
    quote:
      "I refused to settle for commercial boutiques that import cheap factory copies. Begum built my dream piece over four months. Getting WhatsApp progress videos of Ustad Ali working on my border was the highlight of my wedding planning.",
    image:
      "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    fittingMethod: "Guided Digital Body Scanning & Dual-Stage Toile Fitting",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    distanceFromLahore: "2,000 km",
    activeBrides: "310+ Brides",
    brideName: "Sana Al-Mir",
    ensemble: "Zari Dream Royal Lehenga",
    venue: "Armani Hotel Dubai",
    quote:
      "The staged payment model gave me complete peace of mind. I approved the raw katan silk, approved the mid-production zardozi embroidery, and only paid the final balance when it was hand-steamed and ready to fly.",
    image:
      "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    fittingMethod: "Direct 48-Hour Air Courier & Concierge Steaming Protocol",
  },
  {
    city: "New York",
    country: "United States",
    distanceFromLahore: "11,500 km",
    activeBrides: "150+ Brides",
    brideName: "Amara Siddiqui",
    ensemble: "Ruby Court Heirloom Lehenga",
    venue: "Plaza Hotel, Manhattan",
    quote:
      "I walked for six hours at my reception and felt completely weightless thanks to Begum's internal pelvic harness. It wasn't just a lehenga; it was fine architectural engineering disguised as Mughal royalty.",
    image:
      "https://images.unsplash.com/photo-1695876722054-3307043651eb?auto=format&fit=crop&w=1200&q=85",
    fittingMethod: "Personal Designer Consultation & Courier Fitting Verification",
  },
  {
    city: "Lahore",
    country: "Pakistan (Atelier Flagship)",
    distanceFromLahore: "Home Atelier",
    activeBrides: "800+ Brides",
    brideName: "Ayesha Malik",
    ensemble: "Heirloom Gulberg Emerald Gown",
    venue: "Haveli Barood Khana, Old Lahore",
    quote:
      "Stepping into the Gulberg atelier felt like walking back in time into a royal court. Meeting the karigars whose hands made my lehenga is a memory I will carry for the rest of my life.",
    image:
      "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    fittingMethod: "Private Salon Fittings in Atelier Begum Gulberg III",
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT EXPORT
// ─────────────────────────────────────────────────────────────
export function BrandStoryInteractive() {
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-silk");
  const [activeHubIndex, setActiveHubIndex] = useState<number>(0);
  const [isSensoryActive, setIsSensoryActive] = useState<boolean>(false);

  const activeLayer =
    HEIRLOOM_LAYERS.find((l) => l.id === activeLayerId) || HEIRLOOM_LAYERS[0];
  const activeHub = DIASPORA_HUBS[activeHubIndex];

  return (
    <div className="space-y-24 md:space-y-36">
      {/* ─────────────────────────────────────────────────────────
          1. ATELIER SENSORY ATMOSPHERE BAR (Engaging Micro-Experience)
          ───────────────────────────────────────────────────────── */}
      <section className="bg-sand-100/90 border border-sand-300 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSensoryActive(!isSensoryActive)}
              aria-label={isSensoryActive ? "Mute atelier soundscape description" : "Read atelier soundscape"}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                isSensoryActive
                  ? "bg-emerald-950 text-sand-200 border-emerald-950"
                  : "bg-ivory text-emerald-900 border-sand-300 hover:border-emerald-900"
              }`}
            >
              {isSensoryActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-[0.22em] text-sand-800 font-semibold">
                Atelier Dossier &bull; Sensory Archive
              </p>
              <p className="text-xs text-charcoal/80 font-serif">
                {isSensoryActive
                  ? "Active Ambiance: The rhythmic tap of wooden adda frames, the cool touch of 80g mulberry silk, and the shimmer of real silver bullion."
                  : "Experience the quiet sanctity of our Lahore courtyard where every stitch begins."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-charcoal/60">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
            <span>Courtyard 1994 &bull; Lahore &bull; 400+ Hours of Craft</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. INTERACTIVE GARMENT INSPECTOR: THE ANATOMY OF A BEGUM HEIRLOOM
          ───────────────────────────────────────────────────────── */}
      <section id="garment-anatomy" className="scroll-mt-28">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold mb-3">
            <Layers size={11} className="text-sand-700" />
            Haute Couture Anatomy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
            The Anatomy of a Begum Heirloom
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 my-4" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
            Commercial bridalwear cuts corners where the eye cannot immediately see. In our atelier, every garment is an architectural marvel built in five sacred layers. Click through each layer to inspect the craft integrity.
          </p>
        </div>

        {/* Layer Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {HEIRLOOM_LAYERS.map((layer) => {
            const isSelected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`text-left p-4 border transition-all relative ${
                  isSelected
                    ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-md ring-1 ring-sand-400"
                    : "bg-ivory hover:bg-sand-50 text-charcoal border-sand-300/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest ${
                      isSelected ? "text-sand-300" : "text-sand-800"
                    }`}
                  >
                    LAYER {layer.number}
                  </span>
                  <span
                    className={`text-[8px] font-mono uppercase ${
                      isSelected ? "text-sand-200/60" : "text-charcoal/40"
                    }`}
                  >
                    Spec
                  </span>
                </div>
                <p
                  className={`font-serif text-xs font-semibold line-clamp-2 ${
                    isSelected ? "text-sand-100" : "text-emerald-950"
                  }`}
                >
                  {layer.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Interactive Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-ivory border-2 border-sand-300 p-6 sm:p-10 lg:p-12 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left: Technical Dossier */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 bg-sand-200 text-emerald-950 font-bold border border-sand-400/60">
                  Layer {activeLayer.number} &bull; {activeLayer.subtitle}
                </span>
                <span className="text-xs text-charcoal/50 font-mono">
                  {activeLayer.leadTime}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-emerald-950 font-serif leading-tight">
                {activeLayer.title}
              </h3>

              <div className="p-3 bg-sand-50/90 border-l-2 border-sand-600 text-xs font-mono text-sand-900">
                <span className="font-bold">Artisan Custodian:</span> {activeLayer.artisanRole}
              </div>

              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                {activeLayer.description}
              </p>

              {/* Specifications checklist */}
              <div className="space-y-2 pt-2 border-t border-sand-200">
                <p className="text-[11px] uppercase font-mono tracking-wider text-charcoal/60 font-semibold">
                  Material & Craft Specifications:
                </p>
                <ul className="space-y-2">
                  {activeLayer.specifications.map((spec, i) => (
                    <li key={i} className="text-xs text-charcoal/75 flex items-start gap-2.5">
                      <Check size={14} className="text-emerald-800 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Craft Proof Badge */}
              <div className="pt-3 flex items-center gap-2 text-xs text-emerald-900 font-serif italic">
                <ShieldCheck size={16} className="text-sand-600 shrink-0" />
                <span>Verification: {activeLayer.craftProof}</span>
              </div>
            </div>

            {/* Right: Macro Visual & Spec Badge */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-sand-300 shadow-md group">
                <Image
                  src={activeLayer.image}
                  alt={activeLayer.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sand-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sand-300 block">
                      ARCHIVAL MACRO &bull; LAYER {activeLayer.number}
                    </span>
                    <span className="font-serif text-sm font-semibold text-ivory">
                      {activeLayer.subtitle}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-sand-200/90 text-emerald-950 text-[9px] font-mono uppercase font-bold tracking-wider">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. RADICAL COMPARISON: THE BEGUM STANDARD VS COMMERCIAL BRIDAL
          ───────────────────────────────────────────────────────── */}
      <section id="the-standard" className="scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
            Radical Operational Truth
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif mt-1">
            The Begum Standard vs. Commercial Bridalwear
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
            We put our commitments in writing because real luxury is never afraid of inspection. Here is how our Lahore atelier fundamentally differs from typical bridal markets.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISON_POINTS.map((pt, idx) => (
            <div
              key={idx}
              className="bg-ivory border border-sand-300 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-sand-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-800 font-bold">
                    DIMENSION 0{idx + 1}
                  </span>
                  <span className="font-serif text-xs font-semibold text-emerald-950">
                    {pt.dimension}
                  </span>
                </div>

                {/* The Begum Way */}
                <div className="p-3.5 bg-emerald-950/5 border border-emerald-900/15 mb-3.5">
                  <div className="flex items-center gap-1.5 text-emerald-950 text-xs font-semibold font-serif mb-1">
                    <Check size={14} className="text-emerald-700 shrink-0" />
                    <span>The Begum Standard</span>
                  </div>
                  <p className="text-xs text-charcoal/85 leading-relaxed font-light">
                    {pt.begumStandard}
                  </p>
                </div>

                {/* The Commercial Market Way */}
                <div className="p-3.5 bg-sand-100/50 border border-sand-300/80 mb-4">
                  <div className="flex items-center gap-1.5 text-charcoal/60 text-xs font-semibold font-serif mb-1">
                    <X size={14} className="text-red-700/70 shrink-0" />
                    <span>Commercial Market</span>
                  </div>
                  <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                    {pt.commercialMarket}
                  </p>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="pt-3 border-t border-sand-200/80 text-[11px] text-charcoal/75 italic font-serif">
                <span className="font-semibold text-sand-900 not-italic font-mono uppercase text-[10px] block mb-0.5">
                  Why It Matters:
                </span>
                {pt.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. GLOBAL DIASPORA BRIDES: BRIDGING FOUR CONTINENTS
          ───────────────────────────────────────────────────────── */}
      <section id="global-diaspora" className="scroll-mt-28">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold mb-3">
            <Compass size={11} className="text-sand-700" />
            The Diaspora Bridge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
            Bridging 6,000 Miles with Intimacy
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 my-4" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
            A bride in London, Toronto, Dubai, or New York should never have to sacrifice the bespoke atelier experience because of geography. Explore how our remote bespoke protocol brings Lahore to you.
          </p>
        </div>

        {/* City Selectors */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {DIASPORA_HUBS.map((hub, idx) => {
            const isSelected = idx === activeHubIndex;
            return (
              <button
                key={hub.city}
                onClick={() => setActiveHubIndex(idx)}
                className={`px-4 py-2 border text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-sm"
                    : "bg-ivory hover:bg-sand-100 text-charcoal border-sand-300"
                }`}
              >
                <MapPin size={12} className={isSelected ? "text-sand-300" : "text-sand-700"} />
                <span className="font-semibold">{hub.city}</span>
                <span className={`text-[10px] ${isSelected ? "text-sand-300/80" : "text-charcoal/40"}`}>
                  ({hub.activeBrides})
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected City Diaspora Showcase */}
        <div className="bg-sand-50/70 border-2 border-sand-300 p-6 sm:p-10 lg:p-14 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-emerald-950 text-sand-200 text-[10px] font-mono uppercase tracking-widest font-bold">
                {activeHub.city}, {activeHub.country}
              </span>
              <span className="text-xs text-charcoal/50 font-mono">
                Distance: {activeHub.distanceFromLahore}
              </span>
              <span className="text-xs text-emerald-900 font-semibold font-mono">
                {activeHub.activeBrides} Served
              </span>
            </div>

            <blockquote className="font-serif text-lg sm:text-xl text-emerald-950 italic leading-snug border-l-3 border-sand-500 pl-4">
              &ldquo;{activeHub.quote}&rdquo;
            </blockquote>

            <div className="pt-2">
              <p className="font-display text-base font-semibold text-emerald-950">
                {activeHub.brideName}
              </p>
              <p className="text-xs text-sand-900 font-mono">
                Wore the {activeHub.ensemble} &bull; {activeHub.venue}
              </p>
            </div>

            <div className="pt-4 border-t border-sand-300/80 flex items-center gap-3 text-xs text-charcoal/80">
              <div className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center text-sand-800 shrink-0">
                <Check size={14} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-sand-900 font-bold block">
                  Remote Bespoke Methodology:
                </span>
                <span className="font-light">{activeHub.fittingMethod}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-sand-300 shadow-md">
              <Image
                src={activeHub.image}
                alt={`${activeHub.brideName} wearing Begum Haute Couture in ${activeHub.city}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-sand-100 flex items-center justify-between text-xs font-mono">
                <span>{activeHub.city} Wedding Folio</span>
                <span className="text-sand-300 uppercase">Archived</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. THE PROVENANCE CERTIFICATE & HEIRLOOM GUARANTEE
          ───────────────────────────────────────────────────────── */}
      <section className="bg-ivory border-2 border-sand-400 p-8 sm:p-14 lg:p-16 shadow-lg relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-950 mx-auto flex items-center justify-center text-sand-300 font-serif font-bold text-2xl border-2 border-sand-400 shadow-md">
            ب
          </div>
          <span className="text-[10px] uppercase font-mono tracking-[0.28em] text-sand-800 font-semibold block">
            Begum Archive Seal of Authenticity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif">
            The 30-Year Heirloom Guarantee &amp; Restorative Care
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 mx-auto" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light max-w-2xl mx-auto">
            When you commission a Begum bridal creation, you are not merely purchasing an outfit for a single evening. You are commissioning a museum-grade South Asian royal textile engineered to be passed down through generations.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-6 text-left border-t border-sand-300">
            <div className="p-4 bg-sand-50/70 border border-sand-300/80">
              <ScrollText size={20} className="text-sand-700 mb-2" />
              <h4 className="font-serif font-semibold text-sm text-emerald-950 mb-1">
                Registered Serial Folio
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Every creation is assigned a unique archival folio number recorded in our Lahore registry alongside its karigar signature.
              </p>
            </div>
            <div className="p-4 bg-sand-50/70 border border-sand-300/80">
              <ShieldCheck size={20} className="text-sand-700 mb-2" />
              <h4 className="font-serif font-semibold text-sm text-emerald-950 mb-1">
                Zero-Tarnish Alloy Guarantee
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Pure bullion wire tested to prevent oxidation when preserved in our complimentary handcrafted Sheesham chest.
              </p>
            </div>
            <div className="p-4 bg-sand-50/70 border border-sand-300/80">
              <HeartHandshake size={20} className="text-sand-700 mb-2" />
              <h4 className="font-serif font-semibold text-sm text-emerald-950 mb-1">
                Generational Re-Fitting
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                Generous internal seam allowances engineered so future daughters and daughters-in-law can easily re-tailor the silhouette.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
