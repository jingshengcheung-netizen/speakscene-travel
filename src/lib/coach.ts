import type { CoachReply } from '../types.ts'

export function isCoachReply(value: unknown): value is CoachReply {
  if (!value || typeof value !== 'object') return false
  const row = value as Record<string, unknown>
  return (
    typeof row.rewrite === 'string' &&
    typeof row.tip === 'string' &&
    Array.isArray(row.phrases) &&
    row.phrases.length === 3 &&
    row.phrases.every((item) => typeof item === 'string') &&
    typeof row.next_prompt === 'string'
  )
}

export function asCoachReply(value: unknown): CoachReply {
  if (!isCoachReply(value)) {
    throw new Error('Coach reply is missing rewrite, tip, phrases, or next_prompt.')
  }
  return {
    rewrite: value.rewrite.trim(),
    tip: value.tip.trim(),
    phrases: [value.phrases[0].trim(), value.phrases[1].trim(), value.phrases[2].trim()],
    next_prompt: value.next_prompt.trim(),
  }
}
