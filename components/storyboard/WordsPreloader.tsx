'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Words Preloader Sequence
 * Paced at ~450ms per word and holding ~850ms on final brand name
 * to allow all critical homepage imagery, fonts, and assets to eagerly cache & decode.
 * Hindi words (Baloo 2): चटपटा (Tangy/Zesty), मसाला (Spiced/Masala).
 * Note: 'कुरकुरा' has been deliberately removed.
 */
const SEQUENCE_WORDS = [
  { text: 'Crave', isHindi: false },
  { text: 'Crunch', isHindi: false },
  { text: 'चटपटा', isHindi: true },
  { text: 'मसाला', isHindi: true },
  { text: 'Pop', isHindi: false },
  { text: '11 PM SNACKS', isHindi: false },
];

const CRITICAL_HOMEPAGE_ASSETS = [
  '/brand/logo-official.png',
  '/images/peri-peri.webp',
  '/images/tangy-tomato.webp',
  '/images/cheddar-cheese.webp',
  '/images/movie-night.webp',
  '/brand/three-pack-flatlay.png',
  '/brand/studio-model.png',
  '/brand/tote-bag-model.png',
  '/brand/siblings-sharing.png',
  '/images/peeps/all-peeps - Copy.png',
];

export function WordsPreloader() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();
  const hasStartedRef = useRef(false);

  const handleFinish = useCallback(() => {
    setIsDone(true);
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem('11pm_preloader_v4', 'true');
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(handleFinish, 400);
  }, [handleFinish]);

  useEffect(() => {
    // 1. Check if already played in this browser session or user prefers reduced motion
    try {
      const isReplay = window.location.search.includes('replay');
      const hasLoaded = !isReplay && sessionStorage.getItem('11pm_preloader_v4');
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

    // 3. Eagerly preload and decode all critical homepage images while preloader is active
    CRITICAL_HOMEPAGE_ASSETS.forEach((src) => {
      if (typeof window !== 'undefined') {
        const img = new Image();
        img.src = src;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });

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
      // Step through words every 450 ms (generous buffer for image loading)
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      // Hold final "11 PM SNACKS" for 850 ms to ensure full image cache completion, then wipe
      const holdTimer = setTimeout(() => {
        setIsExiting(true);
        // Morph + slide up duration is 650 ms
        const exitTimer = setTimeout(handleFinish, 650);
        return () => clearTimeout(exitTimer);
      }, 850);
      return () => clearTimeout(holdTimer);
    }
  }, [index, isDone, isExiting, reducedMotion, handleFinish]);

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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#14102B] text-[#FFF4DC] select-none pointer-events-auto overflow-hidden"
        >
          {/* Accessible Skip Button (Tab + Enter, >= 44px tap target) */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 z-30 min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#FFF4DC] border border-[#FFF4DC]/30 bg-white/10 hover:border-[#FFC21A] hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFC21A] transition-colors cursor-pointer"
          >
            Skip ↵
          </button>

          {/* Central Word Display + Ticking Clock Indicator */}
          <div className="relative z-20 flex flex-col items-center justify-center gap-6 px-6 text-center">
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Subtitle Brand Stamp */}
          <div className="absolute bottom-10 z-20 text-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FFF4DC]/40">
              Late-Night Cravings · All-Day Crunch
            </span>
          </div>

          {/* Morphing Curved SVG Wipe (Bottom Edge) */}
          {windowDimensions.width > 0 && (
            <svg
              className="absolute top-0 w-full pointer-events-none fill-[#14102B]"
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
