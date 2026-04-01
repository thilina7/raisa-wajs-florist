import Image from "next/image";
import Link from "next/link";
import type { ProductWithVariants } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: ProductWithVariants }) {
  const sortedVariants = [...product.sizeVariants].sort((a, b) => a.price - b.price);
  const cheapest = sortedVariants[0];
  if (!cheapest) return null;

  const hasSale = cheapest.originalPrice != null && cheapest.originalPrice > cheapest.price;
  const saveAmount = hasSale ? (cheapest.originalPrice! - cheapest.price) : 0;

  const primaryImage = product.images.length > 0
    ? product.images.sort((a, b) => a.order - b.order)[0]
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex w-60 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-64"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            width={400}
            height={500}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {hasSale && (
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              Save {formatPrice(saveAmount)}
            </span>
          )}
          {product.hasFreeAddOn && product.freeAddOnLabel && (
            <span className="rounded-full bg-[#4A7C59] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              {product.freeAddOnLabel}
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/50 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#4A7C59]">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#4A7C59]">
          {product.category.name}
        </p>
        <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#1a1a1a]">
            from {formatPrice(cheapest.price)}
          </span>
          {hasSale && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(cheapest.originalPrice!)}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#4A7C59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Next-day delivery
        </div>
      </div>
    </Link>
  );
}
