"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8 space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const contentId = `faq-content-${index}`;

        return (
          <article
            key={item.question}
            className="rounded-lg border border-gray-200 bg-white"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-gray-900"
              >
                <span>{item.question}</span>
                <span className="ml-4 text-gray-500">{isOpen ? "-" : "+"}</span>
              </button>
            </h3>

            {isOpen ? (
              <div
                id={contentId}
                className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600"
              >
                {item.answer}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
