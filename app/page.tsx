import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { WordsPreloader } from '@/components/storyboard/WordsPreloader';
import { HoverHero } from '@/components/storyboard/HoverHero';
import { pageMeta } from '@/lib/metadata';
import { siteContent } from '@/content/site';

/**
 * Lazy-load below-the-fold heavy components to keep Lenis, GSAP, and Canvas code
 * completely out of the first mobile JS bundle (LCP under 2.5s).
 */
const SienaParallax = dynamic(
  () => import('@/components/storyboard/SienaParallax').then((mod) => mod.SienaParallax),
  {
    loading: () => <div className="min-h-screen bg-[#14102B]" />,
  }
);

const AppleFeatureBlock = dynamic(
  () => import('@/components/storyboard/AppleFeatureBlock').then((mod) => mod.AppleFeatureBlock),
  {
    loading: () => <div className="min-h-[600px] bg-[#FFF4DC]" />,
  }
);

const CanvasCrowd = dynamic(
  () => import('@/components/storyboard/CanvasCrowd').then((mod) => mod.CanvasCrowd),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#E5E1D8]" />,
  }
);

const NotifyMeSection = dynamic(
  () => import('@/components/storyboard/NotifyMeSection').then((mod) => mod.NotifyMeSection),
  {
    loading: () => <div className="min-h-[400px] bg-[#14102B]" />,
  }
);

const FAQSection = dynamic(
  () => import('@/components/home/FAQSection').then((mod) => mod.FAQSection),
  {
    loading: () => <div className="min-h-[500px] bg-[#FFF4DC]" />,
  }
);

export const metadata: Metadata = pageMeta({
  title: `${siteContent.brand.tagline} · ${siteContent.brand.name}`,
  description: siteContent.brand.shortBio,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      {/* 1. Words Preloader (curved SVG reveal wipe) */}
      <WordsPreloader />

      {/* 2. Home Hero (Hover Members Pattern - Priority above fold) */}
      <HoverHero />

      {/* 3. Siena Parallax (Scroll mask & counter scale) */}
      <SienaParallax />

      {/* 4. Product Block (Apple Feature Block Pattern) */}
      <AppleFeatureBlock />

      {/* 5. Crowd Story (HTML5 Canvas Crowd + GSAP walking sprites) */}
      <CanvasCrowd />

      {/* 6. Early Access Capture & FAQ */}
      <NotifyMeSection />
      <FAQSection />
    </>
  );
}
