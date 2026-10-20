import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { CollectionPLP } from "@/components/collection/collection-plp";
import { occasions, getProductsByOccasion } from "@/lib/data/products";
import type { Occasion } from "@/lib/types";

export function generateStaticParams() {
  return occasions.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const occasion = occasions.find((o) => o.slug === slug);
  if (!occasion) return {};
  return {
    title: `${occasion.name} Collection Begum`,
    description: occasion.description,
  };
}

export default async function OccasionPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await props.params;
  const initialParams = await props.searchParams;
  const occasion = occasions.find((o) => o.slug === slug);
  if (!occasion) notFound();

  const occasionProducts = getProductsByOccasion(slug as Occasion);
  const otherOccasions = occasions.filter((o) => o.slug !== slug);

  return (
    <PageShell>
      <Container>
        {/* ── Occasion Editorial Hero Vignette ── */}
        <div className="relative mb-10 md:mb-12 overflow-hidden rounded-xs border border-sand-300/60 bg-emerald-950 text-ivory p-6 md:p-10 shadow-lg">
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url(${occasion.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/40" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-sand-300 font-semibold">
              Begum Bridal Suite · {occasion.name} Edition
            </span>
            <h1 className="mt-2 font-display text-3xl md:text-5xl text-ivory tracking-tight">
              {occasion.name} Masterpieces
            </h1>
            <p className="mt-3 text-sm md:text-base text-sand-100/80 leading-relaxed font-light">
              {occasion.description} Handcrafted in Lahore by master karigars for your memorable entrance.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`/customize?garment=lehenga&occasion=${slug}`}
                className="inline-flex items-center gap-2 bg-sand-300 text-emerald-950 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-sand-200 transition-colors shadow-xs"
              >
                <span>Customize in Virtual Atelier</span>
              </a>
              <span className="text-xs text-sand-300/70">
                {occasionProducts.length} pieces curated for this ritual
              </span>
            </div>
          </div>
        </div>

        {/* ── Occasion Fast Switcher Bar ── */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/50 shrink-0 mr-1">
            Other Occasions:
          </span>
          {otherOccasions.map((o) => (
            <a
              key={o.slug}
              href={`/collections/occasion/${o.slug}`}
              className="shrink-0 px-3 py-1.5 text-xs rounded-full border border-sand-300/70 bg-white/60 text-charcoal/80 hover:bg-emerald-950 hover:text-sand-200 hover:border-emerald-950 transition-all font-medium"
            >
              {o.name}
            </a>
          ))}
        </div>

        <CollectionPLP
          products={occasionProducts}
          title={`${occasion.name} Pieces`}
          description={`Browse all bespoke bridal lehengas, dupattas, fine jewellery, and accessories styled specifically for the ${occasion.name}.`}
          eyebrow="Occasion Curation"
          lockedOccasion={slug as Occasion}
          initialParams={initialParams}
        />
      </Container>
    </PageShell>
  );
}
