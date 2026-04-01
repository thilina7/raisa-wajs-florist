"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function subscribeNewsletter(formData: FormData) {
  // Rate limit: 3 requests per minute per IP
  const headersList = await headers();
  const ip = getClientIp(headersList);
  const { allowed } = rateLimit(`newsletter:${ip}`, {
    maxRequests: 3,
    windowSeconds: 60,
  });

  if (!allowed) {
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }

  const raw = { email: formData.get("email") };
  const result = emailSchema.safeParse(raw);

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid email" };
  }

  // In production this would save to a database or send to an email service
  // For now we simulate a successful subscription
  return { success: true };
}
