'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface RotatingTextBadgeProps {
  text?: string;
  centerText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'peri' | 'cream' | 'midnight';
  className?: string;
}

export function RotatingTextBadge({
  text = 'SMALL-BATCH CRAFTED · ZERO PALM OIL · 11 PM SNACKS · ',
  centerText = '🍿',
  size = 'md',
  variant = 'gold',
  className = '',
}: RotatingTextBadgeProps) {
  const reducedMotion = useReducedMotion();

  const dimension = {
    sm: 96,
    md: 120,
    lg: 150,
  }[size];

  const variantStyles = {
    gold: 'bg-[#FFC21A] text-[#14102B]',
    peri: 'bg-[#FF4B1F] text-[#14102B]',
    cream: 'bg-[#FFF4DC] text-[#14102B]',
    midnight: 'bg-[#14102B] text-[#FFF4DC]',
  }[variant];

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`relative inline-flex items-center justify-center rounded-full border-[2.5px] border-[#14102B] shadow-[5px_5px_0px_#14102B] select-none ${variantStyles} ${className}`}
    >
      {/* Rotating SVG circular path */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${
          reducedMotion ? '' : 'animate-[spin_18s_linear_infinite]'
        }`}
      >
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[10px] font-mono font-bold tracking-widest uppercase fill-current">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Icon/Emblem */}
      <span
        style={{ fontSize: dimension * 0.28 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {centerText}
      </span>
    </div>
  );
}
