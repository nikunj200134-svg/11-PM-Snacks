'use client';

import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface StickerProps {
  variant?: 'gold' | 'peri' | 'tomato' | 'pink' | 'leaf' | 'cream' | 'midnight';
  tilt?: -4 | -3 | -2 | 0 | 2 | 3 | 4;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  isHoverable?: boolean;
  className?: string;
  children: ReactNode;
}

export function Sticker({
  variant = 'gold',
  tilt = 2,
  shadow = 'md',
  isHoverable = true,
  className = '',
  children,
}: StickerProps) {
  const reducedMotion = useReducedMotion();

  // Background and text adhering strictly to the contrast guard:
  // Text on Cheddar Gold (#FFC21A), Peri Fire (#FF4B1F), Leaf Green (#2EC27E), or Pop Pink (#FF7AB8)
  // is always Midnight Ink (#14102B)
  const variantStyles = {
    gold: 'bg-[#FFC21A] text-[#14102B]',
    peri: 'bg-[#FF4B1F] text-[#14102B]',
    tomato: 'bg-[#E5262F] text-white',
    pink: 'bg-[#FF7AB8] text-[#14102B]',
    leaf: 'bg-[#2EC27E] text-[#14102B]',
    cream: 'bg-[#FFF4DC] text-[#14102B]',
    midnight: 'bg-[#14102B] text-[#FFF4DC]',
  }[variant];

  const shadowStyles = {
    none: '',
    sm: 'shadow-[3px_3px_0px_#14102B]',
    md: 'shadow-[5px_5px_0px_#14102B]',
    lg: 'shadow-[8px_8px_0px_#14102B]',
  }[shadow];

  const tiltClass = reducedMotion
    ? ''
    : {
        [-4]: 'rotate-[-4deg]',
        [-3]: 'rotate-[-3deg]',
        [-2]: 'rotate-[-2deg]',
        0: 'rotate-0',
        2: 'rotate-[2deg]',
        3: 'rotate-[3deg]',
        4: 'rotate-[4deg]',
      }[tilt];

  const hoverClass =
    isHoverable && !reducedMotion
      ? 'hover:rotate-0 hover:scale-105 hover:shadow-[7px_7px_0px_#14102B] transition-transform duration-200'
      : '';

  return (
    <div
      className={`inline-flex items-center justify-center border-[2.5px] border-[#14102B] rounded-2xl px-3.5 py-1.5 font-bold select-none ${variantStyles} ${shadowStyles} ${tiltClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
