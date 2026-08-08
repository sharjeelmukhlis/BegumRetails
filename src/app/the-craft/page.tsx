import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { ScrollRevealSequence } from "@/components/shared/scroll-reveal-sequence";
import {
  karigarProfiles,
  craftTechniques,
  productionStages,
  sourcingNotes,
} from "@/lib/data/content";
import { homeMedia } from "@/lib/data/home-media";
import { ArrowRight, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "The Craft — Begum",
  description:
    "Meet the karigars behind every Begum piece — real names, real cities, real technique. Zardozi, dabka, tilla, resham, and gota, explained.",
};

export default function TheCraftPage() {
  return (
    <div className="bg-ivory">
      {/* 1 — Opening: full-bleed macro of hands mid-embroidery */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-emerald-950">
        <Image
          src={homeMedia.craftDetail.src}
          alt="Extreme close-up of zardozi hand embroidery, needle and gold thread mid-stitch"
          fill
          priority
          className="object-cover opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/92 via-emerald-950/30 to-emerald-950/40" />
        <Container className="relative z-10 pb-24 md:pb-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-200/85 font-medium">The Craft</p>
            <h1 className="mt-5 font-display text-ivory text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.95] max-w-[15ch]">
              Every thread has a name behind it.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm md:text-lg text-sand-100/85 leading-relaxed max-w-[52ch]">
              Handmade is an easy claim. This page is the evidence: the people, the techniques,
              and the four months between a sketch and a gown.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2 — Meet the Hands: named karigar profiles */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium">Meet the Hands</p>
            <h2 className="mt-3 font-display text-emerald-900 text-[clamp(1.9rem,4vw,3.4rem)] leading-[0.95] max-w-[20ch]">
              Not &ldquo;our artisans.&rdquo; These artisans.
            </h2>
            <p className="mt-5 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-[56ch]">
              Every Begum piece carries the name and city of the karigar who made it. These are
              the masters whose work you are actually buying.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {karigarProfiles.map((k, i) => (
              <Reveal
                key={k.id}
                delay={i * 0.08}
                as="article"
                id={k.id}
                className="group border border-sand-300/55 bg-sand-50/60 scroll-mt-28"
              >
                {k.workImage && (
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-sand-300/50">
                    <Image
                      src={k.workImage.src}
                      alt={k.workImage.alt}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-3 left-3 border border-sand-300/50 bg-emerald-950/70 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-sand-100">
                      Work in progress
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-emerald-900">{k.name}</h3>
                    <span className="font-display text-sm text-sand-700">{k.city}</span>
                  </div>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/65">
                    {k.specialty} &middot; {k.yearsExperience} years
                  </p>
                  <blockquote className="mt-4 text-sm text-charcoal/80 leading-relaxed italic border-l-2 border-sand-400/60 pl-4">
                    &ldquo;{k.quote}&rdquo;
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — The Techniques: pinned scroll-driven breakdown */}
      <ScrollRevealSequence
        eyebrow="The Techniques"
        heading="Five embroidery languages, one atelier"
        items={craftTechniques.map((t) => ({
          id: t.id,
          kicker: t.origin,
          title: t.name,
          body: t.description,
          meta: t.timePerPiece,
        }))}
        media={{
          src: homeMedia.craftDetail.src,
          alt: "Macro detail of hand embroidery technique in progress",
        }}
        theme="emerald"
      />

      {/* 4 — From Thread to Gown */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium">From Thread to Gown</p>
            <h2 className="mt-3 font-display text-emerald-900 text-[clamp(1.9rem,4vw,3.4rem)] leading-[0.95] max-w-[22ch]">
              Six stages. You see photos at every one that matters.
            </h2>
            <p className="mt-5 text-base text-charcoal/75 leading-relaxed max-w-[56ch]">
              This is where the staged-payment promise gets its proof: your approval, against real
              photographs, is what moves a piece from one stage to the next.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-300/50 border border-sand-300/50">
            {productionStages.map((stage, i) => (
              <Reveal key={stage.step} delay={(i % 3) * 0.06} as="article" className="bg-ivory p-7 md:p-8 flex flex-col">
                <p className="font-display text-4xl text-sand-400">{stage.step}</p>
                <h3 className="mt-4 text-base md:text-lg font-semibold text-charcoal">{stage.title}</h3>
                <p className="mt-2.5 text-sm text-charcoal/72 leading-relaxed">{stage.description}</p>
                {stage.proof && (
                  <p className="mt-4 pt-4 border-t border-sand-300/50 inline-flex items-start gap-2 text-[11px] uppercase tracking-[0.14em] text-emerald-800 leading-relaxed">
                    <Camera size={13} className="mt-0.5 shrink-0" />
                    {stage.proof}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 — Materials & Sourcing */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border border-sand-300/55 bg-sand-50/70 p-8 md:p-12">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium">Materials &amp; Sourcing</p>
              <h2 className="mt-3 font-display text-emerald-900 text-[clamp(1.6rem,3vw,2.5rem)] leading-tight max-w-[24ch]">
                Plainly stated, because it should be
              </h2>
            </Reveal>
            <div className="mt-9 grid md:grid-cols-3 gap-8">
              {sourcingNotes.map((note, i) => (
                <Reveal key={note.title} delay={i * 0.07}>
                  <h3 className="text-sm font-semibold text-charcoal uppercase tracking-[0.14em]">{note.title}</h3>
                  <p className="mt-3 text-sm text-charcoal/75 leading-relaxed">{note.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6 — CTA */}
      <section className="pb-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-px bg-sand-300/50 border border-sand-300/50">
            <Reveal className="group bg-emerald-950 p-10 md:p-14">
              <Link href="/customize" className="block">
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-300/80">
                  Now that you&rsquo;ve seen how it&rsquo;s made
                </p>
                <p className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight">
                  Design yours
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand-200/80 group-hover:text-ivory transition-colors">
                  Custom Design <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="group bg-ivory p-10 md:p-14">
              <Link href="/collections" className="block">
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-700">Or see the finished work</p>
                <p className="mt-3 font-display text-2xl md:text-3xl text-emerald-900 leading-tight">
                  Browse the collections
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-900/70 group-hover:text-emerald-900 transition-colors">
                  Collections <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
