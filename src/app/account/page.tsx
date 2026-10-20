import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { User, Package, Ruler, Heart, LogOut } from "lucide-react";

const accountLinks = [
  { href: "/account/orders", icon: Package, label: "My Orders", desc: "Track and view past orders" },
  { href: "/account/measurements", icon: Ruler, label: "My Measurements", desc: "Saved measurement profiles" },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist", desc: "Saved items" },
];

export default function AccountPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center">
              <User size={28} className="text-charcoal/40" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-emerald-800">My Account</h1>
              <p className="text-sm text-charcoal/50">Welcome back</p>
            </div>
          </div>

          <div className="space-y-3">
            {accountLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-4 p-4 border border-charcoal/5 hover:border-charcoal/20 transition-colors">
                <link.icon size={20} className="text-emerald-800" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{link.label}</p>
                  <p className="text-xs text-charcoal/50">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-charcoal/10">
            <Button variant="ghost" className="text-charcoal/50">
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
