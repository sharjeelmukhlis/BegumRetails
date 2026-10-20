"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/data/products";
import {
  buildWhatsAppOrderMessage,
  formatOrderLines,
  openWhatsAppChat,
  whatsappOrderUrl,
  CheckoutDetails,
} from "@/lib/whatsapp";
import { submitWeb3Form } from "@/lib/web3forms";
import {
  MessageCircle,
  ShoppingBag,
  Truck,
  Sparkles,
  Calendar,
  Heart,
  Video,
  Award,
  ArrowRight,
  Package,
  Building,
  Check,
  Printer,
  ChevronRight,
  Crown,
  User,
  ShieldCheck,
  Plus,
} from "lucide-react";

const OWNER_DELIVERY_FEE = 50000;

const OCCASIONS = [
  { id: "Baraat", label: "Baraat", desc: "The Grand Entrance" },
  { id: "Walima", label: "Walima", desc: "The Royal Reception" },
  { id: "Mehndi", label: "Mehndi", desc: "Vibrant Night of Silk" },
  { id: "Nikkah", label: "Nikkah", desc: "Sacred & Serene" },
];

export default function CheckoutPage() {
  const { items, clearCart, addItem } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("Baraat");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "owner" | "studio">("standard");
  const [paymentPlan, setPaymentPlan] = useState<"milestone" | "full">("milestone");
  const [notes, setNotes] = useState("");
  const [videoCallRequested, setVideoCallRequested] = useState(true);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedWaUrl, setSubmittedWaUrl] = useState("");
  const [confirmedDetails, setConfirmedDetails] = useState<CheckoutDetails | null>(null);
  const [orderRefNumber, setOrderRefNumber] = useState("");

  const deliveryFee = deliveryMethod === "owner" ? OWNER_DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const depositAmount = Math.round(total * 0.3);
  const milestone2Amount = Math.round(total * 0.4);
  const milestone3Amount = total - depositAmount - milestone2Amount;

  // Days until wedding calculation
  const daysUntilWedding = weddingDate
    ? Math.max(0, Math.ceil((new Date(weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  // Reset when items change
  useEffect(() => {
    if (items.length > 0) {
      setSubmitted(false);
      setSubmittedWaUrl("");
      setError("");
    }
  }, [items.length]);

  // Quick add sample lehenga if user lands on empty checkout
  const handleQuickAdd = (p: typeof products[0]) => {
    addItem({
      id: `${p.id}-quick`,
      productId: p.id,
      name: p.name,
      image: p.images[0]?.src ?? "",
      price: p.basePrice,
      quantity: 1,
      size: p.sizes?.[0] ?? "M",
    });
  };

  // Handle final submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please complete your name, WhatsApp number, address, and city.");
      return;
    }

    setSubmitting(true);
    setError("");

    const deliveryLabel =
      deliveryMethod === "owner"
        ? "Personal Doorstep Delivery by Begum Owner (+ PKR 50,000)"
        : deliveryMethod === "studio"
          ? "Lahore Atelier Studio Fitting & Pickup (Complimentary)"
          : "White-Glove Insured Global Courier (Complimentary)";

    const planLabel =
      paymentPlan === "milestone"
        ? `30 / 40 / 30 Milestone Plan (30% Deposit: ${formatPrice(depositAmount, "PKR")})`
        : "Full Advance Commission (Priority Loom Assignment)";

    const combinedNotes = [
      notes,
      videoCallRequested ? "• Requested 1-on-1 Guided Video Measurement Call over WhatsApp." : null,
    ]
      .filter(Boolean)
      .join("\n");

    const details: CheckoutDetails = {
      firstName,
      lastName,
      phone,
      email: email || undefined,
      address,
      city,
      postalCode: postalCode || undefined,
      country,
      weddingDate: weddingDate || undefined,
      occasion: selectedOccasion,
      deliveryMethod: deliveryLabel,
      paymentPlan: planLabel,
      totalPrice: total,
      depositAmount,
      notes: combinedNotes || undefined,
    };

    const refNo = `BGM-ROYAL-${Date.now().toString().slice(-6)}`;
    setOrderRefNumber(refNo);
    setConfirmedDetails(details);

    const customerName = [firstName, lastName].filter(Boolean).join(" ");
    const orderMessage = buildWhatsAppOrderMessage(items, details);
    const waUrl = whatsappOrderUrl(items, details);
    const orderItems = formatOrderLines(items);
    const orderTotal = formatPrice(total, "PKR");

    // Launch WhatsApp
    openWhatsAppChat(waUrl);

    clearCart();
    setSubmittedWaUrl(waUrl);
    setSubmitted(true);
    setSubmitting(false);

    void submitWeb3Form({
      subject: `👑 ROYAL BRIDAL COMMISSION: ${customerName} [${refNo}]`,
      form_type: "checkout",
      name: customerName,
      phone,
      email: email || "",
      address,
      city,
      postal_code: postalCode || "",
      country,
      notes: combinedNotes,
      order_items: orderItems,
      estimated_total: orderTotal,
      message: `${orderMessage}\n\n[Commission Ref: ${refNo}]`,
    });
  };

  // 1. EMPTY CART STATE: EDITORIAL INVITATION (NOT A DEAD END)
  if (items.length === 0 && !submitted) {
    const featuredItems = products.slice(0, 3);

    return (
      <div className="bg-[#FAF7F2] min-h-screen pt-28 md:pt-34 pb-32 selection:bg-sand-300 selection:text-emerald-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header card */}
            <div className="text-center py-12 px-6 bg-ivory border border-sand-300/80 shadow-sm relative">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 text-sand-800 text-[10px] font-mono uppercase tracking-[0.22em] mb-3">
                <Crown size={12} className="text-sand-600" />
                Begum Haute Couture &bull; Lahore Atelier
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif">
                Your Bridal Bag is Currently Empty
              </h1>
              <p className="text-charcoal/65 mt-2.5 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Add an heirloom bridal piece to commission your custom fit, or design a bespoke silhouette in our 3D Virtual Alteration Atelier.
              </p>

              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <Button
                  className="bg-emerald-950 hover:bg-emerald-900 text-sand-200 text-xs uppercase tracking-widest px-6 py-3"
                  asChild
                >
                  <Link href="/collections">Browse All Collections</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-sand-400 text-emerald-950 hover:bg-sand-100 text-xs uppercase tracking-widest px-6 py-3"
                  asChild
                >
                  <Link href="/customize">Launch Virtual Atelier 3D</Link>
                </Button>
              </div>
            </div>

            {/* Quick Commission Featured Pieces */}
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6 border-b border-sand-300/80 pb-3">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-[0.24em] text-sand-800 font-medium">
                    Atelier Highlights
                  </p>
                  <h2 className="font-display text-2xl text-emerald-950 font-serif">
                    Commission a Signature Masterpiece
                  </h2>
                </div>
                <Link
                  href="/collections"
                  className="text-xs text-emerald-900 hover:text-emerald-700 font-medium underline underline-offset-4 flex items-center gap-1"
                >
                  View all <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {featuredItems.map((p) => (
                  <div key={p.id} className="bg-ivory border border-sand-300 p-3.5 flex flex-col justify-between group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand-100 mb-3">
                      <Image
                        src={p.images[0]?.src || ""}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <span className="absolute bottom-2 left-2 bg-emerald-950/80 text-sand-200 px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs">
                        {p.occasion[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-sm text-emerald-950 font-medium line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-900 mt-1">
                        {formatPrice(p.basePrice, p.currency)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-sand-200 flex gap-2">
                      <Button
                        type="button"
                        onClick={() => handleQuickAdd(p)}
                        className="flex-1 bg-sand-100 hover:bg-emerald-950 hover:text-sand-200 text-emerald-950 border border-sand-300 text-[10px] uppercase tracking-wider py-2 transition-colors"
                      >
                        <Plus size={12} className="mr-1" />
                        Commission
                      </Button>
                      <Link
                        href={`/product/${p.slug}`}
                        className="p-2 border border-sand-300 hover:border-emerald-900 text-charcoal/60 hover:text-emerald-900 transition-colors"
                        title="View detail"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 2. SUCCESS STATE: OFFICIAL COMMISSION FARMAN / DOSSIER
  if (submitted && confirmedDetails) {
    const customerName = [confirmedDetails.firstName, confirmedDetails.lastName].filter(Boolean).join(" ");

    return (
      <div className="bg-[#FAF7F2] min-h-screen pt-28 md:pt-34 pb-32 selection:bg-sand-300 selection:text-emerald-950">
        <Container>
          <div className="max-w-2xl mx-auto bg-ivory border-2 border-sand-400 p-6 sm:p-12 shadow-xl relative">
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-sand-500" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-sand-500" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-sand-500" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-sand-500" />

            <div className="text-center pb-8 border-b border-sand-300">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 text-sand-200 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
                <Crown size={12} className="text-sand-400" />
                Imperial Commission Deed
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif">
                Bridal Commission Received
              </h1>
              <p className="font-mono text-xs sm:text-sm text-sand-800 font-bold mt-2">
                ARCHIVE PROTOCOL: #{orderRefNumber}
              </p>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-md mx-auto leading-relaxed">
                Honored <strong>{customerName}</strong>, your bridal commission has been recorded in the atelier ledgers of Begum in Lahore.
              </p>
            </div>

            {/* WhatsApp Handover Card */}
            <div className="my-8 bg-sand-50 border border-sand-400 p-6 sm:p-8 text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-emerald-950">
                <Sparkles size={13} className="text-sand-700 animate-pulse" />
                <span>Next Immediate Step</span>
              </div>
              <h3 className="font-display text-xl text-emerald-950 font-serif">
                Connect Directly with Begum Senior Stylist
              </h3>
              <p className="text-xs text-charcoal/70 max-w-md mx-auto leading-relaxed mb-4">
                Your commission deed is prepared. Tap below to launch WhatsApp with your garment specifications. Our master stylist will confirm fabric swatches and measurement timing.
              </p>

              {submittedWaUrl && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-sand-400 via-sand-300 to-sand-400 hover:from-sand-300 hover:to-sand-200 text-emerald-950 font-semibold px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg transition-transform hover:scale-105 active:scale-95"
                  asChild
                >
                  <a href={submittedWaUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} className="mr-2 text-emerald-950" />
                    Open WhatsApp Atelier Concierge Now
                  </a>
                </Button>
              )}
            </div>

            {/* Particulars Table */}
            <div className="border border-sand-300 bg-sand-50/50 p-5 space-y-3 text-xs text-charcoal/80">
              <div className="flex justify-between items-center border-b border-sand-300/60 pb-2">
                <span className="font-medium text-charcoal/50 uppercase tracking-wider">Client:</span>
                <span className="font-semibold text-emerald-950 font-display text-sm">{customerName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-sand-300/60 pb-2">
                <span className="font-medium text-charcoal/50 uppercase tracking-wider">WhatsApp Line:</span>
                <span className="font-mono text-emerald-950 font-semibold">{confirmedDetails.phone}</span>
              </div>
              {confirmedDetails.weddingDate && (
                <div className="flex justify-between items-center border-b border-sand-300/60 pb-2">
                  <span className="font-medium text-charcoal/50 uppercase tracking-wider">Wedding Date:</span>
                  <span className="font-medium text-emerald-950">{confirmedDetails.weddingDate} ({confirmedDetails.occasion})</span>
                </div>
              )}
              <div className="flex justify-between items-center border-b border-sand-300/60 pb-2">
                <span className="font-medium text-charcoal/50 uppercase tracking-wider">Delivery Protocol:</span>
                <span className="font-medium text-emerald-950">{confirmedDetails.deliveryMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-1 font-semibold text-sm text-emerald-950">
                <span>30% Deposit to Initiate Loom:</span>
                <span>{formatPrice(confirmedDetails.depositAmount ?? 0, "PKR")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-sand-300 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-xs uppercase tracking-widest border-sand-400"
                onClick={() => window.print()}
              >
                <Printer size={14} className="mr-2" />
                Print Commission Deed
              </Button>
              <Button variant="ghost" className="w-full sm:w-auto text-xs uppercase tracking-widest text-emerald-950" asChild>
                <Link href="/collections">Return to Collections</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 3. MAIN COUTURE COMMISSION CHECKOUT PAGE (ITEMS IN BAG)
  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-28 md:pt-34 pb-32 text-charcoal selection:bg-sand-300 selection:text-emerald-950">
      <Container>
        {/* Luxury Breadcrumb Bar */}
        <div className="max-w-5xl mx-auto mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-charcoal/50 mb-3">
            <Link href="/" className="hover:text-emerald-900 transition-colors">
              Atelier
            </Link>
            <ChevronRight size={11} className="text-sand-400" />
            <Link href="/cart" className="hover:text-emerald-900 transition-colors">
              Bridal Bag
            </Link>
            <ChevronRight size={11} className="text-sand-400" />
            <span className="text-emerald-950 font-semibold">
              Commission Protocol
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand-300 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-sand-800 font-medium mb-1.5">
                <Crown size={14} className="text-sand-600" />
                <span>Begum Haute Couture &bull; Lahore Atelier</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-emerald-950 font-serif leading-tight">
                Bridal Couture Commission
              </h1>
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-sand-800 bg-sand-100/80 px-3 py-1.5 border border-sand-300">
              <Award size={13} className="text-sand-600" />
              <span>Staged 30/40/30 Milestone Protocol</span>
            </div>
          </div>
        </div>

        {/* 2-Column Form & Summary Layout */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: The Bride & Event Timeline */}
            <div className="bg-ivory border border-sand-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 border-b border-sand-300/80 pb-3">
                <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center text-emerald-950">
                  <Heart size={15} />
                </div>
                <h2 className="font-display text-lg text-emerald-950 font-medium">
                  01. The Bride & Royal Timeline
                </h2>
              </div>

              {/* Occasion Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-charcoal/70 font-semibold block mb-2">
                  Select Bridal Occasion:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OCCASIONS.map((occ) => {
                    const isSelected = selectedOccasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => setSelectedOccasion(occ.id)}
                        className={`p-3 text-left border transition-all ${
                          isSelected
                            ? "border-emerald-950 bg-emerald-950/5 ring-1 ring-emerald-950 font-semibold text-emerald-950"
                            : "border-sand-300 bg-ivory text-charcoal/70 hover:border-sand-400"
                        }`}
                      >
                        <p className="text-xs uppercase tracking-wider">{occ.label}</p>
                        <p className="text-[10px] text-charcoal/50 mt-0.5 line-clamp-1">{occ.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Bride&apos;s First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="e.g. Ayesha"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Last / Family Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Khan"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>
              </div>

              {/* WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 flex items-center justify-between">
                    <span>WhatsApp Number *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors font-mono"
                    />
                    <MessageCircle size={16} className="absolute right-3.5 top-3.5 text-sand-600 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha@example.com"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Target Wedding Date with Live Countdown */}
              <div className="p-3.5 bg-sand-50/70 border border-sand-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-emerald-950 font-semibold flex items-center gap-1.5">
                    <Calendar size={14} className="text-sand-700" />
                    <span>Target Wedding / Event Date:</span>
                  </label>
                  {daysUntilWedding !== null && (
                    <span className="px-2 py-0.5 bg-sand-200 text-emerald-950 font-mono text-[10px] font-bold">
                      ✨ {daysUntilWedding} Days Remaining
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-ivory border border-sand-300 focus:border-emerald-950 outline-none"
                />
                <p className="text-[11px] text-charcoal/60">
                  Ensures loom scheduling and guaranteed dispatch 3 weeks ahead of your big day.
                </p>
              </div>
            </div>

            {/* Section 2: Delivery Protocol & Fittings */}
            <div className="bg-ivory border border-sand-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 border-b border-sand-300/80 pb-3">
                <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center text-emerald-950">
                  <Truck size={15} />
                </div>
                <h2 className="font-display text-lg text-emerald-950 font-medium">
                  02. Delivery Protocol & Destination
                </h2>
              </div>

              {/* Delivery Choice Cards */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-charcoal/70 font-semibold block">
                  Select Delivery & Fitting Experience:
                </label>

                {/* 1. Global Air Courier */}
                <div
                  onClick={() => setDeliveryMethod("standard")}
                  className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                    deliveryMethod === "standard"
                      ? "border-emerald-950 bg-emerald-950/5 ring-1 ring-emerald-950"
                      : "border-sand-300 bg-sand-50/40 hover:border-sand-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryChoice"
                    checked={deliveryMethod === "standard"}
                    onChange={() => setDeliveryMethod("standard")}
                    className="mt-1 accent-emerald-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs sm:text-sm text-emerald-950">
                        White-Glove Insured Global Courier
                      </span>
                      <span className="text-xs font-semibold text-emerald-900">Complimentary</span>
                    </div>
                    <p className="text-xs text-charcoal/60 mt-1 leading-relaxed">
                      Hand-packed in Begum Archival Wooden Box lined with organic acid-free muslin. Express tracked delivery via DHL Express with insurance.
                    </p>
                  </div>
                </div>

                {/* 2. Doorstep Fitting by Begum Owner */}
                <div
                  onClick={() => setDeliveryMethod("owner")}
                  className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                    deliveryMethod === "owner"
                      ? "border-emerald-950 bg-sand-100/60 ring-1 ring-emerald-950"
                      : "border-sand-300 bg-sand-50/40 hover:border-sand-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryChoice"
                    checked={deliveryMethod === "owner"}
                    onChange={() => setDeliveryMethod("owner")}
                    className="mt-1 accent-emerald-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-sand-700" />
                        Doorstep Delivery & Fitting by Begum Owner
                      </span>
                      <span className="text-xs font-semibold text-emerald-900">
                        + {formatPrice(OWNER_DELIVERY_FEE, "PKR")}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/60 mt-1 leading-relaxed">
                      Available across Pakistan. Begum senior master stylist travels directly to your residence for private steaming, final fitting, and jewelry drape styling.
                    </p>
                  </div>
                </div>

                {/* 3. Lahore Atelier Studio Pickup */}
                <div
                  onClick={() => setDeliveryMethod("studio")}
                  className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                    deliveryMethod === "studio"
                      ? "border-emerald-950 bg-emerald-950/5 ring-1 ring-emerald-950"
                      : "border-sand-300 bg-sand-50/40 hover:border-sand-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryChoice"
                    checked={deliveryMethod === "studio"}
                    onChange={() => setDeliveryMethod("studio")}
                    className="mt-1 accent-emerald-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
                        <Building size={14} className="text-sand-700" />
                        Lahore Atelier Private Studio Fitting & Pickup
                      </span>
                      <span className="text-xs font-semibold text-emerald-900">Complimentary</span>
                    </div>
                    <p className="text-xs text-charcoal/60 mt-1 leading-relaxed">
                      Collect directly at the Begum Haute Couture Atelier in Lahore. Includes a private 2-hour bridal salon appointment with high tea and studio fitting adjustments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Destination Address Inputs */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="House / Apartment, Street, Area"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="e.g. Lahore, Karachi, London"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal code"
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 block">
                    Country Destination
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 outline-none"
                  >
                    <option value="Pakistan">Pakistan (Domestic Courier / Doorstep)</option>
                    <option value="United Kingdom">United Kingdom (DHL Express)</option>
                    <option value="United States">United States (DHL Express)</option>
                    <option value="Canada">Canada (DHL Express)</option>
                    <option value="UAE">United Arab Emirates (DHL Express)</option>
                    <option value="Australia">Australia (DHL Express)</option>
                    <option value="Saudi Arabia">Saudi Arabia (DHL Express)</option>
                    <option value="International">Other International Destination</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Architecture & Measurement Notes */}
            <div className="bg-ivory border border-sand-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 border-b border-sand-300/80 pb-3">
                <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center text-emerald-950">
                  <ShieldCheck size={15} />
                </div>
                <h2 className="font-display text-lg text-emerald-950 font-medium">
                  03. Payment Architecture & Sizing Notes
                </h2>
              </div>

              {/* Staged Payment Options */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-charcoal/70 font-semibold block">
                  Select Payment Plan:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentPlan("milestone")}
                    className={`p-4 border text-left transition-all ${
                      paymentPlan === "milestone"
                        ? "border-emerald-950 bg-emerald-950/5 ring-1 ring-emerald-950"
                        : "border-sand-300 bg-sand-50/40 hover:border-sand-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-emerald-950">30 / 40 / 30 Milestone Guarantee</span>
                      {paymentPlan === "milestone" && <Check size={14} className="text-emerald-900" />}
                    </div>
                    <p className="text-[11px] text-charcoal/60 leading-relaxed">
                      Pay 30% ({formatPrice(depositAmount, "PKR")}) to begin handloom setup. 40% only upon approving HD karigari video proof. 30% upon final dispatch.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentPlan("full")}
                    className={`p-4 border text-left transition-all ${
                      paymentPlan === "full"
                        ? "border-emerald-950 bg-emerald-950/5 ring-1 ring-emerald-950"
                        : "border-sand-300 bg-sand-50/40 hover:border-sand-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-emerald-950">Full Advance Commission</span>
                      {paymentPlan === "full" && <Check size={14} className="text-emerald-900" />}
                    </div>
                    <p className="text-[11px] text-charcoal/60 leading-relaxed">
                      Pay 100% upfront via bank wire. Includes priority loom reservation and expedited pattern drafting.
                    </p>
                  </button>
                </div>
              </div>

              {/* Milestone Breakdown Bar */}
              {paymentPlan === "milestone" && (
                <div className="p-4 bg-sand-50 border border-sand-300/80 space-y-2.5">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-950 font-semibold font-mono">
                    Staged Payment Schedule for this Commission:
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 bg-ivory border border-sand-300">
                      <span className="text-[10px] text-sand-800 font-mono block">STAGE 1 &bull; 30%</span>
                      <span className="font-bold text-emerald-950 text-sm block mt-0.5">
                        {formatPrice(depositAmount, "PKR")}
                      </span>
                      <span className="text-[10px] text-charcoal/50 block mt-0.5">Loom & Booking</span>
                    </div>
                    <div className="p-2.5 bg-ivory border border-sand-300">
                      <span className="text-[10px] text-sand-800 font-mono block">STAGE 2 &bull; 40%</span>
                      <span className="font-bold text-emerald-950 text-sm block mt-0.5">
                        {formatPrice(milestone2Amount, "PKR")}
                      </span>
                      <span className="text-[10px] text-charcoal/50 block mt-0.5">HD Video Proof</span>
                    </div>
                    <div className="p-2.5 bg-ivory border border-sand-300">
                      <span className="text-[10px] text-sand-800 font-mono block">STAGE 3 &bull; 30%</span>
                      <span className="font-bold text-emerald-950 text-sm block mt-0.5">
                        {formatPrice(milestone3Amount, "PKR")}
                      </span>
                      <span className="text-[10px] text-charcoal/50 block mt-0.5">Final Dispatch</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Measurements Textarea */}
              <div>
                <label className="text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5 flex items-center justify-between">
                  <span>Custom Measurements / Styling Notes (Optional)</span>
                  <span className="text-[10px] text-sand-800 font-mono lowercase">blouse cut, lehenga length</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste your bust, waist, hips, and height measurements, or mention specific neckline & dupatta draping preferences..."
                  className="w-full px-4 py-3 text-sm bg-sand-50/50 border border-sand-300 focus:border-emerald-950 focus:bg-ivory outline-none transition-colors resize-y"
                />
              </div>

              {/* Video Call Checkbox */}
              <label className="flex items-start gap-3 p-3.5 bg-sand-100/60 border border-sand-300 cursor-pointer text-xs text-charcoal/80">
                <input
                  type="checkbox"
                  checked={videoCallRequested}
                  onChange={(e) => setVideoCallRequested(e.target.checked)}
                  className="mt-0.5 accent-emerald-950"
                />
                <div>
                  <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                    <Video size={13} className="text-sand-700" />
                    Request 1-on-1 Guided Video Measurement Call over WhatsApp
                  </span>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">
                    A Begum senior stylist will walk you through exact body measurements via WhatsApp video before any fabric is cut.
                  </p>
                </div>
              </label>

              {error && (
                <div className="p-3 bg-red-50 border border-red-300 text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Bridal Trunk Summary (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6">
            <div className="bg-ivory border border-sand-300 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-sand-300/80 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Crown size={16} className="text-sand-700" />
                  <h2 className="font-display text-lg text-emerald-950 font-medium">
                    Bridal Suite Summary
                  </h2>
                </div>
                <span className="text-xs font-mono text-sand-800 font-semibold">
                  {items.length} {items.length === 1 ? "Piece" : "Pieces"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3.5 pb-4 border-b border-sand-300/40 last:border-0 last:pb-0">
                    <div className="relative w-16 h-20 shrink-0 bg-sand-100 border border-sand-300 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                          <ShoppingBag size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xs sm:text-sm text-emerald-950 font-medium leading-snug line-clamp-1">
                        {item.name}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.size && (
                          <span className="inline-block text-[10px] bg-sand-100 px-2 py-0.5 text-charcoal/70 border border-sand-300/60 font-medium">
                            {item.size}
                          </span>
                        )}
                        <span className="inline-block text-[10px] bg-sand-50 px-2 py-0.5 text-charcoal/60">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-900 mt-1.5 font-mono">
                        {formatPrice(item.price * item.quantity, "PKR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="mt-5 pt-4 border-t border-sand-300 space-y-2.5 text-xs">
                <div className="flex justify-between text-charcoal/70">
                  <span>Couture Subtotal</span>
                  <span className="font-medium text-emerald-950">{formatPrice(subtotal, "PKR")}</span>
                </div>

                <div className="flex justify-between text-charcoal/70">
                  <span>White-Glove Delivery</span>
                  <span className="font-medium text-emerald-950">
                    {deliveryMethod === "owner" ? formatPrice(OWNER_DELIVERY_FEE, "PKR") : "Complimentary"}
                  </span>
                </div>

                <div className="flex justify-between font-display text-base text-emerald-950 pt-2 border-t border-sand-300 font-medium">
                  <span>Total Estimated Commission</span>
                  <span className="text-emerald-950 font-semibold">{formatPrice(total, "PKR")}</span>
                </div>

                {/* Staged Deposit Highlight Box */}
                <div className="mt-4 p-4 bg-gradient-to-r from-sand-100 to-sand-50 border border-sand-400 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] uppercase tracking-wider text-sand-900 font-bold flex items-center gap-1 font-mono">
                      <Sparkles size={11} className="text-sand-700 animate-pulse" />
                      30% Deposit to Initiate Loom:
                    </span>
                    <span className="text-base font-bold text-emerald-950 font-mono">
                      {formatPrice(depositAmount, "PKR")}
                    </span>
                  </div>
                  <p className="text-[10px] text-charcoal/60 leading-relaxed">
                    Remaining 70% staged: 40% mid-embroidery video review &bull; 30% final dispatch.
                  </p>
                </div>
              </div>

              {/* Primary Submit CTA */}
              <div className="pt-5">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 hover:from-emerald-900 hover:to-emerald-800 text-sand-200 border border-sand-400/40 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 h-auto"
                >
                  {submitting ? (
                    <span>Registering Commission…</span>
                  ) : (
                    <>
                      <span>Submit Commission & Open WhatsApp</span>
                      <ArrowRight size={16} className="text-sand-400" />
                    </>
                  )}
                </Button>
                <p className="text-[10px] text-center text-charcoal/50 mt-2">
                  Zero online card charge today. WhatsApp opens immediately with your order to confirm timing and milestone payments.
                </p>
              </div>

              {/* Senior Stylist Live Availability */}
              <div className="mt-5 pt-4 border-t border-sand-300 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sand-200 flex items-center justify-center text-emerald-950 shrink-0">
                  <User size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                    <span className="text-xs font-semibold text-emerald-950">Senior Stylist Online</span>
                  </div>
                  <p className="text-[10px] text-charcoal/55 mt-0.5">
                    Lahore Atelier Concierge ready on WhatsApp
                  </p>
                </div>
              </div>

              {/* Trust Stamps */}
              <div className="mt-5 pt-4 border-t border-sand-300 space-y-2 text-[11px] text-charcoal/70">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-sand-700 shrink-0" />
                  <span>100% Pure Silk & Certified Gold Zari Handloom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-sand-700 shrink-0" />
                  <span>Recorded HD Video Approvals of Needlework</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-sand-700 shrink-0" />
                  <span>Handcrafted Wooden Archival Box with Muslin</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
