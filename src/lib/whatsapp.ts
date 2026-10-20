import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** Owner WhatsApp all order placements go here. */
export const OWNER_WHATSAPP = "923209988777";

export function waLink(text: string): string {
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function formatOrderLines(items: CartItem[]): string {
  return items
    .map((item, i) => {
      const size = item.size ? ` · Size: ${item.size}` : "";
      const lineTotal = formatPrice(item.price * item.quantity, "PKR");
      return `${i + 1}. *${item.name}*${size}\n   Qty: ${item.quantity} · ${lineTotal}`;
    })
    .join("\n");
}

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
  weddingDate?: string;
  occasion?: string;
  deliveryMethod?: string;
  paymentPlan?: string;
  totalPrice?: number;
  depositAmount?: number;
  notes?: string;
}

/** Full order message for the owner / atelier concierge. */
export function buildWhatsAppOrderMessage(
  items: CartItem[],
  details: CheckoutDetails,
): string {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = details.totalPrice ?? subtotal;
  const deposit = details.depositAmount ?? Math.round(total * 0.3);
  const name = [details.firstName, details.lastName].filter(Boolean).join(" ");

  return [
    "👑 *BEGUM ATELIER LAHORE — NEW BRIDAL COMMISSION*",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "👰 *CLIENT & WEDDING DETAILS*",
    `• Client: ${name || "Honored Guest"}`,
    `• WhatsApp: ${details.phone}`,
    details.email ? `• Email: ${details.email}` : null,
    details.weddingDate ? `• Wedding Date: ${details.weddingDate}` : null,
    details.occasion ? `• Occasion: ${details.occasion}` : null,
    "",
    "📍 *SHIPPING & DELIVERY*",
    `• Address: ${details.address}`,
    `• City / Country: ${details.city}${details.postalCode ? ` (${details.postalCode})` : ""}, ${details.country}`,
    details.deliveryMethod ? `• Delivery Method: ${details.deliveryMethod}` : null,
    "",
    "🧵 *COMMISSIONED PIECES*",
    formatOrderLines(items),
    "",
    "💳 *FINANCIAL BREAKDOWN*",
    `• Estimated Total: ${formatPrice(total, "PKR")}`,
    details.paymentPlan ? `• Selected Plan: ${details.paymentPlan}` : "• Plan: 30 / 40 / 30 Milestone Guarantee",
    `• 30% Booking Deposit: ${formatPrice(deposit, "PKR")}`,
    details.notes ? `\n📝 *SPECIAL REQUESTS & MEASUREMENTS:*\n${details.notes}` : null,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "✨ _Assigned to Master Karigars. Please confirm loom schedule, fabric swatch approval, and video consultation timing._",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function whatsappOrderUrl(items: CartItem[], details: CheckoutDetails): string {
  return waLink(buildWhatsAppOrderMessage(items, details));
}

const WA_LINK_ID = "begum-wa-launcher";

/** Opens WhatsApp via a real anchor click works reliably on repeat submits (unlike window.open). */
export function openWhatsAppChat(url: string): void {
  if (typeof document === "undefined") return;

  let link = document.getElementById(WA_LINK_ID) as HTMLAnchorElement | null;
  if (!link) {
    link = document.createElement("a");
    link.id = WA_LINK_ID;
    link.style.display = "none";
    document.body.appendChild(link);
  }

  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
}
