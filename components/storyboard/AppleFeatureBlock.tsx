'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { Meter } from '@/components/Meter';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent, type FlavourItem } from '@/content/site';

/**
 * Prompt 6: Product block (Apple Feature Block pattern)
 * 
 * - "Pick your mood" showcase with spring crossfade stage
 * - Colour swatches radio group (Fire, Tomato, Gold) with keyboard navigation
 * - Four feature cards (Small Batch, No Palm Oil, Real Masala Flavour, Ready to Eat)
 *   that expand on click (aria-expanded) and lift on hover; swipeable on mobile
 * - Flavour panel with mood line, taste meters (heat, tang, cheesiness), description
 * - Strictly unreleased format: "Coming soon" badge + "Notify me" CTA
 */

const PHOTO_CARDS = [
  {
    src: '/brand/three-pack-flatlay.webp',
    alt: '11 PM Snacks Signature Trio flatlay',
    tag: 'Signature Trio',
    title: 'Three Bold Moods',
    sub: 'Peri Peri · Tangy Tomato · Cheddar Cheese',
  },
  {
    src: '/brand/studio-model.webp',
    alt: 'Studio model snacking with 11 PM popcorn pouch',
    tag: 'Sunflower Popped',
    title: 'Zero Palm Oil Crunch',
    sub: 'Popped strictly in refined sunflower oil',
  },
  {
    src: '/brand/tote-bag-model.webp',
    alt: 'Lifestyle model carrying 11 PM Snacks in tote bag',
    tag: 'Everyday Crunch',
    title: 'Carry Your Crunch',
    sub: 'High volume, wholesome corn on the move',
  },
  {
    src: '/brand/siblings-sharing.webp',
    alt: 'Friends and family sharing 11 PM Snacks popcorn',
    tag: 'Late-Night Calling',
    title: 'Share The Crunch',
    sub: 'Small-batch crafted in Gurugram',
  },
];

const SENSORY_PILLARS: Record<
  string,
  {
    spice: { icon: string; title: string; subtitle: string; tag: string; tagColor: string };
    flavour: { icon: string; title: string; subtitle: string; tag: string; tagColor: string };
    texture: { icon: string; title: string; subtitle: string; tag: string; tagColor: string };
  }
> = {
  'peri-peri': {
    spice: {
      icon: '🔥',
      title: 'Spice Character',
      subtitle: 'African bird’s eye chili warmth',
      tag: 'Bold Fiery Kick',
      tagColor: 'bg-[#FF4B1F] !text-white',
    },
    flavour: {
      icon: '🍋',
      title: 'Primary Flavour',
      subtitle: 'Smoked garlic & zesty citrus edge',
      tag: 'Zesty Tang',
      tagColor: 'bg-[#FFC21A] !text-[#14102B]',
    },
    texture: {
      icon: '🍿',
      title: 'Snack Texture',
      subtitle: 'Sunflower popped, non-greasy crunch',
      tag: 'Crisp Blossom Pop',
      tagColor: 'bg-[#14102B] !text-white',
    },
  },
  'tangy-tomato': {
    spice: {
      icon: '🌶️',
      title: 'Spice Character',
      subtitle: 'Gentle Kashmiri masala blend',
      tag: 'Mild Warmth',
      tagColor: 'bg-[#E5262F] !text-white',
    },
    flavour: {
      icon: '🍅',
      title: 'Primary Flavour',
      subtitle: 'Sun-ripened tomato & amchur balance',
      tag: 'Chatpata Sweet & Sour',
      tagColor: 'bg-[#FF7AB8] !text-[#14102B]',
    },
    texture: {
      icon: '🍿',
      title: 'Snack Texture',
      subtitle: 'Thin-hulled airy movie-night pop',
      tag: 'Airy Blossom Pop',
      tagColor: 'bg-[#14102B] !text-white',
    },
  },
  'cheddar-cheese': {
    spice: {
      icon: '🧀',
      title: 'Spice Character',
      subtitle: 'Non-spicy, kid & family safe',
      tag: 'Zero Heat · Pure Comfort',
      tagColor: 'bg-[#2EC27E] !text-white',
    },
    flavour: {
      icon: '🧈',
      title: 'Primary Flavour',
      subtitle: 'Real dehydrated cheddar & whey melt',
      tag: 'Savory Golden Cheddar',
      tagColor: 'bg-[#FFC21A] !text-[#14102B]',
    },
    texture: {
      icon: '🍿',
      title: 'Snack Texture',
      subtitle: 'Velvety savory melt in every kernel',
      tag: 'Velvety Crunch',
      tagColor: 'bg-[#14102B] !text-white',
    },
  },
};

export function AppleFeatureBlock() {
  const flavours = siteContent.flavours;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active: FlavourItem = flavours[selectedIdx];
  const reducedMotion = useReducedMotion();

  return (
    <section id="features" className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B] scroll-mt-24">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3 rotate-[-1deg]">
            Product Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Pick Your Mood
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            Select a flavour to explore its sensory formula, clean oil profile, and small-batch craftsmanship.
          </p>

          {/* Interactive Flavour Switcher Tabs (Direct One-Click Selection) */}
          <div className="mt-8 flex flex-col items-center gap-3 w-full">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#14102B]/70">
              Select Flavour to Explore Sensory Profile:
            </span>
            <div
              role="tablist"
              aria-label="Select Flavour"
              className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 bg-[#14102B]/5 border-2 border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B] max-w-2xl w-full justify-between"
            >
              {flavours.map((flavour, idx) => {
                const isSelected = selectedIdx === idx;
                const activeStyle =
                  flavour.id === 'peri-peri'
                    ? 'bg-[#FF4B1F] !text-white border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] -translate-y-0.5'
                    : flavour.id === 'tangy-tomato'
                    ? 'bg-[#E5262F] !text-white border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] -translate-y-0.5'
                    : 'bg-[#FFC21A] !text-[#14102B] border-2 border-[#14102B] shadow-[4px_4px_0px_#14102B] -translate-y-0.5';

                const icon =
                  flavour.id === 'peri-peri' ? '🌶️' : flavour.id === 'tangy-tomato' ? '🍅' : '🧀';

                return (
                  <button
                    key={flavour.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex-1 min-h-[44px] py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-[11px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 whitespace-nowrap ${
                      isSelected
                        ? `${activeStyle} scale-[1.02]`
                        : 'bg-white !text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] hover:bg-[#FFF4DC] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#14102B]'
                    }`}
                  >
                    <span className="text-xs sm:text-base leading-none">{icon}</span>
                    <span className="leading-none hidden sm:inline">{flavour.name}</span>
                    <span className="leading-none sm:hidden">
                      {flavour.id === 'peri-peri'
                        ? 'Peri-Peri'
                        : flavour.id === 'tangy-tomato'
                        ? 'Tomato'
                        : 'Cheese'}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Quick Mood Subtitle pill */}
            <span className="text-xs font-mono font-bold text-[#FF4B1F] bg-white px-3 py-1 rounded-full border border-[#14102B]/30 shadow-[1px_1px_0px_#14102B]">
              Active: {active.name} ({active.subtitle})
            </span>
          </div>
        </div>

        {/* 1. Large Pouch Stage (Spring crossfade / slide) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                  🚀 Coming Soon
                </span>
                <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                  Batch 01 Dropping Soon
                </span>
              </div>
              <Button href="#notify" variant="gold" size="sm">
                Notify Me →
              </Button>
            </div>

            {/* Stage Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-xs font-mono font-bold text-[#14102B]/60 uppercase tracking-wider">
                  {active.subtitle}
                </span>
                <h3 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0 mt-1">
                  {active.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-scribble text-[#FF4B1F] font-bold">
                  {active.moodTag}
                </p>
                <p className="mt-3 text-base text-[#14102B]/85 font-medium leading-relaxed max-w-xl">
                  {active.description}
                </p>

                {/* Tasting Notes */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tastingNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-sans font-bold bg-[#FFF4DC] border border-[#14102B] text-[#14102B]"
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Framed 3:2 Pouch Visual */}
              <div className="lg:col-span-5 flex items-center justify-center p-2">
                <motion.div
                  initial={reducedMotion ? {} : { scale: 0.95 }}
                  animate={reducedMotion ? {} : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative w-full max-w-[340px] aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#14102B]/5"
                >
                  <Image
                    src={active.pouch}
                    alt={`${active.name} Masala Popcorn Pouch`}
                    fill
                    sizes="(max-width: 640px) 100vw, 340px"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Culinary Flavour Character Profile (Zero Rating Confusion) */}
            {(() => {
              const pillars = SENSORY_PILLARS[active.id] || SENSORY_PILLARS['peri-peri'];
              return (
                <div className="pt-6 mt-6 border-t-2 border-[#14102B]/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F]">
                      ✦ Culinary Taste &amp; Texture Profile
                    </span>
                    <span className="text-[11px] font-mono text-[#14102B]/60">
                      Chef notes crafted for late-night snacking · zero artificial flavours
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* 1. Spice Character */}
                    <div className="p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#14102B]/60">
                          {pillars.spice.title}
                        </span>
                        <span className="text-xl leading-none" aria-hidden="true">{pillars.spice.icon}</span>
                      </div>
                      <span className={`inline-block self-start px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase tracking-wider border border-[#14102B] shadow-[1px_1px_0px_#14102B] ${pillars.spice.tagColor}`}>
                        {pillars.spice.tag}
                      </span>
                      <p className="mt-2 text-xs text-[#14102B]/80 font-medium leading-snug m-0">
                        {pillars.spice.subtitle}
                      </p>
                    </div>

                    {/* 2. Primary Flavour */}
                    <div className="p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#14102B]/60">
                          {pillars.flavour.title}
                        </span>
                        <span className="text-xl leading-none" aria-hidden="true">{pillars.flavour.icon}</span>
                      </div>
                      <span className={`inline-block self-start px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase tracking-wider border border-[#14102B] shadow-[1px_1px_0px_#14102B] ${pillars.flavour.tagColor}`}>
                        {pillars.flavour.tag}
                      </span>
                      <p className="mt-2 text-xs text-[#14102B]/80 font-medium leading-snug m-0">
                        {pillars.flavour.subtitle}
                      </p>
                    </div>

                    {/* 3. Snack Texture */}
                    <div className="p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#14102B]/60">
                          {pillars.texture.title}
                        </span>
                        <span className="text-xl leading-none" aria-hidden="true">{pillars.texture.icon}</span>
                      </div>
                      <span className={`inline-block self-start px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase tracking-wider border border-[#14102B] shadow-[1px_1px_0px_#14102B] ${pillars.texture.tagColor}`}>
                        {pillars.texture.tag}
                      </span>
                      <p className="mt-2 text-xs text-[#14102B]/80 font-medium leading-snug m-0">
                        {pillars.texture.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* 2. Brand & Lifestyle Photo Cards (Square Photos with Curved Corners) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-5 px-1">
            <h4 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Craftsmanship &amp; Lifestyle
            </h4>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F]">
              Gurugram Small-Batch · Clean Sunflower Popping
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PHOTO_CARDS.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-[2.5px] border-[#14102B] shadow-[5px_5px_0px_#14102B] bg-[#14102B] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#14102B] transition-all duration-300"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/90 via-[#14102B]/25 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] shadow-[1.5px_1.5px_0px_#14102B]">
                    {photo.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-base sm:text-lg font-display uppercase tracking-wide text-white m-0 drop-shadow-sm">
                    {photo.title}
                  </h5>
                  <p className="mt-1 text-xs text-[#FFF4DC]/85 font-medium leading-snug drop-shadow-sm">
                    {photo.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
