'use client';

import { useState } from 'react';
import { PackCard } from '@/components/PackCard';
import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function PacksSection() {
  const { packsSection } = siteContent.homepage;
  const packs = siteContent.packs;
  const variety = siteContent.varietyBundle;

  // Toggle state between Everyday Crunch and Jumbo Crunch
  const [selectedPackId, setSelectedPackId] = useState<'all' | 'everyday' | 'jumbo'>('all');

  const visiblePacks =
    selectedPackId === 'all' ? packs : packs.filter((p) => p.id.includes(selectedPackId));

  return (
    <section id="packs" className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header: 1 H2 & 1 Short Paragraph */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
            Small Batch · Freshly Popped
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {packsSection.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            {packsSection.description}
          </p>

          {/* Interactive Batch Toggle Filter */}
          <div className="mt-6 inline-flex p-1.5 bg-white border-2 border-[#14102B] rounded-full shadow-[4px_4px_0px_#14102B]">
            <button
              onClick={() => setSelectedPackId('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                selectedPackId === 'all'
                  ? 'bg-[#14102B] text-[#FFF4DC]'
                  : 'text-[#14102B] hover:bg-[#14102B]/10'
              }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setSelectedPackId('everyday')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                selectedPackId === 'everyday'
                  ? 'bg-[#14102B] text-[#FFF4DC]'
                  : 'text-[#14102B] hover:bg-[#14102B]/10'
              }`}
            >
              Everyday Crunch
            </button>
            <button
              onClick={() => setSelectedPackId('jumbo')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                selectedPackId === 'jumbo'
                  ? 'bg-[#14102B] text-[#FFF4DC]'
                  : 'text-[#14102B] hover:bg-[#14102B]/10'
              }`}
            >
              Jumbo Crunch
            </button>
          </div>
        </div>

        {/* Pack Cards Grid (Everyday Crunch, Jumbo Crunch, and Variety Crate) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {visiblePacks.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}

          {/* Variety Bundle Card with [TODO: ...] placeholder */}
          <article className="relative flex flex-col justify-between p-6 sm:p-8 bg-[#14102B] text-[#FFF4DC] border-[2.5px] border-[#14102B] rounded-[32px] shadow-[8px_8px_0px_#FFC21A] select-none">
            <div className="absolute -top-3.5 right-6">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#FF7AB8] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] rotate-2">
                {variety.badge}
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#FFC21A]">
                  {variety.name}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-[#FFC21A] text-[#14102B]">
                  Coming Soon
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-display uppercase text-[#FFC21A] tracking-tight">
                  Batch 01 Launch
                </span>
              </div>

              <p className="mt-2 text-xs font-mono font-bold text-[#FF7AB8]">
                {variety.highlight}
              </p>

              <p className="mt-4 text-sm text-[#FFF4DC]/80 leading-relaxed">
                {variety.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#FFF4DC]/20">
              <Button href="/contact" variant="gold" size="md" className="w-full text-center">
                Inquire Variety Bundle →
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
