"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { createCategory, updateCategory } from "@/actions/admin/categories";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string | null;
  };
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const toast = useToast();
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const payload = { name, description: description || undefined };

    const result = isEditing
      ? await updateCategory(initialData.id, payload)
      : await createCategory(payload);

    setLoading(false);

    if (result.success) {
      toast.success(isEditing ? "Category updated" : "Category created");
      router.push("/admin/categories");
      router.refresh();
    } else if ("errors" in result && result.errors) {
      setErrors(result.errors as Record<string, string[]>);
      toast.error("Please fix the form errors");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <Input
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name?.[0]}
        required
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#1a1a1a]">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-1"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description[0]}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>
          {isEditing ? "Update Category" : "Create Category"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/categories")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
