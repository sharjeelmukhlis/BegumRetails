import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { CollectionPLP } from "@/components/collection/collection-plp";
import { products } from "@/lib/data/products";

export const metadata = {
  title: "Collections Begum",
  description: "Browse bridal lehengas, jewellery, khussa, and more filter by occasion, budget, and lead time.",
};

export default async function CollectionsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialParams = await props.searchParams;

  return (
    <PageShell>
      <Container>
        <CollectionPLP
          products={products}
          title="Find your look"
          description="Forty-plus pieces across four occasions filter to what you can actually wear, afford, and receive in time."
          eyebrow="Collections"
          initialParams={initialParams}
        />
      </Container>
    </PageShell>
  );
}
