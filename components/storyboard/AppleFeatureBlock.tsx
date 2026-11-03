'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { Meter } from '@/components/Meter';
import { Magnetic } from '@/components/Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent, type FlavourItem } from '@/content/site';

export function AppleFeatureBlock() {
  const flavours = siteContent.flavours;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active: FlavourItem = flavours[selectedIdx];
  const reducedMotion = useReducedMotion();

  return (
    <section id="features" className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3 rotate-[-1deg]">
            Product Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Three Moods. Built Different.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            Select a flavour to explore its sensory formula, clean oil profile, and small-batch craftsmanship.
          </p>

          {/* Apple-Style Pill Variant Switcher */}
          <div className="mt-8 flex items-center justify-center p-1.5 bg-white border-[2.5px] border-[#14102B] rounded-full shadow-[4px_4px_0px_#14102B] gap-2">
            {flavours.map((f, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#14102B] text-[#FFF4DC] shadow-[2px_2px_0px_#14102B]'
                      : 'text-[#14102B] hover:bg-[#14102B]/5'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apple Feature Block / Bento Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          >
            {/* Main Feature Block: Pouch Visual & Headline (8 cols) */}
            <div className="md:col-span-8 bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B] flex flex-col justify-between relative overflow-hidden">
              {/* Coming Soon Pill Sticker */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                  🚀 Coming Soon
                </span>
                <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                  Batch 01 Dropping Soon
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                <div className="sm:col-span-7 flex flex-col items-start">
                  <span className="text-xs font-mono font-bold text-[#14102B]/60 uppercase tracking-wider">
                    {active.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0 mt-1">
                    {active.name}
                  </h3>
                  <p className="mt-3 text-base text-[#14102B]/85 font-medium leading-relaxed">
                    {active.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.tastingNotes.map((note, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-sans font-bold bg-[#FFF4DC] border border-[#14102B] text-[#14102B]"
                      >
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5 flex items-center justify-center p-2">
                  <div className="relative w-full max-w-[320px] aspect-[3/2] rounded-2xl overflow-hidden border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B]">
                    <Image
                      src={active.pouch}
                      alt={`${active.name} Masala Popcorn Pouch`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Sensory Meters Strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t-2 border-[#14102B]/10">
                <Meter label="Heat" level={active.meters.heat} icon="🔥" tone={active.tone} />
                <Meter label="Tang" level={active.meters.tang} icon="🍅" tone={active.tone} />
                <Meter
                  label={active.meters.thirdLabel}
                  level={active.meters.crunchOrCheese}
                  icon={active.meters.thirdIcon}
                  tone={active.tone}
                />
              </div>
            </div>

            {/* Side Card 1: Clean Sunflower Oil & Zero Palm Oil (4 cols) */}
            <div className="md:col-span-4 bg-[#14102B] text-[#FFF4DC] border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[6px_6px_0px_#FFC21A] flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-[#2EC27E] text-[#14102B] text-xs font-mono font-bold flex items-center justify-center mb-4">
                  ✓
                </span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFC21A] block mb-1">
                  Oil Integrity
                </span>
                <h4 className="text-2xl font-display uppercase tracking-wide text-white m-0">
                  Zero Palm Oil. Pure Sunflower Pop.
                </h4>
                <p className="mt-3 text-sm text-[#FFF4DC]/80 font-medium leading-relaxed">
                  Popped in heart-friendly sunflower oil with 0g trans fat. Never heavy, greasy, or recycled.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#FFF4DC]/15 flex items-center justify-between text-xs font-mono text-[#2EC27E] font-bold">
                <span>Clean Crunch</span>
                <span>0g Trans Fat</span>
              </div>
            </div>

            {/* Bottom Card 1: 100% Whole Grain Corn (4 cols) */}
            <div className="md:col-span-4 bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[6px_6px_0px_#14102B] flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">🌽</span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF4B1F] block mb-1">
                  Grain Foundation
                </span>
                <h4 className="text-2xl font-display uppercase tracking-wide text-[#14102B] m-0">
                  100% Whole Grain Corn
                </h4>
                <p className="mt-3 text-sm text-[#14102B]/80 font-medium leading-relaxed">
                  Naturally packed with dietary fibre and 12g plant protein per 100g. Steady complex carbs for sustained focus.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#14102B]/10 text-xs font-mono font-bold text-[#FF4B1F]">
                Unrefined Kernels
              </div>
            </div>

            {/* Bottom Card 2: Small Batch Gurugram Kitchen (4 cols) */}
            <div className="md:col-span-4 bg-[#FFFDF7] border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[6px_6px_0px_#14102B] flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">📍</span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#14102B]/70 block mb-1">
                  Artisanal Craft
                </span>
                <h4 className="text-2xl font-display uppercase tracking-wide text-[#14102B] m-0">
                  Made in Gurugram
                </h4>
                <p className="mt-3 text-sm text-[#14102B]/80 font-medium leading-relaxed">
                  Small kettle batches popped in Haryana. Handled with care, seasoned evenly, and sealed immediately for freshness.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#14102B]/10 text-xs font-mono font-bold text-[#14102B]/70">
                Small-Batch Kettle
              </div>
            </div>

            {/* Bottom Card 3: Exclusive Launch Action (4 cols) */}
            <div className="md:col-span-4 bg-[#FFC21A] text-[#14102B] border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-8 shadow-[6px_6px_0px_#14102B] flex flex-col justify-between">
              <div>
                <span className="text-2xl block mb-2">🎁</span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#14102B] block mb-1">
                  Availability
                </span>
                <h4 className="text-2xl font-display uppercase tracking-wide text-[#14102B] m-0">
                  Coming Soon
                </h4>
                <p className="mt-3 text-sm text-[#14102B]/90 font-medium leading-relaxed">
                  We are finalizing our initial kitchen batch. Be the first to get early drop access and launch discounts.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#14102B]/20">
                <Magnetic className="w-full">
                  <Button href="#notify" variant="midnight" size="md" className="w-full text-center">
                    Get Launch Alert →
                  </Button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
