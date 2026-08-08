import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import { journeyMilestones, journeyStats } from "@/lib/data/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Journey — Begum",
  description:
    "From a single Lahore atelier in 1994 to brides across four continents — the milestones behind Begum bridal couture.",
};

export default function BrandJourneyPage() {
  return (
    <div className="bg-ivory">
      {/* 1 — Header */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-sand-700 font-medium">Brand Journey</p>
            <h1 className="mt-4 font-display text-emerald-950 text-[clamp(2.3rem,5.6vw,5.2rem)] leading-[0.92] max-w-[16ch]">
              From a single atelier to brides across four continents
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base md:text-lg text-charcoal/78 leading-relaxed max-w-[54ch]">
              Thirty years, told honestly: the founding workshop, the first bride who trusted us
              from an ocean away, and every turning point in between. Scroll the timeline.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2 — The Timeline */}
      <section className="pb-24 md:pb-32">
        <Container>
          <JourneyTimeline milestones={journeyMilestones} />
        </Container>
      </section>

      {/* 3 — By the Numbers */}
      <section className="bg-emerald-950 py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-sand-300/90 font-medium">By the Numbers</p>
            <h2 className="mt-3 font-display text-ivory text-[clamp(1.8rem,3.6vw,3rem)] leading-[0.95] max-w-[22ch]">
              Figures we can stand behind
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-sand-300/15 border border-sand-300/15">
            {journeyStats.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 0.06} className="bg-emerald-950 p-7 md:p-9">
                <p className="font-display text-4xl md:text-6xl text-sand-200 leading-none">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-sand-100/70 leading-snug">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 — Where We're Headed */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium lg:sticky lg:top-32">
                  Where We&rsquo;re Headed
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-5 space-y-7">
              <Reveal>
                <p className="font-display text-[clamp(1.3rem,2.3vw,1.8rem)] text-emerald-900 leading-snug">
                  No reinvention. More of the same standard, in more places.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-base md:text-lg text-charcoal/78 leading-[1.85]">
                  The plans are deliberately modest: deepen the karigar partnership network so more
                  techniques survive commercially, extend the occasion lines where brides actually
                  ask for them, and — when we can do it without diluting the fitting process —
                  open consultation spaces in the cities our diaspora brides call home.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-base md:text-lg text-charcoal/78 leading-[1.85]">
                  What will not change is the rule from 1994: nothing leaves the atelier that we
                  would not put on our own family.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 5 — CTA into The Craft */}
      <section className="pb-28">
        <Container>
          <Reveal>
            <Link
              href="/the-craft"
              className="group flex flex-col md:flex-row md:items-end md:justify-between gap-6 border border-sand-300/55 bg-sand-50/70 p-10 md:p-14 hover:border-emerald-900/30 transition-colors"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-700">From our history</p>
                <p className="mt-3 font-display text-2xl md:text-4xl text-emerald-900 leading-tight max-w-[20ch]">
                  To how we actually make things
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-900">
                The Craft
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
