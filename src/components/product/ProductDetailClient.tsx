"use client";

import { useState, useMemo } from "react";
import type { ProductWithVariants, AddOnType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/ui/ToastProvider";
import ImageGallery from "./ImageGallery";
import SizeVariantSelector from "./SizeVariantSelector";
import AddOnSelector from "./AddOnSelector";
import DeliveryDatePicker from "./DeliveryDatePicker";
import CardMessageInput from "./CardMessageInput";

interface ProductDetailClientProps {
  product: ProductWithVariants;
  addOns: AddOnType[];
}

export default function ProductDetailClient({
  product,
  addOns,
}: ProductDetailClientProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();

  // Sort variants: Standard, Deluxe, Premium
  const sortedVariants = useMemo(() => {
    const order = ["Standard", "Deluxe", "Premium"];
    return [...product.sizeVariants].sort(
      (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  }, [product.sizeVariants]);

  const defaultVariant =
    sortedVariants.find((v) => v.name === "Standard") ?? sortedVariants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariant?.id ?? "",
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [cardMessage, setCardMessage] = useState("");

  const selectedVariant = sortedVariants.find(
    (v) => v.id === selectedVariantId,
  );

  const images = product.images
    .sort((a, b) => a.order - b.order)
    .map((img) => ({ url: img.url, alt: img.alt }));

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const primaryImage = images[0]?.url ?? "";
    const selectedAddOns = addOns
      .filter((a) => selectedAddOnIds.includes(a.id))
      .map((a) => ({ id: a.id, name: a.name, price: a.price }));

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: primaryImage,
      sizeVariantId: selectedVariant.id,
      sizeVariantName: selectedVariant.name,
      unitPrice: selectedVariant.price,
      quantity: 1,
      addOns: selectedAddOns,
      deliveryDate,
      deliverySlot: null,
      cardMessage: cardMessage.trim() || null,
    });

    toast.success(`${product.name} added to your cart!`);
  };

  // Calculate total price for display
  const addOnsTotal = addOns
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const displayPrice = (selectedVariant?.price ?? 0) + addOnsTotal;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left: Image gallery */}
      <ImageGallery images={images} />

      {/* Right: Product info + controls */}
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[#4A7C59]">
            {product.category.name}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1a1a1a] sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-xl font-bold text-[#4A7C59]">
            {formatPrice(displayPrice)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>

        {/* Size variants */}
        <SizeVariantSelector
          variants={sortedVariants}
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />

        {/* Add-ons */}
        <AddOnSelector
          addOns={addOns}
          selectedIds={selectedAddOnIds}
          onToggle={toggleAddOn}
        />

        {/* Delivery date */}
        <DeliveryDatePicker
          selectedDate={deliveryDate}
          onSelect={setDeliveryDate}
        />

        {/* Card message */}
        <CardMessageInput value={cardMessage} onChange={setCardMessage} />

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="w-full rounded-lg bg-[#4A7C59] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3a6347] focus:ring-2 focus:ring-[#4A7C59] focus:ring-offset-2 focus:outline-none"
        >
          Add to Cart — {formatPrice(displayPrice)}
        </button>

        {/* Delivery info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"
            />
          </svg>
          <span>Next-day delivery available</span>
        </div>
      </div>
    </div>
  );
}
