"use client";

export default function CheckoutCancelledBanner() {
  return (
    <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
      Payment was cancelled. Please review your order and try again.
    </div>
  );
}
