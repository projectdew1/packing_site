import { MetadataRoute } from 'next';

const DOMAIN = 'https://kmspacking.com';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
