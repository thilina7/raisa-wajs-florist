import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: true, sizeVariants: true },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const initialData = {
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    hasFreeAddOn: product.hasFreeAddOn,
    freeAddOnLabel: product.freeAddOnLabel,
    images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
    sizeVariants: product.sizeVariants.map((v) => ({
      name: v.name as "Standard" | "Deluxe" | "Premium",
      price: v.price,
      originalPrice: v.originalPrice ?? undefined,
    })),
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1a1a1a]">
        Edit Product: {product.name}
      </h1>
      <ProductForm categories={categories} initialData={initialData} />
    </div>
  );
}
