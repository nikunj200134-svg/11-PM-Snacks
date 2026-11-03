'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function BlobCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Smooth responsive spring for cursor follower
  const springConfig = { stiffness: 450, damping: 28 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only mount on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsDesktop(isFinePointer);

    if (!isFinePointer || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      if (e.clientX <= 5 && e.clientY <= 5) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('input') ||
        target?.closest('textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible, reducedMotion]);

  if (!isDesktop || reducedMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovered ? 1.75 : 1,
        backgroundColor: isHovered ? 'rgba(255, 194, 26, 0.45)' : 'rgba(20, 16, 43, 0.15)',
        borderColor: isHovered ? '#14102B' : 'rgba(20, 16, 43, 0.35)',
      }}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 w-7 h-7 rounded-full border-2 pointer-events-none z-[9999] backdrop-blur-[0.5px]"
    />
  );
}
