import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[500px] overflow-hidden sm:min-h-[600px] lg:min-h-[700px]">
      {/* Background image */}
      <Image
        src="https://picsum.photos/seed/hero-flowers/1920/1080"
        alt="Beautiful flower arrangement"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-20 sm:py-28 lg:py-36">
        <div className="max-w-xl">
          <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
            🌸 Spring Collection 2026
          </span>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Beautiful Flowers
            <br />
            <span className="text-[#E8A0BF]">Handcrafted</span>
            <br />
            With Love
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            Fresh bouquets delivered to your door. Every arrangement is
            handcrafted by our expert florists for life&apos;s most meaningful moments.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-[#C9A96E]">From £17.99</span>
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              SAVE UP TO 40%
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#4A7C59] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#3d6a4a] hover:shadow-xl"
            >
              Shop All Flowers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/products?category=romantic"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20"
            >
              💕 Romantic Bouquets
            </Link>
          </div>
        </div>
      </div>

      {/* Floating badge - bottom right */}
      <div className="absolute bottom-6 right-6 hidden rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4A7C59]/10">
            <span className="text-2xl">🚚</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">Next-Day Delivery</p>
            <p className="text-xs text-gray-500">Order before 2pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
