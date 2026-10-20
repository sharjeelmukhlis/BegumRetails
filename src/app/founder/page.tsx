"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import {
  Crown,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Feather,
  Gem,
  CheckCircle2,
  Quote,
  Truck,
  ChevronRight,
  Check,
  Compass,
  Sparkle,
} from "lucide-react";

// Four Sacred Stages of Sherjeel Mukhlis's Commission Blueprint
const CRAFT_STAGES = [
  {
    id: "stage-1",
    num: "01",
    phase: "Phase I: The Proportion & Draft",
    title: "Ink & Gouache Architectural Silhouette",
    leadTime: "Days 1 — 7",
    auditedBy: "Sherjeel Mukhlis (Personal Consultation)",
    desc: "Every bridal commission begins with Sherjeel Mukhlis sketching directly onto archival cartridge paper. Rather than forcing a bride into standard block patterns, the silhouette is tailored to her posture, stride, and event venue lighting. Gouache wash drafts are shared before any fabric is cut.",
    deliverables: [
      "Custom 1:1 gouache color render",
      "Exact neckline & flare angle calculation",
      "Physical fabric swatch bundle sent via courier",
    ],
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "stage-2",
    num: "02",
    phase: "Phase II: The Stencil Blueprint",
    title: "The Perforated Parchment Khaka",
    leadTime: "Days 8 — 20",
    auditedBy: "Ustad Rahim Buksh & Sherjeel Mukhlis",
    desc: "The geometric motif layout is drafted by hand and needle-perforated onto heavyweight tracing parchment. Using traditional charcoal and chalk pouncing dust, the intricate Mughal jaal is transferred directly onto raw, unstretched 80-gram handloom katan silk.",
    deliverables: [
      "100% millimeter motif alignment across 16 panels",
      "Authentic Mughal imperial arch symmetry",
      "Zero computerized machine stamping",
    ],
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "stage-3",
    num: "03",
    phase: "Phase III: The 400-Hour Needlework",
    title: "The Handloom Adda Frame Zardozi",
    leadTime: "Weeks 4 — 14",
    auditedBy: "Named Master Karigars (Stitched Attribution)",
    desc: "Two to four senior karigars sit simultaneously at a tension-adjusted wooden adda frame. Over 400 hours of continuous needlework are applied using pure silver bullion dabka wire, hand-spun resham, natural seed pearls, and French knots.",
    deliverables: [
      "Real metallic bullion (tested for zero oxidation)",
      "Named karigar stitch credit in the hem lining",
      "Bi-weekly HD recorded video progress updates",
    ],
    image:
      "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "stage-4",
    num: "04",
    phase: "Phase IV: Anatomical Architecture",
    title: "Kinetic Can-Can & Final VIP Audit",
    leadTime: "Weeks 15 — 16",
    auditedBy: "Sherjeel Mukhlis (Personal Fitting)",
    desc: "A heavy bridal ensemble must never feel like armor. Begum's proprietary multi-tiered can-can armature distributes 12–18 kilograms of hand-embellished silk evenly across the pelvic girdle, allowing the bride to walk, turn, and sit with weightless grace.",
    deliverables: [
      "Internal weight-relief pelvic harness",
      "Acid-free organic muslin heirloom wrapping",
      "Personal delivery & steaming option nationwide",
    ],
    image:
      "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
  },
];

// The Raw Specimen Cabinet — Sherjeel's Sacred Materials
const SPECIMENS = [
  {
    icon: Gem,
    title: "Pure 24k Gold & Silver Bullion",
    tagline: "Beaten Metallic Wire",
    desc: "We exclusively commission pure silver-coated metallic dabka and nakshi wire from generational metal-spinners. Unlike cheap plastic-core threads, our bullion catches candle and stage light with royal luminescence and never oxidizes.",
    badge: "0% Synthetic Metal",
  },
  {
    icon: Feather,
    title: "80-Gram Pure Katan Silk",
    tagline: "Pit-Loom Handwoven",
    desc: "Spun from raw mulberry cocoons on traditional wooden pit-looms across Punjab and Sindh. Pure katan breathes effortlessly, drapes with liquid grace, and possesses natural tensile strength to carry kilograms of zardozi without tearing.",
    badge: "100% Pure Mulberry",
  },
  {
    icon: Sparkle,
    title: "Natural Seed Pearls & Stones",
    tagline: "Uncut Heirloom Beading",
    desc: "Every floral bud in our jaal is hand-anchored with genuine basra-style micro seed pearls, real mother-of-pearl cabochons, and semi-precious uncut stones, secured with double-twisted silk thread that will never unravel.",
    badge: "Hand-Anchored Micro Pearls",
  },
  {
    icon: ShieldCheck,
    title: "Acid-Free Sheesham Wood Chest",
    tagline: "Generational Preservation",
    desc: "Every bridal masterpiece arrives resting in a hand-carved Sheesham wood bridal chest, enveloped in unbleached organic muslin to allow the silk to breathe while shielding fine silver wire from humidity and atmospheric pollutants.",
    badge: "30-Year Heirloom Guarantee",
  },
];

// The Five Commandments of Begum Haute Couture
const FIVE_COMMANDMENTS = [
  {
    num: "I",
    title: "Never a Faceless Garment",
    subtitle: "Named Karigar Attribution",
    desc: "Every bridal piece carries the stitched name, city, and years of heritage of the master artisan who spent 400+ hours at the embroidery frame. We celebrate craftsmen; we never hide them behind corporate silence.",
  },
  {
    num: "II",
    title: "100% Pure Loom Silk",
    subtitle: "Zero Synthetic Blends",
    desc: "We strictly refuse polyester, nylon, and synthetic tissue. Only pure 80-gram katan silk, hand-spun raw silk, and organic organza are permitted across our handlooms in Punjab and Sindh.",
  },
  {
    num: "III",
    title: "Dignity Over Display",
    subtitle: "Kinetic Architecture",
    desc: "A bride should never feel trapped in a stiff, claustrophobic costume. Our internal can-can armatures distribute weight anatomically so she glides with effortless poise and majesty.",
  },
  {
    num: "IV",
    title: "Absolute Milestone Transparency",
    subtitle: "30 / 40 / 30 Staged Milestones",
    desc: "Brides pay a 30% booking deposit, 40% only after approving recorded HD video proof of the needlework, and 30% upon final measurement audit. Trust is earned, not demanded.",
  },
  {
    num: "V",
    title: "The Heirloom Guarantee",
    subtitle: "Generational Preservation",
    desc: "Each ensemble is delivered in a handcrafted wooden bridal chest lined with acid-free organic muslin, protecting pure gold and silver bullion zardozi from oxidation for decades.",
  },
];

// 30 Years of Craft Timeline
const TIMELINE = [
  {
    year: "1994",
    title: "The Courtyard in Old Lahore",
    location: "Mochi Gate, Old Walled City",
    desc: "Sherjeel commissions his first three master karigars in an airy brick courtyard in Lahore, crafting bespoke bridal farshis passed along exclusively by word of mouth among bridal families.",
  },
  {
    year: "2003",
    title: "The First Overseas Commission",
    location: "Manchester, United Kingdom",
    desc: "A diaspora bride commissions a full Baraat lehenga sight unseen, trusting physical silk fabric swatches sent by airmail and weekly hand-developed 35mm progress photographs.",
  },
  {
    year: "2008",
    title: "Flagship Couture Atelier",
    location: "Gulberg III, Lahore",
    desc: "Begum moves beyond embroidery-only commissions into a comprehensive bridal atelier—integrating bespoke pattern cutting, internal can-can engineering, and private salon fittings under one roof.",
  },
  {
    year: "2014",
    title: "The Artisan Dignity Charter",
    location: "Lahore & Multan Workshops",
    desc: "Sherjeel establishes fair living-wage standards (3x regional averages) and permanent healthcare provisions for over thirty generational artisan families.",
  },
  {
    year: "2020",
    title: "The Remote Fitting Protocol",
    location: "Global Virtual Salon",
    desc: "Formalized millimeter-accurate live WhatsApp video consultations, allowing brides in London, Toronto, Dubai, and New York to be guided through measurements directly by Begum stylists.",
  },
  {
    year: "Today",
    title: "The 3D Virtual Atelier & Nationwide Concierge",
    location: "Atelier Begum, Pakistan & Worldwide",
    desc: "Blending ancient Mughal zardozi craftsmanship with interactive 3D alteration canvases and real-time atelier dossiers, keeping heritage alive for the modern global bride.",
  },
];

export default function FounderPage() {
  const [activeStageId, setActiveStageId] = useState<string>("stage-1");
  const activeStage = CRAFT_STAGES.find((s) => s.id === activeStageId) || CRAFT_STAGES[0];

  const curatedMasterpieces = products.filter((p) =>
    ["zari-dream-lehenga", "ruby-court-lehenga", "resham-noor-lehenga"].includes(p.slug),
  );

  return (
    <div className="bg-[#FAF7F2] pt-28 md:pt-34 pb-32 text-charcoal selection:bg-sand-300 selection:text-emerald-950">
      <Container>
        {/* Luxury Archival Header Bar */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] uppercase font-mono tracking-[0.24em] text-charcoal/60 border-b border-sand-300/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sand-600 inline-block animate-pulse" />
            <span>ARCHIVE FOLIO N° 01 &bull; ATELIER BEGUM LAHORE</span>
          </div>
          <div className="flex items-center gap-4 text-charcoal/45">
            <span>31.5204° N, 74.3587° E</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">ESTABLISHED 1994</span>
          </div>
        </div>

        {/* Breadcrumb Bar */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-6xl mx-auto mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-charcoal/50"
        >
          <Link href="/" className="hover:text-emerald-900 transition-colors">
            Atelier
          </Link>
          <ChevronRight size={11} className="text-sand-400" />
          <Link href="/team" className="hover:text-emerald-900 transition-colors">
            Our Team
          </Link>
          <ChevronRight size={11} className="text-sand-400" />
          <span className="text-emerald-950 font-semibold">
            Sherjeel Mukhlis — Founder & Creative Director
          </span>
        </nav>

        {/* 1. CINEMATIC HERO SECTION: Haute Couture Editorial */}
        <div className="max-w-6xl mx-auto mb-20 bg-ivory border-2 border-sand-300 shadow-md relative overflow-hidden">
          {/* Subtle Archival Watermark */}
          <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] select-none">
            <span className="font-display text-[160px] font-serif font-black text-emerald-950">
              BEGUM
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-stretch p-6 sm:p-12 lg:p-16">
            {/* Left: Portrait & Archival Provenance (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="relative group">
                {/* Decorative Double Border Frame */}
                <div className="absolute -inset-2 border border-sand-400/60 pointer-events-none" />
                <div className="relative aspect-[3/4] overflow-hidden bg-sand-100 border border-sand-300 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85"
                    alt="Sherjeel Mukhlis, Founder & Creative Director of Begum Haute Couture Lahore"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  {/* Provenance Badge */}
                  <div className="absolute bottom-3 left-3 bg-emerald-950/90 backdrop-blur-md text-sand-200 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] border border-sand-400/40 shadow-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-400" />
                    <span>Sherjeel Mukhlis &bull; Lahore &bull; Est. 1994</span>
                  </div>
                </div>
              </div>

              {/* Studio Micro-Inspection Card */}
              <div className="mt-6 p-4 bg-sand-50/80 border border-sand-300/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 border border-sand-400">
                  <Image
                    src="https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=400&q=80"
                    alt="Master Karigar working at Begum atelier"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-emerald-950 font-serif">
                    Atelier Gulberg III, Lahore
                  </p>
                  <p className="text-[11px] text-charcoal/65 mt-0.5">
                    Every commission overseen personally by Sherjeel Mukhlis & senior ustad karigars.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Personal Manifesto & Editorial Accents (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-900 font-semibold shadow-xs">
                    <Crown size={12} className="text-sand-600" />
                    Founder & Creative Director
                  </span>
                  <span className="text-xs text-charcoal/50 font-mono">
                    30 Years of Uncompromising Haute Couture
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-emerald-950 font-serif leading-[1.12] tracking-tight">
                  &ldquo;We don&apos;t manufacture bridalwear; we preserve centuries of royal dignity and handcraft an heirloom for the woman who commands her destiny.&rdquo;
                </h1>

                <div className="flex items-center gap-3 pt-1">
                  <span className="font-display text-2xl text-sand-800 font-serif italic">
                    — Sherjeel Mukhlis
                  </span>
                  <span className="text-xs text-charcoal/40 font-mono uppercase tracking-wider">
                    Founder, Begum Haute Couture
                  </span>
                </div>

                <div className="w-20 h-0.5 bg-gradient-to-r from-sand-500 to-transparent" />

                <p className="text-sm text-charcoal/75 leading-relaxed font-light">
                  When I established Begum in 1994 in the historic heart of Lahore, commercial bridal markets were beginning to abandon traditional artisans for computerized machine embroidery and synthetic polyester. I made a solemn vow that Begum would stand as an eternal sanctuary for authentic craft: every stitch guided by the human hand, every thread pure silver and silk, and every artisan credited by name.
                </p>
              </div>

              {/* 4 Museum Benchmark Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-sand-300/80 text-center">
                <div className="p-3 bg-sand-50/60 border border-sand-300/60">
                  <span className="font-display text-2xl lg:text-3xl text-emerald-950 font-serif font-bold block">
                    1994
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 mt-1 block">
                    Founded in Lahore
                  </span>
                </div>
                <div className="p-3 bg-sand-50/60 border border-sand-300/60">
                  <span className="font-display text-2xl lg:text-3xl text-emerald-950 font-serif font-bold block">
                    30+
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 mt-1 block">
                    Master Karigars
                  </span>
                </div>
                <div className="p-3 bg-sand-50/60 border border-sand-300/60">
                  <span className="font-display text-2xl lg:text-3xl text-emerald-950 font-serif font-bold block">
                    1,800+
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 mt-1 block">
                    Royal Brides
                  </span>
                </div>
                <div className="p-3 bg-sand-50/60 border border-sand-300/60">
                  <span className="font-display text-2xl lg:text-3xl text-emerald-950 font-serif font-bold block">
                    400+
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/60 mt-1 block">
                    Hours per Piece
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-emerald-950 hover:bg-emerald-900 text-sand-100 text-xs uppercase tracking-[0.2em] font-semibold py-6 shadow-md"
                  asChild
                >
                  <a
                    href="https://wa.me/923209988777?text=Hello%20Sherjeel%20Mukhlis%2C%20I%20would%20like%20to%20consult%20regarding%20a%20bridal%20couture%20commission."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} className="mr-2 text-sand-400" />
                    Consult Sherjeel on WhatsApp
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sand-400 text-emerald-950 hover:bg-sand-100 text-xs uppercase tracking-[0.2em] py-6"
                  asChild
                >
                  <a href="#manifesto-letter">
                    Read the Founder&apos;s Letter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE SECTION: Sherjeel Mukhlis's 4-Phase Commission Blueprint */}
        <div className="max-w-6xl mx-auto mb-24 bg-ivory border border-sand-300 p-6 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-800 font-semibold mb-2">
              <Compass size={11} className="text-sand-600" />
              The Creative Direction
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif">
              Sherjeel Mukhlis&apos;s 4-Phase Commission Blueprint
            </h2>
            <div className="w-12 h-0.5 bg-sand-400 mx-auto my-3" />
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
              From the initial private gouache sketch to the final weight-relieved kinetic fit. Click through the four sacred stages overseen by Sherjeel Mukhlis.
            </p>
          </div>

          {/* Interactive Phase Selectors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {CRAFT_STAGES.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`text-left p-3.5 sm:p-4 border transition-all relative ${
                    isSelected
                      ? "bg-emerald-950 text-ivory border-emerald-950 shadow-md ring-1 ring-sand-400"
                      : "bg-sand-50/80 hover:bg-sand-100 text-charcoal border-sand-300/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-widest ${
                        isSelected ? "text-sand-300" : "text-sand-800"
                      }`}
                    >
                      {stage.num}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider ${
                        isSelected ? "text-sand-200/70" : "text-charcoal/40"
                      }`}
                    >
                      {stage.leadTime}
                    </span>
                  </div>
                  <p
                    className={`font-serif text-xs sm:text-sm font-semibold line-clamp-1 ${
                      isSelected ? "text-sand-100" : "text-emerald-950"
                    }`}
                  >
                    {stage.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-sand-50/70 border border-sand-300/90 p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 bg-sand-200 text-emerald-950 font-bold border border-sand-400/50">
                    {activeStage.phase}
                  </span>
                  <span className="text-xs text-charcoal/50 font-mono">
                    Lead time: {activeStage.leadTime}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif">
                  {activeStage.title}
                </h3>

                <p className="text-xs text-sand-800 font-mono flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={14} className="text-sand-600" />
                  Audited by: {activeStage.auditedBy}
                </p>

                <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                  {activeStage.desc}
                </p>

                <div className="pt-2 space-y-2 border-t border-sand-300/80">
                  <p className="text-[11px] uppercase font-mono tracking-wider text-charcoal/60 font-semibold">
                    Key Quality Deliverables:
                  </p>
                  <ul className="space-y-1.5">
                    {activeStage.deliverables.map((item, i) => (
                      <li key={i} className="text-xs text-charcoal/75 flex items-start gap-2">
                        <Check size={14} className="text-sand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
                  <div className="absolute bottom-3 left-3 right-3 text-sand-200 text-[11px] font-mono flex items-center justify-between">
                    <span>Atelier Dossier &bull; {activeStage.num}</span>
                    <span className="text-sand-300 font-semibold uppercase">Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. THE RAW SPECIMEN CABINET: Materials Sherjeel Refuses to Compromise On */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
              The Pure Elemental Standard
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1">
              Inside Sherjeel Mukhlis&apos;s Specimen Cabinet
            </h2>
            <div className="w-12 h-0.5 bg-sand-400 mx-auto my-3" />
            <p className="text-xs sm:text-sm text-charcoal/65 leading-relaxed font-light">
              Four sacred materials that separate high-couture bridal heirlooms from commercial mass production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIMENS.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-ivory border border-sand-300 p-6 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-sand-200">
                      <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-sand-700 group-hover:bg-emerald-950 group-hover:text-sand-200 transition-colors">
                        <IconComp size={18} />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-sand-800 bg-sand-100/80 px-2 py-0.5 border border-sand-300">
                        {s.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-lg text-emerald-950 font-serif leading-snug mb-1">
                      {s.title}
                    </h3>
                    <p className="text-[11px] font-mono text-sand-800 uppercase tracking-wider mb-3">
                      {s.tagline}
                    </p>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. THE FOUNDER'S LETTER: Archival Deckle-Edge Parchment */}
        <div
          id="manifesto-letter"
          className="max-w-4xl mx-auto mb-24 bg-[#FCFAF6] border-2 border-sand-400 p-8 sm:p-16 lg:p-20 shadow-xl relative"
        >
          {/* Ornate Corner Flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-sand-600" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-sand-600" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-sand-600" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-sand-600" />

          {/* Letterhead */}
          <div className="text-center pb-8 border-b border-sand-300/80">
            <Quote size={32} className="mx-auto text-sand-600 mb-3" />
            <span className="text-[10px] uppercase font-mono tracking-[0.28em] text-sand-800 font-semibold block">
              Personal Archival Letter
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1">
              Why I Built an Atelier of Dignity
            </h2>
            <p className="text-xs text-charcoal/50 font-mono mt-1">
              From the Desk of Sherjeel Mukhlis &bull; Gulberg, Lahore
            </p>
          </div>

          {/* Letter Body */}
          <div className="pt-8 space-y-6 text-sm sm:text-base text-charcoal/80 leading-relaxed font-serif">
            <p>
              <span className="float-left text-5xl font-display font-serif text-emerald-950 pr-3 pt-1 leading-none">
                M
              </span>
              y reverence for bridal couture began in the historic textile alleys of Old Lahore. As a student of textile geometry and Mughal architectural motifs, I spent hours watching master craftsmen work in sunlit brick courtyards near Mochi Gate. In their hands, fine silver bullion wire was not just material—it was devotion, patience, and history woven into pure silk.
            </p>
            <p>
              Yet, as years progressed, I witnessed commercial bridal markets dilute this art. Brands began replacing pure katan silk with synthetic polyester, and intricate hand-zardozi with high-speed computerized machine stamps. The master karigars—men whose families had practiced this sacred craft for five generations—were being turned into nameless, underpaid piece-rate workers.
            </p>
            <p className="p-4 bg-sand-100/60 border-l-2 border-sand-600 italic text-emerald-950 font-medium">
              &ldquo;I founded Begum to prove that a high-fashion house could thrive on absolute artisan dignity and uncompromising craft honesty.&rdquo;
            </p>
            <p>
              The name <em>Begum</em> was chosen with great care. In Mughal history, a Begum was never a passive figure; she was sovereign, composed, and commanded the moment through grace. When a bride enters her wedding hall wearing Begum, she must not feel weighed down by a stiff, theatrical costume. She must feel elevated, poised, and dignified.
            </p>
            <p>
              To this day, every bride who commissions a piece from Begum has her measurements personally audited in our Lahore studio. Every karigar sits at an individual wooden frame, credited by name. And every garment is engineered to outlast our lifetimes as a cherished family heirloom.
            </p>

            {/* Signature & Seal Block */}
            <div className="pt-8 border-t border-sand-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-display text-2xl text-emerald-950 font-serif font-bold tracking-tight">
                  Sherjeel Mukhlis
                </p>
                <p className="text-xs text-charcoal/50 font-mono mt-0.5">
                  Founder & Creative Director, Begum Haute Couture
                </p>
                <p className="text-xs text-sand-800 font-mono mt-0.5">
                  Flagship Atelier: Gulberg III, Lahore, Pakistan
                </p>
              </div>

              {/* Embossed Wax Seal Badge */}
              <div className="flex items-center gap-3 bg-sand-100/90 border border-sand-400 p-2.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center text-sand-300 font-serif font-bold text-lg border border-sand-400">
                  ب
                </div>
                <div className="text-[10px] font-mono leading-tight">
                  <span className="font-bold text-emerald-950 block">BEGUM LAHORE</span>
                  <span className="text-charcoal/60">SEAL OF AUTHENTICITY &bull; 1994</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. THE FIVE COMMANDMENTS OF BEGUM */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
              The Atelier Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1">
              The Five Commandments of Begum
            </h2>
            <div className="w-12 h-0.5 bg-sand-400 mx-auto my-3" />
            <p className="text-xs sm:text-sm text-charcoal/65 leading-relaxed font-light">
              Authored by Sherjeel Mukhlis in 1994. No bridal piece leaves our atelier that breaches even one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIVE_COMMANDMENTS.map((c, idx) => (
              <div
                key={c.num}
                className={`bg-ivory border border-sand-300 p-7 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-sand-200 pb-3">
                    <span className="font-mono text-sm font-bold text-sand-800 tracking-wider">
                      COMMANDMENT {c.num}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-charcoal/40">
                      {c.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-emerald-950 font-serif mb-2">
                    {c.title}
                  </h3>

                  <p className="text-xs text-charcoal/75 leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 30 YEARS OF INDEPENDENT COUTURE (Archival Timeline) */}
        <div className="max-w-5xl mx-auto mb-24 bg-sand-50/70 border border-sand-300 p-8 sm:p-14">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
              Three Decades of Legacy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1">
              The Timeline of Independent Craft
            </h2>
            <p className="text-xs text-charcoal/60 mt-2 font-mono">
              1994 &mdash; 2026 &bull; From a Lahore courtyard to brides on four continents
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-sand-300 sm:before:left-24">
            {TIMELINE.map((t) => (
              <div
                key={t.year}
                className="bg-ivory border border-sand-300/80 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start shadow-xs hover:border-sand-400 transition-all relative z-10"
              >
                <div className="shrink-0 flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0 sm:w-28 border-b sm:border-b-0 sm:border-r border-sand-300 pb-2 sm:pb-0 sm:pr-4">
                  <span className="font-display text-2xl font-serif text-emerald-950 font-bold">
                    {t.year}
                  </span>
                  <span className="text-[9px] font-mono text-sand-800 uppercase tracking-wider block">
                    {t.location}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-emerald-950 font-serif">
                    {t.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed mt-1 font-light">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. SHERJEEL'S SIGNATURE MASTERPIECES (Curated Lookbook) */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 border-b border-sand-300 pb-3">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
                Personal Atelier Selection
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif mt-1">
                Sherjeel Mukhlis&apos;s Signature Masterpieces
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs text-emerald-900 hover:text-emerald-700 font-medium underline underline-offset-4 flex items-center gap-1"
            >
              Browse complete couture archive <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {curatedMasterpieces.map((p) => (
              <div
                key={p.id}
                className="bg-ivory border border-sand-300 p-4 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all"
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="relative aspect-[3/4] overflow-hidden bg-sand-100 mb-3.5 block"
                >
                  <Image
                    src={p.images[0]?.src || ""}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <span className="absolute bottom-2 left-2 bg-emerald-950/85 text-sand-200 px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs">
                    {p.occasion[0]}
                  </span>
                </Link>

                <div>
                  <Link
                    href={`/product/${p.slug}`}
                    className="font-display text-base text-emerald-950 font-medium group-hover:text-emerald-700 transition-colors block line-clamp-1"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs font-semibold text-emerald-900 mt-1">
                    {formatPrice(p.basePrice, p.currency)}
                  </p>
                  <p className="text-[11px] text-charcoal/60 line-clamp-2 mt-1 font-light">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-sand-200 text-[10px] uppercase tracking-wider"
                    asChild
                  >
                    <Link href={`/product/${p.slug}`}>View Piece</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-sand-300 text-emerald-950 hover:bg-sand-100 text-[10px] uppercase tracking-wider"
                    asChild
                  >
                    <Link href={`/customize?ref=${p.slug}`}>3D Customize</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. VIP DOORSTEP DELIVERY & FITTING CONCIERGE */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-950 via-[#07241A] to-[#041A12] text-ivory p-8 sm:p-14 border-2 border-sand-400/60 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-400/20 text-sand-300 text-[10px] font-mono uppercase tracking-[0.2em] border border-sand-400/40">
                <Sparkles size={11} className="text-sand-400 animate-pulse" />
                VIP Bespoke Service
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-sand-100 font-serif leading-tight">
                Doorstep Delivery & Personal Fitting by Sherjeel Mukhlis
              </h2>
              <p className="text-xs sm:text-sm text-sand-200/80 leading-relaxed max-w-xl font-light">
                For brides seeking the ultimate bespoke care, Sherjeel Mukhlis personally travels to your residence in Pakistan to deliver your finished attire. Includes on-site steaming, final fitting verification, and private jewellery drape styling before your big day.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-sand-300 font-mono pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-sand-400" />
                  <span>Available Nationwide</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-sand-400" />
                  <span>Selectable at Checkout</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Button
                className="w-full bg-gradient-to-r from-sand-400 via-sand-300 to-sand-400 hover:from-sand-300 hover:to-sand-200 text-emerald-950 font-semibold py-6 text-xs uppercase tracking-[0.2em] shadow-lg"
                asChild
              >
                <a
                  href="https://wa.me/923209988777?text=Hello%20Sherjeel%20Mukhlis%2C%20I%20would%20like%20to%20consult%20regarding%20a%20bridal%20couture%20commission."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp Sherjeel Mukhlis
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-sand-400/60 text-sand-200 hover:bg-sand-400/10 py-6 text-xs uppercase tracking-[0.2em]"
                asChild
              >
                <Link href="/team">
                  Explore Full Atelier Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
