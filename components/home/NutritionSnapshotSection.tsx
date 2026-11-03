'use client';

import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function NutritionSnapshotSection() {
  const { title, description, labelPlaceholder, ctaText, ctaHref } =
    siteContent.homepage.nutritionSnapshot;

  return (
    <section className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-10">
        {/* Section Header: 1 H2 & 1 Short Paragraph & At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[#14102B]/15">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              Honest Snacking
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {/* At most one CTA: link to /nutrition */}
          <Button href={ctaHref} variant="midnight" size="sm">
            {ctaText}
          </Button>
        </div>

        {/* One Compact Label-Style Card with [TODO: lab data] */}
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-white border-[3px] border-[#14102B] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#14102B] rotate-[-1deg]">
            <div className="border-b-4 border-[#14102B] pb-3 mb-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF4B1F] block">
                Standardised Serving
              </span>
              <h3 className="text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Nutrition Facts
              </h3>
              <p className="text-xs font-mono text-[#14102B]/70 mt-1">
                Batch 01 Launch Editions
              </p>
            </div>

            {/* Nutrition Highlights Table */}
            <div className="space-y-2.5 font-mono text-sm border-b-2 border-[#14102B] pb-4">
              <div className="flex justify-between items-center py-1 border-b border-[#14102B]/10">
                <span className="font-bold text-[#14102B]">Plant Protein</span>
                <span className="font-bold text-[#14102B]">12g / 100g</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#14102B]/10">
                <span className="font-bold text-[#14102B]">Dietary Fibre</span>
                <span className="font-bold text-[#14102B]">Whole Grain Corn</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#14102B]/10">
                <span className="font-bold text-[#14102B]">Trans Fat</span>
                <span className="font-bold text-[#14102B]">0g · 0mg Cholesterol</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-[#14102B]">Popping Oil</span>
                <span className="font-bold text-[#2EC27E]">100% Sunflower Oil</span>
              </div>
            </div>

            {/* Visible Placeholder Tag */}
            <div className="mt-4 p-3 bg-[#FFF4DC] border-2 border-dashed border-[#14102B] rounded-xl text-center">
              <span className="text-xs font-mono font-bold text-[#FF4B1F] uppercase tracking-wider block">
                Official Lab Verification Pending
              </span>
              <p className="text-xs font-mono text-[#14102B] mt-1 font-semibold">
                {labelPlaceholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
