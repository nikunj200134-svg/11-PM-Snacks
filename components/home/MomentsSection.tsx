'use client';

import { Button } from '@/components/Button';
import { siteContent } from '@/content/site';

export function MomentsSection() {
  const { title, description, cards, ctaText, ctaHref } = siteContent.homepage.moments;

  return (
    <section className="relative bg-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-10">
        {/* Section Header: 1 H2 & 1 Short Paragraph & At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[#14102B]/15">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-3">
              Real Life Crunch
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

        {/* Horizontally Scrolling Cards Track (Mobile & Desktop Snap) */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar">
          {cards.map((card, idx) => {
            const tilts = ['rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]'];
            const tilt = tilts[idx % tilts.length];

            return (
              <article
                key={card.id}
                className={`min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 snap-start bg-white border-[2.5px] border-[#14102B] rounded-[28px] p-6 shadow-[6px_6px_0px_#14102B] hover:shadow-[8px_8px_0px_#14102B] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between ${tilt}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#14102B] text-[#FFF4DC]">
                      {card.time}
                    </span>
                    <span className="text-xs font-scribble text-[#FF4B1F] text-lg">
                      #{card.note}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#14102B]/85 font-medium leading-relaxed">
                    {card.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#14102B]/10 flex items-center justify-between text-xs font-mono font-bold text-[#FF4B1F]">
                  <span>Crunch Time Verified</span>
                  <span>11 PM</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
