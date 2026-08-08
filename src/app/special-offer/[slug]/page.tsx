import { offers } from "@/lib/data/offers";
import { OfferDetailClient } from "./offer-detail";

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.id }));
}

export default function OfferDetailPage() {
  return <OfferDetailClient />;
}
