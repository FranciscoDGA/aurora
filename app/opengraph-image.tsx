import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Guia Clara — Seus Direitos, Claros'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #7c3aed 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#ddd6fe' }}>
          Guia Clara • Direitos sem Juridiquês
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
          Seus direitos, claros.
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#ede9fe' }}>
          Triagem gratuita, checklists e guias práticos sobre família, trabalho e proteção.
        </div>
      </div>
    ),
    { ...size }
  )
}
