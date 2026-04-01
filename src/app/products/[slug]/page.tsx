import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      sizeVariants: true,
      images: { orderBy: { order: "asc" } },
      category: true,
    },
  });

  if (!product) {
    return { title: "Product Not Found" };
  }

  const cheapest = [...product.sizeVariants].sort(
    (a, b) => a.price - b.price,
  )[0];
  const primaryImage = product.images[0];

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Raisa Wajs Florist`,
      description: product.description.slice(0, 160),
      ...(primaryImage && {
        images: [{ url: primaryImage.url, alt: primaryImage.alt }],
      }),
    },
    other: {
      "product:price:amount": cheapest ? String(cheapest.price) : "",
      "product:price:currency": "GBP",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const [product, addOns] = await Promise.all([
    prisma.product.findUnique({
      where: { slug },
      include: {
        sizeVariants: true,
        images: { orderBy: { order: "asc" } },
        category: true,
      },
    }),
    prisma.addOn.findMany({
      where: { isActive: true },
      select: { id: true, name: true, price: true, imageUrl: true, isActive: true },
    }),
  ]);

  if (!product) {
    notFound();
  }

  // JSON-LD structured data
  const sortedVariants = [...product.sizeVariants].sort(
    (a, b) => a.price - b.price,
  );
  const lowestPrice = sortedVariants[0]?.price ?? 0;
  const highestPrice = sortedVariants[sortedVariants.length - 1]?.price ?? 0;
  const primaryImage = product.images[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: primaryImage?.url,
    brand: {
      "@type": "Brand",
      name: "Raisa Wajs Florist",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: lowestPrice.toFixed(2),
      highPrice: highestPrice.toFixed(2),
      offerCount: sortedVariants.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <ol className="flex items-center gap-1">
          <li>
            <a href="/" className="hover:text-[#4A7C59]">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/products" className="hover:text-[#4A7C59]">
              Products
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-700">{product.name}</li>
        </ol>
      </nav>

      <ProductDetailClient product={product} addOns={addOns} />
    </section>
  );
}
