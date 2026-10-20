import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { journalEntries } from "@/lib/data/products";

export function JournalPreview() {
  return (
    <section data-parallax-section className="parallax-scene py-28 md:py-36 bg-ivory">
      <Container>
        <div className="flex items-end justify-between mb-14" data-parallax="layer-1">
          <div>
            <p className="j-label text-xs uppercase tracking-[0.25em] text-sand-500 font-medium">
              Journal
            </p>
            <h2 className="j-heading font-display text-[clamp(2rem,4.5vw,4rem)] text-emerald-800 mt-3 leading-[0.92]">
              Stories from <br />the atelier
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex text-xs uppercase tracking-wider" asChild>
            <Link href="/journal">View All <ArrowRight size={14} className="ml-1" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {journalEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className="j-card group grid md:grid-cols-2 gap-6 md:gap-8"
              data-parallax="card"
            >
              <div className="relative aspect-[4/3] md:aspect-auto bg-sand-100 overflow-hidden">
                <Image src={entry.image} alt={entry.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-sand-500 font-medium">
                  <span>{entry.date}</span>
                  <span className="w-px h-3 bg-sand-300" />
                  <span>{entry.readTime}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-emerald-800 mt-3 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-sm text-charcoal/50 mt-3 leading-relaxed font-light line-clamp-2">
                  {entry.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs text-emerald-800 mt-4 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="text-xs uppercase tracking-wider" asChild>
            <Link href="/journal">View All Articles <ArrowRight size={14} className="ml-1" /></Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
