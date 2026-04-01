"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const addOnsTotal = item.addOns.reduce((sum, a) => sum + a.price, 0);
  const lineTotal = (item.unitPrice + addOnsTotal) * item.quantity;

  return (
    <article className="flex gap-4 border-b border-gray-200 py-4 last:border-b-0">
      <Link href={`/products/${item.productSlug}`} className="shrink-0">
        <Image
          src={item.productImage}
          alt={item.productName}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/products/${item.productSlug}`}
          className="font-medium text-[#1a1a1a] hover:text-[#4A7C59]"
        >
          {item.productName}
        </Link>

        <p className="text-sm text-gray-500">Size: {item.sizeVariantName}</p>

        {item.addOns.length > 0 && (
          <p className="text-sm text-gray-500">
            Add-ons: {item.addOns.map((a) => a.name).join(", ")}
          </p>
        )}

        {item.deliveryDate && (
          <p className="text-sm text-gray-500">
            Delivery: {item.deliveryDate}
            {item.deliverySlot ? ` (${item.deliverySlot})` : ""}
          </p>
        )}

        {item.cardMessage && (
          <p className="text-sm italic text-gray-500">
            Card: &ldquo;{item.cardMessage}&rdquo;
          </p>
        )}

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center rounded border border-gray-300">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.productName}`}
              className="px-2 py-1 text-sm hover:bg-gray-100"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              aria-label={`Increase quantity of ${item.productName}`}
              className="px-2 py-1 text-sm hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <Button variant="danger" onClick={onRemove} className="ml-2 px-2 py-1 text-xs">
            Remove
          </Button>
        </div>
      </div>

      <div className="shrink-0 text-right font-semibold text-[#1a1a1a]">
        {formatPrice(lineTotal)}
      </div>
    </article>
  );
}
