"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { homeMedia } from "@/lib/data/home-media";
import { ArrowRight, Sparkles } from "lucide-react";

const processSteps = [
  {
    stage: "01",
    title: "Concept and sketch",
    detail: "Silhouette, neckline, and motif direction are tailored to your event and personal style.",
    duration: "3-5 days",
  },
  {
    stage: "02",
    title: "Hand embroidery",
    detail: "Zardozi, dabka, and resham are executed by hand by master karigars on couture-grade base fabric.",
    duration: "8-14 weeks",
  },
  {
    stage: "03",
    title: "Fitting and finish",
    detail: "Structure and finishing are refined through guided fittings until drape and movement feel flawless.",
    duration: "2-3 weeks",
  },
];

const craftSignatures = ["Zardozi", "Dabka", "Resham", "Mukesh"];

export function CraftsmanshipSpotlight() {
  return (
    <section className="relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_12%_15%,rgba(6,35,25,0.06),transparent_45%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_85%_72%,rgba(201,151,90,0.12),transparent_50%)]" />

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-emerald-800">
            <Sparkles size={14} />
            <p className="text-xs uppercase tracking-[0.25em] font-medium">The Craft</p>
          </div>
          <h2 className="mt-3 font-display text-emerald-900 text-[clamp(2rem,5vw,4.2rem)] leading-[0.9]">
            Couture takes time.<br />Royalty takes precision.
          </h2>
          <p className="mt-5 text-sm md:text-base text-charcoal/88 leading-relaxed max-w-3xl mx-auto">
            Every Begum bridal piece is hand-built by Lahore karigars - stitch by stitch, fitting by fitting, until it feels made only for you.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-2 border border-sand-300/50 pointer-events-none" />
              <div className="relative aspect-[16/11] md:aspect-[5/4] overflow-hidden border border-sand-300/40">
                <Image
                  src={homeMedia.craftDetail.src}
                  alt={homeMedia.craftDetail.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-emerald-900/10 to-transparent" />
                <div className="absolute top-4 right-4 z-20 border border-sand-300/55 bg-ivory px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-900 font-medium">
                  Atelier Lahore
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
                  <p className="text-xs uppercase tracking-[0.25em] text-sand-300/90 font-medium">Master Karigar</p>
                  <h3 className="font-display text-2xl md:text-4xl text-ivory mt-2 leading-[0.95]">Muhammad Ali</h3>
                  <p className="text-sm md:text-base text-sand-200/82 mt-1">Lahore &middot; 32 years in zardozi</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {craftSignatures.map((skill) => (
                      <span
                        key={skill}
                        className="border border-sand-300/45 bg-emerald-950/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-sand-200/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3 md:gap-4">
              {[
                { value: "30+", label: "Master Karigars" },
                { value: "4 Months", label: "Average Creation Time" },
                { value: "3 Generations", label: "Heritage Lineage" },
              ].map((stat) => (
                <div key={stat.label} className="border border-sand-300/55 bg-sand-50/80 p-4">
                  <p className="font-display text-2xl md:text-3xl text-emerald-900 leading-none">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-charcoal/86 mt-2 uppercase tracking-wider leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="space-y-4">
              {processSteps.map((step) => (
                <article
                  key={step.stage}
                  className="group relative border border-sand-400/65 bg-ivory p-4 md:p-5 transition-all duration-300 hover:border-emerald-800/50 hover:-translate-y-0.5"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-sand-400/75 via-sand-300/35 to-transparent" />
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center border border-sand-300/80 text-[11px] tracking-wider text-emerald-900 bg-sand-50">
                        {step.stage}
                      </span>
                      <h3 className="text-sm md:text-base text-charcoal font-semibold">{step.title}</h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/80">{step.duration}</span>
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-charcoal/90 leading-relaxed">{step.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/the-craft"
                className="group inline-flex items-center gap-2 border border-emerald-900/20 bg-emerald-900 text-ivory px-4 py-2.5 text-xs uppercase tracking-[0.22em] hover:bg-emerald-800"
              >
                See Full Craft Story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-8 border border-sand-400/55 bg-sand-50/85 p-4 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-charcoal/78">Atelier Note</p>
              <blockquote className="mt-3 text-xs md:text-sm text-charcoal/92 leading-relaxed italic">
                &ldquo;True bridal couture is felt in the finish - the fall, the balance, and the quiet confidence it gives the bride.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
