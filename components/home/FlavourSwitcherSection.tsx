'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { Meter } from '@/components/Meter';
import { PopBurst, BurstButtonWrapper } from '@/components/PopBurst';
import { Magnetic } from '@/components/Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent, type FlavourItem } from '@/content/site';

export function FlavourSwitcherSection() {
  const flavours = siteContent.flavours;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active: FlavourItem = flavours[selectedIndex];
  const reducedMotion = useReducedMotion();

  // Full-bleed background color based on active flavour
  const toneBgHex = {
    peri: '#FF4B1F',
    tomato: '#E5262F',
    cheddar: '#FFC21A',
  }[active.tone];

  // Contrast Guard: Text on yellow (#FFC21A) or orange (#FF4B1F) is strictly Midnight Ink (#14102B)
  const textColor = active.tone === 'tomato' ? 'text-white' : 'text-[#14102B]';
  const subtextColor = active.tone === 'tomato' ? 'text-white/80' : 'text-[#14102B]/80';

  return (
    <section
      id="flavours"
      style={{
        backgroundColor: toneBgHex,
        transition: 'background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative overflow-hidden py-20 border-b-2 border-[#14102B]"
    >
      {/* Flavor Particles (Slot 2) */}
      <PopBurst density="medium" className="opacity-40" />

      <div className="w-[min(1240px,94vw)] mx-auto relative z-10 flex flex-col gap-10">
        {/* Section Header: 1 H2 & 1 Short Paragraph */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-3">
            Only on 11 PM Snacks
          </span>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider m-0 ${textColor}`}>
            {siteContent.homepage.flavourSwitcher.title}
          </h2>
          <p className={`mt-3 text-base sm:text-lg font-medium leading-relaxed ${subtextColor}`}>
            {siteContent.homepage.flavourSwitcher.description}
          </p>

          {/* Interactive Variant Tabs (Swipeable / Scrollable on Mobile) */}
          <div className="mt-6 flex items-center justify-center gap-3 overflow-x-auto w-full py-2 px-1 no-scrollbar">
            {flavours.map((f, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-mono font-bold tracking-wider uppercase border-[2.5px] border-[#14102B] cursor-pointer whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#14102B] text-[#FFF4DC] shadow-[4px_4px_0px_#14102B] -translate-y-1'
                      : 'bg-white text-[#14102B] shadow-[2px_2px_0px_#14102B] hover:-translate-y-0.5'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage: Spring Pouch on Left, Mood Line & 3 Meters on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-[2.5px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B]">
          {/* Pouch Visual with AnimatePresence Spring Swap (Recipe 5) */}
          <div className="lg:col-span-5 flex items-center justify-center p-4 min-h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              {reducedMotion ? (
                <div key={active.id}>
                  <Image
                    src={active.pouch}
                    alt={`${active.name} Masala Popcorn Pouch`}
                    width={360}
                    height={460}
                    loading="lazy"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 360px, 400px"
                    className="w-auto h-64 sm:h-80 md:h-96 object-contain filter drop-shadow-[0_20px_24px_rgba(20,16,43,0.25)]"
                  />
                </div>
              ) : (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.9, x: 25 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -25 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <Image
                    src={active.pouch}
                    alt={`${active.name} Masala Popcorn Pouch`}
                    width={360}
                    height={460}
                    loading="lazy"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 360px, 400px"
                    className="w-auto h-64 sm:h-80 md:h-96 object-contain filter drop-shadow-[0_20px_24px_rgba(20,16,43,0.25)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Details: Mood Line, Description, 3 Meters & Buy CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 text-[#14102B]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#14102B] text-[#FFF4DC]">
                  {active.subtitle}
                </span>
                <span className="text-sm font-scribble text-[#FF4B1F] text-lg">
                  {active.moodTag}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
                {active.name}
              </h3>

              <p className="mt-2 text-base text-[#14102B]/85 font-medium leading-relaxed">
                {active.description}
              </p>

              {/* Tasting Notes */}
              <div className="mt-4 flex flex-wrap gap-2">
                {active.tastingNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-sans font-bold bg-[#FFF4DC] border border-[#14102B] text-[#14102B]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Three Sensory Meters (Heat, Tang, Crunch/Cheesiness) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-[#14102B]/10">
              <Meter
                label="Heat"
                level={active.meters.heat}
                icon="🔥"
                tone={active.tone}
              />
              <Meter
                label="Tang"
                level={active.meters.tang}
                icon="🍅"
                tone={active.tone}
              />
              <Meter
                label={active.meters.thirdLabel}
                level={active.meters.crunchOrCheese}
                icon={active.meters.thirdIcon}
                tone={active.tone}
              />
            </div>

            {/* At most One CTA Button with Magnetic Pull & Particle Burst */}
            <div className="pt-2">
              <Magnetic>
                <BurstButtonWrapper className="max-sm:w-full">
                  <Button href={active.href} variant="midnight" size="md" className="max-sm:w-full text-center">
                    {siteContent.homepage.flavourSwitcher.ctaText} ({active.name}) →
                  </Button>
                </BurstButtonWrapper>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
