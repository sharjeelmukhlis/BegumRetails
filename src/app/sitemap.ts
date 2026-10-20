import { MetadataRoute } from "next";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://begumretails.com";

  const staticRoutes = [
    "",
    "/cards",
    "/collections",
    "/collections/occasion/baraat",
    "/collections/occasion/mehndi",
    "/collections/occasion/nikkah",
    "/collections/occasion/walima",
    "/collections/category/bridal-lehenga",
    "/collections/category/bridal-jewellery-sets",
    "/collections/category/bridal-shoes-khussa",
    "/collections/category/bridal-dupatta",
    "/collections/category/bridal-purse-potli",
    "/collections/complete-the-look",
    "/customize",
    "/brand-story",
    "/the-craft",
    "/journal",
    "/real-brides",
    "/about",
    "/contact",
    "/size-guide",
    "/trust",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" || route === "/cards" ? 1.0 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
