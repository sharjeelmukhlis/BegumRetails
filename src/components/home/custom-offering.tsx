import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Video, Ruler, MessageCircle } from "lucide-react";
import { homeMedia } from "@/lib/data/home-media";

const features = [
  { icon: Video, title: "Video Consultation", desc: "Meet your designer face to face, wherever you are" },
  { icon: Ruler, title: "Remote Fitting", desc: "Measure from home with guided video instructions" },
  { icon: Shield, title: "Staged Payment (30/40/30)", desc: "Pay as you approve each production stage" },
  { icon: MessageCircle, title: "Real-Time Updates", desc: "Progress photos via WhatsApp at every step" },
];

export function CustomOffering() {
  return (
    <section data-parallax-section className="parallax-scene relative py-32 md:py-44 bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/50 to-transparent" />

      <Container>
        <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <div className="relative" data-parallax="layer-2">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={homeMedia.atelierPortrait.src}
                alt={homeMedia.atelierPortrait.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 aspect-[3/2] bg-emerald-800 p-6 md:p-8 hidden md:block">
              <p className="text-sand-300/70 text-xs uppercase tracking-wider">From the atelier</p>
              <p className="text-ivory text-sm mt-2 leading-relaxed">
                &ldquo;Tell us what you see when you close your eyes. We bring it to life.&rdquo;
              </p>
            </div>
          </div>

          <div data-parallax="layer-1">
            <p className="text-xs uppercase tracking-[0.25em] text-sand-500 font-medium">
              Bespoke, from Anywhere
            </p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] text-emerald-800 leading-[0.92] mt-3">
              Designed for the bride who cannot fly to Lahore
            </h2>
            <p className="text-charcoal/50 mt-5 leading-relaxed text-base md:text-lg font-light">
              A full bridal lehenga, designed remotely, fitted perfectly with progress photos, video calls, and staged payments so you are never left wondering.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3" data-parallax="card">
                  <f.icon size={20} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-charcoal">{f.title}</h4>
                    <p className="text-xs text-charcoal/50 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/customize">
                  Start Your Design <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/customize/consultation">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
