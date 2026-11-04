'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageCursorTrail } from '@/components/v1/skiper18';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Words Preloader Sequence
 * Integrated with Skiper18 ImageCursorTrail for an interactive cursor trail of custom popcorn images.
 * Paced at ~480ms per word with a 900ms hold on the final brand name, giving the user a few
 * seconds to interact and scatter crunch images while all homepage assets eagerly cache & decode.
 * 
 * Sequence words: Crave, Crunch, चटपटा, मसाला, Pop, 11 PM SNACKS (कुरकुरा removed).
 */
const SEQUENCE_WORDS = [
  { text: 'Crave', isHindi: false },
  { text: 'Crunch', isHindi: false },
  { text: 'चटपटा', isHindi: true },
  { text: 'मसाला', isHindi: true },
  { text: 'Pop', isHindi: false },
  { text: '11 PM SNACKS', isHindi: false },
];

const customImages = [
  '/images/peri-peri.webp',
  '/brand/three-pack-flatlay.webp',
  '/images/tangy-tomato.webp',
  '/brand/studio-model.webp',
  '/images/cheddar-cheese.webp',
  '/brand/tote-bag-model.webp',
  '/brand/siblings-sharing.webp',
  '/images/movie-night.webp',
];

export function WordsPreloader() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();
  const hasStartedRef = useRef(false);
  // Touch devices get no cursor trail (nothing to follow) and a shorter sequence
  const [isTouch, setIsTouch] = useState(false);

  const handleFinish = useCallback(() => {
    setIsDone(true);
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem('11pm_preloader_v5', 'true');
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  useEffect(() => {
    // 1. Check if already played in this browser session or user prefers reduced motion
    try {
      const isReplay = window.location.search.includes('replay');
      const hasLoaded = !isReplay && sessionStorage.getItem('11pm_preloader_v5');
      if (hasLoaded || reducedMotion) {
        setIsDone(true);
        return;
      }
    } catch {
      if (reducedMotion) {
        setIsDone(true);
        return;
      }
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // 2. Lock body scrolling while preloader plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);

    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (isDone || isExiting || reducedMotion) return;

    if (index < SEQUENCE_WORDS.length - 1) {
      // Step through words every 480 ms on desktop (time to play with the trail), 300 ms on touch
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, isTouch ? 300 : 480);
      return () => clearTimeout(timer);
    } else {
      // Hold final "11 PM SNACKS" for 900 ms to complete image cache, then wipe upward
      const holdTimer = setTimeout(() => {
        setIsExiting(true);
        // Morph + slide up duration is 650 ms
        const exitTimer = setTimeout(handleFinish, 650);
        return () => clearTimeout(exitTimer);
      }, isTouch ? 500 : 900);
      return () => clearTimeout(holdTimer);
    }
  }, [index, isDone, isExiting, reducedMotion, handleFinish, isTouch]);

  if (isDone || reducedMotion) return null;

  // SVG curved path calculations (Skiper8 / Dennis Snellenberg wipe)
  const w = windowDimensions.width || 1440;
  const h = windowDimensions.height || 900;
  
  // Initial state: curved bulge at bottom edge
  const initialCurvePath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 280} 0 ${h} Z`;
  // Flat state: morphs to flat as overlay slides upward
  const flatCurvePath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z`;

  const currentItem = SEQUENCE_WORDS[index];
  const progressPercent = Math.round(((index + 1) / SEQUENCE_WORDS.length) * 100);

  if (isDone) return null;

  const content = (
    <>
      {/* Central Word Display + Ticking Clock Indicator */}
      <div className="relative z-30 flex flex-col items-center justify-center gap-6 px-6 text-center pointer-events-none">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {/* Ticking Clock Icon */}
          <div
            aria-hidden="true"
            className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-[#FFC21A]"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="12" x2="12" y2="7" />
              {/* Ticking second hand */}
              <motion.line
                x1="12"
                y1="12"
                x2="16"
                y2="12"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                style={{ originX: '12px', originY: '12px' }}
                className="stroke-[#FF4B1F]"
              />
            </svg>
          </div>

          {/* Dynamic Word Transition */}
          <div className="min-w-[180px] sm:min-w-[280px] md:min-w-[420px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentItem.text}
                initial={isTouch ? { opacity: 0, scale: 0.6, rotate: -4 } : { opacity: 0, y: 15 }}
                animate={isTouch ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, y: 0 }}
                exit={isTouch ? { opacity: 0, scale: 1.15 } : { opacity: 0, y: -15 }}
                transition={
                  isTouch
                    ? { type: 'spring', stiffness: 520, damping: 18 }
                    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                }
                className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider text-[#FFC21A] ${
                  currentItem.isHindi ? 'font-bold font-hindi' : ''
                }`}
              >
                {currentItem.text}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Loading & Image Buffer Progress Bar */}
        <div className="flex flex-col items-center gap-2 w-full max-w-[260px] sm:max-w-xs mt-2">
          <div className="w-full h-1.5 bg-[#FFF4DC]/15 rounded-full overflow-hidden border border-[#FFF4DC]/20">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#FF4B1F] via-[#FFC21A] to-[#2EC27E] rounded-full"
            />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#FFF4DC]/50">
            Kettle Warming Up · {progressPercent}%
          </span>
        </div>
      </div>

      {/* Interactive hint & Subtitle Brand Stamp */}
      <div className="absolute bottom-8 z-30 text-center flex flex-col items-center gap-1.5 pointer-events-none">
        {!isTouch && (
          <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A]/15 text-[#FFC21A] border border-[#FFC21A]/30">
            ✨ Move your mouse to scatter crunch
          </span>
        )}
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FFF4DC]/40">
          Late-Night Cravings · All-Day Crunch
        </span>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          role="dialog"
          aria-label="11 PM Snacks Loading Introduction"
          aria-modal="true"
          initial={{ y: 0 }}
          animate={isExiting ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#14102B] text-[#FFF4DC] select-none pointer-events-auto overflow-hidden"
        >
          {isTouch ? (
            <div className="h-full w-full flex flex-col items-center justify-center">{content}</div>
          ) : (
            /* Skiper18 ImageCursorTrail: Image trail following the mouse (desktop only) */
            <ImageCursorTrail
              items={customImages}
              maxNumberOfImages={8}
              distance={20}
              imgClass="w-28 h-28 sm:w-36 sm:h-36"
              className="h-screen h-[100dvh] w-full flex flex-col items-center justify-center cursor-default"
            >
              {content}
            </ImageCursorTrail>
          )}

          {/* Morphing Curved SVG Wipe (Bottom Edge) */}
          {windowDimensions.width > 0 && (
            <svg
              className="absolute top-0 w-full pointer-events-none fill-[#14102B] z-10"
              style={{ height: 'calc(100% + 280px)' }}
            >
              <motion.path
                initial={{ d: initialCurvePath }}
                animate={{ d: isExiting ? flatCurvePath : initialCurvePath }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
