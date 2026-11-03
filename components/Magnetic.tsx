'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // Spring physics conforming to spec: stiffness ~300, damping ~20
  const springConfig = { stiffness: 300, damping: 20 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const checkPointer = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isDesktop || reducedMotion) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion || !isDesktop) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
