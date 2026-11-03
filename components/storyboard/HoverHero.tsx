'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent, type FlavourItem } from '@/content/site';

/**
 * Prompt 4: Home Hero (Hover Members Pattern)
 * 
 * - Default state: giant "11 PM SNACKS" on Midnight Ink (#14102B) with tagline
 * - Three tall pouch images slightly tilted and overlapping
 * - Hover pouch: lifts, scales to 1.06, background morphs to flavour colour,
 *   giant text rolls out and flavour name rolls in letter-by-letter (0.03s stagger)
 * - Custom cursor follower taking flavour colour with "View" label
 * - Click scrolls to flavour in product block
 * - Mobile: auto-cycles every 2.5s with progress dots, tap/swipe to select
 * - Reduced motion: static default state with flavour list
 */
export function HoverHero() {
  const flavours = siteContent.flavours;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: auto-cycle every 2.5 seconds (disabled under reduced motion)
  useEffect(() => {
    if (!isMobile || reducedMotion) return;

    const interval = setInterval(() => {
      setMobileActiveIdx((prev) => (prev + 1) % flavours.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isMobile, reducedMotion, flavours.length]);

  // Mouse movement tracking for cursor follower on desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [isMobile]);

  // Current active flavour (hover on desktop, active cycle on mobile)
  const activeIdx = isMobile ? mobileActiveIdx : hoveredIdx;
  const activeFlavour: FlavourItem | null = activeIdx !== null ? flavours[activeIdx] : null;

  // Background color morphing:
  // Default is deep Midnight Ink (#14102B). Hover morphs to rich flavour atmospheric tones.
  const bgColor = activeFlavour
    ? {
        peri: '#2E0E08',     // Deep roasted Peri Peri
        tomato: '#2C0A0D',   // Deep ripe sun-dried Tomato
        cheddar: '#291D04',  // Deep buttery Cheddar amber
      }[activeFlavour.tone]
    : '#14102B';

  const glowAccent = activeFlavour ? activeFlavour.accentColor : '#FFC21A';

  // Letters of the headline for letter-by-letter stagger reveal
  const headlineLetters = activeFlavour
    ? activeFlavour.name.toUpperCase().split('')
    : '11 PM SNACKS'.split('');

  // Scroll to flavour in product block
  const handlePouchClick = (flavourId: string) => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-12 pb-16 overflow-hidden select-none border-b-2 border-[#14102B]"
    >
      {/* Dynamic Ambient Glow Behind Stage */}
      <div
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowAccent}26 0%, transparent 68%)`,
          transition: 'background 0.5s ease-out',
        }}
        className="absolute inset-0 pointer-events-none -z-10 blur-3xl"
      />

      {/* 1. Header Pill & Tagline Area */}
      <div className="w-[min(1240px,94vw)] mx-auto text-center z-10 pt-2 sm:pt-4">
        <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#FFF4DC]/70 m-0">
          Your Cravings. Our Calling.
        </p>

        {/* Coming soon notice badge */}
        <div className="inline-flex items-center gap-2.5 mt-2 px-4 py-1.5 rounded-full bg-[#14102B] border-2 border-[#FFC21A]/60 shadow-[3px_3px_0px_#14102B]">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B]">
            Batch 01
          </span>
          <span className="text-xs font-mono font-bold text-[#FFF4DC]">
            Dropping Soon from Gurugram
          </span>
        </div>
      </div>

      {/* 2. Center Stage: Giant Staggered Headline + Overlapping Pouches */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center py-4 sm:py-6">
        {/* Dynamic Headline (Bagel Fat One, fluidly scaled so even long names fit on single line without clipping) */}
        <div className="w-full max-w-6xl mx-auto text-center overflow-hidden px-4 pointer-events-none min-h-[3.5rem] sm:min-h-[5rem] lg:min-h-[7rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeFlavour ? activeFlavour.name : 'DEFAULT'}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.03 } },
                exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
              className="text-[clamp(1.35rem,5.2vw,5.5rem)] font-display uppercase tracking-wide text-[#FFF4DC] leading-none m-0 whitespace-nowrap drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              {headlineLetters.map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: 40, opacity: 0 },
                    animate: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: {
                      y: -40,
                      opacity: 0,
                      transition: { duration: 0.22, ease: [0.76, 0, 0.24, 1] },
                    },
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Aligned, Square Pouch Row with Curves, Clean Spacing & Zero Collision */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 lg:mt-8 z-20 px-2 sm:px-4">
          {flavours.map((flavour, idx) => {
            const isHovered = hoveredIdx === idx;
            const isMobileActive = isMobile && mobileActiveIdx === idx;
            const isHighlighted = isHovered || isMobileActive;
            const isOtherHighlighted = (hoveredIdx !== null || isMobile) && !isHighlighted;

            return (
              <div
                key={flavour.id}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setHoveredIdx(idx);
                    setCursorActive(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredIdx(null);
                    setCursorActive(false);
                  }
                }}
                onClick={() => handlePouchClick(flavour.id)}
                className="relative flex flex-col items-center cursor-pointer"
              >
                {/* Flavour Subtitle Tag */}
                <div
                  className={`transition-all duration-300 mb-2 sm:mb-3 ${
                    isHighlighted ? 'opacity-100 -translate-y-1' : 'opacity-0 sm:opacity-75'
                  }`}
                >
                  <span
                    style={{ backgroundColor: flavour.accentColor }}
                    className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] border sm:border-2 border-[#14102B] shadow-[1.5px_1.5px_0px_#14102B]"
                  >
                    {flavour.subtitle}
                  </span>
                </div>

                {/* Square Card with Curved Corners, Alignment, and Smooth Hover Lift */}
                <motion.div
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          scale: isHighlighted ? 1.05 : isOtherHighlighted ? 0.95 : 1,
                          y: isHighlighted ? -12 : 0,
                          opacity: isOtherHighlighted ? 0.75 : 1,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                  }}
                  className={`relative w-[28vw] max-w-[108px] sm:max-w-none sm:w-48 md:w-56 lg:w-64 xl:w-72 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-[3px] transition-colors duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.45)] bg-[#14102B] ${
                    isHighlighted ? 'border-[#FFC21A] ring-2 ring-[#FFC21A]/30' : 'border-[#FFF4DC]/35'
                  }`}
                >
                  <Image
                    src={flavour.pouch}
                    alt={`${flavour.name} Masala Popcorn Pouch`}
                    fill
                    sizes="(max-width: 640px) 30vw, (max-width: 1024px) 220px, 288px"
                    priority
                    className="object-cover"
                  />
                </motion.div>

                {/* Flavour Label Below */}
                <span className="mt-2.5 sm:mt-3 text-[11px] sm:text-sm md:text-base font-display uppercase tracking-wider text-[#FFF4DC] font-bold text-center">
                  {flavour.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 3 Key Proof Chips: Good Source of Plant Protein, Fibre Rich · Good for Gut, Naturally Gluten-Free */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mt-5 sm:mt-7 z-20 px-3">
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-[#14102B]/90 text-[#2EC27E] border border-[#2EC27E]/50 backdrop-blur-md shadow-sm">
            <span aria-hidden="true">💪</span> Good Source of Plant Protein
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-[#14102B]/90 text-[#FFC21A] border border-[#FFC21A]/50 backdrop-blur-md shadow-sm">
            <span aria-hidden="true">🌾</span> Fibre Rich · Good for Gut
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-[#14102B]/90 text-[#FFF4DC] border border-[#FFF4DC]/40 backdrop-blur-md shadow-sm">
            <span aria-hidden="true">🛡️</span> Naturally Gluten-Free
          </span>
        </div>

        {/* Mobile Progress Dots (Auto-cycle indicator, >= 44px tap target) */}
        {isMobile && !reducedMotion && (
          <div className="flex items-center justify-center gap-1 mt-6 z-20">
            {flavours.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setMobileActiveIdx(i)}
                aria-label={`Select ${f.name}`}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block transition-all duration-300 rounded-full h-2.5 ${
                    mobileActiveIdx === i ? 'w-7 bg-[#FFC21A]' : 'w-2.5 bg-[#FFF4DC]/40'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Reduced Motion Static Fallback List */}
        {reducedMotion && (
          <div className="flex items-center justify-center gap-4 mt-6 z-20 text-xs font-mono font-bold text-[#FFC21A]">
            {flavours.map((f) => (
              <span key={f.id} className="underline">
                {f.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bottom Brand Footnote */}
      <div className="w-[min(1240px,94vw)] mx-auto text-center z-10">
        <p className="text-xs sm:text-sm font-medium text-[#FFF4DC]/70 max-w-lg mx-auto m-0">
          Small-batch masala popcorn popped in clean sunflower oil. Handcrafted in Gurugram with zero palm oil.
        </p>
      </div>

      {/* 4. Desktop Custom Cursor Follower ("View") */}
      {!isMobile && !reducedMotion && (
        <motion.div
          animate={{
            x: mousePos.x - 36,
            y: mousePos.y - 36,
            scale: cursorActive ? 1 : 0,
            opacity: cursorActive ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 28,
            mass: 0.2,
          }}
          style={{
            backgroundColor: activeFlavour ? activeFlavour.accentColor : '#FFC21A',
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9999] w-[72px] h-[72px] rounded-full flex items-center justify-center border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B]"
        >
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#14102B]">
            View
          </span>
        </motion.div>
      )}
    </section>
  );
}
