'use client';

import { MarqueeRibbon } from '@/components/MarqueeRibbon';
import { siteContent } from '@/content/site';

export function RibbonsSection() {
  const { track1, track2 } = siteContent.homepage.ribbons;

  return (
    <section aria-label="Brand Highlights Ticker" className="relative py-4 bg-[#FFF4DC] overflow-hidden">
      <div className="flex flex-col gap-3 -mx-4">
        {/* Ribbon 1: Moving left, -2 degree tilt, Gold */}
        <MarqueeRibbon
          items={track1}
          direction="left"
          tilt={-2}
          variant="gold"
          speedSeconds={26}
        />

        {/* Ribbon 2: Moving right, +2 degree tilt, Midnight */}
        <MarqueeRibbon
          items={track2}
          direction="right"
          tilt={2}
          variant="midnight"
          speedSeconds={28}
        />
      </div>
    </section>
  );
}
