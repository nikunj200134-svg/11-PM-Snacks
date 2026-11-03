'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';
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

const BEAT_THEMES = [
  {
    bg: '#FFF4DC', // Beat 1: Warm Buttercream
    tag: 'Chapter 01 · Midnight Crave',
    pill: 'bg-[#FF4B1F] text-white',
  },
  {
    bg: '#D8A2A2', // Beat 2: Dusty Rose / Soft Mauve
    tag: 'Chapter 02 · Unspoken Ingredients',
    pill: 'bg-[#14102B] text-white',
  },
  {
    bg: '#FFC21A', // Beat 3: Cheddar Gold
    tag: 'Chapter 03 · Crave Without Guilt',
    pill: 'bg-[#FF4B1F] text-white',
  },
  {
    bg: '#96D0D2', // Beat 4: Fresh Gurugram Kitchen Mint
    tag: 'Chapter 04 · Motherly Care & Clean Oil',
    pill: 'bg-[#14102B] text-white',
  },
  {
    bg: '#FDA5CC', // Beat 5: Warm Popcorn Rose
    tag: 'Chapter 05 · A Little Magic In Every Kernel',
    pill: 'bg-[#FF4B1F] text-white',
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

  // Distinct, smooth background color transitions for EVERY scroll beat
  const bgStyle = BEAT_THEMES[currentBeat]?.bg || '#FFF4DC';

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
        transition: 'background-color 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative h-[300vh] text-[#14102B]"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-[100dvh] min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-2">
        {/* Top Progress Strip */}
        <div className="w-[min(1240px,94vw)] mx-auto px-4 flex items-center justify-between z-20 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
            The 11 PM Story · Chapter 0{currentBeat + 1} of 05
          </span>
          <div className="flex items-center gap-1.5">
            {STORY_BEATS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 border border-[#14102B] ${
                  currentBeat === i ? 'w-6 bg-[#14102B]' : 'w-2 bg-[#14102B]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center Stage: Framed White Story Card (100% Readable on Mobile & Desktop) */}
        <div className="relative w-[min(920px,92vw)] mx-auto flex-1 flex flex-col justify-center items-center z-20 text-center px-2 py-3 my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={beat.step}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-white/95 backdrop-blur-md border-[3px] border-[#14102B] rounded-[24px] sm:rounded-[36px] p-5 sm:p-8 md:p-10 shadow-[6px_6px_0px_#14102B] sm:shadow-[8px_8px_0px_#14102B] flex flex-col items-center max-w-2xl mx-auto"
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider ${BEAT_THEMES[currentBeat].pill} shadow-[2px_2px_0px_#14102B]`}>
                  {BEAT_THEMES[currentBeat].tag}
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-wide text-[#14102B] leading-[1.12] m-0">
                {beat.headline}
              </h3>

              {/* Hinglish Tagline under Beat 3 */}
              {beat.hinglish && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12 }}
                  className="mt-2.5 sm:mt-3 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-hindi font-bold bg-[#FF4B1F] text-white border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]"
                >
                  “{beat.hinglish}”
                </motion.div>
              )}

              {/* Subtext */}
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-base md:text-lg text-[#14102B]/85 font-medium max-w-lg mx-auto leading-relaxed">
                {beat.subtext}
              </p>

              {/* Stepper Dots (>= 44px tap target for seamless mobile and desktop transitions) */}
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1 sm:gap-2 pt-3 border-t-2 border-[#14102B]/10 w-full">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#14102B]/60 mr-1 sm:mr-2 uppercase tracking-wider">
                  Scroll or Tap:
                </span>
                {STORY_BEATS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (containerRef.current) {
                        const top = containerRef.current.offsetTop;
                        const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
                        window.scrollTo({
                          top: top + (i / (STORY_BEATS.length - 1)) * totalHeight,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    aria-label={`Jump to story chapter ${i + 1}`}
                    className="min-h-[44px] min-w-[32px] sm:min-w-[44px] flex items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all duration-300 border border-[#14102B] ${
                        currentBeat === i
                          ? 'w-7 bg-[#14102B] shadow-[1px_1px_0px_#14102B]'
                          : 'w-2.5 bg-[#14102B]/20 hover:bg-[#14102B]/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stage: Walking Crowd Canvas (Free Skiper #39 + Open Peeps Sprite Sheet) */}
        <div className="relative w-full h-[18vh] sm:h-[22vh] md:h-[26vh] max-h-[170px] pointer-events-none z-10 overflow-hidden shrink-0">
          <CrowdCanvas
            src="/images/peeps/all-peeps - Copy.png"
            rows={15}
            cols={7}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
