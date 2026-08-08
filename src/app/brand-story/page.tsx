import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { ScrollRevealSequence } from "@/components/shared/scroll-reveal-sequence";
import { brandValues } from "@/lib/data/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Story — Begum",
  description:
    "Why Begum exists: the philosophy behind 'Every bride, a Begum' — dignity, craft, and honest bespoke bridalwear from Lahore.",
};

const promises = [
  {
    title: "Real photography",
    detail: "Every piece photographed as it is — natural light, no retouching that lies.",
  },
  {
    title: "Staged payments",
    detail: "30% to begin, 40% after you approve production photos, 30% only when it ships.",
  },
  {
    title: "Honest sizing",
    detail: "Guided measurement, toile fittings, and the truth about what will and won't work.",
  },
  {
    title: "Karigar transparency",
    detail: "The name and city of the artisan who made your piece, on every piece.",
  },
];

export default function BrandStoryPage() {
  return (
    <div className="bg-ivory">
      {/* 1 — Opening statement: full viewport, quiet fabric still */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-emerald-950">
        <Image
          src="https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1800&q=85"
          alt="Silk and gold thread detail in the Begum atelier"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/35 to-emerald-950/45" />
        <Container className="relative z-10 pb-24 md:pb-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-200/85 font-medium">Brand Story</p>
            <h1 className="mt-5 font-display text-ivory text-[clamp(2.1rem,5.6vw,4.9rem)] leading-[1.02] max-w-[20ch]">
              Every bride is already a Begum. We simply help her see it.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex items-center gap-3 text-ivory/60">
              <span className="h-px w-14 bg-sand-300/60" />
              <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2 — The Belief: magazine essay */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium lg:sticky lg:top-32">
                  The Belief
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-5 space-y-8">
              <Reveal>
                <p className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] text-emerald-900 leading-snug">
                  Begum — a title of Mughal nobility. A woman who held her place in the room
                  before she said a word. We spell it Begum because this generation of brides
                  carries the title forward on her own terms.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-base md:text-lg text-charcoal/78 leading-[1.85]">
                  Nobility, in our reading, was never about wealth. It is dignity — ownership of
                  the moment. A bride should stand in her outfit the way a Begum stood in a court:
                  not decorated, but stated. Everything we make is in service of that posture.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-base md:text-lg text-charcoal/78 leading-[1.85]">
                  Begum exists in a specific gap. A bride in London, Toronto, or Dubai who wants
                  true bespoke Pakistani bridalwear has been asked to choose between flying home
                  for fittings or settling for off-the-rack. We built the atelier around her:
                  remote consultation, guided measurement, staged photo approvals, and a named
                  karigar in Lahore working on her piece as if she were in the next room.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — What We Believe: pinned one-statement-at-a-time reveal */}
      <ScrollRevealSequence
        eyebrow="What We Believe"
        heading="Four commitments, held since the first atelier"
        items={brandValues.map((v) => ({
          id: v.id,
          kicker: v.kicker,
          title: v.statement,
          body: v.detail,
        }))}
        theme="emerald"
      />

      {/* 4 — The Promise */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium">The Promise</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.4rem)] text-emerald-900 leading-[0.95]">
                Trust is not a feeling. It is a process you can inspect.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-px bg-sand-300/50 border border-sand-300/50">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="bg-ivory p-7 md:p-9">
                <h3 className="font-display text-xl md:text-2xl text-emerald-900">{p.title}</h3>
                <p className="mt-3 text-sm md:text-base text-charcoal/75 leading-relaxed">{p.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              href="/trust"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-900 border-b border-emerald-900/30 pb-1 hover:border-emerald-900 transition-colors"
            >
              The full operational detail, on the trust page
              <ArrowRight size={13} />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 5 — Closing: two quiet, equal-weight paths */}
      <section className="pb-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-px bg-sand-300/50 border border-sand-300/50">
            <Reveal className="group bg-emerald-950 p-10 md:p-14">
              <Link href="/the-craft" className="block">
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-300/80">Go deeper</p>
                <p className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight">
                  See how every piece is made
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand-200/80 group-hover:text-ivory transition-colors">
                  The Craft <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="group bg-ivory p-10 md:p-14">
              <Link href="/collections" className="block">
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-700">Begin looking</p>
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
