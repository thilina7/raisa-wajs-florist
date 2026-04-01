"use client";

import { formatPrice } from "@/lib/utils";
import type { AddOnType } from "@/types";

interface AddOnSelectorProps {
  addOns: AddOnType[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function AddOnSelector({
  addOns,
  selectedIds,
  onToggle,
}: AddOnSelectorProps) {
  const activeAddOns = addOns.filter((a) => a.isActive);

  if (activeAddOns.length === 0) return null;

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Make it extra special
      </legend>
      <div className="space-y-2">
        {activeAddOns.map((addOn) => {
          const isChecked = selectedIds.includes(addOn.id);
          return (
            <label
              key={addOn.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(addOn.id)}
                className="h-4 w-4 rounded border-gray-300 text-[#4A7C59] focus:ring-[#4A7C59]"
              />
              <span className="flex-1 text-sm text-gray-700">{addOn.name}</span>
              <span className="text-sm font-medium text-gray-600">
                +{formatPrice(addOn.price)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
