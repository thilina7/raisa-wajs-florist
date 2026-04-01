import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import type { SortOption } from "@/types";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSort from "@/components/product/ProductSort";
import ProductSearch from "@/components/product/ProductSearch";
import Pagination from "@/components/product/Pagination";

export const metadata: Metadata = {
  title: "Our Flowers",
  description:
    "Browse our beautiful collection of fresh flower bouquets and arrangements. Filter by occasion, sort by price, and find the perfect flowers for any event.",
  openGraph: {
    title: "Our Flowers | Raisa Wajs Florist",
    description:
      "Browse our beautiful collection of fresh flower bouquets and arrangements.",
  },
};

const PRODUCTS_PER_PAGE = 12;

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const category = typeof params.category === "string" ? params.category : undefined;
  const sort = typeof params.sort === "string" ? (params.sort as SortOption) : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const page = typeof params.page === "string" ? Math.max(1, parseInt(params.page, 10) || 1) : 1;
  const priceMin = typeof params.priceMin === "string" ? parseFloat(params.priceMin) : undefined;
  const priceMax = typeof params.priceMax === "string" ? parseFloat(params.priceMax) : undefined;

  // Build Prisma where clause
  const where: Record<string, unknown> = { isActive: true };

  if (category) {
    where.category = { slug: category };
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    where.sizeVariants = {
      some: {
        name: "Standard",
        ...(priceMin !== undefined && { price: { gte: priceMin } }),
        ...(priceMax !== undefined && { price: { lte: priceMax } }),
      },
    };
  }

  // Build orderBy
  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price-asc" || sort === "price-desc") {
    // We'll sort in JS after fetching since Prisma can't easily sort by nested relation
    orderBy = { createdAt: "desc" };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  } else if (sort === "newest") {
    orderBy = { createdAt: "desc" };
  }

  // Fetch total count and products
  const [totalCount, allProducts, categories] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: {
        sizeVariants: true,
        images: { orderBy: { order: "asc" } },
        category: true,
      },
      orderBy,
    }),
    prisma.category.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Sort by price if needed (since Prisma can't sort by nested variant price)
  let sortedProducts = allProducts;
  if (sort === "price-asc") {
    sortedProducts = [...allProducts].sort((a, b) => {
      const aMin = Math.min(...a.sizeVariants.map((v) => v.price));
      const bMin = Math.min(...b.sizeVariants.map((v) => v.price));
      return aMin - bMin;
    });
  } else if (sort === "price-desc") {
    sortedProducts = [...allProducts].sort((a, b) => {
      const aMin = Math.min(...a.sizeVariants.map((v) => v.price));
      const bMin = Math.min(...b.sizeVariants.map((v) => v.price));
      return bMin - aMin;
    });
  }

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-[#1a1a1a] sm:text-3xl">
        Our Flowers
      </h1>

      {/* Search + Sort bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={null}>
          <ProductSearch />
        </Suspense>
        <Suspense fallback={null}>
          <ProductSort />
        </Suspense>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="w-full shrink-0 lg:w-56">
          <Suspense fallback={null}>
            <ProductFilters categories={categories} />
          </Suspense>
        </aside>

        {/* Product grid + pagination */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-gray-500">
            {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""} found
          </p>

          <ProductGrid products={paginatedProducts} />

          {totalPages > 1 && (
            <div className="mt-8">
              <Suspense fallback={null}>
                <Pagination currentPage={page} totalPages={totalPages} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
