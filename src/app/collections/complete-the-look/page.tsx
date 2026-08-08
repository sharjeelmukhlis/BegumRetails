import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data/products";
import type { Occasion } from "@/lib/types";

export const metadata = {
  title: "Complete the Look — Begum",
  description: "Curated full-outfit edits for Mehndi, Nikkah, Baraat, and Walima.",
};

const edits: { name: string; occasion: Occasion; blurb: string }[] = [
  {
    name: "Baraat Bridal Edit",
    occasion: "baraat",
    blurb: "Court-weight lehengas, polki, khussa — one entrance.",
  },
  {
    name: "Mehndi Festive Edit",
    occasion: "mehndi",
    blurb: "Light enough to dance. Loud enough to photograph.",
  },
  {
    name: "Nikkah Serene Edit",
    occasion: "nikkah",
    blurb: "Ivories, soft golds, restrained embroidery.",
  },
];

export default function CompleteTheLookPage() {
  return (
    <PageShell>
      <Container>
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">
            Styled Edits
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
            Complete the Look
          </h1>
          <p className="text-charcoal/60 mt-3 max-w-xl">
            Curated full-outfit edits — because a Begum is dressed head to toe.
          </p>
        </div>

        {edits.map((outfit) => {
          const items = products.filter((p) => p.occasion.includes(outfit.occasion));
          return (
            <div key={outfit.occasion} className="mb-16">
              <div className="mb-6">
                <h2 className="font-display text-2xl text-emerald-800">{outfit.name}</h2>
                <p className="text-sm text-charcoal/55 mt-1">{outfit.blurb}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {items.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </PageShell>
  );
}
