'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import type { FlavourItem } from '@/content/site';

export interface FlavourCardProps {
  flavour: FlavourItem;
  className?: string;
}

export function FlavourCard({ flavour, className = '' }: FlavourCardProps) {
  const toneBg = {
    peri: 'bg-[#FF4B1F]/15 border-[#FF4B1F]',
    tomato: 'bg-[#E5262F]/15 border-[#E5262F]',
    cheddar: 'bg-[#FFC21A]/20 border-[#FFC21A]',
  }[flavour.tone];

  const badgeBg = {
    peri: 'bg-[#FF4B1F] text-[#14102B]',
    tomato: 'bg-[#E5262F] text-white',
    cheddar: 'bg-[#FFC21A] text-[#14102B]',
  }[flavour.tone];

  return (
    <article
      className={`group relative flex flex-col justify-between p-6 bg-white border-[2.5px] border-[#14102B] rounded-[28px] shadow-[6px_6px_0px_#14102B] hover:-translate-y-1 hover:shadow-[9px_9px_0px_#14102B] transition-all duration-200 select-none ${className}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] ${badgeBg}`}
          >
            {flavour.subtitle}
          </span>
          <span className="text-xs font-mono font-bold text-[#14102B]/60">
            {flavour.moodTag}
          </span>
        </div>

        {/* Pouch Visual with Tone Ambient Glow */}
        <div
          className={`relative w-full h-64 rounded-2xl flex items-center justify-center p-4 border-2 border-[#14102B] overflow-hidden ${toneBg}`}
        >
          <Image
            src={flavour.pouch}
            alt={`${flavour.name} Popcorn Pouch`}
            width={280}
            height={360}
            className="w-auto h-52 object-contain filter drop-shadow-[0_12px_16px_rgba(20,16,43,0.22)] group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300"
          />
        </div>

        {/* Content Details */}
        <div className="mt-5">
          <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B]">
            {flavour.name}
          </h3>
          <p className="mt-1.5 text-sm text-[#14102B]/80 font-medium leading-relaxed">
            {flavour.description}
          </p>

          {/* Tasting Notes Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {flavour.tastingNotes.map((note, idx) => (
              <span
                key={idx}
                className="inline-block px-2.5 py-1 rounded-lg text-xs font-sans font-semibold bg-[#FFF4DC] border border-[#14102B] text-[#14102B]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t-2 border-[#14102B]/10 flex items-center justify-between gap-3">
        <Link
          href={flavour.href}
          className="text-xs font-mono font-bold text-[#14102B] hover:underline"
        >
          View Flavour Story →
        </Link>
        <Button href={flavour.href} variant={flavour.tone === 'cheddar' ? 'gold' : flavour.tone} size="sm">
          Crunch Now
        </Button>
      </div>
    </article>
  );
}
