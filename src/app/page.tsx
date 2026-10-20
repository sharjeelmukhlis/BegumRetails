import { HeroSection } from "@/components/home/hero-section";
import { HomeParallaxController } from "@/components/home/home-parallax-controller";
import { TrustStrip } from "@/components/home/trust-strip";
import { SignatureMasterpieces } from "@/components/home/signature-masterpieces";
import { ShopByOccasion } from "@/components/home/shop-by-occasion";
import { StatementSection } from "@/components/home/statement-section";
import { CustomOffering } from "@/components/home/custom-offering";
import { CraftsmanshipSpotlight } from "@/components/home/craftsmanship-spotlight";
import { BrandStorySection } from "@/components/home/brand-story-section";
import { EditorialSpread } from "@/components/home/editorial-spread";
import { RealBridesSection } from "@/components/home/real-brides";
import { CompleteTheLook } from "@/components/home/complete-look";
import { BridalFaqSection } from "@/components/home/bridal-faq-section";
import { JournalPreview } from "@/components/home/journal-preview";
import { CardsFeatureSection } from "@/components/home/cards-feature";
import { AtelierConsultationBanner } from "@/components/home/atelier-consultation-banner";

const homepageStoreSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Begum Bridal Atelier",
  alternateName: "Begum Couture",
  description:
    "Handcrafted Pakistani bridal wear, bespoke lehengas, zardozi embroidery, and heirloom accessories by master karigars in Lahore.",
  url: "https://bagum.com",
  telephone: "+923209988777",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  priceRange: "$$$$",
  currenciesAccepted: "PKR, USD, GBP, AED, CAD",
  paymentAccepted: "Bank Transfer, Milestone Staged Payments (30/40/30)",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStoreSchema) }}
      />
      <HomeParallaxController />
      <HeroSection />
      <TrustStrip />
      <SignatureMasterpieces />
      <ShopByOccasion />
      <StatementSection />
      <CustomOffering />
      <CraftsmanshipSpotlight />
      <BrandStorySection />
      <EditorialSpread />
      <RealBridesSection />
      <CompleteTheLook />
      <BridalFaqSection />
      <CardsFeatureSection />
      <JournalPreview />
      <AtelierConsultationBanner />
    </>
  );
}
