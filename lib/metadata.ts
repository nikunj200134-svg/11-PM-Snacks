import type { Metadata } from 'next';
import { site } from './site';

export function pageMeta({
  title,
  description,
  path,
  image = '/images/snack-trio.png',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === '/' ? `${site.name} | ${title}` : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.ico',
      apple: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name} — Handcrafted Masala Popcorn`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
