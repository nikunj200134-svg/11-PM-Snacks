'use client';

import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function FAQSection() {
  const { title, description, ctaText, ctaHref } = siteContent.homepage.faqSection;
  const faqItems = siteContent.faqItems;

  return (
    <section className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header: 1 H2 & 1 Short Paragraph & At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[#14102B]/15">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              Common Questions
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {/* At most one CTA: link to /faq */}
          <Button href={ctaHref} variant="outline" size="sm">
            {ctaText}
          </Button>
        </div>

        {/* Six Questions in Accordion (Slot 7) */}
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
