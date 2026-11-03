'use client';

import Image from 'next/image';
import { Button } from '@/components/Button';
import { RotatingTextBadge } from '@/components/RotatingTextBadge';
import { PopBurst } from '@/components/PopBurst';
import { siteContent } from '@/content/site';

export function HomeHero() {
  const { hero } = siteContent.homepage;

  return (
    <section className="relative overflow-hidden bg-[#FFF4DC] pt-8 pb-16 md:py-20 border-b-2 border-[#14102B]">
      {/* Popcorn and Spice Atmospheric Particle Burst */}
      <PopBurst density="high" className="opacity-70" />

      <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Eyebrow, H1, Paragraph, CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Pill */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-mono font-bold uppercase tracking-wider bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] shadow-[3px_3px_0px_#FFC21A] mb-5 rotate-[-2deg]">
            {hero.eyebrow}
          </span>

          {/* Main H1 Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-wider text-[#14102B] leading-[0.98] m-0">
            {hero.headlinePrefix}
            <br />
            <span className="text-[#FF4B1F] underline decoration-[#FFC21A] decoration-wavy decoration-2">
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Short Single Paragraph */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#14102B]/85 font-medium leading-relaxed max-w-xl">
            {hero.lede}
          </p>

          {/* CTA Buttons Cluster */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={hero.primaryButtonHref} variant="gold" size="lg">
              {hero.primaryButtonText}
            </Button>
            <Button href={hero.secondaryButtonHref} variant="outline" size="lg">
              {hero.secondaryButtonText}
            </Button>
          </div>
        </div>

        {/* Right Column: Floating Pouch with Rotating Sticker */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
          {/* Tone Backdrop Glow Disc */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FFC21A]/35 border-2 border-[#14102B]/20 blur-sm pointer-events-none" />

          {/* Floating Pouch Visual */}
          <div className="relative z-10 animate-[float_5s_ease-in-out_infinite]">
            <Image
              src="/brand/burst-hero.png"
              alt="11 PM Snacks Masala Popcorn Pouch Bursting with Crunch"
              width={460}
              height={580}
              priority
              className="w-auto h-[320px] sm:h-[420px] md:h-[480px] object-contain filter drop-shadow-[0_24px_32px_rgba(20,16,43,0.28)]"
            />
          </div>

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
