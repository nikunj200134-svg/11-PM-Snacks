'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';
import { PopBurst } from '@/components/PopBurst';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Prompt 7: Crowd Story (Canvas Crowd Pattern)
 * 
 * - Full-screen story section using free Canvas crowd (#39) with Open Peeps sprite sheet
 * - Pinned for ~300vh of scroll
 * - Five copy beats revealed sequentially:
 *   1. "Everyone’s hungry. Nobody’s reading the label."
 *   2. "These days, most of us eat without asking what’s inside."
 *   3. "At 11 PM, you only have to crave." (with optional Hinglish note)
 *   4. "We’ll do the worrying, the way your mother would."
 *   5. "A little magic in every kernel. A lot of care in every batch."
 * - Motion: starts desaturated cream-grey, warms to Cheddar Gold (#FFC21A) at beat 3
 * - Beat 5: Pouch rises with pop burst, 3 proof chips (no palm oil, small batch, sunflower oil),
 *   "Meet the flavours" link and "Coming soon" notice
 * - Reduced motion: static crowd with stacked copy beats
 */

const STORY_BEATS = [
  {
    step: 1,
    headline: 'Everyone’s hungry. Nobody’s reading the label.',
    subtext: 'Between deadlines, late shifts, and midnight binges, snacking has become automatic.',
  },
  {
    step: 2,
    headline: 'These days, most of us eat without asking what’s inside.',
    subtext: 'Hydrogenated palm fats, stale mass-market oils, and artificial colorings have quietly become the default.',
  },
  {
    step: 3,
    headline: 'At 11 PM, you only have to crave.',
    hinglish: 'Tum bas crave karo. Baaki hum sambhal lenge.',
    subtext: 'We founded 11 PM Snacks with a single rule: never compromise on the oils and spices we feed our own friends.',
  },
  {
    step: 4,
    headline: 'We’ll do the worrying, the way your mother would.',
    subtext: 'Popped exclusively in pure sunflower oil. No shortcuts, no palm oil, and prepared in small kettle runs in Gurugram.',
  },
  {
    step: 5,
    headline: 'A little magic in every kernel. A lot of care in every batch.',
    subtext: 'Whole grain corn tumbled warm in real Indian spices.',
  },
];

export function CanvasCrowd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking across the 300vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active beat based on scroll percentage (0 to 1 across 300vh)
  const [currentBeat, setCurrentBeat] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    return scrollYProgress.on('change', (v) => {
      if (v < 0.2) setCurrentBeat(0);
      else if (v < 0.4) setCurrentBeat(1);
      else if (v < 0.6) setCurrentBeat(2);
      else if (v < 0.8) setCurrentBeat(3);
      else setCurrentBeat(4);
    });
  }, [scrollYProgress, reducedMotion]);

  // Background color transitions:
  // Beats 1 & 2 (0 - 0.4): Desaturated cream-grey (#E5E1D8)
  // Beat 3 onwards (0.4 - 1.0): Warms to vibrant Cheddar Gold (#FFC21A)
  const bgStyle = currentBeat >= 2 ? '#FFC21A' : '#E5E1D8';

  // Reduced motion: static stacked copy beats with stationary background
  if (reducedMotion) {
    return (
      <section className="relative bg-[#FFF4DC] py-20 px-4 border-b-2 border-[#14102B]">
        <div className="w-[min(1080px,94vw)] mx-auto flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC]">
              The 11 PM Promise
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] mt-3">
              Why We Exist
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {STORY_BEATS.map((beat) => (
              <div
                key={beat.step}
                className="p-6 bg-white border-2 border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B]"
              >
                <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                  0{beat.step} / 05
                </span>
                <h3 className="text-xl sm:text-2xl font-display uppercase text-[#14102B] mt-1">
                  {beat.headline}
                </h3>
                {beat.hinglish && (
                  <p className="text-sm font-hindi font-bold text-[#FF4B1F] mt-1">
                    {beat.hinglish}
                  </p>
                )}
                <p className="text-sm text-[#14102B]/80 font-medium mt-2">
                  {beat.subtext}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t-2 border-[#14102B]/10">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#14102B]">
              🌻 100% Sunflower Oil
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#14102B]">
              🥣 Small Batch in Gurugram
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#14102B]">
              🚫 Zero Palm Oil
            </span>
          </div>
        </div>
      </section>
    );
  }

  const beat = STORY_BEATS[currentBeat];

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: bgStyle,
        transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative h-[300vh] text-[#14102B]"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Top Progress Strip */}
        <div className="w-[min(1240px,94vw)] mx-auto pt-6 flex items-center justify-between z-20">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
            The 11 PM Story · Beat 0{currentBeat + 1} of 05
          </span>
          <div className="flex items-center gap-1.5">
            {STORY_BEATS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentBeat === i ? 'w-6 bg-[#14102B]' : 'w-2 bg-[#14102B]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center Stage: Dynamic Copy Beat Over Walking Crowd */}
        <div className="relative w-[min(960px,92vw)] mx-auto my-auto z-20 text-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={beat.step}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-display uppercase tracking-wide text-[#14102B] leading-tight m-0 max-w-4xl drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                {beat.headline}
              </h3>

              {/* Optional Hinglish Tagline under Beat 3 */}
              {beat.hinglish && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="mt-3 px-4 py-1.5 rounded-full text-sm sm:text-base font-hindi font-bold bg-[#14102B] text-[#FFF4DC] shadow-[3px_3px_0px_#FF4B1F]"
                >
                  “{beat.hinglish}”
                </motion.p>
              )}

              <p className="mt-4 text-base sm:text-lg text-[#14102B]/85 font-medium max-w-xl mx-auto leading-relaxed">
                {beat.subtext}
              </p>

              {/* Beat 5 Climax: Pouch Rises + Popcorn Burst + Proof Chips */}
              {currentBeat === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="mt-6 flex flex-col items-center gap-4"
                >
                  {/* Popcorn Pop Particle Burst */}
                  <div className="relative">
                    <PopBurst density="heavy" />
                    <div className="relative w-44 sm:w-56 aspect-[3/2] rounded-2xl overflow-hidden border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-white">
                      <Image
                        src="/images/peri-peri.webp"
                        alt="11 PM Snacks signature masala popcorn pouch"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Three Verified Proof Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                      🌻 100% Sunflower Oil
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                      🥣 Small Batch in Gurugram
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                      🚫 Zero Palm Oil
                    </span>
                  </div>

                  {/* Final Action CTA */}
                  <div className="flex items-center gap-4 mt-2">
                    <Link
                      href="/flavours"
                      className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[3px_3px_0px_#FF4B1F] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#FF4B1F] transition-all"
                    >
                      Meet the Flavours →
                    </Link>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14102B]/75">
                      Batch 01 Coming Soon
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stage: Walking Crowd Canvas (Free Skiper #39 + Open Peeps Sprite Sheet) */}
        <div className="relative w-full h-[35vh] sm:h-[40vh] pointer-events-none z-10">
          <CrowdCanvas
            src="/images/peeps/all-peeps.png"
            rows={15}
            cols={7}
          />
        </div>
      </div>
    </section>
  );
}
