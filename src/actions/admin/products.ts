"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product";
import { revalidatePath } from "next/cache";

export async function createProduct(data: unknown) {
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, description, categoryId, images, sizeVariants, hasFreeAddOn, freeAddOnLabel } =
    parsed.data;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      categoryId,
      hasFreeAddOn: hasFreeAddOn ?? false,
      freeAddOnLabel: freeAddOnLabel ?? null,
      images: {
        create: images.map((img, i) => ({
          url: img.url,
          alt: img.alt,
          order: i,
        })),
      },
      sizeVariants: {
        create: sizeVariants.map((v) => ({
          name: v.name,
          price: v.price,
          originalPrice: v.originalPrice ?? null,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { success: true as const, product };
}

export async function updateProduct(id: string, data: unknown) {
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, description, categoryId, images, sizeVariants, hasFreeAddOn, freeAddOnLabel } =
    parsed.data;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Delete existing images and variants, then recreate
  await prisma.productImage.deleteMany({ where: { productId: id } });
  await prisma.sizeVariant.deleteMany({ where: { productId: id } });

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      categoryId,
      hasFreeAddOn: hasFreeAddOn ?? false,
      freeAddOnLabel: freeAddOnLabel ?? null,
      images: {
        create: images.map((img, i) => ({
          url: img.url,
          alt: img.alt,
          order: i,
        })),
      },
      sizeVariants: {
        create: sizeVariants.map((v) => ({
          name: v.name,
          price: v.price,
          originalPrice: v.originalPrice ?? null,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { success: true as const, product };
}

export async function deleteProduct(input: { id: string }) {
  const schema = z.object({ id: z.string().min(1) });
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid product ID" };
  }

  await prisma.product.delete({ where: { id: parsed.data.id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { success: true as const };
}
