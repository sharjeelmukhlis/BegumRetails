"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3Form } from "@/hooks/use-web3form";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const { submit, isLoading, isSuccess, error } = useWeb3Form("contact");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setLocalError("Please fill in name, email, and message.");
      return;
    }

    await submit({
      subject: `Contact — ${name}`,
      name,
      email,
      message,
    });

    e.currentTarget.reset();
  };

  if (isSuccess) {
    return (
      <div className={cn("p-6 border border-emerald-800/20 bg-sand-50/60", className)}>
        <p className="font-display text-lg text-emerald-800">Message sent</p>
        <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
          Thank you — we received your message and will reply within 24 hours. For anything urgent,
          WhatsApp is fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div>
        <label htmlFor="contact-name" className="text-xs text-charcoal/50 mb-1 block">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-xs text-charcoal/50 mb-1 block">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-xs text-charcoal/50 mb-1 block">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent resize-none"
        />
      </div>
      {(error || localError) && (
        <p className="text-sm text-heritage-500" role="alert">
          {localError || error}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
