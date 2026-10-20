import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { Shield, Camera, Ship, MessageCircle, Search, CreditCard } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Staged Payments, Not Upfront Lump Sums",
    desc: "You pay 30% to confirm your order. After we share production photos and you approve them, you pay 40%. The final 30% is due only when your piece is ready to ship. You never pay for something you have not seen and approved.",
  },
  {
    icon: Camera,
    title: "Real Photography, Real Transparency",
    desc: "Every product on this site is photographed as it is natural light, no AI retouching, no generic stock imagery. If you order a custom piece, we send you real production photos at every stage.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-First Support, Human Always",
    desc: "You will never get an automated response. Every WhatsApp message reaches a real person who knows the product, the karigar, and your order. We respond within 30 minutes during business hours.",
  },
  {
    icon: Search,
    title: "Progress Tracking, Not Just Order Numbers",
    desc: "When you order from Begum, you get more than a tracking ID. You get staged production photos, fabric approval, embroidery close-ups, and fitting updates all shared via WhatsApp or your account dashboard.",
  },
  {
    icon: Ship,
    title: "International Shipping with Care",
    desc: "We ship to the UK, USA, Canada, UAE, and Australia with insured, trackable couriers. Each garment is packed in a preservation garment bag. Duties and taxes are calculated at checkout no surprises at delivery.",
  },
  {
    icon: CreditCard,
    title: "Your Data, Your Privacy",
    desc: "All payments are processed through Stripe (international) or JazzCash/Easypaisa (Pakistan). We never store your card details. Your measurement data is encrypted and only shared with your designated karigar.",
  },
];

export default function TrustPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Trust</p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
            How Begum Works
          </h1>
          <p className="text-charcoal/60 mt-4 text-lg">
            We know ordering bridal wear from across the world is a leap of faith. Here is how we make sure you never have to guess.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {trustPoints.map((point) => (
            <div key={point.title} className="grid md:grid-cols-[80px_1fr] gap-6">
              <div className="w-16 h-16 bg-emerald-50 flex items-center justify-center">
                <point.icon size={28} className="text-emerald-800" />
              </div>
              <div>
                <h2 className="font-display text-xl text-emerald-800">{point.title}</h2>
                <p className="text-charcoal/60 mt-2 leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
