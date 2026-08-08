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
    title: `${category.name} — Begum`,
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

  return (
    <PageShell>
      <Container>
        <CollectionPLP
          products={categoryProducts}
          title={category.name}
          description={`${liveCount} ${liveCount === 1 ? "piece" : "pieces"} in this category — filter by occasion, colour, fabric, and lead time.`}
          eyebrow="Category"
          lockedCategory={slug as Category}
          initialParams={initialParams}
        />
      </Container>
    </PageShell>
  );
}
