import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { NotifyMeSection } from '@/components/storyboard/NotifyMeSection';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Where to Buy · 11 PM Snacks',
  description:
    '11 PM Snacks is launching soon. Join our early-access drop list to be notified the moment Batch 01 becomes available in your area.',
  path: '/where-to-buy',
});

export default function WhereToBuyPage() {
  return (
    <div className="bg-[#FFF4DC] min-h-screen text-[#14102B]">
      {/* 1. Header Banner */}
      <section className="pt-20 pb-12 border-b-2 border-[#14102B] text-center">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-3xl flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-4 rotate-[-1deg]">
            🚀 Launch In Progress
          </span>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Where to Buy
          </h1>
          <p className="mt-4 text-base sm:text-xl text-[#14102B]/85 font-medium leading-relaxed">
            Batch 01 is currently preparing in our Gurugram kitchen. We are launching soon across our direct store and select quick-commerce dark stores.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border border-[#14102B]">
              🍿 Coming Soon
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border border-[#14102B]">
              📦 Direct Pan-India Shipping · Launching Soon
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-[#14102B] border border-[#14102B]">
              ⚡ Blinkit, Zepto &amp; Instamart Dark Stores
            </span>
          </div>
        </div>
      </section>

      {/* 2. Embedded Notify Me Early-Access Capture */}
      <NotifyMeSection />

      {/* 3. Wholesale Distribution Inquiry Strip */}
      <section className="py-16 bg-[#FFF4DC] border-b-2 border-[#14102B] text-center">
        <div className="w-[min(1240px,94vw)] mx-auto max-w-2xl flex flex-col items-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4B1F] mb-1">
            Retail &amp; Cafe Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
            Stock 11 PM Snacks in Your Store
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#14102B]/80 font-medium">
            Are you a cafe, campus commissary, cinema, or regional gourmet grocer? Contact our founding team for wholesale crate pricing.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="outline" size="md">
              Wholesale &amp; Retail Inquiries →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
