import Image from "next/image";
import Link from "next/link";

export default function SeasonalSaleBanner() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="relative h-64 sm:h-72 lg:h-80">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=400&fit=crop"
              alt="Spring flowers sale"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A7C59]/90 via-[#4A7C59]/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-12">
              <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Limited Time
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Spring Sale
              </h2>
              <p className="mt-2 text-lg text-white/80 sm:text-xl">
                Up to <span className="font-bold text-[#C9A96E]">40% off</span> selected bouquets
              </p>
              <p className="mt-1 text-sm text-white/60">
                Plus free chocolates with every order over £30
              </p>
              <Link
                href="/products?category=seasonal"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4A7C59] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Shop the Sale
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
