import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data/products";
import type { Occasion } from "@/lib/types";

export const metadata = {
  title: "Complete the Look Begum",
  description: "Curated full-outfit edits for Mehndi, Nikkah, Baraat, and Walima.",
};

const edits: { name: string; occasion: Occasion; blurb: string; palette: string }[] = [
  {
    name: "Baraat Bridal Suite",
    occasion: "baraat",
    blurb: "Court-weight royal crimson & emerald lehengas, gold dabka embroidery, antique polki, and handcrafted khussa.",
    palette: "Royal Crimson · Gold Zardozi · Emerald",
  },
  {
    name: "Walima Luminous Suite",
    occasion: "walima",
    blurb: "Sophisticated pastel silks, champagne zari work, fine pearl passas, and flowing reception silhouettes.",
    palette: "Champagne · Dusty Rose · Pearl Nakshi",
  },
  {
    name: "Nikkah Serene Suite",
    occasion: "nikkah",
    blurb: "Pure raw ivory silks, restrained antique gold embellishment, sheer tulle dupattas, and understated grace.",
    palette: "Warm Ivory · Antique Gold · Pure Organza",
  },
  {
    name: "Mehndi Festive Suite",
    occasion: "mehndi",
    blurb: "Vibrant mustard, saffron, and jewel-tone chatta patti lehengas. Light enough to dance all night, loud enough to photograph.",
    palette: "Mustard Gold · Rani Pink · Shimmering Mirror-work",
  },
];

export default function CompleteTheLookPage() {
  return (
    <PageShell>
      <Container>
        {/* ── Complete The Look Hero Banner ── */}
        <div className="relative mb-14 md:mb-16 overflow-hidden rounded-xs border border-sand-300/60 bg-emerald-950 text-ivory p-6 md:p-12 shadow-lg">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(ellipse at 80% 20%, rgba(201,151,90,0.5), transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-sand-300 font-semibold">
              The Head-to-Toe Bridal Experience
            </span>
            <h1 className="mt-3 font-display text-3xl md:text-5xl text-ivory tracking-tight">
              Complete the Look
            </h1>
            <p className="mt-3 text-sm md:text-base text-sand-100/80 leading-relaxed font-light">
              Because a true Begum is never dressed in mismatched pieces. Explore curated ensembles uniting
              the bridal lehenga, veil dupatta, fine jewellery, and heirloom khussa in perfect chromatic harmony.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/customize"
                className="inline-flex items-center gap-2 bg-sand-300 text-emerald-950 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-sand-200 transition-colors shadow-xs"
              >
                <span>Design Custom Look in Atelier</span>
              </a>
              <a
                href="https://wa.me/923209988777?text=Hi%20Begum%20Atelier!%20I%20would%20like%20assistance%20styling%20my%20complete%20bridal%20look."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-sand-400/50 text-sand-200 px-5 py-3 text-xs uppercase tracking-[0.18em] font-medium hover:bg-emerald-900 transition-colors"
              >
                <span>Stylist Consultation</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Occasion Suites ── */}
        {edits.map((outfit) => {
          const items = products.filter((p) => p.occasion.includes(outfit.occasion));
          return (
            <div key={outfit.occasion} className="mb-20 pb-12 border-b border-sand-300/40 last:border-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-sand-800 font-semibold">
                    {outfit.palette}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-1">
                    {outfit.name}
                  </h2>
                  <p className="text-sm text-charcoal/65 mt-1.5 max-w-2xl leading-relaxed">
                    {outfit.blurb}
                  </p>
                </div>
                <a
                  href={`/collections/occasion/${outfit.occasion}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-emerald-950 font-semibold hover:text-sand-800 border-b border-emerald-950/40 pb-0.5 shrink-0 transition-colors"
                >
                  <span>View All {outfit.occasion.toUpperCase()} ({items.length})</span>
                  <span>→</span>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {items.slice(0, 4).map((product, i) => (
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
