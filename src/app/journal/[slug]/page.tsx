import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  journalArticles,
  getArticleBySlug,
  getRelatedArticles,
  getCategoryName,
} from "@/lib/data/journal";
import { resolveArticleFaqs, whatsappArticleUrl } from "@/lib/data/faqs";
import { FAQSection } from "@/components/shared/faq-section";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} Begum Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 2);
  const faqs = resolveArticleFaqs(article.slug);
  const waHref = whatsappArticleUrl(article.title, article.slug);
  // Place the pull quote roughly mid-article for editorial rhythm.
  const pullQuoteAfter = article.pullQuote
    ? Math.max(1, Math.floor(article.body.length / 2))
    : -1;

  return (
    <article className="bg-ivory pb-28">
      {/* Hero */}
      <div className="relative h-[62vh] min-h-[420px] bg-emerald-950">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-emerald-950/35" />
        <Container className="absolute inset-x-0 bottom-0 pb-12 md:pb-16">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-sand-200/85 hover:text-ivory transition-colors"
          >
            <ArrowLeft size={14} /> Journal
          </Link>
          <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
            <span className="border border-sand-300/50 bg-emerald-950/50 backdrop-blur-sm px-2.5 py-1 text-sand-200">
              {getCategoryName(article.category)}
            </span>
          </div>
          <h1 className="mt-4 font-display text-ivory text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.02] max-w-[22ch]">
            {article.title}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-xs md:text-sm text-sand-100/75">
            <span>{article.author}</span>
            <span aria-hidden>&middot;</span>
            <span>{article.date}</span>
            <span aria-hidden>&middot;</span>
            <span>{article.readTime}</span>
          </div>
        </Container>
      </div>

      {/* Body constrained reading measure */}
      <Container>
        <div className="mx-auto max-w-[68ch] mt-14 md:mt-20">
          {article.body.map((paragraph, i) => {
            const imagesAfter = article.inlineImages?.filter((img) => img.afterParagraph === i) ?? [];
            return (
              <div key={i} className="mt-6 first:mt-0">
                <p className="text-base md:text-lg text-charcoal/82 leading-[1.9]">
                  {paragraph}
                </p>
                {imagesAfter.map((img, j) => (
                  <figure key={j} className="my-10">
                    <div className="relative w-full aspect-[16/9] md:aspect-[3/2] overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 68ch"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-3 text-xs text-sand-600 text-center italic leading-relaxed max-w-prose mx-auto">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
                {i === pullQuoteAfter && article.pullQuote && (
                  <blockquote className="my-12 border-l-2 border-sand-500/70 pl-6 md:pl-8 md:-ml-10">
                    <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] text-sand-700 leading-snug">
                      &ldquo;{article.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            );
          })}

          {/* Shop the Story editorial, not banner-ad */}
          {article.shopTheStory && article.shopTheStory.length > 0 && (
            <aside className="mt-14 border-t border-b border-sand-300/60 py-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-sand-700">Shop the Story</p>
              <div className="mt-5 space-y-4">
                {article.shopTheStory.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-display text-lg md:text-xl text-emerald-900 group-hover:text-emerald-700 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-0.5">{item.note}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-emerald-900/60 group-hover:text-emerald-900 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </aside>
          )}

          {/* Topic-specific questions before related articles */}
          <FAQSection
            items={faqs}
            heading="Common questions"
            whatsappHref={waHref}
            whatsappLabel="Still wondering? Ask us on WhatsApp this article is already in the message"
            variant="editorial"
          />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mx-auto max-w-5xl mt-20">
            <p className="text-xs uppercase tracking-[0.25em] text-sand-700 font-medium">Keep Reading</p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/journal/${rel.slug}`}
                  className="group flex gap-5 border border-sand-300/55 bg-sand-50/50 p-4 hover:border-emerald-900/25 transition-colors"
                >
                  <div className="relative w-28 md:w-36 shrink-0 aspect-[4/5] overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                      sizes="144px"
                    />
                  </div>
                  <div className="py-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-sand-700">
                      {getCategoryName(rel.category)}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-emerald-900 leading-tight">{rel.title}</h3>
                    <p className="mt-2 text-xs text-charcoal/60">{rel.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Closing collection CTA */}
            <Link
              href="/collections"
              className="group mt-10 flex items-center justify-between border border-sand-300/55 bg-emerald-950 p-8 md:p-10 hover:bg-emerald-900 transition-colors"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-300/80">From reading to looking</p>
                <p className="mt-2 font-display text-xl md:text-2xl text-ivory">Browse the collections</p>
              </div>
              <ArrowRight size={18} className="text-sand-200 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Container>
    </article>
  );
}
