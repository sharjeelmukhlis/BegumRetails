"use client";

import { Phone } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923209988777"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-emerald-500 transition-all duration-200 hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <Phone size={20} />
      <span className="text-sm font-medium hidden sm:inline">Chat with us</span>
    </a>
  );
}
