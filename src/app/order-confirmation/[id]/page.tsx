import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import ClearCartOnMount from "@/components/checkout/ClearCartOnMount";
import type { OrderWithItems } from "@/types";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been placed successfully.",
  openGraph: {
    title: "Order Confirmation | Raisa Wajs Florist",
    description: "Your order has been placed successfully.",
  },
};

const orderInclude = {
  items: {
    include: {
      product: true,
      sizeVariant: true,
      addOns: {
        include: { addOn: true },
      },
    },
  },
} as const;

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let order = await prisma.order.findUnique({
    where: { stripeSessionId: id },
    include: orderInclude,
  });

  if (!order) {
    order = await prisma.order.findUnique({
      where: { id },
      include: orderInclude,
    });
  }

  if (!order) {
    notFound();
  }

  return <OrderConfirmationContent order={order as OrderWithItems} />;
}

function OrderConfirmationContent({ order }: { order: OrderWithItems }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <ClearCartOnMount />

      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#4A7C59]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Order Confirmed!</h1>
        <p className="mt-1 text-gray-500">Thank you for your order.</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Total</p>
            <p className="font-semibold text-[#4A7C59]">{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Delivery Address</h2>
          <p className="text-sm text-gray-600">{order.recipientName}</p>
          <p className="text-sm text-gray-600">{order.deliveryStreet}</p>
          <p className="text-sm text-gray-600">
            {order.deliveryCity}, {order.deliveryPostcode}
          </p>
          {order.deliveryInstructions && (
            <p className="mt-1 text-sm italic text-gray-400">
              Instructions: {order.deliveryInstructions}
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Items</h2>
          <ul className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <li key={item.id} className="py-3">
                <div className="flex justify-between">
                  <span className="font-medium">{item.product.name}</span>
                  <span className="font-medium">{formatPrice(item.lineTotal)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {item.sizeVariant.name} × {item.quantity}
                </p>
                {item.addOns.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Add-ons: {item.addOns.map((a) => a.addOn.name).join(", ")}
                  </p>
                )}
                {item.deliveryDate && (
                  <p className="text-sm text-gray-500">
                    Delivery: {item.deliveryDate}
                    {item.deliverySlot ? ` (${item.deliverySlot})` : ""}
                  </p>
                )}
                {item.cardMessage && (
                  <p className="text-sm italic text-gray-400">
                    Card: &ldquo;{item.cardMessage}&rdquo;
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-1 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-semibold">
            <span>Total</span>
            <span className="text-[#4A7C59]">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </section>
  );
}
