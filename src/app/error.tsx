"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-6xl" aria-hidden="true">
        🥀
      </span>
      <h1 className="text-3xl font-bold text-[#1a1a1a]">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        We&apos;re sorry, an unexpected error occurred. Please try again or
        return to the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <a href="/">
          <Button variant="outline">Back to Home</Button>
        </a>
      </div>
    </section>
  );
}
