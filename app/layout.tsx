import type { Metadata } from 'next';
import { Bagel_Fat_One, Caveat_Brush, DM_Sans, Space_Mono, Baloo_2, Geist } from 'next/font/google';
import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { BlobCursor } from '@/components/BlobCursor';
import { ClockProgress } from '@/components/ClockProgress';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { pageMeta } from '@/lib/metadata';
import { site } from '@/lib/site';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bagel = Bagel_Fat_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const caveat = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-scribble',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const baloo2 = Baloo_2({
  weight: ['600', '700', '800'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Bold Masala-Flavoured Popcorn',
    description: site.description,
    path: '/',
  }),
  metadataBase: new URL(site.url),
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '11 PM Snacks',
    url: 'https://11pm-snacks.vercel.app',
    logo: 'https://11pm-snacks.vercel.app/brand/logo-official.png',
    description: 'Ready-to-eat small-batch masala popcorn handcrafted in Gurugram, India with zero palm oil.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8510801655',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };

  return (
    <html
      lang="en"
      className={cn(bagel.variable, dmSans.variable, caveat.variable, spaceMono.variable, baloo2.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScroll />
        <BlobCursor />
        <a className="skip-link" href="#main">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ClockProgress />
      </body>
    </html>
  );
}
