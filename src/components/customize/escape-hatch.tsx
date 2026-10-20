"use client";

import Link from "next/link";
import { MessageCircle, Video } from "lucide-react";
import type { Language } from "@/lib/customize/schema";

/**
 * The human escape hatch present contextually beside every section,
 * not a generic floating chat bubble.
 */
export function EscapeHatch({ language, context }: { language: Language; context?: string }) {
  const isUrdu = language === "ur";
  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-charcoal/60"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <span>{isUrdu ? "یقین نہیں؟" : "Not sure?"}</span>
      <a
        href={`https://wa.me/923209988777${context ? `?text=${encodeURIComponent(context)}` : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-600 transition-colors"
      >
        <MessageCircle size={14} />
        {isUrdu ? "فٹ ماہر سے واٹس ایپ پر بات کریں" : "Talk to a fit expert"}
      </a>
      <Link
        href="/customize/consultation"
        className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-600 transition-colors"
      >
        <Video size={14} />
        {isUrdu ? "ویڈیو کال بک کریں" : "Book a video call"}
      </Link>
    </div>
  );
}
