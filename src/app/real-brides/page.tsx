import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { realBrideStories } from "@/lib/data/products";

export default function RealBridesPage() {
  return (
    <PageShell>
      <Container>
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Real Brides</p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
            Worn by Begums
          </h1>
          <p className="text-charcoal/60 mt-3">
            Real brides, real weddings — from Lahore to London, Karachi to California.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {realBrideStories.map((bride) => (
            <div key={bride.id} className="group">
              <div className="aspect-[4/5] bg-sand-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <p className="text-sm text-ivory/90 leading-relaxed italic">
                    &ldquo;{bride.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sand-300" />
                    <div>
                      <p className="text-sm font-medium text-ivory">{bride.name}</p>
                      <p className="text-xs text-sand-200/70">{bride.city} &middot; {bride.productName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-charcoal/50 text-sm">
            Are you a Begum bride? Share your photos and we might feature you here.
          </p>
        </div>
      </Container>
    </PageShell>
  );
}
