"use client";

/**
 * Infinite horizontal text marquee with hover-pause.
 * Used as a cinematic section divider between major homepage sections.
 */
export function TextMarquee({
  text = "Handcrafted in Lahore — Zardozi · Dabka · Resham · Bespoke Fit — Since 1994 — Every Bride, a Begum",
  repeat = 4,
  className = "",
}: {
  text?: string;
  repeat?: number;
  className?: string;
}) {
  const repeated = Array(repeat).fill(text).join("  ★  ");

  return (
    <div
      className={`relative overflow-hidden bg-emerald-950 py-5 md:py-6 border-y border-sand-300/15 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track whitespace-nowrap">
        <span className="font-display text-xl md:text-2xl lg:text-3xl text-sand-200/40 tracking-wider">
          {repeated}
        </span>
        <span className="font-display text-xl md:text-2xl lg:text-3xl text-sand-200/40 tracking-wider ml-8">
          {repeated}
        </span>
      </div>
    </div>
  );
}
