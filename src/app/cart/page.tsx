"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/logo";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="pt-28 md:pt-32 pb-24">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BrandMark size={56} className="opacity-25 mb-6" />
            <ShoppingBag size={64} className="text-charcoal/10 mb-6" />
            <h1 className="font-display text-2xl text-emerald-800">Your cart is empty</h1>
            <p className="text-charcoal/50 mt-2">Add something beautiful to get started.</p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/collections">Browse Collections</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <Container>
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="font-display text-3xl text-emerald-800 mt-4">Your Cart</h1>
          <p className="text-charcoal/50 text-sm mt-1">{items.length} {items.length === 1 ? "item" : "items"}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 border border-charcoal/5">
                <div className="relative w-24 h-32 bg-sand-100 flex-shrink-0 overflow-hidden border border-sand-300">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-charcoal">{item.name}</h3>
                  {item.size && <p className="text-xs text-charcoal/50 mt-1">Size: {item.size}</p>}
                  <p className="text-sm font-medium text-emerald-800 mt-2">{formatPrice(item.price)}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border border-charcoal/10 hover:border-charcoal/30" aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border border-charcoal/10 hover:border-charcoal/30" aria-label="Increase">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-xs text-charcoal/40 hover:text-heritage-500 flex items-center gap-1">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="p-6 border border-charcoal/5">
              <h2 className="text-sm font-medium text-charcoal uppercase tracking-wider">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="text-charcoal/50">Calculated at checkout</span>
                </div>
                <hr className="border-charcoal/10" />
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span className="text-emerald-800">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Button className="w-full mt-6" asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <p className="text-xs text-center text-charcoal/40 mt-3">
                Confirm your order on the next step
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
