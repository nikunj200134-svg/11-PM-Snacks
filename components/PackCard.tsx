'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { Magnetic } from '@/components/Magnetic';
import { BurstButtonWrapper } from '@/components/PopBurst';
import type { PackItem } from '@/content/site';

export interface PackCardProps {
  pack: PackItem;
  className?: string;
}

export function PackCard({ pack, className = '' }: PackCardProps) {
  const isJumbo = pack.isPopular;

  return (
    <article
      className={`relative flex flex-col justify-between p-6 sm:p-8 bg-white border-[2.5px] border-[#14102B] rounded-[32px] select-none transition-all duration-200 ${
        isJumbo
          ? 'shadow-[8px_8px_0px_#14102B] md:-translate-y-2 bg-[#FFFDF7]'
          : 'shadow-[6px_6px_0px_#14102B]'
      } ${className}`}
    >
      {/* Popular Ribbon */}
      {pack.badge && (
        <div className="absolute -top-3.5 right-6">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] rotate-2">
            {pack.badge}
          </span>
        </div>
      )}

      <div>
        {/* Pack Title & Launch Status */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B]">
            {pack.name}
          </h3>
          <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-[#FFF4DC] border border-[#14102B] text-[#14102B]">
            Batch 01
          </span>
        </div>

        {/* Launch Status Badge */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-display uppercase text-[#14102B] tracking-tight">
            Coming Soon
          </span>
          <span className="text-xs font-mono font-bold text-[#FF4B1F] uppercase px-2 py-0.5 rounded bg-[#FF4B1F]/10">
            Limited Drop
          </span>
        </div>

        <p className="mt-2 text-xs font-mono font-bold text-[#FF4B1F]">
          {pack.highlight}
        </p>

        <p className="mt-4 text-sm text-[#14102B]/80 leading-relaxed">
          {pack.servingDescription}
        </p>

        {/* Value Checklist */}
        <ul className="mt-6 flex flex-col gap-2.5 list-none text-xs font-sans font-semibold text-[#14102B]/90">
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#2EC27E] text-[#14102B] flex items-center justify-center text-[10px] border border-[#14102B]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>Small-batch popped in sunflower oil</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#2EC27E] text-[#14102B] flex items-center justify-center text-[10px] border border-[#14102B]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>0g trans fat · 0mg cholesterol</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#2EC27E] text-[#14102B] flex items-center justify-center text-[10px] border border-[#14102B]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>100% whole grain corn base</span>
          </li>
        </ul>
      </div>

      {/* Buy / Where to Buy Button */}
      <div className="mt-8 pt-6 border-t-2 border-[#14102B]/10">
        <Magnetic className="w-full">
          <BurstButtonWrapper className="w-full">
            <Button
              href="/where-to-buy"
              variant={isJumbo ? 'gold' : 'midnight'}
              size="md"
              className="w-full text-center"
            >
              Buy / Where to Buy →
            </Button>
          </BurstButtonWrapper>
        </Magnetic>
      </div>
    </article>
  );
}
