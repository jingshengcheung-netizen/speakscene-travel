import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'ticket'
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-ink text-paper hover:bg-ink-soft',
        variant === 'ghost' && 'border border-line bg-ticket/70 text-ink hover:bg-sand/60',
        variant === 'ticket' && 'bg-stamp text-white hover:bg-stamp/90',
        className,
      )}
      {...props}
    />
  )
}
