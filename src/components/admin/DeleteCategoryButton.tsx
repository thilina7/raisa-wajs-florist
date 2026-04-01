"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { deleteCategory } from "@/actions/admin/categories";

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
  productCount,
}: {
  categoryId: string;
  categoryName: string;
  productCount: number;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteCategory({ id: categoryId });
    setLoading(false);

    if (result.success) {
      toast.success(`"${categoryName}" deleted successfully`);
      router.refresh();
    } else if ("error" in result && result.error) {
      toast.error(result.error);
    }
    setConfirming(false);
  }

  if (productCount > 0) {
    return (
      <Button
        variant="danger"
        className="text-xs opacity-50"
        onClick={() =>
          toast.error(
            `Cannot delete "${categoryName}" — it has ${productCount} associated product${productCount > 1 ? "s" : ""}`,
          )
        }
      >
        Delete
      </Button>
    );
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="danger"
          className="text-xs"
          loading={loading}
          onClick={handleDelete}
        >
          Confirm
        </Button>
        <Button
          variant="secondary"
          className="text-xs"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="danger"
      className="text-xs"
      onClick={() => setConfirming(true)}
    >
      Delete
    </Button>
  );
}
