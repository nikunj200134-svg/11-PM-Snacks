import type { MetadataRoute } from 'next';
import { siteContent } from '@/content/site';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://11pm-snacks.vercel.app');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/flavours',
    '/nutrition',
    '/our-story',
    '/faq',
    '/where-to-buy',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/shipping-returns',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }));

  const flavourEntries = siteContent.flavours.map((flavour) => ({
    url: `${baseUrl}/flavours/${flavour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...flavourEntries];
}
