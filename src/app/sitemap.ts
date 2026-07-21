import { MetadataRoute } from 'next';
import { SEED_COLLEGES } from '@/db/seeds/colleges.seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://colleges.webfoxx.com';

  const staticPages = [
    '',
    '/search',
    '/colleges',
    '/universities',
    '/courses',
    '/exams',
    '/scholarships',
    '/compare',
    '/about',
    '/contact',
    '/login',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const collegePages = SEED_COLLEGES.map(college => ({
    url: `${baseUrl}/colleges/${college.slug}`,
    lastModified: college.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...collegePages];
}
