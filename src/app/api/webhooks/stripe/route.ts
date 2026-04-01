import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Prevent duplicate order creation
  const existingOrder = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });
  if (existingOrder) return;

  const deliveryData = JSON.parse(session.metadata?.deliveryData ?? "{}");
  const cartItems = JSON.parse(session.metadata?.cartItems ?? "[]") as Array<{
    productId: string;
    sizeVariantId: string;
    unitPrice: number;
    quantity: number;
    addOns: Array<{ id: string; name: string; price: number }>;
    deliveryDate: string;
    deliverySlot: string;
    cardMessage: string;
  }>;

  const subtotal = cartItems.reduce((sum, item) => {
    const addOnsTotal = item.addOns.reduce((a, addon) => a + addon.price, 0);
    return sum + (item.unitPrice + addOnsTotal) * item.quantity;
  }, 0);
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  const orderNumber = `RW-${Date.now().toString(36).toUpperCase()}`;

  await prisma.order.create({
    data: {
      orderNumber,
      status: "confirmed",
      recipientName: deliveryData.recipientName ?? "",
      recipientPhone: deliveryData.recipientPhone ?? "",
      deliveryStreet: deliveryData.deliveryStreet ?? "",
      deliveryCity: deliveryData.deliveryCity ?? "",
      deliveryPostcode: deliveryData.deliveryPostcode ?? "",
      deliveryInstructions: deliveryData.deliveryInstructions ?? null,
      subtotal,
      deliveryFee,
      total,
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          sizeVariantId: item.sizeVariantId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal:
            (item.unitPrice + item.addOns.reduce((a, ao) => a + ao.price, 0)) *
            item.quantity,
          deliveryDate: item.deliveryDate,
          deliverySlot: item.deliverySlot,
          cardMessage: item.cardMessage || null,
          addOns: {
            create: item.addOns.map((addOn) => ({
              addOnId: addOn.id,
              price: addOn.price,
            })),
          },
        })),
      },
    },
  });
}
