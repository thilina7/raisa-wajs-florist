"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import CartItem from "./CartItem";

export default function CartItemList() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven&apos;t added any flowers yet.</p>
        <Link
          href="/products"
          className="mt-2 inline-flex items-center rounded-md bg-[#4A7C59] px-6 py-2 text-sm font-medium text-white hover:bg-[#3d6a4a]"
        >
          Browse Our Collection
        </Link>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
          onRemove={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
}
