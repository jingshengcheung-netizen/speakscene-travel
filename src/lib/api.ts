import { asCoachReply } from './coach.ts'
import type { AppMode, ChatTurn, CoachReply } from '../types.ts'

export async function fetchCoachStatus(): Promise<AppMode> {
  try {
    const res = await fetch('/api/status')
    if (!res.ok) return 'demo'
    const data = (await res.json()) as { mode?: string }
    return data.mode === 'live' ? 'live' : 'demo'
  } catch {
    return 'demo'
  }
}

export async function requestLiveCoach(input: {
  sceneId: string
  history: ChatTurn[]
  userMessage: string
}): Promise<CoachReply> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const data = (await res.json().catch(() => null)) as
    | { reply?: unknown; error?: string }
    | null

  if (!res.ok) {
    throw new Error(data?.error || 'Coach request failed.')
  }
  return asCoachReply(data?.reply)
}
