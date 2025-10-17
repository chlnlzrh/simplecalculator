import { ImageResponse } from 'next/og'

/**
 * Twitter image generation for the calculator app
 * Creates Twitter card preview images
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const runtime = 'edge'

export const alt = 'Simple Calculator - A modern, accessible calculator web application'
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(45deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '20px',
            }}
          >
            =
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '10px',
            }}
          >
            Simple Calculator
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            A modern, accessible calculator web application
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
