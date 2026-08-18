/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from 'next';
import { API_ROUTES } from '@/lib/constants';

const DOMAINS = ['https://kmspacking.com', 'https://www.kmspacking.com'];

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/blog',
    '/delivery',
    '/privacy-policy',
    '/terms-of-service',
  ];

  let allRoutes: any[] = [];

  // Generate routes for each domain
  for (const domain of DOMAINS) {
    const domainStaticRoutes = staticRoutes.map((route) => ({
      url: `${domain}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }));
    allRoutes = [...allRoutes, ...domainStaticRoutes];
  }

  let dynamicRoutes: any[] = [];

  try {
    // ...existing API fetches...
    const catRes = await fetch(API_ROUTES.categories);
    const catData = await catRes.json();
    if (catData?.items) {
      for (const domain of DOMAINS) {
        const categoryRoutes = catData.items.map((cat: any) => ({
          url: `${domain}/products/${cat.enID}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
        dynamicRoutes = [...dynamicRoutes, ...categoryRoutes];
      }
    }
    // ...repeat for other endpoints...
  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return [...allRoutes, ...dynamicRoutes];
}