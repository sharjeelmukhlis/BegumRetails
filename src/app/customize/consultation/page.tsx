"use client";

import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Video, Calendar, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ConsultationPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link href="/customize" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal mb-8">
            <ArrowLeft size={16} /> Back to Designer
          </Link>

          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Consultation</p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
              Book a Video Consultation
            </h1>
            <p className="text-charcoal/60 mt-3 max-w-xl mx-auto">
              Meet your designer face to face. We will discuss your vision, show you fabric options, and walk you through the entire process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: Video, title: "30-Minute Video Call", desc: "Via WhatsApp or Google Meet — whichever you prefer" },
              { icon: Calendar, title: "Flexible Scheduling", desc: "PKT morning & evening slots, including weekends" },
              { icon: MessageCircle, title: "Follow-up Chat", desc: "Unlimited WhatsApp support after your call" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 border border-charcoal/5">
                <item.icon size={24} className="text-emerald-800 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-charcoal">{item.title}</h3>
                  <p className="text-xs text-charcoal/50 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border border-charcoal/5">
            <h2 className="font-display text-xl text-emerald-800 mb-6">Request a Slot</h2>
            <ConsultationForm />
            <p className="text-xs text-charcoal/40 mt-4">
              Prefer instant? <a href="https://wa.me/923209988777" target="_blank" rel="noopener noreferrer" className="underline text-emerald-800">Message us on WhatsApp</a> and we will find a slot for you right away.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
