"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">Order Summary</h2>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => {
          const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
          const lineTotal = (item.unitPrice + addOnsTotal) * item.quantity;
          return (
            <li key={item.id} className="py-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.productName}</span>
                <span>{formatPrice(lineTotal)}</span>
              </div>
              <p className="text-xs text-gray-500">
                {item.sizeVariantName} × {item.quantity}
              </p>
              {item.addOns.length > 0 && (
                <p className="text-xs text-gray-500">
                  + {item.addOns.map((a) => `${a.name} (${formatPrice(a.price)})`).join(", ")}
                </p>
              )}
              {item.cardMessage && (
                <p className="text-xs italic text-gray-400">
                  Card: &ldquo;{item.cardMessage}&rdquo;
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>{formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-semibold">
          <span>Total</span>
          <span className="text-[#4A7C59]">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
