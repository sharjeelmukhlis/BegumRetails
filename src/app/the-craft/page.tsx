import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { ScrollRevealSequence } from "@/components/shared/scroll-reveal-sequence";
import { CraftInteractive } from "@/components/craft/craft-interactive";
import {
  craftTechniques,
  sourcingNotes,
} from "@/lib/data/content";
import { homeMedia } from "@/lib/data/home-media";
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Craft & Ateliers | Begum Haute Couture Lahore",
  description:
    "Meet the master karigars behind every Begum piece real names, real cities, real technique. Discover 400-hour zardozi, dabka, tilla, resham, and gota craftsmanship in Lahore.",
};

const MASTER_KARIGARS = [
  {
    id: "muhammad-ali",
    name: "Muhammad Ali",
    city: "Lahore",
    yearsExperience: 32,
    specialty: "Zardozi & Dabka Bullion",
    techniques: ["Imperial Zardozi", "Dabka Wire", "Nakshi Coiling"],
    apprenticesTrained: 8,
    quote: "My father taught me at this very wooden adda when I was twelve. Now my son sits opposite me, matching my stitch tension. This craft is our bloodline.",
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
    specialty: "Fine Resham Silk Shading",
    techniques: ["Resham Floss", "Botanical Shading", "French Knots"],
    apprenticesTrained: 6,
    quote: "Silk thread is like oil painting. With gold wire you build structure; with resham you breathe soul and joy into every leaf and bird.",
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
    specialty: "Tilla & Micro Dupatta Borders",
    techniques: ["Tilla Couching", "Marori Cording", "Pearl Bezeling"],
    apprenticesTrained: 5,
    quote: "The finest tilla requires the steadiest hands in the room. A single pulled thread ruins a ten-meter veil. This art taught me divine patience.",
    workImage: {
      src: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
      alt: "Fine tilla border work on silk by Rabia Anwar",
    },
  },
  {
    id: "ustad-rahim-buksh",
    name: "Ustad Rahim Buksh",
    city: "Old Lahore (Mochi Gate)",
    yearsExperience: 40,
    specialty: "Master Khaka Drafter & Motif Architect",
    techniques: ["Charcoal Khaka Draft", "Imperial Arch Symmetry", "Adda Frame Setup"],
    apprenticesTrained: 14,
    quote: "Before a single needle moves, the geometry must be flawless. If the arch is off by two millimeters, the entire lehenga loses its sovereign dignity.",
    workImage: {
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
      alt: "Architectural Khaka stencil drafting by Ustad Rahim Buksh",
    },
  },
];

const MUGHAL_ARCHIVE_MEDIA: Record<string, { src: string; alt: string }> = {
  zardozi: {
    src: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    alt: "Zardozi pure gold and silver bullion hand embroidery over raised padding",
  },
  dabka: {
    src: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    alt: "Dabka and nakshi coiled spring metallic wire on raw katan silk",
  },
  tilla: {
    src: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    alt: "Fine tilla metallic couching with silk thread anchors on dupatta borders",
  },
  resham: {
    src: "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
    alt: "Resham silk threadwork shading with delicate botanical and bird motifs",
  },
  gota: {
    src: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    alt: "Gota kinari woven gold ribbon appliqué with luminous light reflection",
  },
};

export default function TheCraftPage() {
  return (
    <div className="bg-[#FAF7F2] text-charcoal selection:bg-sand-300 selection:text-emerald-950">
      {/* ─────────────────────────────────────────────────────────
          0. ARCHIVAL FOLIO TOP BAR & LUXURY BREADCRUMB
          ───────────────────────────────────────────────────────── */}
      <div className="pt-28 md:pt-34 border-b border-sand-300/80 bg-ivory/80 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] uppercase font-mono tracking-[0.24em] text-charcoal/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sand-600 inline-block animate-pulse" />
              <span>ARCHIVE FOLIO N° 02 &bull; THE ATELIER WORKSHOPS &amp; CRAFT</span>
            </div>
            <div className="flex items-center gap-4 text-charcoal/50">
              <span>31.5204° N, 74.3587° E</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>MOCHI GATE &bull; GULBERG III LAHORE</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>EST. 1994</span>
            </div>
          </div>

          <nav
            aria-label="Breadcrumb"
            className="py-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-charcoal/50 border-t border-sand-200"
          >
            <Link href="/" className="hover:text-emerald-900 transition-colors">
              Atelier
            </Link>
            <ChevronRight size={11} className="text-sand-400" />
            <Link href="/about" className="hover:text-emerald-900 transition-colors">
              About
            </Link>
            <ChevronRight size={11} className="text-sand-400" />
            <span className="text-emerald-950 font-semibold">The Craft Workshop</span>
          </nav>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────
          1. CINEMATIC HERO: "EVERY THREAD HAS A NAME"
          ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-emerald-950">
        <Image
          src={homeMedia.craftDetail.src}
          alt="Macro detail of pure gold bullion threadwork and needle mid-stitch in the Begum Lahore atelier"
          fill
          priority
          className="object-cover opacity-65 scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40" />

        <Container className="relative z-10 pb-20 md:pb-28 pt-32">
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-emerald-900/80 border border-sand-400/50 flex items-center justify-center text-sand-300 font-serif font-bold text-xl shadow-lg">
                  د
                </span>
                <span className="text-[11px] uppercase font-mono tracking-[0.3em] text-sand-300/90 font-medium">
                  دستکاری &bull; Dastkari &bull; Sacred Atelier Devotion
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-ivory text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.98] tracking-tight font-serif">
                400 Hours. One Needle.
                <span className="block italic text-sand-300 font-normal mt-2">
                  Real names behind every thread.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-base md:text-xl text-sand-100/85 leading-relaxed font-light max-w-[56ch]">
                Handmade is an easy claim in commercial fashion. This page is the living proof: the generational karigars, the tensioned wooden adda frames, the five Mughal needlework languages, and the four months between an ink sketch and a royal bridal gown.
              </p>
            </Reveal>

            {/* Museum Metric Strip */}
            <Reveal delay={0.3}>
              <div className="mt-12 pt-8 border-t border-sand-400/25 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    400+
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Hours Per Lehenga
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    30+
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Master Karigars
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    5
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Mughal Techniques
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    0%
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Machine Stamping
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Jump links */}
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-sand-300/80">
                <span className="text-sand-400/50">Jump to Section:</span>
                <a href="#meet-the-hands" className="hover:text-sand-100 underline underline-offset-4">
                  01. Karigars
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#the-techniques" className="hover:text-sand-100 underline underline-offset-4">
                  02. 5 Techniques
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#adda-anatomy" className="hover:text-sand-100 underline underline-offset-4">
                  03. Adda Frame
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#the-journey" className="hover:text-sand-100 underline underline-offset-4">
                  04. 6 Stages
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#materials-vault" className="hover:text-sand-100 underline underline-offset-4">
                  05. Materials
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. CHAPTER I: MEET THE HANDS (NOT "OUR ARTISANS")
          ───────────────────────────────────────────────────────── */}
      <section id="meet-the-hands" className="py-24 md:py-36 scroll-mt-24">
        <Container>
          <div className="max-w-3xl mb-14">
            <Reveal>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-800 font-bold block">
                Chapter 01 &bull; The Masters
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05] mt-1">
                Not &ldquo;Our Artisans.&rdquo; These Artisans.
              </h2>
              <div className="w-16 h-0.5 bg-sand-400 my-4" />
              <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
                Every Begum bridal creation carries the stitched name, city, and photo of the master karigar who made it. These are the master craftsmen whose work you are actually commissioning.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MASTER_KARIGARS.map((k, i) => (
              <Reveal
                key={k.id}
                delay={i * 0.08}
                as="article"
                id={k.id}
                className="group border border-sand-300 bg-ivory flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all scroll-mt-28"
              >
                <div>
                  {k.workImage && (
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-sand-300 bg-sand-100">
                      <Image
                        src={k.workImage.src}
                        alt={k.workImage.alt}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute bottom-3 left-3 border border-sand-300/50 bg-emerald-950/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-sand-100">
                        Work in progress
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-display text-xl text-emerald-950 font-serif">{k.name}</h3>
                      <span className="font-mono text-xs text-sand-800">{k.city}</span>
                    </div>

                    <p className="text-[11px] font-mono uppercase tracking-wider text-sand-900 font-semibold mb-3">
                      {k.specialty} &bull; {k.yearsExperience} Years
                    </p>

                    <blockquote className="text-xs text-charcoal/80 leading-relaxed italic border-l-2 border-sand-400 pl-3 mb-4">
                      &ldquo;{k.quote}&rdquo;
                    </blockquote>

                    <div className="pt-3 border-t border-sand-200">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50 mb-1.5">
                        Techniques Mastered:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {k.techniques.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 bg-sand-100 border border-sand-300 text-charcoal/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-sand-50/70 border-t border-sand-200 text-[10px] font-mono text-charcoal/60 flex items-center justify-between">
                  <span>Apprentices Trained:</span>
                  <span className="font-bold text-emerald-950">{k.apprenticesTrained} Craftsmen</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. INTERACTIVE SECTION: THE CRAFT INTERACTIVE (STUDIO, ADDA, PROOF)
          ───────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-sand-50/50 border-y border-sand-300/80">
        <Container>
          <CraftInteractive />
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. CHAPTER II: PINNED SCROLL SEQUENCE (TECHNIQUE ARCHIVE)
          ───────────────────────────────────────────────────────── */}
      <section className="bg-emerald-950">
        <ScrollRevealSequence
          eyebrow="The Mughal Archive"
          heading="Five Embroidery Languages, One Master Atelier"
          items={craftTechniques.map((t) => ({
            id: t.id,
            kicker: t.origin,
            title: t.name,
            body: t.description,
            meta: t.timePerPiece,
            media: MUGHAL_ARCHIVE_MEDIA[t.id] || {
              src: homeMedia.craftDetail.src,
              alt: `${t.name} hand embroidery technique`,
            },
          }))}
          theme="emerald"
        />
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. CHAPTER III: SOURCING TRANSPARENCY (PLAINLY STATED)
          ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="border-2 border-sand-300 bg-ivory p-8 sm:p-14 lg:p-16 shadow-sm">
            <Reveal>
              <div className="max-w-2xl mb-10">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-800 font-bold block">
                  Material Provenance &bull; Absolute Transparency
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif leading-tight mt-1">
                  Plainly Stated, Because It Should Be
                </h2>
                <div className="w-16 h-0.5 bg-sand-400 my-4" />
                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                  We don&apos;t hide behind vague marketing adjectives like &ldquo;fine fabrics.&rdquo; Here is exactly where our raw materials originate and how our craftspeople are treated.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 pt-4 border-t border-sand-200">
              {sourcingNotes.map((note, i) => (
                <Reveal key={note.title} delay={i * 0.08} className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-sand-800 border border-sand-300 font-mono text-xs font-bold">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-lg font-serif text-emerald-950">
                    {note.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {note.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. REGAL CLOSING COUTURE PATHWAYS
          ───────────────────────────────────────────────────────── */}
      <section className="pb-32">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Path 1: Custom Design */}
            <Reveal className="group bg-emerald-950 p-8 sm:p-10 flex flex-col justify-between border border-emerald-900 shadow-md">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-300/80 block mb-2">
                  01 &bull; Bespoke Commission
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-ivory font-serif leading-tight">
                  Design Your Dream Piece
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-sand-100/75 leading-relaxed font-light">
                  Now that you have seen how every panel is embroidered by hand, choose your silhouette, fabric, and named karigar.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-sand-400/20">
                <Link
                  href="/customize"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-sand-200 group-hover:text-ivory transition-colors font-semibold"
                >
                  <span>Start Customization</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* Path 2: Consult via WhatsApp */}
            <Reveal delay={0.06} className="group bg-ivory p-8 sm:p-10 flex flex-col justify-between border border-sand-300 shadow-sm hover:border-sand-500 transition-all">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 block mb-2">
                  02 &bull; Atelier Video Call
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
                  Consult with Sherjeel
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                  Schedule a private video consultation directly with Founder Sherjeel Mukhlis and review gouache drafts.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-sand-200">
                <a
                  href="https://wa.me/923209988777?text=Hello%20Sherjeel%2C%20I%20would%20like%20to%20consult%20regarding%20a%20bridal%20craft%20commission."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-950 group-hover:text-emerald-700 transition-colors font-semibold"
                >
                  <MessageCircle size={15} className="text-sand-600" />
                  <span>WhatsApp Creative Director</span>
                </a>
              </div>
            </Reveal>

            {/* Path 3: Browse Collections */}
            <Reveal delay={0.12} className="group bg-sand-100/70 p-8 sm:p-10 flex flex-col justify-between border border-sand-300 shadow-sm hover:border-sand-500 transition-all">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 block mb-2">
                  03 &bull; Finished Heirlooms
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
                  Browse the Collections
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                  View the completed masterpieces created using these techniques across Baraat, Walima, Mehndi, and Nikkah.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-sand-200">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-950 group-hover:text-emerald-700 transition-colors font-semibold"
                >
                  <span>Browse Collections</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
