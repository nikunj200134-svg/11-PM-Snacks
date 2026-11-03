import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: 'Where to Buy · 11 PM Snacks',
  description:
    'Find 11 PM Snacks online, on quick commerce delivery apps, or inquire about wholesale retail stockist distribution.',
  path: '/where-to-buy',
});

export default function WhereToBuyPage() {
  const { eyebrow, title, description, onlinePlatforms, wholesale } =
    siteContent.innerPages.whereToBuyPage;

  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Page Hero */}
      <section className="pt-16 pb-12 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] mb-4 rotate-[-1deg]">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* 2. Platform Cards with [TODO] Links */}
      <section className="py-16 border-b-2 border-[#14102B]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-4xl flex flex-col gap-8">
          <div className="text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] block mb-1">
              Direct &amp; Instant Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#14102B] m-0">
              Delivery Channels
            </h2>
          </div>

          <div className="space-y-4">
            {onlinePlatforms.map((platform, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-[28px] border-[2.5px] border-[#14102B] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  platform.isLive
                    ? 'bg-white shadow-[6px_6px_0px_#14102B]'
                    : 'bg-[#FFFDF7] shadow-[4px_4px_0px_#14102B] opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FFC21A] text-[#14102B]">
                      {platform.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-[#14102B] m-0">
                      {platform.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#14102B]/80 font-medium m-0">
                    {platform.eta}
                  </p>
                </div>

                <div>
                  {platform.isLive ? (
                    <Button href={platform.ctaHref} variant="gold" size="md">
                      {platform.ctaText} →
                    </Button>
                  ) : (
                    <div className="px-4 py-2 rounded-xl bg-[#FFF4DC] border border-dashed border-[#14102B] text-center">
                      <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                        {platform.ctaText}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Wholesale & Retail Stockists CTA */}
      <section className="py-16 bg-[#14102B] text-[#FFF4DC]">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#2EC27E] text-[#14102B] border border-[#14102B] mb-3">
            B2B &amp; Corporate Pantries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wider text-[#FFC21A] m-0">
            {wholesale.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FFF4DC]/80 font-medium leading-relaxed">
            {wholesale.desc}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={wholesale.ctaHref} variant="gold" size="lg">
              {wholesale.ctaText}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
