'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/Button';
import { ReviewCard } from '@/components/ReviewCard';
import { siteContent } from '@/content/site';

export function SocialProofSection() {
  const {
    title,
    description,
    ratingSummaryPlaceholder,
    reviews,
    photoGridPlaceholder,
    ctaText,
    ctaHref,
  } = siteContent.homepage.socialProof;

  return (
    <section className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header: 1 H2 & 1 Short Paragraph & At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[#14102B]/15">
          <div className="max-w-xl">
            {/* Rating Summary Placeholder */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              <span className="flex items-center text-[#FF4B1F]">
                <Star className="w-3.5 h-3.5 fill-current stroke-none" />
              </span>
              <span>{ratingSummaryPlaceholder}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#14102B] m-0">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {/* At most one CTA: link to /contact */}
          <Button href={ctaHref} variant="outline" size="sm">
            {ctaText}
          </Button>
        </div>

        {/* Reviews Cards Cluster (Slot 6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {reviews.map((rev, idx) => {
            const tilts: (-2 | 1 | -1)[] = [-1, 1, -2];
            return (
              <ReviewCard
                key={rev.author}
                review={rev}
                tilt={tilts[idx % tilts.length]}
              />
            );
          })}
        </div>

        {/* Customer Photo Grid with Visible [TODO] Placeholder */}
        <div className="mt-4 p-6 sm:p-8 bg-white border-[2.5px] border-[#14102B] rounded-[28px] shadow-[6px_6px_0px_#14102B] flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📸</span>
            <span className="text-sm font-mono font-bold uppercase tracking-widest text-[#FF4B1F]">
              Community Snaps
            </span>
          </div>
          <h3 className="text-2xl font-display uppercase tracking-wide text-[#14102B] m-0">
            Show Us Your Crunch Moments
          </h3>
          <p className="mt-2 text-xs sm:text-sm font-mono text-[#14102B]/70 max-w-md">
            Tag us in your late-night study sessions, gaming marathons, and binge-watch snacks.
          </p>

          <div className="mt-6 w-full max-w-lg p-4 bg-[#FFF4DC] border-2 border-dashed border-[#14102B] rounded-2xl">
            <span className="text-xs font-mono font-bold text-[#FF4B1F] uppercase block">
              Customer Feed Integration Pending
            </span>
            <span className="text-xs font-mono font-semibold text-[#14102B] mt-1 block">
              {photoGridPlaceholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
