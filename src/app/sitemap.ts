import { MetadataRoute } from 'next'

/**
 * Sitemap configuration for the calculator app
 * Provides XML sitemap for search engines
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculator.example.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
