import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** Owner WhatsApp — all order placements go here. */
export const OWNER_WHATSAPP = "923209988777";

export function waLink(text: string): string {
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function formatOrderLines(items: CartItem[]): string {
  return items
    .map((item, i) => {
      const size = item.size ? ` · Size ${item.size}` : "";
      const lineTotal = formatPrice(item.price * item.quantity, "PKR");
      return `${i + 1}. ${item.name}${size}\n   Qty ${item.quantity} — ${lineTotal}`;
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
  notes?: string;
}

/** Full order message for the owner. */
export function buildWhatsAppOrderMessage(
  items: CartItem[],
  details: CheckoutDetails,
): string {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const name = [details.firstName, details.lastName].filter(Boolean).join(" ");

  return [
    "🛍️ *New Begum Order*",
    "",
    "*Customer*",
    `Name: ${name || "—"}`,
    `Phone: ${details.phone}`,
    details.email ? `Email: ${details.email}` : null,
    "",
    "*Shipping*",
    details.address,
    `${details.city}${details.postalCode ? `, ${details.postalCode}` : ""}`,
    details.country,
    "",
    "*Items*",
    formatOrderLines(items),
    "",
    `*Estimated total:* ${formatPrice(subtotal, "PKR")}`,
    details.notes ? `\n*Notes:* ${details.notes}` : null,
    "",
    "Please confirm availability, lead time, and payment plan.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function whatsappOrderUrl(items: CartItem[], details: CheckoutDetails): string {
  return waLink(buildWhatsAppOrderMessage(items, details));
}

const WA_LINK_ID = "begum-wa-launcher";

/** Opens WhatsApp via a real anchor click — works reliably on repeat submits (unlike window.open). */
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
