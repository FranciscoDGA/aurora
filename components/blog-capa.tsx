import { cn } from '@/lib/utils'
import type { Post } from '@/lib/blog/types'
import Image from 'next/image'

// Capa usando fotos reais (Unsplash) por categoria
const IMAGENS_POR_CATEGORIA: Record<Post['categoria'], string[]> = {
  'Família': [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=800&auto=format&fit=crop'
  ],
  'Violência': [
    'https://images.unsplash.com/photo-1564122315579-1c74ecef8115?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520694478166-daaaaaec74b4?q=80&w=800&auto=format&fit=crop'
  ],
  'Trabalho': [
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
  ],
  'Consumidor': [
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop'
  ],
  'Direitos': [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop'
  ],
}

function varianteDe(semente = ''): number {
  let h = 0
  for (let i = 0; i < semente.length; i++) h = (h * 31 + semente.charCodeAt(i)) >>> 0
  return h % 3
}

export function CapaPost({
  categoria,
  className,
  iconSize = 56,
  semente = '',
  rotulo = false,
}: {
  categoria: Post['categoria']
  className?: string
  iconSize?: number
  semente?: string
  rotulo?: boolean
}) {
  const imagens = IMAGENS_POR_CATEGORIA[categoria] || IMAGENS_POR_CATEGORIA['Direitos']
  const index = varianteDe(semente || categoria)
  const imageUrl = imagens[index]

  return (
    <div
      className={cn('relative overflow-hidden bg-neutral-200', className)}
      role="img"
      aria-label={`Imagem ilustrativa: ${categoria}`}
    >
      <img
        src={imageUrl}
        alt={`Categoria ${categoria}`}
        className="object-cover w-full h-full"
      />
      {/* Overlay leve para dar contraste */}
      <div className="absolute inset-0 bg-black/10" />
      
      {rotulo && (
        <span className="absolute bottom-3 left-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
          {categoria}
        </span>
      )}
    </div>
  )
}
