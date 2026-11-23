import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aurora — Informação e Direitos da Mulher'
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
          background: 'linear-gradient(135deg, #831843 0%, #db2777 55%, #ec4899 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#fbcfe8' }}>
          Aurora • Informação e Direitos da Mulher
        </div>
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, lineHeight: 1.15 }}>
          Seus direitos, com acolhimento e clareza.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#fdf2f8' }}>
          Triagem informativa, checklists e modelos-base para Defensoria e advocacia.
        </div>
      </div>
    ),
    { ...size }
  )
}
