"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());

  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between text-base font-semibold">
            <span>Order Total</span>
            <span className="text-[#4A7C59]">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="mt-6 block">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
