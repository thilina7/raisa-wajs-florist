"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { contactSchema } from "@/schemas/contact";
import { submitContactForm } from "@/actions/contact";
import type { ContactInput } from "@/schemas/contact";

export default function ContactForm() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: keyof ContactInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
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
    setLoading(true);

    try {
      const response = await submitContactForm(result.data);
      if (response.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(response.error ?? "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label="Phone (optional)"
        type="tel"
        value={formData.phone ?? ""}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
      />
      <Input
        label="Subject"
        value={formData.subject}
        onChange={(e) => handleChange("subject", e.target.value)}
        error={errors.subject}
        required
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="text-sm font-medium text-[#1a1a1a]">
          Message
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={5}
          maxLength={2000}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`rounded-md border px-3 py-2 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-1 ${
            errors.message ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Send Message
      </Button>
    </form>
  );
}
