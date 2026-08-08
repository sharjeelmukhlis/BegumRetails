import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: "PKR" | "GBP" | "USD" | "CAD" | "AUD" = "USD"): string {
  const formatter = new Intl.NumberFormat(
    currency === "PKR" ? "ur-PK" : "en-US",
    { style: "currency", currency, maximumFractionDigits: 0 }
  );
  return formatter.format(price);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function unslugify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function cnx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
