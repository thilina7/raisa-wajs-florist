"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { CategoryType } from "@/types";

interface ProductFiltersProps {
  categories: CategoryType[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "";
  const currentPriceMin = searchParams.get("priceMin") ?? "";
  const currentPriceMax = searchParams.get("priceMax") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      // Reset to page 1 when filters change
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("priceMin");
    params.delete("priceMax");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  const hasActiveFilters = currentCategory || currentPriceMin || currentPriceMax;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#4A7C59] underline hover:text-[#3a6347]"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category / Occasion filter */}
      <div>
        <label
          htmlFor="category-filter"
          className="mb-1 block text-xs font-medium text-gray-600"
        >
          Occasion
        </label>
        <select
          id="category-filter"
          value={currentCategory}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] focus:outline-none"
        >
          <option value="">All occasions</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div>
        <span className="mb-1 block text-xs font-medium text-gray-600">
          Price range
        </span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            aria-label="Minimum price"
            value={currentPriceMin}
            min={0}
            onChange={(e) => updateParams({ priceMin: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] focus:outline-none"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            aria-label="Maximum price"
            value={currentPriceMax}
            min={0}
            onChange={(e) => updateParams({ priceMax: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
