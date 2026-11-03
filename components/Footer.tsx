'use client';

import Link from 'next/link';
import { siteContent } from '@/content/site';

export function Footer() {
  const { brand, footerNavigation } = siteContent;

  return (
    <footer className="bg-[#14102B] text-[#FFF4DC] border-t-4 border-[#14102B] pt-16 pb-12 select-none">
      <div className="w-[min(1240px,94vw)] mx-auto">
        {/* Top Section: Brand Statement & Newsletter Mini Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#FFF4DC]/15">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFC21A] uppercase">
              Gurugram, India · Small-Batch Masala Popcorn
            </span>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-[#FFF4DC]">
              Your Cravings.<br />
              <span className="text-[#FFC21A]">Our Calling.</span>
            </h2>
            <p className="text-sm md:text-base text-[#FFF4DC]/75 max-w-md leading-relaxed">
              {brand.shortBio}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFC21A] text-[#14102B] border border-[#14102B]">
                ✓ Sunflower Oil
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#2EC27E] text-[#14102B] border border-[#14102B]">
                ✓ Small Batch
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF7AB8] text-[#14102B] border border-[#14102B]">
                ✓ 100% Whole Grain
              </span>
            </div>
          </div>

          {/* Navigation Columns (Slot 7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Flavours */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC21A] uppercase">
                The 3 Moods
              </span>
              <ul className="flex flex-col gap-2 list-none text-sm text-[#FFF4DC]/80 font-medium">
                {footerNavigation.flavours.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-[#FFC21A] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC21A] uppercase">
                Explore
              </span>
              <ul className="flex flex-col gap-2 list-none text-sm text-[#FFF4DC]/80 font-medium">
                {footerNavigation.learn.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-[#FFC21A] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC21A] uppercase">
                Trust &amp; Legal
              </span>
              <ul className="flex flex-col gap-2 list-none text-sm text-[#FFF4DC]/80 font-medium">
                {footerNavigation.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-[#FFC21A] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 text-xs font-mono text-[#FFF4DC]/50">
                  FSSAI: {brand.contact.fssaiPlaceholder}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monumental Edge-to-Edge Wordmark (Slot 7) */}
        <div className="py-10 text-center select-none overflow-hidden">
          <p className="text-[clamp(2.8rem,11vw,8.5rem)] font-display uppercase tracking-widest text-[#FFF4DC]/15 hover:text-[#FFF4DC]/25 transition-colors leading-none m-0">
            11 PM SNACKS
          </p>
        </div>

        {/* Bottom Bar: Address, Copyright & Disclaimers */}
        <div className="pt-6 border-t border-[#FFF4DC]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FFF4DC]/60">
          <p className="m-0 text-center sm:text-left">
            Manufactured in {brand.origin} · Shivji Park Colony, Gurugram 122001
          </p>
          <p className="m-0 text-center sm:text-right">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
