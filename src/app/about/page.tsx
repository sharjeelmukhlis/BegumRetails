import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">About</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-emerald-800 mt-4 leading-[0.9]">
            She was always royalty.
          </h1>
          <div className="w-12 h-px bg-sand-400 mx-auto my-6" />
          <p className="text-lg text-charcoal/60 leading-relaxed">
            Begum is a Pakistani bridal atelier built for the modern bride whether you are getting dressed in Lahore or designing your lehenga from London.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          <div className="aspect-[4/5] bg-sand-100" />
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-emerald-800 leading-tight">
              The name carries weight.
            </h2>
            <p className="text-charcoal/60 mt-4 leading-relaxed">
              Begum a title of Mughal nobility, a name that speaks of grace, authority, and belonging. We spell it Begum because this is for a new generation of brides who carry that same grace forward.
            </p>
            <p className="text-charcoal/60 mt-4 leading-relaxed">
              Every piece we create is handcrafted by a named karigar not a factory. Every lehenga tells a story of technique passed down through families in Lahore, Karachi, and Gujranwala.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "30+", label: "Master Karigars" },
            { value: "4 continents", label: "Brides served" },
            { value: "3 generations", label: "Of craft heritage" },
          ].map((stat) => (
            <div key={stat.label} className="p-8 border border-charcoal/5">
              <p className="font-display text-4xl text-emerald-800">{stat.value}</p>
              <p className="text-sm text-charcoal/50 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
