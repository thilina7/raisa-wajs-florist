import Link from "next/link";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Corporate" },
] as const;

const INFO_LINKS = [
  { href: "/delivery-info", label: "Delivery Info" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/blog", label: "Blog" },
] as const;

const OCCASION_LINKS = [
  { href: "/products?occasion=birthday", label: "Birthday" },
  { href: "/products?occasion=romantic", label: "Romantic" },
  { href: "/products?occasion=sympathy", label: "Sympathy" },
  { href: "/products?occasion=seasonal", label: "Seasonal" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#FFF8F0]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <span className="font-serif text-lg font-bold text-[#4A7C59]">
                Raisa Wajs
              </span>
              <br />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7535]">
                Florist
              </span>
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Beautiful fresh flowers delivered to your door. Handcrafted
              bouquets for every occasion.
            </p>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">
              Information
            </h3>
            <ul className="space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-[#4A7C59]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">
              Occasions
            </h3>
            <ul className="space-y-2">
              {OCCASION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-[#4A7C59]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a]">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-[#4A7C59]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 hover:text-[#4A7C59]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-[#4A7C59]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Payment icons & copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Raisa Wajs Florist. All rights reserved.
          </p>

          {/* Payment method icons */}
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            {/* Visa */}
            <span className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-blue-800">
              VISA
            </span>
            {/* Mastercard */}
            <span className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-red-600">
              MC
            </span>
            {/* Amex */}
            <span className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-blue-600">
              AMEX
            </span>
            {/* PayPal */}
            <span className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-blue-700">
              PayPal
            </span>
            {/* Apple Pay */}
            <span className="rounded border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-gray-800">
              Apple Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
