"use client";

import { FormEvent, useState } from "react";
import { useWeb3Form } from "@/hooks/use-web3form";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const { submit, isLoading, isSuccess, error } = useWeb3Form("newsletter");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    if (!email) {
      setLocalError("Please enter your email.");
      return;
    }

    await submit({
      subject: "Newsletter signup — The Begum Letter",
      email,
    });

    e.currentTarget.reset();
  };

  if (isSuccess) {
    return (
      <p className={cn("text-sm text-sand-100/85 leading-relaxed", className)}>
        You&apos;re on the list — one considered letter a month, no noise.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col sm:flex-row gap-3", className)}
    >
      <label htmlFor="journal-email" className="sr-only">
        Email address
      </label>
      <input
        id="journal-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="flex-1 bg-transparent border border-sand-300/40 px-4 py-3 text-sm text-ivory placeholder:text-sand-200/50 focus:border-sand-300 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-ivory text-emerald-900 px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-sand-100 transition-colors disabled:opacity-60"
      >
        {isLoading ? "…" : "Subscribe"}
      </button>
      {(error || localError) && (
        <p className="sm:col-span-2 text-xs text-sand-200/80" role="alert">
          {localError || error}
        </p>
      )}
    </form>
  );
}
