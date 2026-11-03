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
      className="relative h-[200vh] bg-[#FDA5CC] text-[#14102B] border-b-2 border-[#14102B]"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-6 sm:pb-8">
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 bg-radial from-[#FFB8D9] via-[#FDA5CC] to-[#F792BF] -z-10" />

        {/* Crisp Editorial Headline Layer (Positioned cleanly below the fixed header) */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-30 flex flex-col items-center text-center px-4 shrink-0 pointer-events-none"
        >
          {/* Refined Pill Tag */}
          <span className="inline-block px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest bg-[#14102B] text-[#FFC21A] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-2">
            Late-Night Calling · Small-Batch Pop
          </span>

          {/* Premium Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-wider drop-shadow-[0_4px_16px_rgba(20,16,43,0.25)] m-0 leading-none">
            <span className="text-[#FFC21A] drop-shadow-[0_2px_4px_rgba(20,16,43,0.4)]">CRAVE</span> <span className="text-[#14102B]/60">·</span> <span className="text-[#FF4B1F] drop-shadow-[0_2px_4px_rgba(20,16,43,0.3)]">CRUNCH</span>
          </h2>

          <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-body text-[#14102B] font-bold max-w-md tracking-wide">
            Popped exclusively in pure sunflower oil. No shortcuts, zero palm oil.
          </p>
        </motion.div>

        {/* Central Smoothly Scaling Brand Canvas Frame */}
        <motion.div
          style={{
            scale: containerScale,
            borderRadius,
          }}
          className="relative w-[min(94vw,1200px)] flex-1 min-h-[44vh] sm:min-h-[52vh] lg:min-h-[58vh] max-h-[62vh] flex items-center justify-center overflow-hidden z-10 rounded-2xl sm:rounded-3xl border-2 border-[#14102B] shadow-[6px_6px_0px_#14102B] mt-3 sm:mt-4"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/95 via-[#14102B]/25 to-transparent pointer-events-none" />

          {/* Cinematic Story Reveal at Full Bleed (Left Bottom) */}
          <motion.div
            style={{ opacity: revealOpacity, y: revealY }}
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-30 max-w-xl pointer-events-auto text-left"
          >
            <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-2">
              100% Sunflower Oil · Gurugram
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white m-0 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Big Flavour. Thoughtful Oil.
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#FFF4DC]/90 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg">
              Most people snack without checking what is inside. With 11 PM, you only have to crave; we take care of the rest with whole grain corn and clean sunflower popping.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

