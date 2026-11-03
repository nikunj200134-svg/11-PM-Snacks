'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { PopBurst, BurstButtonWrapper } from '@/components/PopBurst';
import { Magnetic } from '@/components/Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent, type FlavourItem } from '@/content/site';

export function HoverHero() {
  const flavours = siteContent.flavours;
  const [hoveredFlavour, setHoveredFlavour] = useState<FlavourItem | null>(null);
  const reducedMotion = useReducedMotion();

  // Dynamic giant text display
  const currentTitle = hoveredFlavour ? hoveredFlavour.name.toUpperCase() : '11 PM SNACKS';

  // Dynamic background glow color
  const glowColor = hoveredFlavour
    ? {
        peri: 'rgba(255, 75, 31, 0.18)',
        tomato: 'rgba(229, 38, 47, 0.18)',
        cheddar: 'rgba(255, 194, 26, 0.22)',
      }[hoveredFlavour.tone]
    : 'rgba(255, 194, 26, 0.12)';

  return (
    <section className="relative overflow-hidden bg-[#FFF4DC] min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between pt-12 pb-16 border-b-2 border-[#14102B] select-none">
      {/* Popcorn Particle Burst on load */}
      <PopBurst density="medium" className="opacity-40" />

      {/* Dynamic Background Glow Disc */}
      <div
        style={{ backgroundColor: glowColor, transition: 'background-color 0.4s ease' }}
        className="absolute inset-0 pointer-events-none -z-10 blur-3xl"
      />

      {/* Top Header Pill */}
      <div className="w-[min(1240px,94vw)] mx-auto text-center z-10 pt-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[3px_3px_0px_#FFC21A] rotate-[-1deg]">
          Late-Night Cravings · All-Day Crunch
        </span>
      </div>

      {/* Center Stage: Giant Typography + Pouch Interactive Row (Hover members style) */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center py-6">
        {/* Giant Background Headline Swapping on Pouch Hover */}
        <div className="w-full text-center overflow-hidden px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTitle}
              initial={reducedMotion ? {} : { opacity: 0, y: 25, scale: 0.96 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -25, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.8rem,11.5vw,10.5rem)] font-display uppercase tracking-widest text-[#14102B] leading-none m-0 whitespace-nowrap drop-shadow-[4px_4px_0px_rgba(255,194,26,0.3)]"
            >
              {currentTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Foreground Pouch Showcase Row */}
        <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-3 gap-3 sm:gap-8 lg:gap-12 items-end justify-center -mt-8 sm:-mt-14 md:-mt-20 z-20">
          {flavours.map((flavour) => {
            const isHovered = hoveredFlavour?.id === flavour.id;
            const isOtherHovered = hoveredFlavour !== null && !isHovered;

            return (
              <div
                key={flavour.id}
                onMouseEnter={() => setHoveredFlavour(flavour)}
                onMouseLeave={() => setHoveredFlavour(null)}
                onTouchStart={() => setHoveredFlavour(flavour)}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Floating Tag pill */}
                <div
                  className={`transition-all duration-300 mb-2 sm:mb-4 ${
                    isHovered
                      ? 'opacity-100 transform -translate-y-2 scale-105'
                      : 'opacity-0 sm:opacity-80 scale-95'
                  }`}
                >
                  <span
                    style={{ backgroundColor: flavour.accentColor }}
                    className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]"
                  >
                    {flavour.subtitle}
                  </span>
                </div>

                {/* Pouch Mockup Image with Spring Lift */}
                <motion.div
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          y: isHovered ? -18 : 0,
                          scale: isHovered ? 1.08 : isOtherHovered ? 0.92 : 1,
                          opacity: isOtherHovered ? 0.65 : 1,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="relative"
                >
                  <Image
                    src={flavour.pouch}
                    alt={`${flavour.name} Masala Popcorn Pouch`}
                    width={360}
                    height={480}
                    priority
                    className="w-auto h-48 sm:h-72 md:h-96 lg:h-[420px] object-contain filter drop-shadow-[0_20px_28px_rgba(20,16,43,0.28)]"
                  />
                </motion.div>

                {/* Flavour Name Below */}
                <span className="mt-3 text-xs sm:text-sm md:text-base font-display uppercase tracking-wider text-[#14102B] font-bold">
                  {flavour.name}
                </span>
                <span className="text-[11px] font-scribble text-[#FF4B1F] hidden sm:block">
                  {flavour.moodTag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Value Statement & Action Buttons */}
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col items-center text-center gap-6 z-10">
        <p className="text-base sm:text-lg md:text-xl font-medium text-[#14102B]/85 max-w-xl leading-relaxed m-0">
          Small-batch masala popcorn popped in sunflower oil with bold Indian spices. Crafted in Gurugram with zero palm oil.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <BurstButtonWrapper>
              <Button href="#notify" variant="gold" size="lg">
                Notify When We Drop →
              </Button>
            </BurstButtonWrapper>
          </Magnetic>
          <Magnetic>
            <Button href="/flavours" variant="outline" size="lg">
              Explore The Flavours
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
