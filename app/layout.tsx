import type { Metadata } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { pageMeta } from '@/lib/metadata';
import { site } from '@/lib/site';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
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
    <html lang="en" className={`${outfit.variable} ${bebas.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
