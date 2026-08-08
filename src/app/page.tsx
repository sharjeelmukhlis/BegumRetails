import { HeroSection } from "@/components/home/hero-section";
import { HomeParallaxController } from "@/components/home/home-parallax-controller";
import { BrandStorySection } from "@/components/home/brand-story-section";
import { EditorialSpread } from "@/components/home/editorial-spread";
import { ShopByOccasion } from "@/components/home/shop-by-occasion";
import { CompleteTheLook } from "@/components/home/complete-look";
import { CustomOffering } from "@/components/home/custom-offering";
import { CraftsmanshipSpotlight } from "@/components/home/craftsmanship-spotlight";
import { RealBridesSection } from "@/components/home/real-brides";
import { JournalPreview } from "@/components/home/journal-preview";

export default function HomePage() {
  return (
    <>
      <HomeParallaxController />
      <HeroSection />
      <BrandStorySection />
      <EditorialSpread />
      <ShopByOccasion />
      <CompleteTheLook />
      <CustomOffering />
      <CraftsmanshipSpotlight />
      <RealBridesSection />
      <JournalPreview />
    </>
  );
}
