'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Consistent SVG Icon Set for "Why Popcorn?" Cards
 * All icons follow the exact same visual design language:
 * - 24x24 viewBox
 * - 1.75 strokeWidth
 * - Clean geometric line-art style
 */
function GrainIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2v20" />
      <path d="M17 5c-2.5 0-5 2.5-5 5s2.5 5 5 5 5-2.5 5-5-2.5-5-5-5z" />
      <path d="M7 9c2.5 0 5 2.5 5 5s-2.5 5-5 5-5-2.5-5-5 2.5-5 5-5z" />
      <path d="M12 14c-1.5 2-1.5 4.5 0 6" />
    </svg>
  );
}

function FibreIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M8 12c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      <path d="M12 16v5" />
      <path d="M9 19h6" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function ProteinIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22v-9" />
      <path d="M12 13c0-4.5 3.5-8 8-8-1 4.5-4 8-8 8z" />
      <path d="M12 17c0-3.5-2.5-6-6-6 1 3.5 3 6 6 6z" />
      <circle cx="12" cy="3" r="1.5" />
    </svg>
  );
}

function CholesterolIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function NoPalmOilIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2.7L6.3 9.4A7.5 7.5 0 1 0 17.7 9.4L12 2.7z" />
      <line x1="5" y1="19" x2="19" y2="5" />
    </svg>
  );
}

function GlutenFreeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2.5 2.5L16 9" />
      <path d="M12 6v2" />
      <path d="M12 16v2" />
    </svg>
  );
}

const CARDS = [
  {
    id: 'whole-grain',
    title: 'Whole Grain',
    badge: '100% Whole Kernel',
    Icon: GrainIcon,
    accent: '#FFC21A',
    copy: 'Unrefined corn kernel containing bran, germ, and endosperm for slow-burning, steady complex carbs.',
  },
  {
    id: 'fibre',
    title: 'High in Fibre',
    badge: 'Gut Friendly',
    Icon: FibreIcon,
    accent: '#2EC27E',
    copy: 'Supports healthy digestion, feeds beneficial gut bacteria, and keeps you comfortably full without heaviness.',
  },
  {
    id: 'protein',
    title: 'Good Source of Plant Protein',
    badge: 'Natural Fuel',
    Icon: ProteinIcon,
    accent: '#FF4B1F',
    copy: 'Pure agricultural plant protein from natural corn to power late-night focus and steady energy.',
  },
  {
    id: 'cholesterol',
    title: 'Naturally Cholesterol-Free',
    badge: '0mg Cholesterol',
    Icon: CholesterolIcon,
    accent: '#2EC27E',
    copy: 'Popped exclusively in pure sunflower oil with 0g trans fats, zero cholesterol, and zero animal shortenings.',
  },
  {
    id: 'no-palm-oil',
    title: 'No Palm Oil',
    badge: 'Pure Sunflower',
    Icon: NoPalmOilIcon,
    accent: '#FF7AB8',
    copy: 'We reject industrial palm fats. Sunflower popping leaves zero waxy film in your mouth and clean fingers.',
  },
  {
    id: 'gluten-free',
    title: 'Naturally Gluten-Free Ingredients',
    badge: 'Naturally Gluten-Free',
    Icon: GlutenFreeIcon,
    accent: '#FFC21A',
    copy: 'Corn is inherently gluten-free. Tumbled in real Indian spices without wheat flour or synthetic binders.',
  },
];

export function WhyPopcornSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="why-popcorn"
      className="relative bg-[#0A0A0A] text-[#F5F1EA] py-20 sm:py-24 border-b-2 border-[#14102B] overflow-hidden scroll-mt-24"
    >
      {/* Subtle Ambient Red Glow Behind Section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E10600]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-14 sm:gap-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#1F193E] text-[#FFC21A] border border-[#FFC21A]/40 mb-3 shadow-[2px_2px_0px_#14102B]">
            02 / The Grain Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#F5F1EA] m-0">
            Why Popcorn?
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#F5F1EA]/80 font-medium leading-relaxed">
            Unrefined whole grain corn, popped warm in sunflower oil. Clean ingredients for the craving that hits at 11.
          </p>
        </div>

        {/* Six Cards with Consistent SVG Icon Set */}
        <div>
          <div className="mb-4 px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC21A]">
              Six Clean Snacking Commitments
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {CARDS.map((card, idx) => {
              const { Icon } = card;
              return (
                <motion.div
                  key={card.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="p-7 sm:p-8 rounded-[28px] bg-[#121212] border-2 border-[rgba(255,255,255,0.12)] shadow-[6px_6px_0px_#14102B] flex flex-col justify-between hover:border-[#FFC21A]/60 hover:-translate-y-1.5 transition-all duration-200"
                >
                  <div>
                    {/* Consistent SVG Icon Badge Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[rgba(255,255,255,0.16)] flex items-center justify-center text-[#FFC21A] shadow-inner">
                        <Icon className="w-6 h-6 stroke-[#FFC21A]" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#1A1A1A] text-[#F5F1EA] border border-[rgba(255,255,255,0.16)]">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-[#F5F1EA] m-0 leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#A8A29A] font-medium leading-relaxed m-0">
                    {card.copy}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footnote per specifications */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A8A29A]">
          <p className="m-0 text-center sm:text-left">
            * Values as per lab test. See{' '}
            <Link href="/nutrition" className="text-[#FFC21A] underline underline-offset-4 hover:text-white transition-colors font-bold">
              nutrition panel
            </Link>
            .
          </p>
          <span className="text-[11px] font-semibold text-[#A8A29A]/80 uppercase">
            No Medical Claims · Transparent Lab Standards
          </span>
        </div>
      </div>
    </section>
  );
}
