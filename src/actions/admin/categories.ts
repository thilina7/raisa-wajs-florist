"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas/category";
import { revalidatePath } from "next/cache";

export async function createCategory(data: unknown) {
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, description } = parsed.data;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = await prisma.category.create({
    data: { name, slug, description: description ?? null },
  });

  revalidatePath("/admin/categories");
  return { success: true as const, category };
}

export async function updateCategory(id: string, data: unknown) {
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, description } = parsed.data;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = await prisma.category.update({
    where: { id },
    data: { name, slug, description: description ?? null },
  });

  revalidatePath("/admin/categories");
  return { success: true as const, category };
}

export async function deleteCategory({ id }: { id: string }) {
  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productCount > 0) {
    return {
      success: false as const,
      error: `Cannot delete category with ${productCount} associated product${productCount > 1 ? "s" : ""}. Reassign products first.`,
    };
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  return { success: true as const };
}
