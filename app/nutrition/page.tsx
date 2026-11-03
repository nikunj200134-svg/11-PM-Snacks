'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { StatChip } from '@/components/StatChip';
import { siteContent, type FlavourItem } from '@/content/site';

export default function NutritionPage() {
  const { eyebrow, title, description, oilPhilosophy, verifiedClaims } =
    siteContent.innerPages.nutritionPage;
  const flavours = siteContent.flavours;

  const [activeTab, setActiveTab] = useState(0);
  const activeFlavour: FlavourItem = flavours[activeTab];

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Page Hero */}
      <section className="pt-16 pb-12 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-1deg]">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <StatChip value="12g" label="Plant Protein / 100g" variant="gold" icon="⚡" />
            <StatChip value="0g" label="Trans Fat" variant="leaf" icon="❤️" />
            <StatChip value="100%" label="Sunflower Popped" variant="peri" icon="🌻" />
          </div>
        </div>
      </section>

      {/* 2. Interactive Nutrition Label per Flavour in Tabs */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-8">
          <div className="text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block mb-1">
              Select Recipe
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Flavour Nutrition Panels
            </h2>
          </div>

          {/* Flavour Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto p-1.5 bg-white border-2 border-[#14102B] rounded-full shadow-[4px_4px_0px_#14102B] w-fit mx-auto">
            {flavours.map((flavour, idx) => (
              <button
                key={flavour.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === idx
                    ? 'bg-[#14102B] text-[#FFF4DC] shadow-[2px_2px_0px_#14102B]'
                    : 'text-[#14102B] hover:bg-[#14102B]/5'
                }`}
              >
                {flavour.name}
              </button>
            ))}
          </div>

          {/* Active Flavour Nutrition Card */}
          <div className="bg-white border-[3px] border-[#14102B] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_#14102B]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#14102B] pb-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF4B1F] uppercase tracking-wider">
                  {activeFlavour.subtitle}
                </span>
                <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
                  {activeFlavour.name} Nutrition Panel
                </h3>
              </div>
              <Link
                href={activeFlavour.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-[#FFC21A] text-[#14102B] border border-[#14102B] hover:bg-white transition-colors"
              >
                View Flavour Story →
              </Link>
            </div>

            {/* Table */}
            <div className="space-y-2 font-mono text-xs sm:text-sm border-b-2 border-[#14102B] pb-6">
              <div className="grid grid-cols-12 py-1 font-bold text-[#14102B]/60 uppercase border-b border-[#14102B]/10">
                <span className="col-span-6">Nutritional Factor</span>
                <span className="col-span-3 text-right">Per 30g Pack</span>
                <span className="col-span-3 text-right">Per 100g</span>
              </div>
              {activeFlavour.nutritionTable.map((row, i) => (
                <div key={i} className="grid grid-cols-12 py-2 border-b border-[#14102B]/5 items-center">
                  <span className="col-span-6 font-semibold text-[#14102B]">{row.nutrient}</span>
                  <span className="col-span-3 text-right text-[#14102B]/80">{row.per30g}</span>
                  <span className="col-span-3 text-right font-bold text-[#14102B]">{row.per100g}</span>
                </div>
              ))}
            </div>

            {/* Ingredients & Allergens Box */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#14102B]/20">
                <strong className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block mb-2">
                  Full Ingredient Deck:
                </strong>
                <ul className="space-y-1 list-none p-0 text-xs sm:text-sm font-sans text-[#14102B]/85">
                  {activeFlavour.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#2EC27E] font-bold">✓</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#14102B]/20 flex flex-col justify-between">
                <div>
                  <strong className="text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] block mb-2">
                    Allergen Declaration:
                  </strong>
                  <p className="text-xs sm:text-sm font-sans text-[#14102B]/80 leading-relaxed">
                    {activeFlavour.allergens}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#14102B]/10 text-xs font-mono text-[#FF4B1F] font-semibold">
                  Lab Status: {activeFlavour.nutritionSnapshot.caloriesPer30g}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Honest Palm Oil Explanation (Never Preachy) */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-8">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border border-[#14102B] mb-2">
              Our Kitchen Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              {oilPhilosophy.heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#FFF4DC]/80 font-medium leading-relaxed">
              {oilPhilosophy.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {oilPhilosophy.keyPointers.map((ptr, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[24px] bg-[#1F193E] border border-[#FFF4DC]/20 shadow-[4px_4px_0px_#2EC27E]"
              >
                <span className="w-8 h-8 rounded-full bg-[#2EC27E] text-[#14102B] text-xs font-mono font-bold flex items-center justify-center mb-3">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-display uppercase tracking-wide text-[#FFF4DC] m-0">
                  {ptr.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#FFF4DC]/75 leading-relaxed">
                  {ptr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Claims with [TODO: verified] Footnotes */}
      <section className="py-16 bg-[#FFF4DC] border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-8">
          <div className="text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border border-[#14102B] mb-2">
              Verification Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Claims &amp; Lab Footnotes
            </h2>
            <p className="mt-2 text-sm text-[#14102B]/80 font-medium">
              We never invent numbers. Every nutritional assertion corresponds to documented assay reports.
            </p>
          </div>

          <div className="space-y-4">
            {verifiedClaims.map((claim, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border-[2.5px] border-[#14102B] rounded-2xl shadow-[4px_4px_0px_#14102B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FFC21A] text-[#14102B]">
                      {claim.tag}
                    </span>
                    <strong className="text-base sm:text-lg font-display uppercase tracking-wide text-[#14102B]">
                      {claim.claim}
                    </strong>
                  </div>
                  <p className="text-xs sm:text-sm text-[#14102B]/80 font-medium m-0">
                    {claim.details}
                  </p>
                </div>

                <div className="shrink-0 p-2.5 rounded-xl bg-[#FFF4DC] border border-dashed border-[#14102B] text-center">
                  <span className="text-[11px] font-mono font-bold text-[#FF4B1F] block">
                    Footnote Status:
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#14102B]">
                    {claim.footnote}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center pt-4">
            <Button href="/flavours" variant="gold" size="lg">
              Explore Our Flavours →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
