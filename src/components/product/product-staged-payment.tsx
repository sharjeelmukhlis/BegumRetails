"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, ChevronDown, ChevronUp, Video } from "lucide-react";
import type { Currency } from "@/lib/types";

interface StagedPaymentProps {
  basePrice: number;
  currency: Currency;
}

export function ProductStagedPayment({ basePrice, currency }: StagedPaymentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stage1 = Math.round(basePrice * 0.3);
  const stage2 = Math.round(basePrice * 0.4);
  const stage3 = basePrice - stage1 - stage2; // perfectly rounded remainder

  return (
    <div className="mt-6 border border-sand-400/40 bg-sand-50/60 p-4 transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-900/10 text-emerald-900 flex items-center justify-center shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
              30 / 40 / 30 Couture Milestone Guarantee
            </p>
            <p className="text-[11px] text-charcoal/60 mt-0.5">
              Secure deposit of {formatPrice(stage1, currency)} to reserve artisan handloom
            </p>
          </div>
        </div>
        <div className="text-emerald-900/70 group-hover:text-emerald-900 transition-colors p-1">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-sand-300/60 space-y-3.5 text-xs">
          {/* Milestone 1 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-900 text-ivory text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-emerald-950">30% Loom & Silhouette Booking</span>
                <span className="font-semibold text-emerald-900">{formatPrice(stage1, currency)}</span>
              </div>
              <p className="text-charcoal/60 text-[11px] mt-0.5">
                Locks pure silk yardage, traces the bespoke blueprint, and assigns master karigars to your piece.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-sand-600 text-ivory text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-emerald-950">40% Mid-Embroidery Milestone</span>
                <span className="font-semibold text-emerald-900">{formatPrice(stage2, currency)}</span>
              </div>
              <p className="text-charcoal/60 text-[11px] mt-0.5">
                Paid only after you receive and approve an HD video proof of the zardozi and needlework in progress.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-800 text-ivory text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-emerald-950">30% Final Inspection & Dispatch</span>
                <span className="font-semibold text-emerald-900">{formatPrice(stage3, currency)}</span>
              </div>
              <p className="text-charcoal/60 text-[11px] mt-0.5">
                Paid after finishing, final measurement audit, and white-glove boxed packaging ready for courier.
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded bg-ivory/80 px-2.5 py-2 text-[11px] text-emerald-950 border border-sand-300/40">
            <Video size={13} className="text-sand-700 shrink-0" />
            <span>Includes 2 recorded atelier video check-ins and direct artisan updates.</span>
          </div>
        </div>
      )}
    </div>
  );
}
