import { z } from "zod";

export const checkoutSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required").max(100),
  recipientPhone: z.string().min(10, "Valid phone number required").max(15),
  deliveryStreet: z.string().min(1, "Street address is required").max(200),
  deliveryCity: z.string().min(1, "City is required").max(100),
  deliveryPostcode: z.string().min(5, "Valid postcode required").max(10),
  deliveryInstructions: z.string().max(500).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
