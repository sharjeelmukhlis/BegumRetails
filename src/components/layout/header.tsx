"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/brand-story", label: "Brand Story" },
  { href: "/brand-journey", label: "Brand Journey" },
  { href: "/the-craft", label: "The Craft" },
  { href: "/journal", label: "Journal" },
];

const collectionMenu = [
  {
    href: "/collections/occasion/baraat",
    label: "Baraat",
    desc: "Regal lehengas for the grand entrance",
  },
  {
    href: "/collections/occasion/mehndi",
    label: "Mehndi",
    desc: "Light, colourful pieces made to dance",
  },
  {
    href: "/collections/occasion/nikkah",
    label: "Nikkah",
    desc: "Serene ivories and soft golds",
  },
  {
    href: "/collections/occasion/walima",
    label: "Walima",
    desc: "Polished reception looks",
  },
  {
    href: "/customize",
    label: "Custom Design",
    desc: "Cut to your measurements with our atelier",
  },
];

const categoryLinks = [
  { href: "/collections/category/bridal-lehenga", label: "Lehengas" },
  { href: "/collections/category/bridal-jewellery-sets", label: "Jewellery" },
  { href: "/collections/category/bridal-shoes-khussa", label: "Khussa" },
  { href: "/collections/category/bridal-dupatta", label: "Dupattas" },
  { href: "/collections/category/bridal-purse-potli", label: "Bags & Potli" },
  { href: "/collections/complete-the-look", label: "Complete the Look" },
];

const secondaryLinks = [
  { href: "/real-brides", label: "Real Brides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/trust", label: "Trust & Care" },
  { href: "/track-order", label: "Track Order" },
  { href: "/account", label: "Account" },
];

function linkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const ys = window.scrollY;
      const delta = ys - lastScrollRef.current;
      if (ys > 50) {
        setScrolled(true);
      } else if (ys < 30) {
        setScrolled(false);
      }
      if (isHome && !mobileOpen) {
        if (Math.abs(delta) > 3) {
          setHidden(delta > 0 && ys > 280);
        }
      } else {
        setHidden(false);
      }
      lastScrollRef.current = ys;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!collectionsRef.current?.contains(event.target as Node)) {
        setCollectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setCollectionsOpen(false);
      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openCollections = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCollectionsOpen(true);
  };

  const scheduleCloseCollections = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCollectionsOpen(false), 140);
  };

  const transparent = isHome && !scrolled && !mobileOpen;
  const iconBtn = cn(
    "inline-flex h-11 w-11 items-center justify-center transition-colors rounded-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2",
    transparent
      ? "text-ivory/90 hover:text-ivory hover:bg-ivory/10"
      : "text-charcoal/70 hover:text-emerald-900 hover:bg-sand-50",
  );

  const mobileMenu =
    mounted &&
    createPortal(
      <>
        <div
          className={cn(
            "fixed inset-0 z-[60] bg-emerald-950/45 transition-opacity duration-300 lg:hidden",
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          )}
          aria-hidden
          onClick={closeMobile}
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ivory",
            "shadow-2xl shadow-charcoal/25 transition-transform duration-300 ease-out lg:hidden",
            mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
          )}
          aria-hidden={!mobileOpen}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-sand-300/60 px-5">
            <Logo
              size="md"
              theme="on-light"
              href="/"
              onClick={closeMobile}
            />
            <button
              type="button"
              onClick={closeMobile}
              className="inline-flex h-11 w-11 items-center justify-center text-charcoal/70 hover:text-charcoal rounded-sm"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-sand-700">Shop</p>
            <Link
              href="/collections"
              onClick={closeMobile}
              className={cn(
                "flex items-center justify-between py-3 text-lg font-medium min-h-12",
                linkActive(pathname, "/collections") ? "text-emerald-900" : "text-charcoal",
              )}
            >
              All Collections
              <ArrowRight size={16} className="text-charcoal/30" />
            </Link>

            <div className="mt-1 mb-5 space-y-0.5 border-l border-sand-300/80 pl-4">
              {collectionMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "block py-2.5",
                    linkActive(pathname, item.href)
                      ? "text-emerald-900 font-medium"
                      : "text-charcoal/75 hover:text-emerald-800",
                  )}
                >
                  <span className="text-base">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-charcoal/45 font-normal">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-sand-700">
              Categories
            </p>
            <div className="mb-6 grid grid-cols-2 gap-x-3 gap-y-1">
              {categoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "py-2.5 text-sm min-h-11",
                    linkActive(pathname, link.href)
                      ? "text-emerald-900 font-medium"
                      : "text-charcoal/70 hover:text-emerald-800",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <hr className="border-sand-300/70" />

            <p className="mb-2 mt-5 text-[10px] uppercase tracking-[0.22em] text-sand-700">
              Explore
            </p>
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={linkActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-sand-200/70 py-3.5 text-lg font-medium min-h-12 last:border-0",
                    linkActive(pathname, link.href)
                      ? "text-emerald-900"
                      : "text-charcoal/85 hover:text-emerald-800",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <hr className="my-5 border-sand-300/70" />

            <div className="flex flex-col gap-0.5 pb-4">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "py-2.5 text-base min-h-11",
                    linkActive(pathname, link.href)
                      ? "text-emerald-900 font-medium"
                      : "text-charcoal/65 hover:text-emerald-800",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="shrink-0 border-t border-sand-300/70 bg-ivory px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Button variant="secondary" className="h-12 w-full" asChild>
              <a href="https://wa.me/923209988777" target="_blank" rel="noopener noreferrer">
                <Phone size={18} className="mr-2" /> WhatsApp Us
              </a>
            </Button>
            <p className="mt-3 text-center text-[11px] text-charcoal/45">
              A real person — usually replies within the hour
            </p>
          </div>
        </div>
      </>,
      document.body,
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,box-shadow,border-color] duration-400",
          // Only apply transform when hiding — otherwise fixed children break
          hidden && !mobileOpen ? "-translate-y-full" : undefined,
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-ivory border-b border-sand-300/50 shadow-[0_1px_0_rgba(6,35,25,0.04)]",
        )}
      >
        <Container>
          <nav
            className="relative flex h-16 md:h-20 items-center justify-between gap-3"
            aria-label="Primary"
          >
            <div className="relative z-10">
              <Logo size="md" theme={transparent ? "on-dark" : "on-light"} />
            </div>

            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center gap-1">
              <div
                ref={collectionsRef}
                className="relative"
                onMouseEnter={openCollections}
                onMouseLeave={scheduleCloseCollections}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800",
                    transparent
                      ? "text-ivory/80 hover:text-ivory"
                      : linkActive(pathname, "/collections")
                        ? "text-emerald-900"
                        : "text-charcoal/70 hover:text-charcoal",
                  )}
                  onClick={() => setCollectionsOpen((v) => !v)}
                  aria-expanded={collectionsOpen}
                  aria-haspopup="menu"
                >
                  Collections
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-200", collectionsOpen && "rotate-180")}
                  />
                </button>

                <div
                  role="menu"
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-[min(92vw,440px)] -translate-x-1/2 pt-3 transition-all duration-200",
                    collectionsOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none",
                  )}
                >
                  <div className="border border-sand-300/70 bg-ivory p-2 shadow-xl shadow-charcoal/10">
                    <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.2em] text-sand-700">
                      Shop by occasion
                    </p>
                    <div className="grid gap-0.5">
                      {collectionMenu.map((item) => (
                        <Link
                          key={item.href}
                          role="menuitem"
                          href={item.href}
                          className={cn(
                            "group flex items-start justify-between gap-3 px-3 py-3 transition-colors",
                            linkActive(pathname, item.href)
                              ? "bg-sand-50"
                              : "hover:bg-sand-50/80",
                          )}
                          onClick={() => setCollectionsOpen(false)}
                        >
                          <span>
                            <span
                              className={cn(
                                "block text-sm font-medium",
                                linkActive(pathname, item.href)
                                  ? "text-emerald-900"
                                  : "text-charcoal group-hover:text-emerald-800",
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-charcoal/55 leading-relaxed">
                              {item.desc}
                            </span>
                          </span>
                          <ArrowRight
                            size={14}
                            className="mt-1 shrink-0 text-charcoal/25 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                          />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/collections"
                      role="menuitem"
                      className="mt-1 flex items-center justify-center gap-2 bg-emerald-900 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-emerald-800 transition-colors"
                      onClick={() => setCollectionsOpen(false)}
                    >
                      View all collections
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => {
                const active = linkActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors rounded-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800",
                      transparent
                        ? active
                          ? "text-ivory"
                          : "text-ivory/75 hover:text-ivory"
                        : active
                          ? "text-emerald-900"
                          : "text-charcoal/70 hover:text-charcoal",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="relative z-10 flex items-center gap-0.5 md:gap-1 shrink-0">
              <Link href="/search" className={iconBtn} aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </Link>
              <a
                href="https://wa.me/923209988777"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(iconBtn, "hidden sm:inline-flex")}
                aria-label="WhatsApp contact"
              >
                <Phone size={20} strokeWidth={1.5} />
              </a>
              <button
                type="button"
                onClick={toggleCart}
                className={cn(iconBtn, "relative")}
                aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : "Cart"}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-800 px-1 text-[10px] font-bold text-ivory">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              <button
                ref={menuButtonRef}
                type="button"
                className={cn(iconBtn, "lg:hidden ml-0.5")}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {mobileMenu}
    </>
  );
}
