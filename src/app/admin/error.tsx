"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error boundary:", error);
  }, [error]);

  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-5xl" aria-hidden="true">
        ⚠️
      </span>
      <h1 className="text-2xl font-bold text-[#1a1a1a]">
        Admin Panel Error
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        Something went wrong in the admin panel. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <a href="/admin">
          <Button variant="outline">Back to Dashboard</Button>
        </a>
      </div>
    </section>
  );
}
