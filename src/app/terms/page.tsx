import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions Begum",
  description: "Terms and conditions governing the use of Begum's website and services.",
};

const sections = [
  {
    title: "1. General",
    content:
      "By accessing or purchasing from Begum (operated by Begum Retail), you agree to be bound by these terms. If you do not agree, please do not use our site or services. We reserve the right to update these terms at any time; changes take effect upon posting.",
  },
  {
    title: "2. Products & Orders",
    content:
      "All pieces are handcrafted by named karigars. Colours, embroidery, and fabric may vary slightly from photographs due to handcrafting and screen calibration. Once an order is placed, you will receive a confirmation email. We reserve the right to cancel any order for reasons including but not limited to stock unavailability or payment issues.",
  },
  {
    title: "3. Pricing & Payment",
    content:
      "All prices are listed in the currency selected at checkout. Staged payment (30/40/30) is available for custom orders. Full payment is required before production begins on standard orders. Prices are subject to change without notice, though confirmed orders are honoured at the agreed price.",
  },
  {
    title: "4. Custom Orders",
    content:
      "Custom orders require a 30% non-refundable deposit before design work begins. The second instalment (40%) is due upon design approval. The final 30% is due before shipping. Custom orders cannot be cancelled after the design has been approved and production has started. Any changes after approval may incur additional charges and delay delivery.",
  },
  {
    title: "5. Shipping & Delivery",
    content:
      "Standard orders ship within the lead time stated on the product page. Custom orders are delivered according to the timeline agreed in the design phase. Begum is not liable for delays caused by customs clearance, courier disruptions, or incorrect shipping details provided by the buyer. Risk and title pass to the buyer upon delivery.",
  },
  {
    title: "6. Returns & Exchanges",
    content:
      "Standard ready-to-ship items may be returned within 7 days of delivery, provided they are unworn, unaltered, and in original packaging. Custom and personalised pieces are final sale and cannot be returned or exchanged. Shipping costs for returns are borne by the buyer unless the item is defective. Refunds are processed within 10 business days after inspection.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All designs, photographs, text, and graphics on this website are the intellectual property of Begum Retail. You may not reproduce, distribute, or use any content without explicit written permission. Each karigar retains moral rights over their handcrafted work.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "Begum shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability is limited to the purchase price of the product in question.",
  },
  {
    title: "9. Governing Law",
    content:
      "These terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be resolved through amicable negotiation first, and failing that, through the courts of Lahore, Pakistan.",
  },
  {
    title: "10. Contact",
    content:
      "For questions about these terms, reach us at begumretails@gmail.com or via WhatsApp at +92 320 9988777.",
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">
              Legal
            </p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-4 leading-[0.9]">
              Terms &amp; Conditions
            </h1>
            <div className="w-12 h-px bg-sand-400 mx-auto my-6" />
            <p className="text-charcoal/60 leading-relaxed max-w-2xl mx-auto">
              These terms govern your use of Begum&rsquo;s website and services. Please read them carefully before placing an order.
            </p>
            <p className="text-xs text-charcoal/40 mt-4">Last updated: July 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl text-emerald-800 mb-3">{s.title}</h2>
                <p className="text-charcoal/70 leading-relaxed text-[15px]">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
