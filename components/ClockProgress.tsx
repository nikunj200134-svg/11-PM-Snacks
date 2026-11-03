'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ClockProgress() {
  const reducedMotion = useReducedMotion();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth rotation spring
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  // Map 0 to 1 scroll progress into 360 degrees rotation
  const clockHandRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of 11 PM Snacks"
      title="Crunch o'clock - Click to jump to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#FFF4DC] border-[2.5px] border-[#14102B] shadow-[4px_4px_0px_#14102B] hover:shadow-[6px_6px_0px_#14102B] hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#14102B] transition-all flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Clock Face SVG */}
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        {/* Clock Dial Rim */}
        <circle cx="16" cy="16" r="14" stroke="#14102B" strokeWidth="2" fill="#FFFDF7" />

        {/* 12, 3, 6, 9 Hour Dots */}
        <circle cx="16" cy="5" r="1" fill="#14102B" />
        <circle cx="27" cy="16" r="1" fill="#14102B" />
        <circle cx="16" cy="27" r="1" fill="#14102B" />
        <circle cx="5" cy="16" r="1" fill="#14102B" />

        {/* Center Pivot Point */}
        <circle cx="16" cy="16" r="1.5" fill="#FF4B1F" />

        {/* Rotating Clock Hand */}
        {!reducedMotion ? (
          <motion.line
            x1="16"
            y1="16"
            x2="16"
            y2="7"
            stroke="#14102B"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              originX: '16px',
              originY: '16px',
              rotate: clockHandRotation,
            }}
          />
        ) : (
          <line
            x1="16"
            y1="16"
            x2="16"
            y2="7"
            stroke="#14102B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
      {/* 11 PM Text Indicator Pill on Hover */}
      <span className="absolute -top-7 right-0 text-[10px] font-mono font-bold bg-[#14102B] text-[#FFF4DC] px-2 py-0.5 rounded-md border border-[#14102B] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        11 PM ↑
      </span>
    </button>
  );
}
