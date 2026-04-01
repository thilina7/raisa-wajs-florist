"use server";

import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { checkoutSchema } from "@/schemas/checkout";

const cartItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  sizeVariantId: z.string(),
  sizeVariantName: z.string(),
  unitPrice: z.number().positive(),
  quantity: z.number().int().positive(),
  addOns: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })
  ),
  deliveryDate: z.string(),
  deliverySlot: z.string(),
  cardMessage: z.string(),
});

const checkoutInputSchema = checkoutSchema.extend({
  items: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
});

type CheckoutSessionInput = z.infer<typeof checkoutInputSchema>;

export async function createCheckoutSession(
  input: CheckoutSessionInput
): Promise<{ url?: string; error?: string }> {
  const parsed = checkoutInputSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError?.message ?? "Invalid input" };
  }

  const { items, ...deliveryData } = parsed.data;

  try {
    const lineItems = items.flatMap((item) => {
      const lines: { price_data: { currency: string; product_data: { name: string }; unit_amount: number }; quantity: number }[] = [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${item.productName} (${item.sizeVariantName})`,
            },
            unit_amount: Math.round(item.unitPrice * 100),
          },
          quantity: item.quantity,
        },
      ];

      for (const addOn of item.addOns) {
        lines.push({
          price_data: {
            currency: "gbp",
            product_data: { name: `Add-on: ${addOn.name}` },
            unit_amount: Math.round(addOn.price * 100),
          },
          quantity: item.quantity,
        });
      }

      return lines;
    });

    // Add delivery fee
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: { name: "Delivery Fee" },
        unit_amount: 599, // £5.99
      },
      quantity: 1,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        deliveryData: JSON.stringify(deliveryData),
        cartItems: JSON.stringify(
          items.map((item) => ({
            productId: item.productId,
            sizeVariantId: item.sizeVariantId,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            addOns: item.addOns,
            deliveryDate: item.deliveryDate,
            deliverySlot: item.deliverySlot,
            cardMessage: item.cardMessage,
          }))
        ),
      },
      success_url: `${baseUrl}/order-confirmation/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?cancelled=true`,
    });

    return { url: session.url ?? undefined };
  } catch {
    return { error: "Failed to create checkout session. Please try again." };
  }
}
