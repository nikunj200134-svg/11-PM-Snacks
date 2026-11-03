'use client';

import Image from 'next/image';
import Link from 'next/link';

export function LifestyleStrip() {
  return (
    <section className="py-16 md:py-20 bg-white border-b-2 border-[#14102B] text-[#14102B]">
      <div className="w-[min(1240px,94vw)] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Carry your crunch (Tote Bag Model) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#FFF4DC] hover:shadow-[8px_8px_0px_#14102B] transition-all duration-200">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14102B]">
            <Image
              src="/brand/tote-bag-model.png"
              alt="11 PM Snacks colorful tote bag model - Carry your crunch"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                On The Move
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Carry Your Crunch
              </h3>
              <p className="mt-2 text-base text-[#14102B]/80 font-medium leading-relaxed">
                Tuck a pouch in your backpack, tote, or carry-on. High-barrier nitrogen-flushed foil
                locks in kettle crispness wherever your day or midnight leads.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#14102B]/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                Single Munch · 30g
              </span>
              <Link
                href="/where-to-buy"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] hover:text-[#FF4B1F] underline underline-offset-4"
              >
                Where to Buy →
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Share the crunch (Siblings Image) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border-[2.5px] border-[#14102B] shadow-[6px_6px_0px_#14102B] bg-[#FFF4DC] hover:shadow-[8px_8px_0px_#14102B] transition-all duration-200">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14102B]">
            <Image
              src="/brand/siblings-sharing.png"
              alt="Joyful sibling moments with 11 PM Snacks - Share the crunch gifting banner"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF7AB8] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B]">
                Gifting &amp; Sharing
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#14102B] m-0">
                Share The Crunch
              </h3>
              <p className="mt-2 text-base text-[#14102B]/80 font-medium leading-relaxed">
                Made for kitchen raids, movie nights, festival gifting, and arguing over who gets
                the last handful of Peri Peri or Cheddar Cheese.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#14102B]/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FF4B1F]">
                Share Crate · 90g
              </span>
              <Link
                href="/where-to-buy"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#14102B] hover:text-[#FF4B1F] underline underline-offset-4"
              >
                Reserve Batch 01 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
