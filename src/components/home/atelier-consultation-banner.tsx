"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MessageCircle, Video, ShieldCheck, Sparkles, Clock, Globe } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function AtelierConsultationBanner() {
  const whatsappUrl = waLink(
    "Hello Begum Atelier, I would like to schedule a bridal consultation with your head designer for my upcoming wedding."
  );

  return (
    <section className="relative py-24 md:py-32 bg-emerald-950 text-ivory overflow-hidden border-t border-sand-300/30">
      {/* Background ambient lighting and fine radial effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,202,159,0.14)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-900/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-800/20 blur-3xl" />

      {/* Subtle fine concentric circles for atelier motif */}
      <div className="pointer-events-none absolute right-8 md:right-24 bottom-6 md:bottom-12 w-64 h-64 rounded-full border border-sand-300/10 hidden lg:block">
        <div className="absolute inset-8 rounded-full border border-sand-300/10" />
        <div className="absolute inset-16 rounded-full border border-sand-300/10" />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-sand-300/30 bg-emerald-900/60 backdrop-blur-sm px-4 py-1.5 mb-6 text-sand-200">
            <Sparkles size={13} className="text-sand-300" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-light">
              Bespoke Bridal Atelier · Lahore
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.3rem,5.6vw,4.8rem)] text-ivory leading-[0.9] tracking-tight">
            Every Bride Deserves Her <br />
            <span className="text-sand-200">Begum Moment</span>
          </h2>

          <p className="mt-6 text-sm md:text-base text-sand-100/80 max-w-2xl mx-auto leading-relaxed font-light">
            Whether your wedding is twelve months away or you are finalizing an urgent celebration, connect directly with our head designer in Lahore to begin sketching your vision.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-ivory text-emerald-950 px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:bg-sand-100 shadow-lg shadow-emerald-950/40 min-h-12"
            >
              <MessageCircle size={16} className="text-emerald-900" />
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              href="/customize/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-sand-300/50 bg-emerald-900/40 backdrop-blur-sm text-ivory px-8 py-4 text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:bg-sand-100 hover:text-emerald-950 hover:border-sand-100 min-h-12"
            >
              <Video size={16} />
              <span>Book 1:1 Video Fitting</span>
            </Link>
          </div>

          {/* Micro-assurances footer */}
          <div className="mt-14 pt-8 border-t border-sand-300/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sand-200/80 text-xs">
            <div className="flex items-center justify-center gap-2">
              <Clock size={15} className="text-sand-300 shrink-0" />
              <span>Replies within 1 hour on WhatsApp</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={15} className="text-sand-300 shrink-0" />
              <span>Guaranteed Delivery Date Commitment</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Globe size={15} className="text-sand-300 shrink-0" />
              <span>Over 500+ Diaspora Brides Styled</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
