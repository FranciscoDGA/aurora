import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  const variants = {
    default: 'bg-aurora-600 text-white hover:bg-aurora-700 shadow-sm hover:shadow',
    secondary: 'bg-white text-aurora-900 hover:bg-aurora-50 shadow-sm',
    outline: 'border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 shadow-xs',
    ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
  }
  const sizes = {
    sm: 'h-9 px-3.5 text-xs rounded-lg',
    md: 'h-10 px-4 py-2 text-sm rounded-lg',
    lg: 'h-12 px-7 text-base rounded-xl',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  )
}
