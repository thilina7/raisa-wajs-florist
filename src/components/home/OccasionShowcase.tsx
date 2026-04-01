import Image from "next/image";
import Link from "next/link";

const OCCASIONS = [
  {
    name: "Birthday",
    slug: "birthday",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop",
    description: "Make their day unforgettable",
    color: "from-pink-500/60",
  },
  {
    name: "Romantic",
    slug: "romantic",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=400&fit=crop",
    description: "Express your love beautifully",
    color: "from-red-500/60",
  },
  {
    name: "Sympathy",
    slug: "sympathy",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop",
    description: "Thoughtful tributes with care",
    color: "from-gray-600/60",
  },
  {
    name: "Luxury",
    slug: "luxury",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=400&fit=crop",
    description: "Premium arrangements",
    color: "from-amber-600/60",
  },
  {
    name: "Seasonal",
    slug: "seasonal",
    image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&h=400&fit=crop",
    description: "Fresh picks of the season",
    color: "from-green-600/60",
  },
  {
    name: "Under £30",
    slug: "under-30",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=400&fit=crop",
    description: "Beautiful on any budget",
    color: "from-purple-500/60",
  },
] as const;

export default function OccasionShowcase() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] sm:text-3xl">
            Flowers for Every Occasion
          </h2>
          <p className="mt-2 text-gray-500">
            Find the perfect bouquet for any moment
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {/* First two cards are larger */}
          {OCCASIONS.slice(0, 2).map((occasion) => (
            <Link
              key={occasion.slug}
              href={`/products?category=${occasion.slug}`}
              className="group relative col-span-1 overflow-hidden rounded-2xl sm:aspect-[4/3]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={occasion.image}
                  alt={`${occasion.name} flowers`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${occasion.color} to-transparent`} />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {occasion.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {occasion.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white">
                    Shop now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Third card spans full height on desktop */}
          <Link
            href={`/products?category=${OCCASIONS[2].slug}`}
            className="group relative hidden overflow-hidden rounded-2xl sm:block sm:row-span-1"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={OCCASIONS[2].image}
                alt={`${OCCASIONS[2].name} flowers`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${OCCASIONS[2].color} to-transparent`} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {OCCASIONS[2].name}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {OCCASIONS[2].description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white">
                  Shop now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Remaining cards */}
          {OCCASIONS.slice(2).map((occasion) => (
            <Link
              key={occasion.slug}
              href={`/products?category=${occasion.slug}`}
              className={`group relative overflow-hidden rounded-2xl ${occasion.slug === "sympathy" ? "sm:hidden" : ""}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={occasion.image}
                  alt={`${occasion.name} flowers`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${occasion.color} to-transparent`} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-bold text-white">{occasion.name}</h3>
                  <p className="mt-0.5 text-xs text-white/80">
                    {occasion.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white">
                    Shop now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
