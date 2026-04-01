"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/schemas/contact";
import type { ContactInput } from "@/schemas/contact";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function submitContactForm(
  input: ContactInput
): Promise<{ success: boolean; error?: string }> {
  // Rate limit: 5 requests per minute per IP
  const headersList = await headers();
  const ip = getClientIp(headersList);
  const { allowed } = rateLimit(`contact:${ip}`, {
    maxRequests: 5,
    windowSeconds: 60,
  });

  if (!allowed) {
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { success: false, error: firstError?.message ?? "Invalid input" };
  }

  // In production this would send an email or store in DB.
  // For now we simulate a successful submission.
  console.log("Contact form submission:", parsed.data);

  return { success: true };
}
