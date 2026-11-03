'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/Button';
import { RotatingTextBadge } from '@/components/RotatingTextBadge';
import { PopBurst, BurstButtonWrapper } from '@/components/PopBurst';
import { Magnetic } from '@/components/Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent } from '@/content/site';

export function HomeHero() {
  const { hero } = siteContent.homepage;
  const reducedMotion = useReducedMotion();

  // Scroll parallax for floating pouch (Recipe 2)
  const { scrollY } = useScroll();
  const pouchParallax = useTransform(scrollY, [0, 600], [0, 75]);

  // Words for staggered headline bounce-in (Recipe 1)
  const prefixWords = hero.headlinePrefix.split(' ');
  const accentWords = hero.headlineAccent.split(' ');

  // Stagger container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 0.04-0.06s stagger per spec
      },
    },
  };

  // Word bounce-in spring variants
  const wordVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF4DC] pt-8 pb-16 md:py-20 border-b-2 border-[#14102B]">
      {/* Popcorn burst on hero load (Recipe 3) */}
      <PopBurst triggerOnMount={true} density="high" className="opacity-70" />

      <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Eyebrow, H1, Paragraph, CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Pill */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[3px_3px_0px_#FFC21A] mb-5 rotate-[-2deg]">
            {hero.eyebrow}
          </span>

          {/* Staggered Bounce-in Headline (Recipe 1) */}
          {reducedMotion ? (
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-wider text-[#14102B] leading-[0.98] m-0">
              {hero.headlinePrefix}
              <br />
              <span className="text-[#FF4B1F] underline decoration-[#FFC21A] decoration-wavy decoration-2">
                {hero.headlineAccent}
              </span>
            </h1>
          ) : (
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-wider text-[#14102B] leading-[0.98] m-0"
            >
              <span className="inline-block">
                {prefixWords.map((word, i) => (
                  <motion.span
                    key={`pref-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-block text-[#FF4B1F] underline decoration-[#FFC21A] decoration-wavy decoration-2">
                {accentWords.map((word, i) => (
                  <motion.span
                    key={`acc-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          )}

          {/* Short Single Paragraph */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#14102B]/85 font-medium leading-relaxed max-w-xl">
            {hero.lede}
          </p>

          {/* CTA Buttons Cluster with Magnetic Pull (Recipe 8) & Burst on Buy button (Recipe 3) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <BurstButtonWrapper>
                <Button href={hero.primaryButtonHref} variant="gold" size="lg">
                  {hero.primaryButtonText}
                </Button>
              </BurstButtonWrapper>
            </Magnetic>
            <Magnetic>
              <Button href={hero.secondaryButtonHref} variant="outline" size="lg">
                {hero.secondaryButtonText}
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Floating Pouch with Parallax (Recipe 2) and Rotating Sticker */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
          {/* Tone Backdrop Glow Disc */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FFC21A]/35 border-2 border-[#14102B]/20 blur-sm pointer-events-none" />

          {/* Floating Pouch with ±10px vertical and ±2° rotation over 3s + Parallax (Recipe 2) */}
          <motion.div
            style={reducedMotion ? {} : { y: pouchParallax }}
            animate={
              reducedMotion
                ? {}
                : {
                    y: [-10, 10, -10],
                    rotate: [-2, 2, -2],
                  }
            }
            transition={
              reducedMotion
                ? {}
                : {
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className="relative z-10"
          >
            <Image
              src="/brand/burst-hero.png"
              alt="11 PM Snacks Masala Popcorn Pouch Bursting with Crunch"
              width={460}
              height={580}
              priority
              className="w-auto h-[320px] sm:h-[420px] md:h-[480px] object-contain filter drop-shadow-[0_24px_32px_rgba(20,16,43,0.28)]"
            />
          </motion.div>

          {/* Rotating "NO PALM OIL • SMALL BATCH •" Sticker (Slot 10) */}
          <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 z-20">
            <RotatingTextBadge
              text={hero.rotatingBadgeText}
              centerText="🍿"
              size="md"
              variant="peri"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
