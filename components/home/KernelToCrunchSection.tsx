'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function KernelToCrunchSection() {
  const { title, description, steps, ctaText, ctaHref } = siteContent.homepage.processStory;
  const [activeStep, setActiveStep] = useState(0);

  // Step visuals or illustrations
  const stepImages = [
    '/brand/kernels-close.png',
    '/brand/pop-explosion.png',
    '/brand/clusters.png',
    '/brand/burst-hero.png',
  ];

  return (
    <section className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto">
        {/* Section Header: 1 H2, 1 Short Paragraph, At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b-2 border-[#14102B]/15">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              Craft &amp; Kitchen Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          <Button href={ctaHref} variant="outline" size="sm">
            {ctaText}
          </Button>
        </div>

        {/* Desktop Pinned Split & Mobile Stacked Layout (Slot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          {/* Left Pinned Stage (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
            <div className="relative w-full h-[320px] sm:h-[400px] bg-white border-[2.5px] border-[#14102B] rounded-[32px] shadow-[6px_6px_0px_#14102B] p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFC21A] text-[#14102B] border border-[#14102B]">
                Stage {steps[activeStep].number} of 04
              </span>

              <div key={activeStep} className="animate-in zoom-in-95 duration-200">
                <Image
                  src={stepImages[activeStep] || '/brand/burst-hero.png'}
                  alt={steps[activeStep].title}
                  width={340}
                  height={340}
                  className="w-auto h-56 sm:h-64 object-contain filter drop-shadow-[0_12px_18px_rgba(20,16,43,0.18)]"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm font-scribble text-[#FF4B1F] text-xl">
                  {steps[activeStep].subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Scrolling Step Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {steps.map((step, idx) => {
              const isSelected = idx === activeStep;
              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-[28px] border-[2.5px] border-[#14102B] cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-white shadow-[6px_6px_0px_#14102B] translate-x-1'
                      : 'bg-[#FFFDF7] shadow-[3px_3px_0px_#14102B] opacity-80 hover:opacity-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#14102B] text-[#FFF4DC] text-xs font-mono font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#FF4B1F]">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-[#14102B]/85 font-medium leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
