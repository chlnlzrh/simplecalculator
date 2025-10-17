import { ImageResponse } from 'next/og'

/**
 * Dynamic icon generation for the calculator app
 * Creates app icons with calculator symbol
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        =
      </div>
    ),
    {
      ...size,
    }
  )
}
