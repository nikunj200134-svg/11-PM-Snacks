'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Siena Parallax Scroll Section
 * 
 * - Pinned section for 180vh–200vh of smooth scroll
 * - Cinematic brand showcase expands smoothly from framed card to full-bleed stage
 * - Hardware-accelerated GPU transforms (scale & border-radius) replacing heavy clip-path
 * - Typography: Crisp, high-contrast, editorial layout that never overlaps
 * - Image: Cinematic 11 PM movie-night flavour trio with sunflower oil details
 * - Popcorn icon removed per user directive
 * - Reduced motion: Clean static framed card
 */
export function SienaParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Hardware-accelerated smooth card expansion (scale 0.84 to 1.0)
  const containerScale = useTransform(scrollYProgress, [0.08, 0.72], [0.85, 1.0]);
  const borderRadius = useTransform(scrollYProgress, [0.08, 0.68], [28, 0]);

  // 2. Parallax camera counter-scale on inner photo (1.18x down to 1.02x)
  const imageScale = useTransform(scrollYProgress, [0.08, 0.75], [1.18, 1.02]);

  // 3. Editorial Header: smooth parallax slide & fade as frame takes over
  const headlineY = useTransform(scrollYProgress, [0.05, 0.55], [0, -60]);
  const headlineOpacity = useTransform(scrollYProgress, [0.35, 0.62], [1, 0]);

  // 4. Cinematic reveal badge & text fading in once card reaches full bleed
  const revealOpacity = useTransform(scrollYProgress, [0.65, 0.88], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.65, 0.88], [32, 0]);

  // Reduced motion fallback: static clean framed section without scroll pin
  if (reducedMotion) {
    return (
      <section className="relative bg-[#14102B] text-[#FFF4DC] py-20 px-4 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-8">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              Crafted For Late Nights
            </span>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-wide text-[#FFF4DC] m-0">
              CRAVE <span className="text-[#FFC21A]">·</span> CRUNCH
            </h2>
          </div>

          <div className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden border-2 border-[#FFF4DC]/20 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/movie-night.webp"
              alt="11 PM Snacks trio on late-night table - Peri Peri, Tangy Tomato, and Cheese"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1100px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/90 via-[#14102B]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-left max-w-lg">
              <span className="text-xs font-mono font-bold text-[#FFC21A] uppercase tracking-wider block mb-1">
                100% Sunflower Oil · Small Batch Gurugram
              </span>
              <p className="text-2xl sm:text-3xl font-display uppercase text-white m-0 leading-tight">
                Big Flavour. Thoughtful Oil.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-[#14102B] text-[#FFF4DC]"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 bg-radial from-[#1A1435] via-[#120E26] to-[#0A0717] -z-10" />

        {/* Crisp Editorial Headline Layer (Centered, perfectly tracked, zero overlapping) */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="absolute top-20 sm:top-24 md:top-28 inset-x-0 z-30 flex flex-col items-center text-center px-4 pointer-events-none"
        >
          {/* Refined Pill Tag */}
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest bg-[#14102B]/90 text-[#FFC21A] border border-[#FFC21A]/50 backdrop-blur-md shadow-md mb-3">
            Late-Night Calling · Small-Batch Pop
          </span>

          {/* Premium Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-wider text-[#FFF4DC] drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)] m-0 leading-none">
            CRAVE <span className="text-[#FFC21A]">·</span> <span className="text-[#FF4B1F]">CRUNCH</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-body text-[#FFF4DC]/80 font-medium max-w-md tracking-wide">
            Popped exclusively in pure sunflower oil. No shortcuts, zero palm oil.
          </p>
        </motion.div>

        {/* Central Smoothly Scaling Brand Canvas Frame */}
        <motion.div
          style={{
            scale: containerScale,
            borderRadius,
          }}
          className="relative w-[min(94vw,1200px)] h-[62vh] sm:h-[72vh] lg:h-[78vh] flex items-center justify-center overflow-hidden z-10 border-2 border-[#FFF4DC]/25 shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
        >
          {/* Inner Counter-Scaling Brand Photo (Movie Night Trio with Warm Ambiance) */}
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/movie-night.webp"
              alt="11 PM Snacks trio on late-night table - Peri Peri, Tangy Tomato, and Cheese"
              fill
              priority
              className="object-cover filter contrast-[1.05] brightness-[0.94]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </motion.div>

          {/* Deep Cinematic Vignette for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/95 via-[#14102B]/30 to-transparent pointer-events-none" />

          {/* Cinematic Story Reveal at Full Bleed (Left Bottom) */}
          <motion.div
            style={{ opacity: revealOpacity, y: revealY }}
            className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-30 max-w-xl pointer-events-auto text-left"
          >
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-2.5">
              100% Sunflower Oil · Gurugram
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-display uppercase tracking-wider text-white m-0 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Big Flavour. Thoughtful Oil.
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[#FFF4DC]/90 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg">
              Most people snack without checking what is inside. With 11 PM, you only have to crave; we take care of the rest with whole grain corn and clean sunflower popping.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

