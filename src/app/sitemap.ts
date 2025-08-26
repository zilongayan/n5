import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mangaview.com';
  const currentDate = new Date().toISOString();
  
  // Pages principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/it`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pt`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Pages de catégories
  const categoryPages = [
    '/popular',
    '/recent',
    '/search',
    '/collections',
    '/favorites',
    '/about',
  ].map(category => ({
    url: `${baseUrl}${category}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Pages de tags populaires
  const popularTags = [
    'action',
    'fantasy',
    'romance',
    'comedy',
    'drama',
    'horror',
    'sci-fi',
    'adventure',
    'supernatural',
    'school',
    'demons',
    'monsters',
  ].map(tag => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Pages de mangas populaires (exemples)
  const popularMangas = [
    'solo-leveling',
    'chainsaw-man',
    'one-piece',
    'demon-slayer',
    'jujutsu-kaisen',
    'my-hero-academia',
    'attack-on-titan',
    'naruto',
    'dragon-ball',
    'bleach',
  ].map(manga => ({
    url: `${baseUrl}/gallery/${manga}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...mainPages,
    ...categoryPages,
    ...popularTags,
    ...popularMangas,
  ];
}

