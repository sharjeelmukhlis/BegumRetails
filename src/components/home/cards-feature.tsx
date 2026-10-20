import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CardFrame } from "@/components/cards/card-frame";
import { getTemplateById } from "@/lib/cards/templates-config";
import { Sparkles, ArrowRight } from "lucide-react";

export function CardsFeatureSection() {
  const templateMehrab = getTemplateById("shah-jahani-mehrab");
  const templateGulzar = getTemplateById("gulzar-noor");
  const templateShamsa = getTemplateById("shamsa-sunburst");

  return (
    <section className="relative py-24 md:py-32 bg-[#FAF7F2] border-t border-sand-300/60 overflow-hidden">
      {/* Decorative Persian Arabesque Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(6,35,25,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_75%,rgba(201,151,90,0.08),transparent_50%)]" />

      <Container className="relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-800/8 border border-emerald-800/15 rounded-full text-emerald-900 text-[11px] uppercase tracking-[0.22em] font-medium mb-4">
            <Sparkles size={12} className="text-sand-600" />
            <span>Begum Cards Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-emerald-950 font-normal tracking-tight">
            Send a Little Royalty
          </h2>

          <p className="mt-4 text-sm sm:text-base text-charcoal/70 leading-relaxed font-sans max-w-xl mx-auto">
            Mughal and Persian art-style greeting cards for Love, Marriage, Anniversary, Friendship, and Gratitude. Illuminated with 24k gold foil vector ornaments and Nastaliq Urdu poetry.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/cards"
              className="inline-flex items-center gap-2 bg-emerald-900 text-ivory px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-emerald-800 transition-all rounded-sm shadow-md"
            >
              Open Card Studio <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 3 Showcase Mini Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Marriage (Mehrab) */}
          <div className="group relative rounded-sm p-3 bg-white border border-sand-300 hover:border-emerald-800/70 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-sand-100 border border-sand-200">
              <CardFrame
                template={templateMehrab}
                palette={templateMehrab.palettes[0]}
                fontId="cormorant"
                aspect="portrait"
                occasion="marriage"
                recipientName="Zara & Bilal"
                senderName="The Khan Family"
                message="May your union be crowned with endless joy, deep peace, and the timeless blessings of companionship."
                date="18 Rajab 1448"
                poetryEnabled={true}
                coupletId="ur-marriage-1"
                className="w-full h-full pointer-events-none"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800">
                Marriage · Shah Jahani Mehrab
              </span>
              <p className="font-serif text-base text-emerald-950 mt-1 font-medium">
                Pietra-Dura Imperial Cusped Arch
              </p>
            </div>
          </div>

          {/* Card 2: Love (Gulzar Noor) */}
          <div className="group relative rounded-sm p-3 bg-white border border-sand-300 hover:border-emerald-800/70 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-sand-100 border border-sand-200">
              <CardFrame
                template={templateGulzar}
                palette={templateGulzar.palettes[1]}
                fontId="cormorant"
                aspect="portrait"
                occasion="love"
                recipientName="Aiman Jan"
                senderName="Hamza"
                message="In every garden I have ever known, you are the bloom my heart calls home."
                date="Autumn in Lahore"
                poetryEnabled={false}
                coupletId={null}
                className="w-full h-full pointer-events-none"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800">
                Love · Gulzar Noor
              </span>
              <p className="font-serif text-base text-emerald-950 mt-1 font-medium">
                Mughal Floral Vine & Iris Border
              </p>
            </div>
          </div>

          {/* Card 3: Anniversary (Shamsa Sunburst) */}
          <div className="group relative rounded-sm p-3 bg-white border border-sand-300 hover:border-emerald-800/70 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-sand-100 border border-sand-200">
              <CardFrame
                template={templateShamsa}
                palette={templateShamsa.palettes[0]}
                fontId="cinzel"
                aspect="portrait"
                occasion="anniversary"
                recipientName="Ammi & Abba"
                senderName="With all our love"
                message="Another year, another golden line in the story that is yours and mine. Happy Anniversary."
                date="25 Golden Years"
                poetryEnabled={true}
                coupletId="ur-anniv-1"
                className="w-full h-full pointer-events-none"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800">
                Anniversary · Shamsa Sunburst
              </span>
              <p className="font-serif text-base text-emerald-950 mt-1 font-medium">
                Persian Illuminated Rosette Medallion
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 text-center">
          <Link
            href="/cards"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-emerald-900 font-semibold hover:text-emerald-700 transition-colors"
          >
            Explore all 10 Mughal & Persian templates in the Studio <ArrowRight size={13} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
