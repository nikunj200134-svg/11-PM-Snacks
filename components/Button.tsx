'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'peri' | 'tomato' | 'midnight' | 'cream' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'gold',
  size = 'md',
  href,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  // Size styles with minimum 44px tap target height on mobile (WCAG 2.5.5)
  const sizeStyles = {
    sm: 'min-h-[44px] px-4 py-2 text-xs gap-1.5',
    md: 'min-h-[44px] px-6 py-3 text-sm gap-2',
    lg: 'min-h-[48px] px-8 py-4 text-base gap-2.5',
  }[size];

  // Variant styles adhering to the contrast guard:
  // Text on Cheddar Gold (#FFC21A) or Peri Peri Fire (#FF4B1F) is always Midnight Ink (#14102B)
  const variantStyles = {
    gold: 'bg-[#FFC21A] text-[#14102B] hover:bg-[#ffd14d]',
    peri: 'bg-[#FF4B1F] text-[#14102B] hover:bg-[#ff6740]',
    tomato: 'bg-[#E5262F] text-white hover:bg-[#ef3b43]',
    midnight: 'bg-[#14102B] !text-[#FFF4DC] text-[#FFF4DC] hover:bg-[#231b47]',
    cream: 'bg-[#FFF4DC] text-[#14102B] hover:bg-[#ffffff]',
    outline: 'bg-transparent text-[#14102B] border-2 border-[#14102B]',
  }[variant];

  // Arcade button physics (Slot 9):
  // Pops on hover: translateY(-2px), shadow 8px 8px 0px #14102B
  // Squishes on press: translate(3px, 3px), shadow 3px 3px 0px #14102B
  const motionClasses = reducedMotion
    ? 'border-[2.5px] border-[#14102B] shadow-[4px_4px_0px_#14102B] active:opacity-90'
    : 'border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#14102B] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#14102B] transition-all duration-150';

  const baseClasses = `inline-flex items-center justify-center font-bold font-sans tracking-wide rounded-full select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none ${sizeStyles} ${variantStyles} ${motionClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
