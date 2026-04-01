import Link from "next/link";

const CATEGORIES = [
  { name: "Birthday", slug: "birthday", emoji: "🎂" },
  { name: "Romantic", slug: "romantic", emoji: "💕" },
  { name: "Under £30", slug: "under-30", emoji: "💰" },
  { name: "Student Discount", slug: "student-discount", emoji: "🎓" },
  { name: "Luxury", slug: "luxury", emoji: "✨" },
  { name: "Sympathy", slug: "sympathy", emoji: "🕊️" },
  { name: "Sale", slug: "sale", emoji: "🏷️" },
  { name: "Same Day", slug: "same-day", emoji: "⚡" },
] as const;

export default function CategoryQuickLinks() {
  return (
    <section className="bg-[#FFF8F0] py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-center text-xl font-bold text-[#1a1a1a] sm:text-2xl">
          Shop by Occasion
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a1a] shadow-sm transition-all hover:border-[#4A7C59] hover:shadow-md"
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
