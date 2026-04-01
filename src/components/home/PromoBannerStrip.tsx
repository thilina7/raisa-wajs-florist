import Link from "next/link";

const PROMOS = [
  {
    icon: "🚚",
    title: "Free Delivery",
    subtitle: "On orders over £50",
    href: "/products",
    bg: "bg-[#4A7C59]",
  },
  {
    icon: "⚡",
    title: "Same Day Delivery",
    subtitle: "Order before 2pm",
    href: "/products?category=same-day",
    bg: "bg-[#C9A96E]",
  },
  {
    icon: "🌸",
    title: "7-Day Freshness",
    subtitle: "Guaranteed or replaced",
    href: "/products",
    bg: "bg-[#E8A0BF]",
  },
  {
    icon: "🎁",
    title: "Free Chocolates",
    subtitle: "With selected bouquets",
    href: "/products",
    bg: "bg-[#8B5E3C]",
  },
] as const;

export default function PromoBannerStrip() {
  return (
    <section className="bg-[#FFF8F0] py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PROMOS.map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${promo.bg}/10`}
              >
                <span className="text-xl">{promo.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#4A7C59]">
                  {promo.title}
                </p>
                <p className="truncate text-xs text-gray-500">{promo.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
