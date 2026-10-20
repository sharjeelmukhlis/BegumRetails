import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductAtelierOptions } from "@/components/product/product-atelier-options";
import { ProductStagedPayment } from "@/components/product/product-staged-payment";
import { ProductAtelierCallout } from "@/components/product/product-atelier-callout";
import { ProductEnsemble } from "@/components/product/product-ensemble";
import { ProductMobileBar } from "@/components/product/product-mobile-bar";
import { FAQSection } from "@/components/shared/faq-section";
import {
  getProductBySlug,
  products,
  realBrideStories,
} from "@/lib/data/products";
import { karigarProfiles } from "@/lib/data/content";
import {
  resolveProductFaqs,
  resolveCareGuidance,
  leadTimeMessage,
  whatsappProductUrl,
} from "@/lib/data/faqs";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  User,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Gem,
  Package,
  Scissors,
  Award,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Begum Haute Couture Atelier Lahore`,
    description: product.tagline ?? product.description.slice(0, 160),
  };
}

function findKarigarId(artisanName: string): string | null {
  const match = karigarProfiles.find(
    (k) => k.name.toLowerCase() === artisanName.toLowerCase(),
  );
  return match?.id ?? null;
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Find explicit bundle items or complement with pieces from the same occasion
  const explicitBundleItems = product.bundleItems
    ? product.bundleItems
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];

  const supplementaryItems = products.filter(
    (p) =>
      p.id !== product.id &&
      !explicitBundleItems.some((bi) => bi.id === p.id) &&
      p.occasion.some((occ) => product.occasion.includes(occ)) &&
      p.category !== product.category,
  );

  const ensembleItems = [...explicitBundleItems, ...supplementaryItems].slice(0, 4);

  const faqs = resolveProductFaqs(product.id, product.category);
  const care = resolveCareGuidance(product.category);
  const lead = leadTimeMessage(product.leadTimeDays, product.inStock);
  const waHref = whatsappProductUrl(product.name, product.slug);
  const karigarId = product.artisan ? findKarigarId(product.artisan.name) : null;

  const reviews = realBrideStories.filter(
    (r) =>
      r.productName.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(r.productName.replace(/^Custom\s+/i, "").toLowerCase()),
  );

  const primaryOccasion = product.occasion?.[0] ?? "bridal";

  return (
    <div className="bg-[#FAF7F2] pt-24 md:pt-28 pb-28 md:pb-36 selection:bg-sand-300 selection:text-emerald-950">
      <Container>
        {/* Luxury Breadcrumb Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand-300/60 pb-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/50 overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link href="/" className="hover:text-emerald-900 transition-colors">
              Atelier
            </Link>
            <ChevronRight size={11} className="shrink-0 text-sand-400" />
            <Link href="/collections" className="hover:text-emerald-900 transition-colors">
              Collections
            </Link>
            <ChevronRight size={11} className="shrink-0 text-sand-400" />
            <Link
              href={`/collections/occasion/${primaryOccasion}`}
              className="capitalize hover:text-emerald-900 transition-colors"
            >
              {primaryOccasion}
            </Link>
            <ChevronRight size={11} className="shrink-0 text-sand-400" />
            <span className="text-emerald-950 font-semibold truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-sand-800">
            <Award size={13} className="text-sand-600" />
            <span>Archive Ref: #{product.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Editorial Split Screen: Gallery Left & Sticky Details Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Gallery & Provenance (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <ProductGallery
              images={product.images}
              productName={product.name}
              artisanOverlay={
                product.artisan ? (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-emerald-950/95 via-emerald-950/60 to-transparent p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-full bg-sand-400 flex items-center justify-center shrink-0 shadow-lg border border-sand-200">
                          <User size={20} className="text-emerald-950" />
                        </div>
                        <div className="text-ivory">
                          <p className="text-[10px] uppercase font-sans tracking-[0.22em] text-sand-300">
                            Master Karigar Craftsmanship
                          </p>
                          <p className="text-base font-display font-medium text-sand-100">
                            {product.artisan.name}
                          </p>
                          <p className="text-xs text-sand-200/80">
                            {product.artisan.city} &middot; {product.artisan.technique}
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 bg-sand-400/20 border border-sand-400/40 px-3 py-1 text-[10px] uppercase tracking-wider text-sand-200 backdrop-blur-xs">
                        <Gem size={11} className="text-sand-400" />
                        100% Handworked
                      </span>
                    </div>
                  </div>
                ) : undefined
              }
            />

            {/* Editorial Craftsmanship Details (Award-winning Accordion) */}
            <div className="border border-sand-300/80 bg-sand-50/50 p-6 space-y-6">
              <div className="border-b border-sand-300/60 pb-4">
                <p className="text-[10px] uppercase tracking-[0.26em] text-sand-800 font-medium">
                  Atelier Architecture
                </p>
                <h3 className="font-display text-xl text-emerald-950 mt-1">
                  Heirloom Craftsmanship & Composition
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 text-xs text-charcoal/80">
                <div className="space-y-1.5">
                  <p className="font-semibold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Scissors size={13} className="text-sand-700" /> Silhouette & Structure
                  </p>
                  <p className="leading-relaxed">
                    Sculpted with a multi-tiered internal can-can armature and reinforced canvas waistband. Finished with hand-stitched horsehair braid along the bottom hem for a dramatic, circular flare that holds its volume through royal wedding entrances.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-sand-700" /> Embroidery & Zari Provenance
                  </p>
                  <p className="leading-relaxed">
                    Stitched using pure gold-washed silver dabka, French knot resham silk threads, and hand-beveled metallic sequins. Every bullion wire coil is shaped over padding by hand in Lahore to achieve the signature 3D raised contour of Begum couture.
                  </p>
                </div>
              </div>

              {/* Master Karigar Card */}
              {product.artisan && (
                <div className="mt-4 pt-4 border-t border-sand-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-ivory p-4 border border-sand-300">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Crafted by Hand In</span>
                    <p className="font-display text-base text-emerald-950 font-medium">
                      {product.artisan.name} &bull; {product.artisan.city} Workshop
                    </p>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      {product.artisan.yearsExperience ?? 25} years specializing in {product.artisan.technique}
                    </p>
                  </div>
                  <Link
                    href={karigarId ? `/the-craft#${karigarId}` : "/the-craft"}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-900 font-medium underline underline-offset-4 hover:text-emerald-700 shrink-0"
                  >
                    Meet the Karigars <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sticky Couture Purchase Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6">
            {/* Header: Badges & Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={product.tier === "bridal" ? "heritage" : "sand"}>
                  {product.tier.toUpperCase()} HAUTE COUTURE
                </Badge>
                {product.occasion.map((occ) => (
                  <Link
                    key={occ}
                    href={`/collections/occasion/${occ}`}
                    className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 bg-sand-100 text-emerald-950 border border-sand-300 hover:bg-sand-200 transition-colors"
                  >
                    {occ}
                  </Link>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-emerald-950 leading-[1.15] font-serif">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-charcoal/70 text-sm sm:text-base mt-2.5 leading-relaxed font-serif italic">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}

              {/* Price & Lead Time */}
              <div className="mt-5 flex items-baseline justify-between border-b border-sand-300/60 pb-4">
                <div>
                  <span className="font-display text-3xl sm:text-4xl text-emerald-950 font-medium">
                    {formatPrice(product.basePrice, product.currency)}
                  </span>
                  <span className="block text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">
                    Complimentary White-Glove Global Shipping Included
                  </span>
                </div>
              </div>

              {/* Lead Time Honest Banner */}
              <div
                className={`mt-4 flex items-start gap-2.5 text-xs leading-snug p-3 bg-sand-50 border border-sand-300/70 ${
                  lead.ready ? "text-emerald-900" : "text-charcoal/80"
                }`}
              >
                <Clock size={16} className="mt-0.5 shrink-0 text-sand-700" />
                <div>
                  <p className="font-medium text-emerald-950">{lead.headline}</p>
                  <p className="text-xs text-charcoal/60 mt-0.5">{lead.detail}</p>
                </div>
              </div>
            </div>

            {/* Interactive Atelier Options: Colors & Fabrics */}
            <ProductAtelierOptions
              initialColor={product.color}
              initialColorHex={product.colorHex}
              initialFabric={product.fabric}
            />

            {/* Sizing, Customize Button & Add to Bag */}
            <AddToCart product={product} />

            {/* 30/40/30 Milestone Payment Breakdown */}
            <ProductStagedPayment
              basePrice={product.basePrice}
              currency={product.currency}
            />

            {/* Virtual Atelier 3D Customizer Callout */}
            <ProductAtelierCallout product={product} />

            {/* Direct WhatsApp VIP Stylist Concierge */}
            <div className="border border-emerald-900/20 bg-ivory p-4 text-center space-y-2">
              <p className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
                Lahore Atelier Styling Concierge
              </p>
              <p className="text-[11px] text-charcoal/60 max-w-sm mx-auto leading-relaxed">
                Connect directly with Begum senior stylists. Send reference swatches, discuss custom necklines, or schedule a private studio video fitting.
              </p>
              <div className="pt-1">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full border border-emerald-900/30 hover:border-emerald-900 bg-sand-50 hover:bg-emerald-950 hover:text-ivory text-emerald-950 py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium transition-all"
                >
                  <MessageCircle size={15} />
                  <span>Inquire on WhatsApp with Product Code</span>
                </a>
              </div>
            </div>

            {/* Trust & Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-sand-300/60 pt-4 text-center text-[10px] text-charcoal/60">
              <div className="p-2">
                <Package size={16} className="mx-auto mb-1 text-sand-700" />
                <span className="font-medium text-emerald-950 block">Insured Courier</span>
                Global DHL Express
              </div>
              <div className="p-2">
                <CheckCircle size={16} className="mx-auto mb-1 text-sand-700" />
                <span className="font-medium text-emerald-950 block">Pure Katan Silk</span>
                100% Certified Loom
              </div>
              <div className="p-2">
                <Sparkles size={16} className="mx-auto mb-1 text-sand-700" />
                <span className="font-medium text-emerald-950 block">Video Approvals</span>
                Staged milestone check-ins
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look: Curated Bridal Ensemble */}
        <ProductEnsemble
          primaryProduct={product}
          ensembleItems={ensembleItems}
        />

        {/* Real Brides Archival Memories */}
        {reviews.length > 0 && (
          <div className="mt-20 border-t border-sand-300/60 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-800 font-medium">
                  Real Brides in Begum
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-emerald-950 mt-1">
                  Heirloom Weddings Worldwide
                </h3>
              </div>
              <Link
                href="/real-brides"
                className="text-xs text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1.5 underline underline-offset-4"
              >
                Browse all 200+ bride portraits <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.id} className="bg-sand-50/70 border border-sand-300/60 p-5 flex flex-col justify-between shadow-xs">
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-sand-100 border border-sand-300/60">
                      <Image
                        src={r.image}
                        alt={`${r.name}, ${r.city}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-display text-base text-emerald-950 font-medium">
                        {r.name}
                      </p>
                      <p className="text-xs text-charcoal/50">{r.city}</p>
                      <p className="text-[10px] text-sand-800 font-mono mt-1 font-medium">
                        {r.productName}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-xs text-charcoal/75 leading-relaxed italic border-t border-sand-300/50 pt-3">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs & Preservation Guide */}
        <div className="mt-20 border-t border-sand-300/60 pt-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <FAQSection
              items={faqs}
              heading="Questions about commissioning this piece"
              whatsappHref={waHref}
              whatsappLabel="Ask our senior stylist about this piece on WhatsApp"
            />
          </div>

          <div className="md:col-span-5 md:pl-8 md:border-l border-sand-300/60 space-y-6">
            {care && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-sand-800 font-medium">
                  Preservation & Heritage
                </p>
                <h4 className="font-display text-xl text-emerald-950 mt-1 mb-3">
                  {care.title}
                </h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {care.body}
                </p>
                <div className="mt-4 p-4 bg-sand-100/60 border border-sand-300 text-xs text-charcoal/75 space-y-2">
                  <strong className="text-emerald-950 block text-[11px] uppercase tracking-wider">
                    Begum Archival Bridal Chest:
                  </strong>
                  <p>
                    Every bridal couture ensemble arrives in an embroidered wooden chest lined with acid-free organic muslin. This prevents gold tilla oxidation and keeps your zardozi gleaming for future generations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Floating mobile action bar with both Customize and Add to Bag buttons */}
      <ProductMobileBar product={product} whatsappHref={waHref} />
    </div>
  );
}
