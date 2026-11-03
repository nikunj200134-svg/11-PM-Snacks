'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationSeconds?: number;
  className?: string;
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  durationSeconds = 1.0,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (durationSeconds * 1000), 1);

      // Ease-out cubic calculation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, durationSeconds, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
