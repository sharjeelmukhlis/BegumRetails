"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  journalArticles,
  journalCategories,
  getCategoryName,
  type JournalCategory,
  type JournalArticle,
} from "@/lib/data/journal";
import {
  ArrowRight,
  Search,
  X,
  Clock,
  BookOpen,
  LayoutGrid,
  List,
  Compass,
  ChevronRight,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Curated Reading Pathways for Brides
interface ReadingTrack {
  id: string;
  label: string;
  tagline: string;
  slugs: string[];
}

const READING_TRACKS: ReadingTrack[] = [
  {
    id: "all",
    label: "All Topics",
    tagline: "Explore the full editorial archive",
    slugs: [],
  },
  {
    id: "baraat",
    label: "The Royal Baraat",
    tagline: "Mughal court heritage & high-zardozi weight",
    slugs: ["what-is-a-begum", "zardozi-guide", "reading-the-rituals"],
  },
  {
    id: "diaspora",
    label: "The Diaspora Bride",
    tagline: "Bespoke ordering from London, Toronto, Dubai & USA",
    slugs: [
      "order-pakistani-bridal-wear-from-abroad",
      "zaras-london-baraat",
      "how-to-choose-lehenga-length",
    ],
  },
  {
    id: "festive",
    label: "The Festive Mehndi",
    tagline: "Lightweight resham, dancing, & ritual dress codes",
    slugs: ["mehndi-dressing-guide", "reading-the-rituals"],
  },
];

type ReadTimeFilter = "all" | "short" | "medium" | "deep";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<JournalCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [readTimeFilter, setReadTimeFilter] = useState<ReadTimeFilter>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get current active track
  const currentTrack = READING_TRACKS.find((t) => t.id === selectedTrack) || READING_TRACKS[0];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: journalArticles.length };
    journalCategories.forEach((c) => {
      counts[c.slug] = journalArticles.filter((a) => a.category === c.slug).length;
    });
    return counts;
  }, []);

  // Filtered Articles Logic
  const filteredArticles = useMemo(() => {
    return journalArticles.filter((article) => {
      // 1. Category Filter
      if (activeCategory !== "all" && article.category !== activeCategory) {
        return false;
      }

      // 2. Reading Track Filter
      if (selectedTrack !== "all" && currentTrack.slugs.length > 0) {
        if (!currentTrack.slugs.includes(article.slug)) {
          return false;
        }
      }

      // 3. Read Time Filter
      const minutes = parseInt(article.readTime, 10) || 5;
      if (readTimeFilter === "short" && minutes > 5) return false;
      if (readTimeFilter === "medium" && (minutes < 5 || minutes > 9)) return false;
      if (readTimeFilter === "deep" && minutes < 10) return false;

      // 4. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = article.title.toLowerCase().includes(query);
        const inExcerpt = article.excerpt.toLowerCase().includes(query);
        const inAuthor = article.author.toLowerCase().includes(query);
        const inCategory = getCategoryName(article.category).toLowerCase().includes(query);
        const inBody = article.body.some((p) => p.toLowerCase().includes(query));
        if (!inTitle && !inExcerpt && !inAuthor && !inCategory && !inBody) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedTrack, currentTrack, readTimeFilter, searchQuery]);

  // Lead Featured Article (Zardozi or What is a Begum)
  const leadFeature: JournalArticle =
    journalArticles.find((a) => a.slug === "what-is-a-begum") || journalArticles[0];

  const hasActiveFilters =
    activeCategory !== "all" ||
    selectedTrack !== "all" ||
    readTimeFilter !== "all" ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setActiveCategory("all");
    setSelectedTrack("all");
    setReadTimeFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="bg-[#FAF7F2] text-charcoal selection:bg-sand-300 selection:text-emerald-950 pb-28">
      {/* ─────────────────────────────────────────────────────────
          0. ARCHIVAL FOLIO TOP BAR & LUXURY BREADCRUMB
          ───────────────────────────────────────────────────────── */}
      <div className="pt-28 md:pt-34 border-b border-sand-300/80 bg-ivory/80 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] uppercase font-mono tracking-[0.24em] text-charcoal/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sand-600 inline-block animate-pulse" />
              <span>ARCHIVE FOLIO N° 06 &bull; THE ATELIER GAZETTE &amp; ESSAYS</span>
            </div>
            <div className="flex items-center gap-4 text-charcoal/50">
              <span>31.5204° N, 74.3587° E</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>MOCHI GATE &bull; GULBERG III LAHORE</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>EST. 1994</span>
            </div>
          </div>

          <nav
            aria-label="Breadcrumb"
            className="py-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-charcoal/50 border-t border-sand-200"
          >
            <Link href="/" className="hover:text-emerald-900 transition-colors">
              Atelier
            </Link>
            <ChevronRight size={11} className="text-sand-400" />
            <span className="text-emerald-950 font-semibold">The Journal &amp; Gazette</span>
          </nav>
        </Container>
      </div>

      {/* ─────────────────────────────────────────────────────────
          1. CINEMATIC EDITORIAL MASTHEAD
          ───────────────────────────────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-12 border-b border-sand-300/70 bg-sand-50/50">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-emerald-950 text-sand-300 border border-sand-400 flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                  ر
                </span>
                <span className="text-[11px] uppercase font-mono tracking-[0.28em] text-sand-800 font-bold">
                  روزنامچہ &bull; Roznamcha &bull; The Atelier Gazette
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-emerald-950 text-[clamp(2.5rem,6vw,5.2rem)] leading-[0.94] font-serif tracking-tight">
                Essays from the atelier, and the craft behind the gown.
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-base md:text-lg text-charcoal/75 leading-relaxed font-light max-w-[56ch]">
                Real weddings told in the bride&apos;s own words, technical styling guides that tell the truth about weight and drape, and the Mughal history behind every zardozi stitch.
              </p>
            </Reveal>

            {/* Publication Metadata Strip */}
            <Reveal delay={0.2}>
              <div className="mt-8 pt-6 border-t border-sand-300/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-[11px] font-mono uppercase tracking-wider text-charcoal/60">
                <span>Vol. IV &bull; No. 12</span>
                <span>&bull;</span>
                <span>Written in Gulberg III, Lahore</span>
                <span>&bull;</span>
                <span>Read by 14,000+ Diaspora Brides Globally</span>
                <span>&bull;</span>
                <span className="text-emerald-900 font-bold">0% Sponsored Placements</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. CURATED READING PATHWAYS ("THE BRIDE'S COMPANION")
          ───────────────────────────────────────────────────────── */}
      <section className="py-8 bg-ivory border-b border-sand-300/80">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Compass size={15} className="text-sand-700 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-950 font-bold">
                Curated Reading Paths:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {READING_TRACKS.map((track) => {
                const isSelected = track.id === selectedTrack;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrack(track.id);
                      if (track.id !== "all") setActiveCategory("all");
                    }}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all border flex items-center gap-1.5",
                      isSelected
                        ? "bg-emerald-950 text-sand-200 border-emerald-950 shadow-xs"
                        : "bg-sand-50/80 text-charcoal/75 border-sand-300 hover:border-emerald-900/40"
                    )}
                  >
                    <span>{track.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sand-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. COVER FEATURE: DOUBLE-WIDE EDITORIAL MAGAZINE SPREAD
          ───────────────────────────────────────────────────────── */}
      {selectedTrack === "all" && activeCategory === "all" && !searchQuery.trim() && (
        <section className="py-12 md:py-16">
          <Container>
            <div className="relative border-2 border-sand-400 bg-ivory shadow-lg overflow-hidden group">
              <div className="grid lg:grid-cols-12 items-stretch">
                {/* Left: Atmospheric Portrait with Gold Foil Offset */}
                <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] overflow-hidden bg-sand-100">
                  <Image
                    src={leadFeature.image}
                    alt={leadFeature.imageAlt}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-103"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-950/90 text-sand-200 text-[10px] font-mono uppercase tracking-widest font-bold border border-sand-400/40 shadow-sm">
                      Cover Feature &bull; Vol. IV
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sand-100 text-xs font-mono flex items-center justify-between">
                    <span>Atelier Archival Dispatch</span>
                    <span className="text-sand-300 uppercase">{leadFeature.readTime}</span>
                  </div>
                </div>

                {/* Right: Essay Dossier */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] uppercase font-mono tracking-widest text-sand-800 pb-3 border-b border-sand-200">
                      <span>{getCategoryName(leadFeature.category)}</span>
                      <span>&bull;</span>
                      <span>{leadFeature.date}</span>
                    </div>

                    <h2 className="mt-4 font-display text-3xl sm:text-4xl text-emerald-950 font-serif leading-[1.08]">
                      {leadFeature.title}
                    </h2>

                    {leadFeature.pullQuote && (
                      <p className="mt-4 text-xs font-serif italic text-sand-900 border-l-2 border-sand-500 pl-3 leading-relaxed">
                        &ldquo;{leadFeature.pullQuote}&rdquo;
                      </p>
                    )}

                    <p className="mt-4 text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light line-clamp-4">
                      {leadFeature.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand-200">
                    <div className="flex items-center justify-between gap-4 mb-4 text-xs text-charcoal/60 font-mono">
                      <span>By {leadFeature.author}</span>
                      <span>{leadFeature.readTime}</span>
                    </div>

                    <Link
                      href={`/journal/${leadFeature.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-950 text-sand-100 text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-emerald-900 transition-colors shadow-sm group-hover:bg-emerald-900"
                    >
                      <span>Read the Full Feature</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────
          4. INTERACTIVE SEARCH, CATEGORY TABS & VIEW SWITCHER
          ───────────────────────────────────────────────────────── */}
      <section className="py-6 sticky top-20 z-20 bg-ivory/95 backdrop-blur-md border-y border-sand-300/80 shadow-xs">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays, zardozi, London wedding..."
                className="w-full bg-sand-50/90 border border-sand-300 pl-9 pr-9 py-2 text-xs text-emerald-950 placeholder:text-charcoal/40 focus:border-emerald-900 focus:outline-none transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-emerald-950"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Read Time & Layout Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              {/* Read Time Dropdown */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Clock size={13} className="text-sand-700" />
                <select
                  value={readTimeFilter}
                  onChange={(e) => setReadTimeFilter(e.target.value as ReadTimeFilter)}
                  aria-label="Filter by reading time"
                  className="bg-sand-50/90 border border-sand-300 py-1.5 px-2 text-xs text-charcoal focus:outline-none font-mono"
                >
                  <option value="all">All Read Times</option>
                  <option value="short">&lt; 5 min read</option>
                  <option value="medium">5 &ndash; 9 min read</option>
                  <option value="deep">10+ min deep dive</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-sand-300 bg-sand-50/90 p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid layout"
                  className={cn(
                    "p-1.5 transition-colors",
                    viewMode === "grid" ? "bg-emerald-950 text-sand-200" : "text-charcoal/50 hover:text-charcoal"
                  )}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List layout"
                  className={cn(
                    "p-1.5 transition-colors",
                    viewMode === "list" ? "bg-emerald-950 text-sand-200" : "text-charcoal/50 hover:text-charcoal"
                  )}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-sand-200/60">
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedTrack("all");
              }}
              className={cn(
                "px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors border flex items-center gap-1.5",
                activeCategory === "all" && selectedTrack === "all"
                  ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-xs"
                  : "bg-sand-50/70 border-sand-300 text-charcoal/70 hover:border-emerald-900/40"
              )}
            >
              <span>All Dispatches</span>
              <span className="text-[9px] opacity-75">({categoryCounts.all})</span>
            </button>

            {journalCategories.map((c) => {
              const isSelected = activeCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => {
                    setActiveCategory(c.slug);
                    setSelectedTrack("all");
                  }}
                  className={cn(
                    "px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors border flex items-center gap-1.5",
                    isSelected
                      ? "bg-emerald-950 text-sand-100 border-emerald-950 shadow-xs"
                      : "bg-sand-50/70 border-sand-300 text-charcoal/70 hover:border-emerald-900/40"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="text-[9px] opacity-75">({categoryCounts[c.slug] || 0})</span>
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto text-[10px] font-mono uppercase tracking-wider text-emerald-950 underline underline-offset-4 hover:text-sand-800"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. MAIN EDITORIAL DISPATCHES COLLECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-ivory border border-sand-300 p-8 max-w-lg mx-auto space-y-4">
              <BookOpen size={32} className="mx-auto text-sand-700" />
              <h3 className="font-display text-2xl text-emerald-950 font-serif">
                No Dispatches Found
              </h3>
              <p className="text-xs text-charcoal/65 font-light">
                No articles match your selected filters or search terms. Try searching for &ldquo;zardozi&rdquo;, &ldquo;lehenga&rdquo;, or &ldquo;London&rdquo;.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-950 text-sand-100 text-xs font-mono uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ── VIEW MODE: EDITORIAL ASYMMETRIC GRID ── */
            <div className="grid md:grid-cols-12 gap-8 items-stretch">
              {filteredArticles.map((article, i) => {
                // Alternating rhythm: 7/5 columns for high-fashion editorial texture
                const isWide = i % 4 === 0 || i % 4 === 3;
                return (
                  <Reveal
                    key={article.slug}
                    delay={(i % 2) * 0.06}
                    as="article"
                    className={cn(
                      "flex flex-col",
                      isWide ? "md:col-span-7" : "md:col-span-5"
                    )}
                  >
                    <Link
                      href={`/journal/${article.slug}`}
                      className="group flex flex-col h-full bg-ivory border border-sand-300 hover:border-sand-500 hover:shadow-md transition-all overflow-hidden"
                    >
                      {/* Image container */}
                      <div
                        className={cn(
                          "relative overflow-hidden bg-sand-100 border-b border-sand-200",
                          isWide ? "aspect-[16/10]" : "aspect-[4/3]"
                        )}
                      >
                        <Image
                          src={article.image}
                          alt={article.imageAlt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-104"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-xs text-sand-200 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border border-sand-400/40">
                          {getCategoryName(article.category)}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-ivory/90 text-emerald-950 px-2 py-0.5 text-[9px] font-mono uppercase">
                          {article.readTime}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-charcoal/50 uppercase tracking-wider mb-2">
                            <span>{article.date}</span>
                            <span>&bull;</span>
                            <span>By {article.author}</span>
                          </div>

                          <h3 className="font-display text-2xl sm:text-[26px] text-emerald-950 font-serif leading-[1.12] group-hover:text-emerald-800 transition-colors">
                            {article.title}
                          </h3>

                          {article.pullQuote && isWide && (
                            <p className="mt-3 text-xs font-serif italic text-sand-900 border-l-2 border-sand-400 pl-3 leading-relaxed">
                              &ldquo;{article.pullQuote}&rdquo;
                            </p>
                          )}

                          <p className="mt-3 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-emerald-950">
                          <span className="font-semibold group-hover:underline">Read Essay</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-sand-700" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            /* ── VIEW MODE: ARCHIVAL COMPACT INDEX LIST ── */
            <div className="border border-sand-300 bg-ivory divide-y divide-sand-200 shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-[10px] font-mono uppercase tracking-widest text-charcoal/50 bg-sand-50 border-b border-sand-300">
                <span className="col-span-2">Folio Date</span>
                <span className="col-span-2">Category</span>
                <span className="col-span-5">Essay Title &amp; Synopsis</span>
                <span className="col-span-2">Author &amp; Time</span>
                <span className="col-span-1 text-right">Read</span>
              </div>

              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group grid md:grid-cols-12 gap-4 p-6 sm:p-5 items-center hover:bg-sand-50/80 transition-colors"
                >
                  <div className="md:col-span-2 text-xs font-mono text-charcoal/50">
                    {article.date}
                  </div>
                  <div className="md:col-span-2">
                    <span className="inline-block px-2.5 py-0.5 bg-sand-100 text-sand-900 border border-sand-300 text-[10px] font-mono uppercase">
                      {getCategoryName(article.category)}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-lg text-emerald-950 font-serif leading-snug group-hover:text-emerald-800 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-charcoal/60 line-clamp-1 mt-0.5 font-light">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-2 text-xs font-mono text-charcoal/60">
                    <span className="block text-emerald-950">{article.author}</span>
                    <span className="text-[10px]">{article.readTime}</span>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-sand-100 group-hover:bg-emerald-950 group-hover:text-sand-200 transition-colors flex items-center justify-center text-charcoal/60">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. VOICE OF THE ATELIER / EDITOR'S NOTE
          ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-sand-50/70 border-y border-sand-300">
        <Container>
          <div className="max-w-4xl mx-auto bg-ivory border-2 border-sand-300 p-8 sm:p-12 shadow-sm relative">
            <Quote size={28} className="text-sand-600 mb-3" />
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-bold block mb-2">
              Note from the Editor &bull; Lahore Atelier
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 font-serif leading-tight">
              Why We Write Without Corporate Noise
            </h3>
            <div className="w-12 h-0.5 bg-sand-400 my-4" />
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
              Every dispatch published in this journal is authored by our master karigars, fitting specialists, and design directors in Lahore. We strictly refuse paid product sponsorships or synthetic commercial shortcuts. If a specific base fabric will crease during a four-hour limousine ride to the wedding banquet, or if an embroidery border requires eight weeks rather than four, we publish the truth here first.
            </p>
            <div className="mt-6 pt-4 border-t border-sand-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-emerald-950 font-bold">Sherjeel Mukhlis &amp; The Begum Editorial Council</span>
              <span className="text-charcoal/50">Gulberg III, Lahore, Pakistan</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7. THE BEGUM LETTER — MONTHLY ARCHIVAL PRINT NEWSLETTER
          ───────────────────────────────────────────────────────── */}
      <section className="pt-16">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-center border-2 border-sand-400 bg-emerald-950 p-10 md:p-14 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                <span className="font-display text-[140px] font-serif font-black text-ivory">
                  بیگم
                </span>
              </div>
              <div className="lg:col-span-7 relative z-10 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.26em] text-sand-300 font-bold block">
                  The Monthly Dispatch
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-ivory font-serif leading-tight">
                  The Begum Letter
                </h3>
                <p className="text-sm text-sand-100/80 leading-relaxed font-light max-w-[48ch]">
                  One considered dispatch a month. Karigar interviews, unretouched real bride photography, and early access to bespoke appointment slots. Zero marketing spam.
                </p>
              </div>
              <div className="lg:col-span-5 relative z-10">
                <NewsletterForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
