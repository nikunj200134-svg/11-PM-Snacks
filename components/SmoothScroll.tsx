'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable smooth scrolling on touch devices (@media (hover: none), (pointer: coarse), or max-width: 1023px)
    // so phones use native momentum scrolling without synthetic inertia or jumps.
    const isTouchDevice =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.innerWidth < 1024;
    if (isTouchDevice) return;

    // Turn off smooth scrolling under prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleChange = () => {
      if (mediaQuery.matches) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
