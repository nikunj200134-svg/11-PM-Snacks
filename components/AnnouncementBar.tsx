'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent } from '@/content/site';

export function AnnouncementBar() {
  const reducedMotion = useReducedMotion();
  const tickerItems = siteContent.homepage.ticker;

  return (
    <div
      role="region"
      aria-label="Brand Announcement"
      className="relative z-50 overflow-hidden bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B] py-2 select-none"
    >
      <div className="flex w-full items-center">
        {reducedMotion ? (
          // Accessible, static wrapped fallback for reduced motion
          <div className="flex w-full justify-center flex-wrap gap-4 px-4 text-xs font-mono font-bold tracking-widest uppercase">
            <span>Everyday Crunch 30g ₹30</span>
            <span aria-hidden="true">★</span>
            <span>Jumbo Crunch 90g ₹60</span>
            <span aria-hidden="true">★</span>
            <span>Popped in Sunflower Oil · Zero Palm Oil</span>
          </div>
        ) : (
          // Continuous marquee animation with hover deceleration
          <div className="group flex whitespace-nowrap overflow-hidden">
            <div className="flex shrink-0 items-center gap-6 animate-[marquee_26s_linear_infinite] group-hover:[animation-play-state:paused] pr-6">
              {tickerItems.map((item, idx) => (
                <span
                  key={`track1-${idx}`}
                  className="inline-flex items-center gap-6 text-[11px] md:text-xs font-mono font-bold tracking-widest text-[#FFF4DC]"
                >
                  <span>{item}</span>
                  <span className="text-[#FFC21A]" aria-hidden="true">
                    ★
                  </span>
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-6 animate-[marquee_26s_linear_infinite] group-hover:[animation-play-state:paused] pr-6"
              aria-hidden="true"
            >
              {tickerItems.map((item, idx) => (
                <span
                  key={`track2-${idx}`}
                  className="inline-flex items-center gap-6 text-[11px] md:text-xs font-mono font-bold tracking-widest text-[#FFF4DC]"
                >
                  <span>{item}</span>
                  <span className="text-[#FFC21A]">★</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
