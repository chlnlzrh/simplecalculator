import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for the calculator app
 * Controls search engine crawling and indexing
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/private/',
      ],
    },
    sitemap: 'https://calculator.example.com/sitemap.xml',
    host: 'https://calculator.example.com',
  }
}
