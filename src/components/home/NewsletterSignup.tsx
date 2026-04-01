"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/actions/newsletter";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrorMsg("");

    const result = await subscribeNewsletter(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong");
    }
  }

  return (
    <section className="bg-[#FFF8F0] py-12">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h2 className="text-xl font-bold text-[#1a1a1a] sm:text-2xl">
          Get 10% Off Your First Order
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to our newsletter for exclusive offers, flower care tips, and seasonal inspiration.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-lg bg-[#4A7C59]/10 p-4 text-sm font-medium text-[#4A7C59]">
            🎉 Thank you! Check your inbox for your 10% discount code.
          </div>
        ) : (
          <form action={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address for newsletter"
              className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#4A7C59] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/20"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Subscribe to newsletter"
              className="rounded-full bg-[#4A7C59] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3d6b4a] disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
