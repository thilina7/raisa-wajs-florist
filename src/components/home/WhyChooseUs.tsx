import Image from "next/image";

const FEATURES = [
  {
    icon: "✂️",
    title: "Handcrafted Daily",
    description:
      "Every bouquet is freshly arranged by our expert florists on the day of delivery.",
  },
  {
    icon: "🌿",
    title: "Sustainably Sourced",
    description:
      "We partner with eco-conscious growers and use recyclable packaging.",
  },
  {
    icon: "💌",
    title: "Personal Touch",
    description:
      "Add a handwritten card message and choose from premium add-ons.",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-[#f9f6f1] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=600&fit=crop"
                alt="Florist arranging a beautiful bouquet"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-white p-4 shadow-lg sm:bottom-6 sm:right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A7C59]/10 text-lg">
                  ⭐
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1a1a1a]">4.8/5</p>
                  <p className="text-xs text-gray-500">10,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-[#4A7C59]">
              Why Raisa Wajs
            </span>
            <h2 className="mt-2 text-2xl font-bold text-[#1a1a1a] sm:text-3xl">
              Flowers Made With
              <br />
              <span className="text-[#4A7C59]">Love & Expertise</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Since our founding, we&apos;ve been dedicated to creating stunning
              floral arrangements that bring joy to every occasion. Here&apos;s
              what makes us different.
            </p>

            <div className="mt-8 space-y-6">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
