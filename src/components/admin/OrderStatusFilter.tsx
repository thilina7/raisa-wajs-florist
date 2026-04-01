"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STATUSES = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderStatusFilter({
  currentStatus,
}: {
  currentStatus: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(status: string) {
    const params = new URLSearchParams();
    if (status !== "all") {
      params.set("status", status);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          onClick={() => handleFilter(s.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            currentStatus === s.value
              ? "bg-[#4A7C59] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
