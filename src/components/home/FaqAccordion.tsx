"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly can you deliver flowers?",
    answer:
      "We offer next day delivery across most of the UK, and same day delivery in selected areas when ordered before 2pm.",
  },
  {
    question: "Can I add a personalised message?",
    answer:
      "Yes! You can add a personalised card message of up to 200 characters with any bouquet.",
  },
  {
    question: "What if the flowers arrive damaged?",
    answer:
      "We offer a 7-day freshness guarantee. If your flowers arrive damaged, contact us and we'll send a replacement.",
  },
  {
    question: "Do you offer flower delivery for special occasions?",
    answer:
      "Absolutely! Choose from birthday flowers, sympathy flowers, romantic bouquets, seasonal arrangements and more.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.",
  },
  {
    question: "Can I track my flower delivery?",
    answer:
      "Once dispatched, you'll receive tracking details via email.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    }
  }

  return (
    <section className="bg-[#FFF8F0] py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 text-center text-xl font-bold text-[#1a1a1a] sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`Toggle answer for: ${item.question}`}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                >
                  <span>{item.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="border-t border-gray-100 px-5 py-4"
                >
                  <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
