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

        {/* Coming soon notice with Notify me link */}
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-[#14102B]/60 border border-[#FFF4DC]/20">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFC21A] text-[#14102B]">
            Coming soon
          </span>
          <a
            href="#notify"
            className="text-[11px] font-mono font-bold text-[#FFC21A] hover:text-[#FFF4DC] underline underline-offset-4 transition-colors"
          >
            Notify me →
          </a>
        </div>
      </div>

      {/* 2. Center Stage: Giant Staggered Headline + Overlapping Pouches */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center py-4 sm:py-8">
        {/* Giant Dynamic Headline (Bagel Fat One, ~12vw) */}
        <div className="w-full text-center overflow-hidden px-4 pointer-events-none min-h-[5rem] sm:min-h-[9rem] lg:min-h-[12rem] flex items-center justify-center">
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
              className="text-[clamp(2.6rem,11.5vw,10.5rem)] font-display uppercase tracking-widest text-[#FFF4DC] leading-none m-0 whitespace-nowrap drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
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

        {/* Overlapping, Tilted Pouch Row */}
        <div className="relative w-[min(1080px,94vw)] mx-auto flex items-end justify-center -mt-6 sm:-mt-12 lg:-mt-16 z-20">
          {flavours.map((flavour, idx) => {
            const isHovered = hoveredIdx === idx;
            const isMobileActive = isMobile && mobileActiveIdx === idx;
            const isHighlighted = isHovered || isMobileActive;
            const isOtherHighlighted = (hoveredIdx !== null || isMobile) && !isHighlighted;

            // Default tilts and overlap positions:
            // Left (Peri Peri) tilts left (-4deg), Center (Tomato) straight (+1deg), Right (Cheese) tilts right (+5deg)
            const defaultRotation = idx === 0 ? -4 : idx === 1 ? 1 : 5;
            const defaultOverlap = idx === 0 ? 'translate-x-3 sm:translate-x-8' : idx === 2 ? '-translate-x-3 sm:-translate-x-8' : 'z-30';

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
                className={`relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${defaultOverlap} ${
                  isHighlighted ? 'z-40' : idx === 1 ? 'z-20' : 'z-10'
                }`}
              >
                {/* Flavour Subtitle Tag */}
                <div
                  className={`transition-all duration-300 mb-2 sm:mb-4 ${
                    isHighlighted ? 'opacity-100 -translate-y-2' : 'opacity-0 sm:opacity-75'
                  }`}
                >
                  <span
                    style={{ backgroundColor: flavour.accentColor }}
                    className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]"
                  >
                    {flavour.subtitle}
                  </span>
                </div>

                {/* Pouch Mockup with Spring Lift & Scale to 1.06 */}
                <motion.div
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          scale: isHighlighted ? 1.06 : isOtherHighlighted ? 0.94 : 1,
                          y: isHighlighted ? -24 : 0,
                          rotate: isHighlighted ? 0 : defaultRotation,
                          opacity: isOtherHighlighted ? 0.7 : 1,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="relative w-36 sm:w-60 md:w-72 lg:w-80 aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden border-[2.5px] border-[#FFF4DC]/40 shadow-[0_16px_36px_rgba(0,0,0,0.5)] bg-[#14102B]"
                >
                  <Image
                    src={flavour.pouch}
                    alt={`${flavour.name} Masala Popcorn Pouch`}
                    fill
                    sizes="(max-width: 640px) 33vw, 320px"
                    priority
                    className="object-cover"
                  />
                </motion.div>

                {/* Flavour Label Below */}
                <span className="mt-3 text-xs sm:text-sm md:text-base font-display uppercase tracking-wider text-[#FFF4DC] font-bold">
                  {flavour.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Dots (Auto-cycle indicator) */}
        {isMobile && !reducedMotion && (
          <div className="flex items-center justify-center gap-2 mt-6 z-20">
            {flavours.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setMobileActiveIdx(i)}
                aria-label={`Select ${f.name}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  mobileActiveIdx === i ? 'w-6 bg-[#FFC21A]' : 'w-2 bg-[#FFF4DC]/40'
                }`}
              />
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
