import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-24 w-full resize-y rounded-2xl border border-line bg-ticket px-4 py-3 text-base text-ink shadow-sm',
        'placeholder:text-ink-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea',
        className,
      )}
      {...props}
    />
  )
}
