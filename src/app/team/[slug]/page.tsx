import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  getTeamMemberBySlug,
  getAllTeamSlugs,
  teamMembers,
} from "@/lib/data/team";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import {
  Crown,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  Gem,
  CheckCircle2,
  Building,
  Wand2,
} from "lucide-react";

export function generateStaticParams() {
  return getAllTeamSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};

  return {
    title: `${member.name} — ${member.role} | Begum Lahore Atelier`,
    description: `${member.name}, ${member.title}. ${member.shortBio.slice(0, 150)}...`,
  };
}

export default async function TeamMemberPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  // Find featured products by this member
  const featuredProducts = products.filter((p) =>
    member.featuredProductSlugs.includes(p.slug),
  );

  // Find next and previous members for carousel navigation
  const currentIndex = teamMembers.findIndex((m) => m.slug === member.slug);
  const prevMember = currentIndex > 0 ? teamMembers[currentIndex - 1] : teamMembers[teamMembers.length - 1];
  const nextMember = currentIndex < teamMembers.length - 1 ? teamMembers[currentIndex + 1] : teamMembers[0];

  const waHref = `https://wa.me/923209988777?text=${encodeURIComponent(
    `Hello Begum Atelier, I am interested in commissioning a bridal piece crafted under ${member.name} (${member.role}).`,
  )}`;

  return (
    <div className="bg-[#FAF7F2] pt-28 md:pt-34 pb-32 text-charcoal selection:bg-sand-300 selection:text-emerald-950">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-charcoal/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-emerald-900 transition-colors">
            Atelier
          </Link>
          <ChevronRight size={11} className="text-sand-400" />
          <Link href="/team" className="hover:text-emerald-900 transition-colors">
            Our Team & Karigars
          </Link>
          <ChevronRight size={11} className="text-sand-400" />
          <span className="text-emerald-950 font-semibold truncate">
            {member.name}
          </span>
        </nav>

        {/* Hero Split Card */}
        <div className="bg-ivory border border-sand-300 shadow-sm p-6 sm:p-12 mb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Portrait & Workshop Location (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand-100 border border-sand-300 shadow-md">
                <Image
                  src={member.heroImage}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <span className="absolute bottom-3 left-3 bg-emerald-950/85 backdrop-blur-md text-sand-200 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] border border-sand-400/30">
                  {member.experienceYears} Years Legacy &bull; {member.city}
                </span>
              </div>

              <div className="p-3.5 bg-sand-50/70 border border-sand-300/80 text-xs text-charcoal/70 flex items-start gap-2.5">
                <Building size={16} className="text-sand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-950 block text-[11px] uppercase tracking-wider">
                    Workshop Base:
                  </span>
                  <span>{member.workshopLocation}</span>
                </div>
              </div>
            </div>

            {/* Right: Bio, Metrics & Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sand-100 border border-sand-300 text-[10px] font-mono uppercase tracking-widest text-sand-800 font-semibold">
                    <Crown size={12} className="text-sand-600" />
                    {member.category === "leadership" ? "Atelier Leadership" : "Master Artisan"}
                  </span>
                  <span className="text-xs text-charcoal/40 font-mono">
                    Ref: #{member.slug.toUpperCase()}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl text-emerald-950 font-serif leading-[1.1]">
                  {member.name}
                </h1>
                <p className="font-display text-lg text-sand-800 font-medium mt-1 font-serif">
                  {member.title}
                </p>
                <p className="text-xs uppercase tracking-wider text-charcoal/50 mt-1">
                  {member.role} &bull; {member.city}
                </p>
              </div>

              {/* Craft Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 bg-sand-50 border border-sand-300/80 p-3.5 text-center">
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-charcoal/50">Crafted Hours</span>
                  <span className="font-display text-xl text-emerald-950 font-serif font-bold mt-0.5 block">
                    {member.stats.hoursLogged}
                  </span>
                </div>
                <div className="border-x border-sand-300">
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-charcoal/50">Heirlooms Made</span>
                  <span className="font-display text-xl text-emerald-950 font-serif font-bold mt-0.5 block">
                    {member.stats.heirloomsCrafted}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-charcoal/50">Apprentices</span>
                  <span className="font-display text-xl text-emerald-950 font-serif font-bold mt-0.5 block">
                    {member.stats.apprenticesTrained} Mentored
                  </span>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-4 bg-sand-100/60 border-l-2 border-sand-500 italic text-sm text-emerald-950 font-serif leading-relaxed">
                &ldquo;{member.quote}&rdquo;
              </div>

              {/* Short Bio */}
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {member.shortBio}
              </p>

              {/* Specialty & Actions */}
              <div className="pt-2 border-t border-sand-300/70 flex flex-wrap gap-3">
                <Button
                  className="bg-emerald-950 hover:bg-emerald-900 text-sand-200 text-xs uppercase tracking-[0.18em] px-6 py-3.5 shadow-md flex items-center gap-2"
                  asChild
                >
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={15} />
                    <span>Inquire About Commissioning With {member.name.split(" ")[0]}</span>
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="border-sand-400 text-emerald-950 hover:bg-sand-100 text-xs uppercase tracking-[0.18em] px-5 py-3.5"
                  asChild
                >
                  <Link href={`/customize?ref=${member.featuredProductSlugs[0] || "zari-dream-lehenga"}`}>
                    <Wand2 size={14} className="mr-1.5" />
                    <span>3D Virtual Atelier</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Story & Career Milestones */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          {/* Left: Full Narrative (7 cols) */}
          <div className="lg:col-span-7 bg-ivory border border-sand-300 p-6 sm:p-10 space-y-6 shadow-xs">
            <div className="border-b border-sand-300 pb-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
                Heritage & Provenance
              </span>
              <h2 className="font-display text-2xl text-emerald-950 font-serif mt-1">
                The Journey of {member.name}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed font-sans">
              {member.fullStory.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Signature Techniques */}
            <div className="pt-6 border-t border-sand-300/80">
              <h3 className="font-display text-lg text-emerald-950 font-serif mb-3 flex items-center gap-2">
                <Gem size={16} className="text-sand-700" />
                Signature Techniques & Craft Mastery:
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {member.signatureTechniques.map((tech) => (
                  <div
                    key={tech}
                    className="p-3 bg-sand-50/70 border border-sand-300/70 text-xs text-charcoal/80 flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-sand-700 shrink-0" />
                    <span className="font-medium text-emerald-950">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Milestones & Detail Photography (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand-100 border border-sand-300 shadow-sm">
              <Image
                src={member.detailImage}
                alt={`${member.name} craft detail`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <span className="absolute bottom-2 left-2 bg-emerald-950/80 text-sand-200 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                Atelier Macro Detail
              </span>
            </div>

            {/* Career Milestones */}
            <div className="bg-ivory border border-sand-300 p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg text-emerald-950 font-serif border-b border-sand-300 pb-2 flex items-center gap-2">
                <Award size={16} className="text-sand-700" />
                Artisan Career Milestones:
              </h3>

              <div className="space-y-4">
                {member.milestones.map((m) => (
                  <div key={m.year} className="flex gap-3 text-xs">
                    <span className="w-12 shrink-0 font-mono font-bold text-sand-800 text-right">
                      {m.year}
                    </span>
                    <div className="border-l-2 border-sand-300 pl-3">
                      <p className="font-semibold text-emerald-950">{m.title}</p>
                      <p className="text-charcoal/65 text-[11px] mt-0.5 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Masterpieces Associated with this Member */}
        {featuredProducts.length > 0 && (
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-sand-300 pb-3">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-semibold">
                  Atelier Portfolio
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif mt-1">
                  Signature Pieces Crafted by {member.name.split(" ")[0]}
                </h2>
              </div>
              <p className="text-xs text-charcoal/60">
                Click any piece to view details or start bespoke alterations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <div key={p.id} className="bg-ivory border border-sand-300 p-4 flex flex-col justify-between group shadow-xs">
                  <Link href={`/product/${p.slug}`} className="relative aspect-[3/4] overflow-hidden bg-sand-100 mb-3.5 block">
                    <Image
                      src={p.images[0]?.src || ""}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute bottom-2 left-2 bg-emerald-950/80 text-sand-200 px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs">
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
                  </div>

                  <div className="mt-4 pt-3 border-t border-sand-200 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-sand-200 text-[10px] uppercase tracking-wider"
                      asChild
                    >
                      <Link href={`/product/${p.slug}`}>View Masterpiece</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-sand-300 text-emerald-950 hover:bg-sand-100 text-[10px] uppercase tracking-wider"
                      asChild
                    >
                      <Link href={`/customize?ref=${p.slug}`}>Customize</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel / Navigation to Other Team Members */}
        <div className="border-t border-sand-300 pt-8 flex items-center justify-between">
          <Link
            href={`/team/${prevMember.slug}`}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal/70 hover:text-emerald-950 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-charcoal/40 block">Previous Profile</span>
              <span className="font-semibold text-emerald-950">{prevMember.name}</span>
            </div>
          </Link>

          <Button variant="ghost" className="text-xs uppercase tracking-widest text-emerald-950" asChild>
            <Link href="/team">View All Team Profiles</Link>
          </Button>

          <Link
            href={`/team/${nextMember.slug}`}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal/70 hover:text-emerald-950 transition-colors group text-right"
          >
            <div>
              <span className="text-[10px] text-charcoal/40 block">Next Profile</span>
              <span className="font-semibold text-emerald-950">{nextMember.name}</span>
            </div>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
