"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3Form } from "@/hooks/use-web3form";

export function ConsultationForm() {
  const { submit, isLoading, isSuccess, error } = useWeb3Form("consultation");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const preferredSlot = String(form.get("preferredSlot") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();

    if (!name || !phone || !preferredSlot) {
      setLocalError("Please fill in name, WhatsApp number, and preferred date & time.");
      return;
    }

    await submit({
      subject: `Consultation request ${name}`,
      name,
      phone,
      preferred_slot: preferredSlot,
      topic: topic || "",
    });

    e.currentTarget.reset();
  };

  if (isSuccess) {
    return (
      <div className="p-6 border border-emerald-800/20 bg-sand-50/60">
        <p className="font-display text-lg text-emerald-800">Request received</p>
        <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
          We will confirm your video consultation slot on WhatsApp shortly usually within a few
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="consult-name" className="text-xs text-charcoal/50 mb-1 block">
            Name
          </label>
          <input
            id="consult-name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
          />
        </div>
        <div>
          <label htmlFor="consult-phone" className="text-xs text-charcoal/50 mb-1 block">
            WhatsApp Number
          </label>
          <input
            id="consult-phone"
            name="phone"
            type="tel"
            required
            className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
          />
        </div>
      </div>
      <div>
        <label htmlFor="consult-slot" className="text-xs text-charcoal/50 mb-1 block">
          Preferred Date & Time (PKT)
        </label>
        <input
          id="consult-slot"
          name="preferredSlot"
          type="text"
          required
          placeholder="e.g. Monday March 25, 11:00 AM PKT"
          className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
        />
      </div>
      <div>
        <label htmlFor="consult-topic" className="text-xs text-charcoal/50 mb-1 block">
          What would you like to discuss?
        </label>
        <textarea
          id="consult-topic"
          name="topic"
          rows={3}
          className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent resize-none"
        />
      </div>
      {(error || localError) && (
        <p className="text-sm text-heritage-500" role="alert">
          {localError || error}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending…" : "Request Booking"}
      </Button>
    </form>
  );
}
