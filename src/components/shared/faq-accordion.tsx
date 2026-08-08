"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/lib/data/faqs";
import { FaqRichText } from "@/components/shared/faq-rich-text";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  /** Open the first item by default (PDP / article). */
  defaultOpenFirst?: boolean;
}

export function FAQAccordion({
  items,
  className,
  defaultOpenFirst = true,
}: FAQAccordionProps) {
  const reducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenFirst && items[0] ? items[0].id : null,
  );

  if (items.length === 0) return null;

  return (
    <div className={cn("divide-y divide-sand-300/70", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="bg-ivory">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-emerald-900"
              >
                <span className="font-display text-base md:text-lg text-emerald-900 leading-snug pr-2">
                  {item.question}
                </span>
                <span
                  className="mt-1 shrink-0 text-sand-700"
                  aria-hidden
                >
                  {open ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-sm md:text-[15px] text-charcoal/75 leading-relaxed">
                    <FaqRichText text={item.answer} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
