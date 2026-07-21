import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cms/', '/api/v1/cms/', '/student/'],
      },
    ],
    sitemap: 'https://colleges.webfoxx.com/sitemap.xml',
  };
}
