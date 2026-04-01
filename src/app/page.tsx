import { prisma } from "@/lib/prisma";
import type { ProductWithVariants } from "@/types";
import HeroBanner from "@/components/home/HeroBanner";
import PromoBannerStrip from "@/components/home/PromoBannerStrip";
import ProductCarousel from "@/components/home/ProductCarousel";
import OccasionShowcase from "@/components/home/OccasionShowcase";
import TrustBadges from "@/components/home/TrustBadges";
import SeasonalSaleBanner from "@/components/home/SeasonalSaleBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DeliveryPassPromo from "@/components/home/DeliveryPassPromo";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import SeoContent from "@/components/home/SeoContent";
import FaqAccordion from "@/components/home/FaqAccordion";

export default async function HomePage() {
  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      sizeVariants: true,
      images: { orderBy: { order: "asc" } },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  }) as ProductWithVariants[];

  const popularProducts = allProducts.slice(0, 8);

  const springProducts = allProducts.filter(
    (p) => p.category.slug === "seasonal"
  );

  const budgetProducts = allProducts.filter(
    (p) => p.category.slug === "under-30"
  );

  return (
    <>
      <HeroBanner />
      <PromoBannerStrip />
      <ProductCarousel title="🔥 Bestsellers" products={popularProducts} />
      <OccasionShowcase />
      <SeasonalSaleBanner />
      <ProductCarousel title="🌷 Spring Collection" products={springProducts} />
      <WhyChooseUs />
      <ProductCarousel title="💰 Under £30" products={budgetProducts} />
      <TrustBadges />
      <DeliveryPassPromo />
      <NewsletterSignup />
      <SeoContent />
      <FaqAccordion />
    </>
  );
}
