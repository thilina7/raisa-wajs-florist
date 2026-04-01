import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import OrderStatusUpdater from "@/components/admin/OrderStatusUpdater";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
          sizeVariant: true,
          addOns: { include: { addOn: true } },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">
          Order {order.orderNumber}
        </h1>
        <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
      </div>

      {/* Order Info */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-500">
            Delivery Details
          </h2>
          <p className="text-sm">{order.recipientName}</p>
          <p className="text-sm text-gray-600">{order.recipientPhone}</p>
          <p className="mt-1 text-sm text-gray-600">
            {order.deliveryStreet}, {order.deliveryCity},{" "}
            {order.deliveryPostcode}
          </p>
          {order.deliveryInstructions && (
            <p className="mt-1 text-xs italic text-gray-500">
              {order.deliveryInstructions}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-500">
            Payment Summary
          </h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Ordered: {new Date(order.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-500">
          Items
        </h2>
        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.sizeVariant.name} — Qty: {item.quantity}
                  </p>
                  <p className="text-xs text-gray-500">
                    Delivery: {item.deliveryDate} ({item.deliverySlot})
                  </p>
                  {item.cardMessage && (
                    <p className="mt-1 rounded bg-yellow-50 px-2 py-1 text-xs italic text-gray-600">
                      Card: &ldquo;{item.cardMessage}&rdquo;
                    </p>
                  )}
                  {item.addOns.length > 0 && (
                    <div className="mt-1">
                      {item.addOns.map((ao) => (
                        <span
                          key={ao.id}
                          className="mr-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600"
                        >
                          {ao.addOn.name} ({formatPrice(ao.price)})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-medium">{formatPrice(item.lineTotal)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
