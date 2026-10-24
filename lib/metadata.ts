import type { Metadata } from 'next';
import { site } from './site';

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === '/' ? `${site.name} | ${title}` : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      images: [{ url: '/brand/burst-hero.png', width: 1200, height: 1600, alt: '11 PM Snacks flavoured popcorn pouch' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
