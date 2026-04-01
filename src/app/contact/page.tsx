import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Raisa Wajs Florist. We'd love to hear from you about custom arrangements, delivery enquiries, or anything else.",
  openGraph: {
    title: "Contact Us | Raisa Wajs Florist",
    description:
      "Reach out to Raisa Wajs Florist for enquiries, custom orders, and more.",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-[#1a1a1a]">Contact Us</h1>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div>
          <p className="mb-6 text-gray-600">
            Have a question or special request? Fill out the form below and we&apos;ll get
            back to you as soon as possible.
          </p>
          <ContactForm />
        </div>

        {/* Business Details */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">
              Business Details
            </h2>
            <dl className="space-y-3 text-sm text-gray-600">
              <div>
                <dt className="font-medium text-[#1a1a1a]">Address</dt>
                <dd>42 Bloom Lane, Kensington, London W8 5QN</dd>
              </div>
              <div>
                <dt className="font-medium text-[#1a1a1a]">Phone</dt>
                <dd>
                  <a href="tel:+442071234567" className="hover:text-[#4A7C59]">
                    +44 (0) 207 123 4567
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-[#1a1a1a]">Email</dt>
                <dd>
                  <a href="mailto:hello@raisawajs.co.uk" className="hover:text-[#4A7C59]">
                    hello@raisawajs.co.uk
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-[#1a1a1a]">Opening Hours</dt>
                <dd>Mon – Sat: 8:00 AM – 7:00 PM</dd>
                <dd>Sun: 9:00 AM – 5:00 PM</dd>
              </div>
            </dl>
          </div>

          {/* Map Placeholder */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#1a1a1a]">Find Us</h2>
            <div
              className="flex h-64 items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500"
              aria-label="Map showing business location"
              role="img"
            >
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-2 h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>42 Bloom Lane, Kensington</p>
                <p>London W8 5QN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
