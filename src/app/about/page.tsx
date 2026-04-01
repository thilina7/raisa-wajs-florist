import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Raisa Wajs Florist — our story, mission, values, and the passionate team behind every handcrafted arrangement.",
  openGraph: {
    title: "About Us | Raisa Wajs Florist",
    description:
      "Discover the story behind Raisa Wajs Florist and our passion for bringing nature's beauty into people's lives.",
  },
};

const VALUES = [
  {
    icon: "🌸",
    title: "Quality",
    description:
      "We source only the freshest, most vibrant blooms from trusted growers to ensure every arrangement exceeds expectations.",
  },
  {
    icon: "🌿",
    title: "Sustainability",
    description:
      "From eco-friendly packaging to supporting local growers, we are committed to reducing our environmental footprint.",
  },
  {
    icon: "💐",
    title: "Personal Touch",
    description:
      "Every bouquet is handcrafted with care. We believe flowers should tell a story unique to the person receiving them.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "We proudly support local events, charities, and businesses, because a thriving community helps us all bloom.",
  },
];

const TEAM = [
  {
    name: "Raisa Wajs",
    role: "Founder & Head Florist",
    bio: "With over 15 years of floral design experience, Raisa founded the studio with a simple belief: flowers have the power to transform any moment into something extraordinary.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Elena Kowalski",
    role: "Senior Florist",
    bio: "Elena brings a modern artistic flair to every arrangement. Trained in European floral design, she specialises in wedding and luxury event floristry.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#f9f6f1] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Our Story</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Raisa Wajs Florist was founded with a passion for bringing nature&apos;s beauty
            into people&apos;s lives. What started as a small home studio has blossomed into a
            beloved local florist, known for handcrafted arrangements that celebrate
            life&apos;s most meaningful moments.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#1a1a1a]">Our Mission</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          To deliver joy through handcrafted floral arrangements. We believe every bouquet
          should be as unique as the occasion it celebrates — created with care, delivered
          with love, and designed to make someone&apos;s day a little brighter.
        </p>
      </section>

      {/* Values */}
      <section className="bg-[#f9f6f1] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#1a1a1a]">
            Our Core Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-lg bg-white p-6 shadow-sm">
                <span className="text-3xl" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#1a1a1a]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#1a1a1a]">
          Meet the Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center"
            >
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                width={160}
                height={160}
                className="rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-[#1a1a1a]">{member.name}</h3>
              <p className="text-sm font-medium text-[#4A7C59]">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
