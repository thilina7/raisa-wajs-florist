import type { Metadata } from "next";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected flower bouquets and arrangements before checkout.",
  openGraph: {
    title: "Shopping Cart | Raisa Wajs Florist",
    description: "Review your selected flower bouquets and arrangements before checkout.",
  },
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-[#1a1a1a]">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItemList />
        </div>
        <aside>
          <CartSummary />
        </aside>
      </div>
    </section>
  );
}
