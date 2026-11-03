'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`flex flex-col gap-3.5 w-full max-w-3xl mx-auto select-none ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const itemId = item.id || `faq-item-${index}`;

        return (
          <div
            key={itemId}
            className={`border-[2.5px] border-[#14102B] rounded-2xl bg-white transition-all duration-200 ${
              isOpen
                ? 'shadow-[6px_6px_0px_#14102B] bg-[#FFFDF7]'
                : 'shadow-[4px_4px_0px_#14102B] hover:shadow-[6px_6px_0px_#14102B]'
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={`content-${itemId}`}
              className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-base md:text-lg text-[#14102B] cursor-pointer"
            >
              <span>{item.question}</span>
              <span
                className={`w-7 h-7 shrink-0 rounded-full border-2 border-[#14102B] flex items-center justify-center transition-transform duration-200 ${
                  isOpen
                    ? 'bg-[#FF4B1F] text-white rotate-45 shadow-[2px_2px_0px_#14102B]'
                    : 'bg-[#FFC21A] text-[#14102B] rotate-0 shadow-[2px_2px_0px_#14102B]'
                }`}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </span>
            </button>

            {isOpen && (
              <div
                id={`content-${itemId}`}
                role="region"
                className="px-5 pb-5 pt-1 text-sm md:text-base text-[#14102B]/85 leading-relaxed border-t border-[#14102B]/10 animate-in fade-in duration-150"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
