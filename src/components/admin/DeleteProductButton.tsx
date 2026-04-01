"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { deleteProduct } from "@/actions/admin/products";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteProduct({ id: productId });
    setLoading(false);

    if (result.success) {
      toast.success(`"${productName}" deleted successfully`);
      router.refresh();
    } else {
      toast.error("Failed to delete product");
    }
    setConfirming(false);
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
