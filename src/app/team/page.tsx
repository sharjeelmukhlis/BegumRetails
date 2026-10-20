"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data/team";
import {
  Crown,
  Sparkles,
  Award,
  ArrowRight,
  MessageCircle,
  Gem,
  ShieldCheck,
  Feather,
} from "lucide-react";

const CRAFT_PILLARS = [
  {
    icon: Gem,
    title: "100% Named Karigar Attribution",
    detail:
      "Every piece has the name and workshop city of the master artisan stitched into its provenance label. We celebrate craftsmen, never hide them.",
  },
  {
    icon: ShieldCheck,
    title: "Generational Dignity & Fair Living Wages",
    detail:
      "Begum karigars earn more than three times regional workshop averages, with comprehensive family health coverage and paid apprentice mentoring.",
  },
  {
    icon: Feather,
    title: "Zero Machine Shortcuts",
    detail:
      "We refuse computerized embroidery frames. Every bullion coil, resham knot, and pearl setting is guided strictly by human eye and needle.",
  },
  {
    icon: Award,
    title: "Loom Heritage Preservation",
    detail:
      "We partner with heritage silk weavers in Punjab and Sindh to protect indigenous katan, tissue, and raw silk looms from extinction.",
  },
];

export default function TeamPage() {
  const [filter, setFilter] = useState<"all" | "leadership" | "master-karigar" | "artisan">("all");

  const filteredMembers =
    filter === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === filter);

  return (
    <div className="bg-[#FAF7F2] pt-28 md:pt-34 pb-32 text-charcoal selection:bg-sand-300 selection:text-emerald-950">
      <Container>
        {/* Editorial Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sand-100 text-sand-800 text-[11px] font-mono uppercase tracking-[0.22em] mb-4 border border-sand-300">
            <Crown size={13} className="text-sand-600" />
            The Custodians of Heritage
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-emerald-950 font-serif leading-[1.05]">
            The Hands Behind the Heirloom
          </h1>
          <div className="w-16 h-0.5 bg-sand-400 mx-auto my-6" />
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Begum is an atelier of thirty-plus master karigars, couturiers, and silhouette architects in Lahore preserving three centuries of Mughal embroidery traditions. Click any member to read their life story and craft heritage.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-sand-300/80 text-center">
            <div>
              <p className="font-display text-3xl text-emerald-950 font-serif">30+</p>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider mt-1">Master Karigars</p>
            </div>
            <div>
              <p className="font-display text-3xl text-emerald-950 font-serif">24 Yrs</p>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider mt-1">Average Legacy</p>
            </div>
            <div>
              <p className="font-display text-3xl text-emerald-950 font-serif">100%</p>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider mt-1">Hand-Embroidered</p>
            </div>
            <div>
              <p className="font-display text-3xl text-emerald-950 font-serif">4</p>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider mt-1">Continents Served</p>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
              filter === "all"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-sm font-semibold"
                : "bg-ivory border-sand-300 text-charcoal/70 hover:border-sand-400"
            }`}
          >
            All Members ({teamMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("leadership")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
              filter === "leadership"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-sm font-semibold"
                : "bg-ivory border-sand-300 text-charcoal/70 hover:border-sand-400"
            }`}
          >
            Atelier Leadership (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter("master-karigar")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
              filter === "master-karigar"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-sm font-semibold"
                : "bg-ivory border-sand-300 text-charcoal/70 hover:border-sand-400"
            }`}
          >
            Master Karigars (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter("artisan")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
              filter === "artisan"
                ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-sm font-semibold"
                : "bg-ivory border-sand-300 text-charcoal/70 hover:border-sand-400"
            }`}
          >
            Silhouette Architects (1)
          </button>
        </div>

        {/* Members Grid (Clickable Cards Linking to /team/[slug]) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="bg-ivory border border-sand-300 p-6 flex flex-col justify-between shadow-xs hover:border-sand-500 hover:shadow-md transition-all group relative"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-sand-100 mb-5 border border-sand-200">
                  <Image
                    src={member.heroImage}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute bottom-2.5 left-2.5 bg-emerald-950/85 backdrop-blur-md text-sand-200 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border border-sand-400/20">
                    {member.experienceYears} Years &bull; {member.city}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-sand-800 font-semibold">
                    {member.role}
                  </span>
                  <span className="text-[10px] text-charcoal/40 font-mono">
                    {member.stats.hoursLogged}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-emerald-950 font-serif group-hover:text-emerald-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-sand-800 font-medium mt-0.5 font-serif line-clamp-1">
                  {member.title}
                </p>

                <p className="text-xs text-charcoal/75 leading-relaxed mt-3 line-clamp-3">
                  {member.shortBio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-950 group-hover:underline underline-offset-4 flex items-center gap-1">
                  <span>Read Full Story</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-charcoal/50 font-mono">
                  {member.featuredProductSlugs.length} Masterpieces
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Section: The Begum Artisan Dignity Charter */}
        <div className="mb-24 bg-sand-50/80 border border-sand-300 p-8 sm:p-14">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
              Our Ethical Foundation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif mt-1.5">
              The Begum Artisan Dignity Charter
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/65 mt-2.5 leading-relaxed">
              We believe a bridal outfit carries the spirit of its makers. True luxury cannot exist if the hands that created it are exploited.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFT_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-ivory border border-sand-300/80 p-5 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-emerald-950 border border-sand-200">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display text-base text-emerald-950 font-serif">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Connect with the Team CTA */}
        <div className="text-center bg-gradient-to-br from-emerald-950 via-[#07241A] to-[#041A12] text-ivory p-8 sm:p-14 border border-sand-400/60 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-400/20 text-sand-300 text-[10px] font-mono uppercase tracking-[0.2em] border border-sand-400/40">
              <Sparkles size={11} className="text-sand-400 animate-pulse" />
              Direct Atelier Access
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-sand-100 font-serif">
              Begin Your Commission with Our Team
            </h2>
            <p className="text-xs sm:text-sm text-sand-200/80 leading-relaxed max-w-lg mx-auto">
              Whether you wish to schedule an in-person salon appointment at our Lahore atelier or conduct a guided video measurement call from overseas, our senior stylists are ready to welcome you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-4">
              <Button
                className="bg-gradient-to-r from-sand-400 via-sand-300 to-sand-400 hover:from-sand-300 hover:to-sand-200 text-emerald-950 font-semibold px-8 py-4 text-xs uppercase tracking-[0.2em] shadow-lg"
                asChild
              >
                <Link href="/customize">
                  Launch 3D Virtual Atelier
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-sand-400/60 text-sand-200 hover:bg-sand-400/10 px-8 py-4 text-xs uppercase tracking-[0.2em]"
                asChild
              >
                <a
                  href="https://wa.me/923209988777?text=Hello%20Begum%20Team%2C%20I%20would%20like%20to%20consult%20with%20a%20bridal%20stylist."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp Senior Stylist
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
