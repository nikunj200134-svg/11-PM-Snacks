'use client';

import { useState, useRef } from 'react';
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
 * - Strictly NO sizes and NO prices: "Coming soon" badge + "Notify me" CTA
 */

interface FeatureCardData {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  expandedDesc: string;
  proofBadge: string;
}

const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'small-batch',
    icon: '🥣',
    title: 'Small Batch',
    shortDesc: 'Popped in small kettle runs in Gurugram, India.',
    expandedDesc:
      'We deliberately craft our popcorn in controlled kettle batches so seasoning coats every blossom evenly, ensuring fresh, authentic crunch instead of mass-market stale stockpiles.',
    proofBadge: 'Gurugram Kitchen Batch',
  },
  {
    id: 'no-palm-oil',
    icon: '🌻',
    title: 'No Palm Oil',
    shortDesc: 'Popped strictly in clean, refined sunflower oil.',
    expandedDesc:
      'Never hydrogenated palm fat. Sunflower oil allows the natural corn flavour and authentic spices to shine through without grease on your fingers. 0g Trans Fat · 0mg Cholesterol [TODO: verified lab profile].',
    proofBadge: '100% Sunflower Oil',
  },
  {
    id: 'real-masala',
    icon: '🌶️',
    title: 'Real Masala Flavour',
    shortDesc: 'Bold culinary spice blends with zero artificial colours.',
    expandedDesc:
      'From African bird’s eye chilli heat and sun-ripened dry mango amchur to rich cheddar warmth, our seasonings are developed for genuine taste cravings that hit day or night.',
    proofBadge: 'Authentic Spices',
  },
  {
    id: 'ready-to-eat',
    icon: '⚡',
    title: 'Ready To Eat',
    shortDesc: 'Multi-barrier nitrogen-flushed foil locking in freshness.',
    expandedDesc:
      'Pouched directly after seasoning so moisture stays out and crispness stays in. Tear open whenever cravings strike — study sessions, road trips, or 11 PM movie marathons.',
    proofBadge: 'Nitrogen Flushed',
  },
];

export function AppleFeatureBlock() {
  const flavours = siteContent.flavours;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState<string | null>('small-batch');
  const active: FlavourItem = flavours[selectedIdx];
  const reducedMotion = useReducedMotion();
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Swatch color tokens
  const swatches = [
    { label: 'Fire', color: '#FF4B1F', ringColor: '#FF4B1F', flavourIdx: 0 },
    { label: 'Tomato', color: '#E5262F', ringColor: '#E5262F', flavourIdx: 1 },
    { label: 'Gold', color: '#FFC21A', ringColor: '#FFC21A', flavourIdx: 2 },
  ];

  // Radio group keyboard accessibility (Left / Right Arrow navigation)
  const handleKeyDown = (e: React.KeyboardEvent, currentIdx: number) => {
    let nextIdx = currentIdx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (currentIdx + 1) % flavours.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (currentIdx - 1 + flavours.length) % flavours.length;
      e.preventDefault();
    }
    if (nextIdx !== currentIdx) {
      setSelectedIdx(nextIdx);
      swatchRefs.current[nextIdx]?.focus();
    }
  };

  const toggleCard = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="features" className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
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

          {/* iPhone-Style Colour Swatches Radio Group */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#14102B]/60">
              Colour Swatches: {swatches[selectedIdx].label}
            </span>
            <div
              role="radiogroup"
              aria-label="Flavour colour picker"
              className="flex items-center gap-4 p-2 bg-white border-[2.5px] border-[#14102B] rounded-full shadow-[4px_4px_0px_#14102B]"
            >
              {swatches.map((swatch, idx) => {
                const isChecked = selectedIdx === idx;
                return (
                  <button
                    key={swatch.label}
                    ref={(el) => {
                      swatchRefs.current[idx] = el;
                    }}
                    role="radio"
                    aria-checked={isChecked}
                    tabIndex={isChecked ? 0 : -1}
                    aria-label={`${flavours[idx].name} (${swatch.label})`}
                    onClick={() => setSelectedIdx(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="relative p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#14102B] cursor-pointer transition-transform"
                  >
                    <span
                      style={{ backgroundColor: swatch.color }}
                      className={`block w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#14102B] transition-transform ${
                        isChecked ? 'scale-110 shadow-[2px_2px_0px_#14102B]' : 'opacity-85 hover:opacity-100 hover:scale-105'
                      }`}
                    />
                    {isChecked && (
                      <span className="absolute inset-0 rounded-full border-2 border-white pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
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
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Sensory Taste Meters Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t-2 border-[#14102B]/10">
              <Meter label="Heat" level={active.meters.heat} icon="🔥" tone={active.tone} />
              <Meter label="Tang" level={active.meters.tang} icon="🍅" tone={active.tone} />
              <Meter
                label={active.meters.thirdLabel}
                level={active.meters.crunchOrCheese}
                icon={active.meters.thirdIcon}
                tone={active.tone}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 2. Four Feature Cards (Expand on click, lift on hover, swipeable carousel on mobile) */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Craftsmanship & Ingredients
            </h4>
            <span className="text-xs font-mono text-[#14102B]/60 hidden sm:inline">
              Click any card to expand proof details
            </span>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 scrollbar-none">
            {FEATURE_CARDS.map((card) => {
              const isExpanded = expandedCardId === card.id;

              return (
                <article
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  aria-expanded={isExpanded}
                  className={`snap-center shrink-0 w-[280px] sm:w-auto p-5 sm:p-6 bg-white border-[2.5px] border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#14102B] transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isExpanded ? 'bg-[#FFF9EE]' : ''
                  }`}
                >
                  <div>
                    {/* Icon + Proof Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-2xl" aria-hidden="true">
                        {card.icon}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#14102B] text-[#FFF4DC]">
                        {card.proofBadge}
                      </span>
                    </div>

                    <h5 className="text-lg sm:text-xl font-display uppercase tracking-wide text-[#14102B] m-0">
                      {card.title}
                    </h5>

                    <p className="mt-2 text-xs sm:text-sm text-[#14102B]/80 font-medium leading-relaxed">
                      {card.shortDesc}
                    </p>

                    {/* Animated Expanded Description */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={reducedMotion ? {} : { opacity: 0, height: 0 }}
                          animate={reducedMotion ? {} : { opacity: 1, height: 'auto' }}
                          exit={reducedMotion ? {} : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="mt-3 pt-3 border-t border-[#14102B]/15 text-xs text-[#14102B]/90 font-sans leading-relaxed"
                        >
                          {card.expandedDesc}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className="mt-3 text-[11px] font-mono font-bold text-[#FF4B1F] flex items-center gap-1">
                    {isExpanded ? '▲ Show less' : '▼ Read more'}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
