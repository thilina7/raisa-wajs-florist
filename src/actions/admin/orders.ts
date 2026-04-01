"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const updateOrderStatusSchema = z.object({
  id: z.string().min(1, "Order ID is required"),
  status: z.enum([
    "pending",
    "confirmed",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]),
});

export async function updateOrderStatus(input: { id: string; status: string }) {
  const parsed = updateOrderStatusSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { success: false as const, error: firstError?.message ?? "Invalid input" };
  }

  const { id, status } = parsed.data;

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  return { success: true as const, order };
}
