"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/shared/page-shell";
import { Search, Package, Camera, Truck, CheckCircle } from "lucide-react";

const stages = [
  { icon: Package, label: "Order Confirmed", desc: "Your order has been received and karigar assigned" },
  { icon: Camera, label: "Fabric Approval", desc: "Fabric photos shared via WhatsApp for approval" },
  { icon: Camera, label: "Mid-Production", desc: "Embroidery progress photos — review and approve" },
  { icon: Truck, label: "Quality Check", desc: "Final inspection and packaging" },
  { icon: CheckCircle, label: "Dispatched", desc: "Shipped with tracking — you will get real-time updates" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <PageShell>
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Track</p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
            Track Your Order
          </h1>
          <p className="text-charcoal/60 mt-3">Enter your order number to see where your piece is in production.</p>

          <div className="flex gap-3 mt-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g. BGM-2025-001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
            />
            <Button onClick={() => setTracked(true)}>
              <Search size={16} className="mr-2" /> Track
            </Button>
          </div>

          {tracked && (
            <div className="mt-12 text-left">
              <div className="space-y-0">
                {stages.map((stage, i) => (
                  <div key={stage.label} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <stage.icon size={18} className="text-emerald-800" />
                      </div>
                      {i < stages.length - 1 && <div className="w-px flex-1 bg-emerald-200 my-1" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-sm font-medium text-charcoal">{stage.label}</h3>
                      <p className="text-xs text-charcoal/50 mt-1">{stage.desc}</p>
                      {i === 0 && <p className="text-xs text-emerald-800 mt-1">Completed — March 15, 2025</p>}
                      {i === 1 && <p className="text-xs text-sand-600 mt-1">In progress — photos expected within 7 days</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-sand-50 text-sm text-charcoal/60">
                <p>Not seeing what you expect? <a href="https://wa.me/923209988777" target="_blank" rel="noopener noreferrer" className="underline text-emerald-800">Chat with us on WhatsApp</a> with your order number and we will update you personally.</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </PageShell>
  );
}
