"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { EditorialInsert } from "@/lib/data/collection-editorial";
import { cn } from "@/lib/utils";

export function EditorialInsertCard({ insert }: { insert: EditorialInsert }) {
  const spanClass = insert.span === 2 ? "md:col-span-2" : "";

  if (insert.type === "quote") {
    return (
      <aside
        className={cn(
          "flex flex-col justify-end border border-sand-300/55 bg-emerald-950 p-6 md:p-10 min-h-[280px] md:min-h-0",
          spanClass,
        )}
      >
        <p className="font-display text-[clamp(1.4rem,2.8vw,2.2rem)] text-ivory leading-snug">
          {insert.title}
        </p>
        <p className="mt-4 text-sm text-sand-200/75 leading-relaxed max-w-[40ch]">
          {insert.body}
        </p>
        {insert.ctaHref && insert.ctaLabel && (
          <Link
            href={insert.ctaHref}
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-sand-300 hover:text-ivory transition-colors"
          >
            {insert.ctaLabel} <ArrowRight size={12} />
          </Link>
        )}
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "group relative overflow-hidden border border-sand-300/55 bg-sand-50 min-h-[280px]",
        spanClass,
        insert.image ? "md:grid md:grid-cols-2" : "p-6 md:p-8",
      )}
    >
      {insert.image && (
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[320px]">
          <Image
            src={insert.image}
            alt={insert.imageAlt ?? insert.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      )}
      <div className="flex flex-col justify-end p-6 md:p-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-sand-700">
          {insert.type === "karigar" ? "Karigar spotlight" : "Shop the look"}
        </p>
        <p className="mt-2 font-display text-2xl md:text-3xl text-emerald-900 leading-tight">
          {insert.title}
        </p>
        <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">{insert.body}</p>
        {insert.ctaHref && insert.ctaLabel && (
          <Link
            href={insert.ctaHref}
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-800 hover:text-emerald-600 transition-colors"
          >
            {insert.ctaLabel} <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </aside>
  );
}
