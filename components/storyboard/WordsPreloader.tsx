'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const WORDS = [
  'LATE NIGHT',
  'CRAVINGS',
  'SMALL BATCH',
  'SUNFLOWER POP',
  'GURUGRAM',
  '11 PM SNACKS',
];

export function WordsPreloader() {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if preloader has already played in this browser session
    const hasLoaded = sessionStorage.getItem('11pm_preloader_seen');
    if (hasLoaded || reducedMotion) {
      setIsDone(true);
      return;
    }

    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Cycle through words
    if (index < WORDS.length - 1) {
      const timeout = setTimeout(
        () => {
          setIndex((prev) => prev + 1);
        },
        index === 0 ? 400 : 220
      );
      return () => clearTimeout(timeout);
    } else {
      // Hold last word briefly, then initiate curve exit
      const exitTimeout = setTimeout(() => {
        setIsDone(true);
        sessionStorage.setItem('11pm_preloader_seen', 'true');
      }, 550);
      return () => clearTimeout(exitTimeout);
    }
  }, [index, reducedMotion]);

  if (isDone || reducedMotion) return null;

  // SVG curved path calculations (Dennis Snellenberg / Skiper8 style)
  const initialPath = `M0 0 L${windowDimensions.width} 0 L${windowDimensions.width} ${windowDimensions.height} Q${windowDimensions.width / 2} ${windowDimensions.height + 300} 0 ${windowDimensions.height}  L0 0`;
  const targetPath = `M0 0 L${windowDimensions.width} 0 L${windowDimensions.width} ${windowDimensions.height} Q${windowDimensions.width / 2} ${windowDimensions.height} 0 ${windowDimensions.height}  L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
  };

  const slideUpVariants = {
    initial: { top: 0 },
    exit: {
      top: '-100vh',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={slideUpVariants}
      initial="initial"
      exit="exit"
      animate="initial"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#14102B] text-[#FFF4DC] select-none pointer-events-auto overflow-hidden"
    >
      {/* Central Typography Animation */}
      <div className="relative z-20 flex items-center gap-3 px-6 text-center">
        <span className="w-3 h-3 rounded-full bg-[#FF4B1F] animate-pulse shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider text-[#FFC21A] m-0"
          >
            {WORDS[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Curved SVG Bottom Edge */}
      {windowDimensions.width > 0 && (
        <svg
          className="absolute top-0 w-full pointer-events-none fill-[#14102B]"
          style={{ height: 'calc(100% + 300px)' }}
        >
          <motion.path
            variants={curveVariants}
            initial="initial"
            exit="exit"
            animate="initial"
          />
        </svg>
      )}
    </motion.div>
  );
}
