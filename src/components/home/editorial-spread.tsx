import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { homeMedia } from "@/lib/data/home-media";

export function EditorialSpread() {
  return (
    <section data-parallax-section className="parallax-scene py-24 md:py-32 bg-sand-50/30">
      <Container>
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="ed-left md:col-span-7 relative" data-parallax="layer-2">
            <div className="group aspect-[4/5] relative overflow-hidden">
              <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={homeMedia.editorialFeature.src}
                  alt={homeMedia.editorialFeature.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-sand-300 font-medium">Featured</p>
                <h3 className="font-display text-2xl md:text-4xl text-ivory mt-2 leading-tight">The Zari Dream</h3>
                <p className="text-sm text-sand-200/70 mt-2 max-w-md leading-relaxed">
                  Four months in the making. Hand-embroidered in gold thread by Muhammad Ali in Lahore.
                </p>
              </div>
            </div>
          </div>

          <div className="ed-right md:col-span-5 space-y-6 md:space-y-8" data-parallax="layer-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-sand-500 font-medium">Editorial</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] text-emerald-800 leading-[0.92] mt-3">
                Dressed in<br />centuries of<br />craft
              </h2>
              <div className="w-10 h-px bg-sand-400 mt-5 mb-5" />
              <p className="text-charcoal/50 text-sm md:text-base leading-relaxed font-light">
                Every Begum piece begins with a single thread, a master karigar, and a vision passed down through generations. From the ateliers of Lahore to weddings worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="ed-grid-img aspect-square relative overflow-hidden" data-parallax="card">
                <Image
                  src={homeMedia.craftDetail.src}
                  alt={homeMedia.craftDetail.alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-[10px] text-ivory/80 uppercase tracking-wider">Zardozi detail</p>
                </div>
              </div>
              <div className="ed-grid-img aspect-square relative overflow-hidden" data-parallax="card">
                <Image
                  src="https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=600&q=85"
                  alt="Close-up of delicate cream-colored lace fabric with floral embroidery patterns"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-[10px] text-ivory/80 uppercase tracking-wider">Dabka work</p>
                </div>
              </div>
            </div>

            <Link
              href="/the-craft"
              className="group inline-flex items-center gap-3 text-sm font-medium text-emerald-800 hover:text-emerald-600 transition-colors"
            >
              <span>Meet the karigars</span>
              <span className="w-6 h-px bg-emerald-800/40 group-hover:w-10 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
