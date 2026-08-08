import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCart } from "@/components/product/add-to-cart";
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
  Ruler,
  User,
  Shield,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Begum`,
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

  const bundleItems = product.bundleItems
    ? product.bundleItems
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];

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

  return (
    <div className="bg-ivory pt-28 md:pt-32 pb-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            artisanOverlay={
              product.artisan ? (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sand-400 flex items-center justify-center">
                      <User size={20} className="text-emerald-800" />
                    </div>
                    <div className="text-ivory">
                      <p className="text-xs uppercase tracking-wider text-sand-300">
                        Hand-embroidered by
                      </p>
                      <p className="text-sm font-medium">{product.artisan.name}</p>
                      <p className="text-xs text-sand-200/70">
                        {product.artisan.city} &middot; {product.artisan.technique}
                      </p>
                    </div>
                  </div>
                </div>
              ) : undefined
            }
          />

          {/* Purchase column */}
          <div className="md:sticky md:top-28 md:self-start">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={product.tier === "bridal" ? "heritage" : "sand"}>
                {product.tier}
              </Badge>
              <span className="text-xs text-charcoal/40 uppercase tracking-wider">
                {product.occasion.join(" / ")}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-emerald-800 leading-tight">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-charcoal/60 mt-3 leading-relaxed">{product.tagline}</p>
            )}

            <p className="font-display text-2xl md:text-3xl text-emerald-800 mt-6">
              {formatPrice(product.basePrice, product.currency)}
            </p>

            {/* Honest lead-time — beside price, not buried */}
            <div
              className={`mt-3 flex items-start gap-2.5 text-sm leading-snug ${
                lead.ready ? "text-emerald-800" : "text-charcoal/70"
              }`}
            >
              <Clock size={16} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">{lead.headline}</p>
                <p className="text-xs text-charcoal/50 mt-0.5">{lead.detail}</p>
              </div>
            </div>

            <hr className="my-6 border-sand-300/60" />

            <p className="text-sm text-charcoal/70 leading-relaxed">{product.description}</p>

            {/* Karigar credit — named, linked */}
            {product.artisan && (
              <div className="mt-6 border border-sand-300/60 bg-sand-50/60 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand-700">Karigar</p>
                <p className="mt-1.5 font-display text-lg text-emerald-900">
                  {product.artisan.name}
                </p>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  {product.artisan.city}
                  {product.artisan.yearsExperience
                    ? ` · ${product.artisan.yearsExperience} years`
                    : ""}
                  {" · "}
                  {product.artisan.technique}
                </p>
                <Link
                  href={karigarId ? `/the-craft#${karigarId}` : "/the-craft"}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-800 underline underline-offset-2 hover:text-emerald-600"
                >
                  Meet them on The Craft <ArrowRight size={12} />
                </Link>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <Ruler size={16} />
                <span>
                  {product.sizes ? `${product.sizes.length} sizes available` : "One size"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <Shield size={16} />
                <span>{product.inStock ? "Available to order" : "Waitlist"}</span>
              </div>
            </div>

            <AddToCart product={product} />

            {/* Also available as custom — visible even when already customizable */}
            {product.customizable && (
              <Link
                href="/customize"
                className="mt-4 flex items-start gap-2.5 border border-sand-300/60 bg-sand-50/50 px-3.5 py-3 text-xs text-charcoal/70 hover:border-emerald-800/30 transition-colors"
              >
                <Sparkles size={14} className="mt-0.5 shrink-0 text-sand-700" />
                <span>
                  <strong className="font-medium text-emerald-900">Also available as custom.</strong>{" "}
                  Same silhouette language, cut to your measurements — fabric, embroidery, and
                  density you choose.
                </span>
              </Link>
            )}

            <div className="flex items-center gap-2 mt-4 text-xs text-charcoal/40 justify-center">
              <Shield size={14} />
              <span>Order confirms on WhatsApp — staged payment 30 / 40 / 30</span>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 text-sm text-emerald-800 hover:text-emerald-600 transition-colors"
            >
              <MessageCircle size={18} />
              <span>Ask about this piece on WhatsApp</span>
            </a>

            {/* FAQ — beneath description / karigar, not buried */}
            <FAQSection
              items={faqs}
              heading="Questions about this piece"
              whatsappHref={waHref}
              whatsappLabel="Still have a question? Ask us on WhatsApp — this piece is already in the message"
            />

            {/* Care */}
            {care && (
              <div className="mt-8 border-t border-sand-300/60 pt-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-charcoal/50 font-medium">
                  {care.title}
                </p>
                <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">{care.body}</p>
              </div>
            )}

            {/* Reviews with photos, names, cities */}
            {reviews.length > 0 && (
              <div className="mt-8 border-t border-sand-300/60 pt-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-charcoal/50 font-medium">
                  From real brides
                </p>
                <ul className="mt-4 space-y-5">
                  {reviews.map((r) => (
                    <li key={r.id} className="flex gap-4">
                      <div className="relative w-14 h-16 shrink-0 overflow-hidden bg-sand-100">
                        <Image
                          src={r.image}
                          alt={`${r.name}, ${r.city}`}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <blockquote>
                        <p className="text-sm text-charcoal/75 leading-relaxed italic">
                          &ldquo;{r.quote}&rdquo;
                        </p>
                        <footer className="mt-1.5 text-xs text-charcoal/50">
                          <cite className="not-italic font-medium text-emerald-900">
                            {r.name}
                          </cite>
                          {" · "}
                          {r.city}
                        </footer>
                      </blockquote>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/real-brides"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-800 underline underline-offset-2"
                >
                  More real brides <ArrowRight size={12} />
                </Link>
              </div>
            )}

            {/* Complete the Look */}
            {bundleItems.length > 0 && (
              <div className="mt-8 border-t border-sand-300/60 pt-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-charcoal/50 font-medium mb-4">
                  Complete the Look
                </p>
                <div className="space-y-3">
                  {bundleItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-20 bg-sand-100 flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.images[0].src}
                          alt={item.images[0].alt}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal group-hover:text-emerald-800 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-emerald-800">
                          {formatPrice(item.basePrice, item.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
