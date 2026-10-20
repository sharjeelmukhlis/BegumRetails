import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CardGenerator } from "@/components/cards/card-generator";
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Mughal & Persian Greeting Card Maker | Begum",
  description:
    "Craft bespoke royal greeting cards for Love, Marriage, Anniversary, Friendship, and Gratitude illuminated with hand-drawn Mughal floral borders, Persian calligraphy, and gold foil.",
  openGraph: {
    title: "Mughal & Persian Greeting Card Maker | Begum Haute Couture",
    description:
      "Craft bespoke royal greeting cards for Love, Marriage, Anniversary, Friendship, and Gratitude with Nastaliq Urdu poetry and 24k gold foil illumination.",
    type: "website",
    url: "https://begumretails.com/cards",
  },
};

export default function CardsPage() {
  return (
    <div className="bg-ivory text-charcoal min-h-screen selection:bg-sand-300 selection:text-emerald-950">
      {/* ── LUXURY HERO ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 border-b border-sand-300/60 overflow-hidden">
        {/* Soft atmospheric radial glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(6,35,25,0.06),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_72%,rgba(201,151,90,0.09),transparent_55%)]" />

        <Container className="relative text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-800/8 border border-emerald-800/15 rounded-full text-emerald-900 text-[11px] uppercase tracking-[0.24em] font-medium mb-6">
            <Sparkles size={12} className="text-sand-600" />
            <span>Mughal Court Atelier & Calligraphy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-emerald-950 font-normal tracking-tight leading-[1.12]">
            Send a little royalty.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-charcoal/70 leading-relaxed font-sans max-w-xl mx-auto">
            Illuminated Mughal jaali arches, Persian sunbursts, and timeless Nastaliq couplets. Personalize, download in 2x print resolution, or send directly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#card-studio"
              className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-emerald-800 transition-all shadow-md rounded-sm"
            >
              Craft Your Royal Card <ArrowRight size={14} />
            </a>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-charcoal/75 hover:text-emerald-900 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        </Container>
      </section>

      {/* ── CARD GENERATOR STUDIO ── */}
      <CardGenerator />

      {/* ── HEIRLOOM INSPIRATION STRIP ── */}
      <section className="border-t border-sand-300/80 bg-sand-100/60 py-16 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.24em] text-sand-800 font-mono">
              The Atelier Experience
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-emerald-950 mt-2">
              Every Card Deserves an Heirloom
            </h2>
            <p className="text-sm text-charcoal/65 mt-2 max-w-lg mx-auto">
              Complement your heartfelt message with hand-stitched bridal ensembles, zardozi lehengas, and custom bespoke karigar designs.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/collections/occasion/nikkah"
              className="group p-6 bg-white border border-sand-300 hover:border-emerald-800 transition-all rounded-sm text-center shadow-sm"
            >
              <Gem size={22} className="mx-auto text-emerald-800 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-lg text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Nikkah & Baraat Ensembles
              </h3>
              <p className="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
                Opulent ivories and crimson silks woven with antique gold wire.
              </p>
            </Link>

            <Link
              href="/customize"
              className="group p-6 bg-white border border-sand-300 hover:border-emerald-800 transition-all rounded-sm text-center shadow-sm"
            >
              <Compass size={22} className="mx-auto text-emerald-800 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-lg text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Bespoke Atelier Design
              </h3>
              <p className="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
                Work directly with our master Lahore karigars for custom tailoring.
              </p>
            </Link>

            <Link
              href="/collections/complete-the-look"
              className="group p-6 bg-white border border-sand-300 hover:border-emerald-800 transition-all rounded-sm text-center shadow-sm"
            >
              <ShieldCheck size={22} className="mx-auto text-emerald-800 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-lg text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Heirloom Jewellery & Khussa
              </h3>
              <p className="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
                Hand-embroidered velvet potlis and artisan bridal accessories.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
