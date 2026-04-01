"use client";

import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { SizeVariantType } from "@/types";

interface SizeVariantSelectorProps {
  variants: SizeVariantType[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SizeVariantSelector({
  variants,
  selectedId,
  onSelect,
}: SizeVariantSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Choose your size
      </legend>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(variant.id)}
              className={cn(
                "flex flex-col items-center rounded-lg border-2 px-5 py-3 text-sm font-medium transition-colors",
                isSelected
                  ? "border-[#4A7C59] bg-[#4A7C59]/5 text-[#4A7C59]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300",
              )}
            >
              <span className="font-semibold">{variant.name}</span>
              <span className="mt-0.5 text-xs">
                {formatPrice(variant.price)}
              </span>
              {variant.originalPrice != null &&
                variant.originalPrice > variant.price && (
                  <span className="mt-0.5 text-xs text-gray-400 line-through">
                    {formatPrice(variant.originalPrice)}
                  </span>
                )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
