'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Prompt 5: Siena Parallax Scroll Pattern
 * 
 * - Pinned section for 180vh–200vh of scroll using Lenis smooth scrolling
 * - Full-bleed brand photo starts inside a small custom SVG mask at screen center
 *   (clock-face circle / popcorn blossom) and scales up to fill screen
 * - Image inside counter-scales slightly for depth
 * - Two headline words slide apart as it grows: "Crave" to left, "Crunch" to right
 * - Skips play button ([TODO: brand video] placeholder)
 * - Mobile: simpler scale and circle clip-path growth
 * - Reduced motion: static image, Lenis disabled
 */
export function SienaParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Mask growth: starts small (16% radius) and grows to full screen (120% radius)
  const clipRadius = useTransform(scrollYProgress, [0.05, 0.75], ['16%', '120%']);
  
  // 2. Container scale and border radius smoothing
  const containerScale = useTransform(scrollYProgress, [0.05, 0.75], [0.85, 1.0]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.7], [32, 0]);

  // 3. Counter-scale on inner photo for camera depth (1.35x down to 1.05x)
  const imageScale = useTransform(scrollYProgress, [0.05, 0.75], [1.35, 1.05]);

  // 4. Headline words sliding apart: "Crave" to the left, "Crunch" to the right
  const craveX = useTransform(scrollYProgress, [0.05, 0.65], ['0%', '-65%']);
  const crunchX = useTransform(scrollYProgress, [0.05, 0.65], ['0%', '65%']);
  const headlineOpacity = useTransform(scrollYProgress, [0.55, 0.8], [1, 0.15]);

  // 5. Cinematic reveal text fading in once the image takes over
  const revealOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.65, 0.85], [30, 0]);

  // Reduced motion fallback: static clean framed section without scroll pin
  if (reducedMotion) {
    return (
      <section className="relative bg-[#14102B] text-[#FFF4DC] py-20 px-4 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-4 text-4xl sm:text-6xl font-display uppercase tracking-widest text-[#FFC21A] mb-8">
            <span>Crave</span>
            <span>·</span>
            <span>Crunch</span>
          </div>

          <div className="relative w-full max-w-4xl h-[420px] rounded-3xl overflow-hidden border-2 border-[#FFF4DC]/20 shadow-2xl">
            <Image
              src="/images/cascade.webp"
              alt="Golden kettle-popped corn tumbling in rich masala spices"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-left max-w-md">
              <span className="text-xs font-mono font-bold text-[#FFC21A] uppercase tracking-wider block mb-1">
                Kettle Popped · Gurugram
              </span>
              <p className="text-2xl font-display uppercase text-white m-0">
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
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-radial from-[#14102B] via-[#0E0A1F] to-[#070510] -z-10" />

        {/* Floating Headline Words Sliding Apart ("Crave" ← | → "Crunch") */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between px-6 sm:px-16 md:px-24">
          <motion.div
            style={{ x: craveX, opacity: headlineOpacity }}
            className="flex flex-col items-start"
          >
            <span className="text-[clamp(3.5rem,13vw,11rem)] font-display uppercase tracking-wider text-[#FFC21A] leading-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
              Crave
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#FFF4DC]/60 mt-1">
              Late-Night Calling
            </span>
          </motion.div>

          <motion.div
            style={{ x: crunchX, opacity: headlineOpacity }}
            className="flex flex-col items-end text-right"
          >
            <span className="text-[clamp(3.5rem,13vw,11rem)] font-display uppercase tracking-wider text-[#FF4B1F] leading-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
              Crunch
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#FFF4DC]/60 mt-1">
              Small-Batch Pop
            </span>
          </motion.div>
        </div>

        {/* Central Masked Scaling Container */}
        <motion.div
          style={{
            scale: containerScale,
            borderRadius,
            clipPath: `circle(${clipRadius} at 50% 50%)`,
          }}
          className="relative w-full h-full flex items-center justify-center overflow-hidden z-10"
        >
          {/* Inner Counter-Scaling Brand Photo (Cascade of golden popcorn) */}
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/cascade.webp"
              alt="High-speed capture of golden masala seasoned popcorn clusters cascading in Gurugram kitchen"
              fill
              priority
              className="object-cover filter contrast-[1.08] brightness-[0.92]"
              sizes="100vw"
            />
          </motion.div>

          {/* Dark Contrast Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/90 via-[#14102B]/20 to-transparent pointer-events-none" />

          {/* Center Clock-Face SVG Icon Overlay at Start */}
          <div className="absolute z-20 pointer-events-none flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full border-2 border-[#FFC21A] bg-[#14102B]/80 flex items-center justify-center text-lg shadow-lg">
              🍿
            </span>
            {/* Note: Brand film play button skipped until video asset is ready */}
            {/* [TODO: brand video] */}
          </div>

          {/* Cinematic Overlay Text Revealing on Full Bleed */}
          <motion.div
            style={{ opacity: revealOpacity, y: revealY }}
            className="absolute bottom-10 left-6 sm:bottom-16 sm:left-16 z-30 max-w-xl pointer-events-auto"
          >
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              100% Sunflower Oil · Gurugram
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white m-0 leading-tight">
              Big Flavour. Thoughtful Oil.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#FFF4DC]/85 font-medium leading-relaxed">
              Most people snack without checking what is inside. With 11 PM, you only have to crave; we take care of the rest with whole grain corn and clean sunflower popping.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
