import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { ScrollRevealSequence } from "@/components/shared/scroll-reveal-sequence";
import { BrandStoryInteractive } from "@/components/brand-story/brand-story-interactive";
import { brandValues } from "@/lib/data/content";
import { homeMedia } from "@/lib/data/home-media";
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Camera,
  Coins,
  Ruler,
  Users,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Story & Heritage | Begum Haute Couture Lahore",
  description:
    "The philosophy, heritage, and architectural integrity behind 'Every bride, a Begum.' Founded in 1994 in Old Lahore, preserving Mughal bridal craftsmanship for brides worldwide.",
};

const operationalVows = [
  {
    icon: Camera,
    number: "01",
    title: "Real Photography Only",
    subtitle: "Zero Retouching That Lies",
    detail:
      "Every piece is captured exclusively under natural daylight in our atelier. We refuse deceptive lens distortion, skin-smoothing filters, or heavy color grading. What you see in our archive is exactly what lands on your body.",
    linkText: "Inspect our photography protocol",
    linkHref: "/trust#photography",
  },
  {
    icon: Coins,
    number: "02",
    title: "30 / 40 / 30 Staged Payments",
    subtitle: "Trust Earned Through Proof",
    detail:
      "You pay 30% to begin, 40% only after approving high-definition recorded video and macro photos of your mid-production embroidery, and the remaining 30% only after final garment inspection before shipment.",
    linkText: "Read staged payment schedule",
    linkHref: "/trust#payments",
  },
  {
    icon: Ruler,
    number: "03",
    title: "Honest Anatomical Sizing",
    subtitle: "Toile Fittings & Truthful Draping",
    detail:
      "Guided video self-measurement, cotton toile mock-up fittings, and complete technical truth about what will and will not work for your silhouette. If a fabric cannot survive a monsoon baraat, we say so before scissors touch silk.",
    linkText: "Explore our sizing guide",
    linkHref: "/size-guide",
  },
  {
    icon: Users,
    number: "04",
    title: "Named Karigar Sovereignty",
    subtitle: "Living Wages & Stitched Credit",
    detail:
      "We celebrate the human hands behind each heirloom. Karigars set their own commission rates at 3x the regional average, enjoy permanent family healthcare, and have their full name and city hand-stitched into every piece.",
    linkText: "Meet our named master karigars",
    linkHref: "/the-craft",
  },
];

const BRAND_VALUES_MEDIA: Record<string, { src: string; alt: string }> = {
  dignity: {
    src: homeMedia.heroStill.src,
    alt: "Begum bride carrying herself with sovereign dignity in handcrafted couture",
  },
  craft: {
    src: homeMedia.craftDetail.src,
    alt: "Macro detail of hand zardozi and bullion threadwork in progress",
  },
  names: {
    src: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    alt: "Master karigar working at the wooden adda frame in Lahore",
  },
  honesty: {
    src: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    alt: "Unretouched daylight bridal photography showing honest texture and drape",
  },
};

export default function BrandStoryPage() {
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
              <span>ARCHIVE FOLIO N° 04 &bull; BRAND STORY &amp; HERITAGE</span>
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
            <span className="text-emerald-950 font-semibold">The Brand Story</span>
          </nav>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────
          1. CINEMATIC MONUMENTAL HERO: "EVERY BRIDE A BEGUM"
          ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-emerald-950">
        <Image
          src="https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=2000&q=88"
          alt="Macro detail of pure gold bullion threadwork and mulberry katan silk in the Begum Lahore atelier"
          fill
          priority
          className="object-cover opacity-60 scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40" />

        <Container className="relative z-10 pb-20 md:pb-28 pt-32">
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-emerald-900/80 border border-sand-400/50 flex items-center justify-center text-sand-300 font-serif font-bold text-xl shadow-lg">
                  ب
                </span>
                <span className="text-[11px] uppercase font-mono tracking-[0.3em] text-sand-300/90 font-medium">
                  The Imperial Philosophy &bull; Begum Haute Couture
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-ivory text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.98] tracking-tight font-serif">
                Every bride is already a Begum.
                <span className="block italic text-sand-300 font-normal mt-2">
                  We simply help her see it.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-base md:text-xl text-sand-100/85 leading-relaxed font-light max-w-[56ch]">
                In Mughal history, a <em>Begum</em> was never a passive figure decorated for display. She was sovereign, poised, and commanded the room before speaking a single word. Everything we handcraft in Lahore exists in devotion to that sacred dignity.
              </p>
            </Reveal>

            {/* Museum Metric Strip */}
            <Reveal delay={0.3}>
              <div className="mt-12 pt-8 border-t border-sand-400/25 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    1994
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Founded in Lahore
                  </span>
                </div>
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
                    Named Master Karigars
                  </span>
                </div>
                <div>
                  <span className="font-display text-3xl md:text-4xl text-sand-200 font-serif font-bold block">
                    100%
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand-100/60 mt-1 block">
                    Zero Synthetic Silks
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Quick jump anchor links */}
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-sand-300/80">
                <span className="text-sand-400/50">Jump to Folio:</span>
                <a href="#the-meaning" className="hover:text-sand-100 underline underline-offset-4">
                  01. Meaning
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#garment-anatomy" className="hover:text-sand-100 underline underline-offset-4">
                  02. Anatomy
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#the-1994-genesis" className="hover:text-sand-100 underline underline-offset-4">
                  03. Courtyard 1994
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#the-standard" className="hover:text-sand-100 underline underline-offset-4">
                  04. The Standard
                </a>
                <span className="text-sand-400/30">&bull;</span>
                <a href="#global-diaspora" className="hover:text-sand-100 underline underline-offset-4">
                  05. Diaspora
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. CHAPTER I: THE ETYMOLOGY & SOVEREIGN PHILOSOPHY OF 'BEGUM'
          ───────────────────────────────────────────────────────── */}
      <section id="the-meaning" className="py-24 md:py-36 scroll-mt-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky Label Column */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="lg:sticky lg:top-36 space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-800 font-bold block">
                    Chapter 01 &bull; The Ethos
                  </span>
                  <p className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
                    The Meaning of Begum
                  </p>
                  <div className="w-12 h-0.5 bg-sand-400" />
                  <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                    Etymology derived from Turkish <em>Beg</em> (Lord/Ruler) and Mughal honorifics. Reclaimed for the 21st-century bride.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Editorial Essay Spread */}
            <div className="lg:col-span-9 space-y-8">
              <Reveal>
                <div className="bg-ivory border border-sand-300 p-8 sm:p-12 shadow-sm relative">
                  <div className="space-y-6 text-charcoal/80 text-base md:text-lg leading-[1.85] font-light">
                    <p className="font-display text-2xl md:text-3xl text-emerald-950 leading-snug font-serif font-normal">
                      <span className="float-left text-6xl md:text-7xl font-serif text-sand-800 pr-4 pt-1 leading-none font-bold">
                        B
                      </span>
                      egum—a title of supreme Mughal nobility. A woman who held her place in court diplomacy, architectural patronage, and statecraft before she uttered a syllable. We spell it <em>Begum</em> because this generation of South Asian brides carries the title forward on her own sovereign terms.
                    </p>

                    <p>
                      Nobility, in our reading, was never about the ostentatious display of wealth or drowning under heavy, glitter-coated theatrical costumes. True nobility is <strong>dignity</strong>: effortless self-possession and ownership of the moment. A bride should stand in her wedding lehenga the way a Begum stood in an imperial marble court: not decorated like a mannequin, but stated. Everything we draft, cut, and embroider in our Lahore workshops is in service of that posture.
                    </p>

                    <p>
                      Begum was founded to bridge a heartbreaking gap in contemporary fashion. A bride living in London, Toronto, Dubai, or New York who longs for authentic, museum-grade bespoke bridalwear has historically been forced to choose between two painful compromises: taking unpaid leave to fly home to Pakistan for frantic, stressful bazaar fittings, or settling for off-the-rack synthetic imitations in overseas boutiques.
                    </p>

                    {/* Pull Quote Box */}
                    <div className="my-8 p-6 sm:p-8 bg-sand-100/70 border-l-4 border-emerald-900 shadow-xs">
                      <Quote size={28} className="text-sand-600 mb-2" />
                      <p className="font-serif italic text-lg sm:text-xl text-emerald-950 leading-relaxed font-normal">
                        &ldquo;We built the atelier entirely around the bride: remote millimeter-accurate consultations, guided self-measurement, staged video approvals, and a named master karigar working on her lehenga in Lahore as if she were standing in the next room.&rdquo;
                      </p>
                      <p className="mt-4 text-xs font-mono uppercase tracking-wider text-sand-900 font-bold">
                        — Sherjeel Mukhlis, Founder &amp; Creative Director
                      </p>
                    </div>

                    <p>
                      When a Begum bride enters her hall on her Baraat or Walima night, she does not stagger under an unyielding cage. She glides. Her zardozi catches candle and stage light with the deep, warm luminescence of pure silver and gold bullion—never the cheap, harsh glare of chemical lacquer.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. INTERACTIVE SECTION: THE ANATOMY OF A BEGUM HEIRLOOM
          ───────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-sand-50/50 border-y border-sand-300/80">
        <Container>
          <BrandStoryInteractive />
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. CHAPTER II: THE 1994 GENESIS — THE COURTYARD IN OLD LAHORE
          ───────────────────────────────────────────────────────── */}
      <section id="the-1994-genesis" className="py-24 md:py-36 scroll-mt-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column with Dual Archival Texture */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <div className="relative">
                  {/* Decorative Frame Offset */}
                  <div className="absolute -inset-2 border-2 border-sand-400/60 pointer-events-none" />
                  <div className="relative aspect-[3/4] overflow-hidden border border-sand-300 shadow-xl bg-sand-100">
                    <Image
                      src={homeMedia.editorialFeature.src}
                      alt="Begum bride in handcrafted bespoke lehenga reflecting heritage craft"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-4 border border-sand-400/40 text-sand-100 text-xs">
                      <p className="font-serif font-semibold text-ivory">
                        Atelier Courtyard &bull; Mochi Gate, Lahore
                      </p>
                      <p className="text-[10px] text-sand-300/80 font-mono mt-0.5">
                        Preserving 400 years of Mughal embroidery heritage since 1994.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Reveal>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-800 font-bold block">
                  Chapter 02 &bull; The Genesis
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05]">
                  Born in a Sunlit Courtyard in 1994
                </h2>
                <div className="w-16 h-0.5 bg-sand-400 my-4" />
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
                  In 1994, when commercial bridal markets across South Asia began abandoning handloom artisans for computerized machine embroidery and synthetic polyester blends, Sherjeel Mukhlis made an uncompromising decision.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
                  He gathered three generational master karigars in an airy brick courtyard in the historic Walled City of Lahore near Mochi Gate. There were no machine stamping presses, no synthetic chemicals, and no anonymous sweatshop assembly lines. Just tension-adjusted wooden adda frames, pure mulberry katan silk, and coils of genuine silver bullion wire passed down through families who had dressed the Mughal royal courts.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
                  Word spread not through commercial advertising billboards, but through mothers and grandmothers who recognized the difference in weight, drape, and light reflection. When a bride in Manchester took a leap of faith in 2003—ordering a full Baraat ensemble based solely on fabric swatches sent by post—the global diaspora chapter began.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/brand-journey"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-950 text-sand-100 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-emerald-900 transition-colors shadow-sm"
                  >
                    View 30-Year Timeline <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/the-craft"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-ivory text-emerald-950 border border-sand-400 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-sand-100 transition-colors"
                  >
                    Meet the Karigars
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. CHAPTER III: PINNED SCROLL SEQUENCE (FOUR COMMITMENTS)
          ───────────────────────────────────────────────────────── */}
      <section className="bg-emerald-950">
        <ScrollRevealSequence
          eyebrow="What We Stand For"
          heading="Four Inviolable Commitments, Held Since 1994"
          items={brandValues.map((v) => ({
            id: v.id,
            kicker: v.kicker,
            title: v.statement,
            body: v.detail,
            media: BRAND_VALUES_MEDIA[v.id] || {
              src: homeMedia.craftDetail.src,
              alt: v.statement,
            },
          }))}
          theme="emerald"
        />
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. CHAPTER IV: THE FOUR OPERATIONAL VOWS (TRANSPARENCY IN DETAIL)
          ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="max-w-3xl mb-14">
            <Reveal>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-800 font-bold block">
                Chapter 03 &bull; Operational Truth
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-950 font-serif leading-[1.05] mt-1">
                Trust is Not a Feeling. It is a Process You Can Inspect.
              </h2>
              <div className="w-16 h-0.5 bg-sand-400 my-4" />
              <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light">
                We believe secrecy in high fashion hides compromised quality. Here are the four operational pillars governing every stitch, invoice, and measurement in our atelier.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {operationalVows.map((vow, i) => {
              const IconComp = vow.icon;
              return (
                <Reveal key={vow.title} delay={i * 0.08} className="bg-ivory border border-sand-300 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all group">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-sand-200">
                      <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center text-sand-800 group-hover:bg-emerald-950 group-hover:text-sand-200 transition-colors">
                        <IconComp size={20} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-sand-800">
                        VOW {vow.number}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-emerald-950 font-serif mb-1">
                      {vow.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-sand-800 mb-3">
                      {vow.subtitle}
                    </p>
                    <p className="text-sm text-charcoal/75 leading-relaxed font-light mb-6">
                      {vow.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand-200/80">
                    <Link
                      href={vow.linkHref}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-950 font-semibold group-hover:text-emerald-700 transition-colors"
                    >
                      <span>{vow.linkText}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <Link
              href="/trust"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-mono text-emerald-950 border-b-2 border-emerald-900 pb-1 hover:text-emerald-700 hover:border-emerald-700 transition-colors font-bold"
            >
              Read our complete operational charter on the Trust page
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7. REGAL CLOSING PATHWAYS: THREE EQUAL COUTURE PATHS
          ───────────────────────────────────────────────────────── */}
      <section className="pb-32">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Path 1: Consult Sherjeel */}
            <Reveal className="group bg-emerald-950 p-8 sm:p-10 flex flex-col justify-between border border-emerald-900 shadow-md">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-300/80 block mb-2">
                  01 &bull; Direct Consultation
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-ivory font-serif leading-tight">
                  Speak with the Creative Director
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-sand-100/75 leading-relaxed font-light">
                  Discuss your wedding venue, silhouette vision, and gouache draft options directly with Sherjeel Mukhlis and senior stylists.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-sand-400/20">
                <a
                  href="https://wa.me/923209988777?text=Hello%20Sherjeel%2C%20I%20would%20like%20to%20consult%20regarding%20a%20bridal%20couture%20commission%20after%20reading%20the%20brand%20story."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-sand-200 group-hover:text-ivory transition-colors font-semibold"
                >
                  <MessageCircle size={15} className="text-sand-400" />
                  <span>WhatsApp Atelier Direct</span>
                </a>
              </div>
            </Reveal>

            {/* Path 2: Step into The Craft */}
            <Reveal delay={0.06} className="group bg-ivory p-8 sm:p-10 flex flex-col justify-between border border-sand-300 shadow-sm hover:border-sand-500 transition-all">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 block mb-2">
                  02 &bull; The Artisans
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
                  Step Inside The Craft Workshop
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                  Meet the master karigars by name: Muhammad Ali, Fatima Tariq, and Rabia Anwar. See how zardozi, dabka, and resham are stitched.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-sand-200">
                <Link
                  href="/the-craft"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-950 group-hover:text-emerald-700 transition-colors font-semibold"
                >
                  <span>Explore The Craft</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* Path 3: Browse Collections */}
            <Reveal delay={0.12} className="group bg-sand-100/70 p-8 sm:p-10 flex flex-col justify-between border border-sand-300 shadow-sm hover:border-sand-500 transition-all">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 block mb-2">
                  03 &bull; Finished Heirlooms
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
                  Explore the Haute Couture Archive
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                  Browse our four dedicated bridal occasion lines: Baraat, Walima, Mehndi, and Nikkah. View real photography and pricing.
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
