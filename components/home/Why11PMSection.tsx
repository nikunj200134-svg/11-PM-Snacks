'use client';

import { Button } from '@/components/Button';
import { StatChip } from '@/components/StatChip';
import { siteContent } from '@/content/site';

export function Why11PMSection() {
  const { title, description, cards, proteinStat, ctaText, ctaHref } =
    siteContent.homepage.why11pm;

  return (
    <section className="relative bg-[#14102B] text-[#FFF4DC] py-20 border-b-2 border-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto flex flex-col gap-12">
        {/* Section Header: 1 H2 & 1 Short Paragraph & At most 1 CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#FFF4DC]/15">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#FFF4DC]">
                Our Philosophy
              </span>
              {/* Exactly one StatChip for the protein figure */}
              <StatChip
                value={proteinStat.value}
                label={proteinStat.label}
                variant="gold"
                icon="⚡"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#FFF4DC]/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {/* At most one CTA: link to /nutrition */}
          <Button href={ctaHref} variant="gold" size="sm">
            {ctaText}
          </Button>
        </div>

        {/* 3 Sticker Cards (Small batch, Zero palm oil, Bold masala) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cards.map((card, idx) => {
            const cardBgColors = ['bg-[#FFF4DC]', 'bg-[#FFFDF7]', 'bg-[#FFF4DC]'];
            const badgeBgColors = ['bg-[#FFC21A]', 'bg-[#2EC27E]', 'bg-[#FF4B1F]'];
            const badgeTextColor = idx === 1 ? 'text-[#14102B]' : 'text-[#14102B]';
            const tilts = ['rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]'];

            return (
              <article
                key={card.id}
                className={`relative flex flex-col justify-between p-7 text-[#14102B] border-[2.5px] border-[#14102B] rounded-[28px] shadow-[6px_6px_0px_#FFC21A] hover:shadow-[8px_8px_0px_#FFC21A] hover:-translate-y-1 transition-all duration-200 select-none ${cardBgColors[idx]} ${tilts[idx]}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border border-[#14102B] ${badgeBgColors[idx]} ${badgeTextColor}`}
                    >
                      {card.note}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#14102B]/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[#14102B]/85 font-medium leading-relaxed">
                    {card.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#14102B]/15 flex items-center justify-between text-xs font-mono font-bold text-[#14102B]/70">
                  <span>11 PM Kitchen Quality</span>
                  <span>Gurugram, IN</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
