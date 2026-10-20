import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy Begum",
  description: "How Begum collects, uses, and protects your personal data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly: name, email, phone number, shipping address, and payment details. We also collect browsing data through cookies and analytics to improve your experience. For custom orders, we collect body measurements which are stored securely and only shared with your assigned karigar.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to process orders, communicate order updates via WhatsApp and email, personalise your shopping experience, and improve our products and services. We may send occasional marketing communications if you have opted in. You can unsubscribe at any time.",
  },
  {
    title: "3. Data Sharing",
    content:
      "We never sell your personal data. Limited data is shared with trusted third parties who help us operate: payment processors (Stripe, JazzCash), shipping couriers, and analytics providers (Vercel Analytics). These partners are contractually bound to protect your data and use it only for the specified service.",
  },
  {
    title: "4. Data Security",
    content:
      "Your data is encrypted in transit (TLS 1.3) and at rest. Payment details are processed directly by Stripe or JazzCash we never store full card numbers. We follow industry-standard security practices and conduct regular audits. However, no online transmission is 100% secure.",
  },
  {
    title: "5. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, email begumretails@gmail.com. We will respond within 30 days. You may also request a copy of the data we hold about you.",
  },
  {
    title: "6. Cookies",
    content:
      "We use essential cookies for cart functionality and authentication. Analytics cookies (Vercel Analytics) help us understand site usage. You can manage cookie preferences through your browser settings. Disabling cookies may affect site functionality.",
  },
  {
    title: "7. Data Retention",
    content:
      "Order data is retained for 7 years for tax and accounting purposes. Marketing data is retained until you unsubscribe. Measurement data for custom orders is retained to facilitate future orders. You may request deletion at any time, though we may need to retain certain data for legal obligations.",
  },
  {
    title: "8. International Transfers",
    content:
      "As we serve brides globally, your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place through standard contractual clauses and data processing agreements.",
  },
  {
    title: "9. WhatsApp Communications",
    content:
      "By providing your phone number, you consent to receiving order-related updates via WhatsApp. Message frequency depends on your order status. Standard WhatsApp rates may apply. You can opt out of WhatsApp communication by replying STOP.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this policy periodically. Material changes will be notified via email or a prominent notice on our website. Continued use after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact",
    content:
      "For privacy-related inquiries, contact our Data Protection Officer at begumretails@gmail.com or write to us at Begum Retail, Lahore, Pakistan.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">
              Legal
            </p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-4 leading-[0.9]">
              Privacy Policy
            </h1>
            <div className="w-12 h-px bg-sand-400 mx-auto my-6" />
            <p className="text-charcoal/60 leading-relaxed max-w-2xl mx-auto">
              How we collect, use, and protect your personal information.
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
