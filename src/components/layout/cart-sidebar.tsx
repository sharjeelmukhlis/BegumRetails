"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/shared/logo";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice, cn } from "@/lib/utils";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm" onClick={closeCart} />
      )}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-ivory shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
          <h2 className="font-display text-xl text-emerald-800">Your Cart</h2>
          <button onClick={closeCart} className="h-11 w-11 flex items-center justify-center text-charcoal/60 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <BrandMark size={48} className="opacity-30" />
            <ShoppingBag size={48} className="text-charcoal/20" />
            <p className="text-charcoal/50">Your cart is empty</p>
            <Button variant="outline" onClick={closeCart} asChild>
              <Link href="/collections">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-charcoal/5">
                  <div className="relative w-20 h-24 bg-sand-100 flex-shrink-0 overflow-hidden border border-sand-300">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                        <ShoppingBag size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-charcoal">{item.name}</h3>
                    {item.size && (
                      <p className="text-xs text-charcoal/50 mt-1">Size: {item.size}</p>
                    )}
                    <p className="text-sm font-medium text-emerald-800 mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-11 w-11 flex items-center justify-center text-charcoal/50 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-11 w-11 flex items-center justify-center text-charcoal/50 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto min-h-11 px-2 flex items-center text-xs text-charcoal/40 hover:text-heritage-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-charcoal/10 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal, "PKR")}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
              <p className="text-xs text-center text-charcoal/40">
                Confirm your order on the next step
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
