import type { Metadata } from 'next';
import { WordsPreloader } from '@/components/storyboard/WordsPreloader';
import { HoverHero } from '@/components/storyboard/HoverHero';
import { SienaParallax } from '@/components/storyboard/SienaParallax';
import { AppleFeatureBlock } from '@/components/storyboard/AppleFeatureBlock';
import { CanvasCrowd } from '@/components/storyboard/CanvasCrowd';
import { NotifyMeSection } from '@/components/storyboard/NotifyMeSection';
import { FAQSection } from '@/components/home/FAQSection';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

export const metadata: Metadata = pageMeta({
  title: `${siteContent.brand.tagline} · ${siteContent.brand.name}`,
  description: siteContent.brand.shortBio,
  path: '/',
});

/**
 * 11 PM SNACKS — THE STORYBOARD
 * 
 * 1. Preloader (Words preloader style) - Typography-only intro with cycling words & curved reveal
 * 2. Home hero (Hover members style) - Giant "11 PM SNACKS", hovering a pouch swaps big text to flavour name
 * 3. Parallax scroll (Siena parallax style) - A masked image scales up as you scroll, with smooth scrolling
 * 4. Product block (Apple Feature Block style) - Pick a flavour, see feature cards expand. No pack sizes, no prices: "Coming soon" only
 * 5. Crowd story (Canvas crowd) - A crowd of people walking while scroll copy tells the 11 PM promise
 * 6. Notify me, FAQ, and footer with Skiper UI credit
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Words Preloader (curved SVG reveal) */}
      <WordsPreloader />

      {/* 2. Home Hero (Hover Members Style: Giant 11 PM SNACKS -> Flavour Swapping) */}
      <HoverHero />

      {/* 3. Parallax Scroll (Siena Parallax Style: Masked Image Scales Up on Scroll) */}
      <SienaParallax />

      {/* 4. Product Block (Apple Feature Block Style: Pick Flavour, Expand Features, Coming Soon Only) */}
      <AppleFeatureBlock />

      {/* 5. Crowd Story (HTML5 Canvas Crowd with The 11 PM Promise Scroll Track) */}
      <CanvasCrowd />

      {/* 6. Notify Me Early Access & FAQ (Footer with Skiper UI credit is in RootLayout) */}
      <NotifyMeSection />
      <FAQSection />
    </>
  );
}
