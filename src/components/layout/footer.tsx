import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { Phone, Mail, MapPin } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { href: "/collections/occasion/mehndi", label: "Mehndi" },
      { href: "/collections/occasion/nikkah", label: "Nikkah" },
      { href: "/collections/occasion/baraat", label: "Baraat" },
      { href: "/collections/occasion/walima", label: "Walima" },
      { href: "/collections/category/bridal-lehenga", label: "Lehengas" },
      { href: "/customize", label: "Custom Design" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/size-guide", label: "Size Guide" },
      { href: "/trust", label: "How Begum Works" },
      { href: "/track-order", label: "Track Order" },
      { href: "/contact", label: "Contact Us" },
      { href: "/real-brides", label: "Real Brides" },
      { href: "/special-offer", label: "Special Offers" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/return-exchange", label: "Return & Exchange" },
      { href: "/shipping-policy", label: "Shipping Policy" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/founder", label: "Founder" },
      { href: "/brand-story", label: "Brand Story" },
      { href: "/brand-journey", label: "Brand Journey" },
      { href: "/team", label: "Our Team & Karigars" },
      { href: "/the-craft", label: "The Craft" },
      { href: "/journal", label: "Journal" },
      { href: "/cards", label: "Begum Cards (Art Maker)" },
      { href: "/collections/complete-the-look", label: "Complete the Look" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-emerald-800 text-ivory mt-24">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" theme="on-dark" />
            <p className="mt-3 text-sm text-sand-200/70 leading-relaxed max-w-xs">
              Every bride, a Begum. Handcrafted bridal wear and accessories, made for the modern bride by the finest karigars of Pakistan.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/begumretails/" target="_blank" rel="noopener noreferrer" className="h-11 w-11 flex items-center justify-center border border-ivory/20 rounded-sm hover:border-ivory/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/begumretails" target="_blank" rel="noopener noreferrer" className="h-11 w-11 flex items-center justify-center border border-ivory/20 rounded-sm hover:border-ivory/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@begumretails" target="_blank" rel="noopener noreferrer" className="h-11 w-11 flex items-center justify-center border border-ivory/20 rounded-sm hover:border-ivory/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4h5a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-300 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sand-200/70 hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand-200/50">
          <div className="flex items-center gap-6">
            <a href="tel:+923209988777" className="hover:text-ivory transition-colors flex items-center gap-2">
              <Phone size={14} /> +92 320 9988777
            </a>
            <a href="mailto:begumretails@gmail.com" className="hover:text-ivory transition-colors flex items-center gap-2">
              <Mail size={14} /> begumretails@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Lahore, Pakistan
            </span>
          </div>
          <p>&copy; {new Date().getFullYear()} Begum. All rights reserved.</p>
        </div>

        <div className="mt-6 pt-4 border-t border-ivory/5 text-center text-xs text-sand-200/40">
          This site is built by{" "}
          <a
            href="https://www.usamazahid.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sand-200/60 hover:text-sand-100 transition-colors underline underline-offset-2"
          >
            Usama Zahid
          </a>
        </div>
      </Container>
    </footer>
  );
}
