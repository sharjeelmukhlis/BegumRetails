"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface HomeFaqItem {
  question: string;
  answer: string;
}

const BRIDAL_FAQS: HomeFaqItem[] = [
  {
    question: "How far in advance should I order my bridal lehenga?",
    answer:
      "We recommend placing your bridal order 3 to 5 months before your wedding date. Each bespoke lehenga takes between 8 to 16 weeks of dedicated hand embroidery by our master karigars in Lahore. For brides with tighter timelines, please contact our concierge on WhatsApp to discuss our expedited atelier service.",
  },
  {
    question: "How do remote video fittings work if I live in the UK, USA, or Canada?",
    answer:
      "Over 60% of Begum brides reside outside Pakistan. We conduct 1:1 video measurement consultations where our head tailoring master guides you or your local tailor step-by-step through our 14-point measurement profile. We also ship physical silk and embroidery swatches to your doorstep before the garment is cut.",
  },
  {
    question: "How does the Staged Payment (30% / 40% / 30%) milestone policy work?",
    answer:
      "You pay an initial 30% deposit upon design and sketch confirmation. The second 40% installment is only due once we share detailed mid-production photos and 4K videos of your hand-embroidered panels for approval. The final 30% is paid after full garment completion and your final video inspection before dispatch.",
  },
  {
    question: "Can I customize the color, silhouette, or embroidery density?",
    answer:
      "Yes, every Begum piece is completely bespoke. You can adjust the neckline, dupatta border width, kali flare, or specify an exact Pantone/fabric shade. There is no additional charge for color adjustments or neckline customizations.",
  },
  {
    question: "How is international shipping and customs handled?",
    answer:
      "All international orders are shipped via insured express courier (DHL or FedEx Express) directly from our Lahore atelier, taking 3 to 5 business days to reach the UK, USA, Canada, and the UAE. Full tracking and white-glove packaging in breathable preservation garment bags are provided.",
  },
];

export function BridalFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const whatsappFaqUrl = waLink(
    "Hello Begum Atelier, I am planning my wedding and have a question regarding custom bridal timelines and sizing."
  );

  // SEO Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BRIDAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      data-parallax-section
      className="parallax-scene relative py-24 md:py-32 bg-ivory border-b border-sand-300/40"
    >
      {/* Inject FAQ structured data for search engine optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and WhatsApp Support Card */}
          <div className="lg:col-span-5" data-parallax="layer-1">
            <div className="inline-flex items-center gap-2 text-sand-600 mb-2">
              <HelpCircle size={14} />
              <p className="text-xs uppercase tracking-[0.25em] font-medium">
                Bridal Concierge
              </p>
            </div>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.8rem)] text-emerald-900 leading-[0.92]">
              Answers for Your Peace of Mind
            </h2>
            <p className="mt-4 text-xs md:text-sm text-charcoal/75 leading-relaxed font-light">
              Designing your wedding attire from across the world should feel transparent, reassuring, and joyful. Here are the most common questions our brides ask.
            </p>

            {/* Direct Stylist Assistance Box */}
            <div className="mt-8 border border-sand-300/60 bg-sand-50/70 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-950 font-semibold">
                Have a unique bridal timeline or query?
              </p>
              <p className="mt-2 text-xs text-charcoal/70 leading-relaxed font-light">
                Our head stylist in Lahore is available on WhatsApp to answer questions, share fabric samples, or discuss custom date commitments.
              </p>
              <a
                href={whatsappFaqUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-emerald-900 text-ivory px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3" data-parallax="layer-2">
            {BRIDAL_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "border transition-colors duration-200",
                    isOpen
                      ? "border-emerald-900/40 bg-sand-50/40"
                      : "border-sand-300/50 bg-ivory hover:border-sand-400"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
                  >
                    <span className="font-display text-base md:text-lg text-emerald-950 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "h-8 w-8 shrink-0 rounded-full border border-sand-300 flex items-center justify-center text-emerald-900 transition-transform duration-300",
                        isOpen && "rotate-180 bg-emerald-900 text-ivory border-emerald-900"
                      )}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-1 text-xs md:text-sm text-charcoal/80 leading-relaxed font-light border-t border-sand-300/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 flex items-center justify-between text-xs text-charcoal/60">
              <span>Looking for fabric care and preservation advice?</span>
              <Link
                href="/trust"
                className="text-emerald-900 hover:text-emerald-700 underline underline-offset-4 flex items-center gap-1"
              >
                <span>Read Trust & Care Guide</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
