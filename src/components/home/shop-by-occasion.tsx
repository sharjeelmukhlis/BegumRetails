import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { occasions } from "@/lib/data/products";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function ShopByOccasion() {
  const cardLayouts = [
    "md:col-span-7 md:row-span-2 min-h-[340px] md:min-h-[520px]",
    "md:col-span-5 min-h-[220px] md:min-h-[250px]",
    "md:col-span-5 min-h-[220px] md:min-h-[250px]",
    "md:col-span-7 min-h-[340px] md:min-h-[420px]",
  ];

  return (
    <section data-parallax-section className="parallax-scene py-24 md:py-32 bg-ivory border-b border-sand-300/40">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16" data-parallax="layer-1">
          <div>
            <div className="inline-flex items-center gap-2 text-sand-600 mb-2">
              <Sparkles size={13} />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-sand-600 font-medium">
                Four Wedding Ceremonies
              </p>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] text-emerald-900 leading-[0.9]">
              Shop by Your Moment
            </h2>
            <p className="mt-3 text-xs md:text-sm text-charcoal/70 max-w-lg leading-relaxed font-light">
              From the celebratory joy of Mehndi to the regal poise of Baraat, curated silhouettes for every stage of your wedding story.
            </p>
          </div>

          <Link
            href="/collections"
            className="group hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-900 hover:text-emerald-700 transition-colors py-2 border-b border-emerald-900/30"
          >
            <span>Explore All Occasions</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-5 auto-rows-auto">
          {occasions.map((occasion, i) => (
            <Link
              key={occasion.slug}
              href={`/collections/occasion/${occasion.slug}`}
              className={`occasion-card group relative overflow-hidden border border-sand-300/40 bg-sand-100 ${cardLayouts[i]}`}
              data-parallax="card"
            >
              <Image
                src={occasion.image}
                alt={`${occasion.name} bridal couture collection`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,202,159,0.08)_0%,transparent_60%)] z-10" />

              <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-sand-300/90 font-medium">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-4 bg-sand-300/60" />
                    <span>Ceremony Edit</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-ivory mt-2 leading-none group-hover:text-sand-200 transition-colors duration-500">
                    {occasion.name}
                  </h3>
                  <p className="text-xs md:text-sm text-sand-200/80 mt-2.5 max-w-sm leading-relaxed font-light">
                    {occasion.description}
                  </p>

                  {/* Tap prompt visible on mobile and desktop */}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-sand-100 border-b border-sand-200/40 pb-0.5 group-hover:border-sand-200">
                    <span>Discover {occasion.name} Collection</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Floating Arrow badge on desktop */}
                <div className="absolute top-6 md:top-8 right-6 md:right-8 w-11 h-11 rounded-full border border-ivory/30 bg-emerald-950/30 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-ivory group-hover:text-emerald-950 text-ivory">
                  <ArrowUpRight size={17} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
