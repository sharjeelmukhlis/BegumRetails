"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/logo";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import {
  buildWhatsAppOrderMessage,
  formatOrderLines,
  openWhatsAppChat,
  whatsappOrderUrl,
} from "@/lib/whatsapp";
import { submitWeb3Form } from "@/lib/web3forms";
import { MessageCircle, Shield, ShoppingBag, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedWaUrl, setSubmittedWaUrl] = useState("");

  // New cart items = fresh checkout (fixes WhatsApp not opening on 2nd order)
  useEffect(() => {
    if (items.length > 0) {
      setSubmitted(false);
      setSubmittedWaUrl("");
      setError("");
    }
  }, [items.length]);

  if (items.length === 0 && !submitted) {
    return (
      <div className="pt-28 md:pt-32 pb-24">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
            <BrandMark size={56} className="opacity-25 mb-5" />
            <ShoppingBag size={56} className="text-charcoal/15 mb-5" />
            <h1 className="font-display text-2xl text-emerald-800">Nothing to order yet</h1>
            <p className="text-charcoal/50 mt-2 text-sm">
              Add pieces to your cart, then checkout — we&apos;ll confirm on WhatsApp.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/collections">Browse Collections</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-28 md:pt-32 pb-24">
        <Container>
          <div className="max-w-lg mx-auto text-center py-16">
            <CheckCircle size={48} className="mx-auto text-emerald-800 mb-5" />
            <h1 className="font-display text-3xl text-emerald-800">Order received</h1>
            <p className="mt-3 text-charcoal/65 leading-relaxed">
              Your order was sent to Begum. Open WhatsApp to confirm lead time and payment with our
              team.
            </p>
            {submittedWaUrl && (
              <Button size="lg" className="mt-8" asChild>
                <a href={submittedWaUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} className="mr-2" />
                  Open WhatsApp
                </a>
              </Button>
            )}
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/collections">Continue Shopping</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const postalCode = String(form.get("postalCode") ?? "").trim();
    const country = String(form.get("country") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();

    if (!firstName || !phone || !address || !city) {
      setError("Please fill in name, phone, address, and city.");
      setSubmitting(false);
      return;
    }

    const details = {
      firstName,
      lastName,
      phone,
      email: email || undefined,
      address,
      city,
      postalCode: postalCode || undefined,
      country: country || "Pakistan",
      notes: notes || undefined,
    };

    const customerName = [firstName, lastName].filter(Boolean).join(" ");
    const orderMessage = buildWhatsAppOrderMessage(items, details);
    const waUrl = whatsappOrderUrl(items, details);
    const orderItems = formatOrderLines(items);
    const orderTotal = formatPrice(subtotal, "PKR");

    // Anchor click in the same user gesture — reliable every time
    openWhatsAppChat(waUrl);

    clearCart();
    setSubmittedWaUrl(waUrl);
    setSubmitted(true);
    setSubmitting(false);

    void submitWeb3Form({
      subject: `New Order — ${customerName}`,
      form_type: "checkout",
      name: customerName,
      phone,
      email: email || "—",
      address,
      city,
      postal_code: postalCode || "—",
      country: country || "Pakistan",
      notes: notes || "—",
      order_items: orderItems,
      estimated_total: orderTotal,
      message: orderMessage,
    });
  };

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl text-emerald-800">Checkout</h1>
            <p className="text-sm text-charcoal/55 mt-2 max-w-xl">
              Fill in your details — your order is emailed to Begum and WhatsApp opens to confirm
              with our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-4">
                  Contact
                </h2>
                <div className="space-y-3">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email (optional)"
                    className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="WhatsApp number *"
                    className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-4">
                  Shipping
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="First name *"
                    className="col-span-2 sm:col-span-1 w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    className="col-span-2 sm:col-span-1 w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <input
                    name="address"
                    type="text"
                    required
                    placeholder="Address *"
                    className="col-span-2 w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <input
                    name="city"
                    type="text"
                    required
                    placeholder="City *"
                    className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="Postal code"
                    className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  />
                  <select
                    name="country"
                    defaultValue="Pakistan"
                    className="col-span-2 sm:col-span-1 w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent"
                  >
                    <option>Pakistan</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>UAE</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-4">
                  Notes (optional)
                </h2>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Wedding date, measurements, colour preferences…"
                  className="w-full px-4 py-2.5 text-sm border border-charcoal/10 focus:border-emerald-800 focus:outline-none bg-transparent resize-y"
                />
              </div>

              {error && (
                <p className="text-sm text-heritage-500" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                {submitting ? "Processing…" : "Checkout"}
              </Button>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="p-6 border border-charcoal/5">
                <h2 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-4">
                  Your Items
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div
                        className="w-14 h-[4.5rem] bg-sand-100 flex-shrink-0 bg-cover bg-center"
                        style={
                          item.image
                            ? { backgroundImage: `url(${item.image})` }
                            : undefined
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-charcoal">{item.name}</p>
                        {item.size && (
                          <p className="text-xs text-charcoal/50">Size: {item.size}</p>
                        )}
                        <p className="text-xs text-charcoal/50">Qty: {item.quantity}</p>
                        <p className="text-xs font-medium text-emerald-800">
                          {formatPrice(item.price * item.quantity, "PKR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="my-4 border-charcoal/10" />
                <div className="flex justify-between text-sm font-medium">
                  <span>Estimated total</span>
                  <span className="text-emerald-800">{formatPrice(subtotal, "PKR")}</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-charcoal/45">
                  <Shield size={14} />
                  <span>Staged payment arranged with our team</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
