import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  categoryId: z.string().cuid(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().min(1),
  })).min(1),
  sizeVariants: z.array(z.object({
    name: z.enum(["Standard", "Deluxe", "Premium"]),
    price: z.number().positive(),
    originalPrice: z.number().positive().optional(),
  })).min(3),
  hasFreeAddOn: z.boolean().optional(),
  freeAddOnLabel: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
