import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Shipping Policy Begum",
  description: "Begum's shipping and delivery policy for domestic and international orders.",
};

const sections = [
  {
    title: "Shipping Timing",
    content:
      "Our shipping timing for orders delivered within Pakistan will be 2 weeks or it will be informed on order confirmation. Any delays will be informed accordingly. For international customers, delivery time will be 14–20 working days after payment confirmation (Bank Transfer). There can be unexpected delivery delays due to custom clearance or any undefined reason. The delay can further go up to 5–6 working days or more.",
  },
  {
    title: "Domestic Delivery",
    content:
      "Orders within Pakistan are delivered within 2 weeks of confirmation, unless otherwise communicated at the time of order. Any delays will be informed to the customer in a timely manner.",
  },
  {
    title: "International Delivery",
    content:
      "International orders are shipped within 14–20 working days after payment confirmation via bank transfer. Delivery times may vary depending on customs clearance processes in the destination country. We are not responsible for any delays caused by customs or local authorities.",
  },
  {
    title: "Delivery Charges",
    content:
      "Delivery charges may vary depending on the type of products ordered and the location you select. Delivery charges cannot be refunded. We take no responsibility for any additional charges in terms of customs or duties charged by local authorities or governments outside of Pakistan. The custom charges have to be borne by the customer.",
  },
  {
    title: "Responsibility",
    content:
      "We are not responsible for any kind of delays nor if that delay is not informed to the customer, for domestic or international customers who gave orders using any kind of payment method.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand-600 font-medium">
            Policies
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] text-emerald-800 leading-[0.95]">
            Shipping Policy
          </h1>
          <p className="mt-4 text-charcoal/55 leading-relaxed max-w-xl">
            How we get your outfit from our atelier in Lahore to your door wherever in the world that may be.
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
              For questions about your shipment, contact us at{" "}
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
