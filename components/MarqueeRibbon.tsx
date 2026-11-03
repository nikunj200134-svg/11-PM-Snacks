'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface MarqueeRibbonProps {
  items: string[];
  direction?: 'left' | 'right';
  tilt?: -2 | -1 | 0 | 1 | 2;
  variant?: 'gold' | 'midnight' | 'peri' | 'cream';
  speedSeconds?: number;
  className?: string;
}

export function MarqueeRibbon({
  items,
  direction = 'left',
  tilt = -2,
  variant = 'gold',
  speedSeconds = 22,
  className = '',
}: MarqueeRibbonProps) {
  const reducedMotion = useReducedMotion();
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause marquee animation when off-screen to free CPU/GPU during mobile scrolling
  useEffect(() => {
    if (!ribbonRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(ribbonRef.current);
    return () => observer.disconnect();
  }, []);

  const variantStyles = {
    gold: 'bg-[#FFC21A] text-[#14102B] border-y-[2.5px] border-[#14102B]',
    midnight: 'bg-[#14102B] text-[#FFF4DC] border-y-[2.5px] border-[#14102B]',
    peri: 'bg-[#FF4B1F] text-[#14102B] border-y-[2.5px] border-[#14102B]',
    cream: 'bg-[#FFF4DC] text-[#14102B] border-y-[2.5px] border-[#14102B]',
  }[variant];

  const tiltStyles = {
    [-2]: '-rotate-2',
    [-1]: '-rotate-1',
    0: 'rotate-0',
    1: 'rotate-1',
    2: 'rotate-2',
  }[tilt];

  const animationClass =
    direction === 'left'
      ? 'animate-[marquee_22s_linear_infinite]'
      : 'animate-[marquee-reverse_22s_linear_infinite]';

  return (
    <div
      ref={ribbonRef}
      role="region"
      aria-label="Scrolling Text Ribbon"
      className={`relative w-full overflow-hidden py-3.5 select-none ${tiltStyles} ${variantStyles} ${className}`}
    >
      {reducedMotion ? (
        // Accessible static wrapped fallback
        <div className="flex flex-wrap justify-center gap-6 px-4 font-mono font-bold text-sm tracking-widest uppercase">
          {items.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3">
              <span>{item}</span>
              <span aria-hidden="true">★</span>
            </span>
          ))}
        </div>
      ) : (
        <div className="group flex whitespace-nowrap overflow-hidden">
          <div
            style={{
              animationDuration: `${speedSeconds}s`,
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
            className={`flex shrink-0 items-center gap-8 ${animationClass} group-hover:[animation-play-state:paused] pr-8`}
          >
            {items.map((item, idx) => (
              <span
                key={`track1-${idx}`}
                className="inline-flex items-center gap-4 font-mono font-bold text-xs md:text-sm tracking-widest uppercase"
              >
                <span>{item}</span>
                <span className="opacity-80" aria-hidden="true">
                  ★
                </span>
              </span>
            ))}
          </div>
          <div
            style={{
              animationDuration: `${speedSeconds}s`,
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
            className={`flex shrink-0 items-center gap-8 ${animationClass} group-hover:[animation-play-state:paused] pr-8`}
            aria-hidden="true"
          >
            {items.map((item, idx) => (
              <span
                key={`track2-${idx}`}
                className="inline-flex items-center gap-4 font-mono font-bold text-xs md:text-sm tracking-widest uppercase"
              >
                <span>{item}</span>
                <span className="opacity-80">★</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
