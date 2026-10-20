"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Ruler, Plus } from "lucide-react";

export default function MeasurementsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl text-emerald-800">My Measurements</h1>
              <p className="text-sm text-charcoal/50 mt-1">Save measurement profiles for yourself and family</p>
            </div>
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> New Profile
            </Button>
          </div>

          <div className="border border-dashed border-charcoal/20 p-12 text-center">
            <Ruler size={40} className="mx-auto text-charcoal/20" />
            <p className="text-sm text-charcoal/50 mt-4">No saved measurement profiles yet.</p>
            <p className="text-xs text-charcoal/30 mt-1">Create one during your next custom order and reuse it anytime.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
