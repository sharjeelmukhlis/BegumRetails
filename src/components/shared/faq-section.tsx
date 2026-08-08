import { MessageCircle } from "lucide-react";
import type { FAQItem } from "@/lib/data/faqs";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/lib/seo/faq-json-ld";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  items: FAQItem[];
  /** In-brand heading — e.g. "Common questions" on journal, "Questions about this piece" on PDP. */
  heading: string;
  whatsappHref: string;
  whatsappLabel?: string;
  className?: string;
  /** Softer editorial framing for journal. */
  variant?: "product" | "editorial";
}

export function FAQSection({
  items,
  heading,
  whatsappHref,
  whatsappLabel = "Still have a question? Ask us on WhatsApp",
  className,
  variant = "product",
}: FAQSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={cn(
        variant === "editorial"
          ? "mt-14 border-t border-sand-300/60 pt-10"
          : "mt-10 border-t border-sand-300/60 pt-8",
        className,
      )}
      aria-labelledby="faq-heading"
    >
      <FaqJsonLd faqs={items} />

      <p
        id="faq-heading"
        className={cn(
          "text-[10px] uppercase tracking-[0.24em] font-medium",
          variant === "editorial" ? "text-sand-700" : "text-charcoal/50",
        )}
      >
        {heading}
      </p>

      <FAQAccordion items={items} className="mt-4" />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-2 text-sm text-emerald-800 hover:text-emerald-600 transition-colors"
      >
        <MessageCircle size={18} className="shrink-0" />
        <span>{whatsappLabel}</span>
      </a>
    </section>
  );
}
