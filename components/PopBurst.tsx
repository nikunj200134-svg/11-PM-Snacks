'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface PopBurstProps {
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

export function PopBurst({ density = 'medium', className = '' }: PopBurstProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  const count = {
    low: 4,
    medium: 7,
    high: 11,
  }[density];

  // Particle positions, delays, and icons
  const particles = [
    { icon: '🍿', top: '10%', left: '15%', delay: '0s', dur: '4s' },
    { icon: '✨', top: '18%', right: '12%', delay: '1s', dur: '5s' },
    { icon: '🌶️', bottom: '20%', left: '8%', delay: '0.5s', dur: '4.5s' },
    { icon: '🌽', bottom: '15%', right: '14%', delay: '1.5s', dur: '5.5s' },
    { icon: '🧀', top: '45%', left: '4%', delay: '2s', dur: '4.2s' },
    { icon: '💥', top: '55%', right: '6%', delay: '0.8s', dur: '4.8s' },
    { icon: '✨', bottom: '35%', left: '18%', delay: '1.2s', dur: '3.8s' },
    { icon: '🍿', top: '25%', right: '22%', delay: '2.2s', dur: '5.2s' },
    { icon: '🌶️', top: '75%', right: '18%', delay: '1.7s', dur: '4.4s' },
    { icon: '✨', top: '5%', left: '42%', delay: '0.3s', dur: '4.9s' },
    { icon: '🌽', bottom: '8%', left: '48%', delay: '2.5s', dur: '5.1s' },
  ].slice(0, count);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
          className="absolute text-xl sm:text-2xl filter drop-shadow-[0_2px_4px_rgba(20,16,43,0.15)] animate-[float_4s_ease-in-out_infinite]"
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}
