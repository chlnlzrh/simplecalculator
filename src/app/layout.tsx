import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Calculator',
  description: 'A modern, accessible calculator web application built with Next.js 14, TypeScript, and Tailwind CSS.',
  keywords: ['calculator', 'math', 'arithmetic', 'calculator app', 'web calculator'],
  authors: [{ name: 'Calculator App' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Simple Calculator',
    description: 'A modern, accessible calculator web application',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
