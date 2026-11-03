'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteContent } from '@/content/site';

export function AnnouncementBar() {
  const reducedMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const announcementItems = siteContent.homepage.announcement;

  useEffect(() => {
    if (!barRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={barRef}
      role="region"
      aria-label="Launch Announcements"
      className="relative z-50 overflow-hidden overflow-x-clip max-w-full w-full bg-[#14102B] text-[#FFF4DC] border-b-2 border-[#14102B] py-2 select-none"
    >
      <div className="flex w-full max-w-full items-center overflow-hidden">
        {reducedMotion ? (
          // Accessible, static wrapped fallback for reduced motion
          <div className="flex w-full justify-center flex-wrap gap-4 px-4 text-xs font-mono font-bold tracking-widest uppercase">
            {announcementItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-3">
                <span>{item}</span>
                {idx < announcementItems.length - 1 && <span aria-hidden="true">★</span>}
              </span>
            ))}
          </div>
        ) : (
          // Continuous marquee animation with hover deceleration and focus pause
          <div className="group flex w-full max-w-full whitespace-nowrap overflow-hidden">
            <div
              style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
              className="flex shrink-0 items-center gap-8 animate-[marquee_24s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] pr-8"
            >
              {announcementItems.map((item, idx) => (
                <span
                  key={`ann1-${idx}`}
                  className="inline-flex items-center gap-4 text-xs font-mono font-bold tracking-widest text-[#FFF4DC]"
                >
                  <span>{item}</span>
                  <span className="text-[#FFC21A]" aria-hidden="true">
                    ★
                  </span>
                </span>
              ))}
            </div>
            <div
              style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
              className="flex shrink-0 items-center gap-8 animate-[marquee_24s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] pr-8"
              aria-hidden="true"
            >
              {announcementItems.map((item, idx) => (
                <span
                  key={`ann2-${idx}`}
                  className="inline-flex items-center gap-4 text-xs font-mono font-bold tracking-widest text-[#FFF4DC]"
                >
                  <span>{item}</span>
                  <span className="text-[#FFC21A]">★</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
