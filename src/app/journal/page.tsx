"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  journalArticles,
  journalCategories,
  getCategoryName,
  type JournalCategory,
} from "@/lib/data/journal";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<JournalCategory | "all">("all");

  const featured = journalArticles.find((a) => a.featured) ?? journalArticles[0];
  const rest = journalArticles.filter((a) => a.slug !== featured.slug);
  const visible =
    activeCategory === "all" ? rest : rest.filter((a) => a.category === activeCategory);
  const showFeatured = activeCategory === "all" || featured.category === activeCategory;

  return (
    <div className="bg-ivory pt-32 md:pt-40 pb-28">
      <Container>
        {/* Header + category filter */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-sand-700 font-medium">Journal</p>
          <h1 className="mt-4 font-display text-emerald-950 text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[0.92] max-w-[16ch]">
            Stories from the atelier, and honest advice around it
          </h1>
          <p className="mt-5 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-[54ch]">
            Real weddings in the bride&rsquo;s own words, styling guides that tell you the truth,
            and the culture behind the craft.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 text-[11px] uppercase tracking-[0.16em] border transition-colors",
              activeCategory === "all"
                ? "bg-emerald-900 text-ivory border-emerald-900"
                : "border-sand-400/60 text-charcoal/65 hover:border-emerald-900/40 hover:text-charcoal"
            )}
          >
            All
          </button>
          {journalCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={cn(
                "px-4 py-2 text-[11px] uppercase tracking-[0.16em] border transition-colors",
                activeCategory === c.slug
                  ? "bg-emerald-900 text-ivory border-emerald-900"
                  : "border-sand-400/60 text-charcoal/65 hover:border-emerald-900/40 hover:text-charcoal"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {showFeatured && (
          <Reveal className="mt-12">
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid lg:grid-cols-12 border border-sand-300/55 bg-sand-50/50 hover:border-emerald-900/25 transition-colors"
            >
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                  <span className="border border-sand-400/60 px-2.5 py-1 text-sand-700">
                    {getCategoryName(featured.category)}
                  </span>
                  <span className="text-charcoal/55">Featured</span>
                </div>
                <h2 className="mt-5 font-display text-3xl md:text-4xl text-emerald-900 leading-[1.02]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-charcoal/55">
                  <span>{featured.author}</span>
                  <span aria-hidden>&middot;</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-900">
                  Read the feature
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Asymmetric article grid */}
        {visible.length > 0 ? (
          <div className="mt-6 grid md:grid-cols-12 gap-6">
            {visible.map((article, i) => {
              // Alternating 7/5 rhythm keeps the grid editorial, not uniform.
              const wide = i % 4 === 0 || i % 4 === 3;
              return (
                <Reveal
                  key={article.slug}
                  delay={(i % 2) * 0.07}
                  as="article"
                  className={cn(wide ? "md:col-span-7" : "md:col-span-5")}
                >
                  <Link href={`/journal/${article.slug}`} className="group block h-full border border-sand-300/55 bg-ivory hover:border-emerald-900/25 transition-colors">
                    <div className={cn("relative overflow-hidden", wide ? "aspect-[16/9]" : "aspect-[4/3]")}>
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                        <span className="border border-sand-400/60 px-2.5 py-1 text-sand-700">
                          {getCategoryName(article.category)}
                        </span>
                        <span className="text-charcoal/50">{article.readTime}</span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl md:text-[1.7rem] text-emerald-900 leading-tight">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm text-charcoal/72 leading-relaxed">{article.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          !showFeatured && (
            <p className="mt-16 text-center text-charcoal/55">No stories in this category yet.</p>
          )
        )}

        {/* Newsletter — in-brand, no popup theatrics */}
        <Reveal className="mt-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center border border-sand-300/55 bg-emerald-950 p-10 md:p-14">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.24em] text-sand-300/80">The Begum Letter</p>
              <p className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight max-w-[24ch]">
                One considered letter a month. Craft, weddings, and no noise.
              </p>
            </div>
            <NewsletterForm className="lg:col-span-5" />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
