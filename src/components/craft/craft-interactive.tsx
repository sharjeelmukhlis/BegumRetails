"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem,
  Feather,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  Layers,
  HeartHandshake,
  Camera,
  ScrollText,
  Volume2,
  VolumeX,
  Scissors,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// 1. FIVE SACRED EMBROIDERY TECHNIQUES (Interactive Studio)
// ─────────────────────────────────────────────────────────────
export interface TechniqueDetail {
  id: string;
  name: string;
  urduName: string;
  origin: string;
  timePerPiece: string;
  stitchDensity: string;
  bestOccasion: string;
  toolsUsed: string;
  description: string;
  craftSecret: string;
  image: string;
}

const TECHNIQUES_DATA: TechniqueDetail[] = [
  {
    id: "zardozi",
    name: "Zardozi",
    urduName: "زردوزی",
    origin: "Ancient Persia & Mughal Imperial Courts of Lahore & Delhi",
    timePerPiece: "8 to 14 Weeks (350+ Hours)",
    stitchDensity: "140–180 stitches per sq. inch",
    bestOccasion: "Baraat & Royal Reception Lehengas",
    toolsUsed: "Hand-forged curved Ari needle & organic cotton cording",
    description:
      "From the Persian 'zar' (gold) and 'dozi' (embroidery). Pure gold and silver bullion wire is hand-stitched over raised cotton thread padding, creating a three-dimensional architectural relief. Historically reserved exclusively for emperors and begums, this is the most majestic and slowest technique practiced in our atelier.",
    craftSecret:
      "Every motif is built on layered organic cord so the metal bullion rises from the silk like sculpted jewelry rather than lying flat.",
    image:
      "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "dabka",
    name: "Dabka & Nakshi",
    urduName: "دبکہ و نقشی",
    origin: "Generational Punjab Atelier Tradition",
    timePerPiece: "6 to 10 Weeks (250+ Hours)",
    stitchDensity: "200+ coiled wire segments per panel",
    bestOccasion: "Baraat Architectural Borders & Medallions",
    toolsUsed: "Ultra-fine steel needle & hollow spring-beaten wire",
    description:
      "Microscopic coiled metal wire—crushed and spun into a spring-like cylinder—is threaded through fine needles and stitched like a continuous bead. Because each coiled facet angles in a different direction, dabka catches ambient banquet and candle light from every perspective, creating liquid luminescence.",
    craftSecret:
      "Our ustad karigars clip the coiled wire segment by segment with hand shears at 45-degree angles to prevent the hollow bullion from collapsing.",
    image:
      "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "tilla",
    name: "Tilla",
    urduName: "تلہ دوزی",
    origin: "Kashmir Valley & Old Lahore Ateliers",
    timePerPiece: "3 to 5 Weeks (120+ Hours)",
    stitchDensity: "Fine parallel metallic couching",
    bestOccasion: "Dupatta Borders, Walima Silhouettes & Necklines",
    toolsUsed: "Fine tilla shuttle, double-twisted silk anchor thread",
    description:
      "Fine flat metallic thread couched smoothly against the silk surface. Lighter and more flexible than heavy zardozi, tilla creates a refined, understated radiance that moves with the body. It is the quiet, regal shimmer you notice only when the bride turns in motion.",
    craftSecret:
      "Tilla is never punctured through the silk; it is anchored across the surface with invisible micro-stitches of raw silk so the base fabric never puckers.",
    image:
      "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "resham",
    name: "Resham Silk Threadwork",
    urduName: "ریشم کی کڑھائی",
    origin: "South Asian Silk Route & Mughal Painting Tradition",
    timePerPiece: "5 to 8 Weeks (180+ Hours)",
    stitchDensity: "Single-filament silk shading (Sufi needlework)",
    bestOccasion: "Mehndi Florals & Luminous Nikkah Pastels",
    toolsUsed: "Hand-spun untwisted mulberry silk floss",
    description:
      "Pure silk thread with a soft, matte luster. Resham allows our karigars to 'paint' with needles, creating seamless ombré color transitions across botanical petals, nightingales, and Mughal vines. It brings warmth, emotional richness, and vibrant joy that metal alone can never achieve.",
    craftSecret:
      "Untwisted silk floss is split into single filaments by hand so color gradients blend without harsh demarcations.",
    image:
      "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "gota",
    name: "Gota Kinari & Marori",
    urduName: "گوٹہ کناری",
    origin: "Rajasthan & Punjab Festive Heritage",
    timePerPiece: "2 to 4 Weeks (80+ Hours)",
    stitchDensity: "Folded gold ribbon appliqué & twisted cords",
    bestOccasion: "Mehndi Night Celebrations & Festive Kalis",
    toolsUsed: "Woven gold ribbon, bone folders, fine hem needle",
    description:
      "Woven metallic ribbon meticulously folded, pinched into diamond (patti) shapes, and stitched into rhythmic geometric borders. Gota is feather-light and festive, designed specifically for dancing and joyful movement on the mehndi night.",
    craftSecret:
      "Each gota petal is hand-pressed over warm metal molds to give it a permanent concave bowl shape that reflects light upward toward the bride's face.",
    image:
      "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
  },
];

// ─────────────────────────────────────────────────────────────
// 2. THE ADDA FRAME ANATOMY (Interactive Blueprint)
// ─────────────────────────────────────────────────────────────
interface AddaPart {
  id: string;
  partNum: string;
  title: string;
  hindiUrdu: string;
  role: string;
  detail: string;
  icon: typeof Scissors;
}

const ADDA_PARTS: AddaPart[] = [
  {
    id: "beams",
    partNum: "01",
    title: "Sheesham Wood Tension Beams",
    hindiUrdu: "شیشم کی لکڑی کے بازو",
    role: "The Architectural Rigidity",
    detail:
      "Carved from seasoned Pakistani Sheesham hardwood. Heavy cotton ropes are lashed around the outer pegs to stretch the katan silk as tight as a drumhead. Without absolute tension, needle punctures would tear delicate silk filaments.",
    icon: Layers,
  },
  {
    id: "silk-bed",
    partNum: "02",
    title: "Unstretched 80g Mulberry Silk Bed",
    hindiUrdu: "خالص کتان سلک کا بستر",
    role: "The Pristine Canvas",
    detail:
      "The handloom silk is basted onto heavy border canvas along the adda frame edges. No synthetic backing or heat-glue stabilizers are ever ironed on; the silk retains 100% of its natural breathability and kinetic drape.",
    icon: Feather,
  },
  {
    id: "khaka",
    partNum: "03",
    title: "Perforated Parchment Khaka",
    hindiUrdu: "سوراخ دار خاکہ",
    role: "The Architectural Blueprint",
    detail:
      "Architectural Mughal jaal motifs drafted by Ustad Rahim Buksh onto heavyweight tracing paper and perforated with microscopic pin-pricks. Natural charcoal and chalk pouncing dust transfers the pattern onto silk without staining.",
    icon: ScrollText,
  },
  {
    id: "needles",
    partNum: "04",
    title: "Hand-Forged Ari & Sui Needles",
    hindiUrdu: "آری اور سوئی",
    role: "The Precision Instruments",
    detail:
      "The ustad karigar holds the ari needle above the fabric while feeding bullion wire and thread from underneath with his other hand, blind-stitching with millimeter precision at 60 stitches per minute.",
    icon: Scissors,
  },
  {
    id: "ustad-seating",
    partNum: "05",
    title: "Synchronized Karigar Posture",
    hindiUrdu: "استاد کاریگروں کی ہم آہنگی",
    role: "The Human Sanctuary",
    detail:
      "Two to four senior karigars sit cross-legged on clean white gaddi cushions on opposing sides of the adda frame. Over three months, their shared rhythm and tension consistency ensure identical embroidery density across all 16 lehenga panels.",
    icon: HeartHandshake,
  },
];

// ─────────────────────────────────────────────────────────────
// 3. 6-STAGE PRODUCTION JOURNEY & MILESTONE PROOFS
// ─────────────────────────────────────────────────────────────
interface StageDetail {
  step: string;
  title: string;
  subtitle: string;
  timeline: string;
  deliverable: string;
  paymentMilestone: string;
  description: string;
  proofType: string;
  image: string;
}

const PRODUCTION_STAGES: StageDetail[] = [
  {
    step: "01",
    title: "Bespoke Silhouette & Gouache Draft",
    subtitle: "The Conceptual Blueprint",
    timeline: "Days 1 to 7",
    deliverable: "1:1 Archival cartridge paper color render & neckline calculation",
    paymentMilestone: "Initial Creative Consultation",
    description:
      "Sherjeel Mukhlis drafts the bridal silhouette to your posture, stride, and event venue lighting. We agree on the neckline depth, kali flare radius, and motif register before any scissors touch silk.",
    proofType: "HD digital scan of Sherjeel's hand-painted gouache sketch",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    step: "02",
    title: "Fabric Sourcing & Swatch Approval",
    subtitle: "The Raw Material Audit",
    timeline: "Days 8 to 14",
    deliverable: "Physical silk swatches & pure bullion wire bundle couriered to your door",
    paymentMilestone: "30% Deposit — Order Officially Locked",
    description:
      "Base fabric is hand-loomed in pure 80-gram katan silk and dyed in small vats. Brides in London, Toronto, Dubai, and New York receive physical fabric swatches by airmail so they can touch the silk under their own lighting.",
    proofType: "Physical swatch kit + Courier tracking dossier",
    image:
      "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
  },
  {
    step: "03",
    title: "The Hand-Pounced Khaka Stencil",
    subtitle: "Geometry on Silk",
    timeline: "Weeks 3 to 4",
    deliverable: "Parchment stencil alignment across all 16 kali panels",
    paymentMilestone: "Atelier Structural Verification",
    description:
      "Motifs are perforated onto tracing parchment by master draftsmen. Using traditional kerosene-free chalk and charcoal pouncing dust, the intricate Mughal arches are transferred cleanly onto the raw katan silk.",
    proofType: "High-resolution macro photos of chalk transfer on raw silk",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    step: "04",
    title: "The 400-Hour Adda Frame Needlework",
    subtitle: "The Longest Sacred Stage",
    timeline: "Weeks 5 to 14",
    deliverable: "Pure silver dabka, zardozi bullion & basra seed pearl execution",
    paymentMilestone: "40% Mid-Production Milestone — Approved by You",
    description:
      "Your named master karigar works at the wooden adda frame. Over 300 to 450 hours of continuous needlework are placed. You receive bi-weekly recorded video updates of your artisan at work on your specific lehenga panels.",
    proofType: "Recorded HD video update + Named karigar greeting",
    image:
      "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    step: "05",
    title: "Kinetic Can-Can & Pelvic Fitting",
    subtitle: "Weightless Haute Couture Engineering",
    timeline: "Weeks 14 to 16",
    deliverable: "Anatomical weight-distribution harness & toile trial fitting",
    paymentMilestone: "Final Construction Sign-Off",
    description:
      "The 16 kali panels are hand-stitched into the circular lehenga. Our proprietary multi-tier internal can-can harness is tailored to distribute 14kg across the pelvic girdle so you glide weightlessly on your wedding night.",
    proofType: "360-degree drape mannequin video & guided video consultation",
    image:
      "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    step: "06",
    title: "VIP Audit & Sheesham Wood Dispatch",
    subtitle: "The Final Sovereign Seal",
    timeline: "Week 16",
    deliverable: "Hand-carved Sheesham bridal chest, organic muslin & Certificate of Provenance",
    paymentMilestone: "Final 30% Milestone — Due ONLY Upon Flawless Approval",
    description:
      "Sherjeel Mukhlis personally audits every hook, thread-end, and lining seam. The named karigar stitches his signature label into the hem. Your creation is enveloped in acid-free organic muslin and dispatched via insured air courier.",
    proofType: "Signed Atelier Provenance Certificate + Final steaming photos",
    image:
      "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
  },
];

// ─────────────────────────────────────────────────────────────
// 4. SPECIMEN CABINET (Sacred Raw Materials)
// ─────────────────────────────────────────────────────────────
interface SpecimenItem {
  name: string;
  provenance: string;
  badge: string;
  icon: typeof Gem;
  detail: string;
}

const SPECIMENS_DATA: SpecimenItem[] = [
  {
    name: "Pure 24k Gold & Silver Bullion",
    provenance: "Generational wire-spinners of Old Lahore & Multan",
    badge: "0% Synthetic Metal Core",
    icon: Gem,
    detail:
      "Pure silver-coated dabka and nakshi wire beaten into spring cylinders. It never turns black or oxidizes, catching stage and candlelight with authentic royal warmth.",
  },
  {
    name: "80-Gram Handloom Katan Silk",
    provenance: "Wooden pit-looms across Punjab and Sindh",
    badge: "100% Mulberry Silk",
    icon: Feather,
    detail:
      "Naturally spun mulberry cocoons handwoven with zero polyester. Possesses the high tensile strength required to support kilograms of bullion without sagging.",
  },
  {
    name: "Basra Seed Pearls & Semi-Precious Stones",
    provenance: "Natural sea pearls & uncut gemstone lapidaries",
    badge: "Double-Twisted Silk Knots",
    icon: Sparkles,
    detail:
      "Hand-anchored with double-spun silk thread so no pearl can loosen during your celebration. Real mother-of-pearl cabochons in embroidered metallic bezels.",
  },
  {
    name: "Hand-Carved Sheesham Bridal Chest",
    provenance: "Chiniot woodcraft & organic unbleached muslin",
    badge: "30-Year Heirloom Vault",
    icon: ShieldCheck,
    detail:
      "Delivered in a carved Pakistani Sheesham wood chest lined with unbleached organic muslin, protecting fine silver wire from humidity, light, and oxidation.",
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT EXPORT
// ─────────────────────────────────────────────────────────────
export function CraftInteractive() {
  const [activeTechniqueId, setActiveTechniqueId] = useState<string>("zardozi");
  const [activeAddaPartId, setActiveAddaPartId] = useState<string>("beams");
  const [activeStageStep, setActiveStageStep] = useState<string>("04");
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const activeTechnique =
    TECHNIQUES_DATA.find((t) => t.id === activeTechniqueId) || TECHNIQUES_DATA[0];
  const activeAddaPart =
    ADDA_PARTS.find((p) => p.id === activeAddaPartId) || ADDA_PARTS[0];
  const activeStage =
    PRODUCTION_STAGES.find((s) => s.step === activeStageStep) || PRODUCTION_STAGES[3];

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ─────────────────────────────────────────────────────────
          0. ATELIER SENSORY SOUNDSCAPE BAR
          ───────────────────────────────────────────────────────── */}
      <section className="bg-sand-100/90 border border-sand-300 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAudioActive(!isAudioActive)}
              aria-label={isAudioActive ? "Mute workshop ambiance" : "Play workshop ambiance"}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                isAudioActive
                  ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-sm"
                  : "bg-ivory text-emerald-900 border-sand-300 hover:border-emerald-900"
              }`}
            >
              {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-[0.22em] text-sand-800 font-semibold">
                Atelier Soundscape &bull; Lahore Workshop
              </p>
              <p className="text-xs text-charcoal/80 font-serif">
                {isAudioActive
                  ? "Atelier Ambience Active: The rhythmic metallic tapping of wooden adda frames, the whisper of pure mulberry silk, and the quiet recitation of Sufi poetry."
                  : "Click to explore the soundscape of generational karigars working at wooden adda frames in Lahore."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-charcoal/60">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
            <span>Adda Frame N° 12 &bull; 400+ Hours &bull; Real Names Stitched</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          1. INTERACTIVE TECHNIQUE STUDIO: 5 EMBROIDERY LANGUAGES
          ───────────────────────────────────────────────────────── */}
      <section id="the-techniques" className="scroll-mt-28">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold mb-3">
            <Sparkles size={11} className="text-sand-700" />
            Master Needlework Studio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
            Five Embroidery Languages of Mughal Nobility
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 my-4" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
            Every bridal technique in our atelier possesses its own historical register, needle geometry, and light reflection. Click through each technique to inspect its macro texture, stitch density, and royal origin.
          </p>
        </div>

        {/* Technique Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {TECHNIQUES_DATA.map((t) => {
            const isSelected = t.id === activeTechniqueId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTechniqueId(t.id)}
                className={`text-left p-4 border transition-all relative ${
                  isSelected
                    ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-md ring-1 ring-sand-400"
                    : "bg-ivory hover:bg-sand-50 text-charcoal border-sand-300/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[9px] font-mono font-bold tracking-widest uppercase ${
                      isSelected ? "text-sand-300" : "text-sand-800"
                    }`}
                  >
                    {t.urduName}
                  </span>
                  <span
                    className={`text-[8px] font-mono uppercase ${
                      isSelected ? "text-sand-200/60" : "text-charcoal/40"
                    }`}
                  >
                    Artisan Spec
                  </span>
                </div>
                <p
                  className={`font-serif text-sm font-semibold ${
                    isSelected ? "text-sand-100" : "text-emerald-950"
                  }`}
                >
                  {t.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Technique Detailed Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTechnique.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-ivory border-2 border-sand-300 p-6 sm:p-10 lg:p-12 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left: Technique Specification Dossier */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 bg-sand-200 text-emerald-950 font-bold border border-sand-400/60">
                  {activeTechnique.urduName} &bull; {activeTechnique.name}
                </span>
                <span className="text-xs text-charcoal/50 font-mono">
                  Origin: {activeTechnique.origin}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-emerald-950 font-serif leading-tight">
                {activeTechnique.name} Haute Couture Mastery
              </h3>

              <div className="grid grid-cols-2 gap-3 p-3 bg-sand-50/90 border border-sand-200 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-charcoal/50 uppercase block">Time per Piece:</span>
                  <span className="font-bold text-emerald-950">{activeTechnique.timePerPiece}</span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal/50 uppercase block">Stitch Density:</span>
                  <span className="font-bold text-emerald-950">{activeTechnique.stitchDensity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal/50 uppercase block">Best Suited Occasion:</span>
                  <span className="font-bold text-emerald-950">{activeTechnique.bestOccasion}</span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal/50 uppercase block">Specialist Tools:</span>
                  <span className="font-bold text-emerald-950">{activeTechnique.toolsUsed}</span>
                </div>
              </div>

              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                {activeTechnique.description}
              </p>

              {/* Craft Secret Highlight */}
              <div className="p-4 bg-sand-100/70 border-l-3 border-emerald-900 text-xs font-serif italic text-emerald-950">
                <span className="font-bold not-italic font-mono uppercase text-[10px] text-sand-900 block mb-0.5">
                  Atelier Craft Secret:
                </span>
                &ldquo;{activeTechnique.craftSecret}&rdquo;
              </div>
            </div>

            {/* Right: Macro Needlework Imagery */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-sand-300 shadow-md group">
                <Image
                  src={activeTechnique.image}
                  alt={activeTechnique.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sand-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sand-300 block">
                      MACRO NEEDLEWORK ARCHIVE
                    </span>
                    <span className="font-serif text-sm font-semibold text-ivory">
                      {activeTechnique.name} ({activeTechnique.urduName})
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-sand-200/90 text-emerald-950 text-[9px] font-mono uppercase font-bold tracking-wider">
                    Authentic
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. THE ADDA FRAME ANATOMY: THE WOODEN SANCTUARY
          ───────────────────────────────────────────────────────── */}
      <section id="adda-anatomy" className="scroll-mt-28">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold mb-3">
            <Layers size={11} className="text-sand-700" />
            The Wooden Sanctuary
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
            The Anatomy of the Adda Frame
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 my-4" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
            Before computerized embroidery machines existed, royal Mughal courts created bridal masterpieces on horizontal wooden tension frames known as the <em>Adda</em>. Here is how our Lahore artisans keep this sacred apparatus alive.
          </p>
        </div>

        {/* Blueprint Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {ADDA_PARTS.map((p) => {
            const isSelected = p.id === activeAddaPartId;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActiveAddaPartId(p.id)}
                className={`p-4 text-left border transition-all ${
                  isSelected
                    ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-md ring-1 ring-sand-400"
                    : "bg-ivory hover:bg-sand-50 text-charcoal border-sand-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-sand-300" : "text-sand-800"}`}>
                    PART {p.partNum}
                  </span>
                  <Icon size={14} className={isSelected ? "text-sand-300" : "text-sand-600"} />
                </div>
                <p className="font-serif text-xs font-semibold line-clamp-1">{p.title}</p>
                <span className={`text-[9px] font-mono block mt-1 ${isSelected ? "text-sand-200/70" : "text-charcoal/50"}`}>
                  {p.hindiUrdu}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Adda Part Detailed Explainer */}
        <div className="bg-sand-50/70 border-2 border-sand-300 p-6 sm:p-10 lg:p-12 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 bg-emerald-950 text-sand-200 uppercase font-bold tracking-wider">
                Adda Component {activeAddaPart.partNum}
              </span>
              <span className="text-sand-800 font-semibold">{activeAddaPart.hindiUrdu}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif">
              {activeAddaPart.title}
            </h3>

            <p className="text-xs font-mono uppercase tracking-wider text-sand-900 font-semibold">
              Crucial Craft Role: {activeAddaPart.role}
            </p>

            <p className="text-sm text-charcoal/80 leading-relaxed font-light">
              {activeAddaPart.detail}
            </p>

            <div className="pt-2 border-t border-sand-300 flex items-center gap-2 text-xs font-mono text-emerald-950">
              <CheckCircle2 size={15} className="text-emerald-800 shrink-0" />
              <span>Preserves 100% hand tension with zero machine motor vibration.</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-sand-300 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85"
                alt="Karigars at the wooden adda frame in Lahore"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-sand-200 text-[10px] font-mono flex items-center justify-between">
                <span>Atelier Adda Frame Archive &bull; Lahore</span>
                <span className="text-sand-300 font-semibold uppercase">Tension Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. 6-STAGE PRODUCTION JOURNEY & PROOF VAULT
          ───────────────────────────────────────────────────────── */}
      <section id="the-journey" className="scroll-mt-28">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold mb-3">
            <Clock size={11} className="text-sand-700" />
            From Thread to Gown
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
            Six Stages of Haute Couture Creation
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 my-4" />
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
            We don&apos;t ask for blind trust; we provide photographic and recorded video proof at every milestone before payments are released. Click through each stage to view deliverables.
          </p>
        </div>

        {/* Stage Timeline Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {PRODUCTION_STAGES.map((s) => {
            const isSelected = s.step === activeStageStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStageStep(s.step)}
                className={`text-left p-3.5 border transition-all ${
                  isSelected
                    ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-md ring-1 ring-sand-400"
                    : "bg-ivory hover:bg-sand-50 text-charcoal border-sand-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-sand-300" : "text-sand-800"}`}>
                    STAGE {s.step}
                  </span>
                  <span className={`text-[8px] font-mono ${isSelected ? "text-sand-200/60" : "text-charcoal/40"}`}>
                    {s.timeline}
                  </span>
                </div>
                <p className="font-serif text-xs font-semibold line-clamp-1">{s.title}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="bg-ivory border-2 border-sand-300 p-6 sm:p-10 lg:p-12 shadow-sm grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 bg-sand-200 text-emerald-950 font-bold border border-sand-400/60">
                Stage {activeStage.step} &bull; {activeStage.subtitle}
              </span>
              <span className="text-xs text-charcoal/50 font-mono">
                Duration: {activeStage.timeline}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif">
              {activeStage.title}
            </h3>

            <div className="p-3 bg-emerald-950/5 border border-emerald-900/15 text-xs font-mono text-emerald-950">
              <span className="font-bold">Payment Protocol:</span> {activeStage.paymentMilestone}
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed font-light">
              {activeStage.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-sand-200 text-xs">
              <p className="font-mono text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
                Bride&apos;s Deliverable:
              </p>
              <p className="text-charcoal/80 flex items-start gap-2">
                <Check size={14} className="text-emerald-800 shrink-0 mt-0.5" />
                <span>{activeStage.deliverable}</span>
              </p>
            </div>

            <div className="pt-3 flex items-center gap-2 text-xs text-emerald-900 font-serif italic">
              <Camera size={15} className="text-sand-600 shrink-0" />
              <span>Inspection Proof: {activeStage.proofType}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-sand-300 shadow-md">
              <Image
                src={activeStage.image}
                alt={activeStage.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-sand-200 text-[10px] font-mono flex items-center justify-between">
                <span>Production Dossier &bull; Stage {activeStage.step}</span>
                <span className="text-sand-300 font-semibold uppercase">Milestone Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. THE RAW SPECIMEN VAULT (Uncompromising Materials)
          ───────────────────────────────────────────────────────── */}
      <section id="materials-vault" className="scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
            Zero Synthetic Compromise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1">
            Inside the Raw Specimen Cabinet
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 mx-auto my-3" />
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
            Four pure elemental materials that separate true Mughal haute couture from mass commercial bridalwear.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPECIMENS_DATA.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className="bg-ivory border border-sand-300 p-6 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-sand-200">
                    <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-sand-800 group-hover:bg-emerald-950 group-hover:text-sand-200 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-sand-800 bg-sand-100/80 px-2 py-0.5 border border-sand-300">
                      {spec.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-emerald-950 font-serif leading-snug mb-1">
                    {spec.name}
                  </h3>
                  <p className="text-[11px] font-mono text-sand-800 uppercase tracking-wider mb-3">
                    Provenance: {spec.provenance}
                  </p>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    {spec.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. THE ARTISAN DIGNITY CHARTER (Ethics & Transparency)
          ───────────────────────────────────────────────────────── */}
      <section className="bg-emerald-950 text-sand-100 p-8 sm:p-14 lg:p-16 border-2 border-emerald-900 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
          <span className="font-display text-[140px] font-serif font-black text-ivory">
            دستکاری
          </span>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-900 border border-sand-400/50 mx-auto flex items-center justify-center text-sand-300 font-serif font-bold text-2xl shadow-md">
            د
          </div>
          <span className="text-[10px] uppercase font-mono tracking-[0.28em] text-sand-300 font-semibold block">
            The Moral Foundation of Begum
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory font-serif">
            The Begum Artisan Dignity Charter
          </h2>
          <div className="w-16 h-0.5 bg-sand-400 mx-auto" />
          <p className="text-sm sm:text-base text-sand-100/80 leading-relaxed font-light max-w-2xl mx-auto">
            We reject the exploitative secrecy of traditional fashion houses. Luxury that comes at the cost of artisan exploitation is not luxury—it is theft. Every Begum bridal commission honors the human hands behind it.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-6 text-left border-t border-sand-400/20">
            <div className="p-5 bg-emerald-900/60 border border-sand-400/20">
              <span className="text-xs font-mono uppercase tracking-wider text-sand-300 font-bold block mb-1">
                Pillar I &bull; 3x Living Wages
              </span>
              <p className="text-xs text-sand-100/75 leading-relaxed font-light">
                Karigars set their own commission rates at 3x the regional average, ending the predatory piece-rate bazaar system.
              </p>
            </div>
            <div className="p-5 bg-emerald-900/60 border border-sand-400/20">
              <span className="text-xs font-mono uppercase tracking-wider text-sand-300 font-bold block mb-1">
                Pillar II &bull; Stitched Credit
              </span>
              <p className="text-xs text-sand-100/75 leading-relaxed font-light">
                Every lehenga carries the stitched name, city, and photo of the master artisan inside the inner silk hem lining.
              </p>
            </div>
            <div className="p-5 bg-emerald-900/60 border border-sand-400/20">
              <span className="text-xs font-mono uppercase tracking-wider text-sand-300 font-bold block mb-1">
                Pillar III &bull; Family Healthcare
              </span>
              <p className="text-xs text-sand-100/75 leading-relaxed font-light">
                Permanent healthcare and generational apprenticeship stipends ensure master techniques pass forward to sons and daughters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
