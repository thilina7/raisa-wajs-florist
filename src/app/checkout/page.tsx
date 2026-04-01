import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutCancelledBanner from "@/components/checkout/CheckoutCancelledBanner";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your flower order with secure Stripe payment.",
  openGraph: {
    title: "Checkout | Raisa Wajs Florist",
    description: "Complete your flower order with secure Stripe payment.",
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cancelled = params.cancelled === "true";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-[#1a1a1a]">Checkout</h1>
      {cancelled && <CheckoutCancelledBanner />}
      <CheckoutForm />
    </section>
  );
}
