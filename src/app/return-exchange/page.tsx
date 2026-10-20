import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Return & Exchange Policy Begum",
  description: "Begum's return, exchange, and refund policy for bridal and formal wear.",
};

const sections = [
  {
    title: "Exchange Policy",
    content:
      "There is no exchange policy as per customer's liking or disliking of the product since all outfits are made to order for our esteemed customers. An exchange will only occur in the unlikely situation that we have sent you a defective or incorrect item, and only in the event that the purchased goods are unused and undamaged by the customer. All lawn sales and custom orders are non-exchangeable.",
  },
  {
    title: "Return Policy",
    content:
      "All orders are final and non-refundable, but you can exchange in an event where an incorrect item has been mailed to you. We can only exchange the purchased items subject to product and size availability. Any exchange or returns should be brought to our notice within one week of the receipt. Any claims made afterwards would not be honored.",
  },
  {
    title: "Refund Policy",
    content:
      "Formals and bridals are not eligible for any refunds or exchanges; this includes advances paid upon confirmation of order. All sales are considered final. There are no monetary returns, but can be exchanged for products of equal or higher value.",
  },
];

export default function ReturnExchangePage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand-600 font-medium">
            Policies
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] text-emerald-800 leading-[0.95]">
            Return &amp; Exchange
          </h1>
          <p className="mt-4 text-charcoal/55 leading-relaxed max-w-xl">
            We stand behind every piece we send out. If something is not right, here is how we handle it.
          </p>

          <div className="mt-14 space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl md:text-2xl text-emerald-800">
                  {section.title}
                </h2>
                <p className="mt-3 text-charcoal/70 leading-[1.85] text-sm md:text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 border border-charcoal/10 bg-sand-50/50">
            <p className="text-sm text-charcoal/60 leading-relaxed">
              If you believe you have received a defective or incorrect item, please contact us
              within one week of receipt at{" "}
              <a href="mailto:begumretails@gmail.com" className="underline text-emerald-800">
                begumretails@gmail.com
              </a>{" "}
              or via{" "}
              <a
                href="https://wa.me/923209988777"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-800"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
