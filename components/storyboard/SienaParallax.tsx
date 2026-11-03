'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SienaParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking across section lifecycle
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale mask container from 84% width to 100% full-bleed (Siena parallax style)
  const scale = useTransform(scrollYProgress, [0.1, 0.55], [0.84, 1]);
  // Border radius rounds down to square edge as it hits full screen
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.55], [40, 0]);
  // Inner image translates for rich depth parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] bg-[#14102B] text-[#FFF4DC] py-20 flex flex-col items-center justify-center overflow-hidden border-b-2 border-[#14102B]"
    >
      {/* Intro Header */}
      <div className="w-[min(1240px,94vw)] mx-auto text-center mb-10 z-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#FFF4DC] mb-3">
          Behind The Crunch
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
          Popcorn With Personality.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#FFF4DC]/80 font-medium max-w-xl mx-auto">
          We reject flat, cardboard snacks. Every kernel is kettle-popped in clean sunflower oil and warm-tumbled in Gurugram.
        </p>
      </div>

      {/* Siena Parallax Masked Scaling Container */}
      <div className="w-full flex items-center justify-center px-4 sm:px-8">
        <motion.div
          style={
            reducedMotion
              ? { borderRadius: '28px' }
              : {
                  scale,
                  borderRadius,
                }
          }
          className="relative w-full max-w-[1240px] h-[420px] sm:h-[540px] md:h-[640px] overflow-hidden border-[3px] border-[#FFF4DC]/30 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Inner Parallax Image */}
          <motion.div
            style={reducedMotion ? {} : { y: imageY }}
            className="absolute -top-[20%] -bottom-[20%] -left-[5%] -right-[5%] w-[110%] h-[140%]"
          >
            <Image
              src="/images/cascade.webp"
              alt="Close-up of golden masala seasoned popcorn clusters"
              fill
              className="object-cover filter contrast-[1.08] brightness-[0.92]"
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
            />
          </motion.div>

          {/* Dark Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/85 via-[#14102B]/30 to-transparent" />

          {/* Center Cinematic Overlay Stamp */}
          <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 z-20 max-w-lg">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFC21A] block mb-1">
              Kettle Popped · Gurugram, India
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wide text-white m-0">
              Big Flavour. Thoughtful Oil.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#FFF4DC]/80 font-medium">
              Whole grain corn blossoms tumbling in authentic Peri Peri, Tangy Tomato, and Cheddar Cheese spice blends.
            </p>
          </div>

          {/* Floating Sticker Seal on Top Right */}
          <div className="absolute top-6 right-6 z-20 rotate-3">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-[#FF4B1F] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B]">
              🌻 100% Sunflower Oil
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
