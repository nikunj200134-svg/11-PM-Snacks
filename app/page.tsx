import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/HomeHero';
import { RibbonsSection } from '@/components/home/RibbonsSection';
import { FlavourSwitcherSection } from '@/components/home/FlavourSwitcherSection';
import { Why11PMSection } from '@/components/home/Why11PMSection';
import { KernelToCrunchSection } from '@/components/home/KernelToCrunchSection';
import { PacksSection } from '@/components/home/PacksSection';
import { NutritionSnapshotSection } from '@/components/home/NutritionSnapshotSection';
import { MomentsSection } from '@/components/home/MomentsSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { FAQSection } from '@/components/home/FAQSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: `${siteContent.brand.tagline} · ${siteContent.brand.name}`,
  description: siteContent.brand.shortBio,
  path: '/',
});

/**
 * 11 PM SNACKS — HOMEPAGE (Prompt 5 Implementation)
 * 
 * Order of Sections:
 * 1. Announcement Bar (offers or delivery only — top of layout)
 * 2. Hero (Slot 1: H1, floating pouch, particles, rotating badge, buttons)
 * 3. Marquee Ribbons (Slot 4: dual tilted ribbons, brand phrases only)
 * 4. Flavour Switcher (Slot 2: full-bleed morph, spring pouch, 3 meters, buy button)
 * 5. Why 11 PM (Midnight background, 3 sticker cards, 1 StatChip, /nutrition link)
 * 6. Kernel to Crunch (Slot 3: 4-step pinned story / mobile stack, /our-story link)
 * 7. Packs (Slot 5: 30g vs 90g toggle, variety bundle [TODO], buy buttons)
 * 8. Nutrition Snapshot (1 compact label card with [TODO: lab data], /nutrition link)
 * 9. Moments (Horizontally scrolling cards, no health claims)
 * 10. Social Proof (Slot 6: [TODO] rating, review cards, [TODO] customer photo grid)
 * 11. FAQ (Slot 7: 6 questions in accordion, /faq link)
 * 12. Newsletter / WhatsApp Sign-up (confetti pop on submit)
 * 13. Footer (Slot 7: giant wordmark, [TODO] FSSAI, socials, legal links — bottom of layout)
 */
export default function HomePage() {
  return (
    <>
      {/* 2. Hero (Slot 1) */}
      <HomeHero />

      {/* 3. Marquee Ribbons (Slot 4) */}
      <RibbonsSection />

      {/* 4. Flavour Switcher (Slot 2) */}
      <FlavourSwitcherSection />

      {/* 5. Why 11 PM (Midnight Background) */}
      <Why11PMSection />

      {/* 6. Kernel to Crunch (Slot 3) */}
      <KernelToCrunchSection />

      {/* 7. Packs (Slot 5) */}
      <PacksSection />

      {/* 8. Nutrition Snapshot */}
      <NutritionSnapshotSection />

      {/* 9. Moments */}
      <MomentsSection />

      {/* 10. Social Proof (Slot 6) */}
      <SocialProofSection />

      {/* 11. FAQ (Slot 7) */}
      <FAQSection />

      {/* 12. Newsletter or WhatsApp Sign-up */}
      <NewsletterSection />
    </>
  );
}
