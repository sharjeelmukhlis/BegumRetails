import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { occasions } from "@/lib/data/products";
import { ArrowUpRight } from "lucide-react";

export function ShopByOccasion() {
  const cardLayouts = [
    "md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-[500px]",
    "md:col-span-5 min-h-[200px] md:min-h-[240px]",
    "md:col-span-5 min-h-[200px] md:min-h-[240px]",
    "md:col-span-7 min-h-[320px] md:min-h-[400px]",
  ];

  return (
    <section data-parallax-section className="parallax-scene py-28 md:py-36 bg-ivory">
      <Container>
        <div className="mb-14 md:mb-20" data-parallax="layer-1">
          <p className="section-label text-[10px] uppercase tracking-[0.25em] text-sand-500 font-medium">Shop by</p>
          <h2 className="section-heading font-display text-[clamp(2.2rem,5vw,4.5rem)] text-emerald-800 mt-3 leading-[0.9]">Your Moment</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-5 auto-rows-auto">
          {occasions.map((occasion, i) => (
            <Link
              key={occasion.slug}
              href={`/collections/occasion/${occasion.slug}`}
              className={`occasion-card group relative overflow-hidden ${cardLayouts[i]}`}
              data-parallax="card"
            >
              <Image
                src={occasion.image}
                alt={`${occasion.name} bridal collection`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,202,159,0.08)_0%,transparent_60%)] z-10" />

              <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-sand-400/70 font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl text-ivory mt-2 leading-none group-hover:text-sand-300 transition-colors duration-500">
                    {occasion.name}
                  </h3>
                  <p className="text-sm text-sand-200/60 mt-3 max-w-xs leading-relaxed transition-all duration-500 line-clamp-2 md:opacity-0 md:group-hover:opacity-100">
                    {occasion.description}
                  </p>
                </div>
                <div className="absolute top-6 md:top-10 right-6 md:right-10 w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center transition-all duration-500 group-hover:bg-ivory/10 group-hover:border-ivory/40 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={16} className="text-ivory/70" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
