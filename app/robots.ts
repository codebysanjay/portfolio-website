import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjaymohan.dev';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin-secret-login',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 