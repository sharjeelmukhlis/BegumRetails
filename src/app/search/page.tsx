"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline?.toLowerCase().includes(query.toLowerCase()) ||
          p.artisan?.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <PageShell>
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-3xl text-emerald-800 mb-6">Search</h1>

          <div className="relative">
            <label htmlFor="search-input" className="sr-only">Search products</label>
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input
              id="search-input"
              type="text"
              placeholder="Search lehengas, dupattas, karigars..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm border border-charcoal/10 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 focus:outline-none bg-transparent"
              autoFocus
            />
          </div>

          <div className="mt-8 space-y-4">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="flex gap-4 p-4 border border-charcoal/5 hover:border-charcoal/20 transition-colors">
                  <div className="w-16 h-20 bg-sand-100 flex-shrink-0 relative overflow-hidden">
                    <Image src={product.images[0].src} alt={product.images[0].alt} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">{product.name}</h3>
                    {product.artisan && (
                      <p className="text-xs text-charcoal/50">by {product.artisan.name}</p>
                    )}
                    <p className="text-xs text-emerald-800 mt-1">{formatPrice(product.basePrice, product.currency)}</p>
                  </div>
                </Link>
              ))
            ) : query ? (
              <p className="text-center text-charcoal/50 py-10">No results found for &ldquo;{query}&rdquo;</p>
            ) : (
              <p className="text-center text-charcoal/30 py-10">Start typing to search products</p>
            )}
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
