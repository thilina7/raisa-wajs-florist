"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { checkoutSchema } from "@/schemas/checkout";
import type { DeliveryData } from "@/types";

interface DeliveryFormProps {
  onSubmit: (data: DeliveryData) => void;
  loading?: boolean;
}

export default function DeliveryForm({ onSubmit, loading }: DeliveryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DeliveryData>({
    recipientName: "",
    recipientPhone: "",
    deliveryStreet: "",
    deliveryCity: "",
    deliveryPostcode: "",
    deliveryInstructions: "",
  });

  const handleChange = (field: keyof DeliveryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h2 className="text-lg font-semibold text-[#1a1a1a]">Delivery Details</h2>

      <Input
        label="Recipient Name"
        value={formData.recipientName}
        onChange={(e) => handleChange("recipientName", e.target.value)}
        error={errors.recipientName}
        required
      />
      <Input
        label="Recipient Phone"
        type="tel"
        value={formData.recipientPhone}
        onChange={(e) => handleChange("recipientPhone", e.target.value)}
        error={errors.recipientPhone}
        required
      />
      <Input
        label="Street Address"
        value={formData.deliveryStreet}
        onChange={(e) => handleChange("deliveryStreet", e.target.value)}
        error={errors.deliveryStreet}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="City"
          value={formData.deliveryCity}
          onChange={(e) => handleChange("deliveryCity", e.target.value)}
          error={errors.deliveryCity}
          required
        />
        <Input
          label="Postcode"
          value={formData.deliveryPostcode}
          onChange={(e) => handleChange("deliveryPostcode", e.target.value)}
          error={errors.deliveryPostcode}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="deliveryInstructions" className="text-sm font-medium text-[#1a1a1a]">
          Delivery Instructions (optional)
        </label>
        <textarea
          id="deliveryInstructions"
          value={formData.deliveryInstructions ?? ""}
          onChange={(e) => handleChange("deliveryInstructions", e.target.value)}
          rows={3}
          maxLength={500}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-1"
        />
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Continue to Payment
      </Button>
    </form>
  );
}
