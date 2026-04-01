"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface DeliveryDatePickerProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

function generateDeliveryDates(): { value: string; label: string }[] {
  const dates: { value: string; label: string }[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const value = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const dayName = d.toLocaleDateString("en-GB", { weekday: "short" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-GB", { month: "short" });
    const label = `${dayName} ${dayNum} ${month}`;

    dates.push({ value, label });
  }

  return dates;
}

export default function DeliveryDatePicker({
  selectedDate,
  onSelect,
}: DeliveryDatePickerProps) {
  const dates = useMemo(() => generateDeliveryDates(), []);

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Choose delivery date
      </legend>
      <div className="flex flex-wrap gap-2">
        {dates.map((date) => {
          const isSelected = date.value === selectedDate;
          return (
            <button
              key={date.value}
              type="button"
              onClick={() => onSelect(date.value)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                isSelected
                  ? "border-[#4A7C59] bg-[#4A7C59] text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50",
              )}
            >
              {date.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
