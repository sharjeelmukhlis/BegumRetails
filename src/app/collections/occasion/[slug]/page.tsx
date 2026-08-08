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
    title: `${occasion.name} Collection — Begum`,
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

  return (
    <PageShell>
      <Container>
        <CollectionPLP
          products={occasionProducts}
          title={occasion.name}
          description={occasion.description}
          eyebrow="Collection"
          lockedOccasion={slug as Occasion}
          initialParams={initialParams}
        />
      </Container>
    </PageShell>
  );
}
