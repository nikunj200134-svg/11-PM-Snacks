import type { Metadata } from 'next';
import { Bagel_Fat_One, Caveat_Brush, DM_Sans, Space_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { pageMeta } from '@/lib/metadata';
import { site } from '@/lib/site';
import './globals.css';

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
  return (
    <html
      lang="en"
      className={`${bagel.variable} ${dmSans.variable} ${caveat.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SmoothScroll />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
