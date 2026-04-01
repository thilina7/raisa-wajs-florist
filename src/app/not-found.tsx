import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-6xl" aria-hidden="true">
        🌷
      </span>
      <h1 className="text-3xl font-bold text-[#1a1a1a]">Page Not Found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </section>
  );
}
