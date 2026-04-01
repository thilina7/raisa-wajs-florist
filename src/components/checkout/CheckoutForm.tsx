"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/ui/ToastProvider";
import DeliveryForm from "./DeliveryForm";
import OrderSummary from "./OrderSummary";
import { createCheckoutSession } from "@/actions/checkout";
import type { DeliveryData } from "@/types";

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((s) => s.items);
  const toast = useToast();

  const handleDeliverySubmit = async (deliveryData: DeliveryData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const result = await createCheckoutSession({
        ...deliveryData,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          sizeVariantId: item.sizeVariantId,
          sizeVariantName: item.sizeVariantName,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          addOns: item.addOns,
          deliveryDate: item.deliveryDate ?? "",
          deliverySlot: item.deliverySlot ?? "",
          cardMessage: item.cardMessage ?? "",
        })),
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.url) {
        window.location.href = result.url;
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <DeliveryForm onSubmit={handleDeliverySubmit} loading={loading} />
      </div>
      <aside>
        <OrderSummary />
      </aside>
    </div>
  );
}
