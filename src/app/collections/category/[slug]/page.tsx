import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { CollectionPLP } from "@/components/collection/collection-plp";
import { categories, getProductsByCategory, getCategoryCounts } from "@/lib/data/products";
import type { Category } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Begum`,
    description: `Shop ${category.name.toLowerCase()} from the Begum bridal atelier.`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await props.params;
  const initialParams = await props.searchParams;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);
  const liveCount =
    getCategoryCounts().find((c) => c.slug === slug)?.count ?? categoryProducts.length;

  const otherCategories = categories.filter((c) => c.slug !== slug).slice(0, 8);

  return (
    <PageShell>
      <Container>
        {/* ── Category Fast Switcher Pills ── */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/50 shrink-0 mr-1">
            Other Categories:
          </span>
          {otherCategories.map((c) => (
            <a
              key={c.slug}
              href={`/collections/category/${c.slug}`}
              className="shrink-0 px-3 py-1.5 text-xs rounded-full border border-sand-300/70 bg-white/60 text-charcoal/80 hover:bg-emerald-950 hover:text-sand-200 hover:border-emerald-950 transition-all font-medium"
            >
              {c.name}
            </a>
          ))}
        </div>

        <CollectionPLP
          products={categoryProducts}
          title={category.name}
          description={`${liveCount} handcrafted ${liveCount === 1 ? "design" : "designs"} available in ${category.name.toLowerCase()} — crafted by master karigars in pure silk and precious zari.`}
          eyebrow="Atelier Category"
          lockedCategory={slug as Category}
          initialParams={initialParams}
        />
      </Container>
    </PageShell>
  );
}
