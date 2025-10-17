import { MetadataRoute } from 'next'

/**
 * Web App Manifest for the calculator app
 * Provides PWA capabilities and app metadata
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Simple Calculator',
    short_name: 'Calculator',
    description: 'A modern, accessible calculator web application built with Next.js 14, TypeScript, and Tailwind CSS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    categories: ['utilities', 'productivity'],
    lang: 'en',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    shortcuts: [
      {
        name: 'Calculator',
        short_name: 'Calculator',
        description: 'Open the calculator',
        url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    ],
    related_applications: [],
    prefer_related_applications: false,
    scope: '/',
    id: 'simple-calculator',
    dir: 'ltr'
  }
}
