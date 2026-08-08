import type { FAQItem } from "@/lib/data/faqs";
import { faqAnswerToPlainText } from "@/lib/data/faqs";

/** Google FAQPage structured data — validate with Rich Results Test before launch. */
export function buildFaqPageJsonLd(faqs: FAQItem[]) {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerToPlainText(faq.answer),
      },
    })),
  };
}

export function FaqJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const data = buildFaqPageJsonLd(faqs);
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
