"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { createProduct, updateProduct } from "@/actions/admin/products";

interface SizeVariantData {
  name: "Standard" | "Deluxe" | "Premium";
  price: number;
  originalPrice?: number;
}

interface ImageData {
  url: string;
  alt: string;
}

interface ProductFormProps {
  categories: { id: string; name: string }[];
  initialData?: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    hasFreeAddOn: boolean;
    freeAddOnLabel: string | null;
    images: ImageData[];
    sizeVariants: SizeVariantData[];
  };
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const toast = useToast();
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [hasFreeAddOn, setHasFreeAddOn] = useState(initialData?.hasFreeAddOn ?? false);
  const [freeAddOnLabel, setFreeAddOnLabel] = useState(initialData?.freeAddOnLabel ?? "");
  const [images, setImages] = useState<ImageData[]>(
    initialData?.images ?? [{ url: "", alt: "" }],
  );
  const [variants, setVariants] = useState<SizeVariantData[]>(
    initialData?.sizeVariants ?? [
      { name: "Standard", price: 0 },
      { name: "Deluxe", price: 0 },
      { name: "Premium", price: 0 },
    ],
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function updateImage(index: number, field: keyof ImageData, value: string) {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    );
  }

  function addImage() {
    setImages((prev) => [...prev, { url: "", alt: "" }]);
  }

  function removeImage(index: number) {
    if (images.length <= 1) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: string, value: number) {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload = {
      name,
      description,
      categoryId,
      hasFreeAddOn,
      freeAddOnLabel: hasFreeAddOn ? freeAddOnLabel : undefined,
      images: images.filter((img) => img.url),
      sizeVariants: variants,
    };

    const result = isEditing
      ? await updateProduct(initialData.id, payload)
      : await createProduct(payload);

    setLoading(false);

    if (result.success) {
      toast.success(isEditing ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } else if ("errors" in result && result.errors) {
      setErrors(result.errors as Record<string, string[]>);
      toast.error("Please fix the form errors");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <Input
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name?.[0]}
        required
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#1a1a1a]">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-1"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#1a1a1a]">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-1"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-sm text-red-600">{errors.categoryId[0]}</p>
        )}
      </div>

      {/* Images */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[#1a1a1a]">Images</legend>
        {images.map((img, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                label={`Image ${i + 1} URL`}
                value={img.url}
                onChange={(e) => updateImage(i, "url", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex-1">
              <Input
                label="Alt text"
                value={img.alt}
                onChange={(e) => updateImage(i, "alt", e.target.value)}
                placeholder="Image description"
              />
            </div>
            {images.length > 1 && (
              <Button
                type="button"
                variant="danger"
                className="text-xs"
                onClick={() => removeImage(i)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" className="text-xs" onClick={addImage}>
          + Add Image
        </Button>
      </fieldset>

      {/* Size Variants */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[#1a1a1a]">
          Size Variants
        </legend>
        {variants.map((v, i) => (
          <div key={v.name} className="flex items-end gap-3">
            <span className="w-20 pb-2 text-sm font-medium">{v.name}</span>
            <div className="flex-1">
              <Input
                label="Price (£)"
                type="number"
                step="0.01"
                min="0"
                value={v.price || ""}
                onChange={(e) => updateVariant(i, "price", parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Original Price (£)"
                type="number"
                step="0.01"
                min="0"
                value={v.originalPrice || ""}
                onChange={(e) =>
                  updateVariant(i, "originalPrice", parseFloat(e.target.value) || 0)
                }
                placeholder="Optional"
              />
            </div>
          </div>
        ))}
      </fieldset>

      {/* Free Add-On */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hasFreeAddOn"
          checked={hasFreeAddOn}
          onChange={(e) => setHasFreeAddOn(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="hasFreeAddOn" className="text-sm text-[#1a1a1a]">
          Has free add-on
        </label>
      </div>
      {hasFreeAddOn && (
        <Input
          label="Free Add-On Label"
          value={freeAddOnLabel}
          onChange={(e) => setFreeAddOnLabel(e.target.value)}
          placeholder="e.g. + Free Chocs"
        />
      )}

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
