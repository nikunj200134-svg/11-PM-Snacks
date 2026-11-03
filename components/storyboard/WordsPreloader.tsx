'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Words Preloader Sequence
 * 250–300 ms each, holding 400 ms on final brand name.
 * Hindi words (Baloo 2): कुरकुरा (Crispy/Crunchy), चटपटा (Tangy/Spicy), मसाला (Spiced/Masala).
 */
const SEQUENCE_WORDS = [
  { text: 'Crave', isHindi: false },
  { text: 'Crunch', isHindi: false },
  { text: 'कुरकुरा', isHindi: true },
  { text: 'चटपटा', isHindi: true },
  { text: 'मसाला', isHindi: true },
  { text: 'Pop', isHindi: false },
  { text: '11 PM SNACKS', isHindi: false },
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
      sessionStorage.setItem('11pm_preloader_v3', 'true');
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
      const hasLoaded = !isReplay && sessionStorage.getItem('11pm_preloader_v3');
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

    // 3. Preload hero pouch images ahead of reveal
    const heroAssets = [
      '/images/peri-peri.webp',
      '/images/tangy-tomato.webp',
      '/images/cheddar-cheese.webp',
      '/images/cascade.webp',
    ];
    heroAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
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
      // Step through words every 270 ms
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 270);
      return () => clearTimeout(timer);
    } else {
      // Hold final "11 PM SNACKS" for 400 ms, then trigger curved exit wipe
      const holdTimer = setTimeout(() => {
        setIsExiting(true);
        // Morph + slide up duration is 650 ms
        const exitTimer = setTimeout(handleFinish, 650);
        return () => clearTimeout(exitTimer);
      }, 400);
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
          <div className="relative z-20 flex items-center justify-center gap-3 sm:gap-4 px-6 text-center">
            {/* Ticking Clock Icon */}
            <div
              aria-hidden="true"
              className="relative w-7 h-7 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center"
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
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider text-[#FFC21A] ${
                    currentItem.isHindi ? 'font-bold font-hindi' : ''
                  }`}
                >
                  {currentItem.text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle Brand Stamp */}
          <div className="absolute bottom-12 z-20 text-center">
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
