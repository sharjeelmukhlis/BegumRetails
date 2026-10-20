import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { homeMedia } from "@/lib/data/home-media";
import { ArrowRight } from "lucide-react";

const storyMilestones = [
  {
    year: "1994",
    title: "Atelier roots",
    detail: "A small Lahore workshop focused on hand embroidery for bridal families.",
  },
  {
    year: "2008",
    title: "Couture direction",
    detail: "Begum evolved from craft service to full bridal couture with custom silhouettes.",
  },
  {
    year: "Today",
    title: "Global brides",
    detail: "Brides across the world wear Lahore-made work with modern fit and heritage detail.",
  },
];

export function BrandStorySection() {
  return (
    <section data-parallax-section className="parallax-scene relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/45 to-transparent" />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5" data-parallax="layer-1">
            <p className="text-xs uppercase tracking-[0.25em] text-sand-600 font-medium">Brand Story</p>
            <h2 className="mt-3 font-display text-emerald-900 text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[0.92] max-w-[16ch]">
              From Lahore ateliers to modern bridal royalty
            </h2>
            <p className="mt-5 text-sm md:text-base text-charcoal/75 leading-relaxed max-w-[46ch]">
              Begum began with karigars, not trends. Every collection still starts where it started decades ago:
              with handwork, patience, and the belief that a bride should feel powerful the moment she wears her piece.
            </p>

            <div className="mt-7 border-l border-sand-300/55 pl-4">
              <p className="text-xs text-charcoal/70 italic leading-relaxed">
                &ldquo;We do not make fast fashion. We make heirloom moments.&rdquo;
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border border-emerald-900/20 bg-emerald-900 text-ivory px-4 py-2.5 text-xs uppercase tracking-[0.22em] hover:bg-emerald-800"
              >
                Read Full Story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7" data-parallax="layer-2">
            <div className="relative">
              <div className="absolute -inset-2 border border-sand-300/40 pointer-events-none" />
              <div className="relative aspect-[16/10] overflow-hidden border border-sand-300/35">
                <Image
                  src={homeMedia.atelierPortrait.src}
                  alt={homeMedia.atelierPortrait.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-emerald-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-ivory">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-sand-200/85">Begum Atelier</p>
                  <p className="font-display text-xl md:text-2xl mt-1">Where each bridal story is hand-built</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-3">
              {storyMilestones.map((item) => (
                <article key={item.year} data-parallax="card" className="border border-sand-300/45 bg-sand-50/80 p-4">
                  <p className="font-display text-2xl text-emerald-900 leading-none">{item.year}</p>
                  <h3 className="mt-2 text-sm text-charcoal font-semibold">{item.title}</h3>
                  <p className="mt-2 text-xs text-charcoal/75 leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
