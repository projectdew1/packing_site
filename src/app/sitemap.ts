import { MetadataRoute } from 'next';
import { API_ROUTES } from '@/lib/constants';

const DOMAIN = 'https://kmspacking.com';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/blog',
    '/delivery',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicRoutes: any[] = [];

  try {
    // 2. Fetch Categories
    const catRes = await fetch(API_ROUTES.categories);
    const catData = await catRes.json();
    if (catData?.items) {
      const categoryRoutes = catData.items.map((cat: any) => ({
        url: `${DOMAIN}/products/${cat.enID}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
      dynamicRoutes = [...dynamicRoutes, ...categoryRoutes];
    }

    // 3. Fetch Blog Posts
    // Fetch first 100 posts to include in sitemap
    const blogRes = await fetch(API_ROUTES.newsIds);
    const blogData = await blogRes.json();
    if (blogData?.items) {
      const blogRoutes = blogData.items.map((post: any) => {
        return {
          url: `${DOMAIN}/blog/${post.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
      dynamicRoutes = [...dynamicRoutes, ...blogRoutes];
    }

    // 4. Fetch All Products
    const prodRes = await fetch(API_ROUTES.allMachineParams);
    const prodData = await prodRes.json();
    if (prodData?.items) {
      const productRoutes = prodData.items.map((item: any) => ({
        url: `${DOMAIN}/products/${item.param}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
      dynamicRoutes = [...dynamicRoutes, ...productRoutes];
    }


  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
