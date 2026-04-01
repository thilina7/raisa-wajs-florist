import Link from "next/link";

export default function DeliveryPassPromo() {
  return (
    <section className="bg-gradient-to-r from-[#C9A96E] to-[#b8944f] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:flex-row md:text-left">
        {/* Icon */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Delivery Pass — Unlimited Free Delivery
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Get unlimited free next-day delivery for a whole year for just £19.99.
            That&apos;s less than the cost of 4 deliveries! Perfect for regular flower lovers.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/products"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#8B7535] shadow transition-transform hover:scale-105"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
