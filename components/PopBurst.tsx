'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  scale: number;
  icon: string;
}

export interface PopBurstProps {
  density?: 'low' | 'medium' | 'high';
  className?: string;
  triggerOnMount?: boolean;
}

export function PopBurst({
  density = 'medium',
  className = '',
  triggerOnMount = false,
}: PopBurstProps) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  const icons = ['🍿', '✨', '🌶️', '🌽', '🧀', '💥'];

  const trigger = useCallback(() => {
    if (reducedMotion) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Spec: 12-20 particles on desktop, halved on mobile (6-10)
    const count = isMobile ? 8 : 16;

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i / count) * 360 + (Math.random() * 30 - 15),
      distance: Math.random() * 70 + 40, // 40px to 110px
      scale: Math.random() * 0.5 + 0.8,
      icon: icons[i % icons.length],
    }));

    setParticles(newParticles);

    // 600 ms lifetime per spec
    const timer = setTimeout(() => {
      setParticles([]);
    }, 600);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (triggerOnMount) {
      trigger();
    }
  }, [triggerOnMount, trigger]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * p.distance;
          const targetY = Math.sin(rad) * p.distance;

          return (
            <motion.span
              key={p.id}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0.3,
                opacity: 1,
              }}
              animate={{
                x: `calc(50% + ${targetX}px)`,
                y: `calc(50% + ${targetY}px)`,
                scale: [0.3, p.scale, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // easeOut
              }}
              className="absolute text-lg sm:text-xl transform -translate-x-1/2 -translate-y-1/2"
            >
              {p.icon}
            </motion.span>
          );
        })}
      </AnimatePresence>

      {/* Ambient floating backdrop icons */}
      <span className="absolute top-[12%] left-[10%] text-xl opacity-60 animate-[float_4.5s_ease-in-out_infinite]">
        🍿
      </span>
      <span className="absolute top-[20%] right-[12%] text-lg opacity-50 animate-[float_5s_ease-in-out_infinite_0.5s]">
        ✨
      </span>
      <span className="absolute bottom-[20%] left-[8%] text-lg opacity-50 animate-[float_4s_ease-in-out_infinite_1s]">
        🌶️
      </span>
      <span className="absolute bottom-[16%] right-[14%] text-xl opacity-60 animate-[float_5.5s_ease-in-out_infinite_1.5s]">
        🌽
      </span>
    </div>
  );
}

/**
 * Interactive Buy-button burst wrapper:
 * Triggers particle burst on hover (desktop) and on tap/touch (mobile).
 */
export function BurstButtonWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  const icons = ['🍿', '✨', '💥', '🧀', '🌶️'];

  const fireBurst = () => {
    if (reducedMotion) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 8 : 16;

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i / count) * 360 + (Math.random() * 20 - 10),
      distance: Math.random() * 60 + 35,
      scale: Math.random() * 0.4 + 0.8,
      icon: icons[i % icons.length],
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
  };

  return (
    <div
      onMouseEnter={fireBurst}
      onTouchStart={fireBurst}
      className={`relative inline-block ${className}`}
    >
      {children}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-visible"
      >
        <AnimatePresence>
          {particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.distance;
            const targetY = Math.sin(rad) * p.distance;

            return (
              <motion.span
                key={p.id}
                initial={{
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 0.2,
                  opacity: 1,
                }}
                animate={{
                  x: `calc(-50% + ${targetX}px)`,
                  y: `calc(-50% + ${targetY}px)`,
                  scale: [0.2, p.scale, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute text-base sm:text-lg z-50 pointer-events-none"
              >
                {p.icon}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
